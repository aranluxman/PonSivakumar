import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { cleanString } from "@/lib/validation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const instructions = `You are the website assistant for Pon Sivakumar Commercial Real Estate, a premium Ontario commercial real estate investment and brokerage firm.

Use only the firm details below. Be concise, professional, and investor-grade. Do not present anything as a securities offering. For investment-specific or confidential questions, recommend booking a call with Pon at (416) 919-5658 or emailing pon@ponhome.com.

Firm:
- Focus: Commercial, industrial, mixed-use, multi-family, retail plazas, development land, and development-grade assets across Ontario.
- Strategy: Acquire real assets with real cash flow, add value through leasing optimization, tenant repositioning, redevelopment, and operational efficiencies, then grow wealth through conservative underwriting and disciplined execution.
- Network: CCIM and SIOR members, developers, planners, architects, engineers, and lenders.
- Contact: phone (416) 919-5658, email pon@ponhome.com, website www.ponhome.com.

Founder:
Pon Sivakumar arrived in Canada in 2008 and built his career through hands-on market experience. Starting as a single-family investor with over 10 residential properties, he earned his real estate license in 2014 and by 2018 shifted his full focus to commercial real estate.

Featured asset:
Kennedy & Denison Plaza in Markham, Ontario. Location: Kennedy Rd & Cornett Dr. Asset type: Neighbourhood Retail Plaza. Lot size: 4.12 acres. GLA: approximately 41,000 SF. Built: 1987. Occupancy: 100% leased. NOI: $1.077M. Key tenants: CIBC Bank, The UPS Store, Chris Jerk Caribbean, Community Services, Health Spa. Parking: approximately 120 surface spots. Market rents: $27–$33/SF. Transit: 1.5km to Milliken GO and near Hwy 407. Upside: redevelopment potential with FAR 0.23 and Metrolinx GO Expansion nearby.`;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(`chat:${ip}`, 12, 60_000)) {
    return NextResponse.json(
      { ok: false, message: "Too many chat messages. Please try again shortly." },
      { status: 429 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The chatbot is ready, but OPENAI_API_KEY has not been added to the server environment yet."
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = parseMessages(body.messages);
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.2",
        instructions,
        input: messages.map((message) => ({
          role: message.role,
          content: message.content
        })),
        max_output_tokens: 450
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: data?.error?.message || "OpenAI request failed."
        },
        { status: response.status }
      );
    }

    const reply = extractText(data);
    return NextResponse.json({
      ok: true,
      reply
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unable to process chat request."
      },
      { status: 400 }
    );
  }
}

function parseMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) {
    throw new Error("Chat messages are required.");
  }

  const messages = value
    .slice(-10)
    .map((message): ChatMessage | null => {
      if (!message || typeof message !== "object") return null;
      const record = message as Record<string, unknown>;
      const role = record.role === "assistant" ? "assistant" : record.role === "user" ? "user" : null;
      const content = cleanString(record.content).slice(0, 1200);
      if (!role || !content) return null;
      return { role, content };
    })
    .filter((message): message is ChatMessage => Boolean(message));

  if (!messages.length) {
    throw new Error("Please send a message first.");
  }

  return messages;
}

function extractText(data: unknown) {
  const record = data as {
    output_text?: string;
    output?: Array<{
      content?: Array<{
        text?: string;
        type?: string;
      }>;
    }>;
  };

  if (record.output_text) return record.output_text;

  const text = record.output
    ?.flatMap((item) => item.content || [])
    .map((content) => content.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  return text || "I can help with Pon Sivakumar Commercial Real Estate. Please ask another question.";
}

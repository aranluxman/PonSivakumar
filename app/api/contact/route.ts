import { NextRequest, NextResponse } from "next/server";
import { deliverLead } from "@/lib/lead-delivery";
import { isRateLimited } from "@/lib/rate-limit";
import { parseContactInput } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const input = parseContactInput(await request.json());
    await deliverLead({
      type: "contact",
      ...input,
      source: "Pon Sivakumar Commercial Real Estate contact form",
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip
    });

    return NextResponse.json({
      ok: true,
      message: "Message received."
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unable to process request."
      },
      { status: 400 }
    );
  }
}

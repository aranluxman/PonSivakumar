import { NextRequest, NextResponse } from "next/server";
import { deliverLead } from "@/lib/lead-delivery";
import { isRateLimited } from "@/lib/rate-limit";
import { parseInvestorPackageInput } from "@/lib/validation";

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/investor-package.html", request.url));
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(`package:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const input = parseInvestorPackageInput(await request.json());
    await deliverLead({
      type: "investor-package",
      ...input,
      source: "Pon Sivakumar Commercial Real Estate investor package request",
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip
    });

    return NextResponse.json({
      ok: true,
      downloadUrl: "/investor-package.html"
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

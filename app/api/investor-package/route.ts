import { NextRequest, NextResponse } from "next/server";
import { deliverLead } from "@/lib/lead-delivery";
import { isRateLimited } from "@/lib/rate-limit";
import { parseInvestorPackageInput } from "@/lib/validation";

export async function GET() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Pon Sivakumar Investor Package</title>
  <style>
    body { font-family: Arial, sans-serif; color: #0D1B2A; margin: 48px; line-height: 1.55; }
    h1, h2 { font-family: Georgia, serif; }
    h1 { font-size: 42px; line-height: 1.05; }
    h2 { margin-top: 34px; color: #0D1B2A; }
    .accent { color: #C9A84C; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
    table { border-collapse: collapse; width: 100%; margin-top: 18px; }
    td { border: 1px solid #d9dee5; padding: 12px; vertical-align: top; }
    td:first-child { font-weight: 700; width: 30%; color: #8b7330; }
    .notice { margin-top: 36px; font-size: 12px; color: #6f7882; }
  </style>
</head>
<body>
  <p class="accent">Investor Package</p>
  <h1>Pon Sivakumar Commercial Real Estate</h1>
  <p>Commercial, Industrial & Development-Grade Assets Across Ontario</p>
  <h2>Featured Asset: Kennedy & Denison Plaza</h2>
  <table>
    <tr><td>Location</td><td>Kennedy Rd & Cornett Dr, Markham, Ontario</td></tr>
    <tr><td>Asset Type</td><td>Neighbourhood Retail Plaza</td></tr>
    <tr><td>Lot Size</td><td>4.12 Acres</td></tr>
    <tr><td>GLA</td><td>~41,000 SF</td></tr>
    <tr><td>Occupancy</td><td>100% Leased</td></tr>
    <tr><td>NOI</td><td>$1.077M</td></tr>
    <tr><td>Key Tenants</td><td>CIBC Bank, The UPS Store, Chris Jerk Caribbean, Community Services, Health Spa</td></tr>
    <tr><td>Upside</td><td>Redevelopment potential (FAR: 0.23), Metrolinx GO Expansion nearby</td></tr>
  </table>
  <h2>Investment Thesis</h2>
  <p>We invest in real assets with real cash flow. We partner with investors for long-term wealth through conservative underwriting, disciplined execution, and a dual strategy of stable income plus redevelopment upside.</p>
  <h2>Contact</h2>
  <p>Phone: (416) 919-5658<br>Email: pon@ponhome.com<br>Website: www.ponhome.com</p>
  <p class="notice">Not an offering. For informational purposes only.</p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": "attachment; filename=pon-sivakumar-investor-package.html"
    }
  });
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
      downloadUrl: "/api/investor-package"
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

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "ponsivakumar",
    timestamp: new Date().toISOString()
  });
}

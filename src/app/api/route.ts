import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Minimal health probe for uptime checks — no payload, no tracking. */
export function GET() {
  return NextResponse.json({
    name: "anchor-and-trail",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}

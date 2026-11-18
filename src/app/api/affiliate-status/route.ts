import { NextResponse } from "next/server";
import { getAffiliateConfigSummary } from "@/lib/affiliate-config";

export const dynamic = "force-dynamic";

/**
 * Affiliate credential audit for the owner-only ?affiliate-check=1 panel.
 * Read-only, no secrets returned — only which env vars are placeholders.
 * robots.ts already disallows /api/ so this stays out of search indexes.
 */
export function GET() {
  const summary = getAffiliateConfigSummary();
  return NextResponse.json(summary, {
    headers: { "Cache-Control": "no-store" },
  });
}

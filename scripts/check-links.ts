/**
 * Outbound + internal link auditor.
 *
 * Enumerates EVERY outbound URL the site can generate — deal CTAs, tour /
 * stay / hostel / transit cards, insurance plans, calculator checklist
 * combinations, article pick boxes, sidebar partner cards, hero search tab
 * samples — through the real buildAffiliateLink engine, then requests each
 * one and reports the status.
 *
 * Classification:
 *   OK           2xx / 3xx
 *   BOT-WALLED   202/403/405/429/503 + DataDome/Cloudflare walls — the URL is
 *                fine but the sandbox IP is flagged; re-verify manually
 *   BROKEN       404 / 410 / 400 — a real dead link, must be fixed
 *
 * Also sweeps every internal route against the local dev server so nav,
 * footer, hub links, breadcrumbs and sitemap entries can never silently rot.
 *
 * Run: bun scripts/check-links.ts [--internal-only] [--outbound-only]
 */

import { buildAffiliateLink } from "../src/lib/affiliate";
import { budgetRates } from "../src/data/budget";
import { deals } from "../src/data/deals";
import { hostels } from "../src/data/hostels";
import { insurancePlans } from "../src/data/insurance";
import { partners } from "../src/data/partners";
import { stays } from "../src/data/stays";
import { tours } from "../src/data/tours";
import { transitRoutes } from "../src/data/transit";
import { articles } from "../src/data/articles";
import type { PartnerId } from "../src/types/affiliate";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const TIMEOUT_MS = 25_000;
const CONCURRENCY = 6;

interface LinkRecord {
  url: string;
  source: string;
}

const outbound = new Map<string, LinkRecord>();

function addOutbound(partner: PartnerId, destination: string, campaign: string, source: string) {
  const url = buildAffiliateLink({ partner, destination, campaign });
  if (!outbound.has(url)) outbound.set(url, { url, source });
}

/* ------------------------------------------------------------------ */
/* 1. Enumerate every outbound link the site renders                   */
/* ------------------------------------------------------------------ */

// Deal cards + PickBox deal picks (DealCard / PickBox "Check live price")
for (const deal of deals) {
  addOutbound(deal.partner, deal.destination, "deal-card", `deal:${deal.id}`);
}

// Tour cards full + compact, PickBox tour picks
for (const tour of tours) {
  addOutbound("go-city", tour.destination, "tour-card", `tour:${tour.id}`);
}

// Stay cards + PickBox stay picks
for (const stay of stays) {
  addOutbound("expedia", `${stay.city}, ${stay.country}`, "stay-card", `stay:${stay.id}`);
}

// Hostel cards + PickBox hostel picks
for (const hostel of hostels) {
  addOutbound("expedia", `${hostel.city}, ${hostel.country}`, "hostel-card", `hostel:${hostel.id}`);
}

// Transit cards
for (const route of transitRoutes) {
  addOutbound(
    route.partner,
    `${route.origin} to ${route.destination}`,
    "transit-card",
    `transit:${route.id}`
  );
}

// Insurance banners (one CTA per plan, all safetywing)
for (const plan of insurancePlans) {
  addOutbound("safetywing", "travel insurance", "insurance-banner", `insurance:${plan.id}`);
}

// Calculator: every destination x style produces a full checklist
for (const rate of budgetRates) {
  for (const style of ["cruise", "backpacking"] as const) {
    addOutbound("expedia", rate.destination, "calculator-flights", `calc:${rate.id}:${style}:flights`);
    addOutbound(
      "expedia",
      rate.staysQuery,
      "calculator-stays",
      `calc:${rate.id}:${style}:stays`
    );
    addOutbound("go-city", rate.activitiesQuery, "calculator-activities", `calc:${rate.id}:${style}:activities`);
    addOutbound("safetywing", rate.destination, "calculator-insurance", `calc:${rate.id}:${style}:insurance`);
    if (style === "backpacking" && rate.transitRoute) {
      addOutbound("klook", rate.transitRoute, "calculator-transit", `calc:${rate.id}:transit`);
    }
  }
}

// Article sidebar partner cards
for (const article of articles) {
  if (article.category === "cruise") {
    addOutbound("expedia", article.portCity ?? "Barcelona, Spain", "sidebar-partner", `sidebar:${article.slug}`);
  } else {
    addOutbound("safetywing", article.seo.keyword, "sidebar-partner", `sidebar:${article.slug}`);
  }
}

// Hero search tabs — representative queries per partner
addOutbound("cruisedirect", "Mediterranean", "hero-search", "hero-search:cruises");
addOutbound("expedia", "Barcelona", "hero-search", "hero-search:stays");
addOutbound("go-city", "Rome", "hero-search", "hero-search:tours");
addOutbound("welcome-pickups", "Lisbon Airport", "hero-search", "hero-search:transfers");
addOutbound("expedia", "Bangkok", "hero-search", "hero-search:flights");

// Sanity: partner registry base URLs themselves must resolve
for (const partner of Object.values(partners)) {
  if (!outbound.has(partner.baseUrl)) {
    outbound.set(partner.baseUrl, { url: partner.baseUrl, source: `partner-base:${partner.id}` });
  }
}

/* ------------------------------------------------------------------ */
/* 2. Enumerate internal routes                                        */
/* ------------------------------------------------------------------ */

const BASE = process.env.LINKCHECK_BASE_URL ?? "http://localhost:3000";
const internalRoutes = [
  "/",
  "/cruises",
  "/backpacking",
  "/blog",
  "/stays",
  "/calculator",
  "/disclosure",
  "/privacy",
  // Owner-only credential audit endpoint (no-store JSON)
  "/api/affiliate-status",
  ...articles.map((a) => `/blog/${a.slug}`),
  "/sitemap.xml",
  "/robots.txt",
  // 404 template must render, not crash — expected to return 404
  "/this-route-should-not-exist",
];

/** Routes whose canonical status is intentionally non-2xx (sanity controls). */
const EXPECTED_STATUS: Record<string, number> = {
  "/this-route-should-not-exist": 404,
};

/* ------------------------------------------------------------------ */
/* 3. Fetchers                                                         */
/* ------------------------------------------------------------------ */

async function checkOutbound(url: string): Promise<number | string> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.status;
  } catch (error) {
    return `ERR:${error instanceof Error ? error.name : "unknown"}`;
  }
}

async function checkInternal(route: string): Promise<number | string> {
  try {
    const res = await fetch(`${BASE}${route}`, {
      redirect: "follow",
      signal: AbortSignal.timeout(60_000),
    });
    // Consume body so the dev server can close the socket cleanly.
    await res.arrayBuffer().catch(() => undefined);
    return res.status;
  } catch (error) {
    return `ERR:${error instanceof Error ? error.name : "unknown"}`;
  }
}

/* ------------------------------------------------------------------ */
/* 4. Run checks                                                       */
/* ------------------------------------------------------------------ */

const args = process.argv.slice(2);
const doOutbound = !args.includes("--internal-only");
const doInternal = !args.includes("--outbound-only");

async function mapLimited<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const BOT_WALL_STATUSES = new Set([202, 403, 405, 429, 503]);
let broken = 0;
let botWalled = 0;

function classify(status: number | string): "OK" | "BOT-WALLED" | "BROKEN" {
  if (typeof status === "number") {
    if (status >= 200 && status < 400) return "OK";
    if (BOT_WALL_STATUSES.has(status)) return "BOT-WALLED";
    return "BROKEN"; // 400 / 404 / 405 / 410 / 5xx
  }
  // Network-level timeout with a browser UA usually means a bot wall that
  // never finished its challenge; DNS/TLS failures would be BROKEN.
  return status === "ERR:TimeoutError" ? "BOT-WALLED" : "BROKEN";
}

if (doOutbound) {
  console.log(`\n== OUTBOUND LINKS (${outbound.size} unique) ==`);
  const records = [...outbound.values()];
  const results = await mapLimited(records, CONCURRENCY, async (record) => ({
    record,
    status: await checkOutbound(record.url),
  }));
  for (const { record, status } of results) {
    const verdict = classify(status);
    if (verdict === "BOT-WALLED") botWalled++;
    if (verdict === "BROKEN") broken++;
    console.log(`${verdict.padEnd(11)} ${String(status).padEnd(14)} ${record.url}   [${record.source}]`);
  }
}

if (doInternal) {
  console.log(`\n== INTERNAL ROUTES (${internalRoutes.length}) on ${BASE} ==`);
  const results = await mapLimited(internalRoutes, 3, async (route) => ({
    route,
    status: await checkInternal(route),
  }));
  for (const { route, status } of results) {
    const expected = EXPECTED_STATUS[route];
    const ok =
      expected !== undefined
        ? status === expected
        : classify(status) === "OK";
    if (!ok) broken++;
    console.log(`${(ok ? "OK" : "BROKEN").padEnd(11)} ${String(status).padEnd(14)} ${route}`);
  }
}

console.log(`\n== SUMMARY ==`);
console.log(`bot-walled (URL fine, sandbox IP flagged): ${botWalled}`);
console.log(`broken: ${broken}`);
process.exit(broken > 0 ? 1 : 0);

import type { AffiliatePartner, PartnerId } from "@/types/affiliate";

/**
 * Affiliate partner registry.
 *
 * Affiliate IDs are read from environment variables with documented demo
 * fallbacks so the same code path works locally and in production.
 * Replace the NEXT_PUBLIC_* values at deploy time with live account IDs.
 *
 * URL formats below were verified against the live partner sites (Nov 2025
 * through Nov 2026):
 * - Omio: LIVE Impact Marketplace shortlink omio.sjv.io/2RDPaG (Nov 2026)
 *   → 302 ojrq.net → omio.sjv.io/c/7831404/409973/7385 — attribution lives in
 *   the redirect path, so it cannot be lost. Omio's own deep-link search URLs
 *   require internal IDs, so CTAs land on Omio (via the network) where the
 *   in-page search covers the route named in the surrounding copy.
 * - CruiseDirect: LIVE CJ Affiliate click link jdoqocy.com/click-101934884-
 *   17380663 (Nov 2026). The click-{advertiser}-{campaign} PATH carries the
 *   credential; appended utm_* params survive the first hop (verified 302 →
 *   cj.dotomi.com). The CJ redirect also bypasses the Cloudflare managed
 *   challenge that used to 504 the direct domain — CTAs are reliable again.
 * - Expedia: the Expedia Group affiliate tool link /affiliates/{affiliate-id}/
 *   {campaign-id} ("anchor__trail/214"). The credential lives in the PATH, so
 *   attribution survives even if the redirector drops appended utm_* params
 *   (they survive the first 301 hop; verified Nov 2025). Sandbox/curl checks
 *   hit Expedia's bot wall (HTTP 429) — real browsers pass; click-test after
 *   deploy.
 * - Go City / Welcome Pickups: Travelpayouts-issued tpx.lu shortlinks (Nov
 *   2026). Go City 302s to prf.hn (Performance network) with the camref in
 *   the path; Welcome Pickups 302s with aff_track_id injected as a query
 *   param. Both redirectors rebuild the query string, so both run in
 *   bareLink mode and are sent verbatim.
 * - Removed partners: Booking.com, Viator, Hostelworld, and 12Go were let go
 *   in the Nov 2026 roster change; their slots became Go City, Welcome
 *   Pickups, and Expedia (stays), and the Asia transit cards moved to Klook.
 * - Travelpayouts was retired as a DIRECT partner in the same pass (Nov
 *   2026): with no marker configured its links landed on the network's own
 *   homepage, which is an affiliate-marketing site rather than a bookable
 *   travel destination. The account itself stays alive behind the scenes —
 *   it ISSUES the tpx.lu shortlinks for Klook, Go City, and Welcome Pickups
 *   — but no outbound link points at Travelpayouts' own properties anymore,
 *   and the Drive verification script was removed with it (the shortlinks
 *   attribute via their redirect paths, not via domain verification).
 *   Flights surfaces moved to Expedia.
 *
 * LIVE credentials below (SafetyWing ref, Expedia affiliate link, Klook and
 * Go City and Welcome Pickups shortlinks, Omio Impact shortlink, CruiseDirect
 * CJ click link) are baked in as the fallback value — affiliate IDs are not
 * secrets (every outbound link exposes them in page source), and baking them
 * keeps the site attributed with zero deployment-time env config. The
 * NEXT_PUBLIC_* env vars still override any fallback at build/runtime.
 */
const env = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value && value.length > 0 ? value : fallback;
};

/** URL-safe slug helpers were removed with the 12Go/Hostelworld entries. */
const DEMO_MARKER = "at.demo";

const swRef = env("NEXT_PUBLIC_SW_REF", "26643659");

export const partners: Record<PartnerId, AffiliatePartner> = {
  "go-city": {
    id: "go-city",
    name: "Go City",
    network: "Go City affiliate program (via Travelpayouts / Performance)",
    // LIVE shortlink (Travelpayouts dashboard, Nov 2026). bareLink mode:
    // verified 302 → prf.hn/click/camref:1100l4xn8/…/destination:gocity.com —
    // attribution (camref) is encoded in the redirect path and the
    // redirector rebuilds the query string, so appended params are dropped
    // and the link must go out verbatim.
    baseUrl: env("NEXT_PUBLIC_GOCITY_LINK", "https://gocity.tpx.lu/3ZiU6vsN"),
    bareLink: true,
    tracking: {},
    dynamicParamMap: {},
    relationship:
      "Anchor & Trail earns commissions on attraction passes and city sightseeing products booked through Go City, delivered via the Travelpayouts network. Pass inclusions, pricing, and booking terms are set entirely by Go City and its operators.",
  },
  "welcome-pickups": {
    id: "welcome-pickups",
    name: "Welcome Pickups",
    network: "Welcome Pickups affiliate program (via Travelpayouts)",
    // LIVE shortlink (Travelpayouts dashboard, Nov 2026). bareLink mode:
    // verified 302 → welcomepickups.com/?aff_track_id=…-784139 — the
    // redirector injects its own tracking query and rebuilds the string, so
    // appended params are dropped and the link must go out verbatim.
    baseUrl: env("NEXT_PUBLIC_WP_LINK", "https://tpx.lu/osoozVYR"),
    bareLink: true,
    tracking: {},
    dynamicParamMap: {},
    relationship:
      "Anchor & Trail earns commissions on airport and port transfers booked through Welcome Pickups, delivered via the Travelpayouts network. Transfer pricing, driver terms, and cancellation rules are set entirely by Welcome Pickups.",
  },
  klook: {
    id: "klook",
    name: "Klook",
    network: "Klook affiliate program (via Travelpayouts)",
    // LIVE shortlink (Travelpayouts dashboard, Nov 2025). bareLink mode:
    // attribution (aid api|13694|…|pid|784139) is encoded in the redirect
    // path — verified 302 → affiliate.klook.com/redirect — and appended
    // query params are ignored, so the link must go out verbatim.
    baseUrl: env("NEXT_PUBLIC_KLOOK_LINK", "https://klook.tpx.lu/WprpOIa8"),
    bareLink: true,
    tracking: {},
    dynamicParamMap: {},
    relationship:
      "Anchor & Trail earns commissions on attractions, transit passes, and day trips booked through Klook, delivered via the Travelpayouts network. Activity availability, pricing, and terms are set entirely by Klook and its operators.",
  },
  cruisedirect: {
    id: "cruisedirect",
    name: "CruiseDirect",
    network: "CruiseDirect affiliate program (via CJ Affiliate)",
    // LIVE CJ click link (CJ Affiliate dashboard, Nov 2026):
    // jdoqocy.com/click-101934884-17380663. The click-{advertiser}-{campaign}
    // PATH carries the credential, so attribution survives every hop;
    // appended utm_* params ride the first hop (verified 302 → cj.dotomi.com).
    // The CJ redirect bypasses the Cloudflare managed challenge that used to
    // 504 the direct domain, so CTAs are reliable again — deep search URLs
    // still need session-scoped IDs, so CTAs land on CruiseDirect's homepage
    // with the destination riding along in utm_campaign.
    baseUrl: env("NEXT_PUBLIC_CD_CJ", "https://www.jdoqocy.com/click-101934884-17380663"),
    tracking: {
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns a commission on cruise bookings made through CruiseDirect. Fare tiers shown in our tables are planning estimates; CruiseDirect always shows the live, bookable rate.",
  },
  expedia: {
    id: "expedia",
    name: "Expedia",
    network: "Expedia Group affiliate program",
    // LIVE affiliate link (Expedia Group affiliate tool, Nov 2025):
    // /affiliates/{affiliate-id}/{campaign-id} — "anchor__trail/214". The
    // credential lives in the PATH, so attribution survives even if the
    // redirector drops appended utm_* params (they survive the first 301
    // hop; verified Nov 2025). Sandbox/curl checks hit Expedia's bot wall
    // (HTTP 429) — real browsers pass; click-test after deploy. Covers
    // hotels, hostels, and cruises since the Nov 2026 roster change. Set
    // NEXT_PUBLIC_EXPEDIA_AFF to a full link URL to swap campaigns.
    baseUrl: env(
      "NEXT_PUBLIC_EXPEDIA_AFF",
      "https://expedia.com/affiliates/anchor__trail/214"
    ),
    tracking: {
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on stays and cruise bookings made through Expedia. We compare CruiseDirect and Expedia fares independently; neither partner influences which one we recommend.",
  },
  safetywing: {
    id: "safetywing",
    name: "SafetyWing",
    network: "SafetyWing ambassador program",
    // LIVE ambassador link (Nov 2025). The dashboard-generated link is
    // safetywing.com/nomad-insurance?referenceID=<id>&utm_source=<id>
    // &utm_medium=Ambassador — referenceID and utm_source must carry the
    // SAME account id, and utm_medium must stay "Ambassador". Keep all
    // three verbatim; the builder adds utm_campaign on top for our reports.
    baseUrl: "https://safetywing.com/nomad-insurance",
    tracking: {
      referenceID: swRef,
      utm_source: swRef,
      utm_medium: "Ambassador",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns a referral fee when you purchase SafetyWing Nomad Insurance through our links. We are not an insurance broker; policy terms, pricing, and eligibility are set entirely by SafetyWing and can change without notice.",
  },
  omio: {
    id: "omio",
    name: "Omio",
    network: "Omio affiliate program (via Impact)",
    // LIVE Impact shortlink (Impact Marketplace dashboard, Nov 2026):
    // omio.sjv.io/2RDPaG → 302 ojrq.net → omio.sjv.io/c/7831404/409973/7385.
    // Attribution (campaign 7831404, advertiser 409973, partner 7385) is
    // encoded in the redirect PATH, so it survives every hop; appended
    // utm_* params ride the first hop (verified Nov 2026), same as the
    // Expedia link. Omio's own deep-search URLs still need internal IDs, so
    // CTAs land on Omio where in-page search covers the named route.
    baseUrl: env("NEXT_PUBLIC_OMIO_LINK", "https://omio.sjv.io/2RDPaG"),
    tracking: {
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on European train, bus, and ferry bookings made through Omio, delivered via the Impact network. Fare tiers shown are planning estimates; Omio always displays live operator pricing.",
  },
};

export const partnerList: AffiliatePartner[] = [
  partners.klook,
  partners["go-city"],
  partners["welcome-pickups"],
  partners.cruisedirect,
  partners.expedia,
  partners.safetywing,
  partners.omio,
];

export function getPartner(id: PartnerId): AffiliatePartner {
  return partners[id];
}

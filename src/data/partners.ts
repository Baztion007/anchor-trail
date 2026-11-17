import type { AffiliatePartner, PartnerId } from "@/types/affiliate";

/**
 * Affiliate partner registry.
 *
 * Affiliate IDs are read from environment variables with documented demo
 * fallbacks so the same code path works locally and in production.
 * Replace the NEXT_PUBLIC_* values at deploy time with live account IDs.
 *
 * URL formats below were verified against the live partner sites (Nov 2025):
 * - 12Go: route pages are path-based /en/travel/{from}/{to}; the old
 *   /en/search?q= format redirects to a slug and 404s. Non-route strings
 *   fall back to the 12Go homepage.
 * - Hostelworld: /search?search_keywords= is retired (404s). City pages
 *   /hostels/{city} are the working pattern.
 * - Omio / CruiseDirect / Expedia: deep-link search URLs require internal
 *   IDs or are bot-gated; CTAs land on their canonical hub pages instead,
 *   with the route context preserved in utm_campaign.
 * - Travelpayouts: tp.media/r needs a real marker; when only the demo
 *   fallback is configured we route to travelpayouts.com so links never 404.
 */
const env = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value && value.length > 0 ? value : fallback;
};

/** URL-safe slug: accent-folded, lowercase, non-alphanumerics to dashes. */
function pathSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Parse "Origin to Destination" into its two halves. Returns null for region
 * labels ("The Balkans") that contain no route — those must never become
 * path URLs, they dead-end on the partner site.
 */
function parseRoute(destination: string): { from: string; to: string } | null {
  const match = destination.match(/^(.+?)\s+to\s+(.+)$/i);
  if (!match) return null;
  const from = match[1].trim();
  const to = match[2].trim();
  if (!from || !to) return null;
  return { from, to };
}

const DEMO_MARKER = "at.demo";

const tpMarker = env("NEXT_PUBLIC_TP_MARKER", "");

export const partners: Record<PartnerId, AffiliatePartner> = {
  travelpayouts: {
    id: "travelpayouts",
    name: "Travelpayouts",
    network: "Travelpayouts affiliate network",
    // With a real marker configured, links redirect through tp.media.
    // Without one, they land on travelpayouts.com — tp.media/r rejects
    // unknown markers with a 400, so the demo fallback must not use it.
    baseUrl: tpMarker ? "https://tp.media/r" : "https://www.travelpayouts.com",
    tracking: {
      ...(tpMarker ? { marker: tpMarker } : {}),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: tpMarker ? "destination" : undefined,
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail is a Travelpayouts affiliate. We earn a commission when you book flights, hotels, or travel services through our Travelpayouts partner links (including WayAway and Airalo eSIM deep links). Rates and availability are set by the travel providers, never by us.",
  },
  booking: {
    id: "booking",
    name: "Booking.com",
    network: "Booking.com Partner Programme",
    baseUrl: "https://www.booking.com/searchresults.html",
    tracking: {
      aid: env("NEXT_PUBLIC_BOOKING_AID", "at-demo"),
      label: "anchor-and-trail",
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "ss",
      campaign: "utm_campaign",
      subId: "sid",
    },
    relationship:
      "Anchor & Trail participates in the Booking.com Partner Programme. We earn a commission on completed stays booked through our hotel links. We independently select every property we feature; Booking.com does not review or approve our editorial content.",
  },
  viator: {
    id: "viator",
    name: "Viator",
    network: "Viator (Tripadvisor) affiliate program",
    baseUrl: "https://www.viator.com/searchresults",
    tracking: {
      mc_id: env("NEXT_PUBLIC_VIATOR_MC", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "text",
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on excursions booked through Viator, a Tripadvisor company. Tour ratings shown on our site are snapshots pulled from Viator listings at the time of writing; live ratings may differ.",
  },
  cruisedirect: {
    id: "cruisedirect",
    name: "CruiseDirect",
    network: "CruiseDirect affiliate program",
    // Deep search URLs require session-scoped internal IDs, so CTAs land on
    // the homepage; the destination rides along in utm_campaign for
    // attribution and is what the copy already describes.
    baseUrl: "https://www.cruisedirect.com",
    tracking: {
      ref: env("NEXT_PUBLIC_CD_REF", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns a commission on cruise bookings made through CruiseDirect. Fare tiers shown in our tables are planning estimates; CruiseDirect always shows the live, bookable rate.",
  },
  "expedia-cruises": {
    id: "expedia-cruises",
    name: "Expedia Cruises",
    network: "Expedia Cruises agency program",
    // Expedia's cruise search uses bot-gated, session-dependent params — the
    // /cruises hub is the stable, verified landing surface.
    baseUrl: "https://www.expedia.com/cruises",
    tracking: {
      affiliation: env("NEXT_PUBLIC_EXPEDIA_AFF", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on cruise bookings made through Expedia Cruises. We compare CruiseDirect and Expedia Cruises fares independently; neither partner influences which one we recommend.",
  },
  hostelworld: {
    id: "hostelworld",
    name: "Hostelworld",
    network: "Hostelworld affiliate program",
    baseUrl: "https://www.hostelworld.com",
    // /search?search_keywords= now 404s; city landing pages are the live
    // pattern. "Bangkok, Thailand" -> /hostels/bangkok
    buildUrl: (destination) => {
      const city = destination.split(",")[0]?.trim() ?? destination;
      return `https://www.hostelworld.com/hostels/${pathSlug(city)}`;
    },
    tracking: {
      source: "affiliate",
      partner: env("NEXT_PUBLIC_HW_PID", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on hostel bookings made through Hostelworld. Social scores are snapshot data from Hostelworld listings; nightly prices are shown as budget-tier estimates only, and Hostelworld always displays the live rate.",
  },
  safetywing: {
    id: "safetywing",
    name: "SafetyWing",
    network: "SafetyWing ambassador program",
    baseUrl: "https://safetywing.com",
    tracking: {
      referenceID: env("NEXT_PUBLIC_SW_REF", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns a referral fee when you purchase SafetyWing Nomad Insurance through our links. We are not an insurance broker; policy terms, pricing, and eligibility are set entirely by SafetyWing and can change without notice.",
  },
  "twelve-go": {
    id: "twelve-go",
    name: "12Go",
    network: "12Go affiliate program",
    baseUrl: "https://12go.asia/en",
    // 12Go resolves routes by path, not query: /en/travel/bangkok/chiang-mai.
    // The /en/search?q= format redirects to a slug and 404s, and region
    // labels ("The Balkans") have no page at all — fall back to the homepage.
    buildUrl: (destination) => {
      const route = parseRoute(destination);
      if (!route) return "https://12go.asia/en";
      return `https://12go.asia/en/travel/${pathSlug(route.from)}/${pathSlug(route.to)}`;
    },
    tracking: {
      afc: env("NEXT_PUBLIC_12GO_AFC", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on ground and ferry transport booked through 12Go across Asia and select long-haul routes. Schedules and fare tiers are planning estimates; 12Go always shows live availability and pricing.",
  },
  omio: {
    id: "omio",
    name: "Omio",
    network: "Omio affiliate program",
    // Omio's search endpoint needs internal from/to IDs, so free-text deep
    // links cannot be guaranteed; CTAs land on omio.com where the in-page
    // search covers the route named in the surrounding copy.
    baseUrl: "https://www.omio.com",
    tracking: {
      afc: env("NEXT_PUBLIC_OMIO_AFC", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on European train, bus, and ferry bookings made through Omio. Fare tiers shown are planning estimates; Omio always displays live operator pricing.",
  },
};

export const partnerList: AffiliatePartner[] = [
  partners.travelpayouts,
  partners.booking,
  partners.viator,
  partners.cruisedirect,
  partners["expedia-cruises"],
  partners.hostelworld,
  partners.safetywing,
  partners["twelve-go"],
  partners.omio,
];

export function getPartner(id: PartnerId): AffiliatePartner {
  return partners[id];
}

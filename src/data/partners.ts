import type { AffiliatePartner, PartnerId } from "@/types/affiliate";

/**
 * Affiliate partner registry.
 *
 * Affiliate IDs are read from environment variables with documented demo
 * fallbacks so the same code path works locally and in production.
 * Replace the NEXT_PUBLIC_* values at deploy time with live account IDs.
 */
const env = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value && value.length > 0 ? value : fallback;
};

export const partners: Record<PartnerId, AffiliatePartner> = {
  travelpayouts: {
    id: "travelpayouts",
    name: "Travelpayouts",
    network: "Travelpayouts affiliate network",
    baseUrl: "https://tp.media/r",
    tracking: {
      marker: env("NEXT_PUBLIC_TP_MARKER", "at.demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "destination",
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
    baseUrl: "https://www.cruisedirect.com/search",
    tracking: {
      ref: env("NEXT_PUBLIC_CD_REF", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "q",
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns a commission on cruise bookings made through CruiseDirect. Fare ranges and cabin availability shown in our tables are research snapshots; CruiseDirect always shows the live, bookable rate.",
  },
  "expedia-cruises": {
    id: "expedia-cruises",
    name: "Expedia Cruises",
    network: "Expedia Cruises agency program",
    baseUrl: "https://www.expedia.com/cruises",
    tracking: {
      affiliation: env("NEXT_PUBLIC_EXPEDIA_AFF", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "destination",
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
    baseUrl: "https://www.hostelworld.com/search",
    tracking: {
      source: "affiliate",
      partner: env("NEXT_PUBLIC_HW_PID", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "search_keywords",
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on hostel bookings made through Hostelworld. Social scores and nightly prices are snapshot data from Hostelworld listings at the time of writing.",
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
    baseUrl: "https://12go.asia/en/search",
    tracking: {
      afc: env("NEXT_PUBLIC_12GO_AFC", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "q",
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on ground and ferry transport booked through 12Go across Asia and select long-haul routes. Schedules and price bands are snapshots; 12Go always shows live availability.",
  },
  omio: {
    id: "omio",
    name: "Omio",
    network: "Omio affiliate program",
    baseUrl: "https://www.omio.com/search",
    tracking: {
      afc: env("NEXT_PUBLIC_OMIO_AFC", "at-demo"),
      utm_medium: "affiliate",
    },
    dynamicParamMap: {
      destination: "q",
      campaign: "utm_campaign",
      subId: "sub_id",
    },
    relationship:
      "Anchor & Trail earns commissions on European train, bus, and ferry bookings made through Omio. Price bands shown are research snapshots; Omio always displays live operator pricing.",
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

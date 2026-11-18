import type { Deal } from "@/types/affiliate";

/**
 * Featured deals dataset.
 *
 * These six records are the editorial spine of the deals rail. Numeric fields
 * (priceFrom, dailyCost) are research-snapshot ESTIMATE ANCHORS only — they
 * power the tier badge, the "Est. from" copy and the budget filters, and are
 * never rendered as a fixed price. Booking partners always show the live rate.
 * Keep ids stable across edits: article blocks and section pages reference
 * deals by id.
 *
 * Anchor semantics per vertical (keep them aligned or the cards lie):
 * - CRUISE deals: priceFrom = per-person fare, priceUnit = "per person";
 *   dailyCost = round(priceFrom / nights), matching the fare-basis math the
 *   cruise comparison article documents ("fares divided by nights").
 * - BACKPACKING deals: priceFrom = all-in PER-DAY anchor (kept equal to
 *   dailyCost), priceUnit = "per day". The trip total is NOT an anchor — it
 *   describes a route estimate, not a bookable package, so it must never be
 *   labeled "per day" on the card.
 */
export const deals: Deal[] = [
  {
    id: "deal-viking-baltic",
    title: "Viking Homelands: 14 Days from Bergen to Copenhagen",
    vertical: "cruise",
    partner: "cruisedirect",
    badge: "Editor's Choice",
    destination: "The Baltic Sea",
    region: "Northern Europe",
    priceFrom: 8999,
    currency: "USD",
    priceUnit: "per person",
    duration: "14 days · 9 ports",
    // 8999 / 14 nights, per the article's documented fare-basis method.
    dailyCost: 643,
    summary:
      "Viking includes a shore excursion in all nine ports, from Tallinn's walled old town to a Helsinki Design District walk, so the headline fare covers most of what other lines charge for onboard. One ship, no casino, no kids' club, and long Baltic summer evenings that make the sea days feel short.",
    inclusions: [
      "All 9 port shore excursions included",
      "Veranda stateroom with king bed",
      "Beer, wine and specialty dining at no charge",
    ],
    ctaText: "Check Live Rates",
    cruiseLine: "Viking Cruises",
    ship: "Viking Sky",
  },
  {
    id: "deal-regent-mediterranean",
    title: "Regent Seven Seas Grandeur: Western Med & Iberia",
    vertical: "cruise",
    partner: "expedia-cruises",
    badge: "Luxury Pick",
    destination: "Western Mediterranean",
    region: "Mediterranean",
    priceFrom: 11499,
    currency: "USD",
    priceUnit: "per person",
    duration: "11 nights · 7 ports",
    // 11499 / 11 nights — the article separately notes an effective ~$920/day
    // once the bundled first-class air is valued; the anchor stays fare-based.
    dailyCost: 1045,
    summary:
      "Regent bundles first-class air, a pre-cruise hotel night, unlimited shore excursions, gratuities, and every pour onboard into one quoted fare — the closest thing to true all-inclusive that survives a look at your folio. Seven Seas Grandeur launched in 2023 and Iberia sailings typically sell out close to a year ahead.",
    inclusions: [
      "All-suite ship, every cabin has a balcony",
      "Free first-class air + pre-cruise hotel night",
      "Unlimited shore excursions and gratuities",
    ],
    ctaText: "Check Live Rates",
    cruiseLine: "Regent Seven Seas",
    ship: "Seven Seas Grandeur",
  },
  {
    id: "deal-celebrity-alaska",
    title: "Celebrity Beyond: Alaska Glacier Route from Seattle",
    vertical: "cruise",
    partner: "cruisedirect",
    badge: "Best Value",
    destination: "Alaska Inside Passage",
    region: "Alaska",
    priceFrom: 2799,
    currency: "USD",
    priceUnit: "per person",
    duration: "7 nights · round-trip Seattle",
    // 2799 / 7 nights — matches the "about $400 a day in fare" article math.
    dailyCost: 400,
    summary:
      "An Edge-class ship on the Alaska run is unusual — Celebrity normally keeps Beyond in the Caribbean — so this round-trip Seattle itinerary pairs newer hardware with cheap domestic flights. The Endicott Arm and Dawes Glacier day is the scenic anchor, and balcony fares at this level are fair math for a 2026 sailing.",
    inclusions: [
      "Balcony staterooms at the value end of the fare ladder",
      "The Retreat suite tier access optional",
      "Endicott Arm & Dawes Glacier scenic day",
    ],
    ctaText: "Check Live Rates",
    cruiseLine: "Celebrity Cruises",
    ship: "Celebrity Beyond",
  },
  {
    id: "deal-thailand-overland",
    title: "Thailand & Cambodia Overland: Bangkok to Angkor",
    vertical: "backpacking",
    partner: "twelve-go",
    badge: "Route of the Month",
    // Must be a real 12Go route (12go.asia/en/travel/bangkok/siem-reap);
    // region labels like "Thailand & Cambodia" resolve to a 404 there.
    destination: "Bangkok to Siem Reap",
    region: "Southeast Asia",
    // Per-day anchor, not the ~$1,475 trip total — the card renders this as
    // "Est. from $38 per day", so labeling a trip total "per day" would lie.
    priceFrom: 38,
    currency: "USD",
    priceUnit: "per day",
    duration: "21 days · 5 stops",
    dailyCost: 38,
    summary:
      "Every long leg — Bangkok's border bus to Poipet, the onward shuttle to Siem Reap, and the Gulf coast ferries — books in one 12Go cart, which removes the day-of haggling that wrecks most first-timers' budgets. Dorm nights sit firmly at the budget tier, so a shoestring daily spend still covers the three-day Angkor pass and more street food than you should honestly eat.",
    inclusions: [
      "All cross-border trains and ferries booked on 12Go",
      "21 nights in top-rated social hostels",
      "Street-food days that stay pocket-change cheap",
    ],
    ctaText: "Check Live Rates",
  },
  {
    id: "deal-balkans-loop",
    title: "The Balkans Loop: Split, Mostar, Kotor & Dubrovnik",
    vertical: "backpacking",
    partner: "omio",
    badge: "Best Value",
    // Omio deep-search URLs need internal IDs, so the CTA lands on omio.com;
    // the loop's flagship leg is named here and in the card copy.
    destination: "Split to Dubrovnik",
    region: "Balkans",
    // Per-day anchor, not the ~$690 trip total (see route semantics above).
    priceFrom: 32,
    currency: "USD",
    priceUnit: "per day",
    duration: "14 days · 4 countries",
    dailyCost: 32,
    summary:
      "One bus-and-ferry chain stitches four countries together: Split to Mostar over the mountains, Mostar down to Kotor through the bay, then the fast catamaran hop to Dubrovnik to finish. Omio prices every leg up front, dorm beds sit at the region's budget tier, and the daily math stays forgiving without skipping the cheap local wine.",
    inclusions: [
      "Intercity buses and ferries via Omio",
      "Dorm beds at the budget tier, social scores earned nightly",
      "Kotor Bay kayak day included in budget",
    ],
    ctaText: "Check Live Rates",
  },
  {
    id: "deal-colombia-peru",
    title: "Colombia to Peru: Caribbean Coast to Cusco",
    vertical: "backpacking",
    partner: "travelpayouts",
    badge: "Long-Haul Pick",
    destination: "Cartagena to Cusco",
    region: "South America",
    // Per-day anchor, not the ~$1,890 trip total (see route semantics above).
    priceFrom: 46,
    currency: "USD",
    priceUnit: "per day",
    duration: "28 days · 2 countries",
    dailyCost: 46,
    summary:
      "Start on the Caribbean in Cartagena, ride the coast down through Medellín, then take the Bogotá–Lima hop with WayAway cashback before the Sacred Valley legs out of Cusco. Hostel beds and day trips both sit at the backpacker-friendly tier, stretching 28 days into a genuinely long trip without the budget ever feeling fragile.",
    inclusions: [
      "WayAway flight cashback on the Bogotá–Lima hop",
      "Budget-tier hostel stays in Medellín and Cusco",
      "Sacred Valley day trips at backpacker rates",
    ],
    ctaText: "Check Live Rates",
  },
];

export function getDealById(id: string): Deal | undefined {
  return deals.find((deal) => deal.id === id);
}

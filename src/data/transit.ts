import type { TransitRoute } from "@/types/affiliate";

/**
 * Transit routes dataset.
 *
 * Six overland and ferry corridors, each with a price band we snapshot at
 * publish time. Durations are door-to-door estimates including borders and
 * transfers, not operator brochures. Partner is narrowed to "klook" or
 * "omio" by the TransitRoute contract. Flat data, CMS-swappable.
 */
export const transitRoutes: TransitRoute[] = [
  {
    id: "transit-bangkok-chiangmai",
    origin: "Bangkok",
    destination: "Chiang Mai",
    partner: "klook",
    modes: ["Train", "Sleeper Bus"],
    durationLabel: "12–13 h",
    priceLow: 25,
    priceHigh: 45,
    currency: "USD",
    operator: "State Railway of Thailand / Nakhonchai Air",
    region: "Southeast Asia",
    summary:
      "State Railway's overnight sleepers leave Krung Thep Aphiwat in the evening and roll into Chiang Mai around breakfast, with second-class AC berths the sweet spot. Nakhonchai Air's buses are faster on paper and rougher in fact; Klook prices both side by side with e-voucher delivery, which matters over Songkran and Loy Krathong.",
  },
  {
    id: "transit-bangkok-siemreap",
    origin: "Bangkok",
    destination: "Siem Reap",
    partner: "klook",
    modes: ["Bus", "Ferry"],
    durationLabel: "10–11 h",
    priceLow: 32,
    priceHigh: 55,
    currency: "USD",
    operator: "Nattakan / Tonle Sap ferry",
    region: "Southeast Asia",
    summary:
      "The overland route crosses at Poipet, where Nattakan's through-ticket handles the border queue better than any DIY bus-plus-taxi combo we have tried. The Tonle Sap ferry variant adds hours but turns a transfer day into one of the best mornings of the trip when the water level cooperates.",
  },
  {
    id: "transit-hanoi-luangprabang",
    origin: "Hanoi",
    destination: "Luang Prabang",
    partner: "klook",
    modes: ["Sleeper Bus"],
    durationLabel: "22–24 h",
    priceLow: 38,
    priceHigh: 60,
    currency: "USD",
    operator: "Mixed local operators",
    region: "Southeast Asia",
    summary:
      "The 22–24 hour sleeper bus crosses the Lao border at Nameo and climbs through northern Laos' karst country — brutal on the spine, unbeatable for the views. Book a lower bunk, bring earplugs, and remember that mixed local operators mean quality swings departure to departure.",
  },
  {
    id: "transit-lisbon-madrid",
    origin: "Lisbon",
    destination: "Madrid",
    partner: "omio",
    modes: ["Train", "Bus"],
    durationLabel: "10–11 h",
    priceLow: 45,
    priceHigh: 90,
    currency: "USD",
    operator: "Renfe / FlixBus via Omio",
    region: "Iberia",
    summary:
      "There is no direct Lisbon–Madrid rail line, so the realistic choice is between mixed train-and-bus combinations and FlixBus overnight the whole way. Omio's value here is stitching the fastest combination together and pricing it honestly against the budget alternative.",
  },
  {
    id: "transit-split-dubrovnik",
    origin: "Split",
    destination: "Dubrovnik",
    partner: "omio",
    modes: ["Bus", "Ferry"],
    durationLabel: "4–5 h",
    priceLow: 25,
    priceHigh: 40,
    currency: "USD",
    operator: "Arriva / Krilo ferry",
    region: "Balkans",
    summary:
      "Arriva's coast-hugging buses run the Neum corridor all day, while the Krilo catamaran trades the border crossing for Hvar and Korčula stops en route to Dubrovnik's Gruž port. In July and August book the morning departure either way — afternoon buses stack up behind tour coaches.",
  },
  {
    id: "transit-dubrovnik-kotor",
    origin: "Dubrovnik",
    destination: "Kotor",
    partner: "klook",
    modes: ["Bus"],
    durationLabel: "3–3.5 h",
    priceLow: 12,
    priceHigh: 20,
    currency: "USD",
    operator: "Croatia Bus / Montenegro lines",
    region: "Balkans",
    summary:
      "Local coaches leave Dubrovnik's Gruž station for the Debeli Brijeg border and Kotor's old town gate in about three hours, for roughly the price of a nice lunch. Buy the afternoon leg a day ahead in summer; day-trippers moving the other direction clean out the later departures.",
  },
];

export function getTransitRouteById(id: string): TransitRoute | undefined {
  return transitRoutes.find((route) => route.id === id);
}

import type { Hostel } from "@/types/affiliate";

/**
 * Hostels dataset.
 *
 * Six properties on a 10-point guest-review scale (snapshot data) with a
 * social score from 8.5 (fine, quiet) to 9.6 (bring earplugs anyway).
 * Bookings route through Expedia since the Nov 2026 partner change.
 * Prices are nightly, in USD, snapshot-checked at publish time. There is no
 * partner field on the Hostel type — the card component supplies it — so keep
 * the copy honest about what the money buys. Flat data, CMS-swappable.
 */
export const hostels: Hostel[] = [
  {
    id: "hostel-bangkok-dorm",
    name: "Saphan Taksin Social Hostel",
    city: "Bangkok",
    country: "Thailand",
    dormPrice: 11,
    privatePrice: 29,
    currency: "USD",
    rating: 8.9,
    reviewCount: 2640,
    socialScore: 9.3,
    vibe: "Party-forward riverside base",
    perks: [
      "Rooftop bar with river views",
      "Free river shuttle to the Skytrain",
      "Self-service laundry under $3 a load",
      "Curtained bunks with full-size lockers",
    ],
    summary:
      "Party-forward riverside base two minutes from the Saphan Taksin bridge, where the rooftop bar runs until the last bottle and the free shuttle boat keeps the rest of the city reachable. Curtained bunks with full-size lockers mean the party upstairs does not have to follow you to bed.",
  },
  {
    id: "hostel-da-nang-beach",
    name: "Sunrise Beach Hostel",
    city: "Da Nang",
    country: "Vietnam",
    dormPrice: 9,
    privatePrice: 24,
    currency: "USD",
    rating: 9.1,
    reviewCount: 3480,
    socialScore: 8.8,
    vibe: "Beach-social, quieter after 11pm",
    perks: [
      "Beach towels and mats free to borrow",
      "Surfboard and paddleboard rental desk",
      "Hammock deck facing My Khe beach",
      "Common areas close at 11pm",
    ],
    summary:
      "One block off My Khe beach with a hammock deck that draws the evening crowd, but house rules wind the common areas down at 11pm so early risers get their surf mornings. Bunk pods come with privacy curtains, reading lights, and outlets at every bed.",
  },
  {
    id: "hostel-split-marina",
    name: "Marina Split Hostel",
    city: "Split",
    country: "Croatia",
    dormPrice: 18,
    privatePrice: 42,
    currency: "USD",
    rating: 9.0,
    reviewCount: 1860,
    socialScore: 9.6,
    vibe: "Sailor-week energy, book early in July",
    perks: [
      "Rooftop barbecues through regatta weeks",
      "Free luggage storage after checkout",
      "Bikes for the Marjan hill loop",
      "Ferry-port pickup map with local shortcuts",
    ],
    summary:
      "Two streets from the Riva and the ferry port, this is where sail-week crews and indie backpackers end up on the same terrace in July — the 9.6 social score is earned nightly. Dorms fill months ahead of regatta weeks, and the rooftop barbecues are the reason people rebook the following summer.",
  },
  {
    id: "hostel-sarajevo-bb",
    name: "Baščaršija Bunk House",
    city: "Sarajevo",
    country: "Bosnia & Herzegovina",
    dormPrice: 12,
    privatePrice: 30,
    currency: "USD",
    rating: 9.5,
    reviewCount: 1520,
    socialScore: 8.5,
    vibe: "Cozy, family-run, tea on arrival",
    perks: [
      "Bosnian coffee and tea on arrival",
      "Free walking tour meets at the door",
      "Homemade breakfast included",
      "Honest local map of the War Tunnel bus",
    ],
    summary:
      "A family-run bunk house at the edge of the old bazaar where the host pours Bosnian coffee the moment you arrive and walks you to the free walking tour meeting point himself. Quiet by design rather than by rule — most guests are here for the history, not the happy hour.",
  },
  {
    id: "hostel-medellin-social",
    name: "El Poblado Social House",
    city: "Medellín",
    country: "Colombia",
    dormPrice: 14,
    privatePrice: 38,
    currency: "USD",
    rating: 9.2,
    reviewCount: 4860,
    socialScore: 9.5,
    vibe: "The classic Gringo Petra social scene",
    perks: [
      "Family-style dinner cooked nightly",
      "Rooftop cinema on Fridays",
      "Free Spanish classes twice a week",
      "Guided pub crawl with resident hosts",
    ],
    summary:
      "The social anchor of the Gringo Petra strip — family-style dinners cooked nightly, rooftop cinema on Fridays, and a pub crawl that actually explains the neighborhood instead of just passing through it. Dorms are standard pods; the community is the product.",
  },
  {
    id: "hostel-lisbon-alfama",
    name: "Alfama Rooftop House",
    city: "Lisbon",
    country: "Portugal",
    dormPrice: 22,
    privatePrice: 58,
    currency: "USD",
    rating: 8.8,
    reviewCount: 940,
    socialScore: 8.6,
    vibe: "Chill rooftop, older backpacker crowd",
    perks: [
      "Sunset rooftop over the Alfama roofs",
      "Bottomless espresso in the guest kitchen",
      "Weekly fado night in the courtyard",
      "Free laundry on stays over five nights",
    ],
    summary:
      "A calmer rooftop house in Alfama for travelers aging out of party hostels — espresso until late, fado in the courtyard on Fridays, and the 28 tram one street down. It prices above the Baixa dorms, but you sleep, and the sunset from the roof earns the difference.",
  },
];

export function getHostelById(id: string): Hostel | undefined {
  return hostels.find((hostel) => hostel.id === id);
}

import type { Stay } from "@/types/affiliate";

/**
 * Hotel stays dataset.
 *
 * Six properties on Booking.com's 10-point review scale, chosen for port
 * proximity on cruise itineraries and neighborhood quality on backpacking
 * ones. There is intentionally no partner field on the Stay type — Booking.com
 * is implied editorially — so keep the copy mentioning the platform where it
 * matters. Structured as flat data for a straightforward CMS swap.
 */
export const stays: Stay[] = [
  {
    id: "stay-barcelona-port-lux",
    name: "Port Vell Grand Hotel",
    city: "Barcelona",
    country: "Spain",
    tier: "luxury",
    rating: 9.2,
    reviewCount: 512,
    priceFrom: 340,
    currency: "USD",
    perks: [
      "Rooftop pool over the Port Vell marina",
      "Breakfast from 6:30am for early boarding",
      "Guaranteed late checkout on cruise days",
      "Blackout blinds and quiet-facing rooms",
    ],
    summary:
      "On the Moll Adossat side of Port Vell, so embarkation morning is an eight-minute walk with your bags instead of a taxi gamble. The 6:30am breakfast, late checkout on cruise days, and a rooftop pool over the marina earn its 9.2 across 500-plus Booking.com reviews.",
    nearPort: true,
    walkToPort: "8-min walk to the cruise terminal at Moll Adossat",
  },
  {
    id: "stay-copenhagen-nordic",
    name: "Nordhavn Harbor Hotel",
    city: "Copenhagen",
    country: "Denmark",
    tier: "luxury",
    rating: 9.0,
    reviewCount: 468,
    priceFrom: 285,
    currency: "USD",
    perks: [
      "Harbor-view rooms in the converted silo building",
      "Shuttle stop to the Oceankaj cruise piers at the door",
      "Harborside sauna",
      "Bike loan included in the rate",
    ],
    summary:
      "Sits in the regenerated Nordhavn docklands, a 12-minute walk to the Oceankaj shuttle stop, with harbor-view rooms in the converted silo block. Booking.com reviewers rate the sauna and the breakfast breads; the metro into Nyhavn runs every few minutes from the door.",
    nearPort: true,
    walkToPort: "12-min walk to Oceankaj cruise piers via shuttle stop",
  },
  {
    id: "stay-seattle-pike",
    name: "Pike Market Inn",
    city: "Seattle",
    country: "USA",
    tier: "luxury",
    rating: 8.8,
    reviewCount: 604,
    priceFrom: 225,
    currency: "USD",
    perks: [
      "Pre-cruise luggage hold before check-in",
      "Specialty-roaster coffee bar each morning",
      "Pier 66 taxi rank on the corner",
      "Soundproofed compact rooms",
    ],
    summary:
      "A boutique inn tucked above the Pike Place market doors, ten minutes by taxi to the Pier 66 cruise terminal and a short walk to the waterfront restaurants. Rooms are compact but soundproofed, and the desk holds luggage the morning you disembark.",
    nearPort: true,
    walkToPort: "10-min taxi to Pier 66 embarkation",
  },
  {
    id: "stay-bangkok-riverside",
    name: "Chao Phraya Riverside Guesthouse",
    city: "Bangkok",
    country: "Thailand",
    tier: "budget",
    rating: 8.6,
    reviewCount: 1240,
    priceFrom: 48,
    currency: "USD",
    perks: [
      "Express boat pier two minutes away",
      "Dawn rice-soup breakfast in the family kitchen",
      "Fan and air-con rooms both available",
      "Riverside hammock terrace",
    ],
    summary:
      "A family-run guesthouse on the Thonburi bank where the orange-flag express boat reaches Saphan Taksin and the Skytrain in about twenty minutes. Rooms are simple, the riverside terrace does the heavy lifting, and at this price you can stretch a Bangkok stay into a full week without thinking.",
    nearPort: false,
  },
  {
    id: "stay-mostar-heritage",
    name: "Old Bridge Heritage Rooms",
    city: "Mostar",
    country: "Bosnia & Herzegovina",
    tier: "budget",
    rating: 9.1,
    reviewCount: 411,
    priceFrom: 55,
    currency: "USD",
    perks: [
      "Old Bridge view from the top-floor rooms",
      "Bosnian coffee on arrival",
      "Homemade breakfast included",
      "Free parking for rental cars",
    ],
    summary:
      "Stone-walled rooms in a restored Ottoman house on the east bank, close enough to Stari Most to hear the summer divers. The host family pours Bosnian coffee on arrival and will map out the Kravica Waterfall bus before you finish the cup — the reason it holds a 9.1 on Booking.com.",
    nearPort: false,
  },
  {
    id: "stay-medellin-loft",
    name: "El Poblado Loft Rooms",
    city: "Medellín",
    country: "Colombia",
    tier: "budget",
    rating: 8.9,
    reviewCount: 890,
    priceFrom: 42,
    currency: "USD",
    perks: [
      "Rooftop coworking desk with city views",
      "Fast fiber wifi in every room",
      "Airport shuttle on request",
      "Two blocks from Parque Lleras nightlife",
    ],
    summary:
      "Converted loft rooms on a quiet street in El Poblado, Medellín's most walkable barrio for visitors, ten minutes on foot from the metro station. Fast wifi and a rooftop desk make it the pick for slower travelers working between day trips.",
    nearPort: false,
  },
];

export function getStayById(id: string): Stay | undefined {
  return stays.find((stay) => stay.id === id);
}

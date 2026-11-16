import type { Tour } from "@/types/affiliate";

/**
 * Tours dataset.
 *
 * Nine hand-picked excursions, all bookable through Viator. Ratings and
 * review counts are snapshots from Viator listings at the time of writing
 * and should be refreshed when the array is moved to a CMS collection.
 * Keep ids stable: article blocks embed tour cards by id.
 */
export const tours: Tour[] = [
  {
    id: "tour-santorini-catamaran",
    title: "Santorini Sunset Catamaran Cruise with BBQ & Drinks",
    partner: "viator",
    destination: "Santorini, Greece",
    region: "Mediterranean",
    vertical: "cruise",
    durationHours: 5,
    rating: 4.8,
    reviewCount: 2840,
    priceFrom: 149,
    currency: "USD",
    summary:
      "Sail the caldera rim past Akrotiri's red and white cliffs with swim stops at the volcanic hot springs, then eat grilled souvlaki off the onboard BBQ as the sun drops behind Therasia. Nea Kameni's sulfur vents come with a guide explaining the eruption history, and the crew hands out towels — bring a layer for the sail back to Vlychada.",
    tags: ["Water", "Shore Excursion", "Food"],
  },
  {
    id: "tour-rome-colosseum-underground",
    title: "Colosseum Underground & Arena Floor Guided Tour",
    partner: "viator",
    destination: "Civitavecchia (Rome), Italy",
    region: "Mediterranean",
    vertical: "cruise",
    durationHours: 3,
    rating: 4.7,
    reviewCount: 4620,
    priceFrom: 98,
    currency: "USD",
    summary:
      "Descend into the hypogeum beneath the arena floor — the two-level maze of lifts and cages where gladiator staging actually happened — then step up onto the reconstructed arena itself with an archaeologist-led small group. Skip-the-line entry to the Roman Forum and Palatine Hill is included afterward, timed so you are never rushed back to the ship.",
    tags: ["Shore Excursion", "History", "Skip-the-Line"],
  },
  {
    id: "tour-copenhagen-canal",
    title: "Copenhagen Canal & Harbor Sightseeing by Boat",
    partner: "viator",
    destination: "Copenhagen, Denmark",
    region: "Baltic",
    vertical: "cruise",
    durationHours: 2,
    rating: 4.6,
    reviewCount: 2410,
    priceFrom: 42,
    currency: "USD",
    summary:
      "Two hours through Nyhavn's postcard row, past the Little Mermaid, and into the Christianshavn houseboat canals with live Danish narration and an English audio channel. The covered boats matter more than you think on a Baltic afternoon — this is the version to book in shoulder season.",
    tags: ["Water", "City Orientation", "Shore Excursion"],
  },
  {
    id: "tour-juneau-whale-glacier",
    title: "Juneau Whale Watching & Mendenhall Glacier Combo",
    partner: "viator",
    destination: "Juneau, Alaska",
    region: "Alaska",
    vertical: "cruise",
    durationHours: 6.5,
    rating: 4.9,
    reviewCount: 3120,
    priceFrom: 189,
    currency: "USD",
    summary:
      "A fast catamaran out to the humpback feeding grounds with a naturalist narrating bubble-net feeding, followed by a shuttle to Mendenhall Glacier for the visitor center and the Photo Point trail. Travel time from the cruise dock is under 30 minutes each way, and the operator logs whale sightings on essentially every sailing in recent seasons.",
    tags: ["Wildlife", "Shore Excursion", "Water"],
  },
  {
    id: "tour-bangkok-street-food",
    title: "Bangkok Backstreets Street Food Tuk-Tuk Tour",
    partner: "viator",
    destination: "Bangkok, Thailand",
    region: "Southeast Asia",
    vertical: "backpacking",
    durationHours: 4,
    rating: 4.8,
    reviewCount: 5240,
    priceFrom: 38,
    currency: "USD",
    summary:
      "A tuk-tuk convoy through Yaowarat's back alleys for boat noodles, charcoal-grilled squid, and Thai desserts you would never find alone, led by an English-speaking local guide. Seven tastings plus a cold beer at the final stop are included — arrive hungry and skip lunch.",
    tags: ["Food", "Nightlife", "Walking"],
  },
  {
    id: "tour-hoi-an-cooking",
    title: "Hoi An Farm-to-Table Vietnamese Cooking Class",
    partner: "viator",
    destination: "Hoi An, Vietnam",
    region: "Southeast Asia",
    vertical: "backpacking",
    durationHours: 5,
    rating: 4.9,
    reviewCount: 3810,
    priceFrom: 29,
    currency: "USD",
    summary:
      "Start at Tra Que vegetable village picking herbs with the farmers, then cook four Vietnamese classics — including Cao Lau, the noodle dish made properly only in Hoi An — in an open-air riverside kitchen. Market tour, emailed recipes afterward, and vegetarian swaps handled without fuss.",
    tags: ["Food", "Culture", "Class"],
  },
  {
    id: "tour-kotor-kayak",
    title: "Kotor Bay Sea Kayak & Old Town Swim Stop",
    partner: "viator",
    destination: "Kotor, Montenegro",
    region: "Balkans",
    vertical: "both",
    durationHours: 3,
    rating: 4.7,
    reviewCount: 1240,
    priceFrom: 54,
    currency: "USD",
    summary:
      "Easy paddling across Kotor Bay's glassy water below the fortress walls, with a swim stop under the San Giovanni battlements and a guide who grew up in the old town. Double kayaks, dry bags, and no experience required — the bay is sheltered enough for first-timers.",
    tags: ["Water", "Adventure", "Shore Excursion"],
  },
  {
    id: "tour-medellin-graffiti",
    title: "Comuna 13 Graffiti & Cable Car History Tour",
    partner: "viator",
    destination: "Medellín, Colombia",
    region: "South America",
    vertical: "backpacking",
    durationHours: 3,
    rating: 4.8,
    reviewCount: 6480,
    priceFrom: 26,
    currency: "USD",
    summary:
      "Walk Comuna 13's graffiti-lined escaleras with a resident guide who lived through the 1990s and the 2002 operation, then ride the Metrocable for hillside views over the valley. The fee splits with the neighborhood's artist collective, which is why the street art stops feel like a conversation rather than a show.",
    tags: ["Culture", "History", "Walking"],
  },
  {
    id: "tour-bled-lake-row",
    title: "Lake Bled Traditional Pletna Rowing Experience",
    partner: "viator",
    destination: "Lake Bled, Slovenia",
    region: "Balkans",
    vertical: "backpacking",
    durationHours: 2,
    rating: 4.6,
    reviewCount: 940,
    priceFrom: 31,
    currency: "USD",
    summary:
      "Ride a traditional pletna to Bled Island with an oarsman from one of the families that has rowed the lake for generations, then climb the stone steps to ring the wishing bell at the Church of the Assumption. The pletna trade is a licensed 19th-century monopoly and the rowers will happily explain it — stick around afterward for the obligatory Bled cream cake.",
    tags: ["Water", "Culture", "Family"],
  },
];

export function getTourById(id: string): Tour | undefined {
  return tours.find((tour) => tour.id === id);
}

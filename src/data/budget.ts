import type { BudgetRate } from "@/types/affiliate";

/**
 * Per-destination budget rate table, consumed by lib/calculator.ts.
 *
 * cruiseDaily and backpackingDaily are all-in daily spend per person as
 * [low, high] tuples in USD; flightLow/flightHigh are round-trip economy
 * fares from the US. Rates are research snapshots for 2025–2026 planning
 * and are structured as flat data so a live pricing feed or CMS collection
 * can replace the static array without touching the calculator. The id
 * values double as destinationId inputs for computeTripCost — do not rename.
 */
export const budgetRates: BudgetRate[] = [
  {
    id: "dest-mediterranean",
    destination: "The Mediterranean",
    region: "Europe",
    cruiseDaily: [350, 520],
    backpackingDaily: [45, 75],
    flightLow: 650,
    flightHigh: 1100,
    currency: "USD",
  },
  {
    id: "dest-greek-islands",
    destination: "Greek Islands",
    region: "Europe",
    cruiseDaily: [380, 560],
    backpackingDaily: [50, 80],
    flightLow: 700,
    flightHigh: 1150,
    currency: "USD",
  },
  {
    id: "dest-baltic",
    destination: "Baltic Sea",
    region: "Europe",
    cruiseDaily: [400, 600],
    backpackingDaily: [70, 110],
    flightLow: 600,
    flightHigh: 1000,
    currency: "USD",
  },
  {
    id: "dest-alaska",
    destination: "Alaska",
    region: "North America",
    cruiseDaily: [300, 450],
    backpackingDaily: [85, 130],
    flightLow: 380,
    flightHigh: 700,
    currency: "USD",
  },
  {
    id: "dest-caribbean",
    destination: "Caribbean",
    region: "North America",
    cruiseDaily: [220, 360],
    backpackingDaily: [55, 90],
    flightLow: 320,
    flightHigh: 640,
    currency: "USD",
  },
  {
    id: "dest-southeast-asia",
    destination: "Southeast Asia",
    region: "Asia",
    cruiseDaily: [260, 400],
    backpackingDaily: [28, 45],
    flightLow: 620,
    flightHigh: 1050,
    currency: "USD",
  },
  {
    id: "dest-balkans",
    destination: "The Balkans",
    region: "Europe",
    cruiseDaily: [300, 450],
    backpackingDaily: [30, 48],
    flightLow: 550,
    flightHigh: 950,
    currency: "USD",
  },
  {
    id: "dest-south-america",
    destination: "South America",
    region: "South America",
    cruiseDaily: [280, 420],
    backpackingDaily: [35, 60],
    flightLow: 480,
    flightHigh: 900,
    currency: "USD",
  },
  {
    id: "dest-central-america",
    destination: "Central America",
    region: "Central America",
    cruiseDaily: [240, 380],
    backpackingDaily: [32, 55],
    flightLow: 380,
    flightHigh: 720,
    currency: "USD",
  },
  {
    id: "dest-japan",
    destination: "Japan",
    region: "Asia",
    cruiseDaily: [340, 520],
    backpackingDaily: [55, 90],
    flightLow: 700,
    flightHigh: 1200,
    currency: "USD",
  },
];

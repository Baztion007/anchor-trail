import { budgetRates } from "@/data/budget";
import type {
  ChecklistItem,
  TripCostInput,
  TripCostResult,
} from "@/types/affiliate";

const MIN_DAYS = 1;
const MAX_DAYS = 365;
const MIN_TRAVELERS = 1;
const MAX_TRAVELERS = 8;

export class UnknownDestinationError extends Error {
  constructor(destinationId: string) {
    super(`No budget rate found for destination "${destinationId}"`);
    this.name = "UnknownDestinationError";
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

/**
 * Pure trip-cost estimator. All rates come from data/budget.ts so the
 * numbers stay swappable with a live pricing feed later.
 */
export function computeTripCost(input: TripCostInput): TripCostResult {
  const rate = budgetRates.find((r) => r.id === input.destinationId);
  if (!rate) {
    throw new UnknownDestinationError(input.destinationId);
  }

  const days = clamp(input.days, MIN_DAYS, MAX_DAYS);
  const travelers = clamp(input.travelers, MIN_TRAVELERS, MAX_TRAVELERS);

  const [dailyLow, dailyHigh] =
    input.style === "cruise" ? rate.cruiseDaily : rate.backpackingDaily;

  const cruisePortTax = input.style === "cruise" ? 92 : 0;

  const perPersonLow = days * dailyLow;
  const perPersonHigh = days * dailyHigh + cruisePortTax;
  const flightLow = rate.flightLow * travelers;
  const flightHigh = rate.flightHigh * travelers;

  const totalLow = perPersonLow * travelers + flightLow;
  const totalHigh = perPersonHigh * travelers + flightHigh;

  const checklist: ChecklistItem[] = [
    {
      category: "flights",
      partner: "travelpayouts",
      heading: "Lock in flights",
      copy: `Round-trip fares to ${rate.destination} have typically run $${rate.flightLow.toLocaleString("en-US")}–$${rate.flightHigh.toLocaleString("en-US")} per person from the US (a planning estimate — live fares move daily). WayAway's cashback tiers frequently beat standard fares on this corridor.`,
      cta: "Compare flight fares",
      link: {
        partner: "travelpayouts",
        destination: rate.destination,
        campaign: "calculator-flights",
      },
    },
    {
      category: "stays",
      partner: input.style === "cruise" ? "booking" : "hostelworld",
      heading:
        input.style === "cruise"
          ? "Book a pre-cruise hotel near the port"
          : "Find stays that fit the daily budget",
      copy:
        input.style === "cruise"
          ? `One night near the embarkation port has typically landed around $${Math.round(dailyLow * 0.55).toLocaleString("en-US")}–$${Math.round(dailyHigh * 0.4).toLocaleString("en-US")} (estimate). Book inside the port district so a morning delay never threatens boarding.`
          : `At roughly $${dailyLow.toLocaleString("en-US")}–$${dailyHigh.toLocaleString("en-US")} per day all-in (estimate), target dorms and private rooms in the lower half of that band.`,
      cta: input.style === "cruise" ? "Check port hotels" : "Search hostels & rooms",
      link: {
        partner: input.style === "cruise" ? "booking" : "hostelworld",
        // staysQuery is a concrete "City, Country" — Booking's `ss` and
        // Hostelworld's /hostels/{city} both resolve it. Region names don't.
        destination: rate.staysQuery,
        campaign: "calculator-stays",
      },
    },
    {
      category: "activities",
      partner: "viator",
      heading: "Reserve the anchor activities",
      copy: `Plan on roughly $${Math.round(dailyLow * 0.25).toLocaleString("en-US")}–$${Math.round(dailyHigh * 0.22).toLocaleString("en-US")} per activity day in ${rate.destination} (estimate). Booking two anchor tours in advance protects the rest of your budget.`,
      cta: "Browse tours & excursions",
      link: {
        partner: "viator",
        destination: rate.activitiesQuery,
        campaign: "calculator-activities",
      },
    },
    {
      category: "insurance",
      partner: "safetywing",
      heading: "Insure the trip itself",
      copy: `SafetyWing Nomad Insurance covers this trip profile from roughly $56 per 4 weeks for travelers under 40 (estimate), including emergency medical and evacuation. For a ${days}-day trip, that math almost always beats the airline checkout upsell.`,
      cta: "Get a quick quote",
      link: {
        partner: "safetywing",
        destination: rate.destination,
        campaign: "calculator-insurance",
      },
    },
  ];

  // Only offer the transit checklist when the region has a verified 12Go
  // route — a region label ("The Balkans") would 404 on 12go.asia.
  if (input.style === "backpacking" && rate.transitRoute) {
    checklist.push({
      category: "transit",
      partner: "twelve-go",
      heading: "Book cross-border transit early",
      copy: `Overland and ferry legs in this region swing 30–60% in price inside two weeks of departure. Reserving the long legs first keeps the rest of your ${days}-day plan flexible.`,
      cta: "Compare buses, trains & ferries",
      link: {
        partner: "twelve-go",
        destination: rate.transitRoute,
        campaign: "calculator-transit",
      },
    });
  }

  return {
    destination: rate.destination,
    totalLow: Math.round(totalLow),
    totalHigh: Math.round(totalHigh),
    perPersonLow: Math.round(perPersonLow),
    perPersonHigh: Math.round(perPersonHigh),
    perDayLow: Math.round(dailyLow),
    perDayHigh: Math.round(dailyHigh),
    checklist,
  };
}

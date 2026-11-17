import type { Deal, Hostel, InsurancePlan, Stay, TransitRoute, Tour } from "@/types/affiliate";

/* ------------------------------------------------------------------ */
/* Budget-tier system                                                  */
/* ------------------------------------------------------------------ */

/**
 * Site-wide budget tier vocabulary, per the pricing strategy:
 * listings never render a hardcoded exact price. Instead they carry a
 * Budget Tier badge plus (optionally) a clearly labeled "Est. from" anchor.
 */
export type PriceTier = 1 | 2 | 3;

export const TIER_LABELS: Record<PriceTier, string> = {
  1: "$ Budget",
  2: "$$ Mid-range",
  3: "$$$ Luxury",
} as const;

export const TIER_SYMBOLS: Record<PriceTier, string> = {
  1: "$",
  2: "$$",
  3: "$$$",
} as const;

/**
 * Format a numeric anchor as an explicit estimate. The number is a research
 * snapshot used for budgeting only — the booking partner always shows the
 * live, bookable rate.
 */
export function formatEstimateFrom(amount: number, currency = "USD"): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
  return `Est. from ${formatted}`;
}

/* ------------------------------------------------------------------ */
/* Per-listing tier mapping                                            */
/* ------------------------------------------------------------------ */

/**
 * Cruise deals are luxury by definition; backpacking deals price at the
 * budget tier of their region. dailyCost (all-in per-day anchor) decides
 * within the backpacking band.
 */
export function dealTier(deal: Deal): PriceTier {
  if (deal.vertical === "cruise") return 3;
  if (deal.dailyCost < 35) return 1;
  return 2;
}

/** Tours: sub-$50 is pocket money, $50–$120 a mid-range splurge, above that premium. */
export function tourTier(tour: Tour): PriceTier {
  if (tour.priceFrom < 50) return 1;
  if (tour.priceFrom <= 120) return 2;
  return 3;
}

/** Stays carry an editorial tier field already — map it directly. */
export function stayTier(stay: Stay): PriceTier {
  return stay.tier === "luxury" ? 3 : 1;
}

/** Hostel dorms are always budget tier; privates sit mid-range. */
export function hostelTier(hostel: Hostel, room: "dorm" | "private"): PriceTier {
  return room === "dorm" ? 1 : 2;
}

/** Transit legs: midpoint of the research band decides the tier. */
export function transitTier(route: TransitRoute): PriceTier {
  const mid = (route.priceLow + route.priceHigh) / 2;
  if (mid < 30) return 1;
  if (mid <= 70) return 2;
  return 3;
}

/** Insurance: Essential plans are budget tier, Complete is mid-range. */
export function insuranceTier(plan: InsurancePlan): PriceTier {
  return plan.id.includes("complete") ? 2 : 1;
}

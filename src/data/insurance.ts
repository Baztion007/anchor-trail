import type { InsurancePlan } from "@/types/affiliate";

/**
 * Travel insurance dataset.
 *
 * Three SafetyWing Nomad Insurance plans at the per-4-weeks price points we
 * verify at publish time. Policy terms change without notice — every card on
 * site should carry the disclosure that SafetyWing sets pricing and coverage,
 * not us. Flat data, CMS-swappable; keep ids stable.
 */
export const insurancePlans: InsurancePlan[] = [
  {
    id: "ins-essential-under-39",
    name: "Nomad Insurance Essential",
    partner: "safetywing",
    price: 56.1,
    priceLabel: "$56.10",
    periodLabel: "per 4 weeks · under 40",
    medicalLimit: "Up to $250,000 emergency medical",
    deductibleLabel: "$100 deductible per claim",
    bestFor: "Backpackers & short cruise gaps",
    coverageHighlights: [
      "Emergency medical & evacuation worldwide",
      "Covers adventure activities like kayaking",
      "Buy-while-abroad, monthly rolling subscription",
    ],
    summary:
      "The budget backbone of our insurance picks: monthly rolling cover you can buy mid-trip, with emergency medical, evacuation, and adventure activities like kayaking and trekking up to 4,500 m included. For backpackers and short cruise gaps, the math beats any airline-checkout upsell we have tested.",
  },
  {
    id: "ins-essential-39-69",
    name: "Nomad Insurance Essential (40–69)",
    partner: "safetywing",
    price: 102.1,
    priceLabel: "$102.10",
    periodLabel: "per 4 weeks · ages 40–69",
    medicalLimit: "Up to $250,000 emergency medical",
    deductibleLabel: "$100 deductible per claim",
    bestFor: "Older travelers & cruise add-on days",
    coverageHighlights: [
      "Emergency medical & evacuation worldwide",
      "Adventure activities covered like the under-40 plan",
      "Buy-while-abroad, no medical exam",
    ],
    summary:
      "The same Essential structure priced for the 40–69 band, and the practical answer for travelers adding cover to a cruise leg or an overland loop late in planning. Enrollment takes minutes online, with no medical exam and no per-trip paperwork.",
  },
  {
    id: "ins-complete",
    name: "Nomad Insurance Complete",
    partner: "safetywing",
    price: 150.6,
    priceLabel: "$150.60",
    periodLabel: "per 4 weeks · under 40",
    medicalLimit: "Up to $2,500,000 with trip interruption",
    deductibleLabel: "$0 deductible for emergency medical claims",
    bestFor: "Long cruises & remote regions",
    coverageHighlights: [
      "Emergency medical & evacuation up to $2,500,000",
      "Trip interruption and baggage delay reimbursement",
      "Natural disaster evacuation benefit",
      "Optional adventure sports upgrade",
    ],
    summary:
      "Complete layers trip interruption, baggage delay, and natural-disaster evacuation on top of a much higher medical ceiling, which is what you want once an itinerary leaves easy medevac range. It runs nearly three times the Essential price, so we only recommend it when the route genuinely demands it.",
  },
];

export function getInsurancePlanById(id: string): InsurancePlan | undefined {
  return insurancePlans.find((plan) => plan.id === id);
}

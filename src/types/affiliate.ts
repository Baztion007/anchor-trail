import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Core identity types                                                 */
/* ------------------------------------------------------------------ */

export type PartnerId =
  | "travelpayouts"
  | "booking"
  | "viator"
  | "cruisedirect"
  | "expedia-cruises"
  | "hostelworld"
  | "safetywing"
  | "twelve-go"
  | "omio";

export type Vertical = "cruise" | "backpacking";
export type TourVertical = Vertical | "both";
export type StyleValue = "all" | Vertical;

/* ------------------------------------------------------------------ */
/* Affiliate engine                                                    */
/* ------------------------------------------------------------------ */

export interface AffiliatePartner {
  id: PartnerId;
  name: string;
  network: string;
  baseUrl: string;
  /** Static query params always appended (affiliate id, medium, etc.) */
  tracking: Record<string, string>;
  /**
   * Partner-specific URL builder. When present it receives the raw destination
   * string and returns the full pre-tracking URL (path + core query params).
   * Used by partners whose search URLs are path-based or conditional rather
   * than a simple dynamic query key — e.g. 12Go route pages
   * (/en/travel/{from}/{to}) or Hostelworld city pages (/hostels/{city}).
   * When absent, the destination is mapped onto dynamicParamMap.destination.
   */
  buildUrl?: (destination: string) => string;
  /** Which query keys receive dynamic destination/campaign/subId values */
  dynamicParamMap?: {
    destination?: string;
    campaign?: string;
    subId?: string;
  };
  /** FTC relationship description used on /disclosure */
  relationship: string;
}

export interface AffiliateLinkInput {
  partner: PartnerId;
  destination: string;
  campaign: string;
  subId?: string;
  extraParams?: Record<string, string>;
}

export interface AffiliateLinkProps extends AffiliateLinkInput {
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

/* ------------------------------------------------------------------ */
/* Dataset types                                                       */
/* ------------------------------------------------------------------ */

export interface Deal {
  id: string;
  title: string;
  vertical: Vertical;
  partner: PartnerId;
  badge: string;
  destination: string;
  region: string;
  priceFrom: number;
  currency: "USD";
  priceUnit: "per person" | "per day" | "per night";
  duration: string;
  /** Approximate all-in daily cost used in comparisons */
  dailyCost: number;
  summary: string;
  /** Exactly three key inclusions shown on the card */
  inclusions: [string, string, string];
  ctaText: string;
  cruiseLine?: string;
  ship?: string;
}

export interface Tour {
  id: string;
  title: string;
  partner: PartnerId;
  destination: string;
  region: string;
  vertical: TourVertical;
  durationHours: number;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: "USD";
  summary: string;
  tags: string[];
}

export interface Stay {
  id: string;
  name: string;
  city: string;
  country: string;
  tier: "luxury" | "budget";
  rating: number;
  reviewCount: number;
  priceFrom: number;
  currency: "USD";
  perks: string[];
  summary: string;
  nearPort: boolean;
  walkToPort?: string;
}

export interface Hostel {
  id: string;
  name: string;
  city: string;
  country: string;
  dormPrice: number;
  privatePrice: number;
  currency: "USD";
  rating: number;
  reviewCount: number;
  socialScore: number;
  vibe: string;
  perks: string[];
  summary: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  partner: PartnerId;
  price: number;
  priceLabel: string;
  periodLabel: string;
  medicalLimit: string;
  deductibleLabel: string;
  coverageHighlights: string[];
  bestFor: string;
  summary: string;
}

export interface TransitRoute {
  id: string;
  origin: string;
  destination: string;
  partner: "twelve-go" | "omio";
  modes: string[];
  durationLabel: string;
  priceLow: number;
  priceHigh: number;
  currency: "USD";
  operator: string;
  region: string;
  summary: string;
}

export interface CabinRate {
  id: string;
  cabin: string;
  occupancy: string;
  price: number;
  currency: "USD";
  per: "person" | "cabin";
  availability: "Available" | "Limited" | "Waitlist";
  tone: "good" | "fair" | "warn";
  partner: "cruisedirect" | "expedia-cruises";
  perks: string[];
}

export interface BudgetRate {
  id: string;
  destination: string;
  region: string;
  /** [low, high] all-in daily spend per person for a luxury cruise in the region */
  cruiseDaily: [number, number];
  /** [low, high] all-in daily spend per person backpacking the region */
  backpackingDaily: [number, number];
  flightLow: number;
  flightHigh: number;
  currency: "USD";
  /**
   * A concrete "City, Country" string the stay partners can resolve
   * (Booking.com `ss` search and Hostelworld /hostels/{city} pages).
   * Region names like "The Balkans" resolve nowhere — always keep this
   * specific enough to land on live results.
   */
  staysQuery: string;
  /** A concrete city string for Viator's text search. */
  activitiesQuery: string;
  /**
   * A verified 12Go route ("Origin to Destination") for the cross-border
   * transit checklist, or null when 12Go does not serve the region — the
   * checklist omits the transit item rather than dead-linking it.
   */
  transitRoute: string | null;
}

/* ------------------------------------------------------------------ */
/* Editorial / article types                                           */
/* ------------------------------------------------------------------ */

export interface Author {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  initials: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface TableCell {
  text: string;
  tone?: "good" | "warn" | "bad" | "neutral";
  icon?: "check" | "minus" | "x" | "star" | "alert";
}

export interface ContentRef {
  type: "deal" | "tour" | "stay" | "hostel" | "insurance";
  id: string;
  label: string;
  why: string;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "callout"; variant: "insider" | "money" | "safety"; title: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "table"; caption: string; headers: string[]; rows: TableCell[][]; note?: string }
  | { type: "tour-card"; tourId: string }
  | { type: "deal-card"; dealId: string }
  | { type: "stay-card"; stayId: string }
  | { type: "hostel-card"; hostelId: string }
  | { type: "insurance-banner" }
  | { type: "divider" }
  | { type: "image"; src: string; alt: string; caption?: string; width: number; height: number };

export interface ArticlePick {
  label: string;
  ref: ContentRef;
  note: string;
}

export type ArticleCategory = "cruise" | "backpacking" | "gear-insurance";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  tags: string[];
  /**
   * Concrete embarkation/port city used by the sidebar Booking CTA on cruise
   * guides ("City, Country") — a real search query, never a region label.
   */
  portCity?: string;
  seo: {
    title: string;
    description: string;
    keyword: string;
    secondaryKeywords: string[];
  };
  excerpt: string;
  author: Author;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  heroImage: string;
  heroAlt: string;
  picks: ArticlePick[];
  faqs: Faq[];
  relatedSlugs: string[];
  hubLinks: { label: string; href: string }[];
  blocks: ArticleBlock[];
}

/* ------------------------------------------------------------------ */
/* Calculator                                                          */
/* ------------------------------------------------------------------ */

export interface TripCostInput {
  style: Vertical;
  destinationId: string;
  days: number;
  travelers: number;
}

export interface ChecklistItem {
  category: "flights" | "stays" | "activities" | "insurance" | "transit";
  partner: PartnerId;
  heading: string;
  copy: string;
  cta: string;
  link: AffiliateLinkInput;
}

export interface TripCostResult {
  destination: string;
  totalLow: number;
  totalHigh: number;
  perPersonLow: number;
  perPersonHigh: number;
  perDayLow: number;
  perDayHigh: number;
  checklist: ChecklistItem[];
}

/* ------------------------------------------------------------------ */
/* Shared component prop contracts                                     */
/* ------------------------------------------------------------------ */

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "navy" | "moss" | "terracotta";
}

export interface DealCardProps {
  deal: Deal;
  featured?: boolean;
}

export interface TourCardProps {
  tour: Tour;
  variant?: "full" | "compact";
}

export interface StayCardProps {
  stay: Stay;
}

export interface HostelCardProps {
  hostel: Hostel;
}

export interface TransitCardProps {
  route: TransitRoute;
}

export interface InsuranceBannerProps {
  plans: InsurancePlan[];
  heading?: string;
}

export interface ComparisonTableProps {
  caption: string;
  headers: string[];
  rows: TableCell[][];
  note?: string;
  className?: string;
}

export interface CabinRateTableProps {
  caption: string;
  rates: CabinRate[];
  disclosureNote?: string;
}

export interface SearchTabsProps {
  className?: string;
}

export interface FaqAccordionProps {
  faqs: Faq[];
  heading?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface TocProps {
  items: TocItem[];
}

export interface FilterChipGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
  multi?: boolean;
}

export interface ArticleRendererProps {
  article: Article;
}

export interface PickBoxProps {
  picks: ArticlePick[];
}

export interface AuthorCardProps {
  author: Author;
  compact?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

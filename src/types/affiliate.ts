import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Core identity types                                                 */
/* ------------------------------------------------------------------ */

export type PartnerId =
  | "klook"
  | "go-city"
  | "welcome-pickups"
  | "cruisedirect"
  | "expedia"
  | "safetywing"
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
   * Verbatim-link mode for redirector shortlinks (e.g. Travelpayouts-issued
   * tpx.lu links): the full attribution is encoded in the redirect PATH and
   * the redirector ignores appended query params, so the builder returns the
   * URL untouched — no utm_source/utm_campaign/sub-id additions.
   */
  bareLink?: boolean;
  /**
   * Partner-specific URL builder. When present it receives the raw destination
   * string and returns the full pre-tracking URL (path + core query params).
   * Used by partners whose search URLs are path-based or conditional rather
   * than a simple dynamic query key. When absent, the destination is mapped
   * onto dynamicParamMap.destination.
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
  /**
   * Estimate anchor for the "Est. from" line and tier badge. NEVER render
   * this as a fixed price — booking partners hold the live rate.
   * CRUISE deals: per-person fare (priceUnit "per person"). BACKPACKING
   * deals: all-in per-day anchor, kept equal to dailyCost (priceUnit
   * "per day") — never the trip total, which is not a bookable price.
   */
  priceFrom: number;
  currency: "USD";
  priceUnit: "per person" | "per day" | "per night";
  duration: string;
  /**
   * Approximate all-in daily cost. Drives the budget-tier badge and the
   * hub filter bands; not displayed as an exact figure on cards. Cruise
   * deals: round(priceFrom / nights), matching the articles' fare-basis
   * math. Backpacking deals: equal to priceFrom.
   */
  dailyCost: number;
  summary: string;
  /** Exactly three key inclusions shown on the card */
  inclusions: [string, string, string];
  /** Booking CTA — always "Check Live Rates" or "Check Availability". */
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
  /** Estimate anchor for the "Est. from" chip — never a fixed price. */
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
  /** Estimate anchor for the "Est. from" line — never a fixed price. */
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
  /** Estimate anchors for the dorm/private toggle — never fixed prices. */
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
  /** Estimate anchor rendered as "Est. from" — SafetyWing holds live pricing. */
  price: number;
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
  partner: "klook" | "omio";
  modes: string[];
  durationLabel: string;
  /**
   * Research band powering the fare-tier badge and budget tooling. Displayed
   * only as a tier — the partner always shows the live fare.
   */
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
  /** Estimate anchor for the fare-tier column — never a fixed fare. */
  price: number;
  currency: "USD";
  per: "person" | "cabin";
  availability: "Available" | "Limited" | "Waitlist";
  tone: "good" | "fair" | "warn";
  partner: "cruisedirect" | "expedia";
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
   * A concrete "City, Country" string the stay partner can resolve.
   * The Expedia affiliate link is path-based (destination rides in
   * utm_campaign), so this string is reporting context — keep it specific
   * enough to stay meaningful in reports and campaign data.
   */
  staysQuery: string;
  /** A concrete city string for Go City pass coverage context. */
  activitiesQuery: string;
  /**
   * A concrete route ("Origin to Destination") for the cross-border transit
   * checklist, or null when the region has no featured corridor — the
   * checklist omits the transit item rather than filler-linking it.
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

/**
 * A declarative inline affiliate link inside a paragraph block. `text` is
 * the EXACT substring of the paragraph's prose (case-sensitive) to wrap in
 * an outbound link — the article renderer splits the paragraph on each
 * anchor and mounts an inline AffiliateLink, so monetized prose stays
 * declarative data and every outbound link still flows through the central
 * builder (FTC rel attributes included). Max one link per anchor substring;
 * overlapping anchors are skipped by the renderer.
 */
export interface InlineArticleLink {
  text: string;
  link: AffiliateLinkInput;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string; links?: InlineArticleLink[] }
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
  /**
   * Direct-answer TL;DR that answers the title question in the first screen.
   * Rendered in a "Quick Answer" box above the intro — the single highest-
   * leverage AEO surface (answer engines quote the first direct answer).
   */
  tldr: string;
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

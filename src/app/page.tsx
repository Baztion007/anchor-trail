import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

import { ComparisonTable } from "@/components/affiliate/ComparisonTable";
import { DealsGrid } from "@/components/site/DealsGrid";
import { PriceDisclaimer } from "@/components/site/PriceDisclaimer";
import { SearchTabs } from "@/components/site/SearchTabs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { articles } from "@/data/articles";
import { deals } from "@/data/deals";
import { SITE, itemListJsonLd, jsonLdScript } from "@/lib/seo";
import type { TableCell } from "@/types/affiliate";

export const metadata: Metadata = {
  title: {
    absolute: "Anchor & Trail — Luxury Cruises & Budget Backpacking, Honestly Compared",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anchor & Trail — Luxury Cruises & Budget Backpacking, Honestly Compared",
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: "Anchor & Trail — Luxury Cruises & Budget Backpacking, Honestly Compared",
    description: SITE.description,
  },
};

const COMPARISON_ROWS: TableCell[][] = [
  [
    { text: "Daily cost" },
    { text: "Luxury tier ($$$) — all-in daily math", tone: "good", icon: "check" },
    { text: "Budget tier ($) — all-in daily math", tone: "good", icon: "check" },
  ],
  [
    { text: "Accommodation partner" },
    { text: "Expedia port hotels, 8-min walks to terminals", tone: "neutral", icon: "minus" },
    { text: "Guest-rated social dorms at the budget tier", tone: "neutral", icon: "minus" },
  ],
  [
    { text: "Excursions" },
    { text: "Often included on luxury lines (Viking)", tone: "good", icon: "check" },
    { text: "Day trips booked à la carte in port", tone: "neutral", icon: "minus" },
  ],
  [
    { text: "Insurance" },
    { text: "SafetyWing Complete for long sailings", tone: "neutral", icon: "minus" },
    { text: "SafetyWing Essential, budget-tier monthly cover", tone: "good", icon: "check" },
  ],
];

function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export default function HomePage() {
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* -------------------------------------------------------------- */}
      {/* Split-perspective hero                                          */}
      {/* -------------------------------------------------------------- */}
      <section aria-label="Hero" className="relative overflow-hidden pb-10">
        <div className="relative lg:grid lg:grid-cols-2">
          {/* Left half — luxury cruise */}
          <div className="relative min-h-[300px] overflow-hidden bg-navy lg:z-10 lg:min-h-[560px] lg:[clip-path:polygon(0_0,100%_0,calc(100%_-_6rem)_100%,0_100%)]">
            <Image
              src="/images/hero-cruise.jpg"
              alt="Luxury cruise ship off a Mediterranean coast at golden hour"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10"
            />
            <svg
              aria-hidden="true"
              focusable="false"
              className="pointer-events-none absolute bottom-5 left-0 h-14 w-full"
              viewBox="0 0 600 56"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 34 Q 50 10 100 34 T 200 34 T 300 34 T 400 34 T 500 34 T 600 34"
                stroke="#C5A059"
                strokeOpacity="0.4"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Right half — budget backpacking */}
          <div className="relative min-h-[300px] overflow-hidden bg-moss lg:-ml-24 lg:min-h-[560px]">
            <Image
              src="/images/hero-backpacking.jpg"
              alt="Backpacker on a mountain trail at golden hour"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-moss via-moss/40 to-moss/10"
            />
            <svg
              aria-hidden="true"
              focusable="false"
              className="pointer-events-none absolute bottom-6 right-2 h-24 w-1/2"
              viewBox="0 0 320 120"
              fill="none"
            >
              <path
                d="M8 108 C 70 88, 96 100, 158 66 C 216 34, 250 40, 306 14"
                stroke="#D95D39"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeDasharray="7 9"
                strokeLinecap="round"
              />
              <circle cx="306" cy="14" r="5" stroke="#D95D39" strokeOpacity="0.4" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Scrim above images, below copy */}
          <div aria-hidden="true" className="absolute inset-0 z-20 bg-ink/20" />

          {/* Overlay copy */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
            <p className="eyebrow text-gold-light">— The Travel Bridge —</p>
            <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.1] text-canvas drop-shadow">
              From Cruise Decks to Dorm Beds — Honestly Compared
            </h1>
            <p className="mt-4 max-w-xl text-[15px] text-canvas/85">
              Anchor &amp; Trail reviews both ends of travel: champagne-gold cruise fares and
              shoestring backpacking routes. Real math, independent picks, zero paid placements.
            </p>
          </div>
        </div>

        {/* Quick-search widget straddling both halves */}
        <div className="relative z-30 mx-auto -mt-10 w-full max-w-3xl px-4 lg:-mt-16">
          <SearchTabs />
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Curated deals                                                   */}
      {/* -------------------------------------------------------------- */}
      <section
        aria-label="Curated deals"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="Curated Voyages & Routes"
          title="This Month's Honest Deals"
          description="Six picks across both verticals — three sails, three routes — re-checked monthly against live operator pricing. No paid placements, ever."
          align="center"
        />
        <div className="mt-10">
          <DealsGrid deals={deals} />
        </div>
        <PriceDisclaimer className="mt-6" />
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Two ways to travel comparison                                   */}
      {/* -------------------------------------------------------------- */}
      <section
        aria-label="Two ways to travel comparison"
        className="bg-sand/50 py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Same World, Two Budgets"
            title="Two Ways to Travel, One Honest Matrix"
            description="The same two weeks, two budgets — where each style genuinely wins, and where the marketing gloss wears thin."
          />
          <ComparisonTable
            className="mt-10"
            caption="Luxury cruising versus budget backpacking across the metrics that matter"
            headers={["What You Compare", "Luxury Cruise", "Budget Backpacking"]}
            rows={COMPARISON_ROWS}
            note="We may earn a commission when you book through partner links — full disclosure on our disclosure page."
          />
          <Link
            href="/disclosure"
            className="mt-3 inline-flex min-h-[44px] items-center rounded-md text-[13px] font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-navy-deep motion-safe:transition-colors motion-safe:duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Read the full affiliate disclosure
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Latest guides strip                                             */}
      {/* -------------------------------------------------------------- */}
      <section
        aria-label="Latest travel guides"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Fresh From The Trail & Sea" title="Latest Travel Guides" />
          <Link
            href="/blog"
            className="hidden shrink-0 rounded-md text-[13.5px] font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-navy-deep md:inline-flex md:min-h-[44px] md:items-center md:gap-1.5 motion-safe:transition-colors motion-safe:duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            View all guides
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestArticles.map((article) => (
            <article
              key={article.slug}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-sand bg-paper shadow-sm motion-safe:transition-all motion-safe:duration-200 ease-out motion-safe:hover:-translate-y-0.5"
            >
              <Link
                href={`/blog/${article.slug}`}
                className="flex h-full flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={article.heroImage}
                    alt={article.heroAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-200 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-gold-ink">
                    {article.category === "cruise" ? "Cruise Reviews & Tips" : "Backpacking"}
                  </p>
                  <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-navy">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-mist">{article.excerpt}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-3 text-[12.5px] text-mist">
                    <span className="inline-flex items-center gap-1">
                      <Clock aria-hidden="true" className="size-3.5" />
                      {article.readingMinutes} min read
                    </span>
                    <time
                      dateTime={article.dateModified}
                      className="inline-flex items-center gap-1"
                    >
                      <CalendarDays aria-hidden="true" className="size-3.5" />
                      Updated {formatDate(article.dateModified)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            itemListJsonLd(
              "Latest travel guides",
              latestArticles.map((article) => ({
                name: article.title,
                url: `/blog/${article.slug}`,
              }))
            ),
            itemListJsonLd(
              "Curated deals",
              deals.map((deal) => ({
                name: deal.title,
                url: deal.vertical === "cruise" ? "/cruises" : "/backpacking",
              }))
            ),
          ]),
        }}
      />
    </>
  );
}

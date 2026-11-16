import type { Metadata } from "next";

import { StayCard } from "@/components/affiliate/StayCard";
import { TourCard } from "@/components/affiliate/TourCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { deals } from "@/data/deals";
import { stays } from "@/data/hotels";
import { tours } from "@/data/tours";
import { SITE, breadcrumbJsonLd, itemListJsonLd, jsonLdScript } from "@/lib/seo";
import { CruisesExplorer } from "./CruisesExplorer";

const CRUISE_DEALS = deals.filter((deal) => deal.vertical === "cruise");
const CRUISE_TOURS = tours.filter((tour) => tour.vertical === "cruise");
const PORT_HOTELS = stays.filter((stay) => stay.tier === "luxury" && stay.nearPort);

const TITLE = "Luxury Cruises — Deals, Fare Math & Port Guides";
const DESCRIPTION =
  "Hand-picked luxury cruise fares with honest all-in daily math, shore excursions worth leaving the ship for, and pre-cruise hotels near the terminal.";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/cruises" },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: "/cruises",
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: TITLE,
      description: DESCRIPTION,
    },
  };
}

export default function CruisesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Luxury Cruises" }]} />
      </div>

      <section className="bg-navy text-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow text-gold">— Curated Voyages —</p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
            Luxury Cruises, Honestly Compared
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-canvas/80">
            Every fare is priced against real all-in daily math — excursions, drinks and
            gratuities included only where the line actually includes them. Filter by line,
            region or budget below.
          </p>
          <ul
            aria-label="What this page covers"
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] font-semibold text-canvas/90"
          >
            <li>{CRUISE_DEALS.length} hand-picked fares</li>
            <li aria-hidden="true" className="text-gold">
              •
            </li>
            <li>{CRUISE_TOURS.length} shore tours</li>
            <li aria-hidden="true" className="text-gold">
              •
            </li>
            <li>{PORT_HOTELS.length} port hotels</li>
          </ul>
        </div>
      </section>

      <CruisesExplorer deals={CRUISE_DEALS} tours={CRUISE_TOURS} stays={PORT_HOTELS} />

      <section aria-label="Pre-cruise port hotels" className="bg-sand/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pre-Cruise Hotels"
            title="Sleep Near the Terminal"
            description="Booking.com properties within a taxi-free morning of embarkation — early-enough breakfast, luggage held while you sail."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PORT_HOTELS.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Shore excursions" className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Shore Excursions"
            title="Ports Worth Leaving the Ship For"
            description="Viator day trips vetted against port times — every pick carries a realistic buffer back to the gangway."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {CRUISE_TOURS.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="full" />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Luxury Cruises", href: "/cruises" },
              ],
              "/cruises"
            ),
            itemListJsonLd(
              "Luxury cruise deals",
              CRUISE_DEALS.map((deal) => ({ name: deal.title, url: "/cruises" }))
            ),
          ]),
        }}
      />
    </>
  );
}

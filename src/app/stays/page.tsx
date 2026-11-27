import type { Metadata } from "next";

import { HostelCard } from "@/components/affiliate/HostelCard";
import { InsuranceBanner } from "@/components/affiliate/InsuranceBanner";
import { StayCard } from "@/components/affiliate/StayCard";
import { TourCard } from "@/components/affiliate/TourCard";
import { TransitCard } from "@/components/affiliate/TransitCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GuideTeasers } from "@/components/site/GuideTeasers";
import { PriceDisclaimer } from "@/components/site/PriceDisclaimer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { articles } from "@/data/articles";
import { hostels } from "@/data/hostels";
import { insurancePlans } from "@/data/insurance";
import { stays } from "@/data/hotels";
import { tours } from "@/data/tours";
import { transitRoutes } from "@/data/transit";
import { SITE, breadcrumbJsonLd, itemListJsonLd, jsonLdScript } from "@/lib/seo";

const TITLE = "Excursions & Stays — Tours, Hotels, Hostels & Transit";
const DESCRIPTION =
  "Every tour, hotel, hostel and transit leg we recommend in one place — Go City passes, Expedia stays, and Klook & Omio transit corridors.";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/stays" },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: "/stays",
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

export default function StaysPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Excursions & Stays" }]} />
      </div>

      <section
        aria-label="Excursions and stays overview"
        className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8"
      >
        <p className="eyebrow text-gold-ink">— Excursions & Stays —</p>
        <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight text-navy">
          Tours, Stays &amp; Transit, Picked Honestly
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-mist">
          Every tour, bed and border crossing we recommend, pulled out of the guides into one
          honest shortlist. We never display fixed rates — partners reprice constantly — so each
          card carries a budget tier and a live-rate slot instead. Commissions never change
          the picks.
        </p>
        <PriceDisclaimer className="mt-4 max-w-2xl" />
      </section>

      <section aria-label="Tours and excursions" className="bg-sand/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Go City Picks"
            title="Shore Excursions & Day Trips"
            description="Nine excursions vetted against cruise port times and backpacking budgets — every card links through to live rates and availability."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="full" />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Hotels and port stays" className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Booking.com Picks"
            title="Hotels & Port Stays"
            description="Six properties on Booking.com's 10-point scale — port walks for embarkation mornings, neighborhood picks for everything else. Rates live on Booking.com."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Social hostels" className="bg-sand/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="moss"
            eyebrow="Hostelworld Picks"
            title="Social Hostels, Vetted"
            description="Six hostels where the social score is earned nightly — from party-forward rooftops to family-run bunk houses."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Cross-border transit" className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="moss"
            eyebrow="Klook & Omio"
            title="Cross-Border Transit"
            description="Six overland and ferry corridors with door-to-door durations we would actually defend — book the long legs before the hostels."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {transitRoutes.map((route) => (
              <TransitCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Travel insurance" className="bg-sand/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InsuranceBanner plans={insurancePlans} heading="Insurance, Picked Honestly" />
        </div>
      </section>

      <GuideTeasers
        articles={articles.filter((article) =>
          [
            "best-mediterranean-luxury-cruises-2026",
            "southeast-asia-backpacking-budget-itinerary",
          ].includes(article.slug)
        )}
        eyebrow="From the Guides"
        title="Where These Stays Fit the Trip"
        description="The guides that put these port hotels, hostels, and excursions into full itinerary context — with the daily budgets to match."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Excursions & Stays", href: "/stays" },
              ],
              "/stays"
            ),
            itemListJsonLd(
              "Shore excursions & day trips",
              tours.map((tour) => ({ name: tour.title, url: "/stays" }))
            ),
          ]),
        }}
      />
    </>
  );
}

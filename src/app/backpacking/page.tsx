import type { Metadata } from "next";

import { HostelCard } from "@/components/affiliate/HostelCard";
import { InsuranceBanner } from "@/components/affiliate/InsuranceBanner";
import { TransitCard } from "@/components/affiliate/TransitCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { hostels } from "@/data/hostels";
import { insurancePlans } from "@/data/insurance";
import { transitRoutes } from "@/data/transit";
import { deals } from "@/data/deals";
import { tours } from "@/data/tours";
import { SITE, breadcrumbJsonLd, itemListJsonLd, jsonLdScript } from "@/lib/seo";
import { BackpackingExplorer } from "./BackpackingExplorer";

const BACKPACKING_DEALS = deals.filter((deal) => deal.vertical === "backpacking");
const BACKPACKING_TOURS = tours.filter((tour) => tour.vertical !== "cruise");

const TITLE = "Budget Backpacking — Routes, Hostels & Daily Costs";
const DESCRIPTION =
  "Dorm-first routes across Southeast Asia, the Balkans and South America with honest daily costs, booked-ahead transit legs and hostels worth the bunk.";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/backpacking" },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: "/backpacking",
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

export default function BackpackingPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Budget Backpacking" }]} />
      </div>

      <section className="bg-moss text-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow text-terracotta">— Curated Routes —</p>
          <h1 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3rem)] font-bold leading-tight">
            Budget Backpacking, Honestly Costed
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-canvas/80">
            Routes built on dorm beds, street food and long legs booked early. Every filter below
            works off honest all-in daily costs — see exactly what a $30-a-day world buys.
          </p>
          <ul
            aria-label="What this page covers"
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] font-semibold text-canvas/90"
          >
            <li>{BACKPACKING_DEALS.length} route deals</li>
            <li aria-hidden="true" className="text-terracotta">
              •
            </li>
            <li>{BACKPACKING_TOURS.length} day trips</li>
            <li aria-hidden="true" className="text-terracotta">
              •
            </li>
            <li>{hostels.length} social hostels</li>
          </ul>
        </div>
      </section>

      <BackpackingExplorer
        deals={BACKPACKING_DEALS}
        tours={BACKPACKING_TOURS}
        hostels={hostels}
      />

      <section aria-label="Cross-border transit" className="bg-sand/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="moss"
            eyebrow="Overland & Ferry"
            title="Book the Long Legs Early"
            description="12Go and Omio corridors priced up front — book them before hostels, because the good seats and berths sell first."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {transitRoutes.map((route) => (
              <TransitCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Travel insurance" className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <InsuranceBanner
            plans={insurancePlans}
            heading="Insurance for the Long Way Round"
          />
        </div>
      </section>

      <section aria-label="Social hostels" className="bg-sand/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="moss"
            eyebrow="Social Stays"
            title="Dorms Worth the Bottom Bunk"
            description="Hostelworld picks where the social score is earned, not marketed — curtained bunks, real kitchens, honest vibes."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {hostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
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
                { label: "Budget Backpacking", href: "/backpacking" },
              ],
              "/backpacking"
            ),
            itemListJsonLd(
              "Budget backpacking routes",
              BACKPACKING_DEALS.map((deal) => ({ name: deal.title, url: "/backpacking" }))
            ),
          ]),
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { TripCalculator } from "./TripCalculator";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Trip Budget Calculator — Real Daily Costs, Honest Math",
    description:
      "Pick a travel style, destination, and trip length to estimate real all-in costs from our snapshot 2026 rate table — then walk away with the exact booking checklist we use ourselves.",
    alternates: { canonical: "/calculator" },
  };
}

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Trip Budget Calculator", href: "/calculator" },
              ],
              "/calculator"
            ),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Trip Budget Calculator" },
        ]}
      />

      <p className="eyebrow mt-6 text-gold-ink">— Plan It —</p>
      <h1 className="mt-2 max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Trip Budget Calculator
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">
        Choose a travel style, a destination, and how long you are going. The math runs on our
        snapshot 2026 rate table — all-in daily costs per region plus round-trip flights — and
        every estimate ends with the booking checklist we would use ourselves. No upsells, no
        fake-deal theater: totals are planning estimates, and partners always quote the live
        rate before you pay anything.
      </p>

      <TripCalculator />
    </div>
  );
}

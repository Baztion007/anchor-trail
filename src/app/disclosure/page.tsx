import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EDITORIAL_STANDARDS } from "@/data/editorial";
import { partnerList } from "@/data/partners";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Affiliate Disclosure — How Anchor & Trail Is Funded",
    description:
      "How Anchor & Trail earns money: every affiliate partnership, our editorial standards, and the promise that we never accept paid placements or free trips.",
    alternates: { canonical: "/disclosure" },
  };
}

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Affiliate Disclosure", href: "/disclosure" },
              ],
              "/disclosure"
            ),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Affiliate Disclosure" },
        ]}
      />

      <p className="eyebrow mt-6 text-gold-ink">— The Fine Print, In Plain Words —</p>
      <h1 className="mt-2 font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Affiliate Disclosure
      </h1>

      <div className="mt-5 max-w-[68ch] space-y-4 text-[15px] leading-relaxed text-ink/85">
        <p>
          Anchor &amp; Trail is an independent, reader-funded travel magazine. When you book a
          cruise, a hotel, a tour, or an insurance policy through the links on this site, the
          partner pays us a small commission — typically a low single-digit percentage of the
          booking. The price you pay is exactly the same as booking direct: rates, availability,
          and terms are set entirely by the partners, never by us.
        </p>
        <p>
          Commission never buys a verdict. We do not accept paid placements, sponsored posts,
          comped trips, or &ldquo;preferred partner&rdquo; edits, and no affiliate relationship
          changes what we would recommend to a friend. When a deal is weak, we say so — those
          flags are the point of the site.
        </p>
        <p className="text-[13.5px] text-mist">
          Last updated <time dateTime="2026-01-15">Jan 15, 2026</time>.
        </p>
      </div>

      <nav
        aria-label="Disclosure sections"
        className="mt-8 rounded-lg border border-sand bg-sand/50 p-5"
      >
        <h2 className="font-serif text-lg font-bold text-navy">Partner-by-partner</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {partnerList.map((partner) => (
            <li key={partner.id}>
              <a
                href={`#${partner.id}`}
                className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
              >
                {partner.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {partnerList.map((partner) => (
        <section
          key={partner.id}
          id={partner.id}
          aria-labelledby={`${partner.id}-heading`}
          className="mt-8 scroll-mt-24 border-t border-sand pt-8"
        >
          <h2 id={`${partner.id}-heading`} className="font-serif text-xl font-bold text-navy">
            {partner.name}
          </h2>
          <p className="eyebrow mt-1.5 text-mist">{partner.network}</p>
          <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-ink/85">
            {partner.relationship}
          </p>
        </section>
      ))}

      <section
        id="standards"
        aria-labelledby="standards-heading"
        className="mt-8 scroll-mt-24 border-t border-sand pt-8"
      >
        <h2 id="standards-heading" className="font-serif text-xl font-bold text-navy">
          Editorial Standards
        </h2>
        <ul className="mt-4 max-w-[68ch] space-y-3">
          {EDITORIAL_STANDARDS.map((standard) => (
            <li key={standard} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
              />
              {standard}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

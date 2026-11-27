import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { EDITORIAL_STANDARDS } from "@/data/editorial";
import { partnerList } from "@/data/partners";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Affiliate Disclosure — How Anchor & Trail Is Funded",
    description:
      "The short version: when you book through our links, the partner pays us a commission and you pay the same price. Here is the full list of partners and our standards.",
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

      <div className="mx-auto mt-8 max-w-[68ch]">
        <h1 className="font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
          Affiliate Disclosure
        </h1>

        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/85">
          <p>
            Anchor &amp; Trail is reader-supported. When you book a cruise, hotel,
            tour, transfer, or insurance policy through a link on this site, the
            partner pays us a small commission — and you pay exactly the same
            price you would booking direct.
          </p>
          <p>
            That is the entire business model. No paid placements, no sponsored
            posts, no free trips.
          </p>
        </div>

        <h2 className="mt-10 font-serif text-xl font-bold text-navy">
          How it works
        </h2>
        <ul className="mt-4 space-y-3">
          {[
            "You never pay more. Commissions come out of the partner's margin, not out of your wallet.",
            "We only feature partners we would book with ourselves. If a deal is weak, we say so — those flags are the point of the site.",
            "Commissions never buy a verdict. Rankings, reviews, and recommendations are set by our research, never by the partners.",
          ].map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
              />
              {line}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-serif text-xl font-bold text-navy">
          Our current partners
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/85">
          Every partner we work with today, and what we earn from each:
        </p>
        <ul className="mt-4 divide-y divide-sand rounded-lg border border-sand bg-sand/40">
          {partnerList.map((partner) => (
            <li key={partner.id} id={partner.id} className="scroll-mt-24 p-4">
              <p className="text-[15px] font-semibold text-navy">
                {partner.name}
                <span className="ml-2 text-[12px] font-medium font-sans text-mist">
                  {partner.network}
                </span>
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink/80">
                {partner.relationship}
              </p>
            </li>
          ))}
        </ul>

        <h2
          id="standards"
          className="mt-10 scroll-mt-24 font-serif text-xl font-bold text-navy"
        >
          Editorial standards
        </h2>
        <ul className="mt-4 space-y-3">
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

        <p className="mt-8 text-[13.5px] text-mist">
          Questions about any of this? Write to us via the{" "}
          <a
            href="/about"
            className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            about page
          </a>
          . Last updated <time dateTime="2026-11-27">Nov 27, 2026</time>.
        </p>
      </div>
    </div>
  );
}

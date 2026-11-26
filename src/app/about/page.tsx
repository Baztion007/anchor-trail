import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SectionHeading } from "@/components/site/SectionHeading";
import { siteAuthor } from "@/data/author";
import { EDITORIAL_STANDARDS } from "@/data/editorial";
import { absoluteUrl, breadcrumbJsonLd, jsonLdScript, SITE } from "@/lib/seo";

const STATS: { value: string; label: string }[] = [
  { value: "14", label: "years covering cruises & overland travel" },
  { value: "62", label: "countries on the ground" },
  { value: "23", label: "cruise lines sailed first-hand" },
  { value: "2019", label: "fare & rate tracking, still ongoing" },
];

export function generateMetadata(): Metadata {
  return {
    title: "About Maya Ellison — the Writer Behind Anchor & Trail",
    description:
      "Who reviews the cruises and walks the backpacking routes: Maya Ellison's bio, how Anchor & Trail tests what it recommends, and the editorial standards behind every guide.",
    alternates: { canonical: "/about" },
    openGraph: {
      type: "profile",
      title: "About Maya Ellison — the Writer Behind Anchor & Trail",
      description:
        "Maya Ellison's bio, review methodology, and the editorial standards behind every Anchor & Trail guide.",
      url: absoluteUrl("/about"),
    },
  };
}

export default function AboutPage() {
  const authorJsonLd = {
    "@type": "Person",
    "@id": absoluteUrl("/about#author"),
    name: siteAuthor.name,
    jobTitle: siteAuthor.role,
    description: siteAuthor.credentials,
    url: absoluteUrl("/about"),
    worksFor: { "@id": absoluteUrl("/#organization") },
    knowsAbout: [
      "Luxury cruises",
      "Budget backpacking",
      "Travel deal hunting",
      "Travel insurance",
      "Cruise fare mechanics",
    ],
  };

  const aboutPageJsonLd = {
    "@type": "AboutPage",
    "@id": absoluteUrl("/about#webpage"),
    url: absoluteUrl("/about"),
    name: "About Anchor & Trail and Maya Ellison",
    description: SITE.description,
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: { "@id": absoluteUrl("/about#author") },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            authorJsonLd,
            aboutPageJsonLd,
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
              ],
              "/about"
            ),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <p className="eyebrow mt-6 text-gold-ink">About</p>
      <h1 className="mt-2 max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Honest travel math, from cruise decks to dorm beds
      </h1>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink/85">
        Anchor &amp; Trail is written, researched, and edited by one person:{" "}
        <strong className="font-semibold text-navy">{siteAuthor.name}</strong>. No
        content farm, no AI filler, no partner talking points — one writer who has
        spent {STATS[0].value} years covering both ends of the travel budget
        spectrum, usually within the same year.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.value}
            className="rounded-lg border border-sand bg-paper p-5 shadow-sm"
          >
            <p className="font-serif text-3xl font-bold text-navy">{stat.value}</p>
            <p className="mt-1.5 text-[13px] leading-snug text-mist">{stat.label}</p>
          </div>
        ))}
      </div>

      <section aria-label="About the author" className="mt-14">
        <SectionHeading eyebrow="The Author" title="Meet Maya Ellison" />
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
          <div className="min-w-0 max-w-[68ch] space-y-4 text-[15.5px] leading-relaxed text-ink/85">
            <p>{siteAuthor.bio}</p>
            <p>
              The method is simple and a little stubborn: sail the ships, walk the
              routes, sleep in the hostels, and track the fares — then publish the
              math. Reviews on this site are built from first-hand sailings and
              stays, fare data going back to 2019, and a rule that never bends:{" "}
              <strong className="font-semibold text-navy">
                if it wouldn&apos;t survive a booking with our own money, it doesn&apos;t
                get recommended.
              </strong>
            </p>
            <p>
              That&apos;s also why the site spans such different price brackets. The
              same person booking a Regent suite and a $12 dorm bunk knows exactly
              where the trade-offs actually are — and where marketing claims on
              both ends fall apart.
            </p>
            <p className="text-[14px] text-mist">
              Want the receipts? Every guide links its data sources, and the{" "}
              <Link
                href="/blog"
                className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
              >
                travel guides
              </Link>{" "}
              show the full cost breakdowns behind each verdict.
            </p>
          </div>

          <aside aria-label="Author credentials" className="lg:pt-2">
            <div className="rounded-lg border border-sand bg-paper p-5 shadow-sm">
              <div className="flex gap-4">
                <div
                  aria-hidden="true"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full gold-gradient font-bold text-navy"
                >
                  {siteAuthor.initials}
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-gold-ink">{siteAuthor.role}</p>
                  <p className="mt-1 font-serif text-lg font-bold text-navy">
                    {siteAuthor.name}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-mist">
                {siteAuthor.credentials}
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex min-h-[44px] items-center text-[13.5px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
              >
                All guides by Maya →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section aria-label="Editorial standards" className="mt-14">
        <SectionHeading eyebrow="How We Work" title="Editorial Standards" />
        <ul className="mt-6 max-w-[68ch] space-y-3">
          {EDITORIAL_STANDARDS.map((standard) => (
            <li
              key={standard}
              className="flex gap-3 text-[15px] leading-relaxed text-ink/85"
            >
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
              />
              {standard}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-[68ch] text-[14px] leading-relaxed text-mist">
          Curious how the site stays independent while using partner links? The{" "}
          <Link
            href="/disclosure"
            className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
          >
            full affiliate disclosure
          </Link>{" "}
          lists every partnership and the exact rules that govern them.
        </p>
      </section>

      <section aria-label="Start reading" className="mt-14">
        <SectionHeading eyebrow="Start Here" title="Read or Run the Numbers" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/blog"
            className="group rounded-lg border border-sand bg-paper p-6 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out hover:border-gold"
          >
            <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold-ink">
              Travel Guides
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
              In-depth cruise and backpacking guides with real cost math, fare
              mechanics, and honest verdicts.
            </p>
          </Link>
          <Link
            href="/calculator"
            className="group rounded-lg border border-sand bg-paper p-6 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out hover:border-gold"
          >
            <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold-ink">
              Trip Budget Calculator
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
              Run a destination, trip length, and travel style — get a planning
              range built from the same rate data the guides use.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

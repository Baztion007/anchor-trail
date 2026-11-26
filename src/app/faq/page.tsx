import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion } from "@/components/blog/FaqAccordion";
import { articles } from "@/data/articles";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, jsonLdScript, SITE } from "@/lib/seo";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function generateMetadata(): Metadata {
  return {
    title: "Travel FAQ — Cruise & Backpacking Questions, Answered Honestly",
    description:
      "Every question we answer across our cruise and backpacking guides, collected in one place: real costs, booking windows, insurance, safety, and the math behind the verdicts.",
    alternates: { canonical: "/faq" },
    openGraph: {
      title: "Travel FAQ — Cruise & Backpacking Questions, Answered Honestly",
      description:
        "Every question we answer across our cruise and backpacking guides, collected in one place: real costs, booking windows, insurance, safety, and the math behind the verdicts.",
      url: absoluteUrl("/faq"),
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
    },
  };
}

export default function FaqPage() {
  const totalQuestions = articles.reduce((sum, article) => sum + article.faqs.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            faqJsonLd(articles.flatMap((article) => article.faqs)),
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Travel FAQ", href: "/faq" },
              ],
              "/faq"
            ),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Travel FAQ" },
        ]}
      />

      <p className="eyebrow mt-6 text-gold-ink">FAQ</p>
      <h1 className="mt-2 max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Travel questions, answered with the receipts
      </h1>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink/85">
        Every question we answer across our guides — {totalQuestions} of them —
        collected on one page. Costs are planning estimates checked against live
        fares at the dates shown; the bookable rate is always on the partner
        site. Answers come straight out of the{" "}
        <Link
          href="/blog"
          className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          full guides
        </Link>
        , where the math is shown in detail.
      </p>

      {articles.map((article) => (
        <section
          key={article.slug}
          aria-labelledby={`faq-${article.slug}-heading`}
          className="mt-12 scroll-mt-24"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id={`faq-${article.slug}-heading`}
              className="max-w-2xl font-serif text-2xl font-bold text-navy"
            >
              {article.title}
            </h2>
            <Link
              href={`/blog/${article.slug}`}
              className="min-h-[44px] text-[13.5px] font-semibold text-gold-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
            >
              Read the guide →
            </Link>
          </div>
          <p className="mt-1 text-[12.5px] text-mist">
            <time dateTime={article.dateModified}>
              Updated {dateFormatter.format(new Date(article.dateModified))}
            </time>{" "}
            · {article.faqs.length} questions
          </p>
          <div className="mt-4">
            <FaqAccordion faqs={article.faqs} />
          </div>
        </section>
      ))}

      <p className="mt-12 max-w-[68ch] text-[13.5px] leading-relaxed text-mist">
        Something we have not covered? Every guide on{" "}
        <Link
          href="/blog"
          className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          Travel Guides
        </Link>{" "}
        has its own FAQ section, and the{" "}
        <Link
          href="/calculator"
          className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          Trip Budget Calculator
        </Link>{" "}
        produces a planning range for any route on the site.
      </p>
    </div>
  );
}

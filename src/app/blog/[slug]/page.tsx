import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { FaqAccordion } from "@/components/blog/FaqAccordion";
import { PickBox } from "@/components/blog/PickBox";
import { Toc } from "@/components/blog/Toc";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PriceDisclaimer } from "@/components/site/PriceDisclaimer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/articles";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScript,
} from "@/lib/seo";
import { getTocItems } from "@/lib/toc";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

function truncateCrumbLabel(label: string): string {
  return label.length > 60 ? `${label.slice(0, 60).trimEnd()}…` : label;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: [article.seo.keyword, ...article.seo.secondaryKeywords],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: article.seo.title,
      description: article.seo.description,
      url: absoluteUrl(`/blog/${slug}`),
      images: [
        {
          url: article.heroImage,
          width: 1344,
          height: 768,
          alt: article.heroAlt,
        },
      ],
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: [article.heroImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const tocItems = getTocItems(article);
  const crumbLabel = truncateCrumbLabel(article.title);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            articleJsonLd(article, `/blog/${slug}`),
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Travel Guides", href: "/blog" },
                { label: article.title, href: `/blog/${slug}` },
              ],
              `/blog/${slug}`
            ),
            faqJsonLd(article.faqs),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Travel Guides", href: "/blog" },
          { label: crumbLabel },
        ]}
      />

      {/* Trust header — hero, title, freshness, FTC disclosure, author */}
      <header className="mt-6">
        <figure className="m-0">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            width={1344}
            height={768}
            priority
            sizes="(min-width:1024px) 66vw, 100vw"
            className="aspect-[16/9] w-full rounded-xl object-cover"
          />
        </figure>

        <p className="eyebrow mt-6 text-gold-ink">{article.category.replace("-", " & ")}</p>
        <h1 className="mt-2 max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-sand px-3 py-1 text-[12.5px] font-semibold text-ink">
            <time dateTime={article.dateModified}>Last updated {formatDate(article.dateModified)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-[12.5px] font-semibold text-ink">
            <Clock aria-hidden="true" className="size-3.5" />
            {article.readingMinutes} min read
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-[12.5px] text-mist">
          This guide contains affiliate links. If you book through them we may earn a
          commission —{" "}
          <Link
            href="/disclosure"
            className="underline decoration-gold underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
          >
            full disclosure
          </Link>
          . We only recommend what we&apos;d book ourselves.
        </p>

        <div className="mt-6 max-w-xl">
          <AuthorCard author={article.author} compact />
        </div>
      </header>

      {/* Quick picks, right below the intro */}
      <PickBox picks={article.picks} />

      <PriceDisclaimer className="mb-2 max-w-2xl" />

      {/* Two-column: article body + sticky sidebar */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
        <div className="min-w-0">
          <article>
            <ArticleRenderer article={article} />
          </article>

          <section
            aria-label="Where to next"
            className="mt-10 rounded-lg border border-sand bg-sand/50 p-5"
          >
            <h2 className="font-serif text-lg font-bold text-navy">Where to Next</h2>
            <p className="mt-1 text-[13.5px] text-mist">
              Standing hubs and tools we reference inside this guide:
            </p>
            <ul className="mt-3 space-y-2">
              {article.hubLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-10">
            <FaqAccordion faqs={article.faqs} heading="Frequently Asked Questions" />
          </div>

          <section aria-label="Related guides" className="mt-10">
            <SectionHeading eyebrow="Keep Reading" title="Related Guides" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((relatedArticle) => (
                <article
                  key={relatedArticle.slug}
                  className="group relative overflow-hidden rounded-lg border border-sand bg-paper shadow-sm"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={relatedArticle.heroImage}
                      alt={relatedArticle.heroAlt}
                      fill
                      sizes="(min-width:640px) 33vw, 100vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base font-bold leading-snug text-navy">
                      {relatedArticle.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] text-mist">
                      <time dateTime={relatedArticle.dateModified}>
                        Updated {formatDate(relatedArticle.dateModified)}
                      </time>
                    </p>
                  </div>
                  <Link
                    href={`/blog/${relatedArticle.slug}`}
                    className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy"
                  >
                    <span className="sr-only">Read the guide: {relatedArticle.title}</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:pt-2">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="eyebrow mb-3 text-mist">On This Page</h2>
              <Toc items={tocItems} />
            </div>

            <div className="rounded-lg border border-sand bg-paper p-5 shadow-sm">
              <p className="eyebrow text-gold-ink">Top Recommended Partner</p>
              {article.category === "cruise" ? (
                <>
                  <h3 className="mt-1.5 font-serif text-lg font-bold text-navy">
                    Book a port hotel
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
                    Morning embarkation is stressful enough. Booking.com holds live rates for
                    port-district rooms — check availability for your dates.
                  </p>
                  <AffiliateLink
                    partner="booking"
                    // A concrete port city resolves on Booking's search; the
                    // first tag would send a region label like "Mediterranean"
                    // into the `ss` query and land on a dead results page.
                    destination={article.portCity ?? "Barcelona, Spain"}
                    campaign="sidebar-partner"
                    className="mt-3 text-[14px]"
                    showIcon
                  >
                    Check port hotels
                  </AffiliateLink>
                </>
              ) : (
                <>
                  <h3 className="mt-1.5 font-serif text-lg font-bold text-moss">
                    Insure the trip
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
                    SafetyWing Nomad Insurance covers backpacking profiles at the budget tier
                    of monthly travel cover — buy while abroad, cancel anytime. Live premiums
                    are quoted on their site.
                  </p>
                  <AffiliateLink
                    partner="safetywing"
                    destination={article.seo.keyword}
                    campaign="sidebar-partner"
                    className="mt-3 text-[14px]"
                    showIcon
                  >
                    Get a quick quote
                  </AffiliateLink>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

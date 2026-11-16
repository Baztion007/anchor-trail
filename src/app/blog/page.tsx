import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { articles } from "@/data/articles";
import { breadcrumbJsonLd, itemListJsonLd, jsonLdScript } from "@/lib/seo";
import { BlogIndex } from "./BlogIndex";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Travel Guides — Cruise & Backpacking Editorial",
    description:
      "Honest cruise reviews, backpacking itineraries, and gear-and-insurance guides from Anchor & Trail — every price a snapshot we could actually book.",
    alternates: { canonical: "/blog" },
  };
}

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            itemListJsonLd(
              "Travel guides",
              articles.map((article) => ({ name: article.title, url: `/blog/${article.slug}` }))
            ),
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Travel Guides", href: "/blog" },
              ],
              "/blog"
            ),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Travel Guides" },
        ]}
      />

      <p className="eyebrow mt-6 text-gold-ink">— Travel Guides —</p>
      <h1 className="mt-2 max-w-3xl font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Guides From Both Ends of the Budget
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mist">
        Field-tested cruise reviews, backpacking itineraries, and gear-and-insurance
        breakdowns. Every price in these guides is a snapshot we could actually book at the
        time of writing — nothing here is a paid placement.
      </p>

      <BlogIndex articles={articles} />
    </div>
  );
}

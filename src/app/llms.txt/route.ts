import { articles } from "@/data/articles";
import { absoluteUrl, SITE } from "@/lib/seo";

/**
 * llms.txt (https://llmstxt.org convention) — a curated, markdown map of the
 * site for LLMs and answer engines: who we are, what we publish, and where.
 * Generated from the articles registry so it can never drift out of sync.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const guides = articles
    .map(
      (article) =>
        `- [${article.title}](${absoluteUrl(`/blog/${article.slug}`)}): ${article.seo.description} (updated ${article.dateModified})`
    )
    .join("\n");

  const body = `# Anchor & Trail

> ${SITE.tagline}

Anchor & Trail is an independent, reader-supported travel publication covering both ends of the travel budget spectrum: luxury cruises and budget backpacking. Every review is based on first-hand sailings and hostel stays, rate tracking going back to 2019, and trips booked with our own money — no comped stays, no paid placements, and no partner edit rights. Written and edited by Maya Ellison (14 years covering cruises and overland travel, 62 countries, 23 cruise lines sailed).

## In-depth guides
${guides}

## Topic hubs
- [Luxury Cruises](${absoluteUrl("/cruises")}): cruise deal hunting, fare mechanics, and booking guidance
- [Budget Backpacking](${absoluteUrl("/backpacking")}): routes, budgets, and gear for the cheap end of travel
- [Excursions & Stays](${absoluteUrl("/stays")}): port hotels, hostels, and shore excursions compared
- [Travel Guides](${absoluteUrl("/blog")}): every in-depth guide, newest first

## Tools
- [Trip Budget Calculator](${absoluteUrl("/calculator")}): interactive per-trip cost estimates across both travel styles

## About & trust
- [About Maya Ellison](${absoluteUrl("/about")}): author biography, review methodology, and editorial standards
- [Affiliate Disclosure & Editorial Standards](${absoluteUrl("/disclosure")}): every affiliate partnership and exactly how the site earns money
- [Privacy Policy](${absoluteUrl("/privacy")})

## Machine-readable
- [RSS feed](${absoluteUrl("/feed.xml")})
- [Full-text version of every guide](${absoluteUrl("/llms-full.txt")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

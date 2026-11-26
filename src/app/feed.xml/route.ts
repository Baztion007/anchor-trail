import { articles } from "@/data/articles";
import { absoluteUrl, SITE } from "@/lib/seo";

/**
 * RSS 2.0 feed at /feed.xml — distribution for feed readers, and a fresh
 * discovery surface many crawlers and AI indexers poll.
 */
export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const newest = articles[0]?.dateModified ?? SITE.url;
  const lastBuildDate = new Date(newest).toUTCString();

  const items = articles
    .map((article) => {
      const url = absoluteUrl(`/blog/${article.slug}`);
      return [
        "    <item>",
        `      <title>${escapeXml(article.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(article.datePublished).toUTCString()}</pubDate>`,
        `      <dc:creator>${escapeXml(article.author.name)}</dc:creator>`,
        `      <description>${escapeXml(article.excerpt)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.name} — ${SITE.tagline}`)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Anchor &amp; Trail</generator>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

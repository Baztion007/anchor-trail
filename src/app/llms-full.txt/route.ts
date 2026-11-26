import { articles } from "@/data/articles";
import type { Article, ArticleBlock } from "@/types/affiliate";
import { absoluteUrl, SITE } from "@/lib/seo";

/**
 * llms-full.txt — llmstxt.org "full" companion: the complete body text of
 * every guide rendered as clean markdown, plus FAQs. Lets an LLM ingest the
 * whole corpus in one request instead of crawling 4+ pages.
 */
export const dynamic = "force-static";

function blockToMarkdown(block: ArticleBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text;
    case "heading":
      return `${block.level === 2 ? "##" : "###"} ${block.text}`;
    case "callout":
      return `> **${block.title}** — ${block.text}`;
    case "list":
      return block.items
        .map((item, index) => (block.ordered ? `${index + 1}. ${item}` : `- ${item}`))
        .join("\n");
    case "quote":
      return block.attribution ? `> ${block.text}\n> — ${block.attribution}` : `> ${block.text}`;
    case "table": {
      const header = `| ${block.headers.join(" | ")} |`;
      const separator = `| ${block.headers.map(() => "---").join(" | ")} |`;
      const rows = block.rows
        .map((row) => `| ${row.map((cell) => cell.text.replace(/\|/g, "\\|")).join(" | ")} |`)
        .join("\n");
      return [
        `**${block.caption}**`,
        "",
        header,
        separator,
        rows,
        ...(block.note ? ["", block.note] : []),
      ].join("\n");
    }
    case "image":
      return `*Image: ${block.alt}${block.caption ? ` — ${block.caption}` : ""}*`;
    case "divider":
      return "---";
    default:
      // tour-card / deal-card / stay-card / hostel-card / insurance-banner:
      // interactive partner cards with live pricing — point readers to the page.
      return "*[Embedded partner recommendation — live pricing and full details on the page]*";
  }
}

function articleToMarkdown(article: Article): string {
  const url = absoluteUrl(`/blog/${article.slug}`);
  const body = article.blocks.map(blockToMarkdown).filter(Boolean).join("\n\n");
  const faqs = article.faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join("\n\n");

  return [
    `## ${article.title}`,
    "",
    `- URL: ${url}`,
    `- Author: ${article.author.name} (${article.author.role})`,
    `- Published: ${article.datePublished} — Last updated: ${article.dateModified}`,
    `- ${article.readingMinutes} min read — Category: ${article.category}`,
    "",
    `> ${article.excerpt}`,
    "",
    body,
    "",
    "### Frequently Asked Questions",
    "",
    faqs,
    "",
    "---",
    "",
  ].join("\n");
}

export function GET(): Response {
  const intro = `# Anchor & Trail — full guides

> ${SITE.tagline}

Independent, reader-supported travel publication. Luxury cruises and budget backpacking, honestly compared. First-hand sailings and hostel stays only; trips booked with our own money; no comped stays, paid placements, or partner edits. Author: Maya Ellison.

---

`;
  const body = intro + articles.map(articleToMarkdown).join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

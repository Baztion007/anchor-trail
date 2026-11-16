import type { Article, TocItem } from "@/types/affiliate";
import { uniqueHeadingId } from "@/lib/slug";

/**
 * Builds the TOC item list for an article using the exact same heading-id
 * algorithm as ArticleRenderer — guaranteed anchor parity between the
 * scroll-spy nav and the rendered headings.
 */
export function getTocItems(article: Article): TocItem[] {
  const used = new Set<string>();
  const items: TocItem[] = [];
  for (const block of article.blocks) {
    if (block.type === "heading") {
      items.push({ id: uniqueHeadingId(block.text, used), text: block.text, level: block.level });
    }
  }
  return items;
}

/**
 * True when a block index falls inside the opening intro (before the first
 * heading) — used to place the Quick Picks box "right below the intro".
 */
export function introEndIndex(article: Article): number {
  const idx = article.blocks.findIndex((block) => block.type === "heading");
  return idx === -1 ? article.blocks.length : idx;
}

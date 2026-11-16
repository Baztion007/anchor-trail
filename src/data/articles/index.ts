import type { Article } from "@/types/affiliate";
import { cruiseArticles } from "@/data/articles/cruise";
import { backpackingArticles } from "@/data/articles/backpacking";

/**
 * All site articles, newest-first by dateModified (freshness signal).
 * Swap for MDX/CMS/API later without touching components.
 */
export const articles: Article[] = [...cruiseArticles, ...backpackingArticles].sort(
  (a, b) => Date.parse(b.dateModified) - Date.parse(a.dateModified)
);

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((related): related is Article => Boolean(related));
}

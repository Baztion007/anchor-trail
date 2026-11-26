import { siteAuthor } from "@/data/author";
import type { Article, BreadcrumbItem, Faq } from "@/types/affiliate";

export const SITE = {
  name: "Anchor & Trail",
  url: "https://anchorandtrail.com",
  tagline: "Luxury Cruises & Budget Backpacking, Honestly Compared",
  description:
    "Anchor & Trail is the editorial bridge between luxury cruises and budget backpacking: honest deal breakdowns, real cost math, and independent reviews across both ends of travel.",
  twitter: "@anchorandtrail",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.svg"),
    description: SITE.description,
    founder: {
      "@type": "Person",
      name: siteAuthor.name,
      jobTitle: siteAuthor.role,
      url: absoluteUrl("/about"),
    },
  };
}

export function articleJsonLd(article: Article, canonicalPath: string): Record<string, unknown> {
  return {
    "@type": "Article",
    headline: article.title,
    description: article.seo.description,
    image: absoluteUrl(article.heroImage),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      description: article.author.credentials,
      // E-E-A-T: point the author entity at its resolvable /about profile so
      // answer engines can attach credentials to the byline.
      url: absoluteUrl("/about"),
      sameAs: [absoluteUrl("/about")],
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(canonicalPath),
    keywords: [article.seo.keyword, ...article.seo.secondaryKeywords].join(", "),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], basePath: string): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href ?? basePath),
    })),
  };
}

export function faqJsonLd(faqs: Faq[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function jsonLdScript(graph: Record<string, unknown>[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

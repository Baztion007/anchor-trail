import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Explicit AI-crawler policy. This site WANTS to be quoted and cited by
 * answer engines (ChatGPT Search, Perplexity, Claude) and generative
 * engines (Gemini, GPT models), so every major AI agent is explicitly
 * granted the same access as the wildcard rule — an explicit allow also
 * insures against future wildcard tightening. Grouped per operator:
 * - OpenAI: GPTBot (training), OAI-SearchBot (ChatGPT search index),
 *   ChatGPT-User (live user-triggered fetches)
 * - Anthropic: ClaudeBot (training), Claude-User (live),
 *   Claude-SearchBot (search index), anthropic-ai (legacy slug)
 * - Perplexity: PerplexityBot (index), Perplexity-User (live)
 * - Google: Google-Extended (Gemini training; Googlebot itself stays
 *   allowed under the wildcard rule for Search + AI Overviews)
 * - Datasets & assistants: CCBot (Common Crawl, feeds many training sets),
 *   Applebot-Extended (Apple Intelligence), meta-externalagent (Meta AI),
 *   Amazonbot (Alexa)
 */
const AI_CRAWLERS: string[] = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/affiliate";
import { SectionHeading } from "@/components/site/SectionHeading";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

interface GuideTeasersProps {
  articles: Article[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

/**
 * In-body contextual links from hub/tool pages to the in-depth guides.
 * Internal linking money-page -> blog is the primary authority flow search
 * engines weight, so hubs carry a real content section, not a footer link.
 */
export function GuideTeasers({
  articles,
  eyebrow = "From the Guides",
  title = "The Full Breakdowns",
  description = "Complete cost math, honest verdicts, and booking tactics behind everything recommended on this page.",
}: GuideTeasersProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-label="In-depth guides" className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group relative overflow-hidden rounded-lg border border-sand bg-paper shadow-sm focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-navy"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={article.heroImage}
                  alt={article.heroAlt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-200 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold leading-snug text-navy">
                  {article.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
                  {article.excerpt}
                </p>
                <p className="mt-3 text-[12.5px] font-semibold text-gold-ink">
                  <time dateTime={article.dateModified}>
                    Updated {dateFormatter.format(new Date(article.dateModified))}
                  </time>{" "}
                  · {article.readingMinutes} min read
                </p>
              </div>
              <Link
                href={`/blog/${article.slug}`}
                className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy"
              >
                <span className="sr-only">
                  Read the guide: {article.title}
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

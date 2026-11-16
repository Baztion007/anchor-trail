"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Article, ArticleCategory } from "@/types/affiliate";
import { cn } from "@/lib/utils";

type TabId = "all" | "cruise" | "backpacking" | "gear-insurance";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All Guides" },
  { id: "cruise", label: "Cruise Reviews & Tips" },
  { id: "backpacking", label: "Backpacking Itineraries" },
  { id: "gear-insurance", label: "Gear & Insurance" },
];

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  cruise: "Cruise Review",
  backpacking: "Backpacking",
  "gear-insurance": "Gear & Insurance",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

function matchesTab(article: Article, tab: TabId): boolean {
  switch (tab) {
    case "all":
      return true;
    case "cruise":
      return article.category === "cruise";
    case "backpacking":
      return article.category === "backpacking";
    case "gear-insurance":
      return article.category === "gear-insurance" || article.tags.includes("Insurance");
  }
}

function GuideMeta({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-mist">
      <span className="inline-flex items-center gap-1.5">
        <Clock aria-hidden="true" className="size-3.5" />
        {article.readingMinutes} min read
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden="true" className="size-3.5" />
        <time dateTime={article.dateModified}>Updated {formatDate(article.dateModified)}</time>
      </span>
    </div>
  );
}

export function BlogIndex({ articles }: { articles: Article[] }) {
  const [tab, setTab] = useState<TabId>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = articles.filter((article) => matchesTab(article, tab));
  const featured = filtered[0];
  const rest = filtered.slice(1);

  function moveSelection(rawIndex: number) {
    const count = TABS.length;
    const wrapped = ((rawIndex % count) + count) % count;
    setTab(TABS[wrapped].id);
    tabRefs.current[wrapped]?.focus();
  }

  function handleTablistKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = TABS.findIndex((candidate) => candidate.id === tab);
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        moveSelection(currentIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveSelection(currentIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        moveSelection(0);
        break;
      case "End":
        event.preventDefault();
        moveSelection(TABS.length - 1);
        break;
    }
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Guide categories"
        onKeyDown={handleTablistKeyDown}
        className="scroll-slim flex gap-1 overflow-x-auto border-b border-sand"
      >
        {TABS.map((candidate, index) => {
          const isActive = tab === candidate.id;
          return (
            <button
              key={candidate.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${candidate.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls="guides-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setTab(candidate.id)}
              className={cn(
                "-mb-px inline-flex min-h-[44px] shrink-0 items-center border-b-2 px-4 text-[13px] font-semibold uppercase tracking-[0.12em] motion-safe:transition-colors motion-safe:duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy",
                isActive
                  ? "border-gold text-navy"
                  : "border-transparent text-mist hover:border-sand hover:text-navy"
              )}
            >
              {candidate.label}
            </button>
          );
        })}
      </div>

      <div
        id="guides-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
        className="mt-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <p aria-live="polite" className="sr-only">
          {filtered.length} {filtered.length === 1 ? "guide" : "guides"} shown
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-sand bg-paper p-10 text-center">
            <h2 className="font-serif text-xl font-bold text-navy">Nothing in this drawer yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-mist">
              New gear tests and insurance breakdowns are in the works. Everything we have
              published so far lives under All Guides.
            </p>
            <button
              type="button"
              onClick={() => setTab("all")}
              className="mt-5 inline-flex min-h-[44px] items-center rounded-md bg-navy px-5 text-[14px] font-semibold text-canvas hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-safe:transition-colors motion-safe:duration-200 ease-out"
            >
              Show all guides
            </button>
          </div>
        ) : tab === "all" && featured ? (
          <>
            {/* Featured pillar hero */}
            <article className="group relative overflow-hidden rounded-lg border border-sand bg-paper shadow-sm">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={featured.heroImage}
                    alt={featured.heroAlt}
                    fill
                    priority
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-8">
                  <p className="eyebrow text-gold-ink">{CATEGORY_LABELS[featured.category]}</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold leading-snug text-navy">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-mist">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4">
                    <GuideMeta article={featured} />
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 group-hover:text-gold-ink motion-safe:transition-colors motion-safe:duration-200 ease-out">
                    Read the guide <span aria-hidden="true">→</span>
                  </span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy"
                >
                  <span className="sr-only">Read the guide: {featured.title}</span>
                </Link>
              </div>
            </article>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((article) => (
                <article
                  key={article.slug}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-sand bg-paper shadow-sm"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={article.heroImage}
                      alt={article.heroAlt}
                      fill
                      sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-200 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow text-gold-ink">{CATEGORY_LABELS[article.category]}</p>
                    <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-navy">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4">
                      <GuideMeta article={article} />
                    </div>
                  </div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy"
                  >
                    <span className="sr-only">Read the guide: {article.title}</span>
                  </Link>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((article) => (
              <article
                key={article.slug}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-sand bg-paper shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={article.heroImage}
                    alt={article.heroAlt}
                    fill
                    sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-200 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-gold-ink">{CATEGORY_LABELS[article.category]}</p>
                  <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-navy">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist">{article.excerpt}</p>
                  <div className="mt-auto pt-4">
                    <GuideMeta article={article} />
                  </div>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy"
                >
                  <span className="sr-only">Read the guide: {article.title}</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

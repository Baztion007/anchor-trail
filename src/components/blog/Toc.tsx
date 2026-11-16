"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { TocProps } from "@/types/affiliate";
import { cn } from "@/lib/utils";

/** Vertical offset (px) that marks "this heading is now the current section". */
const SPY_LINE = 96;

/**
 * Sticky-column table of contents with IntersectionObserver scroll-spy.
 * Active entry = the last heading that has crossed the spy line; clicking
 * scrolls with reduced-motion respected and updates the hash via replaceState.
 */
export function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    if (items.length === 0) {
      return undefined;
    }

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        // Prefer the last heading at/above the spy line; fall back to the
        // first heading currently inside the spy band.
        let next: string | undefined;
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top <= SPY_LINE) {
            next = item.id;
          }
        }
        if (!next) {
          next = items.find((item) => visible.has(item.id))?.id;
        }
        if (next) {
          setActiveId(next);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [items]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <nav aria-label="Table of contents" className="text-[13.5px]">
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => handleClick(event, item.id)}
              className={cn(
                "block border-l-2 py-1.5 pl-3 motion-safe:transition-colors motion-safe:duration-150 ease-out",
                item.level === 3 && "ml-4",
                activeId === item.id
                  ? "border-gold font-semibold text-navy"
                  : "border-sand text-mist hover:border-gold/60 hover:text-navy",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

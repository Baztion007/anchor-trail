"use client";

import type { Deal } from "@/types/affiliate";
import { useTravelStyle } from "@/components/site/StyleProvider";
import { DealCard } from "@/components/affiliate/DealCard";

/**
 * Style-aware deals grid. Non-matching deals stay in flow (no layout jump)
 * and stay CLICKABLE — they are visually muted only, so the CTA never
 * silently dies. Because the travel-style choice persists in localStorage
 * across visits, an in-grid status row spells out what is muted (with a
 * one-click reset) — without it, a returning visitor who filtered
 * "Backpacking" last week lands on greyed-out cruise cards that read as
 * broken. Filter changes are announced politely to screen readers.
 */
export function DealsGrid({ deals }: { deals: Deal[] }) {
  const { style, setStyle } = useTravelStyle();
  const matching = deals.filter((deal) => style === "all" || deal.vertical === style);
  const muted = deals.length - matching.length;

  const announcement =
    style === "all"
      ? `Showing all ${deals.length} curated deals`
      : `Showing ${matching.length} ${
          style === "cruise" ? "luxury cruises" : "budget backpacking deals"
        }; ${muted} ${style === "cruise" ? "backpacking" : "cruise"} deals are shown muted but remain clickable`;

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      {muted > 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border border-sand bg-sand/70 px-4 py-3">
          <p className="text-[13.5px] leading-snug text-ink">
            {style === "cruise" ? "Showing luxury cruise picks" : "Showing budget backpacking picks"}{" "}
            <span className="text-mist">
              — {muted} {style === "cruise" ? "backpacking" : "cruise"} deal{muted === 1 ? " is" : "s are"} shown
              muted below but still open live pricing.
            </span>
          </p>
          <button
            type="button"
            onClick={() => setStyle("all")}
            className="inline-flex min-h-[44px] items-center rounded-full border border-ink/25 bg-paper px-4 text-[12.5px] font-semibold text-ink transition-colors duration-150 ease-out hover:border-ink hover:bg-ink hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Show all {deals.length} deals
          </button>
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {deals.map((deal) => {
          const dimmed = style !== "all" && deal.vertical !== style;
          return (
            <div key={deal.id}>
              <DealCard deal={deal} dimmed={dimmed} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

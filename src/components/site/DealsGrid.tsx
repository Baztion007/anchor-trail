"use client";

import type { Deal } from "@/types/affiliate";
import { useTravelStyle } from "@/components/site/StyleProvider";
import { DealCard } from "@/components/affiliate/DealCard";
import { cn } from "@/lib/utils";

/**
 * Style-aware deals grid. Non-matching deals stay in flow (no layout jump)
 * but are dimmed; the change is announced politely to screen readers.
 */
export function DealsGrid({ deals }: { deals: Deal[] }) {
  const { style } = useTravelStyle();
  const matching = deals.filter((deal) => style === "all" || deal.vertical === style);

  const announcement =
    style === "all"
      ? `Showing all ${deals.length} curated deals`
      : `Showing ${matching.length} ${
          style === "cruise" ? "luxury cruises" : "budget backpacking deals"
        }`;

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {deals.map((deal) => {
          const dimmed = style !== "all" && deal.vertical !== style;
          return (
            <div key={deal.id} className={cn(dimmed && "pointer-events-none select-none")}>
              <DealCard deal={deal} dimmed={dimmed} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

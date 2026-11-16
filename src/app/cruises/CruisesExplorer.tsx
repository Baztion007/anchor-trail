"use client";

import { useMemo, useState } from "react";
import type { Deal, Stay, Tour } from "@/types/affiliate";
import { DealCard } from "@/components/affiliate/DealCard";
import { FilterChipGroup } from "@/components/site/FilterChipGroup";

interface CruisesExplorerProps {
  deals: Deal[];
  tours: Tour[];
  stays: Stay[];
}

const BUDGET_OPTIONS = [
  { value: "<500", label: "Under $500/day" },
  { value: "500-800", label: "$500–$800/day" },
  { value: "800+", label: "$800+/day" },
];

function toOptions(values: string[]): { value: string; label: string }[] {
  return Array.from(new Set(values)).sort().map((value) => ({ value, label: value }));
}

function budgetBand(dailyCost: number): "<500" | "500-800" | "800+" {
  if (dailyCost < 500) return "<500";
  if (dailyCost <= 800) return "500-800";
  return "800+";
}

/**
 * Client island for the cruises hub: chip filters over the curated cruise
 * deals, with a polite live region announcing the filtered count.
 */
export function CruisesExplorer({ deals, tours, stays }: CruisesExplorerProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [budgets, setBudgets] = useState<string[]>([]);

  const lineOptions = useMemo(
    () =>
      toOptions(
        deals
          .map((deal) => deal.cruiseLine)
          .filter((line): line is string => Boolean(line))
      ),
    [deals]
  );
  const regionOptions = useMemo(() => toOptions(deals.map((deal) => deal.region)), [deals]);

  const filtered = useMemo(
    () =>
      deals.filter((deal) => {
        if (lines.length > 0 && (!deal.cruiseLine || !lines.includes(deal.cruiseLine))) {
          return false;
        }
        if (regions.length > 0 && !regions.includes(deal.region)) {
          return false;
        }
        if (budgets.length > 0 && !budgets.includes(budgetBand(deal.dailyCost))) {
          return false;
        }
        return true;
      }),
    [deals, lines, regions, budgets]
  );

  function clearFilters() {
    setLines([]);
    setRegions([]);
    setBudgets([]);
  }

  return (
    <section
      aria-label="Cruise fare explorer"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <h2 className="sr-only">Filter the cruise fares</h2>

      <div className="rounded-lg border border-sand bg-paper p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <FilterChipGroup
            label="Filter by cruise line"
            options={lineOptions}
            selected={lines}
            onChange={setLines}
          />
          <FilterChipGroup
            label="Filter by region"
            options={regionOptions}
            selected={regions}
            onChange={setRegions}
          />
          <FilterChipGroup
            label="Filter by all-in daily budget"
            options={BUDGET_OPTIONS}
            selected={budgets}
            onChange={setBudgets}
          />
        </div>
        <p className="mt-4 text-[12.5px] text-mist">
          Pair a fare with the {tours.length} shore excursions and {stays.length} port hotels
          curated below.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} of {deals.length} cruises
      </p>

      {filtered.length > 0 ? (
        <div id="cruise-results" className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border-2 border-dashed border-sand bg-paper p-10 text-center">
          <h3 className="font-serif text-xl font-bold text-navy">No cruises match those filters</h3>
          <p className="mt-2 text-sm text-mist">
            Loosen a chip or two — or see everything we&apos;re tracking.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex min-h-[44px] items-center rounded-md bg-navy px-5 text-[14px] font-semibold text-canvas hover:bg-navy-deep motion-safe:transition-colors motion-safe:duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}

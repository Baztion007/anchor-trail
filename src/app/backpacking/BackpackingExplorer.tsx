"use client";

import { useMemo, useState } from "react";
import type { Deal, Hostel, Tour } from "@/types/affiliate";
import { DealCard } from "@/components/affiliate/DealCard";
import { FilterChipGroup } from "@/components/site/FilterChipGroup";

interface BackpackingExplorerProps {
  deals: Deal[];
  tours: Tour[];
  hostels: Hostel[];
}

const BUDGET_OPTIONS = [
  { value: "<35", label: "Under $35/day" },
  { value: "35-60", label: "$35–$60/day" },
  { value: "60+", label: "$60+/day" },
];

function toOptions(values: string[]): { value: string; label: string }[] {
  return Array.from(new Set(values)).sort().map((value) => ({ value, label: value }));
}

function budgetBand(dailyCost: number): "<35" | "35-60" | "60+" {
  if (dailyCost < 35) return "<35";
  if (dailyCost <= 60) return "35-60";
  return "60+";
}

/**
 * Client island for the backpacking hub: region and daily-budget chips over
 * the curated routes, with a polite live region announcing the result count.
 */
export function BackpackingExplorer({ deals, tours, hostels }: BackpackingExplorerProps) {
  const [regions, setRegions] = useState<string[]>([]);
  const [budgets, setBudgets] = useState<string[]>([]);

  const regionOptions = useMemo(() => toOptions(deals.map((deal) => deal.region)), [deals]);

  const filtered = useMemo(
    () =>
      deals.filter((deal) => {
        if (regions.length > 0 && !regions.includes(deal.region)) {
          return false;
        }
        if (budgets.length > 0 && !budgets.includes(budgetBand(deal.dailyCost))) {
          return false;
        }
        return true;
      }),
    [deals, regions, budgets]
  );

  function clearFilters() {
    setRegions([]);
    setBudgets([]);
  }

  return (
    <section
      aria-label="Backpacking route explorer"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
    >
      <h2 className="sr-only">Filter the backpacking routes</h2>

      <div className="rounded-lg border border-sand bg-paper p-4 sm:p-5">
        <div className="grid gap-5 sm:grid-cols-2">
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
          Below the explorer: {tours.length} day trips, {hostels.length} social hostels and every
          overland leg worth booking early.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} of {deals.length} routes
      </p>

      {filtered.length > 0 ? (
        <div id="backpacking-results" className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border-2 border-dashed border-sand bg-paper p-10 text-center">
          <h3 className="font-serif text-xl font-bold text-navy">No routes match those filters</h3>
          <p className="mt-2 text-sm text-mist">
            Loosen a chip or two — or see everything we&apos;re tracking.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex min-h-[44px] items-center rounded-md bg-moss px-5 text-[14px] font-semibold text-canvas hover:bg-moss-deep motion-safe:transition-colors motion-safe:duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}

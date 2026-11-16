"use client";

import { Compass, Ship, Tent } from "lucide-react";
import { useTravelStyle } from "@/components/site/StyleProvider";
import type { StyleValue } from "@/types/affiliate";
import { cn } from "@/lib/utils";

interface StyleSwitcherProps {
  className?: string;
}

const OPTIONS: {
  value: StyleValue;
  label: string;
  icon: typeof Compass;
  activeClasses: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: Compass,
    activeClasses: "bg-ink text-canvas border-ink",
  },
  {
    value: "cruise",
    label: "Cruises",
    icon: Ship,
    activeClasses: "bg-navy text-canvas border-navy",
  },
  {
    value: "backpacking",
    label: "Backpacking",
    icon: Tent,
    activeClasses: "bg-moss text-canvas border-moss",
  },
];

/**
 * Travel Style Switcher — accessible radio group (native inputs, visually
 * hidden) that drives deal-card dimming site-wide and persists to
 * localStorage. 44px minimum touch targets, visible focus rings.
 */
export function StyleSwitcher({ className }: StyleSwitcherProps) {
  const { style, setStyle } = useTravelStyle();

  return (
    <fieldset className={cn("w-full", className)}>
      <legend className="sr-only">Filter content by travel style</legend>
      <div className="flex flex-nowrap items-center gap-1 rounded-full border border-sand bg-paper p-1.5">
        {OPTIONS.map(({ value, label, icon: Icon, activeClasses }) => {
          const isActive = style === value;
          return (
            <label
              key={value}
              className={cn(
                "flex min-h-[44px] cursor-pointer select-none items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-[12.5px] font-semibold transition-colors duration-150 ease-out",
                isActive
                  ? activeClasses
                  : "border-transparent bg-transparent text-mist hover:text-ink",
                "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-terracotta-ink"
              )}
            >
              <input
                type="radio"
                name="travel-style"
                value={value}
                checked={isActive}
                onChange={() => setStyle(value)}
                className="sr-only"
              />
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {style === "all"
          ? "Showing all travel styles"
          : style === "cruise"
            ? "Travel style filter set to luxury cruises"
            : "Travel style filter set to budget backpacking"}
      </p>
    </fieldset>
  );
}

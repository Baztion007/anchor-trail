"use client";

import type { FilterChipGroupProps } from "@/types/affiliate";
import { cn } from "@/lib/utils";

/**
 * Toggle-chip filter group exposed as a fieldset so the group label reaches
 * assistive tech. Single-select chips toggle off; multi-select accumulates.
 */
export function FilterChipGroup({
  label,
  options,
  selected,
  onChange,
  multi = false,
}: FilterChipGroupProps) {
  function toggle(value: string) {
    if (multi) {
      onChange(
        selected.includes(value)
          ? selected.filter((item) => item !== value)
          : [...selected, value]
      );
      return;
    }
    onChange(selected.includes(value) ? [] : [value]);
  }

  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const pressed = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => toggle(option.value)}
              className={cn(
                "min-h-[44px] rounded-full border px-4 text-[13px] font-semibold",
                "motion-safe:transition-colors motion-safe:duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                pressed
                  ? "border-navy bg-navy text-canvas"
                  : "border-sand bg-paper text-mist hover:border-navy/40 hover:text-ink"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

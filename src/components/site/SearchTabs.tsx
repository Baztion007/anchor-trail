"use client";

import { useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import type { PartnerId, SearchTabsProps } from "@/types/affiliate";
import { buildAffiliateLink } from "@/lib/affiliate";
import { cn } from "@/lib/utils";

type TabTone = "navy" | "moss" | "terracotta";

interface SearchTab {
  id: string;
  label: string;
  partner: PartnerId;
  cta: string;
  placeholder: string;
  tone: TabTone;
}

const TABS: SearchTab[] = [
  {
    id: "cruises",
    label: "Find Cruises",
    // CruiseDirect is back (Nov 2026): the CJ Affiliate click link redirects
    // through cj.dotomi.com, which bypasses the Cloudflare challenge that
    // used to 504 the direct origin. Live credential is baked into the
    // registry; see data/partners.ts cruisedirect entry.
    partner: "cruisedirect",
    cta: "Search Cruises",
    placeholder: "Cruise region or port (e.g. Mediterranean)",
    tone: "navy",
  },
  {
    id: "stays",
    label: "Hotels & Hostels",
    // Booking.com was dropped in the Nov 2026 roster change; stays now book
    // through the LIVE Expedia Group affiliate link (path-based credential,
    // see data/partners.ts expedia entry).
    partner: "expedia",
    cta: "Search Stays",
    placeholder: "City (e.g. Barcelona)",
    tone: "navy",
  },
  {
    id: "tours",
    label: "Tours & Passes",
    // Viator was dropped in the Nov 2026 roster change; city sightseeing now
    // routes through the LIVE Go City shortlink (bareLink — see
    // data/partners.ts go-city entry). Destination is dropped by the
    // redirector, so the CTA lands on Go City's pass marketplace.
    partner: "go-city",
    cta: "Explore Passes",
    placeholder: "City or attraction (e.g. Rome)",
    tone: "terracotta",
  },
  {
    id: "transfers",
    label: "Airport Transfers",
    partner: "welcome-pickups",
    cta: "Book a Transfer",
    placeholder: "Airport or city (e.g. Lisbon Airport)",
    tone: "terracotta",
  },
  {
    id: "flights",
    label: "Flights",
    partner: "travelpayouts",
    cta: "Compare Fares",
    placeholder: "Destination (e.g. Bangkok)",
    tone: "moss",
  },
];

const TONE_BUTTON_CLASSES: Record<TabTone, string> = {
  navy: "bg-navy hover:bg-navy-deep",
  moss: "bg-moss hover:bg-moss-deep",
  terracotta: "bg-terracotta hover:bg-terracotta-ink",
};

/**
 * Hero quick-search widget. Full ARIA tabs pattern with automatic activation
 * (arrow keys move focus AND selection); each panel keeps its own query state.
 * Submitting opens the partner search in a new tab via buildAffiliateLink.
 */
export function SearchTabs({ className }: SearchTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [queries, setQueries] = useState<Record<string, string>>({});

  function focusAndSelect(nextIndex: number) {
    const index = (nextIndex + TABS.length) % TABS.length;
    setActiveIndex(index);
    document.getElementById(`tab-${TABS[index].id}`)?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusAndSelect(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusAndSelect(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusAndSelect(0);
        break;
      case "End":
        event.preventDefault();
        focusAndSelect(TABS.length - 1);
        break;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>, tab: SearchTab) {
    event.preventDefault();
    const query = (queries[tab.id] ?? "").trim();
    if (!query) return;
    window.open(
      buildAffiliateLink({ partner: tab.partner, destination: query, campaign: "hero-search" }),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-sand bg-paper shadow-lg", className)}>
      <div role="tablist" aria-label="Quick travel search" className="scroll-slim flex flex-nowrap overflow-x-auto border-b border-sand">
        {TABS.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                "min-h-[44px] shrink-0 whitespace-nowrap border-b-2 px-4 text-[13px] font-semibold",
                "motion-safe:transition-colors motion-safe:duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                isActive ? "border-gold text-navy" : "border-transparent text-mist hover:text-navy"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => {
        const isActive = TABS[activeIndex].id === tab.id;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isActive}
            className="p-5"
          >
            <form onSubmit={(event) => handleSubmit(event, tab)}>
              <label
                htmlFor={`search-input-${tab.id}`}
                className="mb-1.5 block text-[12px] font-semibold text-mist"
              >
                Where to?
              </label>
              <input
                id={`search-input-${tab.id}`}
                type="text"
                value={queries[tab.id] ?? ""}
                onChange={(event) =>
                  setQueries((prev) => ({ ...prev, [tab.id]: event.target.value }))
                }
                placeholder={tab.placeholder}
                className="w-full min-h-[44px] rounded-md border border-input bg-canvas px-3.5 text-sm text-ink placeholder:text-mist/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              />
              <button
                type="submit"
                className={cn(
                  "mt-3 w-full min-h-[44px] rounded-md text-[14px] font-semibold text-canvas",
                  "motion-safe:transition-colors motion-safe:duration-200 ease-out",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                  TONE_BUTTON_CLASSES[tab.tone]
                )}
              >
                {tab.cta}
              </button>
              <p className="mt-2 text-[11.5px] text-mist">Opens partner site in a new tab</p>
            </form>
          </div>
        );
      })}
    </div>
  );
}

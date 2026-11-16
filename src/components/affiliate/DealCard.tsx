"use client";

import { Check, Clock } from "lucide-react";
import type { DealCardProps } from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { getPartner } from "@/data/partners";
import { cn } from "@/lib/utils";

interface DealCardWithDimProps extends DealCardProps {
  /** Visual mute applied by DealsGrid when the card is outside the active style filter. */
  dimmed?: boolean;
}

/**
 * Deal card for both verticals: navy/gold treatment for cruises, moss/terracotta
 * for backpacking. Outbound CTA goes exclusively through <AffiliateLink>.
 */
export function DealCard({ deal, featured = false, dimmed = false }: DealCardWithDimProps) {
  const isCruise = deal.vertical === "cruise";

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border bg-paper shadow-sm",
        "motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-200 ease-out",
        featured && "ring-1 ring-gold",
        dimmed && "pointer-events-none select-none opacity-45 saturate-[0.55]"
      )}
    >
      {/* Decorative header band */}
      <div className={cn("relative h-20 overflow-hidden", isCruise ? "bg-navy" : "bg-moss")}>
        {isCruise ? (
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 320 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 26 Q40 16 80 26 T160 26 T240 26 T320 26"
              stroke="#C5A059"
              strokeWidth="1.5"
              opacity="0.3"
            />
            <path
              d="M0 46 Q40 56 80 46 T160 46 T240 46 T320 46"
              stroke="#C5A059"
              strokeWidth="1.5"
              opacity="0.3"
            />
            <path
              d="M0 66 Q40 58 80 66 T160 66 T240 66 T320 66"
              stroke="#C5A059"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 320 80"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M-8 62 C48 18 104 72 168 36 S288 8 328 44"
              stroke="#D95D39"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="7 6"
              opacity="0.4"
            />
          </svg>
        )}
        <span
          className={cn(
            "absolute left-5 top-4 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
            isCruise ? "gold-gradient text-navy" : "bg-terracotta text-canvas"
          )}
        >
          {deal.badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 p-6">
        <p className={cn("eyebrow", isCruise ? "text-gold-ink" : "text-terracotta-ink")}>
          {`${getPartner(deal.partner).name} · ${deal.region}`}
        </p>
        <h3
          className={cn("mt-1.5 font-serif text-xl font-bold", isCruise ? "text-navy" : "text-moss")}
        >
          {deal.title}
        </h3>
        {isCruise ? (
          <div aria-hidden="true" className="mt-2 h-px w-14 gold-gradient" />
        ) : (
          <div aria-hidden="true" className="mt-2 w-14 border-t-2 border-dashed border-terracotta/60" />
        )}
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="font-serif text-3xl font-bold">{`$${deal.priceFrom}`}</span>
          <span className="text-[13px] text-mist">{deal.priceUnit}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[12px] text-ink">
            <Clock aria-hidden="true" className="size-3.5 shrink-0" />
            {deal.duration}
          </span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mist">{deal.summary}</p>
        <ul className="mt-4 space-y-1.5">
          {deal.inclusions.map((inclusion) => (
            <li key={inclusion} className="flex items-start gap-2">
              <Check
                aria-hidden="true"
                className={cn("mt-0.5 size-4 shrink-0", isCruise ? "text-gold-ink" : "text-terracotta-ink")}
              />
              <span className="text-[13.5px] text-ink">{inclusion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-auto p-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-mist">{`≈ $${deal.dailyCost}/day all-in`}</span>
          <AffiliateLink
            partner={deal.partner}
            destination={deal.destination}
            campaign="deal-card"
            showIcon
            className={cn(
              "inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-4 text-[13.5px] font-semibold no-underline",
              "motion-safe:transition-colors motion-safe:duration-200 ease-out",
              isCruise ? "bg-navy text-canvas hover:bg-navy-deep" : "bg-moss text-canvas hover:bg-moss-deep",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            )}
          >
            {deal.ctaText}
          </AffiliateLink>
        </div>
      </footer>
    </article>
  );
}

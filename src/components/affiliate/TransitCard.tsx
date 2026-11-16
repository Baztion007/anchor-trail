import { ArrowRight, Clock } from "lucide-react";
import type { TransitCardProps } from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";

/**
 * Ground/ferry transit route card. CTA routes to the correct booking partner
 * (12Go in Asia, Omio in Europe) based on the route data.
 */
export function TransitCard({ route }: TransitCardProps) {
  return (
    <article className="rounded-lg border bg-paper p-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-200 ease-out">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-serif text-lg font-bold text-ink">{route.origin}</span>
        <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-terracotta" />
        <span className="font-serif text-lg font-bold text-ink">{route.destination}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {route.modes.map((mode) => (
          <span
            key={mode}
            className="rounded-full bg-sand px-2.5 py-1 text-[12px] font-semibold text-ink"
          >
            {mode}
          </span>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-mist">
        <Clock aria-hidden="true" className="size-3.5 shrink-0" />
        <span>{route.durationLabel}</span>
        <span className="font-bold text-moss">{`$${route.priceLow}–$${route.priceHigh}`}</span>
        <span className="text-[12px]">{`via ${route.operator}`}</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-mist">{route.summary}</p>
      <div className="mt-4">
        <AffiliateLink
          partner={route.partner}
          destination={`${route.origin} to ${route.destination}`}
          campaign="transit-card"
        >
          {route.partner === "twelve-go" ? "Compare on 12Go" : "Book on Omio"}
        </AffiliateLink>
      </div>
    </article>
  );
}

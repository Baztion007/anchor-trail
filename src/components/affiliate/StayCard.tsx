import { Check, MapPin } from "lucide-react";
import type { StayCardProps } from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { LivePriceWidget } from "@/components/affiliate/LivePriceWidget";
import { PriceTierBadge } from "@/components/affiliate/PriceTierBadge";
import { formatEstimateFrom, stayTier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * Booking.com stay card with luxury/budget tier treatment and port-walk info
 * for cruise readers.
 */
export function StayCard({ stay }: StayCardProps) {
  const isLuxury = stay.tier === "luxury";
  const tier = stayTier(stay);

  return (
    <article className="rounded-lg border bg-paper p-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-200 ease-out">
      <p className="eyebrow text-gold-ink">{`${stay.city}, ${stay.country}`}</p>
      <div className="mt-1.5 flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-bold text-navy">{stay.name}</h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
            isLuxury ? "gold-gradient text-navy" : "bg-sand text-ink"
          )}
        >
          {isLuxury ? "Port Luxury" : "Budget Stay"}
        </span>
      </div>
      <div className="mt-3">
        <span
          role="img"
          aria-label={`Rated ${stay.rating} out of 10 on Booking.com`}
          className="inline-flex items-center rounded bg-navy px-2 py-1 text-[13px] font-bold text-canvas"
        >
          <span aria-hidden="true">{stay.rating}</span>
        </span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {stay.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-ink" />
            <span className="text-[13.5px] text-ink">{perk}</span>
          </li>
        ))}
      </ul>
      {stay.nearPort && stay.walkToPort ? (
        <p className="mt-3 flex items-center gap-1.5 text-[13px] text-mist">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
          {stay.walkToPort}
        </p>
      ) : null}
      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <PriceTierBadge tier={tier} />
        <span className="font-serif text-lg font-bold text-navy">
          {formatEstimateFrom(stay.priceFrom, stay.currency)}
        </span>
        <span className="text-[13px] text-mist">/night · estimate</span>
        <span className="text-[13px] text-mist">
          {`· ${stay.reviewCount.toLocaleString("en-US")}+ reviews`}
        </span>
      </p>
      <div className="mt-3">
        <LivePriceWidget compact />
      </div>
      <div className="mt-4">
        <AffiliateLink
          partner="booking"
          destination={`${stay.city}, ${stay.country}`}
          campaign="stay-card"
        >
          Check Availability
        </AffiliateLink>
      </div>
    </article>
  );
}

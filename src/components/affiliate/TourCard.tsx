import { Clock, Star } from "lucide-react";
import type { TourCardProps } from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { LivePriceWidget } from "@/components/affiliate/LivePriceWidget";
import { PriceTierBadge } from "@/components/affiliate/PriceTierBadge";
import { formatEstimateFrom, tourTier } from "@/lib/pricing";

/**
 * Viator tour card. Full variant is an editorial card; compact variant is a
 * single-row list item for sidebars and recaps. Pricing follows the site
 * strategy: tier badge plus an explicit estimate anchor — never a static rate.
 */
export function TourCard({ tour, variant = "full" }: TourCardProps) {
  const reviewLabel = tour.reviewCount.toLocaleString("en-US");
  const ratingLabel = `Rated ${tour.rating} out of 5 from ${reviewLabel} Viator reviews`;
  const tier = tourTier(tour);

  if (variant === "compact") {
    return (
      <article className="flex items-center justify-between gap-3 rounded-md border bg-paper p-4 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-200 ease-out">
        <div className="min-w-0">
          <h3 className="text-[14.5px] font-semibold text-ink">{tour.title}</h3>
          <p
            className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-mist"
            role="img"
            aria-label={ratingLabel}
          >
            <Star aria-hidden="true" className="size-3.5 fill-gold text-gold" />
            <span aria-hidden="true" className="font-bold text-ink">
              {tour.rating}
            </span>
            <span aria-hidden="true">{`· ${tour.durationHours} h`}</span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          <PriceTierBadge tier={tier} labelOnly />
          <p className="mt-1 text-[12px] font-semibold text-mist">Est. rate</p>
          <AffiliateLink
            partner="viator"
            destination={tour.destination}
            campaign="tour-card"
            className="mt-1 px-3 py-2 text-[13px]"
          >
            Check Availability
          </AffiliateLink>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-lg border border-sand bg-paper p-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-200 ease-out">
      <p className="eyebrow text-terracotta-ink">{tour.destination}</p>
      <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-ink">{tour.title}</h3>
      <p className="mt-2 flex items-center gap-1.5" aria-label={ratingLabel}>
        <Star aria-hidden="true" className="size-4 fill-gold text-gold" />
        <span aria-hidden="true" className="font-bold">
          {tour.rating}
        </span>
        <span aria-hidden="true" className="text-[13px] text-mist">{`(${reviewLabel} reviews)`}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[12px] font-semibold text-ink">
          <Clock aria-hidden="true" className="size-3.5 shrink-0" />
          {`${tour.durationHours} h`}
        </span>
        <PriceTierBadge tier={tier} />
        <span className="inline-flex items-center rounded-full bg-canvas px-2.5 py-1 text-[12px] font-semibold text-mist ring-1 ring-sand">
          {formatEstimateFrom(tour.priceFrom, tour.currency)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mist">{tour.summary}</p>
      <div className="mt-3">
        <LivePriceWidget compact />
      </div>
      <div className="mt-4">
        <AffiliateLink
          partner="viator"
          destination={tour.destination}
          campaign="tour-card"
          className="text-[14px]"
        >
          Check Availability
        </AffiliateLink>
      </div>
    </article>
  );
}

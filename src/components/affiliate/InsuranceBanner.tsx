import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import type { InsuranceBannerProps } from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";

/**
 * Inline insurance comparison block for articles: three sized plans with an
 * FTC mini-disclosure linking to the full /disclosure page.
 */
export function InsuranceBanner({ plans, heading }: InsuranceBannerProps) {
  const headingId = "insurance-banner-heading";

  return (
    <section
      id="insurance-banner"
      aria-labelledby={headingId}
      className="rounded-lg border border-sand bg-sand p-6 md:p-8"
    >
      <h3 id={headingId} className="font-serif text-xl font-bold text-navy">
        {heading ?? "Travel insurance, sized honestly"}
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="flex flex-col rounded-md border border-sand bg-paper p-4">
            <p className="text-[15px] font-semibold text-ink">{plan.name}</p>
            <p className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
              <span className="font-serif text-2xl font-bold text-navy">{plan.priceLabel}</span>
              <span className="text-[12px] text-mist">{plan.periodLabel}</span>
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-mist">{plan.summary}</p>
            <div className="mt-3 space-y-1.5">
              <p className="flex items-start gap-1.5 text-[13px] text-ink">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-moss" />
                {plan.medicalLimit}
              </p>
              <p className="flex items-start gap-1.5 text-[13px] text-ink">
                <ShieldCheck aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-moss" />
                {plan.deductibleLabel}
              </p>
            </div>
            <ul className="mt-3 space-y-1.5">
              {plan.coverageHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-1.5 text-[13px] text-ink">
                  <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-moss" />
                  {highlight}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <span className="inline-block rounded-full bg-moss/10 px-2.5 py-1 text-[12px] font-semibold text-moss">
                {`Best for: ${plan.bestFor}`}
              </span>
            </p>
            <div className="mt-auto pt-4">
              <AffiliateLink
                partner={plan.partner}
                destination="travel insurance"
                campaign="insurance-banner"
                className="text-[13.5px]"
              >
                Get a Quick Quote
              </AffiliateLink>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] text-mist">
        {"We earn a referral fee — "}
        <Link
          href="/disclosure"
          className="underline underline-offset-2 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          full disclosure
        </Link>
      </p>
    </section>
  );
}

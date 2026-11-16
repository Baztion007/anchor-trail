import type {
  ContentRef,
  Deal,
  Hostel,
  InsurancePlan,
  PartnerId,
  PickBoxProps,
  Stay,
  Tour,
} from "@/types/affiliate";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { getDealById } from "@/data/deals";
import { getHostelById } from "@/data/hostels";
import { getInsurancePlanById } from "@/data/insurance";
import { getStayById } from "@/data/stays";
import { getTourById } from "@/data/tours";

interface ResolvedCta {
  partner: PartnerId;
  destination: string;
}

/**
 * Resolve a ContentRef against the datasets. Returns null when the reference
 * points at something that no longer exists, so the card degrades to a plain
 * summary without a dead monetized link.
 */
function resolveCta(ref: ContentRef): ResolvedCta | null {
  switch (ref.type) {
    case "deal": {
      const deal: Deal | null | undefined = getDealById(ref.id);
      return deal ? { partner: deal.partner, destination: ref.label } : null;
    }
    case "tour": {
      const tour: Tour | null | undefined = getTourById(ref.id);
      return tour ? { partner: "viator", destination: tour.destination } : null;
    }
    case "stay": {
      const stay: Stay | null | undefined = getStayById(ref.id);
      return stay ? { partner: "booking", destination: `${stay.city}, ${stay.country}` } : null;
    }
    case "hostel": {
      const hostel: Hostel | null | undefined = getHostelById(ref.id);
      return hostel
        ? { partner: "hostelworld", destination: `${hostel.city}, ${hostel.country}` }
        : null;
    }
    case "insurance": {
      const plan: InsurancePlan | null | undefined = getInsurancePlanById(ref.id);
      return plan ? { partner: "safetywing", destination: "travel insurance" } : null;
    }
    default:
      return null;
  }
}

/**
 * "Quick Summary: Top Picks" block — three verdict cards pulled from the
 * article's picks, each with a live-pricing outbound link when resolvable.
 */
export function PickBox({ picks }: PickBoxProps) {
  return (
    <section
      id="quick-picks"
      aria-labelledby="quick-picks-heading"
      className="my-8 rounded-lg border border-sand bg-sand/60 p-6"
    >
      <h2 id="quick-picks-heading" className="font-serif text-xl font-bold text-navy">
        Quick Summary: Top Picks
      </h2>
      <p className="mt-1 text-[13px] text-mist">
        Jump to the verdicts — each pick links out to live pricing.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {picks.map((pick) => {
          const cta = resolveCta(pick.ref);
          return (
            <div
              key={`${pick.ref.type}-${pick.ref.id}`}
              className="flex flex-col rounded-md border border-sand bg-paper p-4"
            >
              <p className="eyebrow text-terracotta-ink">{pick.label}</p>
              <h3 className="mt-1.5 text-[15px] font-semibold text-ink">{pick.ref.label}</h3>
              <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed text-mist">
                {pick.ref.why}
              </p>
              {cta ? (
                <AffiliateLink
                  partner={cta.partner}
                  destination={cta.destination}
                  campaign="quick-pick"
                  className="mt-3 text-[13.5px]"
                >
                  Check live price
                </AffiliateLink>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

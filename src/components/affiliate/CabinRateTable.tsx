import Link from "next/link";
import { Check, Info, Minus, TriangleAlert } from "lucide-react";
import type { CabinRate, CabinRateTableProps } from "@/types/affiliate";
import { PriceTierBadge } from "@/components/affiliate/PriceTierBadge";
import { cn } from "@/lib/utils";

const PARTNER_NAMES: Record<CabinRate["partner"], string> = {
  cruisedirect: "CruiseDirect",
  expedia: "Expedia",
};

const AVAILABILITY_STYLES = {
  Available: { badge: "bg-moss/10 text-moss", Icon: Check },
  Limited: { badge: "bg-gold/15 text-gold-ink", Icon: TriangleAlert },
  Waitlist: { badge: "bg-sand text-mist", Icon: Minus },
} as const;

const DEFAULT_DISCLOSURE_PREFIX =
  "Fares are approximate and fluctuate based on season and availability — the partner always shows the live, bookable rate. We may earn a commission when you book through our partners, at no extra cost to you — see our ";

/**
 * Cabin fare comparison table for cruise articles. Sticky cabin column, live
 * partner attribution, and a fare-disclosure footnote tied to the table via
 * aria-describedby.
 */
export function CabinRateTable({ caption, rates, disclosureNote }: CabinRateTableProps) {
  return (
    <>
      <div className="overflow-x-auto scroll-slim rounded-lg border border-sand bg-paper">
        <table className="w-full min-w-[640px] text-sm" aria-describedby="cabin-fare-disclosure">
          <caption className="px-4 pb-2 pt-4 text-left text-[13px] font-semibold text-mist">
            {caption}
          </caption>
          <thead>
            <tr>
              {["Cabin", "Included Perks", "Book With", "Fare Tier", "Availability"].map((header, ci) => (
                <th
                  key={header}
                  scope="col"
                  className={cn(
                    "border-b border-sand bg-canvas px-4 py-2.5 text-left text-[12px] font-bold uppercase tracking-wide text-mist",
                    ci === 0 && "sticky left-0 z-10"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => {
              const availability = AVAILABILITY_STYLES[rate.availability];
              return (
                <tr key={rate.id} className="border-b border-sand/60 last:border-0">
                  <th
                    scope="row"
                    className="sticky left-0 border-r border-sand/60 bg-paper px-4 py-3 text-left align-top"
                  >
                    <span className="font-semibold text-ink">{rate.cabin}</span>
                    <span className="mt-0.5 block text-[12px] font-normal text-mist">
                      {rate.occupancy}
                    </span>
                  </th>
                  <td className="px-4 py-3 text-[13px] text-ink">{rate.perks.join(" · ")}</td>
                  <td className="px-4 py-3 text-ink">{PARTNER_NAMES[rate.partner]}</td>
                  <td className="px-4 py-3">
                    <PriceTierBadge
                      tier={rate.price >= 5000 ? 3 : rate.price >= 2000 ? 2 : 1}
                      className="whitespace-nowrap"
                    />
                    <span className="mt-1 block text-[12px] text-mist">
                      {`per ${rate.per} · live rate at partner`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold",
                        availability.badge
                      )}
                    >
                      <availability.Icon aria-hidden="true" className="size-3.5 shrink-0" />
                      {rate.availability}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p id="cabin-fare-disclosure" className="mt-3 flex items-start gap-2 text-[12.5px] text-mist">
        <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        <span>
          {disclosureNote ?? (
            <>
              {DEFAULT_DISCLOSURE_PREFIX}
              <Link
                href="/disclosure"
                className="underline underline-offset-2 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                full disclosure
              </Link>
              .
            </>
          )}
        </span>
      </p>
    </>
  );
}

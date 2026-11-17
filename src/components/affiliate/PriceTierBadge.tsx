import { TIER_LABELS, type PriceTier } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const TIER_STYLES: Record<PriceTier, string> = {
  1: "bg-moss/10 text-moss",
  2: "bg-gold/15 text-gold-ink",
  3: "gold-gradient text-navy",
} as const;

interface PriceTierBadgeProps {
  tier: PriceTier;
  /** Visually hide the label text ("$ Budget" etc.) for compact spots. */
  labelOnly?: boolean;
  className?: string;
}

/**
 * Budget Tier badge ($ Budget / $$ Mid-range / $$$ Luxury). Part of the
 * pricing strategy: tier signals spend level without hardcoding a rate
 * that booking platforms invalidate weekly.
 */
export function PriceTierBadge({ tier, labelOnly = false, className }: PriceTierBadgeProps) {
  const label = TIER_LABELS[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        TIER_STYLES[tier],
        className
      )}
    >
      <span aria-hidden="true">{label.split(" ")[0]}</span>
      {labelOnly ? <span className="sr-only">{label}</span> : <span>{label.split(" ").slice(1).join(" ")}</span>}
    </span>
  );
}

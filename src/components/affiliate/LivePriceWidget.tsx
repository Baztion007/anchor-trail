import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface LivePriceWidgetProps {
  /** Slim variant for compact cards and row-style listings. */
  compact?: boolean;
  className?: string;
}

/**
 * Reserved slot for the affiliate partner's live pricing widget.
 *
 * Per the pricing strategy, booking cards never display a hardcoded rate:
 * this clean placeholder marks where the partner's live-rate embed renders
 * once the affiliate integration is wired up. The exact label text is
 * intentional — it is the integration contract.
 */
export function LivePriceWidget({ compact = false, className }: LivePriceWidgetProps) {
  return (
    <div
      role="note"
      aria-label="Placeholder for the affiliate live price widget"
      className={cn(
        "flex items-center gap-2.5 rounded-md border border-dashed border-sand bg-canvas text-mist",
        compact ? "px-3 py-2" : "px-4 py-3",
        className
      )}
    >
      <LayoutDashboard aria-hidden="true" className="size-4 shrink-0 text-gold-ink" />
      <div className="min-w-0 leading-snug">
        <p className={cn("font-mono font-semibold text-ink", compact ? "text-[11.5px]" : "text-[12.5px]")}>
          [Insert Affiliate Live Price Widget Here]
        </p>
        {!compact ? (
          <p className="mt-0.5 text-[11.5px]">
            Live partner rates render in this slot — never a cached fare.
          </p>
        ) : null}
      </div>
    </div>
  );
}

import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceDisclaimerProps {
  /** "dark" renders for navy footer surfaces; default suits paper/sand sections. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Site-wide pricing disclaimer, required near every pricing section and in
 * the footer. Wording is fixed by the pricing strategy.
 */
export function PriceDisclaimer({ tone = "light", className }: PriceDisclaimerProps) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 text-[12.5px] leading-relaxed",
        tone === "light" ? "text-mist" : "text-canvas/65",
        className
      )}
    >
      <Info
        aria-hidden="true"
        className={cn("mt-0.5 size-3.5 shrink-0", tone === "light" ? "text-gold-ink" : "text-gold")}
      />
      <span>
        Prices are approximate and fluctuate based on season and availability. Booking through
        our links comes at no extra cost to you.
      </span>
    </p>
  );
}

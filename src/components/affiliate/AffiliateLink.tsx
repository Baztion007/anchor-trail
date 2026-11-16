import { ExternalLink } from "lucide-react";
import { getAffiliateProps } from "@/lib/affiliate";
import type { AffiliateLinkProps } from "@/types/affiliate";
import { cn } from "@/lib/utils";

/**
 * The ONLY sanctioned way to render an outbound monetized link.
 * Renders an accessible anchor: descriptive visible text (supplied by the
 * caller), an aria-hidden external-link icon, and an sr-only new-window
 * warning. FTC rel attributes and _blank come from getAffiliateProps.
 */
export function AffiliateLink({
  partner,
  destination,
  campaign,
  subId,
  extraParams,
  children,
  className,
  showIcon = true,
}: AffiliateLinkProps) {
  const anchorProps = getAffiliateProps({
    partner,
    destination,
    campaign,
    subId,
    extraParams,
  });

  return (
    <a
      {...anchorProps}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 transition-colors duration-150 ease-out hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
        className
      )}
    >
      {children}
      {showIcon && (
        <ExternalLink aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
      )}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

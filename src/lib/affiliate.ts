import { partners } from "@/data/partners";
import type { AffiliateLinkInput } from "@/types/affiliate";

const SITE_SOURCE = "anchor-and-trail";
const AFFILIATE_REL = "nofollow sponsored noopener noreferrer";

/**
 * Central affiliate link builder.
 *
 * Every outbound monetized link on the site MUST go through this function
 * (directly or via the <AffiliateLink> component). Raw outbound URLs in
 * components are forbidden.
 *
 * Behavior:
 * - Partners with a buildUrl function get their URL from it directly
 *   (currently none — the 12Go/Hostelworld path builders left with those
 *   partners; the hook stays for future path-based search URLs)
 * - All other partners start from the registered base URL and map the
 *   destination onto their documented dynamic query key
 * - bareLink partners (tpx.lu shortlinks) go out verbatim
 * - Appends the partner's static tracking params (affiliate id, medium)
 * - Guarantees a utm_source of "anchor-and-trail"
 */
export function buildAffiliateLink(input: AffiliateLinkInput): string {
  const partner = partners[input.partner];

  // Verbatim shortlinks (tpx.lu etc.): attribution lives in the redirect path
  // and the redirector drops appended query params, so return it untouched.
  if (partner.bareLink) {
    return partner.buildUrl ? partner.buildUrl(input.destination) : partner.baseUrl;
  }

  const rawUrl = partner.buildUrl ? partner.buildUrl(input.destination) : partner.baseUrl;
  const url = new URL(rawUrl);

  const dyn = partner.dynamicParamMap ?? {};
  if (dyn.destination) {
    url.searchParams.set(dyn.destination, input.destination);
  }
  if (dyn.campaign) {
    url.searchParams.set(dyn.campaign, input.campaign);
  }
  if (dyn.subId && input.subId) {
    url.searchParams.set(dyn.subId, input.subId);
  }

  for (const [key, value] of Object.entries(partner.tracking)) {
    url.searchParams.set(key, value);
  }

  if (input.extraParams) {
    for (const [key, value] of Object.entries(input.extraParams)) {
      url.searchParams.set(key, value);
    }
  }

  if (!url.searchParams.has("utm_source")) {
    url.searchParams.set("utm_source", SITE_SOURCE);
  }

  return url.toString();
}

/**
 * Spreadable anchor props for affiliate links, including the FTC-required
 * rel attribute and new-tab behavior.
 */
export function getAffiliateProps(input: AffiliateLinkInput): {
  href: string;
  rel: typeof AFFILIATE_REL;
  target: "_blank";
} {
  return {
    href: buildAffiliateLink(input),
    rel: AFFILIATE_REL,
    target: "_blank",
  };
}

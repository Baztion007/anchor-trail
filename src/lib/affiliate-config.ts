import { partnerList, partners } from "@/data/partners";
import type { PartnerId } from "@/types/affiliate";

/**
 * Affiliate configuration audit.
 *
 * Reports, per partner, whether the outbound link carries a real account
 * credential or the built-in "at-demo" placeholder. Used by:
 * - GET /api/affiliate-status (feeds the owner-only ?affiliate-check=1 panel)
 * - scripts/check-config.ts (CLI gate for CI / pre-launch checks)
 *
 * Two credential styles, both read from what the link builder ACTUALLY sends:
 * - Env-driven partners (Booking, Viator, CruiseDirect, Hostelworld, 12Go,
 *   Omio, Travelpayouts): the credential arrives via NEXT_PUBLIC_* and the
 *   registry falls back to "at-demo" (or omits the param for marker-style
 *   partners) when unset.
 * - Registry-baked partners (SafetyWing, Expedia Cruises, Klook): the live
 *   credential is baked into src/data/partners.ts as the fallback — affiliate
 *   IDs are public in every outbound link, so this is safe — and read()
 *   inspects the registry value (which still honors env overrides).
 */

export type AffiliateConfigStatus = "live" | "demo" | "missing";

export interface PartnerConfigStatus {
  partnerId: PartnerId;
  name: string;
  network: string;
  /** Query parameter that must carry the real account credential. */
  param: string;
  /** Environment variable that supplies it. */
  envVar: string;
  status: AffiliateConfigStatus;
  /** Owner-facing consequence of the current state. */
  impact: string;
}

export interface AffiliateConfigSummary {
  checkedAt: string;
  allLive: boolean;
  liveCount: number;
  totalCount: number;
  partners: PartnerConfigStatus[];
  issues: PartnerConfigStatus[];
}

const DEMO_FALLBACK = "at-demo";

interface ParamSpec {
  param: string;
  envVar: string;
  /**
   * Marker-style partners omit the tracking param entirely when unset AND
   * downgrade the landing URL to the network homepage — reported as
   * "missing" (strictly worse than a placeholder value).
   */
  omitsParamWhenMissing?: boolean;
  landingWithoutTracking: string;
  /**
   * Overrides the default env-var lookup for registry-baked partners: returns
   * the credential value the link builder will actually send (env override
   * already applied inside the registry). Return undefined when the value is
   * absent or fails its format check, and the partner reports as demo/missing.
   */
  read?: () => string | undefined;
}

/** One row per PartnerId — keep in sync with src/data/partners.ts. */
const PARAM_SPECS: Record<PartnerId, ParamSpec> = {
  travelpayouts: {
    param: "marker",
    envVar: "NEXT_PUBLIC_TP_MARKER",
    omitsParamWhenMissing: true,
    landingWithoutTracking: "travelpayouts.com (network homepage)",
  },
  booking: {
    param: "aid",
    envVar: "NEXT_PUBLIC_BOOKING_AID",
    landingWithoutTracking: "Booking.com search results",
  },
  viator: {
    param: "mc_id",
    envVar: "NEXT_PUBLIC_VIATOR_MC",
    landingWithoutTracking: "Viator search results",
  },
  klook: {
    param: "tpx.lu shortlink",
    envVar: "NEXT_PUBLIC_KLOOK_LINK",
    landingWithoutTracking: "klook.com (untracked)",
    read: () => {
      const base = partners.klook.baseUrl;
      // The tpx.lu path IS the credential (verified 302 →
      // affiliate.klook.com/redirect with aid/pid in the query it builds).
      return base.includes("tpx.lu/") ? base : undefined;
    },
  },
  cruisedirect: {
    param: "ref",
    envVar: "NEXT_PUBLIC_CD_REF",
    landingWithoutTracking: "cruisedirect.com homepage",
  },
  "expedia-cruises": {
    param: "affiliate path",
    envVar: "NEXT_PUBLIC_EXPEDIA_AFF",
    landingWithoutTracking: "expedia.com/cruises hub",
    read: () => {
      // The credential is the /affiliates/{affiliate-id}/{campaign-id} PATH,
      // not a query param. A malformed override fails the format check here.
      const base = partners["expedia-cruises"].baseUrl;
      return base.includes("/affiliates/") ? base : undefined;
    },
  },
  hostelworld: {
    param: "partner",
    envVar: "NEXT_PUBLIC_HW_PID",
    landingWithoutTracking: "Hostelworld city page",
  },
  safetywing: {
    param: "referenceID",
    envVar: "NEXT_PUBLIC_SW_REF",
    landingWithoutTracking: "safetywing.com",
    read: () => partners.safetywing.tracking.referenceID,
  },
  "twelve-go": {
    param: "afc",
    envVar: "NEXT_PUBLIC_12GO_AFC",
    landingWithoutTracking: "12go.asia",
  },
  omio: {
    param: "afc",
    envVar: "NEXT_PUBLIC_OMIO_AFC",
    landingWithoutTracking: "omio.com",
  },
};

export function getPartnerConfigStatuses(): PartnerConfigStatus[] {
  return partnerList.map((partner) => {
    const spec = PARAM_SPECS[partner.id];
    const value = spec.read ? spec.read() : process.env[spec.envVar];
    const configured =
      typeof value === "string" && value.length > 0 && value !== DEMO_FALLBACK;

    if (configured) {
      return {
        partnerId: partner.id,
        name: partner.name,
        network: partner.network,
        param: spec.param,
        envVar: spec.envVar,
        status: "live",
        impact: `Live credential: every click sends your real ${spec.param} and attributes to your account.`,
      };
    }

    if (spec.omitsParamWhenMissing) {
      return {
        partnerId: partner.id,
        name: partner.name,
        network: partner.network,
        param: spec.param,
        envVar: spec.envVar,
        status: "missing",
        impact: `No ${spec.envVar} set: the tracking param is omitted and links land on ${spec.landingWithoutTracking} with NO tracking. Commissions are lost on every click.`,
      };
    }

    return {
      partnerId: partner.id,
      name: partner.name,
      network: partner.network,
      param: spec.param,
      envVar: spec.envVar,
      status: "demo",
      impact: `Placeholder "${DEMO_FALLBACK}" is sent as ${spec.param}: clicks land on ${spec.landingWithoutTracking}, bookings work, but NO commission is attributed. Set ${spec.envVar} before launch.`,
    };
  });
}

export function getAffiliateConfigSummary(): AffiliateConfigSummary {
  const partners = getPartnerConfigStatuses();
  const issues = partners.filter((p) => p.status !== "live");
  return {
    checkedAt: new Date().toISOString(),
    allLive: issues.length === 0,
    liveCount: partners.length - issues.length,
    totalCount: partners.length,
    partners,
    issues,
  };
}

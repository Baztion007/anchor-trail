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
 * - Registry-baked partners (SafetyWing, Expedia, Klook, Go City, Welcome
 *   Pickups, Omio, CruiseDirect): the live credential is baked into
 *   src/data/partners.ts as the fallback — affiliate IDs are public in every
 *   outbound link, so this is safe — and read() inspects the registry value
 *   (which still honors env overrides). Travelpayouts was retired as a direct
 *   partner in Nov 2026, so there are no env-driven partners left.
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
  "go-city": {
    param: "tpx.lu shortlink",
    envVar: "NEXT_PUBLIC_GOCITY_LINK",
    landingWithoutTracking: "gocity.com (untracked)",
    read: () => {
      const base = partners["go-city"].baseUrl;
      // The tpx.lu path IS the credential (verified 302 → prf.hn/click with
      // the camref in the redirect path).
      return base.includes("tpx.lu/") ? base : undefined;
    },
  },
  "welcome-pickups": {
    param: "tpx.lu shortlink",
    envVar: "NEXT_PUBLIC_WP_LINK",
    landingWithoutTracking: "welcomepickups.com (untracked)",
    read: () => {
      const base = partners["welcome-pickups"].baseUrl;
      // The tpx.lu path IS the credential (verified 302 with aff_track_id
      // injected by the redirector).
      return base.includes("tpx.lu/") ? base : undefined;
    },
  },
  cruisedirect: {
    param: "CJ click link",
    envVar: "NEXT_PUBLIC_CD_CJ",
    landingWithoutTracking: "cruisedirect.com homepage",
    read: () => {
      const base = partners.cruisedirect.baseUrl;
      // The click-{advertiser}-{campaign} PATH IS the credential (verified
      // 302 → cj.dotomi.com).
      return base.includes("jdoqocy.com/click-") ? base : undefined;
    },
  },
  expedia: {
    param: "affiliate path",
    envVar: "NEXT_PUBLIC_EXPEDIA_AFF",
    landingWithoutTracking: "expedia.com affiliate hub",
    read: () => {
      // The credential is the /affiliates/{affiliate-id}/{campaign-id} PATH,
      // not a query param. A malformed override fails the format check here.
      const base = partners.expedia.baseUrl;
      return base.includes("/affiliates/") ? base : undefined;
    },
  },
  safetywing: {
    param: "referenceID",
    envVar: "NEXT_PUBLIC_SW_REF",
    landingWithoutTracking: "safetywing.com",
    read: () => partners.safetywing.tracking.referenceID,
  },
  omio: {
    param: "Impact shortlink",
    envVar: "NEXT_PUBLIC_OMIO_LINK",
    landingWithoutTracking: "omio.com (untracked)",
    read: () => {
      const base = partners.omio.baseUrl;
      // The sjv.io path IS the credential (verified 302 → ojrq.net →
      // omio.sjv.io/c/7831404/409973/7385 — campaign/advertiser/partner in
      // the redirect path).
      return base.includes("sjv.io/") ? base : undefined;
    },
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

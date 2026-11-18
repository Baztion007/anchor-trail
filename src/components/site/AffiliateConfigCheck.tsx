"use client";

import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, RefreshCcw, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AffiliateConfigSummary, AffiliateConfigStatus } from "@/lib/affiliate-config";

/**
 * Owner-only affiliate credential audit.
 *
 * Invisible to visitors: it mounts on every page but renders nothing unless
 * the URL carries ?affiliate-check=1 (e.g. anchorandtrail.com/?affiliate-check=1).
 * It fetches /api/affiliate-status and flags every partner still sending the
 * "at-demo" placeholder — so untracked links can never go unnoticed before
 * launch. robots.ts disallows /api/, and the panel renders no outbound links.
 *
 * In development it additionally warns to the console when placeholders exist.
 */

const STATUS_META: Record<
  AffiliateConfigStatus,
  { chip: string; label: string; dot: string }
> = {
  live: {
    chip: "bg-moss/10 text-moss border-moss/30",
    label: "LIVE",
    dot: "bg-moss",
  },
  demo: {
    chip: "bg-gold/15 text-gold-ink border-gold/40",
    label: "DEMO ID",
    dot: "bg-gold",
  },
  missing: {
    chip: "bg-terracotta/10 text-terracotta-ink border-terracotta/40",
    label: "NO ID",
    dot: "bg-terracotta",
  },
};

type LoadState =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; data: AffiliateConfigSummary };

export function AffiliateConfigCheck() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<LoadState>({ phase: "loading" });

  const load = useCallback(async () => {
    setState({ phase: "loading" });
    try {
      const res = await fetch("/api/affiliate-status", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as AffiliateConfigSummary;
      setState({ phase: "ready", data });

      if (process.env.NODE_ENV === "development" && !data.allLive) {
        console.warn(
          `[affiliate-check] ${data.totalCount - data.liveCount} of ${data.totalCount} partners are on placeholder credentials. Open /?affiliate-check=1 for details.`
        );
      }
    } catch {
      setState({ phase: "error" });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("affiliate-check") === "1") {
      setEnabled(true);
      void load();
    }
  }, [load]);

  if (!enabled) return null;

  return (
    <aside
      role="complementary"
      aria-label="Affiliate configuration check (owner tool)"
      className="fixed bottom-4 right-4 z-[90] flex max-h-[min(72vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-lg border border-sand bg-paper shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-navy px-4 py-3 text-canvas">
        <div className="min-w-0">
          <p className="eyebrow text-gold">Owner tool</p>
          <h2 className="truncate font-serif text-[15px] font-bold">
            Affiliate Config Check
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setEnabled(false)}
          aria-label="Close affiliate configuration check"
          className="flex size-9 shrink-0 items-center justify-center rounded-md text-canvas/80 hover:bg-white/10 hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-safe:transition-colors motion-safe:duration-150 ease-out"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>

      {/* Body */}
      <div className="scroll-slim flex-1 overflow-y-auto">
        {state.phase === "loading" && (
          <p role="status" className="px-4 py-6 text-center text-[13px] font-semibold text-mist">
            Reading partner configuration…
          </p>
        )}

        {state.phase === "error" && (
          <div className="px-4 py-6 text-center">
            <p className="text-[13px] text-ink/85">
              Couldn&apos;t load the configuration audit.
            </p>
            <button
              type="button"
              onClick={() => void load()}
              className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-sand bg-canvas px-3 text-[13px] font-semibold text-navy hover:bg-sand/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-150 ease-out"
            >
              <RefreshCcw aria-hidden="true" className="size-3.5" />
              Retry
            </button>
          </div>
        )}

        {state.phase === "ready" && (
          <>
            <p
              className={cn(
                "flex items-center gap-2 border-b border-sand px-4 py-3 text-[13px] font-semibold",
                state.data.allLive ? "bg-moss/5 text-moss" : "bg-terracotta/5 text-terracotta-ink"
              )}
            >
              {state.data.allLive ? (
                <BadgeCheck aria-hidden="true" className="size-4 shrink-0" />
              ) : (
                <TriangleAlert aria-hidden="true" className="size-4 shrink-0" />
              )}
              <span aria-live="polite">
                {state.data.liveCount} of {state.data.totalCount} partners on live credentials
              </span>
            </p>

            <ul className="divide-y divide-sand">
              {state.data.partners.map((partner) => {
                const meta = STATUS_META[partner.status];
                return (
                  <li key={partner.partnerId} className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex min-w-0 items-center gap-2 text-[13.5px] font-semibold text-navy">
                        <span
                          aria-hidden="true"
                          className={cn("size-2 shrink-0 rounded-full", meta.dot)}
                        />
                        <span className="truncate">{partner.name}</span>
                      </p>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] font-bold tracking-wide",
                          meta.chip
                        )}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-mist">
                      {partner.envVar} → {partner.param}=
                    </p>
                    {partner.status !== "live" && (
                      <p className="mt-1 text-[12px] leading-snug text-ink/80">
                        {partner.impact}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="border-t border-sand bg-canvas px-4 py-3 text-[11.5px] leading-snug text-mist">
              Add the real IDs to <span className="font-mono">.env</span>, then
              redeploy. This panel never appears for visitors without the
              <span className="font-mono"> ?affiliate-check=1</span> parameter.
            </p>
          </>
        )}
      </div>
    </aside>
  );
}

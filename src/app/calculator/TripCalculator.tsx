"use client";

import Link from "next/link";
import {
  Hotel,
  MapPinned,
  Plane,
  ShieldCheck,
  Ship,
  Tent,
  TrainFront,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import type { FormEvent } from "react";
import { AffiliateLink } from "@/components/affiliate/AffiliateLink";
import { PriceDisclaimer } from "@/components/site/PriceDisclaimer";
import { budgetRates } from "@/data/budget";
import { UnknownDestinationError, computeTripCost } from "@/lib/calculator";
import { cn } from "@/lib/utils";
import type { ChecklistItem, TripCostResult, Vertical } from "@/types/affiliate";

interface TripInputs {
  style: Vertical;
  destinationId: string;
  days: string;
  travelers: string;
}

interface SubmittedTrip {
  result: TripCostResult;
  days: number;
  travelers: number;
}

const STORAGE_KEY = "at:trip-inputs";
const DEFAULT_INPUTS: TripInputs = {
  style: "cruise",
  destinationId: "",
  days: "7",
  travelers: "2",
};

/* ------------------------------------------------------------------ */
/* External store: trip inputs persisted to localStorage               */
/* ------------------------------------------------------------------ */

const storeListeners = new Set<() => void>();
let storedInputs: TripInputs | null = null; // null = not yet read on client

function readStoredInputs(): TripInputs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isValidInputs(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Corrupt or unavailable storage — fall back to defaults silently.
  }
  return DEFAULT_INPUTS;
}

function subscribeInputs(listener: () => void): () => void {
  storeListeners.add(listener);
  return () => {
    storeListeners.delete(listener);
  };
}

function getInputsSnapshot(): TripInputs {
  if (storedInputs === null) {
    storedInputs = readStoredInputs();
  }
  return storedInputs;
}

function getInputsServerSnapshot(): TripInputs {
  return DEFAULT_INPUTS;
}

function commitInputs(next: TripInputs): void {
  storedInputs = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, quota) — the form still works.
  }
  storeListeners.forEach((listener) => listener());
}

function clearStoredInputs(): void {
  storedInputs = DEFAULT_INPUTS;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clean up.
  }
  storeListeners.forEach((listener) => listener());
}

const CHECKLIST_ICONS: Record<ChecklistItem["category"], LucideIcon> = {
  flights: Plane,
  stays: Hotel,
  activities: MapPinned,
  insurance: ShieldCheck,
  transit: TrainFront,
};

function isValidInputs(value: unknown): value is TripInputs {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    (record.style === "cruise" || record.style === "backpacking") &&
    typeof record.destinationId === "string" &&
    typeof record.days === "string" &&
    typeof record.travelers === "string"
  );
}

/** Keep typed numbers inside the honest-math range; "" is allowed while typing. */
function clampField(raw: string, min: number, max: number): string {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return "";
  return String(Math.min(max, Math.max(min, parsed)));
}

const inputClasses =
  "mt-1.5 w-full min-h-[44px] rounded-md border border-input bg-paper px-3 text-sm text-ink shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out";

export function TripCalculator() {
  const inputs = useSyncExternalStore(
    subscribeInputs,
    getInputsSnapshot,
    getInputsServerSnapshot
  );
  const [submitted, setSubmitted] = useState<SubmittedTrip | null>(null);
  const [destError, setDestError] = useState(false);

  function updateInputs(partial: Partial<TripInputs>) {
    commitInputs({ ...getInputsSnapshot(), ...partial });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!inputs.destinationId) {
      setDestError(true);
      setSubmitted(null);
      return;
    }
    setDestError(false);

    const days = Number.parseInt(inputs.days, 10);
    const travelers = Number.parseInt(inputs.travelers, 10);
    try {
      const result = computeTripCost({
        style: inputs.style,
        destinationId: inputs.destinationId,
        days: Number.isNaN(days) ? 7 : days,
        travelers: Number.isNaN(travelers) ? 2 : travelers,
      });
      setSubmitted({
        result,
        days: Number.isNaN(days) ? 7 : days,
        travelers: Number.isNaN(travelers) ? 2 : travelers,
      });
    } catch (error) {
      if (error instanceof UnknownDestinationError) {
        setDestError(true);
        setSubmitted(null);
      } else {
        throw error;
      }
    }
  }

  function handleReset() {
    clearStoredInputs();
    setSubmitted(null);
    setDestError(false);
  }

  const radioBase =
    "relative flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md border p-4 text-left motion-safe:transition-colors motion-safe:duration-200 ease-out";

  return (
    <div className="mt-8 max-w-3xl">
      <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-sand bg-paper p-6 shadow-sm">
        {/* Travel style */}
        <fieldset>
          <legend className="text-[14px] font-semibold text-ink">Travel style</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label
              className={cn(
                radioBase,
                inputs.style === "cruise"
                  ? "border-navy bg-navy text-canvas has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold"
                  : "border-sand bg-canvas text-ink hover:border-navy/50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy"
              )}
            >
              <input
                type="radio"
                name="style"
                value="cruise"
                checked={inputs.style === "cruise"}
                onChange={() => updateInputs({ style: "cruise" })}
                className="sr-only"
              />
              <Ship aria-hidden="true" className="size-5 shrink-0" />
              <span className="text-[15px] font-semibold">Luxury Cruise</span>
            </label>
            <label
              className={cn(
                radioBase,
                inputs.style === "backpacking"
                  ? "border-moss bg-moss text-canvas has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold"
                  : "border-sand bg-canvas text-ink hover:border-moss/50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy"
              )}
            >
              <input
                type="radio"
                name="style"
                value="backpacking"
                checked={inputs.style === "backpacking"}
                onChange={() => updateInputs({ style: "backpacking" })}
                className="sr-only"
              />
              <Tent aria-hidden="true" className="size-5 shrink-0" />
              <span className="text-[15px] font-semibold">Budget Backpacking</span>
            </label>
          </div>
        </fieldset>

        {/* Destination */}
        <div className="mt-6">
          <label htmlFor="dest" className="text-[14px] font-semibold text-ink">
            Destination
          </label>
          <select
            id="dest"
            name="destination"
            value={inputs.destinationId}
            onChange={(event) => {
              updateInputs({ destinationId: event.target.value });
              if (destError && event.target.value) {
                setDestError(false);
              }
            }}
            aria-invalid={destError ? true : undefined}
            aria-errormessage={destError ? "dest-error" : undefined}
            className={cn(
              inputClasses,
              destError && "border-terracotta-ink focus-visible:outline-terracotta-ink"
            )}
          >
            <option value="" disabled>
              Choose a destination
            </option>
            {budgetRates.map((rate) => (
              <option key={rate.id} value={rate.id}>
                {rate.destination} — {rate.region}
              </option>
            ))}
          </select>
          {destError ? (
            <p id="dest-error" role="alert" className="mt-1.5 text-[13px] font-semibold text-terracotta-ink">
              Choose a destination to see honest math.
            </p>
          ) : null}
        </div>

        {/* Days + travelers */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="days" className="text-[14px] font-semibold text-ink">
              Days on the trip
            </label>
            <input
              id="days"
              name="days"
              type="number"
              inputMode="numeric"
              min={1}
              max={365}
              value={inputs.days}
              onChange={(event) =>
                updateInputs({
                  days: clampField(event.target.value, 1, 365),
                })
              }
              aria-describedby="days-hint"
              className={inputClasses}
            />
            <p id="days-hint" className="mt-1 text-[12px] text-mist">
              1–365 nights
            </p>
          </div>
          <div>
            <label htmlFor="travelers" className="text-[14px] font-semibold text-ink">
              Travelers
            </label>
            <input
              id="travelers"
              name="travelers"
              type="number"
              inputMode="numeric"
              min={1}
              max={8}
              value={inputs.travelers}
              onChange={(event) =>
                updateInputs({
                  travelers: clampField(event.target.value, 1, 8),
                })
              }
              aria-describedby="travelers-hint"
              className={inputClasses}
            />
            <p id="travelers-hint" className="mt-1 text-[12px] text-mist">
              1–8 people
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-navy px-6 text-[15px] font-semibold text-canvas hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-safe:transition-colors motion-safe:duration-200 ease-out sm:w-auto"
          >
            Calculate My Trip
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-sand bg-canvas px-5 text-[14px] font-semibold text-navy hover:border-navy/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results */}
      <div role="status" aria-live="polite">
        {submitted ? (
          <section aria-label="Trip cost estimate" className="mt-8 rounded-lg border border-sand bg-paper p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-navy">
              Your {submitted.result.destination} estimate
            </h2>
            <p className="mt-3 font-serif text-3xl font-bold text-navy">
              ${submitted.result.totalLow.toLocaleString()} – $
              {submitted.result.totalHigh.toLocaleString()}
            </p>
            <p className="mt-1 text-[13px] text-mist">
              Planning estimate for {submitted.travelers} {submitted.travelers === 1 ? "traveler" : "travelers"}{" "}
              over {submitted.days} {submitted.days === 1 ? "day" : "days"}, flights included.
            </p>

            <PriceDisclaimer className="mt-3" />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-sand bg-canvas p-4">
                <p className="eyebrow text-mist">Per person</p>
                <p className="mt-1.5 font-serif text-lg font-bold text-navy">
                  ${submitted.result.perPersonLow.toLocaleString()} – $
                  {submitted.result.perPersonHigh.toLocaleString()}
                </p>
              </div>
              <div className="rounded-md border border-sand bg-canvas p-4">
                <p className="eyebrow text-mist">Per day, all travelers</p>
                <p className="mt-1.5 font-serif text-lg font-bold text-navy">
                  ${Math.round(submitted.result.totalLow / submitted.days).toLocaleString()} – $
                  {Math.round(submitted.result.totalHigh / submitted.days).toLocaleString()}
                </p>
              </div>
              <div className="rounded-md border border-sand bg-canvas p-4">
                <p className="eyebrow text-mist">Per person per day</p>
                <p className="mt-1.5 font-serif text-lg font-bold text-navy">
                  ${submitted.result.perDayLow.toLocaleString()} – $
                  {submitted.result.perDayHigh.toLocaleString()}
                </p>
              </div>
            </div>

            <h3 className="mt-8 font-serif text-lg font-bold text-navy">Your Booking Checklist</h3>
            <p className="mt-1 text-[13px] text-mist">
              Ranges below are planning estimates — each partner confirms the live rate on its
              own page before you commit to anything.
            </p>
            <ol className="mt-3 space-y-3">
              {submitted.result.checklist.map((item) => {
                const Icon = CHECKLIST_ICONS[item.category];
                return (
                  <li key={item.category} className="rounded-md border border-sand bg-canvas p-4">
                    <div className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sand bg-paper text-navy"
                      >
                        <Icon className="size-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-[15px] text-ink">{item.heading}</p>
                        <p className="mt-1 text-[13.5px] text-mist">{item.copy}</p>
                        <AffiliateLink
                          {...item.link}
                          campaign={item.link.campaign}
                          className="mt-2 text-[13.5px]"
                        >
                          {item.cta}
                        </AffiliateLink>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 text-[12.5px] text-mist">
              Checklist links are affiliate links; we may earn a commission.{" "}
              <Link
                href="/disclosure"
                className="underline decoration-gold underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
              >
                Full disclosure
              </Link>
              .
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}

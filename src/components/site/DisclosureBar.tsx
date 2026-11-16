"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { SHOW_EVENT, STORAGE_KEY } from "@/components/site/disclosure-constants";

/* ------------------------------------------------------------------ */
/* External store: dismissed state persisted in localStorage           */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();
let dismissedState: boolean | null = null; // null = not yet read on client

function ensureInit(): void {
  if (dismissedState === null) {
    try {
      dismissedState = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      dismissedState = false;
    }
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): boolean {
  ensureInit();
  return dismissedState === true;
}

function getServerSnapshot(): boolean {
  return false; // bar renders on the server; client re-syncs after hydration
}

function setDismissed(next: boolean): void {
  ensureInit();
  dismissedState = next;
  try {
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
  listeners.forEach((listener) => listener());
}

/**
 * Persistent FTC affiliate disclosure bar (role="note").
 * Dismissal is stored in localStorage and can be restored from the footer
 * ("Show affiliate disclosure") via the at:disclosure-show event.
 */
export function DisclosureBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Footer restore control dispatches a window event; bridge it into the store.
  useEffect(() => {
    const onShow = () => setDismissed(false);
    window.addEventListener(SHOW_EVENT, onShow);
    return () => window.removeEventListener(SHOW_EVENT, onShow);
  }, []);

  if (dismissed) return null;

  return (
    <section
      role="note"
      aria-label="Affiliate disclosure"
      className="relative bg-navy text-canvas"
    >
      <p className="mx-auto max-w-7xl px-10 py-2.5 text-center text-[13px] leading-relaxed sm:px-12">
        Anchor &amp; Trail earns commissions from partner links. We only feature
        what we would book ourselves.{" "}
        <Link
          href="/disclosure"
          className="font-semibold underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          See how we&apos;re funded
        </Link>
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss affiliate disclosure"
        className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-canvas/80 transition-colors duration-150 ease-out hover:bg-navy-deep hover:text-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </section>
  );
}

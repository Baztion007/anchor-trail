"use client";

import { SHOW_EVENT } from "@/components/site/disclosure-constants";

/**
 * Footer control that restores the dismissed affiliate disclosure bar,
 * per FTC visibility requirements.
 */
export function RestoreDisclosureLink() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          window.localStorage.removeItem("at:disclosure-dismissed");
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event(SHOW_EVENT));
      }}
      className="min-h-[44px] text-left text-sm font-semibold text-canvas/80 underline decoration-gold/70 underline-offset-4 transition-colors duration-150 ease-out hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      Show affiliate disclosure
    </button>
  );
}

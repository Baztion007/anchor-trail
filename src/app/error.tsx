"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Themed to the site palette; offers a retry
 * and a way home instead of the framework's default crash screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the real error for monitoring / devtools.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[65vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="eyebrow text-gold-ink">— Rough Seas —</p>
      <h1 className="mt-2 font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Something ran aground
      </h1>
      <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink/85">
        An unexpected error stopped this page from rendering. Nothing you did —
        this one is on our side. The rest of the site is still open for
        exploring.
      </p>
      {error.digest ? (
        <p className="mt-3 text-[12px] text-mist">
          Error reference: <span className="font-mono">{error.digest}</span>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-[44px] items-center rounded-md bg-navy px-5 text-[14px] font-semibold text-canvas hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center rounded-md border border-sand bg-paper px-5 text-[14px] font-semibold text-navy hover:bg-sand/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="eyebrow text-gold-ink">— Lost Overboard? —</p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-navy">
        This Page Went Off the Map
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist">
        The route you plotted does not exist — it may have been renamed, retired, or swallowed
        by the sea. The good news: both ends of the budget are still fully charted.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-navy px-6 text-[15px] font-semibold text-canvas hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          Back to Anchor &amp; Trail
        </Link>
        <Link
          href="/blog"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-sand bg-paper px-6 text-[15px] font-semibold text-navy hover:border-navy/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
        >
          Browse travel guides
        </Link>
      </div>
    </div>
  );
}

/**
 * Route-level loading state. Pages on this site are statically rendered so
 * this rarely appears — it covers slow networks and the calculator's first
 * hydration so the screen is never blank white.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="flex min-h-[65vh] items-center justify-center px-4"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          aria-hidden="true"
          className="size-9 rounded-full border-[3px] border-sand border-t-navy motion-safe:animate-spin"
        />
        <span className="sr-only">Loading, please wait.</span>
        <span className="text-[13px] font-semibold text-mist">
          Charting the route&hellip;
        </span>
      </div>
    </div>
  );
}

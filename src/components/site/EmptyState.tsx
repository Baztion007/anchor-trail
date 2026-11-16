import Link from "next/link";
import type { EmptyStateProps } from "@/types/affiliate";

/**
 * Dashed "nothing here yet" panel with a single recovery action.
 */
export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-sand bg-paper p-10 text-center">
      <h3 className="font-serif text-xl font-bold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-mist">{description}</p>
      <Link
        href={actionHref}
        className="mt-5 inline-flex min-h-[44px] items-center rounded-md bg-navy px-5 text-[14px] font-semibold text-canvas hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-safe:transition-colors motion-safe:duration-200 ease-out"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

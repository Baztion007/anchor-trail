import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbsProps } from "@/types/affiliate";
import { cn } from "@/lib/utils";

/**
 * Accessible breadcrumb trail. Internal links only (next/link); the final
 * crumb is the current page and is announced via aria-current.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-mist" />
              ) : null}
              {isLast ? (
                <span aria-current="page" className="font-semibold text-navy">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-mist underline decoration-mist/40 underline-offset-2 hover:text-navy",
                    "motion-safe:transition-colors motion-safe:duration-200 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-mist">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

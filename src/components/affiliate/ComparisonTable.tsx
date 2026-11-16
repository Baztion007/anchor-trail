import { Check, Info, Minus, Star, TriangleAlert, X } from "lucide-react";
import type { ComparisonTableProps, TableCell } from "@/types/affiliate";
import { cn } from "@/lib/utils";

const CELL_TONES = {
  good: "text-moss font-semibold",
  warn: "text-gold-ink",
  bad: "text-terracotta-ink font-semibold",
  neutral: "text-mist",
} as const;

function cellIcon(icon: NonNullable<TableCell["icon"]>) {
  switch (icon) {
    case "check":
      return <Check aria-hidden="true" className="size-4 shrink-0 text-moss" />;
    case "x":
      return <X aria-hidden="true" className="size-4 shrink-0 text-terracotta-ink" />;
    case "alert":
      return <TriangleAlert aria-hidden="true" className="size-4 shrink-0 text-gold-ink" />;
    case "minus":
      return <Minus aria-hidden="true" className="size-4 shrink-0 text-mist" />;
    case "star":
      return <Star aria-hidden="true" className="size-4 shrink-0 fill-gold text-gold" />;
  }
}

/**
 * Cell renderer. Icons are aria-hidden decoration; the text is always visible
 * so meaning is never carried by color alone.
 */
function CellBody({ cell }: { cell: TableCell }) {
  return (
    <span className="flex items-center gap-1.5">
      {cell.icon ? cellIcon(cell.icon) : null}
      <span className={cell.tone ? CELL_TONES[cell.tone] : undefined}>{cell.text}</span>
    </span>
  );
}

/**
 * Horizontal-scroll comparison table with sticky first column, caption, and
 * an optional footnote. Used directly and via ArticleRenderer table blocks.
 */
export function ComparisonTable({ caption, headers, rows, note, className }: ComparisonTableProps) {
  return (
    <>
      <div className={cn("overflow-x-auto scroll-slim rounded-lg border border-sand bg-paper", className)}>
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="px-4 pb-2 pt-4 text-left text-[13px] font-semibold text-mist">
            {caption}
          </caption>
          <thead>
            <tr>
              {headers.map((header, ci) => (
                <th
                  key={header}
                  scope="col"
                  className={cn(
                    "border-b border-sand bg-canvas px-4 py-2.5 text-left text-[12px] font-bold uppercase tracking-wide text-mist",
                    ci === 0 && "sticky left-0 z-10"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-sand/60 last:border-0">
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="sticky left-0 border-r border-sand/60 bg-paper px-4 py-3 text-left font-semibold text-ink"
                    >
                      {cell.text}
                    </th>
                  ) : (
                    <td key={ci} className="px-4 py-3 text-ink">
                      <CellBody cell={cell} />
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? (
        <p className="mt-3 flex items-start gap-2 text-[12.5px] text-mist">
          <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {note}
        </p>
      ) : null}
    </>
  );
}

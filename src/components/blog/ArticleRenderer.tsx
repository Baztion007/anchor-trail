import Image from "next/image";
import { Lightbulb, PiggyBank, ShieldCheck } from "lucide-react";
import type { ArticleBlock, ArticleRendererProps, Deal, Hostel, Stay, Tour } from "@/types/affiliate";
import { uniqueHeadingId } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { ComparisonTable } from "@/components/affiliate/ComparisonTable";
import { DealCard } from "@/components/affiliate/DealCard";
import { HostelCard } from "@/components/affiliate/HostelCard";
import { InsuranceBanner } from "@/components/affiliate/InsuranceBanner";
import { StayCard } from "@/components/affiliate/StayCard";
import { TourCard } from "@/components/affiliate/TourCard";
import { getDealById } from "@/data/deals";
import { getHostelById } from "@/data/hostels";
import { insurancePlans } from "@/data/insurance";
import { getStayById } from "@/data/stays";
import { getTourById } from "@/data/tours";

interface BlockWithId {
  block: ArticleBlock;
  headingId?: string;
}

/**
 * Precompute anchor ids for every heading against a single Set so duplicated
 * heading text ("The Verdict", "How We Tested") still yields unique DOM ids.
 */
function withHeadingIds(blocks: ArticleBlock[]): BlockWithId[] {
  const used = new Set<string>();
  return blocks.map((block) => ({
    block,
    headingId: block.type === "heading" ? uniqueHeadingId(block.text, used) : undefined,
  }));
}

const CALLOUT_STYLES = {
  insider: { border: "border-l-gold", Icon: Lightbulb, iconClass: "text-gold-ink" },
  money: { border: "border-l-terracotta", Icon: PiggyBank, iconClass: "text-terracotta-ink" },
  safety: { border: "border-l-moss", Icon: ShieldCheck, iconClass: "text-moss" },
} as const;

/**
 * Long-form article body renderer: editorial typography (drop cap, serif
 * headings, pull quotes), callouts, lists, comparison tables, embedded
 * affiliate cards, and imagery. Server component.
 */
export function ArticleRenderer({ article }: ArticleRendererProps) {
  const blocks = withHeadingIds(article.blocks);
  const dropCapIndex = article.blocks[0]?.type === "paragraph" ? 0 : -1;

  return (
    <div className="max-w-[68ch]">
      {blocks.map(({ block, headingId }, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className={cn(
                  "mb-5 text-[16px] leading-[1.75] text-ink/85",
                  index === dropCapIndex && "drop-cap"
                )}
              >
                {block.text}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={headingId}
                  className="mb-4 mt-10 scroll-mt-24 font-serif text-[26px] font-bold text-navy"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={index}
                id={headingId}
                className="mb-3 mt-8 scroll-mt-24 font-serif text-xl font-bold text-navy"
              >
                {block.text}
              </h3>
            );

          case "callout": {
            const style = CALLOUT_STYLES[block.variant];
            return (
              <aside
                key={index}
                className={cn(
                  "mb-6 rounded-lg border border-sand bg-sand/70 p-4 border-l-4",
                  style.border
                )}
              >
                <p className="flex items-center gap-2 text-[14px] font-bold text-ink">
                  <style.Icon
                    aria-hidden="true"
                    className={cn("size-4 shrink-0", style.iconClass)}
                  />
                  {block.title}
                </p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink/80">{block.text}</p>
              </aside>
            );
          }

          case "list": {
            const items = block.items.map((item, li) => (
              <li key={li} className="text-[15.5px] leading-relaxed text-ink/85">
                {item}
              </li>
            ));
            return block.ordered ? (
              <ol
                key={index}
                className="mb-5 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-navy"
              >
                {items}
              </ol>
            ) : (
              <ul key={index} className="mb-5 list-disc space-y-2 pl-5 marker:text-gold-ink">
                {items}
              </ul>
            );
          }

          case "quote":
            return (
              <blockquote key={index} className="my-8 border-l-2 border-gold pl-5">
                <p className="font-serif text-xl italic leading-relaxed text-navy">{block.text}</p>
                {block.attribution ? (
                  <cite className="mt-2 block text-[13px] not-italic text-mist">
                    {`— ${block.attribution}`}
                  </cite>
                ) : null}
              </blockquote>
            );

          case "table":
            return (
              <ComparisonTable
                key={index}
                caption={block.caption}
                headers={block.headers}
                rows={block.rows}
                note={block.note}
                className="my-8"
              />
            );

          case "tour-card": {
            const tour: Tour | null | undefined = getTourById(block.tourId);
            if (!tour) return null;
            return (
              <div key={index} className="my-6">
                <TourCard tour={tour} />
              </div>
            );
          }

          case "deal-card": {
            const deal: Deal | null | undefined = getDealById(block.dealId);
            if (!deal) return null;
            return (
              <div key={index} className="my-6">
                <DealCard deal={deal} />
              </div>
            );
          }

          case "stay-card": {
            const stay: Stay | null | undefined = getStayById(block.stayId);
            if (!stay) return null;
            return (
              <div key={index} className="my-6">
                <StayCard stay={stay} />
              </div>
            );
          }

          case "hostel-card": {
            const hostel: Hostel | null | undefined = getHostelById(block.hostelId);
            if (!hostel) return null;
            return (
              <div key={index} className="my-6">
                <HostelCard hostel={hostel} />
              </div>
            );
          }

          case "insurance-banner":
            return (
              <div key={index} className="my-6">
                <InsuranceBanner plans={insurancePlans} />
              </div>
            );

          case "divider":
            return <hr key={index} aria-hidden="true" className="my-10 border-t-2 border-dashed border-terracotta/40" />;

          case "image":
            return (
              <figure key={index} className="my-8">
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="h-auto w-full rounded-lg"
                />
                {block.caption ? (
                  <figcaption className="mt-2 text-center text-[13px] text-mist">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

import type { SectionHeadingProps } from "@/types/affiliate";
import { cn } from "@/lib/utils";

type Tone = NonNullable<SectionHeadingProps["tone"]>;

const EYEBROW_TONES: Record<Tone, string> = {
  navy: "text-gold-ink",
  moss: "text-terracotta-ink",
  terracotta: "text-terracotta-ink",
};

const TITLE_TONES: Record<Tone, string> = {
  navy: "text-navy",
  moss: "text-moss",
  terracotta: "text-navy",
};

/**
 * Editorial section opener: em-dash-wrapped eyebrow, serif display title,
 * optional dek. Server component — callers own the wrapping <section> and ids.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "navy",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("eyebrow", EYEBROW_TONES[tone])}>— {eyebrow} —</p>
      <h2 className={cn("mt-2 font-serif text-3xl font-bold", TITLE_TONES[tone])}>{title}</h2>
      {description ? <p className="mt-2 leading-relaxed text-mist">{description}</p> : null}
    </div>
  );
}

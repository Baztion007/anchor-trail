import { Plus } from "lucide-react";
import type { FaqAccordionProps } from "@/types/affiliate";

/**
 * FAQ accordion built on native <details>/<summary> — keyboard and print
 * behavior for free, no client JS needed.
 */
export function FaqAccordion({ faqs, heading }: FaqAccordionProps) {
  const list = faqs.map((faq) => (
    <details key={faq.question} className="group border-b border-sand last:border-0">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[15.5px] font-semibold text-ink hover:text-navy [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-navy">
        {faq.question}
        <Plus
          aria-hidden="true"
          className="size-4 shrink-0 text-gold-ink motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-45"
        />
      </summary>
      <div className="pb-5 pr-8 text-[15px] leading-relaxed text-mist">{faq.answer}</div>
    </details>
  ));

  if (heading) {
    return (
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="mb-4 font-serif text-2xl font-bold text-navy">
          {heading}
        </h2>
        {list}
      </section>
    );
  }

  return <div>{list}</div>;
}

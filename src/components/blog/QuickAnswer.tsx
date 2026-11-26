/**
 * Direct-answer box rendered at the very top of every guide. AEO pattern:
 * answer engines (and readers) want the verdict in the first screen, in
 * plain declarative sentences, before any narrative.
 */
export function QuickAnswer({ text }: { text: string }) {
  return (
    <aside
      aria-label="Quick answer"
      className="mt-5 rounded-lg border-l-4 border-gold bg-sand/70 p-4"
    >
      <p className="eyebrow text-gold-ink">Quick Answer</p>
      <p className="mt-2 max-w-[68ch] text-[15.5px] leading-relaxed text-ink/90">
        {text}
      </p>
    </aside>
  );
}

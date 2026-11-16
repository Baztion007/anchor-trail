import Link from "next/link";
import type { AuthorCardProps } from "@/types/affiliate";

/**
 * E-E-A-T author byline block with gradient monogram avatar and a link to
 * the author's guide hub. `compact` drops the bio for footer placements.
 */
export function AuthorCard({ author, compact = false }: AuthorCardProps) {
  const firstName = author.name.split(" ")[0];

  return (
    <aside aria-label="About the author" className="rounded-lg border border-sand bg-paper p-5">
      <div className="flex gap-4">
        <div
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full gold-gradient font-bold text-navy"
        >
          {author.initials}
        </div>
        <div className="min-w-0">
          <p className="eyebrow text-gold-ink">{author.role}</p>
          <p className="mt-1 font-serif text-lg font-bold text-navy">{author.name}</p>
          <p className="mt-1 text-[12.5px] text-mist">{author.credentials}</p>
          {compact ? null : (
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{author.bio}</p>
          )}
          <Link
            href="/blog"
            rel="author"
            className="mt-3 inline-flex min-h-[44px] items-center text-[13.5px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
          >
            {`More guides by ${firstName} →`}
          </Link>
        </div>
      </div>
    </aside>
  );
}

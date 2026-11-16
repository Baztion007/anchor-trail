/**
 * Editorial slug helpers for in-article heading anchors.
 *
 * ArticleRenderer pre-registers every heading through uniqueHeadingId so a
 * long article never produces duplicate DOM ids (a11y + deep-link safety).
 */

/**
 * Lowercase, collapse every run of non-alphanumeric characters to a single
 * dash, then trim leading/trailing dashes.
 *
 * "Day 1: Arrival & Ports" -> "day-1-arrival-ports"
 */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Collision-safe heading id: appends -2, -3, ... on duplicates and registers
 * the winning id in `used` so subsequent calls see it. Falls back to
 * "section" when the text produces an empty slug (e.g. punctuation only).
 */
export function uniqueHeadingId(text: string, used: Set<string>): string {
  const base = headingId(text);
  const root = base.length > 0 ? base : "section";
  let candidate = root;
  let counter = 2;
  while (used.has(candidate)) {
    candidate = `${root}-${counter}`;
    counter += 1;
  }
  used.add(candidate);
  return candidate;
}

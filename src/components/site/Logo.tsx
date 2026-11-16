import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Custom SVG brand glyph: interlocked anchor + trail-marker path.
 * No external icon library — drawn in-house per brand spec.
 */
export function Logo({ tone = "dark", className }: LogoProps) {
  const anchorStroke = tone === "dark" ? "#0A2540" : "#FAF9F6";
  const trailStroke = tone === "dark" ? "#C5A059" : "#E8C87E";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Anchor & Trail logo"
      className={cn("size-9 shrink-0", className)}
    >
      <path
        d="M4 43c8-2 6-8 12-8s6 6 12 4 8-6 12-6"
        stroke={trailStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="3.2 4.2"
      />
      <g
        stroke={anchorStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="8.5" r="4.2" />
        <path d="M24 12.7V40" />
        <path d="M15 19.5h18" />
        <path d="M7.5 29.5c0 6.6 7.4 10.5 16.5 10.5s16.5-3.9 16.5-10.5" />
        <path d="M7.5 29.5 4 26.4" />
        <path d="M7.5 29.5l4.4-1.6" />
        <path d="M40.5 29.5 44 26.4" />
        <path d="M40.5 29.5l-4.4-1.6" />
      </g>
    </svg>
  );
}

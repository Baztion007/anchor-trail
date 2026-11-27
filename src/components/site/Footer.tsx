import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { PriceDisclaimer } from "@/components/site/PriceDisclaimer";
import { partnerList } from "@/data/partners";

const EXPLORE_LINKS = [
  { href: "/cruises", label: "Luxury Cruises" },
  { href: "/backpacking", label: "Budget Backpacking" },
  { href: "/blog", label: "Travel Guides" },
  { href: "/stays", label: "Excursions & Stays" },
  { href: "/calculator", label: "Trip Budget Calculator" },
  { href: "/faq", label: "Travel FAQ" },
];

const FEED_URL = "/feed.xml";

const footerLink =
  "text-sm font-semibold text-canvas/80 underline-offset-4 transition-colors duration-150 ease-out hover:text-gold-light hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/60 bg-navy text-canvas">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo tone="light" />
              <span className="font-serif text-lg font-bold">
                Anchor &amp; Trail
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-canvas/75">
              The editorial bridge between luxury cruises and budget
              backpacking — honest math, independent reviews, no paid
              placements.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-canvas/75">
              Reader-supported: when you book through partner links on this
              site, we may earn a commission at no extra cost to you.
            </p>
          </div>

          <nav aria-label="Footer explore">
            <h2 className="eyebrow text-gold">Explore</h2>
            <ul className="mt-4 space-y-1">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`block py-1.5 ${footerLink}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Affiliate partners">
            <h2 className="eyebrow text-gold">Partners</h2>
            <ul className="mt-4 grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-1">
              {partnerList.map((partner) => (
                <li key={partner.id}>
                  <Link
                    href={`/disclosure#${partner.id}`}
                    className={`block py-1.5 ${footerLink}`}
                  >
                    {partner.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Trust and legal">
            <h2 className="eyebrow text-gold">Trust &amp; Legal</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <Link href="/about" className={`block py-1.5 ${footerLink}`}>
                  About the Author
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className={`block py-1.5 ${footerLink}`}>
                  Full Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={`block py-1.5 ${footerLink}`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclosure#standards" className={`block py-1.5 ${footerLink}`}>
                  Editorial Standards
                </Link>
              </li>
              <li>
                <a
                  href={FEED_URL}
                  type="application/rss+xml"
                  className={`block py-1.5 ${footerLink}`}
                >
                  RSS Feed
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-canvas/65 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Anchor &amp; Trail. All rights reserved.</p>
          <p>
            Partner links marked with an icon open in a new tab and carry
            sponsored tags.
          </p>
        </div>

        <PriceDisclaimer tone="dark" className="mt-6 border-t border-white/10 pt-5" />
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { partnerList } from "@/data/partners";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy — What We Collect (Almost Nothing)",
  description:
    "Anchor & Trail collects no accounts, no analytics, and no ad profiles. What we store on your device, what partners see after a click, and how to clear it.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2026-01-15";
const LAST_UPDATED_LABEL = "Jan 15, 2026";

const SECTIONS: { id: string; heading: string; paragraphs: string[] }[] = [
  {
    id: "what-we-collect",
    heading: "What we collect",
    paragraphs: [
      "Almost nothing. Anchor & Trail has no accounts, no comment forms, no newsletter capture, no analytics scripts, and no advertising trackers of its own. Browsing this site sends your browser's standard, anonymous request data to our host — which pages were served and when — and that is all.",
      "The trip budget calculator runs entirely in your browser. The destinations, dates, and traveler counts you enter are never sent to our servers or to any partner.",
    ],
  },
  {
    id: "stored-on-your-device",
    heading: "What stays on your device",
    paragraphs: [
      "Two small preferences are saved in your browser's localStorage: whether you dismissed the affiliate disclosure bar, and your reading style (the light or sepia theme). They are plain strings, readable only by this site, never transmitted anywhere, and clearing them costs you nothing.",
    ],
  },
  {
    id: "affiliate-links",
    heading: "Affiliate links and partner sites",
    paragraphs: [
      "This is a reader-supported magazine: when you book through a partner link, the partner pays us a small commission at no extra cost to you. Clicking a partner link takes you off our site, and from that moment the partner's own privacy policy applies — partner sites set their own cookies, and they may attribute the booking to the referral link you clicked.",
      "The partners we work with:",
    ],
  },
  {
    id: "what-we-receive",
    heading: "What we receive back",
    paragraphs: [
      "Affiliate networks send us aggregate reporting — how many clicks a link earned and what commission accrued — identified by anonymous tracking parameters. We never receive your name, your email, your booking details, or any profile of what you did on the partner's site.",
    ],
  },
  {
    id: "your-choices",
    heading: "Your choices",
    paragraphs: [
      "You can browse the entire site without touching a single partner link, and nothing on our side tracks you either way. Clearing your browser data removes the two localStorage preferences described above. Do Not Track signals are moot here: we run no tracking scripts to honor them with.",
    ],
  },
  {
    id: "children",
    heading: "Children",
    paragraphs: [
      "This site is written for adult travelers and is not directed at children under 13. We collect no personal information from anyone, so there is nothing to delete on a child's behalf.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    paragraphs: [
      "If our practices ever change — say, we add analytics or a newsletter — this page will be updated and the date below will move. Material changes get a plain-language note at the top of the page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 pb-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbJsonLd(
              [
                { label: "Home", href: "/" },
                { label: "Privacy Policy", href: "/privacy" },
              ],
              "/privacy"
            ),
          ]),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <p className="eyebrow mt-6 text-gold-ink">
        — The Short Version: We Don&apos;t Track You —
      </p>
      <h1 className="mt-2 font-serif text-[clamp(1.9rem,3.5vw,2.75rem)] font-bold leading-tight text-navy">
        Privacy Policy
      </h1>

      <div className="mt-5 max-w-[68ch] space-y-4 text-[15px] leading-relaxed text-ink/85">
        <p>
          Anchor &amp; Trail is an independent, reader-funded travel magazine
          with a simple privacy posture: no accounts, no analytics, no
          advertising profiles of our own. This page explains exactly what
          does and does not happen when you read here and when you leave
          through a partner link.
        </p>
        <p className="text-[13.5px] text-mist">
          Last updated{" "}
          <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>.
        </p>
      </div>

      <nav
        aria-label="Privacy policy sections"
        className="mt-8 rounded-lg border border-sand bg-sand/50 p-5"
      >
        <h2 className="font-serif text-lg font-bold text-navy">On this page</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-[44px] items-center text-[14px] font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:transition-colors motion-safe:duration-200 ease-out"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="mt-8 scroll-mt-24 border-t border-sand pt-8"
        >
          <h2
            id={`${section.id}-heading`}
            className="font-serif text-xl font-bold text-navy"
          >
            {section.heading}
          </h2>
          <div className="mt-3 max-w-[68ch] space-y-3 text-[15px] leading-relaxed text-ink/85">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.id === "affiliate-links" ? (
              <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {partnerList.map((partner) => (
                  <li
                    key={partner.id}
                    className="flex items-start gap-2 text-[14px] text-ink/85"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                    />
                    {partner.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="mt-8 scroll-mt-24 border-t border-sand pt-8"
      >
        <h2
          id="contact-heading"
          className="font-serif text-xl font-bold text-navy"
        >
          Questions
        </h2>
        <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-ink/85">
          Privacy questions, correction requests, or a copy of anything we
          hold (which, as above, is essentially nothing): write to{" "}
          <a
            href="mailto:privacy@anchorandtrail.com"
            className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            privacy@anchorandtrail.com
          </a>{" "}
          and a human will answer.
        </p>
      </section>
    </div>
  );
}

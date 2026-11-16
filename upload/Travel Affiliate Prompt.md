Act as a **Senior Full-Stack Next.js Engineer**, **Affiliate Conversion Architect**, **Technical SEO Strategist**, and **Accessibility-First UI/UX Designer**. Build a complete, production-ready, high-converting **Travel Affiliate Website** using **Next.js 14+ (App Router), React, TypeScript (strict), and Tailwind CSS**.

The brand — _"Anchor & Trail"_ — is an editorial house bridging **Luxury Cruises** and **Budget Backpacking**. Every page, widget, and template must be engineered for **SEO discoverability, WCAG 2.2 AA accessibility, user trust, and maximum affiliate CTR** — while feeling like a **premium print travel magazine**, not a typical affiliate blog.

---

## 1. Unique Design Language — "Modern Maritime Editorial"

Forget template-y affiliate sites. The aesthetic should feel like a **luxury travel magazine reimagined for the web**: editorial typography, generous whitespace, asymmetric layouts, and a distinctive dual-tone identity that clearly separates — yet unifies — the two verticals.

### Signature Visual System

- **Canvas:** Warm Alabaster `#FAF9F6` · **Card:** Crisp White `#FFFFFF` · **Ink:** Deep Slate `#0F172A`
    
- **Luxury Cruise tone:** Deep Ocean Navy `#0A2540` + Champagne Gold `#C5A059` (metallic gradient accents: `linear-gradient(135deg, #C5A059, #E8C87E)`)
    
- **Budget Backpacking tone:** Forest Moss `#1E4620` + Terracotta `#D95D39`
    
- **Neutral bridges:** Soft Sand `#EDE6DB`, Slate Muted `#64748B`
    

### Signature Elements (Unique to Brand)

- **Split-tone hero** with a diagonal/curved divider — ocean navy on one side, moss on the other — each with subtle SVG wave/mountain overlays.
    
- **Gold hairline rules** (`1px` accent) under luxury card titles; **terracotta stitch dividers** for backpacking cards.
    
- **Editorial eyebrow labels** (uppercase, wide tracking, `text-[11px]`) above every section headline — e.g., `— CURATED VOYAGES —`.
    
- **Oversized serif drop caps** on long-form article openers.
    
- **Custom SVG logo:** interlocked anchor + trail-marker glyph (no external icon library).
    
- **Micro-interactions:** 180ms ease-out hover lift on cards, gold underline reveal on nav links, no gratuitous motion.
    

### Typography

- **Display / Editorial:** `Playfair Display` (600/700) — headlines, pull quotes, drop caps.
    
- **UI / Body / Tables:** `Plus Jakarta Sans` (400/500/600/700) — controls, prose, data.
    
- **Fluid type scale** via `clamp()` (h1 `clamp(2.25rem, 5vw, 4rem)`), line-height ≥ 1.6 for body, line-length capped at `68ch` for prose.
    

### Motion & Interaction (respect `prefers-reduced-motion`)

- All transitions `≤ 200ms`, ease-out, opacity/transform only.
    
- Wrap animations in a `motion-safe:` Tailwind variant; provide no-motion fallbacks.
    
- No auto-playing carousels. No scroll-jacking.
    

---

## 2. WCAG 2.2 AA Accessibility — Non-Negotiable

Every component must ship accessible by default. Treat this as a **hard requirement**, not a stretch goal.

### Global Requirements

- **Contrast:** Body text ≥ 4.5:1; large text (≥18.66px bold / 24px) ≥ 3:1; UI components & focus rings ≥ 3:1. Validate every theme color pair against Alabaster and White.
    
- **Focus:** Never remove outlines. Use `:focus-visible` with a **custom dual-tone ring** (`ring-2 ring-offset-2`, color adapts to theme — gold on navy, terracotta on moss).
    
- **Landmarks:** Semantic `<header> <nav> <main> <aside> <footer>` on every page; one `<h1>` per page; logical heading order.
    
- **Skip link:** "Skip to main content" as first focusable element.
    
- **Language:** `<html lang="en">`; `lang` attribute on any foreign-term spans.
    
- **Reduced motion:** All animations gated by `motion-safe:`.
    

### Component-Level Rules

- **Travel Style Switcher & Filter chips:** Implement as **`role="radiogroup"`** with roving `tabindex`, or use native `<input type="radio">` visually hidden + styled labels. Announce active state via `aria-checked`. Keyboard: arrow keys navigate, Space/Enter selects.
    
- **Multi-Tab Quick Search Widget:** Full **ARIA Authoring Practices Tabs pattern** — `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `tabindex="-1"` on inactive tabs, arrow-key navigation.
    
- **FAQ Accordion:** Use `<details>/<summary>` for progressive enhancement, or `<button aria-expanded aria-controls>` with the panel as `region`. The `+` / `−` icon is decorative (`aria-hidden`).
    
- **Comparison Tables:** Real `<table>` with `<caption>`, `<th scope="col">`, `<th scope="row">`. Sticky first column on mobile via CSS `position: sticky; left: 0`. Never rely on color alone — pair with icons/labels for good/bad.
    
- **Interactive TOC scroll-spy:** `<nav aria-label="Table of contents">`, active link gets `aria-current="true"`. Respect `prefers-reduced-motion` for smooth scroll.
    
- **Forms / Calculator:** Every input has a visible `<label>`; use `aria-describedby` for hints; errors linked via `aria-errormessage` + `role="alert"`; announce results in an `aria-live="polite"` region.
    
- **Affiliate links:** Visible text describes destination ("Check live rates on CruiseDirect"); external-link icon is `aria-hidden`. `rel="nofollow sponsored noopener noreferrer" target="_blank"` — and warn screen readers of new-window via `sr-only` suffix.
    
- **Images:** Descriptive `alt` for content images; `alt=""` for decorative SVGs, plus `aria-hidden="true"` and `role="presentation"` as appropriate.
    
- **Touch targets:** ≥ 44×44px for all interactive elements (WCAG 2.2 — Target Size Minimum).
    
- **Focus not obscured:** Sticky header must not cover focused elements (WCAG 2.2 — Focus Not Obscured).
    

---

## 3. SEO Architecture — Technical + Content

### Technical SEO

- **Metadata:** Dynamic `generateMetadata` per route — unique `<title>` (≤ 60 chars, primary keyword first), `<meta name="description">` (≤ 155 chars, benefit-led), canonical URL, and full **Open Graph + Twitter card** tags. Set `metadataBase` in root layout.
    
- **Structured data (JSON-LD):** Per-page `Article` + `BreadcrumbList` + `FAQPage` on blog posts; `ItemList` on category hubs; `WebSite` + `Organization` in root layout. Include `author`, `datePublished`, `dateModified`, `image`.
    
- **Semantic HTML:** `<article>`, `<section aria-labelledby>`, `<time datetime="">`, `<figure>/<figcaption>`. Heading hierarchy enforced (H1 → H2 → H3).
    
- **Internal linking:** Every blog post links to ≥ 2 hub pages and ≥ 2 sibling articles via contextual anchors + a "Related Guides" module.
    
- **URL structure:** kebab-case, keyword-rich (`/blog/mediterranean-cruise-vs-backpacking-cost`).
    
- **Sitemap + robots:** Auto-generated `sitemap.ts` and `robots.ts` (Next.js metadata routes).
    
- **Performance budget (Core Web Vitals target):** LCP < 2.0s, CLS < 0.05, INP < 200ms. Use `next/image` with explicit `width`/`height`, `next/font` with `display: swap`, and **font subsetting** (Latin). Lazy-load below-fold components.
    
- **Freshness signals:** Visible "Last Updated" `<time>` and matching `dateModified` in JSON-LD.
    

### Content SEO

- Each blog post: primary keyword in H1, URL, meta description, first 100 words; secondary keywords in H2s; FAQ block targeting People Also Ask.
    
- Every deal card and comparison table includes **entity-rich copy** (cruise line names, port cities, tour operators) for topical authority.
    

---

## 4. Tech Stack & Architecture

- **Framework:** Next.js 14+ App Router — **React Server Components** by default; `"use client"` only for interactive islands (switcher, filters, calculator, TOC scroll-spy, accordion state, tabs).
    
- **Language:** TypeScript strict. Central types in `src/types/affiliate.ts` — `AffiliatePartner`, `Deal`, `Article`, `Tour`, `Stay`, `FlightQuery`, `CabinRate`, `Hostel`, `InsurancePlan`, `TransitRoute`, `TripCostInput`, `TripCostResult`.
    
- **Styling:** Tailwind CSS with **design tokens as CSS variables** in `globals.css` (theme colors, spacing, radii) so the dual-tone system stays consistent and is easy to audit for contrast.
    
- **Icons:** `lucide-react` — all icons `aria-hidden="true"` unless standalone-interactive (then labeled).
    
- **Fonts:** `next/font/google` for `Playfair_Display` + `Plus_Jakarta_Sans`, exposed as CSS variables `--font-serif`, `--font-sans`.
    

### Affiliate Link Engine — `src/lib/affiliate.ts`

Centralized, typed, and used everywhere. **No raw outbound URLs anywhere in components.**

ts

// Signature (build this + tests)
buildAffiliateLink({ partner, destination, campaign, subId?, ...params }): string

- Appends tracking params: `sub_id`, `aid`, `campaign`, `utm_source=anchor-and-trail`.
    
- Returns URL + a spreadable props object: `{ href, rel: "nofollow sponsored noopener noreferrer", target: "_blank" }`.
    
- Partner registry in `src/data/partners.ts` maps each network to its base URL + param schema (Travelpayouts, [Booking.com](https://booking.com/), Viator, CruiseDirect, Expedia Cruises, Hostelworld, SafetyWing, 12Go, Omio).
    
- Export a `<AffiliateLink partner="viator" destination="..." campaign="..." >` wrapper that renders accessible anchors (visible text + `sr-only` new-window hint) with a subtle external-link icon.
    

### Data Layer

- Modular, typed mock data in `src/data/deals.ts`, `src/data/articles.ts`, `src/data/partners.ts`, `src/data/tours.ts`, `src/data/hotels.ts`, `src/data/hostels.ts`, `src/data/insurance.ts`, `src/data/transit.ts` — swappable for MDX/CMS/APIs without touching components.
    
- **Content must be realistic and rich — no lorem ipsum.** Populate:
    
    - **4 full SEO articles** (2 cruise, 2 backpacking), each 1,200–1,800 words with real-world detail (specific ships, ports, hostels, tour names, price ranges).
        
    - **6 deals** — 3 luxury cruises, 3 backpacking routes — each with real inclusions, partner badge, price-per-day, and CTA copy.
        
    - **8+ tours**, **6+ hotels/stays**, **6+ hostels**, **5+ transit routes**, **3 insurance plans** for widget realism.
        

---

## 5. High-Converting Affiliate Partners — Purpose-Built Components

Design **dedicated, accessible UI components** for each network (no generic card reuse where the network warrants unique treatment):

|Partner|Purpose|Component Requirements|
|---|---|---|
|**Travelpayouts**|Flights + aggregator|Flight search widget placeholder (Airalo eSIM + WayAway deep-linked callouts); script slot in `layout.tsx`.|
|**[Booking.com](https://booking.com/)**|Pre-cruise luxury hotels + budget private rooms|Rating badge (`aria-label="Rated 8.9 out of 10"`), price tier, **"Check Availability →"** CTA.|
|**Viator**|Shore excursions + backpacker day-trips|Star rating (numeric + accessible label), duration chip, price-from, **"Reserve on Viator →"**.|
|**CruiseDirect / Expedia Cruises**|Luxury cabin rates + onboard credit|Fare comparison table with `aria-describedby` mini-disclosure.|
|**Hostelworld**|Social hostels / dorm beds|Dorm vs. private toggle, social-score badge, nightly price.|
|**SafetyWing**|Nomad + cruise medical insurance|Comparison banner with quick-quote calculator CTA.|
|**12Go / Omio**|Cross-border bus/ferry/train|Route card: origin → destination, duration, price band, CTA.|

### FTC Compliance (Persistent, Accessible)

- **Top disclosure bar** in root layout — `role="note"`, always visible, contrast-compliant, dismissible state stored in `localStorage` but restorable via footer link.
    
- **Contextual mini-disclosure** directly above every comparison table and TL;DR box (linked to full disclosure page).
    
- **Full disclosure page** at `/disclosure` describing each partner relationship.
    

---

## 6. Pages & Components to Build

### 6.1 Global Header & Niche Switcher

- Custom SVG logo (anchor + trail-marker), accessible `<nav aria-label="Primary">`, mobile drawer with focus trap + `Escape` close + `aria-expanded` toggle.
    
- Nav: **Luxury Cruises**, **Budget Backpacking**, **Travel Guides**, **Excursions & Stays**, **Trip Budget Calculator**.
    
- **Travel Style Switcher:** `All | Luxury Cruises | Budget Backpacking` — accessible radio-group; persists to `localStorage`; visually dims non-matching deal cards _and_ updates an `aria-live="polite"` status ("Showing 3 luxury cruises").
    

### 6.2 Homepage (`/`)

- **Split-perspective hero** — dual diagonal layout with an SVG wave/trail divider; overlaid headline in Playfair Display; **Multi-Tab Quick Search Widget** (accessible tab pattern): _Find Cruises · Hotels & Hostels · Tours · Flights_.
    
- **Curated Deals Grid** — 6 cards (3 luxury / 3 budget), gold/terracotta hairline dividers, partner badge, price-per-day, 3 key inclusions, high-contrast **"Check Live Rates ↗"** CTA.
    
- **"Two Ways to Travel" Comparison Matrix** — same region contrasted across _Daily cost · Accommodation partner · Excursions · Insurance_, using a real accessible `<table>` with sticky first column on mobile.
    
- **Latest SEO Guides strip** — 3 featured guides with reading time + `dateModified`.
    

### 6.3 Category Hubs

- **`/cruises`** — Filters: Cruise Line (Viking, Regent, Celebrity), Region, Budget (as accessible chip groups with `aria-pressed` or radio). Cross-sell modules: **Pre-Cruise Port Hotels ([Booking.com](https://booking.com/))** + **Shore Excursions (Viator)**.
    
- **`/backpacking`** — Filters: Region (SE Asia, Balkans, South America), Daily Budget (`< $35/day`, `$35–$60/day`). Affiliate blocks for **Hostelworld**, **12Go**, **SafetyWing**.
    
- Both hubs: results count in `aria-live="polite"`, empty state with clear recovery CTA.
    

### 6.4 Blog Index (`/blog`)

- Accessible category tabs (_All Guides · Cruise Reviews & Tips · Backpacking Itineraries · Gear & Insurance_), featured pillar hero, article cards with reading time + `dateModified` badge.
    

### 6.5 Blog Article (`/blog/[slug]`)

- **Dynamic `generateMetadata`** + **JSON-LD** `Article` + `BreadcrumbList` + `FAQPage`.
    
- **Above-the-fold Trust Header:** breadcrumbs (`<nav aria-label="Breadcrumb">`), H1, author bio card (credentials + `rel="author"`), "Last Updated" `<time>`, FTC mini-disclosure.
    
- **"Quick Summary / Top Picks"** affiliate box right below intro (Best Overall / Best Value / Top Shore Excursion), semantically a `<section aria-labelledby>`.
    
- **Two-column layout** (68% main / 32% sticky sidebar; stacks on mobile):
    
    - **Main:** `max-w-[68ch]`, styled callouts (_Insider Tip_, _Money-Saving Hack_ — with distinguishable icons, not just color), responsive **Partner Comparison Tables** (sticky first column, `<caption>`, `scope` attributes), inline **Viator Tour Cards**, bottom **FAQ Accordion** (`<details>`-based, open state accessible).
        
    - **Sidebar:** accessible **TOC scroll-spy** (`aria-current="true"` on active section) + sticky **"Top Recommended Partner"** card (SafetyWing mini-quote or [Booking.com](https://booking.com/) city search).
        

### 6.6 Interactive Trip Cost & Partner Recommender (`/calculator`)

- Inputs: Travel Style, Destination, Days, Travelers — all `<label>`-bound, validated, errors announced.
    
- Calculates estimated total + per-person spend; renders a results panel in `aria-live="polite"`.
    
- Outputs a **tailored Affiliate Action Checklist** with deep links: **Travelpayouts (Flights)**, **[Booking.com](https://booking.com/) / Hostelworld (Stays)**, **Viator (Activities)**, **SafetyWing (Insurance)** — each with contextual copy ("Flights to Bangkok from $X").
    
- Persist inputs to `localStorage`; offer a "reset" control.
    

---

## 7. Execution & Code Quality Rules

1. **Structure:**
    
    text
    
    src/
      app/                (routes, layout, metadata routes)
      components/affiliate/   (partner-specific widgets + AffiliateLink)
      components/blog/        (TOC, accordion, TL;DR box, author card)
      components/ui/          (Button, Chip, Badge, Disclosure, Tabs, Table)
      data/                   (all mock datasets)
      lib/                    (affiliate.ts, seo.ts, a11y helpers, motion-safe hooks)
      types/                  (affiliate.ts + component prop interfaces)
    
2. **Zero TypeScript errors**, strict mode, no `any` (use `unknown` + narrowing). All interactive components have explicit prop interfaces.
    
3. **Accessibility is testable:** include `axe-core` compatible markup; every interactive component supports full keyboard operation; focus order verified.
    
4. **Content:** 4 rich SEO articles (1,200–1,800 words each), 6 deals, 8+ tours, plus realistic hotel/hostel/transit/insurance data — **no placeholder text anywhere**.
    
5. **Every filter, TOC scroll-spy, FAQ accordion, tab widget, calculator, and affiliate link builder compiles cleanly, is keyboard-usable, and passes contrast checks.**
    
6. **Design consistency:** all colors, radii, spacing, and type sizes draw from the CSS variable token set — no one-off hex values in components.
    
7. **SEO surface audit:** every route ships unique title/description, canonical, OG, and (where applicable) structured data.
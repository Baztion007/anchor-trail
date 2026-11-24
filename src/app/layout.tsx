import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StyleProvider } from "@/components/site/StyleProvider";
import { DisclosureBar } from "@/components/site/DisclosureBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AffiliateConfigCheck } from "@/components/site/AffiliateConfigCheck";
import { SITE, jsonLdScript, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Anchor & Trail — Luxury Cruises & Budget Backpacking, Honestly Compared",
    template: "%s | Anchor & Trail",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Maya Ellison", url: `${SITE.url}/blog` }],
  creator: "Anchor & Trail",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    locale: "en_US",
    title: "Anchor & Trail — Luxury Cruises & Budget Backpacking, Honestly Compared",
    description: SITE.description,
    images: [
      {
        url: "/images/og-default.png",
        width: 1344,
        height: 768,
        alt: "A cruise ship at anchor offshore while a backpacker stands on a golden coastal trail at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
        {/*
          Impact Marketplace (Omio's affiliate network) site verification.
          Impact's crawler expects the exact tag with a `value=` attribute —
          Next.js's metadata API always emits `content=`, so this is rendered
          directly; React 19 hoists <meta> into <head> during SSR. React's
          <meta> typings only declare `content`, so `value` is passed through
          a JSX spread: React serializes it verbatim while TypeScript skips
          excess-property checks on spreads.
        */}
        <meta
          name="impact-site-verification"
          {...{ value: "743bc849-54aa-4f79-8d89-975bb46a6ba3" }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-canvas focus:outline-2 focus:outline-offset-2 focus:outline-gold"
        >
          Skip to main content
        </a>
        <StyleProvider>
          <DisclosureBar />
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 focus-visible:outline-none">
            {children}
          </main>
          <Footer />
        </StyleProvider>
        {/* Owner-only (?affiliate-check=1) credential audit — renders null for visitors. */}
        <AffiliateConfigCheck />
        {/*
          Travelpayouts "Drive" verification script — required for affiliate
          account approval. Verbatim bootstrap from the Travelpayouts
          dashboard ("Install Drive manually"); it appends the account loader
          (tpembars.com/NjA1ODE3.js?t=605817, NjA1ODE3 = base64 of account id
          605817) to <head> on every page. The WP-only attrs in the original
          snippet (nowprocket, data-noptimize, data-cfasync, data-wpfc-render,
          seraph-accel-crit, data-no-defer) are WordPress cache-plugin hints
          and do nothing outside WP — the functional payload below is
          identical. data-cmp-ab="2" is Travelpayouts' own consent flag.
        */}
        <Script id="travelpayouts-drive" strategy="afterInteractive" data-cmp-ab="2">
          {`(function () {
              var script = document.createElement("script");
              script.async = 1;
              script.setAttribute("data-cmp-ab","2");
              script.src = 'https://tpembars.com/NjA1ODE3.js?t=605817';
              document.head.appendChild(script);
          })();`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
      </body>
    </html>
  );
}

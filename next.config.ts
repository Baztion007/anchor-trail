import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Don't advertise the framework version in responses.
  poweredByHeader: false,
  // Production hygiene: surface type errors at build time, and keep strict
  // mode on so effect double-runs catch impure client logic early.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  // Baseline security headers on every response. Clickjacking protection
  // (X-Frame-Options / frame-ancestors) is intentionally NOT set: this site
  // has no state-changing forms or authenticated actions — every CTA is an
  // outbound link — and framing restrictions risk breaking sandboxed preview
  // embeds for zero real security gain here.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Force HTTPS for two years once a browser has seen the site over
          // TLS (Netlify terminates TLS; this covers all app-served routes).
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          // Never let browsers MIME-sniff responses into executable types.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Affiliate attribution rides in URL params; only the origin is
          // ever sent cross-origin, which is what the networks expect.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // No page needs powerful browser features — disable them outright.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

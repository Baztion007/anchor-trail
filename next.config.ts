import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Production hygiene: surface type errors at build time, and keep strict
  // mode on so effect double-runs catch impure client logic early.
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;

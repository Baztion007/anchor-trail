/**
 * Affiliate credential auditor (CLI).
 *
 * Prints the tracking status of every affiliate partner and exits non-zero
 * when any partner is still on the "at-demo" placeholder — wire it into CI
 * or run it before each deploy so untracked links never ship silently.
 *
 * Run: bun scripts/check-config.ts        (exit 1 if any placeholder)
 *      bun scripts/check-config.ts --quiet  (table only, always exit 0)
 */

import { getPartnerConfigStatuses } from "../src/lib/affiliate-config";

const quiet = process.argv.includes("--quiet");
const statuses = getPartnerConfigStatuses();
const issues = statuses.filter((s) => s.status !== "live");

const MARK: Record<string, string> = {
  live: "OK     ",
  demo: "DEMO   ",
  missing: "MISSING",
};

console.log("\nAnchor & Trail — affiliate credential audit\n");
for (const s of statuses) {
  console.log(`${MARK[s.status]}  ${s.name.padEnd(20)} ${s.envVar}`);
  if (s.status !== "live" && !quiet) {
    console.log(`        -> ${s.impact}`);
  }
}

console.log(`\n${statuses.length - issues.length}/${statuses.length} partners on live credentials.`);

if (issues.length > 0) {
  if (!quiet) {
    console.log("\nBefore launch:");
    console.log("  1. Fill every value in .env (see .env.example).");
    console.log("  2. Rebuild / redeploy so the values are baked in.");
    console.log("  3. Re-run this script until it exits clean.");
    console.log("  4. Or audit in-browser at /?affiliate-check=1");
  }
  process.exit(1);
}

console.log("All outbound links carry real tracking IDs.\n");

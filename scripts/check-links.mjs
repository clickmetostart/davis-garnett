/**
 * Spiderweb internal link & sitemap integrity checker (Step 2).
 * Inspects rendered Next.js output under .next/server/app plus listings.json.
 * Fails (exit code 1) on orphan pages, < 3 outbound internal links, broken links,
 * click depth > 3 from /commercial-advisory-guide or /knowledge-hub, or missing sitemap entries.
 */
import fs from "fs";
import path from "path";

const NEXT_APP_DIR = path.join(process.cwd(), ".next", "server", "app");
const LISTINGS_PATH = path.join(process.cwd(), "src", "data", "listings.json");
const SITEMAP_BODY_PATH = path.join(NEXT_APP_DIR, "sitemap.xml.body");

if (!fs.existsSync(NEXT_APP_DIR)) {
  console.error("ERROR: .next/server/app not found. Run `npm run build` before `node scripts/check-links.mjs`.");
  process.exit(1);
}

const EXCLUDED_PREFIXES = ["/clickme", "/api", "/login", "/market-reports", "/_not-found", "/_global-error"];
const EXCLUDED_EXACT = new Set(["/_not-found", "/_global-error", "/favicon.ico", "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]);

function isExcludedRoute(route) {
  if (EXCLUDED_EXACT.has(route)) return true;
  return EXCLUDED_PREFIXES.some((prefix) => route === prefix || route.startsWith(prefix + "/"));
}

function normalizeHref(rawHref) {
  if (!rawHref) return null;
  if (
    rawHref.startsWith("http://") ||
    rawHref.startsWith("https://") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:") ||
    rawHref.startsWith("#") ||
    rawHref.startsWith("javascript:")
  ) {
    return null;
  }
  const clean = rawHref.split("#")[0].split("?")[0];
  if (!clean.startsWith("/")) return null;
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

// 1. Walk .next/server/app for all statically rendered HTML routes
const htmlFiles = [];
function walkHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full);
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
}
walkHtml(NEXT_APP_DIR);

const routeToHtml = new Map();
for (const file of htmlFiles) {
  const rel = path.relative(NEXT_APP_DIR, file).replace(/\\/g, "/");
  let route = "/" + rel.replace(/\.html$/, "");
  if (route === "/index") route = "/";
  if (route.endsWith("/index")) route = route.slice(0, -"/index".length) || "/";
  if (!isExcludedRoute(route)) {
    routeToHtml.set(route, file);
  }
}

// 2. Collect valid dynamic listing routes + active listing slugs
const listings = JSON.parse(fs.readFileSync(LISTINGS_PATH, "utf8"));
const validListingRoutes = new Set(
  listings.map((l) => `/listings/${l.slug || l.id}`)
);
const activeListingRoutes = new Set(
  listings
    .filter((l) => !/sold|closed|inactive|draft/i.test(l.status || "") && l.editorialStatus !== "draft")
    .map((l) => `/listings/${l.slug || l.id}`)
);

// Dynamic event routes from knowledgeHub.ts
const khRaw = fs.readFileSync(path.join(process.cwd(), "src", "data", "knowledgeHub.ts"), "utf8");
const eventSection = khRaw.split("export const EVENTS: EventItem[] =")[1]?.split("export const ARTICLES:")[0] || "";
const validEventRoutes = new Set(
  Array.from(eventSection.matchAll(/slug:\s*"([^"]+)"/g)).map((m) => `/knowledge-hub/events/${m[1]}`)
);

// Public static assets that may appear as links (e.g., PDFs or images)
function existsInPublic(href) {
  const p = path.join(process.cwd(), "public", href.replace(/^\//, ""));
  return fs.existsSync(p);
}

// 3. Extract outbound internal links per HTML page
const outboundMap = new Map();
const inboundMap = new Map();
for (const route of routeToHtml.keys()) {
  outboundMap.set(route, new Set());
  inboundMap.set(route, new Set());
}

const brokenLinks = [];

for (const [route, file] of routeToHtml.entries()) {
  const html = fs.readFileSync(file, "utf8");
  const hrefMatches = Array.from(html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi));
  for (const m of hrefMatches) {
    const target = normalizeHref(m[1]);
    if (!target) continue;
    if (target.startsWith("/_next") || /\.(png|jpe?g|webp|svg|ico|pdf|xml|txt|webmanifest|css|js)$/i.test(target)) {
      if (!target.startsWith("/_next") && !existsInPublic(target) && !routeToHtml.has(target)) {
        brokenLinks.push({ from: route, to: target });
      }
      continue;
    }

    const targetIsKnown =
      routeToHtml.has(target) ||
      validListingRoutes.has(target) ||
      validEventRoutes.has(target) ||
      isExcludedRoute(target);

    if (!targetIsKnown) {
      brokenLinks.push({ from: route, to: target });
      continue;
    }

    if (routeToHtml.has(target) && target !== route) {
      outboundMap.get(route).add(target);
      inboundMap.get(target).add(route);
    } else if (validListingRoutes.has(target) || validEventRoutes.has(target)) {
      outboundMap.get(route).add(target);
    }
  }
}

// 4. BFS click depth from /knowledge-hub and /commercial-advisory-guide
function bfsDistances(startRoutes) {
  const dist = new Map();
  const queue = [];
  for (const start of startRoutes) {
    if (routeToHtml.has(start)) {
      dist.set(start, 0);
      queue.push(start);
    }
  }
  while (queue.length > 0) {
    const curr = queue.shift();
    const currDist = dist.get(curr);
    for (const next of outboundMap.get(curr) || []) {
      if (routeToHtml.has(next) && !dist.has(next)) {
        dist.set(next, currDist + 1);
        queue.push(next);
      }
    }
  }
  return dist;
}

const distances = bfsDistances(["/knowledge-hub", "/commercial-advisory-guide"]);

// 5. Inspect sitemap.xml.body completeness
const sitemapMissing = [];
if (fs.existsSync(SITEMAP_BODY_PATH)) {
  const sitemapXml = fs.readFileSync(SITEMAP_BODY_PATH, "utf8");
  const locs = new Set(
    Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) =>
      m[1].replace(/^https?:\/\/[^/]+/, "") || "/"
    )
  );
  for (const route of routeToHtml.keys()) {
    if (!locs.has(route)) {
      sitemapMissing.push(route);
    }
  }
  for (const activeListing of activeListingRoutes) {
    if (!locs.has(activeListing)) {
      sitemapMissing.push(activeListing);
    }
  }
} else {
  console.warn("WARNING: sitemap.xml.body not found in .next/server/app; skipping sitemap diff.");
}

// 6. Gather violations
const orphans = [];
const lowOutbound = [];
const deepRoutes = [];

for (const route of routeToHtml.keys()) {
  const inboundCount = inboundMap.get(route)?.size ?? 0;
  const outboundCount = outboundMap.get(route)?.size ?? 0;
  const depth = distances.get(route);

  if (inboundCount === 0 && route !== "/") {
    orphans.push(route);
  }
  if (outboundCount < 3) {
    lowOutbound.push({ route, outboundCount });
  }
  if (depth === undefined || depth > 3) {
    deepRoutes.push({ route, depth: depth === undefined ? "unreachable" : depth });
  }
}

console.log("=== Davis & Garnett Internal Link & Sitemap Report ===");
console.log(`Static HTML routes scanned: ${routeToHtml.size}`);
console.log(`Active dynamic listing routes verified: ${activeListingRoutes.size}`);
console.log(`Orphan pages (0 inbound links): ${orphans.length}`);
console.log(`Pages with < 3 outbound internal links: ${lowOutbound.length}`);
console.log(`Broken internal links: ${brokenLinks.length}`);
console.log(`Pages with click depth > 3 from /knowledge-hub or /commercial-advisory-guide: ${deepRoutes.length}`);
console.log(`Live pages missing from sitemap.xml: ${sitemapMissing.length}`);

if (orphans.length) console.log("\nOrphans:\n  - " + orphans.join("\n  - "));
if (lowOutbound.length) {
  console.log("\nLow outbound (<3):\n  - " + lowOutbound.map((x) => `${x.route} (${x.outboundCount})`).join("\n  - "));
}
if (brokenLinks.length) {
  console.log("\nBroken links:\n  - " + brokenLinks.map((x) => `${x.from} -> ${x.to}`).join("\n  - "));
}
if (deepRoutes.length) {
  console.log("\nDepth > 3:\n  - " + deepRoutes.map((x) => `${x.route} (depth=${x.depth})`).join("\n  - "));
}
if (sitemapMissing.length) {
  console.log("\nMissing from sitemap:\n  - " + sitemapMissing.join("\n  - "));
}

const hasViolations =
  orphans.length > 0 ||
  lowOutbound.length > 0 ||
  brokenLinks.length > 0 ||
  deepRoutes.length > 0 ||
  sitemapMissing.length > 0;

if (hasViolations) {
  process.exit(1);
}
console.log("\nALL LINK & SITEMAP CHECKS PASSED.");


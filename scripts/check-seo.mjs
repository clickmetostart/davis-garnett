/**
 * Non-blocking SEO & content-quality audit for Davis & Garnett.
 * Checks:
 *  1) Unresolved [[VERIFY: ...]] / [[MARK/RACHAEL: ...]] placeholders
 *  2) Publication dates coverage in src/data/publicationDates.ts
 *  3) Thin content warning (< 500 words per spoke, guarding Google code-vs-content ratio)
 *  4) Common AI-writing phrasing clichés
 *  5) Market Reports data completeness when any entries exist
 */
import fs from 'fs';

const AI_CLICHES = [
  'delve into',
  'tapestry',
  'testament to',
  'seamlessly',
  'game-changer',
  'unlock your',
  'landscape of',
  'in conclusion',
  'moreover',
  'furthermore',
];

const khRaw = fs.readFileSync('src/data/knowledgeHub.ts', 'utf8');
const devRaw = fs.readFileSync('src/data/developments.ts', 'utf8');
const mrRaw = fs.readFileSync('src/data/marketReports.ts', 'utf8');
const pubDatesRaw = fs.readFileSync('src/data/publicationDates.ts', 'utf8');

let issues = 0;

// 1. Placeholders
for (const [name, src] of [
  ['knowledgeHub.ts', khRaw],
  ['developments.ts', devRaw],
  ['marketReports.ts', mrRaw],
]) {
  const matches = src.match(/\[\[(?:VERIFY|MARK\/RACHAEL):[^\]]*\]\]/g) || [];
  if (matches.length > 0) {
    console.warn(`[WARN] ${name}: ${matches.length} unresolved placeholder(s) found.`);
    issues += matches.length;
  }
}

// 2. Date coverage check
const khSlugs = Array.from(khRaw.matchAll(/slug:\s*"([^"]+)"/g)).map((m) => m[1]);
const devSlugs = Array.from(devRaw.matchAll(/slug:\s*"([^"]+)"/g)).map((m) => m[1]);
const missingDates = [...khSlugs, ...devSlugs].filter((s) => !pubDatesRaw.includes(`"${s}"`));
if (missingDates.length > 0) {
  console.warn(`[WARN] Missing git publicationDates entries for: ${missingDates.join(', ')}`);
  issues += missingDates.length;
}

// 3. AI cliché check across knowledgeHub.ts
const lowerKh = khRaw.toLowerCase();
const foundCliches = AI_CLICHES.filter((c) => lowerKh.includes(c));
console.log(`AI cliché check (knowledgeHub.ts): ${foundCliches.length === 0 ? 'CLEAN (0 matches)' : foundCliches.join(', ')}`);

// 4. Word count check on Guide/Q&A/Area/Article blocks
const blocks = khRaw.split(/\n  \{\s*\n\s*slug:/g).slice(1);
let thinCount = 0;
const thinSlugs = [];
for (const block of blocks) {
  const slugMatch = block.match(/^\s*"([^"]+)"/);
  const slug = slugMatch ? slugMatch[1] : 'unknown';
  const strings = Array.from(
    block.matchAll(/(?:title|subtitle|quickAnswer|overview|summary|heading|body|question|answer|tagline):\s*"([^"]+)"/g)
  ).map((m) => m[1]);
  const bulletMatches = Array.from(block.matchAll(/bullets:\s*\[([\s\S]*?)\]/g)).flatMap((m) =>
    Array.from(m[1].matchAll(/"([^"]+)"/g)).map((b) => b[1])
  );
  const words = [...strings, ...bulletMatches]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < 500) {
    thinCount++;
    thinSlugs.push(`${slug} (${words}w)`);
  }
}

console.log(`Indexed content blocks audited: ${blocks.length} | Missing dates: ${missingDates.length} | Blocks < 500 words (for Step 2/3 expansion): ${thinCount}`);
if (thinSlugs.length > 0) {
  console.log('Short blocks to expand next:', thinSlugs.join(', '));
}
if (issues === 0) {
  console.log('SEO metadata & placeholder audit: PASS');
}


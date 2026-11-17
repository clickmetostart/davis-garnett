/**
 * Readability & glossary linking audit script (Step 2 - report only, never fails build).
 * Measures Flesch-Kincaid Grade Level per entry across knowledgeHub.ts, developments.ts,
 * glossary.ts, and topicHubs.ts, flags grades > 9.0, and checks unlinked technical glossary terms.
 */
import fs from "fs";
import path from "path";

const GLOSSARY_TERMS = [
  { slug: "cdd", labels: ["Community Development District", "CDD"] },
  { slug: "hoa", labels: ["Homeowners Association", "HOA", "COA"] },
  { slug: "1031-exchange", labels: ["1031 exchange", "like-kind exchange"] },
  { slug: "bpo", labels: ["Broker Price Opinion", "BPO"] },
  { slug: "nnn-lease", labels: ["Triple Net", "NNN"] },
  { slug: "four-point-inspection", labels: ["4-Point", "four-point"] },
  { slug: "wind-mitigation", labels: ["Wind Mitigation"] },
  { slug: "homestead-portability", labels: ["Homestead Portability", "Save Our Homes"] },
  { slug: "elevation-certificate", labels: ["Elevation Certificate", "Base Flood Elevation"] },
  { slug: "greenbelt-exemption", labels: ["Greenbelt"] },
];

function countSyllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  if (clean.length <= 3) return 1;
  const trimmed = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const matches = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

function calcGrade(text) {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 3);
  const words = text
    .replace(/[^A-Za-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[a-zA-Z]/.test(w));

  const totalSentences = Math.max(1, sentences.length);
  const totalWords = Math.max(1, words.length);
  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const avgSentenceLen = totalWords / totalSentences;
  const avgSyllablesPerWord = totalSyllables / totalWords;
  const fkGrade = 0.39 * avgSentenceLen + 11.8 * avgSyllablesPerWord - 15.59;
  return { totalWords, totalSentences, avgSentenceLen, fkGrade };
}

function extractEntries(src) {
  const entries = [];
  const blocks = src.split(/\n\s*slug:\s*"([^"]+)"/g);
  for (let i = 1; i < blocks.length; i += 2) {
    const slug = blocks[i];
    const bodyChunk = blocks[i + 1] || "";
    const quoted = Array.from(
      bodyChunk.matchAll(/(?:quickAnswer|body|summary|overview|answer|tampaBayExample|howWeHandleIt):\s*(?:\n\s*)?"([^"]+)"/g)
    ).map((m) => m[1]);
    if (quoted.length > 0) {
      entries.push({ slug, text: quoted.join(" ") });
    }
  }
  return entries;
}

const files = [
  "src/data/knowledgeHub.ts",
  "src/data/glossary.ts",
  "src/data/topicHubs.ts",
  "src/data/developments.ts",
];

const aboveNine = [];
let totalPages = 0;

for (const relPath of files) {
  const raw = fs.readFileSync(relPath, "utf8");
  const entries = extractEntries(raw);
  const fullText = entries.map((e) => e.text).join(" ");
  const aggregate = calcGrade(fullText);
  console.log(
    `${relPath}: entries=${entries.length}, words=${aggregate.totalWords}, avgSentenceLen=${aggregate.avgSentenceLen.toFixed(1)}, aggregateFK=${aggregate.fkGrade.toFixed(2)}`
  );

  for (const entry of entries) {
    totalPages += 1;
    const stats = calcGrade(entry.text);
    if (stats.fkGrade > 9.0) {
      aboveNine.push({ file: relPath, slug: entry.slug, grade: stats.fkGrade, words: stats.totalWords });
    }
  }
}

console.log(`\nPages measured: ${totalPages} | Pages above Grade 9.0 (report-only): ${aboveNine.length}`);
for (const row of aboveNine.slice(0, 15)) {
  console.log(`  - [FK ${row.grade.toFixed(1)}] ${row.slug} (${row.words} words)`);
}
if (aboveNine.length > 15) {
  console.log(`  ... and ${aboveNine.length - 15} more (report-only).`);
}

// Check built HTML pages (if present) for unlinked technical glossary terms
const nextAppDir = path.join(process.cwd(), ".next", "server", "app");
if (fs.existsSync(nextAppDir)) {
  const unlinkedFindings = [];
  const checkRoutes = ["knowledge-hub", "glossary", "hub"];
  for (const dirName of checkRoutes) {
    const subDir = path.join(nextAppDir, dirName);
    if (!fs.existsSync(subDir)) continue;
    for (const file of fs.readdirSync(subDir)) {
      if (!file.endsWith(".html")) continue;
      const html = fs.readFileSync(path.join(subDir, file), "utf8");
      const missingTerms = GLOSSARY_TERMS.filter((term) => {
        if (`${dirName}/${file}`.includes(term.slug)) return false;
        const mentioned = term.labels.some((lbl) => new RegExp(`\\b${lbl}\\b`, "i").test(html));
        const linked = html.includes(`href="/glossary/${term.slug}"`);
        return mentioned && !linked;
      }).map((t) => t.slug);
      if (missingTerms.length > 0) {
        unlinkedFindings.push({ page: `/${dirName}/${file.replace(/\.html$/, "")}`, missingTerms });
      }
    }
  }
  console.log(`\nRendered pages with unlinked glossary terms: ${unlinkedFindings.length}`);
  for (const item of unlinkedFindings.slice(0, 10)) {
    console.log(`  - ${item.page}: unlinked [${item.missingTerms.join(", ")}]`);
  }
}

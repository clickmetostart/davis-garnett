/**
 * Readability audit script measuring Flesch-Kincaid Grade Level and average sentence length
 * across src/data/knowledgeHub.ts and src/data/developments.ts.
 */
import fs from 'fs';

function countSyllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean) return 0;
  if (clean.length <= 3) return 1;
  const trimmed = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

function measureText(label, strings) {
  const joined = strings.join(' ');
  const sentences = joined
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 3);
  const words = joined
    .replace(/[^A-Za-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .filter((w) => /[a-zA-Z]/.test(w));

  const totalSentences = Math.max(1, sentences.length);
  const totalWords = Math.max(1, words.length);
  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);

  const avgSentenceLen = totalWords / totalSentences;
  const avgSyllablesPerWord = totalSyllables / totalWords;
  const fkGrade = 0.39 * avgSentenceLen + 11.8 * avgSyllablesPerWord - 15.59;

  console.log(
    `${label}: words=${totalWords}, sentences=${totalSentences}, avgSentenceLen=${avgSentenceLen.toFixed(1)}, FKGrade=${fkGrade.toFixed(2)}`
  );
}

const khRaw = fs.readFileSync('src/data/knowledgeHub.ts', 'utf8');
const devRaw = fs.readFileSync('src/data/developments.ts', 'utf8');

const extractQuoted = (src) =>
  Array.from(src.matchAll(/(?:quickAnswer|body|summary|overview|answer|question|tagline|subtitle):\s*"([^"]+)"/g)).map(
    (m) => m[1]
  );

measureText('knowledgeHub.ts', extractQuoted(khRaw));
measureText('developments.ts', extractQuoted(devRaw));

const quickAnswers = Array.from(khRaw.matchAll(/quickAnswer:\s*"([^"]+)"/g)).map((m) => m[1]);
measureText('knowledgeHub quickAnswers (new Grade 7-8 boxes)', quickAnswers);
quickAnswers.forEach((qa, idx) => {
  measureText(`  QA#${idx + 1}`, [qa]);
});


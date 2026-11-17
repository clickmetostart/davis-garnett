"use client";

import React from "react";
import Link from "next/link";
import { LIVE_GLOSSARY_TERMS } from "@/data/glossary";

interface GlossaryMatch {
  pattern: string;
  slug: string;
  termName: string;
}

const MATCHERS: GlossaryMatch[] = LIVE_GLOSSARY_TERMS.flatMap((item) =>
  item.aliases.map((alias) => ({
    pattern: alias,
    slug: item.slug,
    termName: item.term,
  }))
).sort((a, b) => b.pattern.length - a.pattern.length);

const ESCAPED = MATCHERS.map((m) =>
  m.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
);
const COMBINED_REGEX = new RegExp(`\\b(${ESCAPED.join("|")})\\b`, "gi");

/**
 * Splits a plain-text paragraph and links only the FIRST mention of each glossary
 * term across the supplied shared `usedSlugs` set (so a page links cleanly without spam).
 */
export function GlossaryAutoText({
  text,
  usedSlugs,
  excludeSlug,
}: {
  text: string;
  usedSlugs?: Set<string>;
  excludeSlug?: string;
}) {
  if (!text) return null;

  const localUsed = usedSlugs ?? new Set<string>();
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  COMBINED_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = COMBINED_REGEX.exec(text)) !== null) {
    const matchedText = match[0];
    const start = match.index;
    const matcher = MATCHERS.find(
      (m) => m.pattern.toLowerCase() === matchedText.toLowerCase()
    );

    if (!matcher || matcher.slug === excludeSlug || localUsed.has(matcher.slug)) {
      continue;
    }

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    localUsed.add(matcher.slug);
    nodes.push(
      <Link
        key={`${matcher.slug}-${start}`}
        href={`/glossary/${matcher.slug}`}
        title={`Florida Real Estate Glossary: ${matcher.termName}`}
        className="underline decoration-[#648296]/50 decoration-dotted underline-offset-4 text-[#4a6678] hover:text-[#111111] hover:decoration-[#111111] transition-colors font-medium"
      >
        {matchedText}
      </Link>
    );

    lastIndex = start + matchedText.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes.length > 0 ? nodes : text}</>;
}


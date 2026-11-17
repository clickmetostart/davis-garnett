"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import { GUIDES, QUESTIONS, AREAS, EVENTS, ARTICLES } from "@/data/knowledgeHub";
import { LIVE_GUIDED_TOURS } from "@/data/tours";

type ReviewStatus = "approved" | "flagged" | "unreviewed";

interface ReviewItem {
  id: string;
  section: "Guide" | "Guided Tour" | "Area Guide" | "Q&A" | "Event" | "Article";
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveHref: string;
  isPlaceholder: boolean;
}

const STORAGE_KEY = "dg_image_review_v1";

export default function ImageReviewPage() {
  const [filterMode, setFilterMode] = useState<
    "all" | "placeholders" | "photos" | "tours" | "flagged" | "approved"
  >("all");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statuses, setStatuses] = useState<Record<string, ReviewStatus>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [copiedReport, setCopiedReport] = useState(false);

  const allItems: ReviewItem[] = useMemo(() => {
    const placeholderPath = "/placeholders/dg-brand-placeholder.webp";
    return [
      ...LIVE_GUIDED_TOURS.map((t) => ({
        id: `tour:${t.slug}`,
        section: "Guided Tour" as const,
        slug: t.slug,
        title: t.title,
        category: t.badge,
        description: t.tagline,
        image: t.heroImage,
        liveHref: `/tours/${t.slug}`,
        isPlaceholder: t.heroImage === placeholderPath,
      })),
      ...GUIDES.map((g) => ({
        id: `guide:${g.slug}`,
        section: "Guide" as const,
        slug: g.slug,
        title: g.title,
        category: g.category,
        description: g.subtitle,
        image: g.heroImage,
        liveHref: `/knowledge-hub/${g.slug}`,
        isPlaceholder: g.heroImage === placeholderPath,
      })),
      ...AREAS.map((a) => ({
        id: `area:${a.slug}`,
        section: "Area Guide" as const,
        slug: a.slug,
        title: a.name,
        category: a.county,
        description: a.tagline,
        image: a.heroImage,
        liveHref: `/knowledge-hub/areas/${a.slug}`,
        isPlaceholder: a.heroImage === placeholderPath,
      })),
      ...QUESTIONS.map((q) => ({
        id: `qa:${q.slug}`,
        section: "Q&A" as const,
        slug: q.slug,
        title: q.title,
        category: q.category,
        description: q.subtitle,
        image: q.heroImage,
        liveHref: `/knowledge-hub/${q.slug}`,
        isPlaceholder: q.heroImage === placeholderPath,
      })),
      ...EVENTS.map((ev) => ({
        id: `event:${ev.slug}`,
        section: "Event" as const,
        slug: ev.slug,
        title: ev.title,
        category: ev.category,
        description: ev.summary,
        image: ev.heroImage,
        liveHref: `/knowledge-hub/events/${ev.slug}`,
        isPlaceholder: ev.heroImage === placeholderPath,
      })),
      ...ARTICLES.map((art) => ({
        id: `article:${art.slug}`,
        section: "Article" as const,
        slug: art.slug,
        title: art.title,
        category: art.category,
        description: art.summary,
        image: art.heroImage,
        liveHref: `/knowledge-hub/articles/${art.slug}`,
        isPlaceholder: art.heroImage === placeholderPath,
      })),
    ];
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          statuses?: Record<string, ReviewStatus>;
          notes?: Record<string, string>;
        };
        if (parsed.statuses) setStatuses(parsed.statuses);
        if (parsed.notes) setNotes(parsed.notes);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persist = (nextStatuses: Record<string, ReviewStatus>, nextNotes: Record<string, string>) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ statuses: nextStatuses, notes: nextNotes })
      );
    } catch {
      // ignore storage errors
    }
  };

  const setItemStatus = (id: string, next: ReviewStatus) => {
    const updated = { ...statuses, [id]: next };
    setStatuses(updated);
    persist(updated, notes);
  };

  const setItemNote = (id: string, val: string) => {
    const updated = { ...notes, [id]: val };
    setNotes(updated);
    persist(statuses, updated);
  };

  const resetAll = () => {
    setStatuses({});
    setNotes({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const q = searchQuery.trim().toLowerCase();
  const visibleItems = allItems.filter((item) => {
    const status = statuses[item.id] || "unreviewed";
    if (filterMode === "placeholders" && !item.isPlaceholder) return false;
    if (filterMode === "photos" && item.isPlaceholder) return false;
    if (filterMode === "tours" && item.section !== "Guided Tour") return false;
    if (filterMode === "flagged" && status !== "flagged" && !item.isPlaceholder) return false;
    if (filterMode === "approved" && status !== "approved") return false;
    if (sectionFilter !== "all" && item.section !== sectionFilter) return false;
    if (
      q &&
      !item.title.toLowerCase().includes(q) &&
      !item.slug.toLowerCase().includes(q) &&
      !item.image.toLowerCase().includes(q) &&
      !item.category.toLowerCase().includes(q)
    ) {
      return false;
    }
    return true;
  });

  const placeholderCount = allItems.filter((i) => i.isPlaceholder).length;
  const approvedCount = allItems.filter((i) => statuses[i.id] === "approved").length;
  const flaggedCount = allItems.filter((i) => statuses[i.id] === "flagged").length;

  const copyFlaggedList = async () => {
    const flaggedOrPlaceholder = allItems.filter(
      (i) => statuses[i.id] === "flagged" || (i.isPlaceholder && statuses[i.id] !== "approved")
    );
    const report = flaggedOrPlaceholder
      .map((item, idx) => {
        const reason =
          statuses[item.id] === "flagged" ? "MISMATCH / NEEDS REPLACEMENT" : "PLACEHOLDER ACTIVE";
        const noteLine = notes[item.id]?.trim() ? ` | Note: ${notes[item.id].trim()}` : "";
        return `${idx + 1}. [${item.section}] ${item.title} (${item.slug}) — ${reason} — Current: ${item.image}${noteLine}`;
      })
      .join("\n");

    const text =
      report ||
      "All reviewed images approved! No flagged mismatches remain.";
    try {
      await navigator.clipboard.writeText(text);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] p-6 md:p-10">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Header */}
        <div className="bg-[#111] text-white rounded-2xl p-6 md:p-8 border border-[#D4AF37]/40 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37] block mb-2">
                ClickMe Visual Audit Board • Non-Indexed Internal Tool
              </span>
              <h1 className="font-aiveritas text-3xl md:text-4xl text-white mb-2">
                Card &amp; Tour Image Approval Gallery
              </h1>
              <p className="text-sm text-white/75 max-w-3xl leading-relaxed">
                Inspect every card thumbnail directly beside its headline and summary. Flag any existing stock photo that does not match its title, approve accurate shots, or copy your flagged list in one click.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={copyFlaggedList}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-4 h-4" /> Copied Report
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Flagged &amp; Placeholder List
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Checks
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/15 text-xs">
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              <span className="text-white/55 block uppercase tracking-wider text-[10px]">Total Cards</span>
              <span className="text-2xl font-bold text-white">{allItems.length}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] block uppercase tracking-wider text-[10px]">D&amp;G Placeholders</span>
              <span className="text-2xl font-bold text-[#D4AF37]">{placeholderCount}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-emerald-500/30">
              <span className="text-emerald-300 block uppercase tracking-wider text-[10px]">Approved by You</span>
              <span className="text-2xl font-bold text-emerald-300">{approvedCount}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-amber-400/30">
              <span className="text-amber-300 block uppercase tracking-wider text-[10px]">Flagged Mismatches</span>
              <span className="text-2xl font-bold text-amber-300">{flaggedCount}</span>
            </div>
          </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#111]/10 p-4 md:p-5 shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "all", label: `All (${allItems.length})` },
                { key: "photos", label: `Stock / Real Photos (${allItems.length - placeholderCount})` },
                { key: "placeholders", label: `D&G Placeholders (${placeholderCount})` },
                { key: "tours", label: `Guided Tours (${LIVE_GUIDED_TOURS.length})` },
                { key: "flagged", label: "Flagged / Needs Shot" },
                { key: "approved", label: `Approved (${approvedCount})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterMode(tab.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  filterMode === tab.key
                    ? "bg-[#111] text-[#D4AF37]"
                    : "bg-[#f5f3ef] text-[#111]/75 hover:bg-[#e8e3d8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              aria-label="Filter by section"
              className="px-3.5 py-2 rounded-lg bg-[#f5f3ef] border border-[#111]/10 text-xs font-bold uppercase tracking-wider text-[#111]"
            >
              <option value="all">All Sections</option>
              <option value="Guided Tour">Guided Tours</option>
              <option value="Guide">Guides</option>
              <option value="Area Guide">Areas We Work In</option>
              <option value="Q&A">Q&amp;A Classroom</option>
              <option value="Event">Events</option>
              <option value="Article">Articles</option>
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-[#9A7D3A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, slug, filename..."
                className="pl-9 pr-4 py-2 rounded-lg bg-[#f5f3ef] border border-[#111]/10 text-xs text-[#111] w-64 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* All-On-One-Page Side-by-Side Image Approval Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleItems.map((item) => {
            const status = statuses[item.id] || "unreviewed";
            const fileName = item.image.split("/").pop() || item.image;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all flex flex-col justify-between shadow-sm ${
                  status === "approved"
                    ? "border-emerald-500/70 ring-1 ring-emerald-500/20"
                    : status === "flagged"
                    ? "border-amber-500 ring-1 ring-amber-500/30"
                    : item.isPlaceholder
                    ? "border-[#D4AF37]"
                    : "border-[#111]/10"
                }`}
              >
                <div>
                  {/* Big Visual Image Preview */}
                  <div className="relative aspect-[16/10] w-full bg-[#111] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-sm bg-[#111]/90 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                        {item.section}
                      </span>
                      {item.isPlaceholder && (
                        <span className="px-2.5 py-1 rounded-sm bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest">
                          Placeholder
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      {status === "approved" && (
                        <span className="px-2.5 py-1 rounded-sm bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {status === "flagged" && (
                        <span className="px-2.5 py-1 rounded-sm bg-amber-500 text-[#111] text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Replace Shot
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Meta + Title Comparison */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-[#9A7D3A] mb-1.5">
                      <span className="uppercase tracking-wider truncate">{item.category}</span>
                      <Link
                        href={item.liveHref}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#111]/60 hover:text-[#111] shrink-0"
                      >
                        Open Page <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <h2 className="font-aiveritas text-xl text-[#111] leading-snug mb-2">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[#111]/70 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    <div className="text-[11px] bg-[#f5f3ef] border border-[#111]/8 rounded-lg px-3 py-2 text-[#111]/75 flex items-center gap-2 mb-3">
                      <ImageIcon className="w-3.5 h-3.5 text-[#9A7D3A] shrink-0" />
                      <span className="truncate font-mono" title={item.image}>
                        {fileName}
                      </span>
                    </div>

                    {/* Optional note input for replacements */}
                    <input
                      type="text"
                      value={notes[item.id] || ""}
                      onChange={(e) => setItemNote(item.id, e.target.value)}
                      placeholder="Optional note (e.g. needs Hyde Park outdoor plaza photo)..."
                      className="w-full px-3 py-2 rounded-lg border border-[#111]/12 bg-[#fbfbf9] text-xs text-[#111] placeholder:text-[#111]/40 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Approve / Flag Action Bar */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setItemStatus(item.id, status === "approved" ? "unreviewed" : "approved")
                    }
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      status === "approved"
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {status === "approved" ? "Approved" : "Approve Match"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setItemStatus(item.id, status === "flagged" ? "unreviewed" : "flagged")
                    }
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      status === "flagged"
                        ? "bg-amber-500 text-[#111]"
                        : "bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-[#111] border border-amber-200"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {status === "flagged" ? "Flagged" : "Needs New Photo"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useEffect, useState } from "react";
import { CheckSquare, Square, Star, Download, NotebookPen, RotateCcw, Send, CheckCircle2 } from "lucide-react";
import type { PdfWorkbookState } from "@/lib/pdfBuilder";

export interface WorkbookPromptItem {
  key: string;
  label: string;
  placeholder?: string;
}

interface InteractiveWorkbookProps {
  slug: string;
  title: string;
  subtitle?: string;
  items: WorkbookPromptItem[];
  onDownloadClick: (state: PdfWorkbookState) => void;
  onStateChange?: (state: PdfWorkbookState) => void;
}

export function loadWorkbookFromStorage(slug: string): PdfWorkbookState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(`dg_workbook_${slug}`);
    if (!raw) return {};
    return JSON.parse(raw) as PdfWorkbookState;
  } catch {
    return {};
  }
}

export default function InteractiveWorkbook({
  slug,
  title,
  subtitle = "Check off stops or steps as you go and write your own notes. Everything saves in your browser and prints inside your PDF download.",
  items,
  onDownloadClick,
  onStateChange,
}: InteractiveWorkbookProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);
  const [notesByKey, setNotesByKey] = useState<Record<string, string>>({});
  const [generalNotes, setGeneralNotes] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareName, setShareName] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [sharePhone, setSharePhone] = useState("");
  const [shareStatus, setShareStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const saved = loadWorkbookFromStorage(slug);
    setCheckedItems(saved.checkedItems || []);
    setFavoriteKeys(saved.favoriteKeys || []);
    setNotesByKey(saved.notesByKey || {});
    setGeneralNotes(saved.generalNotes || "");
    setHydrated(true);
  }, [slug]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    const state: PdfWorkbookState = {
      checkedItems,
      favoriteKeys,
      notesByKey,
      generalNotes,
    };
    try {
      window.localStorage.setItem(`dg_workbook_${slug}`, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
    onStateChange?.(state);
  }, [checkedItems, favoriteKeys, notesByKey, generalNotes, hydrated, slug, onStateChange]);

  const toggleChecked = (key: string) => {
    setCheckedItems((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleFavorite = (key: string) => {
    setFavoriteKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const updateNote = (key: string, value: string) => {
    setNotesByKey((prev) => ({ ...prev, [key]: value }));
  };

  const resetNotes = () => {
    setCheckedItems([]);
    setFavoriteKeys([]);
    setNotesByKey({});
    setGeneralNotes("");
  };

  const currentState: PdfWorkbookState = {
    checkedItems,
    favoriteKeys,
    notesByKey,
    generalNotes,
  };

  const handleShareNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    setShareStatus("sending");
    const formattedLines = items
      .map((item) => {
        const isChecked = checkedItems.includes(item.key);
        const isFav = favoriteKeys.includes(item.key);
        const note = notesByKey[item.key]?.trim();
        if (!isChecked && !isFav && !note) return null;
        return `[${isChecked ? "x" : " "}]${isFav ? " ★ TOP PICK" : ""} ${item.label}${note ? ` — Note: ${note}` : ""}`;
      })
      .filter(Boolean)
      .join("\n");

    const messageBody = [
      `Workbook: ${title}`,
      formattedLines ? `Saved Checklist & Notes:\n${formattedLines}` : "No individual notes entered yet.",
      generalNotes.trim() ? `Overall Summary Notes:\n${generalNotes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: shareName.trim(),
          email: shareEmail.trim(),
          phone: sharePhone.trim(),
          category: "workbook-notes",
          subject: `Saved Workbook Notes: ${title}`,
          message: messageBody,
          source: `Interactive Workbook (${slug})`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setShareStatus("sent");
    } catch {
      setShareStatus("error");
    }
  };

  const completedCount = checkedItems.length;

  return (
    <div className="my-12 rounded-2xl bg-[#fbfbf9] border border-[#D4AF37]/45 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#111]/10">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A7D3A] mb-1.5">
            <NotebookPen className="w-3.5 h-3.5" /> Interactive Workbook • Auto-Saved
          </span>
          <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111]">{title}</h3>
          <p className="text-sm text-[#111]/70 font-light mt-1 max-w-2xl">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-[#111]/10 text-xs font-bold text-[#111]">
            {completedCount}/{items.length} Done
          </span>
          {(completedCount > 0 || generalNotes || Object.keys(notesByKey).length > 0) && (
            <button
              type="button"
              onClick={resetNotes}
              title="Clear saved workbook notes"
              className="p-2 rounded-lg bg-white border border-[#111]/10 text-[#111]/60 hover:text-red-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-6">
        {items.map((item) => {
          const isChecked = checkedItems.includes(item.key);
          const isFav = favoriteKeys.includes(item.key);
          const noteVal = notesByKey[item.key] || "";

          return (
            <div
              key={item.key}
              className={`rounded-xl border p-4 transition-colors ${
                isChecked
                  ? "bg-white border-[#D4AF37] shadow-xs"
                  : "bg-white/80 border-[#111]/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <button
                  type="button"
                  onClick={() => toggleChecked(item.key)}
                  className="flex items-start gap-2.5 text-left group"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-[#111]/35 group-hover:text-[#9A7D3A] shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm md:text-base font-semibold ${
                      isChecked ? "text-[#111]" : "text-[#111]/85"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorite(item.key)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors ${
                    isFav
                      ? "bg-[#D4AF37] text-[#111]"
                      : "bg-[#f5f3ef] text-[#111]/60 hover:text-[#111]"
                  }`}
                >
                  <Star className={`w-3 h-3 ${isFav ? "fill-current" : ""}`} />
                  {isFav ? "Top Pick" : "Star"}
                </button>
              </div>

              <textarea
                rows={2}
                value={noteVal}
                onChange={(e) => updateNote(item.key, e.target.value)}
                placeholder={
                  item.placeholder ||
                  "Type your notes here (street impressions, noise, lot feel, questions for Mark & Rachael)..."
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#f5f3ef]/60 border border-[#111]/10 text-sm text-[#111] placeholder:text-[#111]/40 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <label className="block text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] mb-1.5">
          Overall Summary Notes (Optional — Prints Inside Your PDF)
        </label>
        <textarea
          rows={3}
          value={generalNotes}
          onChange={(e) => setGeneralNotes(e.target.value)}
          placeholder="Write your favorite street, must-have features, or budget targets to review with Mark Davis & Rachael Garnett..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-[#111]/15 text-sm text-[#111] placeholder:text-[#111]/40 focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      <div className="mt-6 pt-5 border-t border-[#111]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#111]/65 leading-relaxed">
          Keep a branded PDF copy with your notes inside—or send your saved notes straight to Mark &amp; Rachael before your first call.
        </p>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setShareOpen((prev) => !prev);
              if (shareStatus === "sent") setShareStatus("idle");
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#f5f3ef] text-[#111] border border-[#111]/20 hover:border-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#9A7D3A]" /> Share With Mark &amp; Rachael
          </button>
          <button
            type="button"
            onClick={() => onDownloadClick(currentState)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Workbook (PDF)
          </button>
        </div>
      </div>

      {shareOpen && (
        <div className="mt-5 p-5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-sm">
          {shareStatus === "sent" ? (
            <div className="flex items-start gap-3 text-sm text-[#111]">
              <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Your saved notes are with Mark Davis &amp; Rachael Garnett.</p>
                <p className="text-xs text-[#111]/70 mt-1">
                  We review your checklist before reaching out so our first conversation starts on the streets and numbers you starred.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleShareNotes} className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#9A7D3A]">
                Send Your Saved Checklist &amp; Notes Directly to Mark &amp; Rachael
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  value={shareName}
                  onChange={(e) => setShareName(e.target.value)}
                  placeholder="Your Name *"
                  className="px-3.5 py-2.5 rounded-lg bg-[#f5f3ef] border border-[#111]/12 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  required
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="px-3.5 py-2.5 rounded-lg bg-[#f5f3ef] border border-[#111]/12 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="tel"
                  value={sharePhone}
                  onChange={(e) => setSharePhone(e.target.value)}
                  placeholder="Phone (Optional)"
                  className="px-3.5 py-2.5 rounded-lg bg-[#f5f3ef] border border-[#111]/12 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-[#111]/60">
                  Includes {checkedItems.length} checked item(s), {favoriteKeys.length} top pick(s), and your typed notes.
                </span>
                <button
                  type="submit"
                  disabled={shareStatus === "sending"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#111] text-[#111] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  {shareStatus === "sending" ? "Sending Notes..." : "Send Notes Now"}
                </button>
              </div>
              {shareStatus === "error" && (
                <p className="text-xs text-red-600">
                  Could not send right now—please try again or call Mark (941-737-4127) or Rachael (727-808-3344).
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}


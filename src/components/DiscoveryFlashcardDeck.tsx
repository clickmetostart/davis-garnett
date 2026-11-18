"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  NotebookPen,
  Printer,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import {
  getPersonalizedMatches,
  type DiscoveryAnswersState,
  type DiscoveryDeckConfig,
} from "@/data/discoveryDecks";

interface DiscoveryFlashcardDeckProps {
  deck: DiscoveryDeckConfig;
}

const TOTAL_STEPS_OFFSET = 1; // +1 for final Review & Download step

export default function DiscoveryFlashcardDeck({ deck }: DiscoveryFlashcardDeckProps) {
  const storageKey = `dg_discovery_deck_${deck.track}_v1`;
  const totalSteps = deck.cards.length + TOTAL_STEPS_OFFSET;
  const reviewIndex = deck.cards.length;

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [openNoteForCard, setOpenNoteForCard] = useState<Record<string, boolean>>({});

  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [notesByCard, setNotesByCard] = useState<Record<string, string>>({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredMethod, setPreferredMethod] = useState("Phone Call");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pdfDownloading, setPdfDownloading] = useState<"blank" | "filled" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as DiscoveryAnswersState;
        if (parsed.selections) setSelections(parsed.selections);
        if (parsed.notesByCard) {
          setNotesByCard(parsed.notesByCard);
          const opened: Record<string, boolean> = {};
          for (const [k, v] of Object.entries(parsed.notesByCard)) {
            if (v?.trim()) opened[k] = true;
          }
          setOpenNoteForCard(opened);
        }
        if (parsed.contact) {
          setFullName(parsed.contact.fullName || "");
          setEmail(parsed.contact.email || "");
          setPhone(parsed.contact.phone || "");
          setPreferredMethod(parsed.contact.preferredMethod || "Phone Call");
        }
      }
    } catch {
      // Ignore malformed storage
    }
    setHydrated(true);
  }, [storageKey]);

  const currentState: DiscoveryAnswersState = useMemo(
    () => ({
      selections,
      notesByCard,
      contact: {
        fullName,
        email,
        phone,
        preferredMethod,
      },
    }),
    [selections, notesByCard, fullName, email, phone, preferredMethod]
  );

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(currentState));
    } catch {
      // Ignore storage quota issues
    }
  }, [currentState, hydrated, storageKey]);

  const toggleOption = (
    questionId: string,
    optionId: string,
    mode: "single" | "multi"
  ) => {
    setSelections((prev) => {
      const current = prev[questionId] || [];
      if (mode === "single") {
        const exists = current.includes(optionId);
        return { ...prev, [questionId]: exists ? [] : [optionId] };
      }
      const next = current.includes(optionId)
        ? current.filter((x) => x !== optionId)
        : [...current, optionId];
      return { ...prev, [questionId]: next };
    });
  };

  const updateNote = (cardId: string, text: string) => {
    setNotesByCard((prev) => ({ ...prev, [cardId]: text }));
  };

  const goToStep = (nextIndex: number) => {
    const clamped = Math.max(0, Math.min(totalSteps - 1, nextIndex));
    setDirection(clamped >= stepIndex ? 1 : -1);
    setStepIndex(clamped);
  };

  const resetDeck = () => {
    setSelections({});
    setNotesByCard({});
    setOpenNoteForCard({});
    setSubmitted(false);
    setSubmitError("");
    setDirection(-1);
    setStepIndex(0);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // Ignore
      }
    }
  };

  const isCardAnswered = (cardId: string) => {
    const card = deck.cards.find((c) => c.id === cardId);
    if (!card) return false;
    const hasPick = card.questions.some((q) => (selections[q.id] || []).length > 0);
    const hasNote = Boolean(notesByCard[cardId]?.trim());
    return hasPick || hasNote;
  };

  const answeredCardsCount = deck.cards.filter((c) => isCardAnswered(c.id)).length;
  const totalSelectedCount = Object.values(selections).reduce(
    (sum, arr) => sum + arr.length,
    0
  );
  const personalizedMatches = useMemo(
    () => getPersonalizedMatches(deck.track, currentState),
    [deck.track, currentState]
  );

  const downloadPdf = async (mode: "blank" | "filled") => {
    setPdfDownloading(mode);
    setSubmitError("");
    try {
      const res = await fetch("/api/guides/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "discovery-questionnaire",
          track: deck.track,
          mode,
          discoveryState: mode === "filled" ? currentState : undefined,
        }),
      });
      if (!res.ok) throw new Error("PDF generation error");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `davis-garnett-${deck.track}-getting-started-${mode}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setSubmitError("Could not download the PDF right now. Please try again.");
    } finally {
      setPdfDownloading(null);
    }
  };

  const formatStructuredSummary = () => {
    const lines: string[] = [
      `Completed ${deck.headline} (${answeredCardsCount}/${deck.cards.length} steps completed):`,
      `Preferred Contact: ${preferredMethod}`,
      "",
    ];
    for (const card of deck.cards) {
      const cardParts: string[] = [];
      for (const q of card.questions) {
        const picked = (selections[q.id] || [])
          .map((optId) => q.options.find((o) => o.id === optId)?.label || optId)
          .filter(Boolean);
        if (picked.length > 0) {
          cardParts.push(`${q.prompt} -> ${picked.join(", ")}`);
        }
      }
      const note = notesByCard[card.id]?.trim();
      if (note) cardParts.push(`Notes: ${note}`);
      if (cardParts.length > 0) {
        lines.push(`[${card.stepNumber}. ${card.title}]`);
        lines.push(...cardParts);
        lines.push("");
      }
    }
    return lines.join("\n").trim();
  };

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setSubmitError("Please add your name and email so Mark & Rachael can follow up.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");

    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || "Client";
    const lastName = parts.slice(1).join(" ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: email.trim(),
          phone: phone.trim() || "Not provided",
          category: deck.track === "commercial" ? "commercial" : "consultation",
          subject: `${deck.headline} — ${fullName.trim()}`,
          interest: `${deck.hubLabel} Getting Started (${preferredMethod})`,
          labels: [
            deck.track === "commercial" ? "Commercial Getting Started" : "Residential Getting Started",
            "Client Priorities Worksheet",
          ],
          message: formatStructuredSummary(),
          source: `Getting Started Worksheet (${deck.getStartedHref})`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Could not send right now. You can still download your PDF below or call Mark & Rachael directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeCard = stepIndex < deck.cards.length ? deck.cards[stepIndex] : null;
  const progressPct = Math.round(((stepIndex + 1) / totalSteps) * 100);
  const noteOpen = activeCard
    ? Boolean(openNoteForCard[activeCard.id] || notesByCard[activeCard.id]?.trim())
    : false;

  return (
    <div id="get-started-worksheet" className="scroll-mt-24">
      {/* Clean Single Progress Row */}
      <div className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider text-[#111]/65 mb-2">
          <span>
            {activeCard
              ? `Step ${activeCard.stepNumber} of 0${totalSteps} · ${activeCard.shortLabel}`
              : `Step 0${totalSteps} of 0${totalSteps} · Review & Download`}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[#9A7D3A]">{progressPct}% Done</span>
            {(totalSelectedCount > 0 || Object.keys(notesByCard).length > 0) && (
              <button
                type="button"
                onClick={resetDeck}
                className="text-[#111]/55 hover:text-red-600 inline-flex items-center gap-1 cursor-pointer"
                title="Clear saved answers"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-2 bg-[#111]/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-[#D4AF37] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Desktop quick-step buttons (hidden on small mobile so it never wraps messily) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1">
          {deck.cards.map((c, idx) => {
            const isActive = idx === stepIndex;
            const done = isCardAnswered(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => goToStep(idx)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-[#D4AF37] border-[#111111] shadow-xs"
                    : done
                    ? "bg-white text-[#111111] border-[#D4AF37]"
                    : "bg-white/70 text-[#111]/60 border-[#111]/10 hover:border-[#D4AF37]/60"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7D3A]" />
                ) : (
                  <span className="opacity-70">{c.stepNumber}</span>
                )}
                <span>{c.shortLabel}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => goToStep(reviewIndex)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 border transition-all cursor-pointer ${
              stepIndex === reviewIndex
                ? "bg-[#D4AF37] text-[#111111] border-[#D4AF37] shadow-xs"
                : "bg-white text-[#111] border-[#111]/15 hover:border-[#D4AF37]"
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>08 · Finish &amp; PDF</span>
          </button>
        </div>
      </div>

      {/* Main Split: Calm Center Stage + Optional Desktop Snapshot Sidebar */}
      <div className="grid lg:grid-cols-[1.75fr_1fr] gap-8 items-start">
        {/* Step Stage */}
        <div className="rounded-2xl bg-white border border-[#D4AF37]/40 shadow-md overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {activeCard ? (
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-5 sm:p-8 md:p-10"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A7D3A]">
                    {activeCard.eyebrow}
                  </span>
                  {activeCard.conditionalNote && (
                    <span className="px-2.5 py-1 rounded-full bg-[#f5f3ef] text-[10px] font-bold uppercase tracking-wider text-[#111]/65">
                      {activeCard.conditionalNote}
                    </span>
                  )}
                </div>

                <h2 className="font-aiveritas text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-tight mb-2">
                  {activeCard.title}
                </h2>
                <p className="text-sm sm:text-base text-[#111]/75 font-light mb-6 leading-relaxed">
                  {activeCard.subtitle}
                </p>

                <div className="space-y-6">
                  {activeCard.questions.map((q) => {
                    const selectedIds = selections[q.id] || [];
                    return (
                      <div key={q.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                          <label className="text-sm md:text-base font-bold text-[#111111]">
                            {q.prompt}
                          </label>
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#111]/50">
                            {q.selectionMode === "single" ? "Pick One" : "Select All That Fit"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {q.options.map((opt) => {
                            const active = selectedIds.includes(opt.id);
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleOption(q.id, opt.id, q.selectionMode)}
                                className={`min-h-[48px] text-left px-4 py-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                                  active
                                    ? "bg-[#111111] text-white border-[#D4AF37] shadow-sm"
                                    : "bg-[#fbfbf9] text-[#111111] border-[#111]/12 hover:border-[#D4AF37] hover:bg-white"
                                }`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                                    active
                                      ? "bg-[#D4AF37] border-[#D4AF37] text-[#111111]"
                                      : "bg-white border-[#111]/25 text-transparent"
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                                <div>
                                  <span className="text-sm font-semibold block leading-snug">
                                    {opt.label}
                                  </span>
                                  {opt.hint && (
                                    <span
                                      className={`text-xs block mt-0.5 font-light ${
                                        active ? "text-white/75" : "text-[#111]/60"
                                      }`}
                                    >
                                      {opt.hint}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Clean Optional Margin Note (Collapsed by default on mobile to keep step uncrowded) */}
                  <div className="pt-2">
                    {!noteOpen ? (
                      <button
                        type="button"
                        onClick={() =>
                          setOpenNoteForCard((prev) => ({ ...prev, [activeCard.id]: true }))
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A7D3A] hover:text-[#111] transition-colors cursor-pointer"
                      >
                        <NotebookPen className="w-3.5 h-3.5" /> + Add a personal note for this step (optional)
                      </button>
                    ) : (
                      <div className="pt-3 border-t border-[#111]/10">
                        <label
                          htmlFor={`note-${activeCard.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A7D3A] mb-2"
                        >
                          <NotebookPen className="w-3.5 h-3.5" /> {activeCard.notePrompt}
                        </label>
                        <textarea
                          id={`note-${activeCard.id}`}
                          rows={2}
                          value={notesByCard[activeCard.id] || ""}
                          onChange={(e) => updateNote(activeCard.id, e.target.value)}
                          placeholder={activeCard.notePlaceholder}
                          className="w-full px-4 py-3 rounded-xl bg-[#fbfbf9] border border-[#111]/15 text-sm text-[#111] placeholder:text-[#111]/40 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sticky Mobile/Desktop Navigation Buttons */}
                <div className="mt-8 pt-5 border-t border-[#111]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(stepIndex - 1)}
                    disabled={stepIndex === 0}
                    className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-3.5 rounded-lg border border-[#111]/15 text-xs font-bold uppercase tracking-wider text-[#111] hover:border-[#111] disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  {stepIndex < deck.cards.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => goToStep(stepIndex + 1)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-bold uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToStep(reviewIndex)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                    >
                      Review &amp; Get PDF <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              /* STEP 08: REVIEW, TAILORED NEXT STEPS, SUBMIT & COMPLETE PDF */
              <motion.div
                key="review-step"
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-5 sm:p-8 md:p-10"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A7D3A] block mb-2">
                  Step 08 of 08 · Summary &amp; PDF Download
                </span>
                <h2 className="font-aiveritas text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-tight mb-2">
                  {submitted ? "Sent to Mark & Rachael" : "Your Priorities at a Glance"}
                </h2>
                <p className="text-sm sm:text-base text-[#111]/75 font-light mb-6 leading-relaxed">
                  {submitted
                    ? "Thank you! Download your complete Getting Started Guide + Filled Worksheet PDF below, or browse the tools matched to your plan."
                    : "Review or tweak any answer below, send your worksheet straight to Mark and Rachael, and download your complete Getting Started Guide PDF."}
                </p>

                {submitted ? (
                  <div className="space-y-6 mb-8">
                    <div className="rounded-2xl bg-[#fbfbf9] border border-[#D4AF37] p-6">
                      <div className="flex items-start gap-3.5 mb-5">
                        <CheckCircle2 className="w-7 h-7 text-[#9A7D3A] shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-aiveritas text-2xl text-[#111] mb-1">
                            Received by {deck.leadAdvisor}
                          </h3>
                          <p className="text-sm text-[#111]/75 leading-relaxed">
                            We got your {answeredCardsCount} completed steps and will follow up by{" "}
                            <strong>{preferredMethod}</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => downloadPdf("filled")}
                          disabled={pdfDownloading !== null}
                          className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-md cursor-pointer disabled:opacity-60"
                        >
                          <Download className="w-4 h-4" />
                          {pdfDownloading === "filled"
                            ? "Building Your PDF..."
                            : "Download Your Complete Guide (PDF)"}
                        </button>

                        <button
                          type="button"
                          onClick={() => goToStep(0)}
                          className="inline-flex items-center gap-2 px-5 py-4 rounded-lg border border-[#111]/20 text-xs font-bold uppercase tracking-widest text-[#111] hover:border-[#D4AF37] cursor-pointer"
                        >
                          Edit Answers
                        </button>
                      </div>
                    </div>

                    {/* Tailored Next-Step Resources shown cleanly upon completion */}
                    <div className="rounded-2xl bg-[#111111] text-white p-6">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Matched to Your Answers
                      </span>
                      <div className="grid sm:grid-cols-2 gap-3 mt-3">
                        {personalizedMatches.map((m) => (
                          <Link
                            key={m.href}
                            href={m.href}
                            className="p-3.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-between gap-3"
                          >
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                                {m.kind}
                              </span>
                              <span className="text-xs font-bold text-white">{m.label}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitProfile} className="space-y-6 mb-8">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {deck.cards.map((c, idx) => {
                        const selectedLabels: string[] = [];
                        for (const q of c.questions) {
                          for (const optId of selections[q.id] || []) {
                            const lbl = q.options.find((o) => o.id === optId)?.label;
                            if (lbl) selectedLabels.push(lbl);
                          }
                        }
                        const note = notesByCard[c.id]?.trim();
                        return (
                          <div
                            key={c.id}
                            className="p-4 rounded-xl bg-[#fbfbf9] border border-[#111]/10 flex flex-col justify-between gap-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7D3A]">
                                {c.stepNumber} · {c.shortLabel}
                              </span>
                              <button
                                type="button"
                                onClick={() => goToStep(idx)}
                                className="text-[11px] font-bold text-[#111]/60 hover:text-[#9A7D3A] underline cursor-pointer"
                              >
                                Edit
                              </button>
                            </div>
                            {selectedLabels.length > 0 ? (
                              <p className="text-xs font-semibold text-[#111] leading-relaxed">
                                {selectedLabels.join(" · ")}
                              </p>
                            ) : (
                              <p className="text-xs italic text-[#111]/45">Not answered yet</p>
                            )}
                            {note && (
                              <p className="text-xs text-[#9A7D3A] italic line-clamp-2">
                                &ldquo;{note}&rdquo;
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Simple Contact Form */}
                    <div className="rounded-2xl bg-[#fbfbf9] border border-[#D4AF37]/45 p-5 sm:p-6 space-y-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A7D3A] block mb-1">
                          Send to Mark &amp; Rachael + Save Your Copy
                        </span>
                        <h3 className="font-aiveritas text-xl md:text-2xl text-[#111]">
                          How Should We Reach You?
                        </h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Jordan Taylor"
                            className="w-full px-4 py-3 rounded-lg bg-white border border-[#111]/15 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-white border border-[#111]/15 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(813) 555-0192"
                            className="w-full px-4 py-3 rounded-lg bg-white border border-[#111]/15 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-1">
                            Preferred Contact
                          </label>
                          <select
                            value={preferredMethod}
                            onChange={(e) => setPreferredMethod(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white border border-[#111]/15 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Phone Call">Phone Call</option>
                            <option value="Text Message">Text Message</option>
                            <option value="Email Summary First">Email Summary First</option>
                            <option value="Coffee or Office Meeting">Coffee or Office Meeting</option>
                          </select>
                        </div>
                      </div>

                      {submitError && (
                        <p className="text-xs font-semibold text-red-600">{submitError}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#111111] hover:text-white text-[#111111] text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-md cursor-pointer disabled:opacity-60"
                        >
                          <Send className="w-4 h-4" />
                          {submitting ? "Sending..." : "Send & Download Complete PDF"}
                        </button>

                        <button
                          type="button"
                          onClick={() => downloadPdf("filled")}
                          disabled={pdfDownloading !== null}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-lg border border-[#111]/20 hover:border-[#D4AF37] text-xs font-bold uppercase tracking-[0.14em] text-[#111] transition-colors cursor-pointer disabled:opacity-60"
                        >
                          <Download className="w-4 h-4 text-[#9A7D3A]" />
                          {pdfDownloading === "filled" ? "Preparing PDF..." : "Download Filled PDF Now"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                <div className="pt-4 border-t border-[#111]/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(deck.cards.length - 1)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#111]/15 text-xs font-bold uppercase tracking-widest text-[#111] hover:border-[#111] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Step 0{deck.cards.length}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadPdf("blank")}
                    disabled={pdfDownloading !== null}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A7D3A] hover:underline cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print blank worksheet instead
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact Mobile Quick Summary Strip (never crowds mobile with full sidebars) */}
          {stepIndex < reviewIndex && (
            <div className="lg:hidden px-5 py-3.5 bg-[#f5f3ef] border-t border-[#111]/10 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#111]/75">
                {answeredCardsCount} of {deck.cards.length} answered · Auto-saved
              </span>
              <button
                type="button"
                onClick={() => goToStep(reviewIndex)}
                className="text-xs font-bold text-[#9A7D3A] underline shrink-0 cursor-pointer"
              >
                Skip to Review &amp; PDF →
              </button>
            </div>
          )}
        </div>

        {/* Desktop-Only Calm Progress Sidebar */}
        <aside className="hidden lg:block space-y-6 sticky top-24">
          <div className="rounded-2xl bg-white border border-[#111]/10 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#111]/10 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A7D3A] block">
                  Your Worksheet
                </span>
                <h3 className="font-aiveritas text-xl text-[#111]">
                  Answers So Far
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#f5f3ef] border border-[#111]/10 text-xs font-bold text-[#111]">
                {answeredCardsCount}/{deck.cards.length}
              </span>
            </div>

            {totalSelectedCount === 0 ? (
              <p className="text-sm text-[#111]/65 font-light leading-relaxed">
                Pick options on the left and your summary fills in here automatically—or grab a printable blank PDF below for an in-person chat.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {deck.cards.map((c, idx) => {
                  const chosen = c.questions.flatMap((q) =>
                    (selections[q.id] || [])
                      .map((id) => q.options.find((o) => o.id === id)?.label)
                      .filter(Boolean) as string[]
                  );
                  const note = notesByCard[c.id]?.trim();
                  if (chosen.length === 0 && !note) return null;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => goToStep(idx)}
                      className="w-full text-left p-3 rounded-xl bg-[#fbfbf9] hover:bg-white border border-[#111]/8 hover:border-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7D3A] block">
                        Step {c.stepNumber} · {c.shortLabel}
                      </span>
                      {chosen.length > 0 && (
                        <p className="text-xs font-semibold text-[#111] mt-0.5 leading-snug">
                          {chosen.join(" · ")}
                        </p>
                      )}
                      {note && (
                        <p className="text-[11px] text-[#111]/65 italic mt-1 truncate">
                          Note: {note}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-[#111]/10 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => goToStep(reviewIndex)}
                className="w-full py-3 rounded-lg bg-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Finish &amp; Get Complete PDF
              </button>
              <button
                type="button"
                onClick={() => downloadPdf("blank")}
                disabled={pdfDownloading !== null}
                className="w-full py-2.5 rounded-lg bg-[#fbfbf9] border border-[#111]/15 hover:border-[#D4AF37] text-[#111] text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <FileText className="w-3.5 h-3.5 text-[#9A7D3A]" />
                {pdfDownloading === "blank" ? "Preparing Blank PDF..." : "Print Blank Guide (PDF)"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

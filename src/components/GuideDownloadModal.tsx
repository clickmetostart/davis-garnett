"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Download, CheckCircle2, BookOpen, ShieldCheck } from "lucide-react";
import type { PdfWorkbookState } from "@/lib/pdfBuilder";

interface GuideDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  slug: string;
  contentType?: "guide" | "question" | "area" | "tour" | "article" | "standalone";
  quickAnswer?: string;
  keyTakeaways?: string[];
  sections?: { heading: string; body: string; bullets?: string[] }[];
  authorName?: string;
  workbookState?: PdfWorkbookState;
}

const INTEREST_OPTIONS = [
  "Buying a Tampa Bay Home",
  "Selling a Home or Property",
  "55+ Active-Adult Communities",
  "Commercial / Shopping Corridor",
  "Land & Acreage (Central Florida)",
  "Relocating to Tampa Bay",
];

export default function GuideDownloadModal({
  isOpen,
  onClose,
  title,
  category,
  slug,
  contentType = "guide",
  quickAnswer,
  keyTakeaways = [],
  sections = [],
  authorName = "Mark Davis & Rachael Garnett",
  workbookState,
}: GuideDownloadModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(
    contentType === "tour" && category.toLowerCase().includes("commercial")
      ? "Commercial / Shopping Corridor"
      : INTEREST_OPTIONS[0]
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pdfDownloading, setPdfDownloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const triggerPdfDownload = async () => {
    setPdfDownloading(true);
    try {
      const mergedWorkbook: PdfWorkbookState = {
        ...workbookState,
        preparedForName: fullName.trim() || workbookState?.preparedForName || undefined,
      };

      const res = await fetch("/api/guides/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          type: contentType,
          workbook: mergedWorkbook,
          customPayload: {
            title,
            category,
            quickAnswer,
            keyTakeaways,
            sections,
            authorLine: authorName,
          },
        }),
      });

      if (!res.ok) throw new Error("PDF generation error");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}-workbook.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setErrorMsg("We logged your request, but could not start the PDF download. Please try again.");
    } finally {
      setPdfDownloading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || "Reader";
    const lastName = parts.slice(1).join(" ");

    try {
      const cat =
        interest.includes("Commercial")
          ? "commercial"
          : interest.includes("Land")
          ? "land"
          : interest.includes("55+")
          ? "developments"
          : "consultation";

      const notesCount = Object.values(workbookState?.notesByKey || {}).filter((v) => v.trim()).length;
      const summaryNote =
        notesCount > 0
          ? `Downloaded branded PDF workbook for "${title}" with ${notesCount} custom note section(s).`
          : `Downloaded branded PDF workbook for "${title}".`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone.trim() || "Not provided",
          category: cat,
          subject: `Workbook PDF: ${title}`,
          interest: `${interest} — ${title}`,
          labels: ["Workbook PDF", interest],
          message: summaryNote,
          source: `Branded PDF Gate (${slug})`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit contact info");
      setSubmitted(true);
      await triggerPdfDownload();
    } catch {
      setErrorMsg("Could not finish right now. Please check your name and email.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white text-[#111] rounded-2xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#111] text-white px-7 py-6 border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.22em] mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Free Branded PDF Workbook
          </div>
          <h3 className="font-aiveritas text-2xl sm:text-3xl leading-snug pr-8">{title}</h3>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 text-[#9A7D3A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-aiveritas text-2xl text-[#111] mb-2">Your Branded PDF Is Ready</h4>
                <p className="text-sm text-[#111]/75 font-light max-w-md mx-auto leading-relaxed">
                  We saved your request for <strong>{fullName}</strong> and started downloading your personalized Davis &amp; Garnett workbook.
                </p>
              </div>

              {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  disabled={pdfDownloading}
                  onClick={triggerPdfDownload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {pdfDownloading ? "Building PDF..." : "Download PDF Again"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 bg-[#f5f3ef] text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#e7e2d9] transition-colors"
                >
                  Back to Page
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#111]/75 font-light leading-relaxed">
                Enter your name, email, and goal below to download your clean Davis &amp; Garnett PDF workbook—with your saved online notes included.
              </p>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="First & Last Name"
                  className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(813) 555-0199"
                    className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                  What Are You Interested In? *
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                >
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

              <button
                type="submit"
                disabled={submitting || pdfDownloading}
                className="w-full py-4 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {submitting || pdfDownloading
                  ? "Building Your Branded PDF..."
                  : "Download Branded Workbook (PDF)"}
              </button>

              <p className="text-[11px] text-center text-[#111]/60 leading-relaxed">
                By downloading, you agree to our{" "}
                <Link href="/privacy-policy" className="underline text-[#9A7D3A]" target="_blank">
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#111]/55">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9A7D3A]" />
                <span>Original Davis &amp; Garnett Advisory Workbook • Created Nov 2026</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

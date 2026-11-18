"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Phone, Sparkles } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

interface PillarHubActionsProps {
  track: "residential" | "commercial";
  getStartedHref: string;
  getStartedLabel: string;
  secondaryHeroHref: string;
  secondaryHeroLabel: string;
  variant?: "hero" | "closing";
}

export default function PillarHubActions({
  track,
  getStartedHref,
  getStartedLabel,
  secondaryHeroHref,
  secondaryHeroLabel,
  variant = "hero",
}: PillarHubActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const isCommercial = track === "commercial";

  const handleBlankPdf = async () => {
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/guides/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "discovery-questionnaire",
          track,
          mode: "blank",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `davis-garnett-${track}-getting-started-guide-blank.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (variant === "closing") {
    return (
      <>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={getStartedHref}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-lg bg-[#D4AF37] text-[#111111] hover:bg-white text-xs font-bold uppercase tracking-[0.18em] transition-colors shadow-lg"
          >
            <Sparkles className="w-4 h-4" /> {getStartedLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={handleBlankPdf}
            disabled={downloadingPdf}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-lg bg-white/10 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {downloadingPdf ? "Preparing Guide PDF..." : "Download Guide & Worksheet (PDF)"}
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Call or Message Us
          </button>
        </div>

        <ConsultationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultInterest={
            isCommercial
              ? "Commercial & Land Advisory"
              : "Residential Home & Waterfront Advisory"
          }
          defaultAdvisor={
            isCommercial
              ? "Mark Davis & Rachael Garnett"
              : "Rachael Garnett & Mark Davis"
          }
          title={
            isCommercial
              ? "Schedule a Commercial & Land Conversation"
              : "Schedule a Residential Home Conversation"
          }
        />
      </>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap items-center gap-3.5">
        <Link
          href={getStartedHref}
          className="inline-flex items-center gap-2.5 px-7 py-4 rounded-lg bg-[#D4AF37] text-[#111111] hover:bg-white text-xs font-bold uppercase tracking-[0.18em] transition-colors shadow-lg"
        >
          {getStartedLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href={secondaryHeroHref}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-lg border border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-bold uppercase tracking-[0.18em] transition-colors"
        >
          {secondaryHeroLabel}
        </Link>
      </div>

      <button
        type="button"
        onClick={handleBlankPdf}
        disabled={downloadingPdf}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 hover:text-[#D4AF37] transition-colors cursor-pointer disabled:opacity-60"
      >
        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
        {downloadingPdf
          ? "Preparing Printable Guide (PDF)..."
          : "Prefer paper? Download Printable Getting Started Guide (PDF)"}
      </button>
    </div>
  );
}

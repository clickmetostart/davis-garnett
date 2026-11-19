"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Download, Phone, Sparkles } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import { smoothScrollToId } from "@/lib/smoothScroll";

interface PillarHubActionsProps {
  track: "residential" | "commercial";
  getStartedHref: string;
  getStartedLabel: string;
  secondaryHeroHref: string;
  secondaryHeroLabel: string;
  variant?: "hero" | "closing";
  surface?: "dark" | "light";
  align?: "left" | "center";
}

export default function PillarHubActions({
  track,
  getStartedHref,
  getStartedLabel,
  secondaryHeroHref,
  secondaryHeroLabel,
  variant = "hero",
  surface = "dark",
  align = "left",
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

  const isLightSurface = surface === "light";
  const isCentered = align === "center";

  return (
    <div className={`flex flex-col ${isCentered ? "items-center" : "items-start"} gap-4`}>
      <div className={`flex flex-wrap items-center ${isCentered ? "justify-center" : "justify-start"} gap-3.5`}>
        <button
          type="button"
          onClick={() => smoothScrollToId("hub-sections")}
          className={`inline-flex items-center gap-2.5 px-7 py-4 rounded-lg text-xs font-bold uppercase tracking-[0.18em] transition-colors shadow-lg cursor-pointer ${
            isLightSurface
              ? "bg-[#111111] text-white hover:bg-[#C8A951] hover:text-[#111111]"
              : "bg-[#D4AF37] text-[#111111] hover:bg-white"
          }`}
        >
          <Compass className="w-4 h-4 shrink-0" />
          {isCommercial ? "Explore Commercial" : "Explore Residential"}
        </button>

        <button
          type="button"
          onClick={() => smoothScrollToId("closing-cta")}
          className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg border text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer ${
            isLightSurface
              ? "border-[#111111]/25 bg-white text-[#111111] hover:border-[#9A7D3A] hover:text-[#9A7D3A]"
              : "border-white/25 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
          }`}
        >
          <Phone className={`w-4 h-4 shrink-0 ${isLightSurface ? "text-[#9A7D3A]" : "text-[#D4AF37]"}`} />
          Talk With Mark &amp; Rachael
        </button>
      </div>

      <button
        type="button"
        onClick={handleBlankPdf}
        disabled={downloadingPdf}
        className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60 ${
          isLightSurface
            ? "text-[#111111]/75 hover:text-[#9A7D3A]"
            : "text-white/75 hover:text-[#D4AF37]"
        }`}
      >
        <Download className={`w-3.5 h-3.5 ${isLightSurface ? "text-[#9A7D3A]" : "text-[#D4AF37]"}`} />
        {downloadingPdf
          ? "Preparing Printable Guide (PDF)..."
          : "Prefer paper? Download Printable Getting Started Guide (PDF)"}
      </button>
    </div>
  );
}

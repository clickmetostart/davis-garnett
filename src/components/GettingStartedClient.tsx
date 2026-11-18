"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Download, Phone } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import DiscoveryFlashcardDeck from "@/components/DiscoveryFlashcardDeck";
import ConsultationModal from "@/components/ConsultationModal";
import type { DiscoveryDeckConfig } from "@/data/discoveryDecks";
import type { PillarHubConfig } from "@/data/pillarHubs";

interface GettingStartedClientProps {
  hub: PillarHubConfig;
  deck: DiscoveryDeckConfig;
}

export default function GettingStartedClient({ hub, deck }: GettingStartedClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadingBlank, setDownloadingBlank] = useState(false);

  const isCommercial = hub.track === "commercial";

  const handleBlankPdfDownload = async () => {
    setDownloadingBlank(true);
    try {
      const res = await fetch("/api/guides/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "discovery-questionnaire",
          track: deck.track,
          mode: "blank",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `davis-garnett-${deck.track}-getting-started-guide-blank.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setDownloadingBlank(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── COMPACT MOBILE-FRIENDLY HEADER (puts questions right above the fold) ── */}
      <section className="relative pt-28 pb-12 px-5 sm:px-8 bg-[#111111] text-white border-b border-[#D4AF37]/25 overflow-hidden">
        <FaviconHeroBackground variant="dark" />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-3"
          >
            <Link href="/" className="hover:text-[#D4AF37]">
              Home
            </Link>
            <span>/</span>
            <Link href={deck.hubHref} className="hover:text-[#D4AF37]">
              {deck.hubLabel}
            </Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Get Started</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.26em] font-bold block mb-2">
                {deck.badge}
              </span>
              <h1 className="font-aiveritas text-3xl sm:text-5xl text-white leading-tight mb-3">
                {isCommercial ? (
                  <>
                    Getting Started: <span className="text-[#D4AF37]">Commercial &amp; Land</span>
                  </>
                ) : (
                  <>
                    Getting Started: <span className="text-[#D4AF37]">Homes &amp; Condos</span>
                  </>
                )}
              </h1>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {deck.intro}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleBlankPdfDownload}
                disabled={downloadingBlank}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#D4AF37] hover:text-[#111] transition-colors rounded-lg cursor-pointer disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                {downloadingBlank ? "Preparing PDF..." : "Download Blank Guide (PDF)"}
              </button>

              <Link
                href={deck.hubHref}
                className="inline-flex items-center gap-1.5 px-4 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.15em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors rounded-lg"
              >
                <Compass className="w-4 h-4" /> {deck.hubLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP GETTING STARTED WORKSHEET ── */}
      <section className="py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-screen-xl mx-auto">
          <DiscoveryFlashcardDeck deck={deck} />
        </div>
      </section>

      {/* ── INCLUDED 5-STEP PROCESS (CALM COMPACT SUMMARY) ── */}
      <section className="py-16 px-5 sm:px-8 bg-white border-t border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl mb-8">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Also Inside Your Printable Guide PDF
            </span>
            <h2 className="font-aiveritas text-2xl sm:text-4xl text-[#111] mb-2">
              {hub.processTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#111]/70 font-light">
              Whether you finish online now or print the worksheet for our coffee meeting, here is the 5-step process we follow together.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {hub.steps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-xl bg-[#fbfbf9] border border-[#111]/10 flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="font-aiveritas text-2xl text-[#C8A951] block mb-1">
                    {s.step}
                  </span>
                  <h3 className="font-aiveritas text-lg text-[#111] mb-1.5 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#111]/70 font-light leading-relaxed">
                    {s.body}
                  </p>
                </div>
                <Link
                  href={s.href}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#9A7D3A] hover:underline inline-flex items-center gap-1"
                >
                  {s.linkLabel} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMPLE IN-PERSON / CALL CTA ── */}
      <section className="py-16 px-5 sm:px-8 bg-[#111111] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-aiveritas text-2xl sm:text-4xl text-white mb-3">
            Rather Talk It Through Together?
          </h2>
          <p className="text-sm sm:text-base text-white/75 font-light mb-7">
            Call Rachael or Mark directly—or schedule a coffee chat at our Carrollwood office and we will bring printed copies with us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#D4AF37] text-[#111111] font-bold text-xs uppercase tracking-[0.18em] rounded-lg hover:bg-white transition-colors cursor-pointer"
            >
              Schedule a Conversation
            </button>
            <a
              href={isCommercial ? "tel:941-737-4127" : "tel:727-808-3344"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.18em] rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              {isCommercial ? "Mark: 941-737-4127" : "Rachael: 727-808-3344"}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest={isCommercial ? "Commercial & Land Strategy" : "Residential Buyer & Seller Consultation"}
        defaultAdvisor={deck.leadAdvisor}
        title={isCommercial ? "Schedule a Commercial & Land Conversation" : "Schedule a Residential Home Conversation"}
      />
    </div>
  );
}

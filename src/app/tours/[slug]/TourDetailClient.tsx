"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  Compass,
  Clock,
  Download,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Square,
  Star,
  BookOpen,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ConsultationModal from "@/components/ConsultationModal";
import GuideDownloadModal from "@/components/GuideDownloadModal";
import { loadWorkbookFromStorage } from "@/components/InteractiveWorkbook";
import type { PdfWorkbookState } from "@/lib/pdfBuilder";
import {
  buildGoogleMapsStopUrl,
  type GuidedTour,
} from "@/data/tours";
import type { AreaItem, KnowledgeItem } from "@/data/knowledgeHub";

interface Props {
  tour: GuidedTour;
  mapsRouteUrl: string;
  relatedAreas: AreaItem[];
  relatedGuides: KnowledgeItem[];
  siblingTours: GuidedTour[];
}

export default function TourDetailClient({
  tour,
  mapsRouteUrl,
  relatedAreas,
  relatedGuides,
  siblingTours,
}: Props) {
  const [consultOpen, setConsultOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [favoriteKeys, setFavoriteKeys] = useState<string[]>([]);
  const [notesByKey, setNotesByKey] = useState<Record<string, string>>({});
  const [generalNotes, setGeneralNotes] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadWorkbookFromStorage(tour.slug);
    setCheckedItems(saved.checkedItems || []);
    setFavoriteKeys(saved.favoriteKeys || []);
    setNotesByKey(saved.notesByKey || {});
    setGeneralNotes(saved.generalNotes || "");
    setHydrated(true);
  }, [tour.slug]);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    const state: PdfWorkbookState = {
      checkedItems,
      favoriteKeys,
      notesByKey,
      generalNotes,
    };
    try {
      window.localStorage.setItem(`dg_workbook_${tour.slug}`, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [checkedItems, favoriteKeys, notesByKey, generalNotes, hydrated, tour.slug]);

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

  const updateNote = (key: string, val: string) => {
    setNotesByKey((prev) => ({ ...prev, [key]: val }));
  };

  const workbookState: PdfWorkbookState = {
    checkedItems,
    favoriteKeys,
    notesByKey,
    generalNotes,
  };

  const visitedStopsCount = tour.stops.filter((_, idx) =>
    checkedItems.includes(`sec-${idx}`)
  ).length;

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111] font-sans selection:bg-[#D4AF37] selection:text-[#111]">
      <ProposalNav />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5"
          >
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/tours" className="hover:text-[#D4AF37]">Guided Tours</Link>
            <span>/</span>
            <span className="text-[#D4AF37] truncate max-w-xs sm:max-w-md">{tour.title}</span>
          </nav>

          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Guided Tours
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-white/80 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#111] font-bold rounded-sm">
              {tour.badge}
            </span>
            <span className="px-3 py-1 bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] font-bold rounded-sm">
              #TourWithDG
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {tour.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {tour.distanceSummary}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl sm:text-5xl lg:text-6xl text-white max-w-4xl mb-4 leading-tight">
            {tour.title}
          </h1>
          <p className="text-white/85 text-base md:text-xl font-light max-w-3xl leading-relaxed mb-8">
            {tour.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mapsRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-lg"
            >
              <Navigation className="w-4 h-4" /> Start Full Route in Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setDownloadOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              <Download className="w-4 h-4 text-[#D4AF37]" /> Download Workbook (PDF)
            </button>

            <button
              type="button"
              onClick={() => setConsultOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#ef5728] hover:bg-[#d94b1e] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              <Sparkles className="w-4 h-4" /> Ride Along With Us
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN ROUTE BODY ── */}
      <section className="py-16 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.85fr_1fr] gap-12 items-start">
        <div className="space-y-10">
          {/* Host Welcome Strip */}
          <div className="rounded-2xl bg-white border border-[#D4AF37]/45 p-6 md:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                  alt="Mark Davis"
                  className="w-12 h-12 rounded-full object-cover object-top border-2 border-[#D4AF37]"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                  alt="Rachael Garnett"
                  className="w-12 h-12 rounded-full object-cover object-[center_30%] border-2 border-[#D4AF37]"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block">
                  {tour.host.role} • #TourWithDG
                </span>
                <h2 className="font-aiveritas text-xl text-[#111]">
                  {tour.host.name} &amp; {tour.host.coHostName} Are Leading Your Tour
                </h2>
                <p className="text-xs text-[#111]/70 mt-0.5">{tour.host.inviteNote}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:941-737-4127"
                className="px-3.5 py-2.5 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/25 text-xs font-bold text-[#111] inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#9A7D3A]" /> Mark
              </a>
              <a
                href="tel:727-808-3344"
                className="px-3.5 py-2.5 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/25 text-xs font-bold text-[#111] inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#9A7D3A]" /> Rachael
              </a>
            </div>
          </div>

          {/* Quick Answer + Route Order Box */}
          <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              <Compass className="w-4 h-4" /> Route At A Glance
            </div>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
              {tour.quickAnswer}
            </p>
            <div className="pt-4 border-t border-white/15 grid sm:grid-cols-2 gap-3 text-xs text-white/80">
              <div>
                <span className="text-[#D4AF37] uppercase tracking-wider font-bold block text-[10px]">
                  Start Point
                </span>
                <span>{tour.startAddress}</span>
              </div>
              <div>
                <span className="text-[#D4AF37] uppercase tracking-wider font-bold block text-[10px]">
                  Drive Progression
                </span>
                <span>{tour.routeDirectionNote}</span>
              </div>
            </div>
          </div>

          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#111]/10 pb-4">
            <div>
              <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
                Stop-by-Stop Driving Guide &amp; Notes
              </h2>
              <p className="text-sm text-[#111]/65 font-light">
                Follow stops 1 through {tour.stops.length} in road order. Your checkmarks and typed notes save here automatically and print inside your PDF.
              </p>
            </div>
            <span className="px-3.5 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs font-bold text-[#111] shrink-0">
              {visitedStopsCount}/{tour.stops.length} Stops Visited
            </span>
          </div>

          {/* Sequential Stop Cards + Inline Workbook Controls */}
          <div className="space-y-8">
            {tour.stops.map((stop, idx) => {
              const secKey = `sec-${idx}`;
              const isChecked = checkedItems.includes(secKey);
              const isFav = favoriteKeys.includes(secKey);
              const noteVal = notesByKey[secKey] || "";
              const stopMapsUrl = buildGoogleMapsStopUrl(stop.googleMapsQuery);

              return (
                <article
                  key={stop.order}
                  className={`rounded-2xl border p-6 md:p-8 transition-all ${
                    isChecked
                      ? "bg-white border-[#D4AF37] shadow-md"
                      : "bg-white border-[#111]/12 shadow-sm"
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="px-3 py-1 rounded-md bg-[#111] text-[#D4AF37] uppercase tracking-widest text-[10px]">
                        Stop {stop.order} of {tour.stops.length}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-[#f5f3ef] text-[#9A7D3A] text-[11px]">
                        {stop.driveFromPrev}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#f5f3ef] text-[#111]/70 text-[11px]">
                        Explore: {stop.stopDuration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(secKey)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          isFav
                            ? "bg-[#D4AF37] text-[#111]"
                            : "bg-[#f5f3ef] text-[#111]/65 hover:text-[#111]"
                        }`}
                      >
                        <Star className={`w-3 h-3 ${isFav ? "fill-current" : ""}`} />
                        {isFav ? "Top Pick" : "Star"}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleChecked(secKey)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/20 text-[10px] font-bold uppercase tracking-wider text-[#111]"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#9A7D3A]" />
                        ) : (
                          <Square className="w-4 h-4 text-[#111]/45" />
                        )}
                        {isChecked ? "Visited" : "Mark Visited"}
                      </button>
                    </div>
                  </div>

                  <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-1.5">
                    {stop.name}
                  </h3>
                  <p className="text-xs text-[#111]/60 flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9A7D3A]" /> {stop.address}
                    </span>
                    <a
                      href={stopMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#9A7D3A] font-bold underline underline-offset-4 hover:text-[#111]"
                    >
                      Open Stop in Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>

                  {/* Insider Commentary + Location Snippet */}
                  <div className="space-y-3 mb-5">
                    <div className="p-4 rounded-xl bg-[#f5f3ef] border-l-4 border-[#D4AF37]">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7D3A] block mb-1">
                        What Mark &amp; Rachael Say Here
                      </span>
                      <p className="text-sm md:text-base text-[#111]/85 leading-relaxed">
                        {stop.hostNote}
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-[#111]/75 font-light leading-relaxed">
                      {stop.snippet}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3.5 rounded-xl bg-[#fbfbf9] border border-[#111]/10">
                        <span className="font-bold uppercase tracking-wider text-[#9A7D3A] block mb-1 text-[10px]">
                          Cost / Zoning Note
                        </span>
                        <p className="text-[#111]/80 leading-relaxed">{stop.zoningOrCostNote}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#fbfbf9] border border-[#111]/10">
                        <span className="font-bold uppercase tracking-wider text-[#9A7D3A] block mb-1 text-[10px]">
                          Schools &amp; Landmarks
                        </span>
                        <p className="text-[#111]/80 leading-relaxed">{stop.landmarksAndSchools}</p>
                      </div>
                    </div>

                    {stop.relatedListingSlug && (
                      <div className="pt-1">
                        <Link
                          href={`/listings/${stop.relatedListingSlug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111]"
                        >
                          See Featured Property at This Stop <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Interactive Note Field per Stop */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/60 mb-1.5">
                      My Notes on Stop {stop.order} (Auto-Saved &amp; Prints Inside PDF)
                    </label>
                    <textarea
                      rows={2}
                      value={noteVal}
                      onChange={(e) => updateNote(secKey, e.target.value)}
                      placeholder={`Write your impressions of ${stop.corridorSegment} (traffic, lot feel, favorite plaza, or questions for Mark & Rachael)...`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f3ef]/60 border border-[#111]/12 text-sm text-[#111] placeholder:text-[#111]/40 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Checklist Prompts & General Summary Workbook Box */}
          <div className="rounded-2xl bg-white border border-[#D4AF37]/45 p-6 md:p-8 space-y-5 shadow-sm">
            <h3 className="font-aiveritas text-2xl text-[#111]">
              End-of-Tour Checklist &amp; Summary Notes
            </h3>
            <div className="space-y-2.5">
              {tour.checklistPrompts.map((prompt) => {
                const isChecked = checkedItems.includes(prompt);
                return (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => toggleChecked(prompt)}
                    className="w-full flex items-start gap-2.5 text-left p-2.5 rounded-lg hover:bg-[#f5f3ef] transition-colors"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#111]/35 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-[#111]/85">{prompt}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] mb-1.5">
                Overall Tour Favorite &amp; Next Step Notes
              </label>
              <textarea
                rows={3}
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                placeholder="Which stop stood out most? Write your top choices before saving your PDF..."
                className="w-full px-4 py-3 rounded-xl bg-[#fbfbf9] border border-[#111]/15 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#111]/10">
              <button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" /> Save Notes &amp; Download Tour PDF
              </button>
              <button
                type="button"
                onClick={() => setConsultOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#f5f3ef] hover:bg-[#D4AF37]/25 text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
              >
                Ask Mark &amp; Rachael to Lead Live <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-4">
            <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-6">
              Tour Questions &amp; Planning Notes
            </h2>
            <div className="space-y-4">
              {tour.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-[#111]/10 p-6"
                >
                  <h3 className="font-aiveritas text-xl text-[#111] mb-2">{faq.question}</h3>
                  <p className="text-sm text-[#111]/75 font-light leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── STICKY SIDEBAR ── */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#111] text-white rounded-2xl p-6 border border-[#D4AF37]/40 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#D4AF37] block">
              Take This Tour Offline
            </span>
            <h3 className="font-aiveritas text-2xl text-white">
              Download Branded Tour Workbook
            </h3>
            <p className="text-xs text-white/75 font-light leading-relaxed">
              Every stop address, drive time, Mark &amp; Rachael insight, and your saved online notes exported neatly to a branded Davis &amp; Garnett PDF.
            </p>
            <button
              type="button"
              onClick={() => setDownloadOpen(true)}
              className="w-full py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Tour PDF
            </button>
            <a
              href={mapsRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" /> Open Full Google Maps Route
            </a>
          </div>

          {relatedAreas.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#111]/10 p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9A7D3A]" /> Matching Area Guides
              </h4>
              <div className="space-y-2.5">
                {relatedAreas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/knowledge-hub/areas/${area.slug}`}
                    className="block p-3 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/20 transition-colors text-xs font-bold text-[#111]"
                  >
                    {area.name} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedGuides.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#111]/10 p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9A7D3A]" /> Companion Guides
              </h4>
              <div className="space-y-2.5">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/knowledge-hub/${g.slug}`}
                    className="block p-3 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/20 transition-colors text-xs font-bold text-[#111]"
                  >
                    {g.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {siblingTours.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#111]/10 p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-3">
                More Davis &amp; Garnett Tours
              </h4>
              <div className="space-y-2.5">
                {siblingTours.map((st) => (
                  <Link
                    key={st.slug}
                    href={`/tours/${st.slug}`}
                    className="block p-3 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/20 transition-colors text-xs font-bold text-[#111]"
                  >
                    {st.title} ({st.duration}) →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>

      <GuideDownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        title={tour.title}
        category={tour.badge}
        slug={tour.slug}
        contentType="tour"
        quickAnswer={tour.quickAnswer}
        keyTakeaways={tour.checklistPrompts}
        sections={tour.stops.map((s) => ({
          heading: s.name,
          body: `${s.hostNote} ${s.snippet}`,
          bullets: [s.zoningOrCostNote, s.landmarksAndSchools],
        }))}
        authorName={`${tour.host.name} & ${tour.host.coHostName}`}
        workbookState={workbookState}
      />

      <ConsultationModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
        defaultInterest={`Live Guided Tour: ${tour.title}`}
        defaultAdvisor={`${tour.host.name} & ${tour.host.coHostName}`}
        title={`Ask Mark & Rachael to Lead: ${tour.shortTitle}`}
      />

      <SiteFooter />
    </div>
  );
}


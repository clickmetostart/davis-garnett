"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Clock,
  MapPin,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { LIVE_GUIDED_TOURS, buildGoogleMapsRouteUrl } from "@/data/tours";
import PdfAvailableBadge from "@/components/PdfAvailableBadge";
import { scrollCardTrack } from "@/lib/smoothScroll";

interface TourSliderSectionProps {
  id?: string;
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  bgClass?: string;
}

export default function TourSliderSection({
  id = "tours",
  sectionEyebrow = "#GuidedByDG • Curated Day & Neighborhood Itineraries by D&G",
  sectionTitle = "Guided Neighborhood & Commercial Tours",
  sectionSubtitle = "Plan your morning or afternoon with Mark Davis & Rachael Garnett: drive residential neighborhoods and Intracoastal pockets, scout commercial and retail corridors, tour new developments, and map coffee and dining stops.",
  bgClass = "bg-white",
}: TourSliderSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: "left" | "right") => {
    scrollCardTrack(sliderRef.current, dir);
  };

  return (
    <section id={id} className={`py-20 md:py-24 px-5 sm:px-8 border-b border-[#111]/10 scroll-mt-24 ${bgClass}`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              {sectionEyebrow}
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
              {sectionTitle}
            </h2>
            <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              View All Guided Tours <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] transition-all"
                aria-label="Scroll Tours Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider("right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] transition-all"
                aria-label="Scroll Tours Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Tour Cards (All cards remain rendered in DOM) */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {LIVE_GUIDED_TOURS.map((tour) => {
            const routeUrl = buildGoogleMapsRouteUrl(tour.stops);
            return (
              <div
                key={tour.slug}
                className="group w-full sm:w-[340px] md:w-[385px] snap-start snap-always shrink-0 bg-[#fbfbf9] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl"
              >
                <div>
                  <Link href={`/tours/${tour.slug}`} className="block">
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-[#111]">
                      <Image
                        src={tour.heroImage}
                        alt={tour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3.5 left-4 right-4 flex flex-col items-start gap-2 pointer-events-none">
                        <span
                          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm leading-snug ${
                            tour.track === "commercial"
                              ? "bg-[#1E3A5F] text-white"
                              : "bg-[#D4AF37] text-[#111]"
                          }`}
                        >
                          {tour.badge}
                        </span>
                        <PdfAvailableBadge />
                      </div>
                      <span className="absolute bottom-3 left-4 text-[11px] font-bold text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {tour.duration}
                      </span>
                      <span className="absolute bottom-3 right-4 text-[11px] text-white/90 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {tour.county}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#9A7D3A] mb-2">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Hosted by {tour.host.name} &amp; {tour.host.coHostName}</span>
                    </div>

                    <Link href={`/tours/${tour.slug}`}>
                      <h3 className="font-aiveritas text-xl xl:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-2.5 leading-snug line-clamp-2 min-h-[3.25rem]">
                        {tour.title}
                      </h3>
                    </Link>

                    <p className="text-sm text-[#111]/75 font-light leading-relaxed line-clamp-3 mb-4">
                      {tour.tagline}
                    </p>

                    <div className="text-[11px] text-[#111]/65 bg-white border border-[#111]/8 rounded-lg px-3 py-2">
                      <strong className="text-[#111]">Route:</strong> {tour.stops.map((s) => `Stop ${s.order}`).join(" → ")} ({tour.distanceSummary})
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-4 border-t border-[#111]/8 flex items-center justify-between gap-2">
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#111] group-hover:text-[#9A7D3A]"
                  >
                    Open Tour Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={routeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/25 text-[10px] font-bold uppercase tracking-wider text-[#111] transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-[#9A7D3A]" /> Maps
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


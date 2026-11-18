"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Compass,
  Clock,
  MapPin,
  Navigation,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import ConsultationModal from "@/components/ConsultationModal";
import PdfAvailableBadge from "@/components/PdfAvailableBadge";
import { LIVE_GUIDED_TOURS, buildGoogleMapsRouteUrl } from "@/data/tours";

export default function ToursIndexClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<"all" | "residential" | "commercial">("all");
  const [countyFilter, setCountyFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);

  const q = searchQuery.trim().toLowerCase();
  const filteredTours = LIVE_GUIDED_TOURS.filter((tour) => {
    if (trackFilter !== "all" && tour.track !== trackFilter) return false;
    if (countyFilter !== "all" && !tour.countyTags.includes(countyFilter as any)) return false;
    if (!q) return true;
    const hay = [
      tour.title,
      tour.tagline,
      tour.county,
      tour.summary,
      ...tour.stops.map((s) => `${s.name} ${s.corridorSegment} ${s.landmarksAndSchools}`),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans selection:bg-[#D4AF37] selection:text-[#111]">
      <ProposalNav />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <FaviconHeroBackground variant="dark" />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-6">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub" className="hover:text-[#D4AF37]">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Area &amp; Shopping Tours</span>
          </div>

          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.28em] mb-4">
                <Compass className="w-4 h-4" /> #GuidedByDG • Tour Tampa Bay With Davis &amp; Garnett
              </span>
              <h1 className="font-aiveritas text-4xl sm:text-6xl text-white mb-5 leading-tight">
                Best of Tampa Bay: Neighborhoods, Developments, Eats &amp; Parks
              </h1>
              <p className="text-white/80 text-base md:text-xl font-light max-w-2xl leading-relaxed mb-8">
                Plan your morning, afternoon, or full-day drive in true street order—morning coffee spots, hidden Intracoastal and golf pockets, big new developments and condos, zoos, shopping, lunch breaks, smoothies, and iconic sunset spots.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Sparkles className="w-4 h-4" /> Ride Along With Mark &amp; Rachael
                </button>
                <a
                  href="tel:941-737-4127"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" /> Mark: 941-737-4127
                </a>
              </div>
            </div>

            {/* Tour Host Card */}
            <div className="bg-white/8 backdrop-blur-md border border-[#D4AF37]/35 rounded-2xl p-6 space-y-4">
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
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] block">
                    Do It Self-Guided or With Us
                  </span>
                  <h2 className="font-aiveritas text-xl text-white">
                    Mark Davis &amp; Rachael Garnett
                  </h2>
                  <p className="text-xs text-white/70">
                    FL Lic BK3209459 &amp; SL3378601 • Align Right Realty Carrollwood
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                Every tour runs strictly point-to-point with zero zig-zagging. Pick your track below, check stops off on your phone, and save your printable PDF Tour Guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH & FILTER BAR ── */}
      <section className="py-8 px-6 md:px-8 bg-white border-b border-[#111]/10 sticky top-16 z-30 shadow-xs">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-[#9A7D3A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search neighborhood, city, shopping plaza, school, or highway..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f5f3ef] border border-[#111]/12 text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "all", label: "All Destinations" },
                { key: "residential", label: "Neighborhoods, Parks & Beaches" },
                { key: "commercial", label: "Malls, Trends & Attractions" },
              ] as const
            ).map((btn) => (
              <button
                key={btn.key}
                type="button"
                onClick={() => setTrackFilter(btn.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  trackFilter === btn.key
                    ? "bg-[#111] text-[#D4AF37]"
                    : "bg-[#f5f3ef] text-[#111]/75 hover:bg-[#e7e2d8]"
                }`}
              >
                {btn.label}
              </button>
            ))}

            <select
              value={countyFilter}
              onChange={(e) => setCountyFilter(e.target.value)}
              aria-label="Filter tours by county"
              className="px-3.5 py-2 rounded-lg bg-[#f5f3ef] border border-[#111]/10 text-xs font-bold uppercase tracking-wider text-[#111] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Counties</option>
              <option value="hillsborough">Hillsborough</option>
              <option value="pinellas">Pinellas</option>
              <option value="pasco">Pasco</option>
              <option value="polk">Polk</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── TOURS GRID ── */}
      <section className="py-16 px-6 md:px-8 max-w-screen-xl mx-auto">
        {filteredTours.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#111]/10">
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">No matching tours found</h2>
            <p className="text-sm text-[#111]/65 mb-6">
              Try clearing your search or switch back to All Counties.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setTrackFilter("all");
                setCountyFilter("all");
              }}
              className="px-6 py-3 rounded-xl bg-[#111] text-[#D4AF37] text-xs font-bold uppercase tracking-widest"
            >
              Reset Tour Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => {
              const mapsUrl = buildGoogleMapsRouteUrl(tour.stops);
              return (
                <article
                  key={tour.slug}
                  className="group bg-white rounded-2xl border border-[#111]/10 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/tours/${tour.slug}`} className="block">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
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

                    <div className="p-7">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A7D3A] mb-2">
                        Hosted by {tour.host.name} &amp; {tour.host.coHostName}
                      </div>
                      <Link href={`/tours/${tour.slug}`}>
                        <h2 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-2.5 leading-snug">
                          {tour.title}
                        </h2>
                      </Link>
                      <p className="text-sm text-[#111]/75 font-light leading-relaxed mb-4">
                        {tour.tagline}
                      </p>

                      <ol className="space-y-1.5 text-xs text-[#111]/80 bg-[#f5f3ef] rounded-xl p-3.5">
                        {tour.stops.map((stop) => (
                          <li key={stop.order} className="truncate">
                            <strong className="text-[#9A7D3A]">{stop.order}.</strong> {stop.corridorSegment}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between gap-3">
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#111] group-hover:text-[#9A7D3A]"
                    >
                      Open Tour Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/25 text-[10px] font-bold uppercase tracking-wider text-[#111] transition-colors shrink-0"
                    >
                      <Navigation className="w-3 h-3 text-[#9A7D3A]" /> Route Map
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest="Book Guided Live Neighborhood or Commercial Tour"
        defaultAdvisor="Mark Davis & Rachael Garnett"
        title="Schedule a Live Guided Tour With Davis & Garnett"
      />

      <SiteFooter />
    </div>
  );
}

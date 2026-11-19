"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { scrollCardTrack } from "@/lib/smoothScroll";

const activeSignatureProperties = [
  {
    id: "1",
    slug: "6100-bahama-shores-dr-s-st-petersburg",
    mlsId: "V4951050",
    type: "Residential · Waterfront Estate",
    badge: "Flagship Active Offering",
    title: "6100 Bahama Shores Dr S",
    subtitle: "\"The Vistara\" — Custom Tampa Bay Waterfront Estate",
    location: "Bahama Shores · St. Petersburg, FL 33705",
    specs: "4 Bed • 4.5 Bath • 4,376 SqFt • 0.51 Acres (~90 ft Waterfront)",
    price: "$4,553,900",
    advisor: "Rachael Garnett & Mark Davis",
    img: "/listings/bahama-shores-1.webp",
    isFlagship: true
  },
  {
    id: "4",
    slug: "770-old-stokes-rd-frostproof",
    mlsId: "TB8506525",
    type: "Land & Commercial Development",
    badge: "Active Exclusive",
    title: "770 Old Stokes Rd",
    subtitle: "Central Florida US-98 / US-27 Development Corridor Tract",
    location: "Frostproof · Polk County, FL 33843",
    specs: "79.54 Acres MOL • US Hwy 98 Frontage • Development / Ag",
    price: "$3,550,000",
    advisor: "Mark Davis & Rachael Garnett",
    img: "/listings/old-stokes-road-cover-image-davis-garnett.jpg",
    isFlagship: false
  },
  {
    id: "2",
    slug: "126-ridgewood-ave-brandon",
    mlsId: "TB8479570",
    type: "Commercial & Mixed-Use",
    badge: "Active Exclusive",
    title: "126 Ridgewood Ave (& 613 E Morgan St)",
    subtitle: "Dual-Building Mixed-Use Asset 1 Block Off Brandon Blvd (Hwy 60)",
    location: "Brandon · Hillsborough County, FL 33510",
    specs: "2 Buildings • 2,872 Total SqFt • 0.39 Acres • Separate Meters",
    price: "$845,000",
    advisor: "Mark Davis & Rachael Garnett",
    img: "/listings/ridgewood-brandon-2.jpg",
    isFlagship: false
  },
  {
    id: "3",
    slug: "ne-90th-street-rd-fort-mccoy",
    mlsId: "TB8520776",
    type: "Land · Agricultural & Timberland",
    badge: "Active Exclusive",
    title: "NE 90th Street Rd",
    subtitle: "Gated Old Florida Timberland Sanctuary Near Ocala National Forest",
    location: "Fort McCoy · Marion County, FL 32134",
    specs: "19.72 Acres (858,823 SqFt) • A-1 Agriculture • No HOA / No CDD",
    price: "$350,000",
    advisor: "Mark Davis & Rachael Garnett",
    img: "/listings/d-g-land-listing-cover.webp",
    isFlagship: false
  }
];

export default function PropertiesStickyStack() {
  const CARD_H = "66svh";
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto relative">
      {/* ── Mobile & Portrait Tablet Fluid Swipe Deck (clean photo + below-image details) ── */}
      <div className="lg:hidden py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-2.5">
              Mark &amp; Rachael · Active Listings
            </span>
            <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111] leading-tight">
              Featured <span className="text-[#9A7D3A]">Listings</span>
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A7D3A]">
              Swipe Listings →
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollCardTrack(mobileTrackRef.current, "left")}
                className="p-2.5 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-sm hover:bg-[#111] hover:text-[#D4AF37] active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll Featured Listings Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCardTrack(mobileTrackRef.current, "right")}
                className="p-2.5 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-sm hover:bg-[#111] hover:text-[#D4AF37] active:scale-95 transition-all cursor-pointer"
                aria-label="Scroll Featured Listings Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={mobileTrackRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {activeSignatureProperties.map((prop, i) => (
            <Link
              key={`mobile-${prop.id}`}
              href={`/listings/${prop.slug}`}
              className="group w-full sm:w-[370px] md:w-[410px] snap-start snap-always shrink-0 bg-white rounded-2xl overflow-hidden border border-[#111111]/10 hover:border-[#C8A951] shadow-md flex flex-col justify-between transition-all"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
                  <Image
                    src={prop.img}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 640px) 92vw, 410px"
                    priority={i === 0}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20 pointer-events-none" />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-[#C8A951] text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                    {prop.badge}
                  </span>
                  <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#C8A951]/40 text-[10px] font-bold uppercase tracking-widest text-[#C8A951]">
                    0{i + 1} / 0{activeSignatureProperties.length}
                  </span>
                  <span className="absolute bottom-3.5 left-4 font-aiveritas text-2xl sm:text-3xl text-white drop-shadow">
                    {prop.price}
                  </span>
                </div>

                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7D3A] mb-1">
                    {prop.type} · MLS# {prop.mlsId}
                  </div>
                  <h3 className="font-aiveritas text-xl sm:text-2xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-1.5 leading-snug">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-[#111111]/65 flex items-center gap-1.5 mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A951] shrink-0" />
                    <span className="truncate">{prop.location}</span>
                  </p>
                  <p className="text-xs text-[#111111]/75 font-light leading-relaxed line-clamp-2">
                    {prop.specs}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#111111]/8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#9A7D3A] group-hover:text-[#111111] transition-colors">
                <span>View Property Details</span>
                <ArrowRight className="w-4 h-4 text-[#C8A951] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

          {/* Closing Portfolio Hub Slide */}
          <div className="w-full sm:w-[370px] md:w-[410px] snap-start snap-always shrink-0 rounded-2xl overflow-hidden shadow-md bg-[#111111] flex flex-col justify-between p-6 border border-[#C8A951]/30">
            <div>
              <span className="text-[#C8A951] text-[10px] uppercase tracking-[0.25em] font-bold block mb-3">
                Local Knowledge &amp; Personal Service
              </span>
              <h3 className="font-aiveritas text-3xl text-white leading-tight mb-3">
                Serving Greater Tampa Bay{" "}
                <span className="text-[#C8A951]">&amp; Central Florida</span>
              </h3>
              <div className="w-10 h-[1px] bg-[#C8A951] mb-4" />
              <p className="text-white/75 font-light text-sm leading-relaxed">
                Representing residential and commercial clients across Pinellas, Hillsborough, Pasco, Polk, and Marion Counties.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-6">
              <Link
                href="/properties"
                className="w-full text-center py-3.5 rounded-xl font-bold tracking-[0.18em] uppercase text-xs bg-[#C8A951] text-[#111111] hover:bg-white transition-colors"
              >
                View All Active &amp; Sold Listings
              </Link>
              <Link
                href="/knowledge-hub"
                className="w-full text-center py-3 rounded-xl font-bold tracking-[0.18em] uppercase text-xs border border-white/20 text-white/90 hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
              >
                Explore Guides &amp; Market Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop & Landscape Sticky Card Stack ── */}
      <div className="hidden lg:flex flex-row gap-6 lg:gap-10">
        {/* ══ COLUMN 1 — Sticky editorial panel (lg+ only so portrait tablets never squeeze into a narrow rail) ══ */}
        <div className="hidden lg:block lg:w-[36%] shrink-0 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center py-8 pr-2 lg:pr-6">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Mark &amp; Rachael · Active Listings
            </span>

            <h2 className="font-aiveritas text-4xl lg:text-5xl xl:text-6xl text-[#111111] leading-tight mb-4">
              Featured<br />Listings
            </h2>

            <div className="w-10 h-[2px] bg-[#C8A951] mb-4" />

            <p className="text-[#111111]/75 font-light leading-relaxed max-w-md mb-6 text-sm lg:text-base xl:text-[17px]">
              Helping buyers, sellers, and business owners across residential homes, commercial properties, land, and waterfront and unique properties in Tampa Bay and Central Florida.
            </p>

            <div className="flex flex-col gap-2.5 mb-6">
              {activeSignatureProperties.map((prop, idx) => (
                <Link
                  key={prop.slug}
                  href={`/listings/${prop.slug}`}
                  className="flex items-center justify-between text-[#111111] text-xs font-bold uppercase tracking-[0.14em] border-b border-[#111111]/15 pb-2.5 hover:text-[#9A7D3A] hover:border-[#C8A951] transition-colors group"
                >
                  <span className="truncate pr-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#9A7D3A]">0{idx + 1}</span>
                    <span className="truncate">{prop.title}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#9A7D3A] shrink-0">
                    {prop.price}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Portfolio Credentials Strip (Matched to Portfolio Hero) */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#111111]/10 pt-5">
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">CRE &amp; RES</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  Dual-Certified Agents
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">Tampa Bay</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  &amp; Central Florida
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">FL Licensed</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  BK3209459 &amp; SL3378601
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">Align Right</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  Carrollwood • BK3401606
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ COLUMN 2 — Scrolling sticky card stack ══ */}
        <div className="w-full lg:w-[64%] py-6 lg:py-12">
          <div className="h-2 lg:hidden" />

          <div className="flex flex-col gap-[10svh] pb-[8svh]">
            {activeSignatureProperties.map((prop, i) => {
              const zIndex = 10 + i;

              return (
                <div
                  key={prop.id}
                  className="sticky rounded-2xl overflow-hidden shadow-xl border border-black/15 min-h-[440px] max-h-[640px]"
                  style={{ top: `calc(13svh + ${i * 10}px)`, height: CARD_H, zIndex }}
                >
                  <Image
                    src={prop.img}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 768px) 92vw, 58vw"
                    priority={i === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                  <div className="absolute top-5 right-5 md:top-7 md:right-7 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C8A951]/40 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A951] z-10">
                    0{i + 1} / 0{activeSignatureProperties.length}
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-9">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-[#C8A951] text-[#111111] text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 rounded-sm">
                        {prop.badge}
                      </span>
                      <span className="bg-white/15 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 rounded-sm">
                        MLS# {prop.mlsId}
                      </span>
                      <span className="text-[#C8A951] text-[10px] uppercase tracking-[0.2em] font-bold">
                        {prop.type}
                      </span>
                    </div>

                    <h3 className="font-aiveritas text-2xl md:text-4xl text-white mb-1.5 leading-snug">
                      {prop.title}
                    </h3>
                    <p className="text-white/85 font-light text-sm md:text-base mb-2.5 max-w-xl leading-relaxed">
                      {prop.subtitle}
                    </p>
                    <p className="text-white/75 text-xs md:text-sm flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A951]" /> {prop.location}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4">
                      <div>
                        <p className="text-white/75 font-medium text-xs md:text-sm tracking-wide mb-1">
                          {prop.specs}
                        </p>
                        <strong className="font-aiveritas text-[#C8A951] text-2xl md:text-3xl font-normal">
                          {prop.price}
                        </strong>
                      </div>

                      <Link
                        href={`/listings/${prop.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A951] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors group"
                      >
                        View Property Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Closing Portfolio Hub Card ── */}
            <div
              className="sticky rounded-2xl overflow-hidden shadow-xl bg-[#111111] flex flex-col items-center justify-center p-7 md:p-10 border border-[#C8A951]/25 min-h-[440px] max-h-[640px]"
              style={{ top: `calc(13svh + ${activeSignatureProperties.length * 10}px)`, height: CARD_H, zIndex: 20 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1810_0%,#0c0b09_70%)]" />
              <div className="relative z-10 flex flex-col items-center w-full max-w-lg gap-4 text-center">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold">
                  Local Knowledge &amp; Personal Service
                </span>
                <h3 className="font-aiveritas text-3xl md:text-5xl text-white leading-tight">
                  Serving Greater Tampa Bay<br />
                  <span className="text-[#C8A951]">&amp; Central Florida</span>
                </h3>
                <div className="w-12 h-[1px] bg-[#C8A951] my-2" />
                <p className="text-white/80 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed max-w-md mb-2">
                  Representing residential and commercial clients across Pinellas, Hillsborough, Pasco, Polk, and Marion Counties.
                </p>

                <div className="flex flex-col w-full gap-3 mt-4">
                  <Link
                    href="/properties"
                    className="w-full text-center py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs bg-[#C8A951] text-[#111111] hover:bg-white transition-colors shadow-lg"
                  >
                    View All Active &amp; Sold Listings
                  </Link>
                  <Link
                    href="/knowledge-hub"
                    className="w-full text-center py-3 rounded-xl font-bold tracking-[0.2em] uppercase text-xs border border-white/20 text-white/90 hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
                  >
                    Explore Neighborhood &amp; Market Guides
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

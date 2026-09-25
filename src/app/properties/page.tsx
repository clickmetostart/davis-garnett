"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, MapPin, Bed, Bath, Maximize, Heart, MessageCircle, ExternalLink } from "lucide-react";
import PropertiesStickyStack from "@/components/PropertiesStickyStack";
import ProposalNav from "@/components/ProposalNav";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const featuredProperty = {
  type: "Residential",
  tag: "Featured Listing",
  title: "Villa Azzurra",
  address: "Davis Islands, Tampa, FL 33606",
  beds: 6, baths: 7, sqft: "12,400",
  price: "$14,200,000",
  pricePerSqft: "$1,145/sqft",
  description: "Set on the most coveted stretch of Davis Islands waterfront, Villa Azzurra is a landmark estate that redefines Gulf Coast luxury. Designed by a celebrated Tampa architect and completed in 2023, this six-bedroom masterpiece offers unobstructed Tampa Bay views from nearly every room.",
  highlights: ["120ft Private Dock", "Infinity Pool & Spa", "Smart Home Automation", "6-Car Motor Court"],
  img: "/res_waterfront_estate_1787632802890.png",
};

const sliderCards = [
  { type: "Residential", title: "Bayshore Modern Estate",      price: "$8,900,000", beds: 5, baths: 6, sqft: "8,500",  img: "/res_modern_mansion_1787632812473.png",    address: "Bayshore Blvd, Tampa" },
  { type: "Commercial",  title: "Tampa Riverwalk Tower",       price: "Lease: $45/SF", beds: 0, baths: 0, sqft: "450,000", img: "/com_office_tower_1787632874122.png",  address: "Downtown Tampa" },
  { type: "Residential", title: "Downtown Penthouse",          price: "$6,500,000", beds: 4, baths: 4, sqft: "5,000",  img: "/res_luxury_condo_1787632822869.png",      address: "Water Street, Tampa" },
  { type: "Commercial",  title: "Channelside Retail Center",   price: "5.2% Cap",   beds: 0, baths: 0, sqft: "98,000", img: "/com_luxury_retail_1787632885082.png",    address: "Channelside, Tampa" },
  { type: "Residential", title: "Hyde Park Historic Estate",   price: "$5,800,000", beds: 7, baths: 7, sqft: "9,100",  img: "/res_historic_estate_1787632833084.png",   address: "Hyde Park, Tampa" },
  { type: "Residential", title: "Clearwater Beach Villa",      price: "$11,500,000",beds: 5, baths: 5, sqft: "6,000",  img: "/res_beachfront_villa_1787632843222.png",  address: "Clearwater Beach, FL" },
  { type: "Land",        title: "Apollo Beach Marina Site",    price: "$22,000,000",beds: 0, baths: 0, sqft: "24ac",   img: "/land_waterfront_plot_1787632916432.png",  address: "Apollo Beach, FL" },
  { type: "Commercial",  title: "St. Pete Industrial Hub",     price: "$18,500,000",beds: 0, baths: 0, sqft: "1.2M",  img: "/com_industrial_park_1787632905437.png",   address: "St. Petersburg, FL" },
];

const gridImages = [
  "/res_waterfront_estate_1787632802890.png",
  "/com_office_tower_1787632874122.png",
  "/res_modern_mansion_1787632812473.png",
  "/com_luxury_retail_1787632885082.png",
  "/res_luxury_condo_1787632822869.png",
  "/land_commercial_development_1787632926636.png",
  "/res_historic_estate_1787632833084.png",
  "/com_multi_family_1787632895059.png",
  "/res_beachfront_villa_1787632843222.png",
  "/res_golf_course_home_1787632854609.png",
  "/land_waterfront_plot_1787632916432.png",
  "/com_industrial_park_1787632905437.png",
];

const allCards = [
  { type: "Residential", title: "Davis Islands Estate",    price: "$14,200,000", beds: 6, baths: 7, sqft: "12,400", img: "/res_waterfront_estate_1787632802890.png",  address: "Davis Islands, Tampa" },
  { type: "Commercial",  title: "Tampa Riverwalk Tower",   price: "Lease: $45/SF",beds:0, baths:0,  sqft:"450,000", img: "/com_office_tower_1787632874122.png",        address: "Downtown Tampa" },
  { type: "Residential", title: "Bayshore Modern",         price: "$8,900,000",  beds: 5, baths: 6, sqft: "8,500", img: "/res_modern_mansion_1787632812473.png",       address: "Bayshore Blvd, Tampa" },
  { type: "Residential", title: "Downtown Penthouse",      price: "$6,500,000",  beds: 4, baths: 4, sqft: "5,000", img: "/res_luxury_condo_1787632822869.png",          address: "Water Street, Tampa" },
  { type: "Commercial",  title: "Channelside Retail",      price: "5.2% Cap",    beds:0, baths:0,   sqft:"98,000", img: "/com_luxury_retail_1787632885082.png",        address: "Channelside, Tampa" },
  { type: "Residential", title: "Hyde Park Historic",      price: "$5,800,000",  beds: 7, baths: 7, sqft: "9,100", img: "/res_historic_estate_1787632833084.png",      address: "Hyde Park, Tampa" },
  { type: "Residential", title: "Clearwater Beach Villa",  price: "$11,500,000", beds: 5, baths: 5, sqft: "6,000", img: "/res_beachfront_villa_1787632843222.png",     address: "Clearwater Beach, FL" },
  { type: "Residential", title: "Avila Golf Estate",       price: "$7,200,000",  beds: 6, baths: 7, sqft:"10,500", img: "/res_golf_course_home_1787632854609.png",     address: "Avila, Tampa" },
  { type: "Land",        title: "Apollo Beach Marina",     price: "$22,000,000", beds:0, baths:0,  sqft: "24ac",   img: "/land_waterfront_plot_1787632916432.png",     address: "Apollo Beach, FL" },
  { type: "Commercial",  title: "Ybor Multi-Family",       price: "4.8% Cap",    beds:0, baths:0,  sqft: "320 un", img: "/com_multi_family_1787632895059.png",         address: "Ybor City, Tampa" },
  { type: "Land",        title: "I-4 Corridor Site",       price: "$35,000,000", beds:0, baths:0,  sqft:"150ac",   img: "/land_commercial_development_1787632926636.png", address: "I-4 Corridor, FL" },
  { type: "Commercial",  title: "St. Pete Industrial Hub", price: "$18,500,000", beds:0, baths:0,  sqft: "1.2M",   img: "/com_industrial_park_1787632905437.png",      address: "St. Petersburg, FL" },
];

const PAGE_SIZE = 6;

const TYPE_COLOR: Record<string, string> = {
  Residential: "bg-[#1B4332] text-white",
  Commercial:  "bg-[#1E3A5F] text-white",
  Land:        "bg-[#5C3A1E] text-white",
};

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

export default function PropertiesPage() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [shown, setShown] = useState(PAGE_SIZE);

  const CARD_W = 340; // px — approximate card width + gap for scroll calc

  const scrollSlider = (dir: "prev" | "next") => {
    const el = sliderRef.current;
    if (!el) return;
    const maxIndex = sliderCards.length - 1;
    const next = dir === "next"
      ? Math.min(sliderIndex + 1, maxIndex)
      : Math.max(sliderIndex - 1, 0);
    setSliderIndex(next);
    el.scrollTo({ left: next * (CARD_W + 24), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      <ProposalNav />

      {/* ══════════════════════════════════════════════
          1. HERO — property style categories
         ══════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center pt-20 pb-16 px-8 bg-[#f5f3ef] overflow-hidden">
        {/* Subtle tiled background motif */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/dg-favicon-fat.png')", backgroundSize: "200px", backgroundRepeat: "repeat" }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-5">Davis & Garnett</span>
            <h1 className="font-aiveritas text-6xl md:text-8xl text-[#111] leading-tight mb-6">
              The Portfolio
            </h1>
            <p className="text-[#111]/55 font-light text-lg max-w-xl mx-auto leading-relaxed">
              Curated commercial acquisitions and luxury residential estates across Tampa Bay's most sought-after markets.
            </p>
          </div>

          {/* Property type pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "All Properties", active: true },
              { label: "Residential" },
              { label: "Commercial" },
              { label: "Land & Development" },
              { label: "Waterfront" },
              { label: "New Construction" },
            ].map(({ label, active }) => (
              <button
                key={label}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] border transition-colors ${
                  active
                    ? "bg-[#111] text-white border-[#111]"
                    : "bg-transparent text-[#111]/60 border-[#111]/20 hover:border-[#111] hover:text-[#111]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          2. FEATURED PROPERTY — col 1 editorial, col 2 image
         ══════════════════════════════════════════════ */}
      <section className="w-full bg-white border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-0 items-stretch">

          {/* Col 1 — Editorial listing summary */}
          <div className="flex flex-col justify-center pr-0 md:pr-16 py-8 order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#D4AF37] text-white text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 rounded-sm">
                {featuredProperty.tag}
              </span>
              <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.2em] font-bold">
                {featuredProperty.type}
              </span>
            </div>

            <h2 className="font-aiveritas text-5xl md:text-6xl xl:text-7xl text-[#111] leading-tight mb-4">
              {featuredProperty.title}
            </h2>

            <div className="flex items-center gap-2 text-[#111]/50 text-sm mb-8">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              {featuredProperty.address}
            </div>

            <p className="text-[#111]/65 font-light leading-relaxed text-base mb-8 max-w-lg">
              {featuredProperty.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {featuredProperty.highlights.map(h => (
                <div key={h} className="flex items-center gap-2 text-sm text-[#111]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                  {h}
                </div>
              ))}
            </div>

            {/* Specs row */}
            <div className="flex gap-8 border-t border-[#111]/10 pt-8 mb-10">
              <div>
                <span className="flex items-center gap-1.5 text-[#111]/40 text-[10px] uppercase tracking-widest mb-1"><Bed className="w-3 h-3" /> Beds</span>
                <span className="font-bold text-[#111] text-lg">{featuredProperty.beds}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[#111]/40 text-[10px] uppercase tracking-widest mb-1"><Bath className="w-3 h-3" /> Baths</span>
                <span className="font-bold text-[#111] text-lg">{featuredProperty.baths}</span>
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[#111]/40 text-[10px] uppercase tracking-widest mb-1"><Maximize className="w-3 h-3" /> SqFt</span>
                <span className="font-bold text-[#111] text-lg">{featuredProperty.sqft}</span>
              </div>
              <div>
                <span className="text-[#111]/40 text-[10px] uppercase tracking-widest mb-1 block">Price</span>
                <span className="font-aiveritas text-xl text-[#D4AF37]">{featuredProperty.price}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="#" className="flex items-center gap-2 px-8 py-4 bg-[#111] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-[#D4AF37] transition-colors">
                Schedule Viewing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#" className="flex items-center gap-2 px-8 py-4 border border-[#111]/20 text-[#111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:border-[#111] transition-colors">
                Full Details <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Col 2 — Featured image */}
          <div className="relative order-1 md:order-2 min-h-[50vh] md:min-h-[700px] rounded-2xl overflow-hidden">
            <Image
              src={featuredProperty.img}
              alt={featuredProperty.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Just a subtle dark vignette at bottom — no white wash */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">{featuredProperty.pricePerSqft}</span>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          3. STICKY STACK SPILLOUT
         ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f3ef]">
        <PropertiesStickyStack />
      </section>


      {/* ══════════════════════════════════════════════
          4. PROPERTY CARD SLIDER
         ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-t border-[#111]/8 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 mb-10 flex items-end justify-between">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">Browse All Types</span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111]">Active Listings</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollSlider("prev")}
              disabled={sliderIndex === 0}
              className="w-11 h-11 rounded-full border border-[#111]/20 flex items-center justify-center hover:bg-[#111] hover:text-white hover:border-[#111] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider("next")}
              disabled={sliderIndex >= sliderCards.length - 1}
              className="w-11 h-11 rounded-full border border-[#111]/20 flex items-center justify-center hover:bg-[#111] hover:text-white hover:border-[#111] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider track — scrollable, hidden scrollbar */}
        <div
          ref={sliderRef}
          className="flex gap-6 pl-8 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sliderCards.map((card, i) => (
            <Link
              key={i}
              href="#"
              className="group shrink-0 w-[320px] md:w-[340px] rounded-2xl overflow-hidden bg-[#f5f3ef] border border-[#111]/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.15em] py-1 px-2.5 rounded-sm ${TYPE_COLOR[card.type] || "bg-black text-white"}`}>
                  {card.type}
                </span>
                <span className="absolute bottom-4 right-4 text-white font-bold text-sm drop-shadow-lg">
                  {card.price}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-aiveritas text-xl text-[#111] mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {card.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[#111]/45 text-xs mb-4">
                  <MapPin className="w-3 h-3" /> {card.address}
                </div>
                {card.beds > 0 && (
                  <div className="flex gap-5 text-xs text-[#111]/60 border-t border-[#111]/8 pt-4 mt-auto">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {card.beds} Bed</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {card.baths} Bath</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {card.sqft} SF</span>
                  </div>
                )}
                {card.beds === 0 && (
                  <div className="flex gap-5 text-xs text-[#111]/60 border-t border-[#111]/8 pt-4 mt-auto">
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {card.sqft} GLA</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
          {/* Right padding */}
          <div className="shrink-0 w-8" />
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          5. INSTAGRAM-STYLE FULL-WIDTH GRID
         ══════════════════════════════════════════════ */}
      <section className="bg-[#f5f3ef] border-t border-[#111]/8">
        <div className="max-w-screen-xl mx-auto px-8 pt-20 pb-10 text-center">
          <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">@DavisGarnett</span>
          <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111]">The Portfolio Gallery</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0">
          {gridImages.map((src, i) => (
            <Link key={i} href="#" className="group relative aspect-square overflow-hidden bg-[#ddd] block">
              <Image
                src={src}
                alt="Property"
                fill
                sizes="(max-width: 768px) 33vw, 17vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-white text-sm font-bold">
                  <Heart className="w-4 h-4 fill-white" />
                  {((i + 1) * 137) % 400 + 150}
                </span>
                <span className="flex items-center gap-1.5 text-white text-sm font-bold">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  {((i + 1) * 47) % 50 + 12}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          6. 3-COLUMN GRID + LOAD MORE
         ══════════════════════════════════════════════ */}
      <section className="py-24 px-8 bg-white border-t border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">Full Inventory</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111]">All Properties</h2>
            </div>
            <p className="text-[#111]/45 text-sm">{allCards.length} listings available</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {allCards.slice(0, shown).map((card, i) => (
              <Link
                key={i}
                href="#"
                className="group bg-[#f5f3ef] border border-[#111]/8 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-[0.15em] py-1 px-2.5 rounded-sm ${TYPE_COLOR[card.type] || "bg-black text-white"}`}>
                    {card.type}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-[#111]/45 text-xs mb-2">
                    <MapPin className="w-3 h-3" /> {card.address}
                  </div>
                  <h3 className="font-aiveritas text-2xl text-[#111] mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#D4AF37] font-bold text-lg mb-4">{card.price}</p>

                  <div className="flex gap-5 text-xs text-[#111]/50 border-t border-[#111]/8 pt-4 mt-auto">
                    {card.beds > 0 ? (
                      <>
                        <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {card.beds} Bed</span>
                        <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {card.baths} Bath</span>
                        <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {card.sqft} SF</span>
                      </>
                    ) : (
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {card.sqft} GLA</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          {shown < allCards.length && (
            <div className="flex justify-center">
              <button
                onClick={() => setShown(s => Math.min(s + PAGE_SIZE, allCards.length))}
                className="flex items-center gap-2 px-10 py-4 border-2 border-[#111] text-[#111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-[#111] hover:text-white transition-colors"
              >
                Load More Properties
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {shown >= allCards.length && (
            <p className="text-center text-[#111]/35 text-xs uppercase tracking-widest">All {allCards.length} properties shown</p>
          )}
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="bg-[#0c0b09] py-16 px-8 border-t border-[#D4AF37]/20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest max-w-xl leading-relaxed">
            Davis & Garnett is a commercial and residential real estate advisory group brokered by Align Right Realty. All properties subject to prior sale. Equal Housing Opportunity.
          </p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest shrink-0">
            © {new Date().getFullYear()} Davis & Garnett
          </p>
        </div>
      </footer>
    </div>
  );
}

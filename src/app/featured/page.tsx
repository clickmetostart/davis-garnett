"use client";

import Image from "next/image";
import { ArrowDown, MapPin, TrendingUp, Building2, ShieldCheck, Play, ArrowRight, Camera } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";

/* ─── YBOR MULTI-FAMILY PREMIUM DATA ─── */
const data = {
  title: "The Ybor Collection",
  subtitle: "Trophy Multi-Family Investment in Historic Ybor City",
  status: "Exclusive Off-Market",
  units: 320,
  capRate: "4.8%",
  occupancy: "96%",
  heroImg: "/com_multi_family_1787632895059.png",
  images: [
    "/com_multi_family_1787632895059.png",
    "/res_modern_mansion_1787632812473.png", // fallback placeholder images
    "/res_luxury_condo_1787632822869.png",
  ],
  description: "A generational opportunity to acquire a stabilizing core-plus asset in Tampa's most dynamic submarket. The Ybor Collection blends historic architectural cues with hyper-modern resort-style amenities, capturing premium rents in a high-barrier-to-entry neighborhood.",
  highlights: [
    "320 Luxury Units Delivered 2023",
    "96% Stabilized Occupancy",
    "Assumable Debt at 4.2% Fixed",
    "Resort-Style Rooftop Pool & Lounge",
    "Historic District Tax Advantages",
    "Walk Score: 92 (Walker's Paradise)",
  ],
  financials: {
    asking: "Unpriced / Call for Offers",
    noi: "$4.2M (T-12)",
    avgRent: "$2,450 / unit",
    rentGrowth: "8.5% YoY",
  }
};

export default function FeaturedListing() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <ProposalNav />

      {/* ══════════════════════════════════════════════
          HERO — IMMERSIVE FULL SCREEN
         ══════════════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax feel */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImg}
            alt={data.title}
            fill
            className="object-cover object-center scale-105 transition-transform duration-[20s] ease-out hover:scale-110"
            priority
          />
          {/* Gradients to pop text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* Floating status badge */}
        <div className="absolute top-32 left-8 md:left-16 z-20 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{data.status}</span>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-8 md:px-16 flex flex-col justify-end h-full pb-32">
          <div className="max-w-4xl">
            <h2 className="text-[#D4AF37] text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
              {data.subtitle}
            </h2>
            <h1 className="font-aiveritas text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white drop-shadow-2xl mb-8">
              {data.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-lg text-white/80 border-l-2 border-[#D4AF37] pl-6 py-2">
              <p><span className="font-bold text-white">{data.units}</span> Units</p>
              <p><span className="font-bold text-white">{data.occupancy}</span> Occupied</p>
              <p><span className="font-bold text-[#D4AF37]">{data.capRate}</span> Cap Rate</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THE ASSET — TWO COLUMN EDITORIAL
         ══════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#050505] py-24 md:py-40 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                <TrendingUp className="w-3 h-3" /> Investment Overview
              </div>
              <h3 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                A Class-A trophy asset in the heart of history.
              </h3>
              <p className="text-white/60 font-light text-lg leading-relaxed">
                {data.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                {data.highlights.map(h => (
                  <div key={h} className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Financial Summary Card */}
            <div className="bg-[#0c0b09] border border-[#D4AF37]/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              {/* Decorative background element */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:bg-[#D4AF37]/20 transition-colors duration-700" />
              
              <h4 className="text-white font-aiveritas text-3xl mb-8 relative z-10">Financial Snapshot</h4>
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/50 text-xs uppercase tracking-widest font-bold">Asking Price</span>
                  <span className="text-white font-aiveritas text-2xl text-right">{data.financials.asking}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/50 text-xs uppercase tracking-widest font-bold">T-12 NOI</span>
                  <span className="text-white font-aiveritas text-2xl text-right">{data.financials.noi}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-white/50 text-xs uppercase tracking-widest font-bold">Avg Rent</span>
                  <span className="text-[#D4AF37] font-bold text-lg text-right">{data.financials.avgRent}</span>
                </div>
                <div className="flex justify-between items-end pb-2">
                  <span className="text-white/50 text-xs uppercase tracking-widest font-bold">Rent Growth YoY</span>
                  <span className="text-[#22c55e] font-bold text-lg text-right">+{data.financials.rentGrowth}</span>
                </div>
              </div>

              <button className="w-full mt-10 py-5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                Request Offering Memorandum <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LIFESTYLE GALLERY
         ══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <h2 className="font-aiveritas text-5xl text-white mb-4">The Amenities</h2>
            <p className="text-white/50 max-w-xl">Curated spaces designed to command top-of-market rents and drive unprecedented tenant retention.</p>
          </div>
          <button className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors pb-2 border-b border-[#D4AF37]/30 hover:border-white">
            <Camera className="w-4 h-4" /> View Full Gallery
          </button>
        </div>

        <div className="flex overflow-x-auto gap-6 px-8 md:px-16 pb-12" style={{ scrollbarWidth: "none" }}>
          {data.images.map((src, i) => (
            <div key={i} className="relative w-[80vw] md:w-[600px] h-[400px] shrink-0 rounded-2xl overflow-hidden group">
              <Image src={src} alt="Amenity" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Simulated video play button on first image */}
              {i === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════════════
          THE LOCATION — YBOR CITY
         ══════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 text-center relative z-10">
          <MapPin className="w-12 h-12 text-[#D4AF37] mx-auto mb-8" />
          <h2 className="font-aiveritas text-6xl md:text-7xl text-white mb-6">Historic Ybor City</h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Perfectly positioned directly on the TECO Streetcar line, connecting residents to Downtown Tampa, Water Street, and Channelside within minutes. A thriving epicenter of culture, dining, and massive institutional capital influx.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
               <h4 className="text-[#D4AF37] font-bold text-2xl mb-2">3 Min</h4>
               <p className="text-white/50 text-sm">Walk to 7th Avenue Dining & Entertainment</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
               <h4 className="text-[#D4AF37] font-bold text-2xl mb-2">10 Min</h4>
               <p className="text-white/50 text-sm">Streetcar ride to Water Street Tampa</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
               <h4 className="text-[#D4AF37] font-bold text-2xl mb-2">$1B+</h4>
               <p className="text-white/50 text-sm">Active commercial developments within 1 mile</p>
             </div>
          </div>
        </div>

        {/* Massive washed out background logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-aiveritas text-white/[0.02] whitespace-nowrap select-none pointer-events-none">
          TAMPA
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] py-12 px-8 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest max-w-xl leading-relaxed text-center md:text-left">
            Davis & Garnett is a commercial and residential real estate advisory group brokered by Align Right Realty. All properties subject to prior sale. Equal Housing Opportunity.
          </p>
          <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest shrink-0">© {new Date().getFullYear()} Davis & Garnett</p>
        </div>
      </footer>
    </div>
  );
}

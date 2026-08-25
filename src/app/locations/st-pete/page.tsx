"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Building, Anchor, Sun, ArrowRight, PlayCircle } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function StPeteLocationPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-auto">
        <div className="w-16 md:w-20">
          <Link href="/">
            <DavisGarnettLogo className="text-[#D4AF37]" />
          </Link>
        </div>
        <div className="bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          <span className="text-white/80 text-xs uppercase tracking-widest font-bold">St. Petersburg Market Guide</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col justify-end px-8 pb-16">
        <Image 
          src="/city_st_pete_1787662322779.png" 
          alt="St. Petersburg Waterfront" 
          fill 
          className="object-cover object-center pointer-events-none opacity-60" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <Link href="/preview-mockup" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Locations
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[#F5E6CE] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Pinellas County • Florida</span>
              </div>
              <h1 className="font-aiveritas text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5E6CE] drop-shadow-2xl mb-6 leading-none">
                St. Petersburg
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                The cultural heartbeat of the Gulf Coast. A thriving waterfront metropolis defining the future of Florida luxury real estate and commercial innovation.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button className="px-8 py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg flex items-center justify-center gap-2">
                View Active Listings
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-lg flex items-center justify-center gap-2 backdrop-blur-sm">
                <PlayCircle className="w-4 h-4" />
                Watch Market Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-12 border-y border-white/10 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-3xl font-aiveritas text-[#D4AF37]">$1.4M</span>
            <span className="text-[0.65rem] uppercase tracking-widest text-white/50 font-bold">Avg. Luxury Home Price</span>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <span className="text-3xl font-aiveritas text-[#D4AF37]">361</span>
            <span className="text-[0.65rem] uppercase tracking-widest text-white/50 font-bold">Days of Sunshine</span>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <span className="text-3xl font-aiveritas text-[#D4AF37]">4.8%</span>
            <span className="text-[0.65rem] uppercase tracking-widest text-white/50 font-bold">Avg. Multi-Family Cap Rate</span>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <span className="text-3xl font-aiveritas text-[#D4AF37]">#1</span>
            <span className="text-[0.65rem] uppercase tracking-widest text-white/50 font-bold">Arts & Culture Destination</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-8 max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
          
          {/* Left Column: Neighborhoods & Developments */}
          <div className="space-y-24">
            
            {/* Intro */}
            <div className="prose prose-invert prose-lg prose-headings:font-aiveritas max-w-none">
              <h2 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5E6CE] mb-6">The Renaissance City</h2>
              <p className="text-white/80 font-light leading-relaxed">
                Known affectionately as the "Sunshine City," St. Petersburg has undergone a massive transformation over the past decade. Once a quiet retirement enclave, it is now one of the most highly coveted real estate markets in the United States, driven by billions in downtown redevelopment, a booming tech and finance sector, and an unmatched waterfront lifestyle.
              </p>
            </div>

            {/* Neighborhoods */}
            <div>
              <span className="text-[#F5E6CE] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Residential</span>
              <h3 className="font-aiveritas text-3xl text-white mb-8">Premier Neighborhoods</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { name: "Snell Isle", desc: "Historic waterfront estates, deep-water docks, and the Renaissance Vinoy Golf Club. The pinnacle of St. Pete luxury." },
                  { name: "Old Northeast", desc: "Tree-lined brick streets, historic Mediterranean Revival homes, and walkability to downtown." },
                  { name: "Downtown (DTSP)", desc: "High-rise luxury penthouses offering sweeping views of Tampa Bay and immediate access to dining and the arts." },
                  { name: "Tierra Verde", desc: "An exclusive island community at the southern tip of the peninsula, offering ultimate privacy and open Gulf access." }
                ].map((hood, i) => (
                  <div key={i} className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
                    <h4 className="text-[#D4AF37] font-bold text-lg mb-2">{hood.name}</h4>
                    <p className="text-white/60 text-sm font-light leading-relaxed">{hood.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial */}
            <div>
              <span className="text-[#F5E6CE] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Commercial</span>
              <h3 className="font-aiveritas text-3xl text-white mb-8">Major Developments</h3>
              <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image src="/land_commercial_development_1787632926636.png" alt="Historic Gas Plant District" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                </div>
                <div className="p-8 -mt-8 relative z-10">
                  <h4 className="text-[#D4AF37] font-bold text-xl mb-3">Historic Gas Plant District Redevelopment</h4>
                  <p className="text-white/70 font-light leading-relaxed mb-6">
                    A transformative $6.5 billion mixed-use development spanning 86 acres. This generational project includes a new state-of-the-art ballpark, millions of square feet of Class A office and retail space, and thousands of luxury residential units. For institutional investors, this represents the largest opportunity in the city's history.
                  </p>
                  <Link href="#" className="text-sm uppercase tracking-widest font-bold text-white hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                    Request Investment Prospectus <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Lifestyle & CTA */}
          <div className="space-y-8">
            <div className="sticky top-32">
              
              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 p-8 rounded-2xl mb-8 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                <h3 className="font-aiveritas text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5E6CE] mb-6">The St. Pete Lifestyle</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <Anchor className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <strong className="block text-white text-sm mb-1">St. Pete Pier</strong>
                      <span className="text-white/50 text-xs font-light">A 26-acre waterfront destination featuring world-class dining, art installations, and sweeping views of Tampa Bay.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Sun className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <strong className="block text-white text-sm mb-1">The Dali Museum</strong>
                      <span className="text-white/50 text-xs font-light">Unmatched cultural prestige housing the largest collection of Salvador Dali's works outside of Europe.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Building className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <div>
                      <strong className="block text-white text-sm mb-1">Beach Drive</strong>
                      <span className="text-white/50 text-xs font-light">The epicenter of luxury retail and fine dining, running parallel to the city's beautiful waterfront parks.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-b from-[#111] to-black border border-white/10 p-8 rounded-2xl text-center">
                <h3 className="font-aiveritas text-xl text-white mb-4">Interested in St. Pete?</h3>
                <p className="text-white/50 text-sm font-light mb-6">
                  Whether you are seeking a waterfront estate or evaluating commercial acquisitions in the Gas Plant District, our syndicate provides unmatched local expertise.
                </p>
                <button className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg mb-3">
                  Contact The Team
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* AEO / GEO: Place + RealEstateAgent Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Place",
                "name": "St. Petersburg, Florida",
                "description": "A vibrant waterfront city in Pinellas County known for luxury real estate, the St. Pete Pier, the Dali Museum, and the massive Historic Gas Plant District redevelopment.",
                "containedInPlace": {
                  "@type": "State",
                  "name": "Florida"
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://davisgarnett.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Locations",
                    "item": "https://davisgarnett.com/locations"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "St. Petersburg",
                    "item": "https://davisgarnett.com/locations/st-pete"
                  }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Bed, Bath, Maximize2, CalendarDays, Camera } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function ResidentialListing() {
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
          <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Residential Listing Preview</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col justify-end px-8 pb-16">
        <Image 
          src="/res_modern_mansion_1787632812473.png" 
          alt="Bayshore Modern Estate" 
          fill 
          className="object-cover object-center pointer-events-none" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <Link href="/preview-mockup" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold mb-8 drop-shadow-md">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest mb-4 drop-shadow-md">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Bayshore Boulevard, Tampa</span>
              </div>
              <h1 className="font-aiveritas text-6xl md:text-8xl text-white drop-shadow-2xl mb-4 leading-none">
                The Glass Estate
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 font-light drop-shadow-lg">
                $12,500,000
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="h-14 px-8 bg-black/40 backdrop-blur-md border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-lg flex items-center gap-2">
                <Camera className="w-4 h-4" />
                View Gallery (32)
              </button>
              <button className="h-14 px-8 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-8 max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Details Column */}
        <div className="lg:col-span-2">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <Bed className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-2xl font-bold text-white mb-1">6</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Bedrooms</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <Bath className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-2xl font-bold text-white mb-1">7.5</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Bathrooms</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <Maximize2 className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-2xl font-bold text-white mb-1">9,420</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Square Feet</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <CalendarDays className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-2xl font-bold text-white mb-1">2024</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Year Built</div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-invert prose-lg prose-headings:font-aiveritas prose-a:text-[#D4AF37] max-w-none">
            <h2 className="text-3xl border-b border-white/10 pb-4 mb-8">Property Description</h2>
            <p className="lead text-xl text-white/80 font-light leading-relaxed mb-8">
              A masterclass in modern architectural design, this newly completed masterpiece on iconic Bayshore Boulevard offers uninterrupted, panoramic views of Hillsborough Bay.
            </p>
            <p>
              Designed by award-winning architects and built to the highest possible standards, the Glass Estate seamlessly blends indoor and outdoor luxury living. Floor-to-ceiling impact glass walls retract to reveal a sprawling entertainment deck, complete with a zero-edge infinity pool that appears to spill directly into the bay.
            </p>
            <p>
              The interior is equally breathtaking, featuring imported Italian marble flooring, a custom Poliform kitchen equipped with dual Sub-Zero and Wolf appliances, and a climate-controlled 1,000-bottle wine gallery. The primary suite is a sanctuary unto itself, occupying the entire eastern wing of the second floor with dual spa-inspired baths and bespoke dressing rooms.
            </p>
            
            <h3 className="text-2xl mt-12 mb-6">Luxury Amenities</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <ul className="space-y-2 text-white/70 font-light">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Smart Home Automation (Control4)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> 4-Car Collector's Garage</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Executive Home Office</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Private Deep Water Dock</li>
              </ul>
              <ul className="space-y-2 text-white/70 font-light">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Commercial Grade Elevator</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Wellness Spa & Gym</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Catering Prep Kitchen</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" /> Rooftop Entertainment Deck</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            
            {/* Agent Contact Card */}
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-48 w-full">
                <Image src="/rachael-garnett-headshot.png" alt="Rachael Garnett" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              </div>
              <div className="p-8 relative -mt-16">
                <div className="bg-black/80 backdrop-blur-md inline-block px-4 py-1 rounded-full border border-white/10 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] mb-4">
                  Listing Agent
                </div>
                <h3 className="text-3xl font-aiveritas text-white mb-1">Rachael Garnett</h3>
                <p className="text-white/50 text-sm uppercase tracking-widest mb-6">Director of Luxury Estates</p>
                
                <div className="space-y-4 mb-8">
                  <p className="text-white/80 text-sm font-light">
                    Proof of funds or pre-approval letter required prior to scheduling a private tour.
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg">
                    Contact Rachael
                  </button>
                  <button className="w-full py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-lg">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}

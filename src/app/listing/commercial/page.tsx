"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Building, Shield, FileText, CheckCircle2 } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function CommercialListing() {
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
          <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Commercial Listing Preview</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex flex-col justify-end px-8 pb-16">
        <Image 
          src="/mega_property_pinned_1787632939192.png" 
          alt="The Tampa Apex" 
          fill 
          className="object-cover object-center pointer-events-none" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-screen-xl mx-auto w-full">
          <Link href="/preview-mockup" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-white/70 text-sm font-bold uppercase tracking-widest mb-4">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Downtown Tampa Core</span>
                <span className="mx-2">•</span>
                <span className="text-[#D4AF37]">Off-Market Opportunity</span>
              </div>
              <h1 className="font-aiveritas text-5xl md:text-8xl text-white drop-shadow-2xl mb-4 leading-none">
                The Tampa Apex
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light">
                Class A+ Mixed-Use Development Site
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl md:min-w-[300px]">
              <div className="text-sm text-white/50 uppercase tracking-widest mb-1">Target Valuation</div>
              <div className="text-4xl font-aiveritas text-[#D4AF37] mb-6">Undisclosed</div>
              <button className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Request OM
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
              <Building className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-2xl font-bold text-white mb-1">1.2M</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Gross Sq Ft</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <Shield className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-2xl font-bold text-white mb-1">CBD-1</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Zoning</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-serif text-[#D4AF37] mb-3 leading-none italic block">42</span>
              <div className="text-2xl font-bold text-white mb-1">Stories</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Max Height</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] mb-3" />
              <div className="text-xl font-bold text-white mb-1">Approved</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Entitlements</div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-invert prose-lg prose-headings:font-aiveritas prose-a:text-[#D4AF37] max-w-none">
            <h2 className="text-3xl border-b border-white/10 pb-4 mb-8">Investment Overview</h2>
            <p className="lead text-xl text-white/80 font-light leading-relaxed mb-8">
              The Tampa Apex represents a once-in-a-cycle opportunity to acquire a fully entitled, shovel-ready core site in the heart of Downtown Tampa's explosive growth corridor. 
            </p>
            <p>
              Surrounded by billions of dollars in recent institutional capital deployment, this site is positioned to redefine the Tampa skyline. The current entitlements allow for up to 1.2 million gross square feet of Class A+ office, luxury residential, and ground-floor retail activating the pedestrian thoroughfare.
            </p>
            <p>
              With construction costs stabilizing and tenant demand for premium, highly amenitized space far outpacing supply, The Apex offers a generational development play.
            </p>
            
            <h3 className="text-2xl mt-12 mb-6">Key Highlights</h3>
            <ul className="space-y-3">
              <li><strong>Irreplaceable Location:</strong> Direct access to the Riverwalk, Water Street district, and major transit arteries.</li>
              <li><strong>Fully Entitled:</strong> Years of zoning approvals and environmental reviews completed.</li>
              <li><strong>Flexible Program:</strong> Approved for multiple asset class mixtures depending on developer strategy.</li>
              <li><strong>Qualified Opportunity Zone:</strong> Significant tax advantages available for long-term holds.</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            
            {/* Agent Contact Card */}
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-48 w-full">
                <Image src="/mark-davis-headshot.png" alt="Mark Davis" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
              </div>
              <div className="p-8 relative -mt-16">
                <div className="bg-black/80 backdrop-blur-md inline-block px-4 py-1 rounded-full border border-white/10 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] mb-4">
                  Exclusive Advisor
                </div>
                <h3 className="text-3xl font-aiveritas text-white mb-1">Mark Davis</h3>
                <p className="text-white/50 text-sm uppercase tracking-widest mb-6">Director of Commercial Assets</p>
                
                <div className="space-y-4 mb-8">
                  <p className="text-white/80 text-sm font-light">
                    For highly qualified institutional buyers and developers, please contact directly for the confidential offering memorandum and data room access.
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-white hover:bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg">
                    Schedule a Call
                  </button>
                  <button className="w-full py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold uppercase tracking-widest text-xs transition-colors rounded-lg">
                    Email Mark
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

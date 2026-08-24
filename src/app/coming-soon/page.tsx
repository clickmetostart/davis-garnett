"use client";

import Image from "next/image";
import { Mail, Phone, ArrowLeft, X } from "lucide-react";
import { useState } from "react";

export default function ComingSoon() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative" style={{ fontFamily: "var(--font-sans)" }}>
      
      {/* ── POPUP ── */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-[#D4AF37]/30 p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <span className="label-caps text-[#D4AF37] block mb-4 text-[0.65rem] tracking-[0.2em] uppercase">Coming Soon Note</span>
            <h3 className="font-serif text-2xl text-white mb-4">Interim Landing Page</h3>
            <p className="text-white/70 font-light text-sm mb-6 leading-relaxed">
              This is the live "Coming Soon" page we deploy to your domain immediately while the full ClickMe architecture and content engine are being built underneath.
            </p>
            <button onClick={() => setShowPopup(false)} className="w-full py-3 bg-[#D4AF37] text-black font-bold text-sm tracking-widest uppercase hover:bg-[#F6E3B0] transition-colors">
              Continue to Preview
            </button>
          </div>
        </div>
      )}
      
      {/* Navbar Minimal */}
      <nav className="w-full z-50 bg-transparent absolute top-0">
        <div className="max-w-screen-xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-[#D4AF37] transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Proposal
          </a>
          <span className="label-caps text-[0.6rem] tracking-[0.2em] text-[#555]">Powered by ClickMe</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch">
        
        {/* Left Side (Image) */}
        <div className="w-full lg:w-[45%] relative h-[55vh] lg:h-auto lg:min-h-screen block border-b lg:border-b-0 lg:border-r border-[rgba(212,175,55,0.1)]">
          <Image 
            src="/davis-garnett-real-combo.png" 
            alt="Mark Davis and Rachael Garnett - Tampa Bay Real Estate"
            fill
            className="object-cover object-top opacity-90"
            priority
          />
          {/* Desktop Gradient */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]" />
          {/* Mobile Gradient */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
          
          <div className="hidden lg:block absolute bottom-12 left-12 max-w-sm">
             <div className="flex gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="label-caps text-[#D4AF37] text-[0.65rem]">System Assembly in Progress</span>
             </div>
             <p className="font-serif text-white/80 text-xl" style={{ fontFamily: "var(--font-serif)" }}>The framework is already built. Just say the word.</p>
          </div>
        </div>

        {/* Right Side (Content) */}
        <div className="w-full lg:w-[55%] relative flex flex-col justify-center px-8 lg:px-24 py-12 lg:py-32 bg-[#050505]">
          <div className="max-w-xl">
            <div className="inline-block px-4 py-1.5 border border-[#D4AF37]/30 bg-[#D4AF37]/5 mb-8">
              <span className="label-caps text-[#D4AF37] block">Davis & Garnett</span>
            </div>
            
            <h1 className="font-serif mb-8" style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(3rem, 5vw, 5rem)",
              letterSpacing: "0.02em",
              lineHeight: "1.05",
              color: "#ffffff"
            }}>
              Tampa's Next<br/>
              <span className="italic text-[#D4AF37]">Power Combo</span><br/>
              is Loading.
            </h1>
            
            <p className="text-[#a0a0a0] text-base leading-loose mb-12 max-w-md">
              Mark Davis and Rachael Garnett are combining forces to elevate the commercial and residential experience across Tampa Bay. We are actively constructing their new definitive digital authority platform. It goes live shortly.
            </p>

            <div className="space-y-6 pt-10 border-t border-[rgba(212,175,55,0.15)]">
              <span className="label-caps text-[#666] block tracking-widest">Direct Lines</span>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 border border-[rgba(212,175,55,0.15)] hover:bg-[rgba(212,175,55,0.05)] transition-colors group">
                  <p className="text-sm text-white mb-1 group-hover:text-[#D4AF37] transition-colors">Mark Davis</p>
                  <p className="text-xs text-[#777] mb-6">Broker Associate</p>
                  
                  <div className="flex gap-4">
                    <a href="tel:941-737-4127" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      941-737-4127
                    </a>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <a href="mailto:msdavis118@gmail.com" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Email Mark
                    </a>
                  </div>
                </div>

                <div className="p-5 border border-[rgba(212,175,55,0.15)] hover:bg-[rgba(212,175,55,0.05)] transition-colors group">
                  <p className="text-sm text-white mb-1 group-hover:text-[#D4AF37] transition-colors">Rachael Garnett</p>
                  <p className="text-xs text-[#777] mb-6">Real Estate Advisor</p>
                  
                  <div className="flex gap-4">
                    <a href="tel:727-808-3344" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      727-808-3344
                    </a>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <a href="mailto:rachaellgarnett@gmail.com" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Email Rachael
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

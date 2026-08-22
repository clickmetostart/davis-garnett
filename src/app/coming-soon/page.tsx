import Image from "next/image";
import { Mail, Phone, ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col" style={{ fontFamily: "var(--font-sans)" }}>
      
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
        <div className="w-full lg:w-[45%] relative min-h-[50vh] lg:min-h-screen hidden lg:block border-r border-[rgba(212,175,55,0.1)]">
          <Image 
            src="/davis-garnett-real-combo.png" 
            alt="Mark Davis and Rachael Garnett - Tampa Bay Real Estate"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 lg:hidden" />
          
          <div className="absolute bottom-12 left-12 max-w-sm">
             <div className="flex gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="label-caps text-[#D4AF37] text-[0.65rem]">System Assembly in Progress</span>
             </div>
             <p className="font-serif text-white/80 text-xl" style={{ fontFamily: "var(--font-serif)" }}>The framework is already built. Just say the word.</p>
          </div>
        </div>

        {/* Right Side (Content) */}
        <div className="w-full lg:w-[55%] relative flex flex-col justify-center px-8 lg:px-24 py-32 bg-[#050505]">
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

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function PreviewMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- SCROLL ANIMATIONS (DESKTOP) ---

  // Phase 1 (0-0.33), Phase 2 (0.33-0.66), Phase 3 (0.66-1.0)
  
  // Left Image (Mark)
  const leftLeft = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["50%", "50%", "17%", "25%"]);
  const leftWidth = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["30vw", "30vw", "30vw", "50vw"]);
  const leftHeight = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["75vh", "75vh", "75vh", "100vh"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [0, 0, 1]);
  const leftZIndex = useTransform(scrollYProgress, [0, 0.66, 0.67], [0, 0, 20]);

  // Right Image (Rachael)
  const rightLeft = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["50%", "50%", "83%", "75%"]);
  const rightWidth = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["30vw", "30vw", "30vw", "50vw"]);
  const rightHeight = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["75vh", "75vh", "75vh", "100vh"]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [0, 0, 1]);
  const rightZIndex = useTransform(scrollYProgress, [0, 0.66, 0.67], [0, 0, 20]);

  // Center Image (Team)
  const centerScale = useTransform(scrollYProgress, [0.66, 0.8], [1, 0.9]);
  const centerOpacity = useTransform(scrollYProgress, [0.66, 0.8], [1, 0]);

  // Text Overlays
  const textOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.85, 1], [40, 0]);

  return (
    <div className="min-h-screen text-white bg-[#050505] selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* ── MINIMAL PREVIEW NAV ── */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-[#D4AF37] transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Exit Preview
          </Link>
          <span className="label-caps text-[0.6rem] tracking-[0.2em] text-[#555]">Davis & Garnett - Home Preview</span>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/davis-garnett-hero.png" 
            alt="Tampa Bay Real Estate" 
            fill 
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-8 flex flex-col items-center w-full max-w-4xl mx-auto">
          <DavisGarnettLogo variant="dark" className="w-[90%] md:w-[70%] max-w-[700px] mx-auto mb-12 drop-shadow-2xl" />
          
          <div className="inline-flex items-center gap-3 mb-6 border border-white/10 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/80">Align Right Realty</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-light tracking-wide text-white drop-shadow-2xl">
            The Tampa <br/>
            <span className="italic text-[#D4AF37]">Standard.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed mb-10">
            A unified force in Tampa Bay real estate. Combining commercial gravity with unmatched residential finesse to deliver an elevated advisory experience.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Explore Portfolio
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
              Meet The Team
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 animate-bounce">
          <span className="text-[0.55rem] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>


      {/* ── TAMPA TEAM REVEAL (INTERACTIVE SECTION) ── */}
      {isMobile ? (
        
        /* MOBILE FALLBACK: Clean 2-column stacked layout */
        <section className="py-24 px-6 bg-[#050505]">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-[0.65rem] tracking-[0.2em] uppercase font-bold block mb-4">The Advisors</span>
            <h2 className="font-serif text-4xl text-white">Your Power Combo.</h2>
          </div>
          
          <div className="flex flex-col gap-12">
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/mark-davis-headshot.png" alt="Mark Davis" fill className="object-cover" />
              </div>
              <h3 className="font-serif text-2xl mb-1">Mark Davis</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Commercial Expert</p>
              <button className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                Connect With Mark
              </button>
            </div>
            
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/rachael-garnett-headshot.png" alt="Rachael Garnett" fill className="object-cover" />
              </div>
              <h3 className="font-serif text-2xl mb-1">Rachael Garnett</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Residential Specialist</p>
              <button className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                Connect With Rachael
              </button>
            </div>
          </div>
        </section>

      ) : (

        /* DESKTOP INTERACTIVE: Framer Motion Scroll Sequence */
        <section ref={containerRef} className="relative w-full h-[350vh] bg-[#050505]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
            
            {/* Center Image (Team) */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: "30vw",
                height: "75vh",
                opacity: centerOpacity,
                scale: centerScale
              }}
            >
              <Image 
                src="/davis-garnett-real-combo.png" 
                alt="Davis & Garnett Team" 
                fill 
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="font-serif text-3xl text-white drop-shadow-md mb-2">The Power Combo</h3>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Tampa Bay Real Estate</p>
              </div>
            </motion.div>

            {/* Left Image (Mark) */}
            <motion.div 
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                left: leftLeft,
                width: leftWidth,
                height: leftHeight,
                opacity: leftOpacity,
                zIndex: leftZIndex
              }}
            >
              <Image 
                src="/mark-davis-headshot.png" 
                alt="Mark Davis" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              
              {/* Text Overlay for Phase 3 */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Broker Associate</span>
                <h2 className="font-serif text-5xl text-white mb-6">Mark Davis</h2>
                <p className="text-white/70 text-center max-w-md font-light mb-10 leading-relaxed">
                  Specializing in Tampa Bay commercial real estate, investment properties, and high-yield acquisitions. Driving business growth through strategic property placement.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                  View Commercial <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image (Rachael) */}
            <motion.div 
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden group cursor-pointer"
              style={{
                left: rightLeft,
                width: rightWidth,
                height: rightHeight,
                opacity: rightOpacity,
                zIndex: rightZIndex
              }}
            >
              <Image 
                src="/rachael-garnett-headshot.png" 
                alt="Rachael Garnett" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              
              {/* Text Overlay for Phase 3 */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Real Estate Advisor</span>
                <h2 className="font-serif text-5xl text-white mb-6">Rachael Garnett</h2>
                <p className="text-white/70 text-center max-w-md font-light mb-10 leading-relaxed">
                  Tampa Bay's premier residential specialist. Curating exceptional neighborhood lifestyles and elevating the home buying and selling experience.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                  View Residential <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-24 px-8 bg-[#050505] border-t border-white/5 text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl mb-8">Ready to Elevate?</h2>
        <Link href="/" className="btn-gold">
          Return to Proposal
        </Link>
      </footer>
    </div>
  );
}

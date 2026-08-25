"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, MapPin, Building, PlayCircle } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import FeaturedPortfolioSpillOut from "@/components/FeaturedPortfolioSpillOut";

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

  // Phase 1: United Team (Initial State - scroll 0)
  // Phase 2: Move Out (Scroll 0.1 -> 0.2)
  // Phase 3: Hold 3-columns (Scroll 0.2 -> 0.3)
  // Phase 4: Come Over The Top & Expand (Scroll 0.3 -> 0.4)
  // Phase 5: Text Fades In (Scroll 0.4 -> 0.5)
  // Phase 6: Hold Fully Expanded (Scroll 0.5 -> 1.0) with next section overlap
  
  // Left Image (Mark)
  const leftLeft = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["50%", "50%", "17%", "17%", "25%", "25%"]);
  const leftWidth = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const leftHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const leftZIndex = useTransform(scrollYProgress, [0, 0.29, 0.3, 1], [0, 0, 20, 20]); // Switches to front just before expanding
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.4], ["1rem", "0rem"]);

  // Right Image (Rachael)
  const rightLeft = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["50%", "50%", "83%", "83%", "75%", "75%"]);
  const rightWidth = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const rightHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const rightZIndex = useTransform(scrollYProgress, [0, 0.29, 0.3, 1], [0, 0, 20, 20]); // Switches to front just before expanding

  // Center Image (Team)
  // No opacity fades! It just sits at z-index 10 and gets covered by the side images coming over the top.
  const centerScale = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0.8]);

  // Text Overlays (Explicitly clamped to 1.0 to prevent any weird browser fade-outs)
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.6, 1], [40, 0, 0]);

  // Initial Side Text (Fades out as side images start sliding out)
  const initialTextOpacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);

  return (
    <div className="min-h-screen text-white bg-[#050505] selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* ── MINIMAL PREVIEW NAV (Admin/Client View) ── */}
      <div className="fixed top-0 w-full z-[60] bg-[#D4AF37] text-black h-8 flex items-center justify-between px-8 text-[0.6rem] uppercase tracking-widest font-bold">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <ArrowLeft className="w-3 h-3" /> Exit Preview
        </Link>
        <span>Davis & Garnett — Live Site Preview</span>
      </div>

      {/* ── REAL WEBSITE NAVIGATION ── */}
      <nav className="fixed top-8 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
          <DavisGarnettLogo variant="dark" className="w-48 max-w-full" />
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-white/70">
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Commercial</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Residential</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link>
            <Link href="#" className="text-white hover:text-[#D4AF37] transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-screen flex items-center justify-center pt-16 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/davis-garnett-hero.png" 
            alt="Tampa Bay Skyline" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          {/* Heavy gradient shadows so the text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-8 flex flex-col items-center w-full max-w-4xl mx-auto">
          <DavisGarnettLogo variant="dark" className="w-[90%] md:w-[70%] max-w-[700px] mx-auto mb-16 drop-shadow-2xl" />
          
          <h1 className="font-aiveritas text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-tight text-white">
            The Tampa <br/>
            <span className="text-gradient-gold">Standard.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed mb-10">
            A unified force in Tampa Bay real estate. Combining commercial gravity with unmatched residential finesse to deliver an elevated advisory experience.
          </p>

        </div>

        {/* Scroller Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-80 z-20">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-gradient-gold">Scroll to Discover</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </div>
      </section>


      {/* ── TAMPA TEAM REVEAL (INTERACTIVE SECTION) ── */}
      {isMobile ? (
        
        /* MOBILE FALLBACK: Clean 2-column stacked layout */
        <section className="py-24 px-6 bg-[#050505]">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-[0.65rem] tracking-[0.2em] uppercase font-bold block mb-4">The Advisors</span>
            <h2 className="font-aiveritas text-4xl text-white">Your Power Combo.</h2>
          </div>
          
          <div className="flex flex-col gap-12">
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/mark-davis-headshot.png" alt="Mark Davis" fill className="object-cover" />
              </div>
              <h3 className="font-aiveritas text-2xl mb-1">Mark Davis</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Commercial Expert</p>
              <button className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                Connect With Mark
              </button>
            </div>
            
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/rachael-garnett-headshot.png" alt="Rachael Garnett" fill className="object-cover" />
              </div>
              <h3 className="font-aiveritas text-2xl mb-1">Rachael Garnett</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Residential Specialist</p>
              <button className="w-full py-4 border border-white/20 text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                Connect With Rachael
              </button>
            </div>
          </div>
        </section>

      ) : (

        /* DESKTOP INTERACTIVE: Framer Motion Scroll Sequence */
        <section ref={containerRef} className="relative w-full h-[800vh] bg-[#050505]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">
            
            {/* Center Image (Team) */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: "30vw",
                height: "75vh",
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
                <h3 className="font-aiveritas text-3xl text-white drop-shadow-md mb-2">The Power Combo</h3>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Tampa Bay Real Estate</p>
              </div>
            </motion.div>

            {/* Initial Text (Left) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ 
                left: "17%", 
                x: "-50%",
                opacity: initialTextOpacity 
              }}
            >
              <h3 className="font-aiveritas text-5xl font-bold text-gradient-gold mb-4">Two Powerhouses</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Combining decades of award-winning expertise in Tampa Bay real estate.
              </p>
            </motion.div>

            {/* Initial Text (Right) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ 
                left: "83%", 
                x: "-50%",
                opacity: initialTextOpacity 
              }}
            >
              <h3 className="font-aiveritas text-5xl font-bold text-gradient-gold mb-4">One Unified Force</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Unmatched strategic service across both commercial and residential markets.
              </p>
            </motion.div>

            {/* Left Image (Mark) */}
            <motion.div 
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group cursor-pointer shadow-2xl"
              style={{
                left: leftLeft,
                width: leftWidth,
                height: leftHeight,
                zIndex: leftZIndex,
                borderRadius: borderRadius
              }}
            >
              <Image 
                src="/mark-davis-headshot.png" 
                alt="Mark Davis" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />
              
              {/* Text Overlay for Phase 3 */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Real Estate Advisor</span>
                <h2 className="font-aiveritas text-5xl text-white mb-6">Mark Davis</h2>
                <p className="text-white/70 text-center max-w-md font-light mb-10 leading-relaxed">
                  An award-winning powerhouse driving high-yield investments and exceptional real estate experiences across Tampa Bay's commercial and residential markets.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                  View Mark's Portfolio <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image (Rachael) */}
            <motion.div 
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group cursor-pointer shadow-2xl"
              style={{
                left: rightLeft,
                width: rightWidth,
                height: rightHeight,
                zIndex: rightZIndex,
                borderRadius: borderRadius
              }}
            >
              <Image 
                src="/rachael-garnett-headshot.png" 
                alt="Rachael Garnett" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-500" />
              
              {/* Text Overlay for Phase 3 */}
              <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Real Estate Advisor</span>
                <h2 className="font-aiveritas text-5xl text-white mb-6">Rachael Garnett</h2>
                <p className="text-white/70 text-center max-w-md font-light mb-10 leading-relaxed">
                  Delivering unparalleled luxury service. Curating exceptional lifestyles and executing elite residential and commercial transactions with precision.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                  View Rachael's Portfolio <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

          </div>
        </section>
      )}

      {/* ── THE DUAL ADVANTAGE (SERVICES GRID) ── */}
      <section className="relative z-10 py-32 px-8 bg-[#050505] border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Unmatched Expertise</span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-white">The Dual Advantage</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Commercial */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
              <Image src="/mark-commercial-action.png" alt="Commercial" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="font-aiveritas text-3xl text-white mb-3 drop-shadow-lg">Commercial Acquisitions</h3>
                <p className="text-white/80 font-light max-w-sm mb-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Strategic property placement, multi-family investments, and high-yield commercial assets across Tampa Bay.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                  Explore Commercial <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>

            {/* Residential */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
              <Image src="/rachael-residential-action.png" alt="Residential" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="font-aiveritas text-3xl text-white mb-3 drop-shadow-lg">Luxury Residential</h3>
                <p className="text-white/80 font-light max-w-sm mb-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Curating exceptional neighborhood lifestyles and elevating the home buying and selling experience.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                  Explore Residential <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. STARK STATS / TRUST SIGNALS ── */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-aiveritas text-[#D4AF37]">$250M+</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Career Volume</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-aiveritas text-[#D4AF37]">20+</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Years Experience</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-aiveritas text-[#D4AF37]">5.0</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Client Rating</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-aiveritas text-[#D4AF37]">100%</span>
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Local Expertise</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. REAL ESTATE PORTFOLIO (SPILL OUT) ── */}
      <FeaturedPortfolioSpillOut />

      {/* ── 3. CLIENT SUCCESS / TESTIMONIALS ── */}
      <section className="py-32 px-8 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
            <div>
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Trusted Excellence</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-white mb-6">Uncompromising Results.</h2>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                Our commitment to our clients goes beyond the transaction. We build lasting partnerships through transparency, market intelligence, and relentless execution across Tampa Bay.
              </p>
              <Link href="#" className="btn btn-outline-light inline-flex">
                Read All Reviews
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between rounded-xl">
                <div>
                  <div className="flex gap-1 text-[#D4AF37] mb-6">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-white/80 font-light italic mb-8 leading-relaxed">
                    "Mark navigated our multi-family acquisition with absolute precision. His insight into the South Tampa market is unmatched. A true professional."
                  </p>
                </div>
                <div>
                  <strong className="text-white block font-serif text-lg">James T.</strong>
                  <span className="text-white/40 text-xs uppercase tracking-wider">Commercial Investor</span>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between rounded-xl translate-y-0 sm:translate-y-8">
                <div>
                  <div className="flex gap-1 text-[#D4AF37] mb-6">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-white/80 font-light italic mb-8 leading-relaxed">
                    "Rachael made finding our waterfront dream home effortless. Her curation of properties and negotiation skills secured our perfect estate in St. Pete."
                  </p>
                </div>
                <div>
                  <strong className="text-white block font-serif text-lg">Sarah & Michael L.</strong>
                  <span className="text-white/40 text-xs uppercase tracking-wider">Luxury Homebuyers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MARKET INSIGHTS / KNOWLEDGE HUB ── */}
      <section className="py-32 px-8 bg-[#050505]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Market Intelligence</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-white">The Tampa Bay Hub</h2>
            </div>
            <Link href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/70 hover:text-white transition-colors">
              Access The Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <Link href="/article-mockup" className="group">
              <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/5 rounded-xl">
                <Image src="/youtube_skyscraper_banner_1787607984987.png" alt="Commercial Forecast" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] font-bold border border-white/10 rounded-sm">Commercial</div>
              </div>
              <h3 className="font-aiveritas text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">2026 Tampa Bay Commercial Real Estate Forecast</h3>
              <p className="text-white/60 font-light text-sm line-clamp-2">An in-depth analysis of emerging industrial and multi-family trends shaping the Gulf Coast investment landscape.</p>
            </Link>

            {/* Article 2 */}
            <Link href="/article-mockup" className="group">
              <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/5 rounded-xl">
                <Image src="/res_luxury_condo_1787632822869.png" alt="Luxury Market" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] font-bold border border-white/10 rounded-sm">Residential</div>
              </div>
              <h3 className="font-aiveritas text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">Navigating Luxury Waterfront Purchases</h3>
              <p className="text-white/60 font-light text-sm line-clamp-2">Essential strategies for securing prime waterfront estates in a highly competitive luxury market.</p>
            </Link>

            {/* Article 3 */}
            <Link href="/article-mockup" className="group">
              <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center rounded-xl">
                <Image src="/team_commercial_banner_1787599029260.png" alt="Video Podcast" fill className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
                <PlayCircle className="w-12 h-12 text-white relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
              <h3 className="font-aiveritas text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">Video: Q3 Investment Strategies</h3>
              <p className="text-white/60 font-light text-sm line-clamp-2">Mark and Rachael discuss synergistic opportunities across their combined portfolios.</p>
            </Link>

            {/* Article 4 */}
            <Link href="/article-mockup" className="group">
              <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/5 rounded-xl">
                <Image src="/com_office_tower_1787632874122.png" alt="Downtown Office Trends" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] font-bold border border-white/10 rounded-sm">Commercial</div>
              </div>
              <h3 className="font-aiveritas text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">The Return to Class-A Offices</h3>
              <p className="text-white/60 font-light text-sm line-clamp-2">Why institutional investors are doubling down on downtown Tampa's premium office spaces.</p>
            </Link>

            {/* Article 5 */}
            <Link href="/article-mockup" className="group">
              <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/5 rounded-xl">
                <Image src="/res_golf_course_home_1787632854609.png" alt="Golf Course Communities" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] font-bold border border-white/10 rounded-sm">Residential</div>
              </div>
              <h3 className="font-aiveritas text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">Exclusive Golf Communities</h3>
              <p className="text-white/60 font-light text-sm line-clamp-2">A deep dive into the most sought-after gated golf communities in the Greater Tampa region.</p>
            </Link>

            {/* Article 6 */}
            <Link href="/article-mockup" className="group">
              <div className="relative aspect-video mb-6 overflow-hidden bg-white/5 border border-white/5 rounded-xl">
                <Image src="/land_commercial_development_1787632926636.png" alt="Land Development" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] font-bold border border-white/10 rounded-sm">Development</div>
              </div>
              <h3 className="font-aiveritas text-2xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors">I-4 Corridor Expansion Opportunities</h3>
              <p className="text-white/60 font-light text-sm line-clamp-2">Analyzing the remaining high-value land plots available for large-scale industrial development.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. LOCAL PRESENCE & GEO-TARGETING ── */}
      <section className="py-24 px-8 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 aspect-square relative rounded-full overflow-hidden border-8 border-black shadow-2xl shrink-0">
             <Image src="/media__1787596947905.jpg" alt="Tampa Bay Area" fill className="object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-1000" />
             <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-aiveritas text-4xl text-white mb-6">Dominating Tampa Bay.</h2>
            <p className="text-white/60 font-light max-w-2xl leading-relaxed mb-8 mx-auto md:mx-0">
              Our footprint spans the most lucrative and desirable markets in the region. We provide hyper-local expertise, global reach, and a unified approach to real estate across the Gulf Coast.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div className="flex flex-col items-center md:items-start gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white font-bold text-sm tracking-wider uppercase">Tampa</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white font-bold text-sm tracking-wider uppercase">St. Pete</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white font-bold text-sm tracking-wider uppercase">Clearwater</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white font-bold text-sm tracking-wider uppercase">Sarasota</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className="relative py-40 px-8 bg-black overflow-hidden flex items-center justify-center text-center border-t border-[#D4AF37]/20">
        <div className="absolute inset-0 z-0">
          <Image src="/media__1787608237847.jpg" alt="Luxury Real Estate" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/40" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-8 border border-[#D4AF37]/30 backdrop-blur-sm">
            <Building className="w-6 h-6 text-[#D4AF37]" />
          </span>
          <h2 className="font-aiveritas text-5xl md:text-6xl text-white mb-8 drop-shadow-lg">Command Your Real Estate Future</h2>
          <p className="text-white/80 text-lg font-light mb-12 max-w-xl mx-auto drop-shadow">
            Ready to secure high-yield assets or discover your ultimate dream home? Partner with Tampa Bay's elite syndicate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="#" className="btn btn-primary btn-lg w-full sm:w-auto min-w-[240px]">
              Contact Mark (Commercial)
            </Link>
            <Link href="#" className="btn btn-outline-light btn-lg w-full sm:w-auto min-w-[240px] bg-black/40 backdrop-blur-md">
              Contact Rachael (Residential)
            </Link>
          </div>
        </div>
      </section>

      {/* ── REAL WEBSITE FOOTER ── */}
      <footer className="py-20 px-8 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <DavisGarnettLogo variant="dark" className="w-64 max-w-full mb-8" />
            <p className="text-white/50 font-light max-w-sm leading-relaxed mb-8">
              Tampa Bay's premier real estate syndicate. Combining commercial gravity with unmatched residential finesse.
            </p>
            <div className="w-32 h-8 relative opacity-40 grayscale">
              <Image src="/align-right-realty-logo.webp" alt="Align Right" fill className="object-contain object-left" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-aiveritas text-lg mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4 text-white/50 text-sm">
              <li><Link href="#" className="hover:text-[#D4AF37]">Home</Link></li>
              <li><Link href="#" className="hover:text-[#D4AF37]">Commercial</Link></li>
              <li><Link href="#" className="hover:text-[#D4AF37]">Residential</Link></li>
              <li><Link href="#" className="hover:text-[#D4AF37]">About The Team</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-aiveritas text-lg mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-white/50 text-sm">
              <li>Mark Davis: (941) 737-4127</li>
              <li>Rachael Garnett: (727) 808-3344</li>
              <li>info@davisgarnett.com</li>
              <li>Tampa Bay, FL</li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[0.6rem] uppercase tracking-widest text-white/30">
          <p>© {new Date().getFullYear()} Davis & Garnett. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

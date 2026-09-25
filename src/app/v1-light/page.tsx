"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, PlayCircle, ChevronDown, MessageCircleQuestion, Camera, Heart, MessageCircle } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import PropertiesStickyStack from "@/components/PropertiesStickyStack";
import ProposalNav from "@/components/ProposalNav";
import BackgroundVideo from "@/components/BackgroundVideo";

export default function PreviewV1Light() {
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

  // Left Image (Mark)
  const leftLeft   = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["50%", "50%", "17%", "17%", "25%", "25%"]);
  const leftWidth  = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const leftHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const leftZIndex = useTransform(scrollYProgress, [0, 0.29, 0.3, 1], [0, 0, 20, 20]);
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.4], ["1rem", "0rem"]);

  // Right Image (Rachael)
  const rightLeft   = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["50%", "50%", "83%", "83%", "75%", "75%"]);
  const rightWidth  = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const rightHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const rightZIndex = useTransform(scrollYProgress, [0, 0.29, 0.3, 1], [0, 0, 20, 20]);

  const centerScale = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0.8]);

  // Text over full-screen photo panels — white text is correct
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const textY       = useTransform(scrollYProgress, [0.5, 0.6, 1], [40, 0, 0]);

  // Initial side text — sits on light background
  const initialTextOpacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);

  return (
    <div className="min-h-screen text-[#111] bg-white selection:bg-[#D4AF37] selection:text-white font-sans">

      <ProposalNav />

      {/* ── HERO (video grid — dark overlay stays, white text over it) ── */}
      <section className="relative w-full h-screen flex items-center justify-center pt-16 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0 flex w-full h-full">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="relative flex-1 h-full border-r border-white/5 last:border-r-0 overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none" />
              <BackgroundVideo
                src={`/hero-videos-homepage/davis-garnett-hero-video-${num}.mp4`}
                className="absolute inset-0 w-full h-full scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        <div className="relative z-20 text-center px-8 flex flex-col items-center w-full max-w-4xl mx-auto pt-16">
          {/* Dark logo variant reads on dark background */}
          <DavisGarnettLogo variant="dark" className="w-[90%] md:w-[70%] max-w-[700px] mx-auto mb-4 drop-shadow-2xl" />
          <h1 className="font-aiveritas text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-tight text-white drop-shadow-2xl">
            The Tampa <br />
            <span className="text-[#D4AF37]">Standard.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed mb-10 drop-shadow-lg">
            A unified force in Tampa Bay real estate. Combining commercial and residential power to deliver an elevated advisory experience.
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-80 z-20 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#D4AF37]">Scroll to Discover</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </div>
      </section>


      {/* ── TAMPA TEAM REVEAL ── */}
      {isMobile ? (

        <section className="py-24 px-6 bg-white">
          <div className="text-center mb-16">
            <span className="text-[#9A7D3A] text-[0.65rem] tracking-[0.2em] uppercase font-bold block mb-4">The Advisors</span>
            <h2 className="font-aiveritas text-4xl text-[#111]">Your Power Combo.</h2>
          </div>
          <div className="flex flex-col gap-12">
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/mark-commercial-action-2.jpg" alt="Mark Davis" fill className="object-cover" />
              </div>
              <h3 className="font-aiveritas text-2xl text-[#111] mb-1">Mark Davis</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Commercial Expert</p>
              <button className="w-full py-4 border border-[#111]/20 text-[#111] text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors">
                Connect With Mark
              </button>
            </div>
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/rachael-residential-action-2.jpg" alt="Rachael Garnett" fill className="object-cover" />
              </div>
              <h3 className="font-aiveritas text-2xl text-[#111] mb-1">Rachael Garnett</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4">Residential Specialist</p>
              <button className="w-full py-4 border border-[#111]/20 text-[#111] text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors">
                Connect With Rachael
              </button>
            </div>
          </div>
        </section>

      ) : (

        <section ref={containerRef} className="relative w-full h-[800vh] bg-[#f5f3ef]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">

            {/* Center Image */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-2xl overflow-hidden shadow-2xl"
              style={{ width: "30vw", height: "75vh", scale: centerScale }}
            >
              <Image src="/davis-garnett-real-combo.png" alt="Davis & Garnett Team" fill className="object-cover object-top" />
              {/* Dark gradient at base so text is legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="font-aiveritas text-3xl text-white drop-shadow-md mb-2">The Power Combo</h3>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Tampa Bay Real Estate</p>
              </div>
            </motion.div>

            {/* Initial Text (Left) — on light background, dark text */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ left: "17%", x: "-50%", opacity: initialTextOpacity }}
            >
              <h3 className="font-aiveritas text-5xl font-bold text-[#D4AF37] mb-4">Two Powerhouses</h3>
              <p className="text-[#111]/60 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Combining decades of award-winning expertise in Tampa Bay real estate.
              </p>
            </motion.div>

            {/* Initial Text (Right) — on light background, dark text */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ left: "83%", x: "-50%", opacity: initialTextOpacity }}
            >
              <h3 className="font-aiveritas text-5xl font-bold text-[#D4AF37] mb-4">One Unified Force</h3>
              <p className="text-[#111]/60 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Unmatched strategic service across both commercial and residential markets.
              </p>
            </motion.div>

            {/* Left Image (Mark) — full-screen panel with dark overlay → white text correct */}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group cursor-pointer shadow-2xl"
              style={{ left: leftLeft, width: leftWidth, height: leftHeight, zIndex: leftZIndex, borderRadius }}
            >
              <Image src="/mark-commercial-action-2.jpg" alt="Mark Davis" fill className="object-cover" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Real Estate Advisor</span>
                <h2 className="font-aiveritas text-5xl text-white mb-6">Mark Davis</h2>
                <p className="text-white/70 text-center max-w-md font-light mb-10 leading-relaxed">
                  An award-winning powerhouse driving high-yield investments and exceptional real estate experiences across Tampa Bay's commercial and residential markets.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors">
                  View Mark's Portfolio <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image (Rachael) */}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group cursor-pointer shadow-2xl"
              style={{ left: rightLeft, width: rightWidth, height: rightHeight, zIndex: rightZIndex, borderRadius }}
            >
              <Image src="/rachael-residential-action-2.jpg" alt="Rachael Garnett" fill className="object-cover" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Real Estate Advisor</span>
                <h2 className="font-aiveritas text-5xl text-white mb-6">Rachael Garnett</h2>
                <p className="text-white/70 text-center max-w-md font-light mb-10 leading-relaxed">
                  Delivering unparalleled luxury service. Curating exceptional lifestyles and executing elite residential and commercial transactions with precision.
                </p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors">
                  View Rachael's Portfolio <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>

          </div>
        </section>
      )}


      {/* ── THE DUAL ADVANTAGE — light section bg, images keep dark overlays for white text ── */}
      <section className="relative z-10 py-32 px-8 bg-white border-t border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Unmatched Expertise</span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111]">The Dual Advantage</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Commercial — image with dark overlay, white text over photo */}
            <div className="group relative min-h-[400px] md:min-h-0 md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
              <Image src="/vert_tampa_commercial.png" alt="Commercial" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-aiveritas text-3xl text-white mb-3 drop-shadow-lg">Commercial Acquisitions</h3>
                <p className="text-white/80 font-light max-w-sm mb-6 opacity-100 md:opacity-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Strategic property placement, multi-family investments, and high-yield commercial assets across Tampa Bay.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                  Explore Commercial <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
            {/* Residential */}
            <div className="group relative min-h-[400px] md:min-h-0 md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
              <Image src="/vert_tampa_residential.png" alt="Residential" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-aiveritas text-3xl text-white mb-3 drop-shadow-lg">Luxury Residential</h3>
                <p className="text-white/80 font-light max-w-sm mb-6 opacity-100 md:opacity-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
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


      {/* ── STATS — light bg, dark text ── */}
      <section className="py-24 px-8 bg-[#f5f3ef]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[#111]/10 text-center">
            {[
              { stat: "$250M+", label: "Career Volume" },
              { stat: "20+",    label: "Years Experience" },
              { stat: "5.0",    label: "Client Rating" },
              { stat: "100%",   label: "Local Expertise" },
            ].map(({ stat, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-aiveritas text-[#D4AF37]">{stat}</span>
                <span className="text-xs uppercase tracking-widest text-[#111]/50 font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── PORTFOLIO SPILL OUT ── */}
      <section className="bg-[#f5f3ef]">
        <PropertiesStickyStack />
      </section>
      <div className="h-[10vh] bg-[#f5f3ef] pointer-events-none" />


      {/* ── TESTIMONIALS — light bg, dark text on cards ── */}
      <section className="py-32 px-8 bg-white border-y border-[#111]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Trusted Excellence</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">Uncompromising Results.</h2>
              <p className="text-[#111]/60 font-light leading-relaxed mb-8">
                Our commitment to our clients goes beyond the transaction. We build lasting partnerships through transparency, market intelligence, and relentless execution across Tampa Bay.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 border border-[#111]/30 text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors">
                Read All Reviews
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  quote: "\"Mark navigated our multi-family acquisition with absolute precision. His insight into the South Tampa market is unmatched. A true professional.\"",
                  name: "James T.",
                  role: "Commercial Investor",
                  offset: ""
                },
                {
                  quote: "\"Rachael made finding our waterfront dream home effortless. Her curation of properties and negotiation skills secured our perfect estate in St. Pete.\"",
                  name: "Sarah & Michael L.",
                  role: "Luxury Homebuyers",
                  offset: "sm:translate-y-8"
                }
              ].map(({ quote, name, role, offset }) => (
                <div key={name} className={`bg-[#f5f3ef] border border-[#111]/8 p-8 flex flex-col justify-between rounded-xl ${offset}`}>
                  <div>
                    <div className="flex gap-1 text-[#D4AF37] mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-[#111]/80 font-light italic mb-8 leading-relaxed">{quote}</p>
                  </div>
                  <div>
                    <strong className="text-[#111] block font-serif text-lg">{name}</strong>
                    <span className="text-[#111]/40 text-xs uppercase tracking-wider">{role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── FAQ — white bg, dark text ── */}
      <section className="py-32 px-8 bg-white relative overflow-hidden" id="faq">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Expert Answers</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">Tampa Bay Real Estate Q&A</h2>
              <p className="text-[#111]/60 font-light leading-relaxed mb-8">
                Get direct answers from our team on the most commonly asked questions about buying, selling, and investing in Tampa Bay real estate.
              </p>
              <div className="flex items-center gap-3 text-[#111]/40 text-xs uppercase tracking-widest">
                <MessageCircleQuestion className="w-5 h-5 text-[#D4AF37]" />
                <span>Powered by local expertise</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { q: "What is the current state of the Tampa Bay real estate market in 2026?", a: "The Tampa Bay real estate market in 2026 continues to show resilience with strong demand across both residential and commercial sectors. Median home prices in the Tampa-St. Petersburg-Clearwater MSA have appreciated approximately 8% year-over-year, while commercial cap rates remain compressed at 4.5–5.5% for Class A assets. Population growth, favorable tax policy, and infrastructure investment continue to drive long-term fundamentals." },
                { q: "Is Tampa Bay a good place to invest in commercial real estate?", a: "Tampa Bay is one of the top commercial real estate investment markets in the Southeast United States. The region benefits from a diversified economic base spanning finance, healthcare, logistics, and tech. Port Tampa Bay expansion, the I-4 corridor logistics boom, and billions in downtown redevelopment make it exceptionally attractive for institutional and private investors alike. Industrial, multi-family, and mixed-use assets are performing particularly well." },
                { q: "What are the best neighborhoods to buy luxury homes in Tampa?", a: "The most sought-after luxury neighborhoods in Tampa include Davis Islands, Bayshore Boulevard, Hyde Park, Beach Park, Harbour Island, and the Westshore Marina District. For waterfront estates, Davis Islands and Bayshore Boulevard command the highest premiums. Avila and Palma Ceia are preferred by families seeking gated privacy with proximity to top-rated schools." },
                { q: "How do Davis & Garnett handle both commercial and residential transactions?", a: "Davis & Garnett operates as a unified real estate advisory group with two specialized divisions. Mark Davis leads commercial acquisitions and investment strategy, focusing on multi-family, industrial, office, and development-site transactions. Rachael Garnett directs luxury residential operations, specializing in waterfront estates, new construction, and high-net-worth relocations." },
                { q: "What is the average price per square foot for luxury homes in Tampa Bay?", a: "As of 2026, luxury homes in Tampa Bay's most desirable neighborhoods average between $650–$1,200 per square foot, depending on waterfront access, construction quality, and location. Bayshore Boulevard and Davis Islands waterfront properties regularly exceed $1,000/sqft." },
                { q: "What commercial property types are most in-demand in Tampa Bay?", a: "Industrial and logistics properties lead demand in Tampa Bay's commercial market, driven by e-commerce growth and Port Tampa Bay's expanding trade capacity. Multi-family housing remains highly sought after due to population influx and rental demand. Class A office space in the Water Street and downtown corridors is experiencing renewed interest." },
                { q: "Do I need a real estate agent to buy property in Florida?", a: "While not legally required, working with a licensed and experienced real estate agent in Florida is strongly recommended—especially in competitive luxury and commercial markets. An expert agent provides access to off-market listings, negotiation leverage, due diligence management, and local market intelligence that can save buyers hundreds of thousands of dollars." },
              ].map((item, i) => (
                <details key={i} className="group bg-[#f5f3ef] border border-[#111]/8 rounded-xl overflow-hidden transition-colors hover:border-[#D4AF37]/50">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none select-none">
                    <h3 className="font-bold text-[#111] text-base md:text-lg pr-8 leading-snug">{item.q}</h3>
                    <ChevronDown className="w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-2">
                    <p className="text-[#111]/70 font-light leading-relaxed text-sm md:text-base">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── MARKET HUB — white bg, dark text, images stay crisp ── */}
      <section className="py-32 px-8 bg-[#f5f3ef]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Market Intelligence</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111]">The Tampa Bay Hub</h2>
            </div>
            <Link href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#111]/60 hover:text-[#111] transition-colors">
              Access The Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/com_office_tower_1787632874122.png",        tag: "Commercial",  title: "2026 Tampa Bay Commercial Real Estate Forecast",       desc: "An in-depth analysis of emerging industrial and multi-family trends shaping the Gulf Coast investment landscape." },
              { img: "/res_luxury_condo_1787632822869.png",        tag: "Residential", title: "Navigating Luxury Waterfront Purchases",                desc: "Essential strategies for securing prime waterfront estates in a highly competitive luxury market." },
              { img: null,                                          tag: "Video",       title: "Video: Q3 Investment Strategies",                       desc: "Mark and Rachael discuss synergistic opportunities across their combined portfolios." },
              { img: "/com_office_tower_1787632874122.png",        tag: "Commercial",  title: "The Return to Class-A Offices",                         desc: "Why institutional investors are doubling down on downtown Tampa's premium office spaces." },
              { img: "/res_golf_course_home_1787632854609.png",    tag: "Residential", title: "Exclusive Golf Communities",                            desc: "A deep dive into the most sought-after gated golf communities in the Greater Tampa region." },
              { img: "/land_commercial_development_1787632926636.png", tag: "Development", title: "I-4 Corridor Expansion Opportunities",              desc: "Analyzing the remaining high-value land plots available for large-scale industrial development." },
            ].map((article, i) => (
              <Link key={i} href="/article-mockup" className="group">
                <div className="relative aspect-video mb-6 overflow-hidden bg-[#ddd] border border-[#111]/5 rounded-xl">
                  {article.img ? (
                    <Image src={article.img} alt={article.title} fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <>
                      <BackgroundVideo src="/hero-videos-homepage/davis-garnett-hero-video-1.mp4" className="absolute inset-0 w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      <PlayCircle className="w-12 h-12 text-white relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#9A7D3A] font-bold border border-[#111]/10 rounded-sm">
                    {article.tag}
                  </div>
                </div>
                <h3 className="font-aiveritas text-2xl text-[#111] mb-3 group-hover:text-[#D4AF37] transition-colors">{article.title}</h3>
                <p className="text-[#111]/60 font-light text-sm line-clamp-2">{article.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ── LOCAL PRESENCE — light bg, city cards keep dark overlays ── */}
      <section className="py-24 px-8 bg-white border-t border-[#111]/5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 aspect-square relative rounded-full overflow-hidden border-4 border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] shrink-0 transition-shadow duration-700 hover:shadow-[0_0_60px_rgba(212,175,55,0.35)]">
            <BackgroundVideo src="/hero-videos-homepage/davis-garnett-hero-video-2.mp4" className="absolute inset-0 w-full h-full scale-105 opacity-90 hover:opacity-100 transition-opacity duration-1000" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Davis & Garnett</span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">Dominating Tampa Bay.</h2>
            <p className="text-[#111]/60 font-light max-w-2xl leading-relaxed mb-8 mx-auto md:mx-0">
              Our footprint spans the most lucrative and desirable markets in the region. We provide hyper-local expertise, global reach, and a unified approach to real estate across the Gulf Coast.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-[#111]/10 mt-8">
              {[
                { img: "/city_tampa_1787662311501.png",     label: "Tampa",      href: "/locations/st-pete" },
                { img: "/city_st_pete_1787662322779.png",   label: "St. Pete",   href: "/locations/st-pete" },
                { img: "/city_clearwater_1787662333626.png", label: "Clearwater", href: "/locations/st-pete" },
                { img: "/city_sarasota_1787662344268.png",  label: "Sarasota",   href: "/locations/st-pete" },
              ].map(({ img, label, href }) => (
                <Link key={label} href={href} className="group relative aspect-video rounded-xl overflow-hidden shadow-md border border-[#111]/10 hover:border-[#D4AF37]/50 transition-colors">
                  <Image src={img} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Dark overlay so label is readable on any city photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-1 group-hover:text-[#D4AF37] transition-colors">
                      {label} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── ADVISORY CTA — full-bleed photo, dark overlay, white text ── */}
      <section className="relative py-32 px-8 overflow-hidden border-t border-[#D4AF37]/20">
        <div className="absolute inset-0 z-0">
          <Image src="/davis-garnett-coming-soon-2.jpg" alt="Advisory Team" fill className="object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-6">Strategic Advisory</span>
          <h2 className="font-aiveritas text-4xl md:text-5xl text-white mb-8 leading-tight">
            Strategic. Precise. Uncompromising.
          </h2>
          <p className="text-white/75 text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether navigating complex commercial acquisitions or securing legacy waterfront estates, our advisory group operates with absolute precision and market dominance. Schedule a private consultation to discuss your real estate portfolio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="#" className="px-8 py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg w-full sm:w-auto min-w-[240px]">
              Commercial Consultation
            </Link>
            <Link href="#" className="px-8 py-4 bg-transparent border border-white/40 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-white hover:text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg w-full sm:w-auto min-w-[240px]">
              Residential Consultation
            </Link>
          </div>
        </div>
      </section>


      {/* ── INSTAGRAM GRID ── */}
      <section className="bg-[#f5f3ef] pt-32 pb-0 border-t border-[#D4AF37]/20">
        <div className="max-w-screen-xl mx-auto px-8 text-center mb-16">
          <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 mb-4">
            <Camera className="w-4 h-4 text-[#D4AF37]" /> Connect With Us
          </span>
          <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">@DavisGarnett</h2>
          <p className="text-[#111]/60 text-lg font-light max-w-xl mx-auto">
            Follow our latest luxury listings, commercial acquisitions, and market insights across the Tampa Bay area.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-0">
          {[
            "/res_waterfront_estate_1787632802890.png",
            "/com_office_tower_1787632874122.png",
            "/res_modern_mansion_1787632812473.png",
            "/com_luxury_retail_1787632885082.png",
            "/res_luxury_condo_1787632822869.png",
            "/land_commercial_development_1787632926636.png",
            "/res_historic_estate_1787632833084.png",
            "/com_multi_family_1787632895059.png"
          ].map((imgSrc, idx) => (
            <Link key={idx} href="#" className="group relative aspect-square w-full overflow-hidden block bg-[#111]">
              <Image src={imgSrc} alt="Instagram Post" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Heart className="w-6 h-6 fill-white" />
                  <span>{((idx + 1) * 137) % 400 + 150}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold">
                  <MessageCircle className="w-6 h-6 fill-white" />
                  <span>{((idx + 1) * 47) % 50 + 12}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* ── FOOTER — dark background, white text throughout ── */}
      <footer className="relative py-24 px-8 bg-[#0c0b09] border-t border-[#D4AF37]/20 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        <div className="relative z-10 max-w-screen-xl mx-auto">

          {/* Mission statement */}
          <div className="text-center border-b border-white/10 pb-16 pt-8 mb-16">
            <p className="text-white/60 font-light text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              Tampa Bay's premier real estate group. Combining commercial and residential power.
            </p>
          </div>

          {/* 4-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center text-center mb-20">
            {/* D&G Logo — dark variant reads on dark bg */}
            <div className="flex justify-center">
              <div className="w-56 h-16 relative">
                <DavisGarnettLogo variant="dark" className="w-full h-full object-contain opacity-90" />
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/listing/commercial" className="text-white/60 text-xs font-medium uppercase tracking-widest hover:text-white transition-colors duration-300">
                Commercial Listing
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/listing/residential" className="text-white/60 text-xs font-medium uppercase tracking-widest hover:text-white transition-colors duration-300">
                Residential Listing
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-56 h-16 relative opacity-70">
                <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain invert" />
              </div>
            </div>
          </div>

          {/* Compliance & copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col items-center text-center">
            <p className="text-[0.6rem] uppercase tracking-widest text-white/25 max-w-4xl leading-relaxed mb-6">
              Davis & Garnett is a commercial and residential real estate advisory group brokered by Align Right Realty. All properties are subject to prior sale, change, or withdrawal. Neither listing broker(s) nor Davis & Garnett shall be responsible for any typographical errors, misinformation, or misprints and shall be held totally harmless. Equal Housing Opportunity.
            </p>
            <div className="w-full flex flex-col md:flex-row items-center justify-between text-[0.6rem] uppercase tracking-widest text-white/30">
              <p>© {new Date().getFullYear()} Davis & Garnett. All Rights Reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

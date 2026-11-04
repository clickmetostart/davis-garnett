"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Star,
  PlayCircle,
  ChevronDown,
  MessageCircleQuestion,
  Camera,
  Heart,
  MessageCircle,
  Building2,
  Compass,
  Search,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import PropertiesStickyStack from "@/components/PropertiesStickyStack";
import ProposalNav from "@/components/ProposalNav";
import BackgroundVideo from "@/components/BackgroundVideo";
import SiteFooter from "@/components/SiteFooter";
import ConsultationModal from "@/components/ConsultationModal";

export default function HomePageV1Light() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    interest: "General Real Estate Advisory",
    advisor: "Mark Davis & Rachael Garnett",
    title: "Schedule a Private Advisory Consultation",
  });
  const [mlsQuery, setMlsQuery] = useState("");
  const [mlsType, setMlsType] = useState("All");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openConsultation = (interest: string, advisor: string, title: string) => {
    setModalConfig({ interest, advisor, title });
    setModalOpen(true);
  };

  const handleMlsSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (mlsQuery.trim()) params.set("q", mlsQuery.trim());
    if (mlsType !== "All") params.set("type", mlsType);
    router.push(`/search-mls${params.toString() ? `?${params.toString()}` : ""}`);
  };

  // Left Image (Mark)
  const leftLeft = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["50%", "50%", "17%", "17%", "25%", "25%"]);
  const leftWidth = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const leftHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const leftZIndex = useTransform(scrollYProgress, [0, 0.29, 0.3, 1], [0, 0, 20, 20]);
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.4], ["1rem", "0rem"]);

  // Right Image (Rachael)
  const rightLeft = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["50%", "50%", "83%", "83%", "75%", "75%"]);
  const rightWidth = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const rightHeight = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const rightZIndex = useTransform(scrollYProgress, [0, 0.29, 0.3, 1], [0, 0, 20, 20]);

  const centerScale = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.6, 1], [40, 0, 0]);
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

        <div className="relative z-20 text-center px-8 flex flex-col items-center w-full max-w-4xl mx-auto pt-12">
          <DavisGarnettLogo variant="dark" className="w-[90%] md:w-[70%] max-w-[680px] mx-auto mb-4 drop-shadow-2xl" />
          <h1 className="font-aiveritas text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-tight text-white drop-shadow-2xl">
            The Tampa <br />
            <span className="text-[#D4AF37]">Standard.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl leading-relaxed mb-10 drop-shadow-lg">
            A unified force in Tampa Bay real estate. Combining commercial and residential power to deliver an elevated advisory experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/properties"
              className="px-8 py-4 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Exclusive Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/developments"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors w-full sm:w-auto"
            >
              Featured Developments
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-80 z-20 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#D4AF37]">Scroll to Discover</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── TAMPA TEAM REVEAL ── */}
      {isMobile ? (
        <section className="py-24 px-6 bg-white">
          <div className="text-center mb-16">
            <span className="text-[#9A7D3A] text-[0.65rem] tracking-[0.2em] uppercase font-bold block mb-4">The Art of the Deal • Two Powerhouses</span>
            <h2 className="font-aiveritas text-4xl text-[#111] mb-4">Your Power Combo.</h2>
            <p className="text-[#111]/65 text-sm font-light max-w-md mx-auto leading-relaxed">
              Working with Mark or Rachael individually or as a combined force gives you two powerhouses setting the gold standard across commercial, residential, land, condos, and luxury estates.
            </p>
          </div>
          <div className="flex flex-col gap-12">
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/mark-commercial-action-2.jpg" alt="Mark Davis" fill className="object-cover" />
              </div>
              <h3 className="font-aiveritas text-2xl text-[#111] mb-1">Mark Davis</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">Commercial &amp; Residential Advisor • FL Lic #3209459</p>
              <p className="text-[#111]/65 text-sm font-light mb-4 leading-relaxed">
                Advising across commercial, residential, land, condos, and luxury properties—with signature flair in deal structuring, mixed-use assets, and strategic land acquisitions.
              </p>
              <Link
                href="/about/mark-davis"
                className="block text-center w-full py-4 border border-[#111]/20 text-[#111] text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors"
              >
                View Mark&apos;s Profile &amp; Portfolio
              </Link>
            </div>
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/rachael-residential-action-2.jpg" alt="Rachael Garnett" fill className="object-cover" />
              </div>
              <h3 className="font-aiveritas text-2xl text-[#111] mb-1">Rachael Garnett</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">Commercial &amp; Residential Advisor • FL Lic #3378601</p>
              <p className="text-[#111]/65 text-sm font-light mb-4 leading-relaxed">
                Advising across commercial, residential, land, condos, and luxury estates—with signature flair in high-impact positioning, waterfront properties, and master-planned communities.
              </p>
              <Link
                href="/about/rachael-garnett"
                className="block text-center w-full py-4 border border-[#111]/20 text-[#111] text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors"
              >
                View Rachael&apos;s Profile &amp; Portfolio
              </Link>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center px-4">
                <h3 className="font-aiveritas text-3xl text-white drop-shadow-md mb-2">The Power Combo</h3>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest">Commercial &amp; Residential Advisors</p>
              </div>
            </motion.div>

            {/* Initial Text (Left) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ left: "17%", x: "-50%", opacity: initialTextOpacity }}
            >
              <h3 className="font-aiveritas text-5xl font-bold text-[#D4AF37] mb-4">Two Powerhouses</h3>
              <p className="text-[#111]/65 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Working with Mark or Rachael individually or as a combo delivers the gold standard in customer service and the art of the deal.
              </p>
            </motion.div>

            {/* Initial Text (Right) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ left: "83%", x: "-50%", opacity: initialTextOpacity }}
            >
              <h3 className="font-aiveritas text-5xl font-bold text-[#D4AF37] mb-4">One Unified Force</h3>
              <p className="text-[#111]/65 text-sm font-light leading-relaxed max-w-xs mx-auto">
                Commercial or residential, big or small, land or condo—we treat every listing like it is hot, new, and demands relentless attention.
              </p>
            </motion.div>

            {/* Left Image (Mark) */}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group cursor-pointer shadow-2xl"
              style={{ left: leftLeft, width: leftWidth, height: leftHeight, zIndex: leftZIndex, borderRadius }}
            >
              <Image src="/mark-commercial-action-2.jpg" alt="Mark Davis" fill className="object-cover" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Commercial &amp; Residential Advisor • #3209459</span>
                <h2 className="font-aiveritas text-5xl text-white mb-6">Mark Davis</h2>
                <p className="text-white/80 text-center max-w-md font-light mb-10 leading-relaxed">
                  Selling across commercial, residential, land, condos, and luxury estates—bringing his personal flair for deal architecture, commercial mixed-use underwriting, and high-growth acreage across Tampa Bay.
                </p>
                <Link
                  href="/about/mark-davis"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                  View Mark&apos;s Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image (Rachael) */}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group cursor-pointer shadow-2xl"
              style={{ left: rightLeft, width: rightWidth, height: rightHeight, zIndex: rightZIndex, borderRadius }}
            >
              <Image src="/rachael-residential-action-2.jpg" alt="Rachael Garnett" fill className="object-cover" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-12 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4">Commercial &amp; Residential Advisor • #3378601</span>
                <h2 className="font-aiveritas text-5xl text-white mb-6">Rachael Garnett</h2>
                <p className="text-white/80 text-center max-w-md font-light mb-10 leading-relaxed">
                  Selling across commercial, residential, land, condos, and luxury waterfront—bringing her signature flair for bespoke property positioning, fierce contract negotiation, and white-glove client service.
                </p>
                <Link
                  href="/about/rachael-garnett"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors"
                >
                  View Rachael&apos;s Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── THE DUAL ADVANTAGE ── */}
      <section className="relative z-10 py-32 px-8 bg-white border-t border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Two Powerhouses • The Art of the Deal</span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-5">The Gold Standard in Real Estate Advising</h2>
            <p className="text-[#111]/65 font-light max-w-3xl mx-auto leading-relaxed">
              Both Mark Davis and Rachael Garnett advise across commercial, residential, land, condos, and luxury estates. Whether you work with them individually or as a combined force, you get two powerhouses who treat every listing like it is hot, new, needs attention, needs relentless servicing, and needs Davis &amp; Garnett.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/properties?category=Commercial"
              className="group relative min-h-[400px] md:min-h-0 md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer block"
            >
              <Image src="/vert_tampa_commercial.png" alt="Commercial" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-aiveritas text-3xl text-white mb-3 drop-shadow-lg">Commercial, Mixed-Use &amp; Land</h3>
                <p className="text-white/80 font-light max-w-sm mb-6 opacity-100 md:opacity-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Mixed-use buildings, commercial corridors, agricultural timberland, and development tracts across Tampa Bay &amp; Central Florida.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                  Explore Commercial &amp; Land <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>

            <Link
              href="/properties?category=Residential"
              className="group relative min-h-[400px] md:min-h-0 md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer block"
            >
              <Image src="/vert_tampa_residential.png" alt="Residential" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="font-aiveritas text-3xl text-white mb-3 drop-shadow-lg">Residential, Condos &amp; Luxury Estates</h3>
                <p className="text-white/80 font-light max-w-sm mb-6 opacity-100 md:opacity-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Custom waterfront estates, downtown luxury condos, golf course residences, and master-planned homes of every size.
                </p>
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                  Explore Residential &amp; Condos <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-8 bg-[#f5f3ef]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[#111]/10 text-center">
            {[
              { stat: "$250M+", label: "Combined Team Advisory" },
              { stat: "20+", label: "Years Experience" },
              { stat: "5.0", label: "Client Rating" },
              { stat: "100%", label: "Custom Representation" },
            ].map(({ stat, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-aiveritas text-[#D4AF37]">{stat}</span>
                <span className="text-xs uppercase tracking-widest text-[#111]/50 font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO SPILL OUT (ACTIVE EXCLUSIVES) ── */}
      <section className="bg-[#f5f3ef]">
        <PropertiesStickyStack />
      </section>
      <div className="h-[8vh] bg-[#f5f3ef] pointer-events-none" />

      {/* ── FEATURED DEVELOPMENTS & NEW CONSTRUCTION SPOTLIGHT ── */}
      <section className="py-32 px-8 bg-white border-t border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
                New Construction &amp; Pre-Construction
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-4">
                Featured Tampa Bay Developments
              </h2>
              <p className="text-[#111]/65 font-light max-w-2xl leading-relaxed">
                From sky-high waterfront condominiums on the Downtown Tampa Riverwalk and Bayshore Boulevard to resort-style master-planned communities in Wesley Chapel and Land O&apos; Lakes.
              </p>
            </div>
            <Link
              href="/developments"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition-colors shrink-0"
            >
              Explore All 9 Developments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            {/* Corridor 1: Downtown & Bayshore Luxury Condo Towers */}
            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/res_luxury_condo_1787632822869.png"
                  alt="Downtown Tampa & Bayshore Luxury Towers"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#111] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Urban Waterfront Skyscrapers
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-aiveritas text-3xl text-white mb-1">
                    Downtown Tampa, Water Street &amp; Bayshore Towers
                  </h3>
                  <p className="text-white/80 text-xs uppercase tracking-widest">
                    Five-Star Branded Residences • $850K – $7.8M+
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { name: "Pendry Residences Tampa", sub: "38-Story Riverwalk Hotel & Condos", slug: "pendry-residences-tampa" },
                    { name: "The Ritz-Carlton Residences", sub: "Bayshore Blvd Waterfront Towers", slug: "the-ritz-carlton-residences-bayshore" },
                    { name: "Water Street Phase 2 Tower", sub: "33-Story WELL-Certified District", slug: "water-street-tampa-phase-2" },
                    { name: "Hotel ORA + Private Residences", sub: "39-Story Short-Term Rental Approved", slug: "hotel-ora-private-residences" },
                  ].map((d) => (
                    <Link
                      key={d.slug}
                      href={`/developments/${d.slug}`}
                      className="p-4 bg-white rounded-xl border border-[#111]/8 hover:border-[#D4AF37] transition-colors group"
                    >
                      <div className="font-bold text-sm text-[#111] group-hover:text-[#9A7D3A] transition-colors flex items-center justify-between">
                        {d.name}
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </div>
                      <div className="text-xs text-[#111]/55 font-light mt-1">{d.sub}</div>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#111]/10">
                  <span className="text-xs text-[#111]/60">VIP Pre-Construction Floor Plans &amp; Allocation</span>
                  <Link href="/developments?corridor=Downtown" className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] flex items-center gap-1">
                    View Towers <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Corridor 2: North Tampa Master-Planned Communities */}
            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/res_golf_course_home_1787632854609.png"
                  alt="Wesley Chapel & Land O' Lakes Master-Planned Communities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#111] text-[#D4AF37] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> North Tampa Growth Corridor
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-aiveritas text-3xl text-white mb-1">
                    Wesley Chapel &amp; Land O&apos; Lakes Communities
                  </h3>
                  <p className="text-white/80 text-xs uppercase tracking-widest">
                    Crystal Lagoons, Surf Parks &amp; Wellness Cities • $360K – $1.6M+
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { name: "Two Rivers (Wesley Chapel)", sub: "3,400 Acres • Peak Surf Park & The Nest", slug: "two-rivers-wesley-chapel" },
                    { name: "Angeline (Land O' Lakes)", sub: "6,200 Acres • Moffitt Speros & Del Webb", slug: "angeline-land-o-lakes" },
                    { name: "Epperson & Mirada Lagoons", sub: "7.5 & 15-Acre Crystal Lagoon Living", slug: "epperson-mirada-lagoon-wesley-chapel" },
                    { name: "Connerton (Land O' Lakes)", sub: "4,800-Acre Nature Reserve & Estates", slug: "connerton-land-o-lakes" },
                  ].map((d) => (
                    <Link
                      key={d.slug}
                      href={`/developments/${d.slug}`}
                      className="p-4 bg-white rounded-xl border border-[#111]/8 hover:border-[#D4AF37] transition-colors group"
                    >
                      <div className="font-bold text-sm text-[#111] group-hover:text-[#9A7D3A] transition-colors flex items-center justify-between">
                        {d.name}
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </div>
                      <div className="text-xs text-[#111]/55 font-light mt-1">{d.sub}</div>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#111]/10">
                  <span className="text-xs text-[#111]/60">Builder Rate Buydowns &amp; Closing Credits</span>
                  <Link href="/developments?corridor=NorthTampa" className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] flex items-center gap-1">
                    View Communities <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH THE FULL TAMPA BAY MLS BANNER ── */}
      <section className="py-20 px-8 bg-[#111] text-white border-y border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold block mb-3">
              Full Regional MLS Discovery + Off-Market Access
            </span>
            <h2 className="font-aiveritas text-3xl md:text-4xl text-white mb-3">
              Looking Beyond Our Exclusive Portfolio?
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Search active listings across Hillsborough, Pinellas, Pasco, Polk, and Manatee counties—or request private access to off-market commercial and residential inventory.
            </p>
          </div>

          <form onSubmit={handleMlsSearch} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 bg-white/5 p-3 rounded-xl border border-white/15">
            <input
              type="text"
              value={mlsQuery}
              onChange={(e) => setMlsQuery(e.target.value)}
              placeholder="City, Zip, Neighborhood, or MLS#..."
              className="px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm min-w-[260px] focus:outline-none"
            />
            <select
              value={mlsType}
              onChange={(e) => setMlsType(e.target.value)}
              className="px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm focus:outline-none"
            >
              <option value="All">All Property Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land &amp; Acreage</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" /> Search MLS
            </button>
          </form>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-8 bg-white border-b border-[#111]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Trusted Excellence</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">Uncompromising Results.</h2>
              <p className="text-[#111]/60 font-light leading-relaxed mb-8">
                Our commitment to our clients goes beyond the transaction. We build lasting partnerships through transparency, market intelligence, and relentless execution across Tampa Bay.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#111]/30 text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors"
              >
                About Our Advisory Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  quote: "\"Mark navigated our commercial mixed-use and land acquisition with absolute precision. His insight into zoning and cash-flow fundamentals in Hillsborough County is unmatched.\"",
                  name: "James T.",
                  role: "Commercial & Land Investor",
                  offset: "",
                },
                {
                  quote: "\"Rachael made finding our waterfront dream home in St. Petersburg effortless. Her curation of properties and negotiation skill secured our ideal estate.\"",
                  name: "Sarah & Michael L.",
                  role: "Luxury Waterfront Homebuyers",
                  offset: "sm:translate-y-8",
                },
              ].map(({ quote, name, role, offset }) => (
                <div key={name} className={`bg-[#f5f3ef] border border-[#111]/8 p-8 flex flex-col justify-between rounded-xl ${offset}`}>
                  <div>
                    <div className="flex gap-1 text-[#D4AF37] mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
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

      {/* ── FAQ (AEO / GEO OPTIMIZED) ── */}
      <section className="py-32 px-8 bg-white relative overflow-hidden" id="faq">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Expert Answers</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">Tampa Bay Real Estate Q&amp;A</h2>
              <p className="text-[#111]/60 font-light leading-relaxed mb-8">
                Get direct answers from our team on the most commonly asked questions about buying, selling, and investing in Tampa Bay real estate.
              </p>
              <Link
                href="/knowledge-hub#questions"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] mb-6"
              >
                Explore All Q&amp;A in the Knowledge Hub <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-3 text-[#111]/40 text-xs uppercase tracking-widest">
                <MessageCircleQuestion className="w-5 h-5 text-[#D4AF37]" />
                <span>Powered by local expertise</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  q: "What is the current state of the Tampa Bay real estate market in 2026?",
                  a: "The Tampa Bay real estate market in 2026 continues to show strong resilience across both luxury residential and commercial sectors. Waterfront properties in St. Petersburg and South Tampa remain supply-constrained, master-planned communities in Wesley Chapel and Land O' Lakes are leading new home absorption, and commercial mixed-use and central Florida acreage tracts command strong investor interest.",
                },
                {
                  q: "What is the difference between HOA and CDD fees in Wesley Chapel and Land O' Lakes?",
                  a: "An HOA (Homeowners Association) fee pays for community governance, private rules enforcement, and common-area maintenance, billed monthly or quarterly. A CDD (Community Development District) fee repays the municipal infrastructure bonds used to build roads, utilities, Crystal Lagoons, and resort clubhouses in communities like Two Rivers, Angeline, and Epperson, and is collected directly on your annual county property tax bill.",
                },
                {
                  q: "Can I buy a house in Florida while selling my current home?",
                  a: "Yes. Homeowners frequently transition smoothly using home equity bridge loans, HELOCs, sale-leaseback post-occupancy agreements, or contingent purchase contracts. Davis & Garnett coordinates timing with strategic lending partners so you do not get stuck with double housing payments or temporary moves.",
                },
                {
                  q: "How does commercial mixed-use zoning work in Brandon and Hillsborough County?",
                  a: "Mixed-use properties—such as our active dual-building listing at 126 Ridgewood Ave in Brandon—allow owners to operate a professional commercial office in one structure while leasing or occupying a residential home on the same parcel, providing dual income streams, separate utility metering, and SBA 504 owner-user financing advantages.",
                },
                {
                  q: "How do Davis & Garnett represent buyers on new construction condos and master-planned homes?",
                  a: "Builders and condo developers have sales reps who represent the seller's best interest. When Mark Davis and Rachael Garnett represent you, our advisory service is paid by the builder at zero cost to you—while we negotiate lot premiums, interest rate buydowns, closing cost credits, and independent phase inspections.",
                },
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

        {/* Structured Data for AI Search Engines (GEO / AEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Davis & Garnett Real Estate Advisory",
              description:
                "Tampa Bay's premier commercial, land, and luxury residential real estate advisory group brokered by Align Right Realty Carrollwood.",
              url: "https://www.davisgarnettsells.com",
              telephone: ["813-486-9072", "727-254-0244"],
              email: "mark@davisgarnettsells.com",
              parentOrganization: {
                "@type": "RealEstateAgent",
                name: "Align Right Realty Carrollwood",
                identifier: "BK3401606",
              },
              employee: [
                {
                  "@type": "Person",
                  name: "Mark Davis",
                  jobTitle: "Commercial & Residential Advisor",
                  identifier: "FL License #3209459",
                  telephone: "813-486-9072",
                },
                {
                  "@type": "Person",
                  name: "Rachael Garnett",
                  jobTitle: "Commercial & Residential Advisor",
                  identifier: "FL License #3378601",
                  telephone: "727-254-0244",
                },
              ],
            }),
          }}
        />
      </section>

      {/* ── KNOWLEDGE HUB SPOTLIGHT ── */}
      <section className="py-32 px-8 bg-[#f5f3ef]">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
                Playbooks, Q&amp;A Classroom, Events &amp; Reports
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111]">
                Real Estate Knowledge Simplified
              </h2>
            </div>
            <Link
              href="/knowledge-hub"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#111] hover:text-[#9A7D3A] transition-colors"
            >
              Enter The Knowledge Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: "/res_waterfront_estate_1787632802890.png",
                tag: "Buyer Playbook",
                title: "The Tampa Bay Luxury Home Buyer's Playbook",
                desc: "Essential strategies for seawall inspections, dock permits, flood insurance, and securing waterfront estates.",
                href: "/knowledge-hub/tampa-bay-luxury-home-buying-guide",
              },
              {
                img: "/com_office_tower_1787632874122.png",
                tag: "Commercial Guide",
                title: "Commercial & Mixed-Use Investing in Central Florida",
                desc: "An executive guide to cap rates, 1031 exchanges, mixed-use zoning, and agricultural land banking.",
                href: "/knowledge-hub/commercial-real-estate-investing-florida",
              },
              {
                img: "/res_golf_course_home_1787632854609.png",
                tag: "Q&A Classroom",
                title: "Understanding CDD Fees vs. HOA in Pasco & Hillsborough",
                desc: "How Community Development District bonds work in Wesley Chapel and Land O' Lakes master-planned communities.",
                href: "/knowledge-hub/understanding-cdd-fees-in-pasco-and-hillsborough",
              },
              {
                img: "/res_luxury_condo_1787632822869.png",
                tag: "Market Report",
                title: "2026 Tampa Bay Real Estate Market Outlook",
                desc: "In-depth analysis of inventory, interest rates, and executive migration into Downtown Tampa and St. Pete.",
                href: "/knowledge-hub/articles/tampa-bay-real-estate-market-outlook-2026",
              },
              {
                img: "/res_modern_mansion_1787632812473.png",
                tag: "Relocation Guide",
                title: "The Executive Relocation Guide to Tampa Bay",
                desc: "Moving from New York, California, or the Midwest: Homestead tax exemptions, school districts, and neighborhoods.",
                href: "/knowledge-hub/relocating-to-tampa-bay-handbook",
              },
              {
                img: "/land_commercial_development_1787632926636.png",
                tag: "Land & Acreage",
                title: "Due Diligence When Buying Rural Acreage in Florida",
                desc: "What every investor must verify regarding A-1 zoning, wetlands, timber exemptions, and access easements.",
                href: "/knowledge-hub/what-due-diligence-is-needed-when-buying-acreage-in-central-florida",
              },
            ].map((article, i) => (
              <Link key={i} href={article.href} className="group bg-white rounded-2xl overflow-hidden border border-[#111]/8 hover:border-[#D4AF37] transition-all shadow-sm hover:shadow-xl flex flex-col">
                <div className="relative aspect-video overflow-hidden bg-[#ddd]">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#9A7D3A] font-bold border border-[#111]/10 rounded-sm">
                    {article.tag}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-aiveritas text-2xl text-[#111] mb-3 group-hover:text-[#9A7D3A] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[#111]/60 font-light text-sm line-clamp-2 mb-4">{article.desc}</p>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5">
                    Read Guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS WE WORK IN — LOCAL PRESENCE ── */}
      <section className="py-24 px-8 bg-white border-t border-[#111]/5">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/3 aspect-square max-w-[380px] relative rounded-full overflow-hidden border-4 border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] shrink-0">
            <BackgroundVideo
              src="/hero-videos-homepage/davis-garnett-hero-video-2.mp4"
              className="absolute inset-0 w-full h-full scale-105 opacity-90 hover:opacity-100 transition-opacity duration-1000"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Geolocated Market Intelligence
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-6">
              Areas We Work In.
            </h2>
            <p className="text-[#111]/60 font-light max-w-2xl leading-relaxed mb-8 mx-auto lg:mx-0">
              Our footprint spans the most lucrative residential waterfronts, suburban growth corridors, and commercial investment zones across Greater Tampa Bay and Central Florida.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#111]/10">
              {[
                { img: "/city_st_pete_1787662322779.png", label: "St. Petersburg", sub: "Bahama Shores & Snell Isle", href: "/knowledge-hub/areas/st-petersburg" },
                { img: "/city_tampa_1787662311501.png", label: "Downtown Tampa", sub: "Water Street & Bayshore", href: "/knowledge-hub/areas/tampa-downtown-water-street" },
                { img: "/res_golf_course_home_1787632854609.png", label: "Wesley Chapel", sub: "Two Rivers & Lagoons", href: "/knowledge-hub/areas/wesley-chapel" },
                { img: "/res_modern_mansion_1787632812473.png", label: "Land O' Lakes", sub: "Angeline & Connerton", href: "/knowledge-hub/areas/land-o-lakes" },
                { img: "/com_luxury_retail_1787632885082.png", label: "Brandon & Riverview", sub: "Hwy 60 Commercial & Mixed-Use", href: "/knowledge-hub/areas/brandon-riverview" },
                { img: "/land_commercial_development_1787632926636.png", label: "Central FL Acreage", sub: "Ocala, Fort McCoy & Frostproof", href: "/knowledge-hub/areas/central-florida-acreage" },
              ].map(({ img, label, sub, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-[#111]/10 hover:border-[#D4AF37] transition-colors"
                >
                  <Image src={img} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-left">
                    <span className="text-white font-bold text-xs tracking-wider uppercase flex items-center justify-between group-hover:text-[#D4AF37] transition-colors">
                      {label} <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-[10px] text-white/70 font-light block truncate">{sub}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVISORY CTA ── */}
      <section className="relative py-32 px-8 overflow-hidden border-t border-[#D4AF37]/20">
        <div className="absolute inset-0 z-0">
          <Image src="/davis-garnett-coming-soon-2.jpg" alt="Advisory Team" fill className="object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-6">Two Powerhouses • The Gold Standard</span>
          <h2 className="font-aiveritas text-4xl md:text-5xl text-white mb-8 leading-tight">
            Every Listing Treated Like It&apos;s Hot, New &amp; Demands Attention.
          </h2>
          <p className="text-white/85 text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether commercial or residential, big or small, land or condo—working with Mark Davis and Rachael Garnett individually or as a combined force gives you the art of the deal, relentless servicing, and the full powerhouse advantage of Davis &amp; Garnett.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() =>
                openConsultation(
                  "Commercial / Mixed-Use Acquisition",
                  "Mark Davis & Rachael Garnett",
                  "Schedule a Commercial & Land Consultation"
                )
              }
              className="px-8 py-4 bg-[#D4AF37] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg w-full sm:w-auto min-w-[250px]"
            >
              Commercial &amp; Land Advisory
            </button>
            <button
              onClick={() =>
                openConsultation(
                  "Luxury Residential Purchase",
                  "Mark Davis & Rachael Garnett",
                  "Schedule a Residential & Condo Consultation"
                )
              }
              className="px-8 py-4 bg-transparent border border-white/40 hover:border-[#D4AF37] hover:bg-[#D4AF37] text-white hover:text-black font-bold uppercase tracking-widest text-xs transition-colors rounded-lg w-full sm:w-auto min-w-[250px]"
            >
              Residential &amp; Condo Advisory
            </button>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM GRID ── */}
      <section className="bg-[#f5f3ef] pt-24 pb-0 border-t border-[#D4AF37]/20">
        <div className="max-w-screen-xl mx-auto px-8 text-center mb-12">
          <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-2 mb-4">
            <Camera className="w-4 h-4 text-[#D4AF37]" /> Connect With Us
          </span>
          <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-4">@DavisGarnett</h2>
          <p className="text-[#111]/60 text-base font-light max-w-xl mx-auto">
            Follow our latest luxury listings, commercial acquisitions, and market insights across the Tampa Bay area.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-0">
          {[
            "/listings/bahama-shores-1.webp",
            "/listings/ridgewood-brandon-2.jpg",
            "/listings/d-g-residential-1.webp",
            "/listings/d-g-land-listing-1.webp",
            "/listings/valencia-cove-lol-1.webp",
            "/listings/teal-trce-bradenton-1.webp",
            "/listings/wheat-stone-zephyrhills-1.webp",
            "/listings/bahama-shores-2.webp",
          ].map((imgSrc, idx) => (
            <Link key={idx} href="/properties" className="group relative aspect-square w-full overflow-hidden block bg-[#111]">
              <Image src={imgSrc} alt="Davis & Garnett Portfolio" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Heart className="w-5 h-5 fill-white" />
                  <span className="text-xs">{((idx + 1) * 137) % 400 + 150}</span>
                </div>
                <div className="flex items-center gap-2 text-white font-bold">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="text-xs">{((idx + 1) * 47) % 50 + 12}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest={modalConfig.interest}
        defaultAdvisor={modalConfig.advisor}
        title={modalConfig.title}
      />
    </div>
  );
}

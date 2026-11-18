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
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  Camera,
  Heart,
  MessageCircle,
  Building2,
  Compass,
  Search,
  MapPin,
  ShieldCheck,
  BookOpen,
  Calculator,
  Calendar,
  FileText,
  Trees,
} from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import PropertiesStickyStack from "@/components/PropertiesStickyStack";
import ProposalNav from "@/components/ProposalNav";
import BackgroundVideo from "@/components/BackgroundVideo";
import SiteFooter from "@/components/SiteFooter";
import ConsultationModal from "@/components/ConsultationModal";
import PdfAvailableBadge from "@/components/PdfAvailableBadge";
import { smoothScrollToId } from "@/lib/smoothScroll";

export default function HomePageV1Light() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const developmentsRef = useRef<HTMLDivElement>(null);
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

  const scrollDevelopmentsSlider = (dir: "left" | "right") => {
    if (!developmentsRef.current) return;
    const el = developmentsRef.current;
    const distance = Math.min(el.clientWidth * 0.92, el.clientWidth);
    el.scrollBy({
      left: dir === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const handleMlsSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (mlsQuery.trim()) params.set("q", mlsQuery.trim());
    if (mlsType !== "All") params.set("type", mlsType);
    router.push(`/search-mls${params.toString() ? `?${params.toString()}` : ""}`);
  };

  // Left Image (Mark) — holds steady from 0 to 0.38 so the opening state (center card + left/right text) pauses generously both scrolling down and scrolling back up
  const leftLeft = useTransform(scrollYProgress, [0, 0.38, 0.50, 0.62, 0.74, 1], ["50%", "50%", "17%", "17%", "25%", "25%"]);
  const leftWidth = useTransform(scrollYProgress, [0, 0.38, 0.50, 0.62, 0.74, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const leftHeight = useTransform(scrollYProgress, [0, 0.38, 0.50, 0.62, 0.74, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const leftZIndex = useTransform(scrollYProgress, [0, 0.61, 0.62, 1], [0, 0, 20, 20]);
  const borderRadius = useTransform(scrollYProgress, [0.62, 0.74], ["1rem", "0rem"]);

  // Right Image (Rachael)
  const rightLeft = useTransform(scrollYProgress, [0, 0.38, 0.50, 0.62, 0.74, 1], ["50%", "50%", "83%", "83%", "75%", "75%"]);
  const rightWidth = useTransform(scrollYProgress, [0, 0.38, 0.50, 0.62, 0.74, 1], ["30vw", "30vw", "30vw", "30vw", "50vw", "50vw"]);
  const rightHeight = useTransform(scrollYProgress, [0, 0.38, 0.50, 0.62, 0.74, 1], ["75vh", "75vh", "75vh", "75vh", "100vh", "100vh"]);
  const rightZIndex = useTransform(scrollYProgress, [0, 0.61, 0.62, 1], [0, 0, 20, 20]);

  const centerScale = useTransform(scrollYProgress, [0, 0.62, 0.74], [1, 1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0.74, 0.82, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0.74, 0.82, 1], [40, 0, 0]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.36, 0.43], [1, 1, 0]);

  return (
    <div className="min-h-screen text-[#111] bg-white selection:bg-[#D4AF37] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO (video grid — dark overlay stays, white text over it) ── */}
      <section className="relative w-full h-screen flex items-center justify-center pt-16 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0 flex w-full h-full">
          {[
            { id: 1, src: "/hero-videos-homepage/davis-garnett-hero-video-3.mp4" },
            { id: 2, src: "/new-images/new-2/davis-garnett-residential-commercial-real-estate-advisors-tampa-fl-sp2.mp4" },
            { id: 3, src: "/hero-videos-homepage/davis-garnett-hero-video-4.mp4" },
            { id: 4, src: "/new-images/new-2/davis-garnett-residential-commercial-real-estate-advisors-tampa-fl-sp4.mp4" },
          ].map((v) => (
            <div key={v.id} className="relative flex-1 h-full border-r border-white/5 last:border-r-0 overflow-hidden group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none" />
              <BackgroundVideo
                src={v.src}
                className="absolute inset-0 w-full h-full scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        <div className="relative z-20 text-center px-8 flex flex-col items-center w-full max-w-4xl mx-auto pt-12">
          <DavisGarnettLogo variant="dark" className="w-[90%] md:w-[70%] max-w-[680px] mx-auto mb-3 drop-shadow-2xl" />
          <Link
            href="/about/align-right-realty-carrollwood"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-[#ef5728]/50 hover:border-[#D4AF37] text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-white/95 hover:text-[#D4AF37] mb-5 transition-colors shadow-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/align-right-email-logo.png"
              alt="Align Right Realty Carrollwood"
              className="h-5 w-auto object-contain"
            />
            <span>Align Right Realty Carrollwood</span>
          </Link>
          <h1 className="font-aiveritas text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-tight text-white drop-shadow-2xl">
            Your Tampa Bay <br />
            <span className="text-[#D4AF37]">Real Estate Team.</span>
          </h1>
          <p className="text-base md:text-[17px] lg:text-[18px] text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-lg">
            Mark Davis and Rachael Garnett work together across residential and commercial real estate—giving you two experienced local agents in your corner from day one.
          </p>
        </div>

        <motion.button
          type="button"
          onClick={() => smoothScrollToId("home-team-reveal", 72)}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-90 hover:opacity-100 z-20 cursor-pointer"
          aria-label="Scroll to Discover"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#D4AF37]">Scroll to Discover</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </motion.button>
      </section>

      {/* ── TAMPA TEAM REVEAL ── */}
      <div id="home-team-reveal" />
      {isMobile ? (
        <section className="py-24 px-6 bg-white">
          <div className="text-center mb-16">
            <span className="text-[#9A7D3A] text-xs tracking-[0.2em] uppercase font-bold block mb-4">Working Together for You</span>
            <h2 className="font-aiveritas text-4xl text-[#111] mb-4">Meet Mark &amp; Rachael.</h2>
            <p className="text-[#111]/75 text-base font-light max-w-md mx-auto leading-relaxed mb-6">
              Mark Davis and Rachael Garnett are both REALTORS® and Certified Commercial &amp; Residential Agents. Whether you are buying or selling a home, a commercial building, or land, we work together so you always have two experienced agents on your side.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#111] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#111] transition-colors"
            >
              Meet Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-12">
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/new-images/new-2/mark-davis-residential-commerical-advisor-tampa-real-estate-3.jpg" alt="Mark Davis" fill className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20 mix-blend-screen pointer-events-none select-none">
                  <Image src="/new-images/new-2/dg-favicon-fat-dark-background.png" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-aiveritas text-3xl text-[#111] mb-1">Mark Davis</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">REALTOR® · Certified Commercial &amp; Residential Agent • FL Lic #3209459</p>
              <p className="text-[#111]/75 text-base font-light mb-5 leading-relaxed">
                Mark helps clients buy and sell residential homes, commercial properties, and Florida land. He loves digging into the numbers, checking zoning details, and making sure every step of your deal makes sense.
              </p>
              <Link
                href="/about/mark-davis"
                className="block text-center w-full py-4 border border-[#111]/20 text-[#111] text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors"
              >
                Meet Mark &amp; View Listings
              </Link>
            </div>
            <div className="w-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6">
                <Image src="/new-images/new-2/rachael-garnett-residential-commerical-advisor-tampa-real-estate-homepage-1.jpg" alt="Rachael Garnett" fill className="object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20 mix-blend-screen pointer-events-none select-none">
                  <Image src="/new-images/new-2/dg-favicon-fat-dark-background.png" alt="" fill className="object-contain" />
                </div>
              </div>
              <h3 className="font-aiveritas text-3xl text-[#111] mb-1">Rachael Garnett</h3>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-3">REALTOR® · Certified Commercial &amp; Residential Agent • FL Lic #3378601</p>
              <p className="text-[#111]/75 text-base font-light mb-5 leading-relaxed">
                Rachael works with buyers, sellers, and investors across residential homes, commercial spaces, and waterfront and unique properties. She brings thoughtful marketing, clear communication, and strong negotiation to every table.
              </p>
              <Link
                href="/about/rachael-garnett"
                className="block text-center w-full py-4 border border-[#111]/20 text-[#111] text-xs uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors"
              >
                Meet Rachael &amp; View Listings
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section ref={containerRef} className="relative w-full h-[1150vh] bg-[#f5f3ef]">
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-0">
            {/* Center Image */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-2xl overflow-hidden shadow-2xl group"
              style={{ width: "30vw", height: "75vh", scale: centerScale }}
            >
              <Image src="/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-8.jpg" alt="Davis & Garnett Team" fill unoptimized className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-0 right-0 text-center px-6 flex flex-col items-center">
                <h3 className="font-aiveritas text-3xl lg:text-4xl text-white drop-shadow-md mb-1.5">Mark &amp; Rachael</h3>
                <p className="text-[#D4AF37] text-[11px] uppercase tracking-widest mb-5">REALTORS® · Certified Commercial &amp; Residential Agents</p>
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-7 py-3.5 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#111] transition-colors shadow-lg"
                >
                  Meet Our Team <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Initial Text (Left) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ left: "17%", x: "-50%", opacity: initialTextOpacity }}
            >
              <h3 className="font-aiveritas text-4xl lg:text-5xl xl:text-6xl font-bold text-[#D4AF37] mb-5 leading-tight">
                One Team<br />on Your Side
              </h3>
              <p className="text-[#111]/80 text-base md:text-[17px] lg:text-[18px] font-light leading-relaxed max-w-sm mx-auto">
                Two full-time agents working together across residential and commercial real estate in Tampa Bay.
              </p>
            </motion.div>

            {/* Initial Text (Right) */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 z-0 text-center w-[30vw]"
              style={{ left: "83%", x: "-50%", opacity: initialTextOpacity }}
            >
              <h3 className="font-aiveritas text-4xl lg:text-5xl xl:text-6xl font-bold text-[#D4AF37] mb-5 leading-tight">
                Easy to<br />Talk To
              </h3>
              <p className="text-[#111]/80 text-base md:text-[17px] lg:text-[18px] font-light leading-relaxed max-w-sm mx-auto">
                No pushy sales talk or confusing jargon. Just honest local advice, clear answers, and hard work from start to finish.
              </p>
            </motion.div>

            {/* Left Image (Mark) */}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group shadow-2xl"
              style={{ left: leftLeft, width: leftWidth, height: leftHeight, zIndex: leftZIndex, borderRadius }}
            >
              <Image src="/new-images/new-2/mark-davis-residential-commerical-advisor-tampa-real-estate-3.jpg" alt="Mark Davis" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-10 lg:px-14 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.28em] font-bold mb-4 text-center">REALTOR® · Commercial &amp; Residential Agent • #3209459</span>
                <h2 className="font-aiveritas text-5xl lg:text-6xl text-white mb-5">Mark Davis</h2>
                <p className="text-white/90 text-center max-w-lg text-base md:text-[17px] lg:text-[18px] font-light mb-10 leading-relaxed">
                  Mark works across residential homes, commercial properties, and Florida land. Clients count on his calm, practical approach to pricing, zoning, and getting deals across the finish line.
                </p>
                <Link
                  href="/about/mark-davis"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#111] transition-colors"
                >
                  Meet Mark Davis <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 mix-blend-screen pointer-events-none select-none z-10"
                style={{ opacity: textOpacity }}
              >
                <Image src="/new-images/new-2/dg-favicon-fat-dark-background.png" alt="" fill className="object-contain opacity-25" />
              </motion.div>
            </motion.div>

            {/* Right Image (Rachael) */}
            <motion.div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden group shadow-2xl"
              style={{ left: rightLeft, width: rightWidth, height: rightHeight, zIndex: rightZIndex, borderRadius }}
            >
              <Image src="/new-images/new-2/rachael-garnett-residential-commerical-advisor-tampa-real-estate-homepage-1.jpg" alt="Rachael Garnett" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-10 lg:px-14 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"
                style={{ opacity: textOpacity, y: textY }}
              >
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.28em] font-bold mb-4 text-center">REALTOR® · Commercial &amp; Residential Agent • #3378601</span>
                <h2 className="font-aiveritas text-5xl lg:text-6xl text-white mb-5">Rachael Garnett</h2>
                <p className="text-white/90 text-center max-w-lg text-base md:text-[17px] lg:text-[18px] font-light mb-10 leading-relaxed">
                  Rachael works across residential homes, commercial properties, and waterfront and unique properties. She brings energy, thoughtful marketing, and clear day-to-day communication to every client she serves.
                </p>
                <Link
                  href="/about/rachael-garnett"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#111] transition-colors"
                >
                  Meet Rachael Garnett <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div
                className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 mix-blend-screen pointer-events-none select-none z-10"
                style={{ opacity: textOpacity }}
              >
                <Image src="/new-images/new-2/dg-favicon-fat-dark-background.png" alt="" fill className="object-contain opacity-25" />
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── THE DUAL ADVANTAGE ── */}
      <section className="relative z-10 py-24 md:py-28 px-8 bg-white border-t border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Commercial &amp; Residential Real Estate
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-[#111] mb-5 leading-tight">
              How We Help You<br className="sm:hidden" /> in <span className="text-[#9A7D3A]">Tampa Bay</span>
            </h2>
            <p className="text-[#111]/75 text-base md:text-[17px] lg:text-[18px] font-light max-w-3xl mx-auto leading-relaxed">
              Because both Mark and Rachael are certified in commercial and residential real estate, you get one approachable team whether you are buying or selling a home, a business property, or land.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/commercial"
              className="group rounded-2xl overflow-hidden cursor-pointer bg-[#111111] border border-[#111]/15 hover:border-[#D4AF37] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src="/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg"
                  alt="Tampa Bay Commercial Real Estate Building & Mixed-Use Corridor"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/25 pointer-events-none" />
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/45 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Commercial Hub · CRE · Land
                  </span>
                </div>
              </div>
              <div className="p-7 sm:p-9 pt-4 flex-1 flex flex-col justify-between bg-[#111111]">
                <div>
                  <div className="w-10 h-[2px] bg-[#D4AF37] mb-4" />
                  <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.24em] font-bold block mb-2">
                    Commercial &amp; Land Hub
                  </span>
                  <h3 className="font-aiveritas text-3xl lg:text-[34px] text-white group-hover:text-[#D4AF37] transition-colors mb-3 leading-tight">
                    Commercial Real Estate
                  </h3>
                  <p className="text-white/80 font-light mb-7 text-base leading-relaxed">
                    Helping business owners and investors buy, sell, and lease office buildings, mixed-use properties, retail spaces, and Florida land.
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#D4AF37] group-hover:bg-white text-[#111] text-xs uppercase tracking-widest font-bold transition-colors shadow-md">
                    Explore Commercial Hub <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/residential"
              className="group rounded-2xl overflow-hidden cursor-pointer bg-[#111111] border border-[#111]/15 hover:border-[#D4AF37] shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]">
                <Image
                  src="/res_waterfront_estate_1787632802890.png"
                  alt="Tampa Bay Luxury Waterfront Residential Estate at Sunset"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/25 pointer-events-none" />
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/45 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Residential Hub · Homes · Condos
                  </span>
                </div>
              </div>
              <div className="p-7 sm:p-9 pt-4 flex-1 flex flex-col justify-between bg-[#111111]">
                <div>
                  <div className="w-10 h-[2px] bg-[#D4AF37] mb-4" />
                  <span className="text-[#D4AF37] text-[11px] uppercase tracking-[0.24em] font-bold block mb-2">
                    Residential Hub
                  </span>
                  <h3 className="font-aiveritas text-3xl lg:text-[34px] text-white group-hover:text-[#D4AF37] transition-colors mb-3 leading-tight">
                    Residential Real Estate
                  </h3>
                  <p className="text-white/80 font-light mb-7 text-base leading-relaxed">
                    Helping buyers and sellers with single-family homes, downtown condos, new construction, and waterfront and unique properties.
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#D4AF37] group-hover:bg-white text-[#111] text-xs uppercase tracking-widest font-bold transition-colors shadow-md">
                    Explore Residential Hub <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ADVISOR CREDENTIALS & PORTFOLIO METRICS ── */}
      <section className="py-20 px-8 bg-[#f5f3ef]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                value: "$250M+",
                label: "Combined Team Success",
                sub: "Residential, Commercial & Land",
              },
              {
                value: "20+",
                label: "Years Experience",
                sub: "CRE & RES Dual-Certified Agents",
              },
              {
                value: "5.0 ★",
                label: "Client Rating",
                sub: "Tampa Bay & Central Florida",
              },
              {
                value: "100%",
                label: "Working For You",
                sub: "Align Right Carrollwood · #BK3401606",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border border-[#111]/10 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-center gap-1.5"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-aiveritas text-[#111]">
                  {item.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9A7D3A] font-bold">
                  {item.label}
                </span>
                <span className="text-xs text-[#111]/55 font-light">
                  {item.sub}
                </span>
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

      {/* ── TRENDING REAL ESTATE REGIONAL SLIDER ── */}
      <section className="py-32 px-8 bg-white border-t border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
                Trending Hub · Commercial, Historic Districts &amp; New Construction
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-[#111] mb-4 leading-tight">
                Trending Tampa Bay<br className="sm:hidden" /> Real Estate
              </h2>
              <p className="text-[#111]/75 text-base md:text-[17px] lg:text-[18px] font-light max-w-2xl leading-relaxed">
                Explore established neighborhoods, active commercial corridors, 55+ communities, and new construction across Tampa Bay—from Clearwater, Dunedin &amp; St. Petersburg through Tampa and Wesley Chapel to Bradenton, Lakewood Ranch &amp; Sarasota.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollDevelopmentsSlider("left")}
                  className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                  aria-label="Scroll Developments Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollDevelopmentsSlider("right")}
                  className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                  aria-label="Scroll Developments Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <Link
                href="/developments"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition-colors shrink-0"
              >
                Open Trending Hub <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div
            ref={developmentsRef}
            className="flex gap-7 lg:gap-10 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              {
                badge: "Existing + Towers + Mixed-Use",
                badgeGold: true,
                icon: Building2,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Downtown Tampa, Bayshore & South Tampa Trending Real Estate",
                title: "Downtown Tampa, Bayshore & South Tampa",
                subtitle: "Hyde Park, Bayshore, Sky Condos & Westshore Offices • $600K – $7.8M+",
                dualNote: "Historic Homes + Riverwalk Towers + 650K SqFt Urban Commercial",
                footerNote: "Condo Reserves, Floor Plans & Commercial Pads",
                ctaLabel: "Explore Tampa Core",
                ctaHref: "/developments?corridor=downtown-bayshore#downtown-towers",
                items: [
                  { name: "Hyde Park & Bayshore Estates", sub: "Existing Historic Homes & Walkable Village", slug: "hyde-park-bayshore-established-south-tampa" },
                  { name: "Pendry, Ritz & ONE Tampa", sub: "New Branded Riverwalk & Bayshore Towers", slug: "pendry-residences-tampa" },
                  { name: "Gasworx & Water St. Mixed-Use", sub: "Class-A Offices, Condos & Street Retail", slug: "gasworx-ybor-channel-district" },
                  { name: "Westshore Marina District", sub: "Bay Condos, Yacht Slips & Airport Offices", slug: "westshore-marina-international-plaza-district" },
                ],
              },
              {
                badge: "Golf + Lagoons + 55+ + Biotech",
                badgeGold: false,
                icon: Compass,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Wesley Chapel & Land O' Lakes Trending Real Estate",
                title: "Wesley Chapel, Land O' Lakes & North",
                subtitle: "Master Villages, Lagoons, New 55+ & Speros Biotech • $360K – $1.6M+",
                dualNote: "Golf Resales + Two Rivers / Angeline + New 55+ & Biotech Parks",
                footerNote: "Builder Buydowns, CDD Audits & Speros Growth",
                ctaLabel: "Explore Wesley Chapel",
                ctaHref: "/developments?corridor=north-tampa#north-tampa-communities",
                items: [
                  { name: "Two Rivers & Angeline", sub: "New Master Towns, Peak Surf & Speros FL", slug: "two-rivers-wesley-chapel" },
                  { name: "Epperson, Mirada & Sunrise Hills", sub: "Crystal Lagoons Across Pasco & Hernando", slug: "epperson-mirada-lagoon-wesley-chapel" },
                  { name: "Valencia Ridge & Medley 55+", sub: "Brand-New Gated Clubhouses & Villas", slug: "valencia-ridge-medley-mirada-55-plus" },
                  { name: "Plantation Palms & Seven Oaks", sub: "Established Golf Streets & Lower Tax Bonds", slug: "seven-oaks-plantation-palms-bexley-resale" },
                ],
              },
              {
                badge: "Lakes + Bayfront + 55+ + UTC CRE",
                badgeGold: true,
                icon: MapPin,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Bradenton, Lakewood Ranch & Sarasota Trending Real Estate",
                title: "Bradenton, Lakewood Ranch & Sarasota",
                subtitle: "Lake Estates, Azario Golf, 55+, Quay Condos & UTC Retail • $300Ks – $10M+",
                dualNote: "Waterside & Wild Blue + Cresswind 55+ + The Quay & UTC Commercial",
                footerNote: "Manatee/Sarasota Advisory & 55+ Comparisons",
                ctaLabel: "Explore Sarasota & LWR",
                ctaHref: "/developments?corridor=sarasota-manatee#sarasota-manatee-communities",
                items: [
                  { name: "Waterside, Star Farms & Azario", sub: "LWR Custom Lakes, Golf & Town Centers", slug: "waterside-wild-blue-lakewood-ranch" },
                  { name: "The Quay Sarasota & North River", sub: "Bayfront Sky Condos & Bradenton Villages", slug: "the-quay-sarasota-waterfront" },
                  { name: "Cresswind & Del Webb 55+ (LWR)", sub: "Award-Winning 55+ Clubhouses & Villas", slug: "cresswind-del-webb-lakewood-ranch-55-plus" },
                  { name: "UTC & LWR Main St. Commercial", sub: "I-75 Exit 213 Plazas & Medical Parks", slug: "university-parkway-utc-lakewood-ranch-commercial" },
                ],
              },
              {
                badge: "Boating + Towers + 55+ + CRE",
                badgeGold: false,
                icon: MapPin,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "St. Petersburg, Bahama Shores & Pinellas Beaches Trending Real Estate",
                title: "St. Petersburg & South Pinellas",
                subtitle: "Bahama Shores, Old NE, Downtown Condos & Central Ave • $250K – $8.5M+",
                dualNote: "Deep-Water Boating + Sky Towers + 55+ & EDGE District Retail",
                footerNote: "Seawalls, Elevations & Central Ave Commercial",
                ctaLabel: "Explore St. Petersburg",
                ctaHref: "/developments?corridor=st-petersburg-pinellas#st-pete-region",
                items: [
                  { name: "Bahama Shores & Snell Isle", sub: "Deep-Water Estates & Historic Brick Streets", slug: "bahama-shores-snell-isle-st-petersburg" },
                  { name: "Downtown St. Pete Sky Towers", sub: "Waldorf Astoria, Art House & Saltaire Condos", slug: "st-petersburg-downtown-towers-saltaire-art-house" },
                  { name: "Point Brittany & Mainlands 55+", sub: "Bayfront Condos & Single-Story Villas", slug: "point-brittany-isla-del-sol-55-plus" },
                  { name: "Central Ave & EDGE District CRE", sub: "Storefront Retail, Hospitality & Offices", slug: "edge-district-central-ave-commercial-st-pete" },
                ],
              },
              {
                badge: "Bluffs + Gulf Condos + 55+ + Retail",
                badgeGold: true,
                icon: Compass,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Clearwater Beach, Dunedin & North Pinellas Trending Real Estate",
                title: "Clearwater, Dunedin & North Pinellas",
                subtitle: "Pinellas Trail Towns, Sand Key, 55+ Golf & SR-60 CRE • $215K – $4.5M+",
                dualNote: "Dunedin & Belleair + Beach Condos + OTOW 55+ & US-19 Commercial",
                footerNote: "Coastal Reserve Checks & Dunedin Trail Living",
                ctaLabel: "Explore Clearwater & Dunedin",
                ctaHref: "/developments?corridor=clearwater-north-pinellas#clearwater-region",
                items: [
                  { name: "Dunedin, Belleair & Safety Harbor", sub: "High Zone-X Bluffs & Pinellas Trail Living", slug: "dunedin-safety-harbor-belleair-coastal" },
                  { name: "Clearwater Beach & Sand Key", sub: "Gulf Condos & Island Estates Boat Slips", slug: "clearwater-beach-sand-key-waterfront-condos" },
                  { name: "On Top of the World & Timber Greens", sub: "Zero-CDD 55+ Golf & Active-Adult Clubs", slug: "on-top-of-the-world-timber-greens-55-plus" },
                  { name: "US-19 & Gulf-to-Bay Commercial", sub: "Medical Offices, Retail Plazas & Dining", slug: "us19-gulf-to-bay-dunedin-commercial" },
                ],
              },
              {
                badge: "Trails + Golf + Sponge Docks + CRE",
                badgeGold: true,
                icon: Trees,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Tarpon Springs, Palm Harbor & Trinity West Pasco Trending Real Estate",
                title: "Tarpon Springs, Palm Harbor & Trinity",
                subtitle: "Starkey Ranch, East Lake Golf, Sponge Docks & SR-54 CRE • $245K – $6.0M+",
                dualNote: "Porch Towns + Lake Tarpon Boats + Timber Greens 55+ & SR-54 Medical",
                footerNote: "Pinellas-Pasco Cost Comparisons & Builder Tours",
                ctaLabel: "Explore West Pasco",
                ctaHref: "/developments#west-pasco-region",
                items: [
                  { name: "Starkey Ranch & Asturia", sub: "20+ Miles of Trails & Walkable Schools", slug: "starkey-ranch-trinity-master-planned" },
                  { name: "East Lake & Lansbrook", sub: "Private Lake Tarpon Docks & Guarded Golf", slug: "east-lake-woodlands-lansbrook-palm-harbor" },
                  { name: "Tarpon Sponge Docks & SR-54 CRE", sub: "Hospital Medical Suites & Bayou Shops", slug: "tarpon-springs-sponge-docks-coastal" },
                  { name: "Timber Greens 55+ Golf", sub: "Zero-CDD Guard-Gated Country Club Living", slug: "timber-greens-regency-park-west-pasco-55-plus" },
                ],
              },
              {
                badge: "Sailboat Canals + 55+ + Waterset",
                badgeGold: false,
                icon: Compass,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Apollo Beach, Ruskin & Sun City Center Trending Real Estate",
                title: "Apollo Beach, Ruskin & Sun City",
                subtitle: "MiraBay Docks, Waterset New Builds & Valencia del Sol 55+ • $195K – $6.5M",
                dualNote: "Deep-Water Canals + New Builder Credits + Zero-CDD Golf-Cart 55+",
                footerNote: "Seawalls, Flood Quotes & 55+ Cost Checks",
                ctaLabel: "Explore SouthShore",
                ctaHref: "/developments#south-shore-region",
                items: [
                  { name: "MiraBay & Symphony Isles", sub: "No-Bridge Sailboat Docks Into Tampa Bay", slug: "mirabay-symphony-isles-apollo-beach" },
                  { name: "Waterset New Construction", sub: "WestBay & Weekley Floor Plans + 4 Pools", slug: "waterset-apollo-beach-new-construction" },
                  { name: "Valencia del Sol & Sun City 55+", sub: "GL Homes Luxury Club & Golf-Cart Town", slug: "valencia-del-sol-wimauma-55-plus" },
                  { name: "Big Bend Rd & US-41 CRE", sub: "St. Joseph's Hospital Retail & Marine Pads", slug: "us41-big-bend-apollo-beach-commercial" },
                ],
              },
              {
                badge: "Marina Towers + Offices + Canals",
                badgeGold: true,
                icon: Building2,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Westshore Marina District, Rocky Point & Town N Country Real Estate",
                title: "Westshore Marina & Rocky Point",
                subtitle: "150-Slip Bay Marina, Airport Offices & Baycrest Canals • $340K – $10M+",
                dualNote: "Marina Pointe Condos + Class-A Corporate + Zero-HOA Boat Docks",
                footerNote: "Airport Proximity, Marina Slips & Leases",
                ctaLabel: "Explore Westshore",
                ctaHref: "/developments#westshore-marina-region",
                items: [
                  { name: "Westshore Marina District", sub: "Bayfront Sky Condos & Rooftop Townhomes", slug: "westshore-marina-district-tampa-bayfront" },
                  { name: "Rocky Point & Intl Plaza CRE", sub: "5-Min Airport Bayfront Offices & Retail", slug: "rocky-point-courtney-campbell-condos-office" },
                  { name: "Baycrest & Dana Shores Canals", sub: "Zero-HOA Backyard Boat Docks on the Bay", slug: "baycrest-dana-shores-boating-canals" },
                  { name: "W Hillsborough Veterans Flex", sub: "Airport Contractor Bays & Townhomes", slug: "hillsborough-ave-veterans-flex-commercial" },
                ],
              },
              {
                badge: "Downtown Lake + Beaches + 55+",
                badgeGold: false,
                icon: MapPin,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Venice, Wellen Park & North Port Trending Real Estate",
                title: "Venice, Wellen Park & North Port",
                subtitle: "Downtown Wellen, Historic Island, Solstice 55+ & Laurel CRE • $295K – $8.5M",
                dualNote: "Top National Master Plan + Gulf Island Cottages + SMH Hospital Pads",
                footerNote: "South Sarasota Builders, Island Checks & CRE",
                ctaLabel: "Explore Venice & Wellen",
                ctaHref: "/developments#venice-wellen-park-region",
                items: [
                  { name: "Wellen Park & CoolToday Park", sub: "Lakefront Downtown & Top Builder Plans", slug: "wellen-park-downtown-cooltoday-venice" },
                  { name: "Historic Island of Venice", sub: "Venice Ave Boutiques & Beach Walk Blocks", slug: "island-of-venice-historic-gulf-beach" },
                  { name: "Solstice & Grand Palm 55+", sub: "Toll Brothers Club & Nature Preserves", slug: "solstice-renaissance-wellen-park-55-plus" },
                  { name: "Laurel Rd & SMH Exit 195 CRE", sub: "Hospital Clinics, Hotels & Retail Pads", slug: "nokomis-laurel-road-medical-commercial-corridor" },
                ],
              },
              {
                badge: "SBA CRE + Half-Acres + Hawkstone",
                badgeGold: true,
                icon: Building2,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Brandon, Valrico & East Hillsborough Trending Real Estate",
                title: "Brandon, Valrico & East Hills",
                subtitle: "SR-60 SBA Offices, No-HOA Seffner, Valrico & Hawkstone • $245K – $9.5M",
                dualNote: "Active 126 Ridgewood CRE + FishHawk Trails + Sabal Park Industrial",
                footerNote: "SBA 504 Buildings, Zero-CDD Yards & New Builds",
                ctaLabel: "Explore Brandon & Valrico",
                ctaHref: "/developments#east-hillsborough-region",
                items: [
                  { name: "SR-60 Brandon Commercial & SBA", sub: "126 Ridgewood Ave Offices & I-75 Flex", slug: "sr60-brandon-commercial-sba-mixed-use" },
                  { name: "Valrico, Bloomingdale & Seffner", sub: "Half-Acre Yards, Golf & Zero-HOA Blocks", slug: "valrico-bloomingdale-family-neighborhoods" },
                  { name: "Hawkstone & FishHawk Trails", sub: "New Construction Models & Top Schools", slug: "hawkstone-winthrop-riverview-new-construction" },
                  { name: "Brandon & Woodberry Villas 55+", sub: "Step-Free Villas Minutes to Hospitals", slug: "bloomingdale-woodberry-courtyard-55-plus-villas" },
                ],
              },
              {
                badge: "I-4 Industrial + Lakes + Land",
                badgeGold: false,
                icon: Building2,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Lakeland, Plant City & Central Florida Land Trending Real Estate",
                title: "Lakeland, Plant City & I-4 Land",
                subtitle: "Lake Morton Classics, Bonnet Springs CRE & Hwy Acreage • $215K – $15M",
                dualNote: "Active 79.54 Ac Frostproof & 19.72 Ac Fort McCoy + I-4 Distribution",
                footerNote: "1031 Exchanges, Greenbelt Taxes & Lake Estates",
                ctaLabel: "Explore Lakeland & Land",
                ctaHref: "/developments#lakeland-polk-region",
                items: [
                  { name: "Lake Morton & Dixieland", sub: "Historic Brick Bungalows & 3-Mi Lake Trail", slug: "lake-morton-dixieland-historic-lakeland" },
                  { name: "Bonnet Springs & Downtown CRE", sub: "Lakeland Retail, Medical & Office Suites", slug: "bonnet-springs-downtown-lakeland-mixed-use" },
                  { name: "I-4 Logistics & Industrial", sub: "Plant City to Lakeland Warehouse & Yards", slug: "i4-plant-city-polk-industrial-logistics-land" },
                  { name: "Frostproof & Fort McCoy Land", sub: "79.54 Ac Hwy Site & 19.72 Ac Greenbelt", slug: "polk-marion-us27-us98-acreage-greenbelt-land" },
                ],
              },
              {
                badge: "Home Office + Lakes + Nearby Devs",
                badgeGold: true,
                icon: Building2,
                heroImage: "/placeholders/dg-brand-placeholder.webp",
                heroAlt: "Align Right Realty Carrollwood & Surrounding Corridor Trending Real Estate",
                title: "Align Right Carrollwood & Surroundings",
                subtitle: "3903 Northdale Hub, Odessa Farms, Ski Lakes & Citrus Park • $265K – $4.5M+",
                dualNote: "Home Brokerage Corridor + Odessa Barns + Zero-CDD Ski Lakes",
                footerNote: "No-CDD Yards, ASC-1 Land & Northdale Offices",
                ctaLabel: "Explore Carrollwood Hub",
                ctaHref: "/developments#carrollwood-region",
                items: [
                  { name: "Original Carrollwood & Northdale", sub: "Oak Streets, Lake Carroll Park & $0 CDD", slug: "original-carrollwood-lake-magdalene-living" },
                  { name: "Nearby New Builds & Cheval", sub: "Connerton/Bexley North + Guard-Gated Golf", slug: "cheval-lutz-keystone-acreage-estates" },
                  { name: "Carrollwood Village Villas 55+", sub: "Step-Free Golf Condos Near Two Hospitals", slug: "carrollwood-village-northdale-villas-55-plus" },
                  { name: "3903 Northdale & Dale Mabry CRE", sub: "Align Right Office Hub & Medical Suites", slug: "northdale-dale-mabry-commercial-office-corridor" },
                ],
              },
            ].map((slide) => {
              const BadgeIcon = slide.icon;
              return (
                <div
                  key={slide.title}
                  className="w-[84vw] sm:w-[76vw] lg:w-[calc(50%-20px)] shrink-0 snap-start bg-[#f5f3ef] border border-[#111]/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={slide.heroImage}
                      alt={slide.heroAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1.5 ${slide.badgeGold ? "bg-[#D4AF37] text-[#111]" : "bg-[#111] text-[#D4AF37]"
                        }`}
                    >
                      <BadgeIcon className="w-3.5 h-3.5" /> {slide.badge}
                    </div>
                    <div className="absolute bottom-5 left-6 right-6">
                      <h3 className="font-aiveritas text-2xl xl:text-[26px] text-white mb-1">
                        {slide.title}
                      </h3>
                      <p className="text-white/85 text-xs uppercase tracking-widest mb-1.5">
                        {slide.subtitle}
                      </p>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        {slide.dualNote}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {slide.items.map((d) => (
                        <Link
                          key={`${slide.title}-${d.name}`}
                          href={`/developments/${d.slug}`}
                          className="p-4 bg-white rounded-xl border border-[#111]/8 hover:border-[#D4AF37] transition-colors group"
                        >
                          <div className="font-bold text-sm md:text-base text-[#111] group-hover:text-[#9A7D3A] transition-colors flex items-center justify-between gap-2">
                            <span>{d.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          </div>
                          <div className="text-xs md:text-sm text-[#111]/65 font-light mt-1">{d.sub}</div>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#111]/10 gap-4">
                      <span className="text-xs text-[#111]/60">{slide.footerNote}</span>
                      <Link
                        href={slide.ctaHref}
                        className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] flex items-center gap-1 shrink-0"
                      >
                        {slide.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SEARCH THE FULL TAMPA BAY MLS BANNER ── */}
      <section className="py-20 px-8 bg-[#111] text-white border-y border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Full Regional MLS Search + Off-Market Access
            </span>
            <h2 className="font-aiveritas text-3xl md:text-4xl lg:text-5xl text-white mb-3 leading-tight">
              Looking Beyond Our Featured Listings?
            </h2>
            <p className="text-white/85 text-base md:text-[17px] lg:text-[18px] font-light leading-relaxed">
              Search active homes, commercial listings, and land across Hillsborough, Pinellas, Pasco, Polk, and Manatee counties.
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
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">What Clients Say</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-[#111] mb-6 leading-tight">
                Real People.<br />
                <span className="text-[#9A7D3A]">Real Results.</span>
              </h2>
              <p className="text-[#111]/75 text-base md:text-[17px] lg:text-[18px] font-light leading-relaxed mb-8">
                Our goal is simple: treat every client like family, communicate clearly, and do the homework so your purchase or sale goes smoothly.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#111]/30 text-[#111] text-xs font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors"
              >
                Meet Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  quote: "\"Mark and Rachael guided our commercial mixed-use and land purchase from start to finish. Their knowledge of Hillsborough County zoning and local numbers saved us time and money.\"",
                  name: "James T.",
                  role: "Commercial & Land Client",
                  offset: "",
                },
                {
                  quote: "\"Working with Rachael and Mark made finding our St. Petersburg waterfront home so much easier. They listened to what we wanted, answered every question, and negotiated a great deal.\"",
                  name: "Sarah & Michael L.",
                  role: "Tampa Bay Homebuyers",
                  offset: "sm:translate-y-8",
                },
              ].map(({ quote, name, role, offset }) => (
                <div key={name} className={`bg-[#f5f3ef] border border-[#111]/8 p-8 lg:p-10 flex flex-col justify-between rounded-xl ${offset}`}>
                  <div>
                    <div className="flex gap-1 text-[#D4AF37] mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#111]/85 text-base md:text-[17px] lg:text-[18px] font-light italic mb-8 leading-relaxed">{quote}</p>
                  </div>
                  <div>
                    <strong className="text-[#111] block font-serif text-xl">{name}</strong>
                    <span className="text-[#111]/55 text-xs uppercase tracking-wider font-semibold">{role}</span>
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
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Common Questions</span>
              <h2 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-[#111] mb-6 leading-tight">
                Tampa Bay Real Estate <span className="text-[#9A7D3A]">Q&amp;A</span>
              </h2>
              <p className="text-[#111]/75 text-base md:text-[17px] lg:text-[18px] font-light leading-relaxed mb-8">
                Get clear, plain-English answers from Mark and Rachael on the questions buyers, sellers, and investors ask most about Tampa Bay real estate.
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
                  q: "How is the Tampa Bay real estate market doing in 2026?",
                  a: "Tampa Bay continues to see steady demand for both homes and commercial properties. Waterfront homes in St. Petersburg and South Tampa have limited supply, new neighborhoods in Wesley Chapel and Land O' Lakes are offering strong builder incentives, and local business owners are actively looking for commercial buildings and land.",
                },
                {
                  q: "What is the difference between HOA and CDD fees?",
                  a: "An HOA fee pays for neighborhood upkeep, gates, and community rules, and is usually billed monthly or quarterly. A CDD fee helps pay for the roads, parks, pools, and lagoons built in newer communities like Two Rivers, Angeline, and Epperson. Your CDD fee is included right inside your annual county property tax bill.",
                },
                {
                  q: "Can I buy a new home in Florida while selling my current house?",
                  a: "Yes. Many homeowners use bridge loans, home equity lines, short rent-back agreements after closing, or sale contingencies so they do not have to move twice. Mark and Rachael help you line up both closings smoothly.",
                },
                {
                  q: "How does commercial mixed-use zoning work in Brandon and Tampa?",
                  a: "Mixed-use properties—like our two-building listing at 126 Ridgewood Ave in Brandon—let you run a business office in one building while renting out or living in the second building on the same lot. Because each building has its own electric and water meters, it is easy to manage.",
                },
                {
                  q: "Does it cost extra to have Mark and Rachael represent me on a new construction home?",
                  a: "No. The homebuilder or condo developer pays our fee, and the builder does not lower the price if you walk in alone. Having Mark and Rachael on your side costs you $0 and gives you two experienced agents to help negotiate lot choices, rate buydowns, closing credits, and independent inspections.",
                },
              ].map((item, i) => (
                <details key={i} className="group bg-[#f5f3ef] border border-[#111]/8 rounded-xl overflow-hidden transition-colors hover:border-[#D4AF37]/50">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer list-none select-none">
                    <h3 className="font-bold text-[#111] text-base md:text-lg pr-8 leading-snug">{item.q}</h3>
                    <ChevronDown className="w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 -mt-2">
                    <p className="text-[#111]/75 font-light leading-relaxed text-base md:text-lg">{item.a}</p>
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
              telephone: ["941-737-4127", "727-808-3344"],
              email: "list@davisgarnettsells.com",
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
                  telephone: "941-737-4127",
                },
                {
                  "@type": "Person",
                  name: "Rachael Garnett",
                  jobTitle: "Commercial & Residential Advisor",
                  identifier: "FL License #3378601",
                  telephone: "727-808-3344",
                },
              ],
            }),
          }}
        />
      </section>

      {/* ── KNOWLEDGE HUB SPOTLIGHT (PRETTY + MOBILE-SWIPEABLE BREAKDOWN) ── */}
      <section className="py-24 px-6 sm:px-8 bg-[#f5f3ef] relative overflow-hidden">
        <div className="absolute -top-24 right-0 w-[520px] h-[520px] bg-[#D4AF37]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                Playbooks, Tours, Q&amp;A Classroom, Tools &amp; Events
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111] mb-2 leading-tight">
                Real Estate Knowledge <span className="text-[#9A7D3A]">Simplified</span>
              </h2>
              <p className="text-[#111]/70 text-base md:text-lg font-light max-w-xl">
                Every guide, tour, tool, and plain-English answer inside our hub—ordered by where to start.
              </p>
            </div>
            <Link
              href="/knowledge-hub"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition-colors shrink-0 shadow-sm"
            >
              Enter Knowledge Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Priority 01 & 02: Flagship Two-Card Editorial Spotlight With Visuals */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Link
              href="/knowledge-hub#guides"
              className="group relative bg-gradient-to-br from-[#161616] to-[#0a0a0a] text-white rounded-2xl border border-[#D4AF37]/45 hover:border-[#D4AF37] transition-all shadow-xl overflow-hidden flex flex-col-reverse sm:flex-row items-stretch"
            >
              <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div className="relative z-10 flex-1 p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#111] font-bold text-xs flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.35)]">
                        01
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
                        Start Here • Playbooks
                      </span>
                    </div>
                    <PdfAvailableBadge label="PDF Guides" />
                  </div>
                  <h3 className="font-aiveritas text-2xl xl:text-[26px] text-white group-hover:text-[#D4AF37] transition-colors mb-2 leading-snug">
                    Buyer, Seller &amp; Commercial Playbooks
                  </h3>
                  <p className="text-white/75 font-light text-sm leading-relaxed">
                    Step-by-step commercial and residential handbooks with saved notes and instant PDF downloads.
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                  Open Playbooks <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative h-48 sm:h-auto sm:w-[40%] shrink-0 overflow-hidden bg-[#1a1a1a] border-b sm:border-b-0 sm:border-l border-[#D4AF37]/25">
                <Image
                  src="/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-9.jpg"
                  alt="Mark Davis and Rachael Garnett reviewing Tampa Bay buyer, seller, and commercial playbooks"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-center px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]">
                  Saved Notes · Instant PDF
                </span>
              </div>
            </Link>

            <Link
              href="/tours"
              className="group relative bg-white text-[#111] rounded-2xl border border-[#111]/12 hover:border-[#D4AF37] transition-all shadow-sm hover:shadow-xl overflow-hidden flex flex-col-reverse sm:flex-row items-stretch"
            >
              <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div className="relative z-10 flex-1 p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-[#111] group-hover:bg-[#D4AF37] text-[#D4AF37] group-hover:text-[#111] font-bold text-xs flex items-center justify-center shadow-sm transition-colors">
                        02
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A]">
                        #GuidedByDG • Tours
                      </span>
                    </div>
                    <PdfAvailableBadge label="PDF Routes" />
                  </div>
                  <h3 className="font-aiveritas text-2xl xl:text-[26px] text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-2 leading-snug">
                    Guided Neighborhood &amp; Commercial Tours
                  </h3>
                  <p className="text-[#111]/70 font-light text-sm leading-relaxed">
                    Neighborhood drives, retail &amp; commercial corridors, Google Maps routes, and printable PDFs.
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5">
                  Explore Area Tours <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative h-48 sm:h-auto sm:w-[40%] shrink-0 overflow-hidden bg-[#111] border-b sm:border-b-0 sm:border-l border-[#111]/10">
                <Image
                  src="/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-3.jpg"
                  alt="Mark Davis and Rachael Garnett hosting a guided Tampa Bay waterfront tour"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-center px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm border border-white/20 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  Mapped Local Routes
                </span>
              </div>
            </Link>
          </div>

          {/* Priority 03–07: Horizontal Swipe Row on Mobile / Clean 5-Column Showcase on Desktop */}
          <div className="flex items-center justify-between gap-4 mb-3 lg:hidden">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A7D3A]">
              Swipe to Explore More Pillars →
            </span>
          </div>
          <div
            className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              {
                num: "03",
                icon: MapPin,
                title: "Areas We Work In",
                sub: "Local corridor spotlights",
                cta: "View Areas",
                href: "/knowledge-hub#areas",
              },
              {
                num: "04",
                icon: Calculator,
                title: "Florida Calculators",
                sub: "Mortgage, NNN & 1031 math",
                cta: "Run Numbers",
                href: "/knowledge-hub#tools",
              },
              {
                num: "05",
                icon: MessageCircleQuestion,
                title: "Q&A Classroom",
                sub: "Plain-English answers",
                cta: "Read Q&As",
                href: "/knowledge-hub#questions",
              },
              {
                num: "06",
                icon: Calendar,
                title: "Community Events",
                sub: "Local shows & gatherings",
                cta: "See Calendar",
                href: "/knowledge-hub#events",
              },
              {
                num: "07",
                icon: FileText,
                title: "Reports & Glossary",
                sub: "Market stats & key terms",
                cta: "Browse Data",
                href: "/market-reports",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.num}
                  href={pillar.href}
                  className="group min-w-[66vw] sm:min-w-[42vw] lg:min-w-0 snap-start bg-white hover:bg-[#111] rounded-2xl p-5 sm:p-6 border border-[#111]/10 hover:border-[#D4AF37] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-7 h-7 rounded-md bg-[#f5f3ef] group-hover:bg-[#D4AF37] text-[#9A7D3A] group-hover:text-[#111] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center transition-colors">
                        {pillar.num}
                      </span>
                      <Icon className="w-4 h-4 text-[#9A7D3A] group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                    <h3 className="font-aiveritas text-lg sm:text-xl text-[#111] group-hover:text-white transition-colors mb-1 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[#111]/65 group-hover:text-white/75 font-light text-xs sm:text-sm transition-colors">
                      {pillar.sub}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A7D3A] group-hover:text-[#D4AF37] flex items-center gap-1 transition-colors">
                    {pillar.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AREAS WE WORK IN — LOCAL PRESENCE ── */}
      <section className="py-24 px-8 bg-white border-t border-[#111]/5">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/3 max-w-[380px] flex flex-col items-center gap-10 lg:gap-12 shrink-0">
            <div className="w-full aspect-square relative rounded-full overflow-hidden border-4 border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              <video
                src="/new-images/davis-garnett-team-video-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
            </div>

            {/* Align Right Carrollwood Image Card */}
            <Link
              href="/align-right-carrollwood-coverage"
              className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#ef5728]/40 hover:border-[#D4AF37] shadow-lg transition-all duration-300 block"
            >
              <Image
                src="/new-images/new-2/davis-garnett-align-right-realty.jpg"
                alt="Align Right Realty Carrollwood"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
              <div className="absolute top-3 left-3.5 right-3.5 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-[#ef5728] border border-[#ef5728]/30">
                  Carrollwood HQ • FL Lic #BK3401606
                </span>
              </div>
              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2 text-left">
                <div className="min-w-0">
                  <span className="text-white font-bold text-xs tracking-wider uppercase block group-hover:text-[#D4AF37] transition-colors truncate">
                    Align Right Carrollwood
                  </span>
                  <span className="text-[11px] text-white/85 font-light block truncate">
                    Areas We Work In &amp; Coverage Map
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative w-24 h-8 shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    <Image
                      src="/align-right-email-logo.png"
                      alt="Align Right Realty Carrollwood Logo"
                      fill
                      className="object-contain object-right"
                    />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#D4AF37] transition-transform group-hover:translate-x-1 shrink-0" />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              ALIGNED CORRECTLY REAL ESTATE
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-[#111] mb-6 leading-tight">
              Areas We <span className="text-[#9A7D3A]">Work In.</span>
            </h2>
            <p className="text-[#111]/75 text-base md:text-[17px] lg:text-[18px] font-light max-w-2xl leading-relaxed mb-8 mx-auto lg:mx-0">
              Explore the neighborhoods, coastal communities, and growth corridors we serve across Greater Tampa Bay and Central Florida.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#111]/10">
              {[
                { img: "/city-photos/downtown-tampa-skyline.jpg", label: "Downtown Tampa", sub: "Water Street & Bayshore", href: "/knowledge-hub/areas/tampa-downtown-water-street" },
                { img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-westley-chapel-florida.jpg", label: "Wesley Chapel", sub: "Two Rivers & Lagoons", href: "/knowledge-hub/areas/wesley-chapel" },
                { img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-land-o-lakes-florida.jpg", label: "Land O' Lakes", sub: "Angeline & Connerton", href: "/knowledge-hub/areas/land-o-lakes" },
                { img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-saint-petersburg-downtown-and-beaches-florida.jpg", label: "St. Pete & Beaches", sub: "Downtown, Bahama Shores & Snell Isle", href: "/knowledge-hub/areas/st-petersburg" },
                { img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-clearwater-beach-pinellas-county-florida.jpg", label: "Clearwater & Pinellas", sub: "Clearwater Beach & Sand Key", href: "/knowledge-hub/areas/clearwater-pinellas-county" },
                { img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-keystone-florida.jpg", label: "Keystone", sub: "Rural Acreage & Equestrian", href: "/knowledge-hub/areas/keystone" },
                { img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-cheval.jpg", label: "Cheval & Lutz", sub: "Gated Golf & Country Club", href: "/knowledge-hub/areas/cheval" },
                { img: "/new-images/new-2/dg-brandon-hwy60.jpg", label: "Brandon & Riverview", sub: "Hwy 60 Commercial & Mixed-Use", href: "/knowledge-hub/areas/brandon-riverview" },
                { img: "/city-photos/central-fl-acreage.jpg", label: "Central FL Acreage", sub: "Ocala, Fort McCoy & Frostproof", href: "/knowledge-hub/areas/central-florida-acreage" },
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
                    <span className="text-[11px] md:text-xs text-white/80 font-light block truncate">{sub}</span>
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
          <Image src="/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-5.jpg" alt="Davis & Garnett Advisory" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-6">Commercial &amp; Residential Real Estate Team</span>
          <h2 className="font-aiveritas text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
            Built on Proven Experience.<br />
            <span className="text-[#D4AF37]">Driven by Real Results.</span>
          </h2>
          <p className="text-white/90 text-base md:text-[17px] lg:text-[18px] font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you are buying or selling a home, a commercial property, or land in Tampa Bay, Mark Davis and Rachael Garnett work together to guide you every step of the way.
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
              Commercial Real Estate
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
              Residential Real Estate
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
          <p className="text-[#111]/70 text-base md:text-[17px] lg:text-[18px] font-light max-w-xl mx-auto leading-relaxed">
            Follow our latest listings, community updates, and market insights across the Tampa Bay area.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-0">
          {[
            { img: "/listings/bahama-shores-1.webp", href: "/properties", alt: "6100 Bahama Shores Dr S - Waterfront Luxury Estate" },
            { img: "/developments/pendry/downtown-tampa-luxury-living-pendry-residences-davis-garnett-residential-commercial-advisors-1.jpg", href: "/developments/pendry-residences-tampa", alt: "Downtown Tampa Luxury Living - Pendry Residences" },
            { img: "/listings/ridgewood-brandon-2.jpg", href: "/properties", alt: "126 Ridgewood Ave - Commercial Mixed-Use Asset" },
            { img: "/listings/bahama-shores-lot-1.jpg", href: "/properties", alt: "6100 Bahama Shores Lot 10 - Pre-Construction Homesite" },
            { img: "/developments/ritz-carlton/downtown-tampa-luxury-living-ritz-carlton-residences-davis-garnett-residential-commercial-advisors-1.jpg", href: "/developments/the-ritz-carlton-residences-bayshore", alt: "Bayshore Boulevard Luxury Living - The Ritz-Carlton Residences" },
            { img: "/listings/justamere-tampa-1.jpg", href: "/properties", alt: "3012 Justamere Ln - Lakefront Estate Closed" },
            { img: "/developments/epperson-mirada/tampa-bay-new-development-epperson-mirada-davis-garnett-residential-commercial-advisors-1.jpg", href: "/developments/epperson-mirada-lagoon-wesley-chapel", alt: "Wesley Chapel Lagoon Communities - Epperson & Mirada" },
            { img: "/listings/beverly-hills-zephyrhills-1.jpg", href: "/properties", alt: "6389 Beverly Hills Dr - Abbott Square Closed" },
          ].map((item, idx) => (
            <Link key={idx} href={item.href} className="group relative aspect-square w-full overflow-hidden block bg-[#111]">
              <Image src={item.img} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
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

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  BookOpen,
  MessageCircleQuestion,
  MapPin,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Calculator,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import TourSliderSection from "@/components/TourSliderSection";
import ConsultationModal from "@/components/ConsultationModal";
import PdfAvailableBadge from "@/components/PdfAvailableBadge";
import { smoothScrollToId } from "@/lib/smoothScroll";
import { GUIDES, QUESTIONS, AREAS, EVENTS, ARTICLES } from "@/data/knowledgeHub";

export default function KnowledgeHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(6);
  const [vipTourModalOpen, setVipTourModalOpen] = useState(false);

  const guidesRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") => {
    if (!ref.current) return;
    const distance = dir === "left" ? -440 : 440;
    ref.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const q = searchQuery.trim().toLowerCase();
  const filteredGuides = GUIDES.filter(
    (item) => !q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
  );
  const filteredQuestions = QUESTIONS.filter(
    (item) => !q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
  );
  const filteredAreas = AREAS.filter(
    (item) => !q || item.name.toLowerCase().includes(q) || item.overview.toLowerCase().includes(q)
  );
  const filteredEvents = EVENTS.filter(
    (item) => !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q)
  ).sort((a, b) => (a.sortDate || "9999-12-31").localeCompare(b.sortDate || "9999-12-31"));
  const filteredArticles = ARTICLES.filter(
    (item) => !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q)
  );

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          category: "consultation",
          subject: "Tampa Bay Real Estate Question",
          message: questionText,
          source: "Knowledge Hub (/knowledge-hub)",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-16 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden min-h-[680px] flex flex-col justify-center">
        <FaviconHeroBackground variant="dark" />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto text-center">
          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
            Davis &amp; Garnett · Guides, Q&amp;A &amp; Market Updates
          </span>
          <h1 className="font-aiveritas text-5xl sm:text-7xl lg:text-8xl text-white mb-6 leading-none">
            Knowledge <span className="text-[#D4AF37]">Hub</span>
          </h1>
          <p className="text-white/85 text-base md:text-[17px] lg:text-[18px] font-light max-w-3xl mx-auto leading-relaxed mb-8">
            Real estate knowledge, simplified. Practical buyer and seller guides, local neighborhood spotlights, plain-English Q&amp;As, community events, and market updates from Mark Davis and Rachael Garnett.
          </p>

          {/* Live Search Input */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <Search className="w-5 h-5 text-[#9A7D3A] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, CDD fees, homestead exemption, neighborhoods, commercial zoning..."
              className="w-full pl-14 pr-6 py-4.5 bg-white text-[#111] rounded-xl text-sm shadow-2xl border border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Restrained Hero Action Buttons (Stay on Page) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => smoothScrollToId("hub-sections")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-[0.18em] transition-colors w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              Browse Knowledge Pillars
            </button>
            <button
              type="button"
              onClick={() => smoothScrollToId("questions")}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#111] border border-white/25 text-xs font-bold uppercase tracking-[0.18em] transition-colors w-full sm:w-auto"
            >
              <MessageCircleQuestion className="w-4 h-4 text-[#D4AF37] group-hover:text-[#111] transition-colors shrink-0" />
              Ask &amp; Q&amp;A Classroom
            </button>
          </div>
        </div>
      </section>

      {/* Clean Below-Hero Section Jump Grid (Eased Smooth Glide) */}
      <section id="hub-sections" className="py-8 px-6 md:px-8 bg-[#f5f3ef] border-b border-[#111]/10 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { label: "Get Started Worksheets", target: "get-started", icon: CheckCircle2 },
              { label: "Playbooks & Guides", target: "guides", icon: BookOpen },
              { label: "Neighborhood & CRE Tours", target: "tours", icon: Compass },
              { label: "Areas We Work In", target: "areas", icon: MapPin },
              { label: "Calculators & Glossary", target: "tools", icon: Calculator },
              { label: "Q&A Classroom", target: "questions", icon: MessageCircleQuestion },
              { label: "Community Events", target: "events", icon: Calendar },
              { label: "Market Articles", target: "articles", icon: TrendingUp },
            ].map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => smoothScrollToId(pill.target)}
                  className="group p-3 rounded-xl bg-white hover:bg-[#111] border border-[#111]/10 hover:border-[#D4AF37] text-left transition-all flex items-center gap-2.5 shadow-xs"
                >
                  <Icon className="w-4 h-4 text-[#9A7D3A] group-hover:text-[#D4AF37] shrink-0 transition-colors" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#111] group-hover:text-white leading-tight transition-colors">
                    {pill.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GET STARTED: COMMERCIAL & RESIDENTIAL WORKSHEETS (2-COLUMN FEATURE) ── */}
      <section id="get-started" className="py-20 px-8 bg-[#fbfbf9] border-b border-[#111]/8 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-10">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Start Your Plan · Interactive Worksheets &amp; PDFs
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
              Get Started: Commercial &amp; Residential
            </h2>
            <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              Choose your lane below to launch our 8-step Getting Started discovery deck online or download the matching printable PDF worksheet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                slug: "commercial-get-started",
                badge: "Commercial & Land",
                title: "Commercial & Land Get Started Plan",
                description:
                  "Map out SBA 504 financing, NNN cap rates, 1031 exchange deadlines, zoning needs, or raw land acquisition goals—plus a printable strategy packet.",
                image: "/images/knowledge-hub/davis-garnett-knowledge-hub-commercial-1.jpg",
                href: "/commercial/get-started",
                cta: "Start Commercial Plan",
              },
              {
                slug: "residential-get-started",
                badge: "Residential",
                title: "Residential Get Started & Moving Plan",
                description:
                  "Outline your Tampa Bay neighborhood goals, budget, home style, timing, and HOA/CDD preferences online—or print our matching client worksheet.",
                image: "/images/knowledge-hub/davis-garnett-knowledge-hub-residential-1.jpg",
                href: "/residential/get-started",
                cta: "Start Residential Plan",
              },
            ].map((card) => (
              <Link
                key={card.slug}
                href={card.href}
                className="group bg-[#f5f3ef] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3.5 left-4 right-4 flex flex-col items-start gap-2 pointer-events-none">
                      <span className="px-3 py-1 bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap">
                        {card.badge}
                      </span>
                      <PdfAvailableBadge />
                    </div>
                    <span className="absolute bottom-3 right-4 text-[11px] text-white/90 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> 8-Step Worksheet
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-xl xl:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[#111]/75 text-base font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#111]/55 font-medium">Interactive + Printable PDF</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDER 1: ADVISORY PLAYBOOKS & BUYER/SELLER GUIDES ── */}
      <section id="guides" className="py-24 px-8 bg-white border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                01 • Step-by-Step Handbooks
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Commercial &amp; Residential Guides
              </h2>
              <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] lg:text-[18px] leading-relaxed">
                Step-by-step playbooks covering home buying and selling, waterfront estates, NNN commercial leases, land acquisitions, Florida Homestead rules, and CDD fees.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(guidesRef, "left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Guides Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(guidesRef, "right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Guides Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={guidesRef}
            className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/knowledge-hub/${guide.slug}`}
                className="group min-w-[320px] md:min-w-[390px] max-w-[390px] snap-start bg-[#f5f3ef] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={guide.heroImage}
                      alt={guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3.5 left-4 right-4 flex flex-col items-start gap-2 pointer-events-none">
                      <span className="px-3 py-1 bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm whitespace-nowrap">
                        {guide.category}
                      </span>
                      <PdfAvailableBadge />
                    </div>
                    <span className="absolute bottom-3 right-4 text-[11px] text-white/90 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {guide.readTime}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-xl xl:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug line-clamp-2 min-h-[3.25rem]">
                      {guide.title}
                    </h3>
                    <p className="text-[#111]/75 text-base font-light leading-relaxed line-clamp-3">
                      {guide.subtitle}
                    </p>
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#111]/55 font-medium">By {guide.author.name}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    Read Playbook <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 02: GUIDED NEIGHBORHOOD & COMMERCIAL TOURS (#GuidedByDG) ── */}
      <TourSliderSection
        id="tours"
        sectionEyebrow="02 • #GuidedByDG — Self-Guided Tour Kits Made by D&G"
        sectionTitle="Guided Neighborhood &amp; Commercial Tours"
        bgClass="bg-[#f5f3ef]"
      />
      {/* ── SLIDER 3: AREAS WE WORK IN — GEOLOCATED NEIGHBORHOOD SPOTLIGHTS ── */}
      <section id="areas" className="py-24 px-8 bg-white border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                03 • Local Market Footprints
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Areas We Work In
              </h2>
              <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] lg:text-[18px] leading-relaxed">
                Local neighborhood guides across St. Petersburg, Downtown Tampa &amp; Bayshore, Wesley Chapel, Land O&apos; Lakes, Brandon, and Central Florida Acreage.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(areasRef, "left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Areas Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(areasRef, "right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Areas Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={areasRef}
            className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Align Right Carrollwood Featured Spoke Card */}
            <Link
              href="/align-right-carrollwood-coverage"
              className="group min-w-[320px] md:min-w-[390px] max-w-[390px] snap-start bg-[#111111] text-white border border-[#ef5728]/40 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl shrink-0"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src="/new-images/new-2/davis-garnett-align-right-realty.jpg"
                    alt="Align Right Realty Carrollwood"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#ef5728] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm z-10">
                    Brokerage HQ
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <div className="text-xs uppercase tracking-widest text-[#ef5728] font-bold">
                      FL Lic BK3401606
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-aiveritas text-2xl text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                    Carrollwood &amp; Regional Coverage
                  </h3>
                  <p className="text-white/80 text-base font-light leading-relaxed line-clamp-3 mb-4">
                    Our Carrollwood office at Align Right Realty Carrollwood (BK3401606)—supporting buyers and sellers across Hillsborough, Pinellas, Pasco, Polk, and Marion counties.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["3903 Northdale Blvd", "Hillsborough", "Pinellas", "Pasco", "Polk", "Marion"].map((n) => (
                      <span
                        key={n}
                        className="text-[10px] px-2.5 py-1 bg-white/10 rounded-md border border-white/15 text-white/80 font-medium"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-7 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-[#ef5728] font-bold">5 Counties Served</span>
                <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-[#D4AF37] flex items-center gap-1.5">
                  View Coverage <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            {filteredAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/knowledge-hub/areas/${area.slug}`}
                className="group min-w-[320px] md:min-w-[390px] max-w-[390px] snap-start bg-[#f5f3ef] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={area.heroImage}
                      alt={area.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {area.county}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                        Median: {area.medianPrice}
                      </div>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-2">
                      {area.name}
                    </h3>
                    <p className="text-[#111]/75 text-base font-light leading-relaxed line-clamp-3 mb-4">
                      {area.overview}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.topNeighborhoods.slice(0, 4).map((n) => (
                        <span
                          key={n}
                          className="text-[10px] px-2.5 py-1 bg-white rounded-md border border-[#111]/10 text-[#111]/70 font-medium"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#9A7D3A] font-bold">{area.yoyGrowth}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#111] group-hover:text-[#9A7D3A] flex items-center gap-1.5">
                    Explore Area Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Guided Area & Shopping Zone Tour Callout (Positioned Below Areas Slider) */}
          <div className="mt-12 bg-[#111111] rounded-2xl p-6 sm:p-8 text-white border border-[#D4AF37]/40 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#ef5728] to-[#D4AF37]" />

            {/* Left: Advisor Portraits + Content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left flex-1">
              <div className="flex items-center -space-x-3 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                  alt="Mark Davis"
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#D4AF37] shadow-md"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                  alt="Rachael Garnett"
                  className="w-16 h-16 rounded-full object-cover object-[center_30%] border-2 border-[#D4AF37] shadow-md"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-sm bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-[0.2em]">
                    #GuidedByDG
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                    Self-Guided Tour Kits Made by D&amp;G • Or Ride With Us
                  </span>
                </div>
                <h3 className="font-aiveritas text-xl sm:text-2xl text-white mb-1">
                  Take a Tour Built by Mark &amp; Rachael
                </h3>
                <p className="text-sm md:text-base text-white/80 font-light max-w-2xl">
                  Drive our self-guided Google Maps routes with Mark &amp; Rachael&apos;s local picks and printable tour guides—or book a private VIP tour with us.
                </p>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shrink-0"
              >
                View Self-Guided Tours
              </Link>
              <button
                type="button"
                onClick={() => setVipTourModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shrink-0 shadow-md cursor-pointer"
              >
                <Compass className="w-4 h-4" /> Book a VIP Tour <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 06: INTERACTIVE CALCULATORS & PLANNING TOOLS ── */}
      <section id="tools" className="py-24 px-8 bg-[#f5f3ef] border-b border-[#111]/10 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                04 • Interactive Tools &amp; Glossary
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Calculators &amp; Financial Planning Tools
              </h2>
              <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] leading-relaxed">
                Run your own Tampa Bay mortgage payment (with HOA &amp; CDD fees), commercial NNN vs. Gross lease rent, seller closing proceeds, cap rate, or IRS 1031 deadlines before making a move.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/glossary"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#111]/15 hover:border-[#D4AF37] text-xs font-bold uppercase tracking-widest text-[#111] shrink-0"
              >
                Browse Real Estate Glossary <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => scrollSlider(toolsRef, "left")}
                  className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                  aria-label="Scroll Tools Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollSlider(toolsRef, "right")}
                  className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                  aria-label="Scroll Tools Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={toolsRef}
            className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              {
                tag: "Residential Financing • PITI + CDD",
                title: "Florida Mortgage, Tax, Insurance & CDD Calculator",
                desc: "Estimate monthly P&I payments alongside county property taxes, Florida windstorm insurance, HOA dues, and non-ad valorem CDD fees.",
                href: "/tools/mortgage-calculator",
                cta: "Calculate Mortgage Payment",
              },
              {
                tag: "Commercial Leasing • NNN & CAM",
                title: "Commercial Rent & NNN Lease Calculator",
                desc: "Compare Triple Net (NNN), Modified Gross, and Full-Service leases with CAM, taxes, insurance, annual escalations, and 5-year schedules.",
                href: "/tools/commercial-rent-calculator",
                cta: "Model Commercial Lease",
              },
              {
                tag: "Seller Tool • Hillsborough & Pinellas",
                title: "Florida Seller Net Proceeds Calculator",
                desc: "Estimate Florida deed documentary stamps ($0.70 per $100), owner title insurance, mortgage payoff, tax prorations, and net equity.",
                href: "/tools/seller-net-proceeds",
                cta: "Estimate Net Proceeds",
              },
              {
                tag: "Commercial & Investment",
                title: "Commercial Cap Rate & NOI Calculator",
                desc: "Model Net Operating Income, capitalization rate, Gross Rent Multiple, and valuation sensitivity across Tampa Bay NNN assets.",
                href: "/tools/cap-rate-calculator",
                cta: "Calculate Cap Rate",
              },
              {
                tag: "Tax-Deferred Exchange",
                title: "IRS 1031 Deadline Calculator",
                desc: "Enter your closing date to lock in your exact Day 45 written identification deadline and Day 180 closing deadline.",
                href: "/tools/1031-deadline-calculator",
                cta: "Calculate 1031 Dates",
              },
              {
                tag: "Plain-English Field Manual",
                title: "Tampa Bay & Commercial Real Estate Glossary",
                desc: "Clear definitions covering Cap Rate, NOI, CAM, NNN, TI Allowance, Estoppels, Phase I ESA, CDDs, Homestead Portability, and 4-Points.",
                href: "/glossary",
                cta: "Browse Full Glossary",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group min-w-[320px] md:min-w-[380px] max-w-[380px] snap-start shrink-0 bg-white rounded-2xl p-8 border border-[#111]/10 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] block mb-3">
                    {tool.tag}
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#111]/70 font-light leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111] group-hover:text-[#9A7D3A]">
                  {tool.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDER 2: THE D&G CLASSROOM — TOP PURCHASE, SALE & INVESTMENT QUESTIONS (Q&A) ── */}
      <section id="questions" className="py-24 px-8 bg-white border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                05 • Davis &amp; Garnett Classroom
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Top Buying, Selling &amp; Investing Questions
              </h2>
              <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] lg:text-[18px] leading-relaxed">
                Direct, plain-English answers to the most common questions buyers, sellers, and commercial investors ask about Florida real estate.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(qaRef, "left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Questions Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(qaRef, "right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Questions Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={qaRef}
            className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredQuestions.map((qa) => (
              <Link
                key={qa.slug}
                href={`/knowledge-hub/${qa.slug}`}
                className="group min-w-[320px] md:min-w-[380px] max-w-[380px] snap-start bg-[#f5f3ef] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={qa.heroImage}
                      alt={qa.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#111]/90 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {qa.category}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-xl xl:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug line-clamp-2 min-h-[3.25rem]">
                      {qa.title}
                    </h3>
                    <p className="text-[#111]/75 text-base font-light leading-relaxed line-clamp-3">
                      {qa.subtitle}
                    </p>
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#111]/55 font-medium">{qa.author.name}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    View Answer <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDER 4: COMMUNITY EVENTS, OUTREACH & VIP EXPERIENCES ── */}
      <section id="events" className="py-24 px-8 bg-[#f5f3ef] border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                06 • Local Gatherings &amp; Causes
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Community Events &amp; Local Gatherings
              </h2>
              <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] lg:text-[18px] leading-relaxed">
                Join Mark Davis and Rachael Garnett for local real estate workshops, builder previews, and Tampa Bay community outreach days.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(eventsRef, "left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Events Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(eventsRef, "right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md shadow-[#D4AF37]/30 hover:bg-[#111] hover:text-[#D4AF37] hover:scale-105 active:scale-95 transition-all"
                aria-label="Scroll Events Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={eventsRef}
            className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredEvents.map((ev) => (
              <Link
                key={ev.slug}
                href={`/knowledge-hub/events/${ev.slug}`}
                className="group min-w-[320px] md:min-w-[380px] max-w-[380px] snap-start bg-white border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={ev.heroImage}
                      alt={ev.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {ev.category}
                    </span>
                  </div>
                  <div className="p-7">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#9A7D3A] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {ev.date}
                    </div>
                    <h3 className="font-aiveritas text-xl xl:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug line-clamp-2 min-h-[3.25rem]">
                      {ev.title}
                    </h3>
                    <p className="text-[#111]/75 text-base font-light leading-relaxed line-clamp-3">
                      {ev.summary}
                    </p>
                    {ev.externalAction && (
                      <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] uppercase tracking-wider font-bold text-[#ef5728]">
                        ✦ {ev.externalAction.type === "donate" ? "Charity Donation / Official Site" : ev.externalAction.type === "register" ? "Official Builder Registration" : "Official Tickets Portal"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#111]/55 truncate max-w-[180px]">{ev.location}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5">
                    RSVP / Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 05: MARKET INTELLIGENCE & EDITORIAL REPORTS (LOAD MORE GRID) ── */}
      <section id="articles" className="py-24 px-8 bg-white border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                07 • Market Updates &amp; Articles
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Tampa Bay Market Updates &amp; Articles
              </h2>
              <p className="text-[#111]/70 font-light max-w-2xl text-base md:text-[17px] lg:text-[18px] leading-relaxed">
                Local market updates, relocation insights, and residential and commercial real estate articles across the Tampa Bay region.
              </p>
            </div>
          </div>

          {/* 2 Rows of 3 Columns Grid (all cards kept in SSR DOM for full search crawlability) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <Link
                key={art.slug}
                href={`/knowledge-hub/articles/${art.slug}`}
                className={`${idx >= visibleArticlesCount ? "hidden" : "flex"
                  } group bg-[#f5f3ef] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex-col justify-between transition-all hover:shadow-xl`}
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={art.heroImage}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {art.category}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-xl xl:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug line-clamp-2 min-h-[3.25rem]">
                      {art.title}
                    </h3>
                    <p className="text-[#111]/75 text-base font-light leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#111]/55">{art.author.name} • {art.readTime}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1.5">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button (+3 articles / 1 row each click) */}
          {visibleArticlesCount < filteredArticles.length && (
            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => setVisibleArticlesCount((prev) => prev + 3)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111] hover:bg-[#ef5728] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer border border-[#ef5728]/30 group"
              >
                <span>Load More</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── ASK AN ADVISOR / EMPOWER YOUR REAL ESTATE JOURNEY CTA ── */}
      <section className="py-24 px-8 bg-[#111] text-white">
        <div className="max-w-4xl mx-auto bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="font-aiveritas text-3xl text-white mb-3">
                Thank You for Reaching Out.
              </h3>
              <p className="text-white/70 font-light max-w-md mx-auto">
                Mark Davis or Rachael Garnett will respond personally with a tailored answer and local market data.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold block mb-3">
                  Ask Mark &amp; Rachael
                </span>
                <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-4">
                  Have a Specific Real Estate Question?
                </h2>
                <p className="text-white/80 font-light max-w-2xl mx-auto text-base md:text-[17px] lg:text-[18px] leading-relaxed">
                  Ask Mark Davis and Rachael Garnett directly—we will send you a clear, helpful answer with local Tampa Bay market info.
                </p>
              </div>

              <form onSubmit={handleAskSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name *"
                    className="px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name *"
                    className="px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm focus:outline-none"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="What would you like to know about buying, selling, commercial zoning, CDD fees, or a specific Tampa Bay neighborhood?"
                  className="w-full px-4 py-3.5 bg-white text-[#111] rounded-lg text-sm focus:outline-none"
                />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-white/50 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Answered Directly by Mark Davis &amp; Rachael Garnett
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                  >
                    {submitting ? "Sending..." : "Submit Question to Advisors"}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <Link href="/glossary" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              Real Estate Glossary
            </Link>
            <Link href="/hub/55-plus-tampa-bay" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              55+ Communities Hub
            </Link>
            <Link href="/hub/commercial-tampa-bay" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              Commercial Hub
            </Link>
            <Link href="/hub/waterfront-st-petersburg" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              St. Pete Waterfront Hub
            </Link>
            <Link href="/hub/land-acreage-central-florida" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              Land &amp; Acreage Hub
            </Link>
            <Link href="/hub/carrollwood-northdale-homes" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              Carrollwood Hub
            </Link>
            <Link href="/tools/seller-net-proceeds" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              Seller Net Proceeds Tool
            </Link>
            <Link href="/tools/cap-rate-calculator" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              Cap Rate Calculator
            </Link>
            <Link href="/tools/1031-deadline-calculator" className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] font-bold transition-colors">
              1031 Deadline Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QUESTIONS.map((qItem) => ({
              "@type": "Question",
              name: qItem.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: qItem.keyTakeaways.join(" "),
              },
            })),
          }),
        }}
      />

      <SiteFooter />

      <ConsultationModal
        isOpen={vipTourModalOpen}
        onClose={() => setVipTourModalOpen(false)}
        defaultInterest="VIP Guided Area or Shopping Zone Tour"
        defaultAdvisor="Mark Davis & Rachael Garnett"
        title="Schedule Your VIP Tour With Mark & Rachael"
      />
    </div>
  );
}


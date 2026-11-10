"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  MessageCircleQuestion,
  MapPin,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
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

  const guidesRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

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
  );
  const filteredArticles = ARTICLES.filter(
    (item) => !q || item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q)
  );

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          email,
          phone,
          propertyInterest: "Knowledge Hub Question / Advisory Inquiry",
          notes: questionText,
          source: "Knowledge Hub Page",
          status: "New",
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
      <section className="relative pt-36 pb-24 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image src="/city_tampa_1787662311501.png" alt="Tampa Bay Knowledge Hub" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            <BookOpen className="w-3.5 h-3.5" /> Davis &amp; Garnett Advisory Resource Center
          </span>
          <h1 className="font-aiveritas text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
            Real Estate Knowledge Simplified
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Expert playbooks, local neighborhood guides, AI search Q&amp;As, community events, and market updates from Tampa Bay&apos;s premier commercial &amp; residential advisors.
          </p>

          {/* Live Search Input */}
          <div className="max-w-2xl mx-auto relative mb-10">
            <Search className="w-5 h-5 text-[#9A7D3A] absolute left-5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, CDD fees, homestead exemption, neighborhoods, commercial zoning..."
              className="w-full pl-14 pr-6 py-4.5 bg-white text-[#111] rounded-xl text-sm shadow-2xl border border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Quick Jump Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Playbooks & Guides", href: "#guides", icon: BookOpen },
              { label: "The D&G Q&A Classroom", href: "#questions", icon: MessageCircleQuestion },
              { label: "Areas We Work In", href: "#areas", icon: MapPin },
              { label: "Community Events", href: "#events", icon: Calendar },
              { label: "Market Intelligence", href: "#articles", icon: TrendingUp },
            ].map((pill) => {
              const Icon = pill.icon;
              return (
                <a
                  key={pill.label}
                  href={pill.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#111] border border-white/15 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#111]" />
                  {pill.label}
                </a>
              );
            })}
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
                Advisory Playbooks &amp; Guides
              </h2>
              <p className="text-[#111]/60 font-light max-w-2xl text-sm md:text-base">
                Comprehensive playbooks covering luxury waterfront due diligence, home selling valuation, commercial mixed-use investing, Florida Homestead portability, and CDD fees.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(guidesRef, "left")}
                className="p-3 rounded-full border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
                aria-label="Scroll Guides Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(guidesRef, "right")}
                className="p-3 rounded-full border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
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
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {guide.category}
                    </span>
                    <span className="absolute bottom-3 right-4 text-[11px] text-white/90 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {guide.readTime}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-[#111]/65 text-sm font-light leading-relaxed line-clamp-3">
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

      {/* ── SLIDER 2: THE D&G CLASSROOM — TOP PURCHASE, SALE & INVESTMENT QUESTIONS (Q&A) ── */}
      <section id="questions" className="py-24 px-8 bg-[#f5f3ef] border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                02 • Davis &amp; Garnett Classroom
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Top Purchase, Sale &amp; Investment Questions
              </h2>
              <p className="text-[#111]/60 font-light max-w-2xl text-sm md:text-base">
                Direct, plain-English answers to the most important questions buyers, sellers, and commercial investors ask about Florida real estate.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(qaRef, "left")}
                className="p-3 rounded-full bg-white border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
                aria-label="Scroll Questions Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(qaRef, "right")}
                className="p-3 rounded-full bg-white border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
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
                className="group min-w-[320px] md:min-w-[380px] max-w-[380px] snap-start bg-white border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
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
                    <h3 className="font-aiveritas text-xl md:text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug">
                      {qa.title}
                    </h3>
                    <p className="text-[#111]/65 text-sm font-light leading-relaxed line-clamp-3">
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
              <p className="text-[#111]/60 font-light max-w-2xl text-sm md:text-base">
                Hyper-local neighborhood guides across St. Petersburg, Downtown Tampa &amp; Bayshore, Wesley Chapel, Land O&apos; Lakes, Brandon, and Central Florida Acreage.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(areasRef, "left")}
                className="p-3 rounded-full border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
                aria-label="Scroll Areas Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(areasRef, "right")}
                className="p-3 rounded-full border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
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
                      FL Lic #BK3401606
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-aiveritas text-2xl text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                    Carrollwood &amp; Regional Coverage
                  </h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                    The principal brokerage headquarters orchestrating transaction compliance, Stellar MLS syndication, and dual-asset advisory across Greater Tampa Bay.
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
                    <p className="text-[#111]/65 text-sm font-light leading-relaxed line-clamp-3 mb-4">
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

          {/* Align Right Carrollwood Regional Coverage Callout (Positioned Below Slider) */}
          <div className="mt-12 bg-[#111111] rounded-2xl p-6 sm:p-8 text-white border border-[#ef5728]/40 shadow-xl flex flex-col xl:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ef5728] via-[#D4AF37] to-[#ef5728]" />
            
            {/* Left: Thumbnail + Content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left flex-1">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-white/15 shrink-0 shadow-md">
                <Image
                  src="/new-images/new-2/davis-garnett-align-right-realty.jpg"
                  alt="Align Right Realty Carrollwood"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#ef5728] font-bold block mb-1">
                  ALIGNED CORRECTLY REAL ESTATE • FL Lic #BK3401606
                </span>
                <h3 className="font-aiveritas text-xl sm:text-2xl text-white mb-1">
                  Align Right Carrollwood: Regional Coverage &amp; Areas We Work In
                </h3>
                <p className="text-xs text-white/70 font-light max-w-xl">
                  Mark Davis &amp; Rachael Garnett orchestrate commercial, residential, and acreage transactions across 5 Central Florida counties.
                </p>
              </div>
            </div>

            {/* Right: Align Right Logo + CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-5 shrink-0">
              <div className="relative w-36 h-11 shrink-0 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/align-right-email-logo.png"
                  alt="Align Right Realty Carrollwood"
                  fill
                  className="object-contain"
                />
              </div>
              <Link
                href="/align-right-carrollwood-coverage"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#ef5728] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shrink-0 shadow-md"
              >
                Explore Full Coverage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDER 4: COMMUNITY EVENTS, OUTREACH & VIP EXPERIENCES ── */}
      <section id="events" className="py-24 px-8 bg-[#f5f3ef] border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                04 • Briefings, Tours &amp; Causes
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Community Events &amp; VIP Previews
              </h2>
              <p className="text-[#111]/60 font-light max-w-2xl text-sm md:text-base">
                Join Mark Davis and Rachael Garnett for private luxury condo previews, master-planned builder tours, commercial investor roundtables, and community outreach days.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(eventsRef, "left")}
                className="p-3 rounded-full bg-white border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
                aria-label="Scroll Events Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(eventsRef, "right")}
                className="p-3 rounded-full bg-white border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
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
                    <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-[#111]/65 text-sm font-light leading-relaxed line-clamp-3">
                      {ev.summary}
                    </p>
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

      {/* ── SLIDER 5: MARKET INTELLIGENCE & EDITORIAL REPORTS ── */}
      <section id="articles" className="py-24 px-8 bg-white border-b border-[#111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                05 • Research &amp; Commentary
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-3">
                Market Intelligence &amp; Editorial Reports
              </h2>
              <p className="text-[#111]/60 font-light max-w-2xl text-sm md:text-base">
                In-depth market analyses, demographic migration reports, and commercial investment commentary across the Florida Gulf Coast.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollSlider(articlesRef, "left")}
                className="p-3 rounded-full border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
                aria-label="Scroll Articles Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollSlider(articlesRef, "right")}
                className="p-3 rounded-full border border-[#111]/15 hover:bg-[#111] hover:text-white transition-colors"
                aria-label="Scroll Articles Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={articlesRef}
            className="flex gap-7 overflow-x-auto pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/knowledge-hub/articles/${art.slug}`}
                className="group min-w-[320px] md:min-w-[390px] max-w-[390px] snap-start bg-[#f5f3ef] border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
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
                    <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-[#111]/65 text-sm font-light leading-relaxed line-clamp-3">
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
                  Direct Advisory Access
                </span>
                <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-4">
                  Have a Specific Real Estate Question?
                </h2>
                <p className="text-white/70 font-light max-w-2xl mx-auto text-sm md:text-base">
                  Ask Mark Davis (Commercial &amp; Land) or Rachael Garnett (Luxury Residential &amp; Relocation) directly. We will send you a customized breakdown.
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
    </div>
  );
}


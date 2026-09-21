"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Globe, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, X } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

/* ═══════════════════════════════════════════════════════════
   COCA-COLA STRUCTURE × DOLCE & GABBANA AESTHETIC
   
   Exact structural mapping:
   1. Header → Mega-menu tabs (Company / Portfolio / Collections / News)
   2. Hero Carousel → Staggered headline left, cycling slides right, brand icon dots
   3. Company Story → Centered statement + CTA
   4. Latest News → Teaser card grid with category tags + hover effects
   ═══════════════════════════════════════════════════════════ */

// ── DOLCE COLOR PALETTE ──
const DOLCE = {
  nero: "#000000",
  bianco: "#FFFFFF",
  oro: "#C9A84C",
  rosso: "#B91C1C",
  bluMed: "#1E3A5F",
  verde: "#1B4332",
  carretto: "#7F1D1D",
  crema: "#FAF7F2",
  grigio: "#6B7280",
};

// ── CAROUSEL SLIDE DATA ──
const heroSlides = [
  {
    pretitle: "Featured Listing",
    headline: "Villa Azzurra on Davis Islands",
    cta: "View Property",
    ctaHref: "#",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-1.jpg",
    brandIcon: "/version-2-dolce/blu_mediterraneo_motif.png",
    aura: "linear-gradient(135deg, rgba(30,58,95,0.15) 0%, rgba(201,168,76,0.08) 100%)",
  },
  {
    pretitle: "Commercial",
    headline: "The Carretto Tower — Class-A Office Portfolio",
    cta: "Explore",
    ctaHref: "#",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-7.jpg",
    brandIcon: "/version-2-dolce/carretto_siciliano_motif.png",
    aura: "linear-gradient(135deg, rgba(127,29,29,0.12) 0%, rgba(201,168,76,0.08) 100%)",
  },
  {
    pretitle: "Residential",
    headline: "Bayshore Waterfront — Private Estate Collection",
    cta: "Explore",
    ctaHref: "#",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-6.jpg",
    brandIcon: "/version-2-dolce/verde_maiolica_motif.png",
    aura: "linear-gradient(135deg, rgba(27,67,50,0.12) 0%, rgba(201,168,76,0.08) 100%)",
  },
  {
    pretitle: "La Dolce Vita",
    headline: "Experience the D&G Lifestyle in Tampa Bay",
    cta: "Explore",
    ctaHref: "#",
    image: "/version-2-dolce/lifestyle-dolce/la-dolce-vita-poolside-party-retro-print-wall-art-picture-poster-frame-701539.jpg",
    brandIcon: "/dg-favicon-fat.png",
    aura: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(0,0,0,0.05) 100%)",
  },
];

// ── MEGA-MENU DATA (matches Coca-Cola's tab structure) ──
const megaMenuData: Record<string, { title: string; description: string; image: string; links: { label: string; href: string; sublinks?: { label: string; href: string }[] }[] }> = {
  Company: {
    title: "Davis & Garnett",
    description: "Tampa Bay's premier unified real estate advisory group. Commercial power meets luxury residential execution.",
    image: "/version-2-dolce/davis-garnett-headshots-dolce/mark-davis-headshot-4.jpg",
    links: [
      { label: "Our Vision & Purpose", href: "#" },
      { label: "The Unified Force", href: "#" },
      { label: "Leadership", href: "#", sublinks: [{ label: "Mark Davis", href: "#" }, { label: "Rachael Garnett", href: "#" }] },
      { label: "Areas of Expertise", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  Portfolio: {
    title: "New Listings",
    description: "Browse our latest active properties — luxury residences, commercial acquisitions, and development opportunities currently available across Tampa Bay.",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-3.jpg",
    links: [
      { label: "All Active Listings", href: "#" },
      { label: "Commercial", href: "#", sublinks: [{ label: "Multi-Family", href: "#" }, { label: "Industrial", href: "#" }, { label: "Office", href: "#" }, { label: "Development Sites", href: "#" }] },
      { label: "Residential", href: "#", sublinks: [{ label: "Waterfront Estates", href: "#" }, { label: "New Construction", href: "#" }, { label: "Golf Communities", href: "#" }, { label: "Condominiums", href: "#" }] },
      { label: "Land & Development", href: "#" },
    ],
  },
  Collections: {
    title: "Sold Properties",
    description: "Our track record speaks for itself. Explore the properties we've successfully closed — a testament to our market expertise and client results.",
    image: "/version-2-dolce/blu_mediterraneo_motif.png",
    links: [
      { label: "All Sold Properties", href: "#" },
      { label: "Commercial Closings", href: "#", sublinks: [{ label: "Multi-Family", href: "#" }, { label: "Industrial & Logistics", href: "#" }, { label: "Office & Mixed-Use", href: "#" }] },
      { label: "Residential Closings", href: "#", sublinks: [{ label: "Waterfront Estates", href: "#" }, { label: "Luxury Homes", href: "#" }, { label: "Condominiums", href: "#" }] },
      { label: "Notable Transactions", href: "#" },
    ],
  },
  News: {
    title: "Market Intelligence",
    description: "Stay ahead with our expert analysis of Tampa Bay's commercial and residential real estate markets.",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-2.jpeg",
    links: [
      { label: "Latest Reports", href: "#" },
      { label: "Commercial Forecasts", href: "#" },
      { label: "Residential Trends", href: "#" },
      { label: "Video Insights", href: "#" },
    ],
  },
};

// ── NEWS CARD DATA ──
const newsCards = [
  {
    pretitle: "News",
    title: "Davis & Garnett Secures Record-Breaking Bayshore Estate Transaction",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-4.jpeg",
    brandIcon: "/version-2-dolce/blu_mediterraneo_motif.png",
    href: "#",
  },
  {
    pretitle: "Press Release",
    title: "Q3 2026 Tampa Bay Commercial Real Estate Forecast — Industrial Dominance Continues",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-2.jpeg",
    brandIcon: "/version-2-dolce/carretto_siciliano_motif.png",
    href: "#",
  },
  {
    pretitle: "Press Release",
    title: "The Unified Force: How D&G's Dual-Division Model is Reshaping Tampa Bay Advisory",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-8.jpeg",
    brandIcon: "/dg-favicon-fat.png",
    href: "#",
  },
  {
    pretitle: "News",
    title: "Exclusive La Dolce Vita Client Event — Behind the Scenes at Villa Rosa",
    image: "/version-2-dolce/lifestyle-dolce/la-dolce-vita-house-party-vibes-wall-art-picture-poster-frame-998825.jpg",
    brandIcon: "/version-2-dolce/verde_maiolica_motif.png",
    href: "#",
  },
  {
    pretitle: "Brands",
    title: "Luxury Waterfront Inventory Hits Record Low — What Buyers Need to Know",
    image: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-9.jpeg",
    brandIcon: "/version-2-dolce/blu_mediterraneo_motif.png",
    href: "#",
  },
  {
    pretitle: "News",
    title: "Mark Davis Named Tampa Bay's Top Commercial Advisor for Third Consecutive Year",
    image: "/version-2-dolce/davis-garnett-headshots-dolce/mark-davis-headshot-3.JPEG",
    brandIcon: "/dg-favicon-fat.png",
    href: "#",
  },
];


export default function PreviewMockup2DolceCola() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance carousel
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goToSlide = (idx: number) => {
    setSlideDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
    startTimer();
  };
  const prevSlide = () => { goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length); };
  const nextSlide = () => { goToSlide((currentSlide + 1) % heroSlides.length); };

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════
          1. HEADER — Coca-Cola exact structure
          Logo left | Nav center | Icons right
          Each nav item opens a mega-menu panel on hover/click
         ══════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100" onMouseLeave={() => setActiveMenu(null)}>
        <div className="max-w-[1440px] mx-auto px-8 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/preview-mockup-2" className="flex-shrink-0 relative z-10">
            <Image src="/dg-favicon-fat.png" alt="D&G" width={40} height={40} className="object-contain" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-0">
            {Object.keys(megaMenuData).map((key) => (
              <button
                key={key}
                className={`relative px-6 h-[72px] text-[13px] font-bold uppercase tracking-[0.15em] transition-colors ${activeMenu === key ? "text-black" : "text-gray-600 hover:text-black"}`}
                onMouseEnter={() => setActiveMenu(key)}
                onClick={() => setActiveMenu(activeMenu === key ? null : key)}
              >
                {key}
                {/* Active indicator line (Coca-Cola style bottom border) */}
                <span className={`absolute bottom-0 left-6 right-6 h-[3px] bg-black transition-transform origin-left ${activeMenu === key ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            ))}
            <Link href="#" className="px-6 h-[72px] flex items-center text-[13px] font-bold uppercase tracking-[0.15em] text-gray-600 hover:text-black transition-colors">
              Investors
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-black transition-colors"><Search className="w-[18px] h-[18px]" /></button>
            <button className="text-gray-500 hover:text-black transition-colors"><Globe className="w-[18px] h-[18px]" /></button>
          </div>
        </div>

        {/* ── MEGA MENU PANEL (Coca-Cola tab panel) ── */}
        {activeMenu && megaMenuData[activeMenu] && (
          <div
            className="absolute top-[72px] left-0 w-full bg-white border-t border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1440px] mx-auto px-8 py-10 grid grid-cols-[1fr_1fr_1fr] gap-12">
              {/* Left: Teaser (Coca-Cola style — image + description + CTA) */}
              <div className="flex flex-col">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <Image src={megaMenuData[activeMenu].image} alt={megaMenuData[activeMenu].title} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{megaMenuData[activeMenu].title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{megaMenuData[activeMenu].description}</p>
                <Link href="#" className="text-[13px] font-bold uppercase tracking-[0.1em] text-black hover:underline">Learn more</Link>
              </div>

              {/* Center + Right: Link columns */}
              <div className="col-span-2 grid grid-cols-2 gap-8">
                {megaMenuData[activeMenu].links.map((link, i) => (
                  <div key={i}>
                    <Link href={link.href} className="text-lg font-bold hover:underline block mb-3">{link.label}</Link>
                    {link.sublinks && (
                      <ul className="space-y-2">
                        {link.sublinks.map((sub, j) => (
                          <li key={j}><Link href={sub.href} className="text-sm text-gray-500 hover:text-black transition-colors">{sub.label}</Link></li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>


      {/* ══════════════════════════════════════════════════════════
          2. HERO CAROUSEL — Coca-Cola exact structure
          Staggered headline left | Feature image right
          Brand icon thumbnails as dots below
         ══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[85vh] mt-[72px] flex items-center overflow-hidden transition-all duration-700"
        style={{ background: slide.aura }}
      >
        {/* Left: Staggered headline text */}
        <div className="relative z-10 w-1/2 pl-16 pr-8 py-20">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">{slide.pretitle}</p>
          <h1
            className="text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[1.05] tracking-tight mb-10 text-black"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {slide.headline.split("—").map((part, i) => (
              <span key={i} className="block" style={{ paddingLeft: `${i * 2.5}rem` }}>{part.trim()}</span>
            ))}
          </h1>
          <Link
            href={slide.ctaHref}
            className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.15em] text-black border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            {slide.cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: Feature image */}
        <div className="absolute right-0 top-0 w-[55%] h-full">
          <Image
            key={currentSlide}
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover animate-in fade-in zoom-in-105 duration-700"
          />
          {/* Soft left-edge fade so text is always readable */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        </div>

        {/* Brand icon thumbnails (Coca-Cola's dot navigation) */}
        <div className="absolute bottom-8 left-16 flex items-center gap-4 z-20">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${i === currentSlide ? "border-black scale-110 shadow-lg" : "border-gray-200 opacity-60 hover:opacity-100"}`}
            >
              <Image src={s.brandIcon} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* Arrow controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:bg-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:bg-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
      </section>


      {/* ══════════════════════════════════════════════════════════
          3. COMPANY STORY — Coca-Cola exact structure
          Centered large statement + CTA button
         ══════════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-8 bg-[#FAF7F2] overflow-hidden">
        {/* Ghosted brand mark background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "url('/dg-favicon-fat.png')", backgroundSize: "300px", backgroundRepeat: "repeat", transform: "rotate(-12deg) scale(1.4)" }} />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <p className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-light leading-[1.4] text-gray-800 mb-12">
            At Davis & Garnett, we&apos;re redefining what it means to deliver <em className="font-bold not-italic text-black">uncompromising excellence</em> in Tampa Bay real estate — one property, partnership and legacy at a time.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-800 transition-colors"
          >
            Discover Our Company
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          4. LATEST NEWS — Coca-Cola exact structure
          Section title → teaser card grid
          Each card: image + pretitle tag + headline
          Hover shows secondary image or video effect
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold mb-16">Dive Into Latest News from Davis & Garnett</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsCards.map((card, i) => (
              <Link key={i} href={card.href} className="group block">
                {/* Image container with hover zoom */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-5 bg-gray-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Brand icon in bottom-right corner (Coca-Cola uses secondary image here) */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                    <Image src={card.brandIcon} alt="" fill className="object-cover" />
                  </div>
                </div>

                {/* Category tag */}
                <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">{card.pretitle}</p>

                {/* Headline */}
                <h3 className="text-lg font-bold leading-snug group-hover:underline decoration-1 underline-offset-4">{card.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          5. "OUR PURPOSE & COMPANY VISION" — Coca-Cola exact structure
          Large centered heading → two side-by-side image blocks
          with overlay text and CTAs
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-8 bg-[#FAF7F2]">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-black text-center mb-16 leading-tight">
            Our Mission<br />& Market Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Block 1 — What Drives Us */}
            <Link href="#" className="group relative aspect-[4/3] rounded-2xl overflow-hidden block">
              <Image src="/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-6.jpg" alt="What Drives Us" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <h3 className="text-white text-2xl font-bold mb-2">What Makes Us Who We Are</h3>
                <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-white/80 border-b border-white/50 pb-1 inline-flex items-center gap-2 group-hover:border-white transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Block 2 — The Company */}
            <Link href="#" className="group relative aspect-[4/3] rounded-2xl overflow-hidden block">
              <Image src="/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-7.jpg" alt="Our Company" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <h3 className="text-white text-2xl font-bold mb-2">Learn More About Our Company</h3>
                <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-white/80 border-b border-white/50 pb-1 inline-flex items-center gap-2 group-hover:border-white transition-colors">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          6. "SAY HELLO TO THE TEAM" — Coca-Cola brand icon scroll
          Horizontal scrolling strip of brand icons with names
          → mapped to Tampa Bay neighborhoods / areas of expertise
         ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-8 bg-white border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-2xl font-black text-center mb-12">Our Areas of Expertise</h2>

          <div className="flex items-center gap-10 overflow-x-auto pb-4 scrollbar-hide justify-center flex-wrap">
            {[
              { name: "Davis Islands", icon: "/version-2-dolce/blu_mediterraneo_motif.png" },
              { name: "South Tampa", icon: "/version-2-dolce/verde_maiolica_motif.png" },
              { name: "Hyde Park", icon: "/version-2-dolce/carretto_siciliano_motif.png" },
              { name: "Bayshore", icon: "/version-2-dolce/blu_mediterraneo_motif.png" },
              { name: "Downtown", icon: "/version-2-dolce/carretto_siciliano_motif.png" },
              { name: "St. Petersburg", icon: "/version-2-dolce/verde_maiolica_motif.png" },
              { name: "Clearwater", icon: "/version-2-dolce/blu_mediterraneo_motif.png" },
              { name: "Sarasota", icon: "/version-2-dolce/carretto_siciliano_motif.png" },
            ].map((area, i) => (
              <Link key={i} href="#" className="group flex flex-col items-center gap-3 flex-shrink-0">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-black transition-colors shadow-sm group-hover:shadow-lg">
                  <Image src={area.icon} alt={area.name} fill className="object-cover" />
                </div>
                <span className="text-sm font-bold whitespace-nowrap group-hover:underline">{area.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          7. LIFESTYLE PHOTO GALLERY — Coca-Cola exact structure
          Grid of lifestyle/people photos (mixed sizes)
         ══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "/version-2-dolce/davis-garnett-headshots-dolce/mark-davis-headshot-1.JPEG", span: "" },
            { src: "/version-2-dolce/lifestyle-dolce/la-dolce-vita-poolside-party-retro-print-wall-art-picture-poster-frame-701539.jpg", span: "" },
            { src: "/version-2-dolce/davis-garnett-headshots-dolce/rachael-garnett-2.JPG", span: "" },
            { src: "/version-2-dolce/lifestyle-dolce/davis-garnett-v2-lifestyle-5.jpeg", span: "" },
            { src: "/version-2-dolce/lifestyle-dolce/la-dolce-vita-poolside-spilling-the-tea-wall-art-picture-poster-frame-6423383.jpg", span: "md:col-span-2" },
            { src: "/version-2-dolce/davis-garnett-headshots-dolce/rachael-garnett-7.JPEG", span: "" },
            { src: "/version-2-dolce/davis-garnett-headshots-dolce/mark-davis-headshot-3.JPEG", span: "" },
          ].map((photo, i) => (
            <div key={i} className={`group relative aspect-square overflow-hidden rounded-xl cursor-pointer ${photo.span}`}>
              <Image src={photo.src} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          8. "WE'RE HERE TO HELP" — Coca-Cola contact CTA
          Centered heading + contact options
         ══════════════════════════════════════════════════════════ */}
      <section className="py-24 px-8 bg-[#FAF7F2] border-t border-gray-100">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-3xl font-black mb-6">We&apos;re here to help</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Whether you&apos;re buying your dream home, selling a luxury estate, or acquiring a commercial portfolio — our team is ready to deliver uncompromising results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#" className="bg-black text-white px-8 py-4 text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-gray-800 transition-colors">
              Contact Mark Davis
            </Link>
            <Link href="#" className="bg-white text-black px-8 py-4 text-[13px] font-bold uppercase tracking-[0.15em] rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors">
              Contact Rachael Garnett
            </Link>
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════════════════════
          5. ADVISORS STRIP (bonus — D&G branded addition)
          Uses Coca-Cola's "aura" colored background concept
         ══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #FAF7F2 0%, #F0EDE6 100%)" }}>
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-0">
          {/* Mark */}
          <Link href="#" className="group relative flex items-end p-10 min-h-[500px] overflow-hidden">
            <Image src="/version-2-dolce/davis-garnett-headshots-dolce/mark-davis-headshot-4.jpg" alt="Mark Davis" fill className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Commercial Acquisitions</p>
              <h3 className="text-3xl font-bold mb-3">Mark Davis</h3>
              <span className="text-[13px] font-bold uppercase tracking-[0.15em] border-b border-white/50 pb-1 inline-flex items-center gap-2 group-hover:border-white transition-colors">
                View Profile <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Rachael */}
          <Link href="#" className="group relative flex items-end p-10 min-h-[500px] overflow-hidden">
            <Image src="/version-2-dolce/davis-garnett-headshots-dolce/rachael-garnett-4.JPG" alt="Rachael Garnett" fill className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 text-white">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/70 mb-2">Luxury Residential</p>
              <h3 className="text-3xl font-bold mb-3">Rachael Garnett</h3>
              <span className="text-[13px] font-bold uppercase tracking-[0.15em] border-b border-white/50 pb-1 inline-flex items-center gap-2 group-hover:border-white transition-colors">
                View Profile <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          FOOTER — minimal Coca-Cola style
         ══════════════════════════════════════════════════════════ */}
      <footer className="bg-black text-white py-16 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
            <div>
              <Image src="/dg-favicon-fat.png" alt="D&G" width={48} height={48} className="mb-6 invert" />
              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                Davis & Garnett — Tampa Bay&apos;s premier unified real estate advisory group. Commercial power meets luxury residential execution.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">Company</h4>
                <ul className="space-y-2"><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">About</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Leadership</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">Portfolio</h4>
                <ul className="space-y-2"><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Commercial</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Residential</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Land</Link></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">Collections</h4>
                <ul className="space-y-2"><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Blu Mediterraneo</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Verde Maiolica</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Carretto Siciliano</Link></li></ul>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-400 mb-4">Connect</h4>
                <ul className="space-y-2"><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</Link></li><li><Link href="#" className="text-gray-300 hover:text-white transition-colors">YouTube</Link></li></ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2026 Davis & Garnett Real Estate Advisors. All rights reserved.</p>
            <div className="flex gap-6"><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link><Link href="#" className="hover:text-white transition-colors">Terms</Link><Link href="#" className="hover:text-white transition-colors">Accessibility</Link></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

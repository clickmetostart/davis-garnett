"use client";

import { ArrowRight, Check, Mail, Phone, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "The Engine", href: "#engine" },
  { label: "The Advisors", href: "#advisors" },
  { label: "The Network", href: "#network" },
  { label: "Investment", href: "#investment" },
];

const LISTINGS = [
  { src: "/davis-garnett-real-estate-advisors-cover-image.webp", label: "Featured", tall: true },
  { src: "/davis-garnett-listing-1.jpg", label: "Commercial" },
  { src: "/davis-garnett-listings-2.jpg", label: "Residential" },
  { src: "/davis-garnett-listing-2.jpg", label: "Investment" },
  { src: "/davis-garnett-listing-3.jpg", label: "Commercial" },
  { src: "/davis-garnett-listings-4.jpg", label: "Residential" },
];

const FEATURES = [
  {
    number: "01",
    title: "The AEO Engine",
    body: "Answer Engine Optimization isn't a score — it's an architecture. We build the entire infrastructure so that when buyers and investors ask AI assistants about Tampa Bay real estate, Davis & Garnett is the answer.",
  },
  {
    number: "02",
    title: "The Dashboard Hub",
    body: "One command center: your Network CRM, Content Pipeline, Reputation Engine, and listing performance — all in one dashboard built specifically for commercial and residential advisors.",
  },
  {
    number: "03",
    title: "The Authority Network",
    body: "Connect your digital presence directly to your strategic partners — title companies, mortgage brokers, inspectors. As their authority grows, so does yours. A web of trust that no individual listing can replicate.",
  },
];

const MARKETS = ["Tampa", "Wesley Chapel", "Land O' Lakes", "Lutz", "St. Petersburg", "Clearwater", "New Port Richey", "Sarasota"];

export default function Page() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "var(--font-sans)" }}>

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-[rgba(212,175,55,0.12)]">
        <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
          <div>
            <span className="font-serif text-xl tracking-[0.2em] uppercase text-white" style={{ fontFamily: "var(--font-serif)" }}>
              Davis & Garnett
            </span>
            <span className="text-[#D4AF37] mx-3 opacity-40">×</span>
            <span className="label-caps text-[0.6rem] tracking-[0.2em] text-[#a0a0a0]">ClickMe</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="label-caps text-[#a0a0a0] hover:text-[#D4AF37] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#investment" className="btn-gold text-[0.65rem] py-3 px-6">
              View Proposal
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <header className="relative min-h-screen flex items-center overflow-hidden bg-black">

        {/* Right-side contained image — not a background */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block">
          <div className="relative h-full">
            <Image
              src="/davis-garnett-real-estate-advisors-cover-image.webp"
              alt="Davis & Garnett Tampa Bay"
              fill
              className="object-cover object-center"
              priority
              loading="eager"
            />
            {/* Fade image into black on the left edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
            {/* Subtle top/bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </div>
        </div>

        {/* Left content — clean black canvas */}
        <div className="relative w-full lg:w-[62%] max-w-screen-xl mx-auto px-8 py-32 lg:py-40">

          {/* Proposal badge */}
          <div className="flex items-center gap-4 mb-12 fade-up fade-up-delay-1">
            <span className="label-caps text-[#D4AF37]">A Strategic Partnership Proposal</span>
            <span className="block w-16 h-px bg-[#D4AF37]" />
            <span className="label-caps text-[#333333]">Prepared exclusively for Davis & Garnett</span>
          </div>

          {/* Massive editorial headline */}
          <h1 className="fade-up fade-up-delay-2" style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            letterSpacing: "0.05em",
            lineHeight: "0.9",
            fontSize: "clamp(3.5rem, 8.5vw, 8.5rem)",
            textTransform: "uppercase",
            color: "#ffffff",
          }}>
            Local<br />
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Knowledge.</em><br />
            Bigger<br />
            Picture.
          </h1>

          {/* Pull quote below headline */}
          <p className="fade-up fade-up-delay-3 mt-10 text-[#777777] leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}>
            While competitors hand you an AEO score and walk away, we build the entire self-generating authority engine that answers it — permanently. Built for Tampa Bay real estate. Built for you.
          </p>

          {/* Agents row */}
          <div className="fade-up fade-up-delay-4 mt-14 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image src="/mark-davis-profile-image.webp" alt="Mark Davis" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", letterSpacing: "0.04em" }}>Mark Davis</p>
                <p className="label-caps text-[0.55rem] text-[#D4AF37]">Broker Associate</p>
              </div>
            </div>
            <div className="w-px h-10 bg-[rgba(212,175,55,0.2)]" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]">
                <Image src="/rachael-garnett.webp" alt="Rachael Garnett" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", letterSpacing: "0.04em" }}>Rachael Garnett</p>
                <p className="label-caps text-[0.55rem] text-[#D4AF37]">Real Estate Advisor</p>
              </div>
            </div>
            <div className="mt-4 w-full flex gap-4">
              <a href="#engine" className="btn-gold">
                Explore the Engine <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#investment" className="btn-ghost">
                View Pricing
              </a>
            </div>
          </div>

          {/* Bottom micro-stats row */}
          <div className="fade-up fade-up-delay-4 mt-16 pt-10 border-t border-[rgba(212,175,55,0.1)] grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300, color: "#D4AF37", letterSpacing: "0.04em" }}>$499</p>
              <p className="label-caps text-[#444444] mt-1">Per Month</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300, color: "#D4AF37", letterSpacing: "0.04em" }}>8+</p>
              <p className="label-caps text-[#444444] mt-1">Markets Covered</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 300, color: "#D4AF37", letterSpacing: "0.04em" }}>1</p>
              <p className="label-caps text-[#444444] mt-1">Dashboard. Everything.</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── TICKER STRIP ─────────────────────────────────── */}
      <div className="section-divider" />
      <div className="section-surface overflow-hidden py-4">
        <div className="flex gap-16 animate-none whitespace-nowrap px-8">
          {MARKETS.concat(MARKETS).map((m, i) => (
            <span key={i} className="label-caps text-[#555555] shrink-0">
              {m} <span className="text-[#D4AF37] mx-4">·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="section-divider" />

      {/* ── ENGINE SECTION ───────────────────────────────── */}
      <section id="engine" className="section-dark py-32 px-8">
        <div className="max-w-screen-xl mx-auto">

          {/* Section header */}
          <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">What We Build</span>
              <h2 className="font-serif" style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
                letterSpacing: "0.04em",
                lineHeight: "1.05",
                textTransform: "uppercase",
              }}>
                The AEO<br />
                <span style={{ color: "#D4AF37" }}>Authority</span><br />
                Engine
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-[#a0a0a0] leading-relaxed text-sm">
                While competitors hand you a score and walk away, we build the entire infrastructure that fixes it — permanently. One dashboard. One network. Infinite compounding authority across every AI-driven platform.
              </p>
              <div className="mt-8 w-12 h-px bg-[#D4AF37]" />
            </div>
          </div>

          {/* Interactive feature tabs */}
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-0 border border-[rgba(212,175,55,0.15)]">
            {/* Tab list */}
            <div className="border-r border-[rgba(212,175,55,0.15)]">
              {FEATURES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-full text-left p-10 border-b border-[rgba(212,175,55,0.1)] transition-all duration-300 ${
                    activeFeature === i ? "bg-[#111111]" : "bg-transparent hover:bg-[#0f0f0f]"
                  }`}
                >
                  <span className="label-caps text-[#555555] block mb-3">{f.number}</span>
                  <span className="font-serif text-2xl" style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    letterSpacing: "0.03em",
                    color: activeFeature === i ? "#D4AF37" : "#ffffff",
                  }}>{f.title}</span>
                  {activeFeature === i && (
                    <div className="mt-4 w-8 h-px bg-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-14 flex flex-col justify-center bg-[#111111]">
              <span className="label-caps text-[#D4AF37] block mb-6">
                Feature {FEATURES[activeFeature].number}
              </span>
              <h3 className="font-serif mb-8" style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "2.5rem",
                letterSpacing: "0.04em",
                lineHeight: "1.1",
                textTransform: "uppercase",
              }}>
                {FEATURES[activeFeature].title}
              </h3>
              <p className="text-[#a0a0a0] text-sm leading-loose max-w-md">
                {FEATURES[activeFeature].body}
              </p>
              <a href="#investment" className="btn-ghost mt-12 self-start">
                See What's Included <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITIVE COMPARISON ───────────────────────── */}
      <section className="section-surface py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">Why ClickMe</span>
              <h2 className="font-serif" style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: "1.05",
              }}>
                Beyond What<br />
                <span style={{ color: "#D4AF37" }}>Owner.com</span><br />
                Can Offer.
              </h2>
            </div>
            <p className="text-[#555555] text-sm leading-loose max-w-sm">
              Owner.com built a $499/month vertical SaaS for restaurants — and it works. We built the same model for every business category, with AI-forward architecture they'll never catch up to.
            </p>
          </div>

          {/* Comparison table */}
          <div className="border border-[rgba(212,175,55,0.15)] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-[rgba(212,175,55,0.15)] bg-[#0f0f0f]">
              <div className="p-6 border-r border-[rgba(212,175,55,0.1)]">
                <span className="label-caps text-[#444444]">Feature</span>
              </div>
              <div className="p-6 border-r border-[rgba(212,175,55,0.1)] text-center">
                <span className="label-caps text-[#444444]">Owner.com</span>
                <p className="label-caps text-[0.5rem] text-[#333333] mt-1">$499/mo · Restaurants Only</p>
              </div>
              <div className="p-6 text-center bg-[rgba(212,175,55,0.04)]">
                <span className="label-caps text-[#D4AF37]">ClickMe</span>
                <p className="label-caps text-[0.5rem] text-[#888] mt-1">$499/mo · Every Industry</p>
              </div>
            </div>

            {[
              { feature: "Industry Coverage", them: "Restaurants only", us: "Every business category" },
              { feature: "Search Strategy", them: "Traditional SEO", us: "AEO / GEO / AI-forward" },
              { feature: "Website Architecture", them: "Template builder", us: "Built-to-rank architecture" },
              { feature: "Partner Network", them: "None", us: "Cross-linking authority network" },
              { feature: "Content Engine", them: "Manual", us: "Self-reading, self-writing loop" },
              { feature: "Lock-in Model", them: "Painful to leave", us: "Network effect makes staying valuable" },
              { feature: "Community / Movement", them: "None", us: "Inner circle access" },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-[rgba(212,175,55,0.08)] hover:bg-[rgba(212,175,55,0.02)] transition-colors`}
              >
                <div className="p-6 border-r border-[rgba(212,175,55,0.08)]">
                  <span className="text-sm text-white">{row.feature}</span>
                </div>
                <div className="p-6 border-r border-[rgba(212,175,55,0.08)] flex items-center justify-center gap-3">
                  <X className="w-3.5 h-3.5 text-[#444444] shrink-0" />
                  <span className="text-xs text-[#555555]">{row.them}</span>
                </div>
                <div className="p-6 flex items-center justify-center gap-3 bg-[rgba(212,175,55,0.03)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="text-xs text-[#D4AF37] font-medium">{row.us}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[#333333] text-xs leading-relaxed max-w-xl">
            Owner.com charges $499/month — and restaurant owners still call it expensive. ClickMe operates at the same price point and delivers more across any industry, with a network moat Owner.com has never built.
          </p>
        </div>
      </section>

      {/* ── LISTINGS GRID ────────────────────────────────── */}
      <section className="section-surface py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-5">Your Portfolio</span>
              <h2 className="font-serif" style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: "1.05",
              }}>
                Listings,<br />
                <span style={{ color: "#D4AF37" }}>Elevated.</span>
              </h2>
            </div>
            <p className="text-[#555555] text-sm max-w-xs leading-relaxed hidden lg:block">
              Every listing you carry deserves to be found by the right buyer at the right moment — on Google, on ChatGPT, on Perplexity.
            </p>
          </div>

          {/* Asymmetric masonry grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {LISTINGS.map((item, i) => (
              <div
                key={i}
                className={`img-overlay group relative ${i === 0 ? "lg:col-span-2 lg:row-span-2 h-[480px]" : "h-[220px]"}`}
              >
                <Image
                  src={item.src}
                  alt={`${item.label} listing`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="label-caps text-white/70 bg-black/50 px-3 py-1.5 inline-block">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISORS ─────────────────────────────────────── */}
      <section id="advisors" className="section-dark py-32 px-8">
        <div className="section-divider mb-20" />
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <span className="label-caps text-[#D4AF37] block mb-5">The People</span>
            <h2 className="font-serif" style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "1.05",
            }}>
              Built Around<br />
              <span style={{ color: "#D4AF37" }}>The Advisors.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-[rgba(212,175,55,0.1)]">
            {/* Mark Davis */}
            <div className="bg-black p-12 lg:p-16 flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-[rgba(212,175,55,0.4)] shrink-0">
                  <Image src="/mark-davis-profile-image.webp" alt="Mark Davis" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="label-caps text-[#D4AF37] block mb-2">Broker Associate</span>
                  <h3 className="font-serif text-4xl" style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}>Mark Davis</h3>
                </div>
              </div>
              <p className="text-[#a0a0a0] text-sm leading-loose max-w-sm">
                Commercial & Residential expert across Tampa Bay. Your listings, your deals, your reputation — automatically amplified across every platform buyers use.
              </p>
              <div className="gold-line-short" />
              <div className="flex flex-col gap-3">
                <a href="mailto:msdavis118@gmail.com" className="flex items-center gap-3 text-sm text-[#555555] hover:text-[#D4AF37] transition-colors">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  msdavis118@gmail.com
                </a>
                <a href="tel:941-737-4127" className="flex items-center gap-3 text-sm text-[#555555] hover:text-[#D4AF37] transition-colors">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  941-737-4127
                </a>
              </div>
            </div>

            {/* Rachael Garnett */}
            <div className="bg-[#0a0a0a] p-12 lg:p-16 flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-[rgba(212,175,55,0.4)] shrink-0">
                  <Image src="/rachael-garnett.jpg" alt="Rachael Garnett" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="label-caps text-[#D4AF37] block mb-2">Real Estate Advisor</span>
                  <h3 className="font-serif text-4xl" style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}>Rachael Garnett</h3>
                </div>
              </div>
              <p className="text-[#a0a0a0] text-sm leading-loose max-w-sm">
                Hands-on buyer and seller representation across Tampa Bay. Reviews, authority, and trust — aggregated automatically and surfaced wherever buyers are looking.
              </p>
              <div className="gold-line-short" />
              <div className="flex flex-col gap-3">
                <a href="mailto:rachaellgarnett@gmail.com" className="flex items-center gap-3 text-sm text-[#555555] hover:text-[#D4AF37] transition-colors">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  rachaellgarnett@gmail.com
                </a>
                <a href="tel:727-808-3344" className="flex items-center gap-3 text-sm text-[#555555] hover:text-[#D4AF37] transition-colors">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  727-808-3344
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="section-divider mt-20" />
      </section>

      {/* ── MARKETS ──────────────────────────────────────── */}
      <section id="network" className="section-surface py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">The Network</span>
              <h2 className="font-serif mb-8" style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: "1.1",
              }}>
                Core<br />
                <span style={{ color: "#D4AF37" }}>Markets.</span>
              </h2>
              <p className="text-[#a0a0a0] text-sm leading-loose max-w-sm mb-10">
                We operate throughout Tampa Bay and surrounding Florida markets, connecting clients with opportunities that fit their goals — not simply what happens to be available.
              </p>
              <div className="w-12 h-px bg-[#D4AF37]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[rgba(212,175,55,0.08)]">
              {MARKETS.map((m) => (
                <div key={m} className="bg-[#111111] p-6 flex items-end justify-start">
                  <span className="font-serif text-white/80 text-sm" style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.03em" }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT ───────────────────────────────────── */}
      <section id="investment" className="section-dark py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="section-divider mb-20" />
          <div className="mb-16">
            <span className="label-caps text-[#D4AF37] block mb-5">Partnership Investment</span>
            <h2 className="font-serif" style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "1.05",
            }}>
              Choose Your<br />
              <span style={{ color: "#D4AF37" }}>Level.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-[rgba(212,175,55,0.15)]">
            {/* Standard */}
            <div className="bg-black p-12 lg:p-16 flex flex-col">
              <span className="label-caps text-[#555555] block mb-6">Standard</span>
              <div className="mb-8">
                <span className="font-serif text-7xl text-white" style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}>$499</span>
                <span className="text-[#555555] text-sm ml-2">/month</span>
              </div>
              <p className="text-[#a0a0a0] text-sm mb-10">$0 setup fee. Cancel any time. Full platform access from day one.</p>
              <div className="gold-line-short mb-10" />
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {[
                  "Custom AEO-ready website build",
                  "Core Dashboard & Network CRM",
                  "Automated content pipeline",
                  "Reputation engine & review aggregation",
                  "Monthly performance reports",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-4 text-sm text-[#a0a0a0]">
                    <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:msdavis118@gmail.com" className="btn-ghost self-start">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Rachael's Offer */}
            <div className="bg-[#0f0e0a] p-12 lg:p-16 flex flex-col border-l border-[rgba(212,175,55,0.3)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="label-caps text-[#D4AF37] block">Rachael's Offer</span>
                <span className="label-caps text-[0.55rem] bg-[#D4AF37] text-black px-3 py-1">Lifetime</span>
              </div>
              <div className="mb-8">
                <span className="font-serif text-7xl text-[#D4AF37]" style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}>$2,500</span>
                <span className="text-[#555555] text-sm ml-2">one-time</span>
              </div>
              <p className="text-[#a0a0a0] text-sm mb-10">You own the build forever. $0/month platform fee. Full access, no subscription.</p>
              <div className="gold-line-short mb-10" />
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {[
                  "You own the website — forever",
                  "Lifetime Dashboard & CRM access",
                  "All platform features included",
                  "Priority support & onboarding",
                  "No monthly fees, ever",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-4 text-sm text-white">
                    <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="mailto:rachaellgarnett@gmail.com" className="btn-gold self-start">
                Claim This Offer <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="section-divider mt-20" />
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="section-surface px-8 py-16">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <span className="font-serif text-lg tracking-[0.2em] uppercase text-white/50" style={{ fontFamily: "var(--font-serif)" }}>
              Davis & Garnett
            </span>
            <p className="label-caps text-[#333333] mt-2">
              Align Right Realty Carrollwood · Tampa Bay, Florida
            </p>
          </div>
          <p className="label-caps text-[#333333]">
            © {new Date().getFullYear()} ClickMe. Building Local Authority.
          </p>
        </div>
      </footer>

    </div>
  );
}

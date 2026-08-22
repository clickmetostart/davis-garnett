"use client";

import { ArrowRight, Check, Mail, Phone, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "The Trap", href: "#truth" },
  { label: "The Playbook", href: "#playbook" },
  { label: "The Architecture", href: "#deliverables" },
  { label: "The Math", href: "#investment" },
  { label: "Preview Site", href: "/coming-soon" },
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
    title: "The Power Combo",
    body: "We are merging Mark's commercial/investment gravity with Rachael's residential finesse into a single dominant Tampa Bay brand. By combining forces under one domain, your combined traffic and authority scale twice as fast.",
  },
  {
    number: "02",
    title: "Beyond Basic SEO",
    body: "Our platform comes 100% SEO-perfect out of the box because it's the bare minimum standard — charging monthly for basic meta tags is a con. But by mid-2027, 'magic formatting' won't be enough to rank. True AI authority requires fresh, purposeful, continuous content to drive actual sales. We build the engine to produce it.",
  },
  {
    number: "03",
    title: "Independent Authority",
    body: "You share a domain, but you don't share an identity. We build you individual authority hubs. Mark gets commercial case studies and investment ROI breakdowns. Rachael gets neighborhood guides and residential market trends.",
  },
  {
    number: "04",
    title: "Dual Command Centers",
    body: "No tripping over each other's leads. You each get your own dedicated ClickMe CRM dashboard. Mark tracks his commercial deal flow; Rachael manages her residential pipeline—unified seamlessly behind the scenes.",
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
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg tracking-[0.2em] uppercase text-white" style={{ fontFamily: "var(--font-serif)" }}>
              Davis & Garnett
            </span>
            <span className="w-px h-4 bg-[rgba(212,175,55,0.4)] block"></span>
            <span className="label-caps text-[0.6rem] tracking-[0.2em] text-[#a0a0a0] mt-0.5">Powered by ClickMe</span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="label-caps text-[#a0a0a0] hover:text-[#D4AF37] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#investment" className="btn-gold text-[0.65rem] py-3 px-6">
              View Strategy
            </a>
          </div>
        </div>
      </nav>

      {/* ── 1. HERO ────────────────────────────────────────── */}
      <header className="relative min-h-screen flex items-stretch overflow-hidden bg-black">

        {/* LEFT — editorial text column, clean black */}
        <div className="relative flex flex-col justify-center w-full lg:w-[55%] px-8 lg:px-16 py-32 lg:py-40 z-10">

          {/* Proposal badge */}
          <div className="flex items-center gap-4 mb-14 fade-up fade-up-delay-1">
            <span className="label-caps text-[#D4AF37]">Bespoke Digital Strategy</span>
            <span className="block w-16 h-px bg-[#D4AF37] shrink-0" />
          </div>

          {/* Massive editorial headline */}
          <h1 className="fade-up fade-up-delay-2" style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            letterSpacing: "0.05em",
            lineHeight: "0.88",
            fontSize: "clamp(4rem, 9vw, 9.5rem)",
            textTransform: "uppercase",
            color: "#ffffff",
          }}>
            Local<br />
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Knowledge.</em><br />
            Bigger<br />
            Picture.
          </h1>

          {/* Pull quote */}
          <p className="fade-up fade-up-delay-3 mt-12 max-w-xl" style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.15rem",
            lineHeight: "1.8",
            color: "#888888",
          }}>
            We aren't just selling you software. We are engineering the exact digital playbook to merge Mark's commercial gravity and Rachael's residential finesse into Tampa Bay's premier real estate syndicate.
          </p>

          {/* CTAs */}
          <div className="fade-up fade-up-delay-4 mt-12 flex flex-wrap gap-4">
            <a href="#truth" className="btn-gold">
              See the Playbook <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* RIGHT — hero image */}
        <div className="hidden lg:flex flex-col w-[45%] relative border-l border-[rgba(212,175,55,0.1)]">
          <div className="flex-1 relative overflow-hidden">
            <Image
              src="/davis-garnett-hero.png"
              alt="Mark Davis and Rachael Garnett — Davis & Garnett Tampa Bay"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            {/* Name plate at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-10 flex items-end justify-between">
              <div>
                <span className="label-caps text-[#D4AF37] block mb-2">Tampa Bay, FL</span>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.08em", color: "#ffffff" }}>Davis & Garnett</p>
              </div>
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

      {/* ── 2. THE WHY: THE TRUTH NO ONE TELLS YOU ────────── */}
      <section id="truth" className="section-surface py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="label-caps text-red-500 block mb-6">The Industry Trap</span>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: "1.05",
              }}>
                A Beautiful<br />
                <span style={{ color: "#D4AF37" }}>Brochure</span><br />
                Is A Dead<br />
                Asset.
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-[#a0a0a0] text-sm leading-loose mb-6">
                Right now, agents are paying platforms like Agent Image or Luxury Presence $5,000 upfront just to rent a beautiful WordPress template. The marketing promises exclusivity. The reality? Websites that look exactly like 10,000 other agents, with zero actual search authority.
              </p>
              <p className="text-[#a0a0a0] text-sm leading-loose">
                The game has changed. Search is moving away from traditional Google links and toward AI Answer Engines (AEO) and Generative Engine Optimization (GEO).
              </p>
              <div className="mt-4 p-5 bg-[rgba(212,175,55,0.03)] border-l-2 border-[#D4AF37]">
                <p className="text-[#D4AF37] label-caps mb-2 text-xs">What this means for you:</p>
                <p className="text-white text-sm leading-relaxed">
                  When a high-net-worth buyer asks ChatGPT or Perplexity, "Who is the top commercial broker in Tampa?", AI doesn't give them a list of websites to click. It gives them ONE definitive answer. If your platform isn't structured to feed those AI models exactly what they want, a sleek template won't save you. You simply won't exist.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(212,175,55,0.08)]">
            {[
              {
                icon: "⚠",
                title: "The Agent Image Trap",
                body: "You pay $4,000+ for a 'custom' site that is actually just a reskinned WordPress theme. Once it launches, you are entirely on your own for traffic.",
              },
              {
                icon: "⚠",
                title: "The Luxury Presence Trap",
                body: "You pay premium setup fees and $800/month for proprietary code. The second you cancel, you lose your website, your content, and your ranking entirely.",
              },
              {
                icon: "⚠",
                title: "The SEO Extortion",
                body: "They charge monthly for basic SEO formatting that should be built-in by default. It's a con. And worse, basic 'magic formatting' doesn't actually drive sales anymore.",
              },
              {
                icon: "⚠",
                title: "Forced Concessions",
                body: "As a team, these platforms force you to share a single identity and a single backend. You end up tripping over each other's leads and diluting your individual brands.",
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#111111] p-10 flex flex-col gap-5">
                <span className="text-2xl text-red-500">{card.icon}</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.25rem", letterSpacing: "0.03em" }}>{card.title}</h3>
                <p className="text-[#555555] text-sm leading-loose">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE HOW: ENGINE SECTION ───────────────────── */}
      <section id="playbook" className="section-dark py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Section header */}
          <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">The Strategy</span>
              <h2 className="font-serif" style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
                letterSpacing: "0.04em",
                lineHeight: "1.05",
                textTransform: "uppercase",
              }}>
                The Dual-Engine<br />
                <span style={{ color: "#D4AF37" }}>Playbook.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-[#a0a0a0] leading-relaxed text-sm">
                We don't rent you a website and walk away. We engineer the core infrastructure that respects your individual expertise while leveraging your combined gravity.
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
                Strategic Protocol {FEATURES[activeFeature].number}
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
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CONTEXT: ADVISORS & MARKETS & LISTINGS ──────── */}
      <section id="advisors" className="section-dark py-32 px-8 border-t border-[rgba(212,175,55,0.1)]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 text-center">
            <span className="label-caps text-[#D4AF37] block mb-5">The Identity</span>
            <h2 className="font-serif" style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "1.05",
            }}>
              Individual Profiles.<br />
              <span style={{ color: "#D4AF37" }}>Unified Empire.</span>
            </h2>
            <p className="text-[#a0a0a0] text-sm mt-6 max-w-lg mx-auto">
              You both get distinct digital footprints tailored exactly to your client base. Mark speaks to investors; Rachael speaks to homeowners.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-[rgba(212,175,55,0.1)] mb-32">
            {/* Mark Davis */}
            <div className="bg-black p-12 lg:p-16 flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-[rgba(212,175,55,0.4)] shrink-0">
                  <Image src="/mark-davis-profile-image.webp" alt="Mark Davis" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="label-caps text-[#D4AF37] block mb-2">Commercial & Investment</span>
                  <h3 className="font-serif text-4xl" style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}>Mark Davis</h3>
                </div>
              </div>
            </div>

            {/* Rachael Garnett */}
            <div className="bg-[#0a0a0a] p-12 lg:p-16 flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-[rgba(212,175,55,0.4)] shrink-0">
                  <Image src="/rachael-garnett.jpg" alt="Rachael Garnett" width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div>
                  <span className="label-caps text-[#D4AF37] block mb-2">Residential & Advisory</span>
                  <h3 className="font-serif text-4xl" style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                  }}>Rachael Garnett</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE WHAT: FULL DELIVERABLES ───────────────── */}
      <section id="deliverables" className="section-surface py-32 px-8 border-t border-[rgba(212,175,55,0.1)]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <span className="label-caps text-[#D4AF37] block mb-6">The Architecture</span>
            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "1.05",
            }}>
              How We Build<br />
              <span style={{ color: "#D4AF37" }}>The Machine.</span>
            </h2>
            <p className="mt-6 text-[#555555] text-sm max-w-xl leading-loose">
              This isn't a generic feature list. This is the exact infrastructure we deploy to execute the dual-engine strategy for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(212,175,55,0.08)]">
            {[
              {
                number: "01",
                title: "The Unified Platform",
                items: [
                  "Custom-built, ultra-fast core architecture",
                  "Bespoke Commercial & Residential service hubs",
                  "Deep-dive market area landing pages for Tampa Bay",
                  "Structured AEO schema ensuring AI indexation",
                ],
              },
              {
                number: "02",
                title: "Dual Dashboards",
                items: [
                  "Unrestricted access to the ClickMe command center",
                  "Mark's dedicated commercial CRM & lead routing",
                  "Rachael's dedicated residential CRM & pipeline",
                  "Unified performance metrics and rankings overview",
                ],
              },
              {
                number: "03",
                title: "The Split Content Engine",
                items: [
                  "Commercial lease & investment strategy explainers for Mark",
                  "Buyer & Seller Q&A residential libraries for Rachael",
                  "Gap analysis: We find the exact questions clients are asking",
                  "Autopilot publishing, written strictly in your distinct voices",
                ],
              },
            ].map((block) => (
              <div key={block.number} className="bg-black p-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="label-caps text-[#333333]">{block.number}</span>
                  <div className="flex-1 h-px bg-[rgba(212,175,55,0.1)]" />
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.3rem", letterSpacing: "0.03em", color: "#D4AF37" }}>
                  {block.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs text-[#777777] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. COMPARISON: HOW WE STACK UP ───────────────── */}
      <section className="section-dark py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">The Reality Check</span>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: "1.05",
              }}>
                How We Stack Up<br />
                <span style={{ color: "#D4AF37" }}>Against Everyone.</span>
              </h2>
            </div>
            <p className="text-[#555555] text-sm leading-loose max-w-sm">
              They built aesthetics to sell to the masses. We build AI-forward authority engines. Here is the undeniable mathematical reality of what you are buying.
            </p>
          </div>

          <div className="border border-[rgba(212,175,55,0.15)] overflow-hidden overflow-x-auto">
            {/* Header row */}
            <div className="grid grid-cols-5 border-b border-[rgba(212,175,55,0.15)] bg-[#0a0a0a] min-w-[900px]">
              <div className="p-5 border-r border-[rgba(212,175,55,0.1)]">
                <span className="label-caps text-[#333333]">Feature</span>
              </div>
              <div className="p-5 border-r border-[rgba(212,175,55,0.1)] text-center">
                <span className="label-caps text-[#444444]">Owner.com</span>
                <p className="label-caps text-[0.5rem] text-[#2a2a2a] mt-1">$499/mo · Restaurants only</p>
              </div>
              <div className="p-5 border-r border-[rgba(212,175,55,0.1)] text-center">
                <span className="label-caps text-[#444444]">Agent Image</span>
                <p className="label-caps text-[0.5rem] text-[#2a2a2a] mt-1">$4,000+ Setup · WordPress</p>
              </div>
              <div className="p-5 border-r border-[rgba(212,175,55,0.1)] text-center">
                <span className="label-caps text-[#444444]">Luxury Presence</span>
                <p className="label-caps text-[0.5rem] text-[#2a2a2a] mt-1">$5k setup + $800/mo</p>
              </div>
              <div className="p-5 text-center bg-[rgba(212,175,55,0.06)]">
                <span className="label-caps text-[#D4AF37] font-semibold">ClickMe</span>
                <p className="label-caps text-[0.5rem] text-[#666] mt-1">$0 setup · $499/mo or $3,000 lifetime</p>
              </div>
            </div>

            {[
              { feature: "Upfront Cost", owner: "$0 setup", ai: "$4,000+ setup", lp: "$2,500–$5,000+ setup", us: "$0 setup fee. Ever." },
              { feature: "Search Strategy", owner: "Basic SEO", ai: "Aesthetic focus, zero AEO", lp: "Design-first, light SEO", us: "Aggressive AEO / AI-forward" },
              { feature: "Content Production", owner: "Not included", ai: "DIY", lp: "DIY or expensive add-on", us: "Autopilot, in your voice" },
              { feature: "Dual Dashboards", owner: "Single login", ai: "Single WP login", lp: "Single login", us: "Dedicated CRM for each partner" },
              { feature: "You Own the Asset", owner: "Cancel = lose everything", ai: "You own the WP files", lp: "Cancel = lose your site", us: "You own the build. Period." },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-5 border-b border-[rgba(212,175,55,0.06)] hover:bg-[rgba(212,175,55,0.02)] transition-colors min-w-[900px]">
                <div className="p-5 border-r border-[rgba(212,175,55,0.06)]"><span className="text-sm text-white">{row.feature}</span></div>
                <div className="p-5 border-r border-[rgba(212,175,55,0.06)] flex items-center justify-center gap-2"><X className="w-3 h-3 text-[#3a3a3a]" /><span className="text-xs text-[#444444] text-center">{row.owner}</span></div>
                <div className="p-5 border-r border-[rgba(212,175,55,0.06)] flex items-center justify-center gap-2"><X className="w-3 h-3 text-[#3a3a3a]" /><span className="text-xs text-[#444444] text-center">{row.ai}</span></div>
                <div className="p-5 border-r border-[rgba(212,175,55,0.06)] flex items-center justify-center gap-2"><X className="w-3 h-3 text-[#3a3a3a]" /><span className="text-xs text-[#444444] text-center">{row.lp}</span></div>
                <div className="p-5 flex items-center justify-center gap-2 bg-[rgba(212,175,55,0.04)]"><Sparkles className="w-3 h-3 text-[#D4AF37]" /><span className="text-xs text-[#D4AF37] font-medium text-center">{row.us}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PRICE: INVESTMENT ─────────────────────────── */}
      <section id="investment" className="section-surface py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="section-divider mb-20" />
          <div className="mb-16">
            <span className="label-caps text-[#D4AF37] block mb-5">The Split Advantage</span>
            <h2 className="font-serif" style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 300,
              fontSize: "clamp(2.2rem, 4vw, 4.5rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              lineHeight: "1.05",
            }}>
              Two Dashboards.<br />
              <span style={{ color: "#D4AF37" }}>One Investment.</span>
            </h2>
            <p className="mt-6 text-[#555555] text-sm max-w-xl leading-loose">
              By combining forces, you are each acquiring a massive enterprise-grade infrastructure for a fraction of what individual agents pay. Split the cost, double the power.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-px bg-[rgba(212,175,55,0.15)]">
            {/* Standard */}
            <div className="bg-black p-12 lg:p-16 flex flex-col">
              <span className="label-caps text-[#555555] block mb-6">Standard</span>
              <div className="mb-8">
                <span className="font-serif text-7xl text-white" style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}>$499</span>
                <span className="text-[#555555] text-sm ml-2">/month</span>
              </div>
              <p className="text-[#a0a0a0] text-sm mb-10">That's just <span className="text-white font-bold">$249.50/month each</span>. $0 setup fee. Cancel any time.</p>
              <div className="gold-line-short mb-10" />
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {["Custom Dual-Engine AEO website build", "Individual Dashboards for Mark & Rachael", "Automated content pipeline for both channels", "Reputation engine & review aggregation"].map((f) => (
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
                <span className="label-caps text-[0.55rem] bg-[#D4AF37] text-black px-3 py-1">Save 50%</span>
              </div>
              <div className="mb-8">
                <span className="font-serif text-7xl text-[#D4AF37]" style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}>$3,000</span>
                <span className="text-[#555555] text-sm ml-2">paid up front</span>
              </div>
              <p className="text-[#a0a0a0] text-sm mb-10">That's just <span className="text-white font-bold">$1,500 each</span>. You own the build forever. $0/month software fee.*<br/><span className="text-xs text-[#666] mt-2 inline-block">*Standard annual renewals apply for hosting, security, and Real Estate IDX (MLS) feeds.</span></p>
              <div className="gold-line-short mb-10" />
              <ul className="flex flex-col gap-5 mb-12 flex-1">
                {["You own the website asset — forever", "Lifetime Dashboard access for both advisors", "All platform features included", "Priority support & onboarding"].map((f) => (
                  <li key={f} className="flex items-start gap-4 text-white text-sm">
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

          {/* Full Transparency Note */}
          <div className="mt-16 p-10 border-l border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.03)] mx-auto">
            <span className="label-caps text-[#D4AF37] block mb-4">Full Transparency: The Real ROI</span>
            <p className="text-white text-base leading-loose" style={{ fontFamily: "var(--font-serif)", fontWeight: 300, letterSpacing: "0.03em" }}>
              Frankly, Rachael's Offer is a fraction of what this architecture usually costs. Why? Because my true ROI isn't in a setup fee. It's in the network. The larger your digital footprint grows, and the more strategic partners (title, mortgage, inspectors) we plug into your authority web, the stronger our entire ecosystem becomes. <br/><br/>
              <span className="text-[#D4AF37] italic">I'm not building you a website for a check; I'm building you a digital monopoly because when your network wins, my network wins.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. DEMO: COMING SOON PREVIEW ─────────────────── */}
      <section className="section-dark py-32 px-8 border-t border-[rgba(212,175,55,0.1)]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">The Demo</span>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: "1.05",
              }}>
                We Are Already<br />
                <span style={{ color: "#D4AF37" }}>Building It.</span>
              </h2>
              <p className="mt-8 text-[#555555] text-sm leading-loose max-w-sm">
                While you review this strategic playbook, we have already spun up an interim digital presence in your branding. This landing page acts as your high-end digital business card while we construct the definitive AEO platform underneath.
              </p>
              <a href="/coming-soon" className="btn-gold mt-10 inline-flex">
                View Your Live Environment <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="border border-[rgba(212,175,55,0.2)] overflow-hidden">
              <div className="bg-black px-8 py-6 border-b border-[rgba(212,175,55,0.1)] flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#333]" />
                  <span className="w-3 h-3 rounded-full bg-[#333]" />
                  <span className="w-3 h-3 rounded-full bg-[#333]" />
                </div>
                <span className="label-caps text-[#333333] ml-2">davisandgarnett.com</span>
              </div>
              <div className="relative h-72 overflow-hidden">
                <Image
                  src="/davis-garnett-real-combo.png"
                  alt="Site Preview"
                  fill
                  className="object-cover object-top opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", fontWeight: 300 }}>Davis & Garnett</span>
                  <span className="label-caps text-[#666] mt-3">System Assembly in Progress</span>
                  <a href="/coming-soon" className="mt-6 btn-ghost text-xs py-2 px-6">
                    Enter Live Demo →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="section-surface px-8 py-16 border-t border-[rgba(212,175,55,0.1)]">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <span className="font-serif text-lg tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: "var(--font-serif)" }}>
              Davis & Garnett
            </span>
            <p className="label-caps text-[#222222] mt-2">
              Align Right Realty Carrollwood · Tampa Bay, Florida
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:msdavis118@gmail.com" className="label-caps text-[#333333] hover:text-[#D4AF37] transition-colors">msdavis118@gmail.com</a>
            <a href="mailto:rachaellgarnett@gmail.com" className="label-caps text-[#333333] hover:text-[#D4AF37] transition-colors">rachaellgarnett@gmail.com</a>
          </div>
          <p className="label-caps text-[#222222]">
            © {new Date().getFullYear()} ClickMe. Building Local Authority.
          </p>
        </div>
      </footer>

    </div>
  );
}

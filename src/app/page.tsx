"use client";

import { ArrowRight, Check, Sparkles, X, ChevronRight, Activity, Layers, Zap, Search, Box, Database, MessageSquare, Code, Settings, Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Why Now", href: "#truth" },
  { label: "Project Scope", href: "/scope" },
  { label: "(Coming Soon Page)", href: "/coming-soon" },
];

const MARKETS = ["Tampa", "Wesley Chapel", "Land O' Lakes", "Lutz", "St. Petersburg", "Clearwater", "New Port Richey", "Sarasota"];

const FEATURES = [
  {
    number: "01",
    title: "The Power Combo",
    body: "We are merging Mark's commercial and investment gravity with Rachael's residential finesse into a single dominant Tampa Bay brand. By combining forces under one digital domain, your traffic and authority scale twice as fast as your competitors.",
  },
  {
    number: "02",
    title: "Beyond The SEO Scam",
    body: "Perfect SEO is the bare minimum. We build it 100% SEO-perfect out of the box because it's required—charging you monthly for 'basic meta tags' is an industry scam. True AI authority requires fresh, purposeful, continuous content to drive actual sales. We build the engine that produces it automatically.",
  },
  {
    number: "03",
    title: "Independent Authority",
    body: "You share a domain, but you don't share an identity. We build you individual authority hubs. Mark gets commercial case studies and ROI breakdowns. Rachael gets neighborhood guides and residential market trends. You stay completely distinct.",
  },
  {
    number: "04",
    title: "Dual Command Centers",
    body: "No tripping over each other's leads. You each get your own dedicated ClickMe CRM dashboard. Mark tracks his commercial deal flow; Rachael manages her residential pipeline—unified seamlessly behind the scenes.",
  },
];

export default function Page() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white relative selection:bg-[#D4AF37] selection:text-black font-sans">

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl font-bold tracking-tight text-white drop-shadow-md">
              Davis & Garnett
            </span>
            <span className="w-px h-5 bg-white/20 block"></span>
            <span className="label-caps text-[0.6rem] text-white/50 mt-0.5">Powered by ClickMe</span>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              l.href.startsWith("/") ? (
                <Link key={l.label} href={l.href} className="label-caps text-white/60 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} className="label-caps text-white/60 hover:text-white transition-colors">
                  {l.label}
                </a>
              )
            ))}
            <a href="#investment" className="btn-gold text-[0.65rem] py-3 px-6 ml-4">
              Investment & Contract
            </a>
          </div>

          <button className="lg:hidden p-2 text-white/60" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 p-8 flex flex-col gap-6 shadow-2xl">
            {NAV_LINKS.map((l) => (
              l.href.startsWith("/") ? (
                <Link key={l.label} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif text-white hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-4">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif text-white hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-4">
                  {l.label}
                </a>
              )
            ))}
            <a href="#investment" onClick={() => setIsMobileMenuOpen(false)} className="btn-gold text-center py-4 mt-4">
              Investment & Contract
            </a>
          </div>
        )}
      </nav>

      {/* ── 1. HERO ────────────────────────────────────────── */}
      <header className="relative lg:min-h-screen flex flex-col lg:flex-row items-center lg:items-stretch pt-28 lg:pt-20">
        <div className="relative flex flex-col justify-center w-full lg:w-[60%] px-8 lg:px-16 py-10 lg:py-20 z-10">
          <div className="inline-flex items-center gap-3 mb-10 fade-up fade-up-delay-1 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full self-start shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/80">Strategic Proposal</span>
          </div>

          <h1 className="display-xl fade-up fade-up-delay-2">
            Static SEO <br />
            Is Dead.<br />
            We Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6E3B0] via-[#D4AF37] to-[#8B6914] drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]">Engines.</span>
          </h1>

          <p className="fade-up fade-up-delay-3 mt-10 max-w-xl text-lg text-white/60 leading-relaxed font-light">
            We aren't just selling you a static brochure with an arbitrary "SEO tax." We are engineering the exact active content engine required to merge Mark's commercial gravity and Rachael's residential finesse into Tampa Bay's premier real estate syndicate.
          </p>

          <div className="fade-up fade-up-delay-4 mt-12 flex flex-wrap gap-4">
            <a href="#truth" className="btn-gold">
              See the Playbook <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/coming-soon" className="btn-ghost">
              (Coming Soon Page)
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[40%] relative justify-center px-8 lg:pr-8 pb-20 lg:py-20">
          <div className="relative w-full aspect-[4/5] glass-card overflow-hidden group">
            <Image
              src="/davis-garnett-hero.png"
              alt="Davis & Garnett"
              fill
              className="object-cover object-center scale-105 transition-transform duration-1000 group-hover:scale-100 opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
              <div>
                <span className="label-caps text-[#D4AF37] block mb-2 drop-shadow-md">Tampa Bay, FL</span>
                <p className="font-serif text-3xl font-semibold text-white drop-shadow-lg">Davis & Garnett</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── TICKER STRIP ─────────────────────────────────── */}
      <div className="overflow-hidden py-5 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm">
        <div className="flex gap-16 animate-none whitespace-nowrap px-8 items-center">
          {MARKETS.concat(MARKETS).map((m, i) => (
            <span key={i} className="label-caps text-white/30 shrink-0">
              {m} <span className="text-[#D4AF37] mx-6 opacity-30">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 2. THE SEARCH WAR (NEW) ──────────────────────── */}
      <section id="truth" className="relative py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <span className="label-caps text-white/50 block mb-6 flex items-center gap-2"><Search className="w-4 h-4 text-[#D4AF37]" /> The Search War</span>
              <h2 className="display-lg">
                AI Engines Don't<br />
                Use Google.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700">They Use Everything.</span>
              </h2>
            </div>
            <div className="max-w-lg glass-card p-8">
              <p className="text-white/70 text-base leading-relaxed mb-6 font-light">
                Something shifted permanently. And almost nobody in real estate has noticed yet. Your next client didn't open Google this morning. They opened ChatGPT. Or Perplexity. Or Claude.
              </p>
              <div className="gold-line-short mb-6" />
              <p className="text-white text-base leading-relaxed font-medium">
                These engines don't use Google to find answers. They pull directly from the web—crawling your site, directories, and social platforms simultaneously. If you aren't structuring your data for AI engines to read directly, you are already invisible.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Google Is A Middleman",
                body: "Clients aren't typing 'commercial real estate agent tampa' into Google and scrolling past ads anymore. They are asking ChatGPT to evaluate who has the best track record based on web citations. AI skips the middleman entirely.",
              },
              {
                title: "The SEO Trap",
                body: "Agencies are still charging $2,000/month to optimize for Google's 2018 algorithm. Meanwhile, generative engines don't care about your backlink profile—they care about structured, authoritative answers to specific prompts.",
              },
              {
                title: "The Content Deficit",
                body: "If your website is just a static digital brochure with no new data being generated, AI engines assume you aren't an active authority. You don't just need a website. You need a continuously running content engine.",
              },
            ].map((card) => (
              <div key={card.title} className="glass-card p-10 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-serif font-semibold text-2xl text-white">{card.title}</h3>
                <p className="text-white/60 text-base leading-relaxed font-light">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE NEW BATTLEGROUND (NEW AEO/GEO) ────────── */}
      <section className="relative py-32 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 text-center">
             <span className="label-caps text-[#D4AF37] block mb-6">The New Battleground</span>
            <h2 className="display-lg">
              AEO & GEO:<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">How You Actually Win.</span>
            </h2>
            <p className="text-white/60 text-lg mt-6 max-w-2xl mx-auto font-light leading-relaxed">
              We don't sell traditional SEO because traditional SEO is dead. We engineer your platform for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-12">
              <h3 className="font-serif text-3xl text-white mb-6">Answer Engine Optimization (AEO)</h3>
              <p className="text-white/70 font-light mb-6">
                AEO structures your data so voice assistants (Siri, Alexa) and direct-answer platforms can instantly pull your exact words to answer user questions.
              </p>
              <ul className="flex flex-col gap-4 text-white/60 text-sm">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D4AF37] shrink-0" /> Focuses on conversational, long-tail queries.</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D4AF37] shrink-0" /> Uses specific FAQ schemas that engines look for first.</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D4AF37] shrink-0" /> Answers the "Who, What, Where, Why" immediately.</li>
              </ul>
            </div>
            
            <div className="glass-card p-12">
              <h3 className="font-serif text-3xl text-white mb-6">Generative Engine Optimization (GEO)</h3>
              <p className="text-white/70 font-light mb-6">
                GEO ensures your content is cited by LLMs (ChatGPT, Perplexity) when they generate comprehensive summaries for complex research queries.
              </p>
              <ul className="flex flex-col gap-4 text-white/60 text-sm">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D4AF37] shrink-0" /> Focuses on deep, authoritative, comprehensive content.</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D4AF37] shrink-0" /> Structures data with clear headings and citations.</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-[#D4AF37] shrink-0" /> Ensures your brand is the "source material" for the AI's logic.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. THE HOW: PLAYBOOK SECTION ───────────────────── */}
      <section id="playbook" className="relative py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-24 grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">The Strategy</span>
              <h2 className="display-lg">
                The Dual-Engine<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Playbook.</span>
              </h2>
            </div>
            <div className="max-w-md glass-card p-6 bg-[#D4AF37]/5 border-[#D4AF37]/20">
              <p className="text-white/80 leading-relaxed text-base font-light">
                We aren't renting you a static brochure. We are deploying the exact digital playbook to dominate your specific commercial and residential markets.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8">
            <div className="flex flex-col gap-4">
              {FEATURES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border ${
                    activeFeature === i 
                      ? "bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl" 
                      : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10 backdrop-blur-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="label-caps text-white/40 block mb-2">{f.number}</span>
                      <span className={`font-serif text-xl font-medium transition-colors ${activeFeature === i ? "text-white" : "text-white/50"}`}>
                        {f.title}
                      </span>
                    </div>
                    {activeFeature === i && <ChevronRight className="w-5 h-5 text-[#D4AF37]" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="glass-card p-12 lg:p-16 flex flex-col justify-center min-h-[400px] border-l-4 border-l-[#D4AF37]">
              <div className="inline-flex items-center gap-3 mb-8 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-full self-start">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                  Protocol {FEATURES[activeFeature].number}
                </span>
              </div>
              <h3 className="font-serif font-semibold text-4xl lg:text-5xl mb-8 leading-tight text-white drop-shadow-md">
                {FEATURES[activeFeature].title}
              </h3>
              <p className="text-white/70 text-xl leading-relaxed max-w-xl font-light">
                {FEATURES[activeFeature].body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE ARCHITECTURE (EXPANDED) ───────────────── */}
      <section id="deliverables" className="relative py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 text-center">
            <span className="label-caps text-white/50 block mb-6">The Architecture</span>
            <h2 className="display-lg">
              How We Build<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">The Machine.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            <div className="glass-card p-10 flex flex-col gap-6 lg:col-span-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full" />
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif font-semibold text-3xl text-white">Full Custom Web App</h3>
              <p className="text-white/60 font-light text-lg">A custom-built, enterprise-grade React web application deployed on a global edge network. Sub-second load times worldwide, eliminating the bloat and vulnerabilities of WordPress entirely.</p>
            </div>

            <div className="glass-card p-10 flex flex-col gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-white">AEO & GEO Schema</h3>
              <p className="text-white/60 font-light text-sm">Every page is laced with structured data designed specifically to feed generative AI engines (ChatGPT, Perplexity) and voice search algorithms directly.</p>
            </div>

            <div className="glass-card p-10 flex flex-col gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Box className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-white">Dual Dashboards</h3>
              <p className="text-white/60 font-light text-sm">Separate, dedicated ClickMe CRM ecosystems for Mark's commercial pipeline and Rachael's residential leads. One unified platform, independent data.</p>
            </div>

            <div className="glass-card p-10 flex flex-col gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-white">Multi-Channel Autopilot</h3>
              <p className="text-white/60 font-light text-sm">Your content isn't just on your site. The engine automatically syndicates your insights to your Google Business Profiles and social platforms.</p>
            </div>

            <div className="glass-card p-10 flex flex-col gap-6">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif font-semibold text-2xl text-white">Unified Reputation</h3>
              <p className="text-white/60 font-light text-sm">Monitor, respond, and manage reviews across Google, Yelp, and Zillow for both Mark and Rachael from inside a single command center.</p>
            </div>

            <div className="glass-card p-10 flex flex-col gap-6 lg:col-span-3 bg-gradient-to-r from-white/[0.05] to-transparent border-t-white/20">
               <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-semibold text-4xl text-white">The Active Content Engine™</h3>
              <p className="text-white/70 font-light text-xl max-w-3xl">This is what replaces the $2,000/mo SEO agency. The engine learns your voices, analyzes your specific markets, and continuously generates, schedules, and publishes authority content—building your AI citations while you sleep.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center mt-12 gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link href="/features" className="btn-gold flex items-center justify-center gap-2">
              Explore All Features <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/scope" className="btn-ghost flex items-center justify-center gap-2">
              View Detailed Scope
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. COMPARISON: HOW WE STACK UP ───────────────── */}
      <section className="relative py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 text-center">
            <span className="label-caps text-[#D4AF37] block mb-6">The Reality Check</span>
            <h2 className="display-lg">
              How We Stack Up<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Against the Old Guard.</span>
            </h2>
            <p className="text-white/60 text-lg mt-6 max-w-xl mx-auto font-light">
              Don't pay an agency a massive premium just to maintain code. We build an active architecture that hunts for sales.
            </p>
          </div>

          <div className="flex lg:hidden items-center justify-end gap-2 mb-3 text-white/40 text-[0.6rem] uppercase tracking-widest font-bold">
            <span>Swipe to compare</span>
            <ArrowRight className="w-3 h-3 animate-pulse" />
          </div>

          <div className="w-full overflow-x-auto pb-4">
            <div className="glass-card min-w-[900px] overflow-hidden">
              <div className="grid grid-cols-4 lg:grid-cols-5 border-b border-white/10 bg-white/5">
              <div className="p-6 border-r border-white/10 flex items-center">
                <span className="label-caps text-white/50">The Offering</span>
              </div>
              <div className="p-6 border-r border-white/10 text-center hidden lg:block">
                <span className="label-caps text-white/80">Owner.com</span>
              </div>
              <div className="p-6 border-r border-white/10 text-center">
                <span className="label-caps text-white/80">Agent Image</span>
              </div>
              <div className="p-6 border-r border-white/10 text-center">
                <span className="label-caps text-white/80">Luxury Presence</span>
              </div>
              <div className="p-6 text-center bg-[#D4AF37]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-50" />
                <span className="label-caps text-[#D4AF37] font-bold relative z-10 text-sm">ClickMe</span>
              </div>
            </div>

            {[
              { feature: "Upfront Cost", owner: "$0 setup", ai: "$4,000+ setup", lp: "$5,000+ setup", us: "$0 setup fee. Ever." },
              { feature: "Basic SEO Formatting", owner: "Included", ai: "Extortion Retainer", lp: "Extortion Retainer ($800/mo)", us: "100% Perfect Out-of-the-Box" },
              { feature: "AEO Optimization", owner: "None", ai: "None", lp: "None", us: "Core Infrastructure" },
              { feature: "GEO Architecture", owner: "None", ai: "None", lp: "None", us: "Core Infrastructure" },
              { feature: "Content Engine", owner: "None", ai: "DIY", lp: "DIY", us: "Autopilot, Sales-Driven" },
              { feature: "AI Citation Tracking", owner: "None", ai: "None", lp: "None", us: "Dashboard Integrated" },
              { feature: "Voice Model Training", owner: "None", ai: "None", lp: "None", us: "Individual Partner Training" },
              { feature: "Dual Dashboards", owner: "Single login", ai: "Single WP login", lp: "Single login", us: "Dedicated CRM for each partner" },
              { feature: "Asset Ownership", owner: "Cancel = lose it all", ai: "You own the WP files", lp: "Cancel = lose it all", us: "You own the build. Period." },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 lg:grid-cols-5 border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className="p-6 border-r border-white/5 flex items-center"><span className="text-sm font-medium text-white">{row.feature}</span></div>
                <div className="p-6 border-r border-white/5 hidden lg:flex items-center justify-center gap-2"><span className="text-sm text-white/50 text-center">{row.owner}</span></div>
                <div className="p-6 border-r border-white/5 flex items-center justify-center gap-2"><span className="text-sm text-white/50 text-center">{row.ai}</span></div>
                <div className="p-6 border-r border-white/5 flex items-center justify-center gap-2"><span className="text-sm text-white/50 text-center">{row.lp}</span></div>
                <div className="p-6 flex items-center justify-center gap-2 bg-[#D4AF37]/5"><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /><span className="text-sm text-[#D4AF37] font-bold text-center">{row.us}</span></div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PRICE: INVESTMENT (UPDATED) ───────────────── */}
      <section id="investment" className="relative py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 text-center">
            <span className="label-caps text-[#D4AF37] block mb-5">The Split Advantage</span>
            <h2 className="display-lg">
              Invest In The Engine.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Not The Formatting.</span>
            </h2>
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              By combining forces, you are acquiring a massive enterprise-grade infrastructure for a fraction of what individual agents pay.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard */}
            <div className="glass-card p-12 flex flex-col">
              <span className="label-caps text-white/50 block mb-6">Standard Platform</span>
              <div className="mb-2">
                <span className="font-serif text-5xl font-bold text-white">$595</span>
                <span className="text-white/50 font-medium ml-2">/month</span>
              </div>
              <div className="mb-6">
                <span className="text-white/50 font-medium text-sm">+ $995 Initial Setup Fee</span>
              </div>
              <p className="text-white/60 text-sm mb-8">Our retail pricing for an enterprise real estate infrastructure.</p>
              
              <div className="gold-line-short mb-8 opacity-50 bg-white/20" />
              
              <ul className="flex flex-col gap-4 mb-12 flex-1">
                {[
                  "100% SEO-Perfect build out of the box", 
                  "AEO and GEO infrastructure included",
                  "Individual Dashboards for Mark & Rachael", 
                  "Active Content Engine for both channels",
                  "Reputation & Review Management",
                  "Excludes 3rd-party subscriptions (e.g., MLS)"
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/70 font-light">
                    <Check className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/agreement?plan=monthly" className="btn-ghost w-full text-center block">
                Accept and Pay
              </Link>
            </div>

            {/* Rachael's Offer */}
            <div className="glass-card p-12 flex flex-col border-2 border-[#D4AF37]/40 bg-gradient-to-b from-[#D4AF37]/10 to-transparent relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0] text-black text-[0.65rem] font-bold tracking-[0.2em] uppercase px-6 py-2 rounded-bl-2xl">
                Referral Pricing
              </div>
              
              <span className="label-caps text-[#D4AF37] block mb-6">Rachael's Network Offer</span>
              <div className="mb-2">
                <span className="font-serif text-5xl font-bold text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">$295</span>
                <span className="text-white/50 font-medium ml-2">/month</span>
              </div>
              <div className="mb-6">
                <span className="text-[#D4AF37] font-medium text-sm">+ $995 Initial Setup Fee</span>
              </div>
              <p className="text-white/60 text-sm mb-8">Special rate. Total due first month: <strong>$1,295.00</strong>.</p>
              
              <div className="gold-line-short mb-8" />
              
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-6 rounded-xl mb-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="label-caps text-[#D4AF37] block mb-3 text-[0.65rem]">Best Value Option</span>
                <p className="text-white text-base leading-relaxed mb-3">Pay <span className="font-bold text-[#D4AF37]">$3,000 upfront</span> and your membership is paid for the entire first year.</p>
                <p className="text-white/50 text-[0.65rem] leading-relaxed">*You own your products & dashboards. Excludes 3rd-party subscription fees (e.g., MLS/IDX). Standard annual integration renewals apply after year 1.</p>
              </div>
              
              <Link href="/scope" className="btn-gold w-full flex items-center justify-center gap-2 mb-4">
                View Full Project Scope
              </Link>
              <Link href="/agreement?plan=annual" className="btn-ghost w-full flex items-center justify-center gap-2">
                Accept and Pay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. DEMO: COMING SOON PREVIEW ─────────────────── */}
      <section className="relative py-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="label-caps text-[#D4AF37] block mb-6">The Demo</span>
              <h2 className="display-lg">
                We Are Already<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Building It.</span>
              </h2>
              <p className="mt-8 text-white/60 text-lg leading-relaxed font-light">
                While you review this strategic playbook, we have already spun up an interim digital presence in your branding. This landing page acts as your high-end digital business card while we construct the definitive AEO platform underneath.
              </p>
              <Link href="/coming-soon" className="btn-gold mt-10">
                View Live Environment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="glass-card overflow-hidden p-2">
              <div className="bg-black/80 rounded-t-xl px-6 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-medium text-white/30 ml-2">davisandgarnett.com</span>
              </div>
              <div className="relative h-80 overflow-hidden rounded-b-xl group cursor-pointer" onClick={() => window.location.href='/coming-soon'}>
                <Image
                  src="/davis-garnett-real-combo.png"
                  alt="Site Preview"
                  fill
                  className="object-cover object-top opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none transition-all duration-700 group-hover:backdrop-blur-0 group-hover:bg-transparent">
                  <span className="font-serif text-3xl font-bold tracking-widest text-white drop-shadow-lg transition-opacity duration-700 group-hover:opacity-0">DAVIS & GARNETT</span>
                  <span className="label-caps text-white/80 mt-4 bg-black/50 px-4 py-1 rounded-full backdrop-blur-md transition-opacity duration-700 group-hover:opacity-0">System Assembly in Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="relative px-8 py-12 bg-black border-t border-white/5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif text-xl font-bold tracking-widest text-white/30 uppercase">
              Davis & Garnett
            </span>
            <p className="text-xs font-medium text-white/30 mt-2 tracking-widest uppercase">
              Align Right Realty Carrollwood
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <a href="mailto:msdavis118@gmail.com" className="text-xs font-semibold text-white/50 hover:text-white transition-colors tracking-widest uppercase">msdavis118@gmail.com</a>
            <a href="mailto:rachaellgarnett@gmail.com" className="text-xs font-semibold text-white/50 hover:text-white transition-colors tracking-widest uppercase">rachaellgarnett@gmail.com</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

"use client";

import { ArrowRight, ChevronRight, Server, Layout, Zap, Shield, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function ScopePage() {
  return (
    <div className="min-h-screen text-white relative selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* ── AMBIENT FLUID BACKGROUND ──────────────────────── */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/10 blur-[150px] animate-float-slow" />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px] animate-float-slower" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/5 blur-[150px] animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>

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
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className="label-caps text-white/60 hover:text-white transition-colors">
              Return to Proposal
            </Link>
            <Link href="/coming-soon" className="label-caps text-white/60 hover:text-white transition-colors">
              Live Preview
            </Link>
            <Link href="/features" className="label-caps text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/clickme" className="label-caps text-white/60 hover:text-white transition-colors">
              Dashboard Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative pt-40 pb-20 px-8 border-b border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
           <div className="inline-flex items-center gap-3 mb-8 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/80">Project Scope</span>
          </div>
          <h1 className="display-xl mb-8">
            The Digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Masterplan.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            A complete breakdown of every phase, every deliverable, and every boundary of what we are building for Davis & Garnett.
          </p>
        </div>
      </header>

      {/* ── SCOPE SECTIONS ───────────────────────────────── */}
      <main className="py-24 px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
          
          {/* Phase 1 / Core Foundation */}
          <section className="glass-card p-12 lg:p-16 border-t-4 border-t-[#D4AF37]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <Server className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">01. The Core Architecture</h2>
            </div>
            
            <h3 className="text-2xl font-serif text-white mb-6">The Foundation Nobody Sees But Everyone Feels.</h3>
            
            <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 text-white/70 font-light leading-relaxed">
              <div>
                <p className="mb-6">
                  No WordPress. No page builders. No bloated themes slowing you down and confusing AI crawlers.
                </p>
                <p className="mb-6">
                  We aren't building a basic website — we are building a full, custom React web application. Deployed on a global edge network, it delivers sub-second load times anywhere in the world with zero downtime. A clean, structured codebase that AI engines can crawl completely and confidently.
                </p>
                
                <h4 className="text-white font-medium mb-3 mt-8">Every single page ships with:</h4>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <strong className="text-[#D4AF37] block mb-2 text-sm uppercase tracking-wider">Technical</strong>
                    <ul className="flex flex-col gap-2 text-sm">
                      <li>• Custom Next.js build — no templates</li>
                      <li>• Global CDN edge network deployment</li>
                      <li>• Sub-second load times</li>
                      <li>• Zero WordPress vulnerabilities</li>
                      <li>• Automatic HTTPS & security headers</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-[#D4AF37] block mb-2 text-sm uppercase tracking-wider">SEO Foundation</strong>
                    <ul className="flex flex-col gap-2 text-sm">
                      <li>• Perfect technical SEO configured</li>
                      <li>• XML sitemap auto-generated</li>
                      <li>• Robots.txt optimized for AI</li>
                      <li>• Open Graph & social metadata</li>
                      <li>• Canonical tags throughout</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <strong className="text-[#D4AF37] block mb-2 text-sm uppercase tracking-wider">AEO + GEO Infrastructure</strong>
                  <ul className="flex flex-col gap-2 text-sm">
                    <li>• Schema markup on every URL from day one</li>
                    <li>• Question-and-answer structured data throughout</li>
                    <li>• Citation-ready content formatting</li>
                    <li>• Direct web crawl optimization for ChatGPT, Perplexity, Gemini, Claude, Copilot</li>
                    <li>• AI visibility tracking setup</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-xl border border-white/5 h-fit">
                <h3 className="text-white font-medium mb-6 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#D4AF37]" /> Key Deliverables
                </h3>
                <ul className="flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Custom Next.js website deployed to your domain</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Global edge network deployment</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Complete technical SEO audit passed pre-launch</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> AEO schema on every page</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> GEO structured data throughout</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> AI crawler access optimized</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Sitemap submitted to all major engines</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Phase 2 / Dual Dashboards */}
          <section className="glass-card p-12 lg:p-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">02. Dual Command Centers</h2>
            </div>

            <h3 className="text-2xl font-serif text-white mb-6">Two Agents. Two Pipelines. One Ecosystem.</h3>

            <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 text-white/70 font-light leading-relaxed">
              <div>
                <p className="mb-6">
                  Mark and Rachael operate in fundamentally different markets, targeting completely different clients, with completely different content needs. A single shared login is a liability — not a feature.
                </p>
                <p className="mb-8">
                  Each partner receives a dedicated, fully-featured dashboard built specifically for their market:
                </p>

                <div className="mb-8">
                  <strong className="text-white block mb-3 text-lg">Mark's Commercial Dashboard</strong>
                  <p className="text-sm mb-4">Purpose-built for commercial real estate pipeline:</p>
                  <ul className="flex flex-col gap-2 text-sm pl-4 border-l-2 border-[#D4AF37]/30">
                    <li>• Commercial lead CRM — contacts, companies, deal stages</li>
                    <li>• Commercial content queue in Mark's voice</li>
                    <li>• Commercial Q&A and market update publishing</li>
                    <li>• Tampa Bay commercial market analytics</li>
                    <li>• Google Business Profile — commercial posts</li>
                    <li>• Commercial listing integration support</li>
                    <li>• Team and partner access management</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <strong className="text-white block mb-3 text-lg">Rachael's Residential Dashboard</strong>
                  <p className="text-sm mb-4">Purpose-built for residential real estate pipeline:</p>
                  <ul className="flex flex-col gap-2 text-sm pl-4 border-l-2 border-[#D4AF37]/30">
                    <li>• Residential buyer and seller CRM</li>
                    <li>• Residential content queue in Rachael's voice</li>
                    <li>• Neighborhood guide and lifestyle content publishing</li>
                    <li>• Tampa Bay residential market analytics</li>
                    <li>• Google Business Profile — residential posts</li>
                    <li>• MLS/IDX integration support (subscription separate)</li>
                    <li>• Client communication and follow-up workflows</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <strong className="text-[#D4AF37] block mb-2 text-sm uppercase tracking-wider">Total Self-Sufficiency</strong>
                  <p className="text-sm mb-4">
                    Stop spending money on third-party subscriptions and logging into 15 different tools online. The ClickMe dashboard gives you the power to manage your brand internally:
                  </p>
                  <ul className="flex flex-col gap-2 text-sm pl-4 border-l-2 border-[#D4AF37]/30">
                    <li>• Create and publish your own featured listings</li>
                    <li>• Schedule and promote open houses</li>
                    <li>• Manage a unified calendar for both pipelines</li>
                    <li>• Publish custom posts directly in your distinct brand voice</li>
                  </ul>
                </div>

                <div>
                  <strong className="text-[#D4AF37] block mb-2 text-sm uppercase tracking-wider">Shared Ecosystem</strong>
                  <p className="text-sm">
                    Both dashboards operate under one ClickMe platform — unified billing, one support team, shared authority network, and cross-referral tracking between Mark's commercial clients and Rachael's residential pipeline.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-xl border border-white/5 h-fit">
                <h3 className="text-white font-medium mb-6 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#D4AF37]" /> Key Deliverables
                </h3>
                <ul className="flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Mark's Commercial CRM Dashboard — live at launch</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Rachael's Residential CRM Dashboard — live at launch</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Individual secure login credentials per partner</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Separate content pipelines per voice</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Cross-referral tracking between dashboards</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Native featured listings & open house creation</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Unified billing and support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Phase 3 / Active Content Engine */}
          <section className="glass-card p-12 lg:p-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">03. The Active Content Engine™</h2>
            </div>
            
            <h3 className="text-2xl font-serif text-white mb-6">The Engine That Replaced The SEO Agency.</h3>

            <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 text-white/70 font-light leading-relaxed">
              <div>
                <p className="mb-6">
                  This is what replaces the $2,000/month retainer. Permanently.
                </p>
                <p className="mb-8">
                  Most agencies give you a blog post twice a month and call it "content marketing." We deploy an engine that reads your business, learns your voice, and never stops building your authority — automatically. Here's exactly how it works:
                </p>

                <div className="flex flex-col gap-8">
                  <div>
                    <strong className="text-white block mb-2">STEP 1 — THE ENGINE READS</strong>
                    <p className="text-sm">Your AI reads every page of your site. Every service you offer. Every neighborhood you work in. Every question your clients have ever asked you. Every competitor in your market. It builds a complete map of your expertise and your voice before it writes a single word.</p>
                  </div>
                  
                  <div>
                    <strong className="text-white block mb-4">STEP 2 — THE ENGINE BUILDS</strong>
                    <p className="text-sm mb-4">Using your voice — not generic AI content — it creates:</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <strong className="text-[#D4AF37] block text-xs uppercase mb-2">For Mark (Commercial)</strong>
                        <ul className="text-xs flex flex-col gap-1">
                          <li>• Commercial lease explainers</li>
                          <li>• Tampa Bay investment Q&As</li>
                          <li>• Industrial space breakdowns</li>
                          <li>• Commercial neighborhood authority pages</li>
                          <li>• Business relocation guides</li>
                          <li>• Commercial market updates</li>
                        </ul>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <strong className="text-[#D4AF37] block text-xs uppercase mb-2">For Rachael (Residential)</strong>
                        <ul className="text-xs flex flex-col gap-1">
                          <li>• Neighborhood lifestyle guides</li>
                          <li>• First-time buyer education</li>
                          <li>• Seller strategy & market timing</li>
                          <li>• School district spotlights</li>
                          <li>• Residential market updates</li>
                          <li>• Relocation guides</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg">
                      <strong className="text-[#D4AF37] block text-xs uppercase mb-2">Shared</strong>
                      <ul className="text-xs flex flex-col gap-1">
                        <li>• Google Business Profile Q&As — both profiles</li>
                        <li>• Social media content queue — both channels</li>
                        <li>• FAQ schema pages for every service</li>
                        <li>• Authority pages targeting major AI queries</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <strong className="text-white block mb-2">STEP 3 — THE ENGINE POSTS</strong>
                    <p className="text-sm">Everything approved. Everything scheduled. Published automatically across your website, Google Business Profiles, and social channels. No manual work. No agency middleman. No monthly invoice for doing the bare minimum.</p>
                  </div>

                  <div>
                    <strong className="text-white block mb-2">STEP 4 — THE ENGINE READS AGAIN</strong>
                    <p className="text-sm">Back to step one. Scanning what's new. What listings have changed. What questions are trending in your market. What your competitors just published. The engine builds more — always expanding, always current, always building your authority deeper.</p>
                    <p className="text-[#D4AF37] text-sm mt-2 font-medium">This loop runs forever. While you're closing deals.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-xl border border-white/5 h-fit sticky top-24">
                <h3 className="text-white font-medium mb-6 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-[#D4AF37]" /> Key Deliverables
                </h3>
                <ul className="flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> AI engine trained on Mark and Rachael's distinct voices</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Weekly content published to site — both channels</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Google Business Profile auto-posting — both profiles</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Social media content queue with approval workflow</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Monthly AI citation report — tracking ChatGPT, Perplexity, and Gemini answers</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> Quarterly content performance review</li>
                  <li className="flex items-start gap-3"><span className="text-[#D4AF37]">☑</span> AEO and GEO performance tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Phase 4 / Exclusions & Notes */}
          <section className="glass-card p-12 lg:p-16 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">04. Exclusions & 3rd Party Integrations</h2>
            </div>
            
            <h3 className="text-2xl font-serif text-white mb-6">What's In. What's Out. No Surprises.</h3>

            <div className="grid md:grid-cols-2 gap-12 text-white/70 font-light leading-relaxed">
              <div>
                <strong className="text-white block mb-3 uppercase tracking-wider text-sm">What's Included</strong>
                <p className="mb-4 text-sm">
                  Everything described in Phases 1, 2, and 3. The complete ClickMe architecture. Both dashboards. The Active Content Engine. AEO and GEO infrastructure. Reputation management. Analytics. Authority network access. You own all of it.
                </p>

                <strong className="text-[#D4AF37] block mt-8 mb-3 uppercase tracking-wider text-sm">Important Note on Ownership</strong>
                <p className="text-sm">
                  You own your website build. You own your dashboard data. You own your content. If you ever leave ClickMe — which we don't expect — you take everything with you. No platform lock-in. No holding your assets hostage. That's not how we operate.
                </p>
              </div>

              <div className="bg-black/40 p-8 rounded-xl border border-white/5">
                <strong className="text-red-400 block mb-4 uppercase tracking-wider text-sm">What's Not Included</strong>
                <p className="text-sm mb-6">
                  The following are explicitly outside your base investment and would be scoped and quoted separately if needed:
                </p>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-0.5 shrink-0" /> MLS / IDX feed subscription fees (required for live listing integration)</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-0.5 shrink-0" /> Paid advertising spend (Google Ads, Meta Ads, Zillow Premier Agent)</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-0.5 shrink-0" /> Third-party CRM data migrations from existing systems</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-0.5 shrink-0" /> Outside software subscriptions not in the ClickMe ecosystem</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-0.5 shrink-0" /> Custom API integrations beyond standard platform connections</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-0.5 shrink-0" /> Annual third-party integration renewals after year one</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ── FOOTER CTA ───────────────────────────────────── */}
      <section className="py-32 px-8 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl text-white mb-8">Ready to move forward?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#investment" className="btn-gold">
              View Investment Options <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="btn-ghost">
              Return to Proposal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

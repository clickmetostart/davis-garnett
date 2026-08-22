"use client";

import { ArrowRight, ChevronRight, Layers, Layout, Server, Shield, Zap } from "lucide-react";
import Image from "next/image";
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
            <Link href="/coming-soon" className="btn-gold text-[0.65rem] py-3 px-6">
              Live Preview
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative pt-40 pb-20 px-8 border-b border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
           <div className="inline-flex items-center gap-3 mb-8 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/80">Project Scope</span>
          </div>
          <h1 className="display-xl mb-8">
            The Digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Masterplan.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            A comprehensive breakdown of the architecture, content engine, and individual authority hubs we are building for Davis & Garnett.
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
            <div className="grid md:grid-cols-2 gap-8 text-white/70 font-light leading-relaxed">
              <div>
                <p className="mb-4">
                  [Details about the underlying framework, server setup, and foundational SEO structure goes here. Focus on the raw performance and indexability out of the box.]
                </p>
                <ul className="flex flex-col gap-3 mt-6">
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" /> Custom front-end build (No WordPress)</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" /> Sub-second load times</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" /> Technical SEO perfectly configured out of the box</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <h3 className="text-white font-medium mb-3">Key Deliverables</h3>
                <p className="text-sm">High-level bullet points outlining exactly what is built and handed over during this phase.</p>
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
            <div className="grid md:grid-cols-2 gap-8 text-white/70 font-light leading-relaxed">
              <div>
                <p className="mb-4">
                  [Details regarding Mark's commercial CRM versus Rachael's residential CRM. Explain how they remain distinct but operate within the same overall ecosystem.]
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                 <h3 className="text-white font-medium mb-3">Key Deliverables</h3>
                <p className="text-sm">Specifics on lead routing, dashboard access, and management tools.</p>
              </div>
            </div>
          </section>

          {/* Phase 3 / Active Content Engine */}
          <section className="glass-card p-12 lg:p-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">03. The Active Content Engine</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-white/70 font-light leading-relaxed">
              <div>
                <p className="mb-4">
                  [Details on the automated content creation, AI integrations, or continuous publishing workflows that replace the standard "SEO Retainer."]
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                 <h3 className="text-white font-medium mb-3">Key Deliverables</h3>
                <p className="text-sm">How often content is published, how it's distributed, and what it targets.</p>
              </div>
            </div>
          </section>

          {/* Phase 4 / Exclusions & Notes */}
          <section className="glass-card p-12 lg:p-16 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-white">Exclusions & 3rd Party Integrations</h2>
            </div>
            <div className="text-white/70 font-light leading-relaxed max-w-3xl">
              <p className="mb-4">
                The setup and build fees explicitly cover the ClickMe architecture, digital platform, and initial content/SEO integration. They do <strong>not</strong> cover:
              </p>
              <ul className="flex flex-col gap-3 mt-6">
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-1 shrink-0" /> Third-party subscription fees (e.g., MLS / IDX feeds) if enabled in the future.</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-1 shrink-0" /> Paid advertising spend (Google Ads, Meta Ads).</li>
                <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-white/40 mt-1 shrink-0" /> Future 3rd-party software integrations outside of the ClickMe ecosystem.</li>
              </ul>
            </div>
          </section>

        </div>
      </main>

      {/* ── FOOTER CTA ───────────────────────────────────── */}
      <section className="py-24 px-8 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-4xl text-white mb-8">Ready to review the investment?</h2>
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

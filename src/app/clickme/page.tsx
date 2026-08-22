"use client";

import { ArrowRight, LayoutDashboard, Users, Zap, Star, BarChart, Share2, MessageSquare, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ClickMePage() {
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
              ← Back to Proposal
            </Link>
            <Link href="/features" className="label-caps text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/scope" className="label-caps text-white/60 hover:text-white transition-colors">
              Project Scope
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HEADER ────────────────────────────────────────── */}
      <header className="relative pt-40 pb-20 px-8 border-b border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
           <div className="inline-flex items-center gap-3 mb-8 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/80">The Dashboard</span>
          </div>
          <h1 className="display-xl mb-8">
            Your Command<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Center.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            This is what running your entire digital presence on autopilot actually looks like. One login. Everything in one place. Always working.
          </p>
        </div>
      </header>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/80 text-xl leading-relaxed font-light">
            Every Davis & Garnett subscription includes full access to the ClickMe dashboard — the platform that runs your content engine, manages your pipeline, tracks your reputation, and measures your AI visibility. All in real time. All in one place.
          </p>
        </div>
      </section>

      {/* ── DASHBOARD MODULES ─────────────────────────────── */}
      <section className="py-12 px-8">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-8">
          
          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Dashboard Hub</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Your complete command center. Everything happening across your digital presence — content published, leads captured, reviews received, AI citations earned — visible at a glance the moment you log in.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Network CRM</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Your complete contact and pipeline management system. Mark's commercial pipeline and Rachael's residential pipeline — separate, organized, and always current. No Salesforce. No HubSpot. No third-party subscription.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Content Pipeline</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Your Active Content Engine™ in action. See what's been written, what's scheduled, what's been published, and what's coming next — all in your voice, all optimized for AEO and GEO, all automated.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Reputation Engine</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Every review from every platform — Google, Yelp, Facebook, Zillow — in one place. Read them. Respond to them. Track your overall rating. Never miss a review again.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <BarChart className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">BI Analytics</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Your complete performance dashboard. Website traffic. Content performance. Lead sources. AI citation tracking. Social media reach. Google Business insights. All the data that tells you exactly how your engine is performing.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Social Integrations</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              All your social channels connected. Content created by your engine. Approved by you. Published on schedule. Across every platform that matters to your market.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Google Business Control</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Your Google Business Profile managed automatically. Posts. Q&As. Updates. Offers. Your engine keeps your profile active and authoritative — every single week — without you lifting a finger.
            </p>
          </div>

          <div className="glass-card p-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-3xl text-white">Business Locations</h3>
            <p className="text-white/60 text-base leading-relaxed font-light">
              Multi-location management for every market you serve. Mark's commercial territories. Rachael's residential communities. Every location tracked and optimized independently under one ecosystem.
            </p>
          </div>

        </div>
      </section>

      {/* ── SETUP SECTION ─────────────────────────────────── */}
      <section className="py-24 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="font-serif text-4xl text-white mb-16 text-center">Getting Started Is Simple.</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-6xl font-serif text-white/10 font-bold mb-2">01</div>
              <h4 className="font-serif text-2xl text-white">We Build Your Foundation</h4>
              <p className="text-white/60 font-light leading-relaxed">
                We construct your complete Next.js website with AEO and GEO infrastructure built into every page. Your dashboard is configured and your voice is trained into the content engine before we hand you the keys.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-6xl font-serif text-white/10 font-bold mb-2">02</div>
              <h4 className="font-serif text-2xl text-white">You Approve. We Launch.</h4>
              <p className="text-white/60 font-light leading-relaxed">
                You review everything. Request any adjustments. When you're satisfied — we launch. Your site goes live on your domain. Your dashboard goes live on ClickMe. Your content engine starts running immediately.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-6xl font-serif text-white/10 font-bold mb-2">03</div>
              <h4 className="font-serif text-2xl text-white">Your Engine Runs Itself</h4>
              <p className="text-white/60 font-light leading-relaxed">
                From launch forward — your engine reads, builds, posts, and expands. You log into your dashboard to review performance, respond to leads, approve content, and watch your AI citations grow. We're always in the background. You're always in control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────── */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="display-lg mb-8">
            Ready to see this running<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">for your business?</span>
          </h2>
          <p className="text-white/60 text-xl font-light mb-12 max-w-2xl leading-relaxed">
            This dashboard — and the entire ClickMe platform — is included with every Davis & Garnett partnership. No additional software. No third-party subscriptions. No logging into 15 different tools.
            <br /><br />
            Just one engine. Always working.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#investment" className="btn-gold flex items-center gap-2">
              See The Investment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="btn-ghost">
              Back to Proposal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

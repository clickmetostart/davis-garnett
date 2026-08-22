import { ArrowRight, Zap, Target, Search, BarChart3, Users, Home, Globe, MessageSquare, Shield, Clock, Layout, Check, MapPin, Smartphone, Star, BarChart, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Features | ClickMe Real Estate Engine",
  description: "Explore the core features of the ClickMe ecosystem,
  openGraph: {
    images: ["/davis-garnett-real-combo.png"],
  }, including AEO optimization, automated content pipelines, and AI citation tracking.",
};

export default function FeaturesPage() {
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
            <Link href="/scope" className="label-caps text-white/60 hover:text-white transition-colors">
              Project Scope
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
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/80">The Platform</span>
          </div>
          <h1 className="display-xl mb-8">
            Everything You Need.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Nothing You Don't.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            One platform. One subscription. One login. No more paying fees and logging into 15 things.
          </p>
        </div>
      </header>

      {/* ── MAIN BENTO GRID ──────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-6">
          
          {/* LARGE CARD */}
          <div className="glass-card p-12 lg:p-16 border-t-4 border-t-[#D4AF37]">
            <div className="flex justify-between items-start flex-wrap gap-6 mb-8">
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-white">The Active Content Engine™</h2>
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-2 rounded-full text-[#D4AF37] text-sm font-bold">
                Replaces Your $2,000/mo SEO Retainer
              </div>
            </div>
            <div className="text-white/70 text-lg leading-relaxed font-light max-w-4xl flex flex-col gap-6">
              <p>
                This is the core. Your AI reads your entire business — every page, every service, every neighborhood, every question your clients ask. Then it builds content in your voice. Then it posts everywhere automatically. Then it reads again and builds more.
              </p>
              <p>
                It never stops. It never takes a day off. It never sends you an invoice for doing the bare minimum.
              </p>
              <p>
                While your competitors pay agencies $2,000/month for two blog posts — your engine is publishing authority content across your site, your Google Business Profile, and your social channels. Continuously. In your voice. Forever.
              </p>
            </div>
          </div>

          {/* TWO MEDIUM CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-10 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif text-3xl text-white">Answer Engine Optimization</h3>
              <p className="text-white/60 text-base leading-relaxed">
                Every page we build is structured so that ChatGPT, Perplexity, Gemini, Claude, and every AI engine pulling directly from the web finds you, trusts you, and puts your name in the answer. Not as a link. As the recommendation.
              </p>
              <div className="mt-auto pt-4">
                <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase">The New SEO</span>
              </div>
            </div>
            <div className="glass-card p-10 flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif text-3xl text-white">Generative Engine Optimization</h3>
              <p className="text-white/60 text-base leading-relaxed">
                When AI engines generate responses they pull from the most trusted, most structured content across the entire web. Every page we build is engineered to be that source — for every query relevant to your market.
              </p>
              <div className="mt-auto pt-4">
                <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase">Beyond Google</span>
              </div>
            </div>
          </div>

          {/* SIX SMALL CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-serif text-xl text-white">Network CRM</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Manage every lead, contact, and deal stage without a third-party subscription. Your entire pipeline — inside your dashboard.</p>
              <span className="text-[#D4AF37] text-xs font-bold uppercase mt-auto">Replaces HubSpot, Salesforce</span>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-serif text-xl text-white">Google Business Autopilot</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Q&As, updates, offers, and market insights posted to your Google Business Profile automatically. Every week. Without you touching a keyboard.</p>
              <span className="text-[#D4AF37] text-xs font-bold uppercase mt-auto">Set It and Forget It</span>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-serif text-xl text-white">Social Content Pipeline</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Content created in your voice, approved by you, and published across your social channels on a consistent schedule. No social media manager required.</p>
              <span className="text-[#D4AF37] text-xs font-bold uppercase mt-auto">Replaces Your Social Agency</span>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Star className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-serif text-xl text-white">Review Management</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Respond to Google, Yelp, Facebook, and every major review platform from one place. Never miss a review. Never lose a client to an unanswered complaint.</p>
              <span className="text-[#D4AF37] text-xs font-bold uppercase mt-auto">All Sources. One Dashboard.</span>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <BarChart className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-serif text-xl text-white">Business Intelligence</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Traffic, leads, content performance, AI citation tracking, and social analytics — all in one dashboard. Know exactly what's working and what isn't.</p>
              <span className="text-[#D4AF37] text-xs font-bold uppercase mt-auto">Real Data. Real Decisions.</span>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <LinkIcon className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-serif text-xl text-white">Partner Network</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Strategic cross-linking with trusted partners in your market. Every partner connection strengthens your authority across every AI engine crawling the web.</p>
              <span className="text-[#D4AF37] text-xs font-bold uppercase mt-auto">Compounds Over Time</span>
            </div>

          </div>

        </div>
      </section>

      {/* ── ADDITIONAL FEATURES LIST ───────────────────────── */}
      <section className="py-24 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="font-serif text-4xl text-white mb-12 text-center">Also Included:</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {[
                "Custom Next.js website build",
                "Sub-second global load times",
                "Perfect technical SEO out of the box",
                "AEO schema on every page",
                "GEO structured data throughout",
                "AI crawler access optimized",
                "Sitemap auto-generation and submission",
                "Mobile-first responsive design",
                "HTTPS and security headers",
                "Team access management",
                "Multi-location support",
                "Onboarding guide included"
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-white/80 font-light">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Individual logins per team member",
                "Content approval workflow",
                "Voice and tone training per user",
                "Quarterly performance reviews",
                "Monthly AI citation reports",
                "Priority support access",
                "Dashboard always updating",
                "New features added regularly",
                "You own everything",
                "No platform lock-in",
                "Cancel anytime",
                "Zero setup surprises"
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span className="text-white/80 font-light">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM STATEMENT ───────────────────────────────── */}
      <section className="py-32 px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="display-lg mb-8">
            "This isn't a website.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">This is your entire digital operation."</span>
          </h2>
          <p className="text-white/60 text-xl font-light mb-12 max-w-2xl leading-relaxed">
            One login. Every tool you need to dominate AI search, manage clients, publish content, and grow your business — automatically.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/#investment" className="btn-gold flex items-center gap-2">
              See The Investment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/scope" className="btn-ghost">
              View Project Scope →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

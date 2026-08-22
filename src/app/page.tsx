"use client";

import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Layout, 
  Cpu, 
  Share2, 
  CheckCircle2, 
  Home, 
  Percent, 
  Search, 
  FileSignature, 
  Hammer, 
  Check
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold font-heading tracking-tight">ClickMe</div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium">
            <a href="#vision" className="hover:text-primary transition-colors">The Vision</a>
            <a href="#ecosystem" className="hover:text-primary transition-colors">The Ecosystem</a>
            <a href="#network" className="hover:text-primary transition-colors">The Network Effect</a>
            <a href="#investment" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full transition-all">
              View Pricing
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            A Strategic Partnership Proposal
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
            Elevate Your Real Estate Brand with <span className="text-gradient">ClickMe</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
            Prepared exclusively for <strong className="text-white">Davis & Garnett</strong>. We don't just build websites; we build self-generating authority networks that dominate AEO (Answer Engine Optimization).
          </p>
          <div className="flex gap-4">
            <a href="#vision" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center gap-2 group">
              Explore the Partnership 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="relative animate-float lg:ml-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
          <div className="glass rounded-2xl p-2 border border-white/10 relative shadow-2xl">
            <div className="bg-slate-900 rounded-xl overflow-hidden border border-white/5">
              <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-slate-900/50">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                <div className="ml-4 text-xs text-slate-500 font-mono">dashboard.clickme.com / davis-garnett</div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-white">Davis & Garnett Command Center</h3>
                  <p className="text-sm text-slate-400">Live AEO Metrics</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4 border border-white/5 space-y-3">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-xs text-slate-400">Domain Authority</p>
                      <h4 className="text-2xl font-bold text-white">+42%</h4>
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/5 space-y-3">
                    <Users className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="text-xs text-slate-400">Network Partners</p>
                      <h4 className="text-2xl font-bold text-white">8 Active</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* The Vision Section */}
      <section id="vision" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Not Just a Website. <span className="text-gradient">An Engine.</span>
            </h2>
            <p className="text-lg text-slate-400">
              The days of static brochure websites are over. To win in modern real estate, your digital presence needs to work actively for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5 group">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white">AEO-Ready Foundation</h3>
              <p className="text-slate-400 leading-relaxed">
                We build a lightning-fast, highly styled website designed specifically for Answer Engine Optimization. This is the foundation everything else runs on.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5 group">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white">The Dashboard Hub</h3>
              <p className="text-slate-400 leading-relaxed">
                Manage your Network CRM, Content Pipeline, and Reputation Engine from one single, powerful command center.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5 group">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Share2 className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white">The Network Moat</h3>
              <p className="text-slate-400 leading-relaxed">
                Link your site directly with your strategic partners. As their authority grows, yours does too. A true rising tide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Ecosystem Section */}
      <section id="ecosystem" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              The ClickMe <span className="text-gradient">Ecosystem</span>
            </h2>
            <p className="text-lg text-slate-300">
              Your new website is just the beginning. It's the engine that powers our comprehensive suite of growth tools.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Network CRM", desc: "Seamless lead pipeline and contact management." },
                { title: "Content Pipeline", desc: "Self-generating, AI-powered content loops that constantly refresh." },
                { title: "Reputation Engine", desc: "Aggregate Google, Yelp, and Facebook reviews automatically." },
                { title: "Social Integrations", desc: "Push updates everywhere simultaneously." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 glass rounded-xl border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                  <div>
                    <strong className="block text-white mb-1 font-heading">{item.title}</strong>
                    <span className="text-slate-400 text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative animate-float-delayed">
             <div className="aspect-square relative rounded-3xl overflow-hidden glass p-4 border border-white/10 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
               {/* This is a placeholder for a stunning visualization */}
               <div className="w-full h-full rounded-2xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Layout className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold font-heading">ClickMe Hub</h4>
                    <p className="text-slate-400 text-sm max-w-[200px] mx-auto">Your entire business operated from one place.</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Network Effect */}
      <section id="network" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Build Your <span className="text-gradient">Inner Circle</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Join a movement. Our platform allows you to create a web of authority with your local partners, sharing SEO juice and dominating Answer Engines together.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto aspect-[4/3] md:aspect-[2/1] my-12">
            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M50% 50% L20% 20%" className="stroke-blue-500/30 stroke-2" />
              <path d="M50% 50% L80% 20%" className="stroke-blue-500/30 stroke-2" />
              <path d="M50% 50% L20% 80%" className="stroke-purple-500/30 stroke-2" />
              <path d="M50% 50% L80% 80%" className="stroke-purple-500/30 stroke-2" />
            </svg>

            {/* Nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="glass px-6 py-4 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/20 flex flex-col items-center gap-2 w-40">
                <Home className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-sm text-center">Davis & Garnett</span>
              </div>
            </div>

            <div className="absolute top-[10%] left-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <Percent className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Mortgage</span>
              </div>
            </div>
            
            <div className="absolute top-[10%] right-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <Search className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Inspector</span>
              </div>
            </div>

            <div className="absolute bottom-[10%] left-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <FileSignature className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Title Co.</span>
              </div>
            </div>

            <div className="absolute bottom-[10%] right-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <Hammer className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Contractor</span>
              </div>
            </div>
          </div>

          <div className="p-6 glass rounded-2xl border border-blue-500/20 inline-block">
            <p className="text-lg font-medium text-blue-100">
              Every new partner that joins the ClickMe ecosystem strengthens the entire network's search authority.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="investment" className="py-24 px-6 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Partnership <span className="text-gradient">Tiers</span>
            </h2>
            <p className="text-lg text-slate-400">Choose the level of growth that fits your ambition.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col">
              <h3 className="text-xl font-heading font-bold text-slate-300">Starter</h3>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-bold text-white">Custom Build</span>
                <p className="text-slate-400 text-sm mt-2">+ Monthly Platform Fee</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> New AEO-Ready Website</li>
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Core Dashboard Access</li>
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Network CRM</li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl border border-primary/50 relative flex flex-col transform md:-translate-y-4 bg-primary/5 shadow-2xl shadow-primary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Recommended
              </div>
              <h3 className="text-xl font-heading font-bold text-white">Network</h3>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-bold text-white">Accelerated</span>
                <p className="text-slate-300 text-sm mt-2">+ Monthly Platform Fee</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-white"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Everything in Starter</li>
                <li className="flex gap-3 text-white"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Strategic Partner Linking</li>
                <li className="flex gap-3 text-white"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Skool Community Access</li>
                <li className="flex gap-3 text-white"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Reputation Engine</li>
              </ul>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col">
              <h3 className="text-xl font-heading font-bold text-slate-300">Inner Circle</h3>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-bold text-white">Market Domination</span>
                <p className="text-slate-400 text-sm mt-2">+ Premium Monthly Fee</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Everything in Network</li>
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Priority AI Content Pipeline</li>
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Featured in Partner Network</li>
                <li className="flex gap-3 text-slate-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Co-marketing Campaigns</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 text-center">
             <a href="mailto:hello@clickmetostart.com" className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-white/10 group">
               Let's Build Your Engine
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center px-6">
        <div className="text-2xl font-bold font-heading mb-4 text-white/50">ClickMe</div>
        <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} ClickMe. Building the future of local authority.</p>
      </footer>
    </div>
  );
}

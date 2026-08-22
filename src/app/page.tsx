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
  Check,
  Mail,
  Phone
} from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl md:text-2xl font-bold font-heading tracking-tight text-primary uppercase">Davis & Garnett</div>
            <div className="hidden md:block h-8 w-px bg-white/20"></div>
            <div className="text-sm font-medium tracking-wide text-slate-300 hidden md:block uppercase">Commercial | Residential Advisors</div>
          </div>
          <div className="hidden lg:flex gap-8 items-center text-sm font-medium">
            <a href="#vision" className="hover:text-primary transition-colors text-slate-300">The Engine</a>
            <a href="#team" className="hover:text-primary transition-colors text-slate-300">The Team</a>
            <a href="#network" className="hover:text-primary transition-colors text-slate-300">The Network Effect</a>
            <a href="#investment" className="bg-primary hover:bg-accent text-black font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20">
              View Pricing
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary border-primary/30 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            A Strategic Partnership Proposal
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
            Local Knowledge. <br/><span className="text-gradient">Bigger Picture.</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
            Prepared exclusively for <strong className="text-white">Davis & Garnett Commercial | Residential Advisors</strong>. While others just give you an AEO (Answer Engine Optimization) score and leave you hanging, we build the self-generating authority engine that actually solves it.
          </p>
          <div className="flex gap-4">
            <a href="#vision" className="bg-primary hover:bg-accent text-black px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 group shadow-xl shadow-primary/20 uppercase tracking-wide">
              Explore the Engine
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="relative animate-float lg:ml-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-black/20 blur-3xl rounded-full"></div>
          <div className="glass rounded-2xl p-2 border border-primary/30 relative shadow-2xl overflow-hidden group">
            <Image 
              src="/davis-garnett-real-estate-advisors-cover-image.webp" 
              alt="Davis & Garnett Cover" 
              width={800} 
              height={600} 
              className="rounded-xl w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            {/* Dashboard Overlay Mockup */}
            <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl border border-white/10 flex justify-between items-center bg-black/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="text-primary w-5 h-5"/>
                 </div>
                 <div>
                   <div className="text-xs text-slate-400">AEO Authority</div>
                   <div className="font-bold text-white">Ranking Top 3</div>
                 </div>
              </div>
              <div className="flex -space-x-3">
                 <img src="/mark-davis-profile-image.webp" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
                 <img src="/rachael-garnett.webp" className="w-10 h-10 rounded-full border-2 border-black object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* The Vision Section */}
      <section id="vision" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Strategic Real Estate Guidance, <br/><span className="text-gradient">Powered by ClickMe.</span>
            </h2>
            <p className="text-lg text-slate-400">
              Whether you are locating your next business, investing, buying a home or preparing to sell across Tampa Bay — your digital presence needs to work actively for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-primary/20">
                <Layout className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white">Becoming AEO Ready</h3>
              <p className="text-slate-400 leading-relaxed">
                We build a lightning-fast, highly styled website designed specifically for Answer Engine Optimization. Stop worrying about your score—we build the engine that fixes it on autopilot.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-primary/20">
                <Cpu className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white">The Dashboard Hub</h3>
              <p className="text-slate-400 leading-relaxed">
                Manage your Network CRM, Content Pipeline, and Reputation Engine from one single, powerful command center tailored for Tampa Bay real estate.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-white/5 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-primary/20">
                <Share2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-white">The Network Moat</h3>
              <p className="text-slate-400 leading-relaxed">
                Link your site directly with your strategic partners (title companies, inspectors). As their authority grows, yours does too. A true rising tide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Personalization Section */}
      <section id="team" className="py-24 px-6 bg-neutral-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl md:text-5xl font-bold font-heading">Meet the <span className="text-gradient">Advisors</span></h2>
             <p className="text-lg text-slate-400 max-w-2xl mx-auto">
               The ClickMe engine doesn't just build the brokerage brand; it empowers the individual agents to dominate their local search presence.
             </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
             {/* Mark Davis */}
             <div className="glass p-8 rounded-3xl border border-white/5 flex gap-6 items-start">
               <Image src="/mark-davis-profile-image.webp" alt="Mark Davis" width={120} height={120} className="rounded-full border-4 border-primary/40 object-cover w-32 h-32 shrink-0"/>
               <div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-1">Mark Davis</h3>
                  <p className="text-primary font-medium mb-4 uppercase text-sm tracking-wider">Broker Associate</p>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Commercial & Residential Advisor helping businesses and investors move with confidence. ClickMe automates your content pipeline so you can focus on negotiations.
                  </p>
                  <div className="flex gap-4">
                     <a href="mailto:msdavis118@gmail.com" className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-colors"><Mail className="w-4 h-4" /></a>
                     <a href="tel:941-737-4127" className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-colors"><Phone className="w-4 h-4" /></a>
                  </div>
               </div>
             </div>

             {/* Rachael Garnett */}
             <div className="glass p-8 rounded-3xl border border-white/5 flex gap-6 items-start">
               <Image src="/rachael-garnett.webp" alt="Rachael Garnett" width={120} height={120} className="rounded-full border-4 border-primary/40 object-cover w-32 h-32 shrink-0"/>
               <div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-1">Rachael Garnett</h3>
                  <p className="text-primary font-medium mb-4 uppercase text-sm tracking-wider">Real Estate Agent</p>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Hands-on buyer and seller representation throughout Tampa Bay. The ClickMe Reputation Engine aggregates your reviews automatically to build instant trust.
                  </p>
                  <div className="flex gap-4">
                     <a href="mailto:rachaellgarnett@gmail.com" className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-colors"><Mail className="w-4 h-4" /></a>
                     <a href="tel:727-808-3344" className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-colors"><Phone className="w-4 h-4" /></a>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Visualizing the Properties */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Your Listings, <span className="text-gradient">Elevated.</span>
            </h2>
            <p className="text-lg text-slate-400">Our AEO engine ensures your commercial and residential properties show up everywhere they need to be.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-4">
               <Image src="/davis-garnett-listing-1.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-48 object-cover glass hover:scale-105 transition-transform" />
               <Image src="/davis-garnett-listings-5.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-64 object-cover glass hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-4 pt-8">
               <Image src="/davis-garnett-listings-2.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-64 object-cover glass hover:scale-105 transition-transform" />
               <Image src="/davis-garnett-listings-6.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-48 object-cover glass hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-4">
               <Image src="/davis-garnett-listing-3.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-48 object-cover glass hover:scale-105 transition-transform" />
               <Image src="/davis-garnett-listings-4.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-64 object-cover glass hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-4 pt-8">
               <Image src="/davis-garnett-listings-7.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-64 object-cover glass hover:scale-105 transition-transform" />
               <Image src="/davis-garnett-listing-2.jpg" alt="Listing" width={400} height={300} className="rounded-xl w-full h-48 object-cover glass hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Network Effect */}
      <section id="network" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Build Your <span className="text-gradient">Tampa Bay Network</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Join a movement. Our platform allows you to create a web of authority with your local partners in Tampa, Wesley Chapel, St. Pete and beyond.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto aspect-[4/3] md:aspect-[2/1] my-12">
            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M50% 50% L20% 20%" className="stroke-primary/30 stroke-2" />
              <path d="M50% 50% L80% 20%" className="stroke-primary/30 stroke-2" />
              <path d="M50% 50% L20% 80%" className="stroke-white/10 stroke-2" />
              <path d="M50% 50% L80% 80%" className="stroke-white/10 stroke-2" />
            </svg>

            {/* Nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="glass px-8 py-5 rounded-2xl border border-primary/50 shadow-xl shadow-primary/20 flex flex-col items-center gap-3 w-56 bg-black">
                <span className="font-bold text-lg text-primary text-center font-heading uppercase tracking-wide">Davis & Garnett</span>
              </div>
            </div>

            <div className="absolute top-[10%] left-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2 bg-black/80">
                <Percent className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Mortgage</span>
              </div>
            </div>
            
            <div className="absolute top-[10%] right-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2 bg-black/80">
                <Search className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Inspector</span>
              </div>
            </div>

            <div className="absolute bottom-[10%] left-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2 bg-black/80">
                <FileSignature className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Title Co.</span>
              </div>
            </div>

            <div className="absolute bottom-[10%] right-[10%] z-10">
              <div className="glass px-4 py-3 rounded-xl border border-white/5 flex flex-col items-center gap-2 bg-black/80">
                <Hammer className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-medium text-slate-300">Contractor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="investment" className="py-24 px-6 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Partnership <span className="text-gradient">Investment</span>
            </h2>
            <p className="text-lg text-slate-400">Choose the level of growth that fits your ambition.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Tier */}
            <div className="glass p-10 rounded-3xl border border-white/10 flex flex-col hover:border-primary/30 transition-colors">
              <h3 className="text-2xl font-heading font-bold text-white">Standard Platform</h3>
              <p className="text-slate-400 text-sm mt-2">The complete AEO real estate engine.</p>
              <div className="mt-8 mb-10">
                <span className="text-5xl font-bold text-white">$499</span>
                <span className="text-slate-400"> / month</span>
                <p className="text-sm text-primary mt-3 uppercase tracking-wider font-bold">$0 Setup Fee</p>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex gap-4 text-slate-300 items-center"><Check className="w-5 h-5 text-primary shrink-0" /> Custom AEO-Ready Website Build</li>
                <li className="flex gap-4 text-slate-300 items-center"><Check className="w-5 h-5 text-primary shrink-0" /> Core Dashboard & Network CRM</li>
                <li className="flex gap-4 text-slate-300 items-center"><Check className="w-5 h-5 text-primary shrink-0" /> Automated Content Pipeline</li>
                <li className="flex gap-4 text-slate-300 items-center"><Check className="w-5 h-5 text-primary shrink-0" /> Reputation Engine</li>
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-white/20 hover:border-primary hover:text-primary transition-all font-bold tracking-wide uppercase text-sm">Select Standard</button>
            </div>

            {/* Custom Offer Tier */}
            <div className="glass p-10 rounded-3xl border border-primary/50 relative flex flex-col transform md:-translate-y-4 bg-primary/5 shadow-2xl shadow-primary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-black text-xs font-bold px-6 py-2 rounded-full uppercase tracking-wider whitespace-nowrap shadow-lg">
                Rachael's Special Offer
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">Lifetime Access</h3>
              <p className="text-slate-300 text-sm mt-2">You keep the build, forever.</p>
              <div className="mt-8 mb-10">
                <span className="text-5xl font-bold text-primary">$2,500</span>
                <span className="text-slate-400"> one-time</span>
                <p className="text-sm text-white mt-3 uppercase tracking-wider font-bold bg-white/10 inline-block px-3 py-1 rounded">$0 Monthly Platform Fee</p>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex gap-4 text-white items-center"><Check className="w-5 h-5 text-primary shrink-0" /> You Own the Website Forever</li>
                <li className="flex gap-4 text-white items-center"><Check className="w-5 h-5 text-primary shrink-0" /> Lifetime Dashboard Access</li>
                <li className="flex gap-4 text-white items-center"><Check className="w-5 h-5 text-primary shrink-0" /> All Platform Features Included</li>
                <li className="flex gap-4 text-white items-center"><Check className="w-5 h-5 text-primary shrink-0" /> Priority Support</li>
              </ul>
              <button className="w-full py-4 rounded-xl bg-primary hover:bg-accent text-black transition-colors font-bold shadow-lg shadow-primary/20 uppercase tracking-wide text-sm">Claim Special Offer</button>
            </div>
          </div>
          
          <div className="mt-20 text-center">
             <a href="mailto:msdavis118@gmail.com" className="inline-flex items-center gap-3 bg-primary text-black hover:bg-accent px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-primary/20 group uppercase tracking-wide">
               Let's Build Your Engine
               <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
             </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center px-6 bg-black">
        <div className="text-xl md:text-2xl font-bold font-heading tracking-widest text-primary/50 uppercase mb-4">Davis & Garnett</div>
        <p className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} ClickMe. Building the future of local authority.</p>
      </footer>
    </div>
  );
}

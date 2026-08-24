import { ArrowRight, Building, MapPin, Briefcase, BarChart, LandPlot, Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mark Davis | Real Estate Advisor | Tampa Bay",
  description: "Mark Davis is a full-service real estate advisor at Align Right Realty Carrollwood, serving commercial and residential clients across Tampa Bay with deep investment, leasing, and residential expertise.",
  openGraph: {
    images: ["/mark-davis-headshot.png"],
  },
};

export default function DavisPage() {
  return (
    <div className="min-h-screen text-white relative selection:bg-[#D4AF37] selection:text-black font-sans">

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl font-bold tracking-tight text-white drop-shadow-md">
              Davis & Garnett
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className="label-caps text-white/60 hover:text-white transition-colors">
              ← Back to Main Page
            </Link>
            <Link href="/garnett" className="label-caps text-white/60 hover:text-white transition-colors">
              Meet Rachael →
            </Link>
            <Link href="/scope" className="label-caps text-white/60 hover:text-white transition-colors">
              Project Scope
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <header className="relative pt-40 pb-20 px-8 border-b border-white/5">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <Image
              src="/mark-davis-headshot.png"
              alt="Mark Davis"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-3 mb-6 bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[inset_0_1px_0_rgba(212,175,55,0.2)]">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Real Estate Advisor — Tampa Bay</span>
            </div>
            <h1 className="font-serif text-6xl lg:text-7xl font-bold text-white mb-4">Mark Davis</h1>
            <p className="text-2xl text-white/70 font-light mb-6">Real Estate Advisor — Commercial & Residential</p>
            <ul className="flex flex-col gap-2 text-white/50 text-sm">
              <li>Align Right Realty Carrollwood</li>
              <li>Tampa Bay, FL</li>
              <li><a href="mailto:msdavis118@gmail.com" className="hover:text-white transition-colors">msdavis118@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </header>

      {/* ── ABOUT MARK ───────────────────────────────────── */}
      <section className="py-24 px-8 relative">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <h2 className="display-md sticky top-32">
              The Advisor Tampa Bay<br />
              Business Owners &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Homeowners Trust.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-8 text-white/70 text-lg leading-relaxed font-light">
            <p>
              Mark Davis is a full-service real estate advisor serving both commercial and residential clients across Tampa Bay. Whether it's an industrial facility in Brandon, a retail lease in Wesley Chapel, a multi-family investment acquisition, or a residential sale — Mark brings the same depth of market knowledge and transactional precision to every deal.
            </p>
            <p>
              His commercial background gives residential clients a distinct edge. When a homeowner also owns investment properties, or a business owner needs to secure both a commercial lease and a home in the same market, Mark handles it all in one place — with no handoffs, no silos, and no gaps.
            </p>
            <p>
              Mark's digital presence is engineered so that when someone asks ChatGPT or Perplexity about commercial real estate advisors in Tampa Bay, his name and his expertise are already the answer. His content engine leans heavily into commercial market intelligence — not because that's all he does, but because it's the lane that differentiates him from Rachael and avoids redundancy in their combined content strategy.
            </p>
            <p>
              As one half of Davis & Garnett, Mark's commercial depth pairs with Rachael Garnett's residential expertise to give their team an authority footprint that no single agent — operating in one lane — can compete with.
            </p>
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ──────────────────────────────────── */}
      <section className="py-24 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="font-serif text-4xl text-white mb-16 text-center">Mark's Areas of Expertise</h3>
          <p className="text-white/50 text-center max-w-2xl mx-auto -mt-10 mb-16 font-light text-sm">Mark serves both commercial and residential clients. His content engine focuses primarily on commercial and investment to differentiate from Rachael's residential-led output.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Building className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Commercial Leasing</h4>
              <p className="text-white/60 text-sm leading-relaxed">Office, retail, and industrial lease negotiations across Tampa Bay's most active commercial corridors.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Briefcase className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Investment Properties</h4>
              <p className="text-white/60 text-sm leading-relaxed">Multi-family, commercial, and mixed-use investment acquisitions for individual and institutional buyers.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Industrial & Warehouse</h4>
              <p className="text-white/60 text-sm leading-relaxed">Distribution centers, flex space, and industrial facilities throughout the greater Tampa Bay region.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Map className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Business Relocations</h4>
              <p className="text-white/60 text-sm leading-relaxed">Full-service advisory for businesses expanding into or relocating within Tampa Bay — from site selection to lease execution.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <LandPlot className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Land Acquisition</h4>
              <p className="text-white/60 text-sm leading-relaxed">Identifying and securing commercial land parcels for development, expansion, or investment.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <BarChart className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Market Analysis</h4>
              <p className="text-white/60 text-sm leading-relaxed">Deep-dive commercial market intelligence for buyers, sellers, tenants, and investors making critical decisions.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARKET AUTHORITY ─────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="font-serif text-4xl text-white mb-8">Mark's Territory.</h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 font-light">
            Mark serves commercial and residential clients across the full Tampa Bay market — with particular depth in:
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16">
            {["Tampa", "Wesley Chapel", "Land O' Lakes", "Lutz", "Brandon", "Riverview", "Plant City", "Lakeland", "St. Petersburg", "Clearwater", "New Port Richey", "Odessa", "Palm Harbor", "Sarasota", "Bradenton"].map(loc => (
              <span key={loc} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm backdrop-blur-sm">
                {loc}
              </span>
            ))}
          </div>
          <div className="max-w-3xl mx-auto glass-card p-8 border-l-4 border-l-[#D4AF37]">
            <p className="text-xl text-white font-serif italic">
              "When AI engines are asked about commercial real estate in these markets — this page is part of why Mark's name is already in the answer."
            </p>
          </div>
        </div>
      </section>

      {/* ── AEO AUTHORITY ────────────────────────────────── */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#D4AF37]/5 to-black pointer-events-none" />
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h3 className="font-serif text-5xl text-white mb-8 leading-tight">
              Always Found.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">By Every Engine That Matters.</span>
            </h3>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-6">
              Mark's entire digital presence is built on the ClickMe Active Content Engine™ — the platform that continuously expands his authority across every AI search engine simultaneously.
            </p>
            <p className="text-white/70 text-lg font-light leading-relaxed">
              While competitors wait for Google to notice them, Mark's content is being read, trusted, and cited by ChatGPT, Perplexity, Gemini, Claude, and every AI engine your next client is already using. Not because of luck. Because of architecture.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="glass-card p-6 flex items-center justify-between">
              <span className="font-medium text-white">AEO Ready</span>
              <span className="text-white/50 text-sm">Every page structured for AI answer engines</span>
            </div>
            <div className="glass-card p-6 flex items-center justify-between">
              <span className="font-medium text-white">GEO Ready</span>
              <span className="text-white/50 text-sm">Generative engine optimization built in</span>
            </div>
            <div className="glass-card p-6 flex items-center justify-between bg-[#D4AF37]/10 border-[#D4AF37]/30">
              <span className="font-bold text-[#D4AF37]">Always On</span>
              <span className="text-[#D4AF37]/80 text-sm">Content engine runs 24/7/365</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h3 className="font-serif text-4xl text-white mb-6">Ready to make a move?</h3>
          <p className="text-white/60 text-lg mb-10 font-light max-w-xl">
            Whether you need commercial space, an investment property, or residential guidance anywhere in Tampa Bay — Mark brings the full picture to every client conversation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:msdavis118@gmail.com" className="btn-gold flex items-center gap-2">
              Email Mark Directly <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/garnett" className="btn-ghost">
              Meet Rachael Garnett →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

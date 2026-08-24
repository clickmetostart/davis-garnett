import { ArrowRight, Home, MapPin, Search, Star, Map, Users, BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rachael Garnett | Real Estate Advisor | Tampa Bay",
  description: "Rachael Garnett is a full-service real estate advisor at Align Right Realty Carrollwood, serving residential and commercial clients across Tampa Bay with deep local market expertise.",
  openGraph: {
    images: ["/rachael-garnett-headshot.png"],
  },
};

export default function GarnettPage() {
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
            <Link href="/davis" className="label-caps text-white/60 hover:text-white transition-colors">
              Meet Mark →
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
              src="/rachael-garnett-headshot.png"
              alt="Rachael Garnett"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-3 mb-6 bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[inset_0_1px_0_rgba(212,175,55,0.2)]">
              <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Real Estate Advisor — Tampa Bay</span>
            </div>
            <h1 className="font-serif text-6xl lg:text-7xl font-bold text-white mb-4">Rachael Garnett</h1>
            <p className="text-2xl text-white/70 font-light mb-6">Real Estate Advisor — Residential & Commercial</p>
            <ul className="flex flex-col gap-2 text-white/50 text-sm">
              <li>Align Right Realty Carrollwood</li>
              <li>Tampa Bay, FL</li>
              <li><a href="mailto:rachaellgarnett@gmail.com" className="hover:text-white transition-colors">rachaellgarnett@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </header>

      {/* ── ABOUT RACHAEL ────────────────────────────────── */}
      <section className="py-24 px-8 relative">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <h2 className="display-md sticky top-32">
              The Advisor Who Knows<br />
              Tampa Bay Like<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">It's Home.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-8 text-white/70 text-lg leading-relaxed font-light">
            <p>
              Rachael Garnett is a full-service real estate advisor serving both residential and commercial clients across Tampa Bay. From first-time buyers and luxury home sellers to investors and business owners looking for the right space — Rachael brings the same care, market expertise, and unwavering advocacy to every client relationship.
            </p>
            <p>
              Her residential depth is her signature strength. Rachael has an instinctive ability to match clients with the right home in the right neighborhood at the right time — and her familiarity with Tampa Bay communities, school districts, and lifestyle dynamics means she's not just selling houses. She's placing people into the right chapter of their lives.
            </p>
            <p>
              Rachael's content engine leans heavily into residential neighborhood guides, buyer education, and lifestyle content — not because that's the only space she works in, but because it differentiates her output from Mark's and builds a broader, non-overlapping authority footprint for Davis & Garnett as a team.
            </p>
            <p>
              As one half of Davis & Garnett, Rachael's residential expertise pairs with Mark Davis's commercial depth to give their clients a single point of contact for every real estate need in Tampa Bay — a combined authority no individual agent can replicate.
            </p>
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ──────────────────────────────────── */}
      <section className="py-24 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="font-serif text-4xl text-white mb-16 text-center">Rachael's Areas of Expertise</h3>
          <p className="text-white/50 text-center max-w-2xl mx-auto -mt-10 mb-16 font-light text-sm">Rachael serves both residential and commercial clients. Her content engine focuses primarily on residential neighborhoods and lifestyle to differentiate from Mark's commercial-led output.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Home className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Buyer Representation</h4>
              <p className="text-white/60 text-sm leading-relaxed">Guiding first-time buyers and experienced purchasers through every step of finding and securing their ideal Tampa Bay home.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <BarChart className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Seller Strategy</h4>
              <p className="text-white/60 text-sm leading-relaxed">Positioning homes to sell quickly and at maximum value — pricing strategy, presentation, marketing, and negotiation.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Relocation Specialist</h4>
              <p className="text-white/60 text-sm leading-relaxed">Full-service relocation guidance for families and individuals moving to Tampa Bay — neighborhoods, schools, commutes, and lifestyle matched to each client.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Luxury Residential</h4>
              <p className="text-white/60 text-sm leading-relaxed">High-end residential transactions across Tampa Bay's most prestigious communities — handled with the discretion and expertise luxury buyers and sellers expect.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Map className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">Neighborhood Expertise</h4>
              <p className="text-white/60 text-sm leading-relaxed">Unmatched depth across Tampa Bay's most sought-after residential communities — from Lutz and Land O' Lakes to South Tampa and St. Pete.</p>
            </div>

            <div className="glass-card p-8 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif text-xl text-white">First-Time Buyers</h4>
              <p className="text-white/60 text-sm leading-relaxed">Patient, thorough guidance for first-time buyers — demystifying the process and advocating fiercely for their best interests from offer to close.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARKET AUTHORITY ─────────────────────────────── */}
      <section className="py-24 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <h3 className="font-serif text-4xl text-white mb-8">Rachael's Territory.</h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 font-light">
            Rachael serves residential and commercial clients across the full Tampa Bay market — with particular expertise in:
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16">
            {["Tampa", "Lutz", "Land O' Lakes", "Wesley Chapel", "New Tampa", "Carrollwood", "Odessa", "Palm Harbor", "St. Petersburg", "Clearwater", "Dunedin", "Safety Harbor", "Brandon", "Riverview", "Seminole", "South Tampa", "Westchase", "Citrus Park", "Valrico", "Lithia"].map(loc => (
              <span key={loc} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm backdrop-blur-sm">
                {loc}
              </span>
            ))}
          </div>
          <div className="max-w-3xl mx-auto glass-card p-8 border-l-4 border-l-[#D4AF37]">
            <p className="text-xl text-white font-serif italic">
              "When AI engines are asked about residential real estate in these communities — this page is part of why Rachael's name is already in the answer."
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">By Every Client Who's Looking.</span>
            </h3>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-6">
              Rachael's entire digital presence runs on the ClickMe Active Content Engine™ — continuously building her authority across every AI search platform that your next client is already using.
            </p>
            <p className="text-white/70 text-lg font-light leading-relaxed">
              ChatGPT. Perplexity. Gemini. Claude. Copilot. Siri. Every engine that pulls directly from the web. Every query about Tampa Bay residential real estate. Rachael's content is there — structured, authoritative, and impossible to ignore.
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
          <h3 className="font-serif text-4xl text-white mb-6">Ready to find your place in Tampa Bay?</h3>
          <p className="text-white/60 text-lg mb-10 font-light max-w-xl">
            Whether you're buying a home, selling a property, relocating, or exploring investment opportunities — Rachael brings the full picture to every client conversation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:rachaellgarnett@gmail.com" className="btn-gold flex items-center gap-2">
              Email Rachael Directly <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/davis" className="btn-ghost">
              Meet Mark Davis →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  Compass,
  Award,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  FileCheck2,
  Globe,
  Scale,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import SiteFooter from "@/components/SiteFooter";

export default function AlignRightRealtyCarrollwoodPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "Carrollwood Office Meeting / Consultation",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          source: "Align Right Realty Carrollwood Spoke (/about/align-right-realty-carrollwood)",
          pipelineStage: "Brokerage / Office Inquiry",
          notes: `[Align Right Carrollwood #BK3401606 — ${formData.topic}] ${formData.notes}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── BREADCRUMB BAR ───────────────────────────────────────────────── */}
      <div className="pt-28 pb-4 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[#9A7D3A] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to About The Davis &amp; Garnett Team
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">
            <Link href="/about/mark-davis" className="hover:text-[#9A7D3A]">
              Mark Davis (#3209459)
            </Link>
            <span>|</span>
            <Link href="/about/rachael-garnett" className="hover:text-[#9A7D3A]">
              Rachael Garnett (#3378601)
            </Link>
            <span>|</span>
            <Link href="/about/strategic-partners" className="hover:text-[#9A7D3A]">
              Strategic Partners
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <header className="py-20 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#f5f3ef] border border-[#C8A951]/40 text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] mb-6">
              Brokerage of Record • FL License #BK3401606
            </span>
            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] mb-6">
              Align Right Realty <span className="text-[#9A7D3A]">Carrollwood.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#111111]/75 font-light leading-relaxed mb-6">
              Behind every Davis & Garnett commercial acquisition, multi-acre land disposition, and luxury waterfront closing stands the regulatory rigor, technology stack, and statewide reach of{" "}
              <strong className="font-semibold text-[#111111]">
                Align Right Realty Carrollwood (License #BK3401606)
              </strong>
              .
            </p>
            <p className="text-base text-[#111111]/65 font-light leading-relaxed mb-8">
              Mark Davis (#3209459) and Rachael Garnett (#3378601) intentionally partner with Align Right Realty Carrollwood because modern real estate requires both boutique principal attention and institutional brokerage infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#office-consultation"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Schedule Carrollwood Office Conference
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/align-right-carrollwood-coverage"
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#ef5728] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#111111] transition-colors rounded-lg shadow-md"
              >
                Areas We Work In &amp; Coverage <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] transition-colors rounded-lg"
              >
                About The Davis &amp; Garnett Team
              </Link>
            </div>
          </div>

          <div className="bg-[#111111] text-white p-10 md:p-12 rounded-2xl border border-[#ef5728]/40 shadow-2xl relative overflow-hidden">
            <a
              href="https://alignrightcarrollwood.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-56 h-20 mb-8 block hover:opacity-85 transition-opacity"
            >
              <Image
                src="/align-right-email-logo.png"
                alt="Align Right Realty Carrollwood Logo"
                fill
                className="object-contain object-left"
              />
            </a>
            <div className="space-y-5 border-t border-white/15 pt-6 text-sm">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#ef5728] font-bold block mb-1">
                  Registered Florida Brokerage
                </span>
                <p className="font-aiveritas text-2xl text-[#ef5728]">
                  Align Right Realty Carrollwood
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block">
                    Broker Number
                  </span>
                  <span className="font-bold text-[#ef5728]">BK3401606</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block">
                    Office Line
                  </span>
                  <span className="font-bold text-white">(813) 374-6050</span>
                </div>
              </div>
              <div className="text-xs text-white/70">
                3903 Northdale Blvd Suite 115W, TAMPA, FL 33624<br />
                officeadmin@alignrightcarrollwood.com
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-white/70 space-y-2">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A951]" />
                  Mark Davis — Commercial &amp; Residential Advisor (#3209459)
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A951]" />
                  Rachael Garnett — Commercial &amp; Residential Advisor (#3378601)
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── WHY MARK & RACHAEL PARTNER WITH ALIGN RIGHT CARROLLWOOD ──────── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              The Institutional Advantage
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              Why Davis & Garnett Partners With Align Right Realty Carrollwood
            </h2>
            <p className="text-base text-[#111111]/65 font-light">
              Six core operational pillars that elevate every client transaction from initial underwriting to final settlement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "FREC & Fiduciary Compliance Excellence",
                desc: "Every commercial LOI, FAR/BAR contract, addendum, and escrow deposit is backed by rigorous broker-level compliance review under Florida License #BK3401606.",
              },
              {
                icon: Globe,
                title: "Statewide MLS & Commercial Syndication",
                desc: "Immediate syndication across Stellar MLS, national commercial portals, international luxury buyer feeds, and Align Right Realty's statewide Florida referral network.",
              },
              {
                icon: Scale,
                title: "Dual-Asset Transaction Support",
                desc: "Unlike residential-only boutique firms or rigid commercial-only houses, Align Right Carrollwood supports both complex commercial/land deals and luxury residential estates.",
              },
              {
                icon: FileCheck2,
                title: "Encrypted Digital Closing Rooms",
                desc: "End-to-end digital transaction management, wire-fraud prevention protocols, and verified title/escrow coordination for domestic and international principals.",
              },
              {
                icon: Compass,
                title: "Pre-Market Collaborative Intelligence",
                desc: "Direct collaboration across hundreds of Tampa Bay agents gives Davis & Garnett buyers early visibility into coming-soon listings and off-market opportunities.",
              },
              {
                icon: Award,
                title: "Client-First Advisory Freedom",
                desc: "Align Right's entrepreneurial structure empowers Mark and Rachael to invest heavily in custom architectural photography, drone mapping, and AI-driven AEO/GEO marketing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 rounded-2xl border border-[#111111]/8 hover:border-[#C8A951] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center mb-6">
                  <item.icon className="w-5 h-5 text-[#9A7D3A]" />
                </div>
                <h3 className="font-aiveritas text-2xl text-[#111111] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALIGN RIGHT CARROLLWOOD: AREAS SERVED & REGIONAL COVERAGE ─────── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#111111] text-white rounded-3xl p-8 md:p-14 border border-[#ef5728]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ef5728] via-[#D4AF37] to-[#ef5728]" />
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded bg-[#ef5728]/20 border border-[#ef5728]/50 text-[10px] uppercase tracking-[0.22em] text-[#ef5728] font-bold">
                    ALIGNED CORRECTLY REAL ESTATE • FL License #BK3401606
                  </span>
                </div>
                <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-4 leading-tight">
                  Align Right Carrollwood: Areas We Work In
                </h2>
                <p className="text-white/80 text-base font-light max-w-2xl leading-relaxed mb-6">
                  Our footprint spans the most lucrative residential waterfronts, suburban growth corridors, and commercial investment zones across Greater Tampa Bay and Central Florida.
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-white/70 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ef5728]" />
                    <span>Carrollwood (Brokerage HQ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Downtown Tampa &amp; Bayshore</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>St. Pete Downtown &amp; Beaches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Clearwater &amp; Pinellas Coast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Wesley Chapel (Two Rivers)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Land O&apos; Lakes (Angeline)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Brandon &amp; Central FL Land</span>
                  </div>
                </div>
                <Link
                  href="/align-right-carrollwood-coverage"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#ef5728] hover:bg-[#D4AF37] text-white hover:text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-colors shadow-lg"
                >
                  Explore Complete Carrollwood Coverage Area <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-4 relative flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/15">
                  <Image
                    src="/new-images/new-2/davis-garnett-align-right-realty.jpg"
                    alt="Align Right Realty Carrollwood"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-aiveritas text-2xl text-white block mb-1">
                  5 Key Counties
                </span>
                <p className="text-xs text-white/60 mb-4">
                  Governed under Align Right Realty Carrollwood&apos;s broker-level infrastructure and regulatory oversight.
                </p>
                <Link
                  href="/align-right-carrollwood-coverage"
                  className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  View Interactive Maps &amp; Corridors →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICE LOCATION & COVERAGE DETAILS ───────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Tampa Bay Headquarters
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-6">
              Strategically Positioned in Carrollwood & Greater Tampa
            </h2>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed mb-6">
              Located in the heart of Carrollwood with immediate access to Dale Mabry Highway, I-275, the Veterans Expressway, and Tampa International Airport, our brokerage headquarters serves as a central war room for clients across Hillsborough, Pinellas, Pasco, Polk, and Marion counties.
            </p>
            <div className="mb-8">
              <Link
                href="/align-right-carrollwood-coverage"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ef5728] hover:text-[#9A7D3A] transition-colors"
              >
                View full regional coverage directory &amp; focus corridors →
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8 flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#ef5728] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    Align Right Realty Carrollwood • Broker Number BK3401606
                  </h4>
                  <p className="text-xs text-[#111111]/65 mt-1">
                    3903 Northdale Blvd Suite 115W, TAMPA, FL 33624 • Office: (813) 374-6050 • officeadmin@alignrightcarrollwood.com
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    Direct Principal Advisory Lines
                  </h4>
                  <p className="text-xs text-[#111111]/65 mt-1">
                    Mark Davis (#3209459): 941-737-4127 • Rachael Garnett (#3378601): 727-808-3344
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8 flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    Electronic Contract &amp; Escrow Desk
                  </h4>
                  <p className="text-xs text-[#111111]/65 mt-1">
                    list@davisgarnettsells.com • mark@davisgarnettsells.com • rachael@davisgarnettsells.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="office-consultation" className="bg-[#fbfbf9] p-8 md:p-12 rounded-2xl border border-[#111111]/10 shadow-lg">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Book an In-Person or Virtual Briefing
            </span>
            <h3 className="font-aiveritas text-3xl text-[#111111] mb-4">
              Meet Us at Align Right Carrollwood
            </h3>
            <p className="text-xs text-[#111111]/65 mb-6 leading-relaxed">
              Reserve a private conference session with Mark Davis and Rachael Garnett to review commercial pro-formas, land surveys, or residential relocation maps.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-white border border-[#C8A951] text-center">
                <CheckCircle2 className="w-10 h-10 text-[#9A7D3A] mx-auto mb-3" />
                <h4 className="font-aiveritas text-xl text-[#111111] mb-2">
                  Conference Request Confirmed
                </h4>
                <p className="text-xs text-[#111111]/70">
                  We have received your request and will coordinate conference details shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#111111]/15 text-sm"
                >
                  <option>Carrollwood Office Meeting / Consultation</option>
                  <option>Commercial & Land Portfolio Review</option>
                  <option>Luxury Residential & Relocation Briefing</option>
                  <option>Brokerage Compliance / Escrow Verification</option>
                </select>
                <textarea
                  rows={3}
                  placeholder="Preferred dates/times or transaction details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#111111]/15 text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
                >
                  {submitting ? "Submitting..." : "Request Office Briefing"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  Building2,
  Scale,
  ShieldCheck,
  Compass,
  Sparkles,
  CheckCircle2,
  Handshake,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

const PARTNER_CATEGORIES = [
  {
    id: "jumbo-lending",
    icon: Landmark,
    category: "01 · Preferred Residential & Jumbo Lending",
    summary:
      "Private wealth mortgage bankers and portfolio lenders delivering high-speed underwriting, physician/executive loan programs, and bridge solutions.",
    partners: [
      {
        firm: "Bayshore Private Wealth & Jumbo Mortgage Group",
        specialty: "Portfolio Jumbo Loans, Physician Relocation & Cross-Collateralization",
        coverage: "St. Petersburg, South Tampa, Carrollwood & Pinellas Waterfront",
        highlight: "14-day jumbo clear-to-close capability with dedicated private client underwriting.",
      },
      {
        firm: "Gulf Coast Premier Residential Lending",
        specialty: "Conventional, VA Luxury, Construction-to-Permanent & Relocation Financing",
        coverage: "Lutz, Land O' Lakes, Wesley Chapel & Greater Tampa Bay",
        highlight: "Upfront fully underwritten pre-approval letters that compete with cash offers.",
      },
    ],
  },
  {
    id: "commercial-sba",
    icon: Building2,
    category: "02 · Commercial & SBA Financing",
    summary:
      "Regional commercial banking directors and debt placement specialists structuring SBA 504/7(a), DSCR investment, and agricultural/land acquisition loans.",
    partners: [
      {
        firm: "Sunbelt Commercial Capital & SBA Advisory",
        specialty: "SBA 504 / 7(a) Owner-User Commercial & Mixed-Use Acquisition Debt",
        coverage: "Brandon, Tampa, Lakeland, I-4 & I-75 Commercial Corridors",
        highlight: "Up to 90% LTV financing for business owners acquiring mixed-use or industrial facilities.",
      },
      {
        firm: "Central Florida Land & Ag Credit Partners",
        specialty: "Acreage, Citrus/Timber Land Banking & Horizontal Development Loans",
        coverage: "Polk, Marion, Pasco & Eastern Hillsborough Counties",
        highlight: "Specialized underwriting for 20 to 500+ acre tracts and transitional development parcels.",
      },
    ],
  },
  {
    id: "title-escrow",
    icon: Scale,
    category: "03 · Real Estate Title & Escrow Counsel",
    summary:
      "Board-certified Florida real estate attorneys and 1031 Qualified Intermediaries safeguarding title commitments, complex easements, and tax-deferred exchanges.",
    partners: [
      {
        firm: "Tampa Bay Fiduciary Title & Real Estate Law Group",
        specialty: "Commercial Closing Counsel, Sovereign Submerged Lands & Luxury Waterfront Title",
        coverage: "Statewide Florida • Hillsborough & Pinellas Offices",
        highlight: "Attorney-reviewed title commitments, riparian rights verification, and remote executive closings.",
      },
      {
        firm: "Southeast 1031 Exchange & Escrow Intermediaries",
        specialty: "IRC Section 1031 Forward, Reverse & Improvement Exchanges",
        coverage: "Florida & National Investment Portfolios",
        highlight: "Segregated qualified escrow accounts and strict 45/180-day compliance coordination.",
      },
    ],
  },
  {
    id: "inspectors",
    icon: ShieldCheck,
    category: "04 · Certified Home & Seawall Inspectors",
    summary:
      "Licensed structural engineers, marine seawall/dock specialists, and commercial building Envelope inspectors protecting your capital during due diligence.",
    partners: [
      {
        firm: "Pinellas & Bay Marine Seawall / Dock Engineering",
        specialty: "Seawall Cap & Tie-Back Audits, Hydrographic Depth Checks & Boat Lift Inspections",
        coverage: "St. Petersburg, Bahama Shores, Davis Islands & Coastal Pinellas",
        highlight: "Essential marine due diligence for $2M–$10M+ open-bay and canal-front estates.",
      },
      {
        firm: "Apex Commercial & Luxury Property Inspections",
        specialty: "Commercial Roof/HVAC Audits, Thermal Imaging, 4-Point & Wind Mitigation",
        coverage: "Hillsborough, Pinellas, Pasco & Polk Counties",
        highlight: "Same-day digital inspection dossiers with insurance-ready documentation.",
      },
    ],
  },
  {
    id: "engineering-surveying",
    icon: Compass,
    category: "05 · Civil Engineering & Land Surveying",
    summary:
      "ALTA/NSPS land surveyors, Phase I environmental assessors, and wetland delineation biologists supporting Mark Davis's commercial and land clientele.",
    partners: [
      {
        firm: "Meridian Florida ALTA Surveying & Geomatics",
        specialty: "ALTA/NSPS Commercial Surveys, Topographic Mapping & FEMA Elevation Certificates",
        coverage: "Tampa Bay, Frostproof / Polk County & Fort McCoy / Marion County",
        highlight: "Rapid boundary and acreage verification for large-scale agricultural and commercial closings.",
      },
      {
        firm: "Watershed Civil & Environmental Consultants",
        specialty: "Phase I/II ESA, Wetland Delineation, FLU Amendments & Concurrency Studies",
        coverage: "SWFWMD (Southwest Florida Water Management District) Territory",
        highlight: "Pre-acquisition feasibility studies that de-risk raw land and commercial infill sites.",
      },
    ],
  },
  {
    id: "staging-design",
    icon: Sparkles,
    category: "06 · Architectural Staging & Interior Design",
    summary:
      "Editorial home stagers, luxury furniture curators, and pre-market renovation concierges who help Rachael Garnett's listings command record prices.",
    partners: [
      {
        firm: "Atelier Tampa Bay Luxury Staging & Design",
        specialty: "Vacant Waterfront Estate Staging, Art Curation & Bespoke Interior Styling",
        coverage: "St. Petersburg, South Tampa, Carrollwood & Avila",
        highlight: "Custom furniture installations tailored to coastal modern and Mediterranean estates.",
      },
      {
        firm: "White-Glove Pre-List Renovation & Concierge",
        specialty: "Turnkey Lighting, Paint, Landscaping & Architectural Photography Prep",
        coverage: "Greater Tampa Bay",
        highlight: "Coordinated 10-day pre-market refresh plans that maximize seller net proceeds.",
      },
    ],
  },
];

export default function StrategicPartnersPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyOrProperty: "",
    requestMode: "Request a Vetted Vendor Introduction",
    category: "Preferred Residential & Jumbo Lending",
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
          source: "Strategic Partners Spoke (/about/strategic-partners)",
          pipelineStage: "Partner / Vendor Desk",
          notes: `[${formData.requestMode} | Category: ${formData.category} | Org/Prop: ${formData.companyOrProperty}] ${formData.notes}`,
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
            <ArrowLeft className="w-3.5 h-3.5" /> Back to About Collective Hub
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
            <Link href="/about/community-outreach-giving" className="hover:text-[#9A7D3A]">
              Community Giving
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <header className="py-20 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#f5f3ef] border border-[#C8A951]/40 text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] mb-6">
              The Davis & Garnett Deal Execution Network
            </span>
            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] mb-6">
              Meet Our <span className="text-[#9A7D3A]">Strategic Partners.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#111111]/75 font-light leading-relaxed mb-6">
              An elite real estate advisor is only as strong as the lenders, title attorneys, engineers, inspectors, and stagers standing behind the contract.
            </p>
            <p className="text-base text-[#111111]/65 font-light leading-relaxed mb-8">
              Mark Davis and Rachael Garnett maintain a strictly vetted bench of Tampa Bay&apos;s premier transaction specialists across 6 mission-critical categories. Every partner listed below has been battle-tested for responsiveness, fiduciary integrity, and execution speed.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#partner-form"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Request a Vendor Introduction
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#partner-form"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    requestMode: "Apply to Become a Vetted Strategic Partner",
                  }))
                }
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] transition-colors rounded-lg"
              >
                Become a Strategic Partner
              </a>
            </div>
          </div>

          <div className="bg-[#111111] text-white p-10 md:p-12 rounded-2xl border border-[#C8A951]/30">
            <Handshake className="w-10 h-10 text-[#C8A951] mb-6" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A951] font-bold block mb-2">
              Our Vetting Standard
            </span>
            <h3 className="font-aiveritas text-3xl text-white mb-4">
              Zero Kickbacks. 100% Merit-Based Introductions.
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
              Davis & Garnett never accepts referral fees from lenders, inspectors, engineers, or contractors. A partner stays on our roster for one reason only: they protect our clients&apos; timelines and deliver institutional-grade work.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/15 text-xs">
              <div>
                <span className="text-[#C8A951] font-bold block uppercase tracking-widest mb-1">
                  6 Core Categories
                </span>
                <span className="text-white/75">Commercial & Residential Coverage</span>
              </div>
              <div>
                <span className="text-[#C8A951] font-bold block uppercase tracking-widest mb-1">
                  Direct Warm Handoff
                </span>
                <span className="text-white/75">Coordinated by Mark & Rachael</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 6 CURATED PARTNER CATEGORIES ─────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto space-y-16">
          {PARTNER_CATEGORIES.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl p-8 md:p-12 border border-[#111111]/10 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-[#111111]/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center shrink-0">
                    <group.icon className="w-6 h-6 text-[#9A7D3A]" />
                  </div>
                  <div>
                    <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111111] mb-2">
                      {group.category}
                    </h2>
                    <p className="text-sm text-[#111111]/65 font-light max-w-2xl">
                      {group.summary}
                    </p>
                  </div>
                </div>
                <a
                  href="#partner-form"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      requestMode: "Request a Vetted Vendor Introduction",
                      category: group.category,
                    }))
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.18em] rounded-lg hover:bg-[#C8A951] hover:text-[#111111] transition-colors shrink-0 self-start md:self-center"
                >
                  Request Warm Intro <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {group.partners.map((partner) => (
                  <div
                    key={partner.firm}
                    className="p-7 rounded-xl bg-[#fbfbf9] border border-[#111111]/8 hover:border-[#C8A951] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block px-3 py-1 rounded bg-[#f5f3ef] text-[#9A7D3A] text-[10px] font-bold uppercase tracking-widest mb-3">
                        Vetted Strategic Partner
                      </span>
                      <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                        {partner.firm}
                      </h3>
                      <p className="text-xs font-bold text-[#9A7D3A] uppercase tracking-wider mb-3">
                        {partner.specialty}
                      </p>
                      <p className="text-xs text-[#111111]/75 leading-relaxed mb-4">
                        {partner.highlight}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[#111111]/8 flex items-center justify-between text-[11px] text-[#111111]/60">
                      <span>Coverage: {partner.coverage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BECOME A STRATEGIC PARTNER / REQUEST VENDOR INTRODUCTION FORM ── */}
      <section id="partner-form" className="py-28 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto bg-[#fbfbf9] rounded-2xl p-8 md:p-14 border border-[#111111]/10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Partner Concierge Desk
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Request a Vendor Introduction or Apply as a Strategic Partner
            </h2>
            <p className="text-sm text-[#111111]/65 font-light">
              Need an immediate warm introduction to one of our preferred lenders, attorneys, surveyors, or inspectors—or interested in joining our vetted vendor roster? Submit below.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-xl bg-white border border-[#C8A951] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                Partner Request Received
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-md mx-auto mb-6">
                Thank you, {formData.firstName}. Mark Davis and Rachael Garnett will review your request and coordinate your introduction directly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.requestMode}
                    onChange={(e) => setFormData({ ...formData, requestMode: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  >
                    <option>Request a Vetted Vendor Introduction</option>
                    <option>Apply to Become a Vetted Strategic Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Partner Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  >
                    <option>Preferred Residential & Jumbo Lending</option>
                    <option>Commercial & SBA Financing</option>
                    <option>Real Estate Title & Escrow Counsel</option>
                    <option>Certified Home & Seawall Inspectors</option>
                    <option>Civil Engineering & Land Surveying</option>
                    <option>Architectural Staging & Interior Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                  Property Address or Firm / License Details
                </label>
                <input
                  type="text"
                  value={formData.companyOrProperty}
                  onChange={(e) => setFormData({ ...formData, companyOrProperty: e.target.value })}
                  placeholder="Property address needing service OR your firm name & Florida license..."
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                  Additional Context
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your timeline, scope of work, or partnership proposal..."
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg disabled:opacity-50"
              >
                {submitting ? "Submitting Request..." : "Submit Partner / Vendor Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-16 px-6 md:px-12 bg-[#111111] text-white border-t border-[#C8A951]/20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-40">
              <DavisGarnettLogo variant="dark" className="w-full" />
            </div>
            <div className="text-xs text-white/60">
              <p className="font-bold text-white">Davis & Garnett Strategic Partner Network</p>
              <p>Align Right Realty Carrollwood (#BK3401606)</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-widest text-white/70">
            <Link href="/about" className="hover:text-[#C8A951]">
              About Hub
            </Link>
            <Link href="/about/mark-davis" className="hover:text-[#C8A951]">
              Mark Davis
            </Link>
            <Link href="/about/rachael-garnett" className="hover:text-[#C8A951]">
              Rachael Garnett
            </Link>
            <Link href="/about/align-right-realty-carrollwood" className="hover:text-[#C8A951]">
              Align Right Realty
            </Link>
            <Link href="/about/community-outreach-giving" className="hover:text-[#C8A951]">
              Community Giving
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

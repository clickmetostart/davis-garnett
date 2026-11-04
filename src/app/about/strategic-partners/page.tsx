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
      "Direct introductions to our vetted Tampa Bay private wealth mortgage bankers, portfolio jumbo lenders, and official Florida homebuyer programs.",
    partners: [
      {
        firm: "Align Right Realty Carrollwood — Preferred Mortgage & Jumbo Desk",
        specialty: "Portfolio Jumbo Loans, Physician Relocation, Bridge Financing & Conventional/VA",
        coverage: "11962 N Dale Mabry Hwy, Tampa, FL 33618 • Greater Tampa Bay",
        highlight: "Direct warm handoff to Mark & Rachael's vetted senior loan officers offering upfront underwritten pre-approvals and 14-to-21-day clear-to-close execution.",
      },
      {
        firm: "Florida Housing Finance Corporation (FloridaHousing.org)",
        specialty: "Florida Hometown Heroes, First-Time Buyer & Down-Payment Assistance Programs",
        coverage: "Statewide Florida • Hillsborough, Pinellas, Pasco, Polk & Manatee",
        highlight: "Official state-sponsored mortgage programs and down-payment assistance for Florida healthcare workers, educators, veterans, and relocating families.",
      },
    ],
  },
  {
    id: "commercial-sba",
    icon: Building2,
    category: "02 · Commercial, SBA & Agricultural Land Financing",
    summary:
      "Institutional debt programs and chartered agricultural lenders supporting owner-user commercial buildings, mixed-use acquisitions, and Central Florida acreage.",
    partners: [
      {
        firm: "Farm Credit of Central Florida (FarmCreditCFL.com)",
        specialty: "Acreage, Timberland, Citrus Groves, Equestrian Estates & Agribusiness Loans",
        coverage: "Lakeland Headquarters • Serving Polk, Marion, Pasco, Hillsborough & Pinellas",
        highlight: "Member-owned cooperative lender specializing in rural land tracts (like our 79.54-acre Frostproof and 19.72-acre Fort McCoy offerings) and agricultural homesteads.",
      },
      {
        firm: "U.S. Small Business Administration (SBA.gov) — 504 & 7(a) Florida CDCs",
        specialty: "SBA 504 (90% LTV Owner-User Commercial) & SBA 7(a) Mixed-Use Financing",
        coverage: "South Florida / Tampa Bay District • I-4 & I-75 Commercial Corridors",
        highlight: "Enables business owners acquiring commercial or mixed-use assets (such as 126 Ridgewood Ave in Brandon) to purchase with as little as 10% down.",
      },
    ],
  },
  {
    id: "title-escrow",
    icon: Scale,
    category: "03 · Real Estate Title, Escrow & 1031 Exchange Counsel",
    summary:
      "In-house brokerage closing coordination, Board-Certified Florida Real Estate Attorneys, and IRC Section 1031 Qualified Intermediaries.",
    partners: [
      {
        firm: "Align Right Realty Carrollwood — Title & Closing Coordination Desk",
        specialty: "Florida Title Commitments, Municipal Lien Searches, Escrow & Remote Online Closings",
        coverage: "11962 N Dale Mabry Hwy, Tampa, FL 33618 • License #BK3401606",
        highlight: "On-site conference facilities, encrypted escrow wire verification, and seamless contract-to-close coordination for residential and commercial transactions.",
      },
      {
        firm: "The Florida Bar RPPTL Section Attorneys & 1031 Qualified Intermediaries",
        specialty: "Board-Certified Real Property Counsel & IRC Section 1031 Tax-Deferred Exchanges",
        coverage: "Statewide Florida • Hillsborough, Pinellas, Pasco, Polk & Marion",
        highlight: "Coordinated introductions to vetted Florida real estate attorneys and 1031 intermediaries managing strict 45-day identification and 180-day exchange deadlines.",
      },
    ],
  },
  {
    id: "inspectors",
    icon: ShieldCheck,
    category: "04 · Certified Home, Marine Seawall & Insurance Inspectors",
    summary:
      "Florida DBPR-licensed building inspectors and coastal marine contractors protecting buyers during residential, waterfront, and commercial due diligence.",
    partners: [
      {
        firm: "Florida Association of Building Inspectors (FABI.org) & DBPR-Licensed Inspectors",
        specialty: "Commercial Building Audits, 4-Point Insurance, Wind Mitigation & Thermal Imaging",
        coverage: "Hillsborough, Pinellas, Pasco, Polk, Manatee & Marion Counties",
        highlight: "State-licensed Florida inspectors (Chapter 468, F.S.) delivering same-day digital inspection reports and bindable Florida insurance mitigation forms.",
      },
      {
        firm: "Florida DEP (FloridaDEP.gov) & Licensed Tampa Bay Marine / Seawall Contractors",
        specialty: "Seawall Cap/Tie-Back Audits, Dock Permitting & Sovereign Submerged Lands",
        coverage: "St. Petersburg, Bahama Shores, Tampa Bay & Gulf Coast Waterways",
        highlight: "Comprehensive marine structural inspections and dock permit verification for deepwater estates like 6100 Bahama Shores Dr S.",
      },
    ],
  },
  {
    id: "engineering-surveying",
    icon: Compass,
    category: "05 · Civil Engineering, Water Management & Land Surveying",
    summary:
      "Regional water management authorities and licensed Florida Professional Surveyors & Mappers (PSM) supporting land and commercial due diligence.",
    partners: [
      {
        firm: "Southwest Florida Water Management District (SWFWMD / WaterMatters.org)",
        specialty: "Environmental Resource Permits (ERP), Wetland Delineation & Floodplain Maps",
        coverage: "Brooksville & Tampa Service Offices • 16-County West-Central FL Footprint",
        highlight: "Essential public regulatory data and permitting guidance for evaluating raw acreage, drainage, and commercial site development across Tampa Bay.",
      },
      {
        firm: "Florida Surveying and Mapping Society (FSMS.org) — Licensed PSM Surveyors",
        specialty: "ALTA/NSPS Commercial Surveys, Topographic Mapping & FEMA Elevation Certificates",
        coverage: "Tampa Bay, Frostproof / Polk County & Fort McCoy / Marion County",
        highlight: "Direct introductions to licensed Florida Professional Surveyors and Mappers for boundary verification, acreage splits, and coastal flood certificates.",
      },
    ],
  },
  {
    id: "staging-design",
    icon: Sparkles,
    category: "06 · Architectural Staging, 3D Media & Listing Launch Concierge",
    summary:
      "High-impact visual production and pre-list preparation so every Davis & Garnett listing launches like it is hot, new, and demands immediate market attention.",
    partners: [
      {
        firm: "Stellar MLS (StellarMLS.com) & Matterport 3D Architectural Media",
        specialty: "3D Matterport Digital Twins, Aerial Drone Cinematography & Global IDX Syndication",
        coverage: "Tampa Bay & Central Florida MLS Footprint",
        highlight: "Full-scale digital twin walkthroughs (featured on our listings like 3037 Downan Point Dr), 4K drone video, and syndication to Realtor.com, Zillow, and Homes.com.",
      },
      {
        firm: "Davis & Garnett White-Glove Pre-List Staging & Preparation Concierge",
        specialty: "Interior Staging, Curb-Appeal Refresh, Lighting & Editorial Launch Strategy",
        coverage: "Greater Tampa Bay • Coordinated Directly by Rachael Garnett & Mark Davis",
        highlight: "We treat every listing—commercial or residential, big or small, land or condo—like it is hot, new, and deserves maximum visual polish before hitting the market.",
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

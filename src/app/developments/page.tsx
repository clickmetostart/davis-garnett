"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  HardHat,
  FileSearch,
  DollarSign,
  PhoneCall,
  Layers,
  Trees,
  ExternalLink,
  Globe,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import { DEVELOPMENTS, Development } from "@/data/developments";

type FilterOption = "all" | "downtown-bayshore" | "north-tampa";

export default function DevelopmentsHubPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    developmentOfInterest: "All / Multiple Developments",
    corridorPreference: "Both Downtown Towers & North Tampa Communities",
    budgetRange: "$750K – $1.5M",
    timeline: "Within 3–6 Months",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const downtownTowers = DEVELOPMENTS.filter((d) => d.corridor === "downtown-bayshore");
  const northTampaCommunities = DEVELOPMENTS.filter((d) => d.corridor === "north-tampa");

  const showDowntown = activeFilter === "all" || activeFilter === "downtown-bayshore";
  const showNorthTampa = activeFilter === "all" || activeFilter === "north-tampa";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          source: `Developments Hub — ${leadForm.developmentOfInterest}`,
          status: "New",
          labels: [
            "New Construction VIP",
            leadForm.developmentOfInterest,
            leadForm.budgetRange,
          ],
          notes: `Corridor: ${leadForm.corridorPreference} | Budget: ${leadForm.budgetRange} | Timeline: ${leadForm.timeline} | Notes: ${leadForm.message}`,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit lead");
      setFormStatus("success");
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 bg-[#111111] text-white overflow-hidden border-b border-[#C8A951]/30">
        <div className="absolute inset-0 z-0">
          <Image
            src="/res_luxury_condo_1787632822869.png"
            alt="Tampa Bay Luxury Developments"
            fill
            priority
            className="object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/75 to-[#111111]" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#C8A951]/40 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A951]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A951] font-bold">
                Davis & Garnett New Development Advisory
              </span>
            </div>

            <h1 className="font-aiveritas text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6">
              Tampa Bay&apos;s Premier{" "}
              <span className="text-[#C8A951]">New Construction</span> &amp; Luxury Developments.
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-3xl mb-10">
              From five-star branded sky residences along the Tampa Riverwalk, Water Street, and historic
              Bayshore Boulevard to nationally ranked master-planned lagoon and conservation communities in
              Wesley Chapel and Land O&apos; Lakes—gain priority VIP access, pre-public price sheets, and
              uncompromising buyer representation at zero commission cost to you.
            </p>

            {/* Corridor Filter Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {[
                {
                  id: "all" as FilterOption,
                  label: "All Developments (9)",
                },
                {
                  id: "downtown-bayshore" as FilterOption,
                  label: "Downtown & Bayshore Luxury Towers (5)",
                },
                {
                  id: "north-tampa" as FilterOption,
                  label: "North Tampa Master-Planned Communities (4)",
                },
              ].map((btn) => {
                const isActive = activeFilter === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setActiveFilter(btn.id)}
                    className={`px-6 py-3.5 rounded-xl text-xs uppercase tracking-[0.18em] font-bold transition-all duration-300 border ${
                      isActive
                        ? "bg-[#C8A951] text-[#111111] border-[#C8A951] shadow-lg shadow-[#C8A951]/25"
                        : "bg-white/5 text-white/80 border-white/15 hover:border-[#C8A951]/60 hover:text-white"
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Executive Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            {[
              { stat: "9", label: "Curated Flagship Developments" },
              { stat: "$360K – $7.8M+", label: "Pre-Construction & Spec Range" },
              { stat: "$0", label: "Buyer Representation Fee" },
              { stat: "100%", label: "Pre-Market Price Sheet & Lot Access" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="font-aiveritas text-3xl md:text-4xl text-[#C8A951] mb-1">
                  {item.stat}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 1: DOWNTOWN TAMPA, RIVERWALK, WATER STREET & BAYSHORE TOWERS ── */}
      {showDowntown && (
        <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-[#111111]/10">
              <div>
                <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                  <Building2 className="w-4 h-4 text-[#C8A951]" />
                  <span>Corridor A — Vertical Luxury &amp; Urban Districts</span>
                </div>
                <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight">
                  Downtown Tampa, Riverwalk, Water Street &amp; Bayshore Luxury Towers
                </h2>
              </div>
              <p className="text-[#111111]/65 font-light max-w-md text-sm md:text-base leading-relaxed">
                Five-star hospitality residences, private elevator sky estates, and walkable urban
                master plans transforming Tampa&apos;s waterfront skyline.
              </p>
            </div>

            <div className="space-y-12">
              {downtownTowers.map((dev, index) => (
                <DevelopmentTowerShowcaseCard key={dev.slug} dev={dev} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── COLLECTIVE SECTION 2: NORTH TAMPA (WESLEY CHAPEL & LAND O' LAKES) MASTER-PLANNED COMMUNITIES ── */}
      {showNorthTampa && (
        <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 pb-8 border-b border-[#111111]/10">
              <div>
                <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                  <Trees className="w-4 h-4 text-[#C8A951]" />
                  <span>Corridor B — Resort Lagoons, Nature Preserves &amp; Biotech Cities</span>
                </div>
                <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight">
                  North Tampa: Wesley Chapel &amp; Land O&apos; Lakes Master-Planned Communities
                </h2>
              </div>
              <p className="text-[#111111]/65 font-light max-w-md text-sm md:text-base leading-relaxed">
                Multi-thousand-acre master plans anchored by 15-acre Crystal Lagoons, Moffitt&apos;s
                775-acre Speros FL campus, Peak Surf Park, and conservation estates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {northTampaCommunities.map((dev) => (
                <MasterPlannedCommunityCard key={dev.slug} dev={dev} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── COLLECTIVE SECTION 3: THE DAVIS & GARNETT VIP NEW CONSTRUCTION ADVANTAGE ── */}
      <section className="py-28 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-4">
                Uncompromising Advocacy
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-6">
                The Davis &amp; Garnett VIP New Construction Advantage.
              </h2>
              <p className="text-[#111111]/70 font-light leading-relaxed mb-6">
                The #1 mistake luxury condo and master-planned homebuyers make in Tampa Bay is walking
                into a developer sales gallery or model home center unrepresented. The friendly on-site
                sales associate works 100% for the builder or developer—fiduciarily bound to maximize the
                developer&apos;s net price and protect the builder&apos;s contract terms.
              </p>
              <div className="p-6 rounded-2xl bg-[#f5f3ef] border border-[#C8A951]/40">
                <div className="text-xs uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-2">
                  Golden Rule of Florida New Construction
                </div>
                <p className="text-sm text-[#111111]/80 leading-relaxed">
                  Developers and homebuilders require your advisor to accompany or register you{" "}
                  <strong className="font-semibold text-[#111111]">on or before your very first visit</strong>.
                  The builder pays our advisory fee out of their fixed marketing budget—meaning you never
                  pay a penny more for the property, while gaining powerhouse negotiation leverage.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: DollarSign,
                  badge: "0% Buyer Cost",
                  title: "Zero Buyer Commission + Full Price Parity",
                  description:
                    "Builders do not discount base home prices if you walk in without an agent—doing so would destroy their appraised comparable sales for the rest of the neighborhood. Instead, they simply pocket the unallocated marketing fee. With Davis & Garnett, you get elite representation for $0.",
                },
                {
                  icon: TrendingUp,
                  badge: "Rate Buydowns & Credits",
                  title: "Aggressive Builder Rate Buydowns & Flex Cash",
                  description:
                    "We track standing Quick Move-In (QMI) inventory and builder fiscal quarter-ends across WestBay, Lennar, Pulte, Related, and Two Roads—routinely negotiating 4.99%–5.50% forward-commitment mortgage buydowns and $25,000–$75,000+ in closing or design studio credits.",
                },
                {
                  icon: HardHat,
                  badge: "Quality Control",
                  title: "Independent 3-Phase Structural Inspections",
                  description:
                    "Even multi-million-dollar towers and semi-custom estates suffer from subcontractor rushes. We coordinate licensed third-party inspectors at pre-pour/pre-drywall, pre-closing blue-tape walkthrough, and month-11 prior to your 1-year builder warranty expiration.",
                },
                {
                  icon: FileSearch,
                  badge: "Off-Market Releases",
                  title: "Priority Lot Holds & Pre-Public Price Sheets",
                  description:
                    "The best 80-foot conservation lots in Two Rivers and Connerton—and the highest-ROI corner stacks in Pendry and Water Street Phase 2—are reserved via VIP broker allocation before they ever appear on Zillow or public websites.",
                },
              ].map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] rounded-2xl p-8 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#111111] text-[#C8A951] flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full bg-[#C8A951]/15 text-[#9A7D3A]">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="font-aiveritas text-xl text-[#111111] mb-3 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#111111]/70 font-light leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dark Contrast Comparison Banner */}
          <div className="bg-[#111111] text-white rounded-3xl p-8 md:p-12 border border-[#C8A951]/30 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
                Commercial + Residential Synergy
              </span>
              <h3 className="font-aiveritas text-2xl md:text-3xl text-white mb-3">
                We Know What Is Being Built Next Door Before You Buy.
              </h3>
              <p className="text-white/75 text-sm md:text-base font-light leading-relaxed">
                Because Mark Davis leads Commercial Acquisitions and Rachael Garnett leads Luxury
                Residential Advisory, we evaluate every development through both lenses: zoning filings,
                DOT highway interchanges, CDD bond debt, commercial retail anchors, and future view-corridor
                protections.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="#vip-pricing-form"
                className="w-full md:w-auto text-center px-8 py-4 bg-[#C8A951] hover:bg-white text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-colors"
              >
                Register For VIP Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 4: REQUEST VIP DEVELOPER PRICING, FLOOR PLANS & BUILDER INCENTIVES FORM ── */}
      <section id="vip-pricing-form" className="py-28 px-6 md:px-12 bg-[#f5f3ef]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Value Proposition & What You Receive */}
            <div className="lg:col-span-5">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-4">
                Direct Developer &amp; Builder Desk
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-6">
                Request VIP Developer Pricing, Floor Plans &amp; Incentives.
              </h2>
              <p className="text-[#111111]/70 font-light leading-relaxed mb-8">
                Receive a custom-curated dossier within 24 hours containing current developer price
                sheets, architectural floor plans, HOA &amp; CDD calculators, and this month&apos;s
                unadvertised builder rate-buydown &amp; closing-cost incentives.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Complete Floor Plan PDFs & Stack/Lot Availability Maps",
                  "Side-by-Side HOA, CDD Bond & Property Tax Breakdown",
                  "Current Standing Quick-Move-In (QMI) Discounted List",
                  "VIP Private Tour Registration (Protects Your Buyer Incentives)",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#111111]/85 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Advisor Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#111111]/10 flex items-center gap-4 shadow-sm">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8A951] shrink-0">
                  <Image
                    src="/davis-garnett-real-combo.png"
                    alt="Mark Davis & Rachael Garnett"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="font-aiveritas text-lg text-[#111111]">
                    Mark Davis &amp; Rachael Garnett
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#9A7D3A] font-bold mb-1">
                    New Development &amp; Master-Plan Advisory
                  </div>
                  <div className="text-xs text-[#111111]/60 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C8A951]" />
                    <span>Brokered by Align Right Realty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form Wired to POST /api/leads */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-[#111111]/10 shadow-xl">
              {formStatus === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C8A951]/20 text-[#9A7D3A] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-aiveritas text-3xl text-[#111111] mb-3">
                    VIP Developer Dossier Request Received
                  </h3>
                  <p className="text-[#111111]/70 max-w-md mx-auto mb-8 font-light leading-relaxed">
                    Thank you, <strong className="text-[#111111]">{leadForm.name}</strong>. Mark Davis
                    and Rachael Garnett are preparing your floor plans, price sheets, and current
                    builder incentive breakdown for{" "}
                    <strong className="text-[#111111]">{leadForm.developmentOfInterest}</strong>.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors"
                  >
                    Request Another Development Package
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div className="border-b border-[#111111]/10 pb-4 mb-2">
                    <h3 className="font-aiveritas text-2xl text-[#111111]">
                      VIP Pricing &amp; Floor Plan Registration
                    </h3>
                    <p className="text-xs text-[#111111]/60 mt-1">
                      Direct delivery to your inbox. Zero obligation. Full buyer agency protection.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Alexander Sterling"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(813) 555-0199"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Primary Development of Interest
                      </label>
                      <select
                        value={leadForm.developmentOfInterest}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, developmentOfInterest: e.target.value })
                        }
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="All / Multiple Developments">
                          All / Compare Multiple Developments
                        </option>
                        {DEVELOPMENTS.map((d) => (
                          <option key={d.slug} value={d.name}>
                            {d.name} ({d.priceRange})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Target Price Range
                      </label>
                      <select
                        value={leadForm.budgetRange}
                        onChange={(e) => setLeadForm({ ...leadForm, budgetRange: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="$360K – $600K">$360K – $600K</option>
                        <option value="$600K – $1.0M">$600K – $1.0M</option>
                        <option value="$750K – $1.5M">$750K – $1.5M</option>
                        <option value="$1.5M – $3.0M">$1.5M – $3.0M</option>
                        <option value="$3.0M – $8.0M+">$3.0M – $8.0M+ (Tower / Penthouse)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Acquisition Timeline
                      </label>
                      <select
                        value={leadForm.timeline}
                        onChange={(e) => setLeadForm({ ...leadForm, timeline: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="Immediate / Quick Move-In (30-60 Days)">
                          Immediate / Quick Move-In (30–60 Days)
                        </option>
                        <option value="Within 3–6 Months">Within 3–6 Months</option>
                        <option value="6–12 Months (Dirt Build / Pre-Construction)">
                          6–12 Months (Dirt Build / Pre-Construction)
                        </option>
                        <option value="2026–2028 Tower Delivery">2026–2028 Tower Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                      Specific Floor Plan, View, Lot Size, or Builder Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us if you prefer waterfront views, an 80' conservation lot, 55+ active adult, short-term rental eligibility, or builder rate buydown details..."
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      Unable to submit right now. Please try again or call us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 px-8 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] font-bold text-xs uppercase tracking-[0.22em] rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {formStatus === "submitting"
                      ? "Preparing VIP Request..."
                      : "Send Me VIP Floor Plans, Price Sheets & Builder Incentives"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── * OFFICIAL SOURCES ATTRIBUTION & REGULATORY DISCLOSURE ── */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#fbfbf9] border border-[#C8A951]/40 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex items-start gap-5">
              <span className="text-4xl text-[#C8A951] font-serif leading-none select-none shrink-0">*</span>
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block mb-2">
                    * Official Development Sources &amp; Verification
                  </span>
                  <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111111]">
                    Direct Sourcing From Official Sponsor Portals
                  </h3>
                </div>

                <p className="text-sm md:text-base text-[#111111]/80 font-light leading-relaxed max-w-4xl">
                  To ensure 100% accuracy, transparency, and consumer protection, all architectural specifications, tower elevations, unit counts, amenity descriptions, and construction milestone projections published across the Davis &amp; Garnett Developments Hub are sourced and verified exclusively from official developer and master district websites:
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#9A7D3A] font-bold mb-1">
                        Riverwalk Luxury Tower
                      </div>
                      <h4 className="font-aiveritas text-lg text-[#111111] mb-2">Pendry Residences Tampa</h4>
                      <p className="text-xs text-[#111111]/65 mb-4 leading-relaxed">
                        38 stories, 207 private residences, Montage hospitality, Spa Pendry, and curated dining.
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-[#111111]/8">
                      <a
                        href="https://www.pendry.com/tampa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#C8A951] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#C8A951]" />
                        <span>pendry.com/tampa</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                      <a
                        href="https://pendrytampa.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#9A7D3A] hover:text-[#111111] transition-colors"
                      >
                        <Globe className="w-3 h-3 text-[#9A7D3A]" />
                        <span>pendrytampa.com (Sales)</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#9A7D3A] font-bold mb-1">
                        Bayshore Boulevard Towers
                      </div>
                      <h4 className="font-aiveritas text-lg text-[#111111] mb-2">The Ritz-Carlton Residences</h4>
                      <p className="text-xs text-[#111111]/65 mb-4 leading-relaxed">
                        4.5-acre waterfront enclave, twin towers by Arquitectonica, Meyer Davis, and Enzo Enea.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#111111]/8">
                      <a
                        href="https://theresidencestampa.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#C8A951] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#C8A951]" />
                        <span>theresidencestampa.com</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#111111]/10 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#9A7D3A] font-bold mb-1">
                        WELL Community Gold District
                      </div>
                      <h4 className="font-aiveritas text-lg text-[#111111] mb-2">Water Street Tampa Phase 2</h4>
                      <p className="text-xs text-[#111111]/65 mb-4 leading-relaxed">
                        33-story tower, 452 residences, 37K SF retail, and district construction progress.
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-[#111111]/8">
                      <a
                        href="https://www.waterstreettampa.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#111111] hover:text-[#C8A951] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#C8A951]" />
                        <span>waterstreettampa.com</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                      <a
                        href="https://www.waterstreettampa.com/project-progress"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#9A7D3A] hover:text-[#111111] transition-colors"
                      >
                        <Globe className="w-3 h-3 text-[#9A7D3A]" />
                        <span>waterstreettampa.com/project-progress</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#111111]/10 text-xs text-[#111111]/60 leading-relaxed">
                  <strong className="text-[#111111]/85 font-semibold">* Legal Disclosure &amp; Independent Agency Notice:</strong> Davis &amp; Garnett (Mark Davis &amp; Rachael Garnett, brokered by Align Right Realty) is an independent licensed real estate advisory group representing prospective buyers, assignees, and investors. Davis &amp; Garnett is not the exclusive developer sales listing agency, project sponsor, or affiliate of Two Roads Development, Montage International, The Related Group, or Strategic Property Partners. All trademarks, project names, logos, and architectural renderings are the property of their respective owners and are displayed strictly for editorial evaluation and buyer identification purposes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 md:px-12 bg-[#0c0b09] text-white border-t border-[#C8A951]/20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="w-48 h-14 relative">
            <DavisGarnettLogo variant="dark" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.2em] text-white/70">
            <Link href="/v1-light" className="hover:text-[#C8A951] transition-colors">
              Home (V1-Light)
            </Link>
            <Link href="/developments" className="text-[#C8A951] font-bold">
              Featured Developments
            </Link>
            <Link href="/search-mls" className="hover:text-[#C8A951] transition-colors">
              Search Full MLS
            </Link>
            <Link href="/listings" className="hover:text-[#C8A951] transition-colors">
              Exclusive Portfolio
            </Link>
          </div>
          <div className="w-44 h-12 relative">
            <Image
              src="/align-right-email-logo.png"
              alt="Align Right Realty Carrollwood"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/35 gap-4">
          <p>
            © {new Date().getFullYear()} Davis &amp; Garnett. Brokered by{" "}
            <span className="text-[#ef5728] font-bold">Align Right Realty Carrollwood</span> (#BK3401606) · 3903 Northdale Blvd Suite 115W, Tampa, FL 33624. Equal
            Housing Opportunity.
          </p>
          <p>
            Developer prices, floor plans, HOA/CDD estimates, and delivery timelines subject to change
            without notice.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── SUB-COMPONENT: LARGE ARCHITECTURAL TOWER CARD (CORRIDOR A) ── */
function DevelopmentTowerShowcaseCard({ dev, index }: { dev: Development; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <div className="group bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
      <div className="grid lg:grid-cols-12">
        {/* Image Column */}
        <div
          className={`lg:col-span-5 relative min-h-[340px] lg:min-h-[460px] overflow-hidden ${
            isReversed ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={dev.heroImage}
            alt={dev.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#111111]/90 backdrop-blur-md text-[#C8A951] text-[10px] uppercase tracking-[0.2em] font-bold border border-[#C8A951]/40">
              {dev.status}
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#C8A951] font-bold mb-1">
              Starting Price Range
            </div>
            <div className="font-aiveritas text-3xl text-white">{dev.priceRange}</div>
          </div>
        </div>

        {/* Content Column */}
        <div
          className={`lg:col-span-7 p-8 md:p-12 flex flex-col justify-between ${
            isReversed ? "lg:order-1" : ""
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.22em] text-[#9A7D3A] font-bold">
                {dev.neighborhoodOrSubmarket}
              </span>
              <span className="text-xs font-semibold text-[#111111]/55">
                Delivery: <strong className="text-[#111111]">{dev.delivery}</strong>
              </span>
            </div>

            <Link href={`/developments/${dev.slug}`}>
              <h3 className="font-aiveritas text-3xl md:text-4xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-2">
                {dev.name}
              </h3>
            </Link>
            <p className="text-xs text-[#111111]/60 flex items-center gap-1.5 mb-5">
              <MapPin className="w-3.5 h-3.5 text-[#C8A951] shrink-0" />
              <span>{dev.location}</span>
            </p>

            <p className="text-[#111111]/75 font-light text-sm md:text-base leading-relaxed mb-6">
              {dev.summary}
            </p>

            {/* Key Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-[#111111]/8 mb-6">
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#111111]/45 font-bold">
                  Developer
                </span>
                <span className="text-xs font-semibold text-[#111111] line-clamp-1">
                  {dev.developer}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#111111]/45 font-bold">
                  Scale &amp; Offering
                </span>
                <span className="text-xs font-semibold text-[#111111] line-clamp-1">
                  {dev.unitsOrAcreage.split("|")[0]}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[10px] uppercase tracking-wider text-[#111111]/45 font-bold">
                  Residences
                </span>
                <span className="text-xs font-semibold text-[#111111] line-clamp-1">
                  {dev.unitsOrAcreage.split("|")[1] || dev.propertyTypes[0]}
                </span>
              </div>
            </div>

            {/* Top 3 Highlights */}
            <ul className="space-y-2 mb-8">
              {dev.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[#111111]/80">
                  <ShieldCheck className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#111111]/10">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/developments/${dev.slug}`}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-colors"
              >
                Explore {dev.name} <ArrowRight className="w-4 h-4" />
              </Link>
              {dev.officialWebsiteUrl && (
                <a
                  href={dev.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 bg-[#f5f3ef] hover:bg-white border border-[#111111]/15 hover:border-[#C8A951] text-[#111111] text-xs font-semibold rounded-xl transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C8A951]" />
                  <span>Official Site</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
            </div>
            <a
              href="#vip-pricing-form"
              className="text-xs uppercase tracking-[0.18em] font-bold text-[#9A7D3A] hover:text-[#111111] transition-colors"
            >
              Request Price Sheet →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SUB-COMPONENT: MASTER-PLANNED COMMUNITY CARD (CORRIDOR B) ── */
function MasterPlannedCommunityCard({ dev }: { dev: Development }) {
  return (
    <div className="group bg-white border border-[#111111]/10 hover:border-[#C8A951] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
      <div>
        {/* Image Header */}
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={dev.heroImage}
            alt={dev.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#111111] text-[10px] uppercase tracking-[0.18em] font-bold shadow">
              {dev.neighborhoodOrSubmarket}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#111111]/90 text-[#C8A951] text-[10px] uppercase tracking-[0.18em] font-bold border border-[#C8A951]/40">
              {dev.specs[0]?.value}
            </span>
          </div>
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A951] font-bold block">
                Master Developer: {dev.developer}
              </span>
              <h3 className="font-aiveritas text-3xl text-white">{dev.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-white/70 block">
                From
              </span>
              <span className="font-aiveritas text-xl text-[#C8A951] font-bold">
                {dev.priceRange}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="text-xs text-[#111111]/60 flex items-center gap-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C8A951] shrink-0" />
            <span>{dev.location}</span>
          </p>

          <p className="text-sm text-[#111111]/75 font-light leading-relaxed mb-6">{dev.summary}</p>

          {/* Builder Roster Pills */}
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#C8A951]" />
              <span>Featured Builders ({dev.builders.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {dev.builders.map((builder) => (
                <span
                  key={builder}
                  className="px-3 py-1 rounded-lg bg-[#f5f3ef] border border-[#111111]/10 text-[11px] font-medium text-[#111111]/85"
                >
                  {builder}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2 pt-4 border-t border-[#111111]/10">
            {dev.highlights.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#111111]/80">
                <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-8 pb-8 pt-4 flex items-center justify-between gap-4">
        <Link
          href={`/developments/${dev.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-colors"
        >
          View Community Guide &amp; Builders <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

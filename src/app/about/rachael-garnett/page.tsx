"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  CheckCircle2,
  Compass,
  Anchor,
  HeartHandshake,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import SiteFooter from "@/components/SiteFooter";

const SOLD_2026_PORTFOLIO = [
  {
    address: "3537 Valencia Cove Ct, Land O' Lakes, FL 34639",
    submarket: "Plantation Palms Golf Club • $550,000",
    category: "4BD / 3BA • 2,518 SqFt • 3-Car Garage",
    status: "2026 Sold",
    image: "/listings/valencia-cove-lol-1.webp",
    notes: "Executive cul-de-sac golf community estate closed at $550,000.",
  },
  {
    address: "3037 Downan Point Dr, Land O' Lakes, FL 34638",
    submarket: "Ballantrae • $450,000 (MLS# TB8490089)",
    category: "5BD / 3BA • 2,260 SqFt • Screened Lanai",
    status: "2026 Sold",
    image: "/listings/d-g-residential-1.webp",
    notes: "Updated 2-story residence with first-floor primary suite & 3D Matterport tour.",
  },
  {
    address: "7608 Teal Trce, Bradenton, FL 34203",
    submarket: "Tara Preserve Golf Community • $450,000 (MLS# TB8418770)",
    category: "2BD + Den / 2BA • 1,788 SqFt",
    status: "2026 Sold",
    image: "/listings/teal-trce-bradenton-1.webp",
    notes: "Championship golf community residence near UTC & Lakewood Ranch.",
  },
  {
    address: "1106 S Otto Pt, Inverness, FL 34450",
    submarket: "Gospel Island Waterfront • $340,000",
    category: "2BD / 2BA • 1,301 SqFt • Waterfront",
    status: "2026 Sold",
    image: "/listings/otto-pt-inverness-2.webp",
    notes: "Direct Tsala Apopka Chain of Lakes boating access on 0.31 acres.",
  },
  {
    address: "8136 Wheat Stone Dr, Zephyrhills, FL 33540",
    submarket: "Abbott Park • $319,900",
    category: "4BD / 2BA • 2,048 SqFt • 2020 Build",
    status: "2026 Sold",
    image: "/listings/wheat-stone-zephyrhills-1.webp",
    notes: "Contemporary open-concept single-family home in eastern Pasco County.",
  },
  {
    address: "2402 16th St W, Palmetto, FL 34221",
    submarket: "Bahia Vista • $318,000",
    category: "3BD / 2BA • 1,704 SqFt • Manatee River Corridor",
    status: "2026 Sold",
    image: "/listings/16th-st-palmetto-1.webp",
    notes: "Coastal residence minutes from Emerson Point Preserve & Regatta Pointe Marina.",
  },
  {
    address: "4603 Stonehaven Pl, New Port Richey, FL 34652",
    submarket: "Trouble Creek Villas • $256,000",
    category: "2BD / 2BA • 1,378 SqFt • Attached Villa",
    status: "2026 Sold",
    image: "/listings/stonehaven-npr-1.jpg",
    notes: "Maintenance-friendly villa with vaulted ceilings & enclosed Florida room.",
  },
  {
    address: "10609 Raffia Dr, Port Richey, FL 34668",
    submarket: "Jasmine Lakes • $185,000",
    category: "2BD / 1BA • 900 SqFt • 7,000 SqFt Lot",
    status: "2026 Sold",
    image: "/listings/raffia-port-richey-1.webp",
    notes: "Turnkey coastal concrete-block residence with no HOA or CDD fees.",
  },
];

export default function RachaelGarnettAdvisorPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryFocus: "Private Showing: 6100 Bahama Shores Dr S, St. Petersburg ($4,553,900)",
    targetCommunities: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          source: "Rachael Garnett Executive Profile (/about/rachael-garnett)",
          owner: "rachael@davisgarnettsells.com",
          pipelineStage: "New Luxury Residential Lead",
          buySideConfig: {
            budget: formData.targetCommunities || "Luxury Residential",
            preApprovalStatus: formData.inquiryFocus,
            timeframe: "Immediate Consultation",
          },
          notes: `[Rachael Garnett Direct Inquiry — ${formData.inquiryFocus}] Communities: ${formData.targetCommunities}. ${formData.notes}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Unable to submit online right now. Please call Rachael directly at 727-808-3344.");
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
              ← Meet Mark Davis (#3209459)
            </Link>
            <span>|</span>
            <Link href="/about/align-right-realty-carrollwood" className="hover:text-[#9A7D3A]">
              Align Right Carrollwood (#BK3401606)
            </Link>
          </div>
        </div>
      </div>

      {/* ── EXECUTIVE HERO ───────────────────────────────────────────────── */}
      <header className="py-20 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#111111]/10 bg-[#111111]">
              <Image
                src="/new-images/davis-garnett-new-team-rachael.jpg"
                alt="Rachael Garnett — Luxury Residential & Relocation Specialist (#3378601)"
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded bg-[#C8A951] text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  FL License #3378601
                </span>
                <p className="font-aiveritas text-2xl">Rachael Garnett</p>
                <p className="text-xs text-white/75">
                  Align Right Realty Carrollwood • License #BK3401606
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Co-Founder &amp; Principal · Commercial &amp; Residential Advisor
            </span>
            <h1 className="font-aiveritas text-5xl md:text-6xl text-[#111111] leading-[1.08] mb-6">
              Rachael Garnett
            </h1>
            <p className="text-xl text-[#9A7D3A] font-light mb-6">
              Commercial &amp; Residential Advisor • Deep Local Knowledge &amp; Dedicated Care Across Waterfront Estates, Condos, Residential &amp; Commercial
            </p>
            <p className="text-base text-[#111111]/75 font-light leading-relaxed mb-6">
              Rachael Garnett is a full-spectrum <strong className="font-semibold text-[#111111]">Commercial &amp; Residential Advisor</strong> representing buyers, sellers, and investors across commercial, residential, land, downtown condominiums, and luxury waterfront estates across St. Petersburg, Tampa, Carrollwood, Lutz, Land O&apos; Lakes, Bradenton, and Wesley Chapel. Known for her thoughtful property positioning, local market expertise, and genuine care for her clients, Rachael delivers attentive guidance at every price point.
            </p>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed mb-8">
              Co-founding <strong className="font-semibold text-[#111111]">Davis &amp; Garnett</strong> alongside fellow Commercial &amp; Residential Advisor Mark Davis (#3209459), Rachael and Mark serve as <strong className="font-semibold text-[#111111]">wholesome real estate powerhouses of knowledge and expertise</strong>—modestly waiting for the opportunity to serve, treating every client with the same respect for the value their property brings to our community, and happy to help navigate those waters.
            </p>

            {/* Direct Contact Bar */}
            <div className="grid sm:grid-cols-3 gap-4 p-6 rounded-xl bg-[#f5f3ef] border border-[#111111]/10 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold block mb-1">
                  Direct Cell
                </span>
                <a
                  href="tel:727-808-3344"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#9A7D3A]"
                >
                  <Phone className="w-4 h-4 text-[#9A7D3A]" />
                  727-808-3344
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold block mb-1">
                  Direct Email
                </span>
                <a
                  href="mailto:rachael@davisgarnettsells.com"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#9A7D3A] break-all"
                >
                  <Mail className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                  rachael@davisgarnettsells.com
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold block mb-1">
                  Credentials
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#111111]">
                  <ShieldCheck className="w-4 h-4 text-[#9A7D3A]" />
                  FL Lic. #3378601
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#rachael-consultation"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Schedule Private Residential Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#flagship-estate"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] transition-colors rounded-lg"
              >
                Explore $4.55M Bahama Shores Estate
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── FLAGSHIP ACTIVE WATERFRONT LISTING ───────────────────────────── */}
      <section id="flagship-estate" className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                Signature Waterfront Representation · Active Offering
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111]">
                6100 Bahama Shores Dr S, St. Petersburg
              </h2>
            </div>
            <div className="font-aiveritas text-3xl md:text-4xl text-[#9A7D3A]">
              $4,553,900
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden border border-[#111111]/10 shadow-xl grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[380px] lg:min-h-[520px] bg-[#111111]">
              <Image
                src="/listings/bahama-shores-1.webp"
                alt="6100 Bahama Shores Dr S, St. Petersburg, FL — $4,553,900 Waterfront Estate"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/75 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 bg-white/95 px-4 py-1.5 rounded text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A]">
                Premier St. Petersburg Waterfront Estate
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#C8A951] font-bold mb-1">
                  Bahama Shores • Tampa Bay Deep-Water Access
                </p>
                <p className="font-aiveritas text-2xl">
                  6100 Bahama Shores Dr S, St. Petersburg, FL 33705
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#9A7D3A] font-bold block mb-3">
                  Exclusive Luxury Mandate
                </span>
                <h3 className="font-aiveritas text-3xl text-[#111111] mb-4">
                  Unrivaled Coastal Architecture & Open-Bay Lifestyle
                </h3>
                <p className="text-sm text-[#111111]/70 font-light leading-relaxed mb-6">
                  Positioned in St. Petersburg&apos;s coveted Bahama Shores enclave, 6100 Bahama Shores Dr S offers commanding water vistas, private boating access to Tampa Bay and the Gulf of Mexico, and resort-caliber indoor-outdoor living minutes from vibrant downtown St. Pete.
                </p>

                <div className="grid grid-cols-2 gap-4 p-5 rounded-xl bg-[#fbfbf9] border border-[#111111]/8 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#111111]/50 block">
                      Offering Price
                    </span>
                    <span className="font-aiveritas text-xl text-[#9A7D3A]">$4,553,900</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#111111]/50 block">
                      Enclave
                    </span>
                    <span className="font-bold text-sm text-[#111111]">Bahama Shores, St. Pete</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#111111]/50 block">
                      Property Type
                    </span>
                    <span className="font-bold text-sm text-[#111111]">Luxury Waterfront Estate</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#111111]/50 block">
                      Showing Protocol
                    </span>
                    <span className="font-bold text-sm text-[#111111]">Private Appointment Only</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#111111]/75 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    <span>Protected boating access & panoramic sunrise/sunset water views</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    <span>Minutes to Downtown St. Petersburg dining, museums, and Albert Whitted Airport</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    <span>Comprehensive seawall, marine, and structural inspection dossier available</span>
                  </li>
                </ul>
              </div>

              <a
                href="#rachael-consultation"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    inquiryFocus:
                      "Private Showing: 6100 Bahama Shores Dr S, St. Petersburg ($4,553,900)",
                  }))
                }
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Request Private Waterfront Showing <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2026 SOLD TRACK RECORD ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white border-b border-[#C8A951]/20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                Verified Closing Velocity
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-white">
                2026 Sold Residential Track Record
              </h2>
            </div>
            <p className="text-sm text-white/65 max-w-md font-light">
              Selected 2026 residential closings demonstrating Rachael&apos;s hyper-local pricing precision and buyer matching across Tampa Bay.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLD_2026_PORTFOLIO.map((sold) => (
              <div
                key={sold.address}
                className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C8A951]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#C8A951]/20 text-[#C8A951] text-[10px] font-bold uppercase tracking-widest">
                      {sold.status}
                    </span>
                    <span className="text-xs text-white/50">{sold.submarket}</span>
                  </div>
                  <h3 className="font-aiveritas text-2xl text-white mb-2">
                    {sold.address}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#C8A951] font-semibold mb-3">
                    {sold.category}
                  </p>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {sold.notes}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
                  <span>Represented by Rachael Garnett</span>
                  <span>#3378601</span>
                </div>
              </div>
            ))}

            <div className="p-7 rounded-2xl bg-[#C8A951] text-[#111111] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold block mb-2">
                  Curious What Your Home Is Worth in 2026?
                </span>
                <h3 className="font-aiveritas text-2xl mb-3">
                  Request a Bespoke Equity & Pricing Valuation
                </h3>
                <p className="text-xs text-[#111111]/80 leading-relaxed mb-6">
                  Automated algorithms miss waterfront seawall upgrades, school boundary premiums, and custom architectural finishes. Receive a true advisor-built valuation.
                </p>
              </div>
              <a
                href="#rachael-consultation"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-lg hover:bg-white hover:text-[#111111] transition-colors"
              >
                Request Home Valuation <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIALIZATION PILLARS ───────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              White-Glove Residential Advisory
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              Rachael&apos;s Core Specializations
            </h2>
            <p className="text-base text-[#111111]/65 font-light">
              Every residential move is a major life transition. Rachael pairs warmth and family-first care with data-backed negotiation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Anchor,
                title: "Waterfront & Coastal Estates",
                desc: "Navigating bridge clearances, deep-water dockage, seawall integrity, flood elevation certificates, and riparian rights across St. Petersburg, Pinellas, and South Tampa.",
              },
              {
                icon: Compass,
                title: "Master-Planned & Executive Relocation",
                desc: "Concierge relocation tours matching out-of-state families with top-tier school districts, country clubs, and gated enclaves in Lutz, Land O' Lakes, Wesley Chapel, and Carrollwood.",
              },
              {
                icon: Sparkles,
                title: "Architectural Staging & Seller Positioning",
                desc: "Coordinating pre-list cosmetic enhancements, editorial photography, cinematic drone video, and private broker previews to command record price-per-square-foot exits.",
              },
              {
                icon: Home,
                title: "New Construction & Custom Builder Advocacy",
                desc: "Representing buyers at the builder table—negotiating lot premiums, structural design upgrades, and third-party phase inspections before drywall and closing.",
              },
              {
                icon: MapPin,
                title: "Hyper-Local Micro-Neighborhood Intelligence",
                desc: "Block-by-block knowledge of CDD fees, HOA reserves, commute corridors, and off-market pocket inventory across Hillsborough, Pinellas, and Pasco counties.",
              },
              {
                icon: HeartHandshake,
                title: "Multi-Generational & Family Transitions",
                desc: "Patient, compassionate guidance for upsizing families, empty-nest downsizers, and estate transitions requiring trusted vendor coordination.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl bg-[#fbfbf9] border border-[#111111]/8 hover:border-[#C8A951] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center mb-6">
                  <pillar.icon className="w-5 h-5 text-[#9A7D3A]" />
                </div>
                <h3 className="font-aiveritas text-2xl text-[#111111] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT REVIEWS ───────────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              5.0-Star Client Advocacy
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111]">
              Client Stories & Reviews
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Rachael treated our family's relocation to Tampa Bay as if we were her own family. She knew every gated neighborhood in Lutz and Land O' Lakes inside and out, and negotiated repairs we wouldn't have known to ask for.",
                author: "Brandon & Victoria H.",
                role: "Executive Relocation Clients",
              },
              {
                quote:
                  "When selling our residence on Valencia Cove Ct, Rachael's staging consultation and marketing launch brought qualified buyers immediately. She communicated every single day from listing to closing.",
                author: "Lauren S.",
                role: "2026 Residential Seller",
              },
              {
                quote:
                  "Exploring waterfront homes in St. Petersburg requires an advisor who truly understands seawalls, flood insurance, and boating water depth. Rachael's expertise and patience are second to none.",
                author: "Dr. Gregory & Claire K.",
                role: "Pinellas Waterfront Buyers",
              },
            ].map((item) => (
              <div
                key={item.author}
                className="p-8 rounded-2xl bg-white border border-[#111111]/8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-[#C8A951] mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#111111]/80 italic leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#111111]/10">
                  <div className="font-aiveritas text-lg text-[#111111]">{item.author}</div>
                  <div className="text-[11px] uppercase tracking-widest text-[#9A7D3A] font-bold">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECT CONSULTATION FORM FOR RACHAEL GARNETT ─────────────────── */}
      <section id="rachael-consultation" className="py-28 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto bg-[#fbfbf9] rounded-2xl p-8 md:p-14 border border-[#111111]/10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Direct Luxury Residential & Relocation Desk
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Connect With Rachael Garnett
            </h2>
            <p className="text-sm text-[#111111]/65 font-light">
              FL Real Estate License #3378601 • Direct: 727-808-3344 • rachael@davisgarnettsells.com
            </p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-xl bg-white border border-[#C8A951] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                Inquiry Routed to Rachael Garnett (#3378601)
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-md mx-auto mb-6">
                Thank you, {formData.firstName}. Rachael has received your message and will reach out personally.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                Send Another Inquiry
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
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    How Can Rachael Help?
                  </label>
                  <select
                    value={formData.inquiryFocus}
                    onChange={(e) => setFormData({ ...formData, inquiryFocus: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  >
                    <option>Private Showing: 6100 Bahama Shores Dr S, St. Petersburg ($4,553,900)</option>
                    <option>Luxury Residential Home Search & Buyer Representation</option>
                    <option>Executive Relocation Consultation to Tampa Bay</option>
                    <option>Confidential Seller Equity Valuation & Staging Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Target Communities or Current Address
                  </label>
                  <input
                    type="text"
                    value={formData.targetCommunities}
                    onChange={(e) => setFormData({ ...formData, targetCommunities: e.target.value })}
                    placeholder="e.g., St. Pete Waterfront, Lutz, Carrollwood, South Tampa"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                  Lifestyle Goals, Timeline & Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share your ideal move timeframe, school or boating requirements, or property details..."
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg disabled:opacity-50"
              >
                {submitting ? "Routing to Rachael Garnett..." : "Schedule Consultation With Rachael Garnett"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── TOP 10 CLIENT QUESTIONS (AEO / GEO / SEO) ───────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-[#111111]/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Direct &amp; Transparent Answers
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Rachael Garnett: Top 10 Questions
            </h2>
            <p className="text-[#111111]/60 font-light text-sm md:text-base leading-relaxed">
              Straightforward answers to the questions clients ask most when buying, selling, or investing across Tampa Bay.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What areas of Tampa Bay do you serve?",
                a: "I work throughout Hillsborough, Pinellas, and Pasco counties, including Tampa, Carrollwood, Brandon, St. Petersburg, Clearwater, and Wesley Chapel. If you're looking in a nearby market, I'm happy to help or connect you with a trusted partner.",
              },
              {
                q: "Do you work with both residential and commercial clients?",
                a: "Yes. I help with single-family homes, condos, and investment properties, as well as commercial space for businesses and investors.",
              },
              {
                q: "How do you help buyers compete in a fast-moving market?",
                a: "We get you pre-approved early, set clear priorities, and move quickly when the right property appears. I'll also help you build a strong offer, not just a high one.",
              },
              {
                q: "How do you determine the right price to list my home?",
                a: "I use recent comparable sales, current competition, and local market trends, then walk you through the numbers so you understand the strategy behind the price.",
              },
              {
                q: "How will you market my property?",
                a: "Professional photography, strong online exposure through the MLS and major listing sites, social media, and targeted outreach to buyers and agents.",
              },
              {
                q: "What should I know about flood zones, insurance, and hurricane season?",
                a: "These matter a great deal in Tampa Bay. I'll help you check flood zone status, understand insurance costs before you make an offer, and know what inspections to request.",
              },
              {
                q: "What does the process look like from start to close?",
                a: "We start with a conversation about your goals, then move through strategy, search or listing, offer, inspections, financing, and closing. I'll keep you updated at every step.",
              },
              {
                q: "How do we communicate during the process?",
                a: "However works best for you: call, text, or email. You'll always know where things stand.",
              },
              {
                q: "What are the costs involved in buying or selling?",
                a: "Costs vary by deal, but typically include agent commission, title and closing fees, inspections, and prorated taxes. I'll give you a clear estimate up front so there are no surprises.",
              },
              {
                q: "How do I get started?",
                a: "Reach out by phone, email, or the contact form on this page. We'll have a no-pressure conversation about your goals and timeline.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-2xl bg-[#fbfbf9] border border-[#111111]/8 hover:border-[#C8A951] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-aiveritas text-xl md:text-2xl text-[#9A7D3A] shrink-0 font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-aiveritas text-lg md:text-xl text-[#111111] mb-2 font-bold">
                      {faq.q}
                    </h3>
                    <p className="text-xs md:text-sm text-[#111111]/75 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}

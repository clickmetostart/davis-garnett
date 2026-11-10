"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  LandPlot,
  Briefcase,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  CheckCircle2,
  Compass,
  FileSpreadsheet,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import SiteFooter from "@/components/SiteFooter";

const ACTIVE_LISTINGS = [
  {
    address: "126 Ridgewood Ave (& 613 E Morgan St), Brandon, FL 33510",
    slug: "126-ridgewood-ave-brandon",
    price: "$845,000",
    category: "Commercial & Residential Mixed-Use (2 Buildings • MLS# TB8479570)",
    specs: "2,872 Total SqFt • 0.39 Acres • 1 Block Off Brandon Blvd (Hwy 60) • Separate Meters",
    image: "/listings/ridgewood-brandon-2.jpg",
    highlights: [
      "Building 1 (126 Ridgewood Ave): 1,832 SqFt block residential/office with 2BD/2BA, full kitchen & flex room",
      "Building 2 (613 E Morgan St): 1,040 SqFt commercial office with 4 private offices, 2 waiting rooms & 6 paved spaces",
      "Independent electric and water meters for effortless dual-tenancy or owner-user occupancy",
    ],
  },
  {
    address: "770 Old Stokes Rd, Frostproof, FL 33843",
    slug: "770-old-stokes-rd-frostproof",
    price: "$3,550,000",
    category: "79.54 Acres MOL • Central FL Commercial & Development Tract (MLS# TB8506525)",
    specs: "79.54 Contiguous Acres (3,464,762 SqFt) • US Hwy 98 Just West of US Hwy 27 • $44,632/Acre",
    image: "/listings/old-stokes-road-cover-image-davis-garnett.jpg",
    highlights: [
      "Direct frontage along US Hwy 98 just west of US Hwy 27 in Polk County's central logistics spine",
      "Within 90 minutes of Tampa, Orlando, major deepwater ports, and international airports",
      "Ideal for residential subdivision, commercial/industrial logistics, or 1031 exchange land banking",
    ],
  },
  {
    address: "NE 90th Street Rd, Fort McCoy, FL 32134",
    slug: "ne-90th-street-rd-fort-mccoy",
    price: "$350,000",
    category: "19.72 Acres • Gated Agricultural & Timberland Tract (MLS# TB8520776)",
    specs: "19.72 High & Dry Acres (858,823 SqFt) • A-1 General Agriculture • No HOA / No CDD",
    image: "/listings/d-g-land-listing-cover.webp",
    highlights: [
      "Pristine Old Florida timberland near Ocala National Forest and the Ocklawaha River",
      "Mature merchantable pine and native hardwood canopy with A-1 General Agriculture zoning",
      "Secured gated access with motion-sensor security monitoring ($17,750/Acre)",
    ],
  },
];

const SOLD_2026_TRANSACTIONS = [
  {
    property: "9635 Joe Ebert Rd, Seffner, FL 33584",
    location: "Seffner / Hillsborough County",
    type: "3BD/2BA • 1,867 SqFt No-HOA Residence ($450,000)",
    year: "2026 Sold",
    role: "Commercial & Residential Advisor",
  },
  {
    property: "3537 Valencia Cove Ct, Land O' Lakes, FL 34639",
    location: "Plantation Palms Golf Club • Pasco County",
    type: "4BD/3BA • 2,518 SqFt Golf Community Estate ($550,000)",
    year: "2026 Sold",
    role: "Davis & Garnett Team Representation",
  },
  {
    property: "3037 Downan Point Dr, Land O' Lakes, FL 34638",
    location: "Ballantrae • Pasco County (MLS# TB8490089)",
    type: "5BD/3BA • 2,260 SqFt Residence ($450,000)",
    year: "2026 Sold",
    role: "Davis & Garnett Team Representation",
  },
  {
    property: "5764 Meadowlane St, New Port Richey, FL 34652",
    location: "New Port Richey • Pasco County (MLS# TB8300827)",
    type: "0.11-Acre (5,000 SqFt) Residential Infill Lot ($56,000)",
    year: "2026 Sold",
    role: "Commercial & Residential Advisor",
  },
  {
    property: "133rd Ave SE, Dunnellon, FL 34431",
    location: "Rainbow Lakes Estates • Marion County",
    type: "0.25-Acre (10,890 SqFt) Buildable Homesite ($9,000)",
    year: "2026 Sold",
    role: "Commercial & Residential Advisor",
  },
];

export default function MarkDavisAdvisorPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    assetFocus: "Commercial / Mixed-Use Acquisition",
    budgetOrAcreage: "",
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
          source: "Mark Davis Executive Profile (/about/mark-davis)",
          owner: "mark@davisgarnettsells.com",
          pipelineStage: "New Commercial/Land Lead",
          buySideConfig: {
            budget: formData.budgetOrAcreage || "TBD",
            preApprovalStatus: formData.assetFocus,
            timeframe: "Immediate Consultation",
          },
          notes: `[Mark Davis Direct Inquiry — ${formData.assetFocus}] ${formData.notes}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Unable to submit online right now. Please call Mark directly at 941-737-4127.");
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
            <Link href="/about/rachael-garnett" className="hover:text-[#9A7D3A]">
              Meet Rachael Garnett (#3378601) →
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
                src="/new-images/new-2/mark-davis-residential-commerical-advisor-tampa-real-estate-3.jpg"
                alt="Mark Davis, REALTOR® — Certified Commercial & Residential Agent (#3209459)"
                fill
                priority
                unoptimized
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded bg-[#C8A951] text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  REALTOR® • FL License #3209459
                </span>
                <p className="font-aiveritas text-2xl">Mark Davis, REALTOR®</p>
                <p className="text-xs text-white/75">
                  Align Right Realty Carrollwood • License #BK3401606
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Co-Founder &amp; REALTOR® · Certified Commercial &amp; Residential Agent
            </span>
            <h1 className="font-aiveritas text-5xl md:text-6xl text-[#111111] leading-[1.08] mb-6">
              Mark Davis
            </h1>
            <p className="text-xl text-[#9A7D3A] font-light mb-6">
              REALTOR® · Certified Commercial &amp; Residential Agent • Helping Buyers, Sellers &amp; Investors Across Homes, Commercial Properties, Land &amp; Condos
            </p>
            <p className="text-base text-[#111111]/75 font-light leading-relaxed mb-6">
              Mark Davis is a full-spectrum <strong className="font-semibold text-[#111111]">Commercial &amp; Residential Advisor</strong> who represents buyers, sellers, and investors across commercial mixed-use, single-family residential, agricultural/development land, condos, and luxury estates. Grounded in deep market knowledge and thoughtful guidance, Mark brings disciplined underwriting, clear communication, and personal care to every client—whether structuring a dual-building mixed-use asset in Brandon, evaluating 80 acres in Polk County, or helping a family buy or sell a home across Hillsborough and Pasco counties.
            </p>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed mb-8">
              As co-founder of <strong className="font-semibold text-[#111111]">Davis &amp; Garnett</strong> alongside fellow Commercial &amp; Residential Advisor Rachael Garnett, Mark and Rachael serve as <strong className="font-semibold text-[#111111]">real estate powerhouses of knowledge and expertise</strong>—modestly grateful for every opportunity to serve, treating every client with genuine respect for the value their property brings to the community, and happy to help navigate those waters.
            </p>

            {/* Direct Contact Bar */}
            <div className="grid sm:grid-cols-3 gap-4 p-6 rounded-xl bg-[#f5f3ef] border border-[#111111]/10 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold block mb-1">
                  Direct Cell
                </span>
                <a
                  href="tel:941-737-4127"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#9A7D3A]"
                >
                  <Phone className="w-4 h-4 text-[#9A7D3A]" />
                  941-737-4127
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold block mb-1">
                  Direct Email
                </span>
                <a
                  href="mailto:mark@davisgarnettsells.com"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#9A7D3A] break-all"
                >
                  <Mail className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                  mark@davisgarnettsells.com
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold block mb-1">
                  Credentials
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#111111]">
                  <ShieldCheck className="w-4 h-4 text-[#9A7D3A]" />
                  FL Lic. #3209459
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#mark-consultation"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Request Commercial / Land Underwriting
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#active-listings"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] transition-colors rounded-lg"
              >
                View Active Commercial & Land Listings
              </a>
            </div>
          </div>
        </div>

        {/* Career Metrics Strip */}
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#111111]/10">
          {[
            { metric: "#3209459", label: "Florida Real Estate License" },
            { metric: "99.26+ Ac", label: "Active Florida Land Inventory" },
            { metric: "$4.745M", label: "Current Exclusive Commercial & Land Mandates" },
            { metric: "15+ Counties", label: "Tampa Bay & Central FL Advisory Footprint" },
          ].map((item) => (
            <div key={item.label} className="bg-[#f5f3ef] p-6 rounded-xl border border-[#111111]/8">
              <div className="font-aiveritas text-3xl md:text-4xl text-[#9A7D3A] mb-1">
                {item.metric}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/65 font-bold">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ── ACTIVE COMMERCIAL & LAND LISTINGS ────────────────────────────── */}
      <section id="active-listings" className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                Exclusive Representation · Active Offerings
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111]">
                Mark&apos;s Active Commercial & Land Portfolio
              </h2>
            </div>
            <p className="text-sm text-[#111111]/65 max-w-md font-light">
              Direct offering memorandums, boundary surveys, zoning verification packets, and private site tours available upon request.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {ACTIVE_LISTINGS.map((listing) => (
              <div
                key={listing.address}
                className="bg-white rounded-2xl overflow-hidden border border-[#111111]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#111111]">
                    <Image
                      src={listing.image}
                      alt={listing.address}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A]">
                      Active Exclusive Mandate
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <span className="font-aiveritas text-3xl text-[#C8A951]">
                        {listing.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] block mb-2">
                      {listing.category}
                    </span>
                    <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                      {listing.address}
                    </h3>
                    <p className="text-xs text-[#111111]/60 font-medium mb-5 pb-4 border-b border-[#111111]/10">
                      {listing.specs}
                    </p>
                    <ul className="space-y-2.5 mb-6">
                      {listing.highlights.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-xs text-[#111111]/75 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  <a
                    href="#mark-consultation"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        assetFocus: `Offering Memorandum Request: ${listing.address}`,
                      }))
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
                  >
                    Request Offering Package <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE SPECIALIZATION PILLARS ──────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Institutional Advisory Capabilities
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              Commercial, Mixed-Use & Land Specialization
            </h2>
            <p className="text-base text-[#111111]/65 font-light">
              Comprehensive deal execution engineered for commercial owner-occupants, land developers, and private capital investors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Mixed-Use & Owner-User Commercial",
                desc: "Acquisition and disposition of street-front retail, professional medical/office buildings, and mixed-use commercial corridors across Brandon, Tampa, and Wesley Chapel.",
              },
              {
                icon: LandPlot,
                title: "Acreage, Groves & Transitional Land",
                desc: "Strategic marketing and sourcing of 10 to 500+ acre parcels across Polk, Marion, Pasco, and eastern Hillsborough counties—Evaluating FLU (Future Land Use), wetlands, and access.",
              },
              {
                icon: Briefcase,
                title: "Industrial, Warehouse & Flex Assets",
                desc: "Site selection and lease/purchase negotiation along the I-4, I-75, and Port Tampa Bay logistics corridors for distribution, light manufacturing, and contractor yards.",
              },
              {
                icon: FileSpreadsheet,
                title: "1031 Tax-Deferred Exchange Advisory",
                desc: "Coordinating strict 45-day identification and 180-day closing windows alongside qualified intermediaries to transition equity from appreciated land or residential rentals into triple-net (NNN) assets.",
              },
              {
                icon: BarChart3,
                title: "Cap Rate, NOI & Pro-Forma Underwriting",
                desc: "Delivering realistic rent-roll audits, T-12 expense verification, debt-coverage modeling, and highest-and-best-use valuation opinions.",
              },
              {
                icon: Compass,
                title: "Corporate & Business Relocations",
                desc: "Helping out-of-state companies establish their Florida headquarters while seamlessly partnering with Rachael Garnett to relocate key executives and their families.",
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

      {/* ── 2026 SOLD & TRANSACTION TRACK RECORD ─────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white border-b border-[#C8A951]/20">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                Proven Execution
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-white">
                2026 Commercial & Land Transaction Highlights
              </h2>
            </div>
            <p className="text-sm text-white/65 max-w-md font-light">
              Representative commercial, industrial, and land advisory engagements executed across the Greater Tampa Bay & Central Florida region.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-[10px] uppercase tracking-[0.2em] text-[#C8A951]">
                  <th className="py-4 pr-6">Asset / Transaction</th>
                  <th className="py-4 px-6">Submarket</th>
                  <th className="py-4 px-6">Asset Class</th>
                  <th className="py-4 px-6">Advisory Role</th>
                  <th className="py-4 pl-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {SOLD_2026_TRANSACTIONS.map((tx) => (
                  <tr key={tx.property} className="hover:bg-white/5 transition-colors">
                    <td className="py-5 pr-6 font-semibold text-white">{tx.property}</td>
                    <td className="py-5 px-6 text-white/70">{tx.location}</td>
                    <td className="py-5 px-6 text-white/70">{tx.type}</td>
                    <td className="py-5 px-6 text-white/70">{tx.role}</td>
                    <td className="py-5 pl-6 text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#C8A951]/20 text-[#C8A951] text-xs font-bold">
                        {tx.year}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Investor & Principal Endorsements
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111]">
              What Commercial & Land Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Mark evaluated our mixed-use acquisition in Brandon like a true institutional underwriter. He spotted zoning upside and lease-escalation leverage that immediately improved our Day-1 cash flow.",
                author: "David R.",
                role: "Managing Partner, Gulf Coast Commercial Holdings",
              },
              {
                quote:
                  "Selling nearly 80 acres of rural and agricultural land requires an advisor who understands soil, access easements, and qualified land buyers. Mark's marketing reach across Florida is unmatched.",
                author: "Thomas & Evelyn M.",
                role: "Polk & Marion County Landowners",
              },
              {
                quote:
                  "When we relocated our distribution operation to Tampa Bay, Mark handled our warehouse facility while Rachael found our family's home. Having both specialists on one team saved us months.",
                author: "Marcus V.",
                role: "CEO, Southeast Logistics Group",
              },
            ].map((item) => (
              <div
                key={item.author}
                className="p-8 rounded-2xl bg-[#f5f3ef] border border-[#111111]/8 flex flex-col justify-between"
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

      {/* ── DIRECT CONSULTATION FORM FOR MARK DAVIS ──────────────────────── */}
      <section id="mark-consultation" className="py-28 px-6 md:px-12 bg-[#f5f3ef]">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-14 border border-[#111111]/10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Direct Commercial & Land Desk
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Consult Directly With Mark Davis
            </h2>
            <p className="text-sm text-[#111111]/65 font-light">
              FL Real Estate License #3209459 • Direct: 941-737-4127 • mark@davisgarnettsells.com
            </p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-xl bg-[#fbfbf9] border border-[#C8A951] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                Inquiry Routed to Mark Davis (#3209459)
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-md mx-auto mb-6">
                Thank you, {formData.firstName}. Mark has received your commercial/land request and will follow up directly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                Send Another Message
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
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Mandate / Property Inquiry
                  </label>
                  <select
                    value={formData.assetFocus}
                    onChange={(e) => setFormData({ ...formData, assetFocus: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  >
                    <option>Commercial / Mixed-Use Acquisition</option>
                    <option>Offering Memorandum Request: 126 Ridgewood Ave, Brandon ($845K)</option>
                    <option>Offering Memorandum Request: 770 Old Stokes Rd, Frostproof ($3.55M / 79.54 Ac)</option>
                    <option>Offering Memorandum Request: NE 90th Street Rd, Fort McCoy ($350K / 19.72 Ac)</option>
                    <option>Commercial or Land Disposition / Valuation Opinion (BOV)</option>
                    <option>1031 Tax-Deferred Exchange Identification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Target Budget / Acreage / Cap Rate
                  </label>
                  <input
                    type="text"
                    value={formData.budgetOrAcreage}
                    onChange={(e) => setFormData({ ...formData, budgetOrAcreage: e.target.value })}
                    placeholder="e.g., $1M - $5M or 20+ Acres"
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                  Transaction Requirements & Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share property details, zoning requirements, or due diligence questions..."
                  className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg disabled:opacity-50"
              >
                {submitting ? "Routing to Mark Davis..." : "Schedule Consultation With Mark Davis"}
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
              Mark Davis: Top 10 Questions
            </h2>
            <p className="text-[#111111]/60 font-light text-sm md:text-base leading-relaxed">
              Straightforward answers to the questions clients ask most when buying, selling, or investing in commercial and residential properties.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What areas of Tampa Bay do you serve?",
                a: "I work across Hillsborough, Pinellas, and Pasco counties, from Tampa and Carrollwood to St. Petersburg, Clearwater, and Wesley Chapel.",
              },
              {
                q: "Do you handle both commercial and residential real estate?",
                a: "Yes. I advise homebuyers and sellers as well as business owners, investors, and tenants looking for commercial space.",
              },
              {
                q: "What should I know before buying a home in Tampa Bay?",
                a: "Know your budget, get pre-approved, and factor in insurance, HOA fees, and flood zone status early. Those costs can change what a home really costs each month.",
              },
              {
                q: "How do you help sellers get the best result?",
                a: "Smart pricing, strong presentation, and wide exposure. I'll advise you on what's worth fixing before listing and what isn't.",
              },
              {
                q: "How do you approach commercial real estate for businesses?",
                a: "I start with your business needs: location, size, traffic, zoning, and budget. Then I search for options, including listings on commercial platforms like LoopNet.",
              },
              {
                q: "Can you help me find an investment property?",
                a: "Yes. I'll help you evaluate properties based on location, rental demand, expenses, and long-term potential, so you can make a decision based on the numbers.",
              },
              {
                q: "What's the market like right now?",
                a: "Conditions vary by neighborhood and property type, so I'll show you current data for the specific area you're considering rather than a general headline.",
              },
              {
                q: "Should I buy first or sell first?",
                a: "It depends on your finances, timeline, and comfort with risk. We'll map out the options and choose the approach that fits your situation.",
              },
              {
                q: "What are the closing costs, and who pays what?",
                a: "Typical costs include title and closing fees, inspections, lender fees, and prorated taxes. I'll provide an estimate early so you can plan.",
              },
              {
                q: "How do I get started?",
                a: "Call, email, or use the contact form on this page. We'll talk through your goals, timeline, and next steps with no pressure.",
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

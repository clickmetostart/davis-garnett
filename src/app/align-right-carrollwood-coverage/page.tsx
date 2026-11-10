"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Building2,
  Compass,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  Layers,
  Trees,
  Waves,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";

const COVERAGE_REGIONS = [
  {
    title: "Carrollwood & Northwest Hillsborough (Brokerage HQ)",
    tag: "Brokerage Headquarters & Operational Core",
    badge: "Office Base",
    img: "/new-images/new-2/davis-garnett-align-right-realty.jpg",
    fallbackImg: "/city-photos/downtown-tampa-skyline.jpg",
    address: "3903 Northdale Blvd Suite 115W, Tampa, FL 33624",
    corridors: "Dale Mabry Hwy • Northdale Blvd • Veterans Expwy • Citrus Park",
    desc: "The central command post for Align Right Realty Carrollwood (License #BK3401606). Serving as the private conference hub where Mark Davis and Rachael Garnett host confidential contract reviews, commercial underwriting presentations, and portfolio consultations.",
    capabilities: [
      "Principal Brokerage Compliance & Escrow Review",
      "Dale Mabry & Northdale Commercial Medical/Professional Office",
      "Executive Golf Communities & Gated Single-Family Enclaves",
      "Immediate Arterial Access to I-275, Veterans Expressway & TPA Airport",
    ],
    href: "/about/align-right-realty-carrollwood",
    linkText: "Brokerage Office Profile",
  },
  {
    title: "Downtown Tampa & South Tampa Urban Core",
    tag: "Luxury Condos & Commercial Mixed-Use",
    badge: "Urban Core",
    img: "/city-photos/downtown-tampa-skyline.jpg",
    address: "Hillsborough County • South Tampa",
    corridors: "Water Street • Bayshore Blvd • Channelside • Westshore",
    desc: "Advising buyers, sellers, and corporate executives across Tampa's premier urban transformation zones. From trophy penthouses in Water Street to historic estates along Bayshore Boulevard and commercial developments in the Westshore business district.",
    capabilities: [
      "Water Street & Channelside Luxury High-Rise Condominiums",
      "Bayshore Boulevard & Hyde Park Trophy Waterfront Estates",
      "Westshore Urban Core Commercial Mixed-Use & Office Redevelopment",
      "Executive Relocation & Private Wealth Representation",
    ],
    href: "/knowledge-hub/areas/tampa-downtown-water-street",
    linkText: "Explore Downtown Tampa Guide",
  },
  {
    title: "St. Pete Downtown & Beaches",
    tag: "Deepwater Estates & Coastal Properties",
    badge: "Pinellas Coast",
    img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-saint-petersburg-downtown-and-beaches-florida.jpg",
    address: "Pinellas County • St. Pete & Gulf Beaches",
    corridors: "Bahama Shores • Snell Isle • Old Northeast • Tierra Verde",
    desc: "Extensive transaction advisory across the Tampa Bay peninsula. Rachael Garnett and Mark Davis guide private clients through complex riparian rights, private dock permitting, coastal wind/flood mitigation, and high-value sales in St. Petersburg's most historic waterfront enclaves.",
    capabilities: [
      "Bahama Shores & Snell Isle Deepwater Boating Estates",
      "Downtown St. Pete Luxury High-Rise & Boutique Retail Assets",
      "Historic Old Northeast Single-Family Preservation & Renovations",
      "Gulf Coast Barrier Island Waterfront Dispositions",
    ],
    href: "/knowledge-hub/areas/st-petersburg",
    linkText: "Explore St. Petersburg Guide",
  },
  {
    title: "Clearwater & Pinellas County Coastal Enclaves",
    tag: "World-Class Gulf Coast Beaches & Waterfront Condos",
    badge: "Gulf Coast",
    img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-clearwater-beach-pinellas-county-florida.jpg",
    address: "Pinellas County • Clearwater Beach, Sand Key & Belleair",
    corridors: "Clearwater Beach • Sand Key • Belleair Shore • Island Way • Dunedin",
    desc: "Premier beachfront condo and coastal luxury estate representation across Northern Pinellas County. From resort-amenity penthouses on Clearwater Beach allowing flexible rental schedules to secluded, private deepwater compounds in Sand Key and Belleair.",
    capabilities: [
      "Clearwater Beach Resort-Zoned Waterfront Condominium Assets",
      "Sand Key Private Gulf-to-Intracoastal Luxury Residences",
      "Town of Belleair & Belleair Shore Historic Estate Mansions",
      "Intracoastal Deep-Water Docks & Pinellas Causeway Mobility",
    ],
    href: "/knowledge-hub/areas/clearwater-pinellas-county",
    linkText: "Explore Clearwater & Pinellas Guide",
  },
  {
    title: "Wesley Chapel & North Pasco Growth Corridor",
    tag: "Master-Planned Communities & High-Growth Retail",
    badge: "Growth Epicenter",
    img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-westley-chapel-florida.jpg",
    address: "Pasco County • Wesley Chapel",
    corridors: "SR-54 • SR-56 • Two Rivers • Wiregrass Ranch • Epperson",
    desc: "One of the fastest-growing residential and commercial sub-markets in the Southeastern United States. Mark Davis and Rachael Garnett assist new home buyers in securing builder flex incentives and buydowns, while simultaneously advising commercial investors on outparcel acquisitions along SR-54.",
    capabilities: [
      "Two Rivers & Wiregrass Master-Planned Community Acquisitions",
      "Crystal Lagoon Enclaves (Epperson & Mirada Builder Buydowns)",
      "Commercial Outparcels, Strip Centers & Pad Site Sourcing",
      "Pasco County Impact Fee & Growth Management Consultation",
    ],
    href: "/knowledge-hub/areas/wesley-chapel",
    linkText: "Explore Wesley Chapel Guide",
  },
  {
    title: "Land O' Lakes & Central Pasco",
    tag: "Life Sciences & Equestrian/Acreage Estates",
    badge: "Pasco Innovation",
    img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-land-o-lakes-florida.jpg",
    address: "Pasco County • Land O' Lakes",
    corridors: "Angeline • Connerton • Sunlake Blvd • US Hwy 41",
    desc: "Direct advisory anchored around the 6,000+ acre Angeline life-sciences corridor and H. Lee Moffitt Cancer Center research park. Serving clients seeking custom luxury acreage, equestrian parcels, or newly constructed single-family homes in Connerton and Bexley.",
    capabilities: [
      "Angeline Life Sciences Research Park Growth Alignment",
      "Connerton & Bexley Master-Planned Family Communities",
      "Equestrian Properties, Hobby Farms & No-CDD Acreage",
      "US-41 Commercial Infill & Flex Industrial Lots",
    ],
    href: "/knowledge-hub/areas/land-o-lakes",
    linkText: "Explore Land O' Lakes Guide",
  },
  {
    title: "Keystone (The Rural & Equestrian Escape)",
    tag: "Acreage Compounds, ASC-1 Zoning & Private Lakes",
    badge: "Rural & Equestrian",
    img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-keystone-florida.jpg",
    address: "Northwest Hillsborough County • Keystone & Odessa",
    corridors: "Tarpon Springs Rd • Gunn Hwy • Lake Keystone • Lake Pretty",
    desc: "If you want space, privacy, and zero HOA restrictions, Keystone is Hillsborough County's premier rural and equestrian retreat. Custom-built residences on 1 to 5+ acres with private ponds, detached workshops, and horse barns.",
    capabilities: [
      "ASC-1 Agricultural Single-Family Conventional Zoning Guidance",
      "Private Ski Lakefront Estates with Riparian Permitting",
      "Zero-CDD & No-HOA Freedom for Secondary Workshops & Barns",
      "Expansive Acreage Buffer Parcels within 25 Min of TPA",
    ],
    href: "/knowledge-hub/areas/keystone",
    linkText: "Explore Keystone Guide",
  },
  {
    title: "Cheval & Upscale Lutz",
    tag: "Gated Golf Enclaves, 24-Hr Security & Top Schools",
    badge: "Gated Country Club",
    img: "/new-images/new-2/davis-garnett-tampa-residential-real-estate-cheval.jpg",
    address: "Northwest Hillsborough County • Lutz-Lake Fern Corridor",
    corridors: "Lutz-Lake Fern Rd • Dale Mabry Hwy • Cheval Blvd",
    desc: "For buyers seeking prestigious country-club amenities, 24-hour manned gatehouse security, and championship golf along the Lutz-Lake Fern corridor. Mediterranean-inspired estates and golf-course frontage homes.",
    capabilities: [
      "Cheval Golf & Athletic Club Village Estate Acquisitions",
      "24-Hour Manned Guard-Gated Security & Village Privacy",
      "Zoning for Top Steinbrenner & Martinez Public Schools",
      "Immediate Veterans Expressway Access for Executive Commuters",
    ],
    href: "/knowledge-hub/areas/cheval",
    linkText: "Explore Cheval Guide",
  },
  {
    title: "Brandon, Riverview & East Hillsborough",
    tag: "Hwy 60 Commercial Spine & Established Residential",
    badge: "Commercial Corridor",
    img: "/new-images/new-2/dg-brandon-hwy60.jpg",
    address: "East Hillsborough County • Brandon & Riverview",
    corridors: "SR-60 (Brandon Blvd) • I-75 • Selmon Expwy • Seffner",
    desc: "A powerhouse commercial arterial anchored by heavy daily traffic counts and resilient suburban demand. Highlighted by our active multi-building commercial listing at 126 Ridgewood Ave just off Hwy 60, alongside residential sales in Seffner and Riverview.",
    capabilities: [
      "Hwy 60 Free-Standing Commercial & Medical Office Assets",
      "Mixed-Use Commercial/Residential Compound Structuring",
      "Seffner & Valrico Established Residential with Low/No HOA Fees",
      "I-75 & Selmon Expressway Logistics & Distribution Proximity",
    ],
    href: "/knowledge-hub/areas/brandon-riverview",
    linkText: "Explore Brandon & Riverview Guide",
  },
  {
    title: "Central Florida Commercial, Timber & Agricultural Acreage",
    tag: "Multi-Acre Land Dispositions & Greenbelt Tax Strategies",
    badge: "Land & Acreage",
    img: "/city-photos/central-fl-acreage.jpg",
    address: "Marion & Polk Counties • Fort McCoy & Frostproof",
    corridors: "US Hwy 98 • US Hwy 27 • NE 90th St Rd • Old Stokes Rd",
    desc: "Specialized rural and commercial land advisory spanning Florida's agricultural spine. From 19.72 acres of mature timberland in Fort McCoy (MLS# TB8520776) to 79.54 commercial/citrus acres in Frostproof (MLS# TB8506525), Mark Davis delivers 5-point land due diligence.",
    capabilities: [
      "Florida Greenbelt Statute 193.461 Agricultural Tax Classification",
      "Merchantable Pine & Hardwood Timberland Appraisals",
      "Highway Frontage Commercial Re-zoning & Industrial Logistics",
      "Floridan Aquifer Well Depth & Phase I Environmental Verification",
    ],
    href: "/knowledge-hub/areas/central-florida-acreage",
    linkText: "Explore Central Florida Acreage Guide",
  },
];

export default function AlignRightCarrollwoodCoveragePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "Carrollwood & Greater Tampa Bay",
    transactionType: "Commercial Advisory",
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
          source: "Align Right Carrollwood Coverage Page (/align-right-carrollwood-coverage)",
          pipelineStage: "Territory Coverage Inquiry",
          notes: `[Align Right Carrollwood Coverage #BK3401606 — Region: ${formData.region} | Type: ${formData.transactionType}] ${formData.notes}`,
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

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="pt-28 pb-4 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[#9A7D3A] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">
            <Link href="/about/align-right-realty-carrollwood" className="hover:text-[#9A7D3A]">
              Carrollwood Office Profile
            </Link>
            <span>|</span>
            <Link href="/about/mark-davis" className="hover:text-[#9A7D3A]">
              Mark Davis (#3209459)
            </Link>
            <span>|</span>
            <Link href="/about/rachael-garnett" className="hover:text-[#9A7D3A]">
              Rachael Garnett (#3378601)
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <header className="relative py-20 px-6 md:px-12 bg-[#111111] text-white border-b border-[#ef5728]/30 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef5728]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 border border-[#ef5728]/50 text-[10px] uppercase tracking-[0.25em] font-bold text-[#ef5728]">
                Align Right Realty Carrollwood • FL Lic #BK3401606
              </span>
              <span className="inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-[10px] uppercase tracking-widest text-white/70 font-semibold">
                Davis &amp; Garnett Advisory Territory
              </span>
            </div>

            <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              ALIGNED CORRECTLY REAL ESTATE
            </span>
            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] mb-6">
              Areas We Work In.
            </h1>

            <p className="text-lg md:text-xl text-white/85 font-light leading-relaxed mb-6">
              Our footprint spans the most lucrative residential waterfronts, suburban growth corridors, and commercial investment zones across Greater Tampa Bay and Central Florida.
            </p>

            <p className="text-sm md:text-base text-white/65 font-light leading-relaxed mb-8">
              Operating out of our principal brokerage headquarters in Carrollwood, Mark Davis and Rachael Garnett combine boutique partner-level advocacy with Align Right Realty Carrollwood&apos;s institutional compliance, Stellar MLS syndication, and statewide commercial infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#coverage-regions"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#ef5728] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#111111] transition-colors rounded-lg shadow-lg"
              >
                View Regional Footprint <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#territory-consultation"
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/25 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors rounded-lg"
              >
                Consult on Your Market
              </a>
            </div>
          </div>

          {/* Brokerage Identity Box */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl relative">
            <div className="relative w-56 h-16 mb-6">
              <Image
                src="/align-right-email-logo.png"
                alt="Align Right Realty Carrollwood"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#ef5728] font-bold block mb-1">
                  Carrollwood Operational Command Post
                </span>
                <p className="font-aiveritas text-xl text-white">
                  Align Right Realty Carrollwood
                </p>
                <p className="text-white/60 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ef5728]" />
                  3903 Northdale Blvd Suite 115W, Tampa, FL 33624
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block">Broker License</span>
                  <span className="text-white font-bold text-sm">#BK3401606</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block">Office Desk</span>
                  <span className="text-white font-bold text-sm">(813) 374-6050</span>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-white/75">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Mark Davis — Co-Founder &amp; Principal Advisor (#3209459)
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Rachael Garnett — Co-Founder &amp; Principal Advisor (#3378601)
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Serving 5 Major Florida Counties from Carrollwood
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── CORE STATS TICKER ────────────────────────────────────────────── */}
      <section className="py-8 px-6 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-aiveritas text-2xl md:text-3xl text-[#111111] block">5 Counties</span>
            <span className="text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">Hillsborough, Pinellas, Pasco, Polk &amp; Marion</span>
          </div>
          <div>
            <span className="font-aiveritas text-2xl md:text-3xl text-[#9A7D3A] block">Dual-Asset</span>
            <span className="text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">Commercial Mixed-Use &amp; Luxury Estates</span>
          </div>
          <div>
            <span className="font-aiveritas text-2xl md:text-3xl text-[#111111] block">Stellar MLS</span>
            <span className="text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">Statewide Syndication &amp; Regional Feeds</span>
          </div>
          <div>
            <span className="font-aiveritas text-2xl md:text-3xl text-[#9A7D3A] block">100% Principal</span>
            <span className="text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">Direct Mark Davis &amp; Rachael Garnett Access</span>
          </div>
        </div>
      </section>

      {/* ── DETAILED COVERAGE REGIONS ─────────────────────────────────────── */}
      <section id="coverage-regions" className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Regional Geographic Scope
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-6">
              Our Strategic Focus Markets &amp; Regional Corridors
            </h2>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed">
              Every market we cover is backed by hyper-local transactional data, active client representation, and on-the-ground field inspections. Below are the key corridors served directly out of Align Right Realty Carrollwood.
            </p>
          </div>

          <div className="space-y-10">
            {COVERAGE_REGIONS.map((region, idx) => (
              <div
                key={region.title}
                className="bg-white rounded-2xl border border-[#111111]/10 shadow-md hover:shadow-xl hover:border-[#D4AF37] transition-all overflow-hidden grid lg:grid-cols-12 gap-0"
              >
                {/* Visual Banner */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[260px] overflow-hidden bg-[#222]">
                  <Image
                    src={region.img}
                    alt={region.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
                      Zone 0{idx + 1} • {region.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-white/75 font-mono flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ef5728]" />
                      {region.corridors}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A7D3A] font-bold block mb-1">
                      {region.tag}
                    </span>
                    <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111111] mb-3">
                      {region.title}
                    </h3>
                    <p className="text-sm text-[#111111]/70 font-light leading-relaxed mb-6">
                      {region.desc}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2.5 mb-6 pt-4 border-t border-[#111111]/8">
                      {region.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2 text-xs text-[#111111]/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7D3A] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#111111]/8 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-[#111111]/50 font-medium">
                      Managed by Mark Davis &amp; Rachael Garnett
                    </span>
                    <Link
                      href={region.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111111] transition-colors"
                    >
                      {region.linkText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CARROLLWOOD AS COMMAND POST ──────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Strategic Position
            </span>
            <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111111] mb-6">
              Why Carrollwood Serves as Our Geographic Command Post
            </h2>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed mb-6">
              Align Right Realty Carrollwood was intentionally chosen as the base of operations for the Davis &amp; Garnett team due to its unbeatable central mobility across Central Florida:
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8">
                <h4 className="font-bold text-sm text-[#111111] mb-1">
                  15 Minutes to Tampa International Airport (TPA) &amp; Westshore
                </h4>
                <p className="text-xs text-[#111111]/65">
                  Facilitating out-of-state buyers, institutional real estate funds, and corporate relocations stepping off commercial flights.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8">
                <h4 className="font-bold text-sm text-[#111111] mb-1">
                  Instant Access to Pasco Arterials (Veterans, Suncoast &amp; I-275)
                </h4>
                <p className="text-xs text-[#111111]/65">
                  Direct corridor driving to rapid-growth sectors like Two Rivers in Wesley Chapel, Angeline in Land O&apos; Lakes, and downtown St. Petersburg.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8">
                <h4 className="font-bold text-sm text-[#111111] mb-1">
                  Highway 60, I-4 &amp; US-27 Central Florida Connectivity
                </h4>
                <p className="text-xs text-[#111111]/65">
                  Rapid transit east to Brandon commercial assets, Polk County agricultural tracts in Frostproof, and north to Marion County timberland.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Lead Submission */}
          <div id="territory-consultation" className="bg-[#111111] text-white p-8 md:p-12 rounded-2xl border border-[#ef5728]/40 shadow-2xl">
            <span className="text-[#ef5728] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Align Right Carrollwood Advisory Desk
            </span>
            <h3 className="font-aiveritas text-3xl text-white mb-3">
              Request Market Intelligence for Your Area
            </h3>
            <p className="text-xs text-white/70 mb-6 leading-relaxed">
              Connect directly with Mark Davis and Rachael Garnett at Align Right Realty Carrollwood to evaluate property values, zoning regulations, or acquisition targets in your submarket.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-white/5 border border-[#C8A951] text-center">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
                <h4 className="font-aiveritas text-xl text-white mb-2">
                  Market Inquiry Received
                </h4>
                <p className="text-xs text-white/70">
                  Mark Davis or Rachael Garnett will contact you shortly with localized advisory intelligence.
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
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-[#ef5728] outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-[#ef5728] outline-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-[#ef5728] outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-[#ef5728] outline-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#222] border border-white/20 text-white text-sm focus:border-[#ef5728] outline-none"
                  >
                    <option>Carrollwood &amp; Greater Tampa Bay</option>
                    <option>Downtown Tampa / South Tampa</option>
                    <option>St. Petersburg / Pinellas Coast</option>
                    <option>Wesley Chapel / North Pasco</option>
                    <option>Land O&apos; Lakes / Central Pasco</option>
                    <option>Brandon &amp; Riverview (Hwy 60)</option>
                    <option>Central Florida Acreage &amp; Land</option>
                  </select>
                  <select
                    value={formData.transactionType}
                    onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#222] border border-white/20 text-white text-sm focus:border-[#ef5728] outline-none"
                  >
                    <option>Commercial Advisory</option>
                    <option>Luxury Residential</option>
                    <option>Land / Acreage Acquisition</option>
                    <option>1031 Exchange Placement</option>
                    <option>Office Consultation at Carrollwood</option>
                  </select>
                </div>
                <textarea
                  rows={3}
                  placeholder="Tell us about the property, corridor, or transaction details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:border-[#ef5728] outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#ef5728] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#111111] transition-colors rounded-lg shadow-lg"
                >
                  {submitting ? "Transmitting..." : "Submit Regional Inquiry"}
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


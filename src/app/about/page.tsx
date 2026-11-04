"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Award,
  HeartHandshake,
  Users,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Scale,
  Landmark,
  Compass,
  Heart,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function AboutHubPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    advisorPreference: "Both Principal Advisors (Mark & Rachael)",
    inquiryType: "Private Advisory Consultation",
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
          source: "About Collective Hub (/about)",
          advisorPreference: formData.advisorPreference,
          inquiryType: formData.inquiryType,
          notes: `[${formData.inquiryType} | Preferred: ${formData.advisorPreference}] ${formData.notes}`,
          pipelineStage: "New Inquiry",
        }),
      });
      if (!res.ok) throw new Error("Failed to submit inquiry");
      setSubmitted(true);
    } catch {
      setError("We encountered an issue submitting your request. Please call us directly at 941-737-4127.");
    } finally {
      setSubmitting(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Davis & Garnett Real Estate Advisors",
    description:
      "A Higher Standard of Real Estate Advisory in Tampa Bay. Combining institutional-grade commercial & land underwriting with white-glove luxury residential representation at Align Right Realty Carrollwood.",
    url: "https://davisgarnettsells.com/about",
    telephone: "+1-941-737-4127",
    email: "list@davisgarnettsells.com",
    image: "https://davisgarnettsells.com/davis-garnett-real-combo.png",
    priceRange: "$$$-$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3903 Northdale Blvd Suite 115W",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33624",
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "RealEstateAgent",
      name: "Align Right Realty Carrollwood",
      identifier: "FL Real Estate Brokerage License #BK3401606",
    },
    member: [
      {
        "@type": "Person",
        name: "Mark Davis",
        jobTitle: "Commercial & Residential Advisor",
        identifier: "FL License #3209459",
        telephone: "+1-941-737-4127",
        email: "mark@davisgarnettsells.com",
        url: "https://davisgarnettsells.com/about/mark-davis",
      },
      {
        "@type": "Person",
        name: "Rachael Garnett",
        jobTitle: "Commercial & Residential Advisor",
        identifier: "FL License #3378601",
        telephone: "+1-727-808-3344",
        email: "rachael@davisgarnettsells.com",
        url: "https://davisgarnettsells.com/about/rachael-garnett",
      },
    ],
    areaServed: [
      "Tampa",
      "St. Petersburg",
      "Clearwater",
      "Carrollwood",
      "Wesley Chapel",
      "Lutz",
      "Brandon",
      "Sarasota",
      "Polk County",
      "Marion County",
    ],
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProposalNav />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 bg-white border-b border-[#111111]/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[680px] h-[680px] bg-[#C8A951]/8 rounded-full blur-[130px] pointer-events-none -translate-y-1/3 translate-x-1/4" />

        <div className="max-w-screen-xl mx-auto relative z-10">
          {/* Quick Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 pb-10 mb-10 border-b border-[#111111]/10 text-[11px] uppercase tracking-[0.2em] font-bold">
            <span className="text-[#9A7D3A] mr-2">Meet Our Team:</span>
            <Link
              href="/about/mark-davis"
              className="px-3.5 py-1.5 rounded-full bg-[#f5f3ef] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Meet Mark Davis (#3209459)
            </Link>
            <Link
              href="/about/rachael-garnett"
              className="px-3.5 py-1.5 rounded-full bg-[#f5f3ef] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Meet Rachael Garnett (#3378601)
            </Link>
            <Link
              href="/about/align-right-realty-carrollwood"
              className="px-3.5 py-1.5 rounded-full bg-[#f5f3ef] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Align Right Carrollwood (#BK3401606)
            </Link>
            <Link
              href="/about/strategic-partners"
              className="px-3.5 py-1.5 rounded-full bg-[#f5f3ef] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Strategic Partners
            </Link>
            <Link
              href="/about/community-outreach-giving"
              className="px-3.5 py-1.5 rounded-full bg-[#f5f3ef] hover:bg-[#111111] hover:text-white transition-colors"
            >
              Community &amp; Faith Giving
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f5f3ef] border border-[#C8A951]/40 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#9A7D3A]" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A]">
                  About The Davis &amp; Garnett Team
                </span>
              </div>

              <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] tracking-tight mb-8">
                A Higher Standard of Real Estate Advisory in{" "}
                <span className="text-[#9A7D3A]">Tampa Bay.</span>
              </h1>

              <p className="text-lg md:text-xl text-[#111111]/75 font-light leading-relaxed mb-6">
                Both Mark Davis and Rachael Garnett are full-spectrum <strong className="font-semibold text-[#111111]">Commercial &amp; Residential Advisors</strong>—equally fluent in commercial mixed-use, single-family residential, raw land, downtown condominiums, and luxury waterfront estates.
              </p>

              <p className="text-base text-[#111111]/65 font-light leading-relaxed mb-10">
                Their team power comes from <strong className="font-semibold text-[#111111]">the art of the deal</strong>. Each brings their own personal flair, market instincts, and transaction experience to the table—and whether you work with Mark or Rachael on an individual or combo basis, you get <strong className="font-semibold text-[#111111]">two powerhouses</strong> creating the gold standard for customer service and real estate advising. Commercial or residential, big or small, land or condo—we treat every listing like it is <strong className="font-semibold text-[#111111]">hot, new, needs immediate attention, needs relentless servicing, and needs Davis &amp; Garnett</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#consultation"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
                >
                  Schedule Private Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/about/mark-davis"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] hover:text-[#9A7D3A] transition-colors rounded-lg"
                >
                  Meet Mark Davis
                </Link>
                <Link
                  href="/about/rachael-garnett"
                  className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] hover:text-[#9A7D3A] transition-colors rounded-lg"
                >
                  Meet Rachael Garnett
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#111111]/10 bg-[#111111]">
                <Image
                  src="/davis-garnett-real-combo.png"
                  alt="Mark Davis and Rachael Garnett — Principal Advisors at Davis & Garnett"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A951] font-bold block mb-2">
                    Two Specializations • One Advisory Table
                  </span>
                  <p className="font-aiveritas text-2xl md:text-3xl mb-2">
                    Mark Davis & Rachael Garnett
                  </p>
                  <p className="text-xs text-white/75 font-light">
                    Align Right Realty Carrollwood • License #BK3401606
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#111111]/10">
            {[
              { value: "$250M+", label: "Combined Career Advisory Volume" },
              { value: "20+ Yrs", label: "Tampa Bay & Central FL Market Depth" },
              { value: "Dual-Lane", label: "Commercial, Land & Luxury Residential" },
              { value: "5.0 ★", label: "Verified Client Fiduciary Satisfaction" },
            ].map((item) => (
              <div key={item.label} className="bg-[#f5f3ef] p-6 rounded-xl border border-[#111111]/8">
                <div className="font-aiveritas text-3xl md:text-4xl text-[#9A7D3A] mb-1">
                  {item.value}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#111111]/65 font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 1: MEET THE PRINCIPAL ADVISORS ────────────── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                01 · Leadership & Principal Advisors
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111]">
                Meet the Principal Advisors
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#111111]/65 max-w-md font-light leading-relaxed">
              Dedicated domain authority across both sides of the ledger—giving our clients institutional commercial rigor and bespoke residential curation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Mark Davis Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#111111]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="grid sm:grid-cols-[0.9fr_1.1fr] bg-[#fbfbf9] border-b border-[#111111]/8">
                  <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[340px] bg-[#111111]">
                    <Image
                      src="/mark-davis-headshot.png"
                      alt="Mark Davis — Commercial, Land & Investment Specialist"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] mb-2">
                      Commercial &amp; Residential Advisor
                    </span>
                    <h3 className="font-aiveritas text-3xl text-[#111111] mb-1">
                      Mark Davis
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#111111]/50 font-semibold mb-4">
                      FL Real Estate License #3209459
                    </p>
                    <p className="text-sm text-[#111111]/70 font-light leading-relaxed mb-6">
                      Advising across commercial, residential, land, condos, and luxury estates—bringing his personal flair for deal structuring, mixed-use commercial assets, and strategic Florida land assemblage from Hillsborough to Polk and Marion counties.
                    </p>
                    <div className="space-y-2 text-xs text-[#111111]/75 border-t border-[#111111]/10 pt-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#9A7D3A]" />
                        <a href="tel:941-737-4127" className="hover:text-[#9A7D3A] font-medium">
                          941-737-4127
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#9A7D3A]" />
                        <a href="mailto:mark@davisgarnettsells.com" className="hover:text-[#9A7D3A] font-medium">
                          mark@davisgarnettsells.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-4">
                    Active Commercial & Land Mandate Highlights
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#111111]/8">
                      <span className="font-semibold text-[#111111]">126 Ridgewood Ave, Brandon, FL</span>
                      <span className="text-[#9A7D3A] font-bold">$845,000 · Mixed-Use</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#111111]/8">
                      <span className="font-semibold text-[#111111]">770 Old Stokes Rd, Frostproof, FL</span>
                      <span className="text-[#9A7D3A] font-bold">$3,550,000 · 79.54 Acres</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#111111]/8">
                      <span className="font-semibold text-[#111111]">NE 90th Street Rd, Fort McCoy, FL</span>
                      <span className="text-[#9A7D3A] font-bold">$350,000 · 19.72 Acres</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/about/mark-davis"
                  className="inline-flex items-center justify-center gap-2 flex-1 py-4 px-6 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
                >
                  Meet Mark Davis
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/properties?category=Commercial"
                  className="inline-flex items-center justify-center py-4 px-5 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.18em] hover:border-[#C8A951] transition-colors rounded-lg"
                >
                  Commercial &amp; Land Listings
                </Link>
              </div>
            </div>

            {/* Rachael Garnett Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#111111]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="grid sm:grid-cols-[0.9fr_1.1fr] bg-[#fbfbf9] border-b border-[#111111]/8">
                  <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[340px] bg-[#111111]">
                    <Image
                      src="/rachael-garnett-headshot.png"
                      alt="Rachael Garnett — Luxury Residential & Relocation Specialist"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] mb-2">
                      Commercial &amp; Residential Advisor
                    </span>
                    <h3 className="font-aiveritas text-3xl text-[#111111] mb-1">
                      Rachael Garnett
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#111111]/50 font-semibold mb-4">
                      FL Real Estate License #3378601
                    </p>
                    <p className="text-sm text-[#111111]/70 font-light leading-relaxed mb-6">
                      Advising across commercial, residential, land, condos, and luxury waterfront—bringing her personal flair for bespoke property positioning, gated country club and master-planned communities, and executive relocations across Tampa Bay.
                    </p>
                    <div className="space-y-2 text-xs text-[#111111]/75 border-t border-[#111111]/10 pt-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#9A7D3A]" />
                        <a href="tel:727-808-3344" className="hover:text-[#9A7D3A] font-medium">
                          727-808-3344
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#9A7D3A]" />
                        <a href="mailto:rachael@davisgarnettsells.com" className="hover:text-[#9A7D3A] font-medium">
                          rachael@davisgarnettsells.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-4">
                    Flagship Luxury Listing & 2026 Sold Track Record
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#111111]/8">
                      <span className="font-semibold text-[#111111]">6100 Bahama Shores Dr S, St. Pete</span>
                      <span className="text-[#9A7D3A] font-bold">$4,553,900 · Waterfront Estate</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#111111]/8">
                      <span className="font-semibold text-[#111111]">3537 Valencia Cove Ct & 3037 Downan Point Dr</span>
                      <span className="text-[#111111]/60 font-bold">2026 Closed Representation</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-[#111111]/8">
                      <span className="font-semibold text-[#111111]">7608 Teal Trce, 1106 S Otto Pt & 8136 Wheat Stone</span>
                      <span className="text-[#111111]/60 font-bold">2026 Sold Portfolio</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/about/rachael-garnett"
                  className="inline-flex items-center justify-center gap-2 flex-1 py-4 px-6 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
                >
                  Meet Rachael Garnett
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/properties?category=Residential"
                  className="inline-flex items-center justify-center py-4 px-5 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.18em] hover:border-[#C8A951] transition-colors rounded-lg"
                >
                  Residential &amp; Waterfront Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 2: ABOUT ALIGN RIGHT REALTY CARROLLWOOD ────── */}
      <section className="py-28 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 items-center">
            <div className="bg-[#111111] text-white p-10 md:p-14 rounded-2xl relative overflow-hidden shadow-xl border border-[#ef5728]/35">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#ef5728]/15 rounded-full blur-[90px] pointer-events-none" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#ef5728] font-bold block mb-4">
                Brokerage Infrastructure · Broker Number BK3401606
              </span>
              <a
                href="https://alignrightcarrollwood.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-52 h-16 mb-8 block hover:opacity-85 transition-opacity"
              >
                <Image
                  src="/align-right-email-logo.png"
                  alt="Align Right Realty Carrollwood"
                  fill
                  className="object-contain object-left"
                />
              </a>
              <h3 className="font-aiveritas text-3xl md:text-4xl text-[#ef5728] mb-6 leading-snug">
                Align Right Realty Carrollwood
              </h3>
              <p className="text-white/75 text-sm md:text-base font-light leading-relaxed mb-8">
                Boutique advisory agility requires institutional compliance, statewide MLS syndication, and modern transaction infrastructure. Our partnership with Align Right Realty Carrollwood gives every Davis &amp; Garnett client full regulatory protection and global listing exposure.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/15 text-xs">
                <div>
                  <span className="text-[#ef5728] font-bold block uppercase tracking-widest mb-1">
                    Broker Number
                  </span>
                  <span className="text-white/80">BK3401606 · (813) 374-6050</span>
                </div>
                <div>
                  <span className="text-[#ef5728] font-bold block uppercase tracking-widest mb-1">
                    Headquarters
                  </span>
                  <span className="text-white/80">3903 Northdale Blvd Suite 115W, Tampa, FL 33624</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                02 · Brokerage Partnership & Compliance
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-6">
                Why Our Brokerage Partnership Matters to Your Bottom Line
              </h2>
              <p className="text-[#111111]/70 font-light leading-relaxed mb-8">
                Whether structuring a multi-parcel agricultural land assemblage in Polk County, a mixed-use retail acquisition in Brandon, or a $4.5M waterfront estate in St. Petersburg, the brokerage standing behind your transaction matters.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Fiduciary & Escrow Compliance",
                    desc: "Strict Florida Real Estate Commission (FREC) oversight, contract auditing, and multi-tiered risk management on every contract.",
                  },
                  {
                    icon: Compass,
                    title: "Statewide Florida Reach",
                    desc: "Seamless syndication across Stellar MLS, commercial CoStar/LoopNet feeds, and international luxury relocation networks.",
                  },
                  {
                    icon: Building2,
                    title: "Modern Transaction Tech",
                    desc: "Digital earnest money routing, AI-enhanced market intelligence, and encrypted document rooms for private investors.",
                  },
                  {
                    icon: Award,
                    title: "Collaborative Culture",
                    desc: "Access to an internal network of top-producing Tampa Bay agents for early pre-market intelligence and buyer matching.",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="p-6 rounded-xl bg-[#fbfbf9] border border-[#111111]/8"
                  >
                    <feature.icon className="w-6 h-6 text-[#9A7D3A] mb-3" />
                    <h4 className="font-bold text-base text-[#111111] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[#111111]/65 leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/about/align-right-realty-carrollwood"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                About Align Right Realty Carrollwood
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 3: MEET OUR STRATEGIC PARTNERS ─────────────── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                03 · Vetted Deal Execution Ecosystem
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111]">
                Meet Our Strategic Partners
              </h2>
            </div>
            <Link
              href="/about/strategic-partners"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#9A7D3A] hover:text-[#111111] transition-colors"
            >
              View All 6 Partner Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-base md:text-lg text-[#111111]/70 font-light max-w-3xl leading-relaxed mb-12">
            High-stakes transactions succeed or fail in due diligence. Over two decades, Mark Davis and Rachael Garnett have curated a bench of Tampa Bay&apos;s most responsive, battle-tested transaction specialists—ready to deploy the moment your contract is executed.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Landmark,
                category: "Preferred Residential & Jumbo Lending",
                desc: "Private wealth mortgage bankers and portfolio lenders offering rapid underwriting for waterfront estates, physician & executive relocations, and jumbo bridge structures.",
              },
              {
                icon: Building2,
                category: "Commercial, SBA & Development Debt",
                desc: "Regional bank VPs and debt funds specializing in SBA 504/7(a) owner-user loans, DSCR multi-family debt, and horizontal land acquisition financing.",
              },
              {
                icon: Scale,
                category: "Commercial & Residential Title Counsel",
                desc: "Board-certified Florida real estate attorneys and 1031 Qualified Intermediaries managing complex title commitments, easements, and tax-deferred exchanges.",
              },
              {
                icon: ShieldCheck,
                category: "Certified Home, Marine & Seawall Inspectors",
                desc: "Licensed structural engineers, marine seawall/dock specialists, and four-point insurance inspectors protecting coastal and inland acquisitions.",
              },
              {
                icon: Compass,
                category: "Civil Engineering, Environmental & Surveying",
                desc: "Phase I/II environmental assessors, ALTA land surveyors, wetland delineation biologists, and municipal zoning consultants.",
              },
              {
                icon: Sparkles,
                category: "Architectural Staging & Bespoke Interiors",
                desc: "Luxury home stagers, architectural photographers, and pre-market renovation concierges who maximize residential and commercial exit valuations.",
              },
            ].map((item) => (
              <div
                key={item.category}
                className="bg-white p-8 rounded-2xl border border-[#111111]/8 hover:border-[#C8A951] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center mb-6">
                    <item.icon className="w-5 h-5 text-[#9A7D3A]" />
                  </div>
                  <h3 className="font-aiveritas text-2xl text-[#111111] mb-3">
                    {item.category}
                  </h3>
                  <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#111111]/8">
                  <Link
                    href="/about/strategic-partners"
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] hover:text-[#111111]"
                  >
                    Request Partner Introduction <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/about/strategic-partners"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
            >
              Explore Our Full Strategic Partner Directory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 4: OUR CAUSES & COMMUNITY GIVING ───────────── */}
      <section className="py-28 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                04 · Stewardship, Faith & Community Impact
              </span>
              <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-6 leading-tight">
                Our Causes: Community Outreach & Faith-Based Giving
              </h2>
              <p className="text-base md:text-lg text-[#111111]/70 font-light leading-relaxed mb-6">
                For Mark Davis and Rachael Garnett, real estate is ultimately about stewardship and people. Every closing represents a family planting roots or a business creating jobs in Tampa Bay—and we believe a portion of every commission belongs back in the community that trusts us.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  {
                    title: "Local Tampa Bay Church Ministries & Outreach",
                    desc: "Supporting congregation-led food pantries, marriage & family counseling initiatives, and benevolence funds across Hillsborough, Pinellas, and Pasco counties.",
                  },
                  {
                    title: "Youth Mentorship & Character Athletics",
                    desc: "Sponsoring local youth sports leagues, FCA (Fellowship of Christian Athletes) chapters, and scholastic leadership programs.",
                  },
                  {
                    title: "Family Housing Transition & Shelter Support",
                    desc: "Partnering with local nonprofits providing transitional housing, furniture drives, and emergency rental relief for families in crisis.",
                  },
                  {
                    title: "Hands-On Community Service Days",
                    desc: "Mobilizing our clients, lenders, and title partners for quarterly neighborhood revitalization and holiday outreach drives.",
                  },
                ].map((cause) => (
                  <div
                    key={cause.title}
                    className="flex items-start gap-4 p-5 rounded-xl bg-[#f5f3ef] border border-[#111111]/8"
                  >
                    <HeartHandshake className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-sm text-[#111111] mb-1">
                        {cause.title}
                      </h4>
                      <p className="text-xs text-[#111111]/65 font-light leading-relaxed">
                        {cause.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about/community-outreach-giving"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Explore Community Outreach & Faith-Based Giving
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#111111] text-white p-10 md:p-12 rounded-2xl border border-[#C8A951]/30 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-[#C8A951]/20 border border-[#C8A951]/40 flex items-center justify-center mb-6">
                <Heart className="w-5 h-5 text-[#C8A951]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A951] font-bold block mb-3">
                Purpose Beyond Commission
              </span>
              <h3 className="font-aiveritas text-3xl text-white mb-6 leading-snug">
                &ldquo;We measure our success not only by the volume we close, but by the lives, churches, and neighborhoods strengthened through our work.&rdquo;
              </h3>
              <p className="text-white/70 text-sm font-light leading-relaxed mb-8">
                When you buy, sell, or invest with Davis & Garnett, you directly fuel local Tampa Bay ministry outreach, youth mentorship, and family housing initiatives. Have a local church project or community cause in need of a sponsor? We want to hear from you.
              </p>
              <Link
                href="/about/community-outreach-giving#partner-cause"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#C8A951] hover:text-white transition-colors"
              >
                Nominate a Tampa Bay Cause or Ministry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECT CONSULTATION FORM (WIRED TO POST /api/leads) ──────────── */}
      <section id="consultation" className="py-28 px-6 md:px-12 bg-[#f5f3ef]">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-14 border border-[#111111]/10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Direct Principal Access
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Request a Private Advisory Consultation
            </h2>
            <p className="text-sm md:text-base text-[#111111]/65 font-light leading-relaxed">
              Connect directly with Mark Davis (#3209459) and Rachael Garnett (#3378601) regarding commercial acquisitions, land disposition, or luxury residential representation.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-xl bg-[#fbfbf9] border border-[#C8A951] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                Your Consultation Request Has Been Received
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-md mx-auto mb-6">
                Thank you, {formData.firstName}. Your inquiry has been routed directly to our Principal Advisors at Align Right Realty Carrollwood. We will reach out shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    advisorPreference: "Both Principal Advisors (Mark & Rachael)",
                    inquiryType: "Private Advisory Consultation",
                    notes: "",
                  });
                }}
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                Submit Another Inquiry
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
                    placeholder="Jonathan"
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
                    placeholder="Braddock"
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
                    placeholder="client@domain.com"
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                    placeholder="(813) 555-0199"
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Advisor Routing
                  </label>
                  <select
                    value={formData.advisorPreference}
                    onChange={(e) => setFormData({ ...formData, advisorPreference: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  >
                    <option>Both Principal Advisors (Mark & Rachael)</option>
                    <option>Mark Davis — Commercial, Land & Investment (#3209459)</option>
                    <option>Rachael Garnett — Luxury Residential & Relocation (#3378601)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Primary Objective
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                  >
                    <option>Private Advisory Consultation</option>
                    <option>Commercial / Mixed-Use Acquisition or Sale</option>
                    <option>Land Assemblage & Development Valuation</option>
                    <option>Luxury Residential Buying or Listing</option>
                    <option>Executive Relocation to Tampa Bay</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                  Portfolio Goals, Property Address, or Timeline
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your property, target neighborhood or commercial corridor, budget, and ideal timeline..."
                  className="w-full px-4 py-3.5 rounded-lg bg-[#fbfbf9] border border-[#111111]/15 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg disabled:opacity-50"
              >
                {submitting ? "Submitting Advisory Request..." : "Submit Direct Consultation Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── DARK CONTRAST FOOTER ─────────────────────────────────────────── */}
      <footer className="py-20 px-6 md:px-12 bg-[#111111] text-white border-t border-[#C8A951]/20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-white/10">
            <div className="md:col-span-1">
              <div className="w-48 mb-4">
                <DavisGarnettLogo variant="dark" className="w-full" />
              </div>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Institutional commercial & land underwriting paired with white-glove luxury residential advisory across Tampa Bay.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C8A951] font-bold mb-4">
                About The Davis &amp; Garnett Team
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About The Davis &amp; Garnett Team
                  </Link>
                </li>
                <li>
                  <Link href="/about/mark-davis" className="hover:text-white">
                    Meet Mark Davis (#3209459)
                  </Link>
                </li>
                <li>
                  <Link href="/about/rachael-garnett" className="hover:text-white">
                    Meet Rachael Garnett (#3378601)
                  </Link>
                </li>
                <li>
                  <Link href="/about/align-right-realty-carrollwood" className="hover:text-white">
                    Align Right Realty Carrollwood (#BK3401606)
                  </Link>
                </li>
                <li>
                  <Link href="/about/strategic-partners" className="hover:text-white">
                    Meet Our Strategic Partners
                  </Link>
                </li>
                <li>
                  <Link href="/about/community-outreach-giving" className="hover:text-white">
                    Community Outreach &amp; Faith-Based Giving
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#C8A951] font-bold mb-4">
                Direct Principal Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li>Mark Davis: 941-737-4127</li>
                <li>mark@davisgarnettsells.com</li>
                <li className="pt-2">Rachael Garnett: 727-808-3344</li>
                <li>rachael@davisgarnettsells.com</li>
                <li className="pt-2 text-[#D4AF37]">list@davisgarnettsells.com</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#ef5728] font-bold mb-4">
                Brokerage of Record
              </h4>
              <p className="text-xs text-[#ef5728] font-semibold leading-relaxed mb-1">
                Align Right Realty Carrollwood
              </p>
              <p className="text-xs text-white/60 leading-relaxed">
                Broker Number BK3401606<br />
                3903 Northdale Blvd Suite 115W, Tampa, FL 33624<br />
                (813) 374-6050 | officeadmin@alignrightcarrollwood.com
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-white/40 gap-4">
            <p>© {new Date().getFullYear()} Davis & Garnett Real Estate Advisors. Equal Housing Opportunity.</p>
            <div className="flex gap-6">
              <Link href="/davis" className="hover:text-[#C8A951]">
                /davis
              </Link>
              <Link href="/garnett" className="hover:text-[#C8A951]">
                /garnett
              </Link>
              <Link href="/v1-light" className="hover:text-[#C8A951]">
                V1-Light Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

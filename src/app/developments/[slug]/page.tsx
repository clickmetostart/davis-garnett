"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  DollarSign,
  FileSpreadsheet,
  HardHat,
  Layers,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Globe,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import SiteFooter from "@/components/SiteFooter";
import { DEVELOPMENTS, getDevelopmentBySlug } from "@/data/developments";

export default function DevelopmentDetailSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const dev = getDevelopmentBySlug(slug);

  if (!dev) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState<string>(dev.heroImage);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTier: dev.floorPlanTiers[0]?.tierName || "All Floor Plans",
    requestType: "Floor Plans, Price Sheet & Current Builder Incentives",
    timeline: "Within 3–6 Months",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const relatedDevelopments = DEVELOPMENTS.filter(
    (d) => d.corridor === dev.corridor && d.slug !== dev.slug
  ).slice(0, 3);

  // Schema.org JSON-LD (RealEstateListing + Residence / ApartmentComplex)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": dev.corridor === "downtown-bayshore" ? "ApartmentComplex" : "GatedResidenceCommunity",
    name: dev.name,
    description: dev.summary,
    url: `https://davisgarnett.com/developments/${dev.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: dev.location,
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: dev.coordinates.lat,
      longitude: dev.coordinates.lng,
    },
    amenityFeature: dev.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      description: `Price Range: ${dev.priceRange} (${dev.status})`,
      seller: {
        "@type": "RealEstateAgent",
        name: "Davis & Garnett — Align Right Realty",
      },
    },
  };

  const handleSidebarLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          source: `Development Spoke: ${dev.name}`,
          status: "New",
          labels: [
            "Development Inquiry",
            dev.name,
            dev.corridor === "downtown-bayshore" ? "Luxury Tower" : "Master-Planned Community",
          ],
          notes: `Development: ${dev.name} | Preferred Tier: ${leadForm.preferredTier} | Request: ${leadForm.requestType} | Timeline: ${leadForm.timeline} | Message: ${leadForm.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setFormStatus("success");
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProposalNav />

      {/* ── BREADCRUMB BAR ── */}
      <div className="pt-24 bg-[#f5f3ef] border-b border-[#111111]/10 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto py-4 flex flex-wrap items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#111111]/60 font-semibold"
          >
            <Link href="/v1-light" className="hover:text-[#9A7D3A] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8A951]" />
            <Link href="/developments" className="hover:text-[#9A7D3A] transition-colors">
              Developments
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C8A951]" />
            <span className="text-[#111111] font-bold">{dev.name}</span>
          </nav>

          <Link
            href="/developments"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-bold text-[#9A7D3A] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Tampa Bay Developments
          </Link>
        </div>
      </div>

      {/* ── HERO & INTERACTIVE GALLERY SHOWCASE ── */}
      <section className="py-12 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#111111] text-[#C8A951] text-[10px] uppercase tracking-[0.2em] font-bold">
                  {dev.corridorLabel}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#f5f3ef] border border-[#111111]/15 text-[#111111] text-[10px] uppercase tracking-[0.2em] font-bold">
                  {dev.status}
                </span>
                {dev.isMixedUseCommercialResidential && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-[#C8A951] text-[#111111] text-[10px] uppercase tracking-[0.2em] font-bold">
                    <Building2 className="w-3 h-3 text-[#9A7D3A]" /> Mixed-Use: Residential + Commercial
                  </span>
                )}
              </div>
              <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] mb-3">
                {dev.name}
              </h1>
              <p className="text-lg md:text-xl text-[#9A7D3A] font-serif italic mb-3">
                {dev.subtitle}
              </p>
              <p className="text-xs md:text-sm text-[#111111]/65 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C8A951] shrink-0" />
                <span>{dev.location}</span>
              </p>
            </div>

            <div className="bg-[#f5f3ef] border border-[#C8A951]/40 rounded-2xl p-6 lg:min-w-[310px] shrink-0">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#9A7D3A] font-bold mb-1">
                Developer &amp; Builder Price Range
              </div>
              <div className="font-aiveritas text-3xl md:text-4xl text-[#111111] mb-2">
                {dev.priceRange}
              </div>
              <div className="text-xs text-[#111111]/70 mb-4">
                Delivery / Occupancy: <strong className="text-[#111111]">{dev.delivery}</strong>
              </div>
              <a
                href="#spoke-vip-form"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-colors mb-2.5"
              >
                Request Floor Plans &amp; VIP Pricing <ArrowRight className="w-4 h-4" />
              </a>
              {dev.officialWebsiteUrl && (
                <a
                  href={dev.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-[#111111] text-[#111111] hover:text-[#C8A951] text-[11px] uppercase tracking-[0.16em] font-bold rounded-xl border border-[#111111]/15 hover:border-[#111111] transition-all shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C8A951]" />
                  <span>Official Development Site</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
            </div>
          </div>

          {/* Interactive Gallery Grid */}
          <div className="grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-9 relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#111111] border border-[#111111]/10 shadow-sm">
              <Image
                src={selectedImage}
                alt={dev.name}
                fill
                priority
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8A951] font-bold block">
                    {dev.developer}
                  </span>
                  <span className="text-sm md:text-base font-medium">{dev.unitsOrAcreage}</span>
                </div>
                <span className="text-[11px] uppercase tracking-widest bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15">
                  Click Thumbnails to Preview ({dev.gallery.length} Images)
                </span>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-2 gap-2.5">
              {dev.gallery.map((imgUrl, idx) => {
                const isSelected = selectedImage === imgUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-[#C8A951] ring-2 ring-[#C8A951]/40 scale-[0.98]"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${dev.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6-Box Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {dev.specs.map((spec) => (
              <div
                key={spec.label}
                className="bg-[#fbfbf9] border border-[#111111]/10 rounded-2xl p-5 hover:border-[#C8A951] transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-1.5">
                  {spec.label}
                </div>
                <div className="font-aiveritas text-lg text-[#111111] leading-snug">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + STICKY VIP SIDEBAR ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Deep-Dive Editorial Content */}
          <div className="lg:col-span-7 space-y-16">
            {/* Architectural & Community Narrative */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#111111]/10 shadow-sm">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-3">
                Executive Overview
              </span>
              <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                About {dev.name}
              </h2>
              <p className="text-[#111111]/85 font-medium text-base md:text-lg leading-relaxed mb-6">
                {dev.summary}
              </p>
              <p className="text-[#111111]/70 font-light text-sm md:text-base leading-relaxed">
                {dev.description}
              </p>

              {/* Key Highlights */}
              <div className="mt-10 pt-8 border-t border-[#111111]/10">
                <h3 className="font-aiveritas text-2xl text-[#111111] mb-5">
                  Development Highlights
                </h3>
                <div className="grid gap-3.5">
                  {dev.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#fbfbf9] border border-[#111111]/8"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#111111]/85 leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Builder Roster & Developer Credentials */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#111111]/10 shadow-sm">
              <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                <Layers className="w-4 h-4 text-[#C8A951]" />
                <span>Developer &amp; Builder Roster</span>
              </div>
              <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                Master Developer &amp; Approved Builders
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-[#f5f3ef] border border-[#111111]/10">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-1">
                    Master Developer
                  </div>
                  <div className="font-aiveritas text-xl text-[#111111]">{dev.developer}</div>
                </div>
                <div className="p-5 rounded-2xl bg-[#f5f3ef] border border-[#111111]/10">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-1">
                    Architecture &amp; Planning
                  </div>
                  <div className="font-aiveritas text-xl text-[#111111]">
                    {dev.architectOrPlanner || dev.developer}
                  </div>
                </div>
              </div>

              <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#111111]/60 font-bold">
                Active Builders &amp; Residential Collections ({dev.builders.length})
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {dev.builders.map((builder) => (
                  <div
                    key={builder}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#fbfbf9] border border-[#111111]/10"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-[#C8A951]" />
                      <span className="text-sm font-bold text-[#111111]">{builder}</span>
                    </div>
                    <a
                      href="#spoke-vip-form"
                      className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] hover:text-[#111111]"
                    >
                      Price Sheet →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor Plan & Residence Tiers */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#111111]/10 shadow-sm">
              <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                <Compass className="w-4 h-4 text-[#C8A951]" />
                <span>Residence Configurations &amp; Pricing Tiers</span>
              </div>
              <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                Floor Plan Collections &amp; Starting Prices
              </h2>

              <div className="space-y-4">
                {dev.floorPlanTiers.map((tier) => (
                  <div
                    key={tier.tierName}
                    className="p-6 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-aiveritas text-xl text-[#111111] mb-1">
                        {tier.tierName}
                      </h3>
                      <p className="text-xs text-[#111111]/65 font-medium">
                        {tier.configuration} • <span className="text-[#9A7D3A]">{tier.sqFtRange}</span>
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <div className="text-[10px] uppercase tracking-widest text-[#111111]/50 font-bold">
                        Starting From
                      </div>
                      <div className="font-aiveritas text-2xl text-[#9A7D3A]">
                        {tier.startingPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resort & Tower Amenities */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#111111]/10 shadow-sm">
              <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                <Sparkles className="w-4 h-4 text-[#C8A951]" />
                <span>Curated Lifestyle &amp; Club Privileges</span>
              </div>
              <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                Signature Amenities &amp; Resident Services
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {dev.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#f5f3ef] border border-[#111111]/8"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-medium text-[#111111]/85">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOA, CDD & Property Tax Financial Breakdown */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#111111]/10 shadow-sm">
              <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                <FileSpreadsheet className="w-4 h-4 text-[#C8A951]" />
                <span>Carrying Cost Transparency</span>
              </div>
              <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                HOA, CDD &amp; Tax Assessment Breakdown
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#9A7D3A] font-bold mb-1">
                    Estimated HOA / Condo Fee
                  </div>
                  <div className="font-semibold text-sm text-[#111111]">
                    {dev.hoaCddInfo.hoaEstimate}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#9A7D3A] font-bold mb-1">
                    Estimated CDD Assessment
                  </div>
                  <div className="font-semibold text-sm text-[#111111]">
                    {dev.hoaCddInfo.cddEstimate}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#9A7D3A] font-bold mb-1">
                    Estimated Tax Millage
                  </div>
                  <div className="font-semibold text-sm text-[#111111]">
                    {dev.hoaCddInfo.estimatedTaxMillage}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#111111]/60 font-bold mb-3">
                  What the Master Association Covers:
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {dev.hoaCddInfo.masterIncludes.map((inc) => (
                    <div key={inc} className="flex items-center gap-2 text-xs text-[#111111]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#f5f3ef] border border-[#C8A951]/40 text-xs text-[#111111]/80 leading-relaxed">
                <strong className="text-[#111111] uppercase tracking-wider block mb-1">
                  Davis &amp; Garnett Advisory Note:
                </strong>
                {dev.hoaCddInfo.financialNote}
              </div>
            </div>

            {/* Why Buy With Davis & Garnett (Dark Contrast Block) */}
            <div className="bg-[#111111] text-white rounded-3xl p-8 md:p-10 border border-[#C8A951]/30">
              <div className="flex items-center gap-2 text-[#C8A951] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                <HardHat className="w-4 h-4 text-[#C8A951]" />
                <span>Zero-Cost Buyer Representation</span>
              </div>
              <h2 className="font-aiveritas text-3xl text-white mb-4">
                Why Acquire in {dev.name} With Davis &amp; Garnett?
              </h2>
              <p className="text-white/75 text-sm font-light leading-relaxed mb-8">
                On-site sales teams represent the developer&apos;s bottom line. When you register
                Davis &amp; Garnett as your advisor before visiting the sales gallery, the developer
                compensates us directly while you unlock four distinct advantages:
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {dev.whyBuyWithDG.map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C8A951]/50 transition-colors"
                  >
                    <h3 className="font-aiveritas text-lg text-[#C8A951] mb-2">{item.title}</h3>
                    <p className="text-xs text-white/75 font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Sticky Lead Capture Sidebar Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28" id="spoke-vip-form">
            <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-[#C8A951]/50 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A951]/15 text-[#9A7D3A] text-[10px] uppercase tracking-[0.2em] font-bold mb-3">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Priority VIP Developer Desk</span>
              </div>

              <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111111] leading-snug mb-2">
                Request Floor Plans, Lot Availability &amp; VIP Incentives
              </h3>
              <p className="text-xs text-[#111111]/65 leading-relaxed mb-6">
                Receive the complete {dev.name} buyer package—including high-resolution floor plans,
                current inventory price sheet, and unadvertised builder closing cost / rate-buydown
                incentives.
              </p>

              {/* Advisors Mini Badge */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f5f3ef] border border-[#111111]/10 mb-6">
                <div className="flex -space-x-2.5 shrink-0">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#C8A951] bg-black">
                    <Image
                      src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                      alt="Mark Davis"
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#C8A951] bg-black">
                    <Image
                      src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                      alt="Rachael Garnett"
                      fill
                      unoptimized
                      className="object-cover object-[center_30%]"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#111111]">
                    Mark Davis &amp; Rachael Garnett
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#9A7D3A] font-bold">
                    Commercial &amp; Residential Advisors · Align Right Realty
                  </div>
                </div>
              </div>

              {formStatus === "success" ? (
                <div className="p-8 rounded-2xl bg-[#f5f3ef] border border-[#C8A951] text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
                  <h4 className="font-aiveritas text-2xl text-[#111111] mb-2">
                    {dev.name} Package Requested
                  </h4>
                  <p className="text-xs text-[#111111]/75 leading-relaxed mb-6">
                    Thank you, <strong>{leadForm.name}</strong>. Our team is sending the latest{" "}
                    <strong>{dev.name}</strong> floor plans, lot/unit availability, and VIP incentive
                    sheet to <strong>{leadForm.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-3 bg-[#111111] text-white text-[11px] uppercase tracking-widest font-bold rounded-xl"
                  >
                    Submit Another Question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSidebarLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(813) 555-0199"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-1.5">
                      Preferred Floor Plan / Price Tier
                    </label>
                    <select
                      value={leadForm.preferredTier}
                      onChange={(e) =>
                        setLeadForm({ ...leadForm, preferredTier: e.target.value })
                      }
                      className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                    >
                      <option value="All Floor Plans & Pricing Tiers">
                        All Floor Plans &amp; Pricing Tiers
                      </option>
                      {dev.floorPlanTiers.map((tier) => (
                        <option key={tier.tierName} value={tier.tierName}>
                          {tier.tierName} ({tier.startingPrice})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-1.5">
                      What Would You Like Included?
                    </label>
                    <select
                      value={leadForm.requestType}
                      onChange={(e) =>
                        setLeadForm({ ...leadForm, requestType: e.target.value })
                      }
                      className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                    >
                      <option value="Floor Plans, Price Sheet & Current Builder Incentives">
                        Floor Plans, Price Sheet &amp; Current Builder Incentives
                      </option>
                      <option value="Quick Move-In (Standing Spec) Discount List">
                        Quick Move-In (Standing Spec) Discount List
                      </option>
                      <option value="Schedule a Private VIP Tour with Davis & Garnett">
                        Schedule a Private VIP Tour with Davis &amp; Garnett
                      </option>
                      <option value="HOA / CDD / Tax Carrying Cost Worksheet">
                        HOA / CDD / Tax Carrying Cost Worksheet
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-1.5">
                      Notes or Specific Preferences
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`Ask about specific views, ${dev.builders[0]} lot availability, rate buydowns, or private tour times...`}
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      Submission error. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 px-6 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {formStatus === "submitting"
                      ? "Sending Request..."
                      : `Get ${dev.name} Floor Plans & VIP Pricing`}
                  </button>

                  <p className="text-[10px] text-[#111111]/50 text-center leading-relaxed pt-1">
                    100% Free Buyer Representation • Brokered by Align Right Realty
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── * OFFICIAL SOURCE ATTRIBUTION & DEVELOPER DISCLOSURE ── */}
      <section className="py-16 px-6 md:px-12 bg-white border-t border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#fbfbf9] border border-[#C8A951]/40 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="flex items-start gap-5">
              <span className="text-4xl text-[#C8A951] font-serif leading-none select-none shrink-0">*</span>
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#9A7D3A]">
                      * Official Development Sources &amp; Verification
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#111111]/5 text-[#111111]/70 text-[10px] font-bold uppercase tracking-wider">
                      Official Source
                    </span>
                  </div>
                  <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111111]">
                    Direct Sourcing For {dev.name}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-[#111111]/85 font-light leading-relaxed max-w-4xl">
                  {dev.sourceAttributionNotice ||
                    `All development specifications, architectural renderings, residential amenities, floor plan configurations, and milestone projections published on this page are strictly sourced from and verified against the official developer websites.`}
                </p>

                {dev.officialSources && dev.officialSources.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111]/60">
                      Official Developer URLs:
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {dev.officialSources.map((src, i) => (
                        <a
                          key={i}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#111111] text-[#111111] hover:text-[#C8A951] border border-[#111111]/15 hover:border-[#111111] rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#C8A951]" />
                          <span>{src.title}</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-5 border-t border-[#111111]/10 text-xs text-[#111111]/60 leading-relaxed">
                  <strong className="text-[#111111]/85 font-semibold">* Independent Buyer Advisory Notice:</strong> Mark Davis and Rachael Garnett (Davis &amp; Garnett, brokered by Align Right Realty) provide independent advisory and representation to prospective purchasers, private investors, and contract assignees. Davis &amp; Garnett is not the exclusive developer sales listing agency or project sponsor of {dev.name}. Independent buyer representation is provided at zero commission cost to the buyer, ensuring unbiased stack selection, contract review, and market comparison.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED DEVELOPMENTS IN THIS CORRIDOR ── */}
      <section className="py-20 px-6 md:px-12 bg-[#f5f3ef] border-t border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
                Compare Nearby Communities
              </span>
              <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111111]">
                More in {dev.corridorLabel}
              </h2>
            </div>
            <Link
              href="/developments"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#111111] hover:text-[#9A7D3A]"
            >
              Explore Full Developments Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedDevelopments.map((item) => (
              <Link
                key={item.slug}
                href={`/developments/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#111111]/10 hover:border-[#C8A951] transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={item.heroImage}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {item.priceRange}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#C8A951] font-bold">
                        {item.delivery}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-1">
                      {item.neighborhoodOrSubmarket}
                    </div>
                    <h3 className="font-aiveritas text-2xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#111111]/65 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-[#111111]/8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#9A7D3A]">
                  <span>View Development</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter />
    </div>
  );
}

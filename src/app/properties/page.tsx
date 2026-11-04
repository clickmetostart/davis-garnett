"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Trees,
  Building2,
  Waves,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Compass,
  Award,
  Send,
  Phone,
  Mail
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import listingsData from "@/data/listings.json";
import { Listing } from "@/types/listings";

type FilterTab =
  | "All"
  | "Residential"
  | "Commercial & Mixed-Use"
  | "Land & Acreage"
  | "Recent Transactions (Sold)";

const FILTER_TABS: FilterTab[] = [
  "All",
  "Residential",
  "Commercial & Mixed-Use",
  "Land & Acreage",
  "Recent Transactions (Sold)"
];

const CATEGORY_BADGE_STYLE: Record<string, string> = {
  Residential: "bg-[#111111] text-[#C8A951] border border-[#C8A951]/40",
  Commercial: "bg-[#1E3A5F] text-white",
  Land: "bg-[#2D4A3E] text-white"
};

export default function PropertiesPage() {
  const allListings = listingsData as unknown as Listing[];
  const [selectedTab, setSelectedTab] = useState<FilterTab>("All");

  // Valuation / Portfolio Review Form State
  const [valForm, setValForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    assetCategory: "Residential Estate",
    inquiryType: "Confidential Property Valuation",
    notes: ""
  });
  const [valStatus, setValStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Filter logic for Active vs Sold sections
  const matchesTab = (listing: Listing) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Residential") return listing.category === "Residential";
    if (selectedTab === "Commercial & Mixed-Use") return listing.category === "Commercial";
    if (selectedTab === "Land & Acreage") return listing.category === "Land";
    if (selectedTab === "Recent Transactions (Sold)") return listing.status === "Sold";
    return true;
  };

  const activeListings = allListings.filter(
    (l) => l.status === "Active" && (selectedTab === "Recent Transactions (Sold)" ? false : matchesTab(l))
  );

  const soldListings = allListings.filter(
    (l) => l.status === "Sold" && matchesTab(l)
  );

  const handleValuationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValStatus("submitting");
    try {
      const fullName = `${valForm.firstName} ${valForm.lastName}`.trim();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: valForm.firstName,
          lastName: valForm.lastName,
          name: fullName,
          email: valForm.email,
          phone: valForm.phone,
          propertyInterest: `${valForm.inquiryType} — ${valForm.propertyAddress || valForm.assetCategory}`,
          notes: `Asset Category: ${valForm.assetCategory} | Address: ${valForm.propertyAddress} | Notes: ${valForm.notes}`,
          message: valForm.notes,
          source: "Portfolio Hub — Confidential Valuation & Portfolio Review",
          labels: ["Portfolio Review", valForm.assetCategory, valForm.inquiryType]
        })
      });
      if (!res.ok) throw new Error("Failed");
      setValStatus("success");
    } catch (err) {
      console.error(err);
      setValStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111] font-sans selection:bg-[#C8A951] selection:text-black">
      <ProposalNav />

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION + EXECUTIVE STATS RIBBON + CATEGORY FILTER TABS
         ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-32 pb-16 px-6 lg:px-10 bg-[#f5f3ef] border-b border-[#111111]/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url('/dg-favicon-fat.png')",
            backgroundSize: "200px",
            backgroundRepeat: "repeat"
          }}
        />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Davis & Garnett · Master Portfolio Hub
            </span>
            <h1 className="font-aiveritas text-5xl sm:text-7xl lg:text-8xl text-[#111111] leading-none mb-6">
              The Portfolio
            </h1>
            <p className="text-[#111111]/65 font-light text-base sm:text-lg leading-relaxed">
              Bespoke waterfront estates, dual-building commercial mixed-use assets, institutional Central Florida acreage, and our verified 2026 transaction track record across Tampa Bay.
            </p>
          </div>

          {/* Executive Stats Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {[
              {
                value: "$9.29M+",
                label: "Active Exclusive Volume",
                sub: "4 Signature Offerings"
              },
              {
                value: "99.65 Ac",
                label: "Active Land & Waterfront",
                sub: "Polk, Marion & Pinellas"
              },
              {
                value: "11 Closed",
                label: "2026 Recent Transactions",
                sub: "Verified Sold Track Record"
              },
              {
                value: "Dual-Practice",
                label: "Advisory Representation",
                sub: "Residential · Commercial · Land"
              }
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/90 backdrop-blur border border-[#111111]/8 rounded-2xl p-5 text-center shadow-sm"
              >
                <p className="font-aiveritas text-3xl sm:text-4xl text-[#111111] mb-1">
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7D3A]">
                  {stat.label}
                </p>
                <p className="text-[11px] text-[#111111]/45 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {FILTER_TABS.map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.15em] border transition-all ${
                    isActive
                      ? "bg-[#111111] text-[#C8A951] border-[#111111] shadow-md"
                      : "bg-white text-[#111111]/70 border-[#111111]/15 hover:border-[#C8A951] hover:text-[#111111]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          COLLECTIVE SECTION 1: ACTIVE SIGNATURE LISTINGS
         ══════════════════════════════════════════════════════════════════ */}
      {activeListings.length > 0 && (
        <section className="py-20 px-6 lg:px-10 bg-white border-b border-[#111111]/8">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                  Current Exclusive Offerings · As of 11/01/2026
                </span>
                <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111]">
                  Active Signature Listings
                </h2>
              </div>
              <p className="text-[#111111]/55 text-sm max-w-md">
                Click any offering below to inspect its full bespoke property dossier, interactive photo gallery, underwriting metrics, and due diligence documents.
              </p>
            </div>

            <div className="space-y-12">
              {activeListings.map((listing, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div
                    key={listing.id}
                    className="group bg-[#fbfbf9] rounded-3xl overflow-hidden border border-[#111111]/10 hover:border-[#C8A951]/60 hover:shadow-xl transition-all duration-500 grid lg:grid-cols-12"
                  >
                    {/* Image Column */}
                    <div
                      className={`relative min-h-[340px] sm:min-h-[420px] lg:col-span-6 overflow-hidden ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Link href={`/listings/${listing.slug}`} className="block w-full h-full">
                        <Image
                          src={listing.images?.main || "/listings/bahama-shores-1.jpg"}
                          alt={listing.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={idx < 2}
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                          <span className="bg-[#22c55e] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm">
                            ● Active Exclusive
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm ${
                              CATEGORY_BADGE_STYLE[listing.category] || "bg-black text-white"
                            }`}
                          >
                            {listing.category}
                          </span>
                          {listing.mlsId && (
                            <span className="bg-black/65 backdrop-blur text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm">
                              MLS# {listing.mlsId}
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                          <div>
                            <span className="text-[#C8A951] text-[10px] uppercase tracking-[0.25em] font-bold block">
                              {listing.neighborhood || listing.county}
                            </span>
                            <span className="font-aiveritas text-3xl sm:text-4xl">
                              {listing.price}
                            </span>
                          </div>
                          {listing.images?.gallery && (
                            <span className="bg-black/60 backdrop-blur text-white/90 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                              {listing.images.gallery.length} Photos
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>

                    {/* Editorial Details Column */}
                    <div
                      className={`p-8 sm:p-10 lg:p-12 lg:col-span-6 flex flex-col justify-between ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[#9A7D3A] text-xs font-bold uppercase tracking-[0.22em]">
                            {listing.propertyType}
                          </span>
                          <span className="text-xs text-[#111111]/45 font-medium">
                            Advisor: {listing.agent?.name}
                          </span>
                        </div>

                        <Link href={`/listings/${listing.slug}`}>
                          <h3 className="font-aiveritas text-3xl sm:text-4xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-2">
                            {listing.title}
                          </h3>
                        </Link>

                        <p className="text-[#111111]/60 text-sm flex items-center gap-1.5 mb-5">
                          <MapPin className="w-4 h-4 text-[#C8A951] shrink-0" />
                          {listing.address}, {listing.city}, {listing.state} {listing.zip} ({listing.county})
                        </p>

                        <p className="text-[#111111]/70 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                          {listing.description}
                        </p>

                        {/* Highlights 2-col checklist */}
                        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                          {listing.highlights.slice(0, 4).map((h) => (
                            <div
                              key={h}
                              className="flex items-start gap-2 text-xs text-[#111111]/75"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-[#C8A951] shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        {/* Executive Specs Strip */}
                        <div className="flex flex-wrap gap-6 border-t border-[#111111]/10 pt-5 mb-6 text-xs">
                          {listing.specs?.beds !== undefined && (
                            <div>
                              <span className="text-[#111111]/45 uppercase tracking-wider block text-[10px] font-bold">
                                Bedrooms
                              </span>
                              <span className="font-bold text-[#111111] text-sm">
                                {listing.specs.beds} Beds
                              </span>
                            </div>
                          )}
                          {listing.specs?.baths !== undefined && (
                            <div>
                              <span className="text-[#111111]/45 uppercase tracking-wider block text-[10px] font-bold">
                                Bathrooms
                              </span>
                              <span className="font-bold text-[#111111] text-sm">
                                {listing.specs.baths} Baths
                              </span>
                            </div>
                          )}
                          {listing.specs?.buildings !== undefined && (
                            <div>
                              <span className="text-[#111111]/45 uppercase tracking-wider block text-[10px] font-bold">
                                Structures
                              </span>
                              <span className="font-bold text-[#111111] text-sm">
                                {listing.specs.buildings} Buildings
                              </span>
                            </div>
                          )}
                          {listing.specs?.sqft && (
                            <div>
                              <span className="text-[#111111]/45 uppercase tracking-wider block text-[10px] font-bold">
                                Area / SqFt
                              </span>
                              <span className="font-bold text-[#111111] text-sm">
                                {listing.specs.sqft} SqFt
                              </span>
                            </div>
                          )}
                          {listing.specs?.lotSize && (
                            <div>
                              <span className="text-[#111111]/45 uppercase tracking-wider block text-[10px] font-bold">
                                Acreage / Lot
                              </span>
                              <span className="font-bold text-[#111111] text-sm">
                                {listing.specs.lotSize}
                              </span>
                            </div>
                          )}
                          {listing.specs?.waterfrontFeet && (
                            <div>
                              <span className="text-[#111111]/45 uppercase tracking-wider block text-[10px] font-bold">
                                Waterfront
                              </span>
                              <span className="font-bold text-[#9A7D3A] text-sm">
                                ~{listing.specs.waterfrontFeet} Linear Ft
                              </span>
                            </div>
                          )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={`/listings/${listing.slug}`}
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors"
                          >
                            Explore Custom Showcase <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/listings/${listing.slug}#crm-lead-form`}
                            className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:border-[#111111] transition-colors"
                          >
                            {listing.category === "Residential"
                              ? "Schedule Showing"
                              : "Request Offering Memo"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          COLLECTIVE SECTION 2: 2026 PROVEN TRACK RECORD — RECENT TRANSACTIONS
         ══════════════════════════════════════════════════════════════════ */}
      {soldListings.length > 0 && (
        <section className="py-24 px-6 lg:px-10 bg-[#f5f3ef] border-b border-[#111111]/10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                  Verified Closed Closings · 2026 Portfolio Activity
                </span>
                <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111]">
                  2026 Proven Track Record — Recent Transactions
                </h2>
              </div>
              <p className="text-[#111111]/60 text-sm max-w-md">
                From golf course estates in Bradenton and Land O&apos; Lakes to waterfront retreats in Inverness and strategic residential homesites, explore {soldListings.length} recent closings represented by Davis & Garnett.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {soldListings.map((sold) => (
                <Link
                  key={sold.id}
                  href={`/listings/${sold.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#111111]/8 hover:border-[#C8A951]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#eae6df]">
                    <Image
                      src={sold.images?.main || "/listings/d-g-residential-1.webp"}
                      alt={sold.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      <span className="bg-[#111111] text-[#C8A951] text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm border border-[#C8A951]/40">
                        Sold · 2026
                      </span>
                      <span className="bg-white/90 text-[#111111] text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm">
                        {sold.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                      <span className="font-aiveritas text-2xl text-white drop-shadow">
                        {sold.price}
                      </span>
                      {sold.mlsId && (
                        <span className="text-[10px] uppercase tracking-widest text-white/80 bg-black/50 px-2.5 py-1 rounded">
                          MLS# {sold.mlsId}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[#9A7D3A] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                      {sold.neighborhood || sold.county}
                    </p>
                    <h3 className="font-aiveritas text-2xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-1">
                      {sold.title}
                    </h3>
                    <p className="text-xs text-[#111111]/55 flex items-center gap-1 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A951]" /> {sold.city}, {sold.state} {sold.zip}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-[#111111]/65 border-t border-[#111111]/8 pt-4 mt-auto">
                      {sold.specs?.beds !== undefined ? (
                        <>
                          <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-[#C8A951]" /> {sold.specs.beds} Bed
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-3.5 h-3.5 text-[#C8A951]" /> {sold.specs.baths} Bath
                          </span>
                          <span className="flex items-center gap-1">
                            <Maximize className="w-3.5 h-3.5 text-[#C8A951]" /> {sold.specs.sqft} SqFt
                          </span>
                        </>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Trees className="w-3.5 h-3.5 text-[#C8A951]" /> {sold.specs?.lotSize} ({sold.specs?.sqft} SqFt)
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#111111]/6 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#111111]/60 group-hover:text-[#9A7D3A]">
                      <span>Advised by {sold.agent?.name}</span>
                      <span className="flex items-center gap-1">
                        Case Study <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          COLLECTIVE SECTION 3: THE DAVIS & GARNETT REPRESENTATION STANDARD
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Bespoke Advisory Methodology
            </span>
            <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111] mb-4">
              The Davis & Garnett Representation Standard
            </h2>
            <p className="text-[#111111]/65 font-light text-base leading-relaxed">
              Unlike single-track residential agents or volume commercial brokerages, Mark Davis and Rachael Garnett unite institutional commercial underwriting with luxury residential storytelling under one coordinated practice.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-7 h-7 text-[#C8A951]" />,
                tag: "01 · Luxury Residential Estates",
                title: "Architectural Positioning & Editorial Marketing",
                lead: "Led by Rachael Garnett (FL Lic. #3378601)",
                description:
                  "Every residential listing — from custom Tampa Bay waterfront estates like 'The Vistara' in Bahama Shores to golf course homes in Bradenton and Land O' Lakes — receives bespoke digital dossiers, architectural photography, 3D Matterport walkthroughs, and targeted syndication to qualified Gulf Coast and out-of-state cash buyers.",
                bullets: [
                  "Pre-listing structural, seawall & inspection readiness",
                  "Dedicated custom property showcase pages & private tour curation",
                  "Data-backed comparative pricing to maximize net seller proceeds"
                ]
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-[#C8A951]" />,
                tag: "02 · Commercial & Mixed-Use Assets",
                title: "Institutional Underwriting & Deal Structuring",
                lead: "Led by Mark Davis (FL Lic. #3209459)",
                description:
                  "Commercial and mixed-use dispositions such as our dual-building Brandon corridor offering require rigorous financial packaging. We prepare comprehensive Offering Memorandums detailing utility separation, zoning flexibility, traffic counts, ADA compliance, and owner-user vs. multi-tenant yield scenarios.",
                bullets: [
                  "Full Offering Memorandum (OM) & pro-forma underwriting",
                  "Direct outreach to 1031 exchange buyers, medical/legal practices & family offices",
                  "Lease structuring, zoning verification & environmental coordination"
                ]
              },
              {
                icon: <Compass className="w-7 h-7 text-[#C8A951]" />,
                tag: "03 · Land, Acreage & Off-Market Sourcing",
                title: "Corridor Entitlement & Strategic Land Banking",
                lead: "Joint Commercial & Residential Land Advisory",
                description:
                  "From 79.54-acre Central Florida highway development tracts in Polk County to gated 19.72-acre timberland sanctuaries in Marion County, we advise land owners and developers on highest-and-best-use analysis, agricultural tax exemptions, and off-market parcel assemblages.",
                bullets: [
                  "FDOT corridor analysis, FLU/zoning entitlement & density mapping",
                  "Agricultural (Greenbelt) tax preservation & timber valuation",
                  "Confidential off-market acquisition sourcing across Central & West Florida"
                ]
              }
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-[#fbfbf9] rounded-2xl p-8 border border-[#111111]/8 flex flex-col justify-between hover:border-[#C8A951]/50 transition-colors"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <span className="text-[#9A7D3A] text-[10px] font-bold uppercase tracking-[0.25em] block mb-2">
                    {pillar.tag}
                  </span>
                  <h3 className="font-aiveritas text-2xl sm:text-3xl text-[#111111] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold text-[#111111]/55 mb-4">{pillar.lead}</p>
                  <p className="text-[#111111]/70 font-light text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <ul className="space-y-2.5 border-t border-[#111111]/8 pt-5">
                  {pillar.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-xs text-[#111111]/75 font-medium"
                    >
                      <CheckCircle className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          COLLECTIVE SECTION 4: REQUEST A CONFIDENTIAL PROPERTY VALUATION OR PORTFOLIO REVIEW
         ══════════════════════════════════════════════════════════════════ */}
      <section
        id="valuation-request"
        className="py-24 px-6 lg:px-10 bg-[#f5f3ef]"
      >
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Advisory Pitch & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block">
              Confidential Advisory Consultation
            </span>
            <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111] leading-tight">
              Request a Confidential Property Valuation or Portfolio Review
            </h2>
            <p className="text-[#111111]/70 font-light text-base leading-relaxed">
              Considering the disposition of a waterfront residence, commercial office/retail asset, or Central Florida land parcel? Mark Davis and Rachael Garnett provide complimentary, institutionally researched broker opinion of value (BOV) and comparative market analyses (CMA).
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-[#111111]/8 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#111111] text-sm">Mark Davis</p>
                  <p className="text-xs text-[#9A7D3A] font-semibold">
                    Commercial, Mixed-Use & Land · FL Lic. #3209459
                  </p>
                  <p className="text-xs text-[#111111]/55 mt-0.5">mark@davisgarnettsells.com</p>
                </div>
                <a
                  href="tel:813-486-9072"
                  className="px-4 py-2.5 bg-[#111111] text-[#C8A951] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> 813-486-9072
                </a>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#111111]/8 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#111111] text-sm">Rachael Garnett</p>
                  <p className="text-xs text-[#9A7D3A] font-semibold">
                    Luxury Residential & Waterfront · FL Lic. #3378601
                  </p>
                  <p className="text-xs text-[#111111]/55 mt-0.5">
                    rachael@davisgarnettsells.com
                  </p>
                </div>
                <a
                  href="tel:727-254-0244"
                  className="px-4 py-2.5 bg-[#111111] text-[#C8A951] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> 727-254-0244
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Form Wired to POST /api/leads */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#111111]/10">
              {valStatus === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle className="w-14 h-14 text-[#C8A951] mx-auto" />
                  <h3 className="font-aiveritas text-3xl text-[#111111]">
                    Valuation Request Logged
                  </h3>
                  <p className="text-[#111111]/65 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, {valForm.firstName}. Mark Davis and Rachael Garnett have received your confidential request and will prepare your custom valuation dossier.
                  </p>
                  <button
                    onClick={() => setValStatus("idle")}
                    className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-xl"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleValuationSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#111111]/8 pb-4 mb-2">
                    <div>
                      <span className="text-[#9A7D3A] text-[10px] font-bold uppercase tracking-[0.25em] block">
                        Direct Principal Intake
                      </span>
                      <h3 className="font-aiveritas text-2xl text-[#111111]">
                        Property & Portfolio Valuation Dossier
                      </h3>
                    </div>
                    <ShieldCheck className="w-6 h-6 text-[#C8A951]" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        value={valForm.firstName}
                        onChange={(e) =>
                          setValForm((f) => ({ ...f, firstName: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Last Name"
                        value={valForm.lastName}
                        onChange={(e) =>
                          setValForm((f) => ({ ...f, lastName: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={valForm.email}
                        onChange={(e) =>
                          setValForm((f) => ({ ...f, email: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(813) 000-0000"
                        value={valForm.phone}
                        onChange={(e) =>
                          setValForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                        Asset Classification
                      </label>
                      <select
                        value={valForm.assetCategory}
                        onChange={(e) =>
                          setValForm((f) => ({ ...f, assetCategory: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="Residential Estate">Luxury Residential / Waterfront</option>
                        <option value="Commercial / Mixed-Use">Commercial / Mixed-Use Asset</option>
                        <option value="Land & Development Acreage">Land & Development Acreage</option>
                        <option value="Multi-Property Portfolio">Multi-Property Portfolio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                        Consultation Objective
                      </label>
                      <select
                        value={valForm.inquiryType}
                        onChange={(e) =>
                          setValForm((f) => ({ ...f, inquiryType: e.target.value }))
                        }
                        className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="Confidential Property Valuation">
                          Confidential Property Valuation (BOV / CMA)
                        </option>
                        <option value="Exclusive Seller Representation">
                          Exclusive Seller Representation
                        </option>
                        <option value="Buyer / 1031 Acquisition Search">
                          Buyer / 1031 Exchange Acquisition Search
                        </option>
                        <option value="Portfolio Advisory Review">
                          Hold / Sell Portfolio Advisory Review
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                      Property Street Address or Parcel ID / County
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. St. Petersburg Waterfront, Hwy 60 Brandon, or Polk County Parcel"
                      value={valForm.propertyAddress}
                      onChange={(e) =>
                        setValForm((f) => ({ ...f, propertyAddress: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#111111]/60 mb-1.5">
                      Additional Context or Timeline
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share any relevant property specifications, target timeline, or questions for Mark & Rachael..."
                      value={valForm.notes}
                      onChange={(e) =>
                        setValForm((f) => ({ ...f, notes: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] focus:outline-none focus:border-[#C8A951] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={valStatus === "submitting"}
                    className="w-full py-4 bg-[#111111] hover:bg-[#C8A951] hover:text-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {valStatus === "submitting"
                      ? "Transmitting Request..."
                      : "Request Confidential Valuation / Portfolio Review"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111111] py-16 px-6 lg:px-10 border-t border-[#C8A951]/25">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-[10px] uppercase tracking-widest max-w-2xl leading-relaxed">
            Davis & Garnett Real Estate Advisors · Mark Davis (FL Lic. #3209459) & Rachael Garnett (FL Lic. #3378601) · Brokered by Align Right Realty. All properties subject to prior sale, change, or withdrawal. Equal Housing Opportunity.
          </p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest shrink-0">
            © {new Date().getFullYear()} Davis & Garnett
          </p>
        </div>
      </footer>
    </div>
  );
}

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
import SiteFooter from "@/components/SiteFooter";
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
      <section className="relative w-full pt-32 pb-16 px-6 lg:px-10 bg-[#f5f3ef] border-b border-[#111111]/10 overflow-hidden min-h-[680px] flex flex-col justify-center">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url('/dg-favicon-fat.png')",
            backgroundSize: "200px",
            backgroundRepeat: "repeat"
          }}
        />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Davis &amp; Garnett · Tampa Bay Real Estate Listings
            </span>
            <h1 className="font-aiveritas text-5xl sm:text-7xl lg:text-8xl text-[#111111] leading-none mb-6">
              Our Listings
            </h1>
            <p className="text-[#111111]/75 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              Explore our active residential homes, commercial properties, Central Florida land, waterfront and unique properties, and recent sales across Tampa Bay.
            </p>
          </div>

          {/* Executive Stats Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
            {[
              {
                value: "$9.29M+",
                label: "Active Listings",
                sub: "Featured Homes, Land & Commercial"
              },
              {
                value: "99.65+ Ac",
                label: "Active Land & Waterfront",
                sub: "Polk, Marion & Pinellas"
              },
              {
                value: "Proven",
                label: "2026 Closed Sales",
                sub: "Verified Gulf Coast Closings"
              },
              {
                value: "Full-Service",
                label: "Two-Agent Team",
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
                  Featured Offerings · Active Inventory
                </span>
                <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111]">
                  Active Listings
                </h2>
              </div>
              <p className="text-[#111111]/70 text-base md:text-[17px] max-w-md font-light leading-relaxed">
                Click any property below to view full photos, property details, and tour information.
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
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                                alt="Mark Davis"
                                className="w-6 h-6 rounded-full object-cover object-top border border-[#C8A951]"
                              />
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                                alt="Rachael Garnett"
                                className="w-6 h-6 rounded-full object-cover object-[center_30%] border border-[#C8A951]"
                              />
                            </div>
                            <span className="text-xs text-[#111111]/60 font-medium">
                              Mark Davis &amp; Rachael Garnett
                            </span>
                          </div>
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

                        <p className="text-[#111111]/75 font-light text-base leading-relaxed mb-6 line-clamp-3">
                          {listing.description}
                        </p>

                        {/* Highlights 2-col checklist */}
                        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                          {listing.highlights.slice(0, 4).map((h) => (
                            <div
                              key={h}
                              className="flex items-start gap-2 text-xs md:text-sm text-[#111111]/80"
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
                  Proven Results · 2026 Closed Sales
                </span>
                <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111]">
                  Recent Sold Properties
                </h2>
              </div>
              <p className="text-[#111111]/70 text-base md:text-[17px] max-w-md font-light leading-relaxed">
                From golf course homes in Bradenton and Land O&apos; Lakes to waterfront properties in Inverness, explore recent sales represented by Mark and Rachael across Tampa Bay and Central Florida.
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
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                            alt="Mark Davis"
                            className="w-5 h-5 rounded-full object-cover object-top border border-[#C8A951]"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                            alt="Rachael Garnett"
                            className="w-5 h-5 rounded-full object-cover object-[center_30%] border border-[#C8A951]"
                          />
                        </div>
                        <span>Mark Davis &amp; Rachael Garnett</span>
                      </div>
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
          COLLECTIVE SECTION 3: HOW WE WORK TOGETHER FOR OUR SELLERS & BUYERS
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-10 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Two Certified Agents on Every Listing
            </span>
            <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111] mb-4">
              How Mark &amp; Rachael Represent Your Property
            </h2>
            <p className="text-[#111111]/75 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              Most agents only handle houses or only handle commercial properties. Because Mark Davis and Rachael Garnett are both certified in residential and commercial real estate, you get two hands-on partners who know how to market your home, building, or land.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-7 h-7 text-[#C8A951]" />,
                tag: "01 · Homes, Condos & Waterfront",
                title: "Standout Photos, 3D Tours & Smart Pricing",
                lead: "Mark Davis, REALTOR® & Rachael Garnett, REALTOR®",
                description:
                  "Every residential listing—from waterfront homes like 'The Vistara' in Bahama Shores to golf course homes in Bradenton and Land O' Lakes—gets professional photography, 3D virtual tours, dedicated property pages, and targeted marketing to local and out-of-state buyers.",
                bullets: [
                  "Upfront home, roof & seawall prep guidance",
                  "Custom property showcase pages & private showings",
                  "Clear neighborhood pricing data to help you net more"
                ]
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-[#C8A951]" />,
                tag: "02 · Commercial & Mixed-Use Properties",
                title: "Clear Financial Packages & Buyer Outreach",
                lead: "Mark Davis, REALTOR® & Rachael Garnett, REALTOR®",
                description:
                  "Selling a commercial or mixed-use property—like our two-building listing in Brandon—takes clear numbers. We put together straightforward property packages showing utility setups, zoning uses, traffic counts, and income potential for business owners and investors.",
                bullets: [
                  "Complete property info packets & income breakdowns",
                  "Direct outreach to 1031 exchange buyers & local business owners",
                  "Help with lease terms, zoning checks & inspections"
                ]
              },
              {
                icon: <Compass className="w-7 h-7 text-[#C8A951]" />,
                tag: "03 · Land, Acreage & Off-Market Searches",
                title: "Zoning Research & Florida Land Guidance",
                lead: "Mark Davis, REALTOR® & Rachael Garnett, REALTOR®",
                description:
                  "From 79.54-acre highway tracts in Polk County to gated 19.72-acre timberland parcels in Marion County, we help landowners and buyers understand road access, future land use, agricultural tax exemptions, and off-market opportunities.",
                bullets: [
                  "Road frontage, zoning & future land-use checks",
                  "Agricultural (Greenbelt) & timber tax exemption guidance",
                  "Private off-market land searches across Central & West Florida"
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
                  <p className="text-[#111111]/75 font-light text-base leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <ul className="space-y-2.5 border-t border-[#111111]/8 pt-5">
                  {pillar.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-xs md:text-sm text-[#111111]/80 font-medium"
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
              Free Property Value Estimate
            </span>
            <h2 className="font-aiveritas text-4xl sm:text-5xl text-[#111111] leading-tight">
              Thinking About Selling Your Home, Building, or Land?
            </h2>
            <p className="text-[#111111]/70 font-light text-base leading-relaxed">
              Curious what your home, commercial property, or Florida acreage could sell for today? Mark Davis and Rachael Garnett put together free, no-pressure market value reports (CMA / BOV) with real local sales numbers.
            </p>

            <div className="space-y-4 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-[#111111]/8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                    alt="Mark Davis"
                    className="w-14 h-14 rounded-full object-cover object-top border border-[#C8A951] shrink-0"
                  />
                  <div>
                    <p className="font-bold text-[#111111] text-sm">Mark Davis</p>
                    <p className="text-xs text-[#9A7D3A] font-semibold">
                      Commercial &amp; Residential Advisor · FL Lic. #3209459
                    </p>
                    <p className="text-xs text-[#111111]/55 mt-0.5">mark@davisgarnettsells.com</p>
                  </div>
                </div>
                <a
                  href="tel:941-737-4127"
                  className="px-4 py-2.5 bg-[#111111] text-[#C8A951] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" /> 941-737-4127
                </a>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#111111]/8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                    alt="Rachael Garnett"
                    className="w-14 h-14 rounded-full object-cover object-[center_30%] border border-[#C8A951] shrink-0"
                  />
                  <div>
                    <p className="font-bold text-[#111111] text-sm">Rachael Garnett</p>
                    <p className="text-xs text-[#9A7D3A] font-semibold">
                      Commercial &amp; Residential Advisor · FL Lic. #3378601
                    </p>
                    <p className="text-xs text-[#111111]/55 mt-0.5">
                      rachael@davisgarnettsells.com
                    </p>
                  </div>
                </div>
                <a
                  href="tel:727-808-3344"
                  className="px-4 py-2.5 bg-[#111111] text-[#C8A951] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" /> 727-808-3344
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
                        Free Value Estimate
                      </span>
                      <h3 className="font-aiveritas text-2xl text-[#111111]">
                        Request a Property Value Estimate
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

      <SiteFooter />
    </div>
  );
}

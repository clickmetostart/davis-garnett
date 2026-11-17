"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
  Building2,
  Home,
  Database,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import SiteFooter from "@/components/SiteFooter";
import listingsJson from "@/data/listings.json";
import type { Listing } from "@/types/listings";
import { smoothScrollToId } from "@/lib/smoothScroll";

interface MlsPropertyItem {
  id: string;
  slug?: string;
  mlsNumber: string;
  title: string;
  streetAddress: string;
  city: string;
  neighborhood: string;
  state: string;
  zip: string;
  askingPrice: string;
  numericPrice: number;
  bedrooms: number;
  bathrooms: number;
  sqFt: string;
  propertyType: "Single Family" | "Condo / Tower" | "Townhome" | "Commercial" | "Land & Acreage" | "Waterfront Estate";
  category: "Residential" | "Commercial" | "Land";
  status: string;
  imageUrl: string;
  source: "Davis & Garnett Exclusive" | "Align Right Carrollwood Office" | "Lofty Stellar MLS Feed";
  href: string;
}

const FALLBACK_MLS_LISTINGS: MlsPropertyItem[] = (listingsJson as unknown as Listing[])
  .filter((item) => item.status === "Active" && item.editorialStatus !== "draft")
  .map((item) => ({
    id: `dg-active-${item.id}`,
    slug: item.slug,
    mlsNumber: item.mlsId || `DG-${item.id}`,
    title: item.subtitle ? `${item.title} — ${item.subtitle}` : item.title,
    streetAddress: item.address || item.streetAddress || item.title,
    city: item.city,
    neighborhood: item.neighborhood || item.county,
    state: item.state,
    zip: item.zip,
    askingPrice: item.price || item.askingPrice || "Contact Advisors",
    numericPrice: item.priceNumeric || 0,
    bedrooms: Number(item.specs?.beds || 0),
    bathrooms: Number(item.specs?.baths || 0),
    sqFt: item.specs?.sqft || item.specs?.lotSize || "Custom Offering",
    propertyType:
      item.category === "Commercial"
        ? "Commercial"
        : item.category === "Land"
        ? "Land & Acreage"
        : item.specs?.waterfrontFeet
        ? "Waterfront Estate"
        : "Single Family",
    category:
      item.category === "Commercial"
        ? "Commercial"
        : item.category === "Land"
        ? "Land"
        : "Residential",
    status:
      item.listingOrigin === "align-right-office"
        ? "Align Right Carrollwood Office"
        : `${item.status} — ${item.representation || "Exclusive"}`,
    imageUrl:
      typeof item.images?.main === "string"
        ? item.images.main
        : "/placeholders/dg-brand-placeholder.webp",
    source:
      item.listingOrigin === "align-right-office"
        ? "Align Right Carrollwood Office"
        : "Davis & Garnett Exclusive",
    href: `/listings/${item.slug}`,
  }));

export default function SearchMlsDiscoveryPortal() {
  const [listings, setListings] = useState<MlsPropertyItem[]>(FALLBACK_MLS_LISTINGS);
  const [loftyConnected, setLoftyConnected] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const [selectedPriceBracket, setSelectedPriceBracket] = useState("All");
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);

  // Off-Market & Pocket Listing Lead Form State
  const [pocketForm, setPocketForm] = useState({
    name: "",
    email: "",
    phone: "",
    targetCorridors: "South Tampa / Bayshore / Davis Islands",
    propertyCategory: "Luxury Single-Family or Waterfront",
    priceRange: "$1.0M – $2.5M",
    criteriaNotes: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Fetch both live /api/lofty/listings AND Davis & Garnett's /api/listings
  useEffect(() => {
    async function loadCombinedMlsData() {
      setLoadingFeed(true);
      try {
        const [loftyRes, dgRes] = await Promise.allSettled([
          fetch("/api/lofty/listings"),
          fetch("/api/listings"),
        ]);

        const combined: MlsPropertyItem[] = [];

        // 1. Map Davis & Garnett Exclusive Active Listings (/listings/[slug])
        if (dgRes.status === "fulfilled" && dgRes.value.ok) {
          const dgData = await dgRes.value.json();
          if (Array.isArray(dgData)) {
            dgData
              .filter((l: any) => l.status === "Active" && l.featured)
              .forEach((l: any, idx: number) => {
                const rawPrice = String(l.askingPrice || l.askingRent || "1000000").replace(
                  /[^0-9]/g,
                  ""
                );
                combined.push({
                  id: `dg-live-${l.id || idx}`,
                  slug: l.slug,
                  mlsNumber: `DG-${1040 + idx}`,
                  title: l.title,
                  streetAddress: l.streetAddress || "Tampa Bay",
                  city: l.city || "Tampa",
                  neighborhood: l.city || "Tampa Bay",
                  state: l.state || "FL",
                  zip: l.zip || "33602",
                  askingPrice: l.askingPrice || (l.askingRent ? `${l.askingRent}/SF NNN` : "Contact Us"),
                  numericPrice: Number(rawPrice) || 1200000,
                  bedrooms: Number(l.bedrooms) || 0,
                  bathrooms: Number(l.bathrooms) || 2,
                  sqFt: l.sqFt || l.availableSpaceSqFt || "3,200",
                  propertyType:
                    l.category === "Commercial"
                      ? "Commercial"
                      : l.category === "Land"
                      ? "Land & Acreage"
                      : "Single Family",
                  category:
                    l.category === "Commercial"
                      ? "Commercial"
                      : l.category === "Land"
                      ? "Land"
                      : "Residential",
                  status: `Exclusive — ${l.transactionType || "Active"}`,
                  imageUrl:
                    l.images?.[0]?.url && !l.images[0].url.includes("unsplash.com")
                      ? l.images[0].url
                      : l.category === "Commercial"
                      ? "/com_luxury_retail_1787632885082.png"
                      : "/res_modern_mansion_1787632812473.png",
                  source: "Davis & Garnett Exclusive",
                  href: `/listings/${l.slug}`,
                });
              });
          }
        }

        // 2. Map Live Lofty MLS API Feed if authenticated
        if (loftyRes.status === "fulfilled" && loftyRes.value.ok) {
          const loftyData = await loftyRes.value.json();
          if (Array.isArray(loftyData) && loftyData.length > 0) {
            setLoftyConnected(true);
            loftyData.forEach((item: any, idx: number) => {
              const rawPrice = String(item.askingPrice || "950000").replace(/[^0-9]/g, "");
              combined.push({
                id: `lofty-live-${item.id || idx}`,
                mlsNumber: String(item.id || `TB840${idx}`),
                title: item.title || "Tampa Bay MLS Property",
                streetAddress: item.title || "Tampa Bay",
                city: item.city || "Tampa",
                neighborhood: item.city || "Tampa Bay",
                state: item.state || "FL",
                zip: item.zip || "33602",
                askingPrice: item.askingPrice || "$950,000",
                numericPrice: Number(rawPrice) || 950000,
                bedrooms: Number(item.bedrooms) || 3,
                bathrooms: Number(item.bathrooms) || 2,
                sqFt: String(item.sqFt || "2,500"),
                propertyType: "Single Family",
                category: "Residential",
                status: item.status || "Active MLS",
                imageUrl: item.images?.[0]?.url || "/res_waterfront_estate_1787632802890.png",
                source: "Lofty Stellar MLS Feed",
                href: "#lofty-idx-container",
              });
            });
          }
        }

        // Merge with curated Stellar MLS regional showcase so filter combinations always return rich results
        const existingSlugs = new Set(combined.map((c) => c.slug).filter(Boolean));
        const supplemental = FALLBACK_MLS_LISTINGS.filter(
          (f) => !f.slug || !existingSlugs.has(f.slug)
        );
        setListings([...combined, ...supplemental]);
      } catch (err) {
        console.error("MLS fetch fallback used:", err);
      } finally {
        setLoadingFeed(false);
      }
    }

    loadCombinedMlsData();
  }, []);

  // Filtered Listings Computation
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.neighborhood.toLowerCase().includes(q) ||
        item.zip.toLowerCase().includes(q) ||
        item.mlsNumber.toLowerCase().includes(q) ||
        item.streetAddress.toLowerCase().includes(q);

      const matchesType =
        selectedPropertyType === "All" || item.propertyType === selectedPropertyType;

      let matchesPrice = true;
      if (selectedPriceBracket === "Under $800K") {
        matchesPrice = item.numericPrice < 800000;
      } else if (selectedPriceBracket === "$800K – $1.5M") {
        matchesPrice = item.numericPrice >= 800000 && item.numericPrice <= 1500000;
      } else if (selectedPriceBracket === "$1.5M – $3.5M") {
        matchesPrice = item.numericPrice > 1500000 && item.numericPrice <= 3500000;
      } else if (selectedPriceBracket === "$3.5M+") {
        matchesPrice = item.numericPrice > 3500000;
      }

      const matchesBeds = minBeds === 0 || item.bedrooms >= minBeds;
      const matchesBaths = minBaths === 0 || item.bathrooms >= minBaths;

      return matchesQuery && matchesType && matchesPrice && matchesBeds && matchesBaths;
    });
  }, [listings, searchQuery, selectedPropertyType, selectedPriceBracket, minBeds, minBaths]);

  const handlePocketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const catLower = pocketForm.propertyCategory.toLowerCase();
      const inquiryCategory = catLower.includes("commercial")
        ? "commercial"
        : catLower.includes("land") || catLower.includes("acreage")
        ? "land"
        : "showing";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pocketForm.name,
          email: pocketForm.email,
          phone: pocketForm.phone,
          category: inquiryCategory,
          subject: `Custom Property Search — ${pocketForm.propertyCategory}`,
          targetCorridors: pocketForm.targetCorridors,
          propertyCategory: pocketForm.propertyCategory,
          priceRange: pocketForm.priceRange,
          message: pocketForm.criteriaNotes,
          source: "Property Search Page (/search-mls)",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setFormStatus("success");
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedPropertyType("All");
    setSelectedPriceBracket("All");
    setMinBeds(0);
    setMinBaths(0);
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO & SEARCH BAR HEADER ── */}
      <section className="relative pt-32 pb-12 px-6 md:px-12 bg-[#111111] text-white border-b border-[#C8A951]/30 overflow-hidden min-h-[680px] flex flex-col justify-center">
        <FaviconHeroBackground variant="dark" />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Davis &amp; Garnett · Stellar MLS &amp; Lofty IDX Portal
            </span>
            <h1 className="font-aiveritas text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-6">
              Search <span className="text-[#C8A951]">MLS</span>
            </h1>
            <p className="text-base md:text-[17px] lg:text-[18px] text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-6">
              Browse single-family homes, condos, commercial properties, land, and waterfront and unique properties across Hillsborough, Pinellas, and Pasco counties.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => smoothScrollToId("lofty-idx-container")}
                className="group px-5 py-3 rounded-xl bg-white/10 hover:bg-white hover:text-[#111111] border border-white/20 hover:border-white text-xs uppercase tracking-[0.18em] font-bold text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C8A951] group-hover:text-[#111111] transition-colors" /> Search With Map
              </button>
              <button
                type="button"
                onClick={() => smoothScrollToId("pocket-listing-form")}
                className="group px-5 py-3 rounded-xl bg-[#C8A951] hover:bg-white text-[#111111] text-xs uppercase tracking-[0.18em] font-bold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#111111] group-hover:text-[#9A7D3A] transition-colors" /> Off-Market Access
              </button>
            </div>
          </div>

          {/* ── COMPREHENSIVE V1-LIGHT SEARCH & FILTER BAR ── */}
          <div className="bg-white text-[#111111] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#C8A951]/40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
              {/* Keyword / City / Zip / MLS# */}
              <div className="lg:col-span-4">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] mb-2">
                  City, Neighborhood, Zip or MLS #
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#111111]/45 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tampa, St. Pete, Wesley Chapel, 33629, TB840..."
                    className="w-full bg-[#f5f3ef] border border-[#111111]/15 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#C8A951]"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="lg:col-span-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] mb-2">
                  Property Type
                </label>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full bg-[#f5f3ef] border border-[#111111]/15 rounded-xl px-3.5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                >
                  <option value="All">All Types</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Condo / Tower">Condo / Tower</option>
                  <option value="Waterfront Estate">Waterfront Estate</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land & Acreage">Land &amp; Acreage</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="lg:col-span-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPriceBracket}
                  onChange={(e) => setSelectedPriceBracket(e.target.value)}
                  className="w-full bg-[#f5f3ef] border border-[#111111]/15 rounded-xl px-3.5 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                >
                  <option value="All">Any Price</option>
                  <option value="Under $800K">Under $800K</option>
                  <option value="$800K – $1.5M">$800K – $1.5M</option>
                  <option value="$1.5M – $3.5M">$1.5M – $3.5M</option>
                  <option value="$3.5M+">$3.5M+ Luxury</option>
                </select>
              </div>

              {/* Beds */}
              <div className="lg:col-span-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] mb-2">
                  Beds
                </label>
                <select
                  value={minBeds}
                  onChange={(e) => setMinBeds(Number(e.target.value))}
                  className="w-full bg-[#f5f3ef] border border-[#111111]/15 rounded-xl px-3 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                >
                  <option value={0}>Any</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                </select>
              </div>

              {/* Baths */}
              <div className="lg:col-span-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] mb-2">
                  Baths
                </label>
                <select
                  value={minBaths}
                  onChange={(e) => setMinBaths(Number(e.target.value))}
                  className="w-full bg-[#f5f3ef] border border-[#111111]/15 rounded-xl px-3 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                >
                  <option value={0}>Any</option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                </select>
              </div>

              {/* Reset / Search Button */}
              <div className="lg:col-span-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full py-3.5 px-4 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Quick Submarket Filter Pills */}
            <div className="mt-5 pt-4 border-t border-[#111111]/10 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#111111]/50 font-bold mr-2">
                Popular Searches:
              </span>
              {[
                { label: "All Markets", query: "" },
                { label: "St. Petersburg / Bahama Shores", query: "St. Petersburg" },
                { label: "Brandon Commercial", query: "Brandon" },
                { label: "Polk / Marion Land", query: "Acres" },
                { label: "South Tampa / Bayshore", query: "Bayshore" },
                { label: "Downtown / Water St.", query: "Water Street" },
                { label: "Wesley Chapel", query: "Wesley Chapel" },
                { label: "Land O' Lakes", query: "Land O' Lakes" },
                { label: "Clearwater / Dunedin", query: "Clearwater" },
                { label: "Bradenton / Sarasota", query: "Bradenton" },
                { label: "Carrollwood / Northdale", query: "Carrollwood" },
              ].map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => setSearchQuery(pill.query)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border ${
                    searchQuery === pill.query
                      ? "bg-[#111111] text-[#C8A951] border-[#111111]"
                      : "bg-[#f5f3ef] text-[#111111]/75 border-[#111111]/10 hover:border-[#C8A951]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE MLS & EXCLUSIVE LISTINGS RESULTS GRID ── */}
      <section className="py-20 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9A7D3A] font-bold mb-1">
                <RefreshCw className={`w-3.5 h-3.5 ${loadingFeed ? "animate-spin" : ""}`} />
                <span>
                  {loftyConnected
                    ? "Connected to Live Lofty MLS + Davis & Garnett Exclusive Portfolio"
                    : "Active Davis & Garnett Offerings · Live Stellar MLS & Lofty IDX Feeds Connecting Soon"}
                </span>
              </div>
              <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111111]">
                Showing {filteredListings.length} Properties
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/properties"
                className="px-5 py-2.5 rounded-xl bg-[#f5f3ef] hover:bg-[#111111] text-[#111111] hover:text-white border border-[#111111]/15 text-xs uppercase tracking-[0.18em] font-bold transition-colors"
              >
                Explore Portfolio Hub →
              </Link>
              <Link
                href="/developments"
                className="px-5 py-2.5 rounded-xl bg-[#C8A951]/15 hover:bg-[#C8A951] text-[#9A7D3A] hover:text-[#111111] border border-[#C8A951]/40 text-xs uppercase tracking-[0.18em] font-bold transition-colors"
              >
                New Developments →
              </Link>
            </div>
          </div>

          {!loftyConnected && !loadingFeed && (
            <div className="mb-10 p-6 rounded-2xl bg-[#f5f3ef] border border-[#C8A951]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] block mb-1">
                  MLS / Lofty IDX Integration Status
                </span>
                <p className="text-sm text-[#111111]/80 font-light">
                  Live neighborhood Stellar MLS &amp; Lofty IDX feeds are coming as soon as final brokerage approval and feed hookup are completed. Browse our verified active offerings below or request custom pocket alerts directly from Mark &amp; Rachael.
                </p>
              </div>
              <Link
                href="/properties#carrollwood-office"
                className="px-5 py-2.5 rounded-xl bg-[#111111] text-[#C8A951] hover:bg-[#C8A951] hover:text-[#111111] text-xs font-bold uppercase tracking-widest shrink-0 transition-colors"
              >
                View Carrollwood Office Hub →
              </Link>
            </div>
          )}

          {filteredListings.length === 0 ? (
            <div className="bg-[#f5f3ef] border border-[#111111]/10 rounded-3xl p-16 text-center">
              <Search className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                No Matching Active Listings Found
              </h3>
              <p className="text-sm text-[#111111]/65 max-w-md mx-auto mb-6">
                Many waterfront, South Tampa, and new-construction properties trade off-market
                before hitting public MLS feeds. Reset your filters or request a custom pocket-listing
                search below.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors"
              >
                Reset All Search Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold ${
                            item.source === "Davis & Garnett Exclusive"
                              ? "bg-[#C8A951] text-[#111111]"
                              : "bg-[#111111]/90 text-white border border-white/15"
                          }`}
                        >
                          {item.source}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#111111] text-[10px] font-bold uppercase tracking-wider">
                          MLS# {item.mlsNumber}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
                        <div className="font-aiveritas text-2xl md:text-3xl text-white">
                          {item.askingPrice}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C8A951] font-bold">
                          {item.propertyType}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-1">
                        {item.neighborhood}
                      </div>
                      <h3 className="font-aiveritas text-2xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#111111]/60 flex items-center gap-1.5 mb-5">
                        <MapPin className="w-3.5 h-3.5 text-[#C8A951] shrink-0" />
                        <span>
                          {item.streetAddress}, {item.city}, {item.state} {item.zip}
                        </span>
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#111111]/10 text-xs text-[#111111]/80 font-medium">
                        {item.category === "Commercial" ? (
                          <div className="col-span-2 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-[#C8A951]" />
                            <span>Commercial Asset</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5">
                              <Bed className="w-4 h-4 text-[#C8A951]" />
                              <span>{item.bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Bath className="w-4 h-4 text-[#C8A951]" />
                              <span>{item.bathrooms} Baths</span>
                            </div>
                          </>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Maximize2 className="w-4 h-4 text-[#C8A951]" />
                          <span>{item.sqFt} SF</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#111111]/8 flex items-center justify-between text-xs uppercase tracking-[0.18em] font-bold text-[#9A7D3A] group-hover:text-[#111111] transition-colors">
                    <span>
                      {item.source === "Davis & Garnett Exclusive"
                        ? "View Featured Listing"
                        : "Request Property Info / Tour"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── DEDICATED LOFTY MLS IDX INTEGRATION CONTAINER ── */}
      <section
        id="lofty-idx-container"
        className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
                <Sparkles className="w-4 h-4 text-[#C8A951]" />
                <span>Direct Stellar MLS + Lofty IDX Integration</span>
              </div>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111]">
                Interactive Map &amp; Full Stellar MLS Search
              </h2>
            </div>
            <p className="text-base md:text-[17px] text-[#111111]/75 font-light max-w-md leading-relaxed">
              Draw custom map boundaries, set up price-drop alerts, and search active residential and commercial listings across Greater Tampa Bay.
            </p>
          </div>

          {/* Styled V1-Light Lofty IDX Embed Wrapper */}
          <div className="bg-white rounded-3xl border-2 border-[#C8A951]/40 shadow-xl overflow-hidden">
            {/* Browser/Portal Header Bar */}
            <div className="bg-[#111111] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#C8A951]/30">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#C8A951]" />
                  <span className="w-3 h-3 rounded-full bg-white/30" />
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-white/85 font-bold">
                  Davis &amp; Garnett × Lofty Stellar MLS IDX Engine
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#C8A951] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Real-Time Stellar MLS Sync Ready
                </span>
              </div>
            </div>

            {/* Dedicated Drop-In Mount Point for Lofty IDX Script / Iframe */}
            <div
              id="lofty-idx-embed-root"
              data-idx-provider="lofty-stellar-mls"
              className="p-8 md:p-14 bg-gradient-to-b from-[#fbfbf9] to-[#f5f3ef]"
            >
              <div className="max-w-4xl mx-auto text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#111111] text-[#C8A951] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Home className="w-8 h-8" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#9A7D3A] font-bold block mb-2">
                  Lofty IDX Interactive Map Search
                </span>
                <h3 className="font-aiveritas text-2xl md:text-4xl text-[#111111] mb-4">
                  Full-Screen Map Search &amp; Instant MLS Alerts
                </h3>
                <p className="text-sm md:text-base text-[#111111]/75 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                  This is the home of our upcoming Lofty IDX Interactive Map Search. In the meantime, use our quick neighborhood links below or reach out to set up a custom MLS property search.
                </p>

                {/* Pre-Built Quick-Launch Corridor Portals */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-10">
                  {[
                    {
                      title: "South Tampa & Bayshore",
                      sub: "Hyde Park, Davis Islands, Palma Ceia",
                      filter: "Bayshore",
                    },
                    {
                      title: "Downtown & Water Street",
                      sub: "Sky Condos, Riverwalk, Channelside",
                      filter: "Water Street",
                    },
                    {
                      title: "Wesley Chapel & Lutz",
                      sub: "Two Rivers, Connerton, Angeline, Mirada",
                      filter: "Wesley Chapel",
                    },
                    {
                      title: "St. Pete & Clearwater",
                      sub: "Snell Isle, Old Northeast, Gulf Beaches",
                      filter: "St. Petersburg",
                    },
                  ].map((corridor) => (
                    <button
                      key={corridor.title}
                      type="button"
                      onClick={() => {
                        setSearchQuery(corridor.filter);
                        window.scrollTo({ top: 280, behavior: "smooth" });
                      }}
                      className="p-5 rounded-2xl bg-white border border-[#111111]/10 hover:border-[#C8A951] shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold">
                          Quick Search
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C8A951] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="font-aiveritas text-lg text-[#111111] mb-1">
                        {corridor.title}
                      </div>
                      <div className="text-xs text-[#111111]/60">{corridor.sub}</div>
                    </button>
                  ))}
                </div>

                <div className="inline-flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#pocket-listing-form"
                    className="px-8 py-4 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-colors"
                  >
                    Contact Us
                  </a>
                  <Link
                    href="/developments"
                    className="px-8 py-4 bg-white border border-[#111111]/20 hover:border-[#C8A951] text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-colors"
                  >
                    Browse Trending Developments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFF-MARKET & POCKET LISTING ACCESS LEAD CAPTURE FORM ── */}
      <section id="pocket-listing-form" className="py-28 px-6 md:px-12 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Why Off-Market Matters */}
            <div className="lg:col-span-5">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                Custom Property Search
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-6">
                Looking for Something Specific or Off-Market?
              </h2>
              <p className="text-[#111111]/75 text-base md:text-[17px] font-light leading-relaxed mb-8">
                In many popular Tampa Bay neighborhoods—and across commercial corridors and Florida land—great properties often sell quietly as coming-soon listings, builder quick-move-ins, or off-market deals before they ever appear on public websites.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Coming-Soon Waterfront & Neighborhood Homes",
                  "Pre-Construction Condo Floor Plans & Unit Releases",
                  "Quick-Move-In Builder Homes With Current Discounts",
                  "Off-Market Commercial Buildings, Mixed-Use & Land",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span className="text-base font-medium text-[#111111]/85">{point}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#f5f3ef] border border-[#111111]/10 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C8A951] shrink-0">
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
                  <p className="text-sm text-[#111111]/75 leading-relaxed">
                    Tell us what you are looking for and we will personally keep an eye out for matching properties for you.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form Wired to POST /api/leads */}
            <div className="lg:col-span-7 bg-[#fbfbf9] rounded-3xl p-8 md:p-12 border border-[#111111]/12 shadow-xl">
              {formStatus === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C8A951]/20 text-[#9A7D3A] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-aiveritas text-3xl text-[#111111] mb-3">
                    Private Pocket-Listing Profile Activated
                  </h3>
                  <p className="text-[#111111]/70 max-w-md mx-auto mb-8 font-light leading-relaxed">
                    Thank you, <strong>{pocketForm.name}</strong>. Your acquisition criteria for{" "}
                    <strong>{pocketForm.targetCorridors}</strong> ({pocketForm.priceRange}) has been
                    routed to Mark Davis and Rachael Garnett.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl"
                  >
                    Update Search Criteria
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePocketSubmit} className="space-y-6">
                  <div className="border-b border-[#111111]/10 pb-4">
                    <h3 className="font-aiveritas text-2xl text-[#111111]">
                      Request Off-Market &amp; Custom MLS Curation
                    </h3>
                    <p className="text-xs text-[#111111]/60 mt-1">
                      Tell us what you are looking for—we will send matching on- and off-market
                      opportunities directly.
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
                        placeholder="Your Full Name"
                        value={pocketForm.name}
                        onChange={(e) => setPocketForm({ ...pocketForm, name: e.target.value })}
                        className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={pocketForm.email}
                        onChange={(e) => setPocketForm({ ...pocketForm, email: e.target.value })}
                        className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
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
                        value={pocketForm.phone}
                        onChange={(e) => setPocketForm({ ...pocketForm, phone: e.target.value })}
                        className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Target Neighborhoods / Corridors
                      </label>
                      <input
                        type="text"
                        value={pocketForm.targetCorridors}
                        onChange={(e) =>
                          setPocketForm({ ...pocketForm, targetCorridors: e.target.value })
                        }
                        placeholder="e.g., South Tampa, Wesley Chapel, St. Pete"
                        className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Property Category
                      </label>
                      <select
                        value={pocketForm.propertyCategory}
                        onChange={(e) =>
                          setPocketForm({ ...pocketForm, propertyCategory: e.target.value })
                        }
                        className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="Luxury Single-Family or Waterfront">
                          Luxury Single-Family or Waterfront
                        </option>
                        <option value="Downtown / Bayshore Luxury Condo Tower">
                          Downtown / Bayshore Luxury Condo Tower
                        </option>
                        <option value="Master-Planned New Construction">
                          Master-Planned New Construction
                        </option>
                        <option value="Commercial / Retail / Multi-Family / Land">
                          Commercial / Retail / Multi-Family / Land
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Target Budget Range
                      </label>
                      <select
                        value={pocketForm.priceRange}
                        onChange={(e) =>
                          setPocketForm({ ...pocketForm, priceRange: e.target.value })
                        }
                        className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="$400K – $800K">$400K – $800K</option>
                        <option value="$800K – $1.5M">$800K – $1.5M</option>
                        <option value="$1.0M – $2.5M">$1.0M – $2.5M</option>
                        <option value="$2.5M – $5.0M">$2.5M – $5.0M</option>
                        <option value="$5.0M+ Ultra-Luxury / Institutional">
                          $5.0M+ Ultra-Luxury / Institutional
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                      Must-Haves (Boat Lift, Lot Width, Cap Rate, School Zone, etc.)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your ideal property specifications, minimum square footage, dockage requirements, or investment yield goals..."
                      value={pocketForm.criteriaNotes}
                      onChange={(e) =>
                        setPocketForm({ ...pocketForm, criteriaNotes: e.target.value })
                      }
                      className="w-full bg-white border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      Unable to submit right now. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 px-8 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] font-bold text-xs uppercase tracking-[0.22em] rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {formStatus === "submitting"
                      ? "Activating Private Search..."
                      : "Unlock Off-Market & Pocket Listings"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter />
    </div>
  );
}

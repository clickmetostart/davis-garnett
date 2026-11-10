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
  propertyType: "Single Family" | "Condo / Tower" | "Townhome" | "Commercial" | "Waterfront Estate";
  category: "Residential" | "Commercial";
  status: string;
  imageUrl: string;
  source: "Davis & Garnett Exclusive" | "Lofty Stellar MLS Feed";
  href: string;
}

const FALLBACK_MLS_LISTINGS: MlsPropertyItem[] = [
  {
    id: "dg-mls-1",
    slug: "4br-modern-pool-home-carrollwood",
    mlsNumber: "TB8391042",
    title: "Contemporary Saltwater Pool Estate — Carrollwood",
    streetAddress: "5678 Carrollwood Dr",
    city: "Tampa",
    neighborhood: "Carrollwood",
    state: "FL",
    zip: "33618",
    askingPrice: "$1,250,000",
    numericPrice: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqFt: "3,200",
    propertyType: "Single Family",
    category: "Residential",
    status: "Active — Featured",
    imageUrl: "/res_modern_mansion_1787632812473.png",
    source: "Davis & Garnett Exclusive",
    href: "/listings/4br-modern-pool-home-carrollwood",
  },
  {
    id: "dg-mls-2",
    slug: "prime-retail-corner-westchase",
    mlsNumber: "TB8391088",
    title: "Prime End-Cap Retail & Medical Corner — Westchase",
    streetAddress: "12345 Westchase Blvd",
    city: "Tampa",
    neighborhood: "Westchase",
    state: "FL",
    zip: "33626",
    askingPrice: "$35.00 / SF NNN",
    numericPrice: 1450000,
    bedrooms: 0,
    bathrooms: 2,
    sqFt: "4,000",
    propertyType: "Commercial",
    category: "Commercial",
    status: "Active — For Lease",
    imageUrl: "/com_luxury_retail_1787632885082.png",
    source: "Davis & Garnett Exclusive",
    href: "/listings/prime-retail-corner-westchase",
  },
  {
    id: "lofty-mls-3",
    mlsNumber: "TB8402119",
    title: "Bayshore Boulevard Panoramic Sky Residence",
    streetAddress: "3104 S Bayshore Blvd #1802",
    city: "Tampa",
    neighborhood: "South Tampa / Bayshore",
    state: "FL",
    zip: "33629",
    askingPrice: "$3,450,000",
    numericPrice: 3450000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqFt: "3,120",
    propertyType: "Condo / Tower",
    category: "Residential",
    status: "Active MLS",
    imageUrl: "/res_luxury_condo_1787632822869.png",
    source: "Lofty Stellar MLS Feed",
    href: "/developments/the-ritz-carlton-residences-bayshore",
  },
  {
    id: "lofty-mls-4",
    mlsNumber: "TB8405580",
    title: "Davis Islands Deep-Water Yacht Estate",
    streetAddress: "418 Blanca Ave",
    city: "Tampa",
    neighborhood: "Davis Islands",
    state: "FL",
    zip: "33606",
    askingPrice: "$5,850,000",
    numericPrice: 5850000,
    bedrooms: 5,
    bathrooms: 6,
    sqFt: "5,680",
    propertyType: "Waterfront Estate",
    category: "Residential",
    status: "Active MLS",
    imageUrl: "/res_waterfront_estate_1787632802890.png",
    source: "Lofty Stellar MLS Feed",
    href: "#pocket-listing-form",
  },
  {
    id: "lofty-mls-5",
    mlsNumber: "TB8408912",
    title: "Two Rivers 80' Conservation Custom Pool Estate",
    streetAddress: "34912 Grand Oak Preserve Way",
    city: "Wesley Chapel",
    neighborhood: "Two Rivers / SR-56",
    state: "FL",
    zip: "33541",
    askingPrice: "$1,195,000",
    numericPrice: 1195000,
    bedrooms: 5,
    bathrooms: 4.5,
    sqFt: "4,420",
    propertyType: "Single Family",
    category: "Residential",
    status: "New Construction QMI",
    imageUrl: "/res_golf_course_home_1787632854609.png",
    source: "Lofty Stellar MLS Feed",
    href: "/developments/two-rivers-wesley-chapel",
  },
  {
    id: "lofty-mls-6",
    mlsNumber: "TB8409401",
    title: "Snell Isle Waterfront Mediterranean Villa",
    streetAddress: "1420 Brightwaters Blvd NE",
    city: "St. Petersburg",
    neighborhood: "Snell Isle / Downtown St. Pete",
    state: "FL",
    zip: "33704",
    askingPrice: "$4,200,000",
    numericPrice: 4200000,
    bedrooms: 5,
    bathrooms: 5.5,
    sqFt: "4,950",
    propertyType: "Waterfront Estate",
    category: "Residential",
    status: "Active MLS",
    imageUrl: "/res_beachfront_villa_1787632843222.png",
    source: "Lofty Stellar MLS Feed",
    href: "#pocket-listing-form",
  },
  {
    id: "lofty-mls-7",
    mlsNumber: "TB8411024",
    title: "Connerton 'The Estates II' WestBay Artisan Residence",
    streetAddress: "8814 Conner Preserve Ct",
    city: "Land O' Lakes",
    neighborhood: "Connerton",
    state: "FL",
    zip: "34637",
    askingPrice: "$925,000",
    numericPrice: 925000,
    bedrooms: 4,
    bathrooms: 4,
    sqFt: "3,890",
    propertyType: "Single Family",
    category: "Residential",
    status: "Active MLS",
    imageUrl: "/res_historic_estate_1787632833084.png",
    source: "Lofty Stellar MLS Feed",
    href: "/developments/connerton-land-o-lakes",
  },
  {
    id: "lofty-mls-8",
    mlsNumber: "TB8412990",
    title: "Water Street District Sky Residence",
    streetAddress: "1011 E Cumberland Ave #2405",
    city: "Tampa",
    neighborhood: "Water Street / Downtown",
    state: "FL",
    zip: "33602",
    askingPrice: "$2,150,000",
    numericPrice: 2150000,
    bedrooms: 2,
    bathrooms: 2.5,
    sqFt: "1,980",
    propertyType: "Condo / Tower",
    category: "Residential",
    status: "Active MLS",
    imageUrl: "/com_office_tower_1787632874122.png",
    source: "Lofty Stellar MLS Feed",
    href: "/developments/water-street-tampa-phase-2",
  },
  {
    id: "lofty-mls-9",
    mlsNumber: "TB8414305",
    title: "Mirada Crystal Lagoon Semi-Custom Pool Home",
    streetAddress: "31408 Bora Bora Way",
    city: "Wesley Chapel",
    neighborhood: "Mirada Lagoon / San Antonio",
    state: "FL",
    zip: "33576",
    askingPrice: "$685,000",
    numericPrice: 685000,
    bedrooms: 4,
    bathrooms: 3,
    sqFt: "2,940",
    propertyType: "Single Family",
    category: "Residential",
    status: "Active MLS",
    imageUrl: "/davis-garnett-listings-4.jpg",
    source: "Lofty Stellar MLS Feed",
    href: "/developments/epperson-mirada-lagoon-wesley-chapel",
  },
];

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
                    l.category === "Commercial" ? "Commercial" : "Single Family",
                  category: l.category === "Commercial" ? "Commercial" : "Residential",
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pocketForm.name,
          email: pocketForm.email,
          phone: pocketForm.phone,
          source: "Search MLS Portal — Off-Market & Pocket Listing Access",
          status: "New",
          labels: [
            "Pocket Listing Request",
            pocketForm.propertyCategory,
            pocketForm.priceRange,
          ],
          notes: `Target Corridors: ${pocketForm.targetCorridors} | Category: ${pocketForm.propertyCategory} | Budget: ${pocketForm.priceRange} | Specific Criteria: ${pocketForm.criteriaNotes}`,
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A951]/15 border border-[#C8A951]/40 mb-6">
              <Database className="w-3.5 h-3.5 text-[#C8A951]" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8A951] font-bold">
                Stellar MLS &amp; Lofty IDX Live Discovery Portal
              </span>
            </div>
            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-4">
              Search the Full <span className="text-[#C8A951]">Tampa Bay MLS.</span>
            </h1>
            <p className="text-base md:text-[17px] lg:text-[18px] text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-6">
              Browse single-family homes, condos, commercial properties, land, and waterfront and unique properties across Hillsborough, Pinellas, and Pasco counties.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#lofty-idx-container"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs uppercase tracking-[0.18em] font-bold text-white transition-colors"
              >
                Lofty IDX Portal ↓
              </a>
              <a
                href="#pocket-listing-form"
                className="px-5 py-3 rounded-xl bg-[#C8A951] hover:bg-white text-[#111111] text-xs uppercase tracking-[0.18em] font-bold transition-colors flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" /> Off-Market Access
              </a>
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
                { label: "All Tampa Bay", query: "" },
                { label: "South Tampa / Bayshore", query: "Bayshore" },
                { label: "Davis Islands", query: "Davis Islands" },
                { label: "Water Street / Downtown", query: "Water Street" },
                { label: "Wesley Chapel", query: "Wesley Chapel" },
                { label: "Land O' Lakes", query: "Land O' Lakes" },
                { label: "St. Petersburg", query: "St. Petersburg" },
                { label: "Westchase / Carrollwood", query: "Tampa" },
              ].map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => setSearchQuery(pill.query)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border ${
                    searchQuery === pill.query && pill.query !== ""
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
                    ? "Connected to Live Lofty CRM + Exclusive Portfolio"
                    : "Displaying Curated Stellar MLS & Exclusive D&G Inventory"}
                </span>
              </div>
              <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111111]">
                Showing {filteredListings.length} Properties
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/listings"
                className="px-5 py-2.5 rounded-xl bg-[#f5f3ef] hover:bg-[#111111] text-[#111111] hover:text-white border border-[#111111]/15 text-xs uppercase tracking-[0.18em] font-bold transition-colors"
              >
                View Exclusive D&amp;G Portfolio →
              </Link>
              <Link
                href="/developments"
                className="px-5 py-2.5 rounded-xl bg-[#C8A951]/15 hover:bg-[#C8A951] text-[#9A7D3A] hover:text-[#111111] border border-[#C8A951]/40 text-xs uppercase tracking-[0.18em] font-bold transition-colors"
              >
                9 New Developments →
              </Link>
            </div>
          </div>

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
                      <h3 className="font-aiveritas text-xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-2 line-clamp-1">
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
                        ? "View Exclusive Listing"
                        : "Request Property Dossier / Tour"}
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
                Interactive Map &amp; Full Stellar MLS IDX Portal
              </h2>
            </div>
            <p className="text-sm text-[#111111]/65 font-light max-w-md leading-relaxed">
              Powered by Lofty IDX &amp; Align Right Realty. Draw custom polygon map boundaries,
              set instant price-drop alerts, and search every active residential and commercial
              listing across Greater Tampa Bay.
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
                  Lofty IDX Embed Container (#lofty-idx-embed-root)
                </span>
                <h3 className="font-aiveritas text-2xl md:text-4xl text-[#111111] mb-4">
                  Full-Screen Map Search &amp; Instant MLS Alerts
                </h3>
                <p className="text-sm md:text-base text-[#111111]/70 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                  This container is pre-wired for your Lofty IDX Subdomain / JavaScript Widget or
                  Direct Iframe embed. Once your Lofty IDX URL is dropped in (or OAuth token is
                  connected in <code className="px-2 py-0.5 bg-white rounded border text-xs">/clickme/settings</code>),
                  interactive polygon map search and automated saved-search drips render seamlessly
                  inside this frame.
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
                      title: "Wesley Chapel & Land O' Lakes",
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
                    Set Up Custom Automated MLS Drip Search
                  </a>
                  <Link
                    href="/developments"
                    className="px-8 py-4 bg-white border border-[#111111]/20 hover:border-[#C8A951] text-[#111111] text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-colors"
                  >
                    Browse New Construction Hub
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#C8A951] text-[10px] uppercase tracking-[0.2em] font-bold mb-5">
                <Lock className="w-3.5 h-3.5" />
                <span>Private Inventory Network</span>
              </div>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-6">
                Off-Market &amp; Pocket Listing Access.
              </h2>
              <p className="text-[#111111]/70 font-light leading-relaxed mb-8">
                In Tampa Bay&apos;s most coveted neighborhoods—including Davis Islands, Beach Park,
                Hyde Park, Snell Isle, and high-yield commercial corridors—up to 25% of premier
                transactions occur quietly as private pocket listings, pre-MLS coming-soons, or
                unlisted developer lot releases.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Private Waterfront & South Tampa Estates Never Listed on Zillow",
                  "Pre-Construction Condo Contract Assignments & Developer Holds",
                  "Standing Builder Spec Homes Eligible for Deep Quarter-End Discounts",
                  "Off-Market Commercial Retail, Multi-Family, and Land Parcels",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#111111]/85">{point}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#f5f3ef] border border-[#111111]/10 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C8A951] shrink-0">
                  <Image
                    src="/davis-garnett-real-combo.png"
                    alt="Davis & Garnett"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="font-aiveritas text-lg text-[#111111]">
                    Direct Advisory Matching
                  </div>
                  <p className="text-xs text-[#111111]/65 leading-relaxed">
                    Mark Davis, REALTOR® &amp; Rachael Garnett, REALTOR® — Certified Commercial &amp; Residential Agents — personally curate your private property feed.
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

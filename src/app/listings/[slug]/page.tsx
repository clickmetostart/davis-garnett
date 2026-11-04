"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Home,
  Car,
  Trees,
  Building2,
  Waves,
  Compass,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Share2,
  Heart,
  Printer,
  Star,
  ShieldCheck,
  School,
  FileText,
  X,
  Expand
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import listingsData from "@/data/listings.json";
import { Listing } from "@/types/listings";

function resolveAgentAvatar(img?: string, name?: string) {
  if (!img || img === "/rachael-garnett.png") {
    return name?.toLowerCase().includes("mark")
      ? "/mark-davis-headshot.png"
      : "/rachael-garnett-headshot.png";
  }
  if (img === "/mark-davis.png") {
    return "/mark-davis-headshot.png";
  }
  return img;
}

export default function ListingDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";

  const staticMatch = (listingsData as unknown as Listing[]).find(
    (l) => l.slug === slug
  );

  const [listing, setListing] = useState<Listing | null>(staticMatch || null);
  const [isLoading, setIsLoading] = useState(!staticMatch);
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [leadForm, setLeadForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (staticMatch) {
      setListing(staticMatch);
      setIsLoading(false);
      return;
    }
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data: Listing[]) => {
        const found = data.find((l) => l.slug === slug);
        if (found) setListing(found);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [slug, staticMatch]);

  useEffect(() => {
    if (listing) {
      const actionLabel =
        listing.status === "Sold"
          ? `I saw your recent sale at ${listing.address || listing.title} (${listing.city}) and would like to request a similar property search or valuation.`
          : listing.category === "Commercial" || listing.category === "Land"
          ? `Please send the Offering Memorandum and due diligence package for ${listing.address || listing.title}, ${listing.city}, FL.`
          : `I would like to schedule a private showing for ${listing.address || listing.title}, ${listing.city}, FL ${listing.zip}.`;
      setLeadForm((prev) => ({ ...prev, notes: prev.notes || actionLabel }));
    }
  }, [listing]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] text-[#111] flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C8A951] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#111]/60 font-bold">
            Loading Property Dossier...
          </p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
        <ProposalNav />
        <div className="max-w-3xl mx-auto px-8 pt-40 pb-24 text-center">
          <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
            Portfolio Directory
          </span>
          <h1 className="font-aiveritas text-4xl md:text-6xl text-[#111] mb-6">
            Property Not Found
          </h1>
          <p className="text-[#111]/60 mb-10">
            The requested property dossier could not be located. Explore our active signature listings and recent 2026 transactions below.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#111] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#C8A951] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Portfolio Hub
          </Link>
        </div>
      </div>
    );
  }

  const galleryPhotos: string[] = Array.isArray(listing.images?.gallery) && listing.images.gallery.length > 0
    ? listing.images.gallery
    : listing.images?.main
    ? [listing.images.main]
    : Array.isArray(listing.images) && listing.images.length > 0
    ? listing.images.map((img: any) => (typeof img === "string" ? img : img.url))
    : ["/listings/d-g-residential-1.webp"];

  const currentPhoto = galleryPhotos[activePhoto] || galleryPhotos[0];
  const prevPhoto = () => setActivePhoto((p) => (p - 1 + galleryPhotos.length) % galleryPhotos.length);
  const nextPhoto = () => setActivePhoto((p) => (p + 1) % galleryPhotos.length);

  const isSold = listing.status === "Sold";
  const isCommercialOrLand = listing.category === "Commercial" || listing.category === "Land";
  const displayPrice = listing.price || listing.askingPrice || listing.askingRent || "Upon Request";
  const displayAddress = listing.address || listing.streetAddress || listing.title;

  const agent = listing.agent || {
    name: listing.primaryContact === "Mark" ? "Mark Davis" : "Rachael Garnett",
    role:
      listing.primaryContact === "Mark"
        ? "Co-Founder & Commercial Principal"
        : "Co-Founder & Residential Principal",
    email:
      listing.primaryContact === "Mark"
        ? "mark@davisgarnettsells.com"
        : "rachael@davisgarnettsells.com",
    phone: listing.primaryContact === "Mark" ? "813-486-9072" : "727-254-0244",
    image:
      listing.primaryContact === "Mark"
        ? "/mark-davis-headshot.png"
        : "/rachael-garnett-headshot.png",
    license:
      listing.primaryContact === "Mark" ? "FL Lic. #3209459" : "FL Lic. #3378601",
    brokerage: "Align Right Realty"
  };

  const agentAvatar = resolveAgentAvatar(agent.image, agent.name);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const fullName = `${leadForm.firstName} ${leadForm.lastName}`.trim();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: leadForm.firstName,
          lastName: leadForm.lastName,
          name: fullName,
          email: leadForm.email,
          phone: leadForm.phone,
          propertyInterest: `${listing.title} (${listing.city}, ${listing.state}) — ${displayPrice}`,
          notes: leadForm.notes,
          message: leadForm.notes,
          source: "Custom Listing Page",
          labels: [
            listing.status === "Sold" ? "Comparable / Valuation Inquiry" : "Active Listing Inquiry",
            listing.category,
            listing.mlsId ? `MLS#${listing.mlsId}` : listing.slug
          ]
        })
      });
      if (!res.ok) throw new Error("Failed");
      setFormStatus("success");
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Schema.org JSON-LD (`SingleFamilyResidence` or `CommercialProperty`)
  const schemaType =
    listing.category === "Residential" ? "SingleFamilyResidence" : "CommercialProperty";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: `${listing.title} — ${listing.subtitle || listing.propertyType}`,
    description: listing.description || listing.propertyDescription,
    url: `https://davisgarnett.com/listings/${listing.slug}`,
    image: galleryPhotos,
    address: {
      "@type": "PostalAddress",
      streetAddress: displayAddress,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: "US"
    },
    ...(listing.specs?.beds ? { numberOfRooms: listing.specs.beds } : {}),
    ...(listing.specs?.sqft
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: listing.specs.sqft,
            unitCode: "FTK"
          }
        }
      : {}),
    offers: {
      "@type": "Offer",
      price: listing.priceNumeric || displayPrice,
      priceCurrency: "USD",
      availability:
        listing.status === "Active"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut"
    },
    broker: {
      "@type": "RealEstateAgent",
      name: `${agent.name} — Davis & Garnett Real Estate Advisors`,
      telephone: agent.phone,
      email: agent.email
    }
  };

  // Build dynamic executive specs items
  const executiveSpecs = [
    ...(listing.specs?.beds !== undefined
      ? [{ icon: <Bed className="w-5 h-5" />, val: `${listing.specs.beds}`, label: "Bedrooms" }]
      : []),
    ...(listing.specs?.baths !== undefined
      ? [{ icon: <Bath className="w-5 h-5" />, val: `${listing.specs.baths}`, label: "Bathrooms" }]
      : []),
    ...(listing.specs?.buildings !== undefined
      ? [
          {
            icon: <Building2 className="w-5 h-5" />,
            val: `${listing.specs.buildings}`,
            label: "Buildings"
          }
        ]
      : []),
    ...(listing.specs?.sqft
      ? [{ icon: <Maximize className="w-5 h-5" />, val: listing.specs.sqft, label: "Sq Ft" }]
      : []),
    ...(listing.specs?.lotSize
      ? [{ icon: <Trees className="w-5 h-5" />, val: listing.specs.lotSize, label: "Lot / Acreage" }]
      : []),
    ...(listing.specs?.waterfrontFeet
      ? [
          {
            icon: <Waves className="w-5 h-5" />,
            val: `~${listing.specs.waterfrontFeet} ft`,
            label: "Waterfront"
          }
        ]
      : []),
    ...(listing.specs?.zoning
      ? [
          {
            icon: <Compass className="w-5 h-5" />,
            val: listing.specs.zoning.split(" ")[0],
            label: "Zoning"
          }
        ]
      : []),
    ...(listing.specs?.yearBuilt
      ? [
          {
            icon: <Calendar className="w-5 h-5" />,
            val: `${listing.specs.yearBuilt}`,
            label: "Year Built"
          }
        ]
      : [])
  ].slice(0, 4);

  const otherActiveListings = (listingsData as unknown as Listing[])
    .filter((l) => l.status === "Active" && l.slug !== listing.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111111] font-sans selection:bg-[#C8A951] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProposalNav />

      {/* ══════════════════════════════════════════════
          TOP STATUS & BREADCRUMB BAR
         ══════════════════════════════════════════════ */}
      <div className="w-full bg-[#111111] pt-24 border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/properties"
              className="text-white/60 hover:text-[#C8A951] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
            </Link>

            {isSold ? (
              <span className="bg-[#C8A951] text-[#111111] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full text-[10px]">
                ✓ Sold — 2026 Track Record
              </span>
            ) : (
              <span className="bg-[#22c55e] text-white font-bold uppercase tracking-widest px-3.5 py-1 rounded-full text-[10px]">
                ● Active Exclusive
              </span>
            )}

            {listing.mlsId && (
              <span className="bg-white/10 text-white/80 font-semibold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">
                MLS# {listing.mlsId}
              </span>
            )}

            <span className="text-white/50 uppercase tracking-widest text-[11px]">
              {listing.category} · {listing.propertyType}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                saved ? "text-[#C8A951]" : "text-white/50 hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-[#C8A951]" : ""}`} />{" "}
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Share2 className="w-4 h-4" /> {copied ? "Link Copied" : "Share"}
            </button>
            <button
              onClick={() => typeof window !== "undefined" && window.print()}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Printer className="w-4 h-4" /> Print Dossier
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          INTERACTIVE HERO PHOTO GALLERY + THUMBNAILS
         ══════════════════════════════════════════════ */}
      <div className="w-full bg-[#111111] relative">
        <div className="relative w-full h-[56vh] lg:h-[68vh] overflow-hidden group">
          <Image
            src={currentPhoto}
            alt={`${listing.title} — Photo ${activePhoto + 1}`}
            fill
            sizes="100vw"
            className="object-cover transition-all duration-500 cursor-pointer"
            priority
            unoptimized
            onClick={() => setLightboxOpen(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Top-left floating badge */}
          <div className="absolute top-6 left-6 lg:left-10 bg-black/65 backdrop-blur-md border border-[#C8A951]/40 text-white px-5 py-3 rounded-xl">
            <p className="text-[#C8A951] text-[10px] uppercase tracking-[0.25em] font-bold mb-0.5">
              {listing.neighborhood || listing.county}
            </p>
            <p className="font-aiveritas text-2xl lg:text-3xl text-white">
              {displayPrice}
            </p>
          </div>

          {/* Open Lightbox button */}
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-6 right-6 lg:right-10 bg-black/65 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors z-10"
          >
            <Expand className="w-4 h-4 text-[#C8A951]" /> Lightbox ({galleryPhotos.length} Photos)
          </button>

          {/* Prev / Next arrows */}
          {galleryPhotos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/55 hover:bg-black/85 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/55 hover:bg-black/85 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Bottom title overlay + counter */}
          <div className="absolute bottom-6 left-6 lg:left-10 right-6 lg:right-10 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
            <div>
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.25em] font-bold block mb-1">
                {listing.subtitle || listing.propertyType}
              </span>
              <h1 className="font-aiveritas text-3xl sm:text-5xl text-white leading-tight">
                {listing.title}
              </h1>
              <p className="text-white/80 text-sm flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#C8A951]" /> {displayAddress}, {listing.city}, {listing.state} {listing.zip} · {listing.county}
              </p>
            </div>
            <div className="bg-black/65 backdrop-blur text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              {activePhoto + 1} / {galleryPhotos.length}
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div
          className="max-w-screen-xl mx-auto flex gap-2.5 px-6 lg:px-10 py-3.5 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {galleryPhotos.map((p, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === activePhoto
                  ? "border-[#C8A951] scale-105"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={p}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN 2-COLUMN EDITORIAL LAYOUT
         ══════════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* ── LEFT COLUMN: BESPOKE EDITORIAL DOSSIER ── */}
          <div className="space-y-8">
            {/* Executive Specs Ribbon Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-2">
                    {isSold
                      ? `Closed Transaction · ${listing.representation || "Davis & Garnett Track Record"}`
                      : `${listing.representation || "Exclusive Offering"} · ${listing.category}`}
                  </p>
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <h2 className="font-aiveritas text-4xl lg:text-5xl text-[#111111] leading-tight">
                      {displayPrice}
                    </h2>
                    {(listing.specs?.pricePerSqft || listing.specs?.pricePerAcre) && (
                      <span className="text-[#111111]/50 text-sm font-medium">
                        {listing.specs.pricePerSqft || listing.specs.pricePerAcre}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  {listing.neighborhood && (
                    <span className="inline-block bg-[#f5f3ef] border border-[#C8A951]/40 text-[#9A7D3A] font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-lg">
                      {listing.neighborhood}
                    </span>
                  )}
                  {listing.specs?.zoning && (
                    <p className="text-[#111111]/50 text-xs mt-1.5 font-medium">
                      Zoning: {listing.specs.zoning}
                    </p>
                  )}
                </div>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#111111]/8 pt-6">
                {executiveSpecs.map(({ icon, val, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-1.5 p-4 bg-[#fbfbf9] border border-[#111111]/6 rounded-xl"
                  >
                    <span className="text-[#C8A951]">{icon}</span>
                    <span className="font-aiveritas text-2xl text-[#111111]">{val}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#111111]/45 font-bold">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Narrative */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
              <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                Executive Narrative
              </span>
              <h2 className="font-aiveritas text-3xl text-[#111111] mb-5">
                {isCommercialOrLand ? "Asset & Investment Overview" : "Architectural & Property Overview"}
              </h2>
              <div className="space-y-4 text-[#111111]/75 font-light leading-relaxed text-base">
                {(listing.description || listing.propertyDescription || "")
                  .split("\n\n")
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
              </div>

              {/* Sub-callout banner */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#f5f3ef] rounded-xl border border-[#111111]/8">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-[#C8A951] shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111] text-sm">
                      {listing.propertyType}
                    </p>
                    <p className="text-[#111111]/55 text-xs">
                      {listing.city}, {listing.state} {listing.zip} · {listing.county}
                      {listing.mlsId ? ` · MLS# ${listing.mlsId}` : ""}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A7D3A]">
                  Advised by {agent.name}
                </span>
              </div>
            </div>

            {/* Access / Security Notice (e.g. Fort McCoy Gated Land) */}
            {listing.accessNotice && (
              <div className="bg-[#FEF3C7] border border-[#C8A951]/50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-[#9A7D3A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#111111] text-sm uppercase tracking-wider mb-1">
                      Security & Showing Protocol
                    </p>
                    <p className="text-[#111111]/75 text-sm leading-relaxed">
                      {listing.accessNotice}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Potential Use Cases (Land & Commercial) */}
            {listing.useCases && listing.useCases.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
                <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                  Highest & Best Use
                </span>
                <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                  Development & Utilization Scenarios
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listing.useCases.map((u) => (
                    <div
                      key={u.title}
                      className="p-5 bg-[#fbfbf9] rounded-xl border border-[#111111]/8 hover:border-[#C8A951]/60 transition-colors"
                    >
                      <span className="text-2xl block mb-2.5">{u.icon}</span>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">{u.title}</h3>
                      <p className="text-[#111111]/55 text-xs leading-relaxed">{u.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architectural / Investment Highlights */}
            {listing.highlights && listing.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
                <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                  Distinguishing Attributes
                </span>
                <h2 className="font-aiveritas text-3xl text-[#111111] mb-5">
                  {isCommercialOrLand ? "Investment & Site Highlights" : "Property & Architectural Highlights"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {listing.highlights.filter(Boolean).map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-3 p-3.5 bg-[#fbfbf9] rounded-xl border border-[#111111]/6 text-sm text-[#111111]/80"
                    >
                      <CheckCircle className="w-4 h-4 text-[#C8A951] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categorized Property Features */}
            {listing.categorizedFeatures && listing.categorizedFeatures.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
                <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                  Comprehensive Specifications
                </span>
                <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                  Categorized Property Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  {listing.categorizedFeatures.map((group) => (
                    <div key={group.category} className="bg-[#fbfbf9] p-6 rounded-xl border border-[#111111]/6">
                      <h3 className="text-[#9A7D3A] text-xs uppercase tracking-[0.2em] font-bold mb-4 pb-2 border-b border-[#111111]/8">
                        {group.category}
                      </h3>
                      <ul className="space-y-2.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-[#111111]/75"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A951] shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financials & Valuation Details */}
            {listing.financials && listing.financials.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
                <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                  Valuation & Underwriting
                </span>
                <h2 className="font-aiveritas text-3xl text-[#111111] mb-6">
                  Financial & Transaction Summary
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {listing.financials.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-xl border border-[#111111]/6"
                    >
                      <span className="text-xs uppercase tracking-wider text-[#111111]/55 font-bold">
                        {f.label}
                      </span>
                      <span className="font-bold text-[#111111] text-sm">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Schools (when applicable) */}
            {listing.schools && listing.schools.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111111]/8">
                <h2 className="font-aiveritas text-3xl text-[#111111] mb-5 flex items-center gap-3">
                  <School className="w-7 h-7 text-[#C8A951]" /> Nearby Schools & Education
                </h2>
                <div className="space-y-3.5">
                  {listing.schools.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-xl border border-[#111111]/6"
                    >
                      <div>
                        <p className="font-bold text-[#111111] text-sm">{s.name}</p>
                        <p className="text-[#111111]/50 text-xs">
                          Grades {s.grades} · Distance: {s.distance}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#C8A951]/15 px-3.5 py-1.5 rounded-full">
                        <Star className="w-3.5 h-3.5 text-[#9A7D3A] fill-[#C8A951]" />
                        <span className="font-bold text-[#111111] text-xs">{s.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3D Matterport Walkthrough (if available, e.g. 3037 Downan Point Dr) */}
            {listing.matterportUrl && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#111111]/8">
                <div className="p-8 pb-5 flex items-center justify-between">
                  <div>
                    <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-1">
                      Interactive Digital Twin
                    </span>
                    <h2 className="font-aiveritas text-3xl text-[#111111]">
                      3D Virtual Walkthrough
                    </h2>
                  </div>
                  <a
                    href={listing.matterportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#C8A951]"
                  >
                    Full Screen ↗
                  </a>
                </div>
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full border-0"
                    src={listing.matterportUrl}
                    allowFullScreen
                    allow="xr-spatial-tracking"
                    title={`3D Tour — ${listing.title}`}
                  />
                </div>
              </div>
            )}

            {/* Interactive Location Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#111111]/8">
              <div className="p-8 pb-4">
                <h2 className="font-aiveritas text-3xl text-[#111111] flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-[#C8A951]" /> Location & Regional Context
                </h2>
                <p className="text-[#111111]/55 text-sm mt-1">
                  {displayAddress}, {listing.city}, {listing.state} {listing.zip} ({listing.county})
                </p>
              </div>
              <div className="relative w-full h-80 bg-[#e8e4dc]">
                <iframe
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${displayAddress}, ${listing.city}, ${listing.state} ${listing.zip}`
                  )}&output=embed`}
                  title={`Map for ${listing.title}`}
                />
              </div>
            </div>

            {/* Brokerage Compliance Disclaimer */}
            <div className="p-6 bg-white/70 border border-[#111111]/8 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#111111]/45 leading-relaxed">
                Davis & Garnett Real Estate Advisors is brokered by Align Right Realty.{" "}
                {listing.mlsId ? `MLS #${listing.mlsId}. ` : ""}All information is deemed
                reliable but not guaranteed and should be independently verified by prospective
                purchasers. Properties are subject to prior sale, price change, or withdrawal
                without notice. Equal Housing Opportunity. Advisor License: {agent.license}.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: STICKY ADVISOR & CRM LEAD CAPTURE ── */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Dark Executive Pricing & Direct Action Card */}
            <div className="bg-[#111111] rounded-2xl p-8 shadow-xl border border-[#C8A951]/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.25em] font-bold">
                  {isSold ? "Closed Valuation" : "Offering Price"}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    isSold
                      ? "bg-[#C8A951]/20 text-[#C8A951]"
                      : "bg-[#22c55e]/20 text-[#22c55e]"
                  }`}
                >
                  {listing.status}
                </span>
              </div>

              <p className="font-aiveritas text-4xl text-white mb-1">{displayPrice}</p>
              <p className="text-white/45 text-xs mb-6">
                {listing.propertyType} · {listing.city}, {listing.state}
              </p>

              <div className="space-y-3">
                <a
                  href="#crm-lead-form"
                  className="w-full py-4 bg-[#C8A951] hover:bg-white text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {isSold
                    ? "Request Comparable Analysis"
                    : isCommercialOrLand
                    ? "Request Offering Memorandum"
                    : "Schedule Private Showing"}
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <Phone className="w-4 h-4 text-[#C8A951]" /> Call {agent.phone}
                </a>
              </div>
            </div>

            {/* Interactive CRM Lead Capture Form */}
            <div
              id="crm-lead-form"
              className="bg-white rounded-2xl p-7 shadow-sm border border-[#111111]/8"
            >
              <p className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
                Exclusive Representation
              </p>

              {/* Advisor Profile Header */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#111111]/8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#C8A951]/40 bg-[#f5f3ef]">
                  <Image
                    src={agentAvatar}
                    alt={agent.name}
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="font-bold text-[#111111] text-lg leading-tight">
                    {agent.name}
                  </p>
                  <p className="text-[#9A7D3A] text-xs font-semibold mt-0.5">
                    {agent.role}
                  </p>
                  <p className="text-[#111111]/45 text-[11px] mt-0.5">
                    {agent.license} · Align Right Realty
                  </p>
                </div>
              </div>

              <h3 className="font-aiveritas text-2xl text-[#111111] mb-1.5">
                {isSold
                  ? "Inquire About Similar Properties"
                  : "Schedule Private Showing / Request Offering Memorandum"}
              </h3>
              <p className="text-[#111111]/55 text-xs mb-5 leading-relaxed">
                Direct confidential inquiry routed to {agent.name}. Receive full property
                disclosures, survey/engineering files, or private tour confirmation.
              </p>

              {formStatus === "success" ? (
                <div className="bg-[#f5f3ef] border border-[#C8A951]/40 p-6 rounded-xl text-center">
                  <CheckCircle className="w-10 h-10 text-[#C8A951] mx-auto mb-3" />
                  <h4 className="font-aiveritas text-2xl text-[#111111] mb-1">
                    Dossier Inquiry Received
                  </h4>
                  <p className="text-[#111111]/65 text-xs leading-relaxed mb-4">
                    Thank you, {leadForm.firstName}. Your inquiry for{" "}
                    <strong>{listing.title}</strong> has been logged for {agent.name}.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] underline"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="First Name *"
                      value={leadForm.firstName}
                      onChange={(e) =>
                        setLeadForm((f) => ({ ...f, firstName: e.target.value }))
                      }
                      className="w-full px-3.5 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#C8A951]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Last Name *"
                      value={leadForm.lastName}
                      onChange={(e) =>
                        setLeadForm((f) => ({ ...f, lastName: e.target.value }))
                      }
                      className="w-full px-3.5 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={leadForm.email}
                    onChange={(e) =>
                      setLeadForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full px-3.5 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#C8A951]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={leadForm.phone}
                    onChange={(e) =>
                      setLeadForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="w-full px-3.5 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#C8A951]"
                  />
                  <textarea
                    rows={4}
                    required
                    value={leadForm.notes}
                    onChange={(e) =>
                      setLeadForm((f) => ({ ...f, notes: e.target.value }))
                    }
                    className="w-full px-3.5 py-3 bg-[#f5f3ef] border border-[#111111]/10 rounded-xl text-sm text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#C8A951] resize-none"
                  />
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 bg-[#111111] hover:bg-[#C8A951] hover:text-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {formStatus === "submitting"
                      ? "Submitting..."
                      : isCommercialOrLand
                      ? "Request Offering Memorandum"
                      : "Schedule Private Showing"}
                  </button>
                  {formStatus === "error" && (
                    <p className="text-red-600 text-xs text-center">
                      Unable to submit right now. Please call {agent.phone} directly.
                    </p>
                  )}
                </form>
              )}

              <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-[#111111]/8">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-1.5 text-[#111111]/60 hover:text-[#111111] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C8A951]" /> {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-1.5 text-[#111111]/60 hover:text-[#111111] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C8A951]" /> Email Advisor
                </a>
              </div>
            </div>

            {/* Due Diligence / Dossier Downloads Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#111111]/8">
              <p className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C8A951]" /> Available Due Diligence
              </p>
              <div className="space-y-2.5">
                {(isCommercialOrLand
                  ? [
                      "Executive Offering Memorandum (PDF)",
                      "Boundary Survey & Parcel Aerials",
                      "Zoning & Land Use Verification",
                      "Utility & Infrastructure Summary"
                    ]
                  : [
                      "Property Feature Sheet & Floorplan",
                      "Seller's Property Disclosure",
                      "Comparable Market Valuation Analysis",
                      "Survey / Engineering Package"
                    ]
                ).map((doc) => (
                  <a
                    key={doc}
                    href="#crm-lead-form"
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f3ef] border border-[#111111]/6 rounded-xl hover:border-[#C8A951] transition-colors text-left group"
                  >
                    <span className="text-xs text-[#111111]/75 font-medium">{doc}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C8A951] transition-transform group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MORE ACTIVE SIGNATURE LISTINGS
           ══════════════════════════════════════════════ */}
        <div className="mt-20 pt-14 border-t border-[#111111]/10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                Continue Exploring
              </span>
              <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111111]">
                Active Signature Offerings
              </h2>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] hover:text-[#9A7D3A] border-b border-[#C8A951] pb-1"
            >
              View All 15 Properties <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherActiveListings.map((item) => (
              <Link
                key={item.id}
                href={`/listings/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#111111]/8 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.images?.main || "/listings/d-g-residential-1.webp"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <span className="absolute top-3 left-3 bg-[#111111]/85 text-[#C8A951] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-[#111111]/50 mb-1">
                    {item.city}, {item.state} · MLS# {item.mlsId}
                  </p>
                  <h3 className="font-aiveritas text-2xl text-[#111111] group-hover:text-[#9A7D3A] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#9A7D3A] font-bold text-lg mb-3">{item.price}</p>
                  <p className="text-xs text-[#111111]/60 line-clamp-2 mt-auto">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          FULLSCREEN LIGHTBOX MODAL
         ══════════════════════════════════════════════ */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10">
          <div className="w-full max-w-6xl flex items-center justify-between text-white mb-4">
            <div>
              <p className="font-aiveritas text-xl">{listing.title}</p>
              <p className="text-xs text-white/50">
                Photo {activePhoto + 1} of {galleryPhotos.length}
              </p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative w-full max-w-6xl h-[65vh] md:h-[74vh] rounded-xl overflow-hidden bg-black">
            <Image
              src={currentPhoto}
              alt={`${listing.title} Fullscreen ${activePhoto + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized
            />
            {galleryPhotos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto max-w-6xl py-2">
            {galleryPhotos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`relative w-20 h-14 rounded-md overflow-hidden border-2 shrink-0 ${
                  idx === activePhoto ? "border-[#C8A951]" : "border-transparent opacity-45"
                }`}
              >
                <Image src={p} alt="" fill className="object-cover" sizes="80px" unoptimized />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-[#111111] py-12 px-8 border-t border-[#C8A951]/20 mt-12">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-[10px] uppercase tracking-widest max-w-xl leading-relaxed">
            Davis & Garnett Real Estate Advisors · Brokered by Align Right Realty.{" "}
            {listing.mlsId ? `MLS #${listing.mlsId}. ` : ""}All properties subject to prior
            sale. Equal Housing Opportunity.
          </p>
          <p className="text-white/40 text-[10px] uppercase tracking-widest shrink-0">
            © {new Date().getFullYear()} Davis & Garnett
          </p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bed, Bath, Maximize, MapPin, Calendar, Home, Car, Trees,
  ChevronLeft, ChevronRight, Phone, Mail, MessageSquare,
  CheckCircle, ArrowRight, Share2, Heart, Printer, Star,
  ShieldCheck, Zap, Droplets, Thermometer, School, ShoppingBag
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";

/* ─── REAL LISTING DATA — 3037 Downan Point Dr, Land O' Lakes, FL ─── */
const listing = {
  mlsId: "TB8490089",
  status: "Active",
  type: "Single Family Home",
  price: 450000,
  pricePerSqft: 199,
  address: {
    street: "3037 Downan Point Dr",
    city: "Land O' Lakes",
    state: "FL",
    zip: "34638",
    county: "Pasco County",
    community: "Ballantrae",
  },
  beds: 5,
  baths: 3,
  sqft: 2260,
  lotAcres: 0.13,
  lotSqft: 5663,
  yearBuilt: 2005,
  garage: 2,
  stories: 2,
  hoaFee: "$170/quarter",
  taxYear: 2024,
  
  description: "Welcome to Ballantrae — one of Land O' Lakes' most sought-after communities. This beautifully updated two-story home delivers five bedrooms, three full bathrooms, and 2,260 square feet of thoughtfully designed living space. The primary suite is conveniently located on the main floor, offering everyday ease. Upstairs features four generous bedrooms plus a spacious bonus/flex area perfect for a home office, playroom, or media room. Step outside to your fully fenced backyard and oversized screened lanai — ideal for Florida entertaining year-round. Recent improvements include a brand new roof, newer AC unit, fresh interior paint, and a whole-house water filtration system — making this home truly move-in ready.",

  highlights: [
    "Brand New Roof",
    "Newer AC Unit",
    "Fresh Interior Paint",
    "Whole-House Water Filtration",
    "Fully Fenced Backyard",
    "Oversized Screened Lanai",
    "Primary Suite on Main Floor",
    "Bonus / Flex Room Upstairs",
    "2-Car Garage",
    "Low HOA — $170/Quarter",
  ],

  features: {
    "Interior": ["5 Bedrooms", "3 Full Bathrooms", "2,260 Sq Ft", "Primary Suite on Main Floor", "Bonus / Flex Room", "Open-Plan Kitchen & Living", "Vaulted Ceilings"],
    "Exterior": ["Screened Lanai", "Fully Fenced Yard", "0.13 Acre Lot", "2-Car Attached Garage", "Paved Driveway"],
    "Utilities & Systems": ["Whole-House Water Filtration", "New Roof (2024)", "Newer AC Unit", "Public Water & Sewer"],
    "Community": ["Ballantrae HOA", "$170/Quarter", "Community Pool", "Playground", "Walking Trails"],
  },

  // Real listing photos from public/listings/
  photos: [
    "/listings/d-g-residential-1.webp",
    "/listings/d-g-residential-2.webp",
    "/listings/d-g-residential-3.webp",
    "/listings/d-g-residential-4.webp",
    "/listings/d-g-residential-5.webp",
    "/listings/d-g-residential-6.webp",
    "/listings/d-g-residential-7.webp",
    "/listings/d-g-residential-8.webp",
    "/listings/d-g-residential-9.webp",
    "/listings/d-g-residential-10.webp",
  ],

  agent: {
    name: "Rachael Garnett",
    title: "Director of Luxury Residential",
    brokerage: "Align Right Realty",
    phone: "(727) 808-3344",
    email: "rachael@davisgarnett.com",
    photo: "/rachael-residential-action-2.jpg",
    license: "SL3553742",
    reviews: 47,
    rating: 5.0,
  },

  walkscore: 32,
  transitScore: 18,
  bikeScore: 28,

  nearbySchools: [
    { name: "Oakstead Elementary", type: "Public", grades: "K–5", distance: "0.6 mi", rating: 8 },
    { name: "Charles S. Rushe Middle", type: "Public", grades: "6–8", distance: "1.2 mi", rating: 7 },
    { name: "Sunlake High School", type: "Public", grades: "9–12", distance: "1.5 mi", rating: 8 },
  ],
};

const formatPrice = (n: number) =>
  "$" + n.toLocaleString("en-US");

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default function ResidentialListing() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "I'm interested in 3037 Downan Point Dr, Land O' Lakes, FL 34638. Please contact me to schedule a viewing." });
  const [saved, setSaved] = useState(false);

  const prevPhoto = () => setActivePhoto(p => (p - 1 + listing.photos.length) % listing.photos.length);
  const nextPhoto = () => setActivePhoto(p => (p + 1) % listing.photos.length);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />

      {/* ══════════════════════════════════════════════
          STATUS BAR
         ══════════════════════════════════════════════ */}
      <div className="w-full bg-[#050505] pt-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="bg-[#22c55e] text-white font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">
              ● Active
            </span>
            <span className="text-white/40 uppercase tracking-widest">MLS# {listing.mlsId}</span>
            <span className="text-white/40 uppercase tracking-widest">{listing.type}</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${saved ? "text-[#D4AF37]" : "text-white/40 hover:text-white"}`}>
              <Heart className={`w-4 h-4 ${saved ? "fill-[#D4AF37]" : ""}`} /> {saved ? "Saved" : "Save"}
            </button>
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          PHOTO GALLERY — full-width hero
         ══════════════════════════════════════════════ */}
      <div className="w-full bg-[#050505] relative">
        {/* Main photo */}
        <div className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
          <Image
            src={listing.photos[activePhoto]}
            alt={`${listing.address.street} — Photo ${activePhoto + 1}`}
            fill
            sizes="100vw"
            className="object-cover transition-all duration-500"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Nav arrows */}
          <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo counter */}
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            {activePhoto + 1} / {listing.photos.length}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 px-6 lg:px-10 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {listing.photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activePhoto ? "border-[#D4AF37]" : "border-transparent opacity-50 hover:opacity-100"}`}
            >
              <Image src={p} alt="" fill className="object-cover" sizes="80px" unoptimized />
            </button>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════════════
          MAIN CONTENT — 2 col: listing left, contact right
         ══════════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-8">

            {/* Price + Address block */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-2">For Sale</p>
                  <h1 className="font-aiveritas text-5xl lg:text-6xl text-[#111] leading-tight">
                    {formatPrice(listing.price)}
                  </h1>
                  <p className="text-[#111]/45 text-sm mt-1">${listing.pricePerSqft}/sqft</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest mb-1">{listing.community}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#111]/60 mb-6">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-lg font-medium">
                  {listing.address.street}, {listing.address.city}, {listing.address.state} {listing.address.zip}
                </span>
              </div>

              {/* Key stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#111]/8 pt-6">
                {[
                  { icon: <Bed className="w-5 h-5" />, val: listing.beds, label: "Bedrooms" },
                  { icon: <Bath className="w-5 h-5" />, val: listing.baths, label: "Bathrooms" },
                  { icon: <Maximize className="w-5 h-5" />, val: listing.sqft.toLocaleString(), label: "Sq Ft" },
                  { icon: <Car className="w-5 h-5" />, val: listing.garage, label: "Car Garage" },
                ].map(({ icon, val, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 p-4 bg-[#f5f3ef] rounded-xl">
                    <span className="text-[#D4AF37]">{icon}</span>
                    <span className="font-aiveritas text-2xl text-[#111]">{val}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#111]/40 font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-5">About This Home</h2>
              <p className="text-[#111]/65 font-light leading-relaxed text-base mb-6">{listing.description}</p>

              {/* Community badge */}
              <div className="flex items-center gap-3 p-4 bg-[#f5f3ef] rounded-xl border border-[#111]/6">
                <Home className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <p className="font-bold text-[#111] text-sm">{listing.address.community} Community</p>
                  <p className="text-[#111]/50 text-xs">HOA: {listing.hoaFee} · {listing.address.county}</p>
                </div>
              </div>
            </div>


            {/* Highlights checklist */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-5">Property Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {listing.highlights.map(h => (
                  <div key={h} className="flex items-center gap-3 text-sm text-[#111]/75">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            </div>


            {/* Full features breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-6">Property Details</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {Object.entries(listing.features).map(([cat, items]) => (
                  <div key={cat}>
                    <h3 className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">{cat}</h3>
                    <ul className="space-y-2">
                      {items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#111]/70">
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Quick facts strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#111]/8">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: "Year Built", val: listing.yearBuilt },
                  { icon: <Home className="w-4 h-4" />, label: "Stories", val: listing.stories },
                  { icon: <Trees className="w-4 h-4" />, label: "Lot Size", val: `${listing.lotAcres} ac` },
                  { icon: <Zap className="w-4 h-4" />, label: "County", val: listing.address.county },
                ].map(({ icon, label, val }) => (
                  <div key={label}>
                    <span className="flex items-center gap-1.5 text-[#D4AF37] mb-1">{icon}<span className="text-[10px] uppercase tracking-widest text-[#111]/40 font-bold">{label}</span></span>
                    <span className="font-bold text-[#111]">{val}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Schools */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-5">
                <span className="flex items-center gap-3"><School className="w-7 h-7 text-[#D4AF37]" /> Nearby Schools</span>
              </h2>
              <div className="space-y-4">
                {listing.nearbySchools.map(s => (
                  <div key={s.name} className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-xl border border-[#111]/6">
                    <div>
                      <p className="font-bold text-[#111] text-sm">{s.name}</p>
                      <p className="text-[#111]/45 text-xs">{s.type} · Grades {s.grades} · {s.distance}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full">
                      <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="font-bold text-[#111] text-sm">{s.rating}/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Map placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#111]/6">
              <div className="p-8 pb-4">
                <h2 className="font-aiveritas text-3xl text-[#111]">
                  <span className="flex items-center gap-3"><MapPin className="w-7 h-7 text-[#D4AF37]" /> Location</span>
                </h2>
                <p className="text-[#111]/50 text-sm mt-1">{listing.address.street}, {listing.address.city}, {listing.address.state} {listing.address.zip}</p>
              </div>
              {/* Google Maps embed */}
              <div className="relative w-full h-72 bg-[#e8e4dc]">
                <iframe
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=3037+Downan+Point+Dr,Land+O+Lakes,FL+34638`}
                />
              </div>
            </div>


            {/* 3D VIRTUAL WALKTHROUGH */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#111]/6">
              <div className="p-8 pb-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-aiveritas text-3xl text-[#111]">
                    <span className="flex items-center gap-3">
                      {/* Custom 3D icon */}
                      <span className="w-7 h-7 rounded-lg bg-[#D4AF37] flex items-center justify-center text-white text-xs font-black">3D</span>
                      Virtual Walkthrough
                    </span>
                  </h2>
                  <a
                    href="https://my.matterport.com/show/?m=fYa2ezJ6zqX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#9A7D3A] text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
                  >
                    Full Screen ↗
                  </a>
                </div>
                <p className="text-[#111]/45 text-sm mt-1">
                  Explore every room in immersive 3D — navigate freely at your own pace.
                </p>
              </div>

              {/* Matterport iframe */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src="https://my.matterport.com/show/?m=fYa2ezJ6zqX&brand=0&mls=1"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                  title="3D Virtual Walkthrough — 3037 Downan Point Dr"
                />
              </div>

              {/* Bottom strip */}
              <div className="px-8 py-4 bg-[#f5f3ef] flex flex-wrap items-center justify-between gap-3 border-t border-[#111]/6">
                <div className="flex items-center gap-5 text-xs text-[#111]/50">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" /> Live Tour Available
                  </span>
                  <span>Powered by Matterport</span>
                </div>
                <a
                  href="https://my.matterport.com/show/?m=fYa2ezJ6zqX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline"
                >
                  Open in Matterport ↗
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-6 bg-white/60 border border-[#111]/6 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#111]/35 leading-relaxed">
                Davis & Garnett is brokered by Align Right Realty. MLS #{listing.mlsId}. Information is deemed reliable but not guaranteed. All properties are subject to prior sale, change, or withdrawal. Equal Housing Opportunity. Agent License: {listing.agent.license}.
              </p>
            </div>
          </div>


          {/* ── RIGHT COLUMN — sticky contact + quick stats ── */}
          <div className="space-y-6 lg:sticky lg:top-24">

            {/* Price CTA card */}
            <div className="bg-[#0c0b09] rounded-2xl p-8 shadow-xl border border-[#D4AF37]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-bold">Asking Price</span>
                <span className="bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="font-aiveritas text-4xl text-white mb-1">{formatPrice(listing.price)}</p>
              <p className="text-white/40 text-sm mb-8">${listing.pricePerSqft}/sqft · {listing.sqft.toLocaleString()} sqft</p>

              <div className="space-y-3">
                <button className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule a Viewing
                </button>
                <button className="w-full py-4 bg-white/8 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10">
                  <Phone className="w-4 h-4" /> Call {listing.agent.phone}
                </button>
              </div>
            </div>


            {/* Agent card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#111]/6">
              <p className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">Listing Agent</p>
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#D4AF37]/30">
                  <Image src={listing.agent.photo} alt={listing.agent.name} fill className="object-cover object-top" sizes="64px" unoptimized />
                </div>
                <div>
                  <p className="font-bold text-[#111] text-lg leading-tight">{listing.agent.name}</p>
                  <p className="text-[#111]/50 text-xs">{listing.agent.title}</p>
                  <p className="text-[#111]/40 text-xs">{listing.agent.brokerage}</p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <span className="text-[#111]/50 text-xs">{listing.agent.rating} · {listing.agent.reviews} reviews</span>
              </div>

              {/* Contact form */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={contactForm.email}
                  onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={contactForm.phone}
                  onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
                <button className="w-full py-4 bg-[#111] hover:bg-[#D4AF37] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Send Message
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-[#111]/8">
                <a href={`tel:${listing.agent.phone}`} className="flex items-center gap-1.5 text-[#111]/50 hover:text-[#111] text-xs font-bold uppercase tracking-widest transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
                <a href={`mailto:${listing.agent.email}`} className="flex items-center gap-1.5 text-[#111]/50 hover:text-[#111] text-xs font-bold uppercase tracking-widest transition-colors">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </div>


            {/* Mortgage estimator widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#111]/6">
              <p className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">Estimated Monthly Payment</p>
              <p className="font-aiveritas text-3xl text-[#111] mb-1">~$2,420<span className="text-lg text-[#111]/40">/mo</span></p>
              <p className="text-[#111]/40 text-xs mb-4">Based on 20% down, 30yr fixed at 6.8%</p>
              <div className="space-y-2 text-xs text-[#111]/60">
                {[
                  { label: "Principal & Interest", val: "$2,086" },
                  { label: "Property Tax (est.)", val: "$208" },
                  { label: "HOA Fee", val: "$57" },
                  { label: "Home Insurance (est.)", val: "$120" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-[#111]/6">
                    <span>{label}</span>
                    <span className="font-bold text-[#111]">{val}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 border border-[#111]/15 text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                Get Pre-Approved
              </button>
            </div>


            {/* Walkability scores */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#111]/6">
              <p className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">Commute & Walkability</p>
              <div className="space-y-4">
                {[
                  { label: "Walk Score", score: listing.walkscore, icon: <ShoppingBag className="w-4 h-4" />, note: "Car-Dependent" },
                  { label: "Transit Score", score: listing.transitScore, icon: <Zap className="w-4 h-4" />, note: "Minimal Transit" },
                  { label: "Bike Score", score: listing.bikeScore, icon: <ArrowRight className="w-4 h-4" />, note: "Bikeable" },
                ].map(({ label, score, icon, note }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 text-xs text-[#111]/60 font-bold">{icon}{label}</span>
                      <span className="text-xs font-bold text-[#111]">{score}<span className="text-[#111]/35">/100 · {note}</span></span>
                    </div>
                    <div className="w-full bg-[#f5f3ef] rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-[#D4AF37] transition-all" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Trust signals */}
            <div className="bg-[#f5f3ef] rounded-2xl p-6 border border-[#111]/6">
              <div className="space-y-3">
                {[
                  { icon: <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />, text: "Verified MLS listing · TB8490089" },
                  { icon: <CheckCircle className="w-4 h-4 text-[#D4AF37]" />, text: "Licensed FL Real Estate Agent" },
                  { icon: <Star className="w-4 h-4 text-[#D4AF37]" />, text: "5.0 stars · 47 client reviews" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-xs text-[#111]/60">
                    {icon} {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ── FOOTER ── */}
      <footer className="bg-[#0c0b09] py-12 px-8 border-t border-[#D4AF37]/20 mt-10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest max-w-xl leading-relaxed">
            Davis & Garnett is a commercial and residential real estate advisory group brokered by Align Right Realty. MLS #{listing.mlsId}. All properties subject to prior sale. Equal Housing Opportunity.
          </p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest shrink-0">© {new Date().getFullYear()} Davis & Garnett</p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Calendar, Trees, ChevronLeft, ChevronRight,
  Phone, Mail, MessageSquare, CheckCircle, ArrowRight,
  Share2, Heart, Printer, Star, ShieldCheck, Zap,
  Maximize, Mountain, Waves, Eye, Compass, FileText
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";

/* ─── REAL LISTING DATA — NE 90th Street Rd, Fort McCoy, FL ─── */
const listing = {
  mlsId: "TB8520776",
  status: "Active",
  type: "Vacant Land",
  subType: "Agricultural / Residential",
  price: 350000,
  pricePerAcre: 17750,
  address: {
    street: "NE 90th Street Rd",
    city: "Fort McCoy",
    state: "FL",
    zip: "32134",
    county: "Marion County",
    parcel: "A-1 Agricultural",
  },
  acres: 19.72,
  sqft: 858_823,
  zoning: "A-1 Agricultural",
  cdd: false,

  description: "Nineteen acres of pristine, mature-timbered land set in the heart of Florida's natural north — just minutes from the legendary Ocala National Forest and the Ocklawaha River. This gated, wooded parcel offers rare privacy and genuine seclusion while remaining accessible. Zoned A-1 Agricultural, the land supports a wide range of uses: build your private homestead, establish a working farm or equestrian operation, harvest the existing timber, or hold as a long-term land investment in one of Florida's fastest-appreciating rural corridors. Well and septic required — you bring the vision, the land delivers the canvas.",

  highlights: [
    "19.72 Acres of Mature Timber",
    "Gated & Secured Access",
    "Active Motion Sensor Alarms & Cameras",
    "Minutes to Ocala National Forest",
    "Minutes to Ocklawaha River",
    "A-1 Agricultural Zoning",
    "No CDD Fees",
    "Well & Septic Required",
    "Ideal for Homestead / Equestrian",
    "Excellent Timber Value",
  ],

  useCases: [
    { icon: "🏡", title: "Private Homestead", desc: "Build your dream residence with full privacy on 19+ acres." },
    { icon: "🌾", title: "Working Farm", desc: "A-1 zoning supports agricultural operations of all kinds." },
    { icon: "🐴", title: "Equestrian Estate", desc: "Ample acreage for stables, arenas, and riding trails." },
    { icon: "🌲", title: "Timber Investment", desc: "Mature timber provides immediate and long-term yield." },
    { icon: "🏕️", title: "Recreational Retreat", desc: "Adjacent to national forest trails, fishing, and wildlife." },
    { icon: "📈", title: "Land Investment", desc: "Hold in a rapidly appreciating rural Florida corridor." },
  ],

  features: {
    "Land Details": ["19.72 Total Acres", "858,823 Sq Ft", `${(350000 / 19.72).toFixed(0)} $/Acre`, "Mature Timber Throughout", "Wooded — Natural Vegetation"],
    "Access & Security": ["Gated Entry", "Motion Sensor Alarms", "Security Camera System", "Must Contact Agent to Disarm"],
    "Zoning & Use": ["A-1 Agricultural Zoning", "Residential Development Allowed", "Farming & Livestock Allowed", "No CDD", "No HOA"],
    "Utilities": ["Well Required", "Septic Required", "Electrical Available Nearby"],
    "Location": ["Marion County", "Fort McCoy, FL 32134", "Near Ocala National Forest", "Near Ocklawaha River", "Quiet Rural Setting"],
  },

  // Real property photos from listings folder
  photos: [
    "/listings/d-g-land-listing-1.webp",
    "/listings/d-g-land-listing-2.webp",
    "/listings/d-g-land-listing-3.webp",
    "/listings/d-g-land-listing-4.webp",
    "/listings/d-g-land-listing-5.webp",
    "/listings/d-g-land-listing-6.webp",
    "/listings/d-g-land-listing-7.webp",
    "/listings/d-g-land-listing-8.webp",
    "/listings/d-g-land-listing-9.webp",
  ],

  agent: {
    name: "Mark Davis",
    title: "Director of Commercial Assets",
    brokerage: "Align Right Realty Carrollwood",
    phone: "(941) 737-4127",
    email: "mark@davisgarnett.com",
    photo: "/mark-commercial-action-2.jpg",
    license: "BK3432337",
    reviews: 63,
    rating: 5.0,
  },
};

const formatPrice = (n: number) => "$" + n.toLocaleString("en-US");

/* ─── PAGE ─────────────────────────────────────────────────────────── */

export default function CommercialListing() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [saved, setSaved] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "",
    message: `I'm interested in the NE 90th Street Rd land listing in Fort McCoy, FL. Please contact me to schedule a tour.`,
  });

  const prevPhoto = () => setActivePhoto(p => (p - 1 + listing.photos.length) % listing.photos.length);
  const nextPhoto = () => setActivePhoto(p => (p + 1) % listing.photos.length);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />

      {/* STATUS BAR */}
      <div className="w-full bg-[#050505] pt-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="bg-[#22c55e] text-white font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[10px]">● Active</span>
            <span className="text-white/40 uppercase tracking-widest">MLS# {listing.mlsId}</span>
            <span className="text-white/40 uppercase tracking-widest">{listing.type}</span>
            <span className="text-white/40 uppercase tracking-widest">{listing.zoning}</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setSaved(!saved)} className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${saved ? "text-[#D4AF37]" : "text-white/40 hover:text-white"}`}>
              <Heart className={`w-4 h-4 ${saved ? "fill-[#D4AF37]" : ""}`} /> {saved ? "Saved" : "Save"}
            </button>
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"><Share2 className="w-4 h-4" /> Share</button>
            <button className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"><Printer className="w-4 h-4" /> Print</button>
          </div>
        </div>
      </div>


      {/* PHOTO GALLERY */}
      <div className="w-full bg-[#050505] relative">
        <div className="relative w-full h-[55vh] lg:h-[65vh] overflow-hidden">
          <Image src={listing.photos[activePhoto]} alt={`Photo ${activePhoto + 1}`} fill sizes="100vw" className="object-cover transition-all duration-500" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Acreage badge — prominent on land listings */}
          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur border border-[#D4AF37]/30 text-white px-5 py-3 rounded-xl">
            <p className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-0.5">Total Area</p>
            <p className="font-aiveritas text-3xl text-white">{listing.acres} Acres</p>
          </div>

          <button onClick={prevPhoto} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextPhoto} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            {activePhoto + 1} / {listing.photos.length}
          </div>
        </div>
        <div className="flex gap-2 px-6 lg:px-10 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {listing.photos.map((p, i) => (
            <button key={i} onClick={() => setActivePhoto(i)} className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activePhoto ? "border-[#D4AF37]" : "border-transparent opacity-50 hover:opacity-100"}`}>
              <Image src={p} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>


      {/* MAIN CONTENT */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-8">

            {/* Price + Address */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold mb-2">For Sale · Vacant Land</p>
                  <h1 className="font-aiveritas text-5xl lg:text-6xl text-[#111] leading-tight">{formatPrice(listing.price)}</h1>
                  <p className="text-[#111]/45 text-sm mt-1">${listing.pricePerAcre.toLocaleString()}/acre · {listing.acres} acres</p>
                </div>
                <span className="bg-[#5C3A1E] text-white text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-sm self-start">{listing.zoning}</span>
              </div>

              <div className="flex items-center gap-2 text-[#111]/60 mb-6">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-lg font-medium">{listing.address.street}, {listing.address.city}, {listing.address.state} {listing.address.zip}</span>
              </div>

              {/* Key stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#111]/8 pt-6">
                {[
                  { icon: <Trees className="w-5 h-5" />,   val: `${listing.acres}`,       label: "Acres" },
                  { icon: <Maximize className="w-5 h-5" />, val: "858K",                   label: "Sq Ft" },
                  { icon: <Compass className="w-5 h-5" />,  val: "A-1",                    label: "Zoning" },
                  { icon: <Eye className="w-5 h-5" />,      val: "No CDD",                  label: "Fees" },
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
              <h2 className="font-aiveritas text-3xl text-[#111] mb-5">About This Land</h2>
              <p className="text-[#111]/65 font-light leading-relaxed text-base mb-6">{listing.description}</p>

              {/* Location callouts */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: <Mountain className="w-4 h-4 text-[#D4AF37]" />, text: "Minutes to Ocala National Forest" },
                  { icon: <Waves className="w-4 h-4 text-[#D4AF37]" />,    text: "Minutes to Ocklawaha River" },
                  { icon: <Trees className="w-4 h-4 text-[#D4AF37]" />,    text: "Mature Timber Throughout" },
                  { icon: <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />, text: "Gated & Secured Access" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 p-3 bg-[#f5f3ef] rounded-xl text-sm text-[#111]/70">
                    {icon} {text}
                  </div>
                ))}
              </div>
            </div>


            {/* Use cases */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-6">Potential Uses</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listing.useCases.map(u => (
                  <div key={u.title} className="p-5 bg-[#f5f3ef] rounded-xl border border-[#111]/6 hover:border-[#D4AF37]/40 transition-colors">
                    <span className="text-2xl block mb-3">{u.icon}</span>
                    <h3 className="font-bold text-[#111] text-sm mb-1">{u.title}</h3>
                    <p className="text-[#111]/50 text-xs leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* Highlights */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-5">Property Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {listing.highlights.map(h => (
                  <div key={h} className="flex items-center gap-3 text-sm text-[#111]/75">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" /> {h}
                  </div>
                ))}
              </div>
            </div>


            {/* Full property details */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-6">Property Details</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {Object.entries(listing.features).map(([cat, items]) => (
                  <div key={cat}>
                    <h3 className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">{cat}</h3>
                    <ul className="space-y-2">
                      {items.map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#111]/70">
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37] shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>


            {/* Important notices (security/access) */}
            <div className="bg-[#FEF3C7] border border-[#D4AF37]/40 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#111] mb-1">Access Notice</p>
                  <p className="text-[#111]/70 text-sm leading-relaxed">
                    This property is protected by active motion sensor alarms and security cameras. Prospective buyers must contact the listing agent in advance to have the alarm system disarmed before entering through the gated access. Unauthorized entry is prohibited.
                  </p>
                </div>
              </div>
            </div>


            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#111]/6">
              <div className="p-8 pb-4">
                <h2 className="font-aiveritas text-3xl text-[#111]">
                  <span className="flex items-center gap-3"><MapPin className="w-7 h-7 text-[#D4AF37]" /> Location</span>
                </h2>
                <p className="text-[#111]/50 text-sm mt-1">{listing.address.street}, {listing.address.city}, {listing.address.state} — {listing.address.county}</p>
              </div>
              <div className="relative w-full h-72 bg-[#e8e4dc]">
                <iframe
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=NE+90th+Street+Rd,Fort+McCoy,FL+32134`}
                />
              </div>
            </div>


            {/* Docs / Downloads */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#111]/6">
              <h2 className="font-aiveritas text-3xl text-[#111] mb-5">
                <span className="flex items-center gap-3"><FileText className="w-7 h-7 text-[#D4AF37]" /> Documents</span>
              </h2>
              <div className="space-y-3">
                {["Property Survey (on request)", "Zoning Certificate — A-1", "Timber Assessment Report", "Environmental Overview"].map(doc => (
                  <button key={doc} className="w-full flex items-center justify-between px-5 py-4 bg-[#f5f3ef] border border-[#111]/6 rounded-xl hover:border-[#D4AF37]/40 transition-colors text-left group">
                    <span className="text-sm text-[#111]/70 font-medium">{doc}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>


            {/* Disclaimer */}
            <div className="p-6 bg-white/60 border border-[#111]/6 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#111]/35 leading-relaxed">
                Davis & Garnett is brokered by Align Right Realty Carrollwood. MLS #{listing.mlsId}. Information is deemed reliable but not guaranteed. All properties are subject to prior sale, change, or withdrawal. Equal Housing Opportunity. Agent License: {listing.agent.license}.
              </p>
            </div>
          </div>


          {/* RIGHT COLUMN */}
          <div className="space-y-6 lg:sticky lg:top-24">

            {/* Price CTA */}
            <div className="bg-[#0c0b09] rounded-2xl p-8 shadow-xl border border-[#D4AF37]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-bold">Asking Price</span>
                <span className="bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="font-aiveritas text-4xl text-white mb-1">{formatPrice(listing.price)}</p>
              <p className="text-white/40 text-sm mb-2">${listing.pricePerAcre.toLocaleString()}/acre</p>
              <p className="text-white/25 text-xs mb-8">{listing.acres} acres · {listing.zoning}</p>

              <div className="space-y-3">
                <button className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" /> Schedule a Tour
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
                  <Image src={listing.agent.photo} alt={listing.agent.name} fill className="object-cover object-top" sizes="64px" />
                </div>
                <div>
                  <p className="font-bold text-[#111] text-lg leading-tight">{listing.agent.name}</p>
                  <p className="text-[#111]/50 text-xs">{listing.agent.title}</p>
                  <p className="text-[#111]/40 text-xs">{listing.agent.brokerage}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <span className="text-[#111]/50 text-xs">{listing.agent.rating} · {listing.agent.reviews} reviews</span>
              </div>

              <div className="space-y-3">
                <input type="text" placeholder="Your name" value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                <input type="email" placeholder="Email address" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                <input type="tel" placeholder="Phone number" value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors" />
                <textarea rows={4} value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/8 rounded-xl text-sm text-[#111] placeholder-[#111]/35 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none" />
                <button className="w-full py-4 bg-[#111] hover:bg-[#D4AF37] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Send Message
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-[#111]/8">
                <a href={`tel:${listing.agent.phone}`} className="flex items-center gap-1.5 text-[#111]/50 hover:text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"><Phone className="w-3.5 h-3.5" /> Call</a>
                <a href={`mailto:${listing.agent.email}`} className="flex items-center gap-1.5 text-[#111]/50 hover:text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"><Mail className="w-3.5 h-3.5" /> Email</a>
              </div>
            </div>


            {/* Acreage / Value snapshot */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#111]/6">
              <p className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold mb-4">Investment Snapshot</p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Total Acreage", val: `${listing.acres} acres` },
                  { label: "Price Per Acre",  val: `$${listing.pricePerAcre.toLocaleString()}` },
                  { label: "Zoning",          val: listing.zoning },
                  { label: "County",          val: listing.address.county },
                  { label: "No CDD",          val: "✓ Confirmed" },
                  { label: "No HOA",          val: "✓ Confirmed" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-[#111]/6">
                    <span className="text-[#111]/50">{label}</span>
                    <span className="font-bold text-[#111]">{val}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Trust signals */}
            <div className="bg-[#f5f3ef] rounded-2xl p-6 border border-[#111]/6">
              <div className="space-y-3">
                {[
                  { icon: <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />, text: `Verified MLS listing · ${listing.mlsId}` },
                  { icon: <CheckCircle className="w-4 h-4 text-[#D4AF37]" />, text: "Licensed FL Real Estate Broker" },
                  { icon: <Star className="w-4 h-4 text-[#D4AF37]" />,        text: `5.0 stars · ${listing.agent.reviews} client reviews` },
                  { icon: <Zap className="w-4 h-4 text-[#D4AF37]" />,         text: "Align Right Realty Carrollwood" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-xs text-[#111]/60">{icon} {text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* FOOTER */}
      <footer className="bg-[#0c0b09] py-12 px-8 border-t border-[#D4AF37]/20 mt-10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-[10px] uppercase tracking-widest max-w-xl leading-relaxed">
            Davis & Garnett is brokered by Align Right Realty Carrollwood. MLS #{listing.mlsId}. All properties subject to prior sale. Equal Housing Opportunity. Agent License: {listing.agent.license}.
          </p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest shrink-0">© {new Date().getFullYear()} Davis & Garnett</p>
        </div>
      </footer>
    </div>
  );
}

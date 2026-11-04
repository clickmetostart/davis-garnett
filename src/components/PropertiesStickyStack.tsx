"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const activeSignatureProperties = [
  {
    id: "1",
    slug: "6100-bahama-shores-dr-s-st-petersburg",
    mlsId: "V4951050",
    type: "Residential · Waterfront Estate",
    badge: "Flagship Active Offering",
    title: "6100 Bahama Shores Dr S",
    subtitle: "\"The Vistara\" — Custom Tampa Bay Waterfront Estate",
    location: "Bahama Shores · St. Petersburg, FL 33705",
    specs: "4 Bed • 4.5 Bath • 4,376 SqFt • 0.51 Acres (~90 ft Waterfront)",
    price: "$4,553,900",
    advisor: "Rachael Garnett & Mark Davis",
    img: "/listings/bahama-shores-1.webp",
    isFlagship: true
  },
  {
    id: "4",
    slug: "770-old-stokes-rd-frostproof",
    mlsId: "TB8506525",
    type: "Land & Commercial Development",
    badge: "Active Exclusive",
    title: "770 Old Stokes Rd",
    subtitle: "Central Florida US-98 / US-27 Development Corridor Tract",
    location: "Frostproof · Polk County, FL 33843",
    specs: "79.54 Acres MOL • US Hwy 98 Frontage • Development / Ag",
    price: "$3,550,000",
    advisor: "Mark Davis & Rachael Garnett",
    img: "/listings/old-stokes-frostproof-1.jpg",
    isFlagship: false
  },
  {
    id: "2",
    slug: "126-ridgewood-ave-brandon",
    mlsId: "TB8479570",
    type: "Commercial & Mixed-Use",
    badge: "Active Exclusive",
    title: "126 Ridgewood Ave (& 613 E Morgan St)",
    subtitle: "Dual-Building Mixed-Use Asset 1 Block Off Brandon Blvd (Hwy 60)",
    location: "Brandon · Hillsborough County, FL 33510",
    specs: "2 Buildings • 2,872 Total SqFt • 0.39 Acres • Separate Meters",
    price: "$845,000",
    advisor: "Mark Davis & Rachael Garnett",
    img: "/listings/ridgewood-brandon-2.jpg",
    isFlagship: false
  },
  {
    id: "3",
    slug: "ne-90th-street-rd-fort-mccoy",
    mlsId: "TB8520776",
    type: "Land · Agricultural & Timberland",
    badge: "Active Exclusive",
    title: "NE 90th Street Rd",
    subtitle: "Gated Old Florida Timberland Sanctuary Near Ocala National Forest",
    location: "Fort McCoy · Marion County, FL 32134",
    specs: "19.72 Acres (858,823 SqFt) • A-1 Agriculture • No HOA / No CDD",
    price: "$350,000",
    advisor: "Mark Davis & Rachael Garnett",
    img: "/listings/d-g-land-listing-1.webp",
    isFlagship: false
  }
];

export default function PropertiesStickyStack() {
  const CARD_TOP = "12svh";
  const CARD_H = "76svh";

  return (
    <div className="w-full relative">
      {/* ── Mobile header (hidden on desktop) ── */}
      <div className="block md:hidden px-6 pt-16 pb-8 text-center">
        <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
          Active Signature Inventory · 2026
        </span>
        <h2 className="font-aiveritas text-4xl text-[#111111] mb-4">
          Current Exclusive Offerings
        </h2>
        <p className="text-[#111111]/60 font-light text-sm leading-relaxed">
          Explore Davis &amp; Garnett&apos;s signature commercial, residential, luxury waterfront, and land offerings across Tampa Bay and Central Florida.
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* ══ COLUMN 1 — Sticky editorial panel (desktop only) ══ */}
        <div className="hidden md:block md:w-[38%] shrink-0 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center pl-12 pr-8 xl:pl-20 xl:pr-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-5">
              Signature Assets · Active Portfolio
            </span>

            <h2 className="font-aiveritas text-5xl xl:text-6xl text-[#111111] leading-tight mb-6">
              Exclusive<br />Offerings
            </h2>

            <div className="w-10 h-[2px] bg-[#C8A951] mb-6" />

            <p className="text-[#111111]/65 font-light leading-relaxed max-w-xs mb-8 text-sm">
              Whether commercial or residential, big or small, raw land or luxury waterfront condo—we treat every listing like it is hot, new, needs immediate attention, relentless servicing, and the full powerhouse force of Davis &amp; Garnett.
            </p>

            <div className="flex flex-col gap-2.5 mb-10">
              {activeSignatureProperties.map((prop) => (
                <Link
                  key={prop.slug}
                  href={`/listings/${prop.slug}`}
                  className="flex items-center justify-between text-[#111111] text-xs font-bold uppercase tracking-[0.15em] border-b border-[#111111]/15 pb-2.5 hover:text-[#9A7D3A] hover:border-[#C8A951] transition-colors group"
                >
                  <span className="truncate pr-2">{prop.title}</span>
                  <span className="flex items-center gap-1.5 text-[#9A7D3A] shrink-0">
                    {prop.price}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Portfolio Stats Strip */}
            <div className="flex gap-8 border-t border-[#111111]/10 pt-6">
              <div>
                <span className="font-aiveritas text-2xl text-[#9A7D3A]">$9.29M+</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/45 font-bold mt-1">
                  Active Inventory
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-2xl text-[#9A7D3A]">Dual-Practice</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/45 font-bold mt-1">
                  Commercial &amp; Residential
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ COLUMN 2 — Scrolling sticky card stack ══ */}
        <div className="w-full md:w-[62%] px-4 sm:px-6 md:px-8 py-8 md:py-16">
          <div className="h-4 md:hidden" />

          <div className="flex flex-col gap-[16svh] pb-[12svh]">
            {activeSignatureProperties.map((prop, i) => {
              const zIndex = 10 + i;

              return (
                <div
                  key={prop.id}
                  className="sticky rounded-2xl overflow-hidden shadow-xl border border-black/10"
                  style={{ top: CARD_TOP, height: CARD_H, zIndex }}
                >
                  <Image
                    src={prop.img}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 62vw"
                    priority={i === 0}
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="bg-[#C8A951] text-[#111111] text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 rounded-sm">
                        {prop.badge}
                      </span>
                      <span className="bg-white/15 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 rounded-sm">
                        MLS# {prop.mlsId}
                      </span>
                      <span className="text-[#C8A951] text-[10px] uppercase tracking-[0.2em] font-bold">
                        {prop.type}
                      </span>
                    </div>

                    <h3 className="font-aiveritas text-3xl md:text-5xl text-white mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-white/80 font-light text-sm md:text-base mb-3 max-w-xl">
                      {prop.subtitle}
                    </p>
                    <p className="text-white/60 text-xs flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A951]" /> {prop.location}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
                      <div>
                        <p className="text-white/70 font-medium text-xs md:text-sm tracking-wide mb-1">
                          {prop.specs}
                        </p>
                        <strong className="font-aiveritas text-[#C8A951] text-2xl md:text-3xl font-normal">
                          {prop.price}
                        </strong>
                      </div>

                      <Link
                        href={`/listings/${prop.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8A951] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors group"
                      >
                        View Property Dossier
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Closing Portfolio Hub Card ── */}
            <div
              className="sticky rounded-2xl overflow-hidden shadow-xl bg-[#111111] flex flex-col items-center justify-center p-10 border border-[#C8A951]/25"
              style={{ top: CARD_TOP, height: CARD_H, zIndex: 20 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1810_0%,#0c0b09_70%)]" />
              <div className="relative z-10 flex flex-col items-center w-full max-w-md gap-5 text-center">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold">
                  Active Offerings &amp; Proven Track Record
                </span>
                <h3 className="font-aiveritas text-4xl md:text-5xl text-white">
                  Explore Full Portfolio
                </h3>
                <div className="w-10 h-[1px] bg-[#C8A951]" />
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  Browse our exclusive active commercial, residential, and land offerings alongside our proven track record of closed transactions across St. Petersburg, Tampa, Brandon, Frostproof, Fort McCoy, Bradenton, and Pasco County.
                </p>
                <div className="flex flex-col w-full gap-3 mt-4">
                  <Link
                    href="/properties"
                    className="w-full text-center py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs bg-[#C8A951] text-[#111111] hover:bg-white transition-colors"
                  >
                    View All Properties &amp; Sold Listings
                  </Link>
                  <Link
                    href="/listings/6100-bahama-shores-dr-s-st-petersburg"
                    className="w-full text-center py-3.5 rounded-xl font-bold tracking-[0.2em] uppercase text-xs border border-white/20 text-white hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
                  >
                    6100 Bahama Shores Dr S ($4.55M)
                  </Link>
                  <Link
                    href="/listings/770-old-stokes-rd-frostproof"
                    className="w-full text-center py-3.5 rounded-xl font-bold tracking-[0.2em] uppercase text-xs border border-white/20 text-white hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
                  >
                    770 Old Stokes Rd (79.54 Acres)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    img: "/listings/old-stokes-road-cover-image-davis-garnett.jpg",
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
    img: "/listings/d-g-land-listing-cover.webp",
    isFlagship: false
  }
];

export default function PropertiesStickyStack() {
  const CARD_H = "66svh";

  return (
    <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto relative">
      {/* ── Mobile header (hidden on desktop) ── */}
      <div className="block md:hidden px-2 pt-14 pb-6 text-center">
        <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
          Featured Listings · 2026
        </span>
        <h2 className="font-aiveritas text-4xl text-[#111111] mb-4 leading-tight">
          Featured<br />
          <span className="text-[#9A7D3A]">Listings</span>
        </h2>
        <p className="text-[#111111]/70 font-light text-base leading-relaxed max-w-md mx-auto">
          Explore our featured residential, commercial, and land listings across Tampa Bay and Central Florida.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
        {/* ══ COLUMN 1 — Sticky editorial panel (desktop only) ══ */}
        <div className="hidden md:block md:w-[36%] shrink-0 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center pr-2 lg:pr-6">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Mark &amp; Rachael · Active Listings
            </span>

            <h2 className="font-aiveritas text-4xl lg:text-5xl xl:text-6xl text-[#111111] leading-tight mb-5">
              Featured<br />Listings
            </h2>

            <div className="w-10 h-[2px] bg-[#C8A951] mb-5" />

            <p className="text-[#111111]/75 font-light leading-relaxed max-w-md mb-7 text-sm lg:text-base xl:text-[17px]">
              Helping buyers, sellers, and business owners across residential homes, commercial properties, land, and waterfront and unique properties in Tampa Bay and Central Florida.
            </p>

            <div className="flex flex-col gap-2.5 mb-8">
              {activeSignatureProperties.map((prop, idx) => (
                <Link
                  key={prop.slug}
                  href={`/listings/${prop.slug}`}
                  className="flex items-center justify-between text-[#111111] text-xs font-bold uppercase tracking-[0.14em] border-b border-[#111111]/15 pb-2.5 hover:text-[#9A7D3A] hover:border-[#C8A951] transition-colors group"
                >
                  <span className="truncate pr-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#9A7D3A]">0{idx + 1}</span>
                    <span className="truncate">{prop.title}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[#9A7D3A] shrink-0">
                    {prop.price}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Portfolio Credentials Strip (Matched to Portfolio Hero) */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#111111]/10 pt-6">
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">CRE &amp; RES</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  Dual-Certified Agents
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">Tampa Bay</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  &amp; Central Florida
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">FL Licensed</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  BK3209459 &amp; SL3378601
                </span>
              </div>
              <div>
                <span className="font-aiveritas text-xl text-[#9A7D3A] block">Align Right</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111111]/60 font-bold mt-0.5">
                  Carrollwood • BK3401606
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ COLUMN 2 — Scrolling sticky card stack ══ */}
        <div className="w-full md:w-[64%] py-6 md:py-12">
          <div className="h-2 md:hidden" />

          <div className="flex flex-col gap-[10svh] pb-[8svh]">
            {activeSignatureProperties.map((prop, i) => {
              const zIndex = 10 + i;

              return (
                <div
                  key={prop.id}
                  className="sticky rounded-2xl overflow-hidden shadow-xl border border-black/15 min-h-[440px] max-h-[640px]"
                  style={{ top: `calc(13svh + ${i * 10}px)`, height: CARD_H, zIndex }}
                >
                  <Image
                    src={prop.img}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 768px) 92vw, 58vw"
                    priority={i === 0}
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                  <div className="absolute top-5 right-5 md:top-7 md:right-7 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#C8A951]/40 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A951] z-10">
                    0{i + 1} / 0{activeSignatureProperties.length}
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-9">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
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

                    <h3 className="font-aiveritas text-2xl md:text-4xl text-white mb-1.5 leading-snug">
                      {prop.title}
                    </h3>
                    <p className="text-white/85 font-light text-sm md:text-base mb-2.5 max-w-xl leading-relaxed">
                      {prop.subtitle}
                    </p>
                    <p className="text-white/75 text-xs md:text-sm flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A951]" /> {prop.location}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4">
                      <div>
                        <p className="text-white/75 font-medium text-xs md:text-sm tracking-wide mb-1">
                          {prop.specs}
                        </p>
                        <strong className="font-aiveritas text-[#C8A951] text-2xl md:text-3xl font-normal">
                          {prop.price}
                        </strong>
                      </div>

                      <Link
                        href={`/listings/${prop.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A951] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors group"
                      >
                        View Property Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Closing Portfolio Hub Card ── */}
            <div
              className="sticky rounded-2xl overflow-hidden shadow-xl bg-[#111111] flex flex-col items-center justify-center p-7 md:p-10 border border-[#C8A951]/25 min-h-[440px] max-h-[640px]"
              style={{ top: `calc(13svh + ${activeSignatureProperties.length * 10}px)`, height: CARD_H, zIndex: 20 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1810_0%,#0c0b09_70%)]" />
              <div className="relative z-10 flex flex-col items-center w-full max-w-lg gap-4 text-center">
                <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold">
                  Local Knowledge &amp; Personal Service
                </span>
                <h3 className="font-aiveritas text-3xl md:text-5xl text-white leading-tight">
                  Serving Greater Tampa Bay<br />
                  <span className="text-[#C8A951]">&amp; Central Florida</span>
                </h3>
                <div className="w-12 h-[1px] bg-[#C8A951] my-2" />
                <p className="text-white/80 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed max-w-md mb-2">
                  Representing residential and commercial clients across Pinellas, Hillsborough, Pasco, Polk, and Marion Counties.
                </p>

                <div className="flex flex-col w-full gap-3 mt-4">
                  <Link
                    href="/properties"
                    className="w-full text-center py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs bg-[#C8A951] text-[#111111] hover:bg-white transition-colors shadow-lg"
                  >
                    View All Active &amp; Sold Listings
                  </Link>
                  <Link
                    href="/knowledge-hub"
                    className="w-full text-center py-3 rounded-xl font-bold tracking-[0.2em] uppercase text-xs border border-white/20 text-white/90 hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
                  >
                    Explore Neighborhood &amp; Market Guides
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

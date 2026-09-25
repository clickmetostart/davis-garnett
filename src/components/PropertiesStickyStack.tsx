"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const defaultProperties = [
  { id: 1,  type: "Commercial",  title: "Tampa Riverwalk Tower",  specs: "Class-A Office • 450,000 GLA",       price: "Lease: $45/SF", img: "/com_office_tower_1787632874122.png" },
  { id: 2,  type: "Commercial",  title: "Channelside Retail",      specs: "Luxury Retail • 98% Occ.",           price: "5.2% Cap",      img: "/com_luxury_retail_1787632885082.png" },
  { id: 3,  type: "Commercial",  title: "St. Pete Industrial",     specs: "Logistics Hub • 1.2M GLA",          price: "$18.5M",        img: "/com_industrial_park_1787632905437.png" },
  { id: 4,  type: "Commercial",  title: "Ybor Multi-Family",       specs: "320 Units • Resort Style",          price: "4.8% Cap",      img: "/com_multi_family_1787632895059.png" },
  { id: 5,  type: "Residential", title: "Davis Islands Estate",    specs: "6 Bed • 8 Bath • 12k SqFt",        price: "$14.2M",        img: "/res_waterfront_estate_1787632802890.png" },
  { id: 6,  type: "Residential", title: "Bayshore Modern",         specs: "5 Bed • 6 Bath • 8.5k SqFt",       price: "$8.9M",         img: "/res_modern_mansion_1787632812473.png" },
  { id: 7,  type: "Residential", title: "Downtown Penthouse",      specs: "4 Bed • 4.5 Bath • 5k SqFt",       price: "$6.5M",         img: "/res_luxury_condo_1787632822869.png" },
  { id: 8,  type: "Residential", title: "Hyde Park Historic",      specs: "7 Bed • 7 Bath • 9.1k SqFt",       price: "$5.8M",         img: "/res_historic_estate_1787632833084.png" },
  { id: 9,  type: "Residential", title: "Clearwater Beach",        specs: "5 Bed • 5 Bath • 6k SqFt",         price: "$11.5M",        img: "/res_beachfront_villa_1787632843222.png" },
  { id: 10, type: "Residential", title: "Avila Golf Estate",       specs: "6 Bed • 7 Bath • 10.5k SqFt",      price: "$7.2M",         img: "/res_golf_course_home_1787632854609.png" },
  { id: 11, type: "Land",        title: "Apollo Beach Marina",     specs: "24 Acres • Waterfront",             price: "$22.0M",        img: "/land_waterfront_plot_1787632916432.png" },
  { id: 12, type: "Land",        title: "I-4 Corridor Site",       specs: "150 Acres • Industrial",           price: "$35.0M",        img: "/land_commercial_development_1787632926636.png" },
];

export default function PropertiesStickyStack() {
  const [liveProperties, setLiveProperties] = useState<any[]>(defaultProperties);

  useEffect(() => {
    fetch('/api/lofty/listings')
      .then(res => { if (!res.ok) return null; return res.json(); })
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.slice(0, defaultProperties.length).map((l: any, i: number) => ({
            id: l.id,
            type: l.propertyType || defaultProperties[i].type,
            title: l.title,
            specs: `${l.bedrooms} Bed • ${l.bathrooms} Bath • ${l.sqFt} SqFt`,
            price: l.askingPrice,
            img: l.images?.[0]?.url || defaultProperties[i].img,
          }));
          setLiveProperties(defaultProperties.map((p, i) => mapped[i] || p));
        }
      })
      .catch(() => {});
  }, []);

  // All cards: the mega flagship + the regular listings + the closing menu card
  const allCards = [
    { isMega: true  as const },
    ...liveProperties.map(p => ({ isMega: false as const, prop: p })),
    { isMega: null as null },   // closing menu card sentinel
  ];

  const CARD_TOP  = "12svh";
  const CARD_H    = "76svh";

  return (
    /*
      Two-column layout on md+:
        Col 1 (left, ~38%): sticky label + title + description + links — stays put while you scroll
        Col 2 (right, ~62%): the tall scroll context that produces the stacking cards
      On mobile: full-width stacking cards, header above
    */
    <div className="w-full relative">

      {/* ── Mobile header (hidden on desktop) ── */}
      <div className="block md:hidden px-6 pt-16 pb-8 text-center">
        <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">Signature Assets · Tampa Area</span>
        <h2 className="font-aiveritas text-4xl text-[#111] mb-4">The Bay Collection</h2>
        <p className="text-[#111]/60 font-light text-sm leading-relaxed">
          Swipe through our curated portfolio of premium commercial and luxury residential properties across Tampa Bay.
        </p>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* ══ COLUMN 1 — Sticky editorial panel (desktop only) ══ */}
        <div className="hidden md:block md:w-[38%] shrink-0 relative">
          {/* Stick it for the full height of the scroll column */}
          <div className="sticky top-0 h-screen flex flex-col justify-center pl-12 pr-8 xl:pl-20 xl:pr-12">

            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-6">
              Signature Assets · Tampa Area
            </span>

            <h2 className="font-aiveritas text-5xl xl:text-6xl text-[#111] leading-tight mb-6">
              The Bay<br />Collection
            </h2>

            <div className="w-10 h-[2px] bg-[#D4AF37] mb-8" />

            <p className="text-[#111]/60 font-light leading-relaxed max-w-xs mb-10">
              Explore our curated portfolio of premier commercial acquisitions and luxury residential estates across Tampa Bay — scroll to reveal each property.
            </p>

            <div className="flex flex-col gap-3 mb-12">
              <Link
                href="/listing/commercial"
                className="flex items-center gap-2 text-[#111] text-xs font-bold uppercase tracking-[0.2em] border-b border-[#111]/20 pb-3 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors group"
              >
                Commercial Assets
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/listing/residential"
                className="flex items-center gap-2 text-[#111] text-xs font-bold uppercase tracking-[0.2em] border-b border-[#111]/20 pb-3 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors group"
              >
                Luxury Residential
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/listing/residential"
                className="flex items-center gap-2 text-[#111] text-xs font-bold uppercase tracking-[0.2em] pb-3 hover:text-[#D4AF37] transition-colors group"
              >
                Land & Development
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Small stat strip */}
            <div className="flex gap-8 border-t border-[#111]/10 pt-8">
              <div>
                <span className="font-aiveritas text-2xl text-[#D4AF37]">12+</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111]/40 font-bold mt-1">Active Listings</span>
              </div>
              <div>
                <span className="font-aiveritas text-2xl text-[#D4AF37]">$250M+</span>
                <span className="block text-[10px] uppercase tracking-widest text-[#111]/40 font-bold mt-1">Portfolio Value</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ COLUMN 2 — Scrolling sticky card stack ══ */}
        <div className="w-full md:w-[62%] px-4 sm:px-6 md:px-8 py-8 md:py-16">

          {/* Spacer so the first card doesn't start at the very top on mobile */}
          <div className="h-4 md:hidden" />

          <div className="flex flex-col gap-[16svh] pb-[12svh]">

            {allCards.map((item, i) => {
              const zIndex = 10 + i;

              /* ── Mega flagship card ── */
              if (item.isMega === true) {
                return (
                  <div
                    key="mega"
                    className="sticky rounded-2xl overflow-hidden shadow-lg"
                    style={{ top: CARD_TOP, height: CARD_H, zIndex }}
                  >
                    <Image
                      src="/mega_property_pinned_1787632939192.png"
                      alt="The Tampa Apex"
                      fill
                      sizes="(max-width: 768px) 100vw, 62vw"
                      priority
                      className="object-cover"
                    />
                    {/* Dark gradient from bottom — white text reads perfectly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                      <span className="bg-[#D4AF37] text-white text-[10px] uppercase tracking-[0.2em] font-bold py-1 px-3 rounded-sm self-start mb-5">
                        Featured Flagship
                      </span>
                      <h3 className="font-aiveritas text-4xl md:text-5xl text-white mb-3">The Tampa Apex</h3>
                      <p className="text-white/70 font-light max-w-md leading-relaxed text-sm mb-6">
                        An architectural masterpiece redefining the Gulf Coast skyline. Mixed-use luxury combining a 5-star resort, elite retail, and bespoke penthouses.
                      </p>
                      <div className="flex gap-8 border-t border-white/20 pt-5 mb-6">
                        <div>
                          <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Type</span>
                          <span className="text-white font-bold text-sm">Mixed-Use</span>
                        </div>
                        <div>
                          <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Valuation</span>
                          <span className="text-[#D4AF37] font-bold text-sm">$850M</span>
                        </div>
                      </div>
                      <Link
                        href="/listing/commercial"
                        className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-1 self-start hover:text-[#D4AF37] transition-colors group"
                      >
                        View Full Details
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              }

              /* ── Closing menu card ── */
              if (item.isMega === null) {
                return (
                  <div
                    key="menu"
                    className="sticky rounded-2xl overflow-hidden shadow-lg bg-[#0c0b09] flex flex-col items-center justify-center p-10"
                    style={{ top: CARD_TOP, height: CARD_H, zIndex }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1810_0%,#0c0b09_70%)]" />
                    <div className="relative z-10 flex flex-col items-center w-full max-w-sm gap-5 text-center">
                      <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold">Full Portfolio</span>
                      <h3 className="font-aiveritas text-4xl text-white">Explore All Properties</h3>
                      <div className="w-8 h-[1px] bg-[#D4AF37]" />
                      <p className="text-white/50 font-light text-sm leading-relaxed">
                        Browse our complete range of commercial, residential, and land investment opportunities across Tampa Bay.
                      </p>
                      <div className="flex flex-col w-full gap-3 mt-4">
                        <Link href="/listing/commercial" className="w-full text-center py-4 rounded-lg font-bold tracking-[0.2em] uppercase text-xs bg-[#D4AF37] text-white hover:bg-white hover:text-[#111] transition-colors">
                          Commercial Assets
                        </Link>
                        <Link href="/listing/residential" className="w-full text-center py-4 rounded-lg font-bold tracking-[0.2em] uppercase text-xs border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                          Luxury Residential
                        </Link>
                        <Link href="#" className="w-full text-center py-4 rounded-lg font-bold tracking-[0.2em] uppercase text-xs border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                          Land & Development
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              /* ── Regular property card ── */
              const prop = item.prop;
              const href = prop.type === "Commercial" || prop.type === "Land" ? "/listing/commercial" : "/listing/residential";

              return (
                <div
                  key={prop.id}
                  className="sticky rounded-2xl overflow-hidden shadow-lg"
                  style={{ top: CARD_TOP, height: CARD_H, zIndex }}
                >
                  <Image
                    src={prop.img}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 62vw"
                    className="object-cover"
                  />
                  {/* Dark gradient from bottom — white text on photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">
                      {prop.type}
                    </span>
                    <h3 className="font-aiveritas text-3xl md:text-4xl text-white mb-4">{prop.title}</h3>
                    <p className="text-white/60 font-medium text-sm tracking-wide mb-2">{prop.specs}</p>
                    <strong className="text-[#D4AF37] text-2xl md:text-3xl font-bold mb-6">{prop.price}</strong>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] border-b border-[#D4AF37] pb-1 self-start hover:text-[#D4AF37] transition-colors group"
                    >
                      View Property
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  HardHat,
  FileSearch,
  DollarSign,
  PhoneCall,
  Trees,
  ExternalLink,
  Globe,
  ChevronLeft,
  ChevronRight,
  Compass,
  X,
  LucideIcon,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DevelopmentImageSlider from "@/components/DevelopmentImageSlider";
import SiteFooter from "@/components/SiteFooter";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import { smoothScrollToId } from "@/lib/smoothScroll";
import { DEVELOPMENTS, Development } from "@/data/developments";

type FilterOption =
  | "all"
  | "downtown-bayshore"
  | "north-tampa"
  | "sarasota-manatee"
  | "st-petersburg-pinellas"
  | "clearwater-north-pinellas"
  | "west-pasco-palm-harbor"
  | "south-shore-hillsborough"
  | "westshore-marina-rocky-point"
  | "venice-wellen-park"
  | "east-hillsborough-central-fl"
  | "lakeland-polk-central-fl"
  | "north-tampa-carrollwood";

export default function DevelopmentsHubPage() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const fiftyPlusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const corridor = params.get("corridor")?.toLowerCase() || "";
    if (corridor === "downtown" || corridor === "downtown-bayshore") {
      setActiveFilter("downtown-bayshore");
    } else if (corridor === "st-petersburg" || corridor === "st-pete" || corridor === "st-petersburg-pinellas") {
      setActiveFilter("st-petersburg-pinellas");
    } else if (corridor === "clearwater" || corridor === "dunedin" || corridor === "clearwater-north-pinellas") {
      setActiveFilter("clearwater-north-pinellas");
    } else if (corridor === "west-pasco" || corridor === "palm-harbor" || corridor === "trinity" || corridor === "tarpon-springs" || corridor === "west-pasco-palm-harbor") {
      setActiveFilter("west-pasco-palm-harbor");
    } else if (corridor === "south-shore" || corridor === "apollo-beach" || corridor === "sun-city" || corridor === "south-shore-hillsborough") {
      setActiveFilter("south-shore-hillsborough");
    } else if (corridor === "westshore-marina" || corridor === "rocky-point" || corridor === "town-n-country" || corridor === "westshore-marina-rocky-point") {
      setActiveFilter("westshore-marina-rocky-point");
    } else if (corridor === "venice" || corridor === "wellen-park" || corridor === "north-port" || corridor === "venice-wellen-park") {
      setActiveFilter("venice-wellen-park");
    } else if (corridor === "carrollwood" || corridor === "keystone" || corridor === "north-tampa-carrollwood") {
      setActiveFilter("north-tampa-carrollwood");
    } else if (corridor === "northtampa" || corridor === "north-tampa" || corridor === "wesley-chapel") {
      setActiveFilter("north-tampa");
    } else if (corridor === "brandon" || corridor === "east-hillsborough" || corridor === "east-hillsborough-central-fl") {
      setActiveFilter("east-hillsborough-central-fl");
    } else if (corridor === "lakeland" || corridor === "plant-city" || corridor === "polk" || corridor === "lakeland-polk-central-fl") {
      setActiveFilter("lakeland-polk-central-fl");
    } else if (
      corridor === "sarasota-manatee" ||
      corridor === "sarasota" ||
      corridor === "bradenton" ||
      corridor === "lakewood-ranch"
    ) {
      setActiveFilter("sarasota-manatee");
    }

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => smoothScrollToId(hash), 80);
    }
  }, []);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") => {
    if (!ref.current) return;
    const el = ref.current;
    const distance = Math.min(el.clientWidth * 0.92, el.clientWidth);
    el.scrollBy({
      left: dir === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    developmentOfInterest: "Schedule a Private Tour (Any Region)",
    corridorPreference: "Tampa Bay, Pinellas, North Tampa & Sarasota/Bradenton",
    budgetRange: "$750K – $1.5M",
    timeline: "Within 3–6 Months",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const downtownTowers = DEVELOPMENTS.filter((d) => d.corridor === "downtown-bayshore");
  const northTampaCommunities = DEVELOPMENTS.filter((d) => d.corridor === "north-tampa");
  const sarasotaCommunities = DEVELOPMENTS.filter((d) => d.corridor === "sarasota-manatee");
  const stPeteCommunities = DEVELOPMENTS.filter((d) => d.corridor === "st-petersburg-pinellas");
  const clearwaterCommunities = DEVELOPMENTS.filter((d) => d.corridor === "clearwater-north-pinellas");
  const westPascoCommunities = DEVELOPMENTS.filter((d) => d.corridor === "west-pasco-palm-harbor");
  const southShoreCommunities = DEVELOPMENTS.filter((d) => d.corridor === "south-shore-hillsborough");
  const westshoreMarinaCommunities = DEVELOPMENTS.filter((d) => d.corridor === "westshore-marina-rocky-point");
  const veniceWellenParkCommunities = DEVELOPMENTS.filter((d) => d.corridor === "venice-wellen-park");
  const eastHillsboroughCommunities = DEVELOPMENTS.filter((d) => d.corridor === "east-hillsborough-central-fl");
  const lakelandPolkCommunities = DEVELOPMENTS.filter((d) => d.corridor === "lakeland-polk-central-fl");
  const carrollwoodCommunities = DEVELOPMENTS.filter((d) => d.corridor === "north-tampa-carrollwood");

  const showDowntown = activeFilter === "all" || activeFilter === "downtown-bayshore";
  const showNorthTampa = activeFilter === "all" || activeFilter === "north-tampa";
  const showSarasota = activeFilter === "all" || activeFilter === "sarasota-manatee";
  const showStPete = activeFilter === "all" || activeFilter === "st-petersburg-pinellas";
  const showClearwater = activeFilter === "all" || activeFilter === "clearwater-north-pinellas";
  const showWestPasco = activeFilter === "all" || activeFilter === "west-pasco-palm-harbor";
  const showSouthShore = activeFilter === "all" || activeFilter === "south-shore-hillsborough";
  const showWestshoreMarina = activeFilter === "all" || activeFilter === "westshore-marina-rocky-point";
  const showVenice = activeFilter === "all" || activeFilter === "venice-wellen-park";
  const showEastHillsborough = activeFilter === "all" || activeFilter === "east-hillsborough-central-fl";
  const showLakeland = activeFilter === "all" || activeFilter === "lakeland-polk-central-fl";
  const showCarrollwood = activeFilter === "all" || activeFilter === "north-tampa-carrollwood";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          category: "developments",
          subject: `${leadForm.developmentOfInterest} — Tampa Bay Development Inquiry`,
          development: leadForm.developmentOfInterest,
          corridorPreference: leadForm.corridorPreference,
          budgetRange: leadForm.budgetRange,
          timeline: leadForm.timeline,
          message: leadForm.message,
          source: "Featured Developments (/developments)",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit inquiry");
      setFormStatus("success");
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 bg-[#111111] text-white overflow-hidden border-b border-[#C8A951]/30 min-h-[680px] flex flex-col justify-center">
        <FaviconHeroBackground variant="dark" />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Davis &amp; Garnett · Commercial, Neighborhoods &amp; New Construction
            </span>

            <h1 className="font-aiveritas text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-6">
              Trending <span className="text-[#C8A951]">Real Estate</span>
            </h1>

            <p className="text-base md:text-[17px] lg:text-[18px] text-white/85 font-light leading-relaxed max-w-3xl mx-auto mb-8">
              Explore established waterfront districts, historic neighborhoods, active-adult 55+ villages, commercial corridors, and flagship new construction from Clearwater &amp; St. Petersburg through Tampa Bay to Lakewood Ranch &amp; Sarasota.
            </p>

            {/* Dual-Practice Hero Actions (Keep Visitor on Page) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => smoothScrollToId("trending-regions")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#C8A951] hover:bg-white text-[#111111] text-xs font-bold uppercase tracking-[0.18em] transition-colors w-full sm:w-auto"
              >
                <Compass className="w-4 h-4 shrink-0" />
                Browse Trends
              </button>
              <button
                type="button"
                onClick={() => smoothScrollToId("vip-pricing-form")}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-[#C8A951] text-white hover:text-[#111111] border border-white/25 text-xs font-bold uppercase tracking-[0.18em] transition-colors w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-[#C8A951] group-hover:text-[#111111] transition-colors shrink-0" />
                VIP Touring &amp; Contact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Below-Hero Regional Grid Navigation (Matches Main Menu — Eased Smooth Glide) */}
      <section id="trending-regions" className="py-8 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Tampa Bay & Hillsborough", sub: "Downtown, Westshore, Brandon & SouthShore", target: "downtown-towers", icon: Building2 },
              { label: "Pinellas County & Beaches", sub: "St. Petersburg, Bahama Shores, Clearwater & Dunedin", target: "st-pete-region", icon: MapPin },
              { label: "North Tampa, Pasco & Hernando", sub: "Wesley Chapel, Land O' Lakes, Trinity & Tarpon", target: "north-tampa-communities", icon: Trees },
              { label: "Bradenton, Sarasota & Venice", sub: "Lakewood Ranch, The Quay & Wellen Park", target: "sarasota-manatee-communities", icon: Compass },
              { label: "Central FL, Plant City & Polk", sub: "Lakeland Lakes, I-4 Industrial & Greenbelt Land", target: "lakeland-polk-region", icon: TrendingUp },
              { label: "Align Right Carrollwood Corridor", sub: "Our Brokerage Backyard: Lakes, Odessa & Cheval", target: "carrollwood-region", icon: Trees },
              { label: "55+ Active-Adult Communities", sub: "Zero-CDD Golf Clubs & New Resort Clubhouses", target: "55-plus", icon: Sparkles },
              { label: "Why Work With Your Own Agent?", sub: "Commercial, Residential & Leasing at $0 Cost", target: "new-construction-guide", icon: CheckCircle2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (activeFilter !== "all") {
                      setActiveFilter("all");
                      setTimeout(() => smoothScrollToId(item.target), 40);
                    } else {
                      smoothScrollToId(item.target);
                    }
                  }}
                  className="group text-left p-3.5 rounded-xl bg-white hover:bg-[#111111] border border-[#111111]/10 hover:border-[#C8A951] transition-all shadow-xs flex items-start gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f5f3ef] group-hover:bg-[#C8A951]/20 text-[#9A7D3A] group-hover:text-[#C8A951] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-[#111111] group-hover:text-white leading-snug truncate transition-colors">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-[#111111]/60 group-hover:text-white/70 truncate transition-colors">
                      {item.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clean Filtered-State Banner (Only shown when filtered via Nav / Homepage link) */}
      {activeFilter !== "all" && (
        <div className="bg-[#f5f3ef] border-b border-[#111111]/10 py-3 px-6">
          <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9A7D3A]">
              Filtered Region View
            </span>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="px-4 py-1.5 rounded-full bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-[11px] font-bold uppercase tracking-wider transition-colors"
            >
              Show All Tampa Bay Regions
            </button>
          </div>
        </div>
      )}

      {/* ── REGION 1: DOWNTOWN TAMPA, BAYSHORE & SOUTH TAMPA (TOP TRENDING) ── */}
      {showDowntown && (
        <RegionalShowcaseSection
          id="downtown-towers"
          bgClass="bg-white"
          cardBgClass="bg-[#f5f3ef]"
          icon={Building2}
          eyebrow="Region 01 • Downtown Tampa, Water St., Hyde Park & Westshore"
          title="Downtown Tampa, Bayshore & South Tampa"
          description="Classic Hyde Park bungalows and Bayshore estates alongside Riverwalk sky condos, Westshore marinas, and 650,000+ sq. ft. of new urban office and retail."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Downtown Tampa Riverwalk, Water Street & Bayshore Real Estate"
          areaCaption="Historic Neighborhoods, Sky Towers & Urban Commercial"
          residentialHighlight="Historic Hyde Park, Davis Islands, Harbour Island & Beach Park plus Pendry, Ritz-Carlton Bayshore, ONE Tampa, Water St., and lock-and-leave bay condos."
          commercialHighlight="Gasworx (500K office / 150K retail), Water Street medical & retail plazas, Hotel ORA managed suites, and Westshore Airport business corridor."
          developments={downtownTowers}
        />
      )}

      {/* ── REGION 2: WESLEY CHAPEL, LAND O' LAKES & HERNANDO (HIGHEST GROWTH) ── */}
      {showNorthTampa && (
        <RegionalShowcaseSection
          id="north-tampa-communities"
          bgClass="bg-[#f5f3ef]"
          cardBgClass="bg-white"
          icon={Trees}
          eyebrow="Region 02 • Wesley Chapel, Land O' Lakes & Brooksville"
          title="Wesley Chapel, Land O' Lakes & Hernando"
          description="Proven zero/low-bond golf villages alongside flagship Crystal Lagoons, brand-new 55+ clubhouses, and Pasco's booming biotech and SR-56 retail corridors."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Wesley Chapel & Land O' Lakes Residential and Commercial Corridor"
          areaCaption="Established Golf, Crystal Lagoons, 55+ Resorts & Speros Biotech"
          residentialHighlight="Plantation Palms Golf Club & Seven Oaks resales, Two Rivers, Angeline, Epperson & Mirada Lagoons, Sunrise Hills, plus Valencia Ridge & Medley 55+."
          commercialHighlight="Moffitt's 775-acre Speros FL biotech campus, HCA Florida Angeline Hospital, Shops at Wiregrass, and Peak Surf Park commercial pads."
          developments={northTampaCommunities}
        />
      )}

      {/* ── REGION 3: BRADENTON, LAKEWOOD RANCH & SARASOTA ── */}
      {showSarasota && (
        <RegionalShowcaseSection
          id="sarasota-manatee-communities"
          bgClass="bg-white"
          cardBgClass="bg-[#f5f3ef]"
          icon={MapPin}
          eyebrow="Region 03 • Bradenton, Parrish, Lakewood Ranch & Sarasota Bayfront"
          title="Bradenton, Lakewood Ranch & Sarasota"
          description="Lakeside custom estates, bundled golf, award-winning 55+ villages, downtown bayfront condos, and UTC corporate and retail centers south along I-75."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Bradenton, Lakewood Ranch & Sarasota Bayfront Real Estate"
          areaCaption="Lakewood Ranch Villages, Bayfront Towers & UTC Commercial"
          residentialHighlight="Waterside & Wild Blue custom estates, Star Farms, Azario golf, North River Ranch, The Quay One Park & Ritz-Carlton, plus Cresswind & Del Webb 55+."
          commercialHighlight="UTC I-75 Exit 213 retail hubs, Waterside Place waterfront plazas, Lakewood Ranch medical parks, and Downtown Sarasota commercial storefronts."
          developments={sarasotaCommunities}
        />
      )}

      {/* ── REGION 4: ST. PETERSBURG, PINELLAS WATERFRONT & BEACHES ── */}
      {showStPete && (
        <RegionalShowcaseSection
          id="st-pete-region"
          bgClass="bg-[#f5f3ef]"
          cardBgClass="bg-white"
          icon={MapPin}
          eyebrow="Region 04 • St. Petersburg, Bahama Shores, Snell Isle & Gulf Beaches"
          title="St. Petersburg & South Pinellas"
          description="Deep-water boating canals in Bahama Shores and Snell Isle paired with Downtown sky towers, 55+ bayfront clubs, and bustling Central Avenue commerce."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="St. Petersburg Bayfront, Bahama Shores & EDGE District Real Estate"
          areaCaption="Deep-Water Boating, Downtown Condos & Central Ave Retail"
          residentialHighlight="Bahama Shores (6100 Bahama Shores Dr S), Snell Isle, Old Northeast, Waldorf Astoria / Art House towers, plus Point Brittany, Isla Del Sol & Mainlands 55+."
          commercialHighlight="Central Avenue & EDGE District storefronts, Beach Drive dining hospitality, SunRunner transit pads, and Gateway business parks."
          developments={stPeteCommunities}
        />
      )}

      {/* ── REGION 5: CLEARWATER, DUNEDIN, SAND KEY & NORTH PINELLAS ── */}
      {showClearwater && (
        <RegionalShowcaseSection
          id="clearwater-region"
          bgClass="bg-white"
          cardBgClass="bg-[#f5f3ef]"
          icon={MapPin}
          eyebrow="Region 05 • Clearwater, Dunedin, Sand Key, Belleair & Safety Harbor"
          title="Clearwater, Dunedin & North Pinellas"
          description="High coastal bluffs along the Pinellas Trail, barrier island condos, classic zero-CDD 55+ clubs, and busy US-19 and Gulf-to-Bay commercial plazas."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Clearwater Beach, Sand Key & Dunedin Coastal Real Estate"
          areaCaption="Coastal Bluffs, Gulf Towers, 55+ Clubs & US-19 Retail"
          residentialHighlight="Walkable Dunedin & Safety Harbor bungalows, Belleair Bluffs, Sand Key / Clearwater Beach towers, plus On Top of the World, Highland Lakes & Timber Greens 55+."
          commercialHighlight="Morton Plant & Mease Dunedin medical offices, Gulf-to-Bay (SR-60) strip plazas, and Downtown Dunedin Main Street retail."
          developments={clearwaterCommunities}
        />
      )}

      {/* ── REGION 6: TARPON SPRINGS, PALM HARBOR & TRINITY / WEST PASCO ── */}
      {showWestPasco && (
        <RegionalShowcaseSection
          id="west-pasco-region"
          bgClass="bg-[#f5f3ef]"
          cardBgClass="bg-white"
          icon={Trees}
          eyebrow="Region 06 • Tarpon Springs, Palm Harbor, East Lake & Trinity / SR-54"
          title="Tarpon Springs, Palm Harbor & Trinity / West Pasco"
          description="Starkey Ranch trails and East Lake Woodlands golf alongside Sponge Docks storefronts, Trinity hospital medical suites, and Timber Greens 55+."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Tarpon Springs, Palm Harbor, East Lake & Trinity Real Estate"
          areaCaption="Starkey Trails, East Lake Golf, Sponge Docks & SR-54 Medical"
          residentialHighlight="Starkey Ranch, Asturia & Longleaf walkable porches, East Lake & Lansbrook Lake Tarpon boat ramps, plus Timber Greens & Heritage Pines 55+."
          commercialHighlight="HCA Florida Trinity Hospital medical condos, SR-54 commercial outparcels, and Dodecanese Blvd Sponge Docks retail."
          developments={westPascoCommunities}
        />
      )}

      {/* ── REGION 7: APOLLO BEACH, RUSKIN & SUN CITY CENTER (SOUTHSHORE) ── */}
      {showSouthShore && (
        <RegionalShowcaseSection
          id="south-shore-region"
          bgClass="bg-white"
          cardBgClass="bg-[#f5f3ef]"
          icon={Compass}
          eyebrow="Region 07 • Apollo Beach, Ruskin, Wimauma & Sun City Center"
          title="Apollo Beach, Ruskin & Sun City Center"
          description="Deep-water sailboat canals in MiraBay, new Waterset trails, Big Bend Rd hospital commerce, and Florida's golf-cart 55+ hubs."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Apollo Beach, Waterset, Sun City Center & Valencia del Sol"
          areaCaption="Sailboat Canals, Waterset New Builds & Sun City / Valencia del Sol 55+"
          residentialHighlight="MiraBay & Symphony Isles no-bridge docks, Waterset new builds, Ruskin river lots, plus Sun City Center, Kings Point & GL Homes' Valencia del Sol 55+."
          commercialHighlight="Big Bend Road (I-75 Exit 246) retail and medical hubs around St. Joseph's Hospital South plus US-41 marine service plazas."
          developments={southShoreCommunities}
        />
      )}

      {/* ── REGION 8: WESTSHORE MARINA, ROCKY POINT & TOWN 'N COUNTRY ── */}
      {showWestshoreMarina && (
        <RegionalShowcaseSection
          id="westshore-marina-region"
          bgClass="bg-[#f5f3ef]"
          cardBgClass="bg-white"
          icon={Building2}
          eyebrow="Region 08 • Westshore Marina District, Rocky Point, Baycrest & International Plaza"
          title="Westshore Marina, Rocky Point & Town 'N Country"
          description="Bayfront marina towers, 5-minute airport waterfront offices, zero-HOA Baycrest boat canals, and Westshore corporate suites."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Westshore Marina District, Rocky Point & Tampa Airport Business Corridor"
          areaCaption="Marina Pointe Towers, Rocky Point Offices & Zero-HOA Canals"
          residentialHighlight="Westshore Marina District rooftop townhomes and sky condos, Baycrest & Dana Shores sailboat canals, plus zero-CDD Town 'N Country ranches."
          commercialHighlight="Rocky Point waterfront corporate towers, Westshore & International Plaza office leases, and W. Hillsborough / Veterans contractor flex bays."
          developments={westshoreMarinaCommunities}
        />
      )}

      {/* ── REGION 9: VENICE, WELLEN PARK & NORTH PORT ── */}
      {showVenice && (
        <RegionalShowcaseSection
          id="venice-wellen-park-region"
          bgClass="bg-white"
          cardBgClass="bg-[#f5f3ef]"
          icon={MapPin}
          eyebrow="Region 09 • Venice Island, Wellen Park, Nokomis & North Port"
          title="Venice, Wellen Park & North Port"
          description="Downtown Wellen lakefront concerts, historic Island of Venice boutiques, Solstice 55+ villas, and Sarasota Memorial Laurel Rd medical growth."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Wellen Park, Island of Venice & Laurel Rd Medical Commercial"
          areaCaption="Downtown Wellen, Historic Island Beaches & Laurel Rd Medical CRE"
          residentialHighlight="Downtown Wellen Park & CoolToday Park villages, Island of Venice walk-to-sand blocks, Grand Palm preserves, plus Solstice & Renaissance 55+."
          commercialHighlight="Laurel Road (I-75 Exit 195) clinics around Sarasota Memorial Hospital Venice, Venice Ave boutiques, and US-41 commercial pads."
          developments={veniceWellenParkCommunities}
        />
      )}

      {/* ── REGION 10: BRANDON, VALRICO & EAST HILLSBOROUGH ── */}
      {showEastHillsborough && (
        <RegionalShowcaseSection
          id="east-hillsborough-region"
          bgClass="bg-[#f5f3ef]"
          cardBgClass="bg-white"
          icon={Building2}
          eyebrow="Region 10 • Brandon SR-60, Valrico, Seffner, FishHawk & I-75 Sabal Park"
          title="Brandon, Valrico & East Hillsborough"
          description="Active SBA mixed-use buildings off SR-60, no-HOA Seffner lots, shaded Valrico golf neighborhoods, Hawkstone new builds, and Sabal Park logistics."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Brandon SR-60 Commercial, Valrico, FishHawk & Hawkstone"
          areaCaption="SR-60 Mixed-Use, Valrico Golf Yards & Hawkstone New Builds"
          residentialHighlight="Valrico & Bloomingdale half-acre yards, zero-HOA Seffner (9635 Joe Ebert Rd), FishHawk Ranch trails, Hawkstone new construction, and Brandon 55+ villas."
          commercialHighlight="126 Ridgewood Ave & 613 E Morgan St off SR-60 in Brandon plus Sabal Park / Causeway warehouse distribution 10 min from Port Tampa Bay."
          developments={eastHillsboroughCommunities}
        />
      )}

      {/* ── REGION 11: LAKELAND, PLANT CITY & CENTRAL FL I-4 CORRIDOR ── */}
      {showLakeland && (
        <RegionalShowcaseSection
          id="lakeland-polk-region"
          bgClass="bg-white"
          cardBgClass="bg-[#f5f3ef]"
          icon={TrendingUp}
          eyebrow="Region 11 • Lakeland, Plant City, Bonnet Springs, Polk & Marion Land"
          title="Lakeland, Plant City & I-4 Corridor"
          description="Historic brick Lake Morton & Walden Lake living, Bonnet Springs urban growth, I-4 logistics warehouses, and strategic 20-to-80 acre Florida tracts."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Lakeland, Plant City I-4 Industrial & Polk/Marion Development Land"
          areaCaption="Lake Hollingsworth Classics, I-4 Logistics & Greenbelt Acreage"
          residentialHighlight="Historic Dixieland & Lake Morton brick homes, Walden Lake & Plant City mini-farms, plus deeded-land Highland Fairways & Schalamar Creek 55+."
          commercialHighlight="Bonnet Springs & Downtown Lakeland retail, I-4 / County Line industrial hubs, plus our active Frostproof (79.54 ac) & Fort McCoy (19.72 ac) tracts."
          developments={lakelandPolkCommunities}
        />
      )}

      {/* ── REGION 12 (BROKERAGE ANCHOR): ALIGN RIGHT CARROLLWOOD & SURROUNDING CORRIDOR ── */}
      {showCarrollwood && (
        <RegionalShowcaseSection
          id="carrollwood-region"
          bgClass="bg-[#f5f3ef]"
          cardBgClass="bg-white"
          icon={Trees}
          eyebrow="Region 12 • Align Right Realty Carrollwood (3903 Northdale Blvd) & Surrounding Corridor"
          title="Align Right Carrollwood & Surrounding Corridor"
          description="Our home brokerage backyard—zero-CDD ski lakes in Carrollwood, Odessa horse farms, Cheval golf, Keystone acreage, Citrus Park retail, and Dale Mabry offices."
          areaImage="/placeholders/dg-brand-placeholder.webp"
          areaImageAlt="Align Right Realty Carrollwood, Odessa, Cheval & Citrus Park"
          areaCaption="Our Brokerage Backyard: Classic Lakes, Odessa Barns & Offices"
          residentialHighlight="Original Carrollwood & Lake Magdalene ski lakes, Odessa lakeside barns, Cheval Golf, Keystone 1–5+ acre estates, and Carrollwood Village 55+ villas."
          commercialHighlight="Centered around Align Right Realty Carrollwood (3903 Northdale Blvd), North Dale Mabry plazas, Citrus Park medical suites, and Fletcher office parks."
          developments={carrollwoodCommunities}
        />
      )}

      {/* ── COLLECTIVE SECTION 3: COMMERCIAL, RESIDENTIAL & LEASING AGENT REPRESENTATION ── */}
      <section id="new-construction-guide" className="py-20 px-6 md:px-12 bg-white border-b border-[#111111]/10 scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-start mb-12">
            <div className="lg:col-span-5">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-3">
                Why Work With Your Own Agent?
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-5">
                Commercial, Residential<br />
                <span className="text-[#9A7D3A]">&amp; Leasing Advice.</span>
              </h2>
              <p className="text-[#111111]/75 text-base md:text-[17px] font-light leading-relaxed mb-6">
                Walking into a leasing office, sales gallery, or model home alone puts the owner first. On-site reps work only for the builder or landlord to protect their asking price and terms.
              </p>
              <div className="p-6 rounded-2xl bg-[#f5f3ef] border border-[#C8A951]/40">
                <div className="text-xs uppercase tracking-[0.2em] text-[#9A7D3A] font-bold mb-2">
                  Golden Rule for Buyers &amp; Tenants
                </div>
                <p className="text-base text-[#111111]/80 leading-relaxed">
                  Builders, towers, and commercial landlords ask your agent to join or register{" "}
                  <strong className="font-semibold text-[#111111]">on or before visit one</strong>.
                  Most sellers and landlords pay our fee from their own budget. You pay $0 extra and gain two skilled pros fighting for your terms.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: DollarSign,
                  badge: "$0 Buyer Cost",
                  title: "Zero-Cost Representation",
                  description:
                    "Builders and landlords cover our brokerage fee on most home sales, new builds, and retail or office leases. Having Mark and Rachael in your corner costs you nothing extra.",
                },
                {
                  icon: TrendingUp,
                  badge: "Deals & Lease Terms",
                  title: "Rate Cuts, Credits & Caps",
                  description:
                    "Home buyers get help winning mortgage rate cuts and closing credits. Business tenants get guidance on free rent months, store build-out cash, and clean NNN lease caps.",
                },
                {
                  icon: HardHat,
                  badge: "Quality Checks",
                  title: "Third-Party Inspections",
                  description:
                    "Even new houses, bayfront towers, and clean shops need clear checks. We line up trusted pros to inspect roofs, flood height, AC units, pipes, and power panels early.",
                },
                {
                  icon: FileSearch,
                  badge: "Early Access",
                  title: "First Releases & Suites",
                  description:
                    "Prime lake lots, downtown sky condos, and busy street suites lease or sell fast. Get early word on new floor plans, off-market lots, and open spaces across Florida.",
                },
              ].map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] rounded-2xl p-6 md:p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="w-11 h-11 rounded-xl bg-[#111111] text-[#C8A951] flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9A7D3A]">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="font-aiveritas text-xl text-[#111111] mb-2.5 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#111111]/75 font-light leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dark Contrast Comparison Banner */}
          <div className="bg-[#111111] text-white rounded-3xl p-8 md:p-10 border border-[#C8A951]/30 grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="text-[#C8A951] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
                Commercial, Residential &amp; Leasing
              </span>
              <h3 className="font-aiveritas text-2xl md:text-3xl text-white mb-3">
                We Watch Growth Around Every Property.
              </h3>
              <p className="text-white/80 text-base font-light leading-relaxed">
                Because Mark Davis and Rachael Garnett work across commercial, leasing, and home sales, we check the full picture—nearby roads, new retail pads, taxes, and HOA or CAM fees.
              </p>
            </div>
            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={() => smoothScrollToId("vip-pricing-form")}
                className="w-full md:w-auto text-center px-8 py-4 bg-[#C8A951] hover:bg-white text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-colors"
              >
                Schedule VIP Touring
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 4: VIP TOURING, GENERAL ADVISORY & FLOOR PLAN CONTACT FORM ── */}
      <section id="vip-pricing-form" className="py-24 px-6 md:px-12 bg-[#f5f3ef] scroll-mt-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Value Proposition & What You Receive */}
            <div className="lg:col-span-5">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-4">
                Private Touring, Market Data &amp; General Inquiries
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-6">
                Schedule VIP Touring or Connect With Us.
              </h2>
              <p className="text-[#111111]/75 text-base md:text-[17px] font-light leading-relaxed mb-8">
                Whether scheduling a private tour across multiple regions, evaluating commercial suites, or requesting floor plans and HOA/CDD sheets, tell us what you need and we will prepare a clear route and packet.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Private Regional Driving Tours Tailored to Your Schedule",
                  "Established Neighborhood, 55+ & Commercial Side-by-Side Comparisons",
                  "Complete Floor Plan PDFs, Lot Maps & Builder Rate Credits",
                  "Clear HOA, CDD, Flood & Tax Breakdown Before You Bid",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span className="text-base text-[#111111]/85 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Advisor Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#111111]/10 flex items-center gap-4 shadow-sm">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8A951] shrink-0">
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
                  <div className="text-xs uppercase tracking-widest text-[#9A7D3A] font-bold mb-1">
                    Residential, Commercial &amp; VIP Touring Advisors
                  </div>
                  <div className="text-xs text-[#111111]/60 flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C8A951]" />
                    <span>Brokered by Align Right Realty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form Wired to /api/contact */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-[#111111]/10 shadow-xl">
              {formStatus === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#C8A951]/20 text-[#9A7D3A] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-aiveritas text-3xl text-[#111111] mb-3">
                    VIP Tour &amp; Inquiry Received
                  </h3>
                  <p className="text-[#111111]/70 max-w-md mx-auto mb-8 font-light leading-relaxed">
                    Thank you, <strong className="text-[#111111]">{leadForm.name}</strong>. Mark Davis
                    and Rachael Garnett are preparing your tour itinerary and property details for{" "}
                    <strong className="text-[#111111]">{leadForm.developmentOfInterest}</strong>. We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="px-8 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-[#C8A951] hover:text-[#111111] transition-colors"
                  >
                    Send Another Touring or Info Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-6">
                  <div className="border-b border-[#111111]/10 pb-4 mb-2">
                    <h3 className="font-aiveritas text-2xl text-[#111111]">
                      Schedule VIP Touring or General Inquiry
                    </h3>
                    <p className="text-xs text-[#111111]/60 mt-1">
                      Tell us which regions, neighborhoods, commercial corridors, or new developments you would like to tour or compare.
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
                        placeholder="e.g., Alexander Sterling"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
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
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Tour Focus or Topic of Interest
                      </label>
                      <select
                        value={leadForm.developmentOfInterest}
                        onChange={(e) =>
                          setLeadForm({ ...leadForm, developmentOfInterest: e.target.value })
                        }
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="Schedule a Private Tour (Any Region)">
                          Schedule a Private Tour (Any Region)
                        </option>
                        <option value="General Residential or Commercial Question">
                          General Residential or Commercial Question
                        </option>
                        <option value="Compare Multiple Regions & Neighborhoods">
                          Compare Multiple Regions &amp; Neighborhoods
                        </option>
                        {DEVELOPMENTS.map((d) => (
                          <option key={d.slug} value={d.name}>
                            {d.name} ({d.priceRange})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Target Price Range
                      </label>
                      <select
                        value={leadForm.budgetRange}
                        onChange={(e) => setLeadForm({ ...leadForm, budgetRange: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="$360K – $600K">$360K – $600K</option>
                        <option value="$600K – $1.0M">$600K – $1.0M</option>
                        <option value="$750K – $1.5M">$750K – $1.5M</option>
                        <option value="$1.5M – $3.0M">$1.5M – $3.0M</option>
                        <option value="$3.0M – $8.0M+">$3.0M – $8.0M+ (Tower / Penthouse)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                        Acquisition Timeline
                      </label>
                      <select
                        value={leadForm.timeline}
                        onChange={(e) => setLeadForm({ ...leadForm, timeline: e.target.value })}
                        className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3.5 text-sm text-[#111111] focus:outline-none focus:border-[#C8A951]"
                      >
                        <option value="Immediate / Quick Move-In (30-60 Days)">
                          Immediate / Quick Move-In (30–60 Days)
                        </option>
                        <option value="Within 3–6 Months">Within 3–6 Months</option>
                        <option value="6–12 Months (Dirt Build / Pre-Construction)">
                          6–12 Months (Dirt Build / Pre-Construction)
                        </option>
                        <option value="2026–2028 Tower Delivery">2026–2028 Tower Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                      Specific Floor Plan, View, Lot Size, or Builder Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us if you prefer waterfront views, an 80' conservation lot, 55+ active adult, short-term rental eligibility, or builder rate buydown details..."
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      className="w-full bg-[#fbfbf9] border border-[#111111]/15 rounded-xl px-4 py-3 text-sm text-[#111111] placeholder-[#111111]/35 focus:outline-none focus:border-[#C8A951]"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-xs text-red-600 font-medium">
                      Unable to submit right now. Please try again or call us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 px-8 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] font-bold text-xs uppercase tracking-[0.22em] rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {formStatus === "submitting"
                      ? "Sending Request..."
                      : "Join Development Interest List & Get Floor Plans"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIVE SECTION 4B: 55+ & ACTIVE-ADULT COMMUNITIES SLIDER (#55-plus) ── */}
      <section id="55-plus" className="py-24 px-6 md:px-12 bg-white border-t border-b border-[#111111]/10 scroll-mt-28">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-3">
                55+ Active Adult • Tampa Bay, Pasco &amp; Lakewood Ranch
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] leading-tight mb-3">
                55+ &amp; Active-Adult Communities
              </h2>
              <p className="text-[#111111]/75 text-base md:text-[17px] font-light leading-relaxed">
                Compare gated clubhouses, low-fee villas, and active-adult villages across Wesley Chapel, Lakewood Ranch, Bradenton, South Shore, and Clearwater.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollSlider(fiftyPlusRef, "left")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md hover:bg-[#111] hover:text-[#D4AF37] transition-all"
                aria-label="Scroll 55+ Communities Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider(fiftyPlusRef, "right")}
                className="p-3 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-md hover:bg-[#111] hover:text-[#D4AF37] transition-all"
                aria-label="Scroll 55+ Communities Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                href="/knowledge-hub/best-55-plus-active-adult-communities-tampa-bay"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-colors"
              >
                Full 55+ Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div
            ref={fiftyPlusRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              {
                name: "Cresswind Lakewood Ranch",
                type: "New Construction",
                area: "Lakewood Ranch, FL",
                price: "Mid $400Ks – $1M+",
                highlights: "Kolter Homes gated 55+ lifestyle club focused on fitness, arts, trails, and pickleball.",
              },
              {
                name: "Del Webb at North River Ranch",
                type: "New Construction",
                area: "Parrish / North Bradenton",
                price: "Mid $300Ks – $550Ks+",
                highlights: "Active-adult single-story homes inside North River Ranch's trail and Brightwood Pavilion hub.",
              },
              {
                name: "Valencia Ridge",
                type: "New Construction",
                area: "Wesley Chapel, FL",
                price: "Mid $400Ks – $900Ks+",
                highlights: "Gated GL Homes 55+ club with dining, grand social hall, pickleball, and resort pools.",
              },
              {
                name: "Esplanade at Wiregrass Ranch",
                type: "New Construction",
                area: "Wesley Chapel, FL",
                price: "From Mid $400Ks",
                highlights: "Taylor Morrison resort villas and homes right beside Wiregrass shopping and hospitals.",
              },
              {
                name: "Medley at Mirada",
                type: "New Construction",
                area: "San Antonio / Wesley Chapel",
                price: "High $300Ks – $600Ks+",
                highlights: "Private 55+ village inside Mirada featuring its own clubhouse plus 15-acre Lagoon access.",
              },
              {
                name: "Del Webb River Reserve",
                type: "New Construction",
                area: "Pasco / North Tampa",
                price: "Mid $400Ks – $700Ks+",
                highlights: "Easy-care single-story homes, full-time lifestyle director, trails, and heated club pool.",
              },
              {
                name: "Sun City Center & Kings Point",
                type: "Established Value",
                area: "South Shore (Hillsborough)",
                price: "$220Ks – $550Ks",
                highlights: "Over 200 resident clubs, indoor and outdoor pools, medical plaza, and golf-cart roads.",
              },
              {
                name: "Valencia Lakes",
                type: "Established Gated",
                area: "Wimauma / South Shore",
                price: "$360Ks – $625Ks",
                highlights: "Shaded streets, guarded gate, tennis, softball, fitness center, and social cafe.",
              },
              {
                name: "Timber Greens",
                type: "Established Golf",
                area: "New Port Richey (Pasco)",
                price: "$260Ks – $450Ks",
                highlights: "18-hole par-71 golf course, guard-gated streets, low monthly dues, and zero CDD fee.",
              },
              {
                name: "On Top of the World",
                type: "Established Pinellas",
                area: "Clearwater, FL",
                price: "$180Ks – $380Ks",
                highlights: "Central Clearwater 55+ condos and villas minutes from Gulf sand with golf and pools.",
              },
              {
                name: "Highland Lakes",
                type: "Zero-CDD Golf",
                area: "Palm Harbor / N. Clearwater",
                price: "$235Ks – $575Ks",
                highlights: "Includes 27 holes of free resident golf, Lake Tarpon lodge boats, and fenced RV parking.",
              },
              {
                name: "Valencia del Sol",
                type: "Modern Resort 55+",
                area: "Wimauma / SouthShore",
                price: "$370Ks – $825Ks",
                highlights: "25,000 sq ft GL Homes spa clubhouse, bistro dining, clay tennis, and zero CDD taxes.",
              },
              {
                name: "Solstice & Renaissance (Wellen)",
                type: "New Coastal 55+",
                area: "Venice / Wellen Park",
                price: "$395Ks – $1.2M+",
                highlights: "Gated Toll Brothers & Mattamy 55+ clubs minutes from Downtown Wellen and Manasota Key.",
              },
              {
                name: "Highland Fairways & Schalamar",
                type: "Deeded Inland Golf",
                area: "Lakeland, FL (Polk)",
                price: "$215Ks – $450Ks",
                highlights: "Deeded-land 18-hole golf communities with zero CDDs and Zone X insurance savings.",
              },
            ].map((comm) => (
              <div
                key={comm.name}
                className="w-[82vw] sm:w-[46vw] lg:w-[calc(33.333%-16px)] shrink-0 snap-start p-6 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#111111] text-[#C8A951] text-[10px] font-bold uppercase tracking-wider">
                      {comm.type}
                    </span>
                    <span className="text-[11px] font-bold text-[#9A7D3A]">{comm.price}</span>
                  </div>
                  <h3 className="font-aiveritas text-2xl text-[#111111] mb-1">{comm.name}</h3>
                  <div className="text-xs text-[#111111]/60 flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#C8A951]" />
                    <span>{comm.area}</span>
                  </div>
                  <p className="text-sm text-[#111111]/75 font-light leading-relaxed mb-5">
                    {comm.highlights}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLeadForm((prev) => ({
                      ...prev,
                      developmentOfInterest: `55+ Interest: ${comm.name}`,
                      message: `Please send availability, HOA/CDD costs, and floor plans for ${comm.name}.`,
                    }));
                    smoothScrollToId("vip-pricing-form");
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-[#9A7D3A] hover:text-[#111111] inline-flex items-center gap-1.5 pt-3 border-t border-[#111111]/10 text-left cursor-pointer"
                >
                  Request {comm.name} Info <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-[#f5f3ef] border border-[#C8A951]/35 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-[#111111]/80">
              <strong className="text-[#111111]">Comparing 55+ Condos vs. Single-Story Villas?</strong>{" "}
              Read our plain-English breakdown of Florida reserve laws and lifestyle trade-offs.
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/knowledge-hub/florida-55-plus-condo-milestone-reserves-vs-villa"
                className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#9A7D3A] underline"
              >
                55+ Condo Reserves vs. Villa →
              </Link>
              <Link
                href="/knowledge-hub/articles/tampa-bay-55-plus-relocation-corridor-comparison"
                className="text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#9A7D3A] underline"
              >
                Wesley Chapel vs. South Shore vs. Clearwater →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIET LEGAL NOTICE BAR & POP-UP TRIGGER ── */}
      <section className="py-6 px-6 md:px-12 bg-[#fbfbf9] border-t border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#111111]/65">
          <p className="leading-relaxed">
            <span className="text-[#9A7D3A] font-bold mr-1">*</span>
            Independent buyer, commercial, and leasing representation by Davis &amp; Garnett (Align Right Realty Carrollwood · #BK3401606). Pricing and availability are subject to change without notice.
          </p>
          <button
            type="button"
            onClick={() => setLegalModalOpen(true)}
            className="text-xs font-bold uppercase tracking-wider text-[#9A7D3A] hover:text-[#111111] underline underline-offset-4 shrink-0 self-start sm:self-auto cursor-pointer transition-colors"
          >
            Legal Disclosure &amp; Sources*
          </button>
        </div>
      </section>

      {/* ── LEGAL DISCLOSURE & OFFICIAL SOURCES POP-UP MODAL ── */}
      {legalModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLegalModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div
            className="bg-white rounded-3xl border border-[#C8A951]/40 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#111111] text-white px-6 py-5 flex items-center justify-between border-b border-[#C8A951]/30">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A951] font-bold block mb-1">
                  * Regulatory Notice &amp; Attribution
                </span>
                <h3 id="legal-modal-title" className="font-aiveritas text-xl sm:text-2xl text-white">
                  Legal Disclosure &amp; Official Sources
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#C8A951] text-white hover:text-[#111111] transition-colors cursor-pointer"
                aria-label="Close legal disclosure"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#111111]/80 leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#f5f3ef] border border-[#111111]/10 space-y-3 text-xs sm:text-sm">
                <p>
                  <strong className="text-[#111111] font-semibold">Independent Agency Notice:</strong> Davis &amp; Garnett (Mark Davis, FL Lic. #3209459, and Rachael Garnett, FL Lic. #3378601, brokered by Align Right Realty Carrollwood, Lic. #BK3401606) is an independent licensed real estate team representing prospective buyers, sellers, commercial tenants, assignees, and investors.
                </p>
                <p>
                  Unless explicitly noted on an active listing, Davis &amp; Garnett is not the exclusive developer sales agency, project sponsor, or affiliate of any private builder, master developer, hospitality brand, or district listed on this hub. Trademarks, project names, and marks belong to their respective owners and appear strictly for editorial evaluation and consumer identification. Pricing, floor plans, HOA/CDD budgets, and timelines remain subject to change and independent verification prior to contract.
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#9A7D3A] mb-3">
                  Referenced Developer &amp; Master District Portals
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {DEVELOPMENTS.flatMap((d) =>
                    (d.officialSources || []).map((src) => (
                      <a
                        key={`modal-${d.slug}-${src.url}`}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-xl bg-[#fbfbf9] hover:bg-[#111111] border border-[#111111]/10 hover:border-[#C8A951] transition-colors flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <span className="block font-bold text-[#111111] group-hover:text-white truncate transition-colors">
                            {d.name}
                          </span>
                          <span className="block text-[11px] text-[#9A7D3A] group-hover:text-[#C8A951] truncate transition-colors">
                            {src.url.replace(/^https?:\/\/(www\.)?/, "")}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#9A7D3A] group-hover:text-[#C8A951] shrink-0 transition-colors" />
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#f5f3ef] border-t border-[#111111]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                className="px-6 py-2.5 rounded-lg bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <SiteFooter />
    </div>
  );
}

/* ── REGION SHOWCASE: AREA PHOTO PANEL + SINGLE-COLUMN CARD SLIDER ── */
function RegionalShowcaseSection({
  id,
  bgClass,
  cardBgClass,
  icon: Icon,
  eyebrow,
  title,
  description,
  areaImage,
  areaImageAlt,
  areaCaption,
  residentialHighlight,
  commercialHighlight,
  developments,
}: {
  id: string;
  bgClass: string;
  cardBgClass: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  areaImage: string;
  areaImageAlt: string;
  areaCaption: string;
  residentialHighlight: string;
  commercialHighlight: string;
  developments: Development[];
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const dragStateRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, dragged: false });

  const slideByOne = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    el.scrollBy({
      left: dir === "left" ? -el.clientWidth : el.clientWidth,
      behavior: "smooth",
    });
  };

  const jumpToSlide = (idx: number) => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    el.scrollTo({
      left: idx * el.clientWidth,
      behavior: "smooth",
    });
  };

  const handleSliderScroll = () => {
    const el = sliderRef.current;
    if (!el || !el.clientWidth) return;
    setActiveSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = sliderRef.current;
    if (!el) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      dragged: false,
    };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = sliderRef.current;
    const st = dragStateRef.current;
    if (!el || !st.isDown) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - st.startX) * 1.25;
    if (Math.abs(walk) > 6) st.dragged = true;
    el.scrollLeft = st.scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    const el = sliderRef.current;
    const st = dragStateRef.current;
    if (!st.isDown) return;
    st.isDown = false;
    if (el && el.clientWidth && st.dragged) {
      const snappedIdx = Math.round(el.scrollLeft / el.clientWidth);
      el.scrollTo({ left: snappedIdx * el.clientWidth, behavior: "smooth" });
    }
    setTimeout(() => {
      dragStateRef.current.dragged = false;
    }, 60);
  };

  return (
    <section id={id} className={`py-12 md:py-16 px-6 md:px-12 ${bgClass} border-b border-[#111111]/10 scroll-mt-24`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-6 max-w-3xl">
          <div className="flex items-center gap-2 text-[#9A7D3A] text-xs uppercase tracking-[0.22em] font-bold mb-1.5">
            <Icon className="w-4 h-4 text-[#C8A951]" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="font-aiveritas text-2xl sm:text-3xl md:text-4xl text-[#111111] leading-tight">
            {title}
          </h2>
          <p className="text-[#111111]/70 font-light text-sm md:text-base mt-1.5">
            {description}
          </p>
        </div>

        {/* Column 1 (Larger Area Showcase) + Column 2 (Compact Swipeable Card Slider) */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            <div className="relative aspect-[16/9] min-h-[210px] sm:min-h-[260px] lg:min-h-[300px] rounded-2xl overflow-hidden border border-[#111111]/10 shadow-md">
              <Image
                src={areaImage}
                alt={areaImageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 96vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#C8A951] text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  Commercial &amp; Residential
                </span>
                <p className="font-aiveritas text-xl md:text-2xl text-white leading-snug">
                  {areaCaption}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3.5">
              <div className={`p-3.5 rounded-xl ${cardBgClass} border border-[#111111]/10`}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7D3A] block mb-1">
                  Residential Highlight
                </span>
                <p className="text-xs sm:text-sm text-[#111111]/80 font-light leading-relaxed">{residentialHighlight}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] text-white border border-[#C8A951]/40">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8A951] block mb-1">
                  Commercial &amp; Mixed-Use Highlight
                </span>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">{commercialHighlight}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 min-w-0 flex flex-col">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUpOrLeave}
              onMouseLeave={onMouseUpOrLeave}
              onClickCapture={(e) => {
                if (dragStateRef.current.dragged) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="flex overflow-x-auto pb-1.5 snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing select-none scrollbar-thin"
              style={{ scrollbarWidth: "none" }}
            >
              {developments.map((dev) => (
                <div key={dev.slug} className="w-full shrink-0 snap-start">
                  <DevelopmentRegionSliderCard dev={dev} singleColumn />
                </div>
              ))}
            </div>

            {/* Single compact control bar right under the card (visible on mobile & desktop) */}
            <div className="flex items-center justify-between gap-3 pt-2.5 px-1">
              <button
                type="button"
                onClick={() => slideByOne("left")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-sm hover:bg-[#111] hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider transition-all"
                aria-label={`Previous in ${title}`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="sm:hidden">Prev</span>
              </button>

              {developments.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {developments.map((dev, i) => (
                    <button
                      key={dev.slug}
                      type="button"
                      onClick={() => jumpToSlide(i)}
                      aria-label={`View ${dev.name}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeSlide ? "w-5 bg-[#C8A951]" : "w-1.5 bg-[#111111]/20 hover:bg-[#111111]/50"
                      }`}
                    />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => slideByOne("right")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#D4AF37] text-[#111] border border-[#9A7D3A]/50 shadow-sm hover:bg-[#111] hover:text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider transition-all"
                aria-label={`Next in ${title}`}
              >
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── UNIFIED SLIDER CARD (COMPACT SINGLE-COLUMN REGION OR 55+ CAROUSEL) ── */
function DevelopmentRegionSliderCard({
  dev,
  singleColumn = false,
}: {
  dev: Development;
  singleColumn?: boolean;
}) {
  return (
    <div className="group h-full bg-white border border-[#111111]/10 hover:border-[#C8A951] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <Link
          href={`/developments/${dev.slug}`}
          className={`block relative ${singleColumn ? "h-40 sm:h-44" : "h-56"} w-full overflow-hidden`}
        >
          <DevelopmentImageSlider
            images={dev.gallery}
            alt={dev.name}
            interactive={false}
            sizes={singleColumn ? "(min-width: 1024px) 38vw, 94vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 84vw"}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
            <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#111111] text-[9px] uppercase tracking-[0.14em] font-bold shadow">
              {dev.trendingKind || dev.neighborhoodOrSubmarket}
            </span>
            {dev.isMixedUseCommercialResidential && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#C8A951] text-[#111111] text-[9px] uppercase tracking-[0.14em] font-bold shadow">
                Commercial + Residential
              </span>
            )}
          </div>
          <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between gap-2 text-white pointer-events-none">
            <div className="min-w-0">
              <span className="text-[9px] uppercase tracking-[0.18em] text-[#C8A951] font-bold block truncate">
                {dev.delivery}
              </span>
              <h3 className={`font-aiveritas ${singleColumn ? "text-xl" : "text-2xl"} text-white group-hover:text-[#C8A951] transition-colors truncate`}>
                {dev.name}
              </h3>
            </div>
            <span className="font-aiveritas text-sm sm:text-base text-[#C8A951] font-bold shrink-0">
              {dev.priceRange}
            </span>
          </div>
        </Link>

        <div className={singleColumn ? "p-4" : "p-6"}>
          <p className={`text-[11px] text-[#111111]/60 flex items-center gap-1.5 ${singleColumn ? "mb-2" : "mb-3"}`}>
            <MapPin className="w-3.5 h-3.5 text-[#C8A951] shrink-0" />
            <span className="truncate">{dev.location}</span>
          </p>

          <p className={`text-sm text-[#111111]/75 font-light leading-relaxed ${singleColumn ? "mb-3 line-clamp-2" : "mb-4 line-clamp-3"}`}>
            {dev.summary}
          </p>

          <div className={`flex flex-wrap gap-1.5 ${singleColumn ? "mb-2.5" : "mb-4"}`}>
            {dev.builders.slice(0, singleColumn ? 2 : 3).map((builder) => (
              <span
                key={builder}
                className="px-2 py-0.5 rounded-md bg-[#f5f3ef] border border-[#111111]/10 text-[10px] font-semibold text-[#111111]/80"
              >
                {builder}
              </span>
            ))}
            {dev.builders.length > (singleColumn ? 2 : 3) && (
              <span className="px-2 py-0.5 rounded-md bg-[#f5f3ef] text-[10px] font-semibold text-[#9A7D3A]">
                +{dev.builders.length - (singleColumn ? 2 : 3)} more
              </span>
            )}
          </div>

          <div className="space-y-1 pt-2.5 border-t border-[#111111]/10">
            {dev.highlights.slice(0, singleColumn ? 1 : 2).map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#111111]/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9A7D3A] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${singleColumn ? "px-4 pb-4 pt-1" : "px-6 pb-6 pt-2"} flex items-center justify-between gap-2`}>
        <Link
          href={`/developments/${dev.slug}`}
          className={`flex-1 inline-flex items-center justify-center gap-2 ${singleColumn ? "py-2.5" : "py-3"} px-4 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-[11px] uppercase tracking-[0.18em] font-bold rounded-xl transition-colors`}
        >
          View Guide <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        {dev.officialWebsiteUrl && (
          <a
            href={dev.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center ${singleColumn ? "p-2.5" : "p-3"} bg-[#f5f3ef] hover:bg-white border border-[#111111]/15 hover:border-[#C8A951] text-[#111111] rounded-xl transition-colors`}
            aria-label={`Official site for ${dev.name}`}
          >
            <Globe className="w-4 h-4 text-[#C8A951]" />
          </a>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search, ArrowUpRight, Phone } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import ConsultationModal from "@/components/ConsultationModal";

interface NavDropdownItem {
  label: string;
  desc: string;
  href: string;
}

interface NavGroup {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Why Us?",
    href: "/about/our-every-listing-approach",
    dropdown: [
      { label: "Our Every Listing Approach", desc: "Our why, full checklist & how we take care of every property we list", href: "/about/our-every-listing-approach" },
      { label: "About The Davis & Garnett Team", desc: "Local knowledge, honest advice & a team working together for you", href: "/about" },
      { label: "Meet Mark Davis, REALTOR®", desc: "Certified Commercial & Residential Agent • FL Lic #3209459", href: "/about/mark-davis" },
      { label: "Meet Rachael Garnett, REALTOR®", desc: "Certified Commercial & Residential Agent • FL Lic #3378601", href: "/about/rachael-garnett" },
      { label: "Align Right Realty Carrollwood", desc: "Our Carrollwood office, local support & coverage area (#BK3401606)", href: "/about/align-right-realty-carrollwood" },
      { label: "Meet Our Strategic Partners", desc: "Trusted local lenders, title companies, inspectors & home pros", href: "/about/strategic-partners" },
      { label: "Community Outreach & Causes", desc: "How we give back to local Tampa Bay church & youth programs", href: "/about/community-outreach-giving" },
      { label: "Contact Us", desc: "Call, text, or email Mark & Rachael or visit our Carrollwood office", href: "/contact" },
    ],
  },
  {
    label: "Portfolio",
    href: "/properties",
    dropdown: [
      { label: "All Active & Sold Properties", desc: "Browse our active listings & recent closings across Tampa Bay", href: "/properties" },
      { label: "6100 Bahama Shores Dr S", desc: "St. Petersburg Waterfront Custom Estate • $4,553,900", href: "/listings/6100-bahama-shores-dr-s-st-petersburg" },
      { label: "126 Ridgewood Ave Mixed-Use", desc: "Brandon 2-Building Commercial & Residential • $845,000", href: "/listings/126-ridgewood-ave-brandon" },
      { label: "770 Old Stokes Rd (79.54 Acres)", desc: "Frostproof Prime Central FL Acreage • $3,550,000", href: "/listings/770-old-stokes-rd-frostproof" },
      { label: "NE 90th Street Rd (19.72 Acres)", desc: "Fort McCoy Agricultural Timberland • $350,000", href: "/listings/ne-90th-street-rd-fort-mccoy" },
      { label: "2026 Sold Track Record", desc: "Recent residential, waterfront, commercial & land closings", href: "/properties?status=Sold" },
    ],
  },
  {
    label: "Developments",
    href: "/developments",
    dropdown: [
      { label: "All Featured Developments", desc: "Downtown Tampa condo towers & North Tampa new home communities", href: "/developments" },
      { label: "Pendry Residences Tampa", desc: "38-story luxury Riverwalk hotel & branded residences", href: "/developments/pendry-residences-tampa" },
      { label: "The Ritz-Carlton Residences", desc: "Iconic Bayshore Boulevard waterfront condominium towers", href: "/developments/the-ritz-carlton-residences-bayshore" },
      { label: "Water Street Tampa Phase 2", desc: "Downtown Tampa walkable residences, dining & waterfront living", href: "/developments/water-street-tampa-phase-2" },
      { label: "Two Rivers (Wesley Chapel)", desc: "3,400-acre community with new homes, trails & resort clubs", href: "/developments/two-rivers-wesley-chapel" },
      { label: "Angeline (Land O' Lakes)", desc: "6,200-acre community with new homes, trails & Moffitt Speros FL", href: "/developments/angeline-land-o-lakes" },
      { label: "Epperson & Mirada Lagoons", desc: "Crystal Lagoon resort communities in Wesley Chapel", href: "/developments/epperson-mirada-lagoon-wesley-chapel" },
      { label: "ONE Tampa", desc: "42-story Riverwalk residential tower in Downtown Tampa", href: "/developments/one-tampa-riverwalk" },
      { label: "Sunrise Hills (Brooksville)", desc: "1,100-acre Metro Lagoon community in Hernando County", href: "/developments/sunrise-hills-brooksville" },
    ],
  },
  {
    label: "Knowledge Hub",
    href: "/knowledge-hub",
    dropdown: [
      { label: "Real Estate Knowledge Simplified", desc: "Buyer & seller guides, common questions, neighborhoods & market updates", href: "/knowledge-hub" },
      { label: "Buyer & Seller Step-by-Step Guides", desc: "Simple guides for buying, selling, commercial property & HOA/CDD fees", href: "/knowledge-hub#guides" },
      { label: "Common Real Estate Questions", desc: "Plain-English answers to top Florida buying, selling & tax questions", href: "/knowledge-hub#questions" },
      { label: "Areas We Work In", desc: "St. Pete, Downtown Tampa, Wesley Chapel, Land O' Lakes & Brandon", href: "/knowledge-hub#areas" },
      { label: "Local Events & Open Houses", desc: "Upcoming community tours, buyer workshops & charity events", href: "/knowledge-hub#events" },
      { label: "Tampa Bay Market Updates", desc: "Easy-to-read local market updates & neighborhood trends", href: "/knowledge-hub#articles" },
    ],
  },
];

export default function ProposalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1680px] mx-auto px-6 xl:px-10 h-20 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-4 hover:opacity-85 transition-opacity shrink-0">
            <DavisGarnettLogo variant="dark" className="w-40 xl:w-44 max-w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-9 2xl:gap-11 shrink-0">
            <Link
              href="/"
              className="text-xs 2xl:text-[13px] font-bold tracking-[0.16em] uppercase text-white/85 hover:text-[#D4AF37] transition-colors py-6 whitespace-nowrap shrink-0"
            >
              Home
            </Link>

            {NAV_GROUPS.map((group) => (
              <div
                key={group.label}
                className="relative group shrink-0"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={group.href}
                  className="flex items-center gap-1.5 text-xs 2xl:text-[13px] font-bold tracking-[0.16em] uppercase text-white/85 hover:text-[#D4AF37] transition-colors py-6 whitespace-nowrap"
                >
                  <span>{group.label}</span>
                  {group.dropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                  )}
                </Link>

                {group.dropdown && activeDropdown === group.label && (
                  <div className="absolute top-full left-0 w-[390px] bg-white text-[#111] rounded-xl shadow-2xl border border-[#111]/10 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="h-1 w-full bg-gradient-to-r from-[#9A7D3A] via-[#D4AF37] to-[#9A7D3A] rounded-t-lg mb-2" />
                    <div className="flex flex-col divide-y divide-[#111]/5">
                      {group.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/item p-3 rounded-lg hover:bg-[#f5f3ef] transition-colors flex items-start justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-[#111] group-hover/item:text-[#9A7D3A] transition-colors">
                              {item.label}
                            </div>
                            <p className="text-[11px] text-[#111]/60 font-light mt-0.5 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity mt-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-6 2xl:gap-7 shrink-0">
              <Link
                href="/search-mls"
                className="flex items-center gap-1.5 text-xs 2xl:text-[13px] font-bold tracking-[0.16em] uppercase text-[#D4AF37] hover:text-white transition-colors py-2.5 px-4 border border-[#D4AF37]/40 rounded-lg bg-[#D4AF37]/10 whitespace-nowrap shrink-0"
              >
                <Search className="w-3.5 h-3.5 shrink-0" />
                <span>Search MLS</span>
              </Link>

              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs 2xl:text-[13px] font-bold uppercase tracking-[0.16em] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Need Advice?
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="xl:hidden absolute top-20 left-0 w-full bg-[#050505]/98 backdrop-blur-3xl border-b border-[#D4AF37]/20 p-6 flex flex-col gap-5 shadow-2xl h-[calc(100vh-5rem)] overflow-y-auto pb-28">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-white hover:text-[#D4AF37] border-b border-white/10 pb-3"
            >
              Home
            </Link>

            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="border-b border-white/10 pb-4">
                <Link
                  href={group.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-serif text-[#D4AF37] mb-2"
                >
                  {group.label}
                </Link>
                {group.dropdown && (
                  <div className="pl-3 flex flex-col gap-2.5 border-l border-[#D4AF37]/30">
                    {group.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-white/75 hover:text-white py-0.5 block"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/search-mls"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 border border-[#D4AF37] text-[#D4AF37] text-center text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Search Tampa Bay MLS
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setModalOpen(true);
                }}
                className="w-full py-3.5 bg-[#D4AF37] text-[#111] text-center text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                Need Advice?
              </button>
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-white/70">
                <a href="tel:941-737-4127" className="flex items-center justify-center gap-1.5 py-2.5 bg-white/5 rounded-lg">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Mark: 941-737-4127
                </a>
                <a href="tel:727-808-3344" className="flex items-center justify-center gap-1.5 py-2.5 bg-white/5 rounded-lg">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Rachael: 727-808-3344
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

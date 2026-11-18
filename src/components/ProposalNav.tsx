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
    label: "Your Realtors",
    href: "/about",
    dropdown: [
      { label: "Commercial Realtor Team", desc: "Owner-user SBA 504, NNN retail, 1031 exchanges, BPO valuations & Florida land", href: "/commercial" },
      { label: "Residential Realtor Team", desc: "Homes, waterfront docks, 55+ clubs, downtown condos & neighborhood guides", href: "/residential" },
    ],
  },
  {
    label: "Why Us?",
    href: "/about/our-every-listing-approach",
    dropdown: [
      { label: "Our Every Listing Approach", desc: "Our why, full checklist & how we take care of every property we list", href: "/about/our-every-listing-approach" },
      { label: "About The Davis & Garnett Team", desc: "Local knowledge, honest advice & a team working together for you", href: "/about" },
      { label: "Meet Mark Davis, REALTOR®", desc: "Certified Commercial & Residential Agent • FL Lic BK3209459", href: "/about/mark-davis" },
      { label: "Meet Rachael Garnett, REALTOR®", desc: "Certified Commercial & Residential Agent • FL Lic SL3378601", href: "/about/rachael-garnett" },
      { label: "Align Right Realty Carrollwood", desc: "Our Carrollwood office, local support & coverage area (BK3401606)", href: "/about/align-right-realty-carrollwood" },
      { label: "Meet Our Strategic Partners", desc: "Trusted local lenders, title companies, inspectors & home pros", href: "/about/strategic-partners" },
      { label: "Community Outreach & Causes", desc: "How we give back to local Tampa Bay church & youth programs", href: "/about/community-outreach-giving" },
      { label: "Contact Us", desc: "Call, text, or email Mark & Rachael or visit our Carrollwood office", href: "/contact" },
    ],
  },
  {
    label: "Portfolio Hub",
    href: "/properties",
    dropdown: [
      { label: "Davis & Garnett Portfolio Hub", desc: "Explore active offerings, branch listings & category hubs across Tampa Bay", href: "/properties" },
      { label: "Residential Realtor Team", desc: "Homes, waterfront docks, 55+ villas, condos & move planning", href: "/residential" },
      { label: "Commercial Realtor Team", desc: "SBA 504, NNN leases, 1031 exchanges, BPOs & Central Florida land", href: "/commercial" },
      { label: "Featured Exclusive Listings", desc: "Highlighted residential, waterfront, commercial & land opportunities", href: "/properties#featured" },
      { label: "New & Upcoming Listings", desc: "Newest team releases plus upcoming live IDX & Lofty feed areas", href: "/properties#new-listings" },
      { label: "Align Right Carrollwood Office", desc: "Active listings from our Align Right Realty Carrollwood brokerage", href: "/properties#carrollwood-office" },
      { label: "Commercial, Mixed-Use & Land", desc: "Custom commercial buildings, NNN assets & Central Florida acreage", href: "/properties#commercial-land" },
      { label: "Commercial Broker Price Opinions (BPO)", desc: "Fast market value reports for owners, attorneys, lenders & 1031 trades", href: "/services/commercial-bpo" },
      { label: "Commercial Real Estate Mentoring", desc: "Deal-by-deal NNN, SBA 504, zoning & underwriting coaching with Mark & Rachael", href: "/services/commercial-mentoring" },
      { label: "2026–2027 Sold Track Record", desc: "Recent residential, waterfront, commercial & land closings", href: "/properties#sold-track-record" },
    ],
  },
  {
    label: "Trending Hub",
    href: "/developments",
    dropdown: [
      { label: "All Trending Real Estate", desc: "Neighborhoods, commercial corridors, 55+ villages & new builds", href: "/developments" },
      { label: "Tampa Bay & Hillsborough", desc: "Downtown, Bayshore, Westshore, Brandon & SouthShore", href: "/developments#downtown-towers" },
      { label: "Pinellas County & Beaches", desc: "St. Petersburg, Bahama Shores, Clearwater & Dunedin", href: "/developments#st-pete-region" },
      { label: "North Tampa, Pasco & Hernando", desc: "Wesley Chapel, Land O' Lakes, Trinity & Tarpon Springs", href: "/developments#north-tampa-communities" },
      { label: "Bradenton, Sarasota & Venice", desc: "Lakewood Ranch, The Quay, Venice & Wellen Park", href: "/developments#sarasota-manatee-communities" },
      { label: "Central FL, Plant City & Polk", desc: "Lakeland lakes, I-4 industrial & Polk/Marion land", href: "/developments#lakeland-polk-region" },
      { label: "Align Right Carrollwood Corridor", desc: "Our brokerage backyard: lakes, Odessa, Cheval & Citrus Park", href: "/developments#carrollwood-region" },
      { label: "55+ Active-Adult Communities", desc: "Compare zero-CDD golf clubs vs. brand-new 55+ clubhouses", href: "/developments#55-plus" },
      { label: "Why Work With Your Own Agent?", desc: "Commercial, residential & leasing guidance at $0 buyer cost", href: "/developments#new-construction-guide" },
    ],
  },
  {
    label: "Knowledge Hub",
    href: "/knowledge-hub",
    dropdown: [
      { label: "Real Estate Knowledge Simplified", desc: "Buyer & seller guides, common questions, neighborhoods & market updates", href: "/knowledge-hub" },
      { label: "Residential Get Started Worksheet", desc: "Plan your Tampa Bay move online & download our printable guide PDF", href: "/residential/get-started" },
      { label: "Commercial Get Started Worksheet", desc: "Outline SBA 504, NNN cap rates, land & 1031 goals + PDF worksheet", href: "/commercial/get-started" },
      { label: "Buyer & Seller Step-by-Step Guides", desc: "Commercial & residential guides for buying, selling & HOA/CDD fees", href: "/knowledge-hub#guides" },
      { label: "Guided Neighborhood & Commercial Tours", desc: "Full-day residential neighborhood, commercial corridor & landmark routes (#GuidedByDG)", href: "/tours" },
      { label: "Common Real Estate Questions", desc: "Plain-English answers to top Florida buying, selling & tax questions", href: "/knowledge-hub#questions" },
      { label: "Areas We Work In", desc: "St. Pete, Downtown Tampa, Wesley Chapel, Land O' Lakes & Brandon", href: "/knowledge-hub#areas" },
      { label: "Local Events & Open Houses", desc: "Upcoming community tours, buyer workshops & charity events", href: "/knowledge-hub#events" },
      { label: "Tampa Bay Market Updates", desc: "Easy-to-read local market updates & neighborhood trends", href: "/knowledge-hub#articles" },
      { label: "Calculators & Planning Tools", desc: "Cap Rate, IRS 1031 Deadline & Seller Net Proceeds calculators", href: "/knowledge-hub#tools" },
      { label: "Florida Real Estate Glossary", desc: "Plain-English definitions of CDDs, HOAs, 4-Point & Wind Mitigation", href: "/glossary" },
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
        <div className="max-w-[1680px] mx-auto px-5 xl:px-8 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center hover:opacity-85 transition-opacity shrink-0">
            <DavisGarnettLogo variant="dark" className="w-36 xl:w-40 max-w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-7 shrink-0">
            <Link
              href="/"
              className="text-xs 2xl:text-[13px] font-bold tracking-[0.14em] uppercase text-white/85 hover:text-[#D4AF37] transition-colors py-6 whitespace-nowrap shrink-0"
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
                  className="flex items-center gap-1 text-xs 2xl:text-[13px] font-bold tracking-[0.14em] uppercase text-white/85 hover:text-[#D4AF37] transition-colors py-6 whitespace-nowrap"
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

            <div className="flex items-center gap-3 2xl:gap-4 shrink-0">
              <Link
                href="/search-mls"
                className="flex items-center gap-1.5 text-xs 2xl:text-[13px] font-bold tracking-[0.14em] uppercase text-[#D4AF37] hover:text-white transition-colors py-2.5 px-3.5 border border-[#D4AF37]/40 rounded-lg bg-[#D4AF37]/10 whitespace-nowrap shrink-0"
              >
                <Search className="w-3.5 h-3.5 shrink-0" />
                <span>Search MLS</span>
              </Link>

              <button
                onClick={() => setModalOpen(true)}
                className="px-3.5 py-2.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs 2xl:text-[13px] font-bold uppercase tracking-[0.14em] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Need Advice?
              </button>
            </div>
          </div>

          {/* Upper-Right Align Right Brokerage Dual Brand + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/about/align-right-realty-carrollwood"
              className="hidden sm:flex items-center pl-3 xl:border-l xl:border-white/15 hover:opacity-85 transition-opacity shrink-0"
              title="Align Right Realty Carrollwood — Broker BK3401606"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/align-right-email-logo.png"
                alt="Align Right Realty Carrollwood"
                className="h-9 xl:h-10 w-auto object-contain"
              />
            </Link>

            <button
              className="xl:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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

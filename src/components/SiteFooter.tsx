"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function SiteFooter() {
  return (
    <footer className="relative py-24 px-8 bg-[#0c0b09] text-white border-t border-[#D4AF37]/25 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* Top Brand & Principal Advisor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-10 pb-16 mb-16 border-b border-white/10 items-center">
          <div>
            <div className="w-56 h-16 relative mb-6">
              <DavisGarnettLogo variant="dark" className="w-full h-full object-contain" />
            </div>
            <p className="text-white/65 font-light text-sm leading-relaxed max-w-md mb-6">
              Tampa Bay&apos;s unified commercial &amp; luxury residential real estate advisory group. Institutional-grade underwriting meets white-glove private representation.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Align Right Realty Carrollwood • License #BK3401606 • Greater Tampa Bay, FL</span>
            </div>
          </div>

          {/* Mark Davis Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-aiveritas text-xl text-white">Mark Davis</h4>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                  Commercial &amp; Residential Advisor • FL Lic #3209459
                </span>
              </div>
              <Link
                href="/about/mark-davis"
                className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="Mark Davis Profile"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-1.5 text-xs text-white/70">
              <a href="tel:8134869072" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> 813-486-9072
              </a>
              <a href="mailto:mark@davisgarnettsells.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> mark@davisgarnettsells.com
              </a>
            </div>
          </div>

          {/* Rachael Garnett Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-aiveritas text-xl text-white">Rachael Garnett</h4>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                  Commercial &amp; Residential Advisor • FL Lic #3378601
                </span>
              </div>
              <Link
                href="/about/rachael-garnett"
                className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors"
                aria-label="Rachael Garnett Profile"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-1.5 text-xs text-white/70">
              <a href="tel:7272540244" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> 727-254-0244
              </a>
              <a href="mailto:rachael@davisgarnettsells.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> rachael@davisgarnettsells.com
              </a>
            </div>
          </div>
        </div>

        {/* 5-Column Master Hub Sitemap Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-16 mb-16 border-b border-white/10">
          {/* Col 1: Portfolio Hub */}
          <div>
            <Link href="/properties" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-4 hover:text-white transition-colors">
              Portfolio Hub
            </Link>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/properties" className="hover:text-white transition-colors">All Active &amp; Sold Listings</Link></li>
              <li><Link href="/listings/6100-bahama-shores-dr-s-st-petersburg" className="hover:text-white transition-colors">6100 Bahama Shores Dr S</Link></li>
              <li><Link href="/listings/126-ridgewood-ave-brandon" className="hover:text-white transition-colors">126 Ridgewood Ave Mixed-Use</Link></li>
              <li><Link href="/listings/770-old-stokes-rd-frostproof" className="hover:text-white transition-colors">770 Old Stokes Rd (79.54 Ac)</Link></li>
              <li><Link href="/listings/ne-90th-street-rd-fort-mccoy" className="hover:text-white transition-colors">NE 90th Street Rd (19.72 Ac)</Link></li>
              <li><Link href="/properties?status=Sold" className="hover:text-white transition-colors">2026 Sold Track Record</Link></li>
            </ul>
          </div>

          {/* Col 2: Developments Hub */}
          <div>
            <Link href="/developments" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-4 hover:text-white transition-colors">
              Developments
            </Link>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/developments" className="hover:text-white transition-colors">All Featured Developments</Link></li>
              <li><Link href="/developments/pendry-residences-tampa" className="hover:text-white transition-colors">Pendry Residences Tampa</Link></li>
              <li><Link href="/developments/the-ritz-carlton-residences-bayshore" className="hover:text-white transition-colors">Ritz-Carlton Residences</Link></li>
              <li><Link href="/developments/water-street-tampa-phase-2" className="hover:text-white transition-colors">Water Street Phase 2</Link></li>
              <li><Link href="/developments/two-rivers-wesley-chapel" className="hover:text-white transition-colors">Two Rivers (Wesley Chapel)</Link></li>
              <li><Link href="/developments/angeline-land-o-lakes" className="hover:text-white transition-colors">Angeline (Land O&apos; Lakes)</Link></li>
              <li><Link href="/developments/epperson-mirada-lagoon-wesley-chapel" className="hover:text-white transition-colors">Epperson &amp; Mirada Lagoons</Link></li>
            </ul>
          </div>

          {/* Col 3: Knowledge Hub */}
          <div>
            <Link href="/knowledge-hub" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-4 hover:text-white transition-colors">
              Knowledge Hub
            </Link>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/knowledge-hub" className="hover:text-white transition-colors">Real Estate Knowledge Simplified</Link></li>
              <li><Link href="/knowledge-hub/tampa-bay-luxury-home-buying-guide" className="hover:text-white transition-colors">Luxury Home Buyer&apos;s Playbook</Link></li>
              <li><Link href="/knowledge-hub/selling-your-home-in-tampa-bay" className="hover:text-white transition-colors">Seller Valuation Strategy</Link></li>
              <li><Link href="/knowledge-hub/commercial-real-estate-investing-florida" className="hover:text-white transition-colors">Commercial Investing Guide</Link></li>
              <li><Link href="/knowledge-hub/what-is-the-difference-between-hoa-and-cdd-in-tampa-bay" className="hover:text-white transition-colors">HOA vs. CDD Fees in Tampa</Link></li>
              <li><Link href="/knowledge-hub/can-i-buy-a-house-in-florida-while-selling-my-current-one" className="hover:text-white transition-colors">Buying While Selling in FL</Link></li>
            </ul>
          </div>

          {/* Col 4: Areas We Serve */}
          <div>
            <Link href="/knowledge-hub#areas" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-4 hover:text-white transition-colors">
              Areas We Work In
            </Link>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/knowledge-hub/areas/st-petersburg" className="hover:text-white transition-colors">St. Petersburg &amp; Beaches</Link></li>
              <li><Link href="/knowledge-hub/areas/tampa-downtown-water-street" className="hover:text-white transition-colors">Downtown Tampa &amp; Bayshore</Link></li>
              <li><Link href="/knowledge-hub/areas/wesley-chapel" className="hover:text-white transition-colors">Wesley Chapel Growth Hub</Link></li>
              <li><Link href="/knowledge-hub/areas/land-o-lakes" className="hover:text-white transition-colors">Land O&apos; Lakes Corridor</Link></li>
              <li><Link href="/knowledge-hub/areas/brandon-riverview" className="hover:text-white transition-colors">Brandon &amp; East Hillsborough</Link></li>
              <li><Link href="/knowledge-hub/areas/central-florida-acreage" className="hover:text-white transition-colors">Central FL Acreage &amp; Land</Link></li>
            </ul>
          </div>

          {/* Col 5: About & Search MLS */}
          <div>
            <Link href="/about" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-4 hover:text-white transition-colors">
              About &amp; Resources
            </Link>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Davis &amp; Garnett</Link></li>
              <li><Link href="/about/mark-davis" className="hover:text-white transition-colors">Mark Davis Profile</Link></li>
              <li><Link href="/about/rachael-garnett" className="hover:text-white transition-colors">Rachael Garnett Profile</Link></li>
              <li><Link href="/about/align-right-realty-carrollwood" className="hover:text-white transition-colors">Align Right Carrollwood</Link></li>
              <li><Link href="/about/strategic-partners" className="hover:text-white transition-colors">Meet Our Strategic Partners</Link></li>
              <li><Link href="/about/community-outreach-giving" className="hover:text-white transition-colors">Our Causes &amp; Community</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us &amp; Office</Link></li>
              <li><Link href="/search-mls" className="text-[#D4AF37] hover:text-white transition-colors font-bold">Search Full Tampa Bay MLS →</Link></li>
            </ul>
          </div>
        </div>

        {/* Brokerage Logo & Compliance */}
        <div className="flex flex-col items-center text-center">
          <div className="w-52 h-14 relative opacity-75 mb-8">
            <Image src="/align-right-email-logo.png" alt="Align Right Realty Carrollwood" fill className="object-contain invert" />
          </div>
          <p className="text-[0.65rem] uppercase tracking-widest text-white/30 max-w-4xl leading-relaxed mb-6">
            Davis &amp; Garnett is a commercial and residential real estate advisory group brokered by Align Right Realty Carrollwood (License #BK3401606). Mark Davis (FL License #3209459) &amp; Rachael Garnett (FL License #3378601). All properties are subject to prior sale, change, or withdrawal. Neither listing broker(s) nor Davis &amp; Garnett shall be responsible for any typographical errors, misinformation, or misprints and shall be held totally harmless. Equal Housing Opportunity.
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between text-[0.65rem] uppercase tracking-widest text-white/35 pt-6 border-t border-white/10">
            <p>© {new Date().getFullYear()} Davis &amp; Garnett Real Estate Advisory. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-[#D4AF37] transition-colors">About</Link>
              <Link href="/properties" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link>
              <Link href="/developments" className="hover:text-[#D4AF37] transition-colors">Developments</Link>
              <Link href="/knowledge-hub" className="hover:text-[#D4AF37] transition-colors">Knowledge Hub</Link>
              <Link href="/search-mls" className="hover:text-[#D4AF37] transition-colors">Search MLS</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


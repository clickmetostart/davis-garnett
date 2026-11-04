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
            <div className="w-56 h-16 relative mb-5">
              <DavisGarnettLogo variant="dark" className="w-full h-full object-contain" />
            </div>
            <p className="text-white/65 font-light text-xs leading-relaxed max-w-md mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dg-footer-logo-wrap.jpg"
                alt="Davis & Garnett"
                className="float-left w-14 h-14 mr-4 mb-1 rounded-sm object-cover border border-[#D4AF37]/20 shadow-md"
              />
              Operating as elite Commercial &amp; Residential Advisors at Align Right Realty Carrollwood, Mark Davis and Rachael Garnett specialize in luxury residential acquisitions, commercial mixed-use investments, and strategic Florida land.
            </p>
            <a
              href="mailto:list@davisgarnettsells.com"
              className="text-[#D4AF37] hover:text-white transition-colors font-bold tracking-widest uppercase text-[10px] mt-3 block clear-both"
            >
              list@davisgarnettsells.com
            </a>
          </div>

          {/* Mark Davis Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/40 transition-colors flex items-center gap-5">
            <Link href="/about/mark-davis" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mark-davis-gmail-avatar.jpg"
                alt="Mark Davis"
                className="w-20 h-20 rounded-full object-cover object-top border border-[#D4AF37]/30 shadow-lg shadow-black/50 shrink-0"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <Link href="/about/mark-davis" className="font-aiveritas text-xl text-[#D4AF37] hover:text-white transition-colors block">
                    Mark Davis
                  </Link>
                  <span className="text-xs text-white/75 block">
                    Commercial &amp; Residential Advisor
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mt-0.5">
                    Agent License #3209459
                  </span>
                </div>
                <Link
                  href="/about/mark-davis"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors shrink-0"
                  aria-label="Mark Davis Profile"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-1 text-xs mt-2">
                <a href="mailto:mark@davisgarnettsells.com" className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> mark@davisgarnettsells.com
                </a>
                <a href="tel:941-737-4127" className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> 941-737-4127
                </a>
              </div>
            </div>
          </div>

          {/* Rachael Garnett Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/40 transition-colors flex items-center gap-5">
            <Link href="/about/rachael-garnett" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/rachael-garnett-gmail-avatar.jpg"
                alt="Rachael Garnett"
                className="w-20 h-20 rounded-full object-cover object-[center_30%] border border-[#D4AF37]/30 shadow-lg shadow-black/50 shrink-0"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <Link href="/about/rachael-garnett" className="font-aiveritas text-xl text-[#D4AF37] hover:text-white transition-colors block">
                    Rachael Garnett
                  </Link>
                  <span className="text-xs text-white/75 block">
                    Commercial &amp; Residential Advisor
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mt-0.5">
                    Agent License #3378601
                  </span>
                </div>
                <Link
                  href="/about/rachael-garnett"
                  className="p-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black transition-colors shrink-0"
                  aria-label="Rachael Garnett Profile"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-1 text-xs mt-2">
                <a href="mailto:rachael@davisgarnettsells.com" className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> rachael@davisgarnettsells.com
                </a>
                <a href="tel:727-808-3344" className="flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> 727-808-3344
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column Sitemap Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-16 mb-16 border-b border-white/10">
          {/* Col 1: Featured Portfolio */}
          <div>
            <Link href="/properties" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-4 hover:text-white transition-colors">
              Featured Properties
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
              About Us
            </Link>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About The Davis &amp; Garnett Team</Link></li>
              <li><Link href="/about/mark-davis" className="hover:text-white transition-colors">Meet Mark Davis</Link></li>
              <li><Link href="/about/rachael-garnett" className="hover:text-white transition-colors">Meet Rachael Garnett</Link></li>
              <li><Link href="/about/align-right-realty-carrollwood" className="hover:text-white transition-colors">Align Right Carrollwood</Link></li>
              <li><Link href="/about/strategic-partners" className="hover:text-white transition-colors">Meet Our Strategic Partners</Link></li>
              <li><Link href="/about/community-outreach-giving" className="hover:text-white transition-colors">Our Causes &amp; Community</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us &amp; Office</Link></li>
              <li><Link href="/search-mls" className="text-[#D4AF37] hover:text-white transition-colors font-bold">Search Full Tampa Bay MLS →</Link></li>
            </ul>
          </div>
        </div>

        {/* Tier 2: Compliance Bottom Horizontal (3-Column matching Login Footer) */}
        <div className="border-t border-[#ef5728]/40 pt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#888] text-[11px] leading-snug items-end">
          {/* Compliance Col 1 */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dg-equal-realtor-gold.png"
                alt="Realtor and Equal Housing Opportunity"
                className="h-8 w-auto object-contain mx-auto md:mx-0 mb-3"
              />
              <p>
                © {new Date().getFullYear()} Davis &amp; Garnett. All Rights Reserved. An independent team affiliated with Align Right Realty Carrollwood. Equal Housing Opportunity. REALTOR® is a registered trademark of the National Association of REALTORS®.
              </p>
            </div>
          </div>

          {/* Compliance Col 2 */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p>
              MLS IDX information is for personal, non-commercial use only; data is deemed reliable but not guaranteed. Mobile information, including SMS opt-in data and consent, WILL NOT be shared with third parties or affiliates for marketing purposes.
            </p>
          </div>

          {/* Compliance Col 3 */}
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <a
              href="https://alignrightcarrollwood.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/align-right-email-logo.png"
                alt="Align Right Realty Carrollwood"
                className="h-14 w-auto object-contain mb-1"
              />
            </a>
            <p>
              <strong className="text-[#ef5728] text-sm font-semibold block mb-0.5">
                Align Right Realty Carrollwood
              </strong>
              Broker Number BK3401606<br />
              3903 Northdale Blvd Suite 115W, TAMPA, FL 33624<br />
              (813) 374-6050 &nbsp;|&nbsp; officeadmin@alignrightcarrollwood.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


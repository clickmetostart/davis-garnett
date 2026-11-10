"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Camera,
  Layers,
  Search,
  FileCheck,
  BarChart3,
  TrendingUp,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  Home,
  Check,
  Award,
  Video,
  Globe2,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import ConsultationModal from "@/components/ConsultationModal";

export default function EveryListingApproachPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    interest: "List a Property with Davis & Garnett",
    advisor: "Mark Davis & Rachael Garnett",
    title: "Request Our Listing Consultation & Proposal",
  });

  const openConsultation = (interest: string, advisor: string, title: string) => {
    setModalConfig({ interest, advisor, title });
    setModalOpen(true);
  };

  const checklistItems = [
    {
      title: "Honest Pricing & Local Market Study",
      desc: "We compare recent neighborhood sales, current buyer demand, and commercial income numbers so you can price your property with confidence.",
      category: "Pricing & Research",
    },
    {
      title: "Upfront Title, Survey, HOA & Zoning Checks",
      desc: "We check public records, deed rules, easements, zoning (A-1, commercial, residential), flood zones, and CDD fees early so nothing surprises you in escrow.",
      category: "Early Prep",
    },
    {
      title: "Professional Photos, Drone Aerials & Video Tours",
      desc: "Every listing gets bright professional photography, licensed 4K drone photos and video, twilight shots, and a guided video walkthrough.",
      category: "Photos & Video",
    },
    {
      title: "Measured Floor Plans & 3D Virtual Walkthroughs",
      desc: "We create clear floor plans, 3D Matterport/Zillow walkthroughs for homes and offices, and boundary overlays for land and acreage.",
      category: "Floor Plans & 3D",
    },
    {
      title: "Custom Print Brochures & Property Guides",
      desc: "We design clean, easy-to-read print flyers, commercial property summaries, and digital brochures buyers can review at home.",
      category: "Print & Digital Materials",
    },
    {
      title: "Full MLS & Commercial Portal Reach",
      desc: "Your listing goes live on Stellar MLS and syndicates to Zillow, Realtor.com, Redfin, Homes.com, CoStar, LoopNet, and Crexi.",
      category: "Online Reach",
    },
    {
      title: "Targeted Local & Out-of-State Ad Campaigns",
      desc: "We run focused social media and search ads to reach local buyers, business owners, and families relocating to Tampa Bay.",
      category: "Digital Marketing",
    },
    {
      title: "Direct Outreach to Local Agents & Investors",
      desc: "We share your property directly with fellow agents across Align Right Realty Carrollwood and active buyer networks across Central Florida.",
      category: "Agent Network",
    },
    {
      title: "Mark & Rachael Handle Your Showings & Calls",
      desc: "You won't be passed off to a junior assistant. Mark and Rachael personally answer buyer questions, check pre-approvals, and follow up on every showing.",
      category: "Personal Service",
    },
    {
      title: "Clear Contract Review & Strong Negotiation",
      desc: "We walk you through every offer in plain English, compare net sheets, and negotiate price, inspection repairs, and timelines to protect your bottom line.",
      category: "Offers & Negotiation",
    },
    {
      title: "Hands-On Title, Inspection & Closing Coordination",
      desc: "We work closely with title companies, surveyors, inspectors, and lenders to keep your closing on track from contract to keys.",
      category: "Closing Support",
    },
    {
      title: "Here for You After Closing",
      desc: "Whether you need a trusted local contractor, help filing homestead exemptions, or advice on a 1031 exchange, we stay a phone call away.",
      category: "Ongoing Help",
    },
  ];

  const propertyTypes = [
    {
      icon: <Building2 className="w-6 h-6 text-[#9A7D3A]" />,
      title: "Commercial & Mixed-Use",
      desc: "Mixed-use retail/office buildings, commercial corridors, light industrial, and owner-user commercial assets.",
    },
    {
      icon: <Home className="w-6 h-6 text-[#9A7D3A]" />,
      title: "Residential & Luxury Estates",
      desc: "Waterfront estates, custom single-family residences, golf course communities, and master-planned neighborhoods.",
    },
    {
      icon: <Layers className="w-6 h-6 text-[#9A7D3A]" />,
      title: "Land, Acreage & Development Tracts",
      desc: "Agricultural timberland, future residential subdivisions, commercial parcels, and Central Florida acreage.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#9A7D3A]" />,
      title: "Condominiums & Towers",
      desc: "Downtown skyline condominiums, high-rise luxury towers, short-term rental approved units, and VIP pre-construction.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full pt-32 pb-16 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10 overflow-hidden min-h-[680px] flex flex-col justify-center">
        <FaviconHeroBackground variant="light" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/70 border border-[#C8A951]/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#9A7D3A]" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#9A7D3A]">
                Why Us? · Our Every Listing Approach
              </span>
            </div>

            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] tracking-tight mb-6">
              Every Listing Gets<br />
              <span className="text-[#9A7D3A]">Our Full Attention.</span>
            </h1>

            <p className="text-base md:text-[17px] lg:text-[18px] text-[#111111]/80 font-light leading-relaxed max-w-3xl mx-auto mb-8">
              Whether we are selling a residential home, a commercial building, or land, our promise is the same:{" "}
              <strong className="text-[#111111] font-semibold">thorough research, great photography, and both Mark and Rachael working hands-on from our first meeting to the closing table.</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() =>
                  openConsultation(
                    "List Property with Davis & Garnett",
                    "Mark Davis & Rachael Garnett",
                    "Schedule Your Listing Consultation"
                  )
                }
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg shadow-lg"
              >
                Request Listing Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] hover:text-[#9A7D3A] transition-colors rounded-lg"
              >
                View Our Track Record
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR "WHY" PHILOSOPHY ── */}
      <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#111111]/10 bg-[#111111]">
              <Image
                src="/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-9.jpg"
                alt="Mark Davis and Rachael Garnett — Principal Advisors"
                fill
                unoptimized
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A951] font-bold block mb-2">
                  Our Unwavering Commitment
                </span>
                <p className="font-aiveritas text-2xl md:text-3xl mb-1">
                  Mark Davis &amp; Rachael Garnett
                </p>
                <p className="text-xs text-white/75 font-light">
                  Commercial &amp; Residential Advisors · Align Right Realty Carrollwood
                </p>
              </div>
            </div>

            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
                Our &ldquo;Why&rdquo;
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-6 leading-tight">
                Treating Every Property Like It Is Our Own.
              </h2>
              <p className="text-[#111111]/75 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed mb-6">
                Selling a property is a big moment. For families, a home holds years of memories and hard-earned savings. For business owners and land owners, a property represents years of work and future plans.
              </p>
              <p className="text-[#111111]/75 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed mb-6">
                Too often, agents just put a sign in the yard, snap a few quick photos, and wait. When that happens, important details get missed, buyer questions go unanswered, and sellers leave money on the table.
              </p>
              <p className="text-[#111111]/75 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed mb-8">
                We teamed up as <strong className="text-[#111111] font-semibold">Davis &amp; Garnett</strong> to do things differently. As both residential and commercial REALTORS®, we do the homework upfront, showcase your property at its best, and stay personally involved in every showing, call, and negotiation.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#111111]/10">
                <div>
                  <span className="font-aiveritas text-3xl text-[#9A7D3A] block">100%</span>
                  <span className="text-xs uppercase tracking-wider text-[#111111]/60 font-bold">Full Checklist on Every Listing</span>
                </div>
                <div>
                  <span className="font-aiveritas text-3xl text-[#9A7D3A] block">Two Agents</span>
                  <span className="text-xs uppercase tracking-wider text-[#111111]/60 font-bold">Commercial &amp; Residential Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLIED ACROSS EVERY CATEGORY ── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Homes, Commercial &amp; Land
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4 leading-tight">
              Every Property Type.<br />
              <span className="text-[#9A7D3A]">Same Care &amp; Effort.</span>
            </h2>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              We bring the exact same level of preparation and marketing to residential homes, commercial buildings, land, and waterfront and unique properties.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#111111]/10 flex items-center justify-center mb-6 shadow-xs">
                    {item.icon}
                  </div>
                  <h3 className="font-aiveritas text-xl text-[#111111] mb-3">{item.title}</h3>
                  <p className="text-[#111111]/75 text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#111111]/10 text-[11px] uppercase tracking-widest font-bold text-[#9A7D3A] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Full Checklist Included
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR 12-POINT LISTING CHECKLIST ── */}
      <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                What We Do For You
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111]">
                The Every Listing Checklist
              </h2>
            </div>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] max-w-md leading-relaxed">
              Here is what is standard on every single listing we bring to market—no surprise fees, no downgraded tiers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklistItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-[#111111]/8 shadow-sm hover:border-[#C8A951] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] bg-[#f5f3ef] px-3 py-1 rounded-full">
                      Step {String(idx + 1).padStart(2, "0")} · {item.category}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#C8A951]" />
                  </div>
                  <h3 className="font-aiveritas text-xl text-[#111111] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#111111]/75 text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE STEP-BY-STEP PROCESS ── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Clear &amp; Simple
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              How We Guide You From Day One
            </h2>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              Our 4-step process keeps everything clear, organized, and stress-free from our first meeting to closing day.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              {
                phase: "01",
                name: "Walkthrough & Pricing",
                desc: "We tour your property together, check local records and recent sales, and build a clear pricing strategy.",
              },
              {
                phase: "02",
                name: "Prep, Photos & Video",
                desc: "Helpful staging tips, professional photography, drone video, 3D tours, and custom marketing materials.",
              },
              {
                phase: "03",
                name: "Launch & Buyer Outreach",
                desc: "Full MLS launch, social media and online marketing, agent outreach, and personal follow-up on every inquiry.",
              },
              {
                phase: "04",
                name: "Offers & Smooth Closing",
                desc: "Plain-English offer comparisons, strong negotiation, inspection coordination, and hands-on support through closing.",
              },
            ].map((st, i) => (
              <div key={i} className="relative bg-[#fbfbf9] p-8 rounded-2xl border border-[#111111]/10">
                <span className="font-aiveritas text-5xl text-[#C8A951]/40 block mb-4">
                  {st.phase}
                </span>
                <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">{st.name}</h3>
                <p className="text-base text-[#111111]/75 font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION CTA ── */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1810_0%,#0c0b09_80%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
            Talk With Mark &amp; Rachael
          </span>
          <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-6 leading-tight">
            Curious What Your Property<br />
            <span className="text-[#C8A951]">Could Sell For Today?</span>
          </h2>
          <p className="text-white/80 font-light text-base md:text-[17px] lg:text-[18px] max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a friendly, no-pressure conversation with Mark Davis and Rachael Garnett. We will walk through your property, share local sales numbers, and answer all your questions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                openConsultation(
                  "List Property with Davis & Garnett",
                  "Mark Davis & Rachael Garnett",
                  "Request Your Confidential Listing Proposal"
                )
              }
              className="w-full sm:w-auto px-8 py-4 bg-[#C8A951] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors shadow-lg"
            >
              Request Listing Proposal
            </button>
            <a
              href="tel:941-737-4127"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A951]" /> Call Mark: 941-737-4127
            </a>
            <a
              href="tel:727-808-3344"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A951]" /> Call Rachael: 727-808-3344
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultInterest={modalConfig.interest}
        defaultAdvisor={modalConfig.advisor}
        title={modalConfig.title}
      />
    </div>
  );
}


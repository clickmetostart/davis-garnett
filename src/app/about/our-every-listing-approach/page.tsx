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
      title: "Comprehensive Fiduciary Valuation & Pricing Blueprint",
      desc: "Granular comparative market analysis (CMA), commercial income/cap rate modeling, absorption rate analytics, and local micro-trend positioning.",
      category: "Analysis & Valuation",
    },
    {
      title: "Full Title, Survey, CDD, HOA & Environmental Due Diligence",
      desc: "Proactive review of preliminary title, deed restrictions, easement rights, zoning classifications (A-1, commercial, PUD), flood zones, and bond balances.",
      category: "Legal & Entitlements",
    },
    {
      title: "Architectural HDR Photography, Drone Aerials & Video Walkthroughs",
      desc: "Magazine-grade photography, FAA-licensed 4K aerial footage, twilight exterior renderings, and cinematic property tours.",
      category: "Media & Visuals",
    },
    {
      title: "Floor Plans, 3D Interactive Virtual Tours & Dimensioned Layouts",
      desc: "Laser-measured schematic floor plans, Matterport/Zillow 3D virtual walkthroughs, and site plan overlays for land & acreage.",
      category: "Media & Visuals",
    },
    {
      title: "Curated Print Dossiers & Digital Property Presentation Books",
      desc: "Heavyweight glossy feature brochures, executive offering memorandums, and shareable high-res digital pitch decks.",
      category: "Marketing Collateral",
    },
    {
      title: "Dual MLS Syndication & Global Portal Distribution",
      desc: "Full Stellar MLS broadcast syndicating instantly to Zillow, Realtor.com, Redfin, Homes.com, CoStar, LoopNet, and Crexi.",
      category: "Distribution & Reach",
    },
    {
      title: "Targeted Digital Campaigns & Social Media Amplification",
      desc: "Hyper-targeted geo-fenced social advertising reaching qualified high-net-worth buyers, local investors, and executive relocation channels.",
      category: "Digital Marketing",
    },
    {
      title: "Brokerage Network Exposure Across Align Right Realty",
      desc: "Direct outreach to top regional brokerages, commercial master networks, and Align Right Realty's statewide network.",
      category: "Industry Outreach",
    },
    {
      title: "Dedicated Advisor Representation at Showings & Inquiries",
      desc: "Mark Davis and Rachael Garnett personally field qualified buyer inquiries, vet proof of funds, and host private broker previews.",
      category: "Personal Advisory",
    },
    {
      title: "Rigorous Contract Architecture & Fierce Negotiation",
      desc: "Institutional-grade contract preparation, inspection contingency navigation, appraisal defense packages, and earnest money escrow protection.",
      category: "Transaction Management",
    },
    {
      title: "End-to-End Escrow, Title & Closing Coordination",
      desc: "Direct coordination with trusted title attorneys, survey crews, municipal permitting desks, and closing teams through final wire clearance.",
      category: "Transaction Management",
    },
    {
      title: "Post-Sale Stewardship & Client Advisory",
      desc: "Ongoing 1031 exchange guidance, investment redeployment analysis, homestead exemption filings, and neighborhood concierge services.",
      category: "Ongoing Care",
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
      <section className="pt-36 pb-20 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f5f3ef] border border-[#C8A951]/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#9A7D3A]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A]">
                Why Us? · Our Every Listing Approach
              </span>
            </div>

            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] tracking-tight mb-8">
              Every Property Deserves <span className="text-[#9A7D3A]">Uncompromising Standard.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#111111]/75 font-light leading-relaxed mb-6">
              At Davis &amp; Garnett, we reject the notion that premium marketing and rigorous advisory are reserved only for multi-million-dollar estates. 
            </p>

            <p className="text-base text-[#111111]/65 font-light leading-relaxed mb-10">
              Whether you are listing a downtown luxury penthouse, a family home in Pasco County, an 80-acre agricultural tract in Polk County, or a dual-building commercial asset on Hwy 60—our standard remains identical: <strong className="text-[#111111] font-semibold">institutional-grade diligence, white-glove presentation, and personal advisor oversight from consultation to closing table.</strong>
            </p>

            <div className="flex flex-wrap items-center gap-4">
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
                src="/new-images/davis-garnett-new-team-1.jpg"
                alt="Mark Davis and Rachael Garnett — Principal Advisors"
                fill
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
                Our "Why"
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-6 leading-tight">
                Respecting the Value Every Property Brings to the Community.
              </h2>
              <p className="text-[#111111]/75 font-light text-base leading-relaxed mb-6">
                Real estate is rarely just an address or a transaction. For families, it is generational wealth, security, and the backdrop of their lives. For business owners and investors, it is capital allocation, cash flow, and community expansion.
              </p>
              <p className="text-[#111111]/75 font-light text-base leading-relaxed mb-6">
                When an agent treats a listing as just a sign in the yard, critical details get missed: zoning nuances are overlooked, photos fall short of capturing value, buyer inquiries go unanswered, and equity is left on the table.
              </p>
              <p className="text-[#111111]/75 font-light text-base leading-relaxed mb-8">
                We founded <strong className="text-[#111111] font-semibold">Davis &amp; Garnett</strong> to raise that bar. We believe every seller deserves advisors who know the numbers, respect their property’s true worth, and execute an exhaustive, multi-point marketing plan to achieve the maximum price and smoothest closing possible.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#111111]/10">
                <div>
                  <span className="font-aiveritas text-3xl text-[#9A7D3A] block">100%</span>
                  <span className="text-xs uppercase tracking-wider text-[#111111]/60 font-bold">Standard Services Included</span>
                </div>
                <div>
                  <span className="font-aiveritas text-3xl text-[#9A7D3A] block">Dual-Advisor</span>
                  <span className="text-xs uppercase tracking-wider text-[#111111]/60 font-bold">Commercial &amp; Residential Expertise</span>
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
              Versatility &amp; Precision
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Every Category. Same Unwavering Standard.
            </h2>
            <p className="text-[#111111]/60 font-light text-sm md:text-base leading-relaxed">
              We apply our full playbook across commercial assets, residential neighborhoods, raw land, and luxury towers without compromise.
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
                  <p className="text-[#111111]/65 text-xs md:text-sm font-light leading-relaxed">
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
                Transparent Execution
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111]">
                The Every Listing Checklist
              </h2>
            </div>
            <p className="text-[#111111]/60 font-light text-sm max-w-md">
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
                  <p className="text-[#111111]/65 text-xs md:text-sm font-light leading-relaxed">
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
              Clear &amp; Predictable
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              How We Guide You From Day One
            </h2>
            <p className="text-[#111111]/60 font-light text-sm md:text-base leading-relaxed">
              Our 4-stage advisory workflow guarantees complete clarity, zero ambiguity, and continuous communication.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              {
                phase: "01",
                name: "Discovery & Valuation",
                desc: "We tour the property, audit public records, review title & survey, and compile a rigorous market analysis to establish target pricing.",
              },
              {
                phase: "02",
                name: "Asset Preparation & Media",
                desc: "Staging recommendations, full architectural & drone media production, dimensioned floor plans, and custom marketing copywriting.",
              },
              {
                phase: "03",
                name: "Global Launch & Vetting",
                desc: "Dual MLS syndication, broker preview outreach, digital ad rollout, and direct vetting of all buyer inquiries & proof of funds.",
              },
              {
                phase: "04",
                name: "Negotiation & Escrow",
                desc: "Offer presentation, strategic counter-offers, inspection negotiation, appraisal defense, and hands-on closing coordination.",
              },
            ].map((st, i) => (
              <div key={i} className="relative bg-[#fbfbf9] p-8 rounded-2xl border border-[#111111]/10">
                <span className="font-aiveritas text-5xl text-[#C8A951]/40 block mb-4">
                  {st.phase}
                </span>
                <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">{st.name}</h3>
                <p className="text-xs md:text-sm text-[#111111]/65 font-light leading-relaxed">
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
            Experience The Difference
          </span>
          <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-6 leading-tight">
            Ready to Discover What Your Property is Truly Worth?
          </h2>
          <p className="text-white/75 font-light text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a confidential, zero-obligation advisory consultation with Mark Davis and Rachael Garnett. We will review your property, explain our custom marketing strategy, and answer all your questions.
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


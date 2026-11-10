"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ShieldCheck,
  Compass,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  MapPin,
  Heart,
  Award,
  KeyRound,
  FileCheck,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ConsultationModal from "@/components/ConsultationModal";

export default function ResidentialAdvisoryGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    interest: "Residential & Luxury Estate Advisory",
    advisor: "Rachael Garnett & Mark Davis",
    title: "Schedule Your Residential & Condo Consultation",
  });

  const openConsultation = (interest: string, advisor: string, title: string) => {
    setModalConfig({ interest, advisor, title });
    setModalOpen(true);
  };

  const steps = [
    {
      step: "01",
      title: "Lifestyle, Enclave & Financial Alignment",
      desc: "We begin by crystallizing your lifestyle priorities: waterfront boating clearance, gated golf country clubs, school districts, commute corridors, or downtown walkability.",
    },
    {
      step: "02",
      title: "Neighborhood Tour & Off-Market Curation",
      desc: "Beyond public MLS listings, we tap private developer allocations, pre-construction builder releases, and quiet seller networks across St. Petersburg, Tampa, and North Tampa.",
    },
    {
      step: "03",
      title: "Contract Protection & Strategic Negotiation",
      desc: "We draft purchase agreements with rigorous contingencies protecting your earnest money deposit, loan qualification terms, and appraisal conditions.",
    },
    {
      step: "04",
      title: "Specialized Inspections & Due Diligence",
      desc: "For waterfront homes: seawalls, docks, and coastal elevation certificates. For master-planned communities: CDD bond debt schedules, HOA reserve funds, and builder warranty walkthroughs.",
    },
    {
      step: "05",
      title: "Smooth Closing, Homestead & Concierge Hand-Off",
      desc: "We coordinate with trusted title attorneys and lenders through closing, followed by personalized assistance with Florida homestead tax exemptions and utility setup.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO ── */}
      <section className="pt-36 pb-20 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden border-b border-[#D4AF37]/25">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/new-images/new-2/davis-garnett-tampa-residential-real-estate-1.jpg"
            alt="Residential Luxury Homes Tampa Bay"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 z-0" />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 mb-6">
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">
                Residential, Condos &amp; Luxury Estates Guide
              </span>
            </div>

            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-8">
              A Thoughtful Approach to <span className="text-[#D4AF37]">Home Buying &amp; Selling.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6">
              Purchasing or selling a home in Tampa Bay is more than a financial transaction—it defines your family’s daily rhythm, security, and long-term peace of mind.
            </p>

            <p className="text-base text-white/65 font-light leading-relaxed mb-10">
              Whether you are moving into custom waterfront living in St. Pete, selecting a penthouse tower in Water Street, or settling into a master-planned golf community in Pasco County—here is how our advisory team partners with you from day one.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  openConsultation(
                    "Residential Buyer & Seller Consultation",
                    "Rachael Garnett & Mark Davis",
                    "Request a Residential Consultation"
                  )
                }
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors rounded-lg shadow-lg"
              >
                Schedule Residential Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/properties?category=Residential"
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors rounded-lg"
              >
                View Residential Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE RESIDENTIAL DOMAINS ── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              White-Glove Guidance
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Our Residential Specialties
            </h2>
            <p className="text-[#111111]/60 font-light text-sm md:text-base leading-relaxed">
              Every micro-market in Tampa Bay has unique nuances. We bring dedicated mastery to each.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Waterfront & Coastal Estates",
                desc: "Deepwater canals, open Tampa Bay vistas, and Gulf access. We navigate seawall engineering inspections, dock permitting limits, bridge clearance heights, and flood insurance requirements.",
                examples: "6100 Bahama Shores Dr S ($4.55M custom waterfront)",
              },
              {
                icon: <Compass className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Master-Planned & Golf Communities",
                desc: "Crystal lagoons, championship golf courses, and lifestyle clubhouses across Wesley Chapel, Land O' Lakes, and Carrollwood. We demystify CDD bond taxes vs. HOA fees.",
                examples: "Two Rivers, Angeline, Mirada & Plantation Palms",
              },
              {
                icon: <KeyRound className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Downtown Skyscrapers & Condos",
                desc: "Five-star branded residences and pre-construction towers. We evaluate HOA bylaws, rental restrictions, reserve studies, and VIP builder allocations before public launch.",
                examples: "Pendry Residences & The Ritz-Carlton Towers",
              },
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#111111]/10 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="font-aiveritas text-2xl text-[#111111] mb-3">{card.title}</h3>
                  <p className="text-xs md:text-sm text-[#111111]/70 font-light leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#111111]/10 text-[11px] text-[#9A7D3A] font-semibold">
                  Featured Track Record: {card.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEP BY STEP GETTING STARTED ── */}
      <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Clear &amp; Attentive
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              How Clients Get Started With Us
            </h2>
            <p className="text-[#111111]/60 font-light text-sm md:text-base leading-relaxed">
              We replace stress and uncertainty with a step-by-step roadmap tailored specifically to your family’s timeline and goals.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#111111]/8 shadow-sm flex flex-col md:flex-row gap-6 md:items-center"
              >
                <span className="font-aiveritas text-4xl md:text-5xl text-[#C8A951] shrink-0 w-16">
                  {s.step}
                </span>
                <div className="flex-1">
                  <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">{s.title}</h3>
                  <p className="text-xs md:text-sm text-[#111111]/70 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISORY CONSULTATION CTA ── */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[#C8A951] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
            Direct Principal Contact
          </span>
          <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-6">
            Ready to Begin Your Home Search or Sale?
          </h2>
          <p className="text-white/70 font-light text-sm md:text-base mb-10 leading-relaxed">
            Connect directly with Commercial &amp; Residential Advisor Rachael Garnett (#3378601) and Mark Davis (#3209459) for trusted counsel across Tampa Bay.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                openConsultation(
                  "Residential Home Advisory",
                  "Rachael Garnett & Mark Davis",
                  "Request Residential Consultation"
                )
              }
              className="w-full sm:w-auto px-8 py-4 bg-[#C8A951] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors"
            >
              Request Advisory Consultation
            </button>
            <a
              href="tel:727-808-3344"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A951]" /> Rachael Garnett: 727-808-3344
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


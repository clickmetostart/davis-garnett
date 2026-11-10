"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  FileText,
  Layers,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  MapPin,
  Scale,
  DollarSign,
  PieChart,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ConsultationModal from "@/components/ConsultationModal";

export default function CommercialAdvisoryGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    interest: "Commercial & Land Advisory",
    advisor: "Mark Davis & Rachael Garnett",
    title: "Schedule Your Commercial & Land Consultation",
  });

  const openConsultation = (interest: string, advisor: string, title: string) => {
    setModalConfig({ interest, advisor, title });
    setModalOpen(true);
  };

  const steps = [
    {
      step: "01",
      title: "Talking Through Your Goals",
      desc: "We start with a friendly conversation to understand what you want to accomplish—whether you are buying a building for your business, selling a property, planning a 1031 exchange, or looking at land.",
    },
    {
      step: "02",
      title: "Reviewing the Numbers & Zoning",
      desc: "We look closely at rental income, expenses, cap rates, lease terms (NNN vs. Gross), local zoning rules (commercial, industrial, A-1 agriculture), future land use, and road traffic.",
    },
    {
      step: "03",
      title: "Finding Properties or Launching Your Listing",
      desc: "For buyers, we search both on-market and off-market properties. For sellers, we create clear property info packages and market your listing across Stellar MLS, CoStar, LoopNet, Crexi, and local investor networks.",
    },
    {
      step: "04",
      title: "Clear Offers & Smart Contract Terms",
      desc: "We write and negotiate Letters of Intent (LOIs) and purchase contracts with clear inspection, zoning study, environmental, and financing protections.",
    },
    {
      step: "05",
      title: "Hands-On Support Through Closing",
      desc: "Mark and Rachael stay involved through county permitting checks, surveys, inspections, and title work all the way to the closing table.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── HERO ── */}
      <section className="pt-36 pb-20 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden border-b border-[#D4AF37]/25">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg"
            alt="Commercial Real Estate Tampa Bay"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 z-0" />

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 mb-6">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">
                Commercial &amp; Land Real Estate Guide
              </span>
            </div>

            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-8">
              Commercial &amp; Land Real Estate,<br />
              <span className="text-[#D4AF37]">Made Clear &amp; Simple.</span>
            </h1>

            <p className="text-base md:text-[17px] lg:text-[18px] text-white/85 font-light leading-relaxed mb-6">
              Buying or selling a commercial building, mixed-use property, or tract of Florida land takes careful homework on zoning, utilities, and income numbers.
            </p>

            <p className="text-base md:text-[17px] lg:text-[18px] text-white/75 font-light leading-relaxed mb-10">
              Whether you are looking for a building for your business, completing a 1031 exchange, or buying or selling acreage in Central Florida, Mark Davis and Rachael Garnett work together to guide you from our first conversation to closing day.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  openConsultation(
                    "Commercial Asset Consultation",
                    "Mark Davis & Rachael Garnett",
                    "Request a Commercial & Land Strategy Session"
                  )
                }
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors rounded-lg shadow-lg"
              >
                Schedule Commercial Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/properties?category=Commercial"
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors rounded-lg"
              >
                View Commercial Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Commercial &amp; Land Expertise
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              How We Help Commercial &amp; Land Clients
            </h2>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              From business corridors in Tampa and Brandon to acreage across Central Florida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Commercial & Mixed-Use",
                desc: "Office buildings, street-front retail spaces, and mixed-use properties where you can run your business and earn rental income.",
                examples: "126 Ridgewood Ave (Brandon Hwy 60 corridor)",
              },
              {
                icon: <Layers className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Florida Land & Acreage",
                desc: "High-and-dry acreage, commercial highway frontage, and agricultural or timberland parcels with tax exemptions.",
                examples: "770 Old Stokes Rd (79.5 Acres) & NE 90th St (20 Acres)",
              },
              {
                icon: <PieChart className="w-6 h-6 text-[#9A7D3A]" />,
                title: "1031 Exchanges & Investments",
                desc: "Helping property owners meet 45-day identification and 180-day closing timelines to defer capital gains taxes and reinvest wisely.",
                examples: "Tampa Bay & Central Florida Commercial Corridors",
              },
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#111111]/10 flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="font-aiveritas text-2xl text-[#111111] mb-3">{card.title}</h3>
                  <p className="text-base text-[#111111]/75 font-light leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#111111]/10 text-[11px] text-[#9A7D3A] font-semibold">
                  Featured Listing: {card.examples}
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
              Your Path Forward
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              How Clients Get Started With Us
            </h2>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              A simple, 5-step process built for business owners, commercial buyers, and landowners.
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
                  <p className="text-base text-[#111111]/75 font-light leading-relaxed">
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
            Talk With Mark &amp; Rachael
          </span>
          <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-6 leading-tight">
            Have Questions About a<br />
            <span className="text-[#C8A951]">Commercial Property or Land?</span>
          </h2>
          <p className="text-white/80 font-light text-base md:text-[17px] lg:text-[18px] mb-10 leading-relaxed">
            Reach out directly to Mark Davis (#3209459) and Rachael Garnett (#3378601) to talk through property values, zoning questions, or off-market opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() =>
                openConsultation(
                  "Commercial & Land Strategy",
                  "Mark Davis & Rachael Garnett",
                  "Request Commercial Advisory Consultation"
                )
              }
              className="w-full sm:w-auto px-8 py-4 bg-[#C8A951] text-[#111111] font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:bg-white transition-colors"
            >
              Request Advisory Proposal
            </button>
            <a
              href="tel:941-737-4127"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:border-[#C8A951] hover:text-[#C8A951] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8A951]" /> Mark Davis: 941-737-4127
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


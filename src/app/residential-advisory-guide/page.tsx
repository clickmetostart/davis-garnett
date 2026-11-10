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
      title: "Listening to What Matters Most to You",
      desc: "We start by talking through your goals: neighborhood feel, school zones, commute times, boating water access, or finding a unique home with character.",
    },
    {
      step: "02",
      title: "Touring Neighborhoods & Finding the Right Fit",
      desc: "Alongside active MLS listings, we help you explore new-construction communities, builder incentives, and upcoming homes across St. Petersburg, Tampa, and North Tampa.",
    },
    {
      step: "03",
      title: "Smart Offers & Protecting Your Deposit",
      desc: "We write clear purchase offers with strong inspection, financing, and appraisal protections so your deposit and budget stay protected.",
    },
    {
      step: "04",
      title: "Thorough Home, Seawall & HOA Checks",
      desc: "For waterfront and unique properties: we check seawalls, docks, and flood zones. For master-planned neighborhoods: we review CDD fees, HOA rules, and builder warranties.",
    },
    {
      step: "05",
      title: "Smooth Closing & Homestead Help",
      desc: "We work closely with your lender and title company all the way to closing, and help you file your Florida homestead tax exemption once you move in.",
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
            <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Davis &amp; Garnett · Homes, Condos &amp; Waterfront
            </span>

            <h1 className="font-aiveritas text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-8">
              Residential <span className="text-[#D4AF37]">Guide</span>
            </h1>

            <p className="text-base md:text-[17px] lg:text-[18px] text-white/85 font-light leading-relaxed mb-6">
              Buying or selling a home in Tampa Bay is a big life milestone—and having two approachable, full-time agents in your corner makes all the difference.
            </p>

            <p className="text-base md:text-[17px] lg:text-[18px] text-white/75 font-light leading-relaxed mb-10">
              Whether you are looking at waterfront and unique properties in St. Petersburg, a downtown condo on Water Street, or a family home in Carrollwood, Wesley Chapel, or Land O&apos; Lakes—here is how Rachael Garnett and Mark Davis work together for you.
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
              Personal Guidance
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Our Residential Specialties
            </h2>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              Every neighborhood in Tampa Bay is different. Here is how we help buyers and sellers across the area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Waterfront & Unique Properties",
                desc: "Deepwater canals, open Tampa Bay views, historic homes, and one-of-a-kind estates. We help you check seawalls, dock permits, bridge heights, and flood insurance upfront.",
                examples: "6100 Bahama Shores Dr S ($4.55M custom waterfront)",
              },
              {
                icon: <Compass className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Neighborhoods & Golf Communities",
                desc: "Single-family homes, Crystal Lagoon communities, and golf course neighborhoods across Wesley Chapel, Land O' Lakes, Lutz, and Carrollwood.",
                examples: "Two Rivers, Angeline, Mirada & Plantation Palms",
              },
              {
                icon: <KeyRound className="w-6 h-6 text-[#9A7D3A]" />,
                title: "Downtown Condos & Towers",
                desc: "Waterfront high-rises and new condo towers. We help you review condo fees, rental rules, building reserves, and floor plans before you buy.",
                examples: "Pendry Residences & The Ritz-Carlton Towers",
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
              Clear &amp; Easy
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              How Clients Get Started With Us
            </h2>
            <p className="text-[#111111]/70 font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed">
              We replace stress and guesswork with a simple step-by-step plan built around your timeline.
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
            Talk With Rachael &amp; Mark
          </span>
          <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-6 leading-tight">
            Ready to Start Your<br />
            <span className="text-[#C8A951]">Home Search or Sale?</span>
          </h2>
          <p className="text-white/80 font-light text-base md:text-[17px] lg:text-[18px] mb-10 leading-relaxed">
            Reach out directly to Rachael Garnett (#3378601) and Mark Davis (#3209459) for friendly, local help across Tampa Bay.
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


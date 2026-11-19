"use client";

import React from "react";
import {
  Building2,
  Calculator,
  Compass,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { smoothScrollToId } from "@/lib/smoothScroll";

export default function PillarHubJumpGrid({ isCommercial }: { isCommercial: boolean }) {
  const items = isCommercial
    ? [
        { label: "Commercial Services", sub: "6 Core Lanes", target: "services", icon: Building2 },
        { label: "Business Corridors", sub: "Tampa Bay & I-4", target: "corridors", icon: MapPin },
        { label: "Active Portfolio", sub: "CRE & Land Deals", target: "portfolio", icon: Compass },
        { label: "Tools & Tours", sub: "Cap Rate & Routes", target: "tours", icon: Calculator },
        { label: "Checks & FAQ", sub: "Before You Sign", target: "checks-faq", icon: ShieldCheck },
        { label: "Talk With Us", sub: "Mark & Rachael", target: "closing-cta", icon: Phone },
      ]
    : [
        { label: "Residential Services", sub: "6 Core Lanes", target: "services", icon: Home },
        { label: "Neighborhoods", sub: "Across Tampa Bay", target: "corridors", icon: MapPin },
        { label: "Active Portfolio", sub: "Homes & Condos", target: "portfolio", icon: Compass },
        { label: "Tools & Tours", sub: "Mortgage & Routes", target: "tours", icon: Calculator },
        { label: "Checks & FAQ", sub: "Buyer & Seller Tips", target: "checks-faq", icon: ShieldCheck },
        { label: "Talk With Us", sub: "Mark & Rachael", target: "closing-cta", icon: Phone },
      ];

  return (
    <section
      id="hub-sections"
      className="py-8 px-6 lg:px-10 bg-white border-b border-[#111111]/10 scroll-mt-24"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.target}
                type="button"
                onClick={() => smoothScrollToId(pill.target)}
                className="group text-left p-3.5 rounded-xl bg-[#f5f3ef] hover:bg-[#111111] border border-[#111111]/10 hover:border-[#C8A951] transition-all flex items-start gap-2.5 shadow-xs cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#C8A951]/20 text-[#9A7D3A] group-hover:text-[#C8A951] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-[#111111] group-hover:text-white leading-snug truncate transition-colors">
                    {pill.label}
                  </span>
                  <span className="block text-[10px] text-[#111111]/60 group-hover:text-white/70 truncate transition-colors">
                    {pill.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}


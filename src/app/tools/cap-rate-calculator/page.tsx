"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ToolLeadCaptureCard from "@/components/ToolLeadCaptureCard";

const formatUsd = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(val) ? val : 0);

export default function CapRateCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(1450000);
  const [grossScheduledRent, setGrossScheduledRent] = useState(142000);
  const [vacancyPct, setVacancyPct] = useState(5);
  const [operatingExpenses, setOperatingExpenses] = useState(32000);

  const metrics = useMemo(() => {
    const effectiveGrossIncome = grossScheduledRent * (1 - vacancyPct / 100);
    const noi = Math.max(0, effectiveGrossIncome - operatingExpenses);
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0;
    const grm = grossScheduledRent > 0 ? purchasePrice / grossScheduledRent : 0;
    const sensitivity = [5.5, 6.0, 6.5, 7.0, 7.5, 8.0].map((targetCap) => ({
      targetCap,
      impliedValue: noi / (targetCap / 100),
    }));
    return { effectiveGrossIncome, noi, capRate, grm, sensitivity };
  }, [purchasePrice, grossScheduledRent, vacancyPct, operatingExpenses]);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />

      <section className="pt-36 pb-14 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/commercial-advisory-guide" className="hover:text-[#D4AF37]">Commercial Advisory</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Cap Rate Calculator</span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <Calculator className="w-4 h-4" /> Commercial Investment Tool
          </span>
          <h1 className="font-aiveritas text-3xl md:text-5xl text-white max-w-4xl mb-4 leading-tight">
            Commercial Cap Rate &amp; NOI Calculator
          </h1>
          <p className="text-white/75 text-base md:text-lg font-light max-w-3xl">
            Model Net Operating Income (NOI), capitalization rate, and pricing sensitivity across Tampa Bay NNN retail, medical office, and warehouse assets.
          </p>
        </div>
      </section>

      <section className="py-14 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Asking / Target Price ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={10000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual Gross Rent ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={grossScheduledRent}
                  onChange={(e) => setGrossScheduledRent(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Vacancy &amp; Credit Allowance (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={vacancyPct}
                  onChange={(e) => setVacancyPct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual Unreimbursed Expenses ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={operatingExpenses}
                  onChange={(e) => setOperatingExpenses(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-[#111]/10">
              <div className="p-5 rounded-xl bg-[#111] text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                  Calculated Cap Rate
                </span>
                <div className="font-aiveritas text-3xl text-white">{metrics.capRate.toFixed(2)}%</div>
              </div>
              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111]/10">
                <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold block mb-1">
                  Annual NOI
                </span>
                <div className="font-aiveritas text-2xl text-[#111]">{formatUsd(metrics.noi)}</div>
              </div>
              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111]/10">
                <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold block mb-1">
                  Gross Rent Multiple
                </span>
                <div className="font-aiveritas text-2xl text-[#111]">{metrics.grm.toFixed(2)}x</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm">
            <h2 className="font-aiveritas text-2xl text-[#111] mb-4">
              Cap Rate Sensitivity Matrix
            </h2>
            <p className="text-sm text-[#111]/70 font-light mb-5">
              See what your property is worth at {formatUsd(metrics.noi)} NOI across prevailing Tampa Bay commercial buyer yield targets:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {metrics.sensitivity.map((row) => (
                <div key={row.targetCap} className="p-4 rounded-xl bg-[#f5f3ef] border border-[#111]/8">
                  <span className="text-xs font-bold text-[#9A7D3A] block">{row.targetCap.toFixed(1)}% Cap</span>
                  <span className="font-aiveritas text-xl text-[#111]">{formatUsd(row.impliedValue)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A7D3A]">
              <Sparkles className="w-3.5 h-3.5" /> Connected Commercial Resources
            </span>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/glossary/nnn-lease" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Triple Net (NNN) Lease Explained</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/glossary/bpo" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Request a Commercial BPO</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/tools/1031-deadline-calculator" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>1031 Exchange Deadline Calculator</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/hub/commercial-tampa-bay" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Tampa Bay Commercial Hub</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <ToolLeadCaptureCard
            intentTag="cap-rate-calculator"
            heading="Request Local Cap Rate Comps"
            subheading="Send your scenario to Mark Davis (FL Lic #3209459) & Rachael Garnett (FL Lic #3378601) for verified Tampa Bay comparable sales and NNN inventory."
            summaryText={`Price: ${formatUsd(purchasePrice)} | NOI: ${formatUsd(metrics.noi)} | Cap Rate: ${metrics.capRate.toFixed(2)}%`}
          />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


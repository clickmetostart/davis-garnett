"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ToolLeadCaptureCard from "@/components/ToolLeadCaptureCard";

type LeaseStructure = "nnn" | "modified-gross" | "full-service-gross";

const formatUsd = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(val) ? val : 0);

export default function CommercialRentCalculatorPage() {
  const [sqft, setSqft] = useState(2500);
  const [baseRentPerSqft, setBaseRentPerSqft] = useState(26);
  const [leaseType, setLeaseType] = useState<LeaseStructure>("nnn");
  const [taxPerSqft, setTaxPerSqft] = useState(3.25);
  const [insPerSqft, setInsPerSqft] = useState(2.5);
  const [camPerSqft, setCamPerSqft] = useState(4.25);
  const [annualEscalationPct, setAnnualEscalationPct] = useState(3.0);
  const [salesTaxPct, setSalesTaxPct] = useState(0);

  const model = useMemo(() => {
    const activePassThroughPerSqft =
      leaseType === "nnn"
        ? taxPerSqft + insPerSqft + camPerSqft
        : leaseType === "modified-gross"
        ? camPerSqft
        : 0;

    const allInPerSqft = baseRentPerSqft + activePassThroughPerSqft;
    const annualBase = sqft * baseRentPerSqft;
    const annualPassThrough = sqft * activePassThroughPerSqft;
    const preTaxAnnual = annualBase + annualPassThrough;
    const annualTaxOnRent = preTaxAnnual * (salesTaxPct / 100);
    const totalAnnual = preTaxAnnual + annualTaxOnRent;
    const totalMonthly = totalAnnual / 12;
    const monthlyBase = annualBase / 12;
    const monthlyPassThrough = annualPassThrough / 12;

    const schedule = [1, 2, 3, 4, 5].map((yr) => {
      const mult = Math.pow(1 + annualEscalationPct / 100, yr - 1);
      const yrBase = annualBase * mult;
      const yrTotal = (yrBase + annualPassThrough) * (1 + salesTaxPct / 100);
      return {
        year: yr,
        annualRent: yrTotal,
        monthlyRent: yrTotal / 12,
        effectivePerSqft: sqft > 0 ? yrTotal / sqft : 0,
      };
    });

    return {
      activePassThroughPerSqft,
      allInPerSqft,
      annualBase,
      annualPassThrough,
      totalAnnual,
      totalMonthly,
      monthlyBase,
      monthlyPassThrough,
      schedule,
    };
  }, [
    sqft,
    baseRentPerSqft,
    leaseType,
    taxPerSqft,
    insPerSqft,
    camPerSqft,
    annualEscalationPct,
    salesTaxPct,
  ]);

  const leaseLabel =
    leaseType === "nnn"
      ? "Triple Net (NNN — Taxes + Insurance + CAM Added)"
      : leaseType === "modified-gross"
      ? "Modified Gross (CAM Included Separately Only)"
      : "Full-Service Gross (All Operating Expenses Included in Base)";

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />

      <section className="pt-36 pb-14 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/commercial" className="hover:text-[#D4AF37]">Commercial Hub</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Commercial Rent &amp; NNN Calculator</span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <Building2 className="w-4 h-4" /> Commercial Lease Analyzer
          </span>
          <h1 className="font-aiveritas text-3xl md:text-5xl text-white max-w-4xl mb-4 leading-tight">
            Commercial Rent, NNN &amp; CAM Lease Calculator
          </h1>
          <p className="text-white/75 text-base md:text-lg font-light max-w-3xl">
            Compare Triple Net (NNN), Modified Gross, and Full-Service Gross commercial leases across Tampa Bay retail, medical office, and warehouse spaces—and see your real 5-year occupancy cost.
          </p>
        </div>
      </section>

      <section className="py-14 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2.5">
                Select Lease Structure
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "nnn" as const, title: "Triple Net (NNN)", sub: "Base + Taxes + Ins. + CAM" },
                  { id: "modified-gross" as const, title: "Modified Gross", sub: "Base + CAM Share Only" },
                  { id: "full-service-gross" as const, title: "Full-Service Gross", sub: "All NNN Included in Base" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLeaseType(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      leaseType === opt.id
                        ? "bg-[#111] text-white border-[#111]"
                        : "bg-[#f5f3ef] text-[#111] border-[#111]/10 hover:border-[#D4AF37]"
                    }`}
                  >
                    <div className="text-sm font-bold">{opt.title}</div>
                    <div className={`text-[11px] mt-0.5 ${leaseType === opt.id ? "text-[#D4AF37]" : "text-[#111]/60"}`}>
                      {opt.sub}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#9A7D3A] font-medium mt-2">{leaseLabel}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Rentable Sq Ft (RSF)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Base Rent ($/SF/Yr)
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={baseRentPerSqft}
                  onChange={(e) => setBaseRentPerSqft(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual Bump (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  step={0.5}
                  value={annualEscalationPct}
                  onChange={(e) => setAnnualEscalationPct(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Optional Lease Tax (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={15}
                  step={0.1}
                  value={salesTaxPct}
                  onChange={(e) => setSalesTaxPct(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
            </div>

            {leaseType !== "full-service-gross" && (
              <div className="grid sm:grid-cols-3 gap-5 pt-2 border-t border-[#111]/10">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                    CAM ($/SF/Yr)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.25}
                    value={camPerSqft}
                    onChange={(e) => setCamPerSqft(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                  />
                </div>
                {leaseType === "nnn" && (
                  <>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                        Property Taxes ($/SF/Yr)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={0.25}
                        value={taxPerSqft}
                        onChange={(e) => setTaxPerSqft(Number(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                        Building Insurance ($/SF/Yr)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={0.25}
                        value={insPerSqft}
                        onChange={(e) => setInsPerSqft(Number(e.target.value) || 0)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#111]/15 font-bold text-lg"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-[#111]/10">
              <div className="p-5 rounded-xl bg-[#111] text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                  Total Year 1 Monthly Cost
                </span>
                <div className="font-aiveritas text-3xl text-white">{formatUsd(model.totalMonthly)}</div>
              </div>
              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111]/10">
                <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold block mb-1">
                  Effective All-In Rate
                </span>
                <div className="font-aiveritas text-2xl text-[#111]">${model.allInPerSqft.toFixed(2)} / SF / yr</div>
              </div>
              <div className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111]/10">
                <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold block mb-1">
                  Base vs. NNN/CAM / Mo
                </span>
                <div className="font-bold text-sm text-[#111]">
                  {formatUsd(model.monthlyBase)} + {formatUsd(model.monthlyPassThrough)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm">
            <h2 className="font-aiveritas text-2xl text-[#111] mb-4">
              5-Year Commercial Lease Cost Projection ({annualEscalationPct}% Annual Bump)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {model.schedule.map((row) => (
                <div key={row.year} className="p-4 rounded-xl bg-[#f5f3ef] border border-[#111]/8">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block">
                    Year {row.year}
                  </span>
                  <div className="font-aiveritas text-xl text-[#111]">{formatUsd(row.monthlyRent)}/mo</div>
                  <div className="text-[11px] text-[#111]/60">${row.effectivePerSqft.toFixed(2)}/SF</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A7D3A]">
              <Sparkles className="w-3.5 h-3.5" /> Commercial Lease Glossary &amp; Tools
            </span>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/glossary/cam" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>What Is CAM? (Common Area Maintenance)</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/glossary/nnn-lease" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Triple Net (NNN) Lease Explained</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/glossary/ti-allowance" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Tenant Improvement (TI) Allowance</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/tools/cap-rate-calculator" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Compare Buying vs. Leasing (Cap Rate Tool)</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <ToolLeadCaptureCard
            intentTag="commercial-rent-calculator"
            heading="Negotiate Your Space or Compare Buying"
            subheading="Comparing retail, medical, or flex leases in Brandon, Carrollwood, or St. Pete? Send your space size to Mark & Rachael to pull off-market owner-user purchase options alongside NNN leases."
            summaryText={`${sqft.toLocaleString()} SF (${leaseType.toUpperCase()}) @ $${baseRentPerSqft}/SF + $${model.activePassThroughPerSqft.toFixed(2)} pass-through = ${formatUsd(model.totalMonthly)}/mo`}
          />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


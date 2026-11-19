"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Home, ShieldCheck, Sparkles } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ToolLeadCaptureCard from "@/components/ToolLeadCaptureCard";

const formatUsd = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(val) ? val : 0);

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(550000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [annualTaxes, setAnnualTaxes] = useState(6800);
  const [annualHomeIns, setAnnualHomeIns] = useState(3200);
  const [annualFloodIns, setAnnualFloodIns] = useState(0);
  const [monthlyHoa, setMonthlyHoa] = useState(120);
  const [annualCdd, setAnnualCdd] = useState(0);
  const [prefillSource, setPrefillSource] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = Number(params.get("price"));
    if (Number.isFinite(p) && p >= 50000) {
      setHomePrice(Math.round(p));
      setAnnualTaxes(Math.round(p * 0.0125));
    }
    const hoa = Number(params.get("hoa"));
    if (Number.isFinite(hoa) && hoa >= 0 && params.has("hoa")) {
      setMonthlyHoa(Math.round(hoa));
    }
    const cdd = Number(params.get("cdd"));
    if (Number.isFinite(cdd) && cdd >= 0 && params.has("cdd")) {
      setAnnualCdd(Math.round(cdd));
    }
    const from = params.get("from");
    if (from) setPrefillSource(from);
  }, []);

  const calc = useMemo(() => {
    const downPaymentDollar = (homePrice * downPaymentPct) / 100;
    const loanAmount = Math.max(0, homePrice - downPaymentDollar);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;

    let monthlyPI = 0;
    if (loanAmount > 0 && numPayments > 0) {
      if (monthlyRate === 0) {
        monthlyPI = loanAmount / numPayments;
      } else {
        const factor = Math.pow(1 + monthlyRate, numPayments);
        monthlyPI = (loanAmount * (monthlyRate * factor)) / (factor - 1);
      }
    }

    const monthlyPmi = downPaymentPct < 20 ? (loanAmount * 0.005) / 12 : 0;
    const monthlyTax = annualTaxes / 12;
    const monthlyIns = (annualHomeIns + annualFloodIns) / 12;
    const monthlyCdd = annualCdd / 12;
    const totalMonthly =
      monthlyPI + monthlyPmi + monthlyTax + monthlyIns + monthlyHoa + monthlyCdd;

    return {
      downPaymentDollar,
      loanAmount,
      monthlyPI,
      monthlyPmi,
      monthlyTax,
      monthlyIns,
      monthlyCdd,
      totalMonthly,
    };
  }, [
    homePrice,
    downPaymentPct,
    interestRate,
    loanTermYears,
    annualTaxes,
    annualHomeIns,
    annualFloodIns,
    monthlyHoa,
    annualCdd,
  ]);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />

      <section className="pt-36 pb-14 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub#tools" className="hover:text-[#D4AF37]">Knowledge Hub Tools</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Mortgage &amp; CDD Calculator</span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <Home className="w-4 h-4" /> Florida Buyer Payment Tool
          </span>
          {prefillSource && (
            <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" /> Pre-filled starting numbers from {prefillSource}
            </div>
          )}
          <h1 className="font-aiveritas text-3xl md:text-5xl text-white max-w-4xl mb-4 leading-tight">
            Tampa Bay Mortgage, Tax, Insurance &amp; CDD Calculator
          </h1>
          <p className="text-white/75 text-base md:text-lg font-light max-w-3xl">
            See your real all-in Florida monthly payment—combining Principal &amp; Interest, Hillsborough/Pinellas/Pasco taxes, wind &amp; flood insurance, HOA dues, and CDD tax bills.
          </p>
        </div>
      </section>

      <section className="py-14 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm space-y-6">
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Home Price ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Down Payment (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
                <span className="text-[11px] text-[#111]/55 mt-1 block">
                  {formatUsd(calc.downPaymentDollar)} down • Loan: {formatUsd(calc.loanAmount)}
                </span>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Loan Term
                </label>
                <select
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-base bg-white"
                >
                  <option value={30}>30 Years Fixed</option>
                  <option value={20}>20 Years Fixed</option>
                  <option value={15}>15 Years Fixed</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual Property Taxes ($/yr)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={annualTaxes}
                  onChange={(e) => setAnnualTaxes(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual Home Insurance ($/yr)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={annualHomeIns}
                  onChange={(e) => setAnnualHomeIns(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual Flood Insurance ($/yr)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={annualFloodIns}
                  onChange={(e) => setAnnualFloodIns(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Monthly HOA / Condo ($/mo)
                </label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={monthlyHoa}
                  onChange={(e) => setMonthlyHoa(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Annual CDD Fee ($/yr)
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={annualCdd}
                  onChange={(e) => setAnnualCdd(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                  Estimated All-In Monthly Payment
                </span>
                <div className="font-aiveritas text-4xl text-white">
                  {formatUsd(calc.totalMonthly)} / mo
                </div>
              </div>
              <div className="text-xs text-white/75 sm:text-right space-y-1">
                <div>Principal &amp; Interest: <strong>{formatUsd(calc.monthlyPI)}</strong></div>
                <div>Loan Amount: <strong>{formatUsd(calc.loanAmount)}</strong></div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm pt-2">
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Principal &amp; Interest</span>
                <strong>{formatUsd(calc.monthlyPI)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Property Taxes</span>
                <strong>{formatUsd(calc.monthlyTax)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Home + Flood Ins.</span>
                <strong>{formatUsd(calc.monthlyIns)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Monthly HOA</span>
                <strong>{formatUsd(monthlyHoa)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>CDD Tax (÷ 12)</span>
                <strong>{formatUsd(calc.monthlyCdd)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Est. PMI ({downPaymentPct < 20 ? "0.5%/yr" : "None"})</span>
                <strong>{formatUsd(calc.monthlyPmi)}</strong>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A7D3A]">
              <ShieldCheck className="w-4 h-4" /> Florida Buyer Checklists &amp; Guides
            </span>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/glossary/cdd" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>CDD vs. HOA Fee Glossary</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/glossary/homestead-portability" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Homestead &amp; Portability Rules</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/knowledge-hub/first-time-and-relocation-buyer-costs-tampa-bay" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>True Cost of Buying in Tampa Bay</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
              <Link href="/tools/seller-net-proceeds" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
                <span>Seller Net Proceeds Tool</span>
                <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
              </Link>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <ToolLeadCaptureCard
            intentTag="mortgage-calculator"
            heading="Get Custom Pre-Approval & Tax Estimates"
            subheading="Send your target payment to Mark Davis (FL Lic BK3209459) & Rachael Garnett (FL Lic SL3378601). We pair you with trusted Florida lending partners like MadCity Home Loans and pull exact CDD & insurance figures."
            summaryText={`Price: ${formatUsd(homePrice)} (${downPaymentPct}% down @ ${interestRate}%) | Est. Total: ${formatUsd(calc.totalMonthly)}/mo`}
          />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


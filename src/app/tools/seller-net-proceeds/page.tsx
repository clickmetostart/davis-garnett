"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ToolLeadCaptureCard from "@/components/ToolLeadCaptureCard";

const formatUsd = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(val) ? val : 0);

function estimateFloridaTitlePolicy(price: number): number {
  if (price <= 0) return 0;
  if (price <= 100000) return (price / 1000) * 5.75;
  return 100 * 5.75 + ((price - 100000) / 1000) * 5.0;
}

export default function SellerNetProceedsPage() {
  const [salePrice, setSalePrice] = useState(550000);
  const [mortgagePayoff, setMortgagePayoff] = useState(210000);
  const [brokeragePct, setBrokeragePct] = useState(5.5);
  const [sellerCredits, setSellerCredits] = useState(5000);
  const [annualTaxes, setAnnualTaxes] = useState(5400);
  const [daysInYear, setDaysInYear] = useState(180);

  const breakdown = useMemo(() => {
    // Florida standard deed doc stamps: $0.70 per $100 of consideration (outside Miami-Dade)
    const docStamps = Math.ceil(salePrice / 100) * 0.7;
    const ownerTitle = estimateFloridaTitlePolicy(salePrice);
    const brokerageFee = salePrice * (brokeragePct / 100);
    const taxProration = (annualTaxes / 365) * daysInYear;
    const estSettlementMisc = 795; // Closing/estoppel/recording estimate
    const totalCosts =
      docStamps + ownerTitle + brokerageFee + taxProration + sellerCredits + estSettlementMisc;
    const netProceeds = Math.max(0, salePrice - mortgagePayoff - totalCosts);
    return {
      docStamps,
      ownerTitle,
      brokerageFee,
      taxProration,
      estSettlementMisc,
      totalCosts,
      netProceeds,
    };
  }, [salePrice, mortgagePayoff, brokeragePct, sellerCredits, annualTaxes, daysInYear]);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />

      <section className="pt-36 pb-14 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub" className="hover:text-[#D4AF37]">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Seller Net Proceeds Calculator</span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <DollarSign className="w-4 h-4" /> Florida Closing Cost Estimator
          </span>
          <h1 className="font-aiveritas text-3xl md:text-5xl text-white max-w-4xl mb-4 leading-tight">
            Florida Seller Net Proceeds Calculator
          </h1>
          <p className="text-white/75 text-base md:text-lg font-light max-w-3xl">
            Estimate Hillsborough, Pinellas, Pasco, and Polk County closing fees—including Florida Deed Documentary Stamps ($0.70 per $100), title insurance, tax prorations, and net equity.
          </p>
        </div>
      </section>

      <section className="py-14 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Estimated Sale Price ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={salePrice}
                  onChange={(e) => setSalePrice(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Remaining Mortgage Payoff ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={mortgagePayoff}
                  onChange={(e) => setMortgagePayoff(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Total Brokerage Compensation (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.25}
                  value={brokeragePct}
                  onChange={(e) => setBrokeragePct(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
                <span className="text-[11px] text-[#111]/55 mt-1 block">Commissions are negotiable and vary by listing agreement.</span>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Buyer Concessions / Repair Credits ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={sellerCredits}
                  onChange={(e) => setSellerCredits(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Prior Year Annual Property Taxes ($)
                </label>
                <input
                  type="number"
                  min={0}
                  step={250}
                  value={annualTaxes}
                  onChange={(e) => setAnnualTaxes(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                  Days Owned in Closing Year (Tax Proration)
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={daysInYear}
                  onChange={(e) => setDaysInYear(Math.min(365, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-full px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                  Estimated Net Cash at Closing
                </span>
                <div className="font-aiveritas text-4xl text-white">{formatUsd(breakdown.netProceeds)}</div>
              </div>
              <div className="text-xs text-white/75 sm:text-right space-y-1">
                <div>Total Closing &amp; Selling Costs: <strong>{formatUsd(breakdown.totalCosts)}</strong></div>
                <div>Mortgage Payoff: <strong>{formatUsd(mortgagePayoff)}</strong></div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm pt-2">
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>FL Doc Stamps on Deed ($0.70/$100)</span>
                <strong>{formatUsd(breakdown.docStamps)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Owner&apos;s Title Policy (FL Promulgated)</span>
                <strong>{formatUsd(breakdown.ownerTitle)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Est. Brokerage Compensation</span>
                <strong>{formatUsd(breakdown.brokerageFee)}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f5f3ef] flex justify-between">
                <span>Prorated Property Tax Credit</span>
                <strong>{formatUsd(breakdown.taxProration)}</strong>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 grid sm:grid-cols-2 gap-3">
            <Link href="/glossary/homestead-portability" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Homestead Portability Savings</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
            <Link href="/knowledge-hub/how-much-are-closing-costs-for-sellers-in-hillsborough-county" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Hillsborough Seller Closing Guide</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
            <Link href="/hub/carrollwood-northdale-homes" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Carrollwood &amp; Northdale Hub</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
            <Link href="/glossary/four-point-inspection" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Pre-Listing 4-Point Inspection</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <ToolLeadCaptureCard
            intentTag="seller-net-proceeds"
            heading="Get an Exact Seller Net Sheet"
            subheading="Want a line-by-line net sheet backed by active Tampa Bay comps and zero guesswork on HOA/CDD payoffs? Send your scenario below."
            summaryText={`Est. Sale: ${formatUsd(salePrice)} | Payoff: ${formatUsd(mortgagePayoff)} | Est. Net: ${formatUsd(breakdown.netProceeds)}`}
          />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


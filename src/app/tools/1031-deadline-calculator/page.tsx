"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, Clock } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import ToolLeadCaptureCard from "@/components/ToolLeadCaptureCard";

function addDays(dateStr: string, days: number): Date {
  const base = new Date(`${dateStr}T12:00:00`);
  const copy = new Date(base.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Exchange1031CalculatorPage() {
  const [closingDate, setClosingDate] = useState("2026-12-01");

  const timeline = useMemo(() => {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(closingDate);
    if (!valid) return null;
    const closeObj = addDays(closingDate, 0);
    const day45 = addDays(closingDate, 45);
    const day180 = addDays(closingDate, 180);
    return {
      closeLabel: formatDate(closeObj),
      day45Label: formatDate(day45),
      day180Label: formatDate(day180),
      day45Iso: day45.toISOString().slice(0, 10),
      day180Iso: day180.toISOString().slice(0, 10),
    };
  }, [closingDate]);

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
            <span className="text-[#D4AF37]">1031 Deadline Calculator</span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <Clock className="w-4 h-4" /> IRS Section 1031 Exchange Timeline
          </span>
          <h1 className="font-aiveritas text-3xl md:text-5xl text-white max-w-4xl mb-4 leading-tight">
            1031 Exchange 45-Day &amp; 180-Day Deadline Calculator
          </h1>
          <p className="text-white/75 text-base md:text-lg font-light max-w-3xl">
            Enter your relinquished sale closing date to calculate your exact federal 45-day identification deadline and 180-day acquisition deadline.
          </p>
        </div>
      </section>

      <section className="py-14 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#111]/70 block mb-2">
                Relinquished Property Closing Date (Day 0)
              </label>
              <input
                type="date"
                value={closingDate}
                onChange={(e) => setClosingDate(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 rounded-xl border border-[#111]/15 font-bold text-lg"
              />
              <p className="text-xs text-[#111]/55 mt-2">
                Note: IRS Section 1031 clocks count strict calendar days including weekends and holidays. Confirm your tax return due date does not shorten Day 180 without an IRS extension.
              </p>
            </div>

            {timeline && (
              <div className="grid sm:grid-cols-2 gap-5 pt-4 border-t border-[#111]/10">
                <div className="p-6 rounded-2xl bg-[#111] text-white border border-[#D4AF37]/40">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5" /> Day 45 Identification Deadline
                  </span>
                  <div className="font-aiveritas text-2xl text-white mb-1">{timeline.day45Label}</div>
                  <p className="text-xs text-white/65">Written identification due to your Qualified Intermediary by midnight.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f5f3ef] border border-[#111]/15">
                  <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5" /> Day 180 Exchange Closing Deadline
                  </span>
                  <div className="font-aiveritas text-2xl text-[#111] mb-1">{timeline.day180Label}</div>
                  <p className="text-xs text-[#111]/65">Replacement closing must fund and record on or before this date.</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 shadow-sm space-y-4">
            <h2 className="font-aiveritas text-2xl text-[#111]">
              IRS Identification Rules at a Glance
            </h2>
            <ul className="space-y-3 text-sm text-[#111]/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                <span><strong>3-Property Rule:</strong> Identify up to 3 replacement properties regardless of combined market value.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                <span><strong>200% Rule:</strong> Identify 4 or more properties as long as total combined value does not exceed 200% of the relinquished sale price.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                <span><strong>Equal or Up Rule:</strong> Reinvest 100% of net equity and acquire equal or greater value (plus debt replacement) to defer all capital gains tax.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#111]/10 grid sm:grid-cols-2 gap-3">
            <Link href="/glossary/1031-exchange" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>1031 Exchange Glossary Guide</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
            <Link href="/tools/cap-rate-calculator" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Commercial Cap Rate Calculator</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
            <Link href="/hub/commercial-tampa-bay" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Tampa Bay Commercial Hub</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
            <Link href="/hub/land-acreage-central-florida" className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 font-bold text-sm flex items-center justify-between">
              <span>Central Florida Land &amp; Acreage Hub</span>
              <ArrowRight className="w-4 h-4 text-[#9A7D3A]" />
            </Link>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <ToolLeadCaptureCard
            intentTag="1031-deadline-calculator"
            heading="Pre-Identify Replacement Options"
            subheading="Share your timeline so Mark & Rachael can line up off-market and listed Tampa Bay commercial or land replacements before Day 45."
            summaryText={
              timeline
                ? `Closing: ${closingDate} | Day 45 ID: ${timeline.day45Iso} | Day 180 Close: ${timeline.day180Iso}`
                : `Closing: ${closingDate}`
            }
          />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


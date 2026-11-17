import Link from "next/link";
import type { Metadata } from "next";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { getLiveMarketReports, isMarketReportsEnabled } from "@/data/marketReports";
import { buildPageMetadata } from "@/lib/seo";

const enabled = isMarketReportsEnabled();

export const metadata: Metadata = buildPageMetadata({
  title: "Tampa Bay Market Reports | Davis & Garnett",
  description:
    "Verified monthly residential and commercial statistics across Hillsborough, Pinellas, and Pasco counties.",
  path: "/market-reports",
  noIndex: !enabled,
});

export default function MarketReportsHubPage() {
  const liveReports = getLiveMarketReports();

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      <ProposalNav />

      <section className="pt-36 pb-16 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] block mb-3">
            Verified MLS &amp; County Data
          </span>
          <h1 className="font-aiveritas text-4xl md:text-6xl text-white mb-4">
            Tampa Bay Market Reports
          </h1>
          <p className="text-white/75 text-base md:text-lg font-light max-w-2xl leading-relaxed">
            Monthly neighborhood housing and commercial benchmarks sourced directly from verified MLS and county property records.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          {!enabled || liveReports.length === 0 ? (
            <div className="max-w-2xl bg-[#f5f3ef] border border-[#D4AF37]/40 rounded-2xl p-8 md:p-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] block mb-2">
                Reports Preparing for Release
              </span>
              <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-3">
                Custom Market Comps Available on Request
              </h2>
              <p className="text-sm text-[#111]/75 leading-relaxed mb-6">
                Our public monthly statistical archive is being finalized with verified county figures. Need live pricing comps or cap rates today? Request a custom snapshot directly from Mark Davis &amp; Rachael Garnett.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
              >
                Request Custom Market Comps
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveReports.map((report) => (
                <Link
                  key={report.slug}
                  href={`/market-reports/${report.slug}`}
                  className="p-6 rounded-2xl bg-[#fbfbf9] border border-[#111]/10 hover:border-[#D4AF37] transition-all"
                >
                  <div className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold mb-1">
                    {report.county} &bull; {report.month}
                  </div>
                  <h2 className="font-aiveritas text-2xl text-[#111] mb-2">{report.title}</h2>
                  <p className="text-xs text-[#111]/70 line-clamp-3 mb-4">{report.quickAnswer}</p>
                  <div className="text-xs font-bold text-[#111]">
                    Median: {report.medianPrice} &bull; {report.daysOnMarket} DOM
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


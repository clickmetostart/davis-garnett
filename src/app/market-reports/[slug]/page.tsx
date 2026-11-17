import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronDown, Sparkles } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { getLiveMarketReports, MARKET_REPORTS } from "@/data/marketReports";
import { buildPageMetadata, SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

export function generateStaticParams() {
  return getLiveMarketReports().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const liveReports = getLiveMarketReports();
  const report = liveReports.find((r) => r.slug === slug);

  if (!report) {
    return buildPageMetadata({
      title: "Market Report | Davis & Garnett",
      description: "Tampa Bay market statistics and verified local trend data.",
      path: `/market-reports/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${report.title} | Davis & Garnett`,
    description: report.quickAnswer,
    path: `/market-reports/${report.slug}`,
    image: "/placeholders/dg-brand-placeholder.webp",
    type: "article",
  });
}

export default async function MarketReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const liveReports = getLiveMarketReports();
  const report = liveReports.find((r) => r.slug === slug);

  if (!report) {
    const isDraft = MARKET_REPORTS.some((r) => r.slug === slug);
    if (!isDraft) notFound();
    notFound();
  }

  const pageUrl = `${SITE_URL}/market-reports/${report.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: report.title,
        description: report.quickAnswer,
        image: `${SITE_URL}/placeholders/dg-brand-placeholder.webp`,
        datePublished: report.publishedAt,
        dateModified: report.updatedAt,
        mainEntityOfPage: pageUrl,
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett Commercial & Residential Advisors — Align Right Realty Carrollwood",
          url: SITE_URL,
          sameAs: TEAM_SAME_AS,
        },
      },
      {
        "@type": "Dataset",
        name: `${report.county} ${report.segment} Market Statistics — ${report.month}`,
        description: report.quickAnswer,
        temporalCoverage: report.dataAsOf,
        creator: {
          "@type": "Organization",
          name: report.source,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProposalNav />

      <section className="pt-36 pb-16 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <Link
            href="/market-reports"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Market Reports
          </Link>
          <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-3">
            {report.county} &bull; {report.segment} &bull; {report.month}
          </div>
          <h1 className="font-aiveritas text-4xl md:text-5xl text-white mb-4">{report.title}</h1>
          <p className="text-xs text-white/65">
            Source: {report.source} &bull; Data as of {report.dataAsOf}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
              <Sparkles className="w-4 h-4" /> Quick Answer
            </div>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
              {report.quickAnswer}
            </p>
          </div>

          <div className="overflow-x-auto border border-[#111]/10 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f5f3ef] text-xs uppercase tracking-wider text-[#9A7D3A]">
                <tr>
                  <th className="p-4">Metric</th>
                  <th className="p-4">Recorded Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111]/10 text-sm">
                <tr><td className="p-4 font-semibold">County / Segment</td><td className="p-4">{report.county} — {report.segment}</td></tr>
                <tr><td className="p-4 font-semibold">Median Price</td><td className="p-4">{report.medianPrice}</td></tr>
                <tr><td className="p-4 font-semibold">Median Days on Market</td><td className="p-4">{report.daysOnMarket}</td></tr>
                <tr><td className="p-4 font-semibold">Sale-to-List Ratio</td><td className="p-4">{report.saleToListRatio}</td></tr>
                <tr><td className="p-4 font-semibold">Active Inventory</td><td className="p-4">{report.activeInventory}</td></tr>
                <tr><td className="p-4 font-semibold">Months of Supply</td><td className="p-4">{report.monthsSupply}</td></tr>
              </tbody>
            </table>
            <div className="px-4 py-3 bg-[#fbfbf9] text-xs text-[#111]/60 border-t border-[#111]/10">
              Source: {report.source} &bull; Data as of {report.dataAsOf}
            </div>
          </div>

          {report.faqs.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-aiveritas text-3xl text-[#111]">Frequently Asked Questions</h2>
              {report.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  open={idx === 0}
                  className="group bg-[#f5f3ef] border border-[#111]/10 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-[#111]">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 text-[#9A7D3A]" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[#111]/75 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, MapPin, ShieldCheck } from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { LIVE_GLOSSARY_TERMS } from "@/data/glossary";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Florida Real Estate Glossary | CDD, HOA, 1031, BPO & Wind Mitigation",
  description:
    "Plain-English explanations of Florida and Tampa Bay real estate terms including CDD fees, 1031 exchanges, Broker Price Opinions, 4-Point inspections, and Homestead Portability.",
  path: "/glossary",
});

const CATEGORY_ORDER = [
  "Communities & Land",
  "Taxes & Exemptions",
  "Insurance & Inspections",
  "Commercial & Investment",
] as const;

export default function GlossaryIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        name: "Tampa Bay & Florida Real Estate Glossary",
        url: `${SITE_URL}/glossary`,
        hasDefinedTerm: LIVE_GLOSSARY_TERMS.map((term) => ({
          "@type": "DefinedTerm",
          name: term.term,
          url: `${SITE_URL}/glossary/${term.slug}`,
          description: term.quickAnswer,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Florida Real Estate Glossary", item: `${SITE_URL}/glossary` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] font-sans">
      <ProposalNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-36 pb-16 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-6">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub" className="hover:text-[#D4AF37]">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">Glossary</span>
          </nav>

          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <BookOpen className="w-4 h-4" /> Plain-English Field Manual
          </span>
          <h1 className="font-aiveritas text-4xl md:text-6xl text-white max-w-4xl mb-5 leading-tight">
            Florida &amp; Tampa Bay Real Estate Glossary
          </h1>
          <p className="text-white/75 text-base md:text-xl font-light max-w-3xl leading-relaxed">
            Clear definitions, real Hillsborough, Pinellas, Pasco, and Polk County examples, and how Mark Davis (FL Lic #3209459) and Rachael Garnett (FL Lic #3378601) navigate each rule before you sign.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-8 max-w-screen-xl mx-auto space-y-14">
        {CATEGORY_ORDER.map((category) => {
          const items = LIVE_GLOSSARY_TERMS.filter((t) => t.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#111]/10 pb-3">
                <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111]">{category}</h2>
                <span className="text-xs uppercase tracking-widest font-bold text-[#9A7D3A]">
                  {items.length} Terms
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group bg-white rounded-2xl p-7 border border-[#111]/10 hover:border-[#D4AF37] shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block mb-2">
                        {term.shortTitle}
                      </span>
                      <h3 className="font-aiveritas text-xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-3">
                        {term.term}
                      </h3>
                      <p className="text-sm text-[#111]/70 font-light leading-relaxed line-clamp-4">
                        {term.quickAnswer}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#111]/8 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111] group-hover:text-[#9A7D3A]">
                      <span>Read Full Definition</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Cross-Links to Calculators & Topic Hubs */}
        <div className="bg-[#111] text-white rounded-2xl p-8 md:p-10 grid md:grid-cols-3 gap-6">
          <Link href="/tools/cap-rate-calculator" className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <Calculator className="w-5 h-5 text-[#D4AF37] mb-3" />
            <div className="font-aiveritas text-xl mb-1">Cap Rate &amp; NOI Calculator</div>
            <p className="text-xs text-white/70 font-light">Test commercial cash flow and NNN yields across Tampa Bay.</p>
          </Link>
          <Link href="/tools/1031-deadline-calculator" className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] mb-3" />
            <div className="font-aiveritas text-xl mb-1">1031 Exchange Timeline Tool</div>
            <p className="text-xs text-white/70 font-light">Compute exact Day 45 ID and Day 180 closing deadlines.</p>
          </Link>
          <Link href="/hub/commercial-tampa-bay" className="p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <MapPin className="w-5 h-5 text-[#D4AF37] mb-3" />
            <div className="font-aiveritas text-xl mb-1">Corridor &amp; Audience Hubs</div>
            <p className="text-xs text-white/70 font-light">Explore curated 55+, waterfront, commercial, and acreage hubs.</p>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


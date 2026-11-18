import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  MapPin,
  Sparkles,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { GlossaryAutoText } from "@/components/GlossaryAutoText";
import {
  getGlossaryTermBySlug,
  getRelatedGlossaryTermsForTaxonomy,
  LIVE_GLOSSARY_TERMS,
} from "@/data/glossary";
import { getRelatedGuidesForTags } from "@/lib/spiderweb";
import { getTaxonomyForGlossaryTerm } from "@/lib/spiderweb";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ term: string }>;
}

export async function generateStaticParams() {
  return LIVE_GLOSSARY_TERMS.map((item) => ({ term: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term: slug } = await params;
  const term = getGlossaryTermBySlug(slug);
  if (!term) return {};

  return buildPageMetadata({
    title: `${term.term} Explained | FL Real Estate Glossary`,
    description: term.quickAnswer,
    path: `/glossary/${term.slug}`,
    image: "/placeholders/dg-brand-placeholder.webp",
    type: "article",
  });
}

const SERVICE_LABEL_MAP: Record<string, string> = {
  "/tools/mortgage-calculator": "Florida Mortgage & CDD Calculator",
  "/tools/commercial-rent-calculator": "Commercial Rent & NNN Calculator",
  "/tools/1031-deadline-calculator": "1031 Exchange Deadline Calculator",
  "/tools/cap-rate-calculator": "Commercial Cap Rate Calculator",
  "/tools/seller-net-proceeds": "Florida Seller Net Proceeds Calculator",
  "/commercial": "Commercial Realtor Hub",
  "/residential": "Residential Realtor Hub",
  "/commercial/get-started": "Commercial Getting Started Worksheet",
  "/residential/get-started": "Residential Getting Started Worksheet",
  "/align-right-carrollwood-coverage": "Tampa Bay Areas & Coverage",
  "/developments": "New Developments & Communities",
  "/hub/commercial-tampa-bay": "Tampa Bay Commercial Hub",
  "/hub/waterfront-st-petersburg": "St. Petersburg Waterfront Hub",
  "/hub/land-acreage-central-florida": "Central Florida Land & Acreage Hub",
  "/contact": "Talk With Mark & Rachael",
};

export default async function GlossaryTermPage({ params }: PageProps) {
  const { term: slug } = await params;
  const term = getGlossaryTermBySlug(slug);
  if (!term) notFound();

  const tags = getTaxonomyForGlossaryTerm(term);
  const relatedGuides = getRelatedGuidesForTags(tags, term.relatedGuideSlugs, undefined, 4);
  const siblingTerms = getRelatedGlossaryTermsForTaxonomy({
    text: term.term,
    explicitSlugs: term.relatedGlossarySlugs,
    propertyType: term.propertyType,
    audience: term.audience,
    county: term.county,
    corridor: term.corridor,
    excludeSlug: term.slug,
    limit: 3,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        name: term.term,
        description: term.quickAnswer,
        inDefinedTermSet: `${SITE_URL}/glossary`,
        url: `${SITE_URL}/glossary/${term.slug}`,
      },
      {
        "@type": "Article",
        headline: `${term.term}: What Tampa Bay Buyers, Sellers & Investors Need to Know`,
        description: term.quickAnswer,
        image: `${SITE_URL}/placeholders/dg-brand-placeholder.webp`,
        mainEntityOfPage: `${SITE_URL}/glossary/${term.slug}`,
        datePublished: term.publishedAt,
        dateModified: term.updatedAt,
        author: [
          { "@type": "Person", name: "Mark Davis", identifier: "FL Lic BK3209459" },
          { "@type": "Person", name: "Rachael Garnett", identifier: "FL Lic SL3378601" },
        ],
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
          url: SITE_URL,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: term.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
          { "@type": "ListItem", position: 3, name: term.shortTitle, item: `${SITE_URL}/glossary/${term.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      <ProposalNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-36 pb-16 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-[#D4AF37]">Glossary</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">{term.shortTitle}</span>
          </nav>

          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Glossary Terms
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-white/75 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#111] font-bold rounded-sm">
              {term.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Last updated {term.updatedAt.slice(0, 10)}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl md:text-5xl text-white max-w-4xl leading-tight mb-4">
            What Is a {term.term} in Florida Real Estate?
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-3xl font-light">
            Advised by Mark Davis (FL Lic BK3209459) &amp; Rachael Garnett (FL Lic SL3378601) — Align Right Realty Carrollwood
          </p>
        </div>
      </section>

      <section className="py-16 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-12 items-start">
        <div className="space-y-10">
          {/* Quick Answer Box */}
          <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
              <Sparkles className="w-4 h-4" /> Quick Answer
            </div>
            <p className="text-sm md:text-base text-white/95 leading-relaxed font-light">
              {term.quickAnswer}
            </p>
          </div>

          {/* Detailed Definition */}
          <div className="space-y-5">
            <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
              How It Works Under Florida Law &amp; Practice
            </h2>
            {term.definition.map((para, idx) => (
              <p key={idx} className="text-[#111]/80 text-base md:text-lg font-light leading-relaxed">
                <GlossaryAutoText text={para} excludeSlug={term.slug} />
              </p>
            ))}
          </div>

          {/* Local Tampa Bay Example */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#f5f3ef] border-l-4 border-[#D4AF37]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#9A7D3A] mb-3">
              <MapPin className="w-4 h-4" /> Tampa Bay &amp; Central Florida Example
            </div>
            <p className="text-sm md:text-base text-[#111]/85 leading-relaxed">
              <GlossaryAutoText text={term.tampaBayExample} excludeSlug={term.slug} />
            </p>
          </div>

          {/* How Mark & Rachael Handle It */}
          <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block mb-2">
              Local Advisor Playbook
            </span>
            <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
              How Mark &amp; Rachael Handle It
            </h3>
            <p className="text-sm md:text-base text-[#111]/80 leading-relaxed font-light">
              {term.howWeHandleIt}
            </p>
          </div>

          {/* FAQs */}
          {term.faqs.length > 0 && (
            <div className="pt-6 border-t border-[#111]/10 space-y-4">
              <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
                Common Questions About {term.shortTitle}
              </h2>
              {term.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  open={idx === 0}
                  className="group bg-[#f5f3ef] border border-[#111]/10 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-[#111]">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-[#9A7D3A] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm md:text-base text-[#111]/75 font-light leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Related Guides, Tools & Sibling Terms */}
        <aside className="space-y-8 lg:sticky lg:top-28">
          {relatedGuides.length > 0 && (
            <div className="bg-[#f5f3ef] rounded-2xl p-7 border border-[#111]/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D3A]">
                <BookOpen className="w-4 h-4" /> Related Guides &amp; Q&amp;As
              </div>
              <div className="space-y-3">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/knowledge-hub/${g.slug}`}
                    className="block p-4 bg-white rounded-xl border border-[#111]/10 hover:border-[#D4AF37] transition-colors"
                  >
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block mb-1">
                      {g.category}
                    </span>
                    <span className="text-sm font-bold text-[#111]">{g.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {term.relatedServiceRoutes.length > 0 && (
            <div className="bg-[#111] text-white rounded-2xl p-7 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block">
                Tools &amp; Next Steps
              </span>
              {term.relatedServiceRoutes.map((route) => (
                <Link
                  key={route}
                  href={route}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>{SERVICE_LABEL_MAP[route] || route}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          )}

          {siblingTerms.length > 0 && (
            <div className="bg-white rounded-2xl p-7 border border-[#111]/10 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] block">
                Related Glossary Terms
              </span>
              {siblingTerms.map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/glossary/${sib.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/15 text-xs font-bold text-[#111]"
                >
                  <span>{sib.term}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3A]" />
                </Link>
              ))}
            </div>
          )}
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


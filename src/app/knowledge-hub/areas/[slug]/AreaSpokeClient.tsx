"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Building2,
  BookOpen,
  Search,
  Sparkles,
  Compass,
  Download,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import GuideDownloadModal from "@/components/GuideDownloadModal";
import { GlossaryAutoText } from "@/components/GlossaryAutoText";
import { getRelatedGlossaryTermsForTaxonomy } from "@/data/glossary";
import { LIVE_GUIDED_TOURS } from "@/data/tours";
import type { AreaItem, KnowledgeItem } from "@/data/knowledgeHub";
import type { Development } from "@/data/developments";

interface Props {
  area: AreaItem;
  otherAreas: AreaItem[];
  relatedGuides: KnowledgeItem[];
  relatedDevelopments: Development[];
}

export default function AreaSpokeClient({
  area,
  otherAreas,
  relatedGuides,
  relatedDevelopments,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const matchingTours = LIVE_GUIDED_TOURS.filter((t) =>
    t.relatedAreaSlugs.includes(area.slug)
  );
  const primaryTour = matchingTours[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const cat = area.slug.includes("acreage")
        ? "land"
        : area.slug.includes("brandon")
        ? "commercial"
        : "consultation";
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          category: cat,
          subject: `${area.name} Area Inquiry`,
          message: notes,
          source: `Neighborhood Guide (${area.name})`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const quickAnswerText = area.quickAnswer || `${area.tagline} — ${area.overview}`;
  const usedGlossarySlugs = new Set<string>();
  const lastUpdatedLabel = (area.updatedAt || area.publishedAt || "2026-11-17").slice(0, 10);
  const relatedGlossary = getRelatedGlossaryTermsForTaxonomy({
    text: `${area.name} ${area.tagline} ${area.overview}`,
    city: area.name,
    explicitSlugs: area.relatedGlossarySlugs,
    propertyType: area.propertyType,
    audience: area.audience,
    county: area.countyTags,
    corridor: area.corridor,
    limit: 4,
  });

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <Image src={area.heroImage} alt={area.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub#areas" className="hover:text-[#D4AF37] transition-colors">Areas We Serve</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">{area.name}</span>
          </nav>

          <Link
            href="/knowledge-hub#areas"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Areas We Work In
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-white/75 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#111] font-bold rounded-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {area.county}
            </span>
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> {area.yoyGrowth}
            </span>
            <span className="text-white/65">Last updated {lastUpdatedLabel}</span>
          </div>

          <h1 className="font-aiveritas text-4xl md:text-6xl text-white max-w-4xl mb-4 leading-tight">
            {area.name}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-3xl mb-7">
            {area.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link
              href={primaryTour ? `/tours/${primaryTour.slug}` : "/tours"}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-[0.16em] rounded-lg transition-colors shadow-lg"
            >
              <Compass className="w-4 h-4" />
              {primaryTour ? `Take ${area.name} Tour` : "View Guided Area Tours"}
            </Link>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#111] border border-white/25 text-xs font-bold uppercase tracking-[0.16em] rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" /> Download Pocket Area Guide (PDF)
            </button>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                Price Spectrum
              </span>
              <span className="font-aiveritas text-xl text-white">{area.medianPrice}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                Annual Appreciation
              </span>
              <span className="font-aiveritas text-xl text-white">{area.yoyGrowth}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                Lifestyle Profile
              </span>
              <span className="text-sm text-white/90 font-medium">{area.vibe}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 px-6 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            {/* Quick Answer */}
            <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 mb-10 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                <Sparkles className="w-4 h-4" /> Area At-a-Glance
              </div>
              <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
                <GlossaryAutoText text={quickAnswerText} usedSlugs={usedGlossarySlugs} />
              </p>
            </div>

            <h2 className="font-aiveritas text-3xl text-[#111] mb-4">
              Market Overview &amp; Neighborhood Intelligence
            </h2>
            <p className="text-[#111]/75 text-base md:text-lg font-light leading-relaxed mb-10">
              <GlossaryAutoText text={area.overview} usedSlugs={usedGlossarySlugs} />
            </p>

            {/* Top Neighborhoods Chips */}
            <div className="bg-[#f5f3ef] p-6 md:p-8 rounded-2xl border border-[#111]/10 mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7D3A] block mb-4">
                Key Enclaves &amp; Corridors in {area.name}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {area.topNeighborhoods.map((n) => (
                  <div
                    key={n}
                    className="p-3.5 bg-white rounded-xl border border-[#111]/10 text-xs font-bold text-[#111] flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Sections */}
            <div className="space-y-10">
              {area.sections.map((sec, idx) => (
                <div key={idx}>
                  <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
                    {sec.heading}
                  </h3>
                  <p className="text-[#111]/75 font-light leading-relaxed text-base md:text-lg">
                    <GlossaryAutoText text={sec.body} usedSlugs={usedGlossarySlugs} />
                  </p>
                </div>
              ))}
            </div>

            {/* How Mark & Rachael Handle It + Glossary Terms */}
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-[#f5f3ef] border border-[#D4AF37]/40 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block">
                Local Advisor Playbook
              </span>
              <h3 className="font-aiveritas text-2xl text-[#111]">
                How Mark &amp; Rachael Advise Buyers &amp; Sellers in {area.name}
              </h3>
              <p className="text-sm md:text-base text-[#111]/80 leading-relaxed font-light">
                {area.howWeHandleIt ||
                  `In ${area.name}, property taxes, flood elevations, HOA/CDD budgets, and roof-age underwriting vary block by block. Mark Davis (FL Lic BK3209459) and Rachael Garnett (FL Lic SL3378601) compare true carrying costs and micro-street comps before you write an offer or price a home.`}
              </p>
              {relatedGlossary.length > 0 && (
                <div className="pt-3 border-t border-[#111]/10 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] mr-1">
                    Key Terms:
                  </span>
                  {relatedGlossary.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#111]/12 hover:border-[#D4AF37] text-xs font-bold text-[#111] transition-colors"
                    >
                      {term.shortTitle}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Portfolio + Search MLS Links */}
            <div className="mt-12 p-6 md:p-8 bg-[#111] text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold block mb-1">
                  Active Listings &amp; MLS Search
                </span>
                <h4 className="font-aiveritas text-2xl text-white">
                  Explore Davis &amp; Garnett Homes in This Corridor
                </h4>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/search-mls"
                  className="px-5 py-3 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" /> Search MLS
                </Link>
                <Link
                  href="/properties"
                  className="px-5 py-3 bg-white/10 hover:bg-white text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2"
                >
                  View Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Spiderweb Related Guides & Developments */}
            {(relatedGuides.length > 0 || relatedDevelopments.length > 0) && (
              <div className="mt-14 pt-12 border-t border-[#111]/10 space-y-6">
                <div>
                  <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
                    Connected Planning Resources
                  </span>
                  <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
                    Guides &amp; Communities for {area.name}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedGuides.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/knowledge-hub/${g.slug}`}
                      className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 border border-[#111]/10 flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {g.category}
                        </span>
                        <div className="text-sm font-bold text-[#111] group-hover:text-[#9A7D3A]">
                          {g.title}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    </Link>
                  ))}
                  {relatedDevelopments.map((dev) => (
                    <Link
                      key={dev.slug}
                      href={`/developments/${dev.slug}`}
                      className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 border border-[#111]/10 flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> Development
                        </span>
                        <div className="text-sm font-bold text-[#111] group-hover:text-[#9A7D3A]">
                          {dev.name}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Area FAQs */}
            {area.faqs.length > 0 && (
              <div className="mt-14 pt-12 border-t border-[#111]/10">
                <h3 className="font-aiveritas text-3xl text-[#111] mb-6">
                  Local Questions &amp; Answers
                </h3>
                <div className="space-y-4">
                  {area.faqs.map((f, i) => (
                    <details
                      key={i}
                      open
                      className="group bg-[#f5f3ef] border border-[#111]/10 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[#111]">
                        <span>{f.question}</span>
                        <ChevronDown className="w-5 h-5 text-[#9A7D3A]" />
                      </summary>
                      <div className="px-6 pb-6 text-sm md:text-base text-[#111]/75 font-light leading-relaxed">
                        {f.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8">
              <div className="h-1 w-full bg-[#D4AF37] rounded-full mb-6" />
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
                  <h4 className="font-aiveritas text-2xl text-[#111] mb-2">Request Received</h4>
                  <p className="text-sm text-[#111]/70 font-light">
                    We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP. We will send curated listings and market comps for {area.name}.
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                    Hyper-Local Advisory
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                    Request {area.name} Listings &amp; Local Insights
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
                    />
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us what you are looking for in this area..."
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                    >
                      {submitting ? "Sending..." : "Get Custom Area Report"}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="bg-white border border-[#111]/10 rounded-2xl p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-4">Other Areas We Serve</h4>
              <div className="space-y-3">
                {otherAreas.map((oa) => (
                  <Link
                    key={oa.slug}
                    href={`/knowledge-hub/areas/${oa.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/20 text-xs font-bold text-[#111] transition-colors"
                  >
                    <span>{oa.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3A]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GuideDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        title={`${area.name} — Neighborhood Pocket Guide`}
        category={area.county}
        slug={area.slug}
        contentType="area"
        quickAnswer={quickAnswerText}
        authorName="Mark Davis & Rachael Garnett"
      />

      <SiteFooter />
    </div>
  );
}


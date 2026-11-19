"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  Download,
  Sparkles,
  BookOpen,
  MapPin,
  Search,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import GuideDownloadModal from "@/components/GuideDownloadModal";
import { GlossaryAutoText } from "@/components/GlossaryAutoText";
import { getRelatedGlossaryTermsForTaxonomy } from "@/data/glossary";
import type { ArticleItem, KnowledgeItem, AreaItem } from "@/data/knowledgeHub";

interface Props {
  article: ArticleItem;
  otherArticles: ArticleItem[];
  relatedGuides: KnowledgeItem[];
  relatedAreas: AreaItem[];
}

export default function ArticleSpokeClient({
  article,
  otherArticles,
  relatedGuides,
  relatedAreas,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          category: "consultation",
          subject: article.title,
          message: notes,
          source: `Market Update (${article.slug})`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const quickAnswerText = article.quickAnswer || article.summary;
  const usedGlossarySlugs = new Set<string>();
  const lastUpdatedLabel = (article.updatedAt || article.publishedAt || article.publishDate || "2026-11-17").slice(0, 10);
  const relatedGlossary = getRelatedGlossaryTermsForTaxonomy({
    text: `${article.title} ${article.summary} ${article.sections.map((s) => s.body).join(" ")}`,
    category: article.category,
    explicitSlugs: article.relatedGlossarySlugs,
    propertyType: article.propertyType,
    audience: article.audience,
    county: article.county,
    corridor: article.corridor,
    limit: 4,
  });

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      <section className="relative pt-36 pb-20 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={article.heroImage} alt={article.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub#articles" className="hover:text-[#D4AF37] transition-colors">Market Intelligence</Link>
            <span>/</span>
            <span className="text-[#D4AF37] truncate max-w-xs sm:max-w-md">{article.title}</span>
          </nav>

          <Link
            href="/knowledge-hub#articles"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Market Intelligence
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-white/75 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#111] font-bold rounded-sm">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Last updated {lastUpdatedLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl mb-8">
            {article.summary}
          </p>

          <button
            type="button"
            onClick={() => setDownloadModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Download Formatted Report (PDF)
          </button>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            {quickAnswerText && (
              <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 mb-10 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                  <Sparkles className="w-4 h-4" /> Quick Summary
                </div>
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
                  <GlossaryAutoText text={quickAnswerText} usedSlugs={usedGlossarySlugs} />
                </p>
              </div>
            )}

            <div className="bg-[#f5f3ef] border-l-4 border-[#D4AF37] p-6 md:p-8 rounded-r-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7D3A] block mb-4">
                Report Highlights
              </span>
              <ul className="space-y-3">
                {article.keyTakeaways.map((kt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-[#111]/85">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span><GlossaryAutoText text={kt} usedSlugs={usedGlossarySlugs} /></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-[#111]/10">
              <Image src={article.heroImage} alt={article.title} fill className="object-cover" />
            </div>

            <div className="space-y-10">
              {article.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
                    {sec.heading}
                  </h2>
                  <p className="text-[#111]/75 text-base md:text-lg font-light leading-relaxed">
                    <GlossaryAutoText text={sec.body} usedSlugs={usedGlossarySlugs} />
                  </p>
                </div>
              ))}
            </div>

            {/* How Mark & Rachael Handle It + Glossary Terms */}
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-[#f5f3ef] border border-[#D4AF37]/40 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block">
                Advisor Perspective
              </span>
              <h3 className="font-aiveritas text-2xl text-[#111]">
                How Mark &amp; Rachael Apply This Data for Clients
              </h3>
              <p className="text-sm md:text-base text-[#111]/80 leading-relaxed font-light">
                {article.howWeHandleIt ||
                  "Mark Davis (FL Lic BK3209459) and Rachael Garnett (FL Lic SL3378601) pair county property-appraiser records, active inventory trends, and carrier underwriting rules so buyers and sellers price off real closed outcomes rather than headlines."}
              </p>
              {relatedGlossary.length > 0 && (
                <div className="pt-3 border-t border-[#111]/10 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] mr-1">
                    Glossary:
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

            {/* Connected Spiderweb Links + MLS/Contact Banner */}
            {(relatedGuides.length > 0 || relatedAreas.length > 0) && (
              <div className="mt-14 pt-12 border-t border-[#111]/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-1">
                      Dive Deeper
                    </span>
                    <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
                      Related Guides &amp; Tampa Bay Areas
                    </h3>
                  </div>
                  <Link
                    href="/search-mls"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shrink-0"
                  >
                    <Search className="w-3.5 h-3.5" /> Search Live MLS
                  </Link>
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
                  {relatedAreas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/knowledge-hub/areas/${area.slug}`}
                      className="p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 border border-[#111]/10 flex items-center justify-between gap-3 transition-colors group"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#9A7D3A] font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Area Guide
                        </span>
                        <div className="text-sm font-bold text-[#111] group-hover:text-[#9A7D3A]">
                          {area.name}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8">
              <div className="h-1 w-full bg-[#D4AF37] rounded-full mb-6" />
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
                  <h4 className="font-aiveritas text-2xl text-[#111] mb-2">Request Received</h4>
                  <p className="text-sm text-[#111]/70 font-light">
                    We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP.
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                    Market Intelligence Briefing
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                    Request Custom Market Comps &amp; Insights
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name *"
                        className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name *"
                        className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs"
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
                      placeholder="Questions or Notes (Optional)"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs resize-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                    >
                      {submitting ? "Sending..." : "Request Full Market Report"}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="bg-white border border-[#111]/10 rounded-2xl p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-4">Related Market Updates</h4>
              <div className="space-y-3">
                {otherArticles.map((oa) => (
                  <Link
                    key={oa.slug}
                    href={`/knowledge-hub/articles/${oa.slug}`}
                    className="block p-3.5 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7D3A] block mb-1">
                      {oa.category}
                    </span>
                    <div className="text-xs font-bold text-[#111] flex items-center justify-between gap-2">
                      <span>{oa.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </div>
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
        title={article.title}
        category={article.category}
        slug={article.slug}
        quickAnswer={quickAnswerText}
        keyTakeaways={article.keyTakeaways}
        sections={article.sections}
        authorName={article.author.name}
      />

      <SiteFooter />
    </div>
  );
}


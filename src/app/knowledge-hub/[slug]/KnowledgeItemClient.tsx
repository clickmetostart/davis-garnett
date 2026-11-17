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
  Phone,
  ChevronDown,
  BookOpen,
  Download,
  MapPin,
  Building2,
  Search,
  Sparkles,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import EmailActionBox from "@/components/EmailActionBox";
import GuideDownloadModal from "@/components/GuideDownloadModal";
import InteractiveWorkbook from "@/components/InteractiveWorkbook";
import { GlossaryAutoText } from "@/components/GlossaryAutoText";
import type { PdfWorkbookState } from "@/lib/pdfBuilder";
import { getRelatedGlossaryTermsForTaxonomy } from "@/data/glossary";
import type { KnowledgeItem, AreaItem } from "@/data/knowledgeHub";
import type { Development } from "@/data/developments";

interface Props {
  item: KnowledgeItem;
  relatedItems: KnowledgeItem[];
  relatedAreas: AreaItem[];
  relatedDevelopments: Development[];
}

export default function KnowledgeItemClient({
  item,
  relatedItems,
  relatedAreas,
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
  const [workbookState, setWorkbookState] = useState<PdfWorkbookState>({});
  const isGuide = item.type === "guide";

  const handleLeadSubmit = async (e: React.FormEvent) => {
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
          subject: `Knowledge Hub: ${item.title}`,
          interest: `${item.category}: ${item.title}`,
          assignedAdvisor: item.author.name,
          message: notes,
          source: `Knowledge Hub (${item.slug})`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const quickAnswerText =
    item.quickAnswer || `${item.subtitle} ${item.keyTakeaways[0] || ""}`.trim();

  const usedGlossarySlugs = new Set<string>();
  const lastUpdatedLabel = (item.updatedAt || item.publishedAt || item.publishDate || "2026-11-17").slice(0, 10);
  const relatedGlossary = getRelatedGlossaryTermsForTaxonomy({
    text: `${item.title} ${item.subtitle} ${item.sections.map((s) => s.body).join(" ")}`,
    category: item.category,
    explicitSlugs: item.relatedGlossarySlugs,
    propertyType: item.propertyType,
    audience: item.audience,
    county: item.county,
    corridor: item.corridor,
    limit: 4,
  });
  const howWeHandleText =
    item.howWeHandleIt ||
    `When walking clients through ${item.category.toLowerCase()} decisions in Tampa Bay, Mark Davis (${item.author.license === "FL Lic #3209459" ? "FL Lic #3209459" : "FL Lic #3209459"}) and Rachael Garnett (FL Lic #3378601) verify county records, HOA/CDD budgets, insurance inspectability, and net-proceeds math before an offer or listing ever goes live.`;

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub" className="hover:text-[#D4AF37] transition-colors">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#D4AF37] truncate max-w-xs sm:max-w-md">{item.title}</span>
          </nav>

          <Link
            href="/knowledge-hub"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-white/70 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#111] font-bold rounded-sm">
              {item.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Last updated {lastUpdatedLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.readTime}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl mb-6 leading-tight">
            {item.title}
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl leading-relaxed mb-8">
            {item.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {isGuide && (
              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" /> Download Guide Workbook (PDF)
              </button>
            )}
            <Link
              href={item.ctaHref || "/search-mls"}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
            >
              {item.ctaLabel || "Search Tampa Bay Listings"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-16 md:py-20 px-6 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Content */}
          <div>
            {/* Quick Answer Box (Mobile + AI-Search Extractable) */}
            {quickAnswerText && (
              <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 mb-10 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
                  <Sparkles className="w-4 h-4" /> Quick Answer
                </div>
                <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
                  <GlossaryAutoText text={quickAnswerText} usedSlugs={usedGlossarySlugs} />
                </p>
              </div>
            )}

            {/* Key Takeaways Box */}
            <div className="bg-[#f5f3ef] border-l-4 border-[#D4AF37] p-6 md:p-8 rounded-r-2xl mb-12">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9A7D3A] mb-4">
                <BookOpen className="w-4 h-4" /> Key Takeaways
              </div>
              <ul className="space-y-3">
                {item.keyTakeaways.map((kt, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#111]/85 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span><GlossaryAutoText text={kt} usedSlugs={usedGlossarySlugs} /></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero Visual Inside Article */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-[#111]/10">
              <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
            </div>

            {/* Article Body Sections */}
            <div className="space-y-10">
              {item.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
                    {sec.heading}
                  </h2>
                  <p className="text-[#111]/75 text-base md:text-lg font-light leading-relaxed mb-4">
                    <GlossaryAutoText text={sec.body} usedSlugs={usedGlossarySlugs} />
                  </p>
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2.5 pl-1 mt-4">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-[#111]/80">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                          <span><GlossaryAutoText text={b} usedSlugs={usedGlossarySlugs} /></span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive Workbook for Guides */}
            {isGuide && (
              <InteractiveWorkbook
                slug={item.slug}
                title={item.title}
                subtitle="Check off steps as you review this guide and jot down your own questions or numbers. Everything saves here and prints cleanly in your PDF download."
                items={[
                  ...item.keyTakeaways.slice(0, 4).map((tk, i) => ({
                    key: `takeaway-${i + 1}`,
                    label: tk.length > 75 ? `${tk.slice(0, 72)}...` : tk,
                    placeholder: "Notes, lender quotes, or follow-up questions...",
                  })),
                  ...item.sections.slice(0, 4).map((sec, i) => ({
                    key: `section-${i + 1}`,
                    label: sec.heading,
                    placeholder: `Your notes on ${sec.heading}...`,
                  })),
                ]}
                onStateChange={setWorkbookState}
                onDownloadClick={(latestState) => {
                  setWorkbookState(latestState);
                  setDownloadModalOpen(true);
                }}
              />
            )}

            {/* How Mark & Rachael Handle It */}
            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-[#f5f3ef] border border-[#D4AF37]/40">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block mb-2">
                Local Advisor Playbook
              </span>
              <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                How Mark &amp; Rachael Handle It
              </h3>
              <p className="text-sm md:text-base text-[#111]/80 leading-relaxed font-light">
                <GlossaryAutoText text={howWeHandleText} usedSlugs={usedGlossarySlugs} />
              </p>
              {item.sources && item.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#111]/10 text-xs text-[#111]/65 flex flex-wrap items-center gap-3">
                  <span className="font-bold uppercase tracking-wider text-[#111]/80">Named Sources:</span>
                  {item.sources.map((src, sIdx) =>
                    src.url ? (
                      <a
                        key={sIdx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#9A7D3A]"
                      >
                        {src.label}
                      </a>
                    ) : (
                      <span key={sIdx}>{src.label}</span>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Next-Step Action Banner */}
            <div className="mt-12 p-6 md:p-8 bg-[#f5f3ef] rounded-2xl border border-[#D4AF37]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] block mb-1">
                  Continue Your Search
                </span>
                <h3 className="font-aiveritas text-2xl text-[#111]">
                  See Live Homes or Talk With Our Team
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/search-mls"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  <Search className="w-3.5 h-3.5" /> Search MLS
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#111] text-[#111] hover:text-white border border-[#111]/15 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                >
                  Contact Advisors
                </Link>
              </div>
            </div>

            {/* Frequently Asked Questions */}
            {item.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#111]/10">
                <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-3">
                  Common Questions
                </span>
                <h3 className="font-aiveritas text-3xl text-[#111] mb-8">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {item.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      open={idx === 0}
                      className="group bg-[#f5f3ef] border border-[#111]/10 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-[#111]">
                        <span>{faq.question}</span>
                        <ChevronDown className="w-5 h-5 text-[#9A7D3A] transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-6 text-sm md:text-base text-[#111]/75 font-light leading-relaxed">
                        <GlossaryAutoText text={faq.answer} usedSlugs={usedGlossarySlugs} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Related Glossary Terms */}
            {relatedGlossary.length > 0 && (
              <div className="mt-12 p-6 rounded-2xl bg-[#f5f3ef] border border-[#111]/10">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A]">
                    Plain-English Florida Glossary
                  </span>
                  <Link href="/glossary" className="text-xs font-bold text-[#111] hover:text-[#9A7D3A] underline">
                    All Terms →
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {relatedGlossary.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="px-3.5 py-2 rounded-lg bg-white border border-[#111]/12 hover:border-[#D4AF37] text-xs font-bold text-[#111] transition-colors"
                    >
                      {term.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bidirectional Spiderweb: Matching Areas & Developments */}
            {(relatedAreas.length > 0 || relatedDevelopments.length > 0 || (item.relatedServiceRoutes && item.relatedServiceRoutes.length > 0)) && (
              <div className="mt-14 pt-12 border-t border-[#111]/10 space-y-6">
                <div>
                  <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
                    Connected Local Resources
                  </span>
                  <h3 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
                    Explore Related Areas &amp; Communities
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
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

                {item.relatedServiceRoutes && item.relatedServiceRoutes.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {item.relatedServiceRoutes.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#111]/15 hover:border-[#D4AF37] text-xs font-bold uppercase tracking-wider text-[#111] transition-colors"
                      >
                        <span>{svc.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3A]" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Author Card */}
            <div className="mt-16 p-8 bg-[#111] text-white rounded-2xl flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0">
                <Image
                  src={item.author.image}
                  alt={item.author.name}
                  fill
                  unoptimized
                  className={`object-cover ${
                    item.author.name.includes("Rachael") ? "object-[center_30%]" : "object-top"
                  }`}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold block mb-1">
                  Written &amp; Verified By {item.author.license}
                </span>
                <h4 className="font-aiveritas text-2xl text-white mb-1">{item.author.name}</h4>
                <p className="text-white/70 text-xs mb-4">{item.author.role} • Align Right Realty Carrollwood</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs">
                  <a href={`tel:${item.author.phone.replace(/[^0-9]/g, "")}`} className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white">
                    <Phone className="w-3.5 h-3.5" /> {item.author.phone}
                  </a>
                  <EmailActionBox
                    email={item.author.email}
                    variant="dark"
                    className="font-medium"
                  />
                  <Link href={item.author.profileHref} className="underline text-white/80 hover:text-[#D4AF37]">
                    View Full Profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Consultation Sidebar */}
          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8 shadow-sm">
              <div className="h-1 w-full bg-[#D4AF37] rounded-full mb-6" />
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
                  <h4 className="font-aiveritas text-2xl text-[#111] mb-2">Inquiry Received</h4>
                  <p className="text-sm text-[#111]/70 font-light">
                    We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP. {item.author.name} will be in touch with you directly.
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                    Private Consultation
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                    Discuss Your Strategy With {item.author.name}
                  </h3>
                  <p className="text-xs text-[#111]/65 font-light mb-6 leading-relaxed">
                    Request customized comps, off-market listings, or a 1-on-1 strategy call.
                  </p>
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                    >
                      {submitting ? "Sending..." : "Request Private Advisory"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Topic-Matched Related Guides / Questions */}
            <div className="bg-white border border-[#111]/10 rounded-2xl p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-4">Related Guides &amp; Q&amp;A</h4>
              <div className="space-y-4">
                {relatedItems.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/knowledge-hub/${rel.slug}`}
                    className="block p-3.5 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 transition-colors group"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A7D3A] block mb-1">
                      {rel.category}
                    </span>
                    <div className="text-sm font-bold text-[#111] group-hover:text-[#9A7D3A] flex items-center justify-between gap-2">
                      <span>{rel.title}</span>
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
        title={item.title}
        category={item.category}
        slug={item.slug}
        contentType={item.type}
        quickAnswer={quickAnswerText}
        keyTakeaways={item.keyTakeaways}
        sections={item.sections}
        authorName={item.author.name}
        workbookState={workbookState}
      />

      <SiteFooter />
    </div>
  );
}


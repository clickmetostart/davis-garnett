"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { ALL_GUIDES_AND_QUESTIONS } from "@/data/knowledgeHub";

export default function KnowledgeItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const item =
    ALL_GUIDES_AND_QUESTIONS.find((i) => i.slug === slug) ||
    ALL_GUIDES_AND_QUESTIONS[0];

  const relatedItems = ALL_GUIDES_AND_QUESTIONS.filter(
    (i) => i.slug !== item.slug
  ).slice(0, 3);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          email,
          phone,
          propertyInterest: `${item.category}: ${item.title}`,
          assignedAdvisor: item.author.name,
          notes,
          source: `Knowledge Hub (${item.slug})`,
          status: "New",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
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
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.readTime}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl mb-6 leading-tight">
            {item.title}
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl leading-relaxed">
            {item.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-16 items-start">
          {/* Left Column: Editorial Content */}
          <div>
            {/* Key Takeaways Box */}
            <div className="bg-[#f5f3ef] border-l-4 border-[#D4AF37] p-8 rounded-r-2xl mb-12">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9A7D3A] mb-4">
                <BookOpen className="w-4 h-4" /> Executive Key Takeaways
              </div>
              <ul className="space-y-3">
                {item.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#111]/85 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Hero Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-[#111]/10 shadow-lg">
              <Image src={item.heroImage} alt={item.title} fill className="object-cover" />
            </div>

            {/* Deep Sections */}
            <div className="space-y-12">
              {item.sections.map((sec, idx) => (
                <div key={idx}>
                  <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
                    {sec.heading}
                  </h2>
                  <p className="text-[#111]/75 font-light leading-relaxed text-base md:text-lg mb-6">
                    {sec.body}
                  </p>
                  {sec.bullets && (
                    <ul className="space-y-3 bg-[#f5f3ef] p-6 rounded-xl border border-[#111]/8">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-[#111]/80">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            {item.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-[#111]/10">
                <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
                  Frequently Asked Questions
                </span>
                <h3 className="font-aiveritas text-3xl text-[#111] mb-6">
                  Direct Advisor Answers
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
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card */}
            <div className="mt-16 p-8 bg-[#111] text-white rounded-2xl flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0">
                <Image
                  src={item.author.image}
                  alt={item.author.name}
                  fill
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
                  <a href={`mailto:${item.author.email}`} className="flex items-center gap-1.5 text-white/80 hover:text-white">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.author.email}
                  </a>
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
                    {item.author.name} will reach out personally shortly.
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
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
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

            {/* Related Guides / Questions */}
            <div className="bg-white border border-[#111]/10 rounded-2xl p-6">
              <h4 className="font-aiveritas text-xl text-[#111] mb-4">Related Playbooks &amp; Q&amp;A</h4>
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

      {/* Schema.org Article + FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: item.title,
                description: item.subtitle,
                author: {
                  "@type": "Person",
                  name: item.author.name,
                  jobTitle: item.author.role,
                },
                publisher: {
                  "@type": "RealEstateAgent",
                  name: "Davis & Garnett Real Estate Advisory",
                },
              },
              ...(item.faqs.length > 0
                ? [
                    {
                      "@type": "FAQPage",
                      mainEntity: item.faqs.map((f) => ({
                        "@type": "Question",
                        name: f.question,
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: f.answer,
                        },
                      })),
                    },
                  ]
                : []),
            ],
          }),
        }}
      />

      <SiteFooter />
    </div>
  );
}


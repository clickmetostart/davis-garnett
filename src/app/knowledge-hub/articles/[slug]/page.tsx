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
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { ARTICLES } from "@/data/knowledgeHub";

export default function ArticleSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const otherArticles = ARTICLES.filter((a) => a.slug !== article.slug);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
          propertyInterest: `Market Report Inquiry: ${article.title}`,
          source: `Article Page (${article.slug})`,
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

      <section className="relative pt-36 pb-20 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={article.heroImage} alt={article.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
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
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {article.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl">
            {article.summary}
          </p>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-16 items-start">
          <div>
            <div className="bg-[#f5f3ef] border-l-4 border-[#D4AF37] p-8 rounded-r-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7D3A] block mb-4">
                Report Highlights
              </span>
              <ul className="space-y-3">
                {article.keyTakeaways.map((kt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-[#111]/85">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span>{kt}</span>
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
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8">
              <div className="h-1 w-full bg-[#D4AF37] rounded-full mb-6" />
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
                  <h4 className="font-aiveritas text-2xl text-[#111] mb-2">Subscribed</h4>
                  <p className="text-sm text-[#111]/70 font-light">
                    We will send you our full quarterly market packet and off-market opportunities.
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                    Market Intelligence Briefing
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                    Request Custom Market Comps &amp; Cap Rate Data
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name *"
                        className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                      />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number *"
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
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
              <h4 className="font-aiveritas text-xl text-[#111] mb-4">More Editorial Reports</h4>
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

      <SiteFooter />
    </div>
  );
}


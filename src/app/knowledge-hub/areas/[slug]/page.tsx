"use client";

import { use, useState } from "react";
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
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { AREAS } from "@/data/knowledgeHub";

export default function AreaSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const area = AREAS.find((a) => a.slug === slug) || AREAS[0];
  const otherAreas = AREAS.filter((a) => a.slug !== area.slug);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
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
          propertyInterest: `Area Guide Inquiry: ${area.name}`,
          notes,
          source: `Area Guide (${area.slug})`,
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

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <Image src={area.heroImage} alt={area.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
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
          </div>

          <h1 className="font-aiveritas text-4xl md:text-6xl text-white max-w-4xl mb-4 leading-tight">
            {area.name}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-3xl mb-10">
            {area.tagline}
          </p>

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
      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-16 items-start">
          <div>
            <h2 className="font-aiveritas text-3xl text-[#111] mb-4">
              Market Overview &amp; Neighborhood Intelligence
            </h2>
            <p className="text-[#111]/75 text-base md:text-lg font-light leading-relaxed mb-10">
              {area.overview}
            </p>

            {/* Top Neighborhoods Chips */}
            <div className="bg-[#f5f3ef] p-8 rounded-2xl border border-[#111]/10 mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7D3A] block mb-4">
                Premier Enclaves &amp; Corridors in {area.name}
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
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Featured Portfolio Links */}
            <div className="mt-12 p-8 bg-[#111] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold block mb-1">
                  Active &amp; Recent Portfolio
                </span>
                <h4 className="font-aiveritas text-2xl text-white">
                  Explore Davis &amp; Garnett Properties in This Corridor
                </h4>
              </div>
              <Link
                href="/properties"
                className="px-6 py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shrink-0 flex items-center gap-2"
              >
                View Portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

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
                    Our advisors will send you curated listings and market comps for {area.name}.
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-2">
                    Hyper-Local Advisory
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                    Request {area.name} Listings &amp; Off-Market Access
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
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us what you are looking for in this area..."
                      className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
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

      {/* Schema.org Place JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: area.name,
            description: area.overview,
            address: {
              "@type": "PostalAddress",
              addressRegion: "FL",
              addressCountry: "US",
            },
          }),
        }}
      />

      <SiteFooter />
    </div>
  );
}

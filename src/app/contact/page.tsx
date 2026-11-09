"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Award,
  Sparkles,
  Send,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recipient, setRecipient] = useState("Both Principals (Mark Davis & Rachael Garnett)");
  const [interest, setInterest] = useState("General Real Estate Inquiry");
  const [message, setMessage] = useState("");
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
          assignedAdvisor: recipient,
          propertyInterest: interest,
          notes: message,
          source: "Contact Us Page",
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

      {/* ── HERO HEADER ── */}
      <section className="relative pt-36 pb-20 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/davis-garnett-real-estate-advisors-cover-image-2.jpg"
            alt="Contact Davis & Garnett"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            Direct Principal Access • Tampa Bay, Florida
          </span>
          <h1 className="font-aiveritas text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
            Connect With <span className="text-[#D4AF37]">Davis &amp; Garnett.</span>
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Whether you are acquiring commercial mixed-use assets, evaluating Central Florida land tracts, or purchasing a luxury waterfront residence, you work directly with our Principals.
          </p>
        </div>
      </section>

      {/* ── SPLIT-SCREEN ADVISOR CONTACT CARDS + FULL-WIDTH BROKERAGE CARD BELOW ── */}
      <section className="py-20 px-6 md:px-8 bg-[#f5f3ef] border-b border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Your Advisory Leadership
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111]">
              Direct Principal Contact Directory
            </h2>
          </div>

          {/* Top Row: 2 Split-Screen Advisor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* LEFT CARD: MARK DAVIS */}
            <div className="bg-white rounded-2xl border border-[#111]/10 shadow-lg overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div>
                {/* Top Gold Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#9A7D3A] via-[#D4AF37] to-[#9A7D3A]" />

                <div className="p-8 md:p-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    {/* Circle Avatar matching Login Footer */}
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg shrink-0 bg-[#111]">
                      <Image
                        src="/davis-garnett-headshots/mark-davis-avatar-footer.JPG"
                        alt="Mark Davis"
                        fill
                        unoptimized
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="text-center sm:text-left flex-1">
                      <span className="inline-block px-3 py-1 bg-[#f5f3ef] border border-[#D4AF37]/40 text-[#9A7D3A] text-[10px] font-bold uppercase tracking-widest rounded-sm mb-2">
                        Commercial &amp; Residential Advisor
                      </span>
                      <h3 className="font-aiveritas text-3xl md:text-4xl text-[#111] mb-1">
                        Mark Davis
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-[#111]/55 font-bold mb-3">
                        Co-Founder &amp; Principal Advisor • FL Lic #3209459
                      </p>
                      <p className="text-sm text-[#111]/70 font-light leading-relaxed">
                        Advising across commercial, residential, land, condos, and luxury estates—bringing his personal flair for deal structuring, commercial mixed-use underwriting, 1031 exchanges, and Central Florida acreage.
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                    <a
                      href="tel:941-737-4127"
                      className="flex items-center gap-3.5 p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#111] text-[#111] hover:text-white transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 text-[#9A7D3A] group-hover:bg-[#D4AF37] group-hover:text-[#111] flex items-center justify-center shrink-0 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest opacity-60 block font-bold">
                          Direct Mobile
                        </span>
                        <span className="text-sm font-bold tracking-wide block truncate">
                          941-737-4127
                        </span>
                      </div>
                    </a>

                    <a
                      href="mailto:mark@davisgarnettsells.com"
                      className="flex items-center gap-3.5 p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#111] text-[#111] hover:text-white transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 text-[#9A7D3A] group-hover:bg-[#D4AF37] group-hover:text-[#111] flex items-center justify-center shrink-0 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest opacity-60 block font-bold">
                          Direct Email
                        </span>
                        <span className="text-xs font-bold block truncate">
                          mark@davisgarnettsells.com
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Focus Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Commercial Mixed-Use",
                      "Central FL Land & Timber",
                      "1031 Exchanges",
                      "Development Entitlements",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-3 py-1 bg-[#f5f3ef] text-[#111]/70 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-8 py-5 bg-[#fbfbf9] border-t border-[#111]/8 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/about/mark-davis"
                  className="text-xs font-bold uppercase tracking-widest text-[#111] hover:text-[#9A7D3A] flex items-center gap-1.5 transition-colors"
                >
                  View Mark&apos;s Full Bio &amp; Listings <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
                <Link
                  href="/mark"
                  className="text-[11px] font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] transition-colors"
                >
                  Digital Business Card →
                </Link>
              </div>
            </div>

            {/* RIGHT CARD: RACHAEL GARNETT */}
            <div className="bg-white rounded-2xl border border-[#111]/10 shadow-lg overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all">
              <div>
                {/* Top Gold Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#9A7D3A] via-[#D4AF37] to-[#9A7D3A]" />

                <div className="p-8 md:p-10">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    {/* Circle Avatar matching Login Footer */}
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg shrink-0 bg-[#111]">
                      <Image
                        src="/davis-garnett-headshots/rachael-garnett-avatar-footer.webp"
                        alt="Rachael Garnett"
                        fill
                        unoptimized
                        className="object-cover object-[center_30%]"
                      />
                    </div>

                    <div className="text-center sm:text-left flex-1">
                      <span className="inline-block px-3 py-1 bg-[#f5f3ef] border border-[#D4AF37]/40 text-[#9A7D3A] text-[10px] font-bold uppercase tracking-widest rounded-sm mb-2">
                        Commercial &amp; Residential Advisor
                      </span>
                      <h3 className="font-aiveritas text-3xl md:text-4xl text-[#111] mb-1">
                        Rachael Garnett
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-[#111]/55 font-bold mb-3">
                        Co-Founder &amp; Principal Advisor • FL Lic #3378601
                      </p>
                      <p className="text-sm text-[#111]/70 font-light leading-relaxed">
                        Advising across commercial, residential, land, condos, and luxury waterfront—bringing her personal flair for bespoke property marketing, master-planned communities, and fierce contract execution.
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact Channels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                    <a
                      href="tel:727-808-3344"
                      className="flex items-center gap-3.5 p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#111] text-[#111] hover:text-white transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 text-[#9A7D3A] group-hover:bg-[#D4AF37] group-hover:text-[#111] flex items-center justify-center shrink-0 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest opacity-60 block font-bold">
                          Direct Mobile
                        </span>
                        <span className="text-sm font-bold tracking-wide block truncate">
                          727-808-3344
                        </span>
                      </div>
                    </a>

                    <a
                      href="mailto:rachael@davisgarnettsells.com"
                      className="flex items-center gap-3.5 p-4 rounded-xl bg-[#f5f3ef] hover:bg-[#111] text-[#111] hover:text-white transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 text-[#9A7D3A] group-hover:bg-[#D4AF37] group-hover:text-[#111] flex items-center justify-center shrink-0 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] uppercase tracking-widest opacity-60 block font-bold">
                          Direct Email
                        </span>
                        <span className="text-xs font-bold block truncate">
                          rachael@davisgarnettsells.com
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Focus Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Waterfront Estates",
                      "Master-Planned New Homes",
                      "Executive Relocation",
                      "Seller Valuation Strategy",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-3 py-1 bg-[#f5f3ef] text-[#111]/70 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-8 py-5 bg-[#fbfbf9] border-t border-[#111]/8 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/about/rachael-garnett"
                  className="text-xs font-bold uppercase tracking-widest text-[#111] hover:text-[#9A7D3A] flex items-center gap-1.5 transition-colors"
                >
                  View Rachael&apos;s Full Bio &amp; Listings <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
                <Link
                  href="/rachael"
                  className="text-[11px] font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] transition-colors"
                >
                  Digital Business Card →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row: Full-Width Horizontal Brokerage Card Stretching Across Both Columns */}
          <div className="w-full bg-[#111] text-white rounded-2xl border border-[#ef5728]/50 shadow-2xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#ef5728] via-[#D4AF37] to-[#ef5728]" />
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Col 1: Brokerage Logo & Identity (4 cols) */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                  <a
                    href="https://alignrightcarrollwood.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-56 h-16 mb-4 block hover:opacity-85 transition-opacity"
                  >
                    <Image
                      src="/align-right-email-logo.png"
                      alt="Align Right Realty Carrollwood"
                      fill
                      className="object-contain object-center lg:object-left"
                    />
                  </a>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#ef5728] font-bold block mb-1">
                    Principal Brokerage Office
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#ef5728] mb-1">
                    Align Right Realty Carrollwood
                  </h3>
                  <p className="text-xs text-white/70 font-light">
                    Broker Number BK3401606
                  </p>
                </div>

                {/* Col 2: Office Location, Phone, Email & Hours (5 cols) */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#ef5728]/15 text-[#ef5728] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#ef5728] font-bold block mb-1">
                        Carrollwood / Tampa Office
                      </span>
                      <p className="text-sm text-white font-medium leading-snug">
                        3903 Northdale Blvd Suite 115W
                        <br />
                        TAMPA, FL 33624
                      </p>
                      <span className="text-[11px] text-white/50 block mt-1">
                        Serving Hillsborough, Pinellas, Pasco, Polk &amp; Marion
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#ef5728]/15 text-[#ef5728] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#ef5728] font-bold block mb-1">
                        Brokerage Desk &amp; Admin
                      </span>
                      <a
                        href="tel:813-374-6050"
                        className="text-sm text-white hover:text-[#ef5728] font-bold block transition-colors"
                      >
                        (813) 374-6050
                      </a>
                      <a
                        href="mailto:officeadmin@alignrightcarrollwood.com"
                        className="text-xs text-white/75 hover:text-[#ef5728] block mt-1 break-all transition-colors"
                      >
                        officeadmin@alignrightcarrollwood.com
                      </a>
                      <span className="text-[11px] text-white/45 block mt-1">
                        Team Desk: list@davisgarnettsells.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Col 3: Direct Brokerage Links (3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-3">
                  <Link
                    href="/about/align-right-realty-carrollwood"
                    className="w-full py-3.5 px-5 bg-[#ef5728] hover:bg-white text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-4 h-4" /> About Our Brokerage
                  </Link>
                  <a
                    href="https://maps.google.com/?q=3903+Northdale+Blvd+Suite+115W+Tampa+FL+33624"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-[#ef5728]" /> Get Office Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECT MESSAGE & CONSULTATION FORM + MAP ── */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8 md:p-12 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 text-[#9A7D3A] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  Message Delivered to Principal Desk
                </span>
                <h3 className="font-aiveritas text-3xl text-[#111] mb-4">
                  Thank You, {firstName}.
                </h3>
                <p className="text-[#111]/70 font-light max-w-md mx-auto mb-8 leading-relaxed">
                  Your message has been logged in our ClickMe CRM and routed directly to{" "}
                  <strong>{recipient}</strong>. We will respond within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="px-8 py-3.5 bg-[#111] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  Private Inquiry Form
                </span>
                <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111] mb-3">
                  Send a Direct Message
                </h2>
                <p className="text-sm text-[#111]/65 font-light mb-8 leading-relaxed">
                  Select which Principal Advisor you would like to direct your message to, or send to both Mark and Rachael for unified commercial &amp; residential advisory.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(813) 555-0199"
                        className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                        Direct To Advisor
                      </label>
                      <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Both Principals (Mark Davis & Rachael Garnett)">
                          Both Principals (Unified Team)
                        </option>
                        <option value="Mark Davis (Commercial & Land)">
                          Mark Davis — Commercial &amp; Land (#3209459)
                        </option>
                        <option value="Rachael Garnett (Luxury Residential)">
                          Rachael Garnett — Luxury Residential (#3378601)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                        Topic / Property Interest
                      </label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="General Real Estate Inquiry">General Real Estate Inquiry</option>
                        <option value="6100 Bahama Shores Dr S ($4,553,900)">6100 Bahama Shores Dr S ($4,553,900)</option>
                        <option value="126 Ridgewood Ave Brandon Mixed-Use ($845,000)">126 Ridgewood Ave Brandon Mixed-Use ($845,000)</option>
                        <option value="770 Old Stokes Rd 79.54 Acres ($3,550,000)">770 Old Stokes Rd 79.54 Acres ($3,550,000)</option>
                        <option value="NE 90th Street Rd 19.72 Acres ($350,000)">NE 90th Street Rd 19.72 Acres ($350,000)</option>
                        <option value="New Construction & Featured Developments">New Construction &amp; Featured Developments</option>
                        <option value="Selling a Residential or Commercial Property">Selling a Residential or Commercial Property</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can Mark and Rachael assist with your real estate goals?"
                      className="w-full px-4 py-3.5 bg-white border border-[#111]/15 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-[#111]/55 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#9A7D3A]" /> 100% Confidential • Direct to Principals
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-4 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? "Sending..." : "Send Direct Message"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Right Info & Map Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#111]/10 shadow-sm h-[320px] bg-[#f5f3ef]">
              <iframe
                title="Align Right Realty Carrollwood Map"
                src="https://www.google.com/maps?q=3903+Northdale+Blvd+Suite+115W,+Tampa,+FL+33624&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8 space-y-5">
              <div className="flex items-start gap-3.5">
                <Award className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#111] uppercase tracking-wider mb-1">
                    Private Showing &amp; Offering Memorandums
                  </h4>
                  <p className="text-xs text-[#111]/65 font-light leading-relaxed">
                    For qualified buyers and commercial investors, we arrange private property tours, financial pro-formas, and pre-construction developer presentations 7 days a week.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-[#111]/10">
                <Sparkles className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#111] uppercase tracking-wider mb-1">
                    Out-of-State &amp; Executive Relocations
                  </h4>
                  <p className="text-xs text-[#111]/65 font-light leading-relaxed">
                    Relocating to Tampa Bay? Request a private video consultation and custom corridor tour covering St. Petersburg, South Tampa, Wesley Chapel, and Land O&apos; Lakes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


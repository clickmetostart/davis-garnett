"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Heart,
  Users,
  Home,
  Award,
  CheckCircle2,
  Sparkles,
  CalendarHeart,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";
import SiteFooter from "@/components/SiteFooter";

const IMPACT_PILLARS = [
  {
    icon: Heart,
    title: "Local Tampa Bay Church Outreach & Ministries",
    subtitle: "Faith-Anchored Stewardship Across Hillsborough, Pinellas & Pasco",
    description:
      "Mark Davis and Rachael Garnett are deeply rooted in the local church community. A portion of every Davis & Garnett closing is dedicated to supporting local congregation outreach—including weekly food pantries, marriage and family strengthening ministries, single-parent benevolence funds, and local mission initiatives across Tampa Bay.",
    initiatives: [
      "Seasonal Thanksgiving & Christmas family meal sponsorships through local congregations",
      "Support for church-led financial literacy, stewardship, and homeownership workshops",
      "Direct contributions to benevolence funds assisting neighbors facing unexpected medical or housing hardship",
    ],
  },
  {
    icon: Home,
    title: "Supporting Families in Housing Transition",
    subtitle: "Safe Shelter, Dignity & Fresh Starts",
    description:
      "Because our profession centers on the power of home, we feel a special calling to stand beside Tampa Bay mothers, children, and veterans navigating housing insecurity. We partner with faith-based shelters and transitional housing nonprofits to turn empty apartments into warm, furnished homes.",
    initiatives: [
      "Furniture, bedding, and kitchen-starter drives for families graduating from transitional shelter",
      "Pro-bono housing advisory and lease navigation for nonprofit placement coordinators",
      "Emergency rental and utility relief sponsorships in partnership with local ministries",
    ],
  },
  {
    icon: Award,
    title: "Youth Character, Mentorship & Athletic Sponsorships",
    subtitle: "Investing in the Next Generation of Tampa Bay Leaders",
    description:
      "Strong neighborhoods are built on strong young people. Davis & Garnett proudly sponsors local youth athletics, Fellowship of Christian Athletes (FCA) huddles, high school leadership programs, and scholarship funds that teach discipline, teamwork, and servant leadership.",
    initiatives: [
      "Youth baseball, soccer, and Friday-night high school athletic program sponsorships in Carrollwood, Lutz, and Brandon",
      "Equipment and registration scholarships so every child can play regardless of family income",
      "Mentorship and career-shadowing days introducing high school students to commercial and residential real estate",
    ],
  },
  {
    icon: CalendarHeart,
    title: "Annual Community Service & Neighborhood Days",
    subtitle: "Hands-On Service Alongside Our Clients & Strategic Partners",
    description:
      "Stewardship is more than writing a check—it is showing up with work gloves. Throughout the year, we mobilize our clients, preferred lenders, title attorneys, and inspectors for hands-on community service days across Greater Tampa Bay.",
    initiatives: [
      "Spring coastal & park cleanup mornings in St. Petersburg and Tampa",
      "Back-to-School backpack and classroom supply drives for local public and parochial teachers",
      "Senior homeowner yard revitalization and minor exterior maintenance days",
    ],
  },
];

export default function CommunityOutreachGivingPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organizationName: "",
    causeCategory: "Local Church Ministry / Outreach Initiative",
    notes: "",
  });
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          source: "Community Outreach & Giving Spoke (/about/community-outreach-giving)",
          pipelineStage: "Community / Ministry Partnership",
          notes: `[Community Cause Partnership | Org: ${formData.organizationName} | Focus: ${formData.causeCategory}] ${formData.notes}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#111111] selection:bg-[#C8A951] selection:text-white font-sans">
      <ProposalNav />

      {/* ── BREADCRUMB BAR ───────────────────────────────────────────────── */}
      <div className="pt-28 pb-4 px-6 md:px-12 bg-white border-b border-[#111111]/8">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-[#9A7D3A] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to About The Davis &amp; Garnett Team
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-[#111111]/60 font-semibold">
            <Link href="/about/mark-davis" className="hover:text-[#9A7D3A]">
              Mark Davis (#3209459)
            </Link>
            <span>|</span>
            <Link href="/about/rachael-garnett" className="hover:text-[#9A7D3A]">
              Rachael Garnett (#3378601)
            </Link>
            <span>|</span>
            <Link href="/about/strategic-partners" className="hover:text-[#9A7D3A]">
              Strategic Partners
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <header className="py-20 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f3ef] border border-[#C8A951]/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#9A7D3A]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A]">
                Stewardship • Faith • Community Impact
              </span>
            </div>

            <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-[#111111] leading-[1.08] mb-6">
              Our Causes: Faith, Church &amp;<br />
              <span className="text-[#9A7D3A]">Tampa Bay Community Impact.</span>
            </h1>

            <p className="text-base md:text-[17px] lg:text-[18px] text-[#111111]/80 font-light leading-relaxed mb-6">
              For Mark Davis and Rachael Garnett, real estate is about taking care of people and giving back to the community we call home. Every home, commercial building, and land parcel we close helps support local churches, families, and youth across Tampa Bay.
            </p>

            <p className="text-base md:text-[17px] lg:text-[18px] text-[#111111]/70 font-light leading-relaxed mb-8">
              Whether sponsoring a local church food pantry, helping a family in transition furnish their apartment, or supporting youth sports across Hillsborough, Pinellas, and Pasco counties, we are grateful for every chance to serve our neighbors.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#partner-cause"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg"
              >
                Partner With Us on a Community Cause
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] hover:border-[#C8A951] transition-colors rounded-lg"
              >
                About The Davis &amp; Garnett Team
              </Link>
            </div>
          </div>

          <div className="bg-[#111111] text-white p-10 md:p-12 rounded-2xl border border-[#C8A951]/30 shadow-2xl">
            <HeartHandshake className="w-10 h-10 text-[#C8A951] mb-6" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A951] font-bold block mb-2">
              The Davis & Garnett Giving Pledge
            </span>
            <h3 className="font-aiveritas text-3xl text-white mb-4 leading-snug">
              Every Closing Strengthens a Tampa Bay Neighbor.
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
              When our clients choose Mark Davis and Rachael Garnett at Align Right Realty Carrollwood, they become partners in our community mission. Together, we direct resources toward local church outreach, family shelter stability, and youth mentorship.
            </p>
            <div className="space-y-3 pt-6 border-t border-white/15 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A951]" />
                <span>Local Church Outreach & Benevolence Support</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A951]" />
                <span>Transitional Family Housing & Shelter Drives</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C8A951]" />
                <span>Youth Character Athletics & Mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 4 CORE COMMUNITY & FAITH IMPACT PILLARS ──────────────────────── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Where We Serve & Give
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              Four Pillars of Our Community Commitment
            </h2>
            <p className="text-base md:text-[17px] lg:text-[18px] text-[#111111]/70 font-light leading-relaxed">
              Grounded in faith and gratitude, our outreach focuses on initiatives that build resilient families and compassionate neighborhoods.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {IMPACT_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white p-8 md:p-10 rounded-2xl border border-[#111111]/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] flex items-center justify-center mb-6">
                    <pillar.icon className="w-6 h-6 text-[#9A7D3A]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] block mb-2">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-aiveritas text-3xl text-[#111111] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-[#111111]/75 font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#111111]/10">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111]/50 mb-3">
                    Active Initiatives
                  </div>
                  <ul className="space-y-2.5">
                    {pillar.initiatives.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#111111]/75">
                        <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER WITH US ON A COMMUNITY CAUSE FORM ────────────────────── */}
      <section id="partner-cause" className="py-28 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto bg-[#fbfbf9] rounded-2xl p-8 md:p-14 border border-[#111111]/10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Community & Ministry Outreach Desk
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111111] mb-4">
              Partner With Us on a Community Cause
            </h2>
            <p className="text-sm text-[#111111]/65 font-light leading-relaxed">
              Are you leading a local Tampa Bay church outreach, youth athletic league, family housing nonprofit, or neighborhood service day? Connect with Mark Davis and Rachael Garnett below.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-xl bg-white border border-[#C8A951] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                Thank You for Sharing Your Mission
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-md mx-auto mb-6">
                We have received your outreach inquiry for {formData.organizationName || "your organization"}. Mark and Rachael review every community request personally.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest rounded-lg"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Church, Ministry, School, or Nonprofit Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    placeholder="e.g., Grace Family Outreach / Carrollwood Little League"
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                    Cause Category
                  </label>
                  <select
                    value={formData.causeCategory}
                    onChange={(e) => setFormData({ ...formData, causeCategory: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                  >
                    <option>Local Church Ministry / Outreach Initiative</option>
                    <option>Family Housing Transition / Shelter Support</option>
                    <option>Youth Character & Athletic Sponsorship</option>
                    <option>Volunteer Community Service Day Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]/70 mb-2">
                  Tell Us About the Event, Need, or Volunteer Opportunity
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share upcoming dates, how our team can volunteer or sponsor, and the families served..."
                  className="w-full px-4 py-3.5 rounded-lg bg-white border border-[#111111]/15 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 bg-[#111111] text-white text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#C8A951] hover:text-[#111111] transition-colors rounded-lg disabled:opacity-50"
              >
                {submitting ? "Submitting Request..." : "Submit Community Partnership Request"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}

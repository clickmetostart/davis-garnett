"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Heart,
  Home,
  Award,
  CheckCircle2,
  CalendarHeart,
  GraduationCap,
  ExternalLink,
  HandHeart,
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
    icon: GraduationCap,
    title: "Local Elementary, Middle & High Schools",
    subtitle: "Teachers, Classrooms, PTA/PTSA & Youth Athletics",
    description:
      "Public, private, and charter schools anchor every neighborhood Mark and Rachael serve across Carrollwood, Northdale, Lutz, Brandon, Wesley Chapel, and St. Petersburg. We back teachers and student programs with supplies, booster sponsorships, and classroom support.",
    initiatives: [
      "Back-to-school supply drives and teacher appreciation breakfasts for local K–12 campuses",
      "Athletic booster sponsorships, band fundraisers, and graduation awards for neighborhood high schools",
      "Equipment and registration scholarships so students can join teams and clubs regardless of cost",
    ],
  },
  {
    icon: Award,
    title: "Youth Character & Community Mentorship",
    subtitle: "Investing in the Next Generation of Tampa Bay Leaders",
    description:
      "Strong neighborhoods start with supported kids and teens. Davis & Garnett proudly supports youth mentorship programs, Big Brothers Big Sisters of Tampa Bay, FCA huddles, and local sports leagues that build confidence and teamwork.",
    initiatives: [
      "Youth baseball, soccer, and community league sponsorships across Hillsborough, Pinellas, and Pasco",
      "Mentorship matching and youth leadership support through trusted Tampa Bay nonprofits",
      "Career-shadowing days introducing local high school students to real estate and business ownership",
    ],
  },
  {
    icon: CalendarHeart,
    title: "Annual Community Service & Care Drives",
    subtitle: "Metropolitan Ministries, Cancer Care & Neighborhood Days",
    description:
      "Giving back means showing up with work gloves and consistent financial support. Throughout the year, our team, clients, and business partners rally behind coastal cleanups, food boxes, cancer fundraising, and senior homeowner care days.",
    initiatives: [
      "Seasonal food and toy drives supporting Metropolitan Ministries across Tampa Bay",
      "Relay and fundraising support for American Cancer Society research and patient care",
      "Senior homeowner yard cleanups and coastal park volunteer mornings in Tampa and St. Petersburg",
    ],
  },
];

const NONPROFIT_PARTNERS = [
  {
    name: "Metropolitan Ministries",
    focus: "Family Shelter, Food & Hope in Tampa Bay",
    description:
      "Caring for homeless and at-risk families across Hillsborough, Pinellas, Pasco, and Polk counties with meals, safe housing, and job training.",
    donateUrl: "https://www.metromin.org/",
    donateLabel: "Visit Metropolitan Ministries & Donate",
  },
  {
    name: "American Cancer Society",
    focus: "Cancer Research, Patient Rides & Care Support",
    description:
      "Funding lifesaving cancer research while giving Tampa Bay patients free lodging, rides to treatment, and 24/7 caregiver guidance.",
    donateUrl: "https://www.cancer.org/donate.html",
    donateLabel: "Donate to American Cancer Society",
  },
  {
    name: "Big Brothers Big Sisters of Tampa Bay",
    focus: "One-to-One Youth Mentorship",
    description:
      "Pairing local children with caring adult mentors to boost school attendance, graduation rates, and lifelong confidence across Tampa Bay.",
    donateUrl: "https://bbbstampabay.org/",
    donateLabel: "Support Big Brothers Big Sisters",
  },
];

const OUTREACH_SHOWCASE = [
  {
    tag: "K–12 Schools",
    title: "Local Elementary, Middle & High School Drives",
    caption: "Stocking teacher supply closets, funding booster clubs, and backing Friday-night youth athletics.",
    image: "/new-images/new-2/davis-garnett-stock-gallery/realtors-mark-davis-rachael-garnett-tampa-residential-real-estate-gallery-16.jpg",
  },
  {
    tag: "Tampa Bay Nonprofits",
    title: "Metropolitan Ministries & Family Care Partnerships",
    caption: "Direct holiday meal boxes, furniture drives, and shelter transitions for neighbors getting back on their feet.",
    image: "/new-images/new-2/davis-garnett-stock-gallery/realtors-mark-davis-rachael-garnett-tampa-residential-real-estate-gallery-17.jpg",
  },
  {
    tag: "Volunteer Days",
    title: "Hands-On Neighborhood & Faith Service",
    caption: "Bringing clients, inspectors, and lenders together for park cleanups and local family outreach events.",
    image: "/new-images/new-2/davis-garnett-stock-gallery/realtors-mark-davis-rachael-garnett-tampa-residential-real-estate-gallery-10.jpg",
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
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          category: "outreach",
          subject: `${formData.causeCategory} — ${formData.organizationName || "Community Outreach"}`,
          organizationName: formData.organizationName,
          causeCategory: formData.causeCategory,
          source: "Community Outreach (/about/community-outreach-giving)",
          message: formData.notes,
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
              Mark Davis (BK3209459)
            </Link>
            <span>|</span>
            <Link href="/about/rachael-garnett" className="hover:text-[#9A7D3A]">
              Rachael Garnett (SL3378601)
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
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">
              Davis &amp; Garnett · Faith, Church &amp; Community
            </span>

            <h1 className="font-aiveritas text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111111] leading-none mb-6">
              Community <span className="text-[#9A7D3A]">Outreach</span>
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

          <div className="bg-[#111111] text-white p-6 sm:p-10 md:p-12 rounded-2xl border border-[#C8A951]/30 shadow-2xl">
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

      {/* ── CORE COMMUNITY, SCHOOLS & FAITH IMPACT PILLARS ────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Where We Serve &amp; Give
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              How We Support Families, Schools &amp; Churches
            </h2>
            <p className="text-base md:text-[17px] lg:text-[18px] text-[#111111]/70 font-light leading-relaxed">
              Grounded in faith and gratitude, our outreach supports Tampa Bay families, local K–12 schools, youth programs, and trusted charities across Hillsborough, Pinellas, and Pasco counties.
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

          <div className="mt-10 p-6 md:p-8 rounded-2xl bg-[#111111] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#C8A951] block mb-1">
                Tampa Bay School Corridors
              </span>
              <p className="text-sm text-white/80 font-light">
                Relocating with school-age kids? Explore our plain-English guide to searching homes by school zone in Carrollwood, Lutz, and Wesley Chapel.
              </p>
            </div>
            <Link
              href="/knowledge-hub/north-tampa-wesley-chapel-top-school-corridors"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A951] hover:bg-white text-[#111111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shrink-0"
            >
              Read School Zone Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OFFICIAL CHARITY PARTNERS & DIRECT DONATION LINKS ───────────────── */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Support Our Mission Directly
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              Trusted Nonprofits We Encourage You to Support
            </h2>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed">
              Click below to learn more or make a direct tax-deductible gift to these organizations making a measurable impact across Tampa Bay and nationwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {NONPROFIT_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="p-8 rounded-2xl bg-[#fbfbf9] border border-[#111111]/10 hover:border-[#C8A951] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#111111] text-[#C8A951] flex items-center justify-center mb-5">
                    <HandHeart className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] block mb-1.5">
                    {partner.focus}
                  </span>
                  <h3 className="font-aiveritas text-2xl text-[#111111] mb-3">{partner.name}</h3>
                  <p className="text-sm text-[#111111]/75 font-light leading-relaxed mb-6">
                    {partner.description}
                  </p>
                </div>
                <a
                  href={partner.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-[#111111] hover:bg-[#C8A951] text-white hover:text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                >
                  <span>{partner.donateLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTREACH IN ACTION SHOWCASE ────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 bg-[#f5f3ef] border-b border-[#111111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Outreach in Action
            </span>
            <h2 className="font-aiveritas text-4xl md:text-5xl text-[#111111] mb-4">
              Serving Tampa Bay Side by Side
            </h2>
            <p className="text-base text-[#111111]/70 font-light leading-relaxed">
              From local classrooms and youth sports fields to shelter family rooms, every transaction fuels practical kindness in our hometown.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {OUTREACH_SHOWCASE.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden border border-[#111111]/10 shadow-sm flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#111111]/90 text-[#C8A951] text-[10px] font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="font-aiveritas text-xl text-[#111111] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#111111]/70 font-light leading-relaxed">
                    {item.caption}
                  </p>
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
            <div className="p-6 sm:p-10 rounded-xl bg-white border border-[#C8A951] text-center">
              <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
              <h3 className="font-aiveritas text-2xl text-[#111111] mb-2">
                Thank You for Sharing Your Mission
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-md mx-auto mb-6">
                We have received your outreach inquiry for {formData.organizationName || "your organization"}. We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP.
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
                    <option>Local Elementary, Middle &amp; High School Partnership</option>
                    <option>Family Housing Transition / Shelter Support</option>
                    <option>Youth Character &amp; Athletic Sponsorship</option>
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

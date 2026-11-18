import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  Handshake,
  Landmark,
  Layers,
  MapPinned,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";
import {
  buildPageMetadata,
  OFFICE_GBP_URL,
  SITE_URL,
  TEAM_SAME_AS,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Commercial Real Estate Mentoring & Coaching | Davis & Garnett",
  description:
    "Hands-on commercial real estate mentoring in Tampa Bay with Mark Davis and Rachael Garnett covering NNN leases, cap rates, SBA 504, and 1031 swaps.",
  path: "/services/commercial-mentoring",
  image: "/city-photos/brandon-riverview-commercial.jpg",
});

export default function CommercialMentoringPage() {
  const pageUrl = `${SITE_URL}/services/commercial-mentoring`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Commercial Real Estate Mentoring & Deal Underwriting Coaching",
        serviceType: "Commercial Real Estate Advisory & Mentoring",
        url: pageUrl,
        description:
          "Practical one-on-one commercial real estate mentoring across Tampa Bay and Central Florida covering underwriting, NNN leases, zoning, SBA 504 acquisitions, and land due diligence.",
        areaServed: [
          "Tampa, FL",
          "Carrollwood, FL",
          "Brandon, FL",
          "St. Petersburg, FL",
          "Wesley Chapel, FL",
          "Polk County, FL",
        ],
        provider: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett Commercial & Residential Advisors",
          url: SITE_URL,
          hasMap: OFFICE_GBP_URL,
          sameAs: TEAM_SAME_AS,
          telephone: "+1-941-737-4127",
          email: "list@davisgarnettsells.com",
          member: [
            { "@type": "Person", name: "Mark Davis", identifier: "FL Lic BK3209459" },
            { "@type": "Person", name: "Rachael Garnett", identifier: "FL Lic SL3378601" },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Commercial Hub",
            item: `${SITE_URL}/hub/commercial-tampa-bay`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Commercial Mentoring",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProposalNav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <FaviconHeroBackground variant="dark" />
        <div className="relative z-10 max-w-screen-xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mb-6">
            <Link href="/" className="hover:text-[#D4AF37]">
              Home
            </Link>
            <span>/</span>
            <Link href="/hub/commercial-tampa-bay" className="hover:text-[#D4AF37]">
              Commercial Hub
            </Link>
            <span>/</span>
            <span className="text-[#D4AF37] font-bold">Commercial Mentoring</span>
          </div>

          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.28em] font-bold block mb-3">
            Real-World Deal Underwriting • Tampa Bay &amp; Central FL
          </span>
          <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl leading-tight mb-6">
            Commercial Real Estate <span className="text-[#D4AF37]">Mentoring</span>
          </h1>
          <p className="text-white/85 font-light text-base md:text-lg max-w-3xl leading-relaxed mb-8">
            Skip expensive weekend seminars. Work directly with Mark Davis and Rachael Garnett on live Tampa Bay retail, mixed-use, NNN lease, SBA 504 owner-user, and land deals so you learn how real numbers work before writing an LOI.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#request-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Book a Strategy Session <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/properties#commercial-land"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Building2 className="w-4 h-4 text-[#D4AF37]" /> View Commercial &amp; Land Offerings
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <section className="py-20 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.55fr_1fr] gap-12 items-start">
        <div className="space-y-10">
          {/* Quick Answer */}
          <div className="bg-[#f5f3ef] border-l-4 border-[#D4AF37] rounded-r-2xl p-6 md:p-7">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block mb-2">
              Quick Answer · How Mentoring Works
            </span>
            <p className="text-[#111]/85 text-base leading-relaxed font-light">
              Davis &amp; Garnett Commercial Mentoring gives business owners, newer commercial agents, and investors direct access to Mark Davis and Rachael Garnett. You learn NNN lease math, SBA 504 buying, county zoning rules, 1031 swaps, and due diligence step by step on real Florida deals.
            </p>
          </div>

          {/* 6 Core Tracks */}
          <div>
            <h2 className="font-aiveritas text-3xl text-[#111] mb-6">
              Six Skills You Master Inside Commercial Mentoring
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Layers,
                  title: "1. True NOI & Cap Rate Math",
                  copy: "Strip fluff out of seller flyers. Check real vacancy, property tax resets, windstorm insurance spikes, and roof reserves.",
                },
                {
                  icon: Landmark,
                  title: "2. SBA 504 Owner-User Deals",
                  copy: "Help Tampa business owners buy their own clinic, office, or shop with 10% down fixed loans instead of steep rent hikes.",
                },
                {
                  icon: Handshake,
                  title: "3. NNN vs. Modified Gross Leases",
                  copy: "Spot hidden landlord traps in CAM fees, base-year expense stops, tenant credit risk, and renewal rate bumps.",
                },
                {
                  icon: MapPinned,
                  title: "4. Zoning & Future Land Use",
                  copy: "Read Hillsborough, Pinellas, Pasco, and Polk zoning codes, parking counts, ADA triggers, and mixed-use overlays.",
                },
                {
                  icon: Compass,
                  title: "5. Central FL Land & Greenbelt",
                  copy: "Audit soil perc tests, wetlands, road frontage, three-phase power, and farm Greenbelt tax savings on large tracts.",
                },
                {
                  icon: Building2,
                  title: "6. LOIs, Phase I ESA & 1031 Clocks",
                  copy: "Draft clean Letters of Intent, track 30-to-60-day study windows, review Phase I soil checks, and hit 45/180-day 1031 dates.",
                },
              ].map((track) => {
                const Icon = track.icon;
                return (
                  <div
                    key={track.title}
                    className="p-6 rounded-2xl bg-[#fbfbf9] border border-[#111]/10"
                  >
                    <Icon className="w-6 h-6 text-[#9A7D3A] mb-3" />
                    <h3 className="font-aiveritas text-xl text-[#111] mb-2">{track.title}</h3>
                    <p className="text-sm text-[#111]/75 font-light leading-relaxed">
                      {track.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Who It Fits */}
          <div className="bg-white border border-[#111]/10 rounded-2xl p-7 shadow-sm">
            <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
              Built for Investors, Business Owners &amp; Aligned Agents
            </h2>
            <ul className="space-y-3 text-sm text-[#111]/85">
              {[
                "Small business owners ready to stop paying commercial rent and own their building cleanly.",
                "Residential agents at Align Right Realty Carrollwood or partner offices stepping into mixed-use, NNN retail, or acreage transactions.",
                "Out-of-state buyers trading rental houses into higher-yield Florida commercial assets through a 1031 exchange.",
                "Family offices or land buyers evaluating Polk County US-27 / US-98 and Marion County growth tracts.",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sticky Column */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <ServiceInquiryForm
            mode="commercial-mentoring"
            title="Apply for Commercial Mentoring"
            subtitle="Tell Mark & Rachael where you are today and what commercial deal or skill set you want to tackle first."
            submitLabel="Request Mentoring Call"
          />

          <div className="bg-[#f5f3ef] rounded-2xl p-6 border border-[#111]/10 space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block">
              Keep Exploring Commercial
            </span>
            {[
              { label: "Commercial Broker Price Opinions (BPO)", href: "/services/commercial-bpo" },
              { label: "Commercial & Mixed-Use Guide", href: "/knowledge-hub/commercial-real-estate-investing-florida" },
              { label: "Tampa Bay Commercial Topic Hub", href: "/hub/commercial-tampa-bay" },
              { label: "Cap Rate & NOI Calculator", href: "/tools/cap-rate-calculator" },
              { label: "Commercial Rent & NNN Calculator", href: "/tools/commercial-rent-calculator" },
              { label: "Align Right Realty Carrollwood Office", href: "/about/align-right-realty-carrollwood" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between text-xs font-bold text-[#111] hover:text-[#9A7D3A] py-2 border-b border-[#111]/8 last:border-none"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3A]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


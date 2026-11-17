import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  FileSpreadsheet,
  Scale,
  ShieldAlert,
  TrendingUp,
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
  title: "Commercial Broker Price Opinions (BPO) in Tampa Bay | Davis & Garnett",
  description:
    "Fast, data-backed Commercial Broker Price Opinions (BPOs) across Tampa Bay and Central Florida for owners, lenders, attorneys, estate planners, and 1031 exchange sellers.",
  path: "/services/commercial-bpo",
  image: "/city-photos/brandon-riverview-commercial.jpg",
});

export default function CommercialBpoPage() {
  const pageUrl = `${SITE_URL}/services/commercial-bpo`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Commercial Broker Price Opinion (BPO) — Tampa Bay & Central Florida",
        serviceType: "Commercial Real Estate Valuation & Broker Price Opinion",
        url: pageUrl,
        description:
          "Practical commercial property and land valuation reports built from live Tampa Bay sales comps, cap rates, net operating income (NOI), and lease demand.",
        areaServed: [
          "Tampa, FL",
          "Brandon, FL",
          "St. Petersburg, FL",
          "Clearwater, FL",
          "Wesley Chapel, FL",
          "Polk County, FL",
          "Marion County, FL",
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
            { "@type": "Person", name: "Mark Davis", identifier: "FL Lic #3209459" },
            { "@type": "Person", name: "Rachael Garnett", identifier: "FL Lic #3378601" },
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
            name: "Commercial BPO",
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
            <span className="text-[#D4AF37] font-bold">Commercial BPO</span>
          </div>

          <span className="text-[#D4AF37] text-xs uppercase tracking-[0.28em] font-bold block mb-3">
            Tampa Bay Commercial Valuation • Florida Ch. 475
          </span>
          <h1 className="font-aiveritas text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl leading-tight mb-6">
            Commercial Broker Price Opinions <span className="text-[#D4AF37]">(BPOs)</span>
          </h1>
          <p className="text-white/85 font-light text-base md:text-lg max-w-3xl leading-relaxed mb-8">
            Need to know what your Tampa Bay retail strip, office, warehouse, or Central Florida tract could sell for today? Mark Davis and Rachael Garnett build clear BPO reports from real closed sales, active lease demand, and current buyer cap rates—in days instead of weeks.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#request-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Request Your Commercial BPO <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/tools/cap-rate-calculator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Calculator className="w-4 h-4 text-[#D4AF37]" /> Run Cap Rate Calculator
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
              Quick Answer · Commercial BPO
            </span>
            <p className="text-[#111]/85 text-base leading-relaxed font-light">
              A Commercial Broker Price Opinion (BPO) gives owners, lenders, and attorneys a fast value range grounded in active Tampa Bay buyer demand, trailing Net Operating Income (NOI), and recent closed comps. Unlike a $3,500+ bank appraisal, most BPOs finish within 3 to 5 business days.
            </p>
          </div>

          {/* 3 Use Cases */}
          <div>
            <h2 className="font-aiveritas text-3xl text-[#111] mb-6">
              Who Uses a Tampa Bay Commercial BPO?
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Building2,
                  title: "Property Owners & Sellers",
                  copy: "Test your realistic sale price, compare SBA 504 owner-user buyers vs. passive NNN investors, or weigh a refinance before paying listing fees.",
                },
                {
                  icon: TrendingUp,
                  title: "1031 Tax-Deferred Trades",
                  copy: "Confirm net proceeds early so you hit your 45-day identification window with real replacement buildings or land lined up.",
                },
                {
                  icon: Scale,
                  title: "Attorneys, Estates & CPAs",
                  copy: "Support probate steps, partner buyouts, divorce settlements, and portfolio tax planning with documented street-level comps.",
                },
                {
                  icon: FileSpreadsheet,
                  title: "Lenders & Special Servicers",
                  copy: "Check current lease-up speeds, local vacancy risk, and NNN wind insurance impacts across Hillsborough, Pinellas, Pasco, and Polk.",
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="p-6 rounded-2xl bg-[#fbfbf9] border border-[#111]/10"
                  >
                    <Icon className="w-6 h-6 text-[#9A7D3A] mb-3" />
                    <h3 className="font-aiveritas text-xl text-[#111] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#111]/75 font-light leading-relaxed">
                      {card.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What Goes Into Our Report */}
          <div className="bg-white border border-[#111]/10 rounded-2xl p-7 shadow-sm">
            <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] mb-4">
              What Mark &amp; Rachael Check Inside Every Report
            </h2>
            <p className="text-sm text-[#111]/75 font-light leading-relaxed mb-5">
              Generic online spreadsheets miss Florida reality. Our commercial BPO combines boots-on-the-ground corridor knowledge with verified property numbers:
            </p>
            <ul className="space-y-3 text-sm text-[#111]/85">
              {[
                "Verified trailing 12-month NOI, triple-net (NNN) expense pass-throughs, and landlord roof/HVAC duties.",
                "Comparable sales within 12–24 months along US-19, SR-60 (Brandon Blvd), Dale Mabry, I-75, and Polk US-27.",
                "Zoning, parking ratios, separate utility meters, and Future Land Use up-zoning potential.",
                "Current lender cap rate expectations vs. owner-user price-per-square-foot limits.",
                "Clear summary PDF delivered to owners, attorneys, CPAs, or family trustees.",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7D3A] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Florida Statutory Disclosure */}
          <div className="bg-amber-50 border border-amber-300/70 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              Florida Statutes Chapter 475 (§475.612) Disclosure
            </div>
            <p className="text-xs sm:text-sm text-amber-950/85 leading-relaxed">
              A Broker Price Opinion (BPO) prepared by Mark Davis (FL Lic #3209459) and Rachael Garnett (FL Lic #3378601) at Align Right Realty Carrollwood (#BK3401606) is an opinion of probable selling or leasing price prepared by licensed Florida real estate brokers. <strong>It is not a certified real estate appraisal</strong> and may not be used in place of an appraisal where state law or federal lending rules require a state-certified appraiser.
            </p>
          </div>
        </div>

        {/* Right Sticky Column: Request Form + Connected Tools */}
        <div className="space-y-6 lg:sticky lg:top-28">
          <ServiceInquiryForm
            mode="commercial-bpo"
            title="Order Your Commercial or Land BPO"
            subtitle="Complimentary for property owners considering a sale, lease-up, or 1031 exchange. Fast formal fee quotes available for attorneys and estates."
            submitLabel="Request BPO Report"
          />

          <div className="bg-[#f5f3ef] rounded-2xl p-6 border border-[#111]/10 space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block">
              Connected Commercial Resources
            </span>
            {[
              { label: "BPO vs. Commercial Appraisal Guide", href: "/knowledge-hub/commercial-bpo-vs-appraisal-florida" },
              { label: "Plain-English BPO Glossary Entry", href: "/glossary/bpo" },
              { label: "Commercial & Mixed-Use Investing Guide", href: "/knowledge-hub/commercial-real-estate-investing-florida" },
              { label: "Commercial Rent & NNN Calculator", href: "/tools/commercial-rent-calculator" },
              { label: "IRS 1031 Exchange Deadline Calculator", href: "/tools/1031-deadline-calculator" },
              { label: "One-on-One Commercial Mentoring", href: "/services/commercial-mentoring" },
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


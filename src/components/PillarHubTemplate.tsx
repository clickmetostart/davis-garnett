import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calculator,
  ChevronDown,
  Compass,
  MapPin,
  Phone,
  Route,
  ShieldCheck,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import PillarHubActions from "@/components/PillarHubActions";
import PillarHubJumpGrid from "@/components/PillarHubJumpGrid";
import FaviconHeroBackground from "@/components/FaviconHeroBackground";
import HubCardSlider from "@/components/HubCardSlider";
import type { PillarHubConfig } from "@/data/pillarHubs";
import { LIVE_GUIDED_TOURS } from "@/data/tours";
import { getRelatedListingsForTags } from "@/lib/spiderweb";
import { SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

const PLACEHOLDER_IMG = "/placeholders/dg-brand-placeholder.webp";

export default function PillarHubTemplate({ hub }: { hub: PillarHubConfig }) {
  const isCommercial = hub.track === "commercial";
  const allListings = getRelatedListingsForTags(hub.tags, undefined, 12);
  const filteredListings = allListings
    .filter((l) =>
      isCommercial
        ? /commercial|land/i.test(`${l.category} ${l.propertyType}`)
        : !/commercial/i.test(l.category)
    )
    .slice(0, 6);

  const tours = hub.preferredTourSlugs
    .map((slug) => LIVE_GUIDED_TOURS.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const canonicalUrl = `${SITE_URL}/${hub.slug}`;

  const trustStats = isCommercial
    ? [
        { stat: "Full Cycle", label: "Buy, Sell, Lease & Land", sub: "Businesses, plazas & acreage" },
        { stat: "Direct", label: "Principals on Every Call", sub: "Mark Davis & Rachael Garnett" },
        { stat: "Discreet", label: "Quiet or Public Marketing", sub: "Tailored to tenant sensitivity" },
        { stat: "Regional", label: "Tampa Bay & Central FL", sub: "Retail, medical, flex & land" },
      ]
    : [
        { stat: "$250M+", label: "Combined Team Success", sub: "Across Greater Tampa Bay" },
        { stat: "20+ Yrs", label: "Local Market Experience", sub: "Residential & Commercial" },
        { stat: "Direct", label: "Mark & Rachael Personally", sub: "Zero junior handoffs, ever" },
        { stat: "Full-Service", label: "Buy, Sell & Relocate", sub: "Homes, condos, waterfront & new builds" },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${hub.title} ${hub.accentWord}`,
        description: hub.quickAnswer,
        url: canonicalUrl,
        image: `${SITE_URL}${hub.teamImage || hub.heroImage}`,
        datePublished: hub.publishedAt,
        dateModified: hub.updatedAt,
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
          url: SITE_URL,
          sameAs: TEAM_SAME_AS,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: isCommercial ? "Commercial Realtor Hub" : "Residential Realtor Hub",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#D4AF37] selection:text-white font-sans">
      <ProposalNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── PILLAR HUB HERO (DG Monogram Pattern — Dark for Commercial, Light for Residential) ── */}
      <section
        className={`relative w-full pt-32 pb-16 px-6 lg:px-10 overflow-hidden min-h-[680px] flex flex-col justify-center border-b ${
          isCommercial
            ? "bg-[#111111] text-white border-[#D4AF37]/30"
            : "bg-[#f5f3ef] text-[#111111] border-[#111111]/10"
        }`}
      >
        <FaviconHeroBackground variant={isCommercial ? "dark" : "light"} />

        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className={`text-xs uppercase tracking-[0.3em] font-bold block mb-4 ${
                isCommercial ? "text-[#D4AF37]" : "text-[#9A7D3A]"
              }`}
            >
              {isCommercial
                ? "Davis & Garnett Commercial · Tampa Bay & Central Florida"
                : "Davis & Garnett Residential · Greater Tampa Bay"}
            </span>

            <h1
              className={`font-aiveritas text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-6 ${
                isCommercial ? "text-white" : "text-[#111111]"
              }`}
            >
              {isCommercial ? (
                <>
                  Tampa Bay <br />
                  <span className="text-[#D4AF37]">Commercial.</span>
                </>
              ) : (
                <>
                  Tampa Bay <br />
                  <span className="text-[#9A7D3A]">Residential.</span>
                </>
              )}
            </h1>

            <p
              className={`font-light text-base md:text-[17px] lg:text-[18px] leading-relaxed max-w-2xl mx-auto mb-8 ${
                isCommercial ? "text-white/85" : "text-[#111111]/75"
              }`}
            >
              {hub.subtitle}
            </p>

            <PillarHubActions
              track={hub.track}
              getStartedHref={hub.getStartedHref}
              getStartedLabel={hub.getStartedLabel}
              secondaryHeroHref={hub.secondaryHeroHref}
              secondaryHeroLabel={hub.secondaryHeroLabel}
              variant="hero"
              surface={isCommercial ? "dark" : "light"}
              align="center"
            />
          </div>
        </div>
      </section>

      {/* ── CLEAN BELOW-HERO SECTION JUMP GRID (Eased Smooth Glide) ── */}
      <PillarHubJumpGrid isCommercial={isCommercial} />

      {/* ── LANDER CREDENTIAL BAR (Matches Homepage Advisor Stats) ── */}
      <section className="py-12 px-6 md:px-8 bg-white border-b border-[#111]/10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {trustStats.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <span className="font-aiveritas text-3xl md:text-5xl text-[#111] block">
                {item.stat}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9A7D3A] block">
                {item.label}
              </span>
              <span className="text-xs text-[#111]/55 font-light block">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL STORYTELLING BAND (Secondary Homepage Soul) ── */}
      <section className="py-20 md:py-24 px-6 md:px-10 bg-[#fbfbf9] border-b border-[#111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-3">
              {isCommercial ? "Practical Commercial Advocacy" : "Approachable Local Representation"}
            </span>
            <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] mb-6 leading-tight">
              {isCommercial
                ? "Real Numbers, Clean Zoning & Direct Answers."
                : "Clarity Before You Tour, Protection When You Offer."}
            </h2>
            <p className="text-base md:text-lg text-[#111]/80 font-light leading-relaxed mb-5">
              {hub.quickAnswer}
            </p>
            <p className="text-base text-[#111]/75 font-light leading-relaxed mb-8">
              {hub.howWeHandleIt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest">
              <Link
                href={hub.getStartedHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] transition-colors"
              >
                {hub.getStartedLabel} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#9A7D3A] hover:text-[#111] transition-colors"
              >
                Meet Mark &amp; Rachael <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Framed Team / Advisory Focus Card */}
          <div className="rounded-2xl overflow-hidden bg-[#111111] text-white border border-[#D4AF37]/30 shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]">
              <Image
                src={hub.teamImage || "/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-9.jpg"}
                alt="Davis & Garnett Real Estate Advisors Tampa Bay"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/20" />
            </div>
            <div className="p-7 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.22em]">
                <ShieldCheck className="w-4 h-4" /> Align Right Realty Carrollwood
              </div>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                {isCommercial
                  ? "Whether touring an office building for your practice, pricing a strip plaza, or checking highway land access, you deal straight with Mark and Rachael."
                  : "Whether comparing quiet cul-de-sacs in Carrollwood, downsizing to a low-upkeep condo, or pricing your longtime family house, you deal straight with Mark and Rachael."}
              </p>
              <div className="pt-3 border-t border-white/15 flex flex-wrap gap-5 text-xs">
                <a href="tel:941-737-4127" className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-white font-bold">
                  <Phone className="w-3.5 h-3.5" /> Mark: 941-737-4127
                </a>
                <a href="tel:727-808-3344" className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:text-white font-bold">
                  <Phone className="w-3.5 h-3.5" /> Rachael: 727-808-3344
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES GRID (CLEAN 3-COLUMN SHOWCASE, NOT A SLIDER WALL) ── */}
      <section id="services" className="scroll-mt-24 py-20 md:py-24 px-6 md:px-10 bg-white border-b border-[#111]/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.28em] font-bold block mb-2.5">
                {isCommercial ? "How We Represent CRE & Land" : "How We Help Buyers & Sellers"}
              </span>
              <h2 className="font-aiveritas text-3xl md:text-5xl text-[#111] leading-tight">
                {hub.serviceSectionTitle}
              </h2>
            </div>
            <Link
              href={hub.getStartedHref}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9A7D3A] hover:text-[#111] shrink-0"
            >
              {hub.getStartedLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {hub.serviceLanes.map((lane) => (
              <Link
                key={lane.id}
                href={lane.primaryCta.href}
                className="group rounded-2xl overflow-hidden bg-[#fbfbf9] hover:bg-[#111111] border border-[#111]/10 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111]">
                    <Image
                      src={lane.image || PLACEHOLDER_IMG}
                      alt={lane.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-4 px-3 py-1 bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {lane.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-white transition-colors mb-2.5">
                      {lane.title}
                    </h3>
                    <p className="text-sm text-[#111]/75 group-hover:text-white/75 font-light leading-relaxed transition-colors">
                      {lane.summary}
                    </p>
                  </div>
                </div>
                <div className="px-7 pb-6 pt-4 border-t border-[#111]/8 group-hover:border-white/10 flex items-center justify-between transition-colors">
                  <span className="text-xs font-semibold text-[#9A7D3A] group-hover:text-[#D4AF37]">
                    {lane.primaryCta.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9A7D3A] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHERRY ON TOP: CORRIDORS & TERRITORY SLIDER ── */}
      <HubCardSlider
        id="corridors"
        eyebrow={isCommercial ? "Markets & Trade Corridors" : "Tampa Bay Neighborhoods"}
        title={hub.corridorTitle}
        description={hub.corridorIntro}
        ctaHref="/developments"
        ctaLabel="Explore Developments"
        bgClass="bg-[#f5f3ef]"
      >
        {hub.corridors.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group w-full sm:w-[340px] md:w-[360px] snap-start snap-always bg-white border border-[#111]/10 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl shrink-0"
          >
            <div>
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-[#111]">
                <Image
                  src={c.image || PLACEHOLDER_IMG}
                  alt={c.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3.5 left-4 px-3 py-1 bg-black/80 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {c.region}
                </span>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-aiveritas text-2xl text-[#111] group-hover:text-[#9A7D3A] transition-colors mb-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-[#111]/75 text-sm font-light leading-relaxed line-clamp-3">
                  {c.desc}
                </p>
              </div>
            </div>
            <div className="px-6 md:px-7 pb-6 pt-4 border-t border-[#111]/8 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#111]/60 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#9A7D3A]" /> Local Corridor
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A7D3A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {c.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </HubCardSlider>

      {/* ── DARK OBSIDIAN PORTFOLIO & TOOLS SHOWCASE BAND ── */}
      {filteredListings.length > 0 && (
        <HubCardSlider
          id="portfolio"
          eyebrow="Featured Portfolio & Tools"
          title={
            isCommercial
              ? "Active Commercial & Land Offerings"
              : "Active Residential & Waterfront Homes"
          }
          description="Sample active opportunities from our portfolio—or jump straight to our calculators and local driving tours."
          ctaHref={isCommercial ? "/properties#commercial-land" : "/properties?category=Residential"}
          ctaLabel="View Full Portfolio"
          bgClass="bg-[#111111]"
          dark
        >
          {filteredListings.map((listing) => (
            <Link
              key={listing.slug}
              href={`/listings/${listing.slug}`}
              className="group w-full sm:w-[340px] md:w-[355px] snap-start snap-always bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4AF37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all shrink-0"
            >
              <div>
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={
                      (typeof listing.images?.main === "string" && listing.images.main) ||
                      (Array.isArray(listing.images?.gallery) && listing.images.gallery[0]) ||
                      PLACEHOLDER_IMG
                    }
                    alt={listing.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-4 px-3 py-1 bg-black/80 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded-sm">
                    {listing.category} · {listing.propertyType}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                    {listing.city}, {listing.state} · {listing.price}
                  </div>
                  <h3 className="font-aiveritas text-2xl text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {listing.title}
                  </h3>
                </div>
              </div>
              <div className="px-6 md:px-7 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-white/60 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" /> {listing.county} County
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Listing <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </HubCardSlider>
      )}

      {/* ── CLEAN TOOLS, TOURS & GLOSSARY RIBBON (DARK FOOTER CONTINUATION) ── */}
      <section id="tours" className="scroll-mt-24 py-12 px-6 md:px-10 bg-[#0b0b0b] text-white border-b border-[#D4AF37]/20">
        <div className="max-w-screen-xl mx-auto space-y-8">
          <div className="grid md:grid-cols-3 gap-4">
            {hub.tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-[#D4AF37] transition-colors flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5 mb-1">
                    <Calculator className="w-3.5 h-3.5" /> {tool.tag}
                  </span>
                  <div className="font-aiveritas text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                    {tool.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mr-2">
                Terms Explained:
              </span>
              {hub.glossaryChips.slice(0, 5).map((chip) => (
                <Link
                  key={chip.href}
                  href={chip.href}
                  className="px-3 py-1.5 rounded-full bg-white/8 hover:bg-[#D4AF37] hover:text-[#111] text-xs font-semibold transition-colors"
                >
                  {chip.term}
                </Link>
              ))}
              <Link href="/glossary" className="text-xs font-bold text-white/70 hover:text-[#D4AF37] underline ml-1">
                All Terms →
              </Link>
            </div>

            {tours.length > 0 && (
              <Link
                href={`/tours/${tours[0].slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white shrink-0 transition-colors"
              >
                <Route className="w-4 h-4" /> Featured Area Drive: {tours[0].title} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── ORIGINAL 5 TACTICAL CHECKS + DIRECT-ANSWER FAQs ── */}
      <section id="checks-faq" className="scroll-mt-24 py-20 px-6 md:px-10 bg-white border-b border-[#111]/10">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              {hub.checksEyebrow}
            </span>
            <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111] mb-6">
              {hub.checksTitle}
            </h2>
            <div className="space-y-3.5">
              {hub.checks.map((ck) => (
                <Link
                  key={ck.num}
                  href={ck.href}
                  className="group p-5 rounded-xl bg-[#fbfbf9] border border-[#111]/10 hover:border-[#D4AF37] flex items-center gap-4 transition-all shadow-xs"
                >
                  <span className="font-aiveritas text-3xl text-[#C8A951] shrink-0 w-10">
                    {ck.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-aiveritas text-lg text-[#111] group-hover:text-[#9A7D3A] transition-colors">
                      {ck.title}
                    </h3>
                    <p className="text-xs text-[#111]/70 font-light mt-0.5 leading-relaxed">
                      {ck.body}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9A7D3A] shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[#9A7D3A] text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Straight Answers
            </span>
            <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111] mb-6">
              Frequently Asked
            </h2>
            <div className="space-y-3.5">
              {hub.faqs.map((faq, idx) => (
                <details
                  key={faq.question}
                  open={idx === 0}
                  className="group bg-[#fbfbf9] border border-[#111]/10 rounded-xl overflow-hidden shadow-xs"
                >
                  <summary className="flex items-center justify-between gap-3 p-5 cursor-pointer list-none font-bold text-sm md:text-base text-[#111]">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#9A7D3A] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[#111]/75 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CONVERSION CTA ── */}
      <section id="closing-cta" className="scroll-mt-24 py-24 px-6 md:px-12 bg-[#111111] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.28em] font-bold mb-4">
            <Compass className="w-4 h-4" /> Your Move, Your Pace
          </span>
          <h2 className="font-aiveritas text-3xl md:text-5xl text-white mb-5 leading-tight">
            {isCommercial
              ? "Ready to Start Your Commercial or Land Project?"
              : "Ready to Start Your Tampa Bay Home Project?"}
          </h2>
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed mb-10">
            Answer 7 quick questions online so Mark and Rachael can prepare tailored options for you—or download the complete Getting Started Guide (PDF) to bring to our first conversation.
          </p>

          <PillarHubActions
            track={hub.track}
            getStartedHref={hub.getStartedHref}
            getStartedLabel={hub.getStartedLabel}
            secondaryHeroHref={hub.secondaryHeroHref}
            secondaryHeroLabel={hub.secondaryHeroLabel}
            variant="closing"
          />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

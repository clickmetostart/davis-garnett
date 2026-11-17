import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calculator,
  Calendar,
  ChevronDown,
  Home,
  MapPin,
  Sparkles,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import TopicHubLeadForm from "@/components/TopicHubLeadForm";
import PdfAvailableBadge from "@/components/PdfAvailableBadge";
import type { TopicHubConfig } from "@/data/topicHubs";
import {
  getRelatedAreasForTags,
  getRelatedDevelopmentsForTags,
  getRelatedGlossaryForTags,
  getRelatedGuidesForTags,
  getRelatedListingsForTags,
} from "@/lib/spiderweb";
import { SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

export default function TopicHubTemplate({ hub }: { hub: TopicHubConfig }) {
  const listings = getRelatedListingsForTags(hub.tags, undefined, 4);
  const guides = getRelatedGuidesForTags(hub.tags, [], undefined, 6);
  const developments = getRelatedDevelopmentsForTags(hub.tags, [], undefined, 3);
  const areas = getRelatedAreasForTags(hub.tags, [], undefined, 3);
  const glossaryTerms = getRelatedGlossaryForTags(hub.tags, [], undefined, 5);
  const heroImage = areas[0]?.heroImage || guides[0]?.heroImage || "/davis-garnett-real-estate-advisors-cover-image-2.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: hub.title,
        description: hub.quickAnswer,
        url: `${SITE_URL}/hub/${hub.slug}`,
        image: heroImage.startsWith("http") ? heroImage : `${SITE_URL}${heroImage}`,
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
          { "@type": "ListItem", position: 2, name: "Knowledge Hub", item: `${SITE_URL}/knowledge-hub` },
          { "@type": "ListItem", position: 3, name: hub.title, item: `${SITE_URL}/hub/${hub.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans">
      <ProposalNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 md:px-8 bg-[#111] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-screen-xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-white/60 mb-5">
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
            <span>/</span>
            <Link href="/knowledge-hub" className="hover:text-[#D4AF37]">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-[#D4AF37]">{hub.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-white/75 mb-4">
            <span className="px-3 py-1 bg-[#D4AF37] text-[#111] font-bold rounded-sm">
              {hub.badge}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Last updated {hub.updatedAt.slice(0, 10)}
            </span>
          </div>

          <h1 className="font-aiveritas text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl mb-4 leading-tight">
            {hub.title}
          </h1>
          <p className="text-white/80 text-base md:text-xl font-light max-w-3xl leading-relaxed mb-8">
            {hub.subtitle}
          </p>
          <p className="text-xs uppercase tracking-widest text-white/60">
            Mark Davis (FL Lic #3209459) &amp; Rachael Garnett (FL Lic #3378601) • Align Right Realty Carrollwood
          </p>
        </div>
      </section>

      {/* Main Content + Lead Sidebar */}
      <section className="py-16 px-6 md:px-8 max-w-screen-xl mx-auto grid lg:grid-cols-[1.8fr_1fr] gap-12 items-start">
        <div className="space-y-12">
          {/* Quick Answer */}
          <div className="bg-[#111] text-white p-6 md:p-8 rounded-2xl border border-[#D4AF37]/40 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
              <Sparkles className="w-4 h-4" /> Quick Answer
            </div>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-light">
              {hub.quickAnswer}
            </p>
          </div>

          {/* Local Facts with Named Sources */}
          <div className="grid sm:grid-cols-3 gap-4">
            {hub.localFacts.map((fact) => (
              <div key={fact.label} className="p-5 rounded-xl bg-[#f5f3ef] border border-[#111]/10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] block mb-1.5">
                  {fact.label}
                </span>
                <div className="font-aiveritas text-lg text-[#111] mb-2">{fact.value}</div>
                <span className="text-[11px] text-[#111]/55">Source: {fact.source}</span>
              </div>
            ))}
          </div>

          {/* How Mark & Rachael Handle It */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#f5f3ef] border-l-4 border-[#D4AF37]">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9A7D3A] block mb-2">
              Local Advisor Playbook
            </span>
            <h2 className="font-aiveritas text-2xl text-[#111] mb-3">
              How Mark &amp; Rachael Handle It
            </h2>
            <p className="text-sm md:text-base text-[#111]/80 leading-relaxed font-light">
              {hub.howWeHandleIt}
            </p>
          </div>

          {/* Auto-Matched Active Listings */}
          {listings.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#111]/10 pb-3">
                <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] flex items-center gap-2">
                  <Home className="w-5 h-5 text-[#9A7D3A]" /> Matching Active Properties
                </h2>
                <Link href="/properties" className="text-xs font-bold uppercase tracking-wider text-[#9A7D3A] hover:underline">
                  View All Listings →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {listings.map((listing) => {
                  const heroSrc =
                    typeof listing.images?.hero === "string"
                      ? listing.images.hero
                      : Array.isArray(listing.images) && listing.images[0]
                      ? listing.images[0]
                      : "/tampa-bay-luxury-market.jpg";
                  return (
                    <Link
                      key={listing.slug}
                      href={`/listings/${listing.slug}`}
                      className="group rounded-2xl overflow-hidden border border-[#111]/10 hover:border-[#D4AF37] bg-white shadow-sm transition-all"
                    >
                      <div className="relative h-44 bg-[#111]">
                        <Image src={heroSrc} alt={listing.title} fill className="object-cover" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#111]/85 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded">
                          {listing.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="text-xs text-[#9A7D3A] font-bold uppercase tracking-wider mb-1">
                          {listing.city}, {listing.state} • {listing.price}
                        </div>
                        <h3 className="font-aiveritas text-lg text-[#111] group-hover:text-[#9A7D3A] transition-colors">
                          {listing.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Auto-Matched Guides & Q&As */}
          {guides.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#111]/10 pb-3">
                <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#9A7D3A]" /> Guides &amp; Answers for This Hub
                </h2>
                <Link href="/knowledge-hub" className="text-xs font-bold uppercase tracking-wider text-[#9A7D3A] hover:underline">
                  All Guides →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {guides.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/knowledge-hub/${item.slug}`}
                    className="p-5 rounded-xl bg-[#f5f3ef] hover:bg-[#D4AF37]/15 border border-[#111]/10 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A]">
                          {item.type === "guide" ? "Advisory Guide" : "Q&A"} • {item.category}
                        </span>
                        {item.type === "guide" && (
                          <PdfAvailableBadge variant="inline" label="PDF Available" />
                        )}
                      </div>
                      <h3 className="font-aiveritas text-lg text-[#111] mb-2">{item.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-[#111] flex items-center gap-1 mt-2">
                      Read Now <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3A]" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matching Areas & Developments */}
          {(areas.length > 0 || developments.length > 0) && (
            <div className="space-y-5">
              <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
                Connected Areas &amp; New Developments
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/knowledge-hub/areas/${area.slug}`}
                    className="p-4 rounded-xl bg-white border border-[#111]/12 hover:border-[#D4AF37] flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Area Guide
                      </span>
                      <div className="text-sm font-bold text-[#111]">{area.name}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                  </Link>
                ))}
                {developments.map((dev) => (
                  <Link
                    key={dev.slug}
                    href={`/developments/${dev.slug}`}
                    className="p-4 rounded-xl bg-white border border-[#111]/12 hover:border-[#D4AF37] flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#9A7D3A] flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> Development
                      </span>
                      <div className="text-sm font-bold text-[#111]">{dev.name}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {hub.faqs.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[#111]/10">
              <h2 className="font-aiveritas text-2xl md:text-3xl text-[#111]">
                Frequently Asked Questions
              </h2>
              {hub.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  open={idx === 0}
                  className="group bg-[#f5f3ef] border border-[#111]/10 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-[#111]">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#9A7D3A] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm md:text-base text-[#111]/75 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-28">
          <TopicHubLeadForm hubSlug={hub.slug} hubTitle={hub.title} />

          {/* Matching Glossary Terms */}
          {glossaryTerms.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-[#111]/10 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#9A7D3A] block">
                Key Glossary Terms
              </span>
              {glossaryTerms.map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#f5f3ef] hover:bg-[#D4AF37]/15 text-xs font-bold text-[#111]"
                >
                  <span>{term.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3A]" />
                </Link>
              ))}
            </div>
          )}

          {/* Related Tools & Services */}
          <div className="bg-[#111] text-white rounded-2xl p-6 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#D4AF37] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> Calculators &amp; Tools
            </span>
            {hub.toolLinks.map((tl) => (
              <Link
                key={tl.href}
                href={tl.href}
                className="block p-3.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] transition-colors"
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-1">{tl.label}</div>
                <div className="text-[11px] opacity-80">{tl.desc}</div>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}


import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetailClient from "./TourDetailClient";
import { getGuidedTourBySlug, LIVE_GUIDED_TOURS, buildGoogleMapsRouteUrl } from "@/data/tours";
import { AREAS, ALL_GUIDES_AND_QUESTIONS } from "@/data/knowledgeHub";
import { buildPageMetadata, SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LIVE_GUIDED_TOURS.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getGuidedTourBySlug(slug);
  if (!tour) return {};

  return buildPageMetadata({
    title: `${tour.title} | Davis & Garnett Guided Tour`,
    description: tour.quickAnswer,
    path: `/tours/${tour.slug}`,
    image: tour.heroImage,
    type: "article",
  });
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getGuidedTourBySlug(slug);
  if (!tour) notFound();

  const relatedAreas = AREAS.filter((a) => tour.relatedAreaSlugs.includes(a.slug)).slice(0, 3);
  const relatedGuides = ALL_GUIDES_AND_QUESTIONS.filter((g) =>
    tour.relatedGuideSlugs.includes(g.slug)
  ).slice(0, 3);
  const siblingTours = LIVE_GUIDED_TOURS.filter(
    (t) => t.slug !== tour.slug && t.track === tour.track
  ).slice(0, 2);

  const pageUrl = `${SITE_URL}/tours/${tour.slug}`;
  const mapsRouteUrl = buildGoogleMapsRouteUrl(tour.stops);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${tour.title} — Sequential Location & Tour Guide`,
        description: tour.quickAnswer,
        image: tour.heroImage.startsWith("http") ? tour.heroImage : `${SITE_URL}${tour.heroImage}`,
        datePublished: tour.publishedAt,
        dateModified: tour.updatedAt,
        mainEntityOfPage: pageUrl,
        about: {
          "@type": "Place",
          name: `${tour.county} — ${tour.corridor.join(", ")}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: tour.startAddress,
            addressRegion: "FL",
            addressCountry: "US",
          },
        },
        author: [
          { "@type": "Person", name: "Mark Davis", identifier: "FL Lic BK3209459" },
          { "@type": "Person", name: "Rachael Garnett", identifier: "FL Lic SL3378601" },
        ],
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
          url: SITE_URL,
          sameAs: TEAM_SAME_AS,
        },
      },
      {
        "@type": "ItemList",
        name: `${tour.title} Driving Stops`,
        itemListElement: tour.stops.map((stop) => ({
          "@type": "ListItem",
          position: stop.order,
          item: {
            "@type": "Place",
            name: stop.name,
            description: stop.snippet,
            address: stop.address,
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: tour.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guided Tours", item: `${SITE_URL}/tours` },
          { "@type": "ListItem", position: 3, name: tour.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient
        tour={tour}
        mapsRouteUrl={mapsRouteUrl}
        relatedAreas={relatedAreas}
        relatedGuides={relatedGuides}
        siblingTours={siblingTours}
      />
    </>
  );
}


import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DevelopmentDetailClient from "./DevelopmentDetailClient";
import { DEVELOPMENTS, getDevelopmentBySlug } from "@/data/developments";
import { getSpiderwebForDevelopment } from "@/lib/spiderweb";
import { buildDevelopmentAeo } from "@/lib/developmentAeo";
import { buildPageMetadata, TEAM_SAME_AS } from "@/lib/seo";

const BASE_URL = "https://www.davisgarnettsells.com";

export function generateStaticParams() {
  return DEVELOPMENTS.map((dev) => ({ slug: dev.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dev = getDevelopmentBySlug(slug);
  if (!dev) return { title: "Tampa Bay New Developments | Davis & Garnett" };

  return buildPageMetadata({
    title: `${dev.name} — Floor Plans & Pricing | Davis & Garnett`,
    description: dev.summary,
    path: `/developments/${dev.slug}`,
    image: dev.heroImage,
  });
}

export default async function DevelopmentDetailSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dev = getDevelopmentBySlug(slug);
  if (!dev) notFound();

  const relatedDevelopments = DEVELOPMENTS.filter(
    (d) => d.corridor === dev.corridor && d.slug !== dev.slug
  ).slice(0, 3);

  const spiderweb = getSpiderwebForDevelopment(dev);
  const aeo = buildDevelopmentAeo(dev);

  const pageUrl = `${BASE_URL}/developments/${dev.slug}`;
  const isUrbanTower =
    dev.corridor === "downtown-bayshore" || dev.slug === "the-quay-sarasota-waterfront";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isUrbanTower ? "ApartmentComplex" : "GatedResidenceCommunity",
        name: dev.name,
        description: dev.summary,
        url: pageUrl,
        image: dev.heroImage.startsWith("http") ? dev.heroImage : `${BASE_URL}${dev.heroImage}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: dev.location,
          addressRegion: "FL",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: dev.coordinates.lat,
          longitude: dev.coordinates.lng,
        },
        amenityFeature: dev.amenities.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity,
          value: true,
        })),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          description: `Price Range: ${dev.priceRange} (${dev.status})`,
          seller: {
            "@type": "RealEstateAgent",
            name: "Davis & Garnett — Align Right Realty Carrollwood",
            url: BASE_URL,
            sameAs: TEAM_SAME_AS,
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: aeo.faqs.map((faq) => ({
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
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Developments", item: `${BASE_URL}/developments` },
          { "@type": "ListItem", position: 3, name: dev.name, item: pageUrl },
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
      <DevelopmentDetailClient
        dev={dev}
        aeo={aeo}
        relatedDevelopments={relatedDevelopments}
        relatedGuides={spiderweb.guides}
        relatedAreas={spiderweb.areas}
        relatedTours={spiderweb.tours}
        relatedGlossaryTerms={spiderweb.glossaryTerms}
        relatedListings={spiderweb.listings}
      />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DevelopmentDetailClient from "./DevelopmentDetailClient";
import { DEVELOPMENTS, getDevelopmentBySlug } from "@/data/developments";
import { ALL_GUIDES_AND_QUESTIONS } from "@/data/knowledgeHub";

import { buildPageMetadata } from "@/lib/seo";

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
    title: `${dev.name} — Floor Plans, Pricing & Reviews | Davis & Garnett`,
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

  const guideSlugs =
    dev.corridor === "downtown-bayshore"
      ? [
          "tampa-bay-luxury-home-buying-guide",
          "flood-zones-x-ae-ve-tampa-bay-homebuyers",
          "first-time-and-relocation-buyer-costs-tampa-bay",
          "how-to-choose-a-commercial-or-residential-realtor-tampa-bay",
        ]
      : [
          "understanding-cdd-fees-in-pasco-and-hillsborough",
          "what-is-the-difference-between-hoa-and-cdd-in-tampa-bay",
          "best-55-plus-active-adult-communities-tampa-bay",
          "how-do-builder-rate-buydowns-work-in-wesley-chapel-developments",
        ];

  const relatedGuides = ALL_GUIDES_AND_QUESTIONS.filter((g) =>
    guideSlugs.includes(g.slug)
  );

  const pageUrl = `${BASE_URL}/developments/${dev.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": dev.corridor === "downtown-bayshore" ? "ApartmentComplex" : "GatedResidenceCommunity",
        name: dev.name,
        description: dev.summary,
        url: pageUrl,
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
          },
        },
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
        relatedDevelopments={relatedDevelopments}
        relatedGuides={relatedGuides}
      />
    </>
  );
}

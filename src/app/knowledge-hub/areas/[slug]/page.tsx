import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AreaSpokeClient from "./AreaSpokeClient";
import { AREAS, getRelatedGuidesForArea } from "@/data/knowledgeHub";
import { DEVELOPMENTS } from "@/data/developments";

import { buildPageMetadata, TEAM_SAME_AS } from "@/lib/seo";

const BASE_URL = "https://www.davisgarnettsells.com";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) return { title: "Tampa Bay Areas | Davis & Garnett" };

  return buildPageMetadata({
    title: `${area.name} Real Estate Guide | Davis & Garnett`,
    description: area.quickAnswer || area.overview,
    path: `/knowledge-hub/areas/${area.slug}`,
    image: area.heroImage,
  });
}

export default async function AreaSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const otherAreas = AREAS.filter((a) => a.slug !== area.slug);
  const relatedGuides = getRelatedGuidesForArea(area, 4);
  const relatedDevelopments = DEVELOPMENTS.filter((d) =>
    (area.relatedDevelopmentSlugs || []).includes(d.slug)
  ).slice(0, 2);

  const pageUrl = `${BASE_URL}/knowledge-hub/areas/${area.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        name: area.name,
        description: area.quickAnswer || area.overview,
        url: pageUrl,
        image: area.heroImage.startsWith("http") ? area.heroImage : `${BASE_URL}${area.heroImage}`,
        address: {
          "@type": "PostalAddress",
          addressRegion: "FL",
          addressCountry: "US",
        },
      },
      {
        "@type": "RealEstateAgent",
        name: "Davis & Garnett Commercial / Residential Advisors — Align Right Realty Carrollwood",
        url: BASE_URL,
        sameAs: TEAM_SAME_AS,
        areaServed: area.name,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Knowledge Hub", item: `${BASE_URL}/knowledge-hub` },
          { "@type": "ListItem", position: 3, name: area.name, item: pageUrl },
        ],
      },
      ...(area.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: area.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaSpokeClient
        area={area}
        otherAreas={otherAreas}
        relatedGuides={relatedGuides}
        relatedDevelopments={relatedDevelopments}
      />
    </>
  );
}

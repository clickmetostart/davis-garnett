import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgeItemClient from "./KnowledgeItemClient";
import {
  ALL_GUIDES_AND_QUESTIONS,
  getRelatedKnowledgeForItem,
  getRelatedAreasForItem,
} from "@/data/knowledgeHub";
import { DEVELOPMENTS } from "@/data/developments";

import { buildPageMetadata } from "@/lib/seo";

const BASE_URL = "https://www.davisgarnettsells.com";

export function generateStaticParams() {
  return ALL_GUIDES_AND_QUESTIONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = ALL_GUIDES_AND_QUESTIONS.find((i) => i.slug === slug);
  if (!item) return { title: "Knowledge Hub | Davis & Garnett" };

  return buildPageMetadata({
    title: `${item.title} | Davis & Garnett Tampa Bay`,
    description: item.quickAnswer || item.subtitle,
    path: `/knowledge-hub/${item.slug}`,
    image: item.heroImage,
    type: "article",
  });
}

export default async function KnowledgeItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = ALL_GUIDES_AND_QUESTIONS.find((i) => i.slug === slug);
  if (!item) notFound();

  const relatedItems = getRelatedKnowledgeForItem(item, 3);
  const relatedAreas = getRelatedAreasForItem(item, 2);
  const relatedDevelopments = DEVELOPMENTS.filter((d) =>
    (item.relatedDevelopmentSlugs || []).includes(d.slug)
  ).slice(0, 2);

  const pageUrl = `${BASE_URL}/knowledge-hub/${item.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: item.title,
        description: item.quickAnswer || item.subtitle,
        mainEntityOfPage: pageUrl,
        author: {
          "@type": "Person",
          name: item.author.name,
          jobTitle: item.author.role,
          url: `${BASE_URL}${item.author.profileHref}`,
        },
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett Commercial / Residential Advisors — Align Right Realty Carrollwood",
          url: BASE_URL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "3903 Northdale Blvd Suite 115W",
            addressLocality: "Tampa",
            addressRegion: "FL",
            postalCode: "33624",
            addressCountry: "US",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Knowledge Hub", item: `${BASE_URL}/knowledge-hub` },
          { "@type": "ListItem", position: 3, name: item.title, item: pageUrl },
        ],
      },
      ...(item.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: item.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
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
      <KnowledgeItemClient
        item={item}
        relatedItems={relatedItems}
        relatedAreas={relatedAreas}
        relatedDevelopments={relatedDevelopments}
      />
    </>
  );
}

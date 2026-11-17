import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleSpokeClient from "./ArticleSpokeClient";
import {
  ARTICLES,
  ALL_GUIDES_AND_QUESTIONS,
  getRelatedArticlesForArticle,
  getRelatedAreasForItem,
} from "@/data/knowledgeHub";

import { buildPageMetadata } from "@/lib/seo";

const BASE_URL = "https://www.davisgarnettsells.com";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Market Updates | Davis & Garnett" };

  return buildPageMetadata({
    title: `${article.title} | Davis & Garnett`,
    description: article.quickAnswer || article.summary,
    path: `/knowledge-hub/articles/${article.slug}`,
    image: article.heroImage,
    type: "article",
  });
}

export default async function ArticleSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const otherArticles = getRelatedArticlesForArticle(article, 3);
  const relatedGuides = ALL_GUIDES_AND_QUESTIONS.filter((g) =>
    (article.relatedGuideSlugs || []).includes(g.slug)
  ).slice(0, 2);
  const relatedAreas = getRelatedAreasForItem(article, 2);

  const pageUrl = `${BASE_URL}/knowledge-hub/articles/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.quickAnswer || article.summary,
        ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
        mainEntityOfPage: pageUrl,
        author: {
          "@type": "Person",
          name: article.author.name,
          jobTitle: article.author.role,
        },
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett Commercial / Residential Advisors — Align Right Realty Carrollwood",
          url: BASE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Knowledge Hub", item: `${BASE_URL}/knowledge-hub` },
          { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
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
      <ArticleSpokeClient
        article={article}
        otherArticles={otherArticles}
        relatedGuides={relatedGuides}
        relatedAreas={relatedAreas}
      />
    </>
  );
}

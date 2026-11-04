import { MetadataRoute } from "next";
import listingsData from "@/data/listings.json";
import { DEVELOPMENTS } from "@/data/developments";
import { ALL_GUIDES_AND_QUESTIONS, AREAS, EVENTS, ARTICLES } from "@/data/knowledgeHub";

const BASE_URL = "https://www.davisgarnettsells.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/our-every-listing-approach",
    "/about/mark-davis",
    "/about/rachael-garnett",
    "/about/align-right-realty-carrollwood",
    "/about/strategic-partners",
    "/about/community-outreach-giving",
    "/about/contact",
    "/commercial-advisory-guide",
    "/residential-advisory-guide",
    "/contact",
    "/davis",
    "/garnett",
    "/properties",
    "/developments",
    "/knowledge-hub",
    "/search-mls",
  ];

  const listingUrls = (listingsData as Array<{ slug?: string; id?: string }>).map((item) => ({
    url: `${BASE_URL}/listings/${item.slug || item.id}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const developmentUrls = DEVELOPMENTS.map((dev) => ({
    url: `${BASE_URL}/developments/${dev.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const guideUrls = ALL_GUIDES_AND_QUESTIONS.map((g) => ({
    url: `${BASE_URL}/knowledge-hub/${g.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const areaUrls = AREAS.map((a) => ({
    url: `${BASE_URL}/knowledge-hub/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const eventUrls = EVENTS.map((e) => ({
    url: `${BASE_URL}/knowledge-hub/events/${e.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleUrls = ARTICLES.map((a) => ({
    url: `${BASE_URL}/knowledge-hub/articles/${a.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.9,
    })),
    ...listingUrls,
    ...developmentUrls,
    ...guideUrls,
    ...areaUrls,
    ...eventUrls,
    ...articleUrls,
  ];
}

import { MetadataRoute } from "next";
import listingsData from "@/data/listings.json";
import { DEVELOPMENTS } from "@/data/developments";
import { ALL_GUIDES_AND_QUESTIONS, AREAS, EVENTS, ARTICLES } from "@/data/knowledgeHub";
import { LIVE_GLOSSARY_TERMS } from "@/data/glossary";
import { LIVE_TOPIC_HUBS } from "@/data/topicHubs";
import { LIVE_GUIDED_TOURS } from "@/data/tours";
import { getLiveMarketReports } from "@/data/marketReports";

const BASE_URL = "https://www.davisgarnettsells.com";
const STATIC_LAST_MODIFIED = new Date("2026-11-17T09:35:43-05:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/our-every-listing-approach",
    "/about/mark-davis",
    "/about/rachael-garnett",
    "/about/align-right-realty-carrollwood",
    "/align-right-carrollwood-coverage",
    "/about/strategic-partners",
    "/about/community-outreach-giving",
    "/commercial-advisory-guide",
    "/residential-advisory-guide",
    "/services/commercial-bpo",
    "/services/commercial-mentoring",
    "/contact",
    "/properties",
    "/developments",
    "/knowledge-hub",
    "/tours",
    "/glossary",
    "/tools/mortgage-calculator",
    "/tools/commercial-rent-calculator",
    "/tools/cap-rate-calculator",
    "/tools/1031-deadline-calculator",
    "/tools/seller-net-proceeds",
    "/search-mls",
    "/privacy-policy",
  ];

  // Exclude sold, closed, inactive, or draft listings from sitemap
  const listingUrls = (
    listingsData as Array<{
      slug?: string;
      id?: string;
      status?: string;
      editorialStatus?: string;
      updatedAt?: string;
    }>
  )
    .filter(
      (item) =>
        !/sold|closed|inactive|draft/i.test(item.status || "") &&
        item.editorialStatus !== "draft"
    )
    .map((item) => ({
      url: `${BASE_URL}/listings/${item.slug || item.id}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : STATIC_LAST_MODIFIED,
    }));

  const developmentUrls = DEVELOPMENTS.filter((d) => d.editorialStatus !== "draft").map((dev) => ({
    url: `${BASE_URL}/developments/${dev.slug}`,
    lastModified: dev.updatedAt ? new Date(dev.updatedAt) : STATIC_LAST_MODIFIED,
  }));

  const guideUrls = ALL_GUIDES_AND_QUESTIONS.filter((g) => g.status !== "draft").map((g) => ({
    url: `${BASE_URL}/knowledge-hub/${g.slug}`,
    lastModified: g.updatedAt ? new Date(g.updatedAt) : STATIC_LAST_MODIFIED,
  }));

  const areaUrls = AREAS.filter((a) => a.status !== "draft").map((a) => ({
    url: `${BASE_URL}/knowledge-hub/areas/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : STATIC_LAST_MODIFIED,
  }));

  const eventUrls = EVENTS.filter((e) => e.status !== "draft").map((e) => ({
    url: `${BASE_URL}/knowledge-hub/events/${e.slug}`,
    lastModified: e.updatedAt ? new Date(e.updatedAt) : STATIC_LAST_MODIFIED,
  }));

  const articleUrls = ARTICLES.filter((a) => a.status !== "draft").map((a) => ({
    url: `${BASE_URL}/knowledge-hub/articles/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : STATIC_LAST_MODIFIED,
  }));

  const marketReportUrls = getLiveMarketReports().map((r) => ({
    url: `${BASE_URL}/market-reports/${r.slug}`,
    lastModified: new Date(r.updatedAt),
  }));

  const glossaryUrls = LIVE_GLOSSARY_TERMS.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    lastModified: new Date(term.updatedAt),
  }));

  const hubUrls = LIVE_TOPIC_HUBS.map((hub) => ({
    url: `${BASE_URL}/hub/${hub.slug}`,
    lastModified: new Date(hub.updatedAt),
  }));

  const tourUrls = LIVE_GUIDED_TOURS.map((tour) => ({
    url: `${BASE_URL}/tours/${tour.slug}`,
    lastModified: new Date(tour.updatedAt),
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: STATIC_LAST_MODIFIED,
    })),
    ...listingUrls,
    ...developmentUrls,
    ...guideUrls,
    ...areaUrls,
    ...eventUrls,
    ...articleUrls,
    ...glossaryUrls,
    ...hubUrls,
    ...tourUrls,
    ...marketReportUrls,
  ];
}

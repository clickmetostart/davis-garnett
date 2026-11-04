import { MetadataRoute } from "next";

const BASE_URL = "https://www.davisgarnettsells.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/mark-davis",
    "/about/rachael-garnett",
    "/about/align-right-realty-carrollwood",
    "/about/strategic-partners",
    "/about/community-outreach-giving",
    "/about/contact",
    "/contact",
    "/davis",
    "/garnett",
    "/properties",
    "/developments",
    "/knowledge-hub",
    "/search-mls",
  ];

  const listingSlugs = [
    "6100-bahama-shores-dr-s-st-petersburg",
    "126-ridgewood-ave-brandon",
    "ne-90th-street-rd-fort-mccoy",
    "770-old-stokes-rd-frostproof",
    "8136-wheat-stone-dr-zephyrhills",
    "133rd-ave-se-dunnellon",
    "10609-raffia-dr-port-richey",
    "1106-s-otto-pt-inverness",
    "4603-stonehaven-pl-new-port-richey",
    "7608-teal-trce-bradenton",
    "9635-joe-ebert-rd-seffner",
    "2402-16th-st-w-palmetto",
    "3537-valencia-cove-ct-land-o-lakes",
    "5764-meadowlane-st-new-port-richey",
    "3037-downan-point-dr-land-o-lakes",
  ];

  const developmentSlugs = [
    "pendry-residences-tampa",
    "the-ritz-carlton-residences-bayshore",
    "water-street-tampa-phase-2",
    "hotel-ora-private-residences",
    "gasworx-ybor-channel-district",
    "two-rivers-wesley-chapel",
    "angeline-land-o-lakes",
    "epperson-mirada-lagoon-wesley-chapel",
    "connerton-land-o-lakes",
  ];

  const guideAndQaSlugs = [
    "tampa-bay-luxury-home-buying-guide",
    "selling-your-home-in-tampa-bay",
    "commercial-real-estate-investing-florida",
    "relocating-to-tampa-bay-handbook",
    "florida-homestead-exemption-and-property-taxes",
    "understanding-cdd-fees-in-pasco-and-hillsborough",
    "can-i-buy-a-house-in-florida-while-selling-my-current-one",
    "what-is-the-difference-between-hoa-and-cdd-in-tampa-bay",
    "how-much-are-closing-costs-for-sellers-in-hillsborough-county",
    "is-it-better-to-buy-in-tampa-or-st-petersburg",
    "how-does-commercial-mixed-use-zoning-work-in-brandon-fl",
    "what-due-diligence-is-needed-when-buying-acreage-in-central-florida",
    "how-do-builder-rate-buydowns-work-in-wesley-chapel-developments",
    "what-are-the-rules-for-private-docks-and-seawalls-in-st-petersburg",
  ];

  const areaSlugs = [
    "st-petersburg",
    "tampa-downtown-water-street",
    "wesley-chapel",
    "land-o-lakes",
    "brandon-riverview",
    "central-florida-acreage",
  ];

  const eventSlugs = [
    "downtown-tampa-luxury-condo-preview-night",
    "wesley-chapel-new-home-builder-showcase",
    "central-florida-land-investor-roundtable",
    "community-giving-partnership-day",
  ];

  const articleSlugs = [
    "tampa-bay-real-estate-market-outlook-2026",
    "why-tech-and-finance-executives-are-moving-to-bayshore-and-water-street",
    "pasco-county-growth-corridor-wesley-chapel-land-o-lakes-boom",
    "commercial-development-trends-in-east-hillsborough",
  ];

  const allUrls: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.9,
    })),
    ...listingSlugs.map((slug) => ({
      url: `${BASE_URL}/listings/${slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...developmentSlugs.map((slug) => ({
      url: `${BASE_URL}/developments/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...guideAndQaSlugs.map((slug) => ({
      url: `${BASE_URL}/knowledge-hub/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...areaSlugs.map((slug) => ({
      url: `${BASE_URL}/knowledge-hub/areas/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...eventSlugs.map((slug) => ({
      url: `${BASE_URL}/knowledge-hub/events/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articleSlugs.map((slug) => ({
      url: `${BASE_URL}/knowledge-hub/articles/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return allUrls;
}


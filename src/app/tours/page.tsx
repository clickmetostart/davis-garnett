import type { Metadata } from "next";
import ToursIndexClient from "./ToursIndexClient";
import { LIVE_GUIDED_TOURS } from "@/data/tours";
import { buildPageMetadata, SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tampa Bay Self-Guided Tour Guides | Davis & Garnett",
  description:
    "Explore Tampa Bay neighborhoods, developments, shopping, and parks with Google Maps routes, trip notes, and printable PDF tour guides.",
  path: "/tours",
  image: "/city-photos/downtown-tampa-skyline.jpg",
});

export default function ToursIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Davis & Garnett Tampa Bay Residential & Commercial Guided Tours",
        description:
          "Sequential point-to-point self-guided neighborhood and commercial corridor tours across Hillsborough, Pinellas, Pasco, and Polk counties.",
        url: `${SITE_URL}/tours`,
        image: `${SITE_URL}/city-photos/downtown-tampa-skyline.jpg`,
        publisher: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
          url: SITE_URL,
          sameAs: TEAM_SAME_AS,
        },
      },
      {
        "@type": "ItemList",
        itemListElement: LIVE_GUIDED_TOURS.map((tour, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: tour.title,
          url: `${SITE_URL}/tours/${tour.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guided Neighborhood & Commercial Tours", item: `${SITE_URL}/tours` },
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
      <ToursIndexClient />
    </>
  );
}


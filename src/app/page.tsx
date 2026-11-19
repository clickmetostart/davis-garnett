import HomePageClient from "@/components/HomePageClient";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Davis & Garnett | Tampa Bay Real Estate Advisors",
  description:
    "Work directly with Mark Davis and Rachael Garnett for Tampa Bay homes, waterfront estates, 55+ communities, land, and commercial real estate.",
  path: "/",
  image: "/davis-garnett-real-estate-advisors-cover-image-2.jpg",
});

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Davis & Garnett | Tampa Bay Commercial & Residential Real Estate Advisors",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        name: "Core Advisory Pillars & Resources",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Residential Homes & Neighborhoods", url: `${SITE_URL}/residential` },
          { "@type": "ListItem", position: 2, name: "Commercial & Land Advisory", url: `${SITE_URL}/commercial` },
          { "@type": "ListItem", position: 3, name: "Featured Portfolio", url: `${SITE_URL}/properties` },
          { "@type": "ListItem", position: 4, name: "Tampa Bay Developments & Corridors", url: `${SITE_URL}/developments` },
          { "@type": "ListItem", position: 5, name: "Knowledge Hub & Playbooks", url: `${SITE_URL}/knowledge-hub` },
          { "@type": "ListItem", position: 6, name: "Guided Neighborhood & CRE Tours", url: `${SITE_URL}/tours` },
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
      <HomePageClient />
    </>
  );
}


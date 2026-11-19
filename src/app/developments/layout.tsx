import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tampa Bay Neighborhoods & New Builds | Davis & Garnett",
  description:
    "Explore trending Tampa Bay neighborhoods, commercial districts, luxury condos, and new construction from Wesley Chapel to Sarasota.",
  path: "/developments",
  image: "/city-photos/tampa-downtown-towers-real.png",
});

export default function DevelopmentsLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE_URL}/developments`,
        name: "Trending Tampa Bay Developments & Neighborhood Corridors",
        about: { "@id": `${SITE_URL}/#organization` },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Developments", path: "/developments" },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}


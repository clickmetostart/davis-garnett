import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Search Tampa Bay MLS & Commercial | Davis & Garnett",
  description:
    "Search homes, waterfront properties, 55+ villas, land acreage, and commercial real estate across Tampa, St. Pete, Carrollwood, and Wesley Chapel.",
  path: "/search-mls",
  image: "/city-photos/wesley-chapel-master-planned-real.jpg",
});

export default function SearchMlsLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SearchResultsPage",
        url: `${SITE_URL}/search-mls`,
        name: "Search Tampa Bay Homes, Land & Commercial MLS",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Search MLS", path: "/search-mls" },
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


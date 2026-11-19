import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, OFFICE_GBP_URL, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tampa Bay & Carrollwood Coverage | Davis & Garnett",
  description:
    "Explore Tampa Bay areas covered by Mark Davis and Rachael Garnett—St. Pete beaches, Downtown Tampa, Carrollwood, Wesley Chapel, and acreage.",
  path: "/align-right-carrollwood-coverage",
  image: "/city-photos/downtown-tampa-skyline.jpg",
});

export default function CoverageLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Tampa Bay & Florida Brokerage Coverage",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          "Carrollwood, FL",
          "Northdale, FL",
          "Tampa, FL",
          "St. Petersburg, FL",
          "Clearwater, FL",
          "Wesley Chapel, FL",
          "Land O' Lakes, FL",
          "Brandon, FL",
          "Sarasota, FL",
        ],
        hasMap: OFFICE_GBP_URL,
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tampa Bay Coverage", path: "/align-right-carrollwood-coverage" },
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


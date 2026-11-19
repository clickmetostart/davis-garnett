import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, OFFICE_GBP_URL, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Align Right Realty Carrollwood | Davis & Garnett",
  description:
    "Based at 3903 Northdale Blvd Suite 115W in Tampa, Align Right Realty Carrollwood powers Davis & Garnett residential and commercial advisory across Florida.",
  path: "/about/align-right-realty-carrollwood",
  image: "/davis-garnett-hero.png",
});

export default function AlignRightOfficeLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        name: "Align Right Realty Carrollwood — Davis & Garnett",
        identifier: "BK3401606",
        url: `${SITE_URL}/about/align-right-realty-carrollwood`,
        telephone: "+1-727-808-3344",
        hasMap: OFFICE_GBP_URL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "3903 Northdale Blvd Suite 115W",
          addressLocality: "Tampa",
          addressRegion: "FL",
          postalCode: "33624",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.0811,
          longitude: -82.5023,
        },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Align Right Realty Carrollwood", path: "/about/align-right-realty-carrollwood" },
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


import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, OFFICE_GBP_URL, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Mark Davis & Rachael Garnett | Tampa Bay",
  description:
    "Reach Mark Davis (941-737-4127) and Rachael Garnett (727-808-3344) at Align Right Realty Carrollwood, 3903 Northdale Blvd Suite 115W, Tampa, FL 33624.",
  path: "/contact",
  image: "/davis-garnett-real-estate-advisors-cover-image-2.jpg",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        url: `${SITE_URL}/contact`,
        name: "Contact Davis & Garnett Real Estate Advisors",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
        hasMap: OFFICE_GBP_URL,
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
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


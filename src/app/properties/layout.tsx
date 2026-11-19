import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Featured Homes, CRE & Land Portfolio | Davis & Garnett",
  description:
    "Browse curated residential waterfront homes, commercial buildings, acreage parcels, and recent closings represented by Davis & Garnett across Tampa Bay.",
  path: "/properties",
  image: "/res_modern_mansion_1787632812473.png",
});

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE_URL}/properties`,
        name: "Davis & Garnett Featured Florida Portfolio",
        about: { "@id": `${SITE_URL}/#organization` },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/properties" },
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


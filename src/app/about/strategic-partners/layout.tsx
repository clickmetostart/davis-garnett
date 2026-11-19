import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Strategic Partners & Vendor Network | Davis & Garnett",
  description:
    "Connect with vetted Florida roofers, contractors, seawall pros, environmental inspectors, septic experts, lenders, and title attorneys.",
  path: "/about/strategic-partners",
  image: "/com_office_tower_1787632874122.png",
});

export default function StrategicPartnersLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Davis & Garnett Vetted Tampa Bay Real Estate Vendor Network",
        url: `${SITE_URL}/about/strategic-partners`,
        about: { "@id": `${SITE_URL}/#organization` },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Strategic Partners", path: "/about/strategic-partners" },
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


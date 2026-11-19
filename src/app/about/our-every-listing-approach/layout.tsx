import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "How We Market Every Listing | Davis & Garnett",
  description:
    "See how Davis & Garnett markets commercial and home listings using LoopNet, Crexi, Stellar MLS, cinema video, photography, and local ad outreach.",
  path: "/about/our-every-listing-approach",
  image: "/res_waterfront_estate_1787632802890.png",
});

export default function ApproachLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Full-Spectrum Commercial & Residential Listing Marketing",
        url: `${SITE_URL}/about/our-every-listing-approach`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Tampa Bay & Central Florida",
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Every Listing Approach", path: "/about/our-every-listing-approach" },
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


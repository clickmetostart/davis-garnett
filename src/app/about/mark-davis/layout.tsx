import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mark Davis | Commercial & Residential Advisor",
  description:
    "Florida Realtor BK3209459 focused on commercial buys, NNN leases, 1031 exchanges, land deals, and luxury homes across Tampa Bay.",
  path: "/about/mark-davis",
  image: "/mark-commerical-banner-1.jpg",
  type: "profile",
});

export default function MarkDavisLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url: `${SITE_URL}/about/mark-davis`,
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_URL}/about/mark-davis#person`,
          name: "Mark Davis",
          jobTitle: "Commercial & Residential Real Estate Advisor",
          identifier: "FL License BK3209459",
          telephone: "+1-941-737-4127",
          email: "list@davisgarnettsells.com",
          url: `${SITE_URL}/about/mark-davis`,
          worksFor: { "@id": `${SITE_URL}/#organization` },
          sameAs: TEAM_SAME_AS,
          knowsAbout: [
            "Commercial Real Estate",
            "NNN Leases",
            "1031 Tax-Deferred Exchanges",
            "Owner-User SBA 504 Properties",
            "Florida Acreage & Land Assemblage",
            "Tampa Bay Luxury Homes",
          ],
        },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Mark Davis", path: "/about/mark-davis" },
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


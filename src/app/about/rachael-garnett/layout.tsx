import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL, TEAM_SAME_AS } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Rachael Garnett | Tampa Bay Waterfront & 55+ Advisor",
  description:
    "Florida Realtor SL3378601 specializing in waterfront homes, 55+ active-adult communities, new construction, relocation, and commercial deals.",
  path: "/about/rachael-garnett",
  image: "/rachael-banner-2.jpg",
  type: "profile",
});

export default function RachaelGarnettLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url: `${SITE_URL}/about/rachael-garnett`,
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_URL}/about/rachael-garnett#person`,
          name: "Rachael Garnett",
          jobTitle: "Commercial & Residential Real Estate Advisor",
          identifier: "FL License SL3378601",
          telephone: "+1-727-808-3344",
          email: "list@davisgarnettsells.com",
          url: `${SITE_URL}/about/rachael-garnett`,
          worksFor: { "@id": `${SITE_URL}/#organization` },
          sameAs: TEAM_SAME_AS,
          knowsAbout: [
            "Tampa Bay Waterfront Real Estate",
            "55+ Active Adult Communities",
            "New Construction Advisory",
            "Relocation to Florida",
            "Commercial Real Estate",
          ],
        },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Rachael Garnett", path: "/about/rachael-garnett" },
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


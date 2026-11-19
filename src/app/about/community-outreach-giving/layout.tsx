import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Community Outreach, Schools & Giving | Davis & Garnett",
  description:
    "See how Mark Davis and Rachael Garnett support Tampa Bay schools, local charities, youth mentorship, Metropolitan Ministries, and community drives.",
  path: "/about/community-outreach-giving",
  image: "/golf_networking.png",
});

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Davis & Garnett Community Outreach, Schools & Giving",
        url: `${SITE_URL}/about/community-outreach-giving`,
        about: { "@id": `${SITE_URL}/#organization` },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Community Outreach", path: "/about/community-outreach-giving" },
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


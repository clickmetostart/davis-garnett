import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Davis & Garnett | Tampa Bay Real Estate Advisors",
  description:
    "Meet Mark Davis and Rachael Garnett, Commercial and Residential Advisors at Align Right Realty Carrollwood serving buyers and sellers across Tampa Bay.",
  path: "/about",
  image: "/davis-garnett-real-estate-advisors-sitting-down-together.png",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        url: `${SITE_URL}/about`,
        name: "About Mark Davis & Rachael Garnett — Tampa Bay Real Estate Advisors",
        mainEntity: { "@id": `${SITE_URL}/#organization` },
      },
      buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
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


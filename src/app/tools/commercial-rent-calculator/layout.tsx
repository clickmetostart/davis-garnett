import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial Rent, NNN & CAM Calculator | Davis & Garnett",
  description:
    "Compare monthly and annual commercial lease costs across Triple Net (NNN), Modified Gross, and Full-Service Gross leases with CAM, tax, and insurance.",
  path: "/tools/commercial-rent-calculator",
});

export default function CommercialRentCalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Commercial Rent, NNN & CAM Lease Calculator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        url: `${SITE_URL}/tools/commercial-rent-calculator`,
        provider: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Commercial Hub", item: `${SITE_URL}/commercial` },
          { "@type": "ListItem", position: 3, name: "Commercial Rent Calculator", item: `${SITE_URL}/tools/commercial-rent-calculator` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}


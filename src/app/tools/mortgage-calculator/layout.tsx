import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Florida Mortgage, CDD & Tax Calculator | Davis & Garnett",
  description:
    "Estimate your monthly Tampa Bay mortgage payment including principal, interest, Florida property taxes, homeowners and flood insurance, HOA, and CDD fees.",
  path: "/tools/mortgage-calculator",
});

export default function MortgageCalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Florida Mortgage, Tax, Insurance & CDD Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: `${SITE_URL}/tools/mortgage-calculator`,
        provider: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Knowledge Hub", item: `${SITE_URL}/knowledge-hub` },
          { "@type": "ListItem", position: 3, name: "Florida Mortgage Calculator", item: `${SITE_URL}/tools/mortgage-calculator` },
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


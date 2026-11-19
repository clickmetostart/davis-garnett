import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial Cap Rate & NOI Calculator | Davis & Garnett",
  description:
    "Calculate Net Operating Income (NOI), commercial cap rate, and implied valuation multiples for Tampa Bay retail, medical office, and NNN investment properties.",
  path: "/tools/cap-rate-calculator",
});

export default function CapRateCalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Commercial Cap Rate & NOI Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: `${SITE_URL}/tools/cap-rate-calculator`,
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
          { "@type": "ListItem", position: 3, name: "Cap Rate Calculator", item: `${SITE_URL}/tools/cap-rate-calculator` },
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


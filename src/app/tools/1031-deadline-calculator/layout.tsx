import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "1031 Exchange 45-Day & 180-Day Calculator | Davis & Garnett",
  description:
    "Calculate exact IRS Section 1031 Day 45 written identification and Day 180 closing deadlines for Tampa Bay investment and commercial exchanges.",
  path: "/tools/1031-deadline-calculator",
});

export default function Exchange1031Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "1031 Exchange Deadline Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: `${SITE_URL}/tools/1031-deadline-calculator`,
        provider: {
          "@type": "RealEstateAgent",
          name: "Davis & Garnett — Align Right Realty Carrollwood",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Commercial Advisory", item: `${SITE_URL}/commercial-advisory-guide` },
          { "@type": "ListItem", position: 3, name: "1031 Deadline Calculator", item: `${SITE_URL}/tools/1031-deadline-calculator` },
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


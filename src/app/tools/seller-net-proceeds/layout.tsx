import type { Metadata } from "next";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Florida Seller Net Proceeds Calculator | Hillsborough & Pinellas Closing Costs",
  description:
    "Estimate Florida deed documentary stamp tax ($0.70 per $100), title insurance, mortgage payoff, tax proration, and net cash proceeds for Tampa Bay home sellers.",
  path: "/tools/seller-net-proceeds",
});

export default function SellerNetProceedsLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Florida Seller Net Proceeds Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url: `${SITE_URL}/tools/seller-net-proceeds`,
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
          { "@type": "ListItem", position: 3, name: "Seller Net Proceeds Calculator", item: `${SITE_URL}/tools/seller-net-proceeds` },
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


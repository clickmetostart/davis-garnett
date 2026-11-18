import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tampa Bay Residential Real Estate Hub | Davis & Garnett",
  description:
    "Explore Tampa Bay homes, waterfront estates, 55+ villas, downtown condos, HOA/CDD rules, and seller services with Rachael Garnett and Mark Davis.",
  path: "/residential",
  image: "/res_waterfront_estate_1787632802890.png",
});

export default function ResidentialHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


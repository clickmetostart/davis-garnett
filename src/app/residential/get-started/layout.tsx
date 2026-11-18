import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Get Started: Residential Guide & Planning Worksheet | Davis & Garnett",
  description:
    "Answer 7 quick questions to plan your Tampa Bay home purchase or sale—or download our printable Residential Getting Started Guide and worksheet PDF.",
  path: "/residential/get-started",
  image: "/res_waterfront_estate_1787632802890.png",
});

export default function ResidentialGetStartedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


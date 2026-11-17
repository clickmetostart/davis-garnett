import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Commercial Real Estate Advisory Guide | Davis & Garnett Tampa Bay",
  description:
    "Explore retail, office, warehouse, NNN investment, 1031 exchange, zoning due diligence, and commercial representation services across Greater Tampa Bay.",
  path: "/commercial-advisory-guide",
  image: "/team-commercial-banner.png",
});

export default function CommercialGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


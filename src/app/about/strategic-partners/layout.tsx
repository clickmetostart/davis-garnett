import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Strategic Partners & Vendor Network | Davis & Garnett Tampa Bay",
  description:
    "Connect with vetted Florida contractors, roofers, marine seawall engineers, environmental inspectors, septic specialists, lenders, and title attorneys through Davis & Garnett.",
  path: "/about/strategic-partners",
  image: "/com_office_tower_1787632874122.png",
});

export default function StrategicPartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


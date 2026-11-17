import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Strategic Partners & Vendor Network | Davis & Garnett",
  description:
    "Connect with vetted Florida roofers, contractors, seawall pros, environmental inspectors, septic experts, lenders, and title attorneys.",
  path: "/about/strategic-partners",
  image: "/com_office_tower_1787632874122.png",
});

export default function StrategicPartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


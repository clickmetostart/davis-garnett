import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Rachael Garnett | Residential, Waterfront & 55+ Advisor in Tampa Bay",
  description:
    "Licensed Florida Realtor #3378601 specializing in waterfront homes, 55+ active-adult communities, new construction, relocation, and commercial transactions across Tampa Bay.",
  path: "/about/rachael-garnett",
  image: "/rachael-banner-2.jpg",
  type: "profile",
});

export default function RachaelGarnettLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Rachael Garnett | Tampa Bay Waterfront & 55+ Advisor",
  description:
    "Florida Realtor SL3378601 specializing in waterfront homes, 55+ active-adult communities, new construction, relocation, and commercial deals.",
  path: "/about/rachael-garnett",
  image: "/rachael-banner-2.jpg",
  type: "profile",
});

export default function RachaelGarnettLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


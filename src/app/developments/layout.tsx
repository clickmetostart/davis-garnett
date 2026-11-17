import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Trending Real Estate & Tampa Bay Neighborhoods | Davis & Garnett",
  description:
    "Explore trending Tampa Bay neighborhoods, commercial districts, luxury condos, and new construction from Wesley Chapel to Sarasota.",
  path: "/developments",
  image: "/city-photos/tampa-downtown-towers-real.png",
});

export default function DevelopmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


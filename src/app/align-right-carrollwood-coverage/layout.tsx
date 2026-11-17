import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tampa Bay & Carrollwood Real Estate Coverage | Davis & Garnett",
  description:
    "Explore Greater Tampa Bay corridors covered by Mark Davis and Rachael Garnett—from St. Petersburg beaches and Downtown Tampa to Carrollwood, Wesley Chapel, and Central Florida acreage.",
  path: "/align-right-carrollwood-coverage",
  image: "/city-photos/downtown-tampa-skyline.jpg",
});

export default function CoverageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


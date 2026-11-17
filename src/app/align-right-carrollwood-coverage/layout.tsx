import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tampa Bay & Carrollwood Real Estate Coverage | Davis & Garnett",
  description:
    "Explore Tampa Bay areas covered by Mark Davis and Rachael Garnett—St. Pete beaches, Downtown Tampa, Carrollwood, Wesley Chapel, and acreage.",
  path: "/align-right-carrollwood-coverage",
  image: "/city-photos/downtown-tampa-skyline.jpg",
});

export default function CoverageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


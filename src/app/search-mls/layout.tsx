import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Search Tampa Bay Homes, Land & Commercial MLS | Davis & Garnett",
  description:
    "Search homes, waterfront properties, 55+ villas, land acreage, and commercial real estate across Tampa, St. Petersburg, Carrollwood, Wesley Chapel, and Clearwater.",
  path: "/search-mls",
  image: "/city-photos/wesley-chapel-master-planned-real.jpg",
});

export default function SearchMlsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


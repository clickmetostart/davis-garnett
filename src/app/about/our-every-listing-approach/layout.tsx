import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "How We Market Every Listing | Davis & Garnett Real Estate",
  description:
    "See how Davis & Garnett markets commercial and home listings using LoopNet, Crexi, Stellar MLS, cinema video, photography, and local ad outreach.",
  path: "/about/our-every-listing-approach",
  image: "/res_waterfront_estate_1787632802890.png",
});

export default function ApproachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


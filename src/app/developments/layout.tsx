import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tampa Bay New Developments & 55+ Communities | Davis & Garnett",
  description:
    "Compare Downtown Tampa luxury condo towers, North Tampa master-planned neighborhoods, and 9 top 55+ active-adult communities with current floor plans and HOA/CDD details.",
  path: "/developments",
  image: "/city-photos/tampa-downtown-towers-real.png",
});

export default function DevelopmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


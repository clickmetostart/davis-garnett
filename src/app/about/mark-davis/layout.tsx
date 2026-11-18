import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mark Davis | Commercial & Residential Advisor Tampa Bay",
  description:
    "Florida Realtor BK3209459 focused on commercial buys, NNN leases, 1031 exchanges, land deals, and luxury homes across Tampa Bay.",
  path: "/about/mark-davis",
  image: "/mark-commerical-banner-1.jpg",
  type: "profile",
});

export default function MarkDavisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


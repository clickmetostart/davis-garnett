import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Mark Davis | Commercial & Residential Advisor in Tampa Bay",
  description:
    "Licensed Florida Realtor #3209459 specializing in commercial acquisitions, NNN leases, 1031 exchanges, land development, and luxury residential sales across Tampa Bay.",
  path: "/about/mark-davis",
  image: "/mark-commerical-banner-1.jpg",
  type: "profile",
});

export default function MarkDavisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


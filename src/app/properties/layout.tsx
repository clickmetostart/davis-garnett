import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Featured Commercial & Residential Properties | Davis & Garnett",
  description:
    "Browse curated residential waterfront homes, commercial buildings, acreage parcels, and recent closings represented by Davis & Garnett across Tampa Bay.",
  path: "/properties",
  image: "/res_modern_mansion_1787632812473.png",
});

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


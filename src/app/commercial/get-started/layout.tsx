import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial & Land Planning Guide | Davis & Garnett",
  description:
    "Walk through 7 quick questions to outline SBA 504, NNN cap rates, land zoning, or 1031 timing—or download the printable Commercial Getting Started PDF.",
  path: "/commercial/get-started",
  image: "/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg",
});

export default function CommercialGetStartedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


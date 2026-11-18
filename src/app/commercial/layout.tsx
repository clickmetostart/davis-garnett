import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tampa Bay Commercial & Florida Land Hub | Davis & Garnett",
  description:
    "Compare owner-user SBA 504 properties, NNN retail investments, BPO valuations, 1031 exchanges, and Central Florida land with Mark Davis and Rachael Garnett.",
  path: "/commercial",
  image: "/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg",
});

export default function CommercialHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


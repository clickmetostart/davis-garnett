import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Community Outreach, Schools & Giving | Davis & Garnett",
  description:
    "See how Mark Davis and Rachael Garnett support Tampa Bay schools, local charities, youth mentorship, Metropolitan Ministries, and community drives.",
  path: "/about/community-outreach-giving",
  image: "/golf_networking.png",
});

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


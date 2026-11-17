import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Community Outreach, Schools & Giving | Davis & Garnett Tampa Bay",
  description:
    "Discover how Mark Davis and Rachael Garnett support local Tampa Bay schools, churches, youth mentorship, Metropolitan Ministries, American Cancer Society, and Big Brothers Big Sisters.",
  path: "/about/community-outreach-giving",
  image: "/golf_networking.png",
});

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


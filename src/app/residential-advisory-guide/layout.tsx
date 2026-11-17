import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Residential Real Estate Advisory Guide | Davis & Garnett",
  description:
    "Buying or selling a home in Tampa Bay? Read Mark Davis and Rachael Garnett's guide covering waterfront homes, 55+ communities, new builds, and relocation.",
  path: "/residential-advisory-guide",
  image: "/team-residential-banner-2.jpg",
});

export default function ResidentialGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


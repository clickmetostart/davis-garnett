import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Davis & Garnett | Tampa Bay Commercial & Residential Realtors",
  description:
    "Meet Mark Davis and Rachael Garnett—Certified Commercial and Residential Agents affiliated with Align Right Realty Carrollwood—serving Greater Tampa Bay clients from day one.",
  path: "/about",
  image: "/davis-garnett-real-estate-advisors-sitting-down-together.png",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


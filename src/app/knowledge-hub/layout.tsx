import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tampa Bay Real Estate Knowledge Hub | Davis & Garnett",
  description:
    "Plain-English buyer and seller guides, 55+ active-adult breakdowns, Florida flood & insurance Q&As, local school guides, and Tampa Bay neighborhood spotlights.",
  path: "/knowledge-hub",
  image: "/city-photos/downtown-tampa-skyline.jpg",
});

export default function KnowledgeHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


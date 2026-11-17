import type { Metadata } from "next";
import { EVENTS } from "@/data/knowledgeHub";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((ev) => ev.slug === slug);

  if (!event) {
    return buildPageMetadata({
      title: "Community Event | Davis & Garnett Tampa Bay",
      description: "Tampa Bay real estate & community outreach events with Mark Davis & Rachael Garnett.",
      path: `/knowledge-hub/events/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${event.title} | Davis & Garnett Community Events`,
    description: event.summary,
    path: `/knowledge-hub/events/${event.slug}`,
    image: event.heroImage,
    type: "article",
  });
}

export default function EventSpokeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


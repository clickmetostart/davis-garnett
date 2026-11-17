import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicHubTemplate from "@/components/TopicHubTemplate";
import { getTopicHubBySlug, LIVE_TOPIC_HUBS } from "@/data/topicHubs";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LIVE_TOPIC_HUBS.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = getTopicHubBySlug(slug);
  if (!hub) return {};

  return buildPageMetadata({
    title: `${hub.title} | Davis & Garnett Tampa Bay`,
    description: hub.quickAnswer,
    path: `/hub/${hub.slug}`,
  });
}

export default async function TopicHubPage({ params }: PageProps) {
  const { slug } = await params;
  const hub = getTopicHubBySlug(slug);
  if (!hub) notFound();

  return <TopicHubTemplate hub={hub} />;
}


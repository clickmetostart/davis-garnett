import type { Metadata } from "next";
import listingsData from "@/data/listings.json";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = (listingsData as Array<any>).find((l) => l.slug === slug || String(l.id) === slug);

  if (!item) {
    return buildPageMetadata({
      title: "Property Listing | Davis & Garnett Real Estate Advisors",
      description:
        "View property details, floor plans, financials, and neighborhood information from Davis & Garnett in Tampa Bay.",
      path: `/listings/${slug}`,
    });
  }

  const price = item.price || item.askingPrice || "";
  const cityState = [item.city, item.state].filter(Boolean).join(", ");
  const title = `${item.title}${cityState ? ` — ${cityState}` : ""}${price ? ` (${price})` : ""} | Davis & Garnett`;
  const description =
    item.propertyDescription ||
    item.description?.slice(0, 158) ||
    `${item.title} represented by Mark Davis & Rachael Garnett in Tampa Bay, FL.`;
  const heroPhoto =
    item.images?.main ||
    item.images?.gallery?.[0] ||
    item.images?.[0]?.url ||
    "/placeholders/dg-brand-placeholder.webp";

  return buildPageMetadata({
    title,
    description,
    path: `/listings/${item.slug || slug}`,
    image: heroPhoto,
  });
}

export default function ListingDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


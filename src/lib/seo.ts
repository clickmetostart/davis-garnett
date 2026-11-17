import type { Metadata } from "next";

export const SITE_URL = "https://www.davisgarnettsells.com";
export const SITE_NAME = "Davis & Garnett Real Estate Advisors";
export const DEFAULT_OG_IMAGE = "/davis-garnett-real-estate-advisors-cover-image-2.jpg";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}

/**
 * Generates consistent OpenGraph, Twitter summary_large_image, and canonical metadata
 * across public Davis & Garnett routes.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const coverImage = image || DEFAULT_OG_IMAGE;
  const canonicalUrl = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : undefined;

  return {
    title,
    description,
    ...(canonicalUrl && !noIndex ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      title,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}


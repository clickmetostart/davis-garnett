import listingsRaw from "@/data/listings.json";
import { LIVE_GLOSSARY_TERMS, type GlossaryTerm } from "@/data/glossary";
import { DEVELOPMENTS, type Development } from "@/data/developments";
import { LIVE_GUIDED_TOURS, type GuidedTour } from "@/data/tours";
import {
  ALL_GUIDES_AND_QUESTIONS,
  AREAS,
  ARTICLES,
  getTaxonomyForAreaItem,
  getTaxonomyForKnowledgeItem,
  type AreaItem,
  type ArticleItem,
  type KnowledgeItem,
} from "@/data/knowledgeHub";
import {
  inferTaxonomyTags,
  scoreTaxonomyOverlap,
  type AudienceTag,
  type CorridorTag,
  type CountyTag,
  type PropertyTypeTag,
  type TagSignals,
} from "@/lib/taxonomy";
import type { Listing } from "@/types/listings";

const ACTIVE_LISTINGS: Listing[] = (listingsRaw as Listing[]).filter(
  (l) => l.status === "Active" && l.editorialStatus !== "draft"
);

export function getTaxonomyForListing(listing: Listing): TagSignals {
  return inferTaxonomyTags({
    text: `${listing.title} ${listing.subtitle || ""} ${listing.category} ${listing.propertyType} ${listing.neighborhood || ""} ${(listing.highlights || []).join(" ")}`,
    category: listing.category,
    city: listing.city,
    countyText: listing.county,
    explicit: {
      propertyType: listing.propertyTypeTags as PropertyTypeTag[] | undefined,
      audience: listing.audience as AudienceTag[] | undefined,
      county: listing.countyTags as CountyTag[] | undefined,
      corridor: listing.corridor as CorridorTag[] | undefined,
    },
  });
}

export function getTaxonomyForDevelopment(dev: Development): TagSignals {
  return inferTaxonomyTags({
    text: `${dev.name} ${dev.subtitle} ${dev.location} ${dev.neighborhoodOrSubmarket} ${dev.propertyTypes.join(" ")} ${dev.summary}`,
    category: dev.isMixedUseCommercialResidential ? "Commercial Residential" : "New Construction",
    explicit: {
      propertyType: dev.propertyTypeTags as PropertyTypeTag[] | undefined,
      audience: dev.audience as AudienceTag[] | undefined,
      county: dev.county as CountyTag[] | undefined,
      corridor: (dev.corridorTags as CorridorTag[] | undefined) ?? [
        dev.corridor === "downtown-bayshore" || dev.corridor === "westshore-marina-rocky-point"
          ? "downtown-bayshore"
          : dev.corridor === "st-petersburg-pinellas"
            ? "st-petersburg-waterfront"
            : dev.corridor === "clearwater-north-pinellas" || dev.corridor === "west-pasco-palm-harbor"
              ? "clearwater-beaches"
              : dev.corridor === "north-tampa-carrollwood"
                ? "north-tampa-carrollwood"
                : dev.corridor === "east-hillsborough-central-fl" || dev.corridor === "south-shore-hillsborough"
                  ? "brandon-i75"
                  : dev.corridor === "lakeland-polk-central-fl"
                    ? "central-florida-corridor"
                    : dev.corridor === "sarasota-manatee" || dev.corridor === "venice-wellen-park"
                      ? "sarasota-bradenton-lakewood-ranch"
                      : "wesley-chapel-new-tampa",
      ],
    },
  });
}

export function getTaxonomyForGlossaryTerm(term: GlossaryTerm): TagSignals {
  return {
    propertyType: term.propertyType,
    audience: term.audience,
    county: term.county,
    corridor: term.corridor,
  };
}

export function getTaxonomyForTour(tour: GuidedTour): TagSignals {
  return {
    propertyType: tour.propertyType,
    audience: tour.audience,
    county: tour.countyTags,
    corridor: tour.corridor,
  };
}

export function getRelatedToursForTags(
  sourceTags: TagSignals,
  explicitSlugs: string[] = [],
  excludeSlug?: string,
  limit = 2
): GuidedTour[] {
  const explicitSet = new Set(explicitSlugs);
  return LIVE_GUIDED_TOURS.filter((t) => t.slug !== excludeSlug)
    .map((tour) => ({
      tour,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForTour(tour)) +
        (explicitSet.has(tour.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.tour);
}

export function getRelatedListingsForTags(
  sourceTags: TagSignals,
  excludeSlug?: string,
  limit = 3,
  explicitSlugs: string[] = []
): Listing[] {
  const explicitSet = new Set(explicitSlugs);
  return ACTIVE_LISTINGS.filter((l) => l.slug !== excludeSlug)
    .map((listing) => ({
      listing,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForListing(listing)) +
        (listing.featured ? 1 : 0) +
        (listing.slug && explicitSet.has(listing.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.listing);
}

export function getRelatedDevelopmentsForTags(
  sourceTags: TagSignals,
  explicitSlugs: string[] = [],
  excludeSlug?: string,
  limit = 3
): Development[] {
  const explicitSet = new Set(explicitSlugs);
  return DEVELOPMENTS.filter((d) => d.editorialStatus !== "draft" && d.slug !== excludeSlug)
    .map((dev) => ({
      dev,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForDevelopment(dev)) +
        (explicitSet.has(dev.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.dev);
}

export function getRelatedGuidesForTags(
  sourceTags: TagSignals,
  explicitSlugs: string[] = [],
  excludeSlug?: string,
  limit = 4
): KnowledgeItem[] {
  const explicitSet = new Set(explicitSlugs);
  return ALL_GUIDES_AND_QUESTIONS.filter((k) => k.slug !== excludeSlug)
    .map((item) => ({
      item,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForKnowledgeItem(item)) +
        (explicitSet.has(item.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);
}

export function getRelatedAreasForTags(
  sourceTags: TagSignals,
  explicitSlugs: string[] = [],
  excludeSlug?: string,
  limit = 3
): AreaItem[] {
  const explicitSet = new Set(explicitSlugs);
  return AREAS.filter((a) => a.status !== "draft" && a.slug !== excludeSlug)
    .map((area) => ({
      area,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForAreaItem(area)) +
        (explicitSet.has(area.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.area);
}

export function getRelatedGlossaryForTags(
  sourceTags: TagSignals,
  explicitSlugs: string[] = [],
  excludeSlug?: string,
  limit = 4
): GlossaryTerm[] {
  const explicitSet = new Set(explicitSlugs);
  return LIVE_GLOSSARY_TERMS.filter((t) => t.slug !== excludeSlug)
    .map((term) => ({
      term,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForGlossaryTerm(term)) +
        (explicitSet.has(term.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.term);
}

export function getRelatedArticlesForTags(
  sourceTags: TagSignals,
  explicitSlugs: string[] = [],
  excludeSlug?: string,
  limit = 3
): ArticleItem[] {
  const explicitSet = new Set(explicitSlugs);
  return ARTICLES.filter((a) => a.status !== "draft" && a.slug !== excludeSlug)
    .map((article) => ({
      article,
      score:
        scoreTaxonomyOverlap(sourceTags, getTaxonomyForKnowledgeItem(article)) +
        (explicitSet.has(article.slug) ? 20 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.article);
}

export function getSpiderwebForListing(listing: Listing) {
  const tags = getTaxonomyForListing(listing);
  return {
    tags,
    guides: getRelatedGuidesForTags(tags, listing.relatedGuideSlugs ?? [], undefined, 3),
    areas: getRelatedAreasForTags(tags, listing.relatedAreaSlugs ?? [], undefined, 2),
    developments: getRelatedDevelopmentsForTags(tags, listing.relatedDevelopmentSlugs ?? [], undefined, 2),
    glossaryTerms: getRelatedGlossaryForTags(tags, listing.relatedGlossarySlugs ?? [], undefined, 4),
  };
}

export function getSpiderwebForDevelopment(dev: Development) {
  const tags = getTaxonomyForDevelopment(dev);
  return {
    tags,
    guides: getRelatedGuidesForTags(tags, dev.relatedGuideSlugs ?? [], undefined, 4),
    areas: getRelatedAreasForTags(tags, dev.relatedAreaSlugs ?? [], undefined, 2),
    listings: getRelatedListingsForTags(tags, undefined, 2),
    glossaryTerms: getRelatedGlossaryForTags(tags, dev.relatedGlossarySlugs ?? [], undefined, 4),
    tours: getRelatedToursForTags(tags, [], undefined, 2),
  };
}

export function getSpiderwebForTour(tour: GuidedTour) {
  const tags = getTaxonomyForTour(tour);
  return {
    tags,
    areas: getRelatedAreasForTags(tags, tour.relatedAreaSlugs ?? [], undefined, 3),
    guides: getRelatedGuidesForTags(tags, tour.relatedGuideSlugs ?? [], undefined, 3),
    developments: getRelatedDevelopmentsForTags(tags, [], undefined, 3),
    listings: getRelatedListingsForTags(tags, undefined, 2, tour.relatedListingSlugs ?? []),
    glossaryTerms: getRelatedGlossaryForTags(tags, [], undefined, 4),
  };
}


export type PropertyTypeTag =
  | "residential"
  | "waterfront"
  | "luxury"
  | "condo-townhome"
  | "55-plus"
  | "commercial"
  | "retail-office"
  | "industrial-flex"
  | "land-acreage"
  | "new-construction";

export type AudienceTag =
  | "home-buyers"
  | "home-sellers"
  | "relocating"
  | "55-plus-buyers"
  | "investors"
  | "commercial-owners"
  | "land-buyers"
  | "new-build-buyers";

export type CountyTag =
  | "hillsborough"
  | "pinellas"
  | "pasco"
  | "polk"
  | "marion"
  | "manatee"
  | "sarasota"
  | "hernando";

export type CorridorTag =
  | "downtown-bayshore"
  | "north-tampa-carrollwood"
  | "wesley-chapel-new-tampa"
  | "brandon-i75"
  | "st-petersburg-waterfront"
  | "clearwater-beaches"
  | "central-florida-corridor";

export interface TaxonomyTags {
  propertyType?: PropertyTypeTag[];
  audience?: AudienceTag[];
  county?: CountyTag[];
  corridor?: CorridorTag[];
  relatedGlossarySlugs?: string[];
  relatedGuideSlugs?: string[];
  relatedAreaSlugs?: string[];
  relatedDevelopmentSlugs?: string[];
  relatedServiceRoutes?: string[];
}

export interface TagSignals {
  propertyType: PropertyTypeTag[];
  audience: AudienceTag[];
  county: CountyTag[];
  corridor: CorridorTag[];
}

function addUnique<T>(arr: T[], value: T) {
  if (!arr.includes(value)) arr.push(value);
}

/**
 * Infers normalized property-type, audience, county, and corridor tags from
 * explicit taxonomy fields plus descriptive metadata (title, category, city, copy).
 */
export function inferTaxonomyTags(input: {
  text?: string;
  category?: string;
  city?: string;
  countyText?: string;
  explicit?: TaxonomyTags;
}): TagSignals {
  const propertyType: PropertyTypeTag[] = [...(input.explicit?.propertyType ?? [])];
  const audience: AudienceTag[] = [...(input.explicit?.audience ?? [])];
  const county: CountyTag[] = [...(input.explicit?.county ?? [])];
  const corridor: CorridorTag[] = [...(input.explicit?.corridor ?? [])];

  const hay = [
    input.text ?? "",
    input.category ?? "",
    input.city ?? "",
    input.countyText ?? "",
  ]
    .join(" ")
    .toLowerCase();

  if (/\b(commercial|nnn|cap rate|retail|office|warehouse|industrial|flex|bpo|cre|offering memorandum)\b/.test(hay)) {
    addUnique(propertyType, "commercial");
    addUnique(audience, "commercial-owners");
    addUnique(audience, "investors");
  }
  if (/\b(retail|office|medical|shopping center|plaza)\b/.test(hay)) {
    addUnique(propertyType, "retail-office");
  }
  if (/\b(warehouse|industrial|flex|distribution|loading dock)\b/.test(hay)) {
    addUnique(propertyType, "industrial-flex");
  }
  if (/\b(land|acre|acreage|vacant lot|zoned|ranch|pasture|greenbelt|timber)\b/.test(hay)) {
    addUnique(propertyType, "land-acreage");
    addUnique(audience, "land-buyers");
  }
  if (/\b(waterfront|bay|gulf|seawall|dock|elevation certificate|flood|coastal|st\.?\s*petersburg|tarpon|clearwater|apollo beach)\b/.test(hay)) {
    addUnique(propertyType, "waterfront");
  }
  if (/\b(luxury|penthouse|bayshore|hyde park|palma ceia|davis islands|harbour island|valencia|ritz)\b/.test(hay)) {
    addUnique(propertyType, "luxury");
  }
  if (/\b(condo|townhome|townhouse|villa|high-rise|tower|hoa)\b/.test(hay)) {
    addUnique(propertyType, "condo-townhome");
  }
  if (/\b(55\+|senior|active adult|kings point|sun city|solivita|valencia del sol)\b/.test(hay)) {
    addUnique(propertyType, "55-plus");
    addUnique(audience, "55-plus-buyers");
  }
  if (/\b(new construction|pre-construction|builder|developer|cdd|development|under construction|planning)\b/.test(hay)) {
    addUnique(propertyType, "new-construction");
    addUnique(audience, "new-build-buyers");
  }
  if (/\b(sell|seller|listing|net proceeds|staging|appraisal|inspection)\b/.test(hay)) {
    addUnique(audience, "home-sellers");
  }
  if (/\b(buy|buyer|relocat|homestead|closing cost|mortgage|first-time)\b/.test(hay)) {
    addUnique(audience, "home-buyers");
  }
  if (/\b(relocat|moving to|out-of-state)\b/.test(hay)) {
    addUnique(audience, "relocating");
  }
  if (/\b(1031|investor|investment|cap rate|rental|cash flow)\b/.test(hay)) {
    addUnique(audience, "investors");
  }

  // Counties
  if (/\b(tampa|carrollwood|brandon|lutz|odessa|riverview|valrico|apollo beach|sun city|wesley chapel south|hillsborough)\b/.test(hay)) {
    addUnique(county, "hillsborough");
  }
  if (/\b(st\.?\s*petersburg|clearwater|dunedin|tarpon springs|safety harbor|seminole|largo|pinellas)\b/.test(hay)) {
    addUnique(county, "pinellas");
  }
  if (/\b(wesley chapel|land o'?\s*lakes|zephyrhills|dade city|new port richey|trinity|pasco)\b/.test(hay)) {
    addUnique(county, "pasco");
  }
  if (/\b(frostproof|lakeland|winter haven|polk)\b/.test(hay)) {
    addUnique(county, "polk");
  }
  if (/\b(fort mccoy|ocala|marion)\b/.test(hay)) {
    addUnique(county, "marion");
  }

  // Corridors
  if (/\b(downtown|channel|bayshore|hyde park|palma ceia|davis islands|harbour island|westshore|soho)\b/.test(hay)) {
    addUnique(corridor, "downtown-bayshore");
  }
  if (/\b(carrollwood|northdale|north tampa|lake magdalene|lutz|odessa)\b/.test(hay)) {
    addUnique(corridor, "north-tampa-carrollwood");
  }
  if (/\b(wesley chapel|new tampa|epperson|mirada|k-bar|land o'?\s*lakes)\b/.test(hay)) {
    addUnique(corridor, "wesley-chapel-new-tampa");
  }
  if (/\b(brandon|riverview|valrico|plant city|apollo beach|sun city|wimauma)\b/.test(hay)) {
    addUnique(corridor, "brandon-i75");
  }
  if (/\b(st\.?\s*petersburg|bahama shores|old northeast|snell isle|pinellas point)\b/.test(hay)) {
    addUnique(corridor, "st-petersburg-waterfront");
  }
  if (/\b(clearwater|dunedin|tarpon|safety harbor|beaches)\b/.test(hay)) {
    addUnique(corridor, "clearwater-beaches");
  }
  if (/\b(frostproof|fort mccoy|polk|marion|central florida)\b/.test(hay)) {
    addUnique(corridor, "central-florida-corridor");
  }

  if (propertyType.length === 0) {
    propertyType.push("residential");
  }

  return { propertyType, audience, county, corridor };
}

/**
 * Computes weighted overlap between two tag sets so related-content resolvers
 * link bidirectionally without relying on slice order.
 */
export function scoreTaxonomyOverlap(a: TagSignals, b: TagSignals): number {
  let score = 0;
  for (const tag of a.propertyType) {
    if (b.propertyType.includes(tag)) score += tag === "residential" ? 1 : 4;
  }
  for (const tag of a.audience) {
    if (b.audience.includes(tag)) score += 3;
  }
  for (const tag of a.county) {
    if (b.county.includes(tag)) score += 2;
  }
  for (const tag of a.corridor) {
    if (b.corridor.includes(tag)) score += 4;
  }
  return score;
}


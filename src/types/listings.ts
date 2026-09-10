export type ListingCategory = "Commercial" | "Residential";
export type ListingStatus = "Draft" | "Active" | "Under Contract" | "Sold" | "Leased" | "Rented";

export interface ListingImage {
  id: string;
  url: string;
  caption?: string;
  isHero: boolean;
  sortOrder: number;
}

export interface ListingAttachment {
  id: string;
  label: string;
  url: string;
  type: string;
}

export interface Listing {
  id: string;
  brokerId: string;
  category: ListingCategory;
  title: string;
  propertyType: string;
  transactionType: string;
  status: ListingStatus;
  slug: string;
  featured: boolean;
  
  // Address
  streetAddress: string;
  suiteUnit?: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  lat?: number;
  lng?: number;

  // Commercial specific
  buildingSizeSqFt?: string;
  availableSpaceSqFt?: string;
  zoning?: string;
  parkingSpaces?: string;
  parkingRatio?: string;
  clearHeightFt?: string;
  dockDoors?: string;
  capRate?: string;
  noi?: string;
  grm?: string;
  occupancy?: string;
  leaseType?: string;
  minLeaseTerm?: string;
  maxLeaseTerm?: string;
  availableDate?: string;
  tiAllowance?: string;
  camCharges?: string;
  tenancyType?: string;
  currentTenants?: string;
  leaseExpiration?: string;

  // Residential specific
  bedrooms?: string;
  bathrooms?: string;
  hoaName?: string;
  hoaFee?: string;
  hoaIncludes?: string;
  garage?: string;
  pool?: boolean;
  taxAmount?: string;
  sellersNotes?: string;

  // Shared details
  sqFt?: string;
  lotSize?: string;
  yearBuilt?: string;
  yearRenovated?: string;
  stories?: string;
  units?: string;
  buildings?: string;
  askingPrice?: string;
  askingRent?: string;

  // Content
  highlights: string[];
  propertyDescription: string;
  locationDescription: string;
  investmentSummary?: string; // Commercial
  sourcePlatform?: string;
  sourceUrl?: string;

  // Media
  images: ListingImage[];
  walkthroughVideoUrl?: string;
  virtualTourUrl?: string;
  droneVideoUrl?: string;
  attachments: ListingAttachment[];

  // Contact
  primaryContact: "Mark" | "Rachael";
  showEmail: boolean;
  showPhone: boolean;
  coBrokerName?: string;
  coBrokerContact?: string;

  createdAt: string;
  updatedAt: string;
}

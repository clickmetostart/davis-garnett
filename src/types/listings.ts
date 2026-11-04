export type ListingCategory = "Residential" | "Commercial" | "Land";
export type ListingStatus = "Active" | "Sold" | "Under Contract" | "Draft" | "Leased" | "Rented";
export type ListingRepresentation = "Exclusive Listing" | "Seller Representation" | "Buyer Representation";

export interface ListingImage {
  id: string;
  url: string;
  caption?: string;
  isHero?: boolean;
  sortOrder?: number;
}

export interface ListingAttachment {
  id: string;
  label: string;
  url: string;
  type: string;
}

export interface ListingSpecs {
  beds?: number;
  baths?: number | string;
  sqft?: string;
  lotSize?: string;
  yearBuilt?: number;
  capRate?: string;
  units?: number;
  zoning?: string;
  buildings?: number;
  waterfrontFeet?: number;
  garage?: string;
  stories?: number;
  pricePerSqft?: string;
  pricePerAcre?: string;
}

export interface ListingFeatureCategory {
  category: string;
  items: string[];
}

export interface ListingSchool {
  name: string;
  rating: string;
  grades: string;
  distance: string;
  type?: string;
}

export interface ListingFinancial {
  label: string;
  value: string;
}

export interface ListingAgent {
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  license: string;
  brokerage?: string;
}

export interface ListingImages {
  main: string;
  gallery: string[];
  [index: number]: ListingImage | any;
}

export interface Listing {
  id: string;
  slug: string;
  mlsId?: string;
  title: string;
  subtitle?: string;
  price?: string;
  priceNumeric?: number;
  address?: string;
  city: string;
  state: string;
  zip: string;
  neighborhood?: string;
  county: string;
  category: ListingCategory;
  propertyType: string;
  status: ListingStatus;
  representation?: ListingRepresentation;
  soldDate?: string;
  featured: boolean;
  specs?: ListingSpecs;
  description?: string;
  highlights: string[];
  categorizedFeatures?: ListingFeatureCategory[];
  schools?: ListingSchool[];
  financials?: ListingFinancial[];
  images: ListingImages | any;
  agent?: ListingAgent;
  matterportUrl?: string;
  accessNotice?: string;
  useCases?: { icon: string; title: string; desc: string }[];

  // Legacy / CRM dashboard compatibility fields
  brokerId?: string;
  transactionType?: string;
  folder?: string;
  streetAddress?: string;
  suiteUnit?: string;
  lat?: number;
  lng?: number;
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
  bedrooms?: string;
  bathrooms?: string;
  hoaName?: string;
  hoaFee?: string;
  hoaIncludes?: string;
  garage?: string;
  pool?: boolean;
  taxAmount?: string;
  sellersNotes?: string;
  sqFt?: string;
  lotSize?: string;
  yearBuilt?: string;
  yearRenovated?: string;
  stories?: string;
  units?: string;
  buildings?: string;
  askingPrice?: string;
  askingRent?: string;
  propertyDescription?: string;
  locationDescription?: string;
  investmentSummary?: string;
  sourcePlatform?: string;
  sourceUrl?: string;
  walkthroughVideoUrl?: string;
  virtualTourUrl?: string;
  droneVideoUrl?: string;
  attachments?: ListingAttachment[];
  primaryContact?: "Mark" | "Rachael";
  showEmail?: boolean;
  showPhone?: boolean;
  coBrokerName?: string;
  coBrokerContact?: string;
  createdAt: string;
  updatedAt: string;
}

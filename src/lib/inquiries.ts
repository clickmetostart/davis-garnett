export type InquiryCategoryKey =
  | "commercial"
  | "showing"
  | "consultation"
  | "developments"
  | "land"
  | "partner"
  | "outreach"
  | "general";

export interface InquiryCategoryConfig {
  key: InquiryCategoryKey;
  crmLabel: string;
  color: string;
  accentBg: string;
  adminBadge: string;
  adminHeading: string;
  clientHeading: string;
  clientIntroName: string;
}

export const INQUIRY_CATEGORIES: Record<InquiryCategoryKey, InquiryCategoryConfig> = {
  commercial: {
    key: "commercial",
    crmLabel: "Commercial & Mixed-Use",
    color: "#1e3a8a", // Deep Royal Navy
    accentBg: "#eff6ff",
    adminBadge: "COMMERCIAL ADVISORY",
    adminHeading: "New Commercial Real Estate Inquiry",
    clientHeading: "Commercial Real Estate Inquiry",
    clientIntroName: "Commercial Real Estate",
  },
  showing: {
    key: "showing",
    crmLabel: "Private Showing Request",
    color: "#059669", // Emerald Green
    accentBg: "#ecfdf5",
    adminBadge: "PROPERTY SHOWING",
    adminHeading: "New Private Showing Request",
    clientHeading: "Private Showing Request Received",
    clientIntroName: "a private property showing",
  },
  consultation: {
    key: "consultation",
    crmLabel: "Advisory Consultation",
    color: "#b45309", // Burnished Gold / Amber
    accentBg: "#fffbeb",
    adminBadge: "ADVISORY CONSULTATION",
    adminHeading: "New Private Consultation Request",
    clientHeading: "We Received Your Request",
    clientIntroName: "your real estate goals",
  },
  developments: {
    key: "developments",
    crmLabel: "Developments & 55+",
    color: "#0f766e", // Coastal Teal
    accentBg: "#f0fdfa",
    adminBadge: "DEVELOPMENTS & 55+",
    adminHeading: "New Development / 55+ Community Inquiry",
    clientHeading: "Tampa Bay Development Updates",
    clientIntroName: "Tampa Bay new developments",
  },
  land: {
    key: "land",
    crmLabel: "Land & Acreage",
    color: "#15803d", // Forest Green
    accentBg: "#f0fdf4",
    adminBadge: "LAND & ACREAGE",
    adminHeading: "New Land & Acreage Inquiry",
    clientHeading: "Land & Acreage Advisory Inquiry",
    clientIntroName: "Florida land and acreage",
  },
  partner: {
    key: "partner",
    crmLabel: "Strategic Partners",
    color: "#7c3aed", // Deep Violet
    accentBg: "#f5f3ff",
    adminBadge: "STRATEGIC PARTNER DESK",
    adminHeading: "New Strategic Partner / Vendor Request",
    clientHeading: "Strategic Partner Request Received",
    clientIntroName: "our Strategic Partner Desk",
  },
  outreach: {
    key: "outreach",
    crmLabel: "Community & Schools",
    color: "#be185d", // Warm Rose
    accentBg: "#fdf2f8",
    adminBadge: "COMMUNITY & SCHOOLS OUTREACH",
    adminHeading: "New Community & School Outreach Message",
    clientHeading: "Thank You for Connecting With Us",
    clientIntroName: "Community & School Outreach",
  },
  general: {
    key: "general",
    crmLabel: "General Inquiries",
    color: "#334155", // Executive Slate
    accentBg: "#f8fafc",
    adminBadge: "GENERAL INQUIRY",
    adminHeading: "New Website Message",
    clientHeading: "Thank You for Contacting Us",
    clientIntroName: "your inquiry",
  },
};

export const CRM_SEED_LABELS = Object.values(INQUIRY_CATEGORIES).map((cat) => ({
  name: cat.crmLabel,
  color: cat.color,
  isSystem: true,
}));

/**
 * Resolves any form trigger/subject/interest into a clean color-coded category
 * and strips developer/tech prefixes (like "Consultation Modal:").
 */
export function resolveInquiryCategory(
  explicitCategory?: string,
  subjectOrInterest?: string,
  source?: string
): InquiryCategoryConfig {
  if (explicitCategory && explicitCategory in INQUIRY_CATEGORIES) {
    return INQUIRY_CATEGORIES[explicitCategory as InquiryCategoryKey];
  }

  const combined = `${explicitCategory || ""} ${subjectOrInterest || ""} ${source || ""}`.toLowerCase();

  if (
    combined.includes("commercial") ||
    combined.includes("mixed-use") ||
    combined.includes("1031") ||
    combined.includes("bpo") ||
    combined.includes("lease") ||
    combined.includes("sba") ||
    combined.includes("tenant")
  ) {
    return INQUIRY_CATEGORIES.commercial;
  }
  if (
    combined.includes("showing") ||
    combined.includes("tour") ||
    combined.includes("property detail") ||
    combined.includes("offering memorandum") ||
    combined.includes("search mls") ||
    combined.includes("mls") ||
    combined.includes("properties")
  ) {
    return INQUIRY_CATEGORIES.showing;
  }
  if (
    combined.includes("55+") ||
    combined.includes("development") ||
    combined.includes("builder") ||
    combined.includes("interest list") ||
    combined.includes("floor plan")
  ) {
    return INQUIRY_CATEGORIES.developments;
  }
  if (
    combined.includes("land") ||
    combined.includes("acreage") ||
    combined.includes("timber") ||
    combined.includes("greenbelt") ||
    combined.includes("zoning")
  ) {
    return INQUIRY_CATEGORIES.land;
  }
  if (
    combined.includes("partner") ||
    combined.includes("vendor") ||
    combined.includes("contractor") ||
    combined.includes("septic") ||
    combined.includes("environmental") ||
    combined.includes("lender")
  ) {
    return INQUIRY_CATEGORIES.partner;
  }
  if (
    combined.includes("outreach") ||
    combined.includes("school") ||
    combined.includes("charity") ||
    combined.includes("giving") ||
    combined.includes("volunteer") ||
    combined.includes("event")
  ) {
    return INQUIRY_CATEGORIES.outreach;
  }
  if (
    combined.includes("consult") ||
    combined.includes("advice") ||
    combined.includes("strategy") ||
    combined.includes("selling") ||
    combined.includes("buying") ||
    combined.includes("valuation") ||
    combined.includes("knowledge hub")
  ) {
    return INQUIRY_CATEGORIES.consultation;
  }

  return INQUIRY_CATEGORIES.general;
}

/**
 * Strips developer/tech labels so client-facing emails and subjects read naturally.
 */
export function cleanHumanTopic(rawTopic?: string, fallback?: string): string {
  const cleaned = (rawTopic || "")
    .replace(/^consultation modal:\s*/i, "")
    .replace(/^contact form:\s*/i, "")
    .replace(/^website inquiry:\s*/i, "")
    .replace(/^knowledge hub:\s*/i, "")
    .trim();
  return cleaned || fallback || "Your Real Estate Inquiry";
}


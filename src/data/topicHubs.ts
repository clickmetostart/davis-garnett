import type { KnowledgeFAQ, PublicationStatus } from "@/data/knowledgeHub";
import type {
  AudienceTag,
  CorridorTag,
  CountyTag,
  PropertyTypeTag,
} from "@/lib/taxonomy";

export type HubKind = "audience" | "property-type" | "corridor";

export interface TopicHubConfig {
  slug: string;
  kind: HubKind;
  badge: string;
  title: string;
  subtitle: string;
  quickAnswer: string;
  howWeHandleIt: string;
  localFacts: { label: string; value: string; source: string }[];
  faqs: KnowledgeFAQ[];
  tags: {
    propertyType: PropertyTypeTag[];
    audience: AudienceTag[];
    county: CountyTag[];
    corridor: CorridorTag[];
  };
  toolLinks: { label: string; href: string; desc: string }[];
  publishedAt: string;
  updatedAt: string;
  status: PublicationStatus;
}

export const TOPIC_HUBS: TopicHubConfig[] = [
  {
    slug: "55-plus-tampa-bay",
    kind: "audience",
    badge: "Audience Hub • 55+ Active Adult",
    title: "55+ Active Adult Communities in Tampa Bay",
    subtitle:
      "Compare HOA vs. CDD costs, villa maintenance versus condo milestone reserves, and premier active-adult corridors across Hillsborough, Pinellas, and Pasco.",
    quickAnswer:
      "Tampa Bay holds over 30 major 55+ clubs. Options span new gated villas like Valencia del Sol in Wimauma, established golf towns like Sun City Center, and condos in Clearwater and St. Petersburg. True monthly cost depends on CDD taxes, flood coverage, and condo reserve rules.",
    howWeHandleIt:
      "Mark Davis (FL Lic #3209459) and Rachael Garnett (FL Lic #3378601) build side-by-side cost sheets for buyers. Each sheet lists HOA dues, CDD tax payoffs, Homestead Portability savings, and condo reserve reports so you never face surprise special assessments.",
    localFacts: [
      { label: "Top 55+ Corridors", value: "Wimauma, Sun City Center, Wesley Chapel, Clearwater", source: "Davis & Garnett Local Market Advisory" },
      { label: "Ownership Structures", value: "Fee-Simple Villas vs. Chapter 718 Condos", source: "Florida Statutes Chapters 718 & 720" },
      { label: "Tax Savings Transfer", value: "Up to $500,000 Homestead Portability", source: "Florida Dept. of Revenue Form DR-501T" },
    ],
    faqs: [
      {
        question: "Are villas or condos safer against special assessments in Florida 55+ communities?",
        answer: "Fee-simple villas governed under HOA Chapter 720 avoid Florida's three-story condo structural reserve rules, whereas mid-rise and high-rise condos must fund Structural Integrity Reserve Studies (SIRS) by state statute."
      },
      {
        question: "Do 55+ buyers still pay CDD fees in Hillsborough and Pasco?",
        answer: "Yes, newer master-planned communities such as Valencia del Sol or Esplanade often include a CDD assessment on the annual property tax bill alongside monthly HOA dues."
      }
    ],
    tags: {
      propertyType: ["55-plus", "condo-townhome", "residential"],
      audience: ["55-plus-buyers", "home-buyers", "relocating"],
      county: ["hillsborough", "pinellas", "pasco"],
      corridor: ["brandon-i75", "wesley-chapel-new-tampa", "clearwater-beaches"],
    },
    toolLinks: [
      { label: "Mortgage & CDD Calculator", href: "/tools/mortgage-calculator", desc: "Add HOA dues and CDD taxes to your monthly loan quote." },
      { label: "Seller Net Proceeds Calculator", href: "/tools/seller-net-proceeds", desc: "Estimate equity rolling from your current Florida home." },
      { label: "CDD vs. HOA Glossary", href: "/glossary/cdd", desc: "See how non-ad valorem tax districts work." },
    ],
    publishedAt: "2026-11-17T10:35:00-05:00",
    updatedAt: "2026-11-17T10:35:00-05:00",
    status: "live",
  },
  {
    slug: "commercial-tampa-bay",
    kind: "property-type",
    badge: "Property-Type Hub • Commercial & CRE",
    title: "Tampa Bay Commercial Real Estate & NNN Advisory",
    subtitle:
      "Retail plazas, medical suites, flex warehouses, BPO valuations, and 1031 exchange deals across Hillsborough and Pinellas.",
    quickAnswer:
      "Commercial buildings in Tampa Bay trade on Net Operating Income (NOI), lease type, and tenant credit. Key corridors stretch from Brandon and I-75 into St. Petersburg and North Tampa. Clear underwriting splits steady cash flow from empty upside.",
    howWeHandleIt:
      "Mark and Rachael deliver a custom Broker Price Opinion (BPO) before you bid or list. We check NNN expense bills, test Cap Rate math, and line up 1031 exchange dates with local title teams.",
    localFacts: [
      { label: "Primary Valuation Metric", value: "NOI ÷ Asking Price (Cap Rate)", source: "CCIM / Tampa Bay CRE Standard Practice" },
      { label: "IRS Exchange Deadlines", value: "45-Day Identification / 180-Day Closing", source: "IRS Code Section 1031" },
      { label: "Valuation Turnaround", value: "Custom BPO vs. Certified Bank Appraisal", source: "Florida Chapter 475 Brokerage Practice" },
    ],
    faqs: [
      {
        question: "How do I evaluate a Florida Triple Net (NNN) lease before buying?",
        answer: "Verify whether the landlord keeps roof, lot, or HVAC replacement duties. Also check how rising Florida windstorm insurance passes through to tenants."
      },
      {
        question: "When should commercial sellers start planning a 1031 exchange?",
        answer: "Start before signing a binding sale contract. Your Qualified Intermediary must be engaged before closing so you never hold sale proceeds."
      }
    ],
    tags: {
      propertyType: ["commercial", "retail-office", "industrial-flex"],
      audience: ["commercial-owners", "investors"],
      county: ["hillsborough", "pinellas", "pasco", "polk"],
      corridor: ["brandon-i75", "downtown-bayshore", "central-florida-corridor"],
    },
    toolLinks: [
      { label: "Commercial Rent & NNN Calculator", href: "/tools/commercial-rent-calculator", desc: "Compare NNN, Modified Gross, and Full-Service lease costs." },
      { label: "Commercial Cap Rate Calculator", href: "/tools/cap-rate-calculator", desc: "Model NOI, cap rate, and implied asset pricing." },
      { label: "1031 Deadline Calculator", href: "/tools/1031-deadline-calculator", desc: "Lock in your exact Day 45 and Day 180 IRS dates." },
    ],
    publishedAt: "2026-11-17T10:35:00-05:00",
    updatedAt: "2026-11-17T10:35:00-05:00",
    status: "live",
  },
  {
    slug: "waterfront-st-petersburg",
    kind: "corridor",
    badge: "Corridor Hub • St. Petersburg Waterfront",
    title: "St. Petersburg Waterfront Homes, Docks & Flood Zone Guide",
    subtitle:
      "Tampa Bay seawalls, deep-water docks, Flood Zones X/AE/VE, Elevation Certificates, and Bahama Shores to Snell Isle.",
    quickAnswer:
      "St. Petersburg waterfront homes offer top boating across Tampa Bay and Boca Ciega Bay. True value depends on seawall health, bridge clearance, and floor height above Base Flood Elevation (BFE). Checking Elevation Certificates early stops costly insurance shocks.",
    howWeHandleIt:
      "We evaluate Pinellas waterfront homes block by block. Our team pulls city permits, checks FEMA 50% Rule history, arranges seawall dive checks, and gets NFIP plus private flood quotes early.",
    localFacts: [
      { label: "Key St. Pete Enclaves", value: "Bahama Shores, Snell Isle, Old Northeast, Shore Acres", source: "Pinellas County Property Appraiser" },
      { label: "Flood Underwriting Tool", value: "FEMA Elevation Certificate & Risk Rating 2.0", source: "FEMA National Flood Insurance Program" },
      { label: "Windstorm Savings", value: "Florida OIR-B1-1802 Wind Mitigation Form", source: "Florida Office of Insurance Regulation" },
    ],
    faqs: [
      {
        question: "What does FEMA's 50% Rule mean for older St. Petersburg homes?",
        answer: "Remodeling an older ground-level Zone AE house past 50% of building value triggers elevation rules. The city then requires raising the home up to current flood code."
      },
      {
        question: "Do all St. Petersburg waterfront lots allow private boat lifts?",
        answer: "Dock and lift sizes depend on Pinellas County Water and Navigation rules. Side-line water setbacks and protected seagrass zones also govern slip permits."
      }
    ],
    tags: {
      propertyType: ["waterfront", "luxury", "residential"],
      audience: ["home-buyers", "home-sellers", "relocating"],
      county: ["pinellas", "hillsborough"],
      corridor: ["st-petersburg-waterfront", "clearwater-beaches", "downtown-bayshore"],
    },
    toolLinks: [
      { label: "Florida Mortgage & Flood Estimator", href: "/tools/mortgage-calculator", desc: "Combine monthly P&I, coastal wind, and flood quotes." },
      { label: "Elevation Certificate Glossary", href: "/glossary/elevation-certificate", desc: "Learn how BFE impacts your flood quote." },
      { label: "Wind Mitigation Discounts", href: "/glossary/wind-mitigation", desc: "See how roof clips and impact glass cut premiums." },
    ],
    publishedAt: "2026-11-17T10:35:00-05:00",
    updatedAt: "2026-11-17T10:35:00-05:00",
    status: "live",
  },
  {
    slug: "land-acreage-central-florida",
    kind: "property-type",
    badge: "Property-Type Hub • Land & Acreage",
    title: "Central Florida Land, Ranches & Build-Ready Acreage",
    subtitle:
      "Due diligence for Polk, Marion, Pasco, and rural Hillsborough tracts covering zoning, road easements, wetlands, and Greenbelt tax breaks.",
    quickAnswer:
      "Buying vacant acreage or commercial land in Polk, Marion, or outer Tampa Bay needs deep checks before closing. Buyers must verify legal road access, county zoning density, wetland lines, septic perc tests, and power access.",
    howWeHandleIt:
      "Mark and Rachael coordinate boundary surveys and Future Land Use reviews. We also verify Greenbelt farm tax steps plus well and septic feasibility so rural buyers avoid unbuildable tracts.",
    localFacts: [
      { label: "Agricultural Tax Break", value: "Florida Statutes Section 193.461 Greenbelt", source: "Florida Statutes Chapter 193" },
      { label: "Key Rural Counties", value: "Polk (Frostproof), Marion (Fort McCoy), Pasco, Hillsborough", source: "Davis & Garnett Active Portfolio" },
      { label: "Critical Contingencies", value: "Survey, Wetlands Delineation, Septic/Well, Legal Access", source: "FAR/BAR Vacant Land Contract Practice" },
    ],
    faqs: [
      {
        question: "Do vacant land loans work the same as residential mortgages?",
        answer: "No. Unimproved land usually needs 20% to 50% down payment through Florida Farm Credit, local credit unions, or seller financing."
      },
      {
        question: "How do I keep a Greenbelt exemption after buying agricultural acreage?",
        answer: "Keep active cattle, hay, or timber work running on January 1. Then file a fresh Agricultural Classification form with the county Property Appraiser by March 1."
      }
    ],
    tags: {
      propertyType: ["land-acreage", "commercial"],
      audience: ["land-buyers", "investors"],
      county: ["polk", "marion", "pasco", "hillsborough"],
      corridor: ["central-florida-corridor", "brandon-i75"],
    },
    toolLinks: [
      { label: "Greenbelt Exemption Guide", href: "/glossary/greenbelt-exemption", desc: "How bona fide agricultural status lowers property taxes." },
      { label: "1031 Deadline Calculator", href: "/tools/1031-deadline-calculator", desc: "Exchange appreciated land tax-deferred." },
    ],
    publishedAt: "2026-11-17T10:35:00-05:00",
    updatedAt: "2026-11-17T10:35:00-05:00",
    status: "live",
  },
  {
    slug: "carrollwood-northdale-homes",
    kind: "corridor",
    badge: "Corridor Hub • Carrollwood & North Tampa",
    title: "Carrollwood, Northdale & Lake Magdalene Real Estate Hub",
    subtitle:
      "Oak-shaded neighborhoods, zero-CDD single-family homes, top North Tampa commute routes, and Align Right Realty's home turf.",
    quickAnswer:
      "Carrollwood, Northdale, and Lake Magdalene sit in Northwest Hillsborough County. Buyers get shaded residential lots without CDD fees, quick access to Dale Mabry Highway and I-275, and 20-minute drives to Tampa Airport.",
    howWeHandleIt:
      "With our office anchored in Carrollwood, Rachael and Mark track new listings and renovations daily. We check roof permits, electrical panels, and school boundary lines so buyers move with certainty.",
    localFacts: [
      { label: "Brokerage Home Office", value: "Align Right Realty Carrollwood", source: "Davis & Garnett Advisory" },
      { label: "Typical District Overhead", value: "Many Classic Subdivisions Carry Zero CDD Fees", source: "Hillsborough County Tax Collector" },
      { label: "Core Lifestyle Perks", value: "Mature Lots, Golf Courses, 20 Min to TPA & Downtown", source: "Hillsborough County Planning" },
    ],
    faqs: [
      {
        question: "Why do many Tampa buyers prefer Carrollwood over outer new-construction suburbs?",
        answer: "Established Carrollwood and Northdale homes offer wider oak-shaded yards, zero CDD fees, and shorter drives to Westshore, St. Joseph's Hospital, and Tampa Airport."
      },
      {
        question: "What inspections matter most on 1970s–1990s Carrollwood homes?",
        answer: "Insurance companies inspect Four-Point and Wind Mitigation forms closely. Key checks cover remaining roof life, modern breaker panels, and supply plumbing."
      }
    ],
    tags: {
      propertyType: ["residential", "luxury", "condo-townhome"],
      audience: ["home-buyers", "home-sellers", "relocating"],
      county: ["hillsborough"],
      corridor: ["north-tampa-carrollwood", "wesley-chapel-new-tampa"],
    },
    toolLinks: [
      { label: "Mortgage & Insurance Calculator", href: "/tools/mortgage-calculator", desc: "Estimate North Tampa monthly P&I, taxes, and insurance." },
      { label: "Seller Net Proceeds Calculator", href: "/tools/seller-net-proceeds", desc: "Estimate Hillsborough closing costs and equity." },
      { label: "4-Point Inspection Glossary", href: "/glossary/four-point-inspection", desc: "What insurers inspect on 1970s–1990s homes." },
    ],
    publishedAt: "2026-11-17T10:35:00-05:00",
    updatedAt: "2026-11-17T10:35:00-05:00",
    status: "live",
  },
];

export const LIVE_TOPIC_HUBS: TopicHubConfig[] = TOPIC_HUBS.filter(
  (hub) => hub.status !== "draft"
);

export function getTopicHubBySlug(slug: string): TopicHubConfig | undefined {
  return LIVE_TOPIC_HUBS.find((hub) => hub.slug === slug);
}


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
      "Compare HOA vs. CDD fees, single-story villas vs. condo reserve rules, and top active-adult neighborhoods across Tampa Bay.",
    quickAnswer:
      "Tampa Bay holds over 30 active 55+ clubs. Buyers pick from gated villas in Wimauma, golf towns like Sun City Center, or coastal condos in Clearwater. Your true monthly budget hinges on CDD taxes, flood rates, and condo reserve funding.",
    howWeHandleIt:
      "Mark Davis (FL Lic BK3209459) and Rachael Garnett (FL Lic SL3378601) map out clear monthly cost sheets before you tour. Each sheet lists HOA dues, CDD tax payoffs, Homestead Portability savings, and condo reserve reports. You will know every fee up front.",
    localFacts: [
      { label: "Top 55+ Corridors", value: "Wimauma, Sun City Center, Wesley Chapel, Clearwater", source: "Davis & Garnett Local Market Advisory" },
      { label: "Ownership Structures", value: "Fee-Simple Villas vs. Chapter 718 Condos", source: "Florida Statutes Chapters 718 & 720" },
      { label: "Tax Savings Transfer", value: "Up to $500,000 Homestead Portability", source: "Florida Dept. of Revenue Form DR-501T" },
    ],
    faqs: [
      {
        question: "Are villas or condos safer from special assessments in Florida 55+ clubs?",
        answer: "One-story villas run under HOA Chapter 720 skip Florida's three-story condo structural reserve rule. Mid-rise and tall condos must fund Structural Integrity Reserve Studies (SIRS) under state law."
      },
      {
        question: "Do 55+ buyers pay CDD fees in Hillsborough and Pasco?",
        answer: "Yes. Newer gated clubs like Valencia del Sol or Esplanade often add a yearly CDD fee to your tax bill on top of monthly HOA dues."
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
      "Retail centers, medical suites, flex warehouses, BPO pricing checks, and 1031 tax swaps across Hillsborough and Pinellas.",
    quickAnswer:
      "Commercial buildings in Tampa Bay sell based on Net Operating Income (NOI), lease type, and tenant strength. Busy corridors run from Brandon and I-75 to St. Pete and North Tampa. Clear math splits steady rent income from vacant upside.",
    howWeHandleIt:
      "Mark and Rachael build a custom Broker Price Opinion (BPO) before you bid or list. We check NNN tax and insurance bills, test Cap Rate math, and line up 1031 closing dates early.",
    localFacts: [
      { label: "Primary Valuation Metric", value: "NOI ÷ Asking Price (Cap Rate)", source: "CCIM / Tampa Bay CRE Standard Practice" },
      { label: "IRS Exchange Deadlines", value: "45-Day Identification / 180-Day Closing", source: "IRS Code Section 1031" },
      { label: "Valuation Turnaround", value: "Custom BPO vs. Certified Bank Appraisal", source: "Florida Chapter 475 Brokerage Practice" },
    ],
    faqs: [
      {
        question: "How do I check a Florida Triple Net (NNN) lease before buying?",
        answer: "Check if the owner still pays for roof, paving, or AC replacement. Also see how rising Florida wind insurance passes through to tenants."
      },
      {
        question: "When should commercial sellers start planning a 1031 tax swap?",
        answer: "Start before signing a sale contract. You must hire a Qualified Intermediary before closing so you never touch the sale cash."
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
      "St. Pete seawalls, deep-water boat docks, Flood Zones X/AE/VE, and Elevation Certificates from Bahama Shores to Snell Isle.",
    quickAnswer:
      "St. Pete waterfront homes offer great boating across Tampa Bay and Boca Ciega Bay. True value depends on seawall age, bridge height, and floor height above Base Flood Elevation (BFE). Checking Elevation Certificates early prevents insurance surprises.",
    howWeHandleIt:
      "We check Pinellas waterfront streets block by block. Our team pulls city permits, checks FEMA 50% Rule history, sets up seawall checks, and gets flood quotes early.",
    localFacts: [
      { label: "Key St. Pete Enclaves", value: "Bahama Shores, Snell Isle, Old Northeast, Shore Acres", source: "Pinellas County Property Appraiser" },
      { label: "Flood Underwriting Tool", value: "FEMA Elevation Certificate & Risk Rating 2.0", source: "FEMA National Flood Insurance Program" },
      { label: "Windstorm Savings", value: "Florida OIR-B1-1802 Wind Mitigation Form", source: "Florida Office of Insurance Regulation" },
    ],
    faqs: [
      {
        question: "What does FEMA's 50% Rule mean for older St. Pete homes?",
        answer: "Updating an older ground-level Zone AE house past 50% of building value sets off strict flood rules. The city then makes owners raise the home up to new flood height."
      },
      {
        question: "Do all St. Pete waterfront lots allow a boat lift?",
        answer: "Dock and lift sizes follow Pinellas County water rules. Side lot setbacks and sea grass zones also set where a boat slip can go."
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
      "Smart checks for Polk, Marion, Pasco, and rural Hillsborough land covering zoning, road easements, wetlands, and Greenbelt tax breaks.",
    quickAnswer:
      "Buying open acreage or commercial land in Polk, Marion, or outer Tampa Bay takes careful checks first. Buyers must confirm legal road access, county zoning rules, wetland lines, soil perk tests, and nearby power lines.",
    howWeHandleIt:
      "Mark and Rachael line up land surveys and Future Land Use checks. We also confirm Greenbelt farm tax rules plus well and septic plans so you avoid land you cannot build on.",
    localFacts: [
      { label: "Agricultural Tax Break", value: "Florida Statutes Section 193.461 Greenbelt", source: "Florida Statutes Chapter 193" },
      { label: "Key Rural Counties", value: "Polk (Frostproof), Marion (Fort McCoy), Pasco, Hillsborough", source: "Davis & Garnett Active Portfolio" },
      { label: "Critical Contingencies", value: "Survey, Wetlands Delineation, Septic/Well, Legal Access", source: "FAR/BAR Vacant Land Contract Practice" },
    ],
    faqs: [
      {
        question: "Do land loans work the same as house loans?",
        answer: "No. Raw land loans often need 20% to 50% cash down through Farm Credit, local banks, or owner financing."
      },
      {
        question: "How do I keep a Greenbelt tax break after buying farm land?",
        answer: "Keep active cattle, hay, or timber work running on January 1. Then file a new farm tax form with the county Property Appraiser by March 1."
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
      "Tree-lined streets, zero-CDD single-family homes, quick North Tampa commute routes, and Align Right Realty's home office.",
    quickAnswer:
      "Carrollwood, Northdale, and Lake Magdalene sit in Northwest Hillsborough County. Buyers get shaded yards with no CDD fees, fast access to Dale Mabry Highway and I-275, and 20-minute drives to Tampa Airport.",
    howWeHandleIt:
      "With our office right in Carrollwood, Rachael and Mark track new listings and home updates daily. We check roof dates, power panels, and school zone lines so buyers move with confidence.",
    localFacts: [
      { label: "Brokerage Home Office", value: "Align Right Realty Carrollwood", source: "Davis & Garnett Advisory" },
      { label: "Typical District Overhead", value: "Many Classic Subdivisions Carry Zero CDD Fees", source: "Hillsborough County Tax Collector" },
      { label: "Core Lifestyle Perks", value: "Mature Lots, Golf Courses, 20 Min to TPA & Downtown", source: "Hillsborough County Planning" },
    ],
    faqs: [
      {
        question: "Why do many Tampa buyers pick Carrollwood over newer outer suburbs?",
        answer: "Older Carrollwood and Northdale homes offer wider shaded yards, zero CDD taxes, and faster drives to Westshore, hospitals, and Tampa Airport."
      },
      {
        question: "What home checks matter most on 1970s–1990s Carrollwood houses?",
        answer: "Insurance carriers look closely at Four-Point and Wind Mitigation reports. Big items include roof age, modern electric panels, and water supply pipes."
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


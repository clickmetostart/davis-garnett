export type DiscoveryTrack = "residential" | "commercial";

export interface DiscoveryOption {
  id: string;
  label: string;
  hint?: string;
}

export interface DiscoveryQuestionGroup {
  id: string;
  prompt: string;
  selectionMode: "single" | "multi";
  options: DiscoveryOption[];
}

export interface DiscoveryCard {
  id: string;
  stepNumber: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  whyItMatters: string;
  notePrompt: string;
  notePlaceholder: string;
  questions: DiscoveryQuestionGroup[];
  conditionalNote?: string;
}

export interface DiscoveryDeckConfig {
  track: DiscoveryTrack;
  slug: string;
  hubHref: string;
  hubLabel: string;
  getStartedHref: string;
  pdfTitle: string;
  pdfSubtitle: string;
  pdfCategory: string;
  badge: string;
  headline: string;
  intro: string;
  leadAdvisor: string;
  cards: DiscoveryCard[];
}

export interface DiscoveryAnswersState {
  selections: Record<string, string[]>;
  notesByCard: Record<string, string>;
  contact?: {
    fullName: string;
    email: string;
    phone: string;
    preferredMethod: string;
  };
}

export interface RecommendedResource {
  label: string;
  reason: string;
  href: string;
  kind: "Hub" | "Tool" | "Tour" | "Guide";
}

export const RESIDENTIAL_DISCOVERY_DECK: DiscoveryDeckConfig = {
  track: "residential",
  slug: "residential-discovery",
  hubHref: "/residential",
  hubLabel: "Residential Hub",
  getStartedHref: "/residential/get-started",
  pdfTitle: "Residential Getting Started Guide & Planning Worksheet",
  pdfSubtitle:
    "Pin down your Tampa Bay home priorities, budget, neighborhoods, and move timing. Fill it out online or print it for our first coffee meeting.",
  pdfCategory: "Residential Getting Started Guide",
  badge: "Getting Started · 7 Quick Steps",
  headline: "Plan Your Tampa Bay Move",
  intro:
    "Take three minutes to tell Mark and Rachael what matters most—your timeline, areas, budget comfort, and must-haves. Move back and forth anytime, or download the matching PDF guide to fill out on paper.",
  leadAdvisor: "Rachael Garnett (FL Lic #3378601) & Mark Davis (FL Lic #3209459)",
  cards: [
    {
      id: "res-role-timing",
      stepNumber: "01",
      shortLabel: "Goals",
      eyebrow: "Step 01 of 7 · Goals & Timing",
      title: "What Brings You to Tampa Bay Real Estate?",
      subtitle:
        "Tell us if you are buying, selling, or both—this sets the right game plan from day one.",
      whyItMatters:
        "Knowing whether you need to sell first, relocate on a job date, or downsize keeps every deadline realistic.",
      notePrompt: "Any move reason or target date we should know?",
      notePlaceholder: "Example: Relocating by August, or hoping to move before school starts...",
      questions: [
        {
          id: "res-goal",
          prompt: "What are you planning right now?",
          selectionMode: "multi",
          options: [
            { id: "buy-home", label: "Buying a Home or Condo" },
            { id: "sell-home", label: "Selling My Current Home" },
            { id: "buy-and-sell", label: "Selling & Buying Together" },
            { id: "relocating", label: "Moving to Tampa Bay" },
            { id: "55-plus", label: "55+ Active Adult Living" },
            { id: "just-exploring", label: "Early Research & Planning" },
          ],
        },
        {
          id: "res-timeline",
          prompt: "When would you like to move?",
          selectionMode: "single",
          options: [
            { id: "0-3-mos", label: "Right Away (0–3 Months)" },
            { id: "3-6-mos", label: "Soon (3–6 Months)" },
            { id: "6-12-mos", label: "This Year (6–12 Months)" },
            { id: "12-plus", label: "Just Planning Ahead (12+ Months)" },
          ],
        },
      ],
    },
    {
      id: "res-home-style",
      stepNumber: "02",
      shortLabel: "Home Style",
      eyebrow: "Step 02 of 7 · Property Style",
      title: "Which Home Styles Feel Right for You?",
      subtitle:
        "Pick every type you want to compare—each carries different HOA, roof, and insurance rules.",
      whyItMatters:
        "Comparing single-family yards, boat docks, and condos upfront helps narrow real monthly costs fast.",
      notePrompt: "Any style preferences or home layout ideas?",
      notePlaceholder: "Example: One-story ranch, Key West coastal feel, or downtown high-rise...",
      questions: [
        {
          id: "res-property-types",
          prompt: "Select the property types you like:",
          selectionMode: "multi",
          options: [
            { id: "single-family", label: "Single-Family Neighborhood Home", hint: "Established trees & roomy yards" },
            { id: "waterfront-dock", label: "Waterfront & Boat Dock Home", hint: "Canals, bay views & seawalls" },
            { id: "new-construction", label: "New Construction Community", hint: "New floor plans & builder perks" },
            { id: "downtown-condo", label: "Downtown Condo or Tower", hint: "Walkable dining & lock-and-leave" },
            { id: "villa-55-plus", label: "Low-Maintenance Villa or Townhome", hint: "Single-story & lawn care included" },
            { id: "acreage-home", label: "Home With Acreage or Workshop", hint: "Room for boats, RVs, or privacy" },
          ],
        },
      ],
    },
    {
      id: "res-locations",
      stepNumber: "03",
      shortLabel: "Areas",
      eyebrow: "Step 03 of 7 · Neighborhoods",
      title: "Where Across Tampa Bay Do You Picture Yourself?",
      subtitle:
        "Choose the areas on your radar—even twenty minutes across the bay changes taxes and commutes.",
      whyItMatters:
        "Pinning down drive routes to work, airports, schools, or water lets us rule out the wrong pockets early.",
      notePrompt: "Workplaces, schools, or spots you want to stay close to:",
      notePlaceholder: "Example: Within 25 min of Tampa Airport, near USF, or walkable to downtown St. Pete...",
      questions: [
        {
          id: "res-corridors",
          prompt: "Pick any areas you want to explore:",
          selectionMode: "multi",
          options: [
            { id: "carrollwood-north-tampa", label: "Carrollwood, Northdale & Lutz" },
            { id: "downtown-bayshore", label: "Downtown Tampa, Bayshore & Hyde Park" },
            { id: "st-pete-waterfront", label: "St. Petersburg, Snell Isle & Beaches" },
            { id: "wesley-chapel-pasco", label: "Wesley Chapel & Land O' Lakes" },
            { id: "clearwater-dunedin", label: "Clearwater, Dunedin & Palm Harbor" },
            { id: "brandon-southshore", label: "Brandon, Riverview & Apollo Beach" },
            { id: "sarasota-lwr", label: "Bradenton, Sarasota & Lakewood Ranch" },
            { id: "open-recommend", label: "Open to Mark & Rachael's Picks" },
          ],
        },
      ],
    },
    {
      id: "res-budget-monthly",
      stepNumber: "04",
      shortLabel: "Budget",
      eyebrow: "Step 04 of 7 · Budget & Monthly Costs",
      title: "What Price & Fee Comfort Fits Best?",
      subtitle:
        "Two homes at the same price can differ by $600+ per month once HOA, CDD taxes, and insurance are added.",
      whyItMatters:
        "Checking loan structure and monthly CDD/HOA tolerance early prevents falling in love with the wrong payment.",
      notePrompt: "Target monthly payment or lender details:",
      notePlaceholder: "Example: Hoping to keep monthly payment around $3,600, or using VA loan / cash...",
      questions: [
        {
          id: "res-budget-band",
          prompt: "Comfort price range:",
          selectionMode: "single",
          options: [
            { id: "under-450k", label: "Under $450,000" },
            { id: "450k-750k", label: "$450,000 – $750,000" },
            { id: "750k-1.25m", label: "$750,000 – $1.25M" },
            { id: "1.25m-2.5m", label: "$1.25M – $2.5M" },
            { id: "2.5m-plus", label: "$2.5M+ Waterfront & Estates" },
          ],
        },
        {
          id: "res-financing",
          prompt: "How do you plan to pay or finance?",
          selectionMode: "single",
          options: [
            { id: "pre-approved", label: "Pre-Approved Mortgage" },
            { id: "need-lender", label: "Need Trusted Local Lender Intro" },
            { id: "cash-buyer", label: "Cash Purchase" },
            { id: "equity-roll", label: "Using Current Home Equity + Portability" },
          ],
        },
        {
          id: "res-hoa-cdd",
          prompt: "How do you feel about HOA & CDD rules?",
          selectionMode: "single",
          options: [
            { id: "no-hoa-cdd", label: "Prefer No HOA / Zero CDD Fees" },
            { id: "modest-hoa", label: "Low HOA Is Fine, No Heavy CDD" },
            { id: "resort-club", label: "Happy With Resort Pools & Amenities" },
            { id: "not-sure", label: "Not Sure Yet — Show Both" },
          ],
        },
      ],
    },
    {
      id: "res-features-specs",
      stepNumber: "05",
      shortLabel: "Must-Haves",
      eyebrow: "Step 05 of 7 · Non-Negotiables",
      title: "What Features Are True Must-Haves?",
      subtitle:
        "Separate what your home genuinely needs every day from nice-to-have bonuses.",
      whyItMatters:
        "Clear non-negotiables save weekend driving time and catch roof, flood zone, or boat-depth issues early.",
      notePrompt: "Bedrooms, garage stalls, pets, or strict dealbreakers:",
      notePlaceholder: "Example: Need 4 beds, fenced yard for 2 dogs, home office, Flood Zone X preferred...",
      questions: [
        {
          id: "res-must-haves",
          prompt: "Check every feature that matters most:",
          selectionMode: "multi",
          options: [
            { id: "single-story", label: "Single-Story Floor Plan" },
            { id: "home-office", label: "Dedicated Office or Flex Room" },
            { id: "pool-lanai", label: "Pool & Screened Outdoor Lanai" },
            { id: "boat-lift", label: "Deepwater Dock / No Fixed Bridges" },
            { id: "zone-x", label: "Non-Flood Zone X Preferred" },
            { id: "new-roof-impact", label: "Newer Roof & Impact Windows" },
            { id: "gated-security", label: "Gated Community" },
            { id: "multi-gen", label: "In-Law Suite / Guest Space" },
          ],
        },
      ],
    },
    {
      id: "res-seller-prep",
      stepNumber: "06",
      shortLabel: "Your Sale",
      eyebrow: "Step 06 of 7 · Selling a Current Home",
      title: "Do You Also Have a House to Sell?",
      subtitle:
        "Skip right past this step if you are only buying—or let us know what your sale needs.",
      whyItMatters:
        "Our Every Listing Approach pairs prep, bright twilight media, and custom pricing to protect your take-home equity.",
      conditionalNote: "Optional if buying only",
      notePrompt: "Neighborhood, home age, or timing questions for your current place:",
      notePlaceholder: "Example: 3/2 in Northdale built 1995—wondering what fixes pay off before listing...",
      questions: [
        {
          id: "res-seller-needs",
          prompt: "What would help most with your current home?",
          selectionMode: "multi",
          options: [
            { id: "net-proceeds", label: "Estimate My Seller Net Proceeds" },
            { id: "prep-checklist", label: "Pre-Listing Prep & Staging Plan" },
            { id: "buy-sell-timing", label: "Lining Up Sale & Purchase Dates" },
            { id: "homestead-save", label: "Moving My Homestead Tax Savings" },
            { id: "no-home-to-sell", label: "No Current Home to Sell (Skip)" },
          ],
        },
      ],
    },
    {
      id: "res-meeting-style",
      stepNumber: "07",
      shortLabel: "Next Step",
      eyebrow: "Step 07 of 7 · How We Connect",
      title: "How Do You Want to Get Started Together?",
      subtitle:
        "Pick the relaxed first step that fits your schedule—you always work directly with Mark and Rachael.",
      whyItMatters:
        "Some folks want to drive three neighborhoods right away; others prefer a quiet coffee chat first.",
      notePrompt: "Best days to reach you, or any question on your mind:",
      notePlaceholder: "Example: Weekday mornings work best; would love to grab coffee near Carrollwood...",
      questions: [
        {
          id: "res-collab-mode",
          prompt: "Pick what feels easiest next:",
          selectionMode: "multi",
          options: [
            { id: "driving-tour", label: "Guided Neighborhood Drive (#GuidedByDG)" },
            { id: "coffee-meeting", label: "In-Person Coffee or Kitchen-Table Chat" },
            { id: "zoom-walkthrough", label: "Short Phone or Video Call First" },
            { id: "custom-mls-list", label: "Custom MLS & Off-Market List by Email" },
            { id: "pdf-in-hand", label: "Bring Printed Worksheet to Our Meeting" },
          ],
        },
      ],
    },
  ],
};

export const COMMERCIAL_DISCOVERY_DECK: DiscoveryDeckConfig = {
  track: "commercial",
  slug: "commercial-discovery",
  hubHref: "/commercial",
  hubLabel: "Commercial Hub",
  getStartedHref: "/commercial/get-started",
  pdfTitle: "Commercial & Land Getting Started Guide & Planning Worksheet",
  pdfSubtitle:
    "Outline your business building, NNN investment, 1031 swap, BPO value check, or Central Florida land goals. Use online or print it for our meeting.",
  pdfCategory: "Commercial & Land Getting Started Guide",
  badge: "Getting Started · 7 Quick Steps",
  headline: "Plan Your Commercial or Land Move",
  intro:
    "Step through seven short questions to clarify asset type, SBA or NNN numbers, zoning needs, and timing. Go back and forth anytime, send directly to Mark & Rachael, or download the matching printable PDF guide.",
  leadAdvisor: "Mark Davis (FL Lic #3209459) & Rachael Garnett (FL Lic #3378601)",
  cards: [
    {
      id: "com-goal-role",
      stepNumber: "01",
      shortLabel: "Goal",
      eyebrow: "Step 01 of 7 · Strategy & Clock",
      title: "What Commercial or Land Move Are You Making?",
      subtitle:
        "Owner-user purchases, NNN investments, land feasibility, and 1031 swaps each run on a different clock.",
      whyItMatters:
        "Clarifying your goal and exchange deadlines upfront helps us screen the right deals immediately.",
      notePrompt: "Tell us briefly about your business or investment milestone:",
      notePlaceholder: "Example: Expanding our clinic to 5,000 SF, or selling a retail plaza via 1031...",
      questions: [
        {
          id: "com-goal",
          prompt: "Select every deal path you are exploring:",
          selectionMode: "multi",
          options: [
            { id: "owner-user-buy", label: "Buy a Building for My Business" },
            { id: "nnn-invest-buy", label: "Buy a NNN or Income Property" },
            { id: "land-acreage-buy", label: "Buy Commercial Land or Acreage" },
            { id: "sell-asset", label: "Sell a Building or Land (Need BPO)" },
            { id: "lease-space", label: "Lease Retail, Office, or Warehouse" },
            { id: "1031-exchange", label: "IRS Section 1031 Tax-Deferred Swap" },
          ],
        },
        {
          id: "com-timeline",
          prompt: "How active is your timeline?",
          selectionMode: "single",
          options: [
            { id: "1031-clock", label: "Active 45-Day / 180-Day 1031 Clock" },
            { id: "0-3-mos", label: "Ready Now (0–3 Months)" },
            { id: "3-6-mos", label: "Planning Ahead (3–6 Months)" },
            { id: "6-plus-mos", label: "Longer Pipeline (6+ Months)" },
          ],
        },
      ],
    },
    {
      id: "com-asset-class",
      stepNumber: "02",
      shortLabel: "Asset Type",
      eyebrow: "Step 02 of 7 · Property Type",
      title: "What Building or Land Type Fits Best?",
      subtitle:
        "Pick the property types you want us to focus on—we handle both commercial corridors and rural land.",
      whyItMatters:
        "Each asset class trades on different rules, from parking ratios and ceiling height to Greenbelt farm taxes.",
      notePrompt: "Target square footage, unit count, or acreage size:",
      notePlaceholder: "Example: 4,000–7,500 SF standalone office with 25 parking spaces, or 20–80 acres...",
      questions: [
        {
          id: "com-asset-types",
          prompt: "Choose the asset classes that fit:",
          selectionMode: "multi",
          options: [
            { id: "office-medical", label: "Office & Medical Suites", hint: "Owner-user & multi-tenant" },
            { id: "retail-plaza", label: "Retail Storefront or Strip Plaza", hint: "High-visibility highway corridors" },
            { id: "industrial-flex", label: "Warehouse, Flex & Distribution", hint: "Roll-up doors, docks & I-4 access" },
            { id: "mixed-use", label: "Mixed-Use (Retail + Residential)", hint: "Urban blocks & dual rent streams" },
            { id: "commercial-pad", label: "Commercial Development Land", hint: "Highway frontage & utility ready" },
            { id: "ag-ranch-greenbelt", label: "Ranch, Timber & Greenbelt Acreage", hint: "Polk, Marion, Pasco & rural tracts" },
          ],
        },
      ],
    },
    {
      id: "com-corridors",
      stepNumber: "03",
      shortLabel: "Corridors",
      eyebrow: "Step 03 of 7 · Trade Areas",
      title: "Which Florida Corridors Fit Your Operations?",
      subtitle:
        "Pick the highways, business hubs, or rural counties where location matters most.",
      whyItMatters:
        "Traffic counts, labor access, utility hookups, and county permitting speed change sharply corridor by corridor.",
      notePrompt: "Specific intersections, counties, or drive limits:",
      notePlaceholder: "Example: Within 10 min of I-75/SR-60 in Brandon, Dale Mabry North, or US-27...",
      questions: [
        {
          id: "com-trade-areas",
          prompt: "Select priority corridors:",
          selectionMode: "multi",
          options: [
            { id: "brandon-i75", label: "Brandon, Hwy 60 & I-75 Corridor" },
            { id: "downtown-gasworx", label: "Downtown Tampa, Gasworx & Ybor" },
            { id: "carrollwood-westshore", label: "Carrollwood, Dale Mabry & Westshore" },
            { id: "st-pete-pinellas", label: "St. Petersburg, US-19 & Mid-Pinellas" },
            { id: "i4-lakeland-polk", label: "I-4 Corridor, Plant City & Lakeland" },
            { id: "central-fl-rural", label: "Polk, Marion & Central FL Ranch Land" },
            { id: "statewide-flex", label: "Open Across Greater Tampa Bay" },
          ],
        },
      ],
    },
    {
      id: "com-capital-returns",
      stepNumber: "04",
      shortLabel: "Capital",
      eyebrow: "Step 04 of 7 · Budget & Financing",
      title: "What Budget, Loan Type & Return Targets Work?",
      subtitle:
        "Business owners occupying 51%+ of a building often use 10%-down SBA 504 loans; NNN buyers focus on real post-tax yield.",
      whyItMatters:
        "Matching price band and debt structure upfront saves weeks chasing buildings that will not underwrite.",
      notePrompt: "Target Cap Rate, down payment comfort, or monthly rent cap:",
      notePlaceholder: "Example: $1.2M–$2.5M using SBA 504, or looking for 6.5%+ NNN yield...",
      questions: [
        {
          id: "com-price-band",
          prompt: "Target deal size (or monthly lease):",
          selectionMode: "single",
          options: [
            { id: "under-750k", label: "Under $750,000 (or Under $3,500/mo Lease)" },
            { id: "750k-1.5m", label: "$750,000 – $1.5M" },
            { id: "1.5m-3.5m", label: "$1.5M – $3.5M" },
            { id: "3.5m-10m", label: "$3.5M – $10M+" },
          ],
        },
        {
          id: "com-financing",
          prompt: "How do you expect to fund the deal?",
          selectionMode: "multi",
          options: [
            { id: "sba-504", label: "SBA 504 / 7(a) Owner-User Loan" },
            { id: "conventional-cre", label: "Local Commercial Bank Loan" },
            { id: "all-cash", label: "All Cash Purchase" },
            { id: "1031-proceeds", label: "1031 Exchange Equity Roll" },
            { id: "seller-financing", label: "Open to Seller Financing" },
          ],
        },
      ],
    },
    {
      id: "com-due-diligence",
      stepNumber: "05",
      shortLabel: "Site Specs",
      eyebrow: "Step 05 of 7 · Zoning & Site Must-Haves",
      title: "Which Zoning, Power & Land Specs Are Essential?",
      subtitle:
        "Catch county zoning, sewer, flood, or three-phase power limits before drafting an LOI.",
      whyItMatters:
        "Early due diligence keeps earnest money safe and ensures a building or tract actually fits your operation.",
      notePrompt: "Needed zoning, truck dock height, or land features:",
      notePlaceholder: "Example: Light industrial zoning, 18ft clear height, city sewer, or Greenbelt farm status...",
      questions: [
        {
          id: "com-specs",
          prompt: "Check every required site feature:",
          selectionMode: "multi",
          options: [
            { id: "high-parking", label: "Strong Parking (4+ Spaces / 1,000 SF)" },
            { id: "3-phase-power", label: "3-Phase Power / Heavy Utilities" },
            { id: "dock-grade", label: "Dock-High or Roll-Up Doors" },
            { id: "zoning-verified", label: "Ready Commercial Zoning (C-1 / C-2 / M-1)" },
            { id: "city-water-sewer", label: "City Water & Sewer Hookup" },
            { id: "paved-access", label: "Deeded Paved Road Frontage" },
            { id: "greenbelt-high-dry", label: "High & Dry Uplands / Greenbelt Eligible" },
            { id: "phase-1-clean", label: "Clean Environmental / Phase I ESA" },
          ],
        },
      ],
    },
    {
      id: "com-seller-bpo",
      stepNumber: "06",
      shortLabel: "Owners/BPO",
      eyebrow: "Step 06 of 7 · Owners & Valuation",
      title: "Selling, Pricing (BPO) or Leasing a Property?",
      subtitle:
        "Skip ahead if you are only buying—or tell us if you want a Broker Price Opinion or quiet off-market sale.",
      whyItMatters:
        "We price buildings on real trailing NOI, CoStar comps, and local tenant demand instead of automated guesses.",
      conditionalNote: "Optional if buying/leasing only",
      notePrompt: "Property address, parcel note, or lease status:",
      notePlaceholder: "Example: 3-tenant building on Hwy 60, current NOI around $145k, looking for BPO...",
      questions: [
        {
          id: "com-seller-options",
          prompt: "How can we help with a property you own?",
          selectionMode: "multi",
          options: [
            { id: "bpo-request", label: "Need a Commercial Broker Price Opinion (BPO)" },
            { id: "confidential-pocket", label: "Quiet / Off-Market Buyer Outreach" },
            { id: "full-loopnet-crexi", label: "Full MLS, Crexi, LoopNet & CoStar Launch" },
            { id: "lease-roll-audit", label: "Review NNN Pass-Throughs & Rent Roll" },
            { id: "no-asset-to-sell", label: "Buying / Leasing Only (Skip)" },
          ],
        },
      ],
    },
    {
      id: "com-collab",
      stepNumber: "07",
      shortLabel: "Next Step",
      eyebrow: "Step 07 of 7 · How We Connect",
      title: "How Do You Want to Get Started With Mark & Rachael?",
      subtitle:
        "Whether walking a parcel in boots or reviewing numbers over coffee, we match how you work best.",
      whyItMatters:
        "No pushy handoffs—Mark and Rachael stay personally involved from first call to closing table.",
      notePrompt: "Best hours to talk or partners to loop in:",
      notePlaceholder: "Example: Coffee near Carrollwood or intro call with my CPA included...",
      questions: [
        {
          id: "com-collab-mode",
          prompt: "Preferred way to start:",
          selectionMode: "multi",
          options: [
            { id: "site-tour", label: "In-Person Site Walk or Corridor Drive" },
            { id: "strategy-meeting", label: "Confidential Coffee or Office Meeting" },
            { id: "underwriting-call", label: "Phone / Video Deal Underwriting Call" },
            { id: "mentoring-session", label: "Commercial Mentoring Session" },
            { id: "pdf-in-hand", label: "Print Worksheet to Review Together" },
          ],
        },
      ],
    },
  ],
};

export function getDiscoveryDeck(track: DiscoveryTrack): DiscoveryDeckConfig {
  return track === "commercial" ? COMMERCIAL_DISCOVERY_DECK : RESIDENTIAL_DISCOVERY_DECK;
}

export function getPersonalizedMatches(
  track: DiscoveryTrack,
  state: DiscoveryAnswersState
): RecommendedResource[] {
  const picks = new Set(Object.values(state.selections || {}).flat());
  const out: RecommendedResource[] = [];

  if (track === "residential") {
    if (picks.has("waterfront-dock") || picks.has("st-pete-waterfront") || picks.has("boat-lift")) {
      out.push({
        label: "St. Petersburg Waterfront Hub",
        reason: "Covers seawalls, bridge clearance, flood zones & boat docks.",
        href: "/hub/waterfront-st-petersburg",
        kind: "Hub",
      });
      out.push({
        label: "St. Pete Waterfront Driving Tour",
        reason: "See Bahama Shores, Snell Isle & Old Northeast bayfront pockets.",
        href: "/tours/st-pete-waterfront-beach-drive-tour",
        kind: "Tour",
      });
    }
    if (picks.has("55-plus") || picks.has("villa-55-plus")) {
      out.push({
        label: "55+ Active Adult Communities Hub",
        reason: "Compares fee-simple villas vs. condos & monthly HOA/CDD fees.",
        href: "/hub/55-plus-tampa-bay",
        kind: "Hub",
      });
    }
    if (picks.has("carrollwood-north-tampa") || picks.has("single-story") || picks.has("no-hoa-cdd")) {
      out.push({
        label: "Carrollwood & Northdale Hub",
        reason: "Zero-CDD subdivisions, lakes & quick airport access.",
        href: "/hub/carrollwood-northdale-homes",
        kind: "Hub",
      });
    }
    if (picks.has("sell-home") || picks.has("buy-and-sell") || picks.has("net-proceeds") || picks.has("prep-checklist")) {
      out.push({
        label: "Our Every Listing Approach",
        reason: "See our full staging, drone media & seller launch checklist.",
        href: "/about/our-every-listing-approach",
        kind: "Guide",
      });
      out.push({
        label: "Seller Net Proceeds Calculator",
        reason: "Estimate your closing costs & take-home equity.",
        href: "/tools/seller-net-proceeds",
        kind: "Tool",
      });
    }
    if (picks.has("wesley-chapel-pasco") || picks.has("new-construction")) {
      out.push({
        label: "Wesley Chapel Lagoons & Schools Tour",
        reason: "Drive new lagoon neighborhoods and compare CDD costs.",
        href: "/tours/wesley-chapel-lagoons-schools-tour",
        kind: "Tour",
      });
    }
    out.push({
      label: "Florida Mortgage, HOA & CDD Calculator",
      reason: "Test monthly payments with insurance and property taxes included.",
      href: "/tools/mortgage-calculator",
      kind: "Tool",
    });
    out.push({
      label: "Tampa Bay Residential Hub",
      reason: "Browse all home services, neighborhoods & guides in one place.",
      href: "/residential",
      kind: "Hub",
    });
  } else {
    if (picks.has("sell-asset") || picks.has("bpo-request") || picks.has("confidential-pocket")) {
      out.push({
        label: "Commercial Broker Price Opinions (BPO)",
        reason: "Fast real-world property value reports built for sellers & lenders.",
        href: "/services/commercial-bpo",
        kind: "Guide",
      });
    }
    if (picks.has("1031-exchange") || picks.has("1031-clock") || picks.has("1031-proceeds")) {
      out.push({
        label: "IRS 1031 Exchange Deadline Calculator",
        reason: "Lock in your exact Day 45 and Day 180 exchange dates.",
        href: "/tools/1031-deadline-calculator",
        kind: "Tool",
      });
    }
    if (picks.has("land-acreage-buy") || picks.has("ag-ranch-greenbelt") || picks.has("central-fl-rural") || picks.has("greenbelt-high-dry")) {
      out.push({
        label: "Central Florida Land & Acreage Hub",
        reason: "Covers zoning, road access, perk tests & Greenbelt farm taxes.",
        href: "/hub/land-acreage-central-florida",
        kind: "Hub",
      });
      out.push({
        label: "Central FL US-27 / US-98 Land Tour",
        reason: "Explore Polk & Marion ranch and highway acreage corridors.",
        href: "/tours/central-florida-us27-us98-land-corridor-tour",
        kind: "Tour",
      });
    }
    if (picks.has("nnn-invest-buy") || picks.has("lease-space") || picks.has("owner-user-buy")) {
      out.push({
        label: "Commercial Cap Rate & NOI Calculator",
        reason: "Model Net Operating Income and pricing sensitivity.",
        href: "/tools/cap-rate-calculator",
        kind: "Tool",
      });
      out.push({
        label: "Commercial Rent & NNN Calculator",
        reason: "Compare NNN, Modified Gross & Full-Service lease totals.",
        href: "/tools/commercial-rent-calculator",
        kind: "Tool",
      });
    }
    if (picks.has("brandon-i75")) {
      out.push({
        label: "Brandon SR-60 Commercial Corridor Tour",
        reason: "See retail, office & owner-user opportunities along Highway 60.",
        href: "/tours/brandon-sr60-mixed-use-commercial-tour",
        kind: "Tour",
      });
    }
    if (picks.has("mentoring-session")) {
      out.push({
        label: "Commercial Real Estate Mentoring",
        reason: "Deal-by-deal NNN, SBA 504 & underwriting coaching.",
        href: "/services/commercial-mentoring",
        kind: "Guide",
      });
    }
    out.push({
      label: "Tampa Bay Commercial & Land Hub",
      reason: "Explore all CRE services, corridors, tools & listings.",
      href: "/commercial",
      kind: "Hub",
    });
  }

  const seen = new Set<string>();
  return out
    .filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    })
    .slice(0, 5);
}

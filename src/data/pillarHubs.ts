import type { KnowledgeFAQ } from "@/data/knowledgeHub";
import type { TagSignals } from "@/lib/taxonomy";

export interface PillarServiceLane {
  id: string;
  tag: string;
  title: string;
  summary: string;
  highlights: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface PillarCorridorCard {
  region: string;
  title: string;
  desc: string;
  href: string;
  actionLabel: string;
}

export interface PillarStepItem {
  step: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}

export interface PillarCheckItem {
  num: string;
  title: string;
  body: string;
  href: string;
}

export interface PillarToolCard {
  tag: string;
  title: string;
  desc: string;
  href: string;
  ctaLabel: string;
}

export interface PillarGlossaryChip {
  term: string;
  plainNote: string;
  href: string;
}

export interface PillarHubConfig {
  track: "residential" | "commercial";
  slug: string;
  badge: string;
  title: string;
  accentWord: string;
  subtitle: string;
  heroImage: string;
  heroImageAlt: string;
  getStartedHref: string;
  getStartedLabel: string;
  secondaryHeroHref: string;
  secondaryHeroLabel: string;
  quickAnswer: string;
  howWeHandleIt: string;
  tags: TagSignals;
  serviceSectionEyebrow: string;
  serviceSectionTitle: string;
  serviceSectionIntro: string;
  serviceLanes: PillarServiceLane[];
  corridorEyebrow: string;
  corridorTitle: string;
  corridorIntro: string;
  corridors: PillarCorridorCard[];
  processEyebrow: string;
  processTitle: string;
  processIntro: string;
  steps: PillarStepItem[];
  checksEyebrow: string;
  checksTitle: string;
  checks: PillarCheckItem[];
  tools: PillarToolCard[];
  glossaryChips: PillarGlossaryChip[];
  faqs: KnowledgeFAQ[];
  preferredTourSlugs: string[];
  preferredGuideSlugs: string[];
  publishedAt: string;
  updatedAt: string;
}

export const RESIDENTIAL_PILLAR_HUB: PillarHubConfig = {
  track: "residential",
  slug: "residential",
  badge: "Davis & Garnett · Tampa Bay Homes & Condos",
  title: "Tampa Bay Residential",
  accentWord: "Realtor Hub",
  subtitle:
    "Buying your next house, selling a longtime place, or moving into Tampa Bay? Mark Davis and Rachael Garnett help you pick the right street at your own pace.",
  heroImage: "/res_waterfront_estate_1787632802890.png",
  heroImageAlt: "Tampa Bay home exterior at sunset",
  getStartedHref: "/residential/get-started",
  getStartedLabel: "Start Your Project",
  secondaryHeroHref: "/search-mls",
  secondaryHeroLabel: "Search Homes With Map",
  quickAnswer:
    "Great home moves start with daily life, not just nice photos. Drive times, lot sunlight, quiet streets, layout flow, and resale value matter most. Pick a street that fits how you live five years from now.",
  howWeHandleIt:
    "Rachael Garnett (FL Lic #3378601) and Mark Davis (FL Lic #3209459) take every call in person. We compare local home values, talk through repair asks, and guide your move from our Carrollwood office.",
  tags: {
    propertyType: ["residential", "waterfront", "luxury", "condo-townhome", "55-plus", "new-construction"],
    audience: ["home-buyers", "home-sellers", "relocating", "55-plus-buyers", "new-build-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "manatee", "sarasota"],
    corridor: [
      "north-tampa-carrollwood",
      "st-petersburg-waterfront",
      "downtown-bayshore",
      "wesley-chapel-new-tampa",
      "clearwater-beaches",
      "sarasota-bradenton-lakewood-ranch",
    ],
  },
  serviceSectionEyebrow: "Residential Brokerage",
  serviceSectionTitle: "How We Help Homeowners & Buyers Across Tampa Bay",
  serviceSectionIntro:
    "Clear help built around your move—whether upsizing, relocating, buying your first home, or getting top value when you sell.",
  serviceLanes: [
    {
      id: "lifestyle-buying",
      tag: "Home Buying",
      title: "Matching Real Life to the Right Street",
      summary:
        "We look past fresh paint to test drive times, school car lines, patio shade, parking room, and future demand.",
      highlights: [
        "Honest takes on room flow, light, and lot layout",
        "Clean offers built around timing and budget",
      ],
      primaryCta: { label: "Start Your Project", href: "/residential/get-started" },
      secondaryCta: { label: "Search Live MLS Homes", href: "/search-mls" },
    },
    {
      id: "strategic-selling",
      tag: "Home Selling",
      title: "Listing Prep That Protects Take-Home Cash",
      summary:
        "Learn which fast fix-ups raise real offers—paint, light bulbs, and trim yard care—before spending money you never get back.",
      highlights: [
        "Bright twilight photos, drone video & floor plans",
        "Clear offer reviews and direct buyer follow-up",
      ],
      primaryCta: { label: "See Our Listing Checklist", href: "/about/our-every-listing-approach" },
      secondaryCta: { label: "Estimate Your Net Equity", href: "/tools/seller-net-proceeds" },
    },
    {
      id: "move-up-downsize",
      tag: "Timing Both Sides",
      title: "Buying & Selling Without Double Moves",
      summary:
        "Selling one home while buying the next takes calm math. We line up closing days, rent-back stays, and loan dates neatly.",
      highlights: [
        "Smooth closing timelines and stay-after options",
        "Clear sale pricing plan before listing day",
      ],
      primaryCta: { label: "Plan a Buy & Sell Move", href: "/residential/get-started" },
      secondaryCta: { label: "Talk Through Timing", href: "/contact" },
    },
    {
      id: "relocation-orientation",
      tag: "Moving to Tampa Bay",
      title: "Out-of-State & Job Relocations",
      summary:
        "New to Tampa Bay? Spend a relaxed half-day driving areas side by side to feel local shops, parks, and traffic first.",
      highlights: [
        "Video home walk-throughs and street previews",
        "Trusted local lender, home pro & title picks",
      ],
      primaryCta: { label: "Read Relocation Handbook", href: "/knowledge-hub/relocating-to-tampa-bay-handbook" },
      secondaryCta: { label: "Explore Local Drive Routes", href: "/tours" },
    },
    {
      id: "classic-vs-new",
      tag: "Neighborhood Fit",
      title: "Classic Canopy Streets vs. New Builds",
      summary:
        "Compare wide oak-shaded lots in older towns against brand-new floor plans, swim clubs, and parks in new communities.",
      highlights: [
        "Side-by-side look at yard size and upkeep",
        "Fair look at builders and resale homes alike",
      ],
      primaryCta: { label: "Browse New Communities", href: "/developments" },
      secondaryCta: { label: "Carrollwood Home Hub", href: "/hub/carrollwood-northdale-homes" },
    },
    {
      id: "condos-coastal",
      tag: "Lock & Leave Living",
      title: "Downtown Condos & Easy-Care Villas",
      summary:
        "Trade lawn work for walkable coffee shops, city views, and gyms—with plain-English checks on pet rules and monthly fees.",
      highlights: [
        "Compare city high-rises, townhomes & villas",
        "Check guest parking, pet size & lease rules",
      ],
      primaryCta: { label: "View Active Homes & Condos", href: "/properties?category=Residential" },
      secondaryCta: { label: "Explore St. Pete Living", href: "/knowledge-hub/areas/st-petersburg" },
    },
  ],
  corridorEyebrow: "Everyday Tampa Bay Living",
  corridorTitle: "Neighborhoods Built Around How You Live",
  corridorIntro:
    "Each pocket of Tampa Bay has its own pace, tree cover, drive pattern, and weekend feel.",
  corridors: [
    {
      region: "North Tampa · Our Home Office",
      title: "Carrollwood, Northdale & Odessa",
      desc: "Shaded oaks, clean lakes, quiet dead-end streets, golf clubs, and quick 20-minute drives to Tampa Airport.",
      href: "/hub/carrollwood-northdale-homes",
      actionLabel: "Explore Carrollwood",
    },
    {
      region: "Urban Core · South Tampa",
      title: "Bayshore, Hyde Park & Downtown",
      desc: "Walkable cafes along Howard and Water Street, Bayshore running paths, brick homes, and city towers.",
      href: "/developments#downtown-towers",
      actionLabel: "See South & Downtown",
    },
    {
      region: "Pinellas Peninsula",
      title: "St. Petersburg, Old NE & Beaches",
      desc: "Brick streets under big trees, weekend pier markets, Central Ave dining, and Gulf sunsets ten minutes west.",
      href: "/knowledge-hub/areas/st-petersburg",
      actionLabel: "Explore St. Petersburg",
    },
    {
      region: "North Pinellas Coast",
      title: "Dunedin, Safety Harbor & Clearwater",
      desc: "Golf-cart downtown blocks, harbor walks, cozy shops, and miles of bike rides on the Pinellas Trail.",
      href: "/developments#clearwater-north-pinellas",
      actionLabel: "Explore North Pinellas",
    },
    {
      region: "North Suburban Growth",
      title: "Wesley Chapel & Land O' Lakes",
      desc: "Bright family towns with walking paths, neighborhood pools, sports fields, and growing shops near Wiregrass.",
      href: "/developments#north-tampa-communities",
      actionLabel: "See Wesley Chapel",
    },
    {
      region: "South Counties",
      title: "Lakewood Ranch, Bradenton & Sarasota",
      desc: "Town greens, weekend markets, golf links, bayfront parks, and bright white beaches on Sarasota Bay.",
      href: "/developments#sarasota-manatee-communities",
      actionLabel: "Explore Sarasota & LWR",
    },
  ],
  processEyebrow: "Your Getting Started Path",
  processTitle: "Five Simple Steps From Plan to Closing",
  processIntro:
    "Run through seven quick questions online or print our blank worksheet before coffee.",
  steps: [
    {
      step: "01",
      title: "Share Your Goals, Areas & Budget Range",
      body: "Answer seven quick steps online so Mark and Rachael know what feels like home first.",
      href: "/residential/get-started",
      linkLabel: "Start Your Project",
    },
    {
      step: "02",
      title: "Line Up Local Lending & Cost Comfort",
      body: "Pair a trusted Tampa Bay lender quote with real local tax and neighborhood cost checks.",
      href: "/tools/mortgage-calculator",
      linkLabel: "Check Monthly Payment",
    },
    {
      step: "03",
      title: "Tour Corridors & Homes Side by Side",
      body: "See active MLS houses, new communities, and upcoming releases in one easy driving route.",
      href: "/properties?category=Residential",
      linkLabel: "Browse Active Homes",
    },
    {
      step: "04",
      title: "Write a Clean Offer & Inspect Well",
      body: "We guard your escrow deposit and set up trusted inspectors so talks stay fair.",
      href: "/search-mls",
      linkLabel: "Search MLS Map",
    },
    {
      step: "05",
      title: "Close Calmly & Stay Connected Locally",
      body: "From final walk-through to trusted painter or contractor names, we stay one call away.",
      href: "/about/our-every-listing-approach",
      linkLabel: "See How We Work",
    },
  ],
  checksEyebrow: "Smart Buyer & Seller Prep",
  checksTitle: "5 Things to Check Early When Moving in Tampa Bay",
  checks: [
    {
      num: "01",
      title: "Drive Your Weekday Commute Twice",
      body: "Bridge traffic, Dale Mabry lights, and school lines feel very different at 5:15 PM than on Sunday.",
      href: "/tours",
    },
    {
      num: "02",
      title: "Stand on the Back Patio at 4:00 PM",
      body: "Check direct afternoon sun heat, yard drainage slope, neighbor sightlines, and road sound first.",
      href: "/residential/get-started",
    },
    {
      num: "03",
      title: "Measure Garage Width & Storage Space",
      body: "Full-size SUVs, bikes, boxes, and desk gear need real room—measure garages and closets early.",
      href: "/properties?category=Residential",
    },
    {
      num: "04",
      title: "Use a Responsive Tampa Bay Loan Officer",
      body: "Sellers trust local lenders who pick up the phone and close on time over big call centers.",
      href: "/about/strategic-partners",
    },
    {
      num: "05",
      title: "Check Seller Net Cash Before Fixing Up",
      body: "See clear take-home numbers and pick high-return cleanups instead of pricey room remodels.",
      href: "/tools/seller-net-proceeds",
    },
  ],
  tools: [
    {
      tag: "Payment Planner",
      title: "Tampa Bay Monthly Home Cost Estimator",
      desc: "Model loan pay, taxes, and community dues clearly on one simple screen.",
      href: "/tools/mortgage-calculator",
      ctaLabel: "Open Payment Tool",
    },
    {
      tag: "For Home Sellers",
      title: "Seller Net Proceeds Calculator",
      desc: "Check payoff, closing costs, and take-home cash before picking a list price.",
      href: "/tools/seller-net-proceeds",
      ctaLabel: "Estimate Net Equity",
    },
    {
      tag: "Personal Game Plan",
      title: "Get Started Worksheet & Guide PDF",
      desc: "Spend three minutes online to organize your move, or print our sheet before coffee.",
      href: "/residential/get-started",
      ctaLabel: "Start Your Project",
    },
  ],
  glossaryChips: [
    { term: "HOA Rules", plainNote: "Neighborhood upkeep & guidelines", href: "/glossary/hoa" },
    { term: "CDD Districts", plainNote: "Community amenity tax fees", href: "/glossary/cdd" },
    { term: "Homestead Savings", plainNote: "Florida primary tax cap", href: "/glossary/homestead-portability" },
    { term: "Wind Mitigation", plainNote: "Storm roof discount report", href: "/glossary/wind-mitigation" },
  ],
  faqs: [
    {
      question: "How far ahead should we reach out before wanting to move?",
      answer:
        "Starting 60 to 120 days out works great. You get calm time to drive streets on weekdays and line up lending before your top pick hits the market.",
    },
    {
      question: "Should we sell our current house first or shop before listing?",
      answer:
        "That depends on your equity and comfort with timing. We walk through bridge options, stay-after-closing days, and trade-offs so you never feel rushed.",
    },
    {
      question: "How do Mark and Rachael work together on home moves?",
      answer:
        "You never get handed off to junior staff. Both partners stay plugged into pricing, tours, and repair talks so help answers fast every day.",
    },
    {
      question: "What happens after I fill out the Start Your Project steps?",
      answer:
        "Mark and Rachael receive your notes right away and build your custom PDF copy. Our first call starts around real streets instead of basic intake.",
    },
  ],
  preferredTourSlugs: [
    "carrollwood-northdale-lakes-tour",
    "south-tampa-bayshore-hyde-park-tour",
    "wesley-chapel-lagoons-schools-tour",
    "clearwater-dunedin-beaches-destinations-tour",
  ],
  preferredGuideSlugs: [
    "tampa-bay-luxury-home-buying-guide",
    "selling-your-home-in-tampa-bay",
    "relocating-to-tampa-bay-handbook",
    "can-i-buy-a-house-in-florida-while-selling-my-current-one",
  ],
  publishedAt: "2026-11-17T18:45:00-05:00",
  updatedAt: "2026-11-17T18:45:00-05:00",
};

export const COMMERCIAL_PILLAR_HUB: PillarHubConfig = {
  track: "commercial",
  slug: "commercial",
  badge: "Davis & Garnett · Business Property & Florida Land",
  title: "Tampa Bay Commercial",
  accentWord: "Realtor Hub",
  subtitle:
    "Mark Davis and Rachael Garnett help business owners, clinics, landlords, and landowners find strong sites, strike fair leases, and price buildings cleanly.",
  heroImage: "/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg",
  heroImageAlt: "Tampa Bay commercial real estate building and retail corridor",
  getStartedHref: "/commercial/get-started",
  getStartedLabel: "Start Your Project",
  secondaryHeroHref: "/services/commercial-bpo",
  secondaryHeroLabel: "Request Commercial BPO",
  quickAnswer:
    "Strong business deals start with how a building works day to day. Check car traffic, customer parking, inside room flow, lease bumps, and operating costs up front before making any offer.",
  howWeHandleIt:
    "Mark Davis (FL Lic #3209459) and Rachael Garnett (FL Lic #3378601) work straight with local firms, plaza owners, and land families. Whether you need a quiet sale value, a home for your staff, or I-4 land, you get clear facts fast.",
  tags: {
    propertyType: ["commercial", "retail-office", "industrial-flex", "land-acreage"],
    audience: ["commercial-owners", "investors", "land-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk", "marion"],
    corridor: [
      "brandon-i75",
      "downtown-bayshore",
      "north-tampa-carrollwood",
      "central-florida-corridor",
    ],
  },
  serviceSectionEyebrow: "Commercial & Land Advisory",
  serviceSectionTitle: "Built Around Business Owners, Landlords & Land",
  serviceSectionIntro:
    "Hands-on commercial help covering site search, leasing, building pricing, quiet sales, and land across Tampa Bay.",
  serviceLanes: [
    {
      id: "business-sites",
      tag: "Owner-Occupied",
      title: "Buying a Home for Your Business",
      summary:
        "Stop paying endless landlord rent hikes. We help medical practices, trades, and offices buy standalone buildings built to grow into.",
      highlights: [
        "Compare owning math against five-year lease renewals",
        "Check parking spots, sign rights & city use rules",
      ],
      primaryCta: { label: "Start Your Project", href: "/commercial/get-started" },
      secondaryCta: { label: "Browse Commercial Hub", href: "/hub/commercial-tampa-bay" },
    },
    {
      id: "retail-medical-leasing",
      tag: "Tenant & Landlord Leasing",
      title: "Retail Plazas, Clinics & Office Suites",
      summary:
        "Review daytime car counts, nearby co-tenants, build-out cash credits, AC rules, and fair yearly rent bumps before signing.",
      highlights: [
        "Check grease traps, clinic sinks & ADA doors early",
        "Clean Letters of Intent guarding build-out timing",
      ],
      primaryCta: { label: "Compare Lease Costs", href: "/tools/commercial-rent-calculator" },
      secondaryCta: { label: "Drive Tampa CRE Corridors", href: "/tours/westshore-dale-mabry-retail-office-tour" },
    },
    {
      id: "industrial-flex",
      tag: "Warehouse & Flex",
      title: "Warehouses, Service Bays & Yards",
      summary:
        "Source tall ceilings for racks, truck dock or drive-in doors, heavy power, and fenced fleet yards right off I-4 or I-75.",
      highlights: [
        "Check truck turn room and highway ramp speed",
        "Compare small flex units vs. solo buildings",
      ],
      primaryCta: { label: "View Commercial Listings", href: "/properties#commercial-land" },
      secondaryCta: { label: "Start Your Project", href: "/commercial/get-started" },
    },
    {
      id: "exit-valuation",
      tag: "Selling & Pricing",
      title: "Fast Pricing Reports & Quiet Sales",
      summary:
        "Ready to retire, sell a plaza, or split a group asset? Get a grounded Broker Price Opinion and pick quiet calls or full marketing.",
      highlights: [
        "Built from real buyer yields & CoStar closed sales",
        "Option to vet buyers quietly without alerting staff",
      ],
      primaryCta: { label: "Request Commercial BPO", href: "/services/commercial-bpo" },
      secondaryCta: { label: "See Active Portfolio", href: "/properties#commercial-land" },
    },
    {
      id: "land-assemblage",
      tag: "Pads & Acreage",
      title: "Corner Pads, Lots & Country Land",
      summary:
        "From retail pads needing drainage room to 80-acre tracts, we check road access, sewer lines, and county growth maps upfront.",
      highlights: [
        "Verify road frontage, sewer taps & nearby parcels",
        "Patient outreach for longtime family land sales",
      ],
      primaryCta: { label: "Explore Land Hub", href: "/hub/land-acreage-central-florida" },
      secondaryCta: { label: "Drive US-27 / US-98 Land Route", href: "/tours/central-florida-us27-us98-land-corridor-tour" },
    },
    {
      id: "deal-coaching",
      tag: "First CRE Buy",
      title: "Deal-by-Deal Commercial Coaching",
      summary:
        "Buying your first business property? Walk through rent sheets, lease rules, and contract terms live with Mark and Rachael.",
      highlights: [
        "Plain-English review of rent rolls & yearly bills",
        "Steady help through surveys, loans & closing day",
      ],
      primaryCta: { label: "Explore CRE Mentoring", href: "/services/commercial-mentoring" },
      secondaryCta: { label: "Model Building Value", href: "/tools/cap-rate-calculator" },
    },
  ],
  corridorEyebrow: "Business Corridors & Growth Zones",
  corridorTitle: "Where Tampa Bay Commerce & Land Grow",
  corridorIntro:
    "Each commercial zone brings its own mix of daytime workers, traffic speed, and tenant demand.",
  corridors: [
    {
      region: "Airport & Corporate Core",
      title: "Westshore, Midtown & Dale Mabry",
      desc: "High daytime worker counts, medical hubs, office suites, and 10-minute drives to Tampa Airport.",
      href: "/tours/westshore-dale-mabry-retail-office-tour",
      actionLabel: "Drive Westshore Corridor",
    },
    {
      region: "East Hillsborough Spine",
      title: "Brandon, Hwy 60 & I-75",
      desc: "Dense nearby rooftops driving strong neighborhood shops, freestanding clinics, and service firms.",
      href: "/tours/brandon-sr60-mixed-use-commercial-tour",
      actionLabel: "Drive Brandon SR-60",
    },
    {
      region: "Urban Mixed-Use",
      title: "Downtown Tampa, Channelside & Ybor",
      desc: "Street-front food spots, boutique offices, and busy apartment blocks bringing daily foot traffic.",
      href: "/developments#downtown-towers",
      actionLabel: "See Downtown Districts",
    },
    {
      region: "North Tampa · Carrollwood HQ",
      title: "Carrollwood, Citrus Park & Lutz",
      desc: "Steady high-income neighborhoods backing dental clinics, wellness spaces, and local offices.",
      href: "/hub/carrollwood-northdale-homes",
      actionLabel: "See Carrollwood Market",
    },
    {
      region: "Pinellas Peninsula",
      title: "St. Petersburg, US-19 & Gateway",
      desc: "Tight land supply keeping flex bays, strip centers, and Central Ave shops in steady demand.",
      href: "/developments#st-pete-region",
      actionLabel: "Explore Pinellas Market",
    },
    {
      region: "I-4 Corridor & Heartland",
      title: "Plant City, Lakeland, Polk & Marion",
      desc: "Major trucking routes along I-4 alongside open commercial acreage and large country tracts.",
      href: "/hub/land-acreage-central-florida",
      actionLabel: "Explore Central FL Land",
    },
  ],
  processEyebrow: "Clear Deal Execution",
  processTitle: "Five Practical Steps From Plan to Closing",
  processIntro:
    "Run through seven short questions online to share your needs, or download the matching printable PDF.",
  steps: [
    {
      step: "01",
      title: "Outline Size, Timing & Budget Plan",
      body: "Take three minutes online so Mark and Rachael can screen listed and quiet deals matching your business.",
      href: "/commercial/get-started",
      linkLabel: "Start Your Project",
    },
    {
      step: "02",
      title: "Test Rent vs. Purchase & Value Math",
      body: "Check lease cost totals, target cash yields, or sale BPO numbers before walking buildings.",
      href: "/tools/cap-rate-calculator",
      linkLabel: "Open Cap Rate Tool",
    },
    {
      step: "03",
      title: "Walk Shortlisted Buildings or Land",
      body: "Test driveway turns, roof height, parking spaces, and county use codes together in person.",
      href: "/properties#commercial-land",
      linkLabel: "View Commercial Offerings",
    },
    {
      step: "04",
      title: "Lock Fair Study Days Inside Your LOI",
      body: "Guard inspection weeks early for land surveys, site tests, lease checks, and build quotes.",
      href: "/glossary/letter-of-intent",
      linkLabel: "Read LOI Essentials",
    },
    {
      step: "05",
      title: "Guide Closing, Permits & Tax Dates",
      body: "We keep surveys, local banks, lawyers, and closing dates moving cleanly on schedule.",
      href: "/tools/1031-deadline-calculator",
      linkLabel: "Check 1031 Clock",
    },
  ],
  checksEyebrow: "Commercial Site Reality Check",
  checksTitle: "5 Operational Questions Before Picking Any Site",
  checks: [
    {
      num: "01",
      title: "Can Cars & Trucks Turn In Both Ways?",
      body: "Tall street medians and tight driveway turns quietly cut customer visits at retail and clinic sites.",
      href: "/tours",
    },
    {
      num: "02",
      title: "Will the Space Fit Your Team in 3 Years?",
      body: "Adding two extra work rooms or bay space upfront beats paying to build out and move twice.",
      href: "/commercial/get-started",
    },
    {
      num: "03",
      title: "How Long Will City Permits Really Take?",
      body: "Grease traps, big power panels, fire sprinklers, and sign approvals add real months to move-in.",
      href: "/tools/commercial-rent-calculator",
    },
    {
      num: "04",
      title: "Does Your Sale Need Quiet Calls First?",
      body: "Some owners vet cash buyers privately to keep staff calm, while others thrive on public bids.",
      href: "/services/commercial-bpo",
    },
    {
      num: "05",
      title: "Does Buying Beat Five More Years of Rent?",
      body: "Stacking five years of rising rent checks against owning equity often makes buying an easy win.",
      href: "/tools/cap-rate-calculator",
    },
  ],
  tools: [
    {
      tag: "Value Model",
      title: "Commercial Cap Rate & Value Tool",
      desc: "Test rent income, vacancy, expenses, and implied asset price across clean yield targets.",
      href: "/tools/cap-rate-calculator",
      ctaLabel: "Open Cap Rate Tool",
    },
    {
      tag: "Lease Check",
      title: "Commercial Lease & CAM Tool",
      desc: "Add base rent beside property taxes, insurance, upkeep, and Florida commercial rent tax.",
      href: "/tools/commercial-rent-calculator",
      ctaLabel: "Compare Lease Totals",
    },
    {
      tag: "Start Your Search",
      title: "Commercial & Land Project Worksheet",
      desc: "Spend three minutes sharing space or land goals online, or print our blank copy.",
      href: "/commercial/get-started",
      ctaLabel: "Start Your Project",
    },
  ],
  glossaryChips: [
    { term: "NOI", plainNote: "Rent minus building expenses", href: "/glossary/noi" },
    { term: "Cap Rate", plainNote: "Annual cash return metric", href: "/glossary/cap-rate" },
    { term: "Triple Net (NNN)", plainNote: "Tenant-paid taxes, wind & CAM", href: "/glossary/nnn-lease" },
    { term: "BPO Valuation", plainNote: "Broker Price Opinion report", href: "/glossary/bpo" },
    { term: "Letter of Intent", plainNote: "Non-binding deal outline", href: "/glossary/letter-of-intent" },
  ],
  faqs: [
    {
      question: "How do you help a firm pick between renewing a lease or buying?",
      answer:
        "We stack your next five years of rent increases beside loan pay, taxes, and building upkeep. That makes the true math clear right away.",
    },
    {
      question: "Can you sell our property quietly without tipping off tenants or staff?",
      answer:
        "Yes. We reach out quietly to vetted Tampa Bay buyers and cash operators first under strict privacy before placing signs or web ads.",
    },
    {
      question: "How early should a business call before a current lease ends?",
      answer:
        "Calling 12 to 18 months early gives you real room at the table with your landlord and time to tour or buy your next spot.",
    },
    {
      question: "What clients do Mark and Rachael serve most often in commercial real estate?",
      answer:
        "We help doctors, dentists, contractors, warehouse operators, retail owners, small plaza landlords, and Central Florida landowners.",
    },
  ],
  preferredTourSlugs: [
    "westshore-dale-mabry-retail-office-tour",
    "brandon-sr60-mixed-use-commercial-tour",
    "central-florida-us27-us98-land-corridor-tour",
  ],
  preferredGuideSlugs: [
    "commercial-real-estate-investing-florida",
    "commercial-bpo-vs-appraisal-florida",
    "how-does-commercial-mixed-use-zoning-work-in-brandon-fl",
    "what-due-diligence-is-needed-when-buying-acreage-in-central-florida",
  ],
  publishedAt: "2026-11-17T18:45:00-05:00",
  updatedAt: "2026-11-17T18:45:00-05:00",
};

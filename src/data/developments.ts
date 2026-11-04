export type DevelopmentCorridor = "downtown-bayshore" | "north-tampa";

export interface HoaCddBreakdown {
  hoaEstimate: string;
  cddEstimate: string;
  estimatedTaxMillage: string;
  masterIncludes: string[];
  financialNote: string;
}

export interface FloorPlanTier {
  tierName: string;
  configuration: string;
  sqFtRange: string;
  startingPrice: string;
}

export interface Development {
  slug: string;
  name: string;
  subtitle: string;
  corridor: DevelopmentCorridor;
  corridorLabel: string;
  location: string;
  neighborhoodOrSubmarket: string;
  developer: string;
  architectOrPlanner?: string;
  builders: string[];
  priceRange: string;
  status: string;
  delivery: string;
  unitsOrAcreage: string;
  propertyTypes: string[];
  heroImage: string;
  gallery: string[];
  summary: string;
  description: string;
  highlights: string[];
  amenities: string[];
  specs: { label: string; value: string }[];
  floorPlanTiers: FloorPlanTier[];
  hoaCddInfo: HoaCddBreakdown;
  whyBuyWithDG: {
    title: string;
    detail: string;
  }[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const DEVELOPMENTS: Development[] = [
  // ============================================================================
  // CORRIDOR A: Downtown Tampa, Riverwalk, Water Street & Bayshore Luxury Towers
  // ============================================================================
  {
    slug: "pendry-residences-tampa",
    name: "Pendry Residences Tampa",
    subtitle: "Five-Star Riverwalk Tower & Private Sky Residences",
    corridor: "downtown-bayshore",
    corridorLabel: "Downtown & Bayshore Luxury Towers",
    location: "102 E Tyler St — Tampa Riverwalk / Downtown Tampa, FL 33602",
    neighborhoodOrSubmarket: "Tampa Riverwalk & Arts District",
    developer: "Two Roads Development & Montage International",
    architectOrPlanner: "Arquitectonica & Studio Munge Interiors",
    builders: ["Two Roads Development (Coastal Construction)"],
    priceRange: "$1.5M – $6.5M+",
    status: "Under Construction — Active Contracts",
    delivery: "2027",
    unitsOrAcreage: "38 Stories | 207 Private Residences above 5-Star Pendry Hotel",
    propertyTypes: ["Luxury Condominiums", "Sky Penthouses", "Branded Hotel Residences"],
    heroImage: "/res_luxury_condo_1787632822869.png",
    gallery: [
      "/res_luxury_condo_1787632822869.png",
      "/com_office_tower_1787632874122.png",
      "/res_waterfront_estate_1787632802890.png",
      "/davis-garnett-listings-3.jpg",
    ],
    summary:
      "Rising 38 stories directly along the Hillsborough River and the iconic Tampa Riverwalk, Pendry Residences Tampa fuses Montage International's five-star hospitality with 207 ultra-private sky residences featuring private elevators and expansive river-to-bay terraces.",
    description:
      "Pendry Residences Tampa sets an unprecedented benchmark for branded vertical living on Florida's Gulf Coast. Developed by Two Roads Development in partnership with Pendry Hotels & Resorts (Montage International), this 38-story architectural landmark crowns the Tampa Riverwalk right beside the Straz Center for the Performing Arts and Curtis Hixon Waterfront Park. Owners enjoy the rare duality of complete residential privacy—with dedicated residential lobby, private high-speed elevator foyers, and an exclusive 19th-floor resident-only resort deck—paired with effortless access to five-star hotel dining, Spa Pendry, and 24-hour white-glove concierge turn-key management.",
    highlights: [
      "Direct Hillsborough Riverfront & Tampa Riverwalk frontage with immediate walkability to Straz Center and Curtis Hixon Park",
      "207 fully finished residences spanning floors 19–38 with private elevator access and 10-to-12-foot floor-to-ceiling glass",
      "Private resident-only rooftop pool, sundeck, lounge, and private dining room separate from hotel guests",
      "24/7 Pendry white-glove concierge, valet, in-residence chef dining, housekeeping, and turnkey lock-and-leave stewardship",
      "Bespoke kitchens with Sub-Zero & Wolf appliance suites, custom Italian cabinetry, and natural stone waterfall islands",
      "Signature Sky Penthouses offering up to 10,000 SqFt of indoor-outdoor living with summer kitchens and plunge pools",
    ],
    amenities: [
      "Dedicated Residential Lobby & Private High-Speed Elevators",
      "Resident-Only Rooftop Resort Pool & Private Cabanas",
      "Full Access to Spa Pendry & State-of-the-Art Fitness Studio",
      "24-Hour In-Residence Dining & Private Sommelier Service",
      "Three Signature Restaurant & Rooftop Bar Concepts on Site",
      "Private Wine Lockers, Owners' Lounge & Executive Boardroom",
      "Pet Spa, Dog Run & Dedicated Valet/Concierge Staff",
      "Direct Pedestrian Access to the 2.6-Mile Tampa Riverwalk",
    ],
    specs: [
      { label: "Stories", value: "38 Stories" },
      { label: "Total Residences", value: "207 Private Units" },
      { label: "Hotel Component", value: "220 Five-Star Keys" },
      { label: "Floor Plans", value: "1 to 4 Bedrooms + Penthouses" },
      { label: "Square Footage", value: "1,300 – 10,000+ SqFt" },
      { label: "Target Delivery", value: "2027" },
    ],
    floorPlanTiers: [
      {
        tierName: "Riverwalk One-Bedroom + Den",
        configuration: "1 Bed + Den / 2 Bath",
        sqFtRange: "1,310 – 1,520 SqFt",
        startingPrice: "$1,500,000+",
      },
      {
        tierName: "Bay & River Two-Bedroom Residences",
        configuration: "2 Bed + Den / 2.5 Bath",
        sqFtRange: "1,950 – 2,480 SqFt",
        startingPrice: "$2,250,000+",
      },
      {
        tierName: "Corner Three-Bedroom Sky Estates",
        configuration: "3 Bed + Family Room / 3.5 Bath",
        sqFtRange: "2,900 – 3,450 SqFt",
        startingPrice: "$3,400,000+",
      },
      {
        tierName: "The Pendry Penthouse Collection",
        configuration: "4–5 Bed / Custom Terrace Suites",
        sqFtRange: "4,800 – 10,000+ SqFt",
        startingPrice: "$6,500,000+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $1.45 – $1.65 / SqFt per month",
      cddEstimate: "None (No CDD in Downtown Condominium Association)",
      estimatedTaxMillage: "~1.82% – 1.98% of Assessed Value (City of Tampa)",
      masterIncludes: [
        "24/7 Pendry Concierge, Doorman & Valet Services",
        "Master Building Structural Insurance & Reserve Funding",
        "High-Speed Fiber Internet, Water, Sewer & Trash",
        "Full Access to Resident Pool, Fitness Center & Spa Pendry Privileges",
      ],
      financialNote:
        "Staged construction deposit schedule (typically 20% at contract, 10% at mid-rise top-off, 10% at top-off, balance at closing). Davis & Garnett reviews all condo prospectus documents and reserve budgets prior to binding execution.",
    },
    whyBuyWithDG: [
      {
        title: "Pre-Public Price Sheet & Stack Selection Analysis",
        detail:
          "Developer pricing shifts by floor premium and view corridor. We analyze price-per-square-foot across every stack to protect your view corridor from future downtown vertical buildout.",
      },
      {
        title: "Deposit Structure & Finish Allowance Negotiation",
        detail:
          "We negotiate extended deposit milestones, developer closing cost credits, and custom Studio Munge finish upgrades that unrepresented buyers leave on the table.",
      },
      {
        title: "Florida Condo Prospectus & Reserve Audit",
        detail:
          "Our advisory team coordinates legal and financial review of the condominium declaration, hotel shared-cost allocations, and SIRS reserve compliance.",
      },
      {
        title: "Independent Pre-Delivery Punch-List Representation",
        detail:
          "Before closing wire transfer, we bring independent luxury building inspectors to audit stone book-matching, glazing seals, HVAC balancing, and smart-home commissioning.",
      },
    ],
    coordinates: { lat: 27.9502, lng: -82.4628 },
  },
  {
    slug: "the-ritz-carlton-residences-bayshore",
    name: "The Ritz-Carlton Residences, Tampa",
    subtitle: "Twin 27-Story Waterfront Towers on Historic Bayshore Boulevard",
    corridor: "downtown-bayshore",
    corridorLabel: "Downtown & Bayshore Luxury Towers",
    location: "3104 S Bayshore Blvd — South Tampa / Bayshore Corridor, FL 33629",
    neighborhoodOrSubmarket: "Historic Bayshore Boulevard / South Tampa",
    developer: "The Related Group",
    architectOrPlanner: "Arquitectonica & Meyer Davis Studio",
    builders: ["Suffolk Construction / The Related Group"],
    priceRange: "$2.3M – $7.8M+",
    status: "Tower I Delivered / Tower II Pre-Construction & Final Releases",
    delivery: "Tower I Immediate | Tower II 2026–2027",
    unitsOrAcreage: "Twin 27-Story Towers | 183 Total Residences + 12 Bayshore Villas",
    propertyTypes: ["Bayfront Luxury Condominiums", "Townhome Villas", "Penthouses"],
    heroImage: "/res_waterfront_estate_1787632802890.png",
    gallery: [
      "/res_waterfront_estate_1787632802890.png",
      "/res_luxury_condo_1787632822869.png",
      "/davis-garnett-listings-4.jpg",
      "/davis-garnett-listings-6.jpg",
    ],
    summary:
      "Commanding five lush acres along South Tampa's iconic Bayshore Boulevard, The Ritz-Carlton Residences by Related Group deliver unobstructed panoramic views of Hillsborough Bay, Meyer Davis interiors, and legendary Ritz-Carlton residential management.",
    description:
      "Positioned along the world's longest continuous waterfront sidewalk in prestigious South Tampa, The Ritz-Carlton Residences, Tampa represents pure residential exclusivity—with zero hotel transient traffic on site. Designed by Arquitectonica with warm, coastal-modern interiors by Meyer Davis Studio and landscape architecture by Enzo Enea, these twin 27-story towers feature flow-through floor plans with expansive east-facing Hillsborough Bay sunrise terraces and west-facing sunset verandas. Residents enjoy private tennis and pickleball courts, a resort-style infinity edge pool overlooking the bay, on-demand wellness treatment rooms, and dedicated Ritz-Carlton staff.",
    highlights: [
      "Unobstructed, permanent sunrise views over Hillsborough Bay along historic Bayshore Boulevard",
      "100% pure residential sanctuary—no transient hotel rooms or short-term rentals permitted",
      "Private elevator foyers opening directly into flow-through residences with 10-to-12-foot ceilings",
      "Private tennis & pickleball club, resort-style infinity bayfront pool, and Enea-designed botanical gardens",
      "Full-service spa & wellness treatment suites, steam & sauna rooms, and bay-view fitness center",
      "Private dining room with demonstration chef's kitchen, temperature-controlled wine vault, and golf simulator lounge",
    ],
    amenities: [
      "Legendary 24/7 Ritz-Carlton Dedicated Residential Management",
      "Bayfront Infinity Pool with Heated Spa & Food/Beverage Service",
      "Private Tennis & Pickleball Courts with Viewing Pavilion",
      "Meyer Davis Curated Owners' Club Lounge, Media Room & Bar",
      "On-Demand Spa Treatment Suites, His/Her Steam & Dry Saunas",
      "Golf Simulator, Billiards Parlor & Children's Discovery Room",
      "Four Furnished Guest Suites Reserved Exclusively for Residents' Visitors",
      "24-Hour Valet, Chauffeur House Car & Climate-Controlled Garages",
    ],
    specs: [
      { label: "Architecture", value: "Twin 27-Story Towers" },
      { label: "Total Offering", value: "183 Tower Units + 12 Villas" },
      { label: "Interiors", value: "Meyer Davis Studio" },
      { label: "Residences", value: "2 to 4 Bedrooms + Den" },
      { label: "Square Footage", value: "2,380 – 5,900+ SqFt" },
      { label: "Status", value: "Tower I Delivered / Tower II Final Phase" },
    ],
    floorPlanTiers: [
      {
        tierName: "Bayview Two-Bedroom + Den",
        configuration: "2 Bed + Den / 2.5 Bath",
        sqFtRange: "2,380 – 2,615 SqFt",
        startingPrice: "$2,300,000+",
      },
      {
        tierName: "Flow-Through Three-Bedroom + Den",
        configuration: "3 Bed + Den / 3.5 Bath",
        sqFtRange: "2,890 – 3,570 SqFt",
        startingPrice: "$3,250,000+",
      },
      {
        tierName: "Corner Four-Bedroom Bay Estates",
        configuration: "4 Bed + Den / 4.5 Bath",
        sqFtRange: "3,920 – 4,650 SqFt",
        startingPrice: "$4,800,000+",
      },
      {
        tierName: "Bayshore Villas & Sky Penthouses",
        configuration: "4–5 Bed / Private Plunge Pool Options",
        sqFtRange: "5,100 – 5,900+ SqFt",
        startingPrice: "$7,800,000+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $1.40 – $1.60 / SqFt per month",
      cddEstimate: "None (Private South Tampa Condominium Association)",
      estimatedTaxMillage: "~1.82% – 1.95% of Assessed Value (Homestead Eligible)",
      masterIncludes: [
        "Ritz-Carlton Branded Staffing, Concierge, Valet & Security",
        "Master Wind/Flood/Structural Insurance & Fully Funded Reserves",
        "Private Tennis/Pickleball Club, Pool & Wellness Center Maintenance",
        "Water, Sewer, Trash, High-Speed Fiber & Common Grounds by Enzo Enea",
      ],
      financialNote:
        "Both immediate-occupancy Tower I resales and developer-direct Tower II contracts are available. Davis & Garnett provides side-by-side comps between developer inventory and private off-market Tower I assignments.",
    },
    whyBuyWithDG: [
      {
        title: "Tower I Resale vs. Tower II Developer Direct Comparison",
        detail:
          "Unlike on-site sales reps who only sell remaining developer inventory, we show you both developer releases and private Tower I resale opportunities so you secure the best basis.",
      },
      {
        title: "Bayshore View-Line & Flood Elevation Due Diligence",
        detail:
          "We verify elevated mechanical podium specs, hurricane impact glazing ratings, and exact view angles over the Palma Ceia / Bayshore canopy.",
      },
      {
        title: "Private Off-Market Assignment Access",
        detail:
          "Through our South Tampa luxury network, we connect buyers with early contract holders looking to assign prime mid-to-high floor stacks.",
      },
      {
        title: "Turnkey Interior Design & Custom Millwork Coordination",
        detail:
          "Since high-end Bayshore residences often require custom closet buildouts, lighting automation, and window treatments, we connect you with vetted luxury contractors prior to closing.",
      },
    ],
    coordinates: { lat: 27.9168, lng: -82.4879 },
  },
  {
    slug: "water-street-tampa-phase-2",
    name: "Water Street Tampa — Phase 2 Luxury Condominiums",
    subtitle: "33-Story Architectural Tower in North America's First WELL-Certified District",
    corridor: "downtown-bayshore",
    corridorLabel: "Downtown & Bayshore Luxury Towers",
    location: "Water St & E Cumberland Ave — Water Street District, Tampa, FL 33602",
    neighborhoodOrSubmarket: "Water Street Tampa / Channelside",
    developer: "Strategic Property Partners (SPP — Cascade Investment & Jeff Vinik)",
    architectOrPlanner: "Nichols Architects & MAWD Interior Design",
    builders: ["Strategic Property Partners (SPP)"],
    priceRange: "$1.2M – $5.0M+",
    status: "Pre-Construction Reservation Phase",
    delivery: "2027–2028",
    unitsOrAcreage: "33 Stories | 400-Ft Tower | Curated Luxury Condominium Collection",
    propertyTypes: ["Urban Luxury Condominiums", "Sky Penthouses", "Mixed-Use Retail Podium"],
    heroImage: "/com_office_tower_1787632874122.png",
    gallery: [
      "/com_office_tower_1787632874122.png",
      "/res_luxury_condo_1787632822869.png",
      "/com_luxury_retail_1787632885082.png",
      "/davis-garnett-listings-2.jpg",
    ],
    summary:
      "Following the rapid sell-out of The Tampa EDITION Residences and Cora/Heron towers, Strategic Property Partners launches Water Street Tampa Phase 2—a 33-story, 400-foot luxury residential tower designed by Nichols Architects and MAWD.",
    description:
      "Water Street Tampa has transformed Downtown Tampa's waterfront into a $4+ billion, 56-acre walkable urban neighborhood backed by Bill Gates' Cascade Investment and Lightning owner Jeff Vinik. Phase 2 introduces a striking 33-story, 400-foot architectural condominium tower at the nexus of Water Street and Cumberland Avenue. Designed by Nichols Architects with interiors by London/New York design studio MAWD, the tower integrates ground-floor flagship culinary retail, elevated sky-park gardens, and expansive residences engineered to WELL Building Standards—Directly across from Benchmark International / Amalie Arena, The Tampa EDITION, and the Garrison Channel marina.",
    highlights: [
      "Located in the heart of the $4B+ WELL-Certified Water Street Tampa master district",
      "33-story, 400-foot sculptural glass tower by Nichols Architects & MAWD interior design",
      "Steps to The Tampa EDITION (Michelin-starred Lilac), Boulon Brasserie, Predalina, GreenWise Market, and Amalie Arena",
      "Elevated sky-garden amenity deck with resort lap pool, cold plunges, wellness pavilion, and co-working executive suites",
      "Chilled-water district cooling system, circadian lighting readiness, and hospital-grade air filtration",
      "First-mover Phase 2 pre-construction pricing following the record $2,000+/SqFt resales at The Tampa EDITION",
    ],
    amenities: [
      "Elevated Sky-Park Resort Pool, Sundeck & Outdoor Dining Pavilions",
      "WELL-Certified Holistic Fitness, Infrared Sauna & Cold Plunge Suite",
      "MAWD-Designed Residents' Private Club, Library & Tasting Room",
      "Dedicated Executive Co-Working Lounges & Private Zoom Suites",
      "24/7 Attended Lobby, Concierge, Cold-Storage Delivery & Valet",
      "Ground-Floor Curated Fine Dining & Luxury Boutique Retail Promenade",
      "EV Supercharging Garage Spaces & Climate-Controlled Bike Storage",
      "Immediate Walkability to Yacht Slips & Water Taxi Stops",
    ],
    specs: [
      { label: "Tower Height", value: "33 Stories / 400 Feet" },
      { label: "Master Developer", value: "Strategic Property Partners" },
      { label: "Architect", value: "Nichols Architects & MAWD" },
      { label: "Certification", value: "WELL Community Gold + LEED" },
      { label: "Price Range", value: "$1.2M – $5.0M+" },
      { label: "Phase Status", value: "Early VIP Reservations" },
    ],
    floorPlanTiers: [
      {
        tierName: "Water Street Executive One-Bedroom + Study",
        configuration: "1 Bed + Study / 1.5 Bath",
        sqFtRange: "1,150 – 1,380 SqFt",
        startingPrice: "$1,200,000+",
      },
      {
        tierName: "Channel & City Two-Bedroom Residences",
        configuration: "2 Bed + Den / 2.5 Bath",
        sqFtRange: "1,720 – 2,250 SqFt",
        startingPrice: "$1,850,000+",
      },
      {
        tierName: "Panoramic Three-Bedroom Corner Suites",
        configuration: "3 Bed + Den / 3.5 Bath",
        sqFtRange: "2,650 – 3,300 SqFt",
        startingPrice: "$2,950,000+",
      },
      {
        tierName: "Cumberland Sky Penthouses",
        configuration: "4 Bed / Private Rooftop Terraces",
        sqFtRange: "3,900 – 5,800+ SqFt",
        startingPrice: "$5,000,000+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $1.25 – $1.45 / SqFt per month",
      cddEstimate: "Water Street District Improvement Assessment included in tax roll",
      estimatedTaxMillage: "~1.88% – 2.02% of Assessed Value",
      masterIncludes: [
        "District Chilled-Water HVAC Efficiency & High-Speed Fiber",
        "24/7 Concierge, Security, Valet & Package Cold Storage",
        "Master Building Insurance, Exterior Window Washing & Reserves",
        "Full Access to Sky-Park Pool, Wellness Spa & Co-Working Club",
      ],
      financialNote:
        "Phase 2 VIP reservations allow buyers to lock in Friends & Family Tier-1 pricing before public sales gallery launch. Contact Davis & Garnett to register on the priority allocation roster.",
    },
    whyBuyWithDG: [
      {
        title: "Tier-1 Priority Reservation Registration",
        detail:
          "In Water Street Phase 1, earliest reservation holders captured 30%+ equity appreciation before certificate of occupancy. We position our clients at the front of the Phase 2 allocation queue.",
      },
      {
        title: "Commercial & Retail Surrounding Parcel Intelligence",
        detail:
          "Mark Davis tracks every adjacent commercial parcel in SPP's Phase 2 master plan—ensuring you know exactly which neighboring lots will become parks, offices, or towers.",
      },
      {
        title: "Cap Rate & Executive Leasing Advisory",
        detail:
          "For corporate and family-office buyers, we model executive long-term lease yields and tax depreciation strategies across Water Street assets.",
      },
      {
        title: "Zero-Cost Buyer Representation",
        detail:
          "Developer pays our advisory fee out of their marketing budget; you pay $0 while gaining seasoned dual commercial/residential contract representation.",
      },
    ],
    coordinates: { lat: 27.9435, lng: -82.4505 },
  },
  {
    slug: "hotel-ora-private-residences",
    name: "Hotel ORA + Private Residences",
    subtitle: "39-Story, $675M Luxury Condo-Hotel & Sky Penthouse Tower",
    corridor: "downtown-bayshore",
    corridorLabel: "Downtown & Bayshore Luxury Towers",
    location: "1101 E Jackson St — Channel District / Downtown Core, Tampa, FL 33602",
    neighborhoodOrSubmarket: "Downtown Tampa / Channel District Gateway",
    developer: "ARC Realty Group & Sunwest Construction",
    architectOrPlanner: "Adache Group Architects",
    builders: ["Sunwest Construction"],
    priceRange: "$850K – $4.5M+",
    status: "Active Reservations & Contract Execution",
    delivery: "2027",
    unitsOrAcreage: "39 Stories | 31 Private Penthouses + 627 Luxury Condo-Hotel Suites",
    propertyTypes: ["Luxury Condo-Hotel Suites", "Private Sky Penthouses", "Short-Term Rental Approved"],
    heroImage: "/res_modern_mansion_1787632812473.png",
    gallery: [
      "/res_modern_mansion_1787632812473.png",
      "/com_office_tower_1787632874122.png",
      "/com_luxury_retail_1787632885082.png",
      "/davis-garnett-listings-5.jpg",
    ],
    summary:
      "A $675 million, 39-story hospitality and residential powerhouse featuring a rooftop infinity pool overlooking Downtown Tampa, a flagship celebrity steakhouse, convention facility, and flexible short-term rental management for investors.",
    description:
      "Hotel ORA + Private Residences bridges a critical gap in the Tampa Bay luxury market: a true five-star high-rise engineered from the ground up for both lifestyle enjoyment and turnkey hospitality cash flow. Rising 39 stories at the gateway between Downtown Tampa, the Channel District, and Meridian Avenue, this $675M development features 627 fully furnished luxury condo-hotel suites alongside 31 ultra-exclusive Private Residences on the upper floors. Owners can place their residence into the professional Hotel ORA rental program when traveling—capturing lucrative demand from the Tampa Convention Center, Amalie Arena, and cruise port—or enjoy private skyline living year-round.",
    highlights: [
      "Rare Downtown Tampa luxury tower explicitly zoned and managed for flexible short-term hotel rental income",
      "Dramatic cantilevered rooftop infinity-edge pool & sky lounge with panoramic views of the Downtown skyline",
      "10,000+ SqFt flagship signature steakhouse, lobby patisserie, and 45,000 SqFt of private conference/ballroom space",
      "31 upper-floor Private Residences & Penthouses with private elevator access and expansive wrap-around terraces",
      "Delivered 100% turnkey furnished with designer hospitality packages for condo-hotel suites",
      "Immediate proximity to Water Street, Tampa Convention Center, Amalie Arena, and the Ybor/Gasworx corridor",
    ],
    amenities: [
      "Cantilevered Rooftop Infinity Pool, Jacuzzi & VIP Cabana Club",
      "Full-Service Luxury Spa, Cryotherapy, Steam & Wellness Center",
      "10,000 SqFt Signature Fine-Dining Steakhouse & Rooftop Cocktail Bar",
      "Turnkey Five-Star Hotel Rental Management Program for Investors",
      "45,000 SqFt Executive Conference Center & Grand Ballroom",
      "Private Helicopter Pad Access & Chauffeur Limousine Fleet",
      "24/7 White-Glove Concierge, Bellhop, Housekeeping & Valet",
      "Delivered Designer-Furnished with Smart Hospitality Lock Systems",
    ],
    specs: [
      { label: "Development Scale", value: "39 Stories / $675M Project" },
      { label: "Condo-Hotel Suites", value: "627 Turnkey Furnished Units" },
      { label: "Private Residences", value: "31 Upper-Level Sky Estates" },
      { label: "Rental Policy", value: "Daily / Short-Term Allowed" },
      { label: "Price Range", value: "$850K – $4.5M+" },
      { label: "Target Delivery", value: "2027" },
    ],
    floorPlanTiers: [
      {
        tierName: "ORA Luxury Studio & Junior Suites",
        configuration: "1 Bed / 1 Bath (Turnkey Furnished)",
        sqFtRange: "620 – 840 SqFt",
        startingPrice: "$850,000+",
      },
      {
        tierName: "ORA Executive One- & Two-Bedroom Suites",
        configuration: "1–2 Bed / 2 Bath (Turnkey Furnished)",
        sqFtRange: "980 – 1,550 SqFt",
        startingPrice: "$1,350,000+",
      },
      {
        tierName: "Upper-Tower Private Residences",
        configuration: "2–3 Bed / 2.5–3.5 Bath",
        sqFtRange: "1,850 – 2,900 SqFt",
        startingPrice: "$2,400,000+",
      },
      {
        tierName: "The ORA Sky Penthouse Collection",
        configuration: "4 Bed / Private Sky Terrace",
        sqFtRange: "3,400 – 5,200+ SqFt",
        startingPrice: "$4,500,000+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Bundled into Hotel Shared-Service Fee + Revenue Split Structure",
      cddEstimate: "None (Private Commercial/Residential Condominium Structure)",
      estimatedTaxMillage: "~1.85% – 2.00% of Assessed Value",
      masterIncludes: [
        "All Utilities (Electric, Water, High-Speed Wi-Fi, Cable)",
        "Master Building Insurance, FF&E Reserve & Common Area Maintenance",
        "24/7 Front Desk, Concierge, Security & Valet Operations",
        "Access to Rooftop Infinity Pool, Spa, Fitness & Owners' Privileges",
      ],
      financialNote:
        "Because Hotel ORA offers both revenue-generating condo-hotel units and private residences, Davis & Garnett's commercial division runs full ADR (Average Daily Rate), occupancy, and net-operating-income (NOI) sensitivity models for our buyers.",
    },
    whyBuyWithDG: [
      {
        title: "Hospitality Revenue Split & ADR Underwriting",
        detail:
          "Mark Davis and Rachael Garnett audit the developer's pro-forma occupancy, Tampa downtown hotel RevPAR benchmarks, and management fee splits so you buy with clear financial eyes.",
      },
      {
        title: "1031 Exchange & Bonus Depreciation Strategy",
        detail:
          "Condo-hotel units placed in active transient rental programs may qualify for 1031 exchange treatment and cost-segregation depreciation; we coordinate with your CPA.",
      },
      {
        title: "Prime View & Floor Premium Selection",
        detail:
          "We help you select stacks facing west toward the Downtown Tampa skyline and Water Street lights, which command superior resale and nightly rental premiums.",
      },
      {
        title: "Contract Contingency & Deposit Protection",
        detail:
          "We review escrow holding terms and construction milestone protections on your behalf at zero cost to you.",
      },
    ],
    coordinates: { lat: 27.9498, lng: -82.4481 },
  },
  {
    slug: "gasworx-ybor-channel-district",
    name: "Gasworx District",
    subtitle: "50-Acre, 5-Million-SqFt Walkable Urban Master Plan Connecting Ybor & Water Street",
    corridor: "downtown-bayshore",
    corridorLabel: "Downtown & Bayshore Luxury Towers",
    location: "N 15th St & E 4th Ave — Ybor City / Channel District Link, Tampa, FL 33605",
    neighborhoodOrSubmarket: "Historic Ybor City & Channel District",
    developer: "KETTLER & Darryl Shaw",
    architectOrPlanner: "DPZ CoDesign (Duany Plater-Zyberk) & Torti Gallas",
    builders: ["KETTLER", "Darryl Shaw Development Partners"],
    priceRange: "$600K – $2.2M+",
    status: "Phase 1 Delivering / Phase 2 Active Development",
    delivery: "2025–2028 Multi-Phase",
    unitsOrAcreage: "50 Acres | 5,000+ Residences | 500,000 SqFt Office & 150,000 SqFt Retail",
    propertyTypes: ["Boutique Urban Condos", "Live-Work Townhomes", "Retail & Mixed-Use Commercial"],
    heroImage: "/com_luxury_retail_1787632885082.png",
    gallery: [
      "/com_luxury_retail_1787632885082.png",
      "/com_multi_family_1787632895059.png",
      "/land_commercial_development_1787632926636.png",
      "/davis-garnett-listing-1.jpg",
    ],
    summary:
      "Master-planned by Darryl Shaw and KETTLER across 50 contiguous acres, Gasworx seamlessly stitches Historic Ybor City to the Channel District and Water Street with brick-paved promenades, a central marketplace food hall, TECO Streetcar stops, and boutique residences.",
    description:
      "Gasworx is the most transformative urban infill project in Tampa's history alongside Water Street. Spanning 50 acres and nearly 5 million square feet of mixed-use density between Historic Ybor City and the Channel District, visionary landowner Darryl Shaw and national developer KETTLER (with urban planners DPZ CoDesign) are creating a deeply authentic, pedestrian-first neighborhood. Anchored by a lush central park, a restored historic glass warehouse marketplace, a new TECO Streetcar station, and continuous tree-lined bike/pedestrian trails, Gasworx offers both residential ownership opportunities and high-yield commercial retail/office acquisitions.",
    highlights: [
      "50-acre, $1.5B+ master plan bridging the 0.7-mile gap between Ybor City, Encore, Channel District, and Water Street",
      "5 million total square feet including 5,000+ residential units, 500,000 SqFt of Class-A creative office, and 150,000 SqFt of retail",
      "Central Marketplace food hall & culinary hub housed within an adaptively reused historic industrial structure",
      "Dedicated new TECO Streetcar stop providing free rail connectivity directly to Water Street and Downtown Tampa",
      "18 acres of open green space, pocket parks, dog parks, and multi-modal trails linking to the Tampa Riverwalk Green Spine",
      "Dual Residential & Commercial Investment plays: acquire boutique urban residences or ground-floor retail/commercial pads",
    ],
    amenities: [
      "The Gasworx Marketplace Food Hall, Brewery & Chef-Driven Restaurants",
      "Dedicated TECO Streetcar Transit Station On-Site",
      "Central Community Lawn, Amphitheater & Curated Art Installations",
      "Resort-Style Rooftop & Courtyard Pools with Co-Working Studios",
      "18 Acres of Pedestrian Paseo Streetscapes & Protected Bike Lanes",
      "Boutique Fitness Clubs, Pet Parks & Ground-Floor Artisan Cafes",
      "Direct Connection to Casa Santo Stefano, Hotel Haya & 7th Avenue",
      "Opportunity Zone & Historic Tax Credit Commercial Synergies",
    ],
    specs: [
      { label: "Master Plan Footprint", value: "50 Contiguous Acres" },
      { label: "Total Buildout", value: "5 Million+ SqFt" },
      { label: "Residential Scope", value: "5,000+ Urban Residences" },
      { label: "Commercial Scope", value: "650,000+ SqFt Office & Retail" },
      { label: "Price / Investment Range", value: "$600K – $2.2M+" },
      { label: "Master Developers", value: "Darryl Shaw & KETTLER" },
    ],
    floorPlanTiers: [
      {
        tierName: "Boutique Urban Lofts & One-Bedrooms",
        configuration: "1 Bed + Study / Brick & Timber Aesthetic",
        sqFtRange: "820 – 1,150 SqFt",
        startingPrice: "$600,000+",
      },
      {
        tierName: "Paseo Two-Bedroom Residences",
        configuration: "2 Bed / 2–2.5 Bath with Park Balcony",
        sqFtRange: "1,280 – 1,750 SqFt",
        startingPrice: "$890,000+",
      },
      {
        tierName: "Live-Work Streetfront Townhomes",
        configuration: "3 Bed + Ground Studio / 3.5 Bath",
        sqFtRange: "2,100 – 2,650 SqFt",
        startingPrice: "$1,450,000+",
      },
      {
        tierName: "Commercial Retail Condo / Pad Opportunities",
        configuration: "Retail / Restaurant / Creative Office",
        sqFtRange: "1,500 – 8,500+ SqFt",
        startingPrice: "$2,200,000+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $0.75 – $1.05 / SqFt per month (Building Specific)",
      cddEstimate: "Ybor CRA / Special Assessment District (Varies by Parcel)",
      estimatedTaxMillage: "~1.85% – 1.98% of Assessed Value",
      masterIncludes: [
        "District Security, Streetscape Landscaping & Paseo Maintenance",
        "Building Amenity Decks, Rooftop Pools, Fitness & Co-Working Spaces",
        "Master Structural Insurance, Exterior Maintenance & Trash/Water",
        "Access to District Events, Streetcar Plaza & Bike Share Hubs",
      ],
      financialNote:
        "Select surrounding Ybor/Gasworx parcels sit within Qualified Opportunity Zones (QOZ). Davis & Garnett's commercial division advises investors on both residential for-sale releases and adjacent commercial land/retail acquisitions.",
    },
    whyBuyWithDG: [
      {
        title: "Dual Commercial + Residential Corridor Mastery",
        detail:
          "Gasworx is where residential lifestyle meets commercial appreciation. Mark Davis and Rachael Garnett evaluate both for-sale residences and perimeter investment parcels before values re-rate.",
      },
      {
        title: "Opportunity Zone & Adaptive Reuse Insight",
        detail:
          "We identify perimeter holdings around the 50-acre Gasworx footprint that benefit directly from KETTLER and Darryl Shaw's $1.5B infrastructure spend.",
      },
      {
        title: "First-Alert Release Notifications",
        detail:
          "As for-sale residential and live-work phases release across the multi-year master plan, our registered VIP clients receive immediate floor plans and pricing.",
      },
      {
        title: "Retail Lease & Mixed-Use Advisory",
        detail:
          "For business owners looking to secure restaurant, medical, or boutique space inside or adjacent to Gasworx, Mark Davis leads LOI and NNN lease negotiations.",
      },
    ],
    coordinates: { lat: 27.9562, lng: -82.4426 },
  },

  // ============================================================================
  // CORRIDOR B: North Tampa — Wesley Chapel & Land O' Lakes Master-Planned Communities
  // ============================================================================
  {
    slug: "two-rivers-wesley-chapel",
    name: "Two Rivers",
    subtitle: "3,400-Acre Top-15 Nationally Ranked Master-Planned Community",
    corridor: "north-tampa",
    corridorLabel: "North Tampa Master-Planned Communities",
    location: "SR-56 & Morris Bridge Rd Corridor — Wesley Chapel / Zephyrhills, FL 33541",
    neighborhoodOrSubmarket: "Wesley Chapel / SR-56 Growth Corridor",
    developer: "Eisenhower Property Group",
    architectOrPlanner: "Eisenhower Master Planning Group",
    builders: [
      "Homes by WestBay",
      "Casa Fresca Homes",
      "Pulte Homes",
      "Lennar",
      "M/I Homes",
      "Park Square Homes",
      "William Ryan Homes",
    ],
    priceRange: "$425K – $1.6M+",
    status: "Actively Selling — Multiple Villages & Custom Estate Lots",
    delivery: "Quick Move-In (30–90 Days) & To-Be-Built (6–10 Months)",
    unitsOrAcreage: "3,400+ Acres | ~6,400 Planned Homes | Surrounded by Hillsborough River Parklands",
    propertyTypes: ["Luxury Single-Family Estates", "Executive Pool Homes", "Villas & Townhomes"],
    heroImage: "/res_golf_course_home_1787632854609.png",
    gallery: [
      "/res_golf_course_home_1787632854609.png",
      "/res_modern_mansion_1787632812473.png",
      "/land_waterfront_plot_1787632916432.png",
      "/davis-garnett-listings-7.jpg",
    ],
    summary:
      "Spanning 3,400+ pristine acres bordered by Hillsborough River state parklands off the booming SR-56 extension in Wesley Chapel, Two Rivers is ranked among the Top 15 Master-Planned Communities in the United States—featuring seven premier builders, *The Nest* & *The Landing* social clubs, and the upcoming *Peak Surf Park*.",
    description:
      "Two Rivers represents the crown jewel of Wesley Chapel's eastward luxury expansion along State Road 56. Developed by Eisenhower Property Group on historic ranchland framed by ancient grand oaks and the Hillsborough River wilderness preserve, this 3,400-acre master plan combines authentic Old Florida conservation with resort-caliber modern amenities. Buyers can choose from seven of Tampa Bay's most respected builders—ranging from attainable $425K family residences by Casa Fresca and Lennar up to $1.6M+ semi-custom waterfront and conservation estates on 70-to-80-foot homesites by Homes by WestBay and Park Square Homes.",
    highlights: [
      "Ranked a Top-15 Best-Selling Master-Planned Community in the Nation by RCLCO & John Burns Research",
      "3,400+ acres of ancient oak hammocks, spring-fed lakes, and miles of trails bordering Hillsborough River State Park",
      "*The Nest* & *The Landing* resort social clubs featuring zero-entry pools, lap lanes, cabanas, and lakeside dining",
      "Anchored by the upcoming *Peak Surf Park*—a premier $50M+ surf lagoon, entertainment, and retail village destination",
      "Seven distinct builders across 12+ neighborhood villages from 40-ft villa lots to 80-ft conservation estate homesites",
      "Direct SR-56 corridor access to Tampa Premium Outlets, The Shops at Wiregrass, AdventHealth Wesley Chapel, and I-75",
    ],
    amenities: [
      "The Landing & The Nest Multi-Million-Dollar Resort Amenity Campuses",
      "Upcoming Peak Surf Park Wave Lagoon & Lifestyle Retail Village",
      "Resort-Style Zero-Entry Pools, Waterslides & Shaded Cabana Decks",
      "Championship Pickleball, Tennis & Half-Court Basketball Complexes",
      "15+ Miles of Paved Multi-Use Trails, Boardwalks & Kayak Launches",
      "Planned On-Site K-8 Public Schools & Neighborhood Village Parks",
      "Full-Time Lifestyle Director, Farmers Markets & Resident Social Clubs",
      "ULTRAFi High-Speed Fiber Infrastructure Throughout the Community",
    ],
    specs: [
      { label: "Total Acreage", value: "3,400+ Master-Planned Acres" },
      { label: "Master Developer", value: "Eisenhower Property Group" },
      { label: "Active Builders", value: "7 Premier Homebuilders" },
      { label: "Lot Widths", value: "40', 50', 60', 70' & 80' Estates" },
      { label: "Price Range", value: "$425K – $1.6M+" },
      { label: "Move-In Options", value: "Spec Inventory & Dirt-Build" },
    ],
    floorPlanTiers: [
      {
        tierName: "Classic Collection (40' & 50' Homesites)",
        configuration: "3–4 Bed / 2–3 Bath / 2-Car Garage",
        sqFtRange: "1,850 – 2,750 SqFt",
        startingPrice: "$425,000+",
      },
      {
        tierName: "Executive Collection (60' Conservation Lots)",
        configuration: "4–5 Bed + Bonus / 3–4 Bath / 3-Car Garage",
        sqFtRange: "2,850 – 3,800 SqFt",
        startingPrice: "$675,000+",
      },
      {
        tierName: "WestBay & Park Square Estate Series (70' Lots)",
        configuration: "4–6 Bed + Office + Media / 4.5 Bath / 3-Car Garage",
        sqFtRange: "3,850 – 4,850 SqFt",
        startingPrice: "$950,000+",
      },
      {
        tierName: "Custom Preserve & Lakefront Estates (80' Lots)",
        configuration: "5–6 Bed / Outdoor Lanai + Pool Package",
        sqFtRange: "4,800 – 6,000+ SqFt",
        startingPrice: "$1,350,000 – $1.6M+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $115 – $185 / month (Varies by Village & Lot Width)",
      cddEstimate: "Approx. $2,200 – $3,900 / year (Included in Pasco/Hillsborough Tax Bill)",
      estimatedTaxMillage: "~1.65% – 1.85% + CDD Assessment",
      masterIncludes: [
        "Full Access to The Landing, The Nest, Pools, Trails & Fitness Centers",
        "Common Area Conservation Management, Lakes & Entry Monuments",
        "Community Lifestyle Programming & High-Speed Fiber Availability",
        "Gated Village Entry Maintenance (In Select 70' & 80' Enclaves)",
      ],
      financialNote:
        "Two Rivers spans the Pasco/Hillsborough county line! Depending on which village you select, your property tax millage, school zoning, and CDD bond payoff amount change significantly. Davis & Garnett breaks down the exact parcel-by-parcel tax difference before you choose a lot.",
    },
    whyBuyWithDG: [
      {
        title: "Cross-Comparison of All 7 Builders in One Tour",
        detail:
          "Each builder rep only pitches their own village. We compare Homes by WestBay, Pulte, M/I, Lennar, and Casa Fresca side-by-side on structural specs, base inclusions, and lot premiums.",
      },
      {
        title: "4.99%–5.50% Builder Rate Buydown & Closing Credit Negotiation",
        detail:
          "We know which builders are sitting on standing QMI (Quick Move-In) inventory at quarter-end and aggressively negotiate $25,000–$60,000+ in rate buydowns and design studio credits.",
      },
      {
        title: "Pasco vs. Hillsborough County Parcel Strategy",
        detail:
          "Because Two Rivers straddles two counties, we help you target the exact village that aligns with your tax sensitivity and school district goals.",
      },
      {
        title: "3-Phase Independent Construction Inspections",
        detail:
          "New construction is not flaw-free. We coordinate pre-drywall, pre-closing, and 11-month warranty inspections to ensure your home is built to code.",
      },
    ],
    coordinates: { lat: 28.1872, lng: -82.2615 },
  },
  {
    slug: "angeline-land-o-lakes",
    name: "Angeline",
    subtitle: "6,200-Acre City of the Future Anchored by Moffitt's 775-Acre Speros FL Campus",
    corridor: "north-tampa",
    corridorLabel: "North Tampa Master-Planned Communities",
    location: "SR-52 & Suncoast Parkway (SR-589) — Land O' Lakes, FL 34638",
    neighborhoodOrSubmarket: "Land O' Lakes / Suncoast Innovation Corridor",
    developer: "Metro Development Group",
    architectOrPlanner: "Metro Development Group & Moffitt Speros Master Planners",
    builders: [
      "Del Webb (55+ Active Adult)",
      "Lennar",
      "D.R. Horton",
      "Dream Finders Homes",
    ],
    priceRange: "$360K – $950K+",
    status: "Actively Selling — Family Villages & Del Webb 55+ Resort Enclave",
    delivery: "Immediate Move-In Inventory & New Dirt Builds",
    unitsOrAcreage: "6,200+ Acres | 3,600 Acres of Green Space | 100-Mile Trail Network",
    propertyTypes: ["Single-Family Homes", "55+ Active Adult Resort Homes", "Villas & Townhomes"],
    heroImage: "/land_commercial_development_1787632926636.png",
    gallery: [
      "/land_commercial_development_1787632926636.png",
      "/res_golf_course_home_1787632854609.png",
      "/res_modern_mansion_1787632812473.png",
      "/davis-garnett-listing-2.jpg",
    ],
    summary:
      "Spanning 6,200+ acres along the Suncoast Parkway in Land O' Lakes, Angeline is a next-generation health, wellness, and agri-hood city anchored by Moffitt Cancer Center's 775-acre Speros FL global biotech campus, HCA Florida Hospital, a professional community farm, and a future Crystal Lagoon.",
    description:
      "Angeline is one of the most ambitious mixed-use master-planned cities in the Southeast United States. Developed by Metro Development Group across 6,200 acres with direct Suncoast Parkway (SR-589) interchange access—putting Tampa International Airport and Westshore Business District just 28 minutes away—Angeline merges life-science job growth with conservation living. At its heart sits Speros FL, Moffitt Cancer Center's 775-acre, 140-building global biotech and research campus, alongside the new HCA Florida Angeline Hospital, the Tuition-Free Angeline Academy of Innovation (Grades 6–12 STEM magnet), a working community farm & café, and 3,600 acres of permanently preserved wetlands and 100 miles of trails.",
    highlights: [
      "Anchored by Moffitt Cancer Center's 775-acre, multi-billion-dollar *Speros FL* Global Life Sciences & Innovation Campus",
      "Direct Suncoast Parkway (SR-589) expressway access—25 to 30 minutes to Tampa International Airport (TPA)",
      "Home to the brand-new *Angeline Academy of Innovation* STEM Magnet School & working farm-to-table Agri-Hood",
      "Includes *Del Webb Bexley/Angeline*—a premier gated 55+ Active Adult resort village with private clubhouse & pickleball",
      "3,600 acres of dedicated conservation green space, 100-mile trail system, and planned future Metro Lagoon",
      "Strong long-term equity appreciation thesis driven by thousands of incoming biotech, medical, and executive professionals",
    ],
    amenities: [
      "775-Acre Moffitt Speros FL Life Sciences & Medical Employment Hub",
      "On-Site Working Community Farm, Farmers Market & Farm-to-Table Cafe",
      "Angeline Academy of Innovation (6–12 STEM Magnet School) On-Site",
      "Planned Multi-Acre Crystal Lagoon & Town Center Entertainment District",
      "Del Webb 55+ Private Resort Clubhouse, Pool & Pickleball Complex",
      "100 Miles of Paved Multi-Use Trails & 3,600 Acres of Nature Preserves",
      "Resident Resort Pool, Splash Pad, Dog Parks & Event Pavilions",
      "ULTRAFi High-Speed Gigabit Fiber Network Throughout",
    ],
    specs: [
      { label: "Total City Footprint", value: "6,200+ Acres" },
      { label: "Conservation Land", value: "3,600+ Preserved Acres" },
      { label: "Economic Anchor", value: "775-Acre Moffitt Speros FL" },
      { label: "Trail System", value: "100-Mile Master Network" },
      { label: "Price Range", value: "$360K – $950K+" },
      { label: "Builders", value: "Del Webb, Lennar, D.R. Horton, Dream Finders" },
    ],
    floorPlanTiers: [
      {
        tierName: "Townhomes & Paired Villas",
        configuration: "2–3 Bed / 2–2.5 Bath / Maintenance-Free",
        sqFtRange: "1,520 – 1,880 SqFt",
        startingPrice: "$360,000+",
      },
      {
        tierName: "Del Webb 55+ Active Adult Collection",
        configuration: "2–4 Bed + Study / Zero-Step Resort Living",
        sqFtRange: "1,650 – 3,100 SqFt",
        startingPrice: "$445,000+",
      },
      {
        tierName: "Angeline Family Single-Family Series",
        configuration: "4–5 Bed / 3–4 Bath / 2–3 Car Garage",
        sqFtRange: "2,250 – 3,450 SqFt",
        startingPrice: "$485,000+",
      },
      {
        tierName: "Preserve & Lakefront Executive Estates",
        configuration: "5 Bed + Bonus + Lanai / 3-Car Garage",
        sqFtRange: "3,500 – 4,400+ SqFt",
        startingPrice: "$725,000 – $950K+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $110 – $265 / month (Higher in Gated Del Webb 55+ with Lawn Care)",
      cddEstimate: "Approx. $2,100 – $3,400 / year",
      estimatedTaxMillage: "~1.62% – 1.78% (Pasco County)",
      masterIncludes: [
        "Access to Community Pools, Farm Pavilion, Parks & 100-Mile Trail System",
        "ULTRAFi High-Speed Internet & Cable Package (In Participating Villages)",
        "Full Lawn Maintenance & Gated Amenity Center (In Del Webb 55+ & Villa Villages)",
        "Common Area Conservation & Lake Management",
      ],
      financialNote:
        "Builders in Angeline frequently offer aggressive forward-commitment mortgage rates (as low as 4.75%–5.25% fixed) plus full closing costs paid when using preferred lenders. Davis & Garnett audits the lender worksheet to make sure the rate incentive isn't inflated in the base price.",
    },
    whyBuyWithDG: [
      {
        title: " Speros FL Biotech Corridor Appreciation Strategy",
        detail:
          "Because Mark Davis tracks the commercial buildout of Moffitt's Speros FL campus and HCA Florida's medical complex, we guide buyers and physicians to the phases positioned for maximum equity growth.",
      },
      {
        title: "Del Webb 55+ vs. All-Ages Village Advisory",
        detail:
          "We break down the exact HOA fee inclusions, lawn care packages, and amenity access rules between Del Webb's gated 55+ enclave and Angeline's all-ages single-family villages.",
      },
      {
        title: "Standing Spec Inventory Price Reductions",
        detail:
          "Public builders like Lennar and D.R. Horton adjust completed inventory pricing weekly. We obtain internal regional manager markdown sheets before they hit public portals.",
      },
      {
        title: "Full Pre-Drywall & Final Quality Control",
        detail:
          "High-volume production builders move fast. Our independent inspection protocol protects your framing, roof flashing, grading, and mechanical systems.",
      },
    ],
    coordinates: { lat: 28.2945, lng: -82.5182 },
  },
  {
    slug: "epperson-mirada-lagoon-wesley-chapel",
    name: "Epperson & Mirada Lagoon Communities",
    subtitle: "Home to North America's Largest 7.5-Acre & 15-Acre Caribbean-Blue Crystal Lagoons",
    corridor: "north-tampa",
    corridorLabel: "North Tampa Master-Planned Communities",
    location: "Overpass Rd & Curley Rd / SR-52 Corridor — Wesley Chapel & San Antonio, FL 33545",
    neighborhoodOrSubmarket: "Wesley Chapel / I-75 Overpass Interchange Corridor",
    developer: "MetroPlaces (Metro Development Group)",
    architectOrPlanner: "MetroPlaces & Crystal Lagoons® Engineering",
    builders: [
      "Biscayne Homes",
      "Lennar",
      "Casa Fresca Homes",
      "Maronda Homes",
      "D.R. Horton",
      "DRB Homes",
    ],
    priceRange: "$375K – $1.1M+",
    status: "Epperson Final Phases / Mirada Actively Selling + Active Adult",
    delivery: "Immediate Move-In & 4–8 Month Builds",
    unitsOrAcreage: "7.5-Acre Lagoon (Epperson) & 15-Acre Lagoon (Mirada) | 7,000+ Combined Homes",
    propertyTypes: ["Single-Family Pool Homes", "Semi-Custom Estates", "55+ Active Adult", "Townhomes"],
    heroImage: "/res_beachfront_villa_1787632843222.png",
    gallery: [
      "/res_beachfront_villa_1787632843222.png",
      "/res_waterfront_estate_1787632802890.png",
      "/res_golf_course_home_1787632854609.png",
      "/davis-garnett-listing-3.jpg",
    ],
    summary:
      "Developed by MetroPlaces in Wesley Chapel and adjacent San Antonio, Epperson (featuring America's first 7.5-acre Crystal Lagoon) and Mirada (featuring the nation's largest 15-acre Crystal Lagoon) deliver white-sand beach living, swim-up tiki bars, kayaking, and golf-cart paths minutes from I-75.",
    description:
      "Epperson and Mirada revolutionized Florida master-planned living by bringing crystalline, turquoise Caribbean waters inland to the high-and-dry rolling hills of Wesley Chapel and Pasco County. At Epperson (just off the brand-new Overpass Road I-75 interchange), residents enjoy a 7.5-acre Crystal Lagoon® with sandy beaches, a swim-up bar, water obstacle course, and family events. Just minutes north, Mirada doubles the scale with a breathtaking 15-acre Crystal Lagoon®—the largest in the United States. Connected by extra-wide golf cart paths, ULTRAFi gigabit technology, and top-rated schools including Kirkland Ranch Academy of Innovation, these communities offer unbeatable resort lifestyle value and strong builder incentives.",
    highlights: [
      "Home to the first 7.5-acre Crystal Lagoon® in the U.S. (Epperson) and the largest 15-acre Crystal Lagoon® in the nation (Mirada)",
      "White-sand beaches, swim-up tiki bars, paddleboarding, kayaking, water slides, and private VIP cabanas",
      "Connected by the brand-new I-75 at Overpass Road interchange and the upcoming Wesley Chapel Town Center retail hub",
      "Dedicated golf-cart path network allowing residents to drive golf carts from their garage to the lagoon and neighborhood pubs",
      "First-in-the-nation ULTRAFi smart communities with symmetrical gigabit fiber internet bundled into the HOA",
      "Aggressive builder incentives including 4.99% fixed interest rate buydowns and up to $30,000 in flex cash",
    ],
    amenities: [
      "15-Acre (Mirada) & 7.5-Acre (Epperson) Crystal Lagoons® with White Sand Beaches",
      "Swim-Up Tiki Bars, Restaurant Pavilions, Live Music Stages & Event Lawns",
      "Kayak, Paddleboard & Floating Cabana Rentals for Residents",
      "Community-Wide Golf Cart Path System & Eagle's Nest Nature Trails",
      "ULTRAFi High-Speed Gigabit Wi-Fi Throughout Homes & Lagoon Beaches",
      "Mirada Active Adult (55+) Private Resort Pool, Clubhouse & Pickleball",
      "Dog Parks, Tot Lots & Proximity to Kirkland Ranch Academy of Innovation",
      "Minutes to KRATE at the Grove, Tampa Premium Outlets & AdventHealth",
    ],
    specs: [
      { label: "Signature Attraction", value: "7.5-Acre & 15-Acre Crystal Lagoons" },
      { label: "Developer", value: "MetroPlaces" },
      { label: "Connectivity", value: "ULTRAFi Gigabit + Golf Cart Paths" },
      { label: "Active Builders", value: "Biscayne, Lennar, Casa Fresca, Maronda, D.R. Horton" },
      { label: "Price Range", value: "$375K – $1.1M+" },
      { label: "Incentives", value: "Rate Buydowns + Closing Credits" },
    ],
    floorPlanTiers: [
      {
        tierName: "Lagoon Lifestyle Townhomes & Villas",
        configuration: "3 Bed / 2.5 Bath / 1–2 Car Garage",
        sqFtRange: "1,650 – 1,950 SqFt",
        startingPrice: "$375,000+",
      },
      {
        tierName: "Signature Single-Family Homes",
        configuration: "4–5 Bed / 2.5–3.5 Bath / 2–3 Car Garage",
        sqFtRange: "2,150 – 3,300 SqFt",
        startingPrice: "$465,000+",
      },
      {
        tierName: "Mirada 55+ Active Adult Villa & Estate Series",
        configuration: "2–4 Bed + Den / Resort Clubhouse Access",
        sqFtRange: "1,700 – 2,950 SqFt",
        startingPrice: "$440,000+",
      },
      {
        tierName: "Biscayne Homes Semi-Custom Gated Enclaves",
        configuration: "4–6 Bed + Bonus / Custom Pool & Water Views",
        sqFtRange: "3,400 – 4,800+ SqFt",
        startingPrice: "$795,000 – $1.1M+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $135 – $285 / month (Includes ULTRAFi Internet/TV & Lagoon Membership)",
      cddEstimate: "Approx. $2,300 – $3,600 / year",
      estimatedTaxMillage: "~1.65% – 1.80% (Pasco County)",
      masterIncludes: [
        "Resident Membership & Unlimited Access to the 7.5-Acre or 15-Acre Crystal Lagoon",
        "ULTRAFi High-Speed Gigabit Fiber Internet & Digital Cable Package",
        "Golf Cart Trail Maintenance, Dog Parks & Common Landscaping",
        "Exterior Maintenance & Lawn Care (Included in Townhome, Villa & 55+ Villages)",
      ],
      financialNote:
        "Because ULTRAFi high-speed internet, cable, and full Crystal Lagoon club membership are bundled into the HOA assessment, the net effective cost of the HOA is remarkably low compared to traditional communities.",
    },
    whyBuyWithDG: [
      {
        title: "Epperson Resale vs. Mirada New Construction Comparison",
        detail:
          "Since Epperson is nearing final buildout while Mirada has active builder phases, we compare upgraded Epperson resales (with existing pools and paid-off lot premiums) against brand-new Mirada builder incentives.",
      },
      {
        title: "Biscayne Homes Semi-Custom Structural Guidance",
        detail:
          "For luxury buyers building in the gated Biscayne Homes enclaves, we assist with homesite elevation, structural floor plan modifications, and outdoor living orientation.",
      },
      {
        title: "Maximum Builder Incentive Extraction",
        detail:
          "We pit competing builders inside Mirada against one another to secure free refrigerator/washer/dryer/blinds packages, rate buydowns, and zero-closing-cost deals.",
      },
      {
        title: "Overpass Road Commercial Growth Insights",
        detail:
          "Mark Davis tracks the incoming grocery, medical, and town-center developments along Overpass Road so you buy closest to upcoming lifestyle conveniences.",
      },
    ],
    coordinates: { lat: 28.2738, lng: -82.2889 },
  },
  {
    slug: "connerton-land-o-lakes",
    name: "Connerton",
    subtitle: "4,800-Acre 'New Town' Nature Reserve & Luxury Estate Community",
    corridor: "north-tampa",
    corridorLabel: "North Tampa Master-Planned Communities",
    location: "21100 Fountain Garden Way — US-41 Corridor, Land O' Lakes, FL 34637",
    neighborhoodOrSubmarket: "Central Land O' Lakes / US-41 Nature Corridor",
    developer: "Hayman Woods / Metro Development Group",
    architectOrPlanner: "Florida 'New Town' Conservation Design",
    builders: [
      "Homes by WestBay",
      "Taylor Morrison",
      "M/I Homes",
      "Lennar",
    ],
    priceRange: "$450K – $1.35M+",
    status: "Actively Selling — The Estates II & Conservation Villages",
    delivery: "Quick Move-In Inventory & 6–9 Month Custom Builds",
    unitsOrAcreage: "4,800+ Acres | Over 3,000 Acres of Permanent Nature Preserve",
    propertyTypes: ["Luxury Conservation Estates", "Executive Single-Family Homes", "Townhomes"],
    heroImage: "/res_historic_estate_1787632833084.png",
    gallery: [
      "/res_historic_estate_1787632833084.png",
      "/land_waterfront_plot_1787632916432.png",
      "/res_golf_course_home_1787632854609.png",
      "/davis-garnett-listings.jpg",
    ],
    summary:
      "Designated as one of Florida's only official 'New Town' conservation communities, Connerton spans 4,800 acres in Land O' Lakes—dedicating over 3,000 acres to permanent nature preserves alongside Club Connerton's resort waterpark, amphitheater, and oversized estate homesites by Homes by WestBay and Taylor Morrison.",
    description:
      "For discerning buyers who want mature landscaping, established neighborhood pride, and vast conservation privacy rather than dense cookie-cutter streets, Connerton in Land O' Lakes stands apart. Encompassing 4,800 total acres with more than 3,000 acres permanently protected as wildlife corridors, cypress domes, and sparkling lakes, Connerton blends established charm with brand-new luxury phases like *The Estates II*. Anchored by the 10,000-square-foot Club Connerton clubhouse, resort aquatic center with thrilling water slide, Kidz Zone, outdoor amphitheater, and on-site Connerton Elementary School, the community features premier builds by Homes by WestBay, Taylor Morrison, M/I Homes, and Lennar.",
    highlights: [
      "Official Florida 'New Town' designation with over 3,000 of its 4,800 acres preserved as permanent nature sanctuary",
      "Oversized 70-foot and 80-foot conservation and lakefront homesites in *The Estates II* by Homes by WestBay & Taylor Morrison",
      "10,000 SqFt Club Connerton featuring a resort aquatic park, tower waterslide, splash park, and Lakeside Cafe",
      "Connerton Nature Trail connects directly into the 3,000-acre Conner Preserve for hiking, birding, and off-road biking",
      "On-site Connerton Elementary School, outdoor concert amphitheater, tennis, pickleball, and sand volleyball courts",
      "Prime central Land O' Lakes location with quick access to US-41, SR-54, Dale Mabry Highway, and Suncoast Parkway",
    ],
    amenities: [
      "10,000 SqFt Club Connerton Clubhouse & Fit & Flourish Wellness Gym",
      "Resort-Style Super Pool with Tower Waterslide, Lap Lanes & Kidz Splash Zone",
      "3,000+ Acres of Protected Nature Preserve & Miles of Scenic Boardwalk Trails",
      "Outdoor Concert Amphitheater, Festival Lawn & Lakeside Pavilion",
      "Lighted Tennis, Pickleball, Basketball & Sand Volleyball Courts",
      "On-Site Connerton Elementary School (Walk or Bike via Community Sidewalks)",
      "On-Site Publix Town Center, Medical Offices & Neighborhood Retail at Entry",
      "Full-Time Activity Director Hosting Food Truck Fridays & Holiday Concerts",
    ],
    specs: [
      { label: "Total Footprint", value: "4,800 Acres (3,000+ Preserved)" },
      { label: "Designation", value: "Official Florida 'New Town'" },
      { label: "Premier Builders", value: "Homes by WestBay, Taylor Morrison, M/I, Lennar" },
      { label: "Homesite Sizes", value: "50', 60', 70' & 80'+ Preserve Lots" },
      { label: "Price Range", value: "$450K – $1.35M+" },
      { label: "Clubhouse", value: "10,000 SqFt Club Connerton" },
    ],
    floorPlanTiers: [
      {
        tierName: "Classic Conservation Series (50' Lots)",
        configuration: "3–4 Bed / 2–3 Bath / 2-Car Garage",
        sqFtRange: "1,950 – 2,650 SqFt",
        startingPrice: "$450,000+",
      },
      {
        tierName: "Taylor Morrison & M/I Executive Series (60' Lots)",
        configuration: "4–5 Bed + Study / 3–4 Bath / 3-Car Garage",
        sqFtRange: "2,750 – 3,650 SqFt",
        startingPrice: "$635,000+",
      },
      {
        tierName: "Homes by WestBay Artisan Collection (70' Lots)",
        configuration: "4–5 Bed + Bonus + Den / 4 Bath / 3-Car Garage",
        sqFtRange: "3,600 – 4,500 SqFt",
        startingPrice: "$875,000+",
      },
      {
        tierName: "The Estates II Grand Conservation Series (80'+ Lots)",
        configuration: "5–6 Bed / Soaring Grand Room + Custom Pool Lanai",
        sqFtRange: "4,500 – 5,400+ SqFt",
        startingPrice: "$1,100,000 – $1.35M+",
      },
    ],
    hoaCddInfo: {
      hoaEstimate: "Approx. $95 – $135 / month",
      cddEstimate: "Approx. $1,950 – $3,500 / year (Varies by Village & Lot Width)",
      estimatedTaxMillage: "~1.62% – 1.78% (Pasco County)",
      masterIncludes: [
        "Unlimited Access to 10,000 SqFt Club Connerton, Aquatic Center & Fitness Gym",
        "Maintenance of 3,000+ Acres of Nature Trails, Boardwalks & Lakes",
        "Tennis, Pickleball, Sand Volleyball, Amphitheater & Dog Parks",
        "Resident Social Events, Clubs & Common Entry Landscaping",
      ],
      financialNote:
        "Earlier villages in Connerton have significantly lower remaining CDD bond balances than brand-new phases. Davis & Garnett calculates the exact monthly carrying cost between a newly released WestBay/Taylor Morrison lot and a lightly lived-in resale.",
    },
    whyBuyWithDG: [
      {
        title: "VIP Access to Private 'Estates II' Conservation Lot Releases",
        detail:
          "80-foot cul-de-sac lots backing to the 3,000-acre Conner Preserve sell out immediately upon release. We register our clients directly with WestBay and Taylor Morrison land managers.",
      },
      {
        title: "Structural Design Studio ROI Guidance",
        detail:
          "When building a $900K–$1.3M+ WestBay or Taylor Morrison estate, it is easy to overspend by $150K in the design center. We guide you on which structural options appraise dollar-for-dollar.",
      },
      {
        title: "CDD Bond Payoff & Carrying Cost Audit",
        detail:
          "We verify the exact CDD Series bond principal and annual Operations & Maintenance (O&M) fee for your specific homesite.",
      },
      {
        title: "Independent Construction Phase Oversight",
        detail:
          "Even with top-tier builders, subcontractor quality varies. We attend your pre-construction meeting, pre-drywall walkthrough, and final blue-tape orientation.",
      },
    ],
    coordinates: { lat: 28.2684, lng: -82.4561 },
  },
];

export function getDevelopmentBySlug(slug: string): Development | undefined {
  return DEVELOPMENTS.find((dev) => dev.slug === slug);
}

export function getDevelopmentsByCorridor(corridor?: DevelopmentCorridor): Development[] {
  if (!corridor) return DEVELOPMENTS;
  return DEVELOPMENTS.filter((dev) => dev.corridor === corridor);
}

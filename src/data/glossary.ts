import type { PublicationStatus } from "./knowledgeHub";
import {
  inferTaxonomyTags,
  scoreTaxonomyOverlap,
  type AudienceTag,
  type CorridorTag,
  type CountyTag,
  type PropertyTypeTag,
} from "../lib/taxonomy";

export interface GlossaryFAQ {
  q: string;
  a: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  shortTitle: string;
  aliases: string[];
  category: "Taxes & Exemptions" | "Commercial & Investment" | "Insurance & Inspections" | "Communities & Land";
  quickAnswer: string;
  definition: string[];
  tampaBayExample: string;
  howWeHandleIt: string;
  faqs: GlossaryFAQ[];
  propertyType: PropertyTypeTag[];
  audience: AudienceTag[];
  county: CountyTag[];
  corridor: CorridorTag[];
  relatedGuideSlugs: string[];
  relatedServiceRoutes: string[];
  relatedGlossarySlugs: string[];
  publishedAt: string;
  updatedAt: string;
  status: PublicationStatus;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "cdd",
    term: "Community Development District (CDD)",
    shortTitle: "CDD",
    aliases: ["Community Development District", "CDD", "CDD fee", "CDD fees"],
    category: "Communities & Land",
    quickAnswer:
      "A Community Development District (CDD) is a local taxing district used in Florida master-planned communities to fund roads, water lines, drainage, and clubhouses. Homeowners pay this assessment each year on their county property tax bill rather than in a monthly HOA check.",
    definition: [
      "Under Florida Statutes Chapter 190, developers create a CDD to issue tax-exempt municipal bonds that build roads, stormwater ponds, utilities, and amenity centers before homes are sold.",
      "The annual CDD bill has two parts: Debt Service (which pays down the construction bond over 20 to 30 years) and Operations & Maintenance, or O&M (which covers daily upkeep of pools, gates, and common landscaping).",
      "Unlike monthly HOA dues, a CDD appears as a non-ad valorem line item on your November Hillsborough, Pasco, or Polk County tax notice and is automatically escrowed with most mortgages."
    ],
    tampaBayExample:
      "In master-planned Wesley Chapel and New Tampa communities such as Epperson, Mirada, or K-Bar Ranch, a typical single-family CDD ranges from $1,600 to $3,400 per year depending on lot width. Some sellers paid off the Debt Service bond early, leaving only the annual O&M share.",
    howWeHandleIt:
      "Before any buyer makes an offer in a newer Tampa Bay community, Mark & Rachael pull the exact county tax collector non-ad valorem roll so you see both the remaining bond payoff balance and the annual O&M amount side by side.",
    faqs: [
      {
        q: "Does a CDD ever go away?",
        a: "The Debt Service bond portion ends once paid off (usually after 20 to 30 years), or when a homeowner pays the remaining principal balance at closing. The smaller Operations & Maintenance portion continues permanently to maintain amenities and stormwater systems."
      },
      {
        q: "Can CDD fees increase over time?",
        a: "The Debt Service bond payment is typically fixed, while the Operations & Maintenance budget is set each year by the CDD board and can adjust with insurance, staffing, and repair costs."
      },
      {
        q: "Is a CDD tax-deductible?",
        a: "Unlike regular ad valorem property taxes, the IRS generally does not treat CDD assessments for local benefits as deductible on personal returns. Always confirm specifics with a Florida CPA."
      }
    ],
    propertyType: ["residential", "new-construction", "55-plus"],
    audience: ["home-buyers", "new-build-buyers", "relocating", "55-plus-buyers"],
    county: ["hillsborough", "pasco", "polk"],
    corridor: ["wesley-chapel-new-tampa", "brandon-i75"],
    relatedGuideSlugs: [
      "first-time-homebuyer-guide-hillsborough-county",
      "55-plus-communities-tampa-bay-buyer-guide",
      "property-taxes-cdd-fees-florida-explained"
    ],
    relatedServiceRoutes: ["/align-right-carrollwood-coverage", "/developments", "/contact"],
    relatedGlossarySlugs: ["hoa", "homestead-portability"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "hoa",
    term: "Homeowners Association (HOA) & COA",
    shortTitle: "HOA",
    aliases: ["Homeowners Association", "HOA", "COA", "Condo Association"],
    category: "Communities & Land",
    quickAnswer:
      "An HOA (Homeowners Association) or COA (Condominium Association) is a private neighborhood organization that manages shared spaces, enforces architectural standards, and collects regular dues. In Florida, HOAs follow Statute Chapter 720 while condos follow Chapter 718.",
    definition: [
      "HOAs exist to preserve neighborhood appearance, cover common-area landscaping or gates, and enforce deed restrictions covering paint colors, fencing, parking, and short-term rentals.",
      "Condominium associations (COAs) carry broader responsibility, usually insuring the building exterior and roof while collecting reserves for major structural work.",
      "Following Florida's post-Surfside condo safety legislation, buildings three stories and taller must fund structural integrity reserve studies (SIRS), which has reshaped monthly condo assessments across Tampa Bay."
    ],
    tampaBayExample:
      "In Carrollwood and Northdale, classic single-family subdivisions often have voluntary civic groups or modest $200–$600 annual HOAs, whereas gated townhomes in Brandon or waterfront condos in St. Petersburg and Harbour Island carry higher monthly dues covering roofs, flood master policies, and seawalls.",
    howWeHandleIt:
      "We order the full association budget, reserve study, milestone inspection summary (for condos), and rental rules during your inspection window—and include a clean statutory review period in every contract.",
    faqs: [
      {
        q: "How many days do Florida buyers get to review condo or HOA documents?",
        a: "Under Florida law, condo resale buyers receive three business days after receiving the governing documents to cancel for any reason, while most HOA contracts include specific disclosure deadlines."
      },
      {
        q: "Can a condo association pass a special assessment right before closing?",
        a: "Yes. Under standard Florida FAR/BAR riders, sellers generally pay assessments levied before closing unless the contract splits future installment payments—something we negotiate explicitly upfront."
      }
    ],
    propertyType: ["residential", "condo-townhome", "55-plus", "luxury"],
    audience: ["home-buyers", "home-sellers", "55-plus-buyers", "relocating"],
    county: ["hillsborough", "pinellas", "pasco"],
    corridor: ["north-tampa-carrollwood", "downtown-bayshore", "st-petersburg-waterfront"],
    relatedGuideSlugs: [
      "55-plus-communities-tampa-bay-buyer-guide",
      "florida-closing-costs-hidden-fees-buyers",
      "hidden-risks-buying-older-condo-tampa-bay"
    ],
    relatedServiceRoutes: ["/developments", "/align-right-carrollwood-coverage", "/contact"],
    relatedGlossarySlugs: ["cdd", "wind-mitigation", "elevation-certificate"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "1031-exchange",
    term: "IRS Section 1031 Like-Kind Exchange",
    shortTitle: "1031 Exchange",
    aliases: ["1031 exchange", "1031", "like-kind exchange"],
    category: "Commercial & Investment",
    quickAnswer:
      "A 1031 exchange lets real estate investors defer federal capital gains taxes by selling an investment or business property and reinvesting all proceeds into another like-kind U.S. investment property within 180 calendar days.",
    definition: [
      "To qualify under IRS Code Section 1031, both the relinquished property and the replacement property must be held for business use or investment—primary residences and fix-and-flip inventory do not qualify.",
      "A Qualified Intermediary (QI) must hold the sale proceeds from closing so the seller never takes constructive receipt of the cash.",
      "Two strict federal clocks start on the day the first sale closes: 45 calendar days to identify replacement candidates in writing, and 180 calendar days to close on the new property."
    ],
    tampaBayExample:
      "An investor selling a Brandon medical office building or a St. Petersburg duplex can roll the equity tax-deferred into NNN retail properties along I-75 or into buildable commercial acreage without losing 20% to 25% of their equity to federal tax.",
    howWeHandleIt:
      "Mark & Rachael help you pre-identify replacement commercial or land options before your first listing hits the market and connect you directly with seasoned Florida Qualified Intermediaries so Day 45 never catches you empty-handed.",
    faqs: [
      {
        q: "Can the 45-day or 180-day 1031 deadline be extended for weekends?",
        a: "No. Both deadlines count calendar days, including weekends and holidays, unless the IRS issues an official federal disaster relief notice for your county."
      },
      {
        q: "Can you exchange land for a commercial building?",
        a: "Yes. Under IRS rules, almost any U.S. investment real estate—vacant commercial land, warehouses, retail strips, or multi-family—counts as like-kind to any other U.S. investment real estate."
      }
    ],
    propertyType: ["commercial", "land-acreage", "retail-office", "industrial-flex"],
    audience: ["investors", "commercial-owners", "land-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk", "marion"],
    corridor: ["brandon-i75", "central-florida-corridor", "downtown-bayshore"],
    relatedGuideSlugs: [
      "1031-exchange-tampa-bay-commercial-investors",
      "commercial-real-estate-investing-tampa-bay"
    ],
    relatedServiceRoutes: [
      "/tools/1031-deadline-calculator",
      "/tools/cap-rate-calculator",
      "/commercial-advisory-guide"
    ],
    relatedGlossarySlugs: ["bpo", "nnn-lease"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "bpo",
    term: "Broker Price Opinion (BPO)",
    shortTitle: "BPO",
    aliases: ["Broker Price Opinion", "BPO"],
    category: "Commercial & Investment",
    quickAnswer:
      "A Broker Price Opinion (BPO) is a detailed property valuation prepared by an active licensed real estate broker using comparable sales, active competition, income potential, and local market demand—faster and more practical than a bank appraisal.",
    definition: [
      "While residential sellers rely on a Comparative Market Analysis (CMA), commercial owners, lenders, attorneys, and estate trustees frequently order a BPO to price retail centers, warehouses, churches, or acreage.",
      "A thorough commercial or land BPO examines recent closed comps, cap rates, lease rollover risk, zoning upside, traffic counts, and site constraints such as wetlands or retention.",
      "Under Florida real estate licensing rules, brokers clearly label a BPO so clients understand it is an opinion of market value, not a state-certified appraisal for federally regulated loan underwriting."
    ],
    tampaBayExample:
      "For a family estate holding 15 acres near Frostproof or an owner evaluating a single-tenant retail parcel in Brandon, a BPO helps settle valuation questions for lease renewal, buyouts, or pre-listing pricing within days.",
    howWeHandleIt:
      "Mark & Rachael prepare complimentary BPOs for Tampa Bay and Central Florida property owners considering a sale, refinance, or 1031 repositioning—combining CoStar-grade income math with boots-on-the-ground buyer demand.",
    faqs: [
      {
        q: "How is a BPO different from an appraisal?",
        a: "An appraisal is completed by a state-licensed appraiser for mortgage lending, tax court, or litigation, while a BPO is created by active market brokers reflecting real-time buyer appetite and pricing strategy."
      },
      {
        q: "What should I have ready for an accurate commercial BPO?",
        a: "Current rent roll, trailing 12-month operating expenses, recent property tax bill, and any survey or environmental Phase I report."
      }
    ],
    propertyType: ["commercial", "land-acreage", "residential"],
    audience: ["commercial-owners", "home-sellers", "investors"],
    county: ["hillsborough", "pinellas", "pasco", "polk", "marion"],
    corridor: ["brandon-i75", "central-florida-corridor"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-tampa-bay",
      "home-selling-guide-tampa-bay"
    ],
    relatedServiceRoutes: [
      "/tools/cap-rate-calculator",
      "/tools/seller-net-proceeds",
      "/commercial-advisory-guide"
    ],
    relatedGlossarySlugs: ["nnn-lease", "1031-exchange"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "nnn-lease",
    term: "Triple Net (NNN) Lease",
    shortTitle: "NNN Lease",
    aliases: ["Triple Net Lease", "Triple Net", "NNN", "NNN lease"],
    category: "Commercial & Investment",
    quickAnswer:
      "In a Triple Net (NNN) lease, the commercial tenant pays base rent plus all three major building expenses: property taxes, building insurance, and common area maintenance (CAM). Landlords receive predictable net cash flow with minimal management.",
    definition: [
      "Commercial leases vary by how expenses are shared. In a Gross Lease, the landlord pays building expenses out of the rent; in a NNN Lease, tenants reimburse taxes, insurance, and CAM directly.",
      "Pure NNN (absolute net) leases even shift roof and structural repairs onto the tenant, which is common with national pharmacy, quick-service restaurant, or corporate medical tenants.",
      "Because operating costs pass through to the tenant, NNN Net Operating Income (NOI) translates cleanly into Cap Rate comparisons across markets."
    ],
    tampaBayExample:
      "Along high-traffic corridors like State Road 60 in Brandon, Dale Mabry Highway in Carrollwood, or US-19 in Pinellas County, single-tenant retail and dental buildings regularly trade on 10-year NNN leases with 2% to 3% annual rent escalations.",
    howWeHandleIt:
      "Before advising you to buy or sell an investment asset, we audit every line of the lease—especially roof/HVAC carve-outs, Florida windstorm insurance caps, and tenant corporate vs. franchise guarantees.",
    faqs: [
      {
        q: "Who pays for a new roof in a Florida NNN lease?",
        a: "Many 'modified NNN' leases still leave roof structure and parking lot replacement with the landlord while the tenant pays CAM and insurance. Only an 'absolute NNN' shifts roof replacement to the tenant."
      },
      {
        q: "How does Florida property insurance affect NNN tenants?",
        a: "Rising coastal windstorm premiums in Hillsborough and Pinellas counties directly raise tenant occupancy costs, so smart landlords review renewal elasticity before pushing rents."
      }
    ],
    propertyType: ["commercial", "retail-office", "industrial-flex"],
    audience: ["investors", "commercial-owners"],
    county: ["hillsborough", "pinellas", "pasco"],
    corridor: ["brandon-i75", "north-tampa-carrollwood", "downtown-bayshore"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-tampa-bay",
      "1031-exchange-tampa-bay-commercial-investors"
    ],
    relatedServiceRoutes: ["/tools/cap-rate-calculator", "/commercial-advisory-guide"],
    relatedGlossarySlugs: ["bpo", "1031-exchange"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "four-point-inspection",
    term: "Florida 4-Point Insurance Inspection",
    shortTitle: "4-Point Inspection",
    aliases: ["4-Point Inspection", "four-point inspection", "4-point", "four point"],
    category: "Insurance & Inspections",
    quickAnswer:
      "A 4-Point Inspection checks only the four home systems Florida insurance carriers care about most: the roof, electrical panel, plumbing pipes, and HVAC unit. Insurers require it before writing policies on most Florida homes over 20–30 years old.",
    definition: [
      "Unlike a full 2-to-3 hour home inspection that looks at cosmetics, appliances, windows, and drainage, a 4-Point takes 30 to 45 minutes and produces a short underwriter checklist with dated photos.",
      "Underwriters flag specific high-risk items such as polybutylene supply pipes, Federal Pacific or Zinsco electrical panels, cloth wiring, or shingle roofs with fewer than 3 to 5 years of remaining useful life.",
      "Passing a clean 4-Point unlocks private admitted homeowners insurance options instead of forcing a buyer onto high-cost surplus lines."
    ],
    tampaBayExample:
      "In established 1970s–1990s Carrollwood, Brandon, and St. Petersburg neighborhoods, replacing an aging breaker panel or a few brittle supply lines before listing often cuts a buyer's annual homeowners insurance quote by $1,500 to $3,000.",
    howWeHandleIt:
      "We recommend sellers in older Tampa Bay homes run a pre-listing 4-Point inspection so there are zero surprise insurance rejections during the buyer's financing period—and for buyers, we pair the general inspection with a 4-Point and Wind Mitigation on Day 1.",
    faqs: [
      {
        q: "At what home age do Florida insurers require a 4-Point Inspection?",
        a: "Most carriers require a 4-Point once a home reaches 20 to 30 years old, though some tighten the threshold to 15 years for older roofs."
      },
      {
        q: "How long is a 4-Point Inspection valid?",
        a: "Typically 12 months with most Florida carriers, provided the home has not suffered storm damage or major system modifications since the inspection date."
      }
    ],
    propertyType: ["residential", "condo-townhome", "waterfront"],
    audience: ["home-buyers", "home-sellers", "relocating"],
    county: ["hillsborough", "pinellas", "pasco"],
    corridor: ["north-tampa-carrollwood", "brandon-i75", "st-petersburg-waterfront"],
    relatedGuideSlugs: [
      "florida-homeowners-insurance-explained",
      "home-selling-guide-tampa-bay",
      "first-time-homebuyer-guide-hillsborough-county"
    ],
    relatedServiceRoutes: ["/tools/seller-net-proceeds", "/contact"],
    relatedGlossarySlugs: ["wind-mitigation", "elevation-certificate"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "wind-mitigation",
    term: "Florida Wind Mitigation Inspection",
    shortTitle: "Wind Mitigation",
    aliases: ["Wind Mitigation", "wind mitigation inspection", "wind mit"],
    category: "Insurance & Inspections",
    quickAnswer:
      "A Wind Mitigation Inspection documents storm-resistant features—like roof shape, nail spacing, hurricane clips, secondary water barriers, and impact windows—using Florida state form OIR-B1-1802. Insurers use it to apply steep mandatory discounts to your windstorm premium.",
    definition: [
      "Every Florida homeowners policy splits risk into non-hurricane peril and hurricane/wind peril. The wind portion often makes up half or more of a Tampa Bay policy.",
      "A licensed inspector physically enters the attic to photograph truss-to-wall straps or clips, verifies roof-deck attachment, checks the Florida Building Code permit year of the roof, and inspects window and garage-door protection.",
      "Even modest upgrades—such as upgrading from toe-nails to third-nail roof clips or installing impact garage doors—can pay for themselves in 1 to 2 years of insurance savings."
    ],
    tampaBayExample:
      "A home in Carrollwood or St. Petersburg with a hip roof, post-2002 building code deck nailing, double-wrap straps, and impact windows routinely saves $1,200 to $3,800 per year compared to a neighboring house lacking a current Wind Mitigation form.",
    howWeHandleIt:
      "We coordinate the Wind Mitigation alongside your home inspection so your insurance agent can run live carrier quotes before your inspection contingency expires.",
    faqs: [
      {
        q: "How long does a Wind Mitigation report stay valid in Florida?",
        a: "Generally up to 5 years unless the roof is replaced or exterior openings are altered."
      },
      {
        q: "What is the biggest wind mitigation discount feature?",
        a: "Having a Hip roof geometry, full hurricane straps/clips verified by attic photos, and verified impact-rated protection on all windows, doors, and skylights (opening protection)."
      }
    ],
    propertyType: ["residential", "waterfront", "condo-townhome", "luxury"],
    audience: ["home-buyers", "home-sellers", "relocating"],
    county: ["hillsborough", "pinellas", "pasco"],
    corridor: ["st-petersburg-waterfront", "north-tampa-carrollwood", "clearwater-beaches"],
    relatedGuideSlugs: [
      "florida-homeowners-insurance-explained",
      "st-petersburg-waterfront-flood-zones-guide"
    ],
    relatedServiceRoutes: ["/align-right-carrollwood-coverage", "/contact"],
    relatedGlossarySlugs: ["four-point-inspection", "elevation-certificate"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "homestead-portability",
    term: "Florida Homestead Exemption & Save Our Homes Portability",
    shortTitle: "Homestead & Portability",
    aliases: ["Homestead Portability", "Save Our Homes", "Homestead Exemption", "portability"],
    category: "Taxes & Exemptions",
    quickAnswer:
      "Florida's Homestead Exemption shields up to $50,000 of your primary residence's assessed value from property taxes and caps annual assessed-value increases at 3% or CPI. Save Our Homes Portability lets you transfer up to $500,000 of that accumulated tax discount to your next Florida primary home.",
    definition: [
      "To claim Homestead in the upcoming tax year, you must own and occupy the home as your permanent legal residence on January 1 and file with your county Property Appraiser by March 1.",
      "Over years of home-price appreciation, your Market Value rises faster than your capped Assessed Value. That dollar gap is your Save Our Homes (SOH) tax savings.",
      "When you sell your Florida homestead and establish a new one within three tax years, Form DR-501T transfers that tax savings—up to $500,000—onto the new home's assessed value, permanently lowering your new tax bill."
    ],
    tampaBayExample:
      "A homeowner who owned in Brandon or St. Petersburg for 10 years and accumulated $220,000 in Save Our Homes benefit can move up into a $750,000 Carrollwood home and immediately shave roughly $3,500–$4,200 off their annual county property taxes.",
    howWeHandleIt:
      "We help both move-up Florida residents calculate their exact SOH portability before shopping and guide relocating out-of-state buyers so they never mistake a long-time seller's current tax bill for what taxes will reset to after closing.",
    faqs: [
      {
        q: "How long do I have to transfer Florida Homestead Portability?",
        a: "You have up to three tax years (specifically, three January 1sts from the year you abandoned your prior homestead) to establish a new Florida homestead and transfer the benefit."
      },
      {
        q: "Why do my property taxes jump the year after buying an existing home?",
        a: "When ownership transfers, the seller's Save Our Homes cap disappears and the home resets to full market value in the following January assessment cycle."
      }
    ],
    propertyType: ["residential", "luxury", "55-plus", "waterfront"],
    audience: ["home-buyers", "home-sellers", "relocating", "55-plus-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["north-tampa-carrollwood", "brandon-i75", "st-petersburg-waterfront"],
    relatedGuideSlugs: [
      "property-taxes-cdd-fees-florida-explained",
      "moving-to-tampa-bay-relocation-guide",
      "home-selling-guide-tampa-bay"
    ],
    relatedServiceRoutes: ["/tools/seller-net-proceeds", "/align-right-carrollwood-coverage"],
    relatedGlossarySlugs: ["cdd", "greenbelt-exemption"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "elevation-certificate",
    term: "FEMA Elevation Certificate",
    shortTitle: "Elevation Certificate",
    aliases: ["Elevation Certificate", "Base Flood Elevation", "BFE", "Flood Zone AE", "Flood Zone VE"],
    category: "Insurance & Inspections",
    quickAnswer:
      "An Elevation Certificate is an official survey signed by a Florida licensed surveyor showing a home's lowest floor height compared to FEMA's Base Flood Elevation (BFE). It directly determines flood insurance rates and compliance in Tampa Bay coastal and creek zones.",
    definition: [
      "Properties inside FEMA Special Flood Hazard Areas (such as Zone AE or coastal Zone VE) require federally backed flood coverage whenever a buyer carries a conventional, FHA, or VA mortgage.",
      "Under FEMA Risk Rating 2.0, flood underwriters look closely at first-floor height above grade, proximity to water, foundation type (slab vs. stilt/pilings), and presence of smart flood vents.",
      "A house raised just 2 to 4 feet above Base Flood Elevation often pays a fraction of the flood premium charged to a ground-level 1960s ranch home on the very same street."
    ],
    tampaBayExample:
      "Across St. Petersburg's Bahama Shores, Snell Isle, Shore Acres, and Tampa's Bayshore corridor, buyers regularly evaluate older ranch homes subject to FEMA's '50% Rule' (Substantial Improvement threshold) alongside newer block homes built above BFE.",
    howWeHandleIt:
      "Whenever you tour a waterfront or flood-zone home, we verify the latest Elevation Certificate, pull dual NFIP + private flood quotes, and confirm whether previous renovations count against FEMA's 50% remodeling cap.",
    faqs: [
      {
        q: "Do all Pinellas or Hillsborough waterfront homes require flood insurance?",
        a: "If there is a federally backed mortgage and any structure sits inside Zone AE or VE, lenders mandate flood coverage. Even in upland Zone X, many Tampa Bay owners carry low-cost private or preferred flood policies after recent tropical rain events."
      },
      {
        q: "What is FEMA's 50% Rule?",
        a: "If a non-elevated structure in a flood zone undergoes renovations exceeding 50% of the building's market value (excluding land), local code typically requires elevating the entire structure to current flood code."
      }
    ],
    propertyType: ["waterfront", "residential", "luxury"],
    audience: ["home-buyers", "home-sellers", "relocating"],
    county: ["pinellas", "hillsborough"],
    corridor: ["st-petersburg-waterfront", "downtown-bayshore", "clearwater-beaches"],
    relatedGuideSlugs: [
      "st-petersburg-waterfront-flood-zones-guide",
      "florida-homeowners-insurance-explained"
    ],
    relatedServiceRoutes: ["/hub/waterfront-st-petersburg", "/align-right-carrollwood-coverage"],
    relatedGlossarySlugs: ["wind-mitigation", "four-point-inspection", "hoa"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  },
  {
    slug: "greenbelt-exemption",
    term: "Florida Agricultural Classification (Greenbelt Exemption)",
    shortTitle: "Greenbelt Exemption",
    aliases: ["Greenbelt Exemption", "Greenbelt", "Agricultural Classification"],
    category: "Taxes & Exemptions",
    quickAnswer:
      "Florida's Greenbelt law allows bona fide commercial agricultural land—such as cattle grazing, timber, citrus, or hay—to be taxed at its farm productivity value rather than speculative development market value, dramatically reducing annual property taxes.",
    definition: [
      "Under Florida Statutes Section 193.461, county Property Appraisers grant Agricultural Classification only when land is actively used for a commercial agricultural purpose on January 1 and an application is filed by March 1.",
      "Hobby farming or simply fencing wooded acreage without bona fide agricultural operations typically does not qualify; owners commonly keep cattle leases, timber management plans, or nursery invoices on file.",
      "Greenbelt classification does not lock the land permanently—buyers can later rezone or build, though changing use ends the agricultural tax break the following January."
    ],
    tampaBayExample:
      "Owners holding large rural tracts in Polk County near Frostproof or Marion County near Fort McCoy frequently rely on cattle grazing or timber leases to keep annual taxes minimal while holding land long-term for appreciation or estate buildout.",
    howWeHandleIt:
      "When evaluating rural acreage or commercial transition parcels, Mark & Rachael check current county Greenbelt records, active pasture or timber leases, well/septic capacity, and Future Land Use maps.",
    faqs: [
      {
        q: "Does Greenbelt exemption transfer automatically when I buy agricultural land?",
        a: "No. Ownership change cancels the prior owner's classification at year-end. The new buyer must maintain bona fide agricultural use on January 1 and file a fresh application by March 1."
      },
      {
        q: "How many acres do you need for a Florida Greenbelt exemption?",
        a: "State law sets no strict minimum acreage, though each county Property Appraiser evaluates whether the parcel size and revenue reflect a legitimate commercial farm operation rather than personal use."
      }
    ],
    propertyType: ["land-acreage", "commercial"],
    audience: ["land-buyers", "investors"],
    county: ["polk", "marion", "pasco", "hillsborough"],
    corridor: ["central-florida-corridor", "brandon-i75"],
    relatedGuideSlugs: [
      "buying-vacant-land-central-florida-zoning-utilities",
      "property-taxes-cdd-fees-florida-explained"
    ],
    relatedServiceRoutes: ["/hub/land-acreage-central-florida", "/commercial-advisory-guide"],
    relatedGlossarySlugs: ["homestead-portability", "bpo", "1031-exchange"],
    publishedAt: "2026-11-17T10:30:00-05:00",
    updatedAt: "2026-11-17T10:30:00-05:00",
    status: "live"
  }
];

export const LIVE_GLOSSARY_TERMS: GlossaryTerm[] = GLOSSARY_TERMS.filter(
  (item) => item.status !== "draft"
);

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return LIVE_GLOSSARY_TERMS.find((item) => item.slug === slug);
}

/**
 * Matches live glossary terms to any page/article/listing using explicit slugs
 * plus shared taxonomy tag scoring so first-time readers always find plain-English links.
 */
export function getRelatedGlossaryTermsForTaxonomy(input: {
  text?: string;
  category?: string;
  city?: string;
  explicitSlugs?: string[];
  propertyType?: PropertyTypeTag[];
  audience?: AudienceTag[];
  county?: CountyTag[];
  corridor?: CorridorTag[];
  excludeSlug?: string;
  limit?: number;
}): GlossaryTerm[] {
  const limit = input.limit ?? 4;
  const sourceTags = inferTaxonomyTags({
    text: input.text,
    category: input.category,
    city: input.city,
    explicit: {
      propertyType: input.propertyType,
      audience: input.audience,
      county: input.county,
      corridor: input.corridor,
    },
  });

  const explicitSet = new Set(input.explicitSlugs ?? []);

  return LIVE_GLOSSARY_TERMS.filter((term) => term.slug !== input.excludeSlug)
    .map((term) => {
      let score = scoreTaxonomyOverlap(sourceTags, {
        propertyType: term.propertyType,
        audience: term.audience,
        county: term.county,
        corridor: term.corridor,
      });
      if (explicitSet.has(term.slug)) score += 20;
      const lowerText = (input.text ?? "").toLowerCase();
      if (term.aliases.some((alias) => lowerText.includes(alias.toLowerCase()))) {
        score += 5;
      }
      return { term, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.term);
}

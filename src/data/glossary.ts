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
  },
  {
    slug: "cap-rate",
    term: "Capitalization Rate (Cap Rate)",
    shortTitle: "Cap Rate",
    aliases: ["Capitalization Rate", "Cap Rate", "Cap Rates"],
    category: "Commercial & Investment",
    quickAnswer:
      "Capitalization rate (Cap Rate) measures a commercial property's annual unlevered yield. Divide yearly Net Operating Income (NOI) by the purchase price to compare returns across retail, office, medical, and industrial deals.",
    definition: [
      "Cap Rate shows what a commercial building pays per year if you buy it with all cash. A property earning $80,000 in NOI at a $1,000,000 price trades at an 8.0% Cap Rate.",
      "Lower Cap Rates (such as 5.0% to 6.25%) usually point to national single-tenant NNN credit tenants or prime Tampa infill locations. Higher Cap Rates (7.5% to 9.0%+) often reflect multi-tenant centers, older roofs, or shorter lease terms.",
      "Cap Rate ignores your loan payment. Always check both unlevered Cap Rate and actual Debt Service Coverage Ratio (DSCR) with your commercial lender before making an offer."
    ],
    tampaBayExample:
      "A stabilized Brandon retail strip near SR 60 with staggered 3% annual rent bumps might trade near a 6.75% Cap Rate. A single-tenant neighborhood medical office in Clearwater with only two years left on its lease may command an 8.0% Cap Rate to price renewal risk.",
    howWeHandleIt:
      "Mark & Rachael verify true T-12 income, strip out fake pro-forma assumptions, stress-test rising Florida windstorm insurance, and model Cap Rate sensitivity before you submit an offer.",
    faqs: [
      {
        q: "Is a higher Cap Rate always better for a buyer?",
        a: "No. Higher Cap Rates often signal higher vacancy risk, near-term lease rollovers, or deferred roof and parking lot capital repairs. Lower Cap Rates usually reflect stronger credit tenants and predictable income."
      },
      {
        q: "How do Cap Rate and NOI connect to sale price?",
        a: "Purchase Price equals NOI divided by Cap Rate. Adding $20,000 of verified annual NOI at a 7.0% market Cap Rate can add roughly $285,700 in building value."
      }
    ],
    propertyType: ["commercial", "land-acreage"],
    audience: ["investors", "home-sellers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["brandon-i75", "downtown-bayshore", "clearwater-beaches"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-florida",
      "how-triple-net-nnn-leases-work-florida",
      "commercial-bpo-vs-appraisal-florida"
    ],
    relatedServiceRoutes: ["/tools/cap-rate-calculator", "/tools/commercial-rent-calculator", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["noi", "nnn-lease", "cam", "bpo"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "noi",
    term: "Net Operating Income (NOI)",
    shortTitle: "NOI",
    aliases: ["Net Operating Income", "NOI"],
    category: "Commercial & Investment",
    quickAnswer:
      "Net Operating Income (NOI) is a commercial property's annual gross rental and reimbursement income minus its real estate operating expenses. It excludes mortgage payments, income taxes, and major capital replacements.",
    definition: [
      "Lenders and buyers calculate NOI by adding base rent plus NNN reimbursements, subtracting real vacancy, and deducting taxes, insurance, management, landscaping, and routine maintenance.",
      "NOI does not include loan principal, loan interest, IRS depreciation, or tenant build-out capital allowances. Two buyers using different loans still underwrite the same property NOI.",
      "Underwriting accurate Florida NOI requires adjusting historical property taxes to the buyer's post-sale reassessment level and checking current commercial windstorm insurance quotes."
    ],
    tampaBayExample:
      "If a small office plaza on Fletcher Avenue collects $180,000 in gross rent and CAM recoveries while paying $58,000 in taxes, insurance, lawn care, and repairs, its true NOI is $122,000.",
    howWeHandleIt:
      "When preparing a commercial BPO or buyer underwriting sheet, we rebuild the seller's profit-and-loss statement line by line so post-sale property taxes and insurance do not erase your expected cash flow.",
    faqs: [
      {
        q: "What is the difference between NOI and cash flow?",
        a: "NOI measures building income before your loan payment. Cash flow before taxes is what remains after subtracting annual mortgage principal and interest from NOI."
      },
      {
        q: "Can sellers use pro-forma vacant rent to inflate NOI?",
        a: "No lender or experienced buyer values a property on empty-suite pro-forma rent alone. Banks lend primarily against actual signed leases and Trailing-12 (T-12) collected income."
      }
    ],
    propertyType: ["commercial"],
    audience: ["investors", "home-sellers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["downtown-bayshore", "brandon-i75", "st-petersburg-waterfront"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-florida",
      "how-triple-net-nnn-leases-work-florida",
      "commercial-bpo-vs-appraisal-florida"
    ],
    relatedServiceRoutes: ["/tools/cap-rate-calculator", "/tools/commercial-rent-calculator", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["cap-rate", "cam", "nnn-lease", "modified-gross-lease"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "cam",
    term: "Common Area Maintenance (CAM)",
    shortTitle: "CAM",
    aliases: ["Common Area Maintenance", "CAM", "CAM charges", "CAM fees"],
    category: "Commercial & Investment",
    quickAnswer:
      "Common Area Maintenance (CAM) refers to shared property expenses—like parking lot lighting, landscaping, trash, security, and exterior cleaning—passed through to commercial tenants in addition to base rent.",
    definition: [
      "In retail plazas, medical suites, and flex industrial parks, each tenant typically pays their pro-rata square-foot share of shared building upkeep.",
      "Most landlords estimate monthly CAM charges in advance and perform an annual reconciliation each spring to credit overpayments or bill shortfalls.",
      "Always inspect the CAM exclusions clause in a lease draft. Strong tenant representation negotiates annual caps on controllable CAM increases (often 3% to 5%) and excludes landlord capital roof replacements."
    ],
    tampaBayExample:
      "A 2,400 sq. ft. medical office tenant in a 24,000 sq. ft. Carrollwood plaza holds a 10% pro-rata share. If plaza CAM, taxes, and insurance total $8.50 per square foot yearly, that adds $1,700 per month on top of base rent.",
    howWeHandleIt:
      "We run side-by-side NNN and CAM lease occupancy models before letters of intent go out so tenants know their true all-in monthly rent and buyers verify landlord cost recovery.",
    faqs: [
      {
        q: "What is the difference between controllable and non-controllable CAM?",
        a: "Controllable CAM covers items the landlord bids out, like landscaping, sweeping, and pressure washing. Non-controllable expenses include county property taxes, commercial property insurance, and municipal utilities."
      },
      {
        q: "Can a landlord charge a management admin fee inside CAM?",
        a: "Yes, many commercial leases include a 10% to 15% administrative fee on CAM expenses or a separate property management fee, unless negotiated out during lease drafting."
      }
    ],
    propertyType: ["commercial"],
    audience: ["investors", "home-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["downtown-bayshore", "wesley-chapel-new-tampa", "brandon-i75"],
    relatedGuideSlugs: [
      "how-triple-net-nnn-leases-work-florida",
      "commercial-real-estate-investing-florida"
    ],
    relatedServiceRoutes: ["/tools/commercial-rent-calculator", "/commercial-advisory-guide", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["nnn-lease", "modified-gross-lease", "ti-allowance", "noi"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "modified-gross-lease",
    term: "Modified Gross & Full-Service Gross Lease",
    shortTitle: "Modified Gross Lease",
    aliases: ["Modified Gross Lease", "Modified Gross", "Full-Service Gross", "FSG Lease"],
    category: "Commercial & Investment",
    quickAnswer:
      "A Modified Gross lease splits operating costs between landlord and tenant—often bundling property taxes and base building insurance into rent while the tenant pays utilities, janitorial, or increases above a base year.",
    definition: [
      "Unlike a pure Triple Net (NNN) lease where tenants pay every property expense directly, a Full-Service Gross (FSG) lease wraps taxes, insurance, CAM, and often electricity into one flat dollar rate per square foot.",
      "A Modified Gross lease sits in between. Commonly, the landlord pays base-year taxes and insurance while the tenant pays electric, suite janitorial, and its share of future expense increases.",
      "When comparing two suites across Tampa Bay, converting Modified Gross and NNN quotes into a single monthly total is essential so a lower headline rate does not trick you into higher total rent."
    ],
    tampaBayExample:
      "Downtown Tampa Class A office towers frequently quote Full-Service Gross rates including janitorial and daytime HVAC. Meanwhile, small flex warehouses along US 301 often quote Modified Gross rent where tenants pay only suite electric and water.",
    howWeHandleIt:
      "Use our Commercial Rent & NNN Calculator or ask our team to normalize NNN, Modified Gross, and Full-Service quotes onto a single all-in monthly occupancy sheet before touring suites.",
    faqs: [
      {
        q: "What is a Base Year Expense Stop in a Modified Gross lease?",
        a: "The landlord covers operating expenses up to the total cost paid during year one of the lease. In year two and beyond, the tenant pays its pro-rata share of any increase over that base year."
      },
      {
        q: "Which lease type do small Florida office tenants prefer?",
        a: "First-time business tenants often favor Modified Gross or Full-Service leases because monthly bills are easier to budget without surprise windstorm insurance pass-throughs."
      }
    ],
    propertyType: ["commercial"],
    audience: ["investors", "home-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["downtown-bayshore", "st-petersburg-waterfront", "brandon-i75"],
    relatedGuideSlugs: [
      "how-triple-net-nnn-leases-work-florida",
      "commercial-real-estate-investing-florida"
    ],
    relatedServiceRoutes: ["/tools/commercial-rent-calculator", "/tools/cap-rate-calculator", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["nnn-lease", "cam", "ti-allowance", "letter-of-intent"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "ti-allowance",
    term: "Tenant Improvement Allowance (TI Allowance)",
    shortTitle: "TI Allowance",
    aliases: ["Tenant Improvement Allowance", "TI Allowance", "TIA", "Tenant Improvements"],
    category: "Commercial & Investment",
    quickAnswer:
      "A Tenant Improvement (TI) Allowance is the dollar credit per square foot a commercial landlord gives a tenant to build out, remodel, or customize leased space before opening for business.",
    definition: [
      "Empty retail or office shells rarely work right out of the box for dental clinics, restaurants, or professional firms. Landlords frequently offer a TI Allowance—such as $20 to $45 per rentable square foot—to fund drywall, flooring, plumbing, and ADA restrooms.",
      "Alternatively, a landlord may deliver a Turnkey Buildout, where the owner hires contractors and pays to finish the suite to an agreed floorplan.",
      "Always clarify whether base building HVAC units, fire sprinklers, and electrical panels come in working order before counting your TI dollars."
    ],
    tampaBayExample:
      "A fast-growing therapy group leasing 3,000 sq. ft. in Wesley Chapel negotiates a $35/sq. ft. TI Allowance ($105,000) toward exam rooms, paired with 90 days of free rent during permitting and construction.",
    howWeHandleIt:
      "During Letter of Intent (LOI) negotiations, Mark & Rachael line up contractor bids early so your TI Allowance, free-rent abatement, and rent commencement date actually match Hillsborough or Pinellas permitting timelines.",
    faqs: [
      {
        q: "Does a higher TI Allowance raise monthly base rent?",
        a: "Usually yes. Landlords amortize larger buildout allowances across the primary lease term, so balancing cash TI dollars against lower base rent depends on your startup capital."
      },
      {
        q: "When is the TI Allowance paid out?",
        a: "Most landlords reimburse TI funds once work finishes, lien waivers are signed, and the tenant opens for business with a Certificate of Occupancy."
      }
    ],
    propertyType: ["commercial"],
    audience: ["investors", "home-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["wesley-chapel-new-tampa", "downtown-bayshore", "clearwater-beaches"],
    relatedGuideSlugs: [
      "how-triple-net-nnn-leases-work-florida",
      "commercial-real-estate-investing-florida"
    ],
    relatedServiceRoutes: ["/tools/commercial-rent-calculator", "/commercial-advisory-guide", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["letter-of-intent", "modified-gross-lease", "cam"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "estoppel-certificate",
    term: "Tenant Estoppel Certificate",
    shortTitle: "Estoppel Certificate",
    aliases: ["Estoppel Certificate", "Tenant Estoppel", "Estoppel Letter"],
    category: "Commercial & Investment",
    quickAnswer:
      "An Estoppel Certificate is a signed legal statement from an existing commercial tenant confirming the exact lease rent, security deposit, expiration date, and that neither tenant nor landlord is in default before a sale closes.",
    definition: [
      "When buying a leased retail strip, office building, or industrial warehouse, the seller's rent roll alone is not proof enough for a buyer or commercial lender.",
      "Before closing, each tenant signs an Estoppel Certificate verifying their monthly rent, prepaid rent, CAM share, renewal options, and any unwritten side promises made by the seller.",
      "Once signed, the tenant is legally prevented ('estopped') from later claiming lower rent, hidden TI credits, or unrecorded purchase options against the new owner."
    ],
    tampaBayExample:
      "During due diligence on a multi-tenant plaza in Pinellas Park, Tenant Estoppels uncover that one tenant holds an unrecorded right-of-first-refusal or claims a landlord roof leak credit—allowing the buyer to resolve the issue prior to closing.",
    howWeHandleIt:
      "We structure commercial purchase contracts so receipt of clean, lender-approved Tenant Estoppels (typically covering 80%–100% of leased square footage) is an explicit condition of closing.",
    faqs: [
      {
        q: "How long do tenants usually have to return an Estoppel Certificate?",
        a: "Most commercial leases require tenants to return a completed Estoppel within 10 to 15 days of written request, with failure sometimes triggering automatic landlord certification."
      },
      {
        q: "What is an SNDA alongside an Estoppel?",
        a: "A Subordination, Non-Disturbance, and Attornment (SNDA) agreement sets the legal order between the buyer's mortgage lender and the tenant, protecting the tenant's lease if foreclosure ever occurs."
      }
    ],
    propertyType: ["commercial"],
    audience: ["investors", "home-sellers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["st-petersburg-waterfront", "brandon-i75", "downtown-bayshore"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-florida",
      "how-triple-net-nnn-leases-work-florida"
    ],
    relatedServiceRoutes: ["/tools/cap-rate-calculator", "/commercial-advisory-guide", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["noi", "nnn-lease", "phase-one-esa", "letter-of-intent"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "phase-one-esa",
    term: "Phase I Environmental Site Assessment (Phase I ESA)",
    shortTitle: "Phase I ESA",
    aliases: ["Phase I ESA", "Phase I Environmental Site Assessment", "Phase 1 ESA"],
    category: "Commercial & Investment",
    quickAnswer:
      "A Phase I Environmental Site Assessment (ASTM E1527-21) reviews historical records, regulatory databases, and site conditions on commercial or industrial land to spot contamination risks before a buyer closes.",
    definition: [
      "Almost every SBA 504, SBA 7(a), and commercial bank loan requires a fresh Phase I ESA ordered directly by the lender or an approved environmental engineer.",
      "Investigators review historical aerial photos, city directories, dry-cleaner permits, underground storage tank logs, and neighboring spills without drilling soil samples.",
      "If the Phase I flags a Recognized Environmental Condition (REC), the buyer typically requests a targeted Phase II ESA—collecting soil and groundwater lab samples—before waiving inspection contingencies."
    ],
    tampaBayExample:
      "Acquiring an older commercial corner along Nebraska Avenue or US Highway 19 near a former auto repair shop or dry cleaner requires a clean Phase I ESA (plus potential soil testing) so buyers preserve federal Innocent Landowner liability protection.",
    howWeHandleIt:
      "We build 30 to 45 day environmental feasibility periods into commercial and land contracts and keep trusted Florida environmental engineering firms ready to run ASTM-compliant reviews fast.",
    faqs: [
      {
        q: "How long does a Phase I ESA take in Florida?",
        a: "A standard Phase I ESA usually takes 2 to 3 weeks from engagement. If soil boring under a Phase II is needed, budget an additional 3 to 4 weeks for lab results."
      },
      {
        q: "How long is a Phase I ESA valid for commercial lenders?",
        a: "Under ASTM E1527-21 standards, a Phase I ESA must generally be dated within 180 days prior to the property closing date to preserve All Appropriate Inquiries liability protection."
      }
    ],
    propertyType: ["commercial", "land-acreage"],
    audience: ["investors", "land-buyers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["brandon-i75", "downtown-bayshore", "central-florida-corridor"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-florida",
      "buying-vacant-land-central-florida-zoning-utilities",
      "commercial-bpo-vs-appraisal-florida"
    ],
    relatedServiceRoutes: ["/commercial-advisory-guide", "/hub/commercial-tampa-bay", "/hub/land-acreage-central-florida"],
    relatedGlossarySlugs: ["estoppel-certificate", "1031-exchange", "bpo"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
    status: "live"
  },
  {
    slug: "letter-of-intent",
    term: "Commercial Letter of Intent (LOI)",
    shortTitle: "Letter of Intent (LOI)",
    aliases: ["Letter of Intent", "LOI"],
    category: "Commercial & Investment",
    quickAnswer:
      "A Letter of Intent (LOI) is a short, usually non-binding business summary outlining proposed price, lease rate, TI allowance, inspection period, and closing timeline before attorneys draft a formal commercial contract or lease.",
    definition: [
      "Residential deals jump straight into a standard Florida FAR/BAR contract. Commercial sales and leases almost always start with a 1 to 3 page Letter of Intent first.",
      "An LOI lets both parties confirm big-ticket economics—purchase price, earnest money, 30-to-45-day due diligence window, rent bumps, NNN structure, and personal guarantees—without racking up thousands in legal drafting fees prematurely.",
      "Wait for the signed LOI to guide attorney drafting, and confirm any confidentiality or exclusivity paragraphs are clearly labeled if intended to be binding."
    ],
    tampaBayExample:
      "Before leasing a 4,200 sq. ft. showroom in South Tampa or putting an industrial warehouse under contract near Port Tampa, a clear LOI locks in base rent, 3% annual escalations, TI Allowance, and inspection windows in 48 hours.",
    howWeHandleIt:
      "We draft clean, market-tested commercial LOIs tailored to Tampa Bay sellers and landlords so your attorneys step into clear business terms with zero wasted motion.",
    faqs: [
      {
        q: "Is a Commercial Letter of Intent legally binding in Florida?",
        a: "Usually an LOI explicitly states that business terms are non-binding until a formal Purchase Agreement or Lease is signed, though exclusivity and confidentiality clauses can be drafted as binding."
      },
      {
        q: "Do I pay earnest money when submitting a commercial LOI?",
        a: "No. Earnest money or initial security deposits are normally wired to the title company or escrow agent only after the formal Purchase Agreement or Lease is signed."
      }
    ],
    propertyType: ["commercial", "land-acreage"],
    audience: ["investors", "land-buyers", "home-sellers"],
    county: ["hillsborough", "pinellas", "pasco", "polk"],
    corridor: ["downtown-bayshore", "st-petersburg-waterfront", "brandon-i75"],
    relatedGuideSlugs: [
      "commercial-real-estate-investing-florida",
      "how-triple-net-nnn-leases-work-florida"
    ],
    relatedServiceRoutes: ["/tools/commercial-rent-calculator", "/commercial-advisory-guide", "/hub/commercial-tampa-bay"],
    relatedGlossarySlugs: ["ti-allowance", "nnn-lease", "estoppel-certificate", "cap-rate"],
    publishedAt: "2026-11-17T11:35:00-05:00",
    updatedAt: "2026-11-17T11:35:00-05:00",
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

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
      "A Community Development District (CDD) is a local taxing district in newer Florida neighborhoods. It pays for new roads, water pipes, ponds, and pools. Homeowners pay this fee once a year inside their county property tax bill.",
    definition: [
      "Under Florida Statutes Chapter 190, builders use a CDD to sell tax-free bonds. Those bonds pay for roads, lakes, utility lines, and clubhouses before houses are built.",
      "The yearly CDD fee has two parts. Debt Service pays down the road and pool bond over 20 to 30 years. Operations and Maintenance (O&M) pays for daily gate, grass, and pool upkeep.",
      "Unlike monthly HOA checks, a CDD appears on your November county tax bill. Your mortgage lender splits it into your monthly escrow payment."
    ],
    tampaBayExample:
      "In Wesley Chapel and New Tampa neighborhoods like Epperson, Mirada, or K-Bar Ranch, a typical home CDD runs $1,600 to $3,400 per year. Some sellers pay off the bond early so you only owe the yearly upkeep part.",
    howWeHandleIt:
      "Before you make an offer, Mark and Rachael pull the exact county tax roll for that lot. You see the yearly CDD bill and any remaining bond payoff side by side.",
    faqs: [
      {
        q: "Does a CDD fee ever end?",
        a: "Yes and no. The bond payment stops once paid off after 20 to 30 years, or at closing. The smaller upkeep fee stays active to run the gates, ponds, and pools."
      },
      {
        q: "Can CDD fees go up over time?",
        a: "The bond payment is usually fixed each year. The upkeep budget can rise slightly as pool care, staff, and insurance costs change."
      },
      {
        q: "Is a CDD fee tax-deductible?",
        a: "The IRS does not treat most local CDD charges as deductible property taxes on personal returns. Check your own tax file with a Florida CPA."
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
      "An HOA (Homeowners Association) or COA (Condominium Association) is a group that runs shared neighborhood spaces and sets house rules. In Florida, HOAs follow Statute Chapter 720, and condos follow Chapter 718.",
    definition: [
      "HOAs protect street appeal and pay for front gates, ponds, and parks. They enforce rules on paint colors, fences, parking, and rentals.",
      "Condo groups (COAs) take on even more duty. They usually insure the outside walls and roof while saving cash for future big repairs.",
      "Under Florida safety rules passed after Surfside, condos three stories and taller must fund Structural Integrity Reserve Studies (SIRS). That rule raised monthly condo dues across Tampa Bay."
    ],
    tampaBayExample:
      "In Carrollwood and Northdale, older single-family streets often have $200 to $600 yearly HOAs or none at all. Gated Brandon townhomes or St. Pete waterfront condos charge higher monthly dues to cover roofs, flood policies, and seawalls.",
    howWeHandleIt:
      "We pull the full budget, reserve report, inspection summary, and rental rules right away. Every offer keeps a clean legal review window so you can walk away if rules or costs look wrong.",
    faqs: [
      {
        q: "How many days do Florida buyers get to check condo or HOA rules?",
        a: "Condo resale buyers get three business days after getting full condo rules to cancel for any reason. Most HOA sales use set disclosure timelines in the contract."
      },
      {
        q: "Can a condo group add a special assessment right before closing?",
        a: "Yes. Under standard Florida contracts, sellers usually pay charges passed before closing. We also spell out who pays pending payments up front."
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
      "A 1031 exchange lets investors pause federal capital gains tax when selling a business or rental property. You roll all sale money into another U.S. investment property within 180 days.",
    definition: [
      "Under IRS Code Section 1031, both properties must be held for business or rental income. Primary homes and quick fix-and-flips do not count.",
      "A Qualified Intermediary (QI) must hold your cash at closing. The seller can never touch the sale money directly.",
      "Two strict clocks start on closing day. You get 45 days to name target properties in writing, and 180 days total to close."
    ],
    tampaBayExample:
      "An owner selling a Brandon medical suite or a St. Pete duplex can roll equity tax-free into NNN retail stores or commercial land. This move keeps 20% to 25% more capital working for you.",
    howWeHandleIt:
      "Mark and Rachael hunt for target commercial or land deals before your building even lists. We also pair you with trusted Florida Qualified Intermediaries so Day 45 never catches you off guard.",
    faqs: [
      {
        q: "Do the 45-day or 180-day 1031 deadlines skip weekends?",
        a: "No. Both rules count every calendar day, including weekends and holidays. Only official IRS storm relief orders extend them."
      },
      {
        q: "Can you swap vacant land for a commercial building?",
        a: "Yes. Under IRS rules, almost any U.S. rental or business real estate swaps cleanly with raw land, warehouses, shops, or apartments."
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
      "A Broker Price Opinion (BPO) is a written value check prepared by an active real estate broker. It studies nearby sales, rent income, and current demand faster and cheaper than a bank appraisal.",
    definition: [
      "Home sellers use a Comparative Market Analysis (CMA), while commercial owners, banks, and lawyers often request a BPO. It prices offices, warehouses, churches, and rural land.",
      "A sharp commercial BPO looks at closed sales, cap rates, lease end dates, zoning rules, and traffic counts. It also checks wet spots and pond needs.",
      "Under Florida law, brokers clearly label every BPO as an opinion of market value. It is not a certified appraisal for a bank loan."
    ],
    tampaBayExample:
      "For an estate selling 15 acres near Frostproof or a store owner in Brandon, a BPO helps set smart rent or sale prices within days.",
    howWeHandleIt:
      "Mark and Rachael write clear, data-backed BPO reports for Tampa Bay and Central Florida owners planning a sale, loan change, or 1031 swap. We blend real buyer calls with solid local comps.",
    faqs: [
      {
        q: "How is a BPO different from a bank appraisal?",
        a: "A state-licensed appraiser writes an appraisal for loans, tax court, or legal disputes. Active brokers write a BPO to show real buyer demand and asking-price strategy."
      },
      {
        q: "What should I send for an accurate commercial BPO?",
        a: "Send your current rent roll, last 12 months of bills, latest tax notice, and any site survey or Phase I report."
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
      "In a Triple Net (NNN) lease, the business tenant pays base rent plus property taxes, building insurance, and shared upkeep (CAM). The owner keeps steady net rent with low daily work.",
    definition: [
      "Commercial leases split building bills in clear ways. In a Gross Lease, the owner pays bills out of rent; in a NNN Lease, the tenant pays those three bills directly.",
      "Pure NNN leases also pass roof and wall repairs onto the tenant. Big national drugstores, food chains, and clinics use this setup most often.",
      "Because tenants cover operating bills, NNN income compares cleanly across cities using Cap Rate math."
    ],
    tampaBayExample:
      "Along busy roads like State Road 60 in Brandon, Dale Mabry in Carrollwood, or US-19 in Pinellas, retail and dental buildings often sign 10-year NNN leases with 2% to 3% yearly rent raises.",
    howWeHandleIt:
      "Before you buy or sell a leased building, we read every word of the lease. We check roof terms, Florida wind insurance caps, and who backs the tenant promise.",
    faqs: [
      {
        q: "Who pays for a new roof in a Florida NNN lease?",
        a: "Many 'modified NNN' leases leave roof and paving work with the owner while tenants pay CAM and insurance. Only an 'absolute NNN' shifts roof costs onto the tenant."
      },
      {
        q: "How does Florida building insurance affect NNN tenants?",
        a: "Higher coastal wind bills in Hillsborough and Pinellas raise a tenant's total rent bill. Smart landlords track total tenant cost before pushing base rent up."
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
      "A 4-Point Inspection checks four big house parts: the roof, power panel, water pipes, and AC unit. Florida insurers ask for it on most homes over 20 to 30 years old.",
    definition: [
      "A full home check takes two or three hours and tests appliances, sinks, and paint. A 4-Point takes 30 to 45 minutes and uses dated photos for your insurer.",
      "Insurance teams look closely for old gray pipes, banned breaker boxes, cloth wire, or roofs with under 3 to 5 years of life left.",
      "Passing a clean 4-Point opens up lower-cost Florida home policies instead of pricey backup plans."
    ],
    tampaBayExample:
      "In 1970s to 1990s Carrollwood, Brandon, and St. Pete homes, swapping an old electric panel or worn pipes before listing can save buyers $1,500 to $3,000 a year on insurance.",
    howWeHandleIt:
      "We help sellers in older Tampa Bay houses run an early 4-Point check so buyer loans stay safe. For buyers, we book the general check, 4-Point, and Wind Mitigation on Day 1.",
    faqs: [
      {
        q: "At what age do Florida insurers want a 4-Point report?",
        a: "Most companies ask for a 4-Point once a house turns 20 to 30 years old. Some tighten that rule to 15 years for older shingle roofs."
      },
      {
        q: "How long does a 4-Point report stay valid?",
        a: "Most Florida insurers accept a 4-Point for 12 months, as long as no storm damage or big repairs happen after the check."
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
      "A Wind Mitigation Inspection checks storm-safe parts of your home—roof shape, nail patterns, roof clips, peel-and-stick barriers, and impact glass—on Florida form OIR-B1-1802. Insurers apply steep required discounts from it.",
    definition: [
      "Every Florida home policy splits fire risk from wind risk. The wind half often makes up over half of a Tampa Bay bill.",
      "A licensed inspector steps into your attic to shoot photos of roof straps and clips. They also check roof age, deck nails, and window storm gear.",
      "Small upgrades—like third-nail clips or storm garage doors—often pay for themselves in just one or two years of insurance savings."
    ],
    tampaBayExample:
      "A house in Carrollwood or St. Pete with a hip roof, newer roof nails, double straps, and storm glass often saves $1,200 to $3,800 per year over an older unverified house next door.",
    howWeHandleIt:
      "We order your Wind Mitigation report alongside the main home check. That lets your insurance agent run real carrier quotes before your inspection period ends.",
    faqs: [
      {
        q: "How long does a Wind Mitigation report stay good in Florida?",
        a: "Most insurers honor a Wind Mitigation report for up to 5 years unless you replace the roof or change doors and windows."
      },
      {
        q: "Which roof and window items give the biggest wind discounts?",
        a: "A full hip roof shape, strong attic clips, peel-and-stick roof underlay, and rated storm glass on all windows and doors save the most money."
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
      "Florida Homestead lowers your primary home's tax value by up to $50,000 and caps yearly tax value hikes at 3%. Save Our Homes Portability lets you move up to $500,000 of saved tax value to your next Florida home.",
    definition: [
      "To get Homestead for next year, you must own and live in the home on January 1. Then file with your county Property Appraiser by March 1.",
      "As Tampa Bay prices rise, market value grows faster than your 3% capped tax value. That gap is your Save Our Homes (SOH) benefit.",
      "When you sell and move to another Florida home within three tax years, Form DR-501T shifts up to $500,000 of those savings onto your new tax bill."
    ],
    tampaBayExample:
      "A Brandon or St. Pete owner with $220,000 in Save Our Homes benefit can buy a $750,000 Carrollwood house and cut roughly $3,500 to $4,200 a year off their new tax bill.",
    howWeHandleIt:
      "We help current Florida owners check their portability math before shopping. For out-of-state buyers, we warn them early so a seller's low old tax bill never misleads their budget.",
    faqs: [
      {
        q: "How much time do I have to move Florida Homestead savings?",
        a: "You get up to three January 1st tax dates from leaving your old homestead to claim a new Florida homestead and file portability."
      },
      {
        q: "Why do county taxes jump the year after I buy an older Florida house?",
        a: "When a home changes hands, the seller's old tax cap clears out. The county resets the tax value closer to your new purchase price the next January."
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
      "An Elevation Certificate is an official survey signed by a Florida surveyor. It shows how high your lowest floor sits compared to FEMA's Base Flood Elevation (BFE), which drives Tampa Bay flood rates.",
    definition: [
      "Homes inside high-risk FEMA flood zones (Zone AE or VE) must carry flood coverage if you take out a standard bank mortgage.",
      "Under FEMA Risk Rating 2.0, insurers price each policy by lowest floor height, distance to water, slab vs. stilt build, and smart flood vents.",
      "A house built 2 to 4 feet above flood level often costs a fraction to insure compared to a ground-level 1960s ranch down the block."
    ],
    tampaBayExample:
      "In St. Pete neighborhoods like Bahama Shores, Snell Isle, and Shore Acres, buyers compare low 1960s ranch homes under FEMA's 50% Rule against newer block homes raised above flood code.",
    howWeHandleIt:
      "Before you bid on a coastal or creek-side home, we check its latest Elevation Certificate and run both NFIP and private flood quotes right away.",
    faqs: [
      {
        q: "Do all Pinellas or Hillsborough waterfront homes need flood policies?",
        a: "If a home has a bank loan and sits in Zone AE or VE, lenders require flood insurance. Many upland Zone X owners carry low-cost private policies too for heavy storms."
      },
      {
        q: "What is FEMA's 50% Rule?",
        a: "If repairs on an older ground-level Zone AE house pass 50% of the building's value, local rules force owners to raise the whole house to new flood code."
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
      "Florida's Greenbelt law taxes working farm or ranch land—cattle, timber, citrus, or hay—at farm use value rather than developer market price. That rule cuts annual property taxes sharply.",
    definition: [
      "Under Florida Statutes Section 193.461, counties grant farm status only when active farm work runs on January 1. You must also apply by March 1.",
      "Hobby gardens or just putting up a fence will not pass. Owners normally keep cattle leases, timber plans, or crop receipts on file.",
      "Greenbelt status does not lock your land forever. Owners can rezone or build later, though taxes reset the next January once farming stops."
    ],
    tampaBayExample:
      "Landowners in Polk County near Frostproof or Marion County near Fort McCoy use cattle and timber leases to keep yearly taxes tiny while holding open acres long term.",
    howWeHandleIt:
      "Before you buy rural acreage, Mark and Rachael review county Greenbelt files, current pasture leases, well and septic capacity, and Future Land Use maps.",
    faqs: [
      {
        q: "Does a Greenbelt tax break transfer to the new buyer at closing?",
        a: "No. Selling the land clears the prior owner's farm tax status at year-end. New owners must keep farm work active on January 1 and file by March 1."
      },
      {
        q: "How many acres do I need for Florida Greenbelt status?",
        a: "Florida sets no strict minimum acre rule. Each county Property Appraiser checks whether the parcel size and real farm sales reflect a working ranch or farm."
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
      "Cap Rate measures a commercial building's yearly cash return if bought without a loan. Divide yearly Net Operating Income (NOI) by the asking price to compare retail, medical, office, and warehouse deals.",
    definition: [
      "Cap Rate shows what a commercial asset pays each year on an all-cash buy. A building earning $80,000 NOI at a $1,000,000 price trades at an 8.0% Cap Rate.",
      "Lower Cap Rates (around 5.0% to 6.25%) usually mark national single-tenant NNN brands in top Tampa spots. Higher Cap Rates (7.5% to 9.0%+) often flag multi-tenant centers, older roofs, or shorter leases.",
      "Cap Rate leaves out your bank mortgage payment. Always test both Cap Rate and loan Debt Service Coverage Ratio (DSCR) with your lender before bidding."
    ],
    tampaBayExample:
      "A full Brandon retail center near SR 60 with 3% yearly rent raises might sell near a 6.75% Cap Rate. A Clearwater clinic with two years left on its lease might command an 8.0% Cap Rate.",
    howWeHandleIt:
      "Mark and Rachael check real T-12 rent rolls, strip out wishful vacant numbers, test rising Florida wind bills, and run Cap Rate math before you offer.",
    faqs: [
      {
        q: "Is a higher Cap Rate always better for a buyer?",
        a: "No. High Cap Rates often come with near-term tenant departures, older roofs, or high repair bills. Lower Cap Rates usually reflect steady national tenants and safer cash flow."
      },
      {
        q: "How do Cap Rate and NOI change sale price?",
        a: "Price equals NOI divided by Cap Rate. Adding $20,000 of real annual NOI at a 7.0% market Cap Rate can add about $285,700 in property value."
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
      "Net Operating Income (NOI) is a commercial building's yearly rent and expense payouts minus operating bills. It leaves out bank loans, income tax, and big roof or buildout bills.",
    definition: [
      "Buyers and lenders compute NOI by taking rent plus NNN bills, subtracting empty units, and deducting taxes, insurance, yard care, and repairs.",
      "NOI leaves out loan payments, depreciation, and big tenant buildouts. That way two buyers with different loans still compare the exact same building NOI.",
      "Checking Florida NOI means adjusting old tax bills to post-sale taxes and pulling fresh commercial wind insurance quotes."
    ],
    tampaBayExample:
      "If a small Fletcher Avenue office plaza collects $180,000 in rent and NNN fees while paying $58,000 in taxes, insurance, and lawn bills, its real NOI is $122,000.",
    howWeHandleIt:
      "When building a commercial BPO or buyer cash sheet, we check every seller line item so higher post-sale taxes and insurance never wipe out your return.",
    faqs: [
      {
        q: "How does NOI differ from cash flow?",
        a: "NOI tracks building profit before your bank loan. Pre-tax cash flow is what stays in your pocket after paying monthly loan principal and interest."
      },
      {
        q: "Can sellers count empty rooms to pump up asking NOI?",
        a: "No bank or smart buyer pays top dollar for empty rooms. Lenders base loans on real signed leases and Trailing-12 (T-12) rent collected."
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
      "Common Area Maintenance (CAM) covers shared center bills—parking lights, lawn care, trash, and outside cleaning. Commercial tenants pay their share on top of base rent.",
    definition: [
      "In retail centers, medical parks, and flex warehouses, tenants pay their square-foot share of shared center upkeep.",
      "Most owners collect a monthly CAM budget up front. Then each spring they match actual bills and refund or bill the gap.",
      "Always check the CAM exclusions paragraph in any draft lease. Strong tenant terms cap controllable hikes at 3% to 5% and keep new roofs off the CAM bill."
    ],
    tampaBayExample:
      "A 2,400 sq. ft. Carrollwood clinic inside a 24,000 sq. ft. plaza holds a 10% share. If plaza CAM, tax, and insurance run $8.50/sq. ft. yearly, that adds $1,700 per month to rent.",
    howWeHandleIt:
      "We map out NNN and CAM lease costs side by side before offers go out. Tenants see their full monthly check, and buyers check owner cost recovery.",
    faqs: [
      {
        q: "What splits controllable CAM from non-controllable CAM?",
        a: "Controllable CAM covers vendor jobs like lawn care, sweeping, and pressure washing. Non-controllable bills are property taxes, wind insurance, and city water."
      },
      {
        q: "Can a landlord add a management admin fee inside CAM?",
        a: "Yes. Many commercial leases allow a 10% to 15% admin fee inside CAM unless your team negotiates a cap or removes it early."
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
      "A Modified Gross lease splits building bills between owner and tenant. The owner often pays year-one taxes and insurance, while the tenant pays electric, suite cleaning, and bill jumps later on.",
    definition: [
      "In a pure Triple Net (NNN) lease, tenants pay every building bill directly. In a Full-Service Gross (FSG) lease, one flat rent rate covers taxes, insurance, CAM, and daily utilities.",
      "A Modified Gross lease lands right in the middle. Owners usually pay year-one taxes and insurance while tenants cover power, inside cleaning, and future bill increases.",
      "Before picking an office or warehouse, turn NNN, Modified Gross, and Full-Service quotes into one total monthly check so a low headline rent never surprises you."
    ],
    tampaBayExample:
      "Downtown Tampa office towers often quote Full-Service Gross rent covering cleaning and daytime AC. US 301 flex warehouses often use Modified Gross rent where tenants add only electric and water.",
    howWeHandleIt:
      "Use our Commercial Rent Calculator or ask Mark and Rachael to put every lease quote into one simple monthly sheet before you tour.",
    faqs: [
      {
        q: "What is a Base Year Expense Stop in a Modified Gross lease?",
        a: "The owner pays building bills up to the year-one dollar amount. From year two on, tenants pay their share of any cost rise above year one."
      },
      {
        q: "Which lease style do smaller Florida office tenants pick most?",
        a: "Small teams often pick Modified Gross or Full-Service leases because flat monthly bills guard them against sudden wind insurance jumps."
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
      "A Tenant Improvement (TI) Allowance is buildout money per square foot that a landlord gives a tenant. It helps pay for walls, floors, plumbing, and rooms before opening day.",
    definition: [
      "Raw retail or office shells rarely match a clinic, restaurant, or local office out of the box. Owners often give $20 to $45 per square foot toward walls, paint, flooring, and restrooms.",
      "Some owners offer a Turnkey Buildout instead. There, the landlord hires the crew and finishes the suite to a signed floorplan.",
      "Always check if working AC units, sprinklers, and main electric panels are already ready before spending your TI budget."
    ],
    tampaBayExample:
      "A growing therapy office leasing 3,000 sq. ft. in Wesley Chapel might get $35/sq. ft. in TI funds ($105,000) for exam rooms plus 90 rent-free buildout days.",
    howWeHandleIt:
      "During Letter of Intent talks, Mark and Rachael get contractor pricing early. We make sure your TI cash, free rent, and opening date match real county permit timing.",
    faqs: [
      {
        q: "Does a bigger TI Allowance raise monthly base rent?",
        a: "Usually yes. Landlords spread larger buildout grants across your lease years, so balance startup cash needs against lower monthly rent."
      },
      {
        q: "When do landlords pay out TI Allowance money?",
        a: "Most owners pay once work wraps up, contractors sign lien waivers, and the county grants your Certificate of Occupancy."
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
      "An Estoppel Certificate is a signed letter from a current business tenant before a building sells. It confirms exact monthly rent, deposits, lease end dates, and confirms no hidden disputes exist.",
    definition: [
      "When buying a retail center, office building, or warehouse, a seller's rent sheet is not enough proof for a buyer or bank.",
      "Before closing, each tenant signs an Estoppel form confirming monthly rent, prepaid cash, CAM share, renewal dates, and any side deals.",
      "Once signed, the tenant cannot turn around later and claim lower rent or secret credits against the new building owner."
    ],
    tampaBayExample:
      "Before buying a multi-tenant center in Pinellas Park, Tenant Estoppels might show one shop claiming a roof leak credit or buyout right—letting us fix it before closing day.",
    howWeHandleIt:
      "We write commercial contracts so clean, lender-approved Tenant Estoppels covering 80% to 100% of leased space must arrive before you have to close.",
    faqs: [
      {
        q: "How fast must business tenants return an Estoppel Certificate?",
        a: "Most leases give tenants 10 to 15 days after written notice to sign and return the Estoppel letter."
      },
      {
        q: "What is an SNDA signed alongside an Estoppel?",
        a: "An SNDA agreement sets the legal priority between the buyer's bank loan and the tenant's lease so good-standing tenants stay protected."
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
      "A Phase I Environmental Check (ASTM E1527-21) reviews past records and site history on commercial or empty land. It spots pollution risks before a buyer closes.",
    definition: [
      "Almost every SBA 504, SBA 7(a), and bank commercial loan asks for a fresh Phase I report from a vetted engineer.",
      "Engineers study old aerial photos, city logs, dry-cleaner files, buried tank records, and nearby spills without digging soil yet.",
      "If the Phase I flags a site worry, buyers request a Phase II lab test of soil and water before waiving their inspection period."
    ],
    tampaBayExample:
      "Buying an older corner on Nebraska Avenue or US 19 near an old repair shop or cleaner takes a clean Phase I check so buyers stay legally protected.",
    howWeHandleIt:
      "We write 30 to 45 day check windows into commercial and land deals. Trusted Florida environmental engineers stay on call to move fast.",
    faqs: [
      {
        q: "How long does a Florida Phase I site check take?",
        a: "A standard Phase I report takes 2 to 3 weeks. If lab soil borings are needed under Phase II, add 3 to 4 weeks."
      },
      {
        q: "How long does a Phase I report stay fresh for bank loans?",
        a: "Under ASTM E1527-21 rules, your Phase I report generally must be dated within 180 days before closing day."
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
      "A Letter of Intent (LOI) is a short, mostly non-binding business summary before attorneys draft a final lease or sale contract. It sketches price, rent, TI cash, inspection days, and closing dates.",
    definition: [
      "Home sales jump right into a standard Florida contract. Commercial buys and leases almost always start with a 1 to 3 page Letter of Intent first.",
      "An LOI lets both sides agree on price, earnest money, 30-to-45-day check windows, rent bumps, and NNN bills before paying big attorney fees.",
      "Let the signed LOI guide final attorney edits, and mark exclusivity or privacy rules clearly if you want those lines binding."
    ],
    tampaBayExample:
      "Before leasing a 4,200 sq. ft. showroom in South Tampa or buying a warehouse near Port Tampa, a clear LOI locks rent, 3% raises, and TI dollars in 48 hours.",
    howWeHandleIt:
      "We draft clean commercial LOIs built for Tampa Bay owners and landlords so attorneys step into crystal-clear terms right from day one.",
    faqs: [
      {
        q: "Is a Florida commercial Letter of Intent legally binding?",
        a: "Most LOIs say business price and rent terms stay non-binding until a formal Lease or Sale Contract is signed, though privacy lines can be binding."
      },
      {
        q: "Do I wire earnest money with a commercial LOI?",
        a: "No. Escrow deposits and security checks are wired only after both sides sign the final Sale Contract or Lease."
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

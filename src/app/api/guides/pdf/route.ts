import { NextResponse } from "next/server";
import {
  ALL_GUIDES_AND_QUESTIONS,
  AREAS,
  ARTICLES,
} from "@/data/knowledgeHub";
import { buildGoogleMapsRouteUrl, LIVE_GUIDED_TOURS } from "@/data/tours";
import {
  BrandedPdfInput,
  generateBrandedGuidePdf,
  PdfWorkbookState,
} from "@/lib/pdfBuilder";

function formatShortDate(iso?: string): string {
  if (!iso) return "Nov 17, 2026";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Nov 17, 2026";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getStandaloneGuidePayload(
  slug: string,
  workbook?: PdfWorkbookState
): BrandedPdfInput | null {
  if (slug === "residential-advisory-guide") {
    return {
      slug,
      title: "Tampa Bay Residential & Luxury Home Advisory Guide",
      subtitle:
        "How Rachael Garnett & Mark Davis help buyers and sellers navigate homes, waterfront estates, condos, and new construction across Tampa Bay.",
      category: "Residential Advisory Guide",
      authorLine: "Rachael Garnett (FL Lic #3378601) & Mark Davis (FL Lic #3209459)",
      createdDateLabel: "Nov 17, 2026",
      quickAnswer:
        "Buying or selling a Tampa Bay home smoothly starts with checking real monthly escrow costs, roof and 4-Point insurance rules, flood elevations, and neighborhood HOA or CDD terms before signing any contract.",
      keyTakeaways: [
        "Set your must-haves first: commute drive times, flood zones, yard size, and school boundaries.",
        "Always check HOA dues and annual CDD tax bills side by side before picking a neighborhood.",
        "Verify roof permit age, breaker panels, and Wind Mitigation savings during week one.",
        "Bring your own buyer advisor before touring new-construction builder model centers.",
      ],
      sections: [
        {
          heading: "Step 01 — Listening to What Matters Most to You",
          body: "We begin with a simple talk about your daily life: preferred neighborhoods, commute limits, boat slip depth, lot privacy, or downsizing convenience across St. Petersburg, Tampa, Carrollwood, and Pasco.",
        },
        {
          heading: "Step 02 — Touring Neighborhoods & Comparing Total Costs",
          body: "Alongside Stellar MLS homes, we show off-market opportunities, builder rate buydown incentives, and zero-CDD resale pockets so every monthly payment number is clear upfront.",
        },
        {
          heading: "Step 03 — Clean Offers & Deposit Protection",
          body: "We structure Florida FAR/BAR As-Is or Standard offers with clear inspection windows, financing contingencies, and condo/HOA statutory review protections.",
        },
        {
          heading: "Step 04 — Deep Checks on Roofs, Flood Zones, Docks & HOAs",
          body: "For older suburbs like Carrollwood and Northdale, we arrange early 4-Point and Wind Mitigation checks. For St. Pete bayfront homes, we review Elevation Certificates and dive seawalls. For new builds, we audit builder warranties and CDD bonds.",
        },
        {
          heading: "Step 05 — Closing & Filing Homestead Portability",
          body: "We coordinate closely with your lender and title team through final walk-through and remind primary-residence buyers how to file Florida Homestead and DR-501T Portability by March 1.",
        },
      ],
      howWeHandleIt:
        "You never get handed off to an unknown junior assistant. Mark Davis and Rachael Garnett work together directly with you from neighborhood scouting to closing day.",
      sources: [
        "Florida Statutes Chapters 718 (Condos) & 720 (HOAs)",
        "Florida Department of Revenue Form DR-501T (Homestead Portability)",
        "FEMA National Flood Insurance Program Risk Rating 2.0",
      ],
      workbook,
    };
  }

  if (slug === "commercial-advisory-guide") {
    return {
      slug,
      title: "Tampa Bay Commercial & Land Advisory Guide",
      subtitle:
        "Our practical process for buying, selling, pricing (BPO), or exchanging NNN retail, mixed-use buildings, and Central Florida acreage.",
      category: "Commercial & Land Guide",
      authorLine: "Mark Davis (FL Lic #3209459) & Rachael Garnett (FL Lic #3378601)",
      createdDateLabel: "Nov 17, 2026",
      quickAnswer:
        "Commercial buildings and land trade on verified Net Operating Income (NOI), lease pass-through structure (NNN vs Modified Gross), zoning rules, and environmental readiness—not automated online estimates.",
      keyTakeaways: [
        "Business owners using 51%+ of a building often qualify for 10%-down SBA 504 fixed loans.",
        "Always normalize NNN, CAM, insurance, and tax pass-throughs before comparing lease quotes.",
        "Order boundary surveys, wetland overlays, and Phase I ESAs inside a clear 30–45 day feasibility period.",
        "Set up your IRS 1031 Qualified Intermediary before closing your relinquished asset.",
      ],
      sections: [
        {
          heading: "Step 01 — Clarifying Investment, SBA or 1031 Goals",
          body: "We map out whether you need an owner-occupied SBA office like 126 Ridgewood Ave in Brandon, a passive Triple Net (NNN) building, or highway land along US-27/US-98 in Central Florida.",
        },
        {
          heading: "Step 02 — Auditing NOI, Cap Rates & Zoning Rules",
          body: "We strip out padded pro-forma rents, check trailing 12-month operating numbers, model post-sale property taxes and commercial wind insurance, and confirm county parking and use permits.",
        },
        {
          heading: "Step 03 — BPO Valuation & Multi-Platform Exposure",
          body: "Sellers receive a data-backed Broker Price Opinion (BPO) followed by syndication across Stellar MLS, Crexi, LoopNet, CoStar, and private Tampa Bay buyer lists.",
        },
        {
          heading: "Step 04 — Clean LOIs & Due Diligence Contracts",
          body: "We negotiate tight Letters of Intent (LOIs) locking price, TI allowance or cap-rate targets, Estoppel Certificates, and Phase I ESA inspection windows before heavy legal billing begins.",
        },
        {
          heading: "Step 05 — Closing Through Permitting, Survey & 1031 Deadlines",
          body: "We track county zoning confirmations, utility meters, Estoppels, and strict IRS 45-day and 180-day 1031 dates all the way to closing.",
        },
      ],
      howWeHandleIt:
        "Mark Davis brings hands-on underwriting and local zoning fluency alongside Rachael Garnett so commercial owners and buyers make clear, fast moves across Tampa Bay.",
      sources: [
        "Florida Statutes Section 475.612 (BPO Standards)",
        "IRS Section 1031 (45/180-Day Like-Kind Rules)",
        "U.S. Small Business Administration (SBA 504 Rules)",
      ],
      workbook,
    };
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      slug,
      type,
      contentType,
      workbook,
      customPayload,
    }: {
      slug?: string;
      type?: string;
      contentType?: string;
      workbook?: PdfWorkbookState;
      customPayload?: Partial<BrandedPdfInput>;
    } = body || {};

    const resolvedType = type || contentType;
    let pdfInput: BrandedPdfInput | null = null;

    if (slug && (resolvedType === "tour" || !resolvedType)) {
      const tour = LIVE_GUIDED_TOURS.find((t) => t.slug === slug);
      if (tour) {
        pdfInput = {
          slug: tour.slug,
          title: tour.title,
          subtitle: tour.tagline,
          category: tour.badge,
          authorLine: `${tour.host.name} (${tour.host.license}) & ${tour.host.coHostName} (${tour.host.coHostLicense})`,
          createdDateLabel: formatShortDate(tour.updatedAt || tour.publishedAt),
          quickAnswer: tour.quickAnswer,
          keyTakeaways: tour.checklistPrompts,
          sections: tour.stops.map((s) => ({
            heading: s.name,
            metaLine: `${s.driveFromPrev}  |  Explore: ${s.stopDuration}  |  ${s.address}`,
            body: `${s.hostNote} ${s.snippet}`,
            bullets: [
              `Zoning, HOA/CDD & Cost Watch: ${s.zoningOrCostNote}`,
              `Nearby Schools & Landmarks: ${s.landmarksAndSchools}`,
            ],
          })),
          howWeHandleIt: `${tour.howWeHandleIt} ${tour.host.inviteNote}`,
          sources: [
            "Davis & Garnett Local Route Curation",
            `Google Maps Route: ${buildGoogleMapsRouteUrl(tour.stops)}`,
          ],
          routeMeta: {
            duration: tour.duration,
            distanceSummary: tour.distanceSummary,
            startAddress: tour.startAddress,
            routeDirectionNote: tour.routeDirectionNote,
          },
          workbook,
        };
      }
    }

    if (!pdfInput && slug && (resolvedType === "area" || !resolvedType)) {
      const area = AREAS.find((a) => a.slug === slug);
      if (area) {
        pdfInput = {
          slug: area.slug,
          title: `${area.name} — Neighborhood Guide`,
          subtitle: area.tagline,
          category: `Area Guide • ${area.county}`,
          authorLine: "Mark Davis (FL Lic #3209459) & Rachael Garnett (FL Lic #3378601)",
          createdDateLabel: formatShortDate(area.updatedAt || area.publishedAt),
          quickAnswer: area.quickAnswer || area.overview,
          keyTakeaways: area.topNeighborhoods.map((n) => `Key Enclave to Drive: ${n}`),
          sections: area.sections.map((s) => ({
            heading: s.heading,
            body: s.body,
            bullets: s.bullets,
          })),
          howWeHandleIt: area.howWeHandleIt,
          sources: area.sources?.map((s) => s.label),
          workbook,
        };
      }
    }

    if (!pdfInput && slug) {
      const item = ALL_GUIDES_AND_QUESTIONS.find((g) => g.slug === slug);
      if (item) {
        pdfInput = {
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle,
          category: item.category,
          authorLine: `${item.author.name} (${item.author.license}) — Davis & Garnett`,
          createdDateLabel: formatShortDate(item.updatedAt || item.publishedAt),
          quickAnswer: item.quickAnswer,
          keyTakeaways: item.keyTakeaways,
          sections: item.sections.map((s) => ({
            heading: s.heading,
            body: s.body,
            bullets: s.bullets,
          })),
          howWeHandleIt: item.howWeHandleIt,
          sources: item.sources?.map((s) => s.label),
          workbook,
        };
      }
    }

    if (!pdfInput && slug) {
      const art = ARTICLES.find((a) => a.slug === slug);
      if (art) {
        pdfInput = {
          slug: art.slug,
          title: art.title,
          subtitle: art.summary,
          category: art.category,
          authorLine: `${art.author.name} (${art.author.license}) — Davis & Garnett`,
          createdDateLabel: formatShortDate(art.updatedAt || art.publishedAt),
          quickAnswer: art.quickAnswer,
          keyTakeaways: art.keyTakeaways,
          sections: art.sections.map((s) => ({
            heading: s.heading,
            body: s.body,
            bullets: s.bullets,
          })),
          howWeHandleIt: art.howWeHandleIt,
          sources: art.sources?.map((s) => s.label),
          workbook,
        };
      }
    }

    if (!pdfInput && slug) {
      pdfInput = getStandaloneGuidePayload(slug, workbook);
    }

    if (!pdfInput && customPayload?.title && customPayload?.sections?.length) {
      pdfInput = {
        slug: slug || "davis-garnett-guide",
        title: customPayload.title,
        subtitle: customPayload.subtitle || "Davis & Garnett Advisory Workbook",
        category: customPayload.category || "Tampa Bay Real Estate Guide",
        authorLine:
          customPayload.authorLine ||
          "Mark Davis (FL Lic #3209459) & Rachael Garnett (FL Lic #3378601)",
        createdDateLabel: customPayload.createdDateLabel || "Nov 17, 2026",
        quickAnswer: customPayload.quickAnswer,
        keyTakeaways: customPayload.keyTakeaways || [],
        sections: customPayload.sections,
        howWeHandleIt: customPayload.howWeHandleIt,
        sources: customPayload.sources,
        workbook,
      };
    }

    if (!pdfInput) {
      return NextResponse.json({ error: "Guide or tour not found" }, { status: 404 });
    }

    const pdfBytes = await generateBrandedGuidePdf(pdfInput);
    const safeFileName = (pdfInput.slug || "davis-garnett-guide").replace(/[^a-z0-9-_]/gi, "-");

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}-workbook.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Branded PDF generation error:", err);
    return NextResponse.json({ error: "Unable to generate PDF right now" }, { status: 500 });
  }
}


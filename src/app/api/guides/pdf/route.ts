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
import {
  getDiscoveryDeck,
  getPersonalizedMatches,
  type DiscoveryAnswersState,
  type DiscoveryTrack,
} from "@/data/discoveryDecks";

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
  workbook?: PdfWorkbookState,
  discoveryOpts?: {
    mode?: "blank" | "filled";
    state?: DiscoveryAnswersState;
  }
): BrandedPdfInput | null {
  if (
    slug === "residential-advisory-guide" ||
    slug === "residential-getting-started" ||
    slug === "residential-discovery" ||
    slug === "residential"
  ) {
    const deck = getDiscoveryDeck("residential");
    const mode: "blank" | "filled" = discoveryOpts?.mode || (discoveryOpts?.state ? "filled" : "blank");
    const preparedName = discoveryOpts?.state?.contact?.fullName?.trim() || workbook?.preparedForName;
    return {
      slug: "residential-getting-started-guide",
      title: "Tampa Bay Residential Getting Started Guide & Discovery Workbook",
      subtitle:
        "How Rachael Garnett & Mark Davis help buyers and sellers navigate homes, waterfront docks, condos, and new construction—plus our matching 7-card discovery questionnaire.",
      category: "Residential Getting Started Guide",
      pageUrl: "/residential/get-started",
      authorLine: "Rachael Garnett (FL Lic #3378601) & Mark Davis (FL Lic #3209459)",
      createdDateLabel: "Nov 17, 2026",
      quickAnswer:
        "This complete packet includes our 5-step residential guide plus our matching 7-part Client Priorities Worksheet. Complete the steps online at davisgarnettsells.com/residential/get-started or print this PDF to fill in before we meet.",
      keyTakeaways: [
        "Set must-haves first: commute drive times, flood zones, yard privacy, and school lines.",
        "Always check HOA dues and annual CDD tax bills side by side before picking a neighborhood.",
        "Verify roof permit age, breaker panels, and Wind Mitigation savings during week one.",
        "Bring Mark & Rachael before visiting any builder model center so your representation stays protected.",
      ],
      sections: [
        {
          heading: "Step 01 — Listening to What Matters Most to You",
          body: "We begin with a simple conversation about daily life: preferred corridors, commute windows, deepwater dock clearance, lot privacy, or downsizing convenience across St. Petersburg, Tampa, Carrollwood, and Pasco.",
        },
        {
          heading: "Step 02 — Touring Neighborhoods & Comparing Total Monthly Costs",
          body: "Alongside active MLS homes, we review off-market options, builder closing incentives, and zero-CDD resale streets so your full monthly payment number holds zero surprises.",
        },
        {
          heading: "Step 03 — Clean Offers & Deposit Protection",
          body: "We write clear Florida FAR/BAR offers with inspection windows, financing contingencies, and condo or HOA document review rights protecting your escrow deposit.",
        },
        {
          heading: "Step 04 — Deep Checks on Roofs, Flood Zones, Docks & HOAs",
          body: "For classic Carrollwood and Northdale homes, we arrange 4-Point and Wind Mitigation checks early. For waterfront homes, we pull seawall records and Elevation Certificates. For new builds, we audit CDD bond balances.",
        },
        {
          heading: "Step 05 — Smooth Closing & Filing Homestead Portability",
          body: "We coordinate closely with your lender and title team through walk-through day and remind primary buyers how to file Florida Homestead and DR-501T Portability by March 1.",
        },
      ],
      relatedLinks: [
        { label: "Explore Tampa Bay Residential Realtor Hub", url: "/residential" },
        { label: "Complete Residential Getting Started Worksheet Online", url: "/residential/get-started" },
        { label: "Florida Mortgage, HOA & CDD Calculator", url: "/tools/mortgage-calculator" },
        { label: "Seller Net Proceeds Calculator", url: "/tools/seller-net-proceeds" },
      ],
      howWeHandleIt:
        "You never get passed off to an unknown junior assistant. Mark Davis and Rachael Garnett work directly with you from neighborhood discovery all the way to the closing table.",
      sources: [
        "Florida Statutes Chapters 718 (Condos) & 720 (HOAs)",
        "Florida Department of Revenue Form DR-501T (Homestead Portability)",
        "FEMA National Flood Insurance Program Risk Rating 2.0",
      ],
      workbook: {
        ...workbook,
        preparedForName: preparedName,
      },
      discoveryChecklist: {
        mode,
        cards: deck.cards,
        state: discoveryOpts?.state,
        recommendations: discoveryOpts?.state
          ? getPersonalizedMatches("residential", discoveryOpts.state)
          : undefined,
      },
    };
  }

  if (
    slug === "commercial-advisory-guide" ||
    slug === "commercial-getting-started" ||
    slug === "commercial-discovery" ||
    slug === "commercial"
  ) {
    const deck = getDiscoveryDeck("commercial");
    const mode: "blank" | "filled" = discoveryOpts?.mode || (discoveryOpts?.state ? "filled" : "blank");
    const preparedName = discoveryOpts?.state?.contact?.fullName?.trim() || workbook?.preparedForName;
    return {
      slug: "commercial-getting-started-guide",
      title: "Tampa Bay Commercial & Land Getting Started Guide & Workbook",
      subtitle:
        "Our practical process for buying, selling, pricing (BPO), or exchanging NNN retail, mixed-use buildings, and Central Florida acreage—plus our matching 7-card discovery questionnaire.",
      category: "Commercial & Land Getting Started Guide",
      pageUrl: "/commercial/get-started",
      authorLine: "Mark Davis (FL Lic #3209459) & Rachael Garnett (FL Lic #3378601)",
      createdDateLabel: "Nov 17, 2026",
      quickAnswer:
        "This complete packet includes our 5-step commercial and land guide plus our matching 7-part Planning Worksheet. Complete the steps online at davisgarnettsells.com/commercial/get-started or print this PDF to bring to our strategy session.",
      keyTakeaways: [
        "Business owners using 51%+ of a building often qualify for 10%-down SBA 504 fixed loans.",
        "Always normalize NNN, CAM, insurance, and tax pass-throughs before comparing lease quotes.",
        "Order boundary surveys, wetland checks, and Phase I ESAs inside a clear 30–45 day feasibility period.",
        "Set up your IRS 1031 Qualified Intermediary before closing your relinquished asset.",
      ],
      sections: [
        {
          heading: "Step 01 — Clarifying Business, SBA 504, NNN or 1031 Goals",
          body: "We map out whether you need an owner-occupied SBA building, a passive Triple Net (NNN) retail asset, or highway acreage along US-27, US-98, or I-4 in Central Florida.",
        },
        {
          heading: "Step 02 — Auditing NOI, Cap Rates & Zoning Rules",
          body: "We strip out padded pro-forma rents, audit trailing 12-month expenses, recalculate post-sale property taxes and commercial wind coverage, and check county parking and use codes.",
        },
        {
          heading: "Step 03 — BPO Valuation & Multi-Platform Exposure",
          body: "Sellers receive a data-backed Broker Price Opinion (BPO) followed by confidential outreach or full marketing across Stellar MLS, Crexi, LoopNet, and CoStar.",
        },
        {
          heading: "Step 04 — Clean Letters of Intent (LOIs) & Due Diligence",
          body: "We negotiate tight LOIs locking price, lease terms, tenant Estoppel Certificates, and Phase I ESA inspection timelines before heavy legal fees begin.",
        },
        {
          heading: "Step 05 — Closing Through Permitting, Survey & 1031 Deadlines",
          body: "Mark and Rachael track county zoning verifications, utility lines, Estoppel deliveries, and strict IRS Day-45 and Day-180 1031 dates through closing.",
        },
      ],
      relatedLinks: [
        { label: "Explore Tampa Bay Commercial Realtor Hub", url: "/commercial" },
        { label: "Complete Commercial Getting Started Worksheet Online", url: "/commercial/get-started" },
        { label: "Commercial Broker Price Opinions (BPO)", url: "/services/commercial-bpo" },
        { label: "Cap Rate, Rent & 1031 Calculators", url: "/tools/cap-rate-calculator" },
      ],
      howWeHandleIt:
        "Mark Davis brings hands-on commercial underwriting and zoning fluency alongside Rachael Garnett so business owners, investors, and landowners move with clarity.",
      sources: [
        "Florida Statutes Section 475.612 (BPO Standards)",
        "IRS Section 1031 (45/180-Day Like-Kind Rules)",
        "U.S. Small Business Administration (SBA 504 Rules)",
      ],
      workbook: {
        ...workbook,
        preparedForName: preparedName,
      },
      discoveryChecklist: {
        mode,
        cards: deck.cards,
        state: discoveryOpts?.state,
        recommendations: discoveryOpts?.state
          ? getPersonalizedMatches("commercial", discoveryOpts.state)
          : undefined,
      },
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
      track,
      mode,
      discoveryState,
    }: {
      slug?: string;
      type?: string;
      contentType?: string;
      workbook?: PdfWorkbookState;
      customPayload?: Partial<BrandedPdfInput>;
      track?: DiscoveryTrack;
      mode?: "blank" | "filled";
      discoveryState?: DiscoveryAnswersState;
    } = body || {};

    const resolvedType = type || contentType;
    let pdfInput: BrandedPdfInput | null = null;

    if (resolvedType === "discovery-questionnaire" && track) {
      pdfInput = getStandaloneGuidePayload(track, workbook, {
        mode: mode || (discoveryState ? "filled" : "blank"),
        state: discoveryState,
      });
    }

    if (slug && (resolvedType === "tour" || !resolvedType)) {
      const tour = LIVE_GUIDED_TOURS.find((t) => t.slug === slug);
      if (tour) {
        pdfInput = {
          slug: tour.slug,
          title: tour.title,
          subtitle: tour.tagline,
          category: tour.badge,
          pageUrl: `/tours/${tour.slug}`,
          authorLine: `${tour.host.name} (${tour.host.license}) & ${tour.host.coHostName} (${tour.host.coHostLicense})`,
          createdDateLabel: formatShortDate(tour.updatedAt || tour.publishedAt),
          quickAnswer: tour.quickAnswer,
          keyTakeaways: tour.checklistPrompts,
          sections: tour.stops.map((s) => ({
            heading: s.name,
            metaLine: `${s.stopVibe ? `${s.stopVibe}  |  ` : ""}${s.driveFromPrev}  |  Explore: ${s.stopDuration}  |  ${s.address}`,
            mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`,
            body: `${s.hostNote} ${s.snippet}`,
            bullets: [
              ...(s.eatOrSipSpot ? [`Coffee, Lunch & Pitstop: ${s.eatOrSipSpot}`] : []),
              `Developments & Housing Watch: ${s.zoningOrCostNote}`,
              `Shopping, Parks & Landmarks: ${s.landmarksAndSchools}`,
            ],
          })),
          howWeHandleIt: `${tour.howWeHandleIt} ${tour.host.inviteNote}`,
          sources: ["Davis & Garnett Local Route Curation"],
          relatedLinks: [
            { label: "Browse All Tampa Bay Guided Tours", url: "/tours" },
            { label: "Explore Davis & Garnett Knowledge Hub", url: "/knowledge-hub" },
          ],
          routeMeta: {
            duration: tour.duration,
            distanceSummary: tour.distanceSummary,
            startAddress: tour.startAddress,
            routeDirectionNote: tour.routeDirectionNote,
            googleMapsUrl: buildGoogleMapsRouteUrl(tour.stops),
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
          pageUrl: `/knowledge-hub/areas/${area.slug}`,
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
          relatedLinks: area.relatedServiceRoutes?.map((r) => ({ label: r.label, url: r.href })),
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
          pageUrl: `/knowledge-hub/${item.slug}`,
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
          relatedLinks: item.relatedServiceRoutes?.map((r) => ({ label: r.label, url: r.href })),
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
          pageUrl: `/knowledge-hub/articles/${art.slug}`,
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
          relatedLinks: art.relatedServiceRoutes?.map((r) => ({ label: r.label, url: r.href })),
          workbook,
        };
      }
    }

    if (!pdfInput && slug) {
      pdfInput = getStandaloneGuidePayload(slug, workbook, {
        mode: mode || (discoveryState ? "filled" : "blank"),
        state: discoveryState,
      });
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
    const fileSuffix = pdfInput.routeMeta
      ? "tour-guide"
      : pdfInput.discoveryChecklist
      ? `questionnaire-${pdfInput.discoveryChecklist.mode}`
      : "workbook";

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}-${fileSuffix}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Branded PDF generation error:", err);
    return NextResponse.json({ error: "Unable to generate PDF right now" }, { status: 500 });
  }
}


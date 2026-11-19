"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Search,
  Image as ImageIcon,
  UploadCloud,
  Sparkles,
  Archive,
  FolderOpen,
} from "lucide-react";
import { GUIDES, QUESTIONS, AREAS, EVENTS, ARTICLES } from "@/data/knowledgeHub";
import { LIVE_GUIDED_TOURS } from "@/data/tours";
import { DEVELOPMENTS } from "@/data/developments";
import { RESIDENTIAL_PILLAR_HUB, COMMERCIAL_PILLAR_HUB } from "@/data/pillarHubs";
import type { ImageReviewRecord } from "@/lib/kv";

type ReviewStatus = ImageReviewRecord["status"];

interface ReviewItem {
  id: string;
  section:
    | "Home Page"
    | "About & Team"
    | "Hubs & Portfolio"
    | "Trending Region"
    | "Development"
    | "Get Started"
    | "Guided Tour"
    | "Guide"
    | "Area Guide"
    | "Q&A"
    | "Event"
    | "Article";
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveHref: string;
  isPlaceholder: boolean;
  isNewGenerated: boolean;
}

const HOME_PAGE_IMAGES = [
  {
    id: "home:mark-davis-portrait",
    slug: "home-mark-davis-portrait",
    title: "Homepage: Mark Davis Team Portrait",
    category: "Team Triptych",
    description: "Mark Davis portrait card on the Homepage.",
    image: "/new-images/new-2/mark-davis-residential-commerical-advisor-tampa-real-estate-3.jpg",
    liveHref: "/",
  },
  {
    id: "home:rachael-garnett-portrait",
    slug: "home-rachael-garnett-portrait",
    title: "Homepage: Rachael Garnett Team Portrait",
    category: "Team Triptych",
    description: "Rachael Garnett portrait card on the Homepage.",
    image: "/new-images/new-2/rachael-garnett-residential-commerical-advisor-tampa-real-estate-homepage-1.jpg",
    liveHref: "/",
  },
  {
    id: "home:team-center-hero",
    slug: "home-team-center-hero",
    title: "Homepage: Davis & Garnett Team Center Photo",
    category: "Team Triptych",
    description: "Center team photograph on the Homepage scroll triptych.",
    image: "/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-8.jpg",
    liveHref: "/",
  },
  {
    id: "home:commercial-team-card",
    slug: "home-commercial-team-card",
    title: "Homepage: Commercial Realtor Team Card",
    category: "Discipline Card",
    description: "Commercial & Land discipline card on the Homepage.",
    image: "/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg",
    liveHref: "/",
  },
  {
    id: "home:residential-team-card",
    slug: "home-residential-team-card",
    title: "Homepage: Residential Realtor Team Card",
    category: "Discipline Card",
    description: "Residential & Luxury waterfront discipline card on the Homepage.",
    image: "/res_waterfront_estate_1787632802890.png",
    liveHref: "/",
  },
  {
    id: "home:every-listing-approach",
    slug: "home-every-listing-approach",
    title: "Homepage: 01 Playbooks Card (Buyer, Seller & Commercial)",
    category: "Knowledge & Tours",
    description: "Mark & Rachael reviewing buyer, seller & commercial playbooks on Homepage card 01.",
    image: "/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-9.jpg",
    liveHref: "/",
  },
  {
    id: "home:guided-tours-card",
    slug: "home-guided-tours-card",
    title: "Homepage: 02 Guided Tours Card (#GuidedByDG)",
    category: "Knowledge & Tours",
    description: "Mark & Rachael hosting a guided Tampa Bay waterfront tour on Homepage card 02.",
    image: "/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-3.jpg",
    liveHref: "/",
  },
  {
    id: "home:align-right-carrollwood",
    slug: "home-align-right-carrollwood",
    title: "Homepage: Align Right Realty Carrollwood Card",
    category: "Brokerage Card",
    description: "Align Right Realty Carrollwood office card on the Homepage.",
    image: "/new-images/new-2/davis-garnett-align-right-realty.jpg",
    liveHref: "/",
  },
  {
    id: "home:advisory-cta-banner",
    slug: "home-advisory-cta-banner",
    title: "Homepage: Advisory CTA Background Banner",
    category: "CTA Banner",
    description: "Full-width advisory background photo near the bottom of the Homepage.",
    image: "/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-5.jpg",
    liveHref: "/",
  },
  {
    id: "home:grid-bahama-shores",
    slug: "home-grid-bahama-shores",
    title: "Homepage Grid: 6100 Bahama Shores Dr S",
    category: "Bottom Showcase Grid",
    description: "Waterfront luxury estate tile in Homepage bottom showcase grid.",
    image: "/listings/bahama-shores-1.webp",
    liveHref: "/",
  },
  {
    id: "home:grid-ridgewood-brandon",
    slug: "home-grid-ridgewood-brandon",
    title: "Homepage Grid: 126 Ridgewood Ave Commercial",
    category: "Bottom Showcase Grid",
    description: "Commercial mixed-use asset tile in Homepage bottom showcase grid.",
    image: "/listings/ridgewood-brandon-2.jpg",
    liveHref: "/",
  },
  {
    id: "home:grid-bahama-shores-lot",
    slug: "home-grid-bahama-shores-lot",
    title: "Homepage Grid: 6100 Bahama Shores Lot 10",
    category: "Bottom Showcase Grid",
    description: "Pre-construction homesite tile in Homepage bottom showcase grid.",
    image: "/listings/bahama-shores-lot-1.jpg",
    liveHref: "/",
  },
  {
    id: "home:grid-justamere-tampa",
    slug: "home-grid-justamere-tampa",
    title: "Homepage Grid: 3012 Justamere Ln",
    category: "Bottom Showcase Grid",
    description: "Lakefront estate tile in Homepage bottom showcase grid.",
    image: "/listings/justamere-tampa-1.jpg",
    liveHref: "/",
  },
  {
    id: "home:grid-beverly-hills-zephyrhills",
    slug: "home-grid-beverly-hills-zephyrhills",
    title: "Homepage Grid: 6389 Beverly Hills Dr",
    category: "Bottom Showcase Grid",
    description: "Abbott Square closed home tile in Homepage bottom showcase grid.",
    image: "/listings/beverly-hills-zephyrhills-1.jpg",
    liveHref: "/",
  },
];

const ABOUT_PAGE_IMAGES = [
  {
    id: "about:team-hero",
    slug: "about-team-hero",
    title: "About Team: Mark & Rachael Hero Photo",
    category: "/about",
    description: "Main team photograph on the About Davis & Garnett page.",
    image: "/new-images/new-2/mark-davis-and-rachael-garnett-residential-commerical-advisors-tampa-real-estate-3.jpg",
    liveHref: "/about",
  },
  {
    id: "about:rachael-garnett-bio",
    slug: "about-rachael-garnett-bio",
    title: "About Rachael: Bio Portrait",
    category: "/about/rachael-garnett",
    description: "Rachael Garnett featured portrait on her bio page.",
    image: "/new-images/new-2/rachael-garnett-residential-commerical-advisor-tampa-real-estate-6.jpg",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:mark-old-stokes",
    slug: "about-mark-old-stokes",
    title: "About Mark: Old Stokes Road Listing",
    category: "/about/mark-davis",
    description: "Featured closed property on Mark Davis bio page.",
    image: "/listings/old-stokes-road-cover-image-davis-garnett.jpg",
    liveHref: "/about/mark-davis",
  },
  {
    id: "about:mark-land-listing",
    slug: "about-mark-land-listing",
    title: "About Mark: Central FL Land Cover",
    category: "/about/mark-davis",
    description: "Land listing showcase on Mark Davis bio page.",
    image: "/listings/d-g-land-listing-cover.webp",
    liveHref: "/about/mark-davis",
  },
  {
    id: "about:outreach-1",
    slug: "about-outreach-1",
    title: "Community Outreach: Feature Photo 1",
    category: "/about/community-outreach-giving",
    description: "Community outreach gallery image 1.",
    image: "/new-images/new-2/davis-garnett-stock-gallery/realtors-mark-davis-rachael-garnett-tampa-residential-real-estate-gallery-16.jpg",
    liveHref: "/about/community-outreach-giving",
  },
  {
    id: "about:outreach-2",
    slug: "about-outreach-2",
    title: "Community Outreach: Feature Photo 2",
    category: "/about/community-outreach-giving",
    description: "Community outreach gallery image 2.",
    image: "/new-images/new-2/davis-garnett-stock-gallery/realtors-mark-davis-rachael-garnett-tampa-residential-real-estate-gallery-17.jpg",
    liveHref: "/about/community-outreach-giving",
  },
  {
    id: "about:outreach-3",
    slug: "about-outreach-3",
    title: "Community Outreach: Feature Photo 3",
    category: "/about/community-outreach-giving",
    description: "Community outreach gallery image 3.",
    image: "/new-images/new-2/davis-garnett-stock-gallery/realtors-mark-davis-rachael-garnett-tampa-residential-real-estate-gallery-10.jpg",
    liveHref: "/about/community-outreach-giving",
  },
  {
    id: "about:rachael-valencia-cove",
    slug: "about-rachael-valencia-cove",
    title: "About Rachael: 3537 Valencia Cove Ct",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/valencia-cove-lol-1.webp",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:rachael-teal-trce",
    slug: "about-rachael-teal-trce",
    title: "About Rachael: 7608 Teal Trce",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/teal-trce-bradenton-1.webp",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:rachael-otto-pt",
    slug: "about-rachael-otto-pt",
    title: "About Rachael: 1106 S Otto Pt",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/otto-pt-inverness-2.webp",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:rachael-wheat-stone",
    slug: "about-rachael-wheat-stone",
    title: "About Rachael: 8136 Wheat Stone Dr",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/wheat-stone-zephyrhills-1.webp",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:rachael-16th-st",
    slug: "about-rachael-16th-st",
    title: "About Rachael: 2402 16th St W",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/16th-st-palmetto-1.webp",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:rachael-stonehaven",
    slug: "about-rachael-stonehaven",
    title: "About Rachael: 4603 Stonehaven Pl",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/stonehaven-npr-1.jpg",
    liveHref: "/about/rachael-garnett",
  },
  {
    id: "about:rachael-raffia",
    slug: "about-rachael-raffia",
    title: "About Rachael: 10609 Raffia Dr",
    category: "/about/rachael-garnett",
    description: "Closed residential listing on Rachael Garnett bio page.",
    image: "/listings/raffia-port-richey-1.webp",
    liveHref: "/about/rachael-garnett",
  },
];

const HUB_PAGE_IMAGES = [
  {
    id: "hub-page:residential",
    slug: "hub-page-residential",
    title: "Residential Realtor Team Hub Hero (/residential)",
    category: "/residential",
    description: "Flagship hero image for the Residential Realtor Team page.",
    image: "/res_waterfront_estate_1787632802890.png",
    liveHref: "/residential",
  },
  {
    id: "hub-page:commercial",
    slug: "hub-page-commercial",
    title: "Commercial Realtor Team Hub Hero (/commercial)",
    category: "/commercial",
    description: "Flagship hero image for the Commercial Realtor Team page.",
    image: "/new-images/new-2/davis-garnett-tampa-commercial-real-estate-1.jpg",
    liveHref: "/commercial",
  },
  {
    id: "hub-page:properties-residential",
    slug: "hub-page-properties-residential",
    title: "Portfolio Hub: Residential Fallback Cover (/properties)",
    category: "/properties",
    description: "Residential portfolio cover image on /properties.",
    image: "/listings/d-g-residential-1.webp",
    liveHref: "/properties",
  },
  {
    id: "hub-page:developments-combo",
    slug: "hub-page-developments-combo",
    title: "Developments Hub: New Construction vs. Resale Advisory Card",
    category: "/developments",
    description: "Mark & Rachael advisory card in the 55+ / New Construction guide on /developments.",
    image: "/davis-garnett-real-combo.png",
    liveHref: "/developments",
  },
];

const TRENDING_REGIONS = [
  {
    id: "downtown-towers",
    eyebrow: "Region 01 • Downtown Tampa & South Tampa",
    title: "Downtown Tampa, Bayshore & South Tampa",
    description:
      "Classic Hyde Park bungalows and Bayshore estates alongside Riverwalk sky condos, Westshore marinas, and 650,000+ sq. ft. of new urban office and retail.",
    image: "/images/regions/downtown-towers.jpg",
  },
  {
    id: "north-tampa-communities",
    eyebrow: "Region 02 • Wesley Chapel, Land O' Lakes & Hernando",
    title: "Wesley Chapel, Land O' Lakes & Hernando",
    description:
      "Proven zero/low-bond golf villages alongside flagship Crystal Lagoons, brand-new 55+ clubhouses, and Pasco's booming biotech and SR-56 retail corridors.",
    image: "/images/regions/north-tampa-communities.jpg",
  },
  {
    id: "sarasota-manatee-communities",
    eyebrow: "Region 03 • Bradenton, Lakewood Ranch & Sarasota",
    title: "Bradenton, Lakewood Ranch & Sarasota",
    description:
      "Lakeside custom estates, bundled golf, award-winning 55+ villages, downtown bayfront condos, and UTC corporate and retail centers south along I-75.",
    image: "/images/regions/sarasota-manatee-communities.png",
  },
  {
    id: "st-pete-region",
    eyebrow: "Region 04 • St. Petersburg & South Pinellas",
    title: "St. Petersburg & South Pinellas",
    description:
      "Deep-water boating canals in Bahama Shores and Snell Isle paired with Downtown sky towers, 55+ bayfront clubs, and bustling Central Avenue commerce.",
    image: "/images/regions/st-pete-region.jpg",
  },
  {
    id: "clearwater-region",
    eyebrow: "Region 05 • Clearwater, Dunedin & North Pinellas",
    title: "Clearwater, Dunedin & North Pinellas",
    description:
      "High coastal bluffs along the Pinellas Trail, barrier island condos, classic zero-CDD 55+ clubs, and busy US-19 and Gulf-to-Bay commercial plazas.",
    image: "/images/regions/clearwater-region.jpg",
  },
  {
    id: "west-pasco-region",
    eyebrow: "Region 06 • Tarpon Springs, Palm Harbor & Trinity",
    title: "Tarpon Springs, Palm Harbor & Trinity / West Pasco",
    description:
      "Starkey Ranch trails and East Lake Woodlands golf alongside Sponge Docks storefronts, Trinity hospital medical suites, and Timber Greens 55+.",
    image: "/images/regions/west-pasco-region.jpg",
  },
  {
    id: "south-shore-region",
    eyebrow: "Region 07 • Apollo Beach, Ruskin & Sun City Center",
    title: "Apollo Beach, Ruskin & Sun City Center",
    description:
      "Deep-water sailboat canals in MiraBay, new Waterset trails, Big Bend Rd hospital commerce, and Florida's golf-cart 55+ hubs.",
    image: "/images/regions/south-shore-region.jpg",
  },
  {
    id: "westshore-marina-region",
    eyebrow: "Region 08 • Westshore Marina & Rocky Point",
    title: "Westshore Marina, Rocky Point & Town 'N Country",
    description:
      "Bayfront marina towers, 5-minute airport waterfront offices, zero-HOA Baycrest boat canals, and Westshore corporate suites.",
    image: "/images/regions/westshore-marina-region.jpg",
  },
  {
    id: "venice-wellen-park-region",
    eyebrow: "Region 09 • Venice, Wellen Park & North Port",
    title: "Venice, Wellen Park & North Port",
    description:
      "Downtown Wellen lakefront concerts, historic Island of Venice boutiques, Solstice 55+ villas, and Sarasota Memorial Laurel Rd medical growth.",
    image: "/images/regions/venice-wellen-park-region.jpg",
  },
  {
    id: "east-hillsborough-region",
    eyebrow: "Region 10 • Brandon, Valrico & East Hillsborough",
    title: "Brandon, Valrico & East Hillsborough",
    description:
      "Active SBA mixed-use buildings off SR-60, no-HOA Seffner lots, shaded Valrico golf neighborhoods, Hawkstone new builds, and Sabal Park logistics.",
    image: "/images/regions/east-hillsborough-region.jpg",
  },
  {
    id: "lakeland-polk-region",
    eyebrow: "Region 11 • Lakeland, Plant City & I-4 Corridor",
    title: "Lakeland, Plant City & I-4 Corridor",
    description:
      "Historic brick Lake Morton & Walden Lake living, Bonnet Springs urban growth, I-4 logistics warehouses, and strategic 20-to-80 acre Florida tracts.",
    image: "/images/regions/lakeland-polk-region.jpg",
  },
  {
    id: "carrollwood-region",
    eyebrow: "Region 12 • Align Right Carrollwood Corridor",
    title: "Align Right Carrollwood & Surrounding Corridor",
    description:
      "Our home brokerage backyard—zero-CDD ski lakes in Carrollwood, Odessa horse farms, Cheval golf, Keystone acreage, Citrus Park retail, and Dale Mabry offices.",
    image: "/images/regions/carrollwood-region.jpg",
  },
];

const STORAGE_KEY = "dg_image_review_v2";
const PLACEHOLDER_PATH = "/placeholders/dg-brand-placeholder.webp";

export default function ImageReviewPage() {
  const [filterMode, setFilterMode] = useState<
    "needs_review" | "placeholders" | "replacements" | "tours" | "approved" | "all"
  >("needs_review");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState<Record<string, ImageReviewRecord>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [placeholderAddedToAssets, setPlaceholderAddedToAssets] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const allItems: ReviewItem[] = useMemo(() => {
    const mapItem = (
      base: Omit<ReviewItem, "isPlaceholder" | "isNewGenerated">
    ): ReviewItem => ({
      ...base,
      isPlaceholder: base.image === PLACEHOLDER_PATH,
      isNewGenerated: base.image.startsWith("/images/seasonal/"),
    });

    return [
      ...LIVE_GUIDED_TOURS.map((t) =>
        mapItem({
          id: `tour:${t.slug}`,
          section: "Guided Tour",
          slug: t.slug,
          title: t.title,
          category: t.badge,
          description: t.tagline,
          image: t.heroImage,
          liveHref: `/tours/${t.slug}`,
        })
      ),
      ...GUIDES.map((g) =>
        mapItem({
          id: `guide:${g.slug}`,
          section: "Guide",
          slug: g.slug,
          title: g.title,
          category: g.category,
          description: g.subtitle,
          image: g.heroImage,
          liveHref: `/knowledge-hub/${g.slug}`,
        })
      ),
      ...AREAS.map((a) =>
        mapItem({
          id: `area:${a.slug}`,
          section: "Area Guide",
          slug: a.slug,
          title: a.name,
          category: a.county,
          description: a.tagline,
          image: a.heroImage,
          liveHref: `/knowledge-hub/areas/${a.slug}`,
        })
      ),
      ...QUESTIONS.map((q) =>
        mapItem({
          id: `qa:${q.slug}`,
          section: "Q&A",
          slug: q.slug,
          title: q.title,
          category: q.category,
          description: q.subtitle,
          image: q.heroImage,
          liveHref: `/knowledge-hub/${q.slug}`,
        })
      ),
      ...EVENTS.map((ev) =>
        mapItem({
          id: `event:${ev.slug}`,
          section: "Event",
          slug: ev.slug,
          title: ev.title,
          category: ev.category,
          description: ev.summary,
          image: ev.heroImage,
          liveHref: `/knowledge-hub/events/${ev.slug}`,
        })
      ),
      ...ARTICLES.map((art) =>
        mapItem({
          id: `article:${art.slug}`,
          section: "Article",
          slug: art.slug,
          title: art.title,
          category: art.category,
          description: art.summary,
          image: art.heroImage,
          liveHref: `/knowledge-hub/articles/${art.slug}`,
        })
      ),
      mapItem({
        id: "get-started:commercial",
        section: "Get Started",
        slug: "davis-garnett-knowledge-hub-commercial-1",
        title: "Commercial & Land Get Started Plan",
        category: "Commercial & Land",
        description: "Knowledge Hub Get Started 2-column feature card for Commercial & Land discovery deck.",
        image: "/images/knowledge-hub/davis-garnett-knowledge-hub-commercial-1.jpg",
        liveHref: "/knowledge-hub#get-started",
      }),
      mapItem({
        id: "get-started:residential",
        section: "Get Started",
        slug: "davis-garnett-knowledge-hub-residential-1",
        title: "Residential Get Started & Moving Plan",
        category: "Residential",
        description: "Knowledge Hub Get Started 2-column feature card for Residential discovery deck.",
        image: "/images/knowledge-hub/davis-garnett-knowledge-hub-residential-1.jpg",
        liveHref: "/knowledge-hub#get-started",
      }),
      ...TRENDING_REGIONS.map((reg) =>
        mapItem({
          id: `region:${reg.id}`,
          section: "Trending Region",
          slug: reg.id,
          title: reg.title,
          category: reg.eyebrow,
          description: reg.description,
          image: reg.image,
          liveHref: `/developments#${reg.id}`,
        })
      ),
      ...DEVELOPMENTS.map((dev) =>
        mapItem({
          id: `dev:${dev.slug}`,
          section: "Development",
          slug: dev.slug,
          title: dev.name,
          category: dev.corridorLabel,
          description: dev.summary || dev.subtitle,
          image: dev.heroImage,
          liveHref: `/developments/${dev.slug}`,
        })
      ),
      ...HOME_PAGE_IMAGES.map((item) =>
        mapItem({
          ...item,
          section: "Home Page",
        })
      ),
      ...ABOUT_PAGE_IMAGES.map((item) =>
        mapItem({
          ...item,
          section: "About & Team",
        })
      ),
      ...HUB_PAGE_IMAGES.map((item) =>
        mapItem({
          ...item,
          section: "Hubs & Portfolio",
        })
      ),
      ...RESIDENTIAL_PILLAR_HUB.serviceLanes.map((lane) =>
        mapItem({
          id: `residential-lane:${lane.id}`,
          section: "Hubs & Portfolio",
          slug: `residential-${lane.id}`,
          title: `Residential Hub Lane: ${lane.title}`,
          category: `/residential · ${lane.tag}`,
          description: lane.summary,
          image: lane.image || PLACEHOLDER_PATH,
          liveHref: "/residential",
        })
      ),
      ...COMMERCIAL_PILLAR_HUB.serviceLanes.map((lane) =>
        mapItem({
          id: `commercial-lane:${lane.id}`,
          section: "Hubs & Portfolio",
          slug: `commercial-${lane.id}`,
          title: `Commercial Hub Lane: ${lane.title}`,
          category: `/commercial · ${lane.tag}`,
          description: lane.summary,
          image: lane.image || PLACEHOLDER_PATH,
          liveHref: "/commercial",
        })
      ),
    ];
  }, []);

  useEffect(() => {
    let active = true;
    const loadReviews = async () => {
      try {
        const res = await fetch("/api/image-reviews");
        if (res.ok) {
          const data = (await res.json()) as { reviews?: Record<string, ImageReviewRecord> };
          if (active && data.reviews && Object.keys(data.reviews).length > 0) {
            setRecords(data.reviews);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data.reviews));
            return;
          }
        }
      } catch {
        // fallback to localStorage
      }

      try {
        const saved =
          window.localStorage.getItem(STORAGE_KEY) ||
          window.localStorage.getItem("dg_image_review_v1");
        if (saved && active) {
          const parsed = JSON.parse(saved);
          // Support migrating legacy v1 `{ statuses, notes }` cleanly
          if (parsed && (parsed.statuses || parsed.notes)) {
            const migrated: Record<string, ImageReviewRecord> = {};
            const keys = new Set([
              ...Object.keys(parsed.statuses || {}),
              ...Object.keys(parsed.notes || {}),
            ]);
            keys.forEach((k) => {
              migrated[k] = {
                status: parsed.statuses?.[k] || "unreviewed",
                note: parsed.notes?.[k] || "",
                updatedAt: new Date().toISOString(),
              };
            });
            setRecords(migrated);
          } else if (parsed && typeof parsed === "object") {
            setRecords(parsed);
          }
        }
      } catch {
        // ignore storage errors
      }
    };

    loadReviews();
    return () => {
      active = false;
    };
  }, []);

  const persistRecords = async (next: Record<string, ImageReviewRecord>) => {
    setRecords(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    try {
      await fetch("/api/image-reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: next }),
      });
    } catch {
      // keep local copy if offline
    }
  };

  const updateRecord = (id: string, patch: Partial<ImageReviewRecord>) => {
    const prev = records[id] || { status: "unreviewed", updatedAt: new Date().toISOString() };
    const updated: Record<string, ImageReviewRecord> = {
      ...records,
      [id]: {
        ...prev,
        ...patch,
        updatedAt: new Date().toISOString(),
      },
    };
    void persistRecords(updated);
  };

  const handleUploadReplacement = async (item: ReviewItem, file: File) => {
    setUploadingId(item.id);
    try {
      const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
      const safeName = `${item.slug}-${Date.now()}.${ext}`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", "image-review");
      formData.append("customFilename", safeName);

      const res = await fetch("/api/assets", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { success?: boolean; url?: string };
      if (!res.ok || !data.url) {
        alert("Unable to upload image replacement right now.");
        return;
      }

      updateRecord(item.id, {
        status: "replaced",
        replacementUrl: data.url,
        usePlaceholder: false,
      });
    } catch (err) {
      console.error("Image replacement upload error:", err);
      alert("Error uploading replacement image.");
    } finally {
      setUploadingId(null);
    }
  };

  const handleUseImageHolder = async (item: ReviewItem) => {
    updateRecord(item.id, {
      status: "placeholder_queued",
      replacementUrl: PLACEHOLDER_PATH,
      usePlaceholder: true,
    });
  };

  const addImageHolderToBrandAssets = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "addPlaceholder");
      formData.append("filename", "dg-brand-placeholder.webp");
      formData.append("path", "");

      const res = await fetch("/api/assets", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setPlaceholderAddedToAssets(true);
        setTimeout(() => setPlaceholderAddedToAssets(false), 3000);
      }
    } catch {
      // ignore
    }
  };

  const archiveExistingPhotos = () => {
    const next = { ...records };
    const now = new Date().toISOString();
    for (const item of allItems) {
      const rec = next[item.id];
      const currentStatus = rec?.status || "unreviewed";
      // Archive real non-placeholder photos that aren't flagged or pending replacement
      if (!item.isPlaceholder && currentStatus === "unreviewed") {
        next[item.id] = {
          ...(rec || {}),
          status: "approved",
          updatedAt: now,
        };
      }
    }
    void persistRecords(next);
  };

  const resetAll = () => {
    void persistRecords({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem("dg_image_review_v1");
    } catch {
      // ignore
    }
  };

  const getEffectiveImage = (item: ReviewItem) => {
    const rec = records[item.id];
    if (rec?.usePlaceholder) return PLACEHOLDER_PATH;
    if (rec?.replacementUrl) return rec.replacementUrl;
    return item.image;
  };

  const getEffectiveStatus = (item: ReviewItem): ReviewStatus => {
    const rec = records[item.id];
    if (rec?.status) return rec.status;
    return item.isPlaceholder ? "unreviewed" : "approved";
  };

  const q = searchQuery.trim().toLowerCase();
  const visibleItems = allItems.filter((item) => {
    const status = getEffectiveStatus(item);
    const activeImage = getEffectiveImage(item);
    const isUsingPlaceholder = activeImage === PLACEHOLDER_PATH;

    if (filterMode === "needs_review" && status === "approved") return false;
    if (filterMode === "placeholders" && !isUsingPlaceholder) return false;
    if (
      filterMode === "replacements" &&
      status !== "flagged" &&
      status !== "replaced" &&
      status !== "placeholder_queued"
    ) {
      return false;
    }
    if (filterMode === "tours" && item.section !== "Guided Tour") return false;
    if (filterMode === "approved" && status !== "approved") return false;
    if (sectionFilter !== "all" && item.section !== sectionFilter) return false;

    if (
      q &&
      !item.title.toLowerCase().includes(q) &&
      !item.slug.toLowerCase().includes(q) &&
      !activeImage.toLowerCase().includes(q) &&
      !item.category.toLowerCase().includes(q)
    ) {
      return false;
    }
    return true;
  });

  const placeholderCount = allItems.filter((i) => getEffectiveImage(i) === PLACEHOLDER_PATH).length;
  const approvedCount = allItems.filter((i) => getEffectiveStatus(i) === "approved").length;
  const needsReviewCount = allItems.length - approvedCount;
  const replacementCount = allItems.filter((i) => {
    const s = getEffectiveStatus(i);
    return s === "flagged" || s === "replaced" || s === "placeholder_queued";
  }).length;

  const copyFlaggedList = async () => {
    const actionable = allItems.filter((i) => {
      const s = getEffectiveStatus(i);
      const effImg = getEffectiveImage(i);
      return s !== "approved" && (s !== "unreviewed" || effImg === PLACEHOLDER_PATH);
    });
    const report = actionable
      .map((item, idx) => {
        const rec = records[item.id];
        const effImg = getEffectiveImage(item);
        const reason =
          rec?.status === "replaced"
            ? `UPLOADED REPLACEMENT -> ${effImg}`
            : rec?.status === "placeholder_queued"
            ? `USE D&G HOLDER -> ${PLACEHOLDER_PATH}`
            : rec?.status === "flagged"
            ? "MISMATCH / NEEDS REPLACEMENT"
            : "PLACEHOLDER ACTIVE";
        const noteLine = rec?.note?.trim() ? ` | Note: ${rec.note.trim()}` : "";
        return `${idx + 1}. [${item.section}] ${item.title} (${item.slug}) — ${reason} — Current: ${effImg}${noteLine}`;
      })
      .join("\n");

    const text =
      report || "All new cards are clean and reviewed. Nothing pending replacement.";
    try {
      await navigator.clipboard.writeText(text);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] p-6 md:p-10">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Header */}
        <div className="bg-[#111] text-white rounded-2xl p-6 md:p-8 border border-[#D4AF37]/40 shadow-lg mb-8">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37] block mb-2">
                ClickMe Visual Audit &amp; Replacement Studio • Non-Indexed Backend Tool
              </span>
              <h1 className="font-aiveritas text-3xl md:text-4xl text-white mb-2">
                New Content Image Queue &amp; Approved Archive
              </h1>
              <p className="text-sm text-white/75 max-w-3xl leading-relaxed">
                Focused strictly on new additions, placeholders, and flagged shots so nothing slips through. Already-approved photos live cleanly inside the Approved Archive tab. Upload replacements straight into your backend Brand Assets folder or toggle the D&amp;G Image Holder in one click.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={archiveExistingPhotos}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                title="Move all existing unflagged real photos into the Already Approved Archive so your queue shows only new/placeholder/flagged items"
              >
                <Archive className="w-4 h-4" /> Archive Unflagged Stock Photos
              </button>

              <button
                type="button"
                onClick={addImageHolderToBrandAssets}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-[#111] text-white border border-[#D4AF37]/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                {placeholderAddedToAssets
                  ? "Holder Added to Assets!"
                  : "Save Holder to Brand Assets"}
              </button>

              <Link
                href="/clickme/assets"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <FolderOpen className="w-4 h-4 text-[#D4AF37]" /> Brand Assets Area
              </Link>

              <button
                type="button"
                onClick={copyFlaggedList}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-4 h-4" /> Copied Report
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Sync Report
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/15 text-xs">
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              <span className="text-white/60 block uppercase tracking-wider text-[10px]">
                New / Needs Review Queue
              </span>
              <span className="text-2xl font-bold text-white">{needsReviewCount}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-[#D4AF37]/30">
              <span className="text-[#D4AF37] block uppercase tracking-wider text-[10px]">
                D&amp;G Image Holders Active
              </span>
              <span className="text-2xl font-bold text-[#D4AF37]">{placeholderCount}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-amber-400/30">
              <span className="text-amber-300 block uppercase tracking-wider text-[10px]">
                Flagged / Uploaded Queue
              </span>
              <span className="text-2xl font-bold text-amber-300">{replacementCount}</span>
            </div>
            <div className="bg-white/5 rounded-xl px-4 py-3 border border-emerald-500/30">
              <span className="text-emerald-300 block uppercase tracking-wider text-[10px]">
                Already Approved Archive
              </span>
              <span className="text-2xl font-bold text-emerald-300">{approvedCount}</span>
            </div>
          </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#111]/10 p-4 md:p-5 shadow-sm mb-8 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { key: "needs_review", label: `New / Needs Review (${needsReviewCount})` },
                { key: "placeholders", label: `Holders Active (${placeholderCount})` },
                { key: "replacements", label: `Uploaded / Flagged (${replacementCount})` },
                { key: "tours", label: `Guided Tours (${LIVE_GUIDED_TOURS.length})` },
                { key: "approved", label: `Approved Archive (${approvedCount})` },
                { key: "all", label: `All (${allItems.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterMode(tab.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  filterMode === tab.key
                    ? "bg-[#111] text-[#D4AF37]"
                    : "bg-[#f5f3ef] text-[#111]/75 hover:bg-[#e8e3d8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              aria-label="Filter by section"
              className="px-3.5 py-2 rounded-lg bg-[#f5f3ef] border border-[#111]/10 text-xs font-bold uppercase tracking-wider text-[#111]"
            >
              <option value="all">All Pages &amp; Sections ({allItems.length})</option>
              <option value="Home Page">Home Page ({HOME_PAGE_IMAGES.length})</option>
              <option value="About & Team">About &amp; Team Pages ({ABOUT_PAGE_IMAGES.length})</option>
              <option value="Hubs & Portfolio">Hubs &amp; Portfolio Pages ({HUB_PAGE_IMAGES.length})</option>
              <option value="Trending Region">Trending Regions (12)</option>
              <option value="Development">Developments ({DEVELOPMENTS.length})</option>
              <option value="Get Started">Get Started Cards (2)</option>
              <option value="Guided Tour">Guided Tours ({LIVE_GUIDED_TOURS.length})</option>
              <option value="Guide">Guides ({GUIDES.length})</option>
              <option value="Area Guide">Areas We Work In ({AREAS.length})</option>
              <option value="Q&A">Q&amp;A Classroom ({QUESTIONS.length})</option>
              <option value="Event">Events ({EVENTS.length})</option>
              <option value="Article">Articles ({ARTICLES.length})</option>
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-[#9A7D3A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, slug, filename..."
                className="pl-9 pr-4 py-2 rounded-lg bg-[#f5f3ef] border border-[#111]/10 text-xs text-[#111] w-64 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {visibleItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#111]/10 p-12 text-center shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <h2 className="font-aiveritas text-2xl text-[#111] mb-2">
              Nothing Waiting in This View
            </h2>
            <p className="text-sm text-[#111]/65 max-w-md mx-auto">
              All items in this bucket are either archived or filtered out. Switch tabs above to browse the Already Approved Archive or Active Holders.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleItems.map((item) => {
              const rec = records[item.id];
              const status = getEffectiveStatus(item);
              const activeImage = getEffectiveImage(item);
              const isUsingHolder = activeImage === PLACEHOLDER_PATH;
              const fileName = activeImage.split("/").pop() || activeImage;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all flex flex-col justify-between shadow-sm ${
                    status === "approved"
                      ? "border-emerald-500/70 ring-1 ring-emerald-500/20"
                      : status === "replaced"
                      ? "border-blue-500/80 ring-1 ring-blue-500/20"
                      : status === "flagged"
                      ? "border-amber-500 ring-1 ring-amber-500/30"
                      : isUsingHolder
                      ? "border-[#D4AF37]"
                      : "border-[#111]/10"
                  }`}
                >
                  <div>
                    {/* Visual Image Preview */}
                    <div className="relative aspect-[16/10] w-full bg-[#111] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-sm bg-[#111]/90 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                          {item.section}
                        </span>
                        {isUsingHolder && (
                          <span className="px-2.5 py-1 rounded-sm bg-[#D4AF37] text-[#111] text-[10px] font-bold uppercase tracking-widest">
                            D&amp;G Holder
                          </span>
                        )}
                        {item.isNewGenerated && !rec?.replacementUrl && !rec?.usePlaceholder && (
                          <span className="px-2.5 py-1 rounded-sm bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest">
                            New Seasonal Art
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        {status === "approved" && (
                          <span className="px-2.5 py-1 rounded-sm bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Approved
                          </span>
                        )}
                        {status === "replaced" && (
                          <span className="px-2.5 py-1 rounded-sm bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                            <UploadCloud className="w-3 h-3" /> Uploaded Replacement
                          </span>
                        )}
                        {status === "flagged" && (
                          <span className="px-2.5 py-1 rounded-sm bg-amber-500 text-[#111] text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Replace Shot
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Meta */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-[#9A7D3A] mb-1.5">
                        <span className="uppercase tracking-wider truncate">{item.category}</span>
                        <Link
                          href={item.liveHref}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[#111]/60 hover:text-[#111] shrink-0"
                        >
                          Open Page <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <h2 className="font-aiveritas text-xl text-[#111] leading-snug mb-2">
                        {item.title}
                      </h2>
                      <p className="text-xs text-[#111]/70 line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      <div className="text-[11px] bg-[#f5f3ef] border border-[#111]/8 rounded-lg px-3 py-2 text-[#111]/75 flex items-center gap-2 mb-3">
                        <ImageIcon className="w-3.5 h-3.5 text-[#9A7D3A] shrink-0" />
                        <span className="truncate font-mono" title={activeImage}>
                          {fileName}
                        </span>
                      </div>

                      {/* Note input */}
                      <input
                        type="text"
                        value={rec?.note || ""}
                        onChange={(e) => updateRecord(item.id, { note: e.target.value })}
                        placeholder="Optional note (e.g. needs Hyde Park outdoor plaza photo)..."
                        className="w-full px-3 py-2 rounded-lg border border-[#111]/12 bg-[#fbfbf9] text-xs text-[#111] placeholder:text-[#111]/40 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Upload Replacement + Use Holder + Approve/Flag Bar */}
                  <div className="px-5 pb-5 pt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => {
                          fileInputRefs.current[item.id] = el;
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            void handleUploadReplacement(item, file);
                            e.target.value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        disabled={uploadingId === item.id}
                        onClick={() => fileInputRefs.current[item.id]?.click()}
                        className="flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 bg-[#111] hover:bg-[#333] text-white transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {uploadingId === item.id ? "Uploading..." : "Upload Replacement"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUseImageHolder(item)}
                        className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                          rec?.usePlaceholder
                            ? "bg-[#D4AF37] text-[#111] border-[#D4AF37]"
                            : "bg-[#fdfaf0] hover:bg-[#D4AF37]/25 text-[#111] border-[#D4AF37]/60"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#9A7D3A]" />
                        Use Image Holder
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateRecord(item.id, {
                            status: status === "approved" ? "unreviewed" : "approved",
                          })
                        }
                        className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          status === "approved"
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {status === "approved" ? "Return to Queue" : "Approve & Archive"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          updateRecord(item.id, {
                            status: status === "flagged" ? "unreviewed" : "flagged",
                          })
                        }
                        className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          status === "flagged"
                            ? "bg-amber-500 text-[#111]"
                            : "bg-amber-50 hover:bg-amber-500 text-amber-900 hover:text-[#111] border border-amber-200"
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {status === "flagged" ? "Flagged" : "Needs New Photo"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

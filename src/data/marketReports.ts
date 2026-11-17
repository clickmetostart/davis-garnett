export interface MarketReportFAQ {
  question: string;
  answer: string;
}

export interface MarketReport {
  slug: string;
  title: string;
  month: string;
  dataAsOf: string;
  source: string;
  county: string;
  segment: string;
  medianPrice: string;
  daysOnMarket: string;
  saleToListRatio: string;
  activeInventory: string;
  monthsSupply: string;
  quickAnswer: string;
  faqs: MarketReportFAQ[];
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "live";
}

/**
 * Hidden behind SHOW_MARKET_REPORTS !== "true".
 * Left intentionally empty with zero placeholder statistics until Mark & Rachael
 * supply verified monthly MLS / county figures.
 */
export const MARKET_REPORTS: MarketReport[] = [];

export function isMarketReportsEnabled(): boolean {
  return process.env.SHOW_MARKET_REPORTS === "true";
}

export function isMarketReportReadyForLive(report: MarketReport): boolean {
  const requiredFields: (keyof MarketReport)[] = [
    "month",
    "dataAsOf",
    "source",
    "county",
    "segment",
    "medianPrice",
    "daysOnMarket",
    "saleToListRatio",
    "activeInventory",
    "monthsSupply",
    "quickAnswer",
    "publishedAt",
  ];
  const allFilled = requiredFields.every(
    (field) => typeof report[field] === "string" && report[field].trim().length > 0
  );
  if (!allFilled) return false;
  return new Date(report.publishedAt).getTime() >= new Date(report.dataAsOf).getTime();
}

export function getLiveMarketReports(): MarketReport[] {
  if (!isMarketReportsEnabled()) return [];
  return MARKET_REPORTS.filter(
    (r) => r.status === "live" && isMarketReportReadyForLive(r)
  );
}


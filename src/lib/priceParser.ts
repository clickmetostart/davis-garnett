/**
 * Parses starting dollar figures from display strings like "$1.2M+", "$425K – $1.6M",
 * "$185/mo", "$2,400/yr", or "$1,450,000" for calculator query pre-fills.
 */
export function parseDollarNumber(raw?: string | number | null): number | null {
  if (typeof raw === "number") {
    return Number.isFinite(raw) && raw > 0 ? Math.round(raw) : null;
  }
  if (!raw) return null;
  const match = raw.match(/\$\s*([\d,.]+)\s*([kKmM])?/);
  if (!match) return null;
  const num = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(num) || num <= 0) return null;
  const suffix = (match[2] || "").toLowerCase();
  if (suffix === "m") return Math.round(num * 1_000_000);
  if (suffix === "k") return Math.round(num * 1_000);
  return Math.round(num);
}

export function buildMortgageCalcHref(opts: {
  price?: string | number | null;
  hoa?: string | null;
  cdd?: string | null;
  from?: string;
}): string {
  const params = new URLSearchParams();
  const price = parseDollarNumber(opts.price);
  if (price && price >= 50_000) params.set("price", String(price));
  const hoa = parseDollarNumber(opts.hoa);
  if (hoa && hoa < 5_000) params.set("hoa", String(hoa));
  const cdd = parseDollarNumber(opts.cdd);
  if (cdd && cdd > 0 && cdd < 20_000) params.set("cdd", String(cdd));
  if (opts.from) params.set("from", opts.from);
  const qs = params.toString();
  return `/tools/mortgage-calculator${qs ? `?${qs}` : ""}`;
}

export function buildCapRateCalcHref(opts: {
  price?: string | number | null;
  from?: string;
}): string {
  const params = new URLSearchParams();
  const price = parseDollarNumber(opts.price);
  if (price && price >= 100_000) params.set("price", String(price));
  if (opts.from) params.set("from", opts.from);
  const qs = params.toString();
  return `/tools/cap-rate-calculator${qs ? `?${qs}` : ""}`;
}


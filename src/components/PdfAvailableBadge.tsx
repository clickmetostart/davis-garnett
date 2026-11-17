import { FileText } from "lucide-react";

interface PdfAvailableBadgeProps {
  /** Use "overlay" inside card image headers or "inline" inside text-only cards. */
  variant?: "overlay" | "inline";
  label?: string;
}

/**
 * Non-interactive informational sticker indicating a customizable PDF version
 * is available once the visitor opens the guide, tour, area, or article page.
 */
export default function PdfAvailableBadge({
  variant = "overlay",
  label = "PDF Download Available",
}: PdfAvailableBadgeProps) {
  const surfaceClasses =
    variant === "overlay"
      ? "bg-white/95 backdrop-blur-sm shadow-md text-[10px] sm:text-[11px] px-3 py-1"
      : "bg-white shadow-xs text-[10px] px-2.5 py-1";

  return (
    <span
      className={`pointer-events-none select-none inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37] text-[#111] font-bold uppercase tracking-wider shrink-0 leading-none whitespace-nowrap ${surfaceClasses}`}
    >
      <FileText className="w-3.5 h-3.5 text-[#9A7D3A] shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

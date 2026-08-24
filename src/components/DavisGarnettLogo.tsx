interface DavisGarnettLogoProps {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
}

/**
 * Davis & Garnett wordmark logo
 * Inline SVG — uses AIVeritas Roman + Montserrat loaded via globals.css
 * Renders crisp at any size. No image. No fallback squiggle.
 *
 * variant="light"  → black title/subtitle on white/transparent bg
 * variant="dark"   → champagne (#F6E3B0) title/subtitle on dark/transparent bg
 */
export default function DavisGarnettLogo({
  variant = "light",
  className = "",
  width = 900,
}: DavisGarnettLogoProps) {
  const isDark = variant === "dark";

  // Color tokens
  const textColor     = isDark ? "#F6E3B0" : "#111111";
  const gold          = "#b39556";
  const boxBorder     = isDark ? "#F6E3B0" : "#888888";
  const bg            = isDark ? "#050505" : "#ffffff";

  const VB_W = 1200;
  const VB_H = 300;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width={width}
      height={Math.round(width * (VB_H / VB_W))}
      className={className}
      aria-label="Davis & Garnett — Commercial Residential Advisors"
      role="img"
    >
      {/* Background (transparent for usage on pages, solid for standalone files) */}
      <rect width="100%" height="100%" fill={bg} />

      {/* ── MONOGRAM MARK ── */}
      {/* Border box */}
      <rect
        x="40" y="40"
        width="215" height="215"
        fill="none"
        stroke={boxBorder}
        strokeWidth="6"
      />

      {/* "D" — large, upper-left anchor */}
      <text
        x="72"
        y="195"
        fontFamily="'AIVeritas', serif"
        fontSize="165"
        fill={gold}
        opacity="1"
      >
        D
      </text>

      {/* "G" — overlapping, shifted right and down */}
      <text
        x="115"
        y="240"
        fontFamily="'AIVeritas', serif"
        fontSize="155"
        fill={gold}
        fillOpacity="0.92"
      >
        G
      </text>

      {/* ── WORDMARK ── */}

      {/* DAVIS */}
      <text
        x="295"
        y="158"
        fontFamily="'AIVeritas', serif"
        fontSize="88"
        letterSpacing="5"
        fill={textColor}
      >
        DAVIS
      </text>

      {/* & — gold, slightly smaller and raised */}
      <text
        x="608"
        y="148"
        fontFamily="'AIVeritas', serif"
        fontSize="76"
        fill={gold}
      >
        &amp;
      </text>

      {/* GARNETT */}
      <text
        x="680"
        y="158"
        fontFamily="'AIVeritas', serif"
        fontSize="88"
        letterSpacing="5"
        fill={textColor}
      >
        GARNETT
      </text>

      {/* Gold separator — top */}
      <line
        x1="295" y1="178"
        x2="1162" y2="178"
        stroke={gold}
        strokeWidth="2.5"
      />

      {/* COMMERCIAL RESIDENTIAL ADVISORS */}
      <text
        x="295"
        y="222"
        fontFamily="'Montserrat', 'Helvetica Neue', sans-serif"
        fontSize="24"
        fontWeight="400"
        letterSpacing="5"
        fill={textColor}
      >
        COMMERCIAL  RESIDENTIAL  ADVISORS
      </text>

      {/* Gold separator — bottom */}
      <line
        x1="295" y1="246"
        x2="1162" y2="246"
        stroke={gold}
        strokeWidth="2.5"
      />
    </svg>
  );
}

/**
 * Isolated DG monogram mark — useful for favicons, profile images, etc.
 */
export function DavisGarnettMark({
  variant = "light",
  size = 200,
  className = "",
}: {
  variant?: "light" | "dark";
  size?: number;
  className?: string;
}) {
  const isDark = variant === "dark";
  const gold = "#b39556";
  const boxBorder = isDark ? "#F6E3B0" : "#888888";
  const bg = isDark ? "#050505" : "#ffffff";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 260"
      width={size}
      height={size}
      className={className}
      aria-label="Davis & Garnett Monogram Mark"
      role="img"
    >
      <rect width="100%" height="100%" fill={bg} />

      {/* Border box */}
      <rect
        x="10" y="10"
        width="240" height="240"
        fill="none"
        stroke={boxBorder}
        strokeWidth="6"
      />

      {/* D */}
      <text
        x="38"
        y="200"
        fontFamily="'AIVeritas', serif"
        fontSize="180"
        fill={gold}
      >
        D
      </text>

      {/* G — overlapping */}
      <text
        x="90"
        y="248"
        fontFamily="'AIVeritas', serif"
        fontSize="170"
        fill={gold}
        fillOpacity="0.90"
      >
        G
      </text>
    </svg>
  );
}

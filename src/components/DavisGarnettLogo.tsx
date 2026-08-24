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
      {/* Border box (Y spans from 45 to 255) */}
      <rect
        x="40" y="45"
        width="210" height="210"
        fill="none"
        stroke={boxBorder}
        strokeWidth="6"
      />

      {/* "D" — large, upper-left anchor */}
      <text
        x="76"
        y="186"
        fontFamily="'AIVeritas', serif"
        fontSize="150"
        fill={gold}
        opacity="1"
      >
        D
      </text>

      {/* "G" — overlapping, shifted right and down */}
      <text
        x="122"
        y="227"
        fontFamily="'AIVeritas', serif"
        fontSize="140"
        fill={gold}
        fillOpacity="0.92"
      >
        G
      </text>

      {/* ── WORDMARK ── */}

      {/* DAVIS & GARNETT — perfectly justified, aligned to top of box */}
      <text
        x="725"
        y="118"
        fontFamily="'AIVeritas', serif"
        fontSize="105"
        fill={textColor}
        textAnchor="middle"
        textLength="850"
        lengthAdjust="spacing"
      >
        DAVIS <tspan fill={gold} fontSize="145" dy="12">&amp;</tspan><tspan dy="-12"> GARNETT</tspan>
      </text>

      {/* Gold separator — top */}
      <line
        x1="300" y1="160"
        x2="1150" y2="160"
        stroke={gold}
        strokeWidth="2.5"
      />

      {/* COMMERCIAL RESIDENTIAL ADVISORS — perfectly justified and vertically centered */}
      <text
        x="725"
        y="211"
        fontFamily="'Montserrat', 'Helvetica Neue', sans-serif"
        fontSize="24"
        fontWeight="400"
        fill={textColor}
        stroke={!isDark ? textColor : "none"}
        strokeWidth={!isDark ? "0.5" : "0"}
        textAnchor="middle"
        textLength="850"
        lengthAdjust="spacing"
      >
        COMMERCIAL   RESIDENTIAL   ADVISORS
      </text>

      {/* Gold separator — bottom (aligned to bottom of box) */}
      <line
        x1="300" y1="245"
        x2="1150" y2="245"
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
        x="15" y="15"
        width="230" height="230"
        fill="none"
        stroke={boxBorder}
        strokeWidth="6"
      />

      {/* D */}
      <text
        x="55"
        y="170"
        fontFamily="'AIVeritas', serif"
        fontSize="165"
        fill={gold}
      >
        D
      </text>

      {/* G — overlapping */}
      <text
        x="105"
        y="215"
        fontFamily="'AIVeritas', serif"
        fontSize="155"
        fill={gold}
        fillOpacity="0.90"
      >
        G
      </text>
    </svg>
  );
}




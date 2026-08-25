import Image from "next/image";

interface DavisGarnettLogoProps {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
}

/**
 * Davis & Garnett logo
 * Globally redirects to the provided PNG assets for both light and dark backgrounds.
 */
export default function DavisGarnettLogo({
  variant = "light",
  className = "",
  width = 900,
}: DavisGarnettLogoProps) {
  const isDark = variant === "dark";

  // Arbitrary aspect ratio based on the image size approximations
  const VB_W = 1200;
  const VB_H = 300;

  if (isDark) {
    return (
      <Image 
        src="/davis and garnett logo mobile png.png" 
        alt="Davis & Garnett" 
        width={width} 
        height={Math.round(width * (VB_H / VB_W))} 
        className={`max-w-full h-auto object-contain ${className}`}
        priority
      />
    );
  }

  // Light variant uses the newly provided logo
  return (
    <Image 
      src="/davis-garnett-logo-png-mobile-for-light-backgrounds.png" 
      alt="Davis & Garnett" 
      width={width} 
      height={Math.round(width * (VB_H / VB_W))} 
      className={`max-w-full h-auto object-contain ${className}`}
      priority
    />
  );
}

/**
 * Isolated DG monogram mark — useful for favicons, profile images, etc.
 * Left as SVG since no isolated PNG monogram was provided.
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
      className={`max-w-full h-auto ${className}`}
      aria-label="Davis & Garnett Monogram Mark"
      role="img"
    >
      {/* Background removed to ensure transparency */}

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

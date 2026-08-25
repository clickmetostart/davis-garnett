import Image from "next/image";

interface DavisGarnettLogoProps {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
}

export function DavisGarnettMark({ 
  className = "",
  width = 250
}: { 
  className?: string;
  width?: number;
}) {
  return (
    <Image 
      src="/davis and garnett logo mobile png.png"
      alt="Davis & Garnett Monogram"
      width={width}
      height={width}
      className={`object-contain ${className}`}
    />
  );
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

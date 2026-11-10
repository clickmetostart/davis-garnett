/**
 * Repeating DG favicon hero background (200px tile), matching the Portfolio hero.
 * - variant "light": original light favicon at very low opacity (Portfolio look)
 * - variant "dark":  dark-background favicon with overlays so hero text stays legible
 *
 * Render inside a `relative overflow-hidden` section, before the content wrapper
 * (which should be `relative z-10`).
 */
export default function FaviconHeroBackground({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) {
  if (variant === "light") {
    return (
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/dg-favicon-fat.png')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "url('/new-images/new-2/dg-favicon-fat-dark-background.png')",
          backgroundSize: "200px",
          backgroundRepeat: "repeat",
        }}
      />
      {/* Base darkening so the pattern stays subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111]/75 via-[#111]/60 to-[#111]/85" />
      {/* Center vignette behind the hero copy for legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,17,17,0.8)_0%,rgba(17,17,17,0.45)_55%,rgba(17,17,17,0)_100%)]" />
    </div>
  );
}


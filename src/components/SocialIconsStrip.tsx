"use client";

interface SocialIconsStripProps {
  className?: string;
  innerBgClass?: string;
}

const SOCIAL_LINKS = [
  {
    label: "Google Business Profile",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor">
        <path d="M21.8 12.23c0-.7-.06-1.4-.19-2.07H12v3.92h5.49a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.05-4.4 3.05-7.49Z" />
        <path d="M12 22c2.75 0 5.06-.91 6.75-2.47l-3.3-2.56c-.91.61-2.08.98-3.45.98-2.65 0-4.9-1.79-5.7-4.2H2.89v2.64A10 10 0 0 0 12 22Z" />
        <path d="M6.3 13.75a5.98 5.98 0 0 1 0-3.5V7.61H2.89a10 10 0 0 0 0 8.78l3.41-2.64Z" />
        <path d="M12 6.05c1.5 0 2.84.51 3.9 1.53l2.92-2.92C17.05 3.01 14.74 2 12 2A10 10 0 0 0 2.89 7.61l3.41 2.64c.8-2.41 3.05-4.2 5.7-4.2Z" />
      </svg>
    ),
  },
  {
    label: "Google Reviews",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor">
        <path d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.45l-5.87 3.09 1.12-6.53L2.51 9.39l6.56-.95L12 2.5Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor">
        <path d="M13.5 22v-8.25h2.77l.41-3.22H13.5V8.48c0-.93.26-1.57 1.6-1.57h1.7V4.03c-.3-.04-1.31-.13-2.49-.13-2.46 0-4.15 1.5-4.15 4.26v2.37H7.37v3.22h2.79V22h3.34Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor">
        <path d="M6.94 8.5H3.56V19.5h3.38V8.5Zm.22-3.41a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0ZM20.44 13.02c0-3.22-1.72-4.72-4.01-4.72-1.85 0-2.68 1.02-3.14 1.73V8.5H9.92c.04.99 0 11 0 11h3.37v-6.14c0-.33.02-.66.12-.89.26-.66.86-1.34 1.87-1.34 1.32 0 1.85 1.01 1.85 2.49V19.5h3.31v-6.48Z" />
      </svg>
    ),
  },
  {
    label: "Alignable",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3.2L4.8 20.5h3.1l1.55-3.9h5.1l1.55 3.9h3.1L12 3.2Z" />
        <path d="M10.4 13.7L12 9.4l1.6 4.3h-3.2Z" />
      </svg>
    ),
  },
  {
    label: "Google Maps Location",
    svg: (
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 sm:w-7 sm:h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    ),
  },
];

/** Single-line solid gold social icons framed by a 1px gold-gradient outline border. */
export default function SocialIconsStrip({
  className = "justify-center",
  innerBgClass = "bg-[#0c0b09]",
}: SocialIconsStripProps) {
  return (
    <div className={`flex flex-nowrap items-center gap-2 sm:gap-3.5 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label={social.label}
          title={social.label}
          className="group p-[1px] rounded-lg bg-gradient-to-br from-[#F5E6A8]/70 via-[#D4AF37]/55 to-[#9A7D3A]/70 hover:from-[#F5E6A8] hover:via-[#D4AF37] hover:to-[#F5E6A8] hover:-translate-y-0.5 transition-all shrink-0"
        >
          <span
            className={`flex items-center justify-center p-1.5 sm:p-2 rounded-[7px] text-[#D4AF37] group-hover:text-white transition-colors ${innerBgClass}`}
          >
            {social.svg}
          </span>
        </a>
      ))}
    </div>
  );
}


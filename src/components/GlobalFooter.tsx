"use client";

import { usePathname } from "next/navigation";

export default function GlobalFooter() {
  const pathname = usePathname();
  
  if (pathname === "/mark" || pathname === "/rachael" || pathname === "/preview-mockup") {
    return null;
  }

  return (
    <footer className="relative px-8 py-12 bg-black border-t border-white/5 mt-auto w-full z-40">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-xl font-bold tracking-widest text-white/30 uppercase block">
              Davis & Garnett
            </span>
            <p className="text-xs font-medium text-white/30 mt-2 tracking-widest uppercase">
              Align Right Realty Carrollwood
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <a href="mailto:msdavis118@gmail.com" className="text-xs font-semibold text-white/50 hover:text-white transition-colors tracking-widest uppercase">msdavis118@gmail.com</a>
            <a href="mailto:rachaellgarnett@gmail.com" className="text-xs font-semibold text-white/50 hover:text-white transition-colors tracking-widest uppercase">rachaellgarnett@gmail.com</a>
          </div>
        </div>

        <div className="w-full h-px bg-white/5" />

        <div className="flex flex-wrap justify-center items-center gap-4 text-center">
          <span className="label-caps text-[0.65rem] tracking-[0.2em] text-[#D4AF37]">Powered by ClickMe</span>
          <span className="text-white/20 text-xs">•</span>
          <a href="mailto:launch@clickme.life" className="label-caps text-[0.65rem] tracking-widest text-white/40 hover:text-[#D4AF37] transition-colors">launch@clickme.life</a>
          <span className="text-white/20 text-xs">•</span>
          <span className="label-caps text-[0.65rem] tracking-widest text-white/40">Contact Nick: 725-225-2641</span>
        </div>
      </div>
    </footer>
  );
}

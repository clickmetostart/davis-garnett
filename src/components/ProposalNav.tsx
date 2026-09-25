"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

const NAV_LINKS = [
  { label: "Preview v1", href: "/" },
  { label: "V1-Light", href: "/v1-light" },
  { label: "Featured", href: "/featured" },
  { label: "Properties", href: "/properties" },
  { label: "R Listing", href: "/r-listing" },
  { label: "C Listing", href: "/c-listing" },
  { label: "Dashboard", href: "/clickme" },
];

export default function ProposalNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505] border-b border-white/8">
      <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <DavisGarnettLogo variant="dark" className="w-40 max-w-full" />
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors py-4 block">
              {l.label}
            </Link>
          ))}

        </div>

        <button className="lg:hidden p-2 text-white/60" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-b border-[#D4AF37]/20 p-8 flex flex-col gap-6 shadow-2xl h-screen overflow-y-auto pb-32">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setIsOpen(false)} className="block text-lg font-serif text-white hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-4">
              {l.label}
            </Link>
          ))}

        </div>
      )}
    </nav>
  );
}

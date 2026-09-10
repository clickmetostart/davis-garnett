"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

const NAV_LINKS = [
  { label: "Main Proposal", href: "/" },
  { label: "Project Scope", href: "/scope" },
  { label: "Branding", href: "/branding" },
  { 
    label: "Live Previews", 
    href: "#",
    subLinks: [
      { label: "Preview v1", href: "/preview-mockup" },
      { label: "Preview v2 (loading...)", href: "#", disabled: true },
      { label: "Preview v3 (loading...)", href: "#", disabled: true },
      { label: "Preview v4 (loading...)", href: "#", disabled: true }
    ]
  },
  { label: "Dashboard", href: "/clickme" },
];

export default function ProposalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <DavisGarnettLogo variant="dark" className="w-40 max-w-full" />
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <div key={l.label} className="relative group" onMouseEnter={() => setOpenDropdown(l.label)} onMouseLeave={() => setOpenDropdown(null)}>
              {l.subLinks ? (
                <div className="flex items-center gap-1 cursor-pointer text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors py-4">
                  {l.label}
                  <ChevronDown className="w-3 h-3" />
                </div>
              ) : (
                <Link href={l.href} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors py-4 block">
                  {l.label}
                </Link>
              )}

              {/* Dropdown Menu */}
              {l.subLinks && openDropdown === l.label && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-md shadow-2xl overflow-hidden py-2">
                  {l.subLinks.map((sub) => (
                    sub.disabled ? (
                      <span key={sub.label} className="block px-4 py-2 text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 cursor-not-allowed">
                        {sub.label}
                      </span>
                    ) : (
                      <Link key={sub.label} href={sub.href} className="block px-4 py-2 text-[10px] font-bold tracking-[0.1em] uppercase text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        {sub.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/#investment" className="btn-gold text-[0.65rem] py-3 px-6 ml-4">
            Your Investment
          </Link>
        </div>

        <button className="lg:hidden p-2 text-white/60" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-b border-[#D4AF37]/20 p-8 flex flex-col gap-6 shadow-2xl h-screen overflow-y-auto pb-32">
          {NAV_LINKS.map((l) => (
            <div key={l.label}>
              {l.subLinks ? (
                <>
                  <div className="text-lg font-serif text-white/60 border-b border-white/10 pb-2 mb-2">
                    {l.label}
                  </div>
                  <div className="pl-4 flex flex-col gap-3">
                    {l.subLinks.map(sub => (
                      sub.disabled ? (
                        <span key={sub.label} className="text-sm font-serif text-white/30 cursor-not-allowed">
                          {sub.label}
                        </span>
                      ) : (
                        <Link key={sub.label} href={sub.href} onClick={() => setIsOpen(false)} className="text-sm font-serif text-white hover:text-[#D4AF37] transition-colors">
                          {sub.label}
                        </Link>
                      )
                    ))}
                  </div>
                </>
              ) : (
                <Link href={l.href} onClick={() => setIsOpen(false)} className="block text-lg font-serif text-white hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-4">
                  {l.label}
                </Link>
              )}
            </div>
          ))}
          <Link href="/#investment" onClick={() => setIsOpen(false)} className="btn-gold text-center py-4 mt-4">
            Your Investment
          </Link>
        </div>
      )}
    </nav>
  );
}

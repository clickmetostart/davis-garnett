"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Main Proposal", href: "/" },
  { label: "Project Scope", href: "/scope" },
  { label: "Branding", href: "/branding" },
  { label: "Live Preview", href: "/preview-mockup" },
];

export default function ProposalNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <Image 
            src="/davis and garnett logo mobile png.png" 
            alt="Davis & Garnett" 
            width={200} 
            height={60} 
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors">
              {l.label}
            </Link>
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
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-b border-[#D4AF37]/20 p-8 flex flex-col gap-6 shadow-2xl">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setIsOpen(false)} className="text-lg font-serif text-white hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-4">
              {l.label}
            </Link>
          ))}
          <Link href="/#investment" onClick={() => setIsOpen(false)} className="btn-gold text-center py-4 mt-4">
            Your Investment
          </Link>
        </div>
      )}
    </nav>
  );
}

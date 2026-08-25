"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const PREVIEW_LINKS = [
  { label: "Commercial", href: "#" },
  { label: "Residential", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Contact", href: "#" },
];

export default function PreviewNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-8 w-full z-50 bg-[#050505]/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/preview-mockup" onClick={() => setIsOpen(false)} className="hover:opacity-80 transition-opacity">
          <Image 
            src="/davis and garnett logo mobile png.png" 
            alt="Davis & Garnett" 
            width={200} 
            height={60} 
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest text-white/70">
          {PREVIEW_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-[#D4AF37] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <button className="lg:hidden p-2 text-white/60 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-[#050505]/95 backdrop-blur-3xl border-b border-[#D4AF37]/20 p-8 flex flex-col gap-6 shadow-2xl">
          {PREVIEW_LINKS.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setIsOpen(false)} className="text-lg font-serif text-white hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-4">
              {l.label}
            </Link>
          ))}
          <Link href="/preview-mockup" onClick={() => setIsOpen(false)} className="btn-gold text-center py-4 mt-4">
            Connect With Us
          </Link>
        </div>
      )}
    </nav>
  );
}

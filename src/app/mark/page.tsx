import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone, Mail, Building2, MapPin, TrendingUp, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mark Davis | Commercial Real Estate | Tampa Bay",
  description: "Connect with Mark Davis, Broker Associate at Align Right Realty Carrollwood. Specializing in commercial real estate, investment properties, and business relocations across Tampa Bay.",
};

const LINKS = [
  { label: "View Commercial Listings", href: "/davis#listings", icon: Building2 },
  { label: "Investment Properties", href: "/davis#investment", icon: TrendingUp },
  { label: "Schedule a Consultation", href: "mailto:msdavis118@gmail.com", icon: Star },
  { label: "Meet Rachael Garnett", href: "/rachael", icon: ArrowRight },
  { label: "Davis & Garnett Main Page", href: "/", icon: ArrowRight },
];

export default function MarkLinktree() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative selection:bg-[#D4AF37] selection:text-black">
      
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-white/3 blur-[150px]" />
      </div>

      {/* Back link */}
      <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
        <ArrowLeft className="w-3.5 h-3.5" /> Proposal
      </Link>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen py-20 px-6">

        {/* Profile */}
        <div className="w-28 h-28 relative rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-6">
          <Image src="/mark-davis-headshot.png" alt="Mark Davis" fill className="object-cover" priority />
        </div>

        <h1 className="font-serif text-3xl text-white mb-1">Mark Davis</h1>
        <p className="text-white/50 text-sm mb-1">Broker Associate · Commercial & Residential</p>
        <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Align Right Realty Carrollwood</p>

        {/* Tampa Bay tag */}
        <div className="flex items-center gap-1.5 text-white/40 text-xs mb-10">
          <MapPin className="w-3 h-3" />
          Tampa Bay, FL
        </div>

        {/* Quick contact */}
        <div className="flex gap-4 mb-10">
          <a href="tel:941-737-4127" className="flex items-center gap-2 px-5 py-2.5 border border-white/15 bg-white/5 rounded-full text-xs text-white/80 hover:bg-white/15 transition-colors">
            <Phone className="w-3.5 h-3.5" /> 941.737.4127
          </a>
          <a href="mailto:msdavis118@gmail.com" className="flex items-center gap-2 px-5 py-2.5 border border-white/15 bg-white/5 rounded-full text-xs text-white/80 hover:bg-white/15 transition-colors">
            <Mail className="w-3.5 h-3.5" /> Email Mark
          </a>
        </div>

        {/* Link buttons */}
        <div className="w-full max-w-md flex flex-col gap-3 mb-12">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                {label}
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Specialties */}
        <div className="w-full max-w-md mb-12">
          <p className="text-xs uppercase tracking-widest text-white/30 text-center mb-4">Specialties</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Commercial Leasing", "Residential Sales", "Investment Properties", "Business Relocations", "Industrial", "Multi-Family", "Tampa Bay"].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-white/50 text-xs">{tag}</span>
            ))}
          </div>
        </div>

        {/* Brokerage */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-[120px] h-[40px] opacity-50">
            <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
          </div>
        </div>

      </div>
    </div>
  );
}

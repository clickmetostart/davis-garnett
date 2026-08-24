import Link from "next/link";
import { ArrowLeft, Layout, Palette, Type, Image as ImageIcon, ChevronRight } from "lucide-react";

export default function PreviewMockup() {
  return (
    <div className="min-h-screen text-white relative selection:bg-[#D4AF37] selection:text-black font-sans bg-[#050505]">
      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-[#D4AF37] transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Proposal
          </Link>
          <span className="label-caps text-[0.6rem] tracking-[0.2em] text-[#555]">Davis & Garnett Mockup</span>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <header className="relative pt-40 pb-20 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8 bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-md px-5 py-2.5 rounded-full">
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Initial Direction</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl mb-8 font-light tracking-wide">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Inspiration.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            A sneak peek into the visual aesthetic, typography, and mood we are exploring for the Davis & Garnett unified digital platform.
          </p>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="py-12 px-8 max-w-screen-xl mx-auto flex flex-col gap-24">
        
        {/* Mood Board & Colors */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Palette className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-2xl">Color Palette</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Obsidian", hex: "#050505", border: "border-white/10" },
              { name: "Charcoal", hex: "#111111", border: "border-white/5" },
              { name: "Signature Gold", hex: "#D4AF37", border: "border-[#D4AF37]/20" },
              { name: "Champagne", hex: "#F6E3B0", border: "border-transparent", textDark: true },
            ].map((color) => (
              <div key={color.name} className="flex flex-col gap-3">
                <div 
                  className={`w-full aspect-video rounded-lg border ${color.border} shadow-lg`}
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <p className="text-sm font-medium text-white">{color.name}</p>
                  <p className="text-xs text-white/50">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Type className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-2xl">Typography</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 bg-white/[0.02] border border-white/5 p-12 rounded-2xl">
            <div className="space-y-6">
              <div>
                <span className="label-caps text-[#D4AF37] block mb-2 text-xs">Primary Serif (Headings)</span>
                <p className="font-serif text-4xl text-white">Playfair Display</p>
                <p className="text-white/50 mt-2 text-sm font-serif italic">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <span className="label-caps text-[#D4AF37] block mb-2 text-xs">Secondary Sans (Body)</span>
                <p className="font-sans text-3xl text-white font-light">Inter / Outfit</p>
                <p className="text-white/50 mt-2 text-sm font-sans font-light">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="text-white/50 mt-1 text-sm font-sans font-light">abcdefghijklmnopqrstuvwxyz</p>
              </div>
            </div>
            <div className="bg-black/50 p-8 rounded-xl border border-white/10 flex flex-col justify-center gap-6">
              <h1 className="font-serif text-4xl text-white leading-tight">Elevating Tampa Bay Real Estate.</h1>
              <p className="font-sans text-white/60 font-light leading-relaxed">
                We are combining commercial dominance with residential finesse to deliver an unparalleled advisory experience for our clients.
              </p>
              <button className="self-start px-6 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors">
                Explore Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* Hero Concept Wireframe */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Layout className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-2xl">Hero Section Concept</h2>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111] aspect-[16/9] md:aspect-[21/9] flex items-center shadow-2xl group">
            {/* Abstract Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-gradient-to-r from-[#D4AF37]/10 to-transparent blur-3xl opacity-50" />
            
            <div className="relative z-10 w-full px-12 md:px-24 flex flex-col items-start gap-6">
              <span className="label-caps text-white/50 text-[0.6rem] tracking-[0.3em] uppercase">Davis & Garnett</span>
              <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] max-w-2xl font-light">
                The New Standard For <span className="italic text-[#D4AF37]">Tampa Bay.</span>
              </h2>
              <div className="w-16 h-px bg-white/20 my-2" />
              <div className="flex gap-4 items-center">
                <div className="px-6 py-3 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-white transition-colors">
                  Commercial
                </div>
                <div className="px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-colors">
                  Residential
                </div>
              </div>
            </div>
            
            {/* Image Placeholder on Right */}
            <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-black/40 border-l border-white/10 flex items-center justify-center opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700">
              <ImageIcon className="w-12 h-12 text-white/20" />
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center border-t border-white/5 mt-24">
        <p className="text-white/30 text-xs tracking-widest uppercase">System Design by ClickMe</p>
      </footer>
    </div>
  );
}

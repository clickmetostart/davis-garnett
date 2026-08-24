import Link from "next/link";
import Image from "next/image";
import DavisGarnettLogo, { DavisGarnettMark } from "@/components/DavisGarnettLogo";
import {
  ArrowLeft, Palette, Type, Smartphone, ShieldCheck,
  PrinterIcon, Layers, Globe, CheckCircle2, ArrowRight, Sparkles, Tag, Mail,
  MapPin, Star
} from "lucide-react";

const PHYSICAL_ASSETS = [
  {
    category: "Stationery",
    items: [
      "Business cards — Mark Davis (Broker Associate | Commercial)",
      "Business cards — Rachael Garnett (Real Estate Advisor | Residential)",
      "Davis & Garnett team business cards",
      "Letterhead — branded A4 and US Letter",
      "Envelopes — #10 and A2 with return address",
      "Note cards & thank-you cards",
      "Presentation folders",
    ],
  },
  {
    category: "Signage & Yard Signs",
    items: [
      "For Sale / For Lease yard sign — Davis & Garnett branded",
      "Open House directional signs (A-frame)",
      "Sold rider attachments",
      "Coming Soon yard signs",
      "Office door / suite signage",
      "Car door magnets",
      "Personalized directional stake signs",
    ],
  },
  {
    category: "Marketing Collateral",
    items: [
      "Property listing flyers — single-sided (Mark / Commercial)",
      "Property listing flyers — single-sided (Rachael / Residential)",
      "Bi-fold property brochures",
      "Just Listed / Just Sold postcards",
      "New Neighbor / Area Introduction mailers",
      "Market report one-pagers (commercial & residential)",
      "Buyer & Seller guide booklets",
      "Open house sign-in sheets",
    ],
  },
  {
    category: "Branded Merchandise",
    items: [
      "Matte black Yeti tumblers with gold logo",
      "Premium tote bags — client closing gifts",
      "Branded pens (metal, matte black)",
      "Notepads and padfolios",
      "Branded golf shirts / quarter-zips",
      "Branded caps",
      "Custom-branded closing gift boxes",
      "Branded lanyards and name badges",
    ],
  },
  {
    category: "Event & Open House",
    items: [
      "Open house event programs",
      "Pop-up banner / retractable display stand",
      "Table tent cards with QR codes",
      "Branded wine / refreshment labels for client events",
      "Branded name badges and lanyards",
      "Closing ceremony branded kits",
    ],
  },
];

const DIGITAL_ASSETS = [
  {
    category: "Social Media",
    items: [
      "Facebook cover image — Davis & Garnett team",
      "Facebook profile photo — each agent",
      "LinkedIn banner — Mark Davis (Commercial focus)",
      "LinkedIn banner — Rachael Garnett (Residential focus)",
      "YouTube channel art — Davis & Garnett team",
      "YouTube profile photo",
      "Instagram bio image / highlight covers",
      "Pinterest board covers",
      "TikTok profile branding",
    ],
  },
  {
    category: "Bio Link Pages",
    items: [
      "Davis & Garnett team Linktree — /linktree",
      "Mark Davis personal Linktree — /mark",
      "Rachael Garnett personal Linktree — /rachael",
      "QR codes for each agent (printable, high-resolution)",
      "QR code linking to team listings page",
      "Branded digital business card (NFC / tap-to-share ready)",
    ],
  },
  {
    category: "Email & Communications",
    items: [
      "Email signature — Mark Davis (HTML formatted)",
      "Email signature — Rachael Garnett (HTML formatted)",
      "Davis & Garnett team email signature",
      "Branded email newsletter header",
      "Automated buyer / seller email sequence templates",
      "Follow-up email templates (post-showing, post-close)",
    ],
  },
  {
    category: "Presentation & Proposals",
    items: [
      "Listing presentation deck (Keynote / PowerPoint / PDF)",
      "Buyer consultation presentation",
      "Market analysis / CMA template",
      "Commercial investment one-pager",
      "Annual brand impact report template",
    ],
  },
];

export default function BrandingBook() {
  return (
    <div className="min-h-screen text-white relative selection:bg-[#D4AF37] selection:text-black font-sans bg-[#050505]">

      {/* ── AMBIENT GLOW ── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D4AF37]/8 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white/3 blur-[120px]" />
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-[#D4AF37] transition-colors uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Proposal
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mark" className="hidden md:block label-caps text-white/50 hover:text-white transition-colors text-[0.6rem]">Mark's Page</Link>
            <Link href="/rachael" className="hidden md:block label-caps text-white/50 hover:text-white transition-colors text-[0.6rem]">Rachael's Page</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO HEADER ── */}
      <header className="relative pt-40 pb-24 px-8 text-center border-b border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-8 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-6 py-2.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">Brand Guidelines & Asset Catalogue</span>
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl mb-6 font-light tracking-wide">
            The Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F6E3B0]">Identity.</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
            The complete brand system for Davis & Garnett — covering every touchpoint from physical collateral to digital presence. This is how we ensure a unified, premium identity across Tampa Bay and beyond.
          </p>
        </div>
      </header>

      <main className="py-20 px-8 max-w-screen-xl mx-auto flex flex-col gap-32">

        {/* ── 0. THE LOGO ── */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-5">
            <Tag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">The Logo</h2>
          </div>

          <p className="text-white/60 text-lg font-light leading-relaxed max-w-4xl mb-12">
            We took your original concept and rebuilt it from the ground up as a mathematically perfect vector graphic using your exact brand typography. This means it will render flawlessly and razor-sharp across any medium at any size — from a physical business card to a highway billboard, or a digital social profile. Like every asset we build during this process, the master vector files are fully yours to keep and use however you need.
          </p>

          {/* Light Version */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Primary — Light (on white backgrounds)</p>
            <div className="bg-white rounded-2xl p-10 md:p-14 flex items-center justify-center border border-white/10">
              <DavisGarnettLogo variant="light" width={700} />
            </div>
          </div>

          {/* Dark / Reverse Version */}
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Reverse — Dark (on dark/obsidian backgrounds)</p>
            <div className="bg-[#050505] rounded-2xl p-10 md:p-14 flex items-center justify-center border border-white/10">
              <DavisGarnettLogo variant="dark" width={700} />
            </div>
          </div>

          {/* Mark + Font Anatomy */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Isolated Mark — Light */}
            <div className="glass-card p-8 flex flex-col items-center gap-4">
              <p className="text-xs uppercase tracking-widest text-white/40 self-start">The Mark — Light</p>
              <div className="bg-white rounded-xl p-6 flex items-center justify-center w-full">
                <DavisGarnettMark variant="light" size={130} />
              </div>
              <p className="text-xs text-white/40 font-light text-center">Standalone monogram for profile photos, favicons, stamps, and embossing</p>
            </div>

            {/* Isolated Mark — Dark */}
            <div className="glass-card p-8 flex flex-col items-center gap-4">
              <p className="text-xs uppercase tracking-widest text-white/40 self-start">The Mark — Dark</p>
              <div className="bg-[#050505] rounded-xl p-6 flex items-center justify-center w-full border border-white/10">
                <DavisGarnettMark variant="dark" size={130} />
              </div>
              <p className="text-xs text-white/40 font-light text-center">Used on dark brand surfaces, social media profiles, and merch embroidery</p>
            </div>

            {/* Font Anatomy */}
            <div className="glass-card p-8 flex flex-col gap-6">
              <p className="text-xs uppercase tracking-widest text-white/40">Logo Fonts</p>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest text-[#b39556] mb-1">Wordmark</p>
                  <p className="text-2xl text-white" style={{ fontFamily: "'AIVeritas', serif" }}>AIVeritas Roman</p>
                  <p className="text-xs text-white/40 mt-1 font-light">DAVIS &amp; GARNETT headline — all caps, tracked</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest text-[#b39556] mb-1">Subtitle</p>
                  <p className="text-xl text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.2em" }}>MONTSERRAT</p>
                  <p className="text-xs text-white/40 mt-1 font-light">COMMERCIAL RESIDENTIAL ADVISORS — wide tracked caps</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest text-[#b39556] mb-1">Logo Gold</p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: "#b39556" }} />
                    <div>
                      <p className="text-white text-sm font-mono">#b39556</p>
                      <p className="text-white/40 text-xs">Ampersand, mark, rules</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 1. COLOR & TYPOGRAPHY ── */}
        <section>
          <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-5">
            <Palette className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">Core Identity System</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Colors */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/50 mb-6">Color Palette</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Obsidian", hex: "#050505", usage: "Primary backgrounds", border: "border-white/10" },
                  { name: "Charcoal", hex: "#111111", usage: "Card & surface backgrounds", border: "border-white/5" },
                  { name: "Signature Gold", hex: "#D4AF37", usage: "Primary brand accent", border: "border-[#D4AF37]/30" },
                  { name: "Champagne", hex: "#F6E3B0", usage: "Gradient highlights", border: "border-white/10" },
                ].map((color) => (
                  <div key={color.name} className="glass-card p-5 flex flex-col gap-4 group hover:border-white/20 transition-colors">
                    <div
                      className={`w-full aspect-video rounded-lg border ${color.border} shadow-inner`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{color.name}</p>
                      <p className="text-xs text-[#D4AF37] font-mono mt-0.5">{color.hex}</p>
                      <p className="text-xs text-white/40 mt-1">{color.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/50 mb-6">Typography Scale</h3>
              <div className="glass-card p-10 flex flex-col gap-10 h-full">
                <div>
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#D4AF37] block mb-3">Serif — Headlines & Hero Text</span>
                  <p className="font-serif text-5xl text-white leading-none mb-2">Aa</p>
                  <p className="font-serif text-lg text-white/70">Playfair Display</p>
                  <p className="font-serif text-sm text-white/40 italic mt-1">"The New Standard For Tampa Bay."</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#D4AF37] block mb-3">Sans-Serif — Body & UI</span>
                  <p className="font-sans text-5xl text-white font-light leading-none mb-2">Aa</p>
                  <p className="font-sans text-lg text-white/70 font-light">Inter</p>
                  <p className="font-sans text-sm text-white/40 font-light mt-1">Combining commercial authority with residential expertise.</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Display", size: "72px", weight: "300" },
                    { label: "Heading", size: "36px", weight: "600" },
                    { label: "Body", size: "16px", weight: "300" },
                  ].map(t => (
                    <div key={t.label} className="bg-white/5 rounded-lg p-4">
                      <p className="text-[0.55rem] uppercase tracking-widest text-white/40 mb-2">{t.label}</p>
                      <p className="text-white font-mono text-xs">{t.size}</p>
                      <p className="text-white/40 font-mono text-[0.6rem]">W{t.weight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. BROKERAGE COMPLIANCE ── */}
        <section>
          <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">Brokerage Compliance — Align Right Realty</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Logo Display */}
            <div className="glass-card p-10 flex flex-col gap-6">
              <h3 className="text-lg font-serif">Logo Usage</h3>
              
              {/* Light background */}
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-3">On Light Backgrounds</span>
                <div className="bg-white rounded-xl p-8 flex items-center justify-center">
                  <div className="relative w-[180px] h-[70px]">
                    <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain" />
                  </div>
                </div>
              </div>

              {/* Dark background */}
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-3">On Dark Backgrounds</span>
                <div className="bg-[#111] border border-white/10 rounded-xl p-8 flex items-center justify-center">
                  <div className="relative w-[180px] h-[70px]">
                    <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="glass-card p-10 flex flex-col gap-6">
              <h3 className="text-lg font-serif">Application Rules</h3>
              <p className="text-white/60 font-light text-sm leading-relaxed">
                All Davis & Garnett branded assets must carry the Align Right Realty Carrollwood mark to satisfy state licensing, MLS, and corporate requirements.
              </p>
              <ul className="flex flex-col gap-5">
                {[
                  { rule: "Size Ratio", detail: "Brokerage logo must be no smaller than 25% of the Davis & Garnett team logo on all printed collateral." },
                  { rule: "Color Ways", detail: "Full color logo on white / light backgrounds. White-reversed logo on dark / obsidian backgrounds." },
                  { rule: "Clear Space", detail: "Maintain minimum clear space equal to the height of the 'R' in Realty on all four sides." },
                  { rule: "Digital Bio", detail: "Brokerage name must appear in bio fields across all social media accounts and the website footer." },
                  { rule: "No Modifications", detail: "Do not rotate, stretch, recolor, or alter the Align Right logo in any way." },
                ].map((r) => (
                  <li key={r.rule} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                    <div>
                      <span className="text-white font-semibold text-sm">{r.rule}:</span>
                      <span className="text-white/60 text-sm font-light"> {r.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 3. PHYSICAL ASSETS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-5">
            <PrinterIcon className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">Physical Asset Catalogue</h2>
          </div>
          <p className="text-white/50 font-light mb-12 max-w-2xl">
            Every physical touchpoint a client or prospect will encounter — designed and printed in the Davis & Garnett brand system.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHYSICAL_ASSETS.map((group) => (
              <div key={group.category} className="glass-card p-8 flex flex-col gap-5">
                <h3 className="font-serif text-xl text-white border-b border-white/10 pb-4">{group.category}</h3>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. DIGITAL ASSETS ── */}
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-5">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">Digital Asset Catalogue</h2>
          </div>
          <p className="text-white/50 font-light mb-12 max-w-2xl">
            Every digital touchpoint — from social bios to email signatures — unified in the same system.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {DIGITAL_ASSETS.map((group) => (
              <div key={group.category} className="glass-card p-8 flex flex-col gap-5">
                <h3 className="font-serif text-xl text-white border-b border-white/10 pb-4">{group.category}</h3>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. BIO LINK PAGES ── */}
        <section>
          <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-5">
            <Smartphone className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">Agent Bio Link Pages</h2>
          </div>
          <p className="text-white/60 font-light mb-12 max-w-2xl">
            Instead of sending people to a generic third-party Linktree, we build each agent a custom branded bio link page directly on the Davis & Garnett domain. Every tap builds your authority — not someone else's.
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-start">

            {/* Team Linktree */}
            <div className="glass-card p-8 flex flex-col items-center gap-4 border border-[#D4AF37]/20">
              <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-[#D4AF37]">
                <Image src="/davis-garnett-real-combo.png" alt="Team" fill className="object-cover object-top" />
              </div>
              <div className="flex flex-col items-center w-full px-2 mt-1">
                <div className="font-serif text-[1.3rem] tracking-widest flex items-center justify-center whitespace-nowrap text-[#F6E3B0]">
                  DAVIS <span className="text-[#D4AF37] text-3xl mx-1.5 leading-[0] translate-y-[-1px]">&amp;</span> GARNETT
                </div>
                <div className="w-full h-[1px] bg-[#D4AF37] mt-3 mb-1.5 opacity-70" />
                <p className="text-[#F6E3B0] text-[0.55rem] uppercase tracking-[0.2em] font-light font-['Montserrat',sans-serif] w-full text-center">Commercial &nbsp;&nbsp; Residential &nbsp;&nbsp; Advisors</p>
                <div className="w-full h-[1px] bg-[#D4AF37] mt-1.5 mb-2 opacity-70" />
              </div>

              <div className="flex flex-col items-center gap-1.5 mt-2">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" /> <span>(813) 555-0192</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> <span>team@davisgarnett.com</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 mt-4">
                {["Our Listings", "Commercial", "Residential", "Meet Mark", "Meet Rachael", "Contact Us"].map(l => (
                  <div key={l} className="w-full py-2.5 border border-white/10 bg-white/5 text-xs text-center tracking-widest uppercase text-white/80 rounded hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">{l}</div>
                ))}
              </div>

              <div className="flex items-center gap-5 mt-4 text-white/40">
                <InstaIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <FbIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <LiIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <MapPin className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <Star className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
              </div>

              {/* Compliance Logo */}
              <div className="w-full mt-4 pt-6 border-t border-white/5 flex justify-center">
                <div className="relative w-32 h-7 opacity-30 hover:opacity-60 transition-opacity grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>

            {/* Mark */}
            <div className="glass-card p-8 flex flex-col items-center gap-4 border border-[#D4AF37]/20">
              <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-[#D4AF37]">
                <Image src="/mark-davis-headshot.png" alt="Mark Davis" fill className="object-cover" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl">Mark Davis</h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Broker Associate · Commercial & Residential</p>
              </div>

              <div className="flex flex-col items-center gap-1.5 mt-2">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" /> <span>(941) 737-4127</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> <span>mark@davisgarnett.com</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 mt-4">
                {["Commercial Listings", "Residential Listings", "Book a Consultation", "Email Mark", "Call Mark"].map(l => (
                  <div key={l} className="w-full py-2.5 border border-white/10 bg-white/5 text-xs text-center tracking-widest uppercase text-white/80 rounded hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">{l}</div>
                ))}
              </div>

              <div className="flex items-center gap-5 mt-4 text-white/40">
                <InstaIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <LiIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <MapPin className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <Star className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
              </div>

              {/* Compliance Logo */}
              <div className="w-full mt-4 pt-6 border-t border-white/5 flex justify-center">
                <div className="relative w-32 h-7 opacity-30 hover:opacity-60 transition-opacity grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>

            {/* Rachael */}
            <div className="glass-card p-8 flex flex-col items-center gap-4 border border-[#D4AF37]/20">
              <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-[#D4AF37]">
                <Image src="/rachael-garnett-headshot.png" alt="Rachael Garnett" fill className="object-cover" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl">Rachael Garnett</h3>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Real Estate Advisor · Residential & Commercial</p>
              </div>

              <div className="flex flex-col items-center gap-1.5 mt-2">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" /> <span>(727) 808-3344</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> <span>rachael@davisgarnett.com</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 mt-4">
                {["Residential Listings", "Commercial Listings", "Book a Consultation", "Email Rachael", "Call Rachael"].map(l => (
                  <div key={l} className="w-full py-2.5 border border-white/10 bg-white/5 text-xs text-center tracking-widest uppercase text-white/80 rounded hover:bg-[#D4AF37]/20 transition-colors cursor-pointer">{l}</div>
                ))}
              </div>

              <div className="flex items-center gap-5 mt-4 text-white/40">
                <InstaIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <FbIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <LiIcon className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <MapPin className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                <Star className="w-4 h-4 hover:text-[#D4AF37] transition-colors cursor-pointer" />
              </div>

              {/* Compliance Logo */}
              <div className="w-full mt-4 pt-6 border-t border-white/5 flex justify-center">
                <div className="relative w-32 h-7 opacity-30 hover:opacity-60 transition-opacity grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 6. SOCIAL MEDIA PRESENCE ── */}
        <section>
          <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-5">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-3xl">Social Media Presence</h2>
          </div>

          <div className="flex flex-col gap-8 mb-12">
            {/* Team Commercial Cover (YouTube) */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 flex justify-between">
                <span>Team Commercial Cover (YouTube)</span>
                <span className="text-[#D4AF37]/50 lowercase hidden sm:inline">2560 x 1440</span>
              </p>
              <div className="w-full aspect-[21/9] bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-50">
                  <Image src="/team-commercial-banner.png" alt="Team Commercial" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/90" />
                
                <div className="relative z-10 w-[60%] max-w-[600px] flex items-center justify-center drop-shadow-2xl">
                  <DavisGarnettLogo variant="dark" className="w-full h-auto drop-shadow-2xl" />
                </div>

                {/* Compliance Logo - Bottom Right */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 w-24 h-6 md:w-32 md:h-8 opacity-40 grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>

            {/* Team Residential Cover (LinkedIn/Facebook) */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 flex justify-between">
                <span>Team Residential Cover (Facebook / LinkedIn)</span>
                <span className="text-[#D4AF37]/50 lowercase hidden sm:inline">1640 x 624</span>
              </p>
              <div className="w-full aspect-[16/6] bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-50">
                  <Image src="/team-residential-banner.png" alt="Team Residential" fill className="object-cover object-center" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-[#050505]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-[#050505]" />
                
                <div className="relative z-10 w-[50%] max-w-[500px] flex items-center justify-center drop-shadow-2xl">
                  <DavisGarnettLogo variant="dark" className="w-full h-auto drop-shadow-2xl" />
                </div>

                {/* Compliance Logo - Bottom Right */}
                <div className="absolute bottom-3 right-3 md:bottom-5 md:right-6 w-20 h-5 md:w-28 md:h-7 opacity-40 grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>

            {/* Mark Individual Cover */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 flex justify-between">
                <span>Mark's Commercial Cover (Facebook / LinkedIn)</span>
                <span className="text-[#D4AF37]/50 lowercase hidden sm:inline">1640 x 624</span>
              </p>
              <div className="w-full aspect-[16/6] bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-80">
                  <Image src="/mark-commercial-banner.png" alt="Mark Commercial" fill className="object-cover object-left" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                
                {/* Logo anchored to the right side where empty space is */}
                <div className="absolute inset-y-0 right-8 md:right-16 w-1/2 flex items-center justify-end drop-shadow-2xl">
                  <DavisGarnettLogo variant="dark" className="w-full max-w-[450px] h-auto drop-shadow-2xl" />
                </div>

                {/* Compliance Logo - Bottom Right */}
                <div className="absolute bottom-3 right-3 md:bottom-5 md:right-6 w-20 h-5 md:w-28 md:h-7 opacity-40 grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>

            {/* Rachael Individual Cover */}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4 flex justify-between">
                <span>Rachael's Residential Cover (Facebook / LinkedIn)</span>
                <span className="text-[#D4AF37]/50 lowercase hidden sm:inline">1640 x 624</span>
              </p>
              <div className="w-full aspect-[16/6] bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-80">
                  <Image src="/rachael-residential-banner.png" alt="Rachael Residential" fill className="object-cover object-left" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                
                {/* Logo anchored to the right side where empty space is */}
                <div className="absolute inset-y-0 right-8 md:right-16 w-1/2 flex items-center justify-end drop-shadow-2xl">
                  <DavisGarnettLogo variant="dark" className="w-full max-w-[450px] h-auto drop-shadow-2xl" />
                </div>

                {/* Compliance Logo - Bottom Right */}
                <div className="absolute bottom-3 right-3 md:bottom-5 md:right-6 w-20 h-5 md:w-28 md:h-7 opacity-40 grayscale">
                  <Image src="/align-right-realty-logo.webp" alt="Align Right Realty" fill className="object-contain brightness-0 invert" />
                </div>
              </div>
            </div>
          </div>

          {/* Social Feed Grid */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Social Feed — Aesthetic Grid</p>
            <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden border border-white/10">
              {[
                "/mark-commercial-action.png",
                "/davis-garnett-real-combo.png",
                "/rachael-residential-action.png",
                "/mark-davis-headshot.png",
                "/davis-garnett-listing-2.jpg",
                "/rachael-garnett-headshot.png"
              ].map((src, i) => (
                <div key={i} className="aspect-square relative overflow-hidden group">
                  <Image src={src} alt="Feed" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 text-center border-t border-white/5 mt-24">
        <p className="text-white/30 text-xs tracking-widest uppercase">Brand System by ClickMe</p>
      </footer>
    </div>
  );
}

// Inline Social SVGs to guarantee build stability without lucide dependencies
const InstaIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const FbIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LiIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

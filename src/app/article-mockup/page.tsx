import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import DavisGarnettLogo from "@/components/DavisGarnettLogo";

export default function ArticleMockup() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      <header className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="w-16 md:w-20">
          <DavisGarnettLogo className="text-[#D4AF37]" />
        </div>
        <div className="bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Knowledge Hub</span>
        </div>
      </header>
      
      <main className="pt-32 pb-24 px-8">
        <div className="max-w-screen-md mx-auto">
          <Link href="/preview-mockup" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Hub
          </Link>
          
          <div className="mb-12">
            <div className="flex items-center gap-4 text-white/50 text-xs uppercase tracking-widest mb-6">
              <span className="text-[#D4AF37] font-bold">Commercial Real Estate</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Oct 12, 2026</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 Min Read</span>
            </div>
            
            <h1 className="font-aiveritas text-5xl md:text-6xl text-white mb-8 leading-tight">
              2026 Tampa Bay Commercial Real Estate Forecast: The Industrial Boom
            </h1>
            
            <div className="flex items-center justify-between border-y border-white/10 py-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image src="/mark-davis-headshot.png" alt="Mark Davis" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold">Mark Davis</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider">Commercial Lead</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto relative aspect-video rounded-2xl overflow-hidden mb-16">
          <Image src="/com_industrial_park_1787632905437.png" alt="Industrial Park" fill className="object-cover" />
        </div>

        <div className="max-w-screen-md mx-auto prose prose-invert prose-lg prose-headings:font-aiveritas prose-a:text-[#D4AF37]">
          <p className="lead text-xl text-white/80 font-light leading-relaxed mb-8">
            The Tampa Bay industrial market continues its unprecedented expansion. Driven by e-commerce demands, population growth, and the strategic importance of the I-4 corridor, we are seeing cap rates compress and lease rates skyrocket.
          </p>
          
          <h2>The Supply Constraint</h2>
          <p>
            Despite massive development pipelines, supply simply cannot keep up with demand. Institutional investors have recognized Tampa Bay not just as a secondary market, but as a primary logistics hub for the Southeastern United States.
          </p>
          
          <blockquote>
            "If you are waiting for a dip in the industrial market to enter, you are waiting to lose. The fundamentals are too strong. Action is required now." - Mark Davis
          </blockquote>
          
          <h2>Key Growth Corridors</h2>
          <ul>
            <li><strong>The I-4 Corridor:</strong> The undisputed king of logistics in Florida.</li>
            <li><strong>Port Tampa Bay:</strong> Expansion of deep-water capabilities is driving massive nearby warehousing needs.</li>
            <li><strong>Pasco County:</strong> Emerging as a highly viable alternative with massive acreage available for development.</li>
          </ul>
          
          <p>
            For investors, the strategy must shift from speculative building to aggressive acquisitions of existing, value-add properties, or partnering early on large-scale development sites before entitlements are finalized.
          </p>
        </div>
      </main>
    </div>
  );
}

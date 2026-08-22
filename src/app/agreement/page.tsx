"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Lock, Check } from "lucide-react";
import Link from "next/link";

function AgreementForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") === "annual" ? "annual" : "monthly";

  const [plan, setPlan] = useState(initialPlan);
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");

  const handleProceed = () => {
    if (!agreed || !signature.trim()) return;
    
    if (plan === "annual") {
      window.location.href = "https://square.link/u/bbXlzp22";
    } else {
      window.location.href = "https://square.link/u/kRqmb6U3";
    }
  };

  const isReady = agreed && signature.trim().length > 1;

  return (
    <div className="w-full max-w-xl mx-auto glass-card p-10 md:p-14 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
      
      <div className="mb-10 text-center">
        <span className="label-caps text-[#D4AF37] block mb-4">Final Step</span>
        <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">Project Agreement</h1>
        <p className="text-white/60 font-light text-sm">Review your selected build option and proceed to our secure checkout portal.</p>
      </div>

      <div className="mb-10 space-y-4">
        {/* Monthly Option */}
        <div 
          onClick={() => setPlan("monthly")}
          className={`p-6 border rounded-xl cursor-pointer transition-all ${plan === "monthly" ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">Standard Build + Monthly</span>
            {plan === "monthly" && <Check className="w-5 h-5 text-[#D4AF37]" />}
          </div>
          <p className="text-sm text-white/60 mb-2">Total Due Today: <strong className="text-white">$1,295.00</strong></p>
          <p className="text-xs text-white/40">Includes $995 setup fee and first month at $295. Renews at $295/mo.</p>
        </div>

        {/* Annual Option */}
        <div 
          onClick={() => setPlan("annual")}
          className={`p-6 border rounded-xl cursor-pointer transition-all ${plan === "annual" ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#D4AF37] font-medium tracking-wide">Best Value Annual Option</span>
            {plan === "annual" && <Check className="w-5 h-5 text-[#D4AF37]" />}
          </div>
          <p className="text-sm text-white/60 mb-2">Total Due Today: <strong className="text-white">$3,000.00</strong></p>
          <p className="text-xs text-[#D4AF37]/70">Save massive on setup. First year of membership paid in full.</p>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="mt-1 relative flex items-center justify-center shrink-0">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <div className="w-5 h-5 border border-white/30 rounded bg-white/5 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] transition-all"></div>
            {agreed && <Check className="w-3.5 h-3.5 text-black absolute pointer-events-none" />}
          </div>
          <span className="text-sm text-white/70 font-light leading-relaxed group-hover:text-white transition-colors">
            I agree to the <Link href="/scope" className="text-[#D4AF37] hover:underline" target="_blank">Digital Masterplan Scope of Work</Link>. I understand that I own all assets produced, and that this does not include external 3rd-party subscription fees (e.g., MLS/IDX).
          </span>
        </label>

        <div className="pt-4 border-t border-white/10">
          <label className="block text-sm text-white/70 mb-2">Digital Signature <span className="text-white/30 text-xs ml-1">(Type your full name)</span></label>
          <input 
            type="text" 
            placeholder="Jane Doe" 
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/5 transition-all font-serif"
          />
        </div>
      </div>

      <button 
        onClick={handleProceed}
        disabled={!isReady}
        className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-bold tracking-widest uppercase transition-all ${isReady ? "bg-[#D4AF37] text-black hover:bg-[#F6E3B0] cursor-pointer" : "bg-white/5 text-white/30 cursor-not-allowed"}`}
      >
        <Lock className="w-4 h-4" />
        Proceed to Secure Checkout
      </button>

      <p className="text-center text-[0.65rem] text-white/40 mt-6 uppercase tracking-widest">
        Payments processed securely via Square
      </p>
    </div>
  );
}

export default function AgreementPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col pt-32 pb-20 px-6 relative" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Navbar Minimal */}
      <nav className="w-full z-50 bg-transparent absolute top-0 left-0">
        <div className="max-w-screen-xl mx-auto px-8 h-24 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors">
            Davis & Garnett
          </Link>
          <span className="label-caps text-[0.6rem] tracking-[0.2em] text-[#555]">Powered by ClickMe</span>
        </div>
      </nav>

      <Suspense fallback={<div className="w-full flex justify-center py-20 text-[#D4AF37] animate-pulse label-caps">Loading Secure Portal...</div>}>
        <AgreementForm />
      </Suspense>
    </div>
  );
}

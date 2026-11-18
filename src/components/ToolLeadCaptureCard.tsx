"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface Props {
  intentTag: string;
  heading: string;
  subheading: string;
  summaryText: string;
}

export default function ToolLeadCaptureCard({
  intentTag,
  heading,
  subheading,
  summaryText,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          category: intentTag.includes("seller") ? "home-valuation" : "commercial",
          subject: `${heading} — Custom Calculation Review`,
          interest: `${intentTag}: ${summaryText}`,
          message: [
            `[Calculator Output] ${summaryText}`,
            notes ? `[Client Notes] ${notes}` : "",
          ]
            .filter(Boolean)
            .join("\n\n"),
          source: `Tool (${intentTag})`,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#111] text-white rounded-2xl p-8 border border-[#D4AF37]/40 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
        <h3 className="font-aiveritas text-2xl mb-2">Scenario Saved &amp; Sent</h3>
        <p className="text-sm text-white/75 font-light">
          Mark Davis (FL Lic BK3209459) and Rachael Garnett (FL Lic SL3378601) received your numbers and will reply with tailored local comps and guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111] text-white rounded-2xl p-7 border border-[#D4AF37]/40 shadow-xl">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-[#D4AF37] mb-2">
        <Sparkles className="w-3.5 h-3.5" /> Free Broker Review
      </div>
      <h3 className="font-aiveritas text-2xl text-white mb-2">{heading}</h3>
      <p className="text-xs text-white/70 font-light leading-relaxed mb-5">{subheading}</p>

      <div className="mb-5 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#D4AF37]">
        {summaryText}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name *"
            className="w-full px-3.5 py-2.5 bg-white/10 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/45"
          />
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name *"
            className="w-full px-3.5 py-2.5 bg-white/10 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/45"
          />
        </div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          className="w-full px-3.5 py-2.5 bg-white/10 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/45"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (Optional)"
          className="w-full px-3.5 py-2.5 bg-white/10 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/45"
        />
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Property address, corridor, or timeline..."
          className="w-full px-3.5 py-2.5 bg-white/10 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/45"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {submitting ? "Sending..." : <>Send Numbers for Custom Review <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  );
}


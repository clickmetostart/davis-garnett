"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function TopicHubLeadForm({
  hubSlug,
  hubTitle,
}: {
  hubSlug: string;
  hubTitle: string;
}) {
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
          category: hubSlug.includes("commercial")
            ? "commercial"
            : hubSlug.includes("land")
            ? "land"
            : "consultation",
          subject: `Hub Advisory Inquiry: ${hubTitle}`,
          interest: hubTitle,
          message: notes,
          source: `Topic Hub (${hubSlug})`,
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
      <div className="bg-[#f5f3ef] border border-[#D4AF37]/40 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#9A7D3A] mx-auto mb-3" />
        <h3 className="font-aiveritas text-2xl text-[#111] mb-2">Briefing Request Received</h3>
        <p className="text-sm text-[#111]/70 font-light">
          Mark &amp; Rachael will follow up within six hours with matching opportunities and local underwriting context.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-7">
      <div className="h-1 w-full bg-[#D4AF37] rounded-full mb-5" />
      <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold block mb-1.5">
        Direct Advisor Briefing
      </span>
      <h3 className="font-aiveritas text-2xl text-[#111] mb-2">
        Request Matching Inventory &amp; Comps
      </h3>
      <p className="text-xs text-[#111]/65 font-light mb-5">
        Get active &amp; upcoming listings tailored to {hubTitle}.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name *"
            className="w-full px-3.5 py-2.5 bg-white border border-[#111]/15 rounded-lg text-sm"
          />
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name *"
            className="w-full px-3.5 py-2.5 bg-white border border-[#111]/15 rounded-lg text-sm"
          />
        </div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          className="w-full px-3.5 py-2.5 bg-white border border-[#111]/15 rounded-lg text-sm"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-3.5 py-2.5 bg-white border border-[#111]/15 rounded-lg text-sm"
        />
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Price target, timeline, or questions..."
          className="w-full px-3.5 py-2.5 bg-white border border-[#111]/15 rounded-lg text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {submitting ? "Sending..." : <>Send Request <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
    </div>
  );
}


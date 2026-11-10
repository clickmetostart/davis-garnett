"use client";

import { useState } from "react";
import { X, CheckCircle2, Phone, Mail, ShieldCheck, ArrowRight } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
  defaultAdvisor?: string;
  title?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultInterest = "General Real Estate Advisory",
  defaultAdvisor = "Mark Davis & Rachael Garnett",
  title = "Schedule a Private Advisory Consultation",
}: ConsultationModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [advisor, setAdvisor] = useState(defaultAdvisor);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          email,
          phone,
          propertyInterest: interest,
          assignedAdvisor: advisor,
          notes,
          source: "Website Consultation Modal",
          status: "New",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white text-[#111] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#9A7D3A] via-[#D4AF37] to-[#9A7D3A]" />

        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f5f3ef] text-[#111]/60 hover:text-[#111] hover:bg-[#e8e4dc] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#9A7D3A] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">
                Advisory Request Confirmed
              </span>
              <h3 className="font-aiveritas text-3xl text-[#111] mb-4">
                Thank You, {firstName || "Valued Client"}.
              </h3>
              <p className="text-[#111]/70 font-light max-w-md mx-auto mb-8 leading-relaxed">
                Your inquiry has been routed directly to our executive desk at{" "}
                <strong>Davis &amp; Garnett</strong>. Mark or Rachael will reach out personally within 2 business hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#111]/70 mb-8">
                <a href="tel:941-737-4127" className="flex items-center gap-2 px-4 py-2.5 bg-[#f5f3ef] rounded-lg hover:bg-[#D4AF37]/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#9A7D3A]" /> Mark Davis: 941-737-4127
                </a>
                <a href="tel:727-808-3344" className="flex items-center gap-2 px-4 py-2.5 bg-[#f5f3ef] rounded-lg hover:bg-[#D4AF37]/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#9A7D3A]" /> Rachael Garnett: 727-808-3344
                </a>
              </div>
              <button
                onClick={resetAndClose}
                className="px-8 py-3.5 bg-[#111] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4AF37] hover:text-[#111] transition-colors"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.3em] font-bold block mb-2">
                  Davis &amp; Garnett Real Estate Advisory
                </span>
                <h2 className="font-aiveritas text-3xl md:text-4xl text-[#111] mb-2">
                  {title}
                </h2>
                <p className="text-[#111]/60 text-sm font-light leading-relaxed">
                  Connect directly with Commercial &amp; Residential Advisors Mark Davis (#3209459) and Rachael Garnett (#3378601). We look forward to learning more about your property goals and delivering tailored guidance for your Tampa Bay real estate journey.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(813) 555-0199"
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      Advisory Focus
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Luxury Residential Purchase">Luxury Residential Purchase</option>
                      <option value="Selling a Residential Property">Selling a Residential Property</option>
                      <option value="Commercial / Mixed-Use Acquisition">Commercial / Mixed-Use Acquisition</option>
                      <option value="Land & Acreage Investment">Land &amp; Acreage Investment</option>
                      <option value="New Construction & VIP Developments">New Construction &amp; VIP Developments</option>
                      <option value="Executive Relocation to Tampa Bay">Executive Relocation to Tampa Bay</option>
                      <option value="Confidential Property Valuation">Confidential Property Valuation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                      Preferred Advisor
                    </label>
                    <select
                      value={advisor}
                      onChange={(e) => setAdvisor(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Mark Davis & Rachael Garnett">Both Agents (Mark Davis &amp; Rachael Garnett)</option>
                      <option value="Mark Davis (Commercial & Residential Agent)">Mark Davis, REALTOR® — Certified Commercial &amp; Residential Agent (#3209459)</option>
                      <option value="Rachael Garnett (Commercial & Residential Agent)">Rachael Garnett, REALTOR® — Certified Commercial &amp; Residential Agent (#3378601)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                    Property Goals, Timeline, or Specific Questions
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about the property, neighborhood, investment criteria, or timeline you are considering..."
                    className="w-full px-4 py-3 bg-[#f5f3ef] border border-[#111]/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-[#111]/50">
                    <ShieldCheck className="w-4 h-4 text-[#9A7D3A] shrink-0" />
                    <span>100% Confidential • Align Right Realty Carrollwood</span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-4 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? "Submitting..." : "Request Private Consultation"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


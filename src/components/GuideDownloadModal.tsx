"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Download, CheckCircle2, Printer, BookOpen, ShieldCheck } from "lucide-react";

interface GuideDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  slug: string;
  quickAnswer?: string;
  keyTakeaways: string[];
  sections: { heading: string; body: string; bullets?: string[] }[];
  authorName?: string;
}

export default function GuideDownloadModal({
  isOpen,
  onClose,
  title,
  category,
  slug,
  quickAnswer,
  keyTakeaways,
  sections,
  authorName = "Mark Davis & Rachael Garnett",
}: GuideDownloadModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Buyer");
  const [notes, setNotes] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [subscribeSubstack, setSubscribeSubstack] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const openPrintableSheet = () => {
    const win = window.open("", "_blank", "width=900,height=1050");
    if (!win) {
      window.print();
      return;
    }

    const esc = (str: string) =>
      String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)} — Davis &amp; Garnett Advisory Guide</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; color: #111; max-width: 780px; margin: 40px auto; padding: 0 24px; line-height: 1.65; }
    .header { border-bottom: 2px solid #D4AF37; padding-bottom: 16px; margin-bottom: 24px; }
    .brand { font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9A7D3A; font-weight: 700; }
    h1 { font-size: 28px; margin: 8px 0; line-height: 1.2; }
    .meta { font-family: Arial, sans-serif; font-size: 12px; color: #555; }
    .quick { background: #f5f3ef; border-left: 4px solid #D4AF37; padding: 16px 20px; margin: 20px 0; }
    .quick-label { font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #9A7D3A; font-weight: 700; margin-bottom: 6px; }
    h2 { font-size: 19px; margin-top: 26px; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
    p { font-family: Arial, sans-serif; font-size: 14px; color: #222; }
    ul { font-family: Arial, sans-serif; font-size: 14px; padding-left: 20px; }
    li { margin-bottom: 6px; }
    .footer { margin-top: 36px; padding-top: 16px; border-top: 1px solid #ddd; font-family: Arial, sans-serif; font-size: 11px; color: #555; }
    @media print { .no-print { display: none; } body { margin: 18px auto; } }
  </style>
</head>
<body>
  <div class="no-print" style="background:#111;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;font-family:Arial,sans-serif;font-size:13px;">
    <span>Use your browser&apos;s <strong>Save as PDF</strong> destination to save a clean copy.</span>
    <button onclick="window.print()" style="background:#D4AF37;color:#111;border:none;padding:8px 16px;border-radius:6px;font-weight:700;cursor:pointer;">Print / Save as PDF</button>
  </div>
  <div class="header">
    <div class="brand">Davis &amp; Garnett Commercial / Residential Advisors &bull; ${esc(category)}</div>
    <h1>${esc(title)}</h1>
    <div class="meta">Prepared by ${esc(authorName)} &bull; Align Right Realty Carrollwood &bull; 3903 Northdale Blvd Suite 115W, Tampa, FL 33624</div>
  </div>
  ${
    quickAnswer
      ? `<div class="quick"><div class="quick-label">Quick Answer</div><p style="margin:0;">${esc(quickAnswer)}</p></div>`
      : ""
  }
  ${
    keyTakeaways.length > 0
      ? `<h2>Key Takeaways</h2><ul>${keyTakeaways.map((kt) => `<li>${esc(kt)}</li>`).join("")}</ul>`
      : ""
  }
  ${sections
    .map(
      (sec) => `
      <h2>${esc(sec.heading)}</h2>
      <p>${esc(sec.body)}</p>
      ${sec.bullets && sec.bullets.length > 0 ? `<ul>${sec.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}`
    )
    .join("")}
  <div class="footer">
    Questions? Call Mark Davis (941-737-4127) or Rachael Garnett (727-808-3344) &bull; davisgarnettsells.com
  </div>
</body>
</html>`;

    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const cat = slug.includes("55") || slug.includes("development")
        ? "developments"
        : slug.includes("commercial") || slug.includes("1031") || slug.includes("bpo")
        ? "commercial"
        : "consultation";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          category: cat,
          subject: `Guide Download: ${title}`,
          interest: `${role} — ${title}`,
          role,
          subscribeSubstack: subscribeSubstack ? "Yes" : "No",
          marketingConsent: marketingConsent ? "Yes" : "No",
          labels: ["Guide Download", role],
          message: notes || `Requested formatted PDF copy of "${title}".`,
          source: `Guide Download (${slug})`,
        }),
      });

      if (!res.ok) throw new Error("Failed to process request");
      setSubmitted(true);
    } catch {
      setErrorMsg("Unable to complete right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white text-[#111] rounded-2xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#111]/60 hover:text-[#111] hover:bg-[#f5f3ef] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-[#111] text-white px-7 py-6 border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.22em] mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Free Formatted Guide &amp; PDF
          </div>
          <h3 className="font-aiveritas text-2xl sm:text-3xl leading-snug pr-8">{title}</h3>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 text-[#9A7D3A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-aiveritas text-2xl text-[#111] mb-2">Your Guide Is Ready</h4>
                <p className="text-sm text-[#111]/75 font-light max-w-md mx-auto leading-relaxed">
                  We emailed a confirmation copy to <strong>{email}</strong>. We value your inquiry and strive to respond within six hours — almost always the same day and always ASAP.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={openPrintableSheet}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
                >
                  <Printer className="w-4 h-4" /> Open Formatted PDF View
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 bg-[#f5f3ef] text-[#111] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#e7e2d9] transition-colors"
                >
                  Done Reading
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#111]/70 font-light leading-relaxed">
                Enter your contact information to unlock the printable PDF version of this guide and receive updates matched to your goals.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
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
                    className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
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
                    className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                  I Am Primarily Exploring As a *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Buyer">Home Buyer</option>
                  <option value="Seller">Home / Property Seller</option>
                  <option value="55+ Downsizer">55+ Active-Adult Buyer / Downsizer</option>
                  <option value="Investor">Real Estate Investor</option>
                  <option value="Landlord">Commercial Landlord</option>
                  <option value="Tenant">Commercial Tenant</option>
                  <option value="Business Owner">Business Owner</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-[#111]/70 mb-1.5">
                  Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share preferred neighborhoods, timeline, or specific questions..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#fbfbf9] border border-[#111]/15 text-base sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-2.5 pt-1">
                <label className="flex items-start gap-2.5 text-xs text-[#111]/75 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscribeSubstack}
                    onChange={(e) => setSubscribeSubstack(e.target.checked)}
                    className="mt-0.5 accent-[#D4AF37]"
                  />
                  <span>
                    Subscribe me to the <strong>Davis &amp; Garnett Substack Newsletter</strong> for local Tampa Bay market updates.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-xs text-[#111]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 accent-[#D4AF37]"
                  />
                  <span>
                    I consent to receive this guide and requested updates from Mark Davis &amp; Rachael Garnett per the{" "}
                    <Link href="/privacy-policy" className="underline text-[#9A7D3A]" target="_blank">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {submitting ? "Preparing Your Guide..." : "Download Formatted PDF Guide"}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#111]/55">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9A7D3A]" />
                <span>Sent via ClickMe Automated Systems · Unsubscribe anytime</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


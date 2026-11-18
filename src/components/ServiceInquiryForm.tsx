"use client";

import React, { useState } from "react";
import { CheckCircle2, Phone, ShieldCheck, ArrowRight } from "lucide-react";

interface ServiceInquiryFormProps {
  mode: "commercial-bpo" | "commercial-mentoring";
  title: string;
  subtitle: string;
  submitLabel: string;
}

export default function ServiceInquiryForm({
  mode,
  title,
  subtitle,
  submitLabel,
}: ServiceInquiryFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyAddressOrTopic, setPropertyAddressOrTopic] = useState("");
  const [assetType, setAssetType] = useState(
    mode === "commercial-bpo" ? "Retail / Strip Center" : "Buying First Commercial Building"
  );
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const prefix =
        mode === "commercial-bpo"
          ? `Commercial BPO Request (${assetType})`
          : `Commercial Mentoring Inquiry (${assetType})`;
      const subject = propertyAddressOrTopic.trim()
        ? `${prefix} — ${propertyAddressOrTopic.trim()}`
        : prefix;
      const compiledMessage = [
        `Service Requested: ${prefix}`,
        propertyAddressOrTopic.trim()
          ? `${mode === "commercial-bpo" ? "Property Address / Parcel" : "Focus Market / Deal"}: ${propertyAddressOrTopic.trim()}`
          : "",
        notes.trim() ? `Notes: ${notes.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          category: "commercial",
          subject,
          message: compiledMessage,
          source:
            mode === "commercial-bpo"
              ? "Commercial BPO Service (/services/commercial-bpo)"
              : "Commercial Mentoring (/services/commercial-mentoring)",
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Unable to submit request right now.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call Mark Davis at 941-737-4127."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const options =
    mode === "commercial-bpo"
      ? [
          "Retail / Strip Center",
          "Medical / Professional Office",
          "Mixed-Use / Two-Building Lot",
          "Industrial / Flex Warehouse",
          "Commercial or Rural Development Land",
          "Multi-Family (5+ Units)",
        ]
      : [
          "Buying First Commercial Building",
          "SBA 504 Owner-User Acquisition",
          "NNN Lease & Cap Rate Underwriting",
          "1031 Tax-Deferred Exchange Strategy",
          "Mixed-Use & Zoning Entitlements",
          "Central Florida Land & Greenbelt Holding",
        ];

  return (
    <div
      id="request-form"
      className="bg-[#111] text-white rounded-2xl p-7 md:p-10 border border-[#D4AF37]/40 shadow-2xl"
    >
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h3 className="font-aiveritas text-3xl text-white mb-3">
            Request Received by Mark &amp; Rachael
          </h3>
          <p className="text-white/80 font-light max-w-lg mx-auto mb-6 leading-relaxed">
            Thank you. We will respond within 6 hours or ASAP, check any comparable properties right away, and confirm the next step with you directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            <a href="tel:941-737-4127" className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="w-3.5 h-3.5" /> Mark Davis: 941-737-4127
            </a>
            <span className="text-white/25">|</span>
            <a href="tel:727-808-3344" className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="w-3.5 h-3.5" /> Rachael Garnett: 727-808-3344
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-7">
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.28em] font-bold block mb-2">
              Direct Advisory Intake • Within 6 Hours ASAP
            </span>
            <h2 className="font-aiveritas text-2xl md:text-3xl text-white mb-2">{title}</h2>
            <p className="text-sm text-white/75 font-light leading-relaxed">{subtitle}</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-400/40 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name *"
                className="px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name *"
                className="px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address *"
                className="px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number *"
                className="px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                aria-label="Property or Coaching Focus"
                className="px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={propertyAddressOrTopic}
                onChange={(e) => setPropertyAddressOrTopic(e.target.value)}
                placeholder={
                  mode === "commercial-bpo"
                    ? "Property Address, Folio ID or City *"
                    : "Target Corridor or Current Role / License"
                }
                required={mode === "commercial-bpo"}
                className="px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                mode === "commercial-bpo"
                  ? "Share square footage, current annual NOI, tenant lease timing, or whether this is for pricing, refinancing, estate planning, or a 1031 swap..."
                  : "Tell Mark & Rachael what commercial deals you want to master—SBA 504 owner-user deals, NNN lease underwriting, zoning checks, or land valuation..."
              }
              className="w-full px-4 py-3 bg-white text-[#111] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-white/65 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                Confidential Review · Align Right Realty Carrollwood (BK3401606)
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-white text-[#111] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shrink-0"
              >
                <span>{submitting ? "Sending..." : submitLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}


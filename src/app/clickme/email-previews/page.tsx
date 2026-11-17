"use client";

import React, { useEffect, useState } from "react";

interface PreviewItem {
  key: string;
  crmLabel: string;
  color: string;
  adminBadge: string;
  adminSubject: string;
  adminHtml: string;
  clientSubject: string;
  clientHtml: string;
}

interface RoutingInfo {
  to: string;
  cc: string;
  bcc: string;
}

const ADVISOR_TIERS = [
  {
    value: "team",
    label: "Team / Both Principals (To: Rachael & Mark)",
  },
  {
    value: "mark",
    label: "Mark Davis Primary (To: Mark + CC: Rachael)",
  },
  {
    value: "rachael",
    label: "Rachael Garnett Primary (To: Rachael + CC: Mark)",
  },
];

export default function EmailPreviewsPage() {
  const [advisorTier, setAdvisorTier] = useState<string>("team");
  const [selectedKey, setSelectedKey] = useState<string>("commercial");
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [routing, setRouting] = useState<RoutingInfo>({
    to: "rachael@davisgarnettsells.com, mark@davisgarnettsells.com",
    cc: "",
    bcc: "clickme.tostart@gmail.com, msdavis118@gmail.com, rachaellgarnett@gmail.com",
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [testTo, setTestTo] = useState("clickme.tostart@gmail.com");
  const [sendStatus, setSendStatus] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/email/previews?advisor=${encodeURIComponent(advisorTier)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.previews?.length) {
          setPreviews(data.previews);
        }
        if (data.routing) {
          setRouting(data.routing);
        }
      })
      .finally(() => setLoading(false));
  }, [advisorTier]);

  const current = previews.find((p) => p.key === selectedKey) || previews[0];

  const handleSendTestPair = async () => {
    if (!current || !testTo) return;
    setSending(true);
    setSendStatus(null);
    try {
      const r1 = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testTo,
          subject: `[PREVIEW ADMIN · ${advisorTier.toUpperCase()}] ${current.adminSubject}`,
          html: current.adminHtml,
          rawHtml: true,
          isPreview: true,
        }),
      });
      const r2 = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: testTo,
          subject: `[PREVIEW CLIENT · ${advisorTier.toUpperCase()}] ${current.clientSubject}`,
          html: current.clientHtml,
          rawHtml: true,
          isPreview: true,
        }),
      });
      if (r1.ok && r2.ok) {
        setSendStatus(
          `Sent "${current.crmLabel}" (${advisorTier}) Admin + Client preview emails to ${testTo}.`
        );
      } else {
        setSendStatus("Failed to send one or both test previews.");
      }
    } catch {
      setSendStatus("Error sending preview emails.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-[1440px] mx-auto text-[#111]">
      <div className="mb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A7D3A] block mb-1">
            ClickMe Communication Templates &amp; CRM Matching
          </span>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#0A1628]">
            Admin &amp; Client Email Previews
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            First select who receives the inquiry (Mark, Rachael, or Team), then choose the inquiry category below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm">
          <input
            type="email"
            value={testTo}
            onChange={(e) => setTestTo(e.target.value)}
            placeholder="Recipient email..."
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="button"
            onClick={handleSendTestPair}
            disabled={sending || !current}
            className="px-4 py-2 bg-[#0A1628] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            {sending ? "Sending..." : "Send Test Pair"}
          </button>
        </div>
      </div>

      {sendStatus && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
          {sendStatus}
        </div>
      )}

      {/* Two-Tier Selection Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <label
            htmlFor="advisor-tier-select"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7D3A] mb-2"
          >
            Step 1 · Recipient / Advisor Routing
          </label>
          <select
            id="advisor-tier-select"
            value={advisorTier}
            onChange={(e) => setAdvisorTier(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f9fafb] border border-gray-300 text-sm font-semibold text-[#0A1628] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            {ADVISOR_TIERS.map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="category-select"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7D3A] mb-2"
          >
            Step 2 · Inquiry Form Category (CRM Matched)
          </label>
          <select
            id="category-select"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#f9fafb] border border-gray-300 text-sm font-semibold text-[#0A1628] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            {previews.map((item) => (
              <option key={item.key} value={item.key}>
                {item.crmLabel} — {item.adminBadge}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading || !current ? (
        <div className="p-12 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
          Loading email templates...
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Admin Side */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Admin Notification (To Team)
                </span>
                <div className="text-sm font-bold text-gray-900 mt-0.5 break-words">
                  Subject: {current.adminSubject}
                </div>
                <div className="text-[11px] text-gray-600 mt-1 leading-relaxed break-words">
                  <strong>To:</strong> {routing.to}
                  {routing.cc ? (
                    <>
                      {" "}&nbsp;|&nbsp; <strong>CC:</strong> {routing.cc}
                    </>
                  ) : null}{" "}
                  &nbsp;|&nbsp; <strong>BCC:</strong> {routing.bcc}
                </div>
              </div>
              <span
                className="px-3 py-1 rounded-full text-[11px] font-bold text-white shrink-0 self-start sm:self-center"
                style={{ backgroundColor: current.color }}
              >
                CRM: {current.crmLabel}
              </span>
            </div>
            <div className="p-3 sm:p-5 bg-[#f3f4f6] overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: current.adminHtml }} />
            </div>
          </div>

          {/* Client Side */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Client Auto-Confirmation (Zero Tech Speech)
                </span>
                <div className="text-sm font-bold text-gray-900 mt-0.5 break-words">
                  Subject: {current.clientSubject}
                </div>
                <div className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  <strong>To:</strong> Client Email &nbsp;|&nbsp;{" "}
                  <strong>Reply-To:</strong> list@davisgarnettsells.com &nbsp;|&nbsp;{" "}
                  <strong>BCC:</strong> clickme.tostart@gmail.com
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0A1628] text-[#D4AF37] shrink-0 self-start sm:self-center">
                Client Inbox
              </span>
            </div>
            <div className="p-3 sm:p-5 bg-[#f3f4f6] overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: current.clientHtml }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

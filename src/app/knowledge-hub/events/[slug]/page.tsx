"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
} from "lucide-react";
import ProposalNav from "@/components/ProposalNav";
import SiteFooter from "@/components/SiteFooter";
import { EVENTS } from "@/data/knowledgeHub";

export default function EventSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const event = EVENTS.find((ev) => ev.slug === slug) || EVENTS[0];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRsvp = async (e: React.FormEvent) => {
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
          propertyInterest: `Event RSVP: ${event.title}`,
          notes: `Guests: ${guests} | Date: ${event.date}`,
          source: `Event Page (${event.slug})`,
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

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-[#D4AF37] selection:text-white">
      <ProposalNav />

      <section className="relative pt-36 pb-24 px-8 bg-[#111] text-white border-b border-[#D4AF37]/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image src={event.heroImage} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/75 to-[#111]/90" />
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto">
          <Link
            href="/knowledge-hub#events"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events &amp; Briefings
          </Link>

          <span className="px-3 py-1 bg-[#D4AF37] text-[#111] text-xs font-bold uppercase tracking-widest rounded-sm inline-block mb-4">
            {event.category}
          </span>
          <h1 className="font-aiveritas text-4xl md:text-6xl text-white max-w-4xl mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" /> {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" /> {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> {event.location}
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1.7fr_1fr] gap-16 items-start">
          <div>
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 border border-[#111]/10">
              <Image src={event.heroImage} alt={event.title} fill className="object-cover" />
            </div>

            <h2 className="font-aiveritas text-3xl text-[#111] mb-4">Event Overview</h2>
            <p className="text-[#111]/75 text-base md:text-lg font-light leading-relaxed mb-10">
              {event.description}
            </p>

            <div className="bg-[#f5f3ef] p-8 rounded-2xl border border-[#111]/10">
              <h3 className="font-aiveritas text-2xl text-[#111] mb-6">Schedule &amp; Agenda</h3>
              <ul className="space-y-4">
                {event.agenda.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-[#111]/85">
                    <CheckCircle2 className="w-5 h-5 text-[#9A7D3A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 bg-[#f5f3ef] border border-[#111]/10 rounded-2xl p-8">
            <div className="h-1 w-full bg-[#D4AF37] rounded-full mb-6" />
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#9A7D3A] mx-auto mb-4" />
                <h3 className="font-aiveritas text-2xl text-[#111] mb-2">RSVP Confirmed</h3>
                <p className="text-sm text-[#111]/70 font-light">
                  We have reserved your spot for {event.title} and will email your private confirmation packet.
                </p>
              </div>
            ) : (
              <>
                <span className="text-[#9A7D3A] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center gap-1.5 mb-2">
                  <Users className="w-3.5 h-3.5" /> Private Guest List
                </span>
                <h3 className="font-aiveritas text-2xl text-[#111] mb-3">
                  Reserve Your Seat / RSVP
                </h3>
                <form onSubmit={handleRsvp} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name *"
                      className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name *"
                      className="px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                  />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-[#111]/15 rounded-lg text-xs"
                  >
                    <option value="1">1 Attendee</option>
                    <option value="2">2 Attendees</option>
                    <option value="3">3+ Attendees</option>
                  </select>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#111] hover:bg-[#D4AF37] text-white hover:text-[#111] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                  >
                    {submitting ? "Confirming..." : "Confirm Event RSVP"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import ProposalNav from '@/components/ProposalNav';
import { MapPin, Building, Home, Check, Play, FileText, ArrowRight, Phone, Mail } from 'lucide-react';

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        const found = data.find((l: any) => l.slug === params.slug && l.featured && l.status === 'Active');
        if (found) setListing(found);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [params.slug]);

  if (isLoading) return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Loading...</div>;

  if (!listing && !isLoading) {
    notFound();
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          source: `Listing: ${listing.title}`,
          labels: [`Listing Inquiry`, listing.category],
          ownerId: listing.primaryContact === 'Mark' ? 'mark-id' : 'rachael-id'
        })
      });
      setFormStatus('success');
    } catch (err) {
      console.error(err);
      setFormStatus('idle'); // Need better error handling in real app
    }
  };

  const heroImage = listing.images?.find((img:any) => img.isHero)?.url || listing.images?.[0]?.url;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <ProposalNav />

      {/* Hero */}
      <section className="relative h-[80vh] w-full mt-24">
        {heroImage ? (
          <img src={heroImage} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-700">No Hero Image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/20" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end justify-between">
            <div className="max-w-3xl">
              <div className="flex gap-3 mb-6">
                <span className="bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  {listing.category}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  {listing.transactionType}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-4">{listing.title}</h1>
              <p className="text-xl text-gray-300 flex items-center gap-2">
                <MapPin className="text-[#D4AF37]" /> {listing.streetAddress}, {listing.city}, {listing.state} {listing.zip}
              </p>
            </div>
            
            <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shrink-0 w-full md:w-auto md:min-w-[300px]">
              <div className="text-gray-400 text-sm uppercase tracking-wider mb-1 font-semibold">{listing.transactionType === 'For Lease' ? 'Asking Rent' : 'Asking Price'}</div>
              <div className="text-4xl font-bold text-[#D4AF37] mb-6">{listing.askingPrice || listing.askingRent || 'Unpriced'}</div>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                Inquire Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-16">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: listing.category === 'Commercial' ? 'Available Space' : 'Square Footage', value: listing.availableSpaceSqFt || listing.sqFt },
                { label: 'Property Type', value: listing.propertyType },
                { label: listing.category === 'Commercial' ? 'Cap Rate' : 'Bed/Bath', value: listing.category === 'Commercial' ? listing.capRate : `${listing.bedrooms} Beds / ${listing.bathrooms} Baths` },
                { label: listing.category === 'Commercial' ? 'Zoning' : 'Lot Size', value: listing.zoning || listing.lotSize },
              ].map((stat, i) => (
                <div key={i} className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</div>
                  <div className="text-xl font-medium">{stat.value || 'N/A'}</div>
                </div>
              ))}
            </div>

            {/* AI Generated Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-3xl font-serif mb-6 text-white border-b border-white/10 pb-4">Property Overview</h2>
              <p className="text-gray-300 leading-relaxed font-light">{listing.propertyDescription}</p>
              
              {listing.locationDescription && (
                <>
                  <h3 className="text-2xl font-serif mt-12 mb-4 text-white">Location</h3>
                  <p className="text-gray-300 leading-relaxed font-light">{listing.locationDescription}</p>
                </>
              )}

              {listing.investmentSummary && (
                <>
                  <h3 className="text-2xl font-serif mt-12 mb-4 text-white">Investment Summary</h3>
                  <p className="text-gray-300 leading-relaxed font-light">{listing.investmentSummary}</p>
                </>
              )}
            </div>

            {/* Highlights */}
            {listing.highlights && listing.highlights.length > 0 && (
              <div>
                <h2 className="text-3xl font-serif mb-6 text-white border-b border-white/10 pb-4">Property Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {listing.highlights.filter(Boolean).map((h:string, i:number) => (
                    <div key={i} className="flex items-start gap-3 bg-[#111] p-4 rounded-xl border border-white/5">
                      <div className="bg-[#D4AF37]/20 p-1.5 rounded-md shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <span className="text-gray-300">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media & Attachments */}
            <div>
              <h2 className="text-3xl font-serif mb-6 text-white border-b border-white/10 pb-4">Media & Documents</h2>
              <div className="flex flex-wrap gap-4">
                {listing.walkthroughVideoUrl && (
                  <button className="flex items-center gap-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 px-6 py-4 rounded-xl transition-colors">
                    <Play className="w-5 h-5 text-white" />
                    <span className="font-medium">Watch Video Tour</span>
                  </button>
                )}
                {listing.virtualTourUrl && (
                  <button className="flex items-center gap-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 px-6 py-4 rounded-xl transition-colors">
                    <Check className="w-5 h-5 text-white" />
                    <span className="font-medium">3D Virtual Tour</span>
                  </button>
                )}
                {listing.attachments?.map((att:any) => (
                  <button key={att.id} className="flex items-center gap-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 px-6 py-4 rounded-xl transition-colors">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{att.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar / Contact Form */}
          <div>
            <div id="contact-form" className="bg-[#111] border border-[#D4AF37]/30 p-8 rounded-2xl sticky top-32 shadow-2xl shadow-[#D4AF37]/5">
              <h3 className="text-2xl font-serif mb-2">Interested in this property?</h3>
              <p className="text-gray-400 text-sm mb-8">Contact the listing agent for more information or to schedule a tour.</p>
              
              <div className="flex items-center gap-4 mb-8 bg-black/50 p-4 rounded-xl border border-white/5">
                <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden shrink-0">
                  <img src={listing.primaryContact === 'Mark' ? '/mark.jpg' : '/rachael.jpg'} alt={listing.primaryContact} className="w-full h-full object-cover opacity-50" />
                </div>
                <div>
                  <div className="font-bold text-lg">{listing.primaryContact === 'Mark' ? 'Mark Davis' : 'Rachael Garnett'}</div>
                  <div className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">Listing Agent</div>
                </div>
              </div>

              {formStatus === 'success' ? (
                <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-green-400 text-lg mb-2">Inquiry Sent</h4>
                  <p className="text-green-400/80 text-sm">Thank you. {listing.primaryContact} will be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Name</label>
                    <input required type="text" value={leadForm.name} onChange={e => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                    <input required type="email" value={leadForm.email} onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone</label>
                    <input type="tel" value={leadForm.phone} onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message</label>
                    <textarea value={leadForm.message} onChange={e => setLeadForm({ ...leadForm, message: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors h-32"></textarea>
                  </div>
                  <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold py-4 rounded-xl transition-colors disabled:opacity-50">
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

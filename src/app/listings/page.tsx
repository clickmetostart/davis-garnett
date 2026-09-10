"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProposalNav from '@/components/ProposalNav';
import { MapPin, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Listing } from '@/types/listings';

export default function PublicListingsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Commercial' | 'Residential'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [publicListings, setPublicListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        // Only show active and featured listings to the public
        setPublicListings(data.filter((l: any) => l.status === 'Active' && l.featured));
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredListings = publicListings.filter(listing => {
    const matchesSearch = (listing.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (listing.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'All' || listing.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black font-sans pb-32">
      <ProposalNav />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-6 text-white font-medium">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] italic font-light">Inventory</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Discover premier commercial opportunities and luxury residential properties across the Tampa Bay area, curated by Davis & Garnett.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-8 mb-16 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between backdrop-blur-xl">
            
            <div className="flex bg-white/5 rounded-xl p-1 w-full md:w-auto">
              {['All', 'Commercial', 'Residential'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === tab ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex w-full md:w-auto gap-4">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search location, property type..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
                />
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-white transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-32 text-gray-500">Loading listings...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredListings.map(listing => (
                  <Link href={`/listings/${listing.slug}`} key={listing.id} className="group flex flex-col bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
                      {listing.images?.[0] ? (
                        <img 
                          src={listing.images[0].url} 
                          alt={listing.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                          {listing.category}
                        </span>
                        <span className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                          {listing.transactionType}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{listing.title}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1.5 mb-6">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {listing.city}, {listing.state}
                      </p>

                      <div className="grid grid-cols-2 gap-y-4 mb-6 mt-auto">
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Price</span>
                          <span className="font-medium text-lg">{listing.askingPrice || listing.askingRent || 'Contact Us'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">{listing.category === 'Commercial' ? 'Space' : 'Size'}</span>
                          <span className="font-medium">{listing.availableSpaceSqFt || listing.sqFt || 'N/A'} {listing.category === 'Commercial' ? 'SF' : 'Sq Ft'}</span>
                        </div>
                        {listing.category === 'Commercial' ? (
                          <>
                            <div>
                              <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Type</span>
                              <span className="font-medium">{listing.propertyType}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Cap Rate</span>
                              <span className="font-medium">{listing.capRate || 'N/A'}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Beds / Baths</span>
                              <span className="font-medium">{listing.bedrooms} / {listing.bathrooms}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Type</span>
                              <span className="font-medium">{listing.propertyType}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[#D4AF37] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        View Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredListings.length === 0 && (
                <div className="text-center py-32 border border-white/10 rounded-2xl bg-[#111]">
                  <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No listings found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building, Home, MapPin, Search, Plus, Filter, MoreVertical, Edit, Globe, UploadCloud } from 'lucide-react';
import { Listing } from '@/types/listings';
import ListingImporterModal from '@/components/ListingImporterModal';

export default function ListingsManagerPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Commercial' | 'Residential'>('All');
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [isImportModalOpen]); // refetch when modal closes

  const filteredListings = listings.filter(listing => {
    const matchesSearch = (listing.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (listing.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || listing.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 p-8 bg-[#f9fafb] text-[#111827] h-screen overflow-y-auto font-sans">
      <ListingImporterModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />

      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Listings Manager</h1>
          <p className="text-gray-500 text-sm">Manage your commercial and residential property inventory.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="bg-white border border-gray-300 hover:border-black text-gray-800 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <UploadCloud className="w-5 h-5 text-gray-500" />
            Import Web Listing
          </button>
          <Link 
            href="/clickme/listings/add" 
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Listing
          </Link>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by title, city..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>
        
        <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
          {['All', 'Commercial', 'Residential'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as any)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${categoryFilter === cat ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 text-gray-400">Loading listings...</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredListings.map(listing => (
            <div key={listing.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow group">
              {/* Image */}
              <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                {listing.images?.[0]?.url ? (
                  <img src={listing.images[0].url} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Home className="w-8 h-8" />
                  </div>
                )}
                {listing.featured && (
                  <div className="absolute top-2 left-2 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Featured
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${listing.category === 'Commercial' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {listing.category || 'Unknown'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full block ${listing.status === 'Active' ? 'bg-green-500' : listing.status === 'Draft' ? 'bg-gray-400' : 'bg-yellow-500'}`}></span> {listing.status || 'Draft'}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-black transition-colors rounded-md hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">{listing.title || 'Untitled Listing'}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" /> {listing.streetAddress || 'No Address'}, {listing.city}, {listing.state}
                  </p>

                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <span className="text-gray-400 text-xs block uppercase">Price</span>
                      <span className="font-semibold">{listing.askingPrice || listing.askingRent || 'Unpriced'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block uppercase">{listing.category === 'Commercial' ? 'Space' : 'Size'}</span>
                      <span className="font-semibold">{listing.availableSpaceSqFt || listing.sqFt || 'N/A'} {listing.category === 'Commercial' ? 'sq ft' : 'sq ft'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block uppercase">Property Type</span>
                      <span className="font-semibold">{listing.propertyType || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block uppercase">Primary Agent</span>
                      <span className="font-semibold">{listing.primaryContact || 'Unassigned'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                  <Link href={`/clickme/listings/edit/${listing.id}`} className="flex-1 text-center py-2 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors flex justify-center items-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </Link>
                  {listing.featured && listing.status === 'Active' && (
                    <Link href={`/listings/${listing.slug}`} target="_blank" className="flex-1 text-center py-2 text-sm font-semibold text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center justify-center gap-1">
                      <Globe className="w-4 h-4" /> View Live
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredListings.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-bold text-gray-900">No listings found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

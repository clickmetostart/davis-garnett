"use client";

import React, { useState, useEffect } from 'react';
import { X, UploadCloud, RefreshCw, Link as LinkIcon, Check, Globe, Building, Home, MousePointer2 } from 'lucide-react';
import { Listing } from '@/types/listings';
import { useRouter } from 'next/navigation';

export default function ListingImporterModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const [manualUrl, setManualUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'importing' | 'success'>('idle');
  const [importedListings, setImportedListings] = useState<Listing[]>([]);
  const [isPolling, setIsPolling] = useState(false);
  const [filterType, setFilterType] = useState<'All' | 'COMMERCIAL' | 'RESIDENTIAL'>('All');

  // Bookmarklet Javascript Code (Minified and URI encoded)
  const bookmarkletCode = `javascript:(function(){
    const url = window.location.href;
    const isCommercial = url.includes('loopnet.com') || url.includes('crexi.com');
    const sourcePlatform = url.includes('loopnet.com') ? 'LoopNet' : url.includes('crexi.com') ? 'Crexi' : url.includes('zillow.com') ? 'Zillow' : url.includes('redfin.com') ? 'Redfin' : 'Web';
    let data = { listingType: isCommercial ? 'COMMERCIAL' : 'RESIDENTIAL', sourceUrl: url, sourcePlatform: sourcePlatform, address: '', city: '', state: '', zip: '', photos: [] };
    const jsonLdElements = document.querySelectorAll('script[type="application/ld+json"]');
    jsonLdElements.forEach(script => {
      try {
        const parsed = JSON.parse(script.innerText);
        const schema = Array.isArray(parsed) ? parsed[0] : parsed;
        if (schema.address) {
          data.address = schema.address.streetAddress || data.address;
          data.city = schema.address.addressLocality || data.city;
          data.state = schema.address.addressRegion || data.state;
          data.zip = schema.address.postalCode || data.zip;
        }
        data.description = schema.description || data.description;
        if (schema.photo || schema.image) {
          let imgs = schema.photo || schema.image;
          if (typeof imgs === 'string') data.photos.push(imgs);
          if (Array.isArray(imgs)) data.photos.push(...imgs.map(i => typeof i === 'string' ? i : i.url));
        }
      } catch (e) {}
    });
    if (url.includes('loopnet.com')) {
      data.address = data.address || document.querySelector('.property-timestamp-title')?.innerText || document.querySelector('h1')?.innerText;
      const rentCol = document.querySelector('.rent-data-column');
      if (rentCol) data.leaseRate = rentCol.innerText;
      const capRateEl = Array.from(document.querySelectorAll('td')).find(el => el.innerText.includes('Cap Rate'));
      if (capRateEl && capRateEl.nextElementSibling) data.capRate = parseFloat(capRateEl.nextElementSibling.innerText);
      const imgElements = document.querySelectorAll('.carousel-hero-image img, .carousel-slide img');
      data.photos = Array.from(imgElements).map(img => img.src).filter(Boolean);
    }
    if (url.includes('zillow.com')) {
      data.address = data.address || document.querySelector('h1')?.innerText;
      const priceEl = document.querySelector('[data-testid="price"] span');
      if (priceEl) data.price = priceEl.innerText;
      const bedBathElements = document.querySelectorAll('[data-testid="bed-bath-sqft-fact-container"] span');
      if (bedBathElements.length >= 3) {
        data.beds = parseInt(bedBathElements[0].innerText) || data.beds;
        data.baths = parseInt(bedBathElements[1].innerText) || data.baths;
        data.sqft = parseInt(bedBathElements[2].innerText.replace(/[^0-9]/g,'')) || data.sqft;
      }
      const imgElements = document.querySelectorAll('.media-stream li img');
      if (data.photos.length === 0) data.photos = Array.from(imgElements).map(img => img.src).filter(Boolean);
    }
    data.photos = [...new Set(data.photos)].slice(0, 10);
    alert('Importing to ClickMe CRM...');
    fetch('http://localhost:3000/api/crm/import-listing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()).then(res => {
      alert('Success! Listing imported.');
    }).catch(e => {
      alert('Error importing listing. Make sure your local server is running.');
    });
  })();`.replace(/\s+/g, ' ');

  // Poll for recently imported listings
  useEffect(() => {
    if (!isOpen) return;
    
    setIsPolling(true);
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/listings');
        if (res.ok) {
          const data: Listing[] = await res.json();
          // Find listings created in the last 15 minutes that are drafts and have a sourcePlatform
          const recent = data.filter(l => {
            const age = Date.now() - new Date(l.createdAt).getTime();
            return age < 15 * 60 * 1000 && l.status === 'Draft' && l.sourcePlatform; 
          });
          setImportedListings(recent);
        }
      } catch (e) {}
    }, 3000);

    return () => {
      clearInterval(interval);
      setIsPolling(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('importing');
    
    // Simulate manual import delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setManualUrl('');
    }, 3000);
  };

  const filteredListings = importedListings.filter(l => {
    if (filterType === 'All') return true;
    if (filterType === 'COMMERCIAL' && l.category === 'Commercial') return true;
    if (filterType === 'RESIDENTIAL' && l.category === 'Residential') return true;
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#111] text-white px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <UploadCloud className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl font-bold font-serif">Listing Web Clipper</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Left Col: Extension Sync */}
            <div className="space-y-6 flex flex-col">
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MousePointer2 className="w-5 h-5 text-blue-500" /> 1-Click Install
                  </h3>
                  {isPolling && <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />}
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  No extensions required! Just drag the button below into your browser's bookmarks bar. Click it anytime you are viewing a property on LoopNet, Crexi, Zillow, or Redfin to instantly import it.
                </p>
                
                <div className="flex justify-center mb-4">
                  <a 
                    href={bookmarkletCode}
                    className="inline-block px-6 py-3 bg-[#111] text-[#D4AF37] font-bold rounded-full shadow-lg shadow-black/20 hover:scale-105 transition-transform border-2 border-[#D4AF37] cursor-grab active:cursor-grabbing"
                    onClick={(e) => e.preventDefault()}
                  >
                    📥 D&G Dash
                  </a>
                </div>
                <div className="text-center text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  ↑ Drag me to your bookmarks bar ↑
                </div>
              </div>

              {/* Manual Entry */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Manual Link Import</h3>
                <p className="text-sm text-gray-500 mb-4">Paste a URL if the Web Clipper is unavailable.</p>
                
                <form onSubmit={handleManualImport}>
                  <div className="relative mb-4">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="url" 
                      required
                      value={manualUrl}
                      onChange={e => setManualUrl(e.target.value)}
                      placeholder="https://loopnet.com/Listing/..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                  </div>
                  <button 
                    disabled={status === 'importing' || !manualUrl}
                    type="submit" 
                    className="w-full py-3 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold rounded-lg text-sm transition-colors flex justify-center items-center gap-2"
                  >
                    {status === 'importing' ? <RefreshCw className="w-4 h-4 animate-spin" /> : 
                     status === 'success' ? <Check className="w-4 h-4" /> : 'Import Listing'}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Col: Queue */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full min-h-[400px]">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h3 className="font-bold text-gray-900">
                  Imported Queue <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">{filteredListings.length} pending</span>
                </h3>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['All', 'COMMERCIAL', 'RESIDENTIAL'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setFilterType(cat as any)}
                      className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors ${filterType === cat ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
                    >
                      {cat === 'All' ? 'All' : cat === 'COMMERCIAL' ? 'Com' : 'Res'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                {filteredListings.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
                    <UploadCloud className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-sm">Waiting for incoming listings from the Web Clipper...</p>
                  </div>
                ) : (
                  filteredListings.map(listing => (
                    <div key={listing.id} className="p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex gap-4 items-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-md shrink-0 overflow-hidden relative">
                        {listing.images?.[0]?.url && <img src={listing.images[0].url} alt="" className="w-full h-full object-cover" />}
                        <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[9px] font-bold text-center py-0.5 uppercase tracking-wider">
                          {listing.sourcePlatform}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${listing.category === 'Commercial' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {listing.category}
                          </span>
                          <span className="text-xs font-semibold text-gray-900 truncate">{listing.askingPrice || listing.askingRent || 'Price TBD'}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 truncate text-sm mb-1">{listing.title || 'Imported Property'}</h4>
                        
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
                          {listing.category === 'Commercial' ? (
                            <>
                              {listing.propertyType && <span>{listing.propertyType}</span>}
                              {listing.buildingSizeSqFt && <span>• {listing.buildingSizeSqFt} SF</span>}
                              {listing.capRate && <span>• {listing.capRate} Cap</span>}
                            </>
                          ) : (
                            <>
                              {listing.bedrooms && <span>{listing.bedrooms} Beds</span>}
                              {listing.bathrooms && <span>• {listing.bathrooms} Baths</span>}
                              {listing.sqFt && <span>• {listing.sqFt} SqFt</span>}
                            </>
                          )}
                        </div>

                        <button 
                          onClick={() => { onClose(); router.push(`/clickme/listings/edit/${listing.id}`); }}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Review & Publish →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

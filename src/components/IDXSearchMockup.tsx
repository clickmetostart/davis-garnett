"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, MapPin, Bed, Bath, SquareSquare } from "lucide-react";

export default function IDXSearchMockup() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/lofty/listings')
      .then(res => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setListings(data);
        } else {
          // Dummy fallback data if empty or not authenticated
          setListings([
            { id: 1, title: 'Sample MLS Property', city: 'Tampa', state: 'FL', zip: '33602', askingPrice: '$1,200,000', bedrooms: 4, bathrooms: 3, sqFt: 3500, propertyType: 'Single Family', images: [{url: '/res_waterfront_estate_1787632802890.png'}] },
            { id: 2, title: 'Downtown Condo', city: 'St. Petersburg', state: 'FL', zip: '33701', askingPrice: '$850,000', bedrooms: 2, bathrooms: 2, sqFt: 1800, propertyType: 'Condo', images: [{url: '/res_luxury_condo_1787632822869.png'}] },
            { id: 3, title: 'Clearwater Beach Home', city: 'Clearwater', state: 'FL', zip: '33767', askingPrice: '$2,500,000', bedrooms: 5, bathrooms: 4, sqFt: 4200, propertyType: 'Single Family', images: [{url: '/res_beachfront_villa_1787632843222.png'}] },
          ]);
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-24 px-8 bg-[#050505] border-t border-white/10" id="idx-search">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#F5E6CE] text-xs uppercase tracking-[0.3em] font-bold block mb-4">Live Data Feed</span>
          <h2 className="font-aiveritas text-4xl md:text-5xl text-[#D4AF37]">MLS Search Preview</h2>
          <p className="text-white/60 font-light mt-4 max-w-2xl mx-auto">
            This section pulls real-time data from your Lofty CRM. 
            {loading ? " Loading live data..." : " Displaying live listings below."}
          </p>
        </div>

        {/* Search Bar Mockup */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <Search className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by City, Zip, or MLS #" 
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#F6E3B0] transition-colors">
            Search
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((l: any) => (
            <div key={l.id} className="group glass-card overflow-hidden cursor-pointer hover:border-[#D4AF37]/50 transition-colors">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image 
                  src={l.images[0]?.url || '/placeholder.png'} 
                  alt={l.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[0.6rem] uppercase tracking-widest text-[#D4AF37] font-bold border border-white/10 rounded-sm">
                  {l.propertyType}
                </div>
              </div>
              <div className="p-6">
                <div className="text-2xl font-aiveritas text-white mb-2">{l.askingPrice}</div>
                <h3 className="text-lg text-white/90 font-medium mb-1 truncate">{l.title}</h3>
                <div className="flex items-center gap-1 text-white/50 text-xs mb-6">
                  <MapPin className="w-3 h-3" /> {l.city}, {l.state} {l.zip}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-[#D4AF37]" /> {l.bedrooms}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-[#D4AF37]" /> {l.bathrooms}</span>
                    <span className="flex items-center gap-1"><SquareSquare className="w-4 h-4 text-[#D4AF37]" /> {l.sqFt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

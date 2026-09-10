"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, Upload, Sparkles, Building, Home, MapPin, Search, Globe } from 'lucide-react';
import { Listing } from '@/types/listings';

const STAGES = ['Build', 'List', 'Market', 'Review'];

export default function AddListingWizard() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [category, setCategory] = useState<'Commercial' | 'Residential' | null>(null);

  const [formData, setFormData] = useState<Partial<Listing>>({
    status: 'Draft',
    featured: false,
    showEmail: true,
    showPhone: true,
    highlights: ['', '', '', '', '', ''],
    images: [],
    attachments: []
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field: keyof Listing, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...(formData.highlights || [])];
    newHighlights[index] = value;
    updateField('highlights', newHighlights);
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, ...formData })
      });
      const data = await response.json();
      if (data.propertyDescription) updateField('propertyDescription', data.propertyDescription);
      if (data.locationDescription) updateField('locationDescription', data.locationDescription);
      if (data.investmentSummary) updateField('investmentSummary', data.investmentSummary);
    } catch (e) {
      console.error("AI Generation failed", e);
    }
    setIsGenerating(false);
  };

  const handlePublish = async () => {
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, ...formData })
      });
      if (response.ok) {
        router.push('/clickme/listings');
      } else {
        console.error('Failed to save listing');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- RENDERING STAGES ---

  const renderStage0_CategorySelect = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
      <h2 className="text-3xl font-bold mb-2">What type of listing?</h2>
      <p className="text-gray-500 mb-10">Select a category to load the appropriate property fields.</p>
      <div className="flex gap-8">
        <button 
          onClick={() => setCategory('Commercial')}
          className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-xl transition-all w-64"
        >
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Building className="w-10 h-10" />
          </div>
          <span className="text-xl font-bold">Commercial</span>
        </button>
        <button 
          onClick={() => setCategory('Residential')}
          className="flex flex-col items-center gap-4 p-8 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-xl transition-all w-64"
        >
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <Home className="w-10 h-10" />
          </div>
          <span className="text-xl font-bold">Residential</span>
        </button>
      </div>
    </div>
  );

  const renderStage1_Build = () => (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-right duration-500 pb-20">
      {/* Core Identity */}
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
          <Building className="w-5 h-5 text-gray-400" /> Core Identity
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Title</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 outline-none" placeholder="e.g. Prime Retail Corner — Westchase" value={formData.title || ''} onChange={e => updateField('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
            <select className="w-full p-3 rounded-lg border border-gray-300 outline-none bg-white" value={formData.propertyType || ''} onChange={e => updateField('propertyType', e.target.value)}>
              <option value="">Select...</option>
              {category === 'Commercial' ? (
                <>
                  <option>Office</option><option>Retail</option><option>Industrial</option><option>Warehouse</option><option>Flex/R&D</option><option>Mixed-Use</option><option>Multifamily</option><option>Medical</option><option>Land</option>
                </>
              ) : (
                <>
                  <option>Single Family</option><option>Condo</option><option>Townhouse</option><option>Villa</option><option>Multi-Family (2-4 units)</option><option>Land</option><option>New Construction</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Type</label>
            <select className="w-full p-3 rounded-lg border border-gray-300 outline-none bg-white" value={formData.transactionType || ''} onChange={e => updateField('transactionType', e.target.value)}>
              <option value="">Select...</option>
              {category === 'Commercial' ? (
                <><option>For Sale</option><option>For Lease</option><option>For Sale or Lease</option></>
              ) : (
                <><option>For Sale</option><option>For Rent</option></>
              )}
            </select>
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
          <MapPin className="w-5 h-5 text-gray-400" /> Property Address
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
              <input type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 outline-none" value={formData.streetAddress || ''} onChange={e => updateField('streetAddress', e.target.value)} />
            </div>
            {category === 'Commercial' && (
              <div className="w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Suite / Unit</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black/5 outline-none" value={formData.suiteUnit || ''} onChange={e => updateField('suiteUnit', e.target.value)} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.city || ''} onChange={e => updateField('city', e.target.value)} />
          </div>
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
              <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.state || ''} onChange={e => updateField('state', e.target.value)} />
            </div>
            <div className="w-2/3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Zip</label>
              <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.zip || ''} onChange={e => updateField('zip', e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
          <Search className="w-5 h-5 text-gray-400" /> Property Details
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {category === 'Commercial' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Building Size (sq ft)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.buildingSizeSqFt || ''} onChange={e => updateField('buildingSizeSqFt', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Available Space (sq ft)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.availableSpaceSqFt || ''} onChange={e => updateField('availableSpaceSqFt', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lot Size (acres)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.lotSize || ''} onChange={e => updateField('lotSize', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Zoning</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.zoning || ''} onChange={e => updateField('zoning', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parking Ratio (/1000)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.parkingRatio || ''} onChange={e => updateField('parkingRatio', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Clear Height (ft)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.clearHeightFt || ''} onChange={e => updateField('clearHeightFt', e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.bedrooms || ''} onChange={e => updateField('bedrooms', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.bathrooms || ''} onChange={e => updateField('bathrooms', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Square Footage</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.sqFt || ''} onChange={e => updateField('sqFt', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lot Size</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.lotSize || ''} onChange={e => updateField('lotSize', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year Built</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.yearBuilt || ''} onChange={e => updateField('yearBuilt', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HOA Fee / Month</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.hoaFee || ''} onChange={e => updateField('hoaFee', e.target.value)} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 border-b pb-4">Pricing</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Asking Price/Rent</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none font-semibold text-green-700" placeholder="$0.00" value={formData.askingPrice || formData.askingRent || ''} onChange={e => updateField('askingPrice', e.target.value)} />
          </div>
          {category === 'Commercial' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cap Rate (%)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.capRate || ''} onChange={e => updateField('capRate', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lease Type</label>
                <select className="w-full p-3 rounded-lg border border-gray-300 outline-none bg-white" value={formData.leaseType || ''} onChange={e => updateField('leaseType', e.target.value)}>
                  <option value="">Select...</option>
                  <option>NNN</option><option>Modified Gross</option><option>Full Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Net Operating Income (NOI)</label>
                <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.noi || ''} onChange={e => updateField('noi', e.target.value)} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* AI Descriptions */}
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex justify-between items-center mb-6 border-b pb-4 relative z-10">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" /> Descriptions & Highlights
          </h3>
          <button 
            onClick={handleGenerateDescription}
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm"
          >
            {isGenerating ? 'Generating Draft...' : 'Generate with Buildout AI'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
          {[0,1,2,3,4,5].map(i => (
            <div key={i}>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Highlight {i+1}</label>
              <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none text-sm" value={formData.highlights?.[i] || ''} onChange={e => updateHighlight(i, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Property Description</label>
            <textarea className="w-full p-4 rounded-lg border border-gray-300 outline-none h-32 leading-relaxed" value={formData.propertyDescription || ''} onChange={e => updateField('propertyDescription', e.target.value)}></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location Description</label>
            <textarea className="w-full p-4 rounded-lg border border-gray-300 outline-none h-24 leading-relaxed" value={formData.locationDescription || ''} onChange={e => updateField('locationDescription', e.target.value)}></textarea>
          </div>
          {category === 'Commercial' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Summary</label>
              <textarea className="w-full p-4 rounded-lg border border-gray-300 outline-none h-24 leading-relaxed" value={formData.investmentSummary || ''} onChange={e => updateField('investmentSummary', e.target.value)}></textarea>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderStage2_List = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-20">
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
        <h3 className="text-xl font-bold mb-2">Property Media</h3>
        <p className="text-gray-500 mb-8">Upload high-resolution images. Drag to reorder. The first image will be used as the Hero.</p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer mb-8 flex flex-col items-center justify-center">
          <Upload className="w-10 h-10 text-gray-400 mb-4" />
          <p className="font-semibold text-gray-700">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG, WEBP (Max 10MB each)</p>
        </div>

        <div className="text-left space-y-6 border-t pt-8">
          <h4 className="font-bold text-lg">Video Links</h4>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Walkthrough Video URL (YouTube/Vimeo)</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.walkthroughVideoUrl || ''} onChange={e => updateField('walkthroughVideoUrl', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Matterport / Virtual Tour URL</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.virtualTourUrl || ''} onChange={e => updateField('virtualTourUrl', e.target.value)} />
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-2">Attachments & Documents</h3>
        <p className="text-gray-500 mb-8">Upload OMs, Floor Plans, or Disclosures. These will be available for download on the public listing.</p>
        <div className="grid grid-cols-2 gap-4">
          {category === 'Commercial' ? (
            <>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Offering Memorandum (PDF)</button>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Brochure / Flyer (PDF)</button>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Rent Roll (PDF)</button>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Floor Plan</button>
            </>
          ) : (
            <>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Property Disclosure</button>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Inspection Report</button>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Floor Plan</button>
              <button className="p-4 border border-gray-200 rounded-lg text-left hover:border-black font-semibold flex items-center gap-3"><Upload className="w-5 h-5 text-gray-400" /> Custom Attachment</button>
            </>
          )}
        </div>
      </section>
    </div>
  );

  const renderStage3_Market = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-20">
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 border-b pb-4">Listing Visibility</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button onClick={() => updateField('status', 'Draft')} className={`p-4 rounded-xl border-2 font-bold text-center transition-colors ${formData.status === 'Draft' ? 'border-gray-800 bg-gray-50' : 'border-gray-200 text-gray-500'}`}>Draft</button>
          <button onClick={() => { updateField('status', 'Active'); updateField('featured', false); }} className={`p-4 rounded-xl border-2 font-bold text-center transition-colors ${formData.status === 'Active' && !formData.featured ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'}`}>Active</button>
          <button onClick={() => { updateField('status', 'Active'); updateField('featured', true); }} className={`p-4 rounded-xl border-2 font-bold text-center transition-colors flex flex-col items-center justify-center gap-1 ${formData.featured ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-yellow-800' : 'border-gray-200 text-gray-500'}`}>
            <span className="flex items-center gap-1"><Sparkles className="w-4 h-4" /> Featured</span>
            <span className="text-[10px] font-normal uppercase tracking-widest text-current/70">Creates Dedicated URL</span>
          </button>
        </div>

        {formData.featured && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Public URL Slug</label>
            <div className="flex items-center">
              <span className="bg-gray-200 text-gray-500 px-4 py-3 rounded-l-lg border border-gray-300 border-r-0 font-mono text-sm">davisgarnett.com/listings/</span>
              <input type="text" className="flex-1 p-3 rounded-r-lg border border-gray-300 outline-none font-mono text-sm focus:ring-2 focus:ring-black/5" placeholder="e.g. 123-main-st" value={formData.slug || ''} onChange={e => updateField('slug', e.target.value)} />
            </div>
            <p className="text-xs text-gray-500 mt-2">This dedicated page will be SEO-optimized and feature full property media.</p>
          </div>
        )}
      </section>

      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 border-b pb-4">Contact Assignment</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Broker</label>
            <select className="w-full p-3 rounded-lg border border-gray-300 outline-none bg-white" value={formData.primaryContact || ''} onChange={e => updateField('primaryContact', e.target.value)}>
              <option value="Mark">Mark</option>
              <option value="Rachael">Rachael</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Co-Broker (Optional)</label>
            <input type="text" className="w-full p-3 rounded-lg border border-gray-300 outline-none" value={formData.coBrokerName || ''} onChange={e => updateField('coBrokerName', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.showEmail} onChange={e => updateField('showEmail', e.target.checked)} className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700">Display Email on Listing</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.showPhone} onChange={e => updateField('showPhone', e.target.checked)} className="w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700">Display Phone on Listing</span>
          </label>
        </div>
      </section>
    </div>
  );

  const renderStage4_Review = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-20">
      <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
              {formData.status} {formData.featured && '• Featured'}
            </span>
            <h2 className="text-3xl font-bold">{formData.title || 'Untitled Listing'}</h2>
            <p className="text-gray-500 mt-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {formData.streetAddress}, {formData.city}, {formData.state}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-700">{formData.askingPrice || formData.askingRent || 'Price TBD'}</div>
            <div className="text-gray-500 text-sm mt-1">{formData.propertyType} • {formData.transactionType}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 bg-gray-50 p-4 rounded-lg">
              {formData.propertyDescription || 'No description provided.'}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Highlights</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              {formData.highlights?.filter(Boolean).map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {formData.featured && (
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-500" />
              <div>
                <span className="block text-xs font-bold text-blue-800 uppercase tracking-wider mb-0.5">Public URL Ready</span>
                <span className="text-sm text-blue-900 font-mono">davisgarnett.com/listings/{formData.slug || 'untitled'}</span>
              </div>
            </div>
            <button className="text-sm font-bold text-blue-700 bg-white px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
              Copy Link
            </button>
          </div>
        )}
      </section>

      <div className="flex gap-4">
        <button onClick={() => updateField('status', 'Draft')} className="flex-1 p-4 rounded-xl border border-gray-300 font-bold hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>
        <button onClick={handlePublish} className="flex-[2] p-4 rounded-xl bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-black/20">
          <Sparkles className="w-5 h-5" />
          {formData.featured ? 'Publish & Build Marketing Page' : 'Publish to Inventory'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#f9fafb] text-[#111827] h-screen flex flex-col font-sans">
      {/* Header & Stepper */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">New Listing</h1>
            <p className="text-gray-500 text-sm">Follow the Buildout AI wizard to create your marketing campaign.</p>
          </div>
          <button onClick={() => router.push('/clickme/listings')} className="text-sm font-semibold text-gray-500 hover:text-black">
            Cancel
          </button>
        </div>
        
        {category && (
          <div className="max-w-4xl mx-auto mt-8 flex items-center justify-between">
            {STAGES.map((stage, idx) => {
              const isActive = currentStage === idx;
              const isPast = currentStage > idx;
              return (
                <div key={stage} className="flex items-center flex-1 last:flex-none">
                  <div className={`flex flex-col gap-2 ${isActive ? 'text-black' : isPast ? 'text-gray-900' : 'text-gray-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${isActive ? 'border-black bg-black text-white' : isPast ? 'border-gray-900 bg-white' : 'border-gray-200 bg-white'}`}>
                      {isPast ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">{stage}</span>
                  </div>
                  {idx < STAGES.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-4 transition-colors duration-300 ${isPast ? 'bg-gray-900' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {!category ? renderStage0_CategorySelect() : 
          currentStage === 0 ? renderStage1_Build() :
          currentStage === 1 ? renderStage2_List() :
          currentStage === 2 ? renderStage3_Market() :
          renderStage4_Review()
        }
      </div>

      {/* Footer Navigation */}
      {category && (
        <footer className="bg-white border-t border-gray-200 p-6 shrink-0 z-10">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => currentStage === 0 ? setCategory(null) : setCurrentStage(c => c - 1)}
              className="px-6 py-3 font-semibold text-gray-600 hover:text-black flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            {currentStage < STAGES.length - 1 && (
              <button 
                onClick={() => setCurrentStage(c => c + 1)}
                className="px-8 py-3 bg-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

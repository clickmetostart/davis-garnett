import React from 'react';
import { Globe, MapPin, Building, Star, ExternalLink, Mail, Phone, Home, List, Calendar } from 'lucide-react';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

interface LinktreeProfileProps {
  user: any;
  featuredListingsData: any[];
  previewMode?: 'mobile' | 'tablet' | 'desktop';
}

export default function LinktreeProfile({ user, featuredListingsData, previewMode }: LinktreeProfileProps) {
  const themeColor = user.themeColor || '#111827';
  
  // Responsive logic for dashboard preview vs public page
  const showDesktopMenu = previewMode ? previewMode === 'desktop' : false;
  const hideDesktopMenuClass = previewMode ? (showDesktopMenu ? "flex" : "hidden") : "hidden md:flex";
  
  const showMobileTab = previewMode ? (previewMode === 'mobile' || previewMode === 'tablet') : false;
  const hideMobileTabClass = previewMode ? (showMobileTab ? "block" : "hidden") : "block md:hidden";

  return (
    <div className="min-h-full bg-[#f9fafb] font-sans text-gray-900 w-full overflow-x-hidden flex flex-col relative pb-20">
      {/* Header Banner */}
      <div
        className="h-40 relative bg-cover bg-center"
        style={user.coverImageUrl ? { backgroundImage: `url(${user.coverImageUrl})` } : { background: `linear-gradient(135deg, ${themeColor} 0%, #000000 100%)` }}
      >
        {user.coverImageUrl && <div className="absolute inset-0 bg-black/20" />}
        {user.logoUrl && (
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg h-12 flex items-center shadow-lg backdrop-blur-sm z-10">
            <img src={user.logoUrl} alt="Company Logo" className="max-h-full max-w-[120px] object-contain" />
          </div>
        )}
      </div>

      {/* Avatar overlapping banner */}
      <div className="px-6 flex justify-center -mt-16 relative z-10">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center font-black text-4xl border-4 border-white shadow-xl overflow-hidden" style={{ color: themeColor }}>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="px-6 pt-4 text-center">
        <h1 className="text-2xl font-black text-gray-900 mb-1">
          {user.firstName || 'First'} {user.lastName || 'Last'}
        </h1>
        <p className="text-sm font-bold text-gray-500 mb-1" style={{ color: themeColor }}>
          {user.title || 'Job Title'}
        </p>
        <p className="text-xs font-semibold text-gray-400 mb-4">
          {user.companyName || 'Company Name'}
        </p>

        {user.shortBio && (
          <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            {user.shortBio}
          </p>
        )}

        {/* Social Links row */}
        <div className="flex justify-center gap-4 mb-8">
          {user.socialLinks?.facebook && (
            <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-blue-600">
              <FacebookIcon className="w-5 h-5" />
            </a>
          )}
          {user.socialLinks?.instagram && (
            <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-pink-600">
              <InstagramIcon className="w-5 h-5" />
            </a>
          )}
          {user.socialLinks?.linkedin && (
            <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-blue-700">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          )}
          {user.socialLinks?.googleBusiness && (
            <a href={user.socialLinks.googleBusiness} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-green-600">
              <Globe className="w-5 h-5" />
            </a>
          )}
          {user.email && (
            <a href={`mailto:${user.email}`} className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-gray-700">
              <Mail className="w-5 h-5" />
            </a>
          )}
          {user.phone && (
            <a href={`tel:${user.phone}`} className="p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-gray-700">
              <Phone className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="px-6 flex flex-col gap-8 max-w-2xl mx-auto w-full">
        {/* Real Estate Links & Custom Links */}
        <div className="flex flex-col gap-3">
          {/* Built-in Real Estate Links */}
          {user.socialLinks?.zillow && (
            <a href={user.socialLinks.zillow} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all text-gray-800 font-bold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <span className="text-blue-600 font-black text-sm">Z</span>
                </div>
                Zillow Profile
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
            </a>
          )}
          
          {user.socialLinks?.redfin && (
            <a href={user.socialLinks.redfin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all text-gray-800 font-bold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <span className="text-red-600 font-black text-sm">R</span>
                </div>
                Redfin Profile
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
            </a>
          )}

          {user.socialLinks?.mls && (
            <a href={user.socialLinks.mls} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all text-gray-800 font-bold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Building className="w-4 h-4 text-gray-600" />
                </div>
                MLS Agent Page
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
            </a>
          )}

          {user.socialLinks?.broker && (
            <a href={user.socialLinks.broker} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all text-gray-800 font-bold">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Globe className="w-4 h-4 text-gray-600" />
                </div>
                Brokerage Profile Page
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
            </a>
          )}

          {/* Custom Links */}
          {(user.customLinks || []).map((link: any, idx: number) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all text-gray-800 font-bold"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  {link.icon === 'globe' ? <Globe className="w-4 h-4 text-gray-500" /> : <ExternalLink className="w-4 h-4 text-gray-500" />}
                </div>
                {link.name || link.platform}
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 group-hover:text-gray-500" />
            </a>
          ))}
        </div>

        {/* Featured Listings Slider */}
        {featuredListingsData && featuredListingsData.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-black text-gray-900 mb-4 px-2" style={{ color: themeColor }}>Featured Listings</h2>
            <div className="flex overflow-x-auto gap-4 pb-6 px-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {featuredListingsData.map((listing: any) => (
                <a key={listing.id} href={`/listing/${listing.id}`} target="_blank" rel="noopener noreferrer" className="block min-w-[280px] w-72 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden snap-center hover:shadow-lg transition-shadow flex flex-col">
                  <div className="h-40 bg-gray-200 relative">
                    {listing.images && listing.images.length > 0 ? (
                      <img src={listing.images[0]?.url || listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Building className="w-8 h-8 opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur text-white px-2 py-1 rounded text-xs font-bold">
                      {listing.status || 'Active'}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white text-gray-900 px-3 py-1.5 rounded-full text-sm font-black shadow-lg">
                      ${listing.price?.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{listing.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3 h-3" />
                      {listing.address?.city || 'Location'}, {listing.address?.state || ''}
                    </p>
                    <div className="mt-auto flex justify-between gap-3 text-xs font-bold text-gray-600 border-t border-gray-100 pt-3">
                      {listing.beds !== undefined && <span>{listing.beds} Beds</span>}
                      {listing.baths !== undefined && <span>{listing.baths} Baths</span>}
                      {listing.sqft !== undefined && <span>{listing.sqft?.toLocaleString()} SqFt</span>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Client Reviews */}
        {user.reviews && user.reviews.length > 0 && (
          <div className="mt-2 mb-8">
            <h2 className="text-lg font-black text-gray-900 mb-4 px-2" style={{ color: themeColor }}>Client Feedback</h2>
            <div className="flex flex-col gap-4">
              {user.reviews.map((review: any, idx: number) => (
                <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < (review.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic mb-4">"{review.text}"</p>
                  <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 uppercase">{review.author?.[0] || 'A'}</span>
                    {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer address */}
      <div className="text-center pb-12 pt-8 text-xs text-gray-400 font-semibold px-6 border-t border-gray-200 mt-auto">
        <p className="mb-1">{user.companyName}</p>
        <p>{user.street}{user.street2 ? `, ${user.street2}` : ''}</p>
        <p>{user.city ? `${user.city}, ` : ''}{user.state} {user.zip}</p>
      </div>

      {/* Bottom Sticky Tab Bar (Mobile & Tablet only) */}
      <div className={`${hideMobileTabClass} sticky bottom-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50`}>
        <div className="flex justify-around items-center py-2 px-1 max-w-md mx-auto">
          <a href="#" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors" style={{ color: themeColor }}>
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-bold">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors">
            <List className="w-5 h-5" />
            <span className="text-[9px] font-bold">Listings</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors">
            <Mail className="w-5 h-5" />
            <span className="text-[9px] font-bold">Contact</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 text-gray-500 hover:text-gray-900 transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] font-bold">Schedule</span>
          </a>
        </div>
      </div>

    </div>
  );
}

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

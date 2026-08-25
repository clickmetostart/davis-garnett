"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

type Location = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isSeoPrimary: boolean;
  isShipping: boolean;
  gbp: string;
  apple: string;
  yelp: string;
  googleLocationName?: string;
  inviteSent?: boolean;
};

function BusinessLocationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  
  const [locations, setLocations] = useState<Location[]>([]);
  const [saving, setSaving] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Google API State
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [googleLocations, setGoogleLocations] = useState<any[]>([]);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [invitingManager, setInvitingManager] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    isSeoPrimary: false,
    isShipping: false,
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.onboarding?.directoriesSynced) {
          setLocations(prev => prev.map(loc => ({ ...loc, gbp: 'Synced', apple: 'Synced', yelp: 'Synced' })));
        }
      });

    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data?.user?.googleTokens?.access_token) {
          setIsGoogleConnected(true);
        }
      });

    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('officeLocationEntered', [
        {
          targetId: 'location-options-container',
          title: 'Import or Create',
          content: 'You can connect your Google My Business to automatically sync your primary SEO location, OR you can click "Add Manually" to type it in yourself.',
          position: 'bottom',
          actionRequired: false
        },
        {
          targetId: 'btn-add-location-empty',
          title: 'Manual Entry',
          content: 'If you choose to add manually, click this button to open the form.',
          position: 'bottom',
          actionRequired: false
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  const handleForceSync = async () => {
    if (locations.length === 0) {
      alert("Please add a location first.");
      return;
    }
    setSaving(true);
    setLocations(prev => prev.map(loc => loc.isSeoPrimary ? { ...loc, gbp: 'Synced', apple: 'Synced', yelp: 'Synced' } : loc));

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onboarding: { directoriesSynced: true } })
      });
    } catch (err) {
      console.error('Failed to sync directories', err);
    } finally {
      setSaving(false);
    }
  };

  const handleConnectGooglePopup = () => {
    const w = 500;
    const h = 600;
    const left = window.innerWidth / 2 - w / 2;
    const top = window.innerHeight / 2 - h / 2;
    window.open(
      '/api/auth/google?returnTo=/close-popup',
      'GoogleAuth',
      `width=${w},height=${h},top=${top},left=${left}`
    );

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data === 'AUTH_SUCCESS') {
        setIsGoogleConnected(true);
        window.removeEventListener('message', handleMessage);
        // They connected successfully, so if they are in the walkthrough, move to next step
        if (isActive) nextStep();
        // Since they just connected, let's also fetch locations automatically
        fetchGoogleLocations();
      }
    };
    window.addEventListener('message', handleMessage);
  };

  const handleDisconnectGoogle = async () => {
    if (!confirm('Are you sure you want to disconnect your Google account?')) return;
    try {
      const res = await fetch('/api/auth/google/disconnect', { method: 'POST' });
      if (res.ok) {
        setIsGoogleConnected(false);
      }
    } catch (err) {
      console.error('Failed to disconnect', err);
    }
  };

  const fetchGoogleLocations = async () => {
    setIsLoadingGoogle(true);
    try {
      const res = await fetch('/api/locations/google');
      if (res.ok) {
        const data = await res.json();
        setGoogleLocations(data.locations || []);
        setShowGoogleModal(true);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to fetch from Google. Ensure your account has locations.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching from Google');
    }
    setIsLoadingGoogle(false);
  };

  const handleSelectGoogleLocation = (gLoc: any) => {
    setSaving(true);
    setTimeout(() => {
      const isFirst = locations.length === 0;
      const newLoc: Location = {
        id: Math.random().toString(36).slice(-8),
        name: gLoc.title || gLoc.locationName || 'Google Location',
        street: gLoc.address?.street || '',
        city: gLoc.address?.city || '',
        state: gLoc.address?.state || '',
        zip: gLoc.address?.zip || '',
        phone: gLoc.phone || '',
        isSeoPrimary: isFirst, // Force SEO primary if it's the first
        isShipping: false,
        gbp: 'Synced',
        apple: isFirst ? 'Action Required' : 'N/A',
        yelp: isFirst ? 'Unlinked' : 'N/A',
        googleLocationName: gLoc.locationName
      };

      setLocations(prev => [...prev, newLoc]);
      setShowGoogleModal(false);
      setIsAddModalOpen(false);
      setSaving(false);
    }, 600);
  };

  const handleInviteManager = async (locationName: string, id: string) => {
    setInvitingManager(id);
    try {
      const res = await fetch('/api/locations/google/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName })
      });
      if (res.ok) {
        alert("Success! ClickMe has been invited as a manager to optimize your listing.");
        setLocations(prev => prev.map(l => l.id === id ? { ...l, inviteSent: true } : l));
      } else {
        const err = await res.json();
        alert(`Failed to send invitation: ${err.details || err.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while inviting manager.');
    }
    setInvitingManager(null);
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      const newLoc: Location = {
        id: Math.random().toString(36).slice(-8),
        ...formData,
        gbp: formData.isSeoPrimary ? 'Pending' : 'N/A',
        apple: formData.isSeoPrimary ? 'Action Required' : 'N/A',
        yelp: formData.isSeoPrimary ? 'Unlinked' : 'N/A',
      };

      setLocations(prev => [...prev, newLoc]);
      setFormData({ name: '', street: '', city: '', state: '', zip: '', phone: '', isSeoPrimary: false, isShipping: false });
      setIsAddModalOpen(false);
      setSaving(false);
      
      // If onboarding, submit step and end walkthrough
      if (isActive) {
        fetch('/api/onboarding/submit-step', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ moduleName: 'officeLocationEntered', payload: { officeLocationEntered: true } })
        }).then(() => {
          router.push('/clickme');
        });
      }
    }, 600);
  };

  // Pin SEO locations to top
  const sortedLocations = [...locations].sort((a, b) => (a.isSeoPrimary === b.isSeoPrimary) ? 0 : a.isSeoPrimary ? -1 : 1);

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ padding: '3rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Business Locations</h1>
            <p style={{ color: '#4b5563', margin: 0 }}>Manage your physical addresses and sync directory listings.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {saving && !isAddModalOpen && <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>Syncing APIs...</span>}
            <button 
              onClick={handleForceSync}
              disabled={saving || locations.length === 0}
              style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: (saving || locations.length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s', opacity: (saving || locations.length === 0) ? 0.7 : 1 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path></svg>
              Force Sync All
            </button>
            <button 
              id="btn-add-location"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
              style={{ background: '#4fd1c5', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(79, 209, 197, 0.3)', transition: 'all 0.2s' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Location
            </button>
          </div>
        </header>

        {isAddModalOpen && !showGoogleModal && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #4fd1c5', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', marginBottom: '3rem', position: 'relative' }}>
            <button 
              onClick={() => setIsAddModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Add New Location</h3>
            <p style={{ color: '#4b5563', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>Select from Google or enter details manually.</p>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              {isGoogleConnected ? (
                <>
                  <button 
                    onClick={fetchGoogleLocations}
                    disabled={isLoadingGoogle}
                    style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: isLoadingGoogle ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path></svg>
                    {isLoadingGoogle ? 'Fetching...' : 'Select from Google My Business'}
                  </button>
                  <button 
                    onClick={handleDisconnectGoogle}
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleConnectGooglePopup}
                  style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path></svg>
                  Connect Google Business Listing
                </button>
              )}
            </div>

            <div style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2rem', fontWeight: 600, fontSize: '0.9rem' }}>OR CREATE MANUALLY</div>

            <form onSubmit={handleAddLocation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Location Name (e.g. Headquarters)</label>
                <input id="input-location-name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Street Address</label>
                <input id="input-street" required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} type="text" placeholder="123 Main St" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>City</label>
                  <input id="input-city" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>State</label>
                  <input id="input-state" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} type="text" placeholder="WI" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>ZIP</label>
                  <input id="input-zip" required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} type="text" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>Phone Number</label>
                <input id="input-phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="text" placeholder="(555) 555-5555" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} />
              </div>

              <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                  <input 
                    id="checkbox-seo-primary"
                    type="checkbox" 
                    checked={formData.isSeoPrimary} 
                    onChange={e => setFormData({...formData, isSeoPrimary: e.target.checked})}
                    disabled={locations.length === 0} // First location is always SEO primary
                    style={{ marginTop: '0.2rem', width: '18px', height: '18px', accentColor: '#4fd1c5' }} 
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Use as SEO Location (Google Business, Yelp)</div>
                    <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.2rem' }}>Must be a physical address. NO PO BOXES ALLOWED.</div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.2rem' }}>This exact spelling will be distributed to citation networks. Pins to top.</div>
                    {locations.length === 0 && <div style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem' }}>Your first location is automatically set as SEO Primary.</div>}
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input 
                    id="checkbox-shipping"
                    type="checkbox" 
                    checked={formData.isShipping} 
                    onChange={e => setFormData({...formData, isShipping: e.target.checked})}
                    style={{ width: '18px', height: '18px', accentColor: '#4fd1c5' }} 
                  />
                  <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Use as Shipping / Mailing Address</div>
                </label>

              </div>
              
              <button 
                id="btn-submit-location"
                type="submit"
                disabled={saving}
                style={{ marginTop: '1rem', width: '100%', background: '#111827', color: '#ffffff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', opacity: saving ? 0.7 : 1 }}
              >
                {saving ? 'Adding Location...' : 'Add Location Manually'}
              </button>
            </form>
          </div>
        )}

        {showGoogleModal && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #2563eb', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', marginBottom: '3rem', position: 'relative' }}>
            <button 
              onClick={() => setShowGoogleModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Select Google Business Location</h3>
            <p style={{ color: '#4b5563', margin: '0 0 1.5rem 0', fontSize: '0.95rem' }}>
              {locations.length === 0 ? "Choose your primary SEO location from your Google account." : "Select an additional location to import."}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
              {googleLocations.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', background: '#f9fafb', borderRadius: '8px' }}>
                  No locations found in this Google account.
                </div>
              ) : (
                googleLocations.map((gLoc, idx) => (
                  <div key={idx} onClick={() => handleSelectGoogleLocation(gLoc)} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}>
                    <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{gLoc.title}</div>
                    <div style={{ color: '#4b5563', fontSize: '0.9rem' }}>{gLoc.address?.street}, {gLoc.address?.city}, {gLoc.address?.state} {gLoc.address?.zip}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {!isAddModalOpen && sortedLocations.length === 0 ? (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px dashed #d1d5db', padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f3f4f6', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>No Locations Added</h3>
            <p style={{ color: '#6b7280', margin: '0 0 1.5rem 0', maxWidth: '400px', marginInline: 'auto' }}>Connect your Google My Business to automatically sync your primary SEO location, or add it manually to sync later.</p>
            <div id="location-options-container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {isGoogleConnected ? (
                <>
                  <button 
                    onClick={fetchGoogleLocations}
                    disabled={isLoadingGoogle}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: isLoadingGoogle ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path></svg>
                    {isLoadingGoogle ? 'Fetching...' : 'Select from Google'}
                  </button>
                  <button 
                    onClick={handleDisconnectGoogle}
                    style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleConnectGooglePopup}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"></path></svg>
                  Connect Google Business Listing
                </button>
              )}
              <button 
                id="btn-add-location-empty"
                onClick={() => {
                  setIsAddModalOpen(true);
                }}
                style={{ background: '#111827', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Add Manually
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            {sortedLocations.map((loc) => (
              <div key={loc.id} style={{ background: '#ffffff', border: `1px solid ${loc.isSeoPrimary ? '#4fd1c5' : '#e5e7eb'}`, borderRadius: '12px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: loc.isSeoPrimary ? '0 4px 15px rgba(79, 209, 197, 0.15)' : '0 2px 4px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
                
                {loc.isSeoPrimary && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#4fd1c5' }}></div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#111827' }}>{loc.name}</h3>
                    {loc.isSeoPrimary && <span style={{ background: '#e6fffa', color: '#319795', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, border: '1px solid #4fd1c5' }}>SEO PRIMARY</span>}
                    {loc.isShipping && <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, border: '1px solid #d1d5db' }}>SHIPPING</span>}
                  </div>
                  <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: '0 0 0.25rem 0' }}>{loc.street}, {loc.city}, {loc.state} {loc.zip}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>{loc.phone}</p>
                  
                  {loc.isSeoPrimary && loc.googleLocationName && !loc.inviteSent && (
                    <button 
                      onClick={() => handleInviteManager(loc.googleLocationName as string, loc.id)}
                      disabled={invitingManager === loc.id}
                      style={{ marginTop: '1rem', background: '#059669', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: invitingManager === loc.id ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                      {invitingManager === loc.id ? 'Inviting...' : 'Grant ClickMe Manager Access'}
                    </button>
                  )}
                  {loc.inviteSent && (
                    <div style={{ marginTop: '1rem', color: '#059669', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Manager Invitation Sent
                    </div>
                  )}
                </div>
                
                {loc.isSeoPrimary && (
                  <div style={{ display: 'flex', gap: '1.5rem', borderLeft: '1px solid #e5e7eb', paddingLeft: '2rem' }}>
                    {/* Google Sync Status */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.5rem' }}>Google</div>
                      <div style={{ 
                        padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                        background: loc.gbp === 'Synced' ? '#e6fffa' : loc.gbp === 'Pending' ? '#fffbeb' : '#fef2f2',
                        color: loc.gbp === 'Synced' ? '#319795' : loc.gbp === 'Pending' ? '#f59e0b' : '#ef4444',
                        border: `1px solid ${loc.gbp === 'Synced' ? '#4fd1c5' : loc.gbp === 'Pending' ? '#fcd34d' : '#fca5a5'}`
                      }}>{loc.gbp}</div>
                    </div>

                    {/* Apple Maps Sync Status */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.5rem' }}>Apple Maps</div>
                      <div style={{ 
                        padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                        background: loc.apple === 'Synced' ? '#e6fffa' : loc.apple === 'Action Required' ? '#fef2f2' : '#f3f4f6',
                        color: loc.apple === 'Synced' ? '#319795' : loc.apple === 'Action Required' ? '#ef4444' : '#6b7280',
                        border: `1px solid ${loc.apple === 'Synced' ? '#4fd1c5' : loc.apple === 'Action Required' ? '#fca5a5' : '#d1d5db'}`
                      }}>{loc.apple}</div>
                    </div>

                    {/* Yelp Sync Status */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.5rem' }}>Yelp</div>
                      <div style={{ 
                        padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                        background: loc.yelp === 'Synced' ? '#e6fffa' : loc.yelp === 'Pending' ? '#fffbeb' : '#f3f4f6',
                        color: loc.yelp === 'Synced' ? '#319795' : loc.yelp === 'Pending' ? '#f59e0b' : '#6b7280',
                        border: `1px solid ${loc.yelp === 'Synced' ? '#4fd1c5' : loc.yelp === 'Pending' ? '#fcd34d' : '#d1d5db'}`
                      }}>{loc.yelp}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BusinessLocations() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Locations...</div>}>
      <BusinessLocationsContent />
    </Suspense>
  );
}

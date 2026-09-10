"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';
import LinktreeProfile from '@/components/LinktreeProfile';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

function ProfileSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    companyName: '',
    title: '',
    phone: '',
    address: '',
    shortBio: '',
    longBio: '',
    avatarUrl: '',
    logoUrl: '',
    companyWebsite: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    socialLinks: { facebook: '', instagram: '', linkedin: '', googleBusiness: '', zillow: '', redfin: '', mls: '', broker: '' },
    customLinks: [] as {platform: string; url: string; icon?: string}[],
    featuredListings: [] as string[],
    reviews: [] as {author: string; text: string; rating: number}[],
    themeColor: '#111827'
  });

  const [allListings, setAllListings] = useState<any[]>([]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('mobile');

  const [generatingAI, setGeneratingAI] = useState(false);

  const handleGenerateBio = () => {
    if(!user.firstName || !user.lastName) {
      alert("Please enter at least a First and Last Name to generate a bio.");
      return;
    }
    setGeneratingAI(true);
    setTimeout(() => {
      setUser({
        ...user,
        shortBio: `${user.firstName} is a highly experienced ${user.title || 'professional'} at ${user.companyName || 'our company'}, dedicated to delivering exceptional results.`,
        longBio: `${user.firstName} ${user.lastName} brings years of expertise to their role as ${user.title || 'a key team member'} at ${user.companyName || 'our organization'}. Known for a strategic approach and a passion for excellence, ${user.firstName} consistently drives innovation and success. Outside of work, they are committed to continuous learning and community engagement.`
      });
      setGeneratingAI(false);
    }, 1500);
  };

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, listingsRes] = await Promise.all([
          fetch('/api/auth/me'),
          fetch('/api/listings')
        ]);
        
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(prev => ({
            ...prev,
            ...userData.user,
            socialLinks: userData.user.socialLinks || prev.socialLinks,
            customLinks: userData.user.customLinks || prev.customLinks,
            featuredListings: userData.user.featuredListings || prev.featuredListings,
            reviews: userData.user.reviews || prev.reviews,
          }));
        }

        if (listingsRes.ok) {
          const listingsData = await listingsRes.json();
          setAllListings(listingsData);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('profileSetup', [
        {
          targetId: 'btn-upload-avatar',
          title: 'Profile Avatar',
          content: 'Upload a professional headshot to personalize your dashboard and public facing profiles.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'btn-upload-logo',
          title: 'Company Logo',
          content: 'Add your company logo for branding.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-first-name',
          title: 'Enter Your First Name',
          content: 'Let\'s start by setting up your public profile. Enter your First Name.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-last-name',
          title: 'Enter Your Last Name',
          content: 'Enter your Last Name.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-company',
          title: 'Your Company',
          content: 'What company do you work for?',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-title',
          title: 'Add Your Title',
          content: 'What is your job title? (e.g. Branch Manager, Loan Officer)',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-email',
          title: 'Contact Email',
          content: 'Enter the email you want clients to reach you at.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-phone',
          title: 'Phone Number',
          content: 'Enter your direct phone line.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'input-street',
          title: 'Office Address',
          content: 'Add your physical office address so clients know where you are located. It will display on your digital business card.',
          position: 'top',
          actionRequired: false
        },
        {
          targetId: 'btn-auto-generate-bio',
          title: 'Generate Bio',
          content: 'Click this button to have our AI instantly write a professional biography for you based on your details.',
          position: 'left',
          actionRequired: false
        },
        {
          targetId: 'btn-save-profile',
          title: 'Save Profile',
          content: 'Click Save Profile to finalize your setup. This completes your Profile onboarding!',
          position: 'top',
          actionRequired: false
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          updates: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            companyName: user.companyName,
            title: user.title,
            phone: user.phone,
            address: user.address,
            shortBio: user.shortBio,
            longBio: user.longBio,
            avatarUrl: user.avatarUrl,
            logoUrl: user.logoUrl,
            companyWebsite: user.companyWebsite,
            street: user.street,
            street2: user.street2,
            city: user.city,
            state: user.state,
            zip: user.zip,
            socialLinks: user.socialLinks,
            customLinks: user.customLinks,
            featuredListings: user.featuredListings,
            reviews: user.reviews,
            themeColor: user.themeColor,
            coverImageUrl: user.coverImageUrl
          }
        })
      });

      if (res.ok) {
        setMessage('Profile updated successfully.');
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while saving.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
      if (isActive) nextStep();
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('Passwords do not match.');
      return;
    }
    
    setSaving(true);
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          updates: { password: passwordData.newPassword }
        })
      });
      if (res.ok) {
        setPasswordMessage('Password updated securely.');
        setPasswordData({ newPassword: '', confirmPassword: '' });
      } else {
        setPasswordMessage('Failed to update password.');
      }
    } catch (err) {
      setPasswordMessage('Error saving password.');
    } finally {
      setSaving(false);
      setTimeout(() => setPasswordMessage(''), 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'logoUrl' | 'coverImageUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        
        await fetch('/api/users', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
            updates: { [field]: data.url }
          })
        });

        setUser({ ...user, [field]: data.url });
        setMessage(`${field === 'avatarUrl' ? 'Avatar' : field === 'logoUrl' ? 'Logo' : 'Cover'} uploaded successfully!`);
      } else {
        setMessage(`Failed to upload ${field === 'avatarUrl' ? 'Avatar' : field === 'logoUrl' ? 'Logo' : 'Cover'}.`);
      }
    } catch (error) {
      setMessage('Upload error.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRemoveFile = async (field: 'avatarUrl' | 'logoUrl' | 'coverImageUrl') => {
    if(!user[field]) return;
    setSaving(true);
    try {
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, updates: { [field]: '' } })
      });
      setUser({ ...user, [field]: '' });
    } catch(err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", overflowY: 'auto' }}>
      <div style={{ padding: '3rem 4rem', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
        
        {/* LEFT COLUMN: FORM */}
        <div>
          <header style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Profile Settings</h1>
            <p style={{ color: '#4b5563', margin: 0 }}>Manage your personal details, contact information, and security credentials.</p>
          </header>

          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', marginBottom: '2rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Profile Avatar</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e6fffa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#319795', fontSize: '2rem', border: '3px solid #4fd1c5', overflow: 'hidden', flexShrink: 0 }}>
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                    )}
                  </div>
                  <div>
                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'avatarUrl')} />
                    <button id="btn-upload-avatar" disabled={saving} type="button" onClick={() => fileInputRef.current?.click()} style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', marginRight: '1rem', transition: 'all 0.2s', fontSize: '0.85rem' }}>
                      Upload Image
                    </button>
                    {user.avatarUrl && (
                      <button disabled={saving} type="button" onClick={() => handleRemoveFile('avatarUrl')} style={{ background: 'transparent', color: '#ef4444', border: 'none', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}>Remove</button>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ width: '1px', height: '100px', background: '#e5e7eb' }}></div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Company Logo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '120px', height: '60px', borderRadius: '8px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d1d5db', overflow: 'hidden', flexShrink: 0 }}>
                    {user.logoUrl ? (
                      <img src={user.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>No Logo</span>
                    )}
                  </div>
                  <div>
                    <input type="file" accept="image/*" ref={logoInputRef} style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'logoUrl')} />
                    <button id="btn-upload-logo" disabled={saving} type="button" onClick={() => logoInputRef.current?.click()} style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', marginBottom: user.logoUrl ? '0.5rem' : 0, display: 'block' }}>
                      Upload Logo
                    </button>
                    {user.logoUrl && (
                      <button disabled={saving} type="button" onClick={() => handleRemoveFile('logoUrl')} style={{ background: 'transparent', color: '#ef4444', border: 'none', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}>Remove</button>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ width: '1px', height: '100px', background: '#e5e7eb' }}></div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Cover Background</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '120px', height: '60px', borderRadius: '8px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d1d5db', overflow: 'hidden', flexShrink: 0 }}>
                      {user.coverImageUrl ? (
                        <img src={user.coverImageUrl} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${user.themeColor || '#111827'} 0%, #000000 100%)` }}></div>
                      )}
                    </div>
                    <div>
                      <input type="file" accept="image/*" ref={coverInputRef} style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, 'coverImageUrl')} />
                      <button id="btn-upload-cover" disabled={saving} type="button" onClick={() => coverInputRef.current?.click()} style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', marginBottom: user.coverImageUrl ? '0.5rem' : 0, display: 'block' }}>
                        Upload Image
                      </button>
                      {user.coverImageUrl && (
                        <button disabled={saving} type="button" onClick={() => handleRemoveFile('coverImageUrl')} style={{ background: 'transparent', color: '#ef4444', border: 'none', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}>Remove</button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.3rem' }}>Or choose a gradient color</label>
                    <input 
                      type="color" 
                      value={user.themeColor || '#111827'} 
                      onChange={(e) => setUser({...user, themeColor: e.target.value})}
                      style={{ width: '40px', height: '40px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer', outline: 'none' }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>First Name</label>
                  <input id="input-first-name" required type="text" value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Last Name</label>
                  <input id="input-last-name" required type="text" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Company Name (Optional)</label>
                  <input id="input-company" type="text" value={user.companyName || ''} onChange={(e) => setUser({...user, companyName: e.target.value})} placeholder="e.g. ClickMe Template" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Job Title (Optional)</label>
                  <input id="input-title" type="text" value={user.title || ''} onChange={(e) => setUser({...user, title: e.target.value})} placeholder="e.g. Branch Manager" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
                  <input id="input-email" required type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Phone Number (Optional)</label>
                  <input id="input-phone" type="tel" value={user.phone || ''} onChange={(e) => setUser({...user, phone: e.target.value})} placeholder="(555) 123-4567" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Company Website (Optional)</label>
                  <input id="input-website" type="url" value={user.companyWebsite || ''} onChange={(e) => setUser({...user, companyWebsite: e.target.value})} placeholder="https://ClickMehomeloans.com" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Office Address (Optional)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <input id="input-street" type="text" value={user.street || ''} onChange={(e) => setUser({...user, street: e.target.value})} placeholder="Street Address" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                  <input type="text" value={user.street2 || ''} onChange={(e) => setUser({...user, street2: e.target.value})} placeholder="Apt, Suite, Bldg (Optional)" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.8rem' }}>
                    <input type="text" value={user.city || ''} onChange={(e) => setUser({...user, city: e.target.value})} placeholder="City" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                    <input type="text" value={user.state || ''} onChange={(e) => setUser({...user, state: e.target.value})} placeholder="State" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                    <input type="text" value={user.zip || ''} onChange={(e) => setUser({...user, zip: e.target.value})} placeholder="ZIP" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
                  </div>
                </div>
              </div>

              {/* Social & Custom Links */}
              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Social & Custom Links</label>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>Add your LinkedIn, Digital Business Card, Facebook, etc.</p>
                  </div>
                </div>

                {/* Real Estate Profiles */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Zillow Profile</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.zillow || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, zillow: e.target.value}})} 
                      placeholder="https://zillow.com/profile/..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Redfin Profile</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.redfin || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, redfin: e.target.value}})} 
                      placeholder="https://redfin.com/real-estate-agents/..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>MLS Agent Page</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.mls || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, mls: e.target.value}})} 
                      placeholder="https://..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Brokerage Profile Page</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.broker || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, broker: e.target.value}})} 
                      placeholder="https://..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                </div>

                <div style={{ height: '1px', background: '#e5e7eb', margin: '1rem 0 1.5rem 0' }}></div>

                {/* Standard Social Links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Facebook URL</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.facebook || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, facebook: e.target.value}})} 
                      placeholder="https://facebook.com/..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Instagram URL</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.instagram || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, instagram: e.target.value}})} 
                      placeholder="https://instagram.com/..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>LinkedIn URL</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.linkedin || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, linkedin: e.target.value}})} 
                      placeholder="https://linkedin.com/in/..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Google Business URL</label>
                    <input 
                      type="url" 
                      value={user.socialLinks?.googleBusiness || ''} 
                      onChange={(e) => setUser({...user, socialLinks: {...user.socialLinks, googleBusiness: e.target.value}})} 
                      placeholder="https://g.page/..." 
                      style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#374151' }}>Custom Links</label>
                  <button 
                    type="button"
                    onClick={() => setUser({...user, customLinks: [...(user.customLinks || []), { platform: '', url: '', icon: 'external' }]})}
                    style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Link
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(!user.customLinks || user.customLinks.length === 0) && (
                    <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem' }}>
                      No custom links added yet. Click "Add Link" to get started.
                    </div>
                  )}
                  {(user.customLinks || []).map((link, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 2fr auto', gap: '0.5rem', alignItems: 'start' }}>
                      <div>
                        <select
                          value={link.icon || 'external'}
                          onChange={(e) => {
                            const newLinks = [...user.customLinks];
                            newLinks[idx].icon = e.target.value;
                            setUser({...user, customLinks: newLinks});
                          }}
                          style={{ padding: '0.7rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem' }}
                        >
                          <option value="external">↗️ Link</option>
                          <option value="globe">🌐 Web</option>
                        </select>
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Name (e.g. My Zillow)" 
                          value={link.platform} 
                          onChange={(e) => {
                            const newLinks = [...user.customLinks];
                            newLinks[idx].platform = e.target.value;
                            setUser({...user, customLinks: newLinks});
                          }}
                          style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                        />
                      </div>
                      <div>
                        <input 
                          type="url" 
                          placeholder="https://..." 
                          value={link.url} 
                          onChange={(e) => {
                            const newLinks = [...user.customLinks];
                            newLinks[idx].url = e.target.value;
                            setUser({...user, customLinks: newLinks});
                          }}
                          style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.9rem' }} 
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          const newLinks = [...user.customLinks];
                          newLinks.splice(idx, 1);
                          setUser({...user, customLinks: newLinks});
                        }}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', padding: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Professional Bio</label>
                  <button 
                    id="btn-auto-generate-bio"
                    type="button"
                    onClick={() => {
                      handleGenerateBio();
                      if (isActive) nextStep();
                    }}
                    disabled={generatingAI}
                    style={{ background: 'linear-gradient(to right, #4fd1c5, #319795)', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 700, cursor: generatingAI ? 'not-allowed' : 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(79, 209, 197, 0.3)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>
                    {generatingAI ? 'Generating...' : 'Auto-Generate with AI'}
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>Short Bio (1-2 sentences)</label>
                    <textarea value={user.shortBio || ''} onChange={(e) => setUser({...user, shortBio: e.target.value})} rows={2} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>Long Bio (Full paragraph)</label>
                    <textarea value={user.longBio || ''} onChange={(e) => setUser({...user, longBio: e.target.value})} rows={5} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }} />
                  </div>
                </div>
              </div>

              {/* Featured Listings */}
              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Featured Listings</label>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>Select properties to feature on your digital business card.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '300px', overflowY: 'auto', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '8px', padding: '1rem' }}>
                  {allListings.length === 0 ? (
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', textAlign: 'center' }}>No listings available.</p>
                  ) : (
                    allListings.map(listing => (
                      <label key={listing.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '0.5rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                        <input 
                          type="checkbox"
                          checked={(user.featuredListings || []).includes(listing.id)}
                          onChange={(e) => {
                            const newFeatured = e.target.checked 
                              ? [...(user.featuredListings || []), listing.id]
                              : (user.featuredListings || []).filter(id => id !== listing.id);
                            setUser({...user, featuredListings: newFeatured});
                          }}
                          style={{ width: '18px', height: '18px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>{listing.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{listing.address?.city} • ${listing.price?.toLocaleString()}</div>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Reviews */}
              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Client Reviews</label>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>Manually add client testimonials to display on your profile.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setUser({...user, reviews: [...(user.reviews || []), { author: '', text: '', rating: 5 }]})}
                    style={{ background: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Review
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(!user.reviews || user.reviews.length === 0) && (
                    <div style={{ background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', color: '#6b7280', fontSize: '0.85rem' }}>
                      No reviews added yet.
                    </div>
                  )}
                  {(user.reviews || []).map((review, idx) => (
                    <div key={idx} style={{ background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '8px', padding: '1rem', position: 'relative' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const newReviews = [...user.reviews];
                          newReviews.splice(idx, 1);
                          setUser({...user, reviews: newReviews});
                        }}
                        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.3rem', borderRadius: '4px', cursor: 'pointer' }}
                        title="Delete Review"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>Client Name</label>
                          <input 
                            type="text" 
                            value={review.author} 
                            onChange={(e) => {
                              const newReviews = [...user.reviews];
                              newReviews[idx].author = e.target.value;
                              setUser({...user, reviews: newReviews});
                            }}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '6px', background: '#fff', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem' }} 
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>Rating</label>
                          <select 
                            value={review.rating} 
                            onChange={(e) => {
                              const newReviews = [...user.reviews];
                              newReviews[idx].rating = parseInt(e.target.value);
                              setUser({...user, reviews: newReviews});
                            }}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '6px', background: '#fff', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem' }}
                          >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.3rem' }}>Review Text</label>
                        <textarea 
                          value={review.text} 
                          onChange={(e) => {
                            const newReviews = [...user.reviews];
                            newReviews[idx].text = e.target.value;
                            setUser({...user, reviews: newReviews});
                          }}
                          rows={3} 
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '6px', background: '#fff', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: message.includes('success') ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: '0.9rem' }}>
                  {message}
                </div>
                <button id="btn-save-profile" disabled={saving} type="submit" style={{ background: '#4fd1c5', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 209, 197, 0.3)', transition: 'all 0.2s', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Security / Password Update Section */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '3rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Security</h2>
            <p style={{ color: '#6b7280', margin: '0 0 2rem 0', fontSize: '0.95rem' }}>Update your password to keep your account secure.</p>

            <form onSubmit={handlePasswordSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>New Password</label>
                <input required type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="••••••••••••" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Confirm Password</label>
                <input required type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} placeholder="••••••••••••" style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '8px', background: '#f9fafb', border: '1px solid #d1d5db', color: '#111827', outline: 'none', fontSize: '1rem' }} />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                 <div style={{ color: passwordMessage.includes('securely') ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: '0.9rem' }}>
                  {passwordMessage}
                </div>
                <button disabled={saving} type="submit" style={{ background: '#111827', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'all 0.2s', opacity: saving ? 0.7 : 1 }}>
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW CARD */}
        <div style={{ position: 'sticky', top: '3rem', alignSelf: 'start' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Live Preview</h3>
              <a href={`/${user.firstName?.toLowerCase()}-${user.lastName?.toLowerCase()}-links`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#2563eb', textDecoration: 'underline' }}>View Public Page ↗</a>
            </div>
            
            {/* Device Toggles */}
            <div style={{ display: 'flex', background: '#f3f4f6', padding: '0.2rem', borderRadius: '8px', gap: '0.2rem' }}>
              <button 
                type="button"
                onClick={() => setPreviewMode('mobile')}
                style={{ padding: '0.4rem', borderRadius: '6px', background: previewMode === 'mobile' ? '#fff' : 'transparent', color: previewMode === 'mobile' ? '#111827' : '#6b7280', border: 'none', boxShadow: previewMode === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                title="Mobile View"
              >
                <Smartphone size={16} />
              </button>
              <button 
                type="button"
                onClick={() => setPreviewMode('tablet')}
                style={{ padding: '0.4rem', borderRadius: '6px', background: previewMode === 'tablet' ? '#fff' : 'transparent', color: previewMode === 'tablet' ? '#111827' : '#6b7280', border: 'none', boxShadow: previewMode === 'tablet' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                title="Tablet View"
              >
                <Tablet size={16} />
              </button>
              <button 
                type="button"
                onClick={() => setPreviewMode('desktop')}
                style={{ padding: '0.4rem', borderRadius: '6px', background: previewMode === 'desktop' ? '#fff' : 'transparent', color: previewMode === 'desktop' ? '#111827' : '#6b7280', border: 'none', boxShadow: previewMode === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                title="Desktop View"
              >
                <Monitor size={16} />
              </button>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            background: '#e5e7eb', 
            padding: previewMode === 'desktop' ? '0' : '1rem', 
            borderRadius: previewMode === 'desktop' ? '12px' : '24px',
            transition: 'all 0.3s ease',
            height: previewMode === 'desktop' ? '600px' : 'auto'
          }}>
            <div style={{ 
              width: previewMode === 'mobile' ? '375px' : previewMode === 'tablet' ? '500px' : '100%', 
              height: previewMode === 'desktop' ? '100%' : '800px', 
              background: '#ffffff', 
              borderRadius: previewMode === 'desktop' ? '12px' : '36px', 
              overflowY: 'auto', 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
              border: previewMode === 'desktop' ? '1px solid #d1d5db' : '8px solid #1f2937',
              transition: 'all 0.3s ease'
            }}>
              <LinktreeProfile 
                user={user} 
                featuredListingsData={allListings.filter(l => (user.featuredListings || []).includes(l.id))} 
                previewMode={previewMode as any}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProfileSettings() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Profile...</div>}>
      <ProfileSettingsContent />
    </Suspense>
  );
}

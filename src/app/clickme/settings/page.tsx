"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

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
    customLinks: [] as {platform: string; url: string}[]
  });

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
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser({
            ...user,
            ...data.user
          });
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
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
            customLinks: user.customLinks
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarUrl' | 'logoUrl') => {
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
        setMessage(`${field === 'avatarUrl' ? 'Avatar' : 'Logo'} uploaded successfully!`);
      } else {
        setMessage(`Failed to upload ${field === 'avatarUrl' ? 'Avatar' : 'Logo'}.`);
      }
    } catch (error) {
      setMessage('Upload error.');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleRemoveFile = async (field: 'avatarUrl' | 'logoUrl') => {
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>Social & Custom Links</label>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>Add your LinkedIn, Digital Business Card, Facebook, etc.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setUser({...user, customLinks: [...(user.customLinks || []), { platform: '', url: '' }]})}
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
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '1rem', alignItems: 'start' }}>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Platform (e.g. LinkedIn)" 
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
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Live Preview</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#319795', background: '#e6fffa', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>Digital Card</span>
          </div>
          
          <div style={{ background: '#ffffff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #e5e7eb' }}>
            {/* Header Banner */}
            <div style={{ height: '120px', background: 'linear-gradient(135deg, #4fd1c5 0%, #2c7a7b 100%)', position: 'relative' }}>
              {user.logoUrl && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: '8px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <img src={user.logoUrl} alt="Company Logo" style={{ maxHeight: '100%', maxWidth: '100px', objectFit: 'contain' }} />
                </div>
              )}
            </div>

            {/* Avatar overlapping banner */}
            <div style={{ padding: '0 2rem', display: 'flex', justifyContent: 'center', marginTop: '-60px', position: 'relative' }}>
               <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#319795', fontSize: '3rem', border: '4px solid #ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div style={{ padding: '1.5rem 2rem 2rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem 0' }}>
                {user.firstName || 'First'} {user.lastName || 'Last'}
              </h2>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#319795', margin: '0 0 0.25rem 0' }}>
                {user.title || 'Job Title'}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 1.5rem 0', fontWeight: 600 }}>
                {user.companyName || 'Company Name'}
              </p>

              <div style={{ width: '40px', height: '4px', background: '#e5e7eb', margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>

              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', margin: '0 0 2rem 0', fontStyle: 'italic' }}>
                "{user.shortBio || 'Add a short bio to let clients know a little about your expertise and dedication.'}"
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {user.phone && (
                  <a href={`tel:${user.phone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: '#111827', color: '#fff', padding: '0.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', transition: 'background 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Call {user.firstName || 'Me'}
                  </a>
                )}
                <a href="#message" onClick={(e) => { e.preventDefault(); alert("In the live card, this will open the system's built-in message form."); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: '#f3f4f6', color: '#111827', padding: '0.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', transition: 'background 0.2s', border: '1px solid #e5e7eb' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Message
                </a>
              </div>
            </div>
            
            <div style={{ background: '#f9fafb', padding: '1rem', borderTop: '1px solid #e5e7eb', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600 }}>
              {user.street ? (
                <>
                  <div>{user.street}{user.street2 ? `, ${user.street2}` : ''}</div>
                  <div>{user.city ? `${user.city}, ` : ''}{user.state} {user.zip}</div>
                </>
              ) : 'Office Address not provided'}
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

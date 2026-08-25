"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

// A dynamic CSS-based walkthrough animation component
const WireframeWalkthrough = ({ network }: { network: string }) => {
  const colors = {
    meta: { header: '#1877f2', sidebar: '#f3f4f6', main: '#ffffff', button: '#1877f2' },
    linkedin: { header: '#0a66c2', sidebar: '#ffffff', main: '#f3f4f6', button: '#0a66c2' },
    google: { header: '#ffffff', sidebar: '#f8f9fa', main: '#ffffff', button: '#1a73e8' },
  }[network as 'meta' | 'linkedin' | 'google'] || { header: '#e5e7eb', sidebar: '#f3f4f6', main: '#fff', button: '#000' };

  return (
    <div style={{ width: '100%', height: '220px', background: '#e5e7eb', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid #d1d5db', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ height: '20px', background: '#d1d5db', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '4px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
      </div>

      <div style={{ display: 'flex', height: '200px' }}>
        <div style={{ width: '30%', background: colors.sidebar, borderRight: '1px solid #e5e7eb', padding: '10px' }}>
          <div style={{ height: '12px', width: '80%', background: '#d1d5db', borderRadius: '4px', marginBottom: '15px' }}></div>
          <div className="anim-sidebar-item" style={{ height: '10px', width: '90%', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }}></div>
          <div className="anim-sidebar-item-2" style={{ height: '10px', width: '70%', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }}></div>
          <div className="anim-sidebar-item-3" style={{ height: '10px', width: '85%', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }}></div>
        </div>

        <div style={{ flex: 1, background: colors.main, padding: '15px', position: 'relative' }}>
          <div style={{ height: '16px', width: '40%', background: colors.header, borderRadius: '4px', marginBottom: '20px', opacity: 0.8 }}></div>
          
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ height: '10px', width: '30%', background: '#d1d5db', borderRadius: '4px' }}></div>
              <div className="anim-action-button" style={{ height: '14px', width: '40px', background: colors.button, borderRadius: '4px' }}></div>
            </div>
            <div style={{ height: '1px', background: '#e5e7eb', marginBottom: '10px' }}></div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#d1d5db' }}></div>
              <div style={{ height: '8px', width: '50%', background: '#e5e7eb', borderRadius: '4px' }}></div>
            </div>
          </div>

          <div className="anim-modal" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, pointerEvents: 'none' }}>
            <div style={{ width: '80%', background: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ height: '10px', width: '50%', background: '#111827', borderRadius: '4px', marginBottom: '10px' }}></div>
              <div className="anim-input" style={{ height: '16px', border: '1px solid #d1d5db', borderRadius: '4px', marginBottom: '10px', display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                <div className="anim-typing" style={{ height: '8px', background: '#4fd1c5', borderRadius: '2px', width: '0%' }}></div>
              </div>
              <div className="anim-confirm-btn" style={{ height: '16px', width: '100%', background: colors.button, borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`anim-cursor anim-cursor-${network}`} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 2l6.5 19.5 3-7.5 7.5-3L4 2z" fill="#111827" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
        <div className="anim-ripple" style={{ position: 'absolute', top: '0px', left: '0px', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ef4444', opacity: 0 }}></div>
      </div>
    </div>
  );
};

function SocialIntegrationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  const [saving, setSaving] = useState(false);
  const [modalState, setModalState] = useState<'closed' | 'loading' | 'instructions' | 'need-account'>('closed');
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Submit state machine: 'idle' | 'ready' | 'confirming' | 'submitting' | 'completed'
  const [submitState, setSubmitState] = useState<'idle' | 'ready' | 'confirming' | 'submitting' | 'completed'>('idle');

  const [networks, setNetworks] = useState([
    { 
      id: 'meta', 
      name: 'Meta (Facebook & Instagram)', 
      status: 'Disconnected', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ), 
      color: '#1877f2', 
      bgColor: '#e7f0f9',
      settingsLink: 'https://business.facebook.com/settings',
      createLink: 'https://business.facebook.com/pages/creation/',
      instructions: [
        'Open your Meta Business Settings using the link below.',
        'Navigate to Users > Partners in the left sidebar.',
        'Click "Add" > "Assign a partner" using our email, and enable ONLY the "Create content" permission.'
      ]
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn Professional', 
      status: 'Disconnected', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ), 
      color: '#0a66c2', 
      bgColor: '#e6f0f8',
      settingsLink: 'https://www.linkedin.com/mypreferences/d/categories/account',
      createLink: 'https://www.linkedin.com/company/setup/new/',
      instructions: [
        'Open your LinkedIn Company Page as an admin.',
        'Click on "Settings" in the left sidebar, then select "Manage Admins".',
        'Click "Add Admin", paste our email, and assign us the "Content Admin" role.'
      ]
    },
    { 
      id: 'google', 
      name: 'Google Profile / Maps', 
      status: 'Disconnected', 
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ), 
      color: '#ea4335', 
      bgColor: '#fce8e6',
      settingsLink: 'https://business.google.com/locations',
      createLink: 'https://www.google.com/business/',
      instructions: [
        'Search for your business on Google or open the Business Profile Manager.',
        'Click the three dots (Menu) > Business Profile settings.',
        'Click "People and access", then click "Add" and paste our email to invite us as a "Manager" (not Owner).'
      ]
    },
  ]);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.onboarding?.socialsAuthorized) {
          const authState = data.onboarding.socialsAuthorized;
          if (authState === 'Submitted') {
            setSubmitState('completed');
            setNetworks(prev => prev.map(n => ({ ...n, status: 'Submitted' })));
          } else if (authState === 'Pending') {
            setNetworks(prev => prev.map(n => ({ ...n, status: 'Pending Verification' })));
          } else if (authState === true) {
            setNetworks(prev => prev.map(n => ({ ...n, status: 'Connected' })));
          }
        }
      });
  }, []);

  useEffect(() => {
    if (submitState === 'completed' || submitState === 'confirming' || submitState === 'submitting') return;
    
    // Check if all networks are accounted for (anything but Disconnected)
    const allAccountedFor = networks.every(n => n.status !== 'Disconnected');
    if (allAccountedFor) {
      setSubmitState('ready');
    } else {
      setSubmitState('idle');
    }
  }, [networks, submitState]);

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('socialTraining', [
        {
          targetId: 'btn-connect-meta',
          title: 'Learn to Connect Networks',
          content: 'Click "Connect Account" to see our specialized animated training on how to grant us publisher access.',
          position: 'bottom',
          actionRequired: true
        },
        {
          targetId: 'btn-submit-module',
          title: 'Submit Connectivity',
          content: 'Once you connect or request builds for your networks, you can submit this module here to finish your setup!',
          position: 'top',
          actionRequired: false
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  const handleSubmitModule = async () => {
    setSubmitState('submitting');
    try {
      await fetch('/api/onboarding/submit-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleName: 'Social Integrations',
          payload: { 
            socialsAuthorized: 'Submitted',
            socialNetworkStates: networks.reduce((acc: any, net) => {
              acc[net.id] = net.status;
              return acc;
            }, {})
          }
        })
      });
      setSubmitState('completed');
      setTimeout(() => {
        router.push('/clickme');
      }, 1500);
    } catch (err) {
      console.error(err);
      setSubmitState('ready');
    }
  };

  const initiateConnection = (id: string) => {
    setActiveNetwork(id);
    setModalState('loading');
    setCopied(false);

    setTimeout(() => {
      setModalState('instructions');
      if (isActive) nextStep();
    }, 1500);
  };

  const initiateNeedAccount = (id: string) => {
    setActiveNetwork(id);
    setModalState('need-account');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('launch@clickme.life');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmInvite = async () => {
    if (!activeNetwork) return;

    const updatedNetworks = networks.map(n => n.id === activeNetwork ? { ...n, status: 'Pending Verification' } : n);
    setNetworks(updatedNetworks);
    setModalState('closed');
    setSaving(true);
    
    try {
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ onboarding: { socialsAuthorized: "Pending" } }) });
    } catch (err) {} finally { setSaving(false); }
  };

  const requestBuild = async (id: string) => {
    setSaving(true);
    setModalState('closed');
    const updatedNetworks = networks.map(n => n.id === id ? { ...n, status: 'Build Requested' } : n);
    setNetworks(updatedNetworks);
    
    try {
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ onboarding: { [`build_${id}`]: true } }) });
    } catch(err) {} finally { setSaving(false); }
  };

  const cancelBuildRequest = async (id: string) => {
    setSaving(true);
    const updatedNetworks = networks.map(n => n.id === id ? { ...n, status: 'Disconnected' } : n);
    setNetworks(updatedNetworks);
    
    try {
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ onboarding: { [`build_${id}`]: false } }) });
    } catch(err) {} finally { setSaving(false); }
  };

  const disconnectNetwork = async (id: string) => {
    setSaving(true);
    const updatedNetworks = networks.map(n => n.id === id ? { ...n, status: 'Disconnected' } : n);
    setNetworks(updatedNetworks);

    try {
      await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ onboarding: { socialsAuthorized: false } }) });
    } catch (err) {} finally { setSaving(false); }
  };

  const activeNetData = networks.find(n => n.id === activeNetwork);

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ padding: '3rem 4rem' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Social Integrations</h1>
            <p style={{ color: '#1f2937', margin: 0, fontWeight: 500 }}>Authorize ClickMe to auto-publish AI-generated content on your behalf.</p>
          </div>
          {saving && (
            <div style={{ padding: '0.5rem 1rem', background: '#e5e7eb', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#1f2937' }}>
              Syncing...
            </div>
          )}
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {networks.map((net) => (
            <div key={net.id} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: net.bgColor, color: net.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', opacity: net.status === 'Build Requested' ? 0.5 : 1 }}>
                {net.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>{net.name}</h3>
              
              <div style={{ margin: '1rem 0 2rem 0' }}>
                <span style={{ 
                  padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
                  background: net.status === 'Connected' ? '#e6fffa' : net.status === 'Pending Verification' ? '#fffbeb' : net.status === 'Build Requested' ? '#f0fdfa' : '#f3f4f6',
                  color: net.status === 'Connected' ? '#319795' : net.status === 'Pending Verification' ? '#d97706' : net.status === 'Build Requested' ? '#0d9488' : '#4b5563',
                  border: `1px solid ${net.status === 'Connected' ? '#4fd1c5' : net.status === 'Pending Verification' ? '#fcd34d' : net.status === 'Build Requested' ? '#4fd1c5' : '#d1d5db'}`
                }}>
                  {net.status}
                </span>
              </div>

              {net.status === 'Disconnected' ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button 
                    id={`btn-connect-${net.id}`}
                    onClick={() => initiateConnection(net.id)}
                    disabled={saving || submitState === 'completed'}
                    style={{ width: '100%', background: net.color, color: '#ffffff', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, cursor: (saving || submitState === 'completed') ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: `0 4px 10px ${net.bgColor}`, opacity: (saving || submitState === 'completed') ? 0.7 : 1 }}
                  >
                    Connect Account
                  </button>
                  <button 
                    onClick={() => initiateNeedAccount(net.id)}
                    style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    I don't have this account yet
                  </button>
                </div>
              ) : net.status === 'Build Requested' ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button 
                    onClick={() => cancelBuildRequest(net.id)}
                    disabled={saving}
                    style={{ width: '100%', background: '#ffffff', color: '#0d9488', border: '1px solid #4fd1c5', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: saving ? 0.7 : 1 }}
                  >
                    Cancel Build Request
                  </button>
                  <button 
                    onClick={() => initiateConnection(net.id)}
                    style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    I built it myself, let's connect it
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => disconnectNetwork(net.id)}
                  disabled={saving}
                  style={{ width: '100%', background: '#ffffff', color: '#dc2626', border: '1px solid #fca5a5', padding: '0.8rem', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: saving ? 0.7 : 1 }}
                >
                  {net.status === 'Pending Verification' ? 'Cancel Request' : 'Disconnect Account'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Module Submit Footer */}
        <div style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
          {submitState === 'idle' && (
            <button disabled style={{ background: '#e5e7eb', color: '#9ca3af', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'not-allowed' }}>
              Submit Module
            </button>
          )}

          {submitState === 'ready' && (
            <button 
              id="btn-submit-module"
              onClick={() => setSubmitState('confirming')} 
              style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Submit Module
            </button>
          )}

          {submitState === 'confirming' && (
            <div style={{ position: 'absolute', bottom: '0', right: '0', background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
              <p style={{ margin: '0 0 1.5rem 0', fontWeight: 700, color: '#111827' }}>Are you ready to submit this module?</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={() => setSubmitState('ready')} style={{ background: 'transparent', border: 'none', color: '#6b7280', fontWeight: 600, cursor: 'pointer' }}>Go Back</button>
                <button onClick={handleSubmitModule} style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>Yes, Submit</button>
              </div>
            </div>
          )}

          {submitState === 'submitting' && (
            <button disabled style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'wait' }}>
              Submitting...
            </button>
          )}

          {submitState === 'completed' && (
            <button disabled style={{ background: '#f3f4f6', color: '#10b981', border: '1px solid #10b981', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800, fontSize: '1rem', cursor: 'default', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Completed
            </button>
          )}
        </div>
      </div>

      {/* Full Screen Modal Overlay */}
      {modalState !== 'closed' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: '2rem' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '550px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', position: 'relative', maxHeight: '100%', overflowY: 'auto' }}>
            
            {/* Loading State */}
            {modalState === 'loading' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', border: '4px solid #f3f4f6', borderTopColor: '#4fd1c5', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }}></div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Generating secure connection...</h3>
                <p style={{ color: '#1f2937', margin: 0, fontSize: '0.95rem' }}>Preparing {activeNetData?.name} onboarding guide.</p>
              </div>
            )}

            {/* Need Account Modal */}
            {modalState === 'need-account' && activeNetData && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button onClick={() => setModalState('closed')} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: activeNetData.bgColor, color: activeNetData.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {activeNetData.icon}
                </div>

                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.75rem 0', color: '#111827' }}>No {activeNetData.name.split(' ')[0]} Account?</h3>
                <p style={{ color: '#1f2937', margin: '0 0 2rem 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  A strong presence on {activeNetData.name} is critical for maximizing your AI Content Pipeline. How would you like to proceed?
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                  
                  {/* Option 1: Request Build */}
                  <div style={{ border: '2px solid #4fd1c5', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#f0fdfa', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-10px', right: '15px', background: '#0d9488', color: '#fff', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', boxShadow: '0 2px 4px rgba(13, 148, 136, 0.3)' }}>Recommended</div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Have ClickMe Build It</h4>
                    <p style={{ color: '#374151', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                      Our experts will create, optimize, and brand your {activeNetData.name} page from scratch so it ranks perfectly.
                    </p>
                    <button onClick={() => requestBuild(activeNetData.id)} style={{ background: '#0d9488', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#0f766e'} onMouseLeave={e => e.currentTarget.style.background = '#0d9488'}>
                      Request Profile Creation
                    </button>
                  </div>

                  {/* Option 2: Do it Yourself */}
                  <div style={{ border: '1px solid #d1d5db', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#ffffff' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Create It Myself</h4>
                    <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                      I will set up my own {activeNetData.name} page. Give me the link to get started right now.
                    </p>
                    <a href={activeNetData.createLink} target="_blank" rel="noopener noreferrer" onClick={() => setModalState('closed')} style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', width: '100%', boxSizing: 'border-box', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'} onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
                      Open {activeNetData.name.split(' ')[0]} Setup ↗
                    </a>
                  </div>

                </div>
              </div>
            )}

            {/* Step-by-Step Instructions State */}
            {modalState === 'instructions' && activeNetData && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button 
                  onClick={() => setModalState('closed')}
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: activeNetData.bgColor, color: activeNetData.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {activeNetData.icon}
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.75rem 0', color: '#111827' }}>Connect {activeNetData.name}</h3>
                <p style={{ color: '#111827', margin: '0 0 2rem 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  To allow our secure Content Pipeline to publish your approved content, please grant <strong>Editor / Publisher Access</strong> to our verified agency portal by following the steps below.
                </p>

                {/* Animated Visual Walkthrough */}
                <WireframeWalkthrough network={activeNetData.id} />

                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                  
                  {/* Step 1 */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>1</span>
                      Copy Agency Email
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', border: '1px solid #d1d5db', padding: '0.8rem 1rem', borderRadius: '8px' }}>
                      <span style={{ fontWeight: 700, color: '#111827', fontFamily: 'monospace', fontSize: '1rem' }}>launch@clickme.life</span>
                      <button onClick={handleCopyEmail} style={{ background: 'transparent', border: 'none', color: copied ? '#059669' : '#0d9488', fontWeight: 800, cursor: 'pointer', fontSize: '0.85rem', transition: 'color 0.2s' }}>
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>2</span>
                      Assign Access
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      {activeNetData.instructions.map((inst, idx) => (
                        <li key={idx} style={{ marginBottom: '0.25rem', color: '#111827' }}>{inst}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0d9488', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>3</span>
                      Navigate to Settings
                    </div>
                    <a href={activeNetData.settingsLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
                      Open {activeNetData.name} Settings <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>

                </div>

                <button 
                  onClick={handleConfirmInvite}
                  style={{ width: '100%', background: '#111827', color: '#ffffff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0,0,0,0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'; }}
                >
                  I have sent the invitation
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        @keyframes cursor-move {
          0% { transform: translate(15px, 35px); }
          15% { transform: translate(60px, 90px); }
          25% { transform: translate(60px, 90px); }
          40% { transform: translate(250px, 60px); }
          50% { transform: translate(250px, 60px); }
          65% { transform: translate(150px, 110px); }
          85% { transform: translate(200px, 140px); }
          100% { transform: translate(15px, 35px); }
        }

        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 0; }
          24% { transform: scale(0.5); opacity: 0; }
          25% { transform: scale(0.5); opacity: 1; }
          30% { transform: scale(1.5); opacity: 0; }
          49% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(0.5); opacity: 1; }
          55% { transform: scale(1.5); opacity: 0; }
          64% { transform: scale(0.5); opacity: 0; }
          65% { transform: scale(0.5); opacity: 1; }
          70% { transform: scale(1.5); opacity: 0; }
          84% { transform: scale(0.5); opacity: 0; }
          85% { transform: scale(0.5); opacity: 1; }
          90% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(0.5); opacity: 0; }
        }

        @keyframes modal-appear {
          0% { opacity: 0; }
          50% { opacity: 0; }
          52% { opacity: 1; }
          100% { opacity: 1; }
        }

        @keyframes typing {
          0% { width: 0%; }
          65% { width: 0%; }
          75% { width: 60%; }
          100% { width: 60%; }
        }

        .anim-cursor { animation: cursor-move 8s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .anim-ripple { animation: ripple 8s infinite linear; }
        .anim-modal { animation: modal-appear 8s infinite linear; }
        .anim-typing { animation: typing 8s infinite linear; }
      `}} />
    </div>
  );
}

export default function SocialIntegrations() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Socials...</div>}>
      <SocialIntegrationsContent />
    </Suspense>
  );
}

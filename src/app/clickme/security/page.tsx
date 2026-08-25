"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecuritySetup() {
  const router = useRouter();
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Submit state machine: 'idle' -> 'ready' -> 'confirming' -> 'submitting' -> 'completed'
  const [submitState, setSubmitState] = useState<'idle' | 'ready' | 'confirming' | 'submitting' | 'completed'>('idle');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.onboarding?.passwordChanged === 'Submitted' || data?.onboarding?.passwordChanged === true) {
          setSubmitState('completed');
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (submitState === 'completed' || submitState === 'confirming' || submitState === 'submitting') return;
    
    if (pass1.length >= 8 && pass1 === pass2) {
      setSubmitState('ready');
    } else {
      setSubmitState('idle');
    }
  }, [pass1, pass2, submitState]);

  const handleSubmitModule = async () => {
    setSubmitState('submitting');
    
    try {
      await fetch('/api/onboarding/submit-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleName: 'Account Security (Password Change)',
          payload: { passwordChanged: 'Submitted' }
        })
      });

      // Also update the local mock user DB so login works (for prototype)
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updatePassword', newPassword: pass1 })
      }).catch(err => console.log('Mock user update failed', err));

      setSubmitState('completed');
      
      // Auto-redirect back to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push('/clickme');
      }, 1500);
      
    } catch (err) {
      console.error(err);
      setSubmitState('ready');
    }
  };

  if (loading) {
    return (
      <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading Security Module...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ padding: '3rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Account Security</h1>
          <p style={{ color: '#1f2937', margin: 0, fontWeight: 500 }}>Please update your temporary password to secure your account.</p>
        </header>

        <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>New Password</label>
            <input 
              type="password" 
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              disabled={submitState === 'completed'}
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Confirm New Password</label>
            <input 
              type="password" 
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              disabled={submitState === 'completed'}
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }}
              placeholder="Re-enter your new password"
            />
            {pass1 && pass2 && pass1 !== pass2 && (
              <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '0.5rem 0 0 0', fontWeight: 600 }}>Passwords do not match.</p>
            )}
          </div>

          {/* Module Submit Footer */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            
            {submitState === 'idle' && (
              <button disabled style={{ background: '#e5e7eb', color: '#9ca3af', border: 'none', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'not-allowed' }}>
                Submit Module
              </button>
            )}

            {submitState === 'ready' && (
              <button 
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
      </div>
    </div>
  );
}

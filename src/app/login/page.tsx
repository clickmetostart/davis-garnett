"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to login');
        setLoading(false);
        return;
      }

      // Success! Redirect to the dashboard
      router.push('/clickme');
      router.refresh(); // Force refresh to ensure middleware picks up the new cookie
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f3f4f6', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Left side: Branding / Image */}
      <div style={{ flex: 1, backgroundColor: '#111827', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle at top right, #319795 0%, transparent 40%), radial-gradient(circle at bottom left, #4fd1c5 0%, transparent 40%)', opacity: 0.2 }}></div>
        
        <div style={{ zIndex: 10, maxWidth: '500px' }}>
          <h1 style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 900, margin: '0 0 1.5rem 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Welcome to the <br/>
            <span style={{ color: '#4fd1c5' }}>Command Center.</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.25rem', lineHeight: 1.6, margin: 0 }}>
            Sign in to access your AI-powered marketing machine, manage your reputation, and command your business growth.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div style={{ width: '500px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', boxShadow: '-20px 0 25px -5px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '3rem' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img src="/clickme-life-logo-medium.png" alt="ClickMe.life" style={{ height: '40px', width: 'auto', display: 'block' }} />
          </Link>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Sign In</h2>
        <p style={{ color: '#6b7280', margin: '0 0 2.5rem 0', fontSize: '0.95rem' }}>Enter your credentials to securely access your dashboard.</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
            <input 
              required 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', background: '#f9fafb', color: '#111827' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Password</label>
              <a href="#" style={{ fontSize: '0.8rem', color: '#4fd1c5', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
            </div>
            <input 
              required 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '1rem', background: '#f9fafb', color: '#111827' }} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{ 
              marginTop: '1rem', width: '100%', background: '#111827', color: '#ffffff', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.05rem', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', opacity: loading ? 0.7 : 1 
            }}
            onMouseEnter={(e) => { if(!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0,0,0,0.2)'; } }}
            onMouseLeave={(e) => { if(!loading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'; } }}
          >
            {loading ? 'Authenticating...' : 'Sign In securely'}
          </button>
        </form>
        
        <div style={{ marginTop: 'auto', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0 }}>© 2026 ClickMe.life. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

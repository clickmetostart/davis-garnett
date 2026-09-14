"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DavisGarnettLogo from '@/components/DavisGarnettLogo';

// Static imports to bypass dev server cache
import markHeadshot from '../../../public/davis-garnett-headshots/mark-davis-headshot-4.jpg';
import rachaelHeadshot from '../../../public/davis-garnett-headshots/rachael-garnett-3.jpg';
import alignRightLogo from '../../../public/align-right-realty-logo.webp';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
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

      // Success! Redirect to the project proposal (root)
      router.push('/');
      router.refresh();
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-black text-white selection:bg-[#D4AF37] selection:text-black overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Deep Gold & Black Gradient Background */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
        {/* Diagonal Gold to Black */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 via-[#8B6914]/10 to-transparent"></div>
        {/* Strong radial gold highlights */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/40 via-[#D4AF37]/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/30 via-transparent to-transparent blur-3xl"></div>
        {/* Texture overlay for that "leathery/matte" subtle noise feel */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col md:flex-row w-full">

        {/* Left side: Branding */}
        <div className="flex-1 relative flex flex-col justify-center p-8 md:p-16 lg:p-24 border-b md:border-b-0 md:border-r border-[#D4AF37]/10 bg-black/20 backdrop-blur-md">

          <div className="relative z-10 max-w-2xl flex flex-col items-start">
            <div className="inline-flex items-center gap-3 mb-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-md px-4 py-2 rounded-full shadow-[inset_0_1px_0_rgba(212,175,55,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4AF37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Secured Access</span>
            </div>

            {/* Logo Integration */}
            <div className="mb-10 w-full max-w-[450px]">
              <DavisGarnettLogo variant="dark" />
            </div>

            <div className="w-20 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent mb-8"></div>

            <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-white drop-shadow-md" style={{ fontFamily: "'AIVeritas', serif" }}>
              Command the Market.
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light max-w-xl">
              Welcome to the private development workspace for Davis & Garnett. Authenticate to preview your live digital platforms, manage your custom command dashboard, and securely download your complete suite of branding assets.
            </p>
          </div>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full md:w-[480px] lg:w-[540px] bg-black/40 backdrop-blur-xl flex flex-col justify-center p-8 md:p-12 lg:p-16 relative shadow-[-20px_0_50px_rgba(0,0,0,0.5)] md:border-l border-white/5">

          <div className="mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-3 text-white">Sign In</h2>
            <p className="text-white/50 text-sm font-light">Please authenticate to access the development workspace.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-8 text-sm font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm font-medium flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <strong className="block text-white mb-1">System Update in Progress</strong>
                Please do not log in at this time. We are currently loading large content and tools into the workspace.
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-white/60 mb-2">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-light"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-white/60 mb-2">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-light"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-6 w-full bg-gradient-to-r from-[#D4AF37] to-[#8B6914] text-black border-none py-3.5 px-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02]'}`}
            >
              {loading ? 'Authenticating...' : 'Access Workspace'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAccessModal(true)}
              className="text-white/50 text-xs tracking-widest uppercase hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1"
            >
              Request Access
            </button>
          </div>

        </div>
      </div>

      {/* Footer Area */}
      <div className="w-full bg-black border-t border-white/10 pt-12 pb-8 z-20 relative mt-auto">

        {/* Tier 1: Agents & Brand (3 Columns) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-white/60 text-xs font-light leading-relaxed mb-12 px-6">

          {/* Column 1: Davis & Garnett Logo & Info */}
          <div className="text-left">
            <p className="leading-loose text-white/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dg-footer-logo-wrap.jpg" alt="Davis & Garnett" className="float-left w-16 h-16 mr-5 mb-1 rounded-sm object-cover border border-[#D4AF37]/20 shadow-md" />
              Mark Davis and Rachael Garnett are Real Estate Advisors & Agents at Align Right Realty, based in Tampa Bay and serving clients across the Gulf Coast. With decades of combined expertise, they specialize in providing elite, transparent real estate solutions, including luxury residential acquisitions and high-yield commercial investments.
            </p>
            <a href="mailto:list@davisgarnettsells.com" className="text-[#D4AF37] hover:text-white transition-colors font-bold tracking-widest uppercase text-[10px] mt-4 block">
              list@davisgarnettsells.com
            </a>
          </div>

          {/* Column 2: Mark Davis */}
          <div className="flex flex-row items-center justify-center md:justify-start text-left gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markHeadshot.src} alt="Mark Davis" className="w-20 h-20 rounded-full object-cover object-top border border-[#D4AF37]/30 shadow-lg shadow-black/50 shrink-0" />
            <div className="flex flex-col gap-1">
              <div>
                <strong className="text-[#D4AF37] text-base block font-serif">Mark Davis</strong>
                <span>Commercial & Residential Advisor</span><br />
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1 block">Agent License #3209459</span>
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                <a href="mailto:mark@davisgarnettsells.com" className="text-[#D4AF37] hover:text-white transition-colors">
                  mark@davisgarnettsells.com
                </a>
                <a href="tel:941-737-4127" className="text-[#D4AF37] hover:text-white transition-colors">
                  941-737-4127
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Rachael Garnett */}
          <div className="flex flex-row items-center justify-center md:justify-start text-left gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={rachaelHeadshot.src} alt="Rachael Garnett" className="w-20 h-20 rounded-full object-cover object-[center_30%] border border-[#D4AF37]/30 shadow-lg shadow-black/50 shrink-0" />
            <div className="flex flex-col gap-1">
              <div>
                <strong className="text-[#D4AF37] text-base block font-serif">Rachael Garnett</strong>
                <span>Commercial & Residential Advisor</span><br />
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1 block">Agent License #3378601</span>
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                <a href="mailto:rachael@davisgarnettsells.com" className="text-[#D4AF37] hover:text-white transition-colors">
                  rachael@davisgarnettsells.com
                </a>
                <a href="tel:727-808-3344" className="text-[#D4AF37] hover:text-white transition-colors">
                  727-808-3344
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Tier 2: Compliance Bottom Horizontal (3-Column like MadCity) */}
        <div className="max-w-7xl mx-auto border-t border-[#ef5728]/40 pt-8 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#888] text-[11px] leading-snug items-end">

          {/* Compliance Col 1 */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dg-equal-realtor-gold.png" alt="Realtor and Equal Housing Opportunity" className="h-8 w-auto object-contain mx-auto md:mx-0 mb-3" />
              <p>
                © {new Date().getFullYear()} Davis & Garnett. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Compliance Col 2 */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <p>
              MLS IDX information is for personal, non-commercial use only; data is deemed reliable but not guaranteed. No mobile information, including SMS opt-in data and consent, WILL NOT be shared with third parties or affiliates for marketing purposes.
            </p>
          </div>

          {/* Compliance Col 3 */}
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <a href="https://alignrightcarrollwood.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={alignRightLogo.src} alt="Align Right Realty" className="h-14 w-auto object-contain mb-1" />
            </a>
            <p>
              <strong className="text-[#ef5728] text-sm font-semibold block mb-0.5">Align Right Realty Carrollwood</strong>
              Broker Number BK3401606<br />
              3903 Northdale Blvd Suite 115W, TAMPA, FL 33624<br />
              (813) 374-6050 &nbsp;|&nbsp; officeadmin@alignrightcarrollwood.com
            </p>
          </div>

        </div>
      </div>

      {/* Access Denied Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.1)] relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowAccessModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'AIVeritas', serif" }}>Request Access</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Please email <a href="mailto:clickme.tostart@gmail.com" className="text-[#D4AF37] hover:underline font-medium">clickme.tostart@gmail.com</a> to request your workspace access.
              </p>
              <button
                onClick={() => setShowAccessModal(false)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

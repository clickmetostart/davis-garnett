"use client";

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

function AnalyticsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough } = useWalkthrough();

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('analyticsAcknowledged', [
        {
          targetId: 'funnel-container',
          title: 'The Bottom-Line Funnel',
          content: 'ClickMe automatically integrates with your CRM and LOS to show you exactly how many website visitors turn into closed revenue.',
          position: 'right',
          actionRequired: false
        },
        {
          targetId: 'reporting-settings',
          title: 'Automated Reports',
          content: 'We email you a beautiful PDF summarizing your growth data on the 1st of every month. No setup required!',
          position: 'top',
          actionRequired: false
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);
  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: '3rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Business Intelligence</h1>
            <p style={{ color: '#4b5563', margin: 0 }}>The Bottom-Line Funnel: See exactly how your web traffic converts into closed revenue.</p>
          </div>
          <div>
            <button 
              style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PDF Report
            </button>
          </div>
        </header>

        {/* The Funnel UI */}
        <div id="funnel-container" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', padding: '3rem', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 2rem 0', color: '#111827', textAlign: 'center' }}>Last 30 Days Performance</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            
            {/* Step 1: Traffic */}
            <div style={{ width: '100%', maxWidth: '600px', background: '#f3f4f6', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #9ca3af' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Top of Funnel</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>Website Traffic</div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#111827' }}>4,250</div>
            </div>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" style={{ margin: '-0.5rem 0' }}><polyline points="6 9 12 15 18 9"></polyline></svg>

            {/* Step 2: Leads */}
            <div style={{ width: '100%', maxWidth: '500px', background: '#eff6ff', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Middle of Funnel</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a' }}>Captured Leads (CRM)</div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1e3a8a' }}>127</div>
            </div>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" style={{ margin: '-0.5rem 0' }}><polyline points="6 9 12 15 18 9"></polyline></svg>

            {/* Step 3: Sales */}
            <div style={{ width: '100%', maxWidth: '400px', background: '#e6fffa', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #4fd1c5', boxShadow: '0 4px 10px rgba(79, 209, 197, 0.2)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#319795', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Bottom Line</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#234e52' }}>Closed Loans</div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#234e52' }}>14</div>
            </div>

          </div>
        </div>

        {/* Automated Reporting Settings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div id="reporting-settings" style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Automated Reporting</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>ClickMe automatically bundles your growth data into a beautiful PDF emailed to you.</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: 700 }}>Monthly Exec Summary</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Sent on the 1st of every month</div>
              </div>
              <div style={{ background: '#4fd1c5', width: '40px', height: '24px', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}></div>
              </div>
            </div>
          </div>
          
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Data Sources</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Integrations powering your bottom-line funnel.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ClickMe Local Analytics</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Network CRM API</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Encompass Loan Origination System</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Analytics...</div>}>
      <AnalyticsContent />
    </Suspense>
  );
}

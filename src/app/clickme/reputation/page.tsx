"use client";

import React, { useState } from 'react';

export default function ReputationEngine() {
  const [reviews] = useState([
    { id: 1, author: 'Jennifer S.', rating: 5, source: 'Google', text: 'Rob and his team were absolutely incredible. We were first time home buyers in Dane County and he made the WHEDA process seamless!', date: '2 days ago', responded: false },
    { id: 2, author: 'Mark T.', rating: 5, source: 'Yelp', text: 'Best mortgage rates in Madison. Highly recommend ClickMe Template.', date: '1 week ago', responded: true },
    { id: 3, author: 'Alicia B.', rating: 4, source: 'Google', text: 'Great service, but the closing took a little longer than expected due to title issues. Rob was communicative though.', date: '2 weeks ago', responded: false },
  ]);

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: '3rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Reputation Engine</h1>
            <p style={{ color: '#4b5563', margin: 0 }}>Sync your local reviews and deploy AI-generated responses instantly.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #d1d5db', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <span style={{ fontWeight: 600, color: '#4b5563' }}>Google: <span style={{ color: '#059669' }}>Synced</span></span>
            </div>
            <div style={{ background: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #d1d5db', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <span style={{ fontWeight: 600, color: '#4b5563' }}>Yelp: <span style={{ color: '#059669' }}>Synced</span></span>
            </div>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reviews.map((rev) => (
            <div key={rev.id} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4b5563', fontSize: '1.2rem' }}>
                    {rev.author[0]}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{rev.author}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rev.rating ? "#fbbf24" : "#e5e7eb"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>• {rev.date} • via {rev.source}</span>
                    </div>
                  </div>
                </div>
                {rev.responded ? (
                  <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: '#e6fffa', color: '#319795', border: '1px solid #4fd1c5' }}>Responded</span>
                ) : (
                  <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5' }}>Action Required</span>
                )}
              </div>

              <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6, fontSize: '0.95rem' }}>"{rev.text}"</p>

              {!rev.responded && (
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button style={{ background: '#ffffff', color: '#111827', border: '1px solid #d1d5db', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'} onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}>
                    Write Manually
                  </button>
                  <button 
                    style={{ background: '#4fd1c5', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgba(79, 209, 197, 0.3)', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 10px -2px rgba(79, 209, 197, 0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(79, 209, 197, 0.3)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg>
                    Generate AI Response
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

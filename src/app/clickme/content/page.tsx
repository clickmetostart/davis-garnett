"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalkthrough } from '@/components/clickme/WalkthroughProvider';

function ContentPipelineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startWalkthrough, nextStep, isActive } = useWalkthrough();
  const [posts, setPosts] = useState([
    { id: 1, title: 'Navigating Commercial Zoning in Tampa Bay', description: 'A complete breakdown of commercial zoning changes for investors moving into the St. Pete and Clearwater areas.', date: '2026-08-16', status: 'Scheduled', platform: 'LinkedIn & Facebook' },
    { id: 2, title: 'Waterfront Luxury: What FL Buyers Miss', description: 'Explaining flood insurance and hurricane impact windows for families buying near the coast.', date: '2026-08-18', status: 'Drafting (AI)', platform: 'Blog & GBP' },
    { id: 3, title: 'Tampa Market Update: Fall 2026', description: 'Analyzing current cap rates and why waiting until spring might cost you in the current Pinellas County inventory squeeze.', date: '2026-08-20', status: 'Queue', platform: 'All Channels' },
  ]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setPosts(prev => [
        {
          id: Date.now(),
          title: 'Is a Commercial DSCR Loan Right for Your Sarasota Investment?',
          description: 'A deep dive into cash flow requirements vs traditional lending for multi-family properties in Sarasota.',
          date: '2026-08-23',
          status: 'Review Required',
          platform: 'Blog & LinkedIn'
        },
        ...prev
      ]);
      setGenerating(false);
      if (isActive) nextStep();
    }, 1500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (searchParams.get('walkthrough') === 'true') {
      startWalkthrough('aiContentTraining', [
        {
          targetId: 'content-engine-header',
          title: 'Your Autonomous AI',
          content: 'This is the Content Pipeline. Our AI has already been trained on your local Tampa Bay market and Mark & Rachael\'s tone of voice.',
          position: 'bottom',
          actionRequired: false
        },
        {
          targetId: 'btn-generate-ai',
          title: 'Watch it Work',
          content: 'Click this button to see the AI analyze your local SEO strategy and generate a perfectly optimized blog and social post.',
          position: 'left',
          actionRequired: true
        }
      ], () => {
        router.push('/clickme');
      });
    }
  }, [searchParams]);

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif" }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '3rem 4rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>Content Pipeline</h1>
            <p style={{ color: '#4b5563', margin: 0 }}>Manage your auto-generated localized content for Tampa Bay, FL.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: '#ffffff', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', display: 'inline-flex', gap: '1rem', border: '1px solid #d1d5db', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <span style={{ fontWeight: 600, color: '#4b5563' }}>API Status: <span style={{ color: '#059669' }}>Connected</span></span>
            </div>
          </div>
        </header>

        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <div id="content-engine-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: '#111827' }}>AI Generation Engine</h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>Trained on 138 posts. Voice matched to: Mark Davis & Rachael Garnett.</p>
            </div>
            <button 
              id="btn-generate-ai"
              onClick={handleGenerate}
              disabled={generating}
              style={{
                background: generating ? '#f3f4f6' : '#4fd1c5',
                color: generating ? '#9ca3af' : '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: generating ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: generating ? 'none' : '0 4px 6px -1px rgba(79, 209, 197, 0.4)'
              }}
              onMouseEnter={(e) => { if (!generating) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(79, 209, 197, 0.5)'; } }}
              onMouseLeave={(e) => { if (!generating) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(79, 209, 197, 0.4)'; } }}
            >
              {generating ? '🧠 Analyzing Sitemap...' : '✨ Generate AI Post'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 700 }}>Upcoming Queue</h3>
          {posts.map(post => (
            <div key={post.id} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; }}>
              <div style={{ flex: 1, paddingRight: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: 0 }}>{post.title}</h4>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '20px', 
                    fontWeight: 700,
                    background: post.status === 'Scheduled' ? '#e6fffa' : post.status === 'Review Required' ? '#fef2f2' : '#fffbeb',
                    color: post.status === 'Scheduled' ? '#319795' : post.status === 'Review Required' ? '#ef4444' : '#f59e0b',
                    border: `1px solid ${post.status === 'Scheduled' ? '#4fd1c5' : post.status === 'Review Required' ? '#fca5a5' : '#fcd34d'}`
                  }}>
                    {post.status}
                  </span>
                </div>
                <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>{post.description}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 500 }}>{post.platform}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContentPipeline() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Content Pipeline...</div>}>
      <ContentPipelineContent />
    </Suspense>
  );
}

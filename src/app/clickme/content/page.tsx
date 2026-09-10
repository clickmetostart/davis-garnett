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
  
  // Pre-Created Post State
  const [isPreCreatedModalOpen, setIsPreCreatedModalOpen] = useState(false);
  const [preCreatedPosts] = useState([
    { id: 101, title: "Buyer's Guide to Tampa", type: 'Guide', platform: 'LinkedIn & Facebook' },
    { id: 102, title: "Q&A: Flood Insurance Secrets", type: 'Q&A', platform: 'Blog' },
    { id: 103, title: "Market Report: Fall 2026", type: 'Report', platform: 'All Channels' },
    { id: 104, title: "Top 5 Schools in Pinellas", type: 'Article', platform: 'Facebook & Instagram' },
  ]);

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
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setIsPreCreatedModalOpen(true)}
                style={{
                  background: '#ffffff',
                  color: '#4b5563',
                  border: '1px solid #d1d5db',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Schedule Pre-Created Post
              </button>
              
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

      {/* Pre-Created Post Modal */}
      {isPreCreatedModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '600px', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
            <button onClick={() => setIsPreCreatedModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: '0 0 0.5rem 0' }}>Schedule Pre-Created Post</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Select an existing guide, Q&A, or article to add to your content queue.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {preCreatedPosts.map(post => (
                <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', marginBottom: '0.2rem' }}>{post.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', gap: '0.8rem' }}>
                      <span style={{ background: '#e5e7eb', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>{post.type}</span>
                      <span>{post.platform}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setPosts(prev => [
                        {
                          id: Date.now(),
                          title: post.title,
                          description: `Pre-created ${post.type.toLowerCase()} selected from library.`,
                          date: new Date().toISOString().split('T')[0],
                          status: 'Scheduled',
                          platform: post.platform
                        },
                        ...prev
                      ]);
                      setIsPreCreatedModalOpen(false);
                    }}
                    style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Schedule
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

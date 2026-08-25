"use client";

import React, { useState, Suspense } from 'react';

function SocialSchedulerContent() {
  const [activeView, setActiveView] = useState<'list' | 'daily' | 'weekly' | 'monthly'>('list');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [posts, setPosts] = useState([
    { id: 1, title: 'Navigating Commercial Zoning in Tampa Bay', platform: 'LinkedIn & Facebook', date: '2026-08-16T10:00:00Z', status: 'Scheduled', type: 'image' },
    { id: 2, title: 'Waterfront Luxury: What FL Buyers Miss', platform: 'Blog & GBP', date: '2026-08-18T14:30:00Z', status: 'Drafting (AI)', type: 'article' },
    { id: 3, title: 'Tampa Market Update: Fall 2026', platform: 'All Channels', date: '2026-08-20T09:15:00Z', status: 'Queue', type: 'video' },
  ]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setPosts(prev => [
        {
          id: Date.now(),
          title: 'Is a Commercial DSCR Loan Right for Your Sarasota Investment?',
          platform: 'Blog & LinkedIn',
          date: new Date().toISOString(),
          status: 'Review Required',
          type: 'article'
        },
        ...prev
      ]);
      setGenerating(false);
      setShowScheduleModal(false);
    }, 1500);
  };

  const ViewButton = ({ id, label, icon }: { id: typeof activeView, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveView(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
        background: activeView === id ? '#eff6ff' : 'transparent',
        color: activeView === id ? '#2563eb' : '#4b5563',
        border: 'none',
        borderRadius: '6px',
        fontWeight: activeView === id ? 700 : 500,
        cursor: 'pointer',
        fontSize: '0.85rem',
        transition: 'all 0.2s'
      }}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb', height: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ padding: '1.5rem 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Social Planner</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>Schedule manually created posts across Facebook, LinkedIn, Google, and your Blog.</p>
        </div>
        <button 
          onClick={() => setShowScheduleModal(true)}
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Create Post
        </button>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: '#f3f4f6', padding: '0.3rem', borderRadius: '8px' }}>
          <ViewButton id="list" label="List" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>} />
          <ViewButton id="daily" label="Daily" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} />
          <ViewButton id="weekly" label="Weekly" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} />
          <ViewButton id="monthly" label="Monthly" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4b5563' }}>August 2026</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.4rem', background: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <button style={{ padding: '0.4rem', background: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        
        {/* --- LIST / VERTICAL TIMELINE VIEW --- */}
        {activeView === 'list' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', fontWeight: 700 }}>Upcoming Queue</h3>
            
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{ position: 'absolute', left: '7px', top: '20px', bottom: '20px', width: '2px', background: '#e5e7eb', zIndex: 1 }}></div>

              {posts.map(post => (
                <div key={post.id} style={{ position: 'relative', marginBottom: '2rem', zIndex: 2 }}>
                  <div style={{ position: 'absolute', left: '-2rem', width: '16px', height: '16px', borderRadius: '50%', background: post.status === 'Scheduled' ? '#2563eb' : post.status === 'Drafting (AI)' ? '#8b5cf6' : '#10b981', border: `3px solid ${post.status === 'Scheduled' ? '#eff6ff' : post.status === 'Drafting (AI)' ? '#f5f3ff' : '#ecfdf5'}`, top: '5px' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4b5563' }}>{new Date(post.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(post.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</div>
                  </div>
                  
                  <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', gap: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                      {post.type === 'image' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>}
                      {post.type === 'video' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>}
                      {post.type === 'article' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{post.title}</h4>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '0.2rem 0.6rem', 
                          borderRadius: '20px', 
                          fontWeight: 700,
                          background: post.status === 'Scheduled' ? '#e0e7ff' : post.status === 'Drafting (AI)' ? '#f3e8ff' : '#dcfce7',
                          color: post.status === 'Scheduled' ? '#4338ca' : post.status === 'Drafting (AI)' ? '#7e22ce' : '#15803d'
                        }}>
                          {post.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.85rem', fontWeight: 600 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        {post.platform}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MONTHLY CALENDAR VIEW --- */}
        {activeView === 'monthly' && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#6b7280', borderRight: '1px solid #e5e7eb' }}>{day}</div>
              ))}
            </div>
            {/* Mocking a 5-week grid */}
            {[0, 1, 2, 3, 4].map(week => (
              <div key={week} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e5e7eb', minHeight: '120px' }}>
                {[0, 1, 2, 3, 4, 5, 6].map(day => {
                  const dayNum = (week * 7) + day - 2; // Offset for August 2026 starting on Sat
                  const isValidDay = dayNum > 0 && dayNum <= 31;
                  
                  // Distribute mock posts randomly in the calendar
                  const hasPost1 = isValidDay && dayNum === 16;
                  const hasPost2 = isValidDay && dayNum === 18;
                  const hasPost3 = isValidDay && dayNum === 20;

                  return (
                    <div key={day} style={{ borderRight: '1px solid #e5e7eb', padding: '0.5rem', background: isValidDay ? '#fff' : '#f9fafb' }}>
                      {isValidDay && <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4b5563' }}>{dayNum}</span>}
                      
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {hasPost1 && <div style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.7rem', fontWeight: 600, padding: '0.3rem', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Zoning Update</div>}
                        {hasPost2 && <div style={{ background: '#f3e8ff', color: '#7e22ce', fontSize: '0.7rem', fontWeight: 600, padding: '0.3rem', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Waterfront Luxury</div>}
                        {hasPost3 && <div style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.7rem', fontWeight: 600, padding: '0.3rem', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Market Report</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* --- WEEKLY/DAILY VIEW (Placeholder/Simple Mockup) --- */}
        {(activeView === 'weekly' || activeView === 'daily') && (
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '4rem', textAlign: 'center', color: '#6b7280' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 1rem auto' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#111827' }}>{activeView === 'weekly' ? 'Weekly' : 'Daily'} View Active</h3>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Events are organized into time slots vertically.</p>
          </div>
        )}

      </div>

      {/* CREATE POST MODAL */}
      {showScheduleModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '800px', borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>Create Post</h2>
              <button onClick={() => setShowScheduleModal(false)} style={{ background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div style={{ display: 'flex', height: '500px' }}>
              {/* Left Column - Composer */}
              <div style={{ flex: 1, borderRight: '1px solid #e5e7eb', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Select Platforms</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ border: '2px solid #2563eb', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', flex: 1, textAlign: 'center', color: '#2563eb', fontWeight: 700, background: '#eff6ff' }}>Facebook</div>
                    <div style={{ border: '1px solid #d1d5db', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', flex: 1, textAlign: 'center', color: '#4b5563', fontWeight: 600 }}>LinkedIn</div>
                    <div style={{ border: '1px solid #d1d5db', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', flex: 1, textAlign: 'center', color: '#4b5563', fontWeight: 600 }}>Blog</div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4b5563' }}>Caption</label>
                    <button 
                      onClick={handleGenerate}
                      disabled={generating}
                      style={{ background: 'linear-gradient(to right, #a855f7, #6366f1)', color: '#fff', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: generating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      {generating ? 'Generating...' : '✨ Write with AI'}
                    </button>
                  </div>
                  <textarea 
                    placeholder="What do you want to share with your audience?"
                    style={{ width: '100%', height: '120px', padding: '1rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'none' }}
                  ></textarea>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Media</label>
                  <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: '#6b7280', cursor: 'pointer' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ margin: '0 auto 0.5rem auto' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Click to upload photos or videos</div>
                  </div>
                </div>

              </div>

              {/* Right Column - Preview & Scheduling */}
              <div style={{ width: '300px', background: '#f9fafb', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Post Preview</label>
                  <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#d1d5db' }}></div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>Mark Davis</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Just now • Facebook</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '0.8rem' }}>
                      Excited to announce our latest commercial listing in downtown Tampa...
                    </div>
                    <div style={{ height: '120px', background: '#e5e7eb', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Schedule</label>
                  <input type="datetime-local" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'inherit' }} defaultValue="2026-08-26T10:00" />
                </div>

              </div>
            </div>

            <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '1rem', background: '#f9fafb' }}>
              <button onClick={() => setShowScheduleModal(false)} style={{ background: 'transparent', border: '1px solid #d1d5db', color: '#4b5563', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => { alert('Post Scheduled!'); setShowScheduleModal(false); }} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '6px', fontWeight: 700 }}>
                Schedule Post
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}

export default function SocialScheduler() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Loading Social Planner...</div>}>
      <SocialSchedulerContent />
    </Suspense>
  );
}

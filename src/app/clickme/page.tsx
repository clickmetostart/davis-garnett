"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardHub() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    
    Promise.all([
      fetch('/api/auth/me').then(res => res.json()),
      fetch('/api/settings').then(res => res.json())
    ]).then(([userData, settingsData]) => {
      if (userData?.user) setUser(userData.user);
      if (settingsData?.onboarding) setOnboardingData(settingsData.onboarding);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load dashboard data', err);
      setLoading(false);
    });

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading Command Center...</p>
      </div>
    );
  }

  const steps = [
    { 
      id: 'profileSetup', 
      title: 'Profile Setup', 
      description: 'Configure your basic agent profile, headshot, and bio.', 
      isCompleted: onboardingData?.profileSetup === true, 
      actionLabel: 'Setup Profile',
      route: '/clickme/settings',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
    },
    { 
      id: 'communicationsSetup', 
      title: 'Communications Hub', 
      description: 'Configure your email signature and connect your Gmail account.', 
      isCompleted: onboardingData?.communicationsSetup === true, 
      actionLabel: 'Setup Communications',
      route: '/clickme/communications',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    },
    { 
      id: 'officeLocationEntered', 
      title: 'Office Location & SEO', 
      description: 'Enter your physical office address to optimize for local SEO searches.', 
      isCompleted: onboardingData?.officeLocationEntered === true, 
      actionLabel: 'Enter Location',
      route: '/clickme/locations',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    },
    { 
      id: 'teamSetupWalkthrough', 
      title: 'Team Configuration', 
      description: 'Learn how to invite team members and set their permissions.', 
      isCompleted: onboardingData?.teamSetupWalkthrough === true, 
      actionLabel: 'Start Walkthrough',
      route: '/clickme/team',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    },
    { 
      id: 'analyticsAcknowledged', 
      title: 'Analytics Dashboard', 
      description: 'Review your Google Analytics connection (already set up by our team).', 
      isCompleted: onboardingData?.analyticsAcknowledged === true, 
      actionLabel: 'Review Analytics',
      route: '/clickme/analytics',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
    },
    { 
      id: 'socialTraining', 
      title: 'Social Media Connection', 
      description: 'Learn how to connect your Meta, LinkedIn, and Google accounts.', 
      isCompleted: onboardingData?.socialTraining === true, 
      actionLabel: 'Social Training',
      route: '/clickme/social',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    },
    { 
      id: 'aiContentTraining', 
      title: 'AI Content Training', 
      description: 'Train the AI Content Pipeline on your brand voice and writing style.', 
      isCompleted: onboardingData?.aiContentTraining === true, 
      actionLabel: 'Configure AI',
      route: '/clickme/content',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    },
    { 
      id: 'dummyClientEntered', 
      title: 'CRM Setup & Mock Lead', 
      description: 'Enter your first dummy lead to learn how the CRM and marketing lists work.', 
      isCompleted: onboardingData?.dummyClientEntered === true, 
      actionLabel: 'Inject Lead',
      route: '/clickme/crm',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    },
  ];

  const completedCount = steps.filter(s => s.isCompleted).length;
  const progressPercentage = Math.round((completedCount / steps.length) * 100);
  const requiresOnboarding = progressPercentage < 100;

  const handleActionClick = (route: string) => {
    router.push(`${route}?walkthrough=true`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif", padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Subtle Client Accent Gradient */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(79, 209, 197, 0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }}></div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Hub Header */}
        <header style={{ marginBottom: requiresOnboarding ? '2rem' : '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#111827' }}>
            {requiresOnboarding ? `Welcome, ${user?.firstName || 'to ClickMe'}` : 'Command Center'}
          </h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
            {requiresOnboarding ? "Let's build your perfect 100% automated marketing machine." : (user?.companyName || 'ClickMe Template')}
          </p>
        </header>

        {/* --- ONBOARDING FUNNEL (Top Priority if Client is Incomplete) --- */}
        {requiresOnboarding && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2.5rem', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>System Initialization</h2>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Please complete your onboarding walkthroughs to fully configure the dashboard.</p>
                </div>
              </div>

              {/* Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((step) => (
                  <div 
                    key={step.id} 
                    style={{ 
                      background: step.isCompleted ? '#f8fafc' : '#ffffff', 
                      border: `1px solid ${step.isCompleted ? '#a7f3d0' : '#e5e7eb'}`, 
                      borderRadius: '12px', 
                      padding: '1.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1.5rem', 
                      transition: 'all 0.3s',
                      boxShadow: step.isCompleted ? 'none' : '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                      background: step.isCompleted ? '#10b981' : '#f3f4f6',
                      color: step.isCompleted ? '#ffffff' : '#9ca3af',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {step.isCompleted ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : (
                        step.icon
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#111827', textDecoration: step.isCompleted ? 'line-through' : 'none', opacity: step.isCompleted ? 0.6 : 1 }}>{step.title}</h3>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.5, opacity: step.isCompleted ? 0.6 : 1 }}>{step.description}</p>
                    </div>

                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                      {step.isCompleted ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 800, fontSize: '0.85rem', padding: '0.6rem 1.2rem', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                            Completed Tour
                          </div>
                          <button 
                            onClick={() => handleActionClick(step.route)}
                            style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                          >
                            Replay Tour
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleActionClick(step.route)}
                          style={{ 
                            background: '#111827', color: '#ffffff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 8px -2px rgba(0, 0, 0, 0.2)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                          Start Tour
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px' }}>Standard Tools</h2>
              <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, #e5e7eb 0%, transparent 100%)' }}></div>
            </div>
          </div>
        )}

        {/* --- CORE TOOLS (Phase 1) --- */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#111827', textTransform: 'uppercase', letterSpacing: '2px' }}>Phase 1: Active Systems</h2>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, #e5e7eb 0%, transparent 100%)' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <Link href="/clickme/content" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', transition: 'all 0.3s ease', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#4fd1c5'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#e6fffa', color: '#319795', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>AI Content Engine</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>Generate highly localized, compliant social posts trained on your exact voice and historical data.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4fd1c5', fontSize: '0.9rem', fontWeight: 700 }}>
                  Enter Pipeline <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>

            <Link href="/clickme/crm" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', transition: 'all 0.3s ease', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = '#4fd1c5'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#e6fffa', color: '#319795', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Network CRM</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>Manage live leads from your web forms, update statuses, segment marketing lists, and import CSVs.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4fd1c5', fontSize: '0.9rem', fontWeight: 700 }}>
                  Open CRM <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>

            <div style={{ background: '#f3f4f6', borderRadius: '16px', border: '1px dashed #d1d5db', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', opacity: 0.8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#e5e7eb', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                </div>
                <span style={{ background: '#e5e7eb', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, color: '#6b7280' }}>COMING SOON</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#4b5563', marginBottom: '0.5rem' }}>Sitemap Analyzer</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>Scan your domain for Answer Engine Optimization (AEO) gaps and auto-queue missing content.</p>
            </div>
          </div>
        </div>

        {/* --- SYSTEM SETTINGS (Bottom) --- */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#111827', textTransform: 'uppercase', letterSpacing: '2px' }}>System Setup & Analytics</h2>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, #e5e7eb 0%, transparent 100%)' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Reused Cards for Settings/Analytics... */}
            <Link href="/clickme/analytics" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4fd1c5'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>BI Analytics</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>Track your growth, traffic, and lead conversions.</p>
              </div>
            </Link>
            <Link href="/clickme/locations" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4fd1c5'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Locations</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>Manage physical offices and directories.</p>
              </div>
            </Link>
            <Link href="/clickme/social" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4fd1c5'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Social Integrations</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6', flex: 1 }}>Connect your social media accounts.</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

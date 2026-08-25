"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [onboardingData, setOnboardingData] = useState({
    profileSetup: false,
    officeLocationEntered: false,
    teamSetupWalkthrough: false,
    analyticsAcknowledged: false,
    socialTraining: false,
    aiContentTraining: false,
    dummyClientEntered: false
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.onboarding) {
          setOnboardingData(data.onboarding);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load settings', err);
        setLoading(false);
      });
  }, []);

  const steps = [
    { 
      id: 'profileSetup', 
      title: 'Profile Setup', 
      description: 'Configure your basic agent profile, headshot, and bio.', 
      isCompleted: onboardingData.profileSetup, 
      actionLabel: 'Setup Profile',
      route: '/clickme/settings',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
    },
    { 
      id: 'officeLocationEntered', 
      title: 'Office Location & SEO', 
      description: 'Enter your physical office address to optimize for local SEO searches.', 
      isCompleted: onboardingData.officeLocationEntered, 
      actionLabel: 'Enter Location',
      route: '/clickme/locations',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    },
    { 
      id: 'teamSetupWalkthrough', 
      title: 'Team Configuration', 
      description: 'Learn how to invite team members and set their permissions.', 
      isCompleted: onboardingData.teamSetupWalkthrough, 
      actionLabel: 'Start Walkthrough',
      route: '/clickme/team',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    },
    { 
      id: 'analyticsAcknowledged', 
      title: 'Analytics Dashboard', 
      description: 'Review your Google Analytics connection (already set up by our team).', 
      isCompleted: onboardingData.analyticsAcknowledged, 
      actionLabel: 'Review Analytics',
      route: '/clickme/analytics',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>
    },
    { 
      id: 'socialTraining', 
      title: 'Social Media Connection', 
      description: 'Learn how to connect your Meta, LinkedIn, and Google accounts.', 
      isCompleted: onboardingData.socialTraining, 
      actionLabel: 'Social Training',
      route: '/clickme/social',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    },
    { 
      id: 'aiContentTraining', 
      title: 'AI Content Training', 
      description: 'Train the AI Content Pipeline on your brand voice and writing style.', 
      isCompleted: onboardingData.aiContentTraining, 
      actionLabel: 'Configure AI',
      route: '/clickme/content',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    },
    { 
      id: 'dummyClientEntered', 
      title: 'CRM Setup & Mock Lead', 
      description: 'Enter your first dummy lead to learn how the CRM and marketing lists work.', 
      isCompleted: onboardingData.dummyClientEntered, 
      actionLabel: 'Inject Lead',
      route: '/clickme/crm',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    },
  ];

  const completedCount = steps.filter(s => s.isCompleted).length;
  const progressPercentage = Math.round((completedCount / steps.length) * 100);

  const handleActionClick = (route: string) => {
    router.push(route);
  };

  if (loading) {
    return (
      <div style={{ flex: 1, backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', fontWeight: 600 }}>Loading Setup Data...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: '3rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '16px', background: '#e6fffa', color: '#319795', marginBottom: '1.5rem', boxShadow: '0 4px 10px rgba(49, 151, 149, 0.2)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: '#111827', letterSpacing: '-0.02em' }}>Welcome to ClickMe.</h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Let's build your perfect 100% automated marketing machine.</p>
          <div style={{ background: '#fef3c7', color: '#92400e', padding: '1rem', borderRadius: '8px', border: '1px solid #fcd34d', display: 'inline-block', maxWidth: '600px', textAlign: 'left', fontSize: '0.9rem', fontWeight: 500 }}>
            <strong>Note:</strong> This is the default version of the ClickMe Dashboard for demonstration purposes. Custom real estate modules have not been programmed in yet and will be added when this system is placed onto its own dedicated URL.
          </div>
        </header>

        {/* Progress Bar Module */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '2.5rem', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontWeight: 800 }}>System Initialization</h2>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{completedCount} of {steps.length} modules configured.</p>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: progressPercentage === 100 ? '#059669' : '#111827' }}>
              {progressPercentage}%
            </div>
          </div>

          <div style={{ height: '12px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', top: 0, left: 0, bottom: 0, 
              background: progressPercentage === 100 ? '#059669' : 'linear-gradient(90deg, #4fd1c5 0%, #319795 100%)', 
              width: `${progressPercentage}%`,
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s',
              borderRadius: '6px'
            }}></div>
          </div>
          
          {progressPercentage === 100 && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px', color: '#065f46', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Your marketing machine is 100% operational!
            </div>
          )}
        </div>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map((step) => (
            <div 
              key={step.id} 
              style={{ 
                background: '#ffffff', 
                border: `1px solid ${step.isCompleted ? '#a7f3d0' : '#e5e7eb'}`, 
                borderRadius: '16px', 
                padding: '2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem', 
                transition: 'all 0.3s',
                boxShadow: step.isCompleted ? '0 4px 15px rgba(167, 243, 208, 0.2)' : '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              {/* Icon Container */}
              <div style={{ 
                width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
                background: step.isCompleted ? '#10b981' : '#f3f4f6',
                color: step.isCompleted ? '#ffffff' : '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s'
              }}>
                {step.isCompleted ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                  step.icon
                )}
              </div>

              {/* Text Content */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 800, color: '#111827', textDecoration: step.isCompleted ? 'line-through' : 'none', opacity: step.isCompleted ? 0.5 : 1 }}>{step.title}</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5, opacity: step.isCompleted ? 0.5 : 1 }}>{step.description}</p>
              </div>

              {/* Action */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                {step.isCompleted ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 800, fontSize: '0.9rem', padding: '0.8rem 1.5rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0', justifyContent: 'center', width: '100%' }}>
                      Completed Tour
                    </div>
                    <button 
                      onClick={() => handleActionClick(`${step.route}?walkthrough=true`)}
                      style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                    >
                      Replay Tour
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleActionClick(`${step.route}?walkthrough=true`)}
                    style={{ 
                      background: '#111827', color: '#ffffff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0, 0, 0, 0.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
                  >
                    {step.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

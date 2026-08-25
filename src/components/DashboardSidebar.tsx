"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if(data.user) setCurrentUser(data.user);
      })
      .catch(console.error);
  }, []);

  const navGroups = [
    {
      groupName: 'Growth Engine',
      items: [
        { name: 'Dashboard Hub', href: '/clickme', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
        { name: 'Network CRM', href: '/clickme/crm', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
        { name: 'Content Pipeline', href: '/clickme/content', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> },
        { name: 'Reputation Engine', href: '/clickme/reputation', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> },
        { name: 'BI Analytics', href: '/clickme/analytics', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg> },
      ]
    },
    {
      groupName: 'System Setup',
      items: [
        { name: 'Onboarding Guide', href: '/clickme/setup', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> },
        { name: 'Profile Settings', href: '/clickme/settings', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> },
        { name: 'Communications', href: '/clickme/communications', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
        { name: 'Business Locations', href: '/clickme/locations', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> },
        { name: 'Social Integrations', href: '/clickme/social', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> },
        { name: 'Team Access', href: '/clickme/team', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
      ]
    }
  ];

  return (
    <div 
      style={{ 
        width: isExpanded ? '280px' : '80px', 
        backgroundColor: '#ffffff', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '4px 0 15px rgba(0,0,0,0.02)', 
        zIndex: 10,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100vh',
        position: 'sticky',
        top: 0
      }}
    >
      <div style={{ padding: isExpanded ? '2rem 1.5rem' : '2rem 0', borderBottom: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: isExpanded ? 'flex-start' : 'center', transition: 'all 0.3s', flexShrink: 0 }}>
        <Link href="/clickme" style={{
            display: 'inline-block',
            marginBottom: '0.25rem',
            transition: 'all 0.3s'
        }}>
          {isExpanded ? (
            <img src="/clickme-life-logo-medium.png" alt="ClickMe.life" style={{ height: '32px', width: 'auto', display: 'block' }} />
          ) : (
            <img src="/clickme-life-logo-small.png" alt="C" style={{ height: '32px', width: 'auto', display: 'block', margin: '0 auto' }} />
          )}
        </Link>
        {isExpanded && <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>ClickMe Admin</p>}
      </div>
      
      <nav style={{ padding: isExpanded ? '1rem 0' : '1rem 0.5rem', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden' }}>
        {navGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '1.5rem' }}>
            {isExpanded && (
              <div style={{ padding: '0 1.5rem', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                {group.groupName}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: isExpanded ? '0 1rem' : '0' }}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                    <div 
                      style={{ 
                        padding: isExpanded ? '0.75rem 1rem' : '0.75rem', 
                        background: isActive ? '#e6fffa' : 'transparent', 
                        color: isActive ? '#319795' : '#6b7280', 
                        borderRadius: '8px', 
                        fontWeight: isActive ? 700 : 500, 
                        borderLeft: `3px solid ${isActive ? '#4fd1c5' : 'transparent'}`, 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        gap: isExpanded ? '0.75rem' : '0', 
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }} 
                      onMouseEnter={(e) => { if(!isActive) { e.currentTarget.style.color = '#111827'; e.currentTarget.style.background = '#f3f4f6'; } }} 
                      onMouseLeave={(e) => { if(!isActive) { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent'; } }}
                      title={!isExpanded ? item.name : undefined}
                    >
                      {item.icon}
                      {isExpanded && item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Floating Action Button area */}
      <div style={{ padding: isExpanded ? '1.5rem' : '1.5rem 0.5rem', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <button 
          style={{ 
            width: isExpanded ? '100%' : '40px', 
            height: isExpanded ? 'auto' : '40px',
            background: '#4fd1c5', 
            color: '#fff', 
            border: 'none', 
            padding: isExpanded ? '0.8rem 1.5rem' : '0', 
            borderRadius: isExpanded ? '8px' : '50%', 
            fontWeight: 700, 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.5rem', 
            boxShadow: '0 4px 10px rgba(79, 209, 197, 0.4)', 
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(79, 209, 197, 0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(79, 209, 197, 0.4)'; }}
          title={!isExpanded ? "Add Lead" : undefined}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          {isExpanded && "Add Lead"}
        </button>
      </div>

    <div style={{ padding: isExpanded ? '1.5rem' : '1.5rem 0', borderTop: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        {isExpanded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6fffa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#319795', border: '2px solid #4fd1c5', flexShrink: 0, overflow: 'hidden' }}>
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                `${currentUser?.firstName?.[0] || 'C'}${currentUser?.lastName?.[0] || 'M'}`
              )}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Loading...'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{currentUser?.role || '...'}</div>
            </div>
          </div>
        )}
        {!isExpanded && (
           <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e6fffa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#319795', border: '2px solid #4fd1c5', marginBottom: '1rem', overflow: 'hidden' }} title={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User'}>
             {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                `${currentUser?.firstName?.[0] || 'C'}${currentUser?.lastName?.[0] || 'M'}`
              )}
           </div>
        )}
        
        <div style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'transparent',
              border: '1px solid #d1d5db',
              color: '#6b7280',
              flex: 1,
              height: '36px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#111827'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b7280'; }}
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isExpanded ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            )}
          </button>
          
          {isExpanded && (
            <button 
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/clickme';
              }}
              style={{
                background: '#fef2f2',
                border: '1px solid #fca5a5',
                color: '#ef4444',
                flex: 1,
                height: '36px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

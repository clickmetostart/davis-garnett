"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCurrentUser(data.user);
      })
      .catch(console.error);
  }, []);

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navGroups = [
    {
      groupName: 'Growth Engine',
      items: [
        { name: 'Dashboard Hub', href: '/clickme', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
        { name: 'Property Listings', href: '/clickme/listings', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
        { name: 'Agent CRM', href: '/clickme/crm?view=my', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
        { name: 'D&G Shared CRM', href: '/clickme/crm?view=team', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
        { name: 'Agent Flow', href: '/clickme/flow?view=my', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg> },
        { name: 'D&G Shared Flow', href: '/clickme/flow?view=team', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg> },
        { name: 'Brand Assets', href: '/clickme/assets', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> },
        { name: 'Image Review', href: '/clickme/image-review', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> },
        { name: 'Marketing Engine', href: '/clickme/marketing', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
        { name: 'Content Pipeline', href: '/clickme/content', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> },
        { name: 'Social Planner', href: '/clickme/scheduler', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> },
        { name: 'Reputation Engine', href: '/clickme/reputation', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> },
        { name: 'BI Analytics', href: '/clickme/analytics', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg> },
      ],
    },
    {
      groupName: 'System Setup',
      items: [
        { name: 'Onboarding Guide', href: '/clickme/setup', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> },
        { name: 'Profile / Linktree', href: '/clickme/settings', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> },
        { name: 'Communications', href: '/clickme/communications', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
        { name: 'Website Emails', href: '/clickme/email-previews', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> },
        { name: 'Business Locations', href: '/clickme/locations', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> },
        { name: 'Social Integrations', href: '/clickme/social', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> },
        { name: 'Team Access', href: '/clickme/team', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
      ],
    },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/clickme';
  };

  const renderSidebarBody = (expandedView: boolean, isMobileDrawer: boolean) => (
    <>
      <div
        style={{
          padding: expandedView ? '1.5rem' : '2rem 0',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: expandedView ? 'center' : 'center',
          justifyContent: expandedView ? 'space-between' : 'center',
          flexShrink: 0,
        }}
      >
        <div>
          <Link
            href="/clickme"
            onClick={() => isMobileDrawer && setMobileOpen(false)}
            style={{ display: 'inline-block', marginBottom: '0.2rem' }}
          >
            {expandedView ? (
              <img
                src="/clickme-life-logo-medium.png"
                alt="ClickMe.life"
                style={{ height: '30px', width: 'auto', display: 'block' }}
              />
            ) : (
              <img
                src="/clickme-life-logo-small.png"
                alt="C"
                style={{ height: '30px', width: 'auto', display: 'block', margin: '0 auto' }}
              />
            )}
          </Link>
          {expandedView && (
            <p
              style={{
                color: '#6b7280',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              ClickMe Admin
            </p>
          )}
        </div>
        {isMobileDrawer && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close portal menu"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <nav
        style={{
          padding: expandedView ? '1rem 0' : '1rem 0.5rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {navGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '1.25rem' }}>
            {expandedView && (
              <div
                style={{
                  padding: '0 1.5rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '0.5rem',
                }}
              >
                {group.groupName}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                padding: expandedView ? '0 0.85rem' : '0',
              }}
            >
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href.split('?')[0] &&
                  (item.href.includes('?')
                    ? isMounted && window.location.search.includes(item.href.split('?')[1])
                    : true);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => isMobileDrawer && setMobileOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        padding: expandedView ? '0.7rem 0.9rem' : '0.75rem',
                        background: isActive ? '#e6fffa' : 'transparent',
                        color: isActive ? '#319795' : '#6b7280',
                        borderRadius: '8px',
                        fontWeight: isActive ? 700 : 500,
                        borderLeft: `3px solid ${isActive ? '#4fd1c5' : 'transparent'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: expandedView ? 'flex-start' : 'center',
                        gap: expandedView ? '0.75rem' : '0',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        fontSize: '0.92rem',
                      }}
                      title={!expandedView ? item.name : undefined}
                    >
                      {item.icon}
                      {expandedView && item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Quick Action + User Footer */}
      <div
        style={{
          padding: expandedView ? '1rem 1.25rem' : '1rem 0.5rem',
          borderTop: '1px solid #e5e7eb',
          background: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', justifyContent: expandedView ? 'flex-start' : 'center', marginBottom: '0.85rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#e6fffa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#319795',
              border: '2px solid #4fd1c5',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {currentUser?.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              `${currentUser?.firstName?.[0] || 'C'}${currentUser?.lastName?.[0] || 'M'}`
            )}
          </div>
          {expandedView && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Loading...'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600 }}>
                {currentUser?.role || '...'}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
          {!isMobileDrawer && (
            <button
              type="button"
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
              }}
              title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {isExpanded ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </button>
          )}

          {expandedView && (
            <button
              type="button"
              onClick={handleLogout}
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
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile / Portrait-Tablet Top Header (< 1024px) */}
      <header className="lg:hidden sticky top-0 z-40 w-full shrink-0 h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between shadow-xs">
        <Link href="/clickme" className="flex items-center gap-2.5 min-w-0">
          <img
            src="/clickme-life-logo-medium.png"
            alt="ClickMe"
            className="h-7 w-auto object-contain"
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 truncate">
            Portal
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/clickme/crm"
            className="px-2.5 py-1.5 rounded-lg bg-[#e6fffa] text-[#319795] text-xs font-bold"
          >
            CRM
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open portal navigation"
            className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 flex items-center justify-center active:bg-gray-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile / Portrait-Tablet Slide-Over Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[1px]"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-[285px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 overflow-hidden">
            {renderSidebarBody(true, true)}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar (>= 1024px) */}
      <aside
        className="hidden lg:flex flex-col shrink-0 bg-white border-r border-gray-200"
        style={{
          width: isExpanded ? '275px' : '78px',
          boxShadow: '4px 0 15px rgba(0,0,0,0.02)',
          zIndex: 10,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {renderSidebarBody(isExpanded, false)}
      </aside>
    </>
  );
}

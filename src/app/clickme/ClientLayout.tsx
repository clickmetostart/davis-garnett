"use client";

import React, { useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';

import { WalkthroughProvider } from '@/components/clickme/WalkthroughProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Reset overflow on dashboard mount
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <WalkthroughProvider>
      <div className="clickme-dashboard-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: "'Inter', sans-serif" }}>
        <DashboardSidebar />
        <div style={{ flex: 1, position: 'relative', overflowX: 'hidden' }}>
          {children}
        </div>
      </div>
    </WalkthroughProvider>
  );
}

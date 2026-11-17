"use client";

import React, { useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { WalkthroughProvider } from '@/components/clickme/WalkthroughProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <WalkthroughProvider>
      <div
        className="clickme-dashboard-container flex flex-col lg:flex-row min-h-screen bg-[#f9fafb] text-[#111827]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <DashboardSidebar />
        <div className="flex-1 min-w-0 relative overflow-x-hidden">
          {children}
        </div>
      </div>
    </WalkthroughProvider>
  );
}

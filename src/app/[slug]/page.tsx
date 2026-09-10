import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import LinktreeProfile from '@/components/LinktreeProfile';

export default async function LinktreePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug.endsWith('-links')) {
    notFound();
  }

  // Extract name parts, e.g., "mark-davis-links" -> ["mark", "davis"]
  const nameParts = slug.replace('-links', '').split('-');
  const firstName = nameParts[0]?.toLowerCase();
  const lastName = nameParts[1]?.toLowerCase();

  if (!firstName || !lastName) {
    notFound();
  }

  // Fetch users
  const usersPath = path.join(process.cwd(), 'src', 'data', 'users.json');
  if (!fs.existsSync(usersPath)) {
    notFound();
  }
  const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  
  // Find matching user
  const user = usersData.users.find((u: any) => 
    u.firstName?.toLowerCase() === firstName && 
    u.lastName?.toLowerCase() === lastName
  );

  if (!user) {
    notFound();
  }

  // Fetch listings
  const listingsPath = path.join(process.cwd(), 'src', 'data', 'listings.json');
  let featuredListingsData = [];
  if (fs.existsSync(listingsPath)) {
    const listings = JSON.parse(fs.readFileSync(listingsPath, 'utf8'));
    featuredListingsData = listings.filter((l: any) => (user.featuredListings || []).includes(l.id));
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl sm:border-x sm:border-gray-200">
        <LinktreeProfile user={user} featuredListingsData={featuredListingsData} />
      </div>
    </div>
  );
}

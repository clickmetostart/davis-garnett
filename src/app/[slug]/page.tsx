import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import LinktreeProfile from '@/components/LinktreeProfile';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug.endsWith('-links')) {
    return { title: 'Davis & Garnett' };
  }
  const nameParts = slug.replace('-links', '').split('-');
  const first = nameParts[0] ? nameParts[0][0].toUpperCase() + nameParts[0].slice(1) : 'Davis';
  const last = nameParts[1] ? nameParts[1][0].toUpperCase() + nameParts[1].slice(1) : 'Garnett';
  const coverImage =
    first.toLowerCase() === 'mark'
      ? '/mark-commerical-banner-1.jpg'
      : first.toLowerCase() === 'rachael'
      ? '/rachael-banner-2.jpg'
      : undefined;

  return buildPageMetadata({
    title: `${first} ${last} | Direct Links & Listings — Davis & Garnett`,
    description: `Connect directly with ${first} ${last} at Davis & Garnett Real Estate Advisors (Align Right Realty Carrollwood), browse featured Tampa Bay properties, and request a call.`,
    path: `/${slug}`,
    image: coverImage,
    type: 'profile',
  });
}

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

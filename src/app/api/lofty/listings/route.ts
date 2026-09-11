import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: Request) {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'loftyToken.json');
    let tokenData;
    
    try {
      const fileData = await fs.readFile(dataPath, 'utf8');
      tokenData = JSON.parse(fileData);
    } catch (e) {
      return NextResponse.json({ error: 'Not authenticated with Lofty. Please connect your account first.' }, { status: 401 });
    }

    if (!tokenData.access_token) {
        return NextResponse.json({ error: 'Access token missing.' }, { status: 401 });
    }

    // Call Lofty API
    const response = await fetch('https://api.lofty.com/v2.0/listings/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        searchScope: 'all',
        soldFlag: false,
        pageSize: 20,
        pageNum: 1
      })
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch listings from Lofty', details: data }, { status: response.status });
    }

    // Map Lofty API response to our app's Listing format
    // (Assuming Lofty returns results in data.list or data.results)
    const loftyListings = data.data?.list || data.list || data.results || [];
    
    const mappedListings = loftyListings.map((l: any) => ({
      id: l.listingId || l.id || Math.random().toString(),
      title: l.propertyAddress || l.address || 'MLS Listing',
      city: l.city || '',
      state: l.state || '',
      zip: l.zipCode || l.zip || '',
      askingPrice: l.price ? `$${Number(l.price).toLocaleString()}` : 'Unpriced',
      bedrooms: l.beds || '',
      bathrooms: l.baths || '',
      sqFt: l.sqft || l.squareFeet || '',
      propertyType: l.propertyType || 'Residential',
      images: l.photoUrls ? l.photoUrls.map((url: string, idx: number) => ({ id: `${idx}`, url })) : [{ id: '1', url: l.coverPhoto || l.image || '' }],
      status: l.status || 'Active',
      featured: false,
      sourcePlatform: 'Lofty',
    }));

    return NextResponse.json(mappedListings, { status: 200 });

  } catch (error) {
    console.error('Error fetching Lofty listings:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

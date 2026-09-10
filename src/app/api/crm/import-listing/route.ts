import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export interface CRMPropertyImport {
  listingType: 'RESIDENTIAL' | 'COMMERCIAL';
  sourcePlatform: string;
  sourceUrl: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photos: string[];
  description?: string;
  
  // Residential Specific
  beds?: number;
  baths?: number;
  
  // Commercial Specific
  propertyType?: string; 
  capRate?: number; 
  noi?: number; 
  leaseRate?: string; 
  buildingSizeSqFt?: number | string;
  tenancy?: 'Single' | 'Multi';
}

export async function POST(req: Request) {
  try {
    const payload: CRMPropertyImport = await req.json();

    // Map extension payload to our Listing schema
    const category = payload.listingType === 'COMMERCIAL' ? 'Commercial' : 'Residential';
    const fallbackTitle = category === 'Commercial' 
      ? `Commercial Property in ${payload.city || 'Unknown City'}` 
      : `${payload.beds || '?'} Bed, ${payload.baths || '?'} Bath in ${payload.city || 'Unknown City'}`;

    const newListing = {
      category,
      title: payload.address || fallbackTitle,
      streetAddress: payload.address || '',
      city: payload.city || '',
      state: payload.state || '',
      zip: payload.zip || '',
      
      // Pricing
      askingPrice: category === 'Residential' ? payload.leaseRate || '' : '',
      askingRent: category === 'Commercial' ? payload.leaseRate || '' : '',
      capRate: payload.capRate ? `${payload.capRate}%` : '',
      noi: payload.noi ? `$${payload.noi.toLocaleString()}` : '',
      
      // Specs
      bedrooms: payload.beds?.toString() || '',
      bathrooms: payload.baths?.toString() || '',
      sqFt: category === 'Residential' ? (payload.buildingSizeSqFt?.toString() || '') : '',
      buildingSizeSqFt: category === 'Commercial' ? (payload.buildingSizeSqFt?.toString() || '') : '',
      propertyType: payload.propertyType || (category === 'Commercial' ? 'Retail' : 'Single Family'),
      
      propertyDescription: payload.description || `Imported from ${payload.sourcePlatform}`,
      images: (payload.photos || []).map((url: string, index: number) => ({
        id: `img-import-${Date.now()}-${index}`,
        url,
        isHero: index === 0,
        sortOrder: index + 1
      })),
      status: 'Draft',
      featured: false,
      primaryContact: 'Mark', // Assign to default user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      
      // Custom metadata
      sourcePlatform: payload.sourcePlatform || '',
      sourceUrl: payload.sourceUrl || '',
    };

    const dataPath = path.join(process.cwd(), 'src', 'data', 'listings.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const listings = JSON.parse(fileData);

    let nextId = listings.length > 0 ? Math.max(...listings.map((l: any) => parseInt(l.id) || 0)) + 1 : 1;
    const finalListing = { ...newListing, id: nextId.toString() };

    listings.push(finalListing);

    await fs.writeFile(dataPath, JSON.stringify(listings, null, 2));

    return NextResponse.json({ message: 'Listing imported successfully', listing: finalListing }, { status: 201 });
  } catch (error) {
    console.error('Error importing listing:', error);
    return NextResponse.json({ error: 'Failed to import listing' }, { status: 500 });
  }
}

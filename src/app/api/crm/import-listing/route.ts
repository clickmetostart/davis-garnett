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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function processImport(payload: CRMPropertyImport) {
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

  return finalListing;
}

// Support Bookmarklet GET bypass via URL parameter
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const payloadStr = searchParams.get('payload');
    
    if (payloadStr) {
      const decodedStr = decodeURIComponent(atob(payloadStr));
      const payload: CRMPropertyImport = JSON.parse(decodedStr);
      await processImport(payload);

      // Return a self-closing HTML page so the new tab disappears instantly
      const html = `
        <!DOCTYPE html>
        <html>
        <head><title>Import Success</title></head>
        <body style="background:#111; color:#D4AF37; font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:100vh;">
          <h2>✅ Listing Imported Successfully!</h2>
          <script>
            setTimeout(() => { window.close(); }, 1000);
          </script>
        </body>
        </html>
      `;
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }
    
    return NextResponse.json({ error: 'No payload provided' }, { status: 400 });
  } catch (error) {
    console.error('Error importing listing via GET:', error);
    return new NextResponse('Error importing listing', { status: 500 });
  }
}

// Support standard Extension POST
export async function POST(req: Request) {
  try {
    const payload: CRMPropertyImport = await req.json();
    const finalListing = await processImport(payload);

    return NextResponse.json(
      { message: 'Listing imported successfully', listing: finalListing }, 
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error importing listing:', error);
    return NextResponse.json(
      { error: 'Failed to import listing' }, 
      { status: 500, headers: corsHeaders }
    );
  }
}

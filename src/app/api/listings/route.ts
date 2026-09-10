import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'listings.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const listings = JSON.parse(fileData);
    
    // Sort by newest
    const sortedListings = listings.sort((a: any, b: any) => {
        const d1 = new Date(a.createdAt || 0).getTime();
        const d2 = new Date(b.createdAt || 0).getTime();
        return d2 - d1;
    });
    return NextResponse.json(sortedListings, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dataPath = path.join(process.cwd(), 'src', 'data', 'listings.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const listings = JSON.parse(fileData);

    let nextId = listings.length > 0 ? Math.max(...listings.map((l: any) => parseInt(l.id) || 0)) + 1 : 1;

    const newListing = {
      ...body,
      id: nextId.toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    listings.push(newListing);

    await fs.writeFile(dataPath, JSON.stringify(listings, null, 2));

    return NextResponse.json({ message: 'Success', listing: newListing }, { status: 201 });
  } catch (error) {
    console.error('Error adding listing:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

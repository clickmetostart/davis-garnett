import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const dataPath = path.join(process.cwd(), 'src', 'data', 'listings.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    let listings = JSON.parse(fileData);

    const index = listings.findIndex((l: any) => l.id === params.id);
    if (index === -1) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    // Update the listing with the new data
    listings[index] = { ...listings[index], ...body, updatedAt: new Date().toISOString() };

    await fs.writeFile(dataPath, JSON.stringify(listings, null, 2));

    return NextResponse.json({ message: 'Success', listing: listings[index] }, { status: 200 });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'listings.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    let listings = JSON.parse(fileData);

    const index = listings.findIndex((l: any) => l.id === params.id);
    if (index === -1) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    listings.splice(index, 1);

    await fs.writeFile(dataPath, JSON.stringify(listings, null, 2));

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

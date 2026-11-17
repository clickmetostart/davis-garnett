import { NextResponse } from 'next/server';
import { kv_getListings, kv_setListings } from '@/lib/kv';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    const resolvedParams = await params;
    const listings = await kv_getListings();

    const index = listings.findIndex((l: any) => l.id === resolvedParams.id);
    if (index === -1) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    listings[index] = {
      ...listings[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await kv_setListings(listings);
    return NextResponse.json({ message: 'Success', listing: listings[index] }, { status: 200 });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const listings = await kv_getListings();

    const index = listings.findIndex((l: any) => l.id === resolvedParams.id);
    if (index === -1) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    listings.splice(index, 1);
    await kv_setListings(listings);

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

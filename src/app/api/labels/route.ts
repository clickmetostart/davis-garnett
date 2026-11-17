import { NextResponse } from 'next/server';
import { kv_getLabels, kv_setLabels } from '@/lib/kv';

export async function GET() {
  try {
    const labels = await kv_getLabels();
    return NextResponse.json({ labels }, { status: 200 });
  } catch (error) {
    console.error('Error fetching labels:', error);
    return NextResponse.json({ labels: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const labels = await kv_getLabels();

    const newLabel = {
      name: body.name,
      color: body.color || '#319795',
      isSystem: false,
    };

    labels.push(newLabel);
    await kv_setLabels(labels);

    return NextResponse.json({ message: 'Success', label: newLabel }, { status: 201 });
  } catch (error) {
    console.error('Error creating label:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

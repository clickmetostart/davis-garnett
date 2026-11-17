import { NextResponse } from 'next/server';
import { kv_getLeads, kv_setLeads } from '@/lib/kv';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    const body = await req.json();

    const leads = await kv_getLeads();
    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }

    leads[leadIndex] = { ...leads[leadIndex], ...body };
    await kv_setLeads(leads);

    return NextResponse.json({ message: 'Success', lead: leads[leadIndex] }, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);

    const leads = await kv_getLeads();
    const filteredLeads = leads.filter((l: any) => l.id !== id);
    if (leads.length === filteredLeads.length) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }

    await kv_setLeads(filteredLeads);
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

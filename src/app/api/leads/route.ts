import { NextResponse } from 'next/server';
import { kv_getLeads, kv_setLeads } from '@/lib/kv';

export async function GET() {
  try {
    const leads = await kv_getLeads();
    const sortedLeads = [...leads].sort((a: any, b: any) => {
      const d1 = new Date(a.date || 0).getTime();
      const d2 = new Date(b.date || 0).getTime();
      return d2 - d1;
    });
    return NextResponse.json({ leads: sortedLeads }, { status: 200 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ leads: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const leads = await kv_getLeads();

    let nextId = leads.length > 0 ? Math.max(...leads.map((l: any) => Number(l.id) || 0)) + 1 : 1;

    if (body.leads && Array.isArray(body.leads)) {
      const newLeads = body.leads.map((l: any) => ({
        ...l,
        id: nextId++,
        date: new Date().toISOString(),
        status: l.status || 'New',
      }));
      leads.push(...newLeads);
    } else {
      const newLead = {
        ...body,
        id: nextId,
        date: new Date().toISOString(),
        status: body.status || 'New',
      };
      leads.push(newLead);
    }

    await kv_setLeads(leads);
    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error('Error adding lead(s):', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const leads = await kv_getLeads();

    if (!body.id) {
      return NextResponse.json({ message: 'Missing lead ID' }, { status: 400 });
    }

    const index = leads.findIndex((l: any) => l.id === body.id);
    if (index === -1) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }

    leads[index] = { ...leads[index], ...body };
    await kv_setLeads(leads);

    return NextResponse.json({ message: 'Success', lead: leads[index] }, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const leads = JSON.parse(fileData);
    
    // In a real app we'd paginate, but for the prototype returning all is fine.
    // Ensure all leads have a date and sort by newest
    const sortedLeads = leads.sort((a: any, b: any) => {
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
    const dataPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const leads = JSON.parse(fileData);

    let nextId = leads.length > 0 ? Math.max(...leads.map((l: any) => l.id || 0)) + 1 : 1;

    if (body.leads && Array.isArray(body.leads)) {
      // Bulk Import (CSV)
      const newLeads = body.leads.map((l: any) => ({
        ...l,
        id: nextId++,
        date: new Date().toISOString(),
        status: l.status || 'New',
      }));
      leads.push(...newLeads);
    } else {
      // Single Manual Lead
      const newLead = {
        ...body,
        id: nextId,
        date: new Date().toISOString(),
        status: body.status || 'New',
      };
      leads.push(newLead);
    }

    await fs.writeFile(dataPath, JSON.stringify(leads, null, 2));

    return NextResponse.json({ message: 'Success' }, { status: 201 });
  } catch (error) {
    console.error('Error adding lead(s):', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

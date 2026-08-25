import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);
    const body = await req.json();

    const dataPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const leads = JSON.parse(fileData);
    
    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
    
    // Update the lead with new data (status, notes, etc.)
    leads[leadIndex] = { ...leads[leadIndex], ...body };
    
    await fs.writeFile(dataPath, JSON.stringify(leads, null, 2));
    
    return NextResponse.json({ message: 'Success', lead: leads[leadIndex] }, { status: 200 });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await params;
    const id = parseInt(paramId, 10);

    const dataPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const leads = JSON.parse(fileData);
    
    const filteredLeads = leads.filter((l: any) => l.id !== id);
    if (leads.length === filteredLeads.length) {
      return NextResponse.json({ message: 'Lead not found' }, { status: 404 });
    }
    
    await fs.writeFile(dataPath, JSON.stringify(filteredLeads, null, 2));
    
    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

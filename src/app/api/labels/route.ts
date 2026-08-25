import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'labels.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const labels = JSON.parse(fileData);
    return NextResponse.json({ labels }, { status: 200 });
  } catch (error) {
    console.error('Error fetching labels:', error);
    return NextResponse.json({ labels: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dataPath = path.join(process.cwd(), 'data', 'labels.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '[]');
    const labels = JSON.parse(fileData);

    const newLabel = {
      name: body.name,
      color: body.color || '#319795', // default teal if missing
      isSystem: false
    };
    
    labels.push(newLabel);
    await fs.writeFile(dataPath, JSON.stringify(labels, null, 2));

    return NextResponse.json({ message: 'Success', label: newLabel }, { status: 201 });
  } catch (error) {
    console.error('Error creating label:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

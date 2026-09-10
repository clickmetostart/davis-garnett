import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'listingFolders.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '["Website Featured", "Website Normal"]');
    const folders = JSON.parse(fileData);
    
    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error('Error fetching listing folders:', error);
    return NextResponse.json(["Website Featured", "Website Normal"], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.folder || typeof body.folder !== 'string') {
        return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }

    const newFolder = body.folder.trim();
    
    const dataPath = path.join(process.cwd(), 'src', 'data', 'listingFolders.json');
    const fileData = await fs.readFile(dataPath, 'utf8').catch(() => '["Website Featured", "Website Normal"]');
    let folders: string[] = JSON.parse(fileData);

    if (!folders.includes(newFolder)) {
        folders.push(newFolder);
        await fs.writeFile(dataPath, JSON.stringify(folders, null, 2));
    }

    return NextResponse.json({ message: 'Success', folders }, { status: 201 });
  } catch (error) {
    console.error('Error adding listing folder:', error);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

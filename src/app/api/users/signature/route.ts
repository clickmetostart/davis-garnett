import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(USERS_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    const cookieStore = await cookies();
    const userId = cookieStore.get('auth_token')?.value;
    const user = data.users.find((u: any) => u.id === userId) || data.users[0];

    return NextResponse.json({ 
      signature: user?.emailSignature || '',
      signatureData: user?.emailSignatureData || null 
    });
  } catch (error: any) {
    console.error('Failed to get signature:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { signature, signatureData } = await request.json();

    const fileContents = await fs.readFile(USERS_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    
    const cookieStore = await cookies();
    const userId = cookieStore.get('auth_token')?.value;
    const userIndex = data.users.findIndex((u: any) => u.id === userId);
    
    if (userIndex !== -1) {
      data.users[userIndex].emailSignature = signature;
      data.users[userIndex].emailSignatureData = signatureData;
    } else {
      data.users[0].emailSignature = signature;
      data.users[0].emailSignatureData = signatureData;
    }

    await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true, signature });
  } catch (error: any) {
    console.error('Failed to save signature:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

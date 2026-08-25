import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { users: [] };
  }
  const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(fileContents);
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('mock_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
    
    // Fetch full user from database
    const data = readData();
    const user = data.users.find((u: any) => u.email.toLowerCase() === sessionData.email.toLowerCase());

    if (!user) {
      // Fallback to session data if not in db
      return NextResponse.json({ user: sessionData });
    }

    const { password, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

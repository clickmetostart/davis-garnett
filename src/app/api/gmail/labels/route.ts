import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export async function GET(request: Request) {
  try {
    const fileContents = await fs.readFile(USERS_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    const user = data.users?.[0];

    if (!user?.googleTokens?.refresh_token) {
      return NextResponse.json({ error: 'No Gmail connected' }, { status: 401 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: user.googleTokens.refresh_token });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    const response = await gmail.users.labels.list({
      userId: 'me',
    });

    const labels = response.data.labels || [];
    
    // Sort labels to put system labels first, then custom labels
    const systemLabels = labels.filter(l => l.type === 'system');
    const customLabels = labels.filter(l => l.type === 'user');

    return NextResponse.json({ 
      systemLabels,
      customLabels
    });
  } catch (error: any) {
    console.error('Gmail API Labels Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export async function POST(request: Request) {
  try {
    const { to, cc, bcc, subject, message, threadId } = await request.json();

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
    
    // Construct the email RFC 2822 message
    const emailLines = [
      `To: ${to}`,
      ...(cc ? [`Cc: ${cc}`] : []),
      ...(bcc ? [`Bcc: ${bcc}`] : []),
      `Subject: ${subject}`,
      'Content-Type: text/html; charset="UTF-8"',
      'MIME-Version: 1.0',
      '',
      message
    ];
    
    const email = emailLines.join('\r\n');
    const encodedEmail = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
        threadId: threadId || undefined
      }
    });

    return NextResponse.json({ success: true, messageId: res.data.id });
  } catch (error: any) {
    console.error('Gmail Send API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export async function GET(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const filterEmail = urlObj.searchParams.get('email');
    const labelId = urlObj.searchParams.get('labelId');
    const qParam = urlObj.searchParams.get('q');
    const pageToken = urlObj.searchParams.get('pageToken');

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
    
    let query = '';
    if (filterEmail) {
      query = `from:${filterEmail} OR to:${filterEmail}`;
    } else if (qParam) {
      query = qParam;
    }

    const requestArgs: any = {
      userId: 'me',
      maxResults: 15,
      pageToken: pageToken || undefined
    };
    if (query) requestArgs.q = query;
    if (labelId) requestArgs.labelIds = [labelId];
    if (!query && !labelId) requestArgs.labelIds = ['INBOX'];

    // Fetch latest 15 threads
    const response = await gmail.users.threads.list(requestArgs);

    const nextPageToken = response.data.nextPageToken;

    const threads = response.data.threads || [];
    const fullThreads = await Promise.all(
      threads.map(async (thread) => {
        const threadDetails = await gmail.users.threads.get({
          userId: 'me',
          id: thread.id!,
        });

        const messages = threadDetails.data.messages || [];
        
        // Extract basic info from the last message in the thread
        const lastMessage = messages[messages.length - 1];
        const headers = lastMessage.payload?.headers || [];
        const subject = headers.find((h) => h.name === 'Subject')?.value || 'No Subject';
        const from = headers.find((h) => h.name === 'From')?.value || 'Unknown';
        
        return {
          id: thread.id,
          snippet: lastMessage.snippet,
          subject,
          from,
          date: new Date(parseInt(lastMessage.internalDate || '0')).toLocaleDateString(),
          messages: messages.map(msg => {
            const msgHeaders = msg.payload?.headers || [];
            const msgFrom = msgHeaders.find(h => h.name === 'From')?.value || 'Unknown';
            const msgDate = new Date(parseInt(msg.internalDate || '0')).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            // Extract body text
            let body = '';
            if (msg.payload?.parts) {
              const textPart = msg.payload.parts.find(p => p.mimeType === 'text/plain');
              if (textPart?.body?.data) {
                body = Buffer.from(textPart.body.data, 'base64').toString();
              }
            } else if (msg.payload?.body?.data) {
              body = Buffer.from(msg.payload.body.data, 'base64').toString();
            }

            return {
              id: msg.id,
              from: msgFrom,
              text: body || msg.snippet,
              time: msgDate,
              isMine: msgFrom.includes(user.googleTokens.email || '')
            };
          })
        };
      })
    );

    return NextResponse.json({ threads: fullThreads, nextPageToken });
  } catch (error: any) {
    console.error('Gmail API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

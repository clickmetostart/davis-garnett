import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const type = urlObj.searchParams.get('type') || 'general'; // 'general', 'apply', 'spam'

    const inboxPath = path.join(process.cwd(), 'src', 'data', 'web_inbox.json');
    let inboxData = '[]';
    try {
      inboxData = await fs.readFile(inboxPath, 'utf8');
      console.log(`[API /resend/threads] Successfully read ${inboxPath}. Size: ${inboxData.length}`);
    } catch (fsErr: any) {
      console.error(`[API /resend/threads] ERROR reading ${inboxPath}:`, fsErr);
      inboxData = '[]';
    }
    const allThreads = JSON.parse(inboxData);

    // Filter by type
    const validThreads = allThreads.filter((t: any) => {
      if (type === 'spam') {
        return t.isSpam;
      } else if (type === 'apply') {
        return !t.isSpam && t.subject && t.subject.includes('Apply');
      } else {
        return !t.isSpam && (!t.subject || !t.subject.includes('Apply'));
      }
    });

    console.log(`[API /resend/threads] Requested type: ${type}. Returning ${validThreads.length} threads.`);

    return NextResponse.json({ threads: validThreads, nextPageToken: null }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error: any) {
    console.error('Local Inbox Read Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

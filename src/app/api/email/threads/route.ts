import { NextResponse } from 'next/server';
import { kv_getThreads } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const urlObj = new URL(request.url);
    const type = urlObj.searchParams.get('type') || 'general'; // 'general', 'apply', 'spam'

    const allThreads = await kv_getThreads();

    const validThreads = allThreads.filter((t: any) => {
      if (type === 'spam') {
        return t.isSpam;
      } else if (type === 'apply') {
        return !t.isSpam && t.subject && t.subject.includes('Apply');
      } else {
        return !t.isSpam && (!t.subject || !t.subject.includes('Apply'));
      }
    });

    return NextResponse.json(
      { threads: validThreads, nextPageToken: null },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error: any) {
    console.error('Inbox Read Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { kv_getThreads, kv_setThreads } from '@/lib/kv';

export async function POST(req: Request) {
  try {
    const { threadId, threadIds, isSpam } = await req.json();
    const idsToUpdate = threadIds || (threadId ? [threadId] : []);

    if (idsToUpdate.length === 0) {
      return NextResponse.json({ error: 'Missing threadId or threadIds' }, { status: 400 });
    }

    let allThreads = await kv_getThreads();
    let updatedCount = 0;

    allThreads = allThreads.map((t: any) => {
      if (idsToUpdate.includes(t.id)) {
        t.isSpam = isSpam;
        updatedCount++;
      }
      return t;
    });

    if (updatedCount === 0) {
      return NextResponse.json({ error: 'No threads found to update' }, { status: 404 });
    }

    await kv_setThreads(allThreads);
    return NextResponse.json({ success: true, updatedCount });
  } catch (err: any) {
    console.error('Spam toggle error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

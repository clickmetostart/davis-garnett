import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { threadId, threadIds, isSpam } = await req.json();
    const idsToUpdate = threadIds || (threadId ? [threadId] : []);

    if (idsToUpdate.length === 0) {
      return NextResponse.json({ error: 'Missing threadId or threadIds' }, { status: 400 });
    }

    const inboxPath = path.join(process.cwd(), 'data', 'web_inbox.json');
    let allThreads = [];
    try {
      const data = await fs.readFile(inboxPath, 'utf8');
      allThreads = JSON.parse(data);
    } catch (err) {
      return NextResponse.json({ error: 'Failed to read inbox data' }, { status: 500 });
    }

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

    await fs.writeFile(inboxPath, JSON.stringify(allThreads, null, 2));

    return NextResponse.json({ success: true, updatedCount });
  } catch (err: any) {
    console.error('Spam toggle error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

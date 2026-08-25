import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export async function POST(request: Request) {
  try {
    const { locationName } = await request.json();

    if (!locationName) {
      return NextResponse.json({ error: 'Location name is required' }, { status: 400 });
    }

    const fileContents = await fs.readFile(USERS_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    const user = data.users?.[0];

    if (!user || !user.googleTokens || !user.googleTokens.access_token) {
      return NextResponse.json({ error: 'Not authenticated with Google' }, { status: 401 });
    }

    const { access_token } = user.googleTokens;

    // Send Admin Invite to the ClickMe platform email
    // Note: The parent can be an account name or location name. We use locationName directly.
    const inviteRes = await fetch(`https://mybusinessaccountmanagement.googleapis.com/v1/${locationName}/admins`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        admin: 'launch@clickme.life', // Hardcoded platform email as requested
        role: 'MANAGER' // Roles: MANAGER, SITE_MANAGER
      })
    });

    if (!inviteRes.ok) {
      const errorData = await inviteRes.text();
      return NextResponse.json({ error: 'Failed to send admin invite', details: errorData }, { status: inviteRes.status });
    }

    const inviteData = await inviteRes.json();
    return NextResponse.json({ success: true, invite: inviteData });

  } catch (error) {
    console.error('Error sending Google admin invite:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

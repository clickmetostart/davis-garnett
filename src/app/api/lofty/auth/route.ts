import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is missing.' }, { status: 400 });
    }

    const clientId = process.env.LOFTY_CLIENT_ID;
    const clientSecret = process.env.LOFTY_CLIENT_SECRET;
    const redirectUri = process.env.LOFTY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({ error: 'Lofty environment variables are not configured.' }, { status: 500 });
    }

    // Prepare token request
    const tokenUrl = 'https://crm.lofty.com/api/user-web/oauth/token';
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Lofty OAuth Error:', data);
      return NextResponse.json({ error: 'Failed to exchange token with Lofty.', details: data }, { status: response.status });
    }

    // Save token to file
    const dataPath = path.join(process.cwd(), 'src', 'data', 'loftyToken.json');
    await fs.writeFile(dataPath, JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      timestamp: Date.now()
    }, null, 2));

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error in Lofty auth route:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

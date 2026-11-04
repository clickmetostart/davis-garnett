import { NextResponse } from 'next/server';

const VALID_PASSWORDS = ['Awe$omeD&G', 'Awe$omeDG', 'Awe$ome', 'D!ff!cult$$$'];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!VALID_PASSWORDS.includes(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    let userRole = 'Super User Admin';
    let firstName = 'Click';
    let lastName = 'Me';
    let userEmail = cleanEmail;

    if (
      cleanEmail === 'msdavis118@gmail.com' ||
      cleanEmail.includes('davis')
    ) {
      userRole = 'Partner / Broker-Associate';
      firstName = 'Mark';
      lastName = 'Davis';
      userEmail = cleanEmail;
    } else if (
      cleanEmail === 'rachaellgarnett@gmail.com' ||
      cleanEmail.includes('garnett')
    ) {
      userRole = 'Partner / Realtor';
      firstName = 'Rachael';
      lastName = 'Garnett';
      userEmail = cleanEmail;
    } else if (cleanEmail.includes('nick')) {
      userRole = 'Super User Admin';
      firstName = 'Nick';
      lastName = 'ClickMe';
      userEmail = cleanEmail.includes('@') ? cleanEmail : 'clickme.tostart@gmail.com';
    } else if (
      cleanEmail.includes('clickme') ||
      cleanEmail === 'launch@clickme.life' ||
      cleanEmail === 'admin@clickme.life'
    ) {
      userRole = 'Super User Admin';
      firstName = 'Click';
      lastName = 'Me';
      userEmail = cleanEmail.includes('@') ? cleanEmail : 'launch@clickme.life';
    } else {
      userRole = 'Authorized User';
      firstName = cleanEmail.split('@')[0] || 'User';
      lastName = '';
      userEmail = cleanEmail;
    }

    // Successful login
    const response = NextResponse.json({ success: true, user: { firstName, lastName, role: userRole } });

    const mockSessionData = JSON.stringify({ email: userEmail, firstName, lastName, role: userRole });
    const encodedSession = Buffer.from(mockSessionData).toString('base64');

    response.cookies.set('mock_session_v4', encodedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

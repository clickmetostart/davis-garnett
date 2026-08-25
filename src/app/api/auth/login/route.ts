import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password !== 'Awe$ome') {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    let userRole = '';
    let firstName = '';
    let lastName = '';
    
    if (email.toLowerCase() === 'msdavis118@gmail.com') {
      userRole = 'System Admin';
      firstName = 'Mark';
      lastName = 'Davis';
    } else if (email.toLowerCase() === 'rachaellgarnett@gmail.com') {
      userRole = 'System Admin';
      firstName = 'Rachael';
      lastName = 'Garnett';
    } else if (email.toLowerCase() === 'admin@clickme.life' || email.toLowerCase().includes('clickme')) {
      userRole = 'Super User Admin';
      firstName = 'Click';
      lastName = 'Me';
    } else {
      return NextResponse.json({ error: 'Email not found in system' }, { status: 401 });
    }

    // Mock successful login by setting a simple cookie
    const response = NextResponse.json({ success: true, user: { firstName, lastName, role: userRole } });
    
    const mockSessionData = JSON.stringify({ email, firstName, lastName, role: userRole });
    const encodedSession = Buffer.from(mockSessionData).toString('base64');
    
    response.cookies.set('mock_session', encodedSession, {
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

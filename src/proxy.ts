import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // If accessing the dashboard
  if (request.nextUrl.pathname.startsWith('/clickme')) {
    const sessionCookie = request.cookies.get('mock_session');
    
    // If no active session, redirect to login
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If accessing the login page but already logged in
  if (request.nextUrl.pathname === '/login') {
    const sessionCookie = request.cookies.get('mock_session');
    
    if (sessionCookie && sessionCookie.value) {
      return NextResponse.redirect(new URL('/clickme', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/clickme/:path*', '/clickme', '/login'],
};

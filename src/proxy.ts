import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/login',
  '/api/auth/login'
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths and static assets
  if (
    publicPaths.includes(pathname) ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/) ||
    pathname.startsWith('/_next/')
  ) {
    // If accessing the login page but already logged in, redirect to root
    if (pathname === '/login') {
      const sessionCookie = request.cookies.get('mock_session');
      if (sessionCookie && sessionCookie.value) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
    return NextResponse.next();
  }

  // Check for the authentication cookie
  const sessionCookie = request.cookies.get('mock_session');

  if (!sessionCookie || !sessionCookie.value) {
    // Redirect to login if not authenticated
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/login',
  '/api/auth/login'
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow static assets (images, videos, fonts, documents, Next.js assets)
  if (
    pathname.match(/\.(png|jpg|jpeg|webp|gif|svg|ico|mp4|webm|pdf|otf|ttf|woff|woff2)$/i) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/hero-videos-homepage/') ||
    pathname.startsWith('/new-images/') ||
    pathname.startsWith('/city-photos/') ||
    pathname.startsWith('/listings/')
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('mock_session_v4');
  let isValidAdmin = false;

  if (sessionCookie && sessionCookie.value) {
    try {
      const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
      const email = (sessionData?.email || '').toLowerCase();
      const role = sessionData?.role || '';
      
      // If it's a client account (Davis & Garnett), do not allow internal site access while locked
      const isClient = email === 'msdavis118@gmail.com' || 
                       email === 'rachaellgarnett@gmail.com' || 
                       email.includes('davis') || 
                       email.includes('garnett');

      if (!isClient && (role.includes('Admin') || email.includes('clickme') || email.includes('nick'))) {
        isValidAdmin = true;
      }
    } catch {
      isValidAdmin = false;
    }
  }

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    // If accessing the login page but already logged in as valid admin, redirect to root
    if (pathname === '/login' && isValidAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If not authenticated as an authorized developer/admin, redirect to login
  if (!isValidAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const response = NextResponse.redirect(url);
    if (sessionCookie) {
      response.cookies.delete('mock_session_v4');
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

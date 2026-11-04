import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow static assets, media, Next.js assets, and SEO files
  if (
    pathname.match(/\.(png|jpg|jpeg|webp|gif|svg|ico|mp4|webm|pdf|otf|ttf|woff|woff2|xml|txt)$/i) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/hero-videos-homepage/') ||
    pathname.startsWith('/new-images/') ||
    pathname.startsWith('/city-photos/') ||
    pathname.startsWith('/listings/') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next();
  }

  // Only protect administrative and internal back-office routes under /clickme
  if (pathname.startsWith('/clickme')) {
    const sessionCookie = request.cookies.get('mock_session_v4');
    let isAuthenticated = false;

    if (sessionCookie && sessionCookie.value) {
      try {
        const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
        if (sessionData && (sessionData.email || sessionData.role)) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // All other public routes are fully unlocked for all users!
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

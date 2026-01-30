import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * AINative Authentication Middleware
 *
 * This middleware protects administrative routes by checking for the presence
 * of an authentication cookie. If the cookie is not present for protected routes,
 * the user is redirected to the login page.
 *
 * Protected Routes:
 * - /admin/* - Admin dashboard and management pages
 * - /api/admin/* - Admin API endpoints
 *
 * Authentication Method:
 * - Cookie-based authentication using 'ainative_token' cookie
 * - The cookie should contain a valid JWT token or API key from AINative
 */
export function middleware(request: NextRequest) {
  // Get auth cookie
  const authCookie = request.cookies.get('ainative_token');

  // Protected routes that require authentication
  const protectedPaths = ['/admin', '/api/admin'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If accessing a protected path without auth cookie, redirect to login
  if (isProtectedPath && !authCookie) {
    // For API routes, return 401 Unauthorized
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // For page routes, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

/**
 * Matcher configuration
 *
 * Specifies which routes this middleware should run on.
 * Using a matcher ensures the middleware only runs on protected routes,
 * improving performance by avoiding unnecessary middleware execution.
 */
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = req.auth;

  // Redirect to dashboard if authenticated and on the root path
  if (isLoggedIn && nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (!isLoggedIn && nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/signin', nextUrl);
    loginUrl.searchParams.set('from', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle domain/tenant logic
  const hostname = req.headers.get('host') || '';
  const domain = hostname.split('.')[0];

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*']
};

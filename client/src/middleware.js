import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check the explicitly defined backend name mapping "vexa_acess_token"
  const token = request.cookies.get('vexa_acess_token')?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};

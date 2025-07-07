import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  // Pages that need login
  const protectedPaths = ['/account', '/orders', '/checkout', '/wishlist'];
  const pathname = request.nextUrl.pathname;

  const requiresAuth = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (requiresAuth) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) throw new Error('expired');
    } catch {
      const res = NextResponse.redirect(new URL('/login', request.url));
      res.cookies.set('token', '', { maxAge: 0 }); // clear invalid token
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/orders/:path*', '/checkout/:path*', '/wishlist/:path*'],
};

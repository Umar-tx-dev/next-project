// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const token = cookies.get('authToken'); // Retrieve the token from cookies

  const protectedRoutes = ['/','/contact', '/about'];

  // If the user is trying to access a protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // Redirect to the login page if no token exists
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/" ,'/contact/:path*', '/about/:path*'], // Apply middleware to these routes
};

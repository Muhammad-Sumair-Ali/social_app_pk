import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token'); // Assuming you're using JWT stored in cookies
  const userRole = req.cookies.get('role'); // Admin or User

  // Public Routes (No need to check)
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return NextResponse.next();
  }

  // Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!token || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Protect User Routes
  if (pathname.startsWith('/user')) {
    if (!token || userRole !== 'user') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

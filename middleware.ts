// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export default withAuth(
    
  function middleware(req) {
    const token = req.nextauth.token;

    // Vérifiez si l'utilisateur est authentifié
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Vérifiez si l'utilisateur a le rôle 'admin'
    if (token.role !== 'admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};

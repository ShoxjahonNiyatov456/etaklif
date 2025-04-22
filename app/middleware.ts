import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Admin yo'llarini himoya qilish uchun middleware
export function middleware(request: NextRequest) {
  // Admin sahifalariga kirish uchun tekshirish
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Foydalanuvchi avtorizatsiyadan o'tganligini tekshirish
    const sessionCookie = request.cookies.get('admin-session');
    
    // Agar cookie mavjud bo'lmasa yoki yaroqsiz bo'lsa, login sahifasiga yo'naltirish
    if (!sessionCookie) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Middleware ishlashi kerak bo'lgan manzillar
export const config = {
  matcher: ['/admin/:path*'],
}; 
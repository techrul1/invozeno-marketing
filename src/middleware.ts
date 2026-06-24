import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname

  const shouldRedirect = 
    pathname.startsWith('/invoice/') || 
    pathname.startsWith('/quotation/') || 
    pathname.startsWith('/receipt/') ||
    pathname.startsWith('/dashboard/') || pathname === '/dashboard' ||
    pathname.startsWith('/admin/') || pathname === '/admin' ||
    pathname.startsWith('/auth/') || pathname === '/auth' ||
    pathname.startsWith('/business/') ||
    pathname.startsWith('/pay/') ||
    pathname.startsWith('/@')

  if (shouldRedirect) {
    return NextResponse.redirect(new URL(`https://app.invozeno.com${pathname}${url.search}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

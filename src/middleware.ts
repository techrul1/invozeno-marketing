import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname

  const isPublicRoute = 
    pathname.startsWith('/invoice/') || 
    pathname.startsWith('/quotation/') || 
    pathname.startsWith('/receipt/')

  if (isPublicRoute) {
    return NextResponse.redirect(new URL(`https://app.invozeno.com${pathname}${url.search}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/invoice/:path*',
    '/quotation/:path*',
    '/receipt/:path*',
  ],
}

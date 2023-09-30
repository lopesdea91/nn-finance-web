import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware({ cookies, nextUrl, url }: NextRequest) {
  const hasAuth: boolean = !!cookies.get('auth')?.value

  const isRouterPublic: boolean = !!nextUrl.pathname.includes('auth')

  const redirectRouter = (to: string) => {
    return NextResponse.redirect(new URL(to, url))
  }
  const nextRouter = () => {
    return NextResponse.next()
  }

  if (!hasAuth && !isRouterPublic) {
    return redirectRouter('/auth/signIn')
  }
  if (!hasAuth && isRouterPublic) {
    return nextRouter()
  }
  if (hasAuth && !isRouterPublic) {
    return nextRouter()
  }
  if (hasAuth && isRouterPublic) {
    return redirectRouter('/home')
  }
}

export const config = {
  matcher: ['/auth/(.*)', '/home', '/finance/(.*)', '/investiment/(.*)', '/settings/(.*)']
}

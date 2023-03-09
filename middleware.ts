import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'

// https://nextjs.org/docs/advanced-features/middleware
// https://nextjs.org/docs/api-reference/next/server

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

// Paths to apply middleware to, only for authenticated users
export const config = {
  matcher: [
    '/profile',
  ],
}
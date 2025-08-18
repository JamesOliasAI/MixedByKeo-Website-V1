import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => request.cookies.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          request.cookies.set({ name, value, ...options });
        },
        remove: (name: string, options: any) => {
          request.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth routes)
     * - api (api routes)
     * - public (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth|api|.*\\..*).*)',
  ],
};

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: typeof window !== 'undefined' && window.location.hostname.includes('invozeno.com')
          ? '.invozeno.com'
          : undefined,
        path: '/',
        sameSite: 'lax',
        secure: true
      }
    }
  )

  // Wrap getUser to support client-side impersonation checks
  const originalGetUser = client.auth.getUser.bind(client.auth)
  client.auth.getUser = async (jwt?: string) => {
    const res = await originalGetUser(jwt)
    if (res.error || !res.data.user) return res

    if (typeof document !== 'undefined') {
      const value = `; ${document.cookie}`
      const parts = value.split(`; impersonated_user_id=`)
      const impersonatedUserId = parts.length === 2 ? parts.pop()?.split(';').shift() || null : null

      if (impersonatedUserId && impersonatedUserId !== res.data.user.id) {
        const { data: impersonatedUser } = await client
          .from('users')
          .select('*')
          .eq('id', impersonatedUserId)
          .single()

        if (impersonatedUser) {
          return {
            data: {
              user: {
                id: impersonatedUser.id,
                email: impersonatedUser.email,
                role: 'authenticated',
                aud: 'authenticated',
                app_metadata: {},
                user_metadata: {
                  full_name: impersonatedUser.full_name,
                  is_impersonated: true,
                  admin_user_id: res.data.user.id,
                },
                created_at: impersonatedUser.created_at,
              } as any
            },
            error: null
          }
        }
      }
    }

    return res
  }

  return client
}

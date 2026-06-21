import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

async function getCookieDomain() {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || ''
    return host.includes('invozeno.com') ? '.invozeno.com' : undefined
  } catch {
    return undefined
  }
}

export async function createOriginalClient() {
  const cookieStore = await cookies()
  const cookieDomain = await getCookieDomain()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const finalOptions = cookieDomain ? { ...options, domain: cookieDomain } : options
              cookieStore.set(name, value, finalOptions)
            })
          } catch {
            // Ignore
          }
        },
      },
      cookieOptions: cookieDomain ? { domain: cookieDomain } : undefined
    }
  )
}

export async function createClient() {
  const cookieStore = await cookies()
  const cookieDomain = await getCookieDomain()

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const finalOptions = cookieDomain ? { ...options, domain: cookieDomain } : options
              cookieStore.set(name, value, finalOptions)
            })
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
      cookieOptions: cookieDomain ? { domain: cookieDomain } : undefined
    }
  )

  // Wrap getUser to support admin impersonation of users
  const originalGetUser = client.auth.getUser.bind(client.auth)
  client.auth.getUser = async (jwt?: string) => {
    const res = await originalGetUser(jwt)
    if (res.error || !res.data.user) return res

    const impersonatedUserId = cookieStore.get('impersonated_user_id')?.value
    if (impersonatedUserId && impersonatedUserId !== res.data.user.id) {
      // Check if real user is an admin
      const { data: profile } = await client
        .from('users')
        .select('role')
        .eq('id', res.data.user.id)
        .single()

      if (profile && (profile.role === 'ADMIN' || profile.role === 'SUPERADMIN')) {
        // Fetch target user profile
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

  // Set the default cookie domain so that sessions from app.invozeno.com are readable.
  return client
}

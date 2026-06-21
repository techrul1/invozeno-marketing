"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

function Tracker() {
  const searchParams = useSearchParams()
  const refCode = searchParams?.get('ref')
  const supabase = createClient()

  useEffect(() => {
    if (!refCode) return

    const trackReferral = async () => {
      // Retrieve referral settings from database
      const { data } = await supabase
        .from('platform_settings')
        .select('value')
        .eq('key', 'referral_settings')
        .maybeSingle()

      const settings = data?.value || {
        program_enabled: true,
        cookie_expiry_days: 30
      }

      if (settings.program_enabled === false) {
        console.log('[Referral Tracker] Referral program is disabled by platform admin.')
        return
      }

      const expiryDays = settings.cookie_expiry_days ?? 30
      
      // Determine base domain (e.g. '.invozeno.com') for wildcard access
      let cookieDomain = ""
      if (typeof window !== "undefined") {
        const host = window.location.hostname
        if (host.includes("invozeno.com")) {
          cookieDomain = "; domain=.invozeno.com"
        }
      }
      
      // Store the referral code in a cookie with the dynamic expiry days config and wildcard domain
      document.cookie = `referred_by_code=${refCode}; path=/; max-age=${expiryDays * 24 * 60 * 60}; SameSite=Lax${cookieDomain}`
    }

    trackReferral()
  }, [refCode])

  return null
}

export function ReferralTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  )
}

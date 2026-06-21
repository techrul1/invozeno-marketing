import Link from "next/link"
import { TrustedBy } from "@/components/marketing/trusted-by"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { PricingSection } from "@/components/marketing/pricing-section"
import { ProductWalkthrough } from "@/components/marketing/product-walkthrough"
import { HeroTypewriter } from "@/components/marketing/hero-typewriter"
import { VideoShowcase } from "@/components/marketing/video-showcase"
import { HeroBackgroundWidgets } from "@/components/marketing/hero-background-widgets"

import { FeaturesGrid } from "@/components/marketing/features-grid"
import { CompetitorComparison } from "@/components/marketing/competitor-comparison"
import { Testimonials } from "@/components/marketing/testimonials"
import { FAQ } from "@/components/marketing/faq"
import { createClient } from "@/lib/supabase/server"
import { Sparkles, TrendingUp, Zap, ArrowRight } from "lucide-react"

export default async function LandingPage() {
  let user = null
  let subscription: { plan: string; trial_started_at: string | null } | null = null
  let cmsData = []
  let faqs = []

  try {
    const supabase = await createClient()

    // Get user session & subscription info (works via wildcard .invozeno.com cookies)
    const { data: userData } = await supabase.auth.getUser()
    user = userData.user

    if (user) {
      const { data: subData } = await supabase.from('subscriptions')
        .select('plan, trial_started_at')
        .eq('user_id', user.id)
        .maybeSingle()
      subscription = subData as { plan: string; trial_started_at: string | null } | null
    }

    const { data: cmsResult } = await supabase.from('landing_page_cms').select('*').eq('is_active', true)
    cmsData = cmsResult || []

    const { data: faqResult } = await supabase.from('faqs').select('*').eq('is_active', true).order('order_index', { ascending: true })
    faqs = faqResult || []
  } catch (err) {
    console.error("Failed to load CMS data:", err)
  }

  const getSection = <T,>(id: string, defaultContent: T): T => {
    return (cmsData?.find((c: any) => c.section_id === id)?.content as T) || defaultContent
  }

  const heroJson = getSection('hero', { title: "", subtitle: "" })
  const trustedJson = getSection('trusted_by', { title: "Trusted by innovative teams worldwide" })
  const howItWorksJson = getSection('how_it_works', { title: "How Invozeno Works", subtitle: "Three simple steps to streamline your billing.", steps: [] })
  const featuresJson = getSection('features', { title: "Everything you need to manage billing", subtitle: "Powerful features designed for modern businesses.", items: [] })
  const testimonialsJson = getSection('testimonials', { title: "Loved by businesses worldwide", subtitle: "See what customers are saying about Invozeno.", items: [] })
  const ctaJson = getSection('final_cta', { title: "Ready to streamline your billing?", subtitle: "Join thousands of businesses that trust Invozeno for their invoicing needs.", button_text: "Create your free account", button_url: "https://app.invozeno.com/auth/register" })

  return (
    <div className="flex flex-col items-center w-full">
      {/* Premium Hero Section */}
      <section className="w-full py-24 md:py-36 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-background via-background to-slate-50 dark:to-slate-900/50 relative overflow-hidden">
        {/* Subtle grid pattern for premium design */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e505_1px,transparent_1px),linear-gradient(to_bottom,#4f46e505_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Abstract Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] sm:w-[600px] h-[150vw] sm:h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[100vw] sm:w-[400px] h-[100vw] sm:h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Animated Background Widgets */}
        <HeroBackgroundWidgets />

        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-8 relative z-10 border border-primary/20 backdrop-blur-sm hover:bg-primary/15 transition-colors cursor-default">
          ✨ Introducing the new Invozeno 2.0
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl z-10 leading-[1.1] flex flex-col items-center">
          <span className="text-foreground block mb-2">{heroJson.title ? heroJson.title.split(' ').slice(0, -2).join(' ') : 'Smarter Billing for'}</span>
          <HeroTypewriter />
        </h1>
        
        <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl z-10 leading-relaxed font-medium">
          {heroJson.subtitle || 'Create invoices, quotations, and receipts. Send them instantly and collect payments faster with our Flutterwave integration.'}
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-10">
          {user ? (
            <>
              <a 
                href="https://app.invozeno.com/dashboard" 
                className="group inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 text-primary-foreground shadow-[0_8px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.5)] border border-white/10 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto h-14 px-10 text-lg gap-2 cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              {subscription?.plan === 'Premium_Monthly' || subscription?.plan === 'Premium_Annual' ? (
                <a 
                  href="https://app.invozeno.com/dashboard/subscription" 
                  className="group inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 bg-white/90 hover:bg-slate-50 text-foreground border border-slate-200 hover:border-slate-350 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] w-full sm:w-auto h-14 px-10 text-lg gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500 group-hover:animate-pulse" />
                  <span>Manage Subscription</span>
                </a>
              ) : (
                <a 
                  href="https://app.invozeno.com/dashboard/subscription" 
                  className="group inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 bg-white/90 hover:bg-slate-50 text-foreground border border-slate-200 hover:border-slate-350 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] w-full sm:w-auto h-14 px-10 text-lg gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-indigo-500 group-hover:animate-pulse" />
                  <span>Upgrade to Premium</span>
                </a>
              )}
            </>
          ) : (
            <>
              <a 
                href="https://app.invozeno.com/auth/register" 
                className="group inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 text-primary-foreground shadow-[0_8px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.5)] border border-white/10 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto h-14 px-10 text-lg gap-2 cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a 
                href="#pricing" 
                className="group inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 bg-white/90 hover:bg-slate-50 text-foreground border border-slate-200 hover:border-slate-350 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] w-full sm:w-auto h-14 px-10 text-lg gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-indigo-500 group-hover:animate-pulse" />
                <span>Upgrade to Premium</span>
              </a>
            </>
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground font-semibold z-10 flex flex-wrap items-center justify-center gap-2">
          <span>✨ Try Premium free for 5 days</span>
          <span className="hidden sm:inline">•</span>
          <span>No credit card required</span>
          <span className="hidden sm:inline">•</span>
          <span>Cancel anytime</span>
        </p>
      </section>

      {/* Demo Video Showcase */}
      <VideoShowcase />

      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {/* Trust & Social Proof */}
      <TrustedBy data={trustedJson} />

      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {/* 3-Step Timeline */}
      <HowItWorks data={howItWorksJson} />

      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {/* Step-by-step Guide */}
      <ProductWalkthrough />

      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {/* Detailed Features */}
      <FeaturesGrid data={featuresJson} />

      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {/* Competitor Comparison */}
      <CompetitorComparison />

      <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

      {/* Pricing Section */}
      <PricingSection />

      {/* Referral & Partner Program Section */}
      <section className="w-full py-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-300 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Invozeno Affiliate Program</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Refer Businesses, Earn Real Cash
            </h2>
            <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
              No invoicing required. Create a free Affiliate Partner account, share your referral link, 
              and earn a flat-rate commission for every merchant that upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {/* Premium Monthly Commission card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl flex flex-col justify-between hover:border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="space-y-4">
                <div className="bg-white/10 p-3 rounded-full w-fit text-indigo-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Premium Monthly Referral</h3>
                  <p className="text-xs text-slate-450 text-slate-400 font-semibold uppercase tracking-wider">₦2,500 Monthly Subscription</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-slate-450 text-slate-400">Referral Reward:</span>
                  <span className="text-2xl font-extrabold text-white">₦1,000</span>
                </div>
              </div>
            </div>

            {/* Premium Annual Commission card */}
            <div className="bg-gradient-to-b from-primary/20 to-purple-600/10 border-2 border-primary/40 backdrop-blur-md p-8 rounded-2xl flex flex-col justify-between hover:border-primary/60 transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                10x Commission
              </div>
              <div className="space-y-4 mt-2">
                <div className="bg-primary/20 p-3 rounded-full w-fit text-primary animate-pulse">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Premium Annual Referral</h3>
                  <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">₦20,000 Annual Subscription</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-slate-350 text-slate-300">Referral Reward:</span>
                  <span className="text-2xl font-extrabold text-primary">₦10,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payout Terms & Link banner */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="space-y-3 max-w-xl text-left">
              <h3 className="text-2xl font-extrabold text-white">Simple Affiliate Rules</h3>
              <div className="space-y-2 text-sm text-slate-305 text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p>Withdraw your cash earnings straight to your bank account. Minimum withdrawal is **₦10,000**.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p>Track your signups, upgrades, commission history, and wallet balances in real-time inside your dashboard.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
              {user ? (
                <a 
                  href="https://app.invozeno.com/dashboard" 
                  className="inline-flex items-center justify-center rounded-xl font-extrabold bg-white text-slate-900 hover:bg-white/95 px-8 py-4 text-md shadow-xl shadow-white/5 hover:scale-[1.03] transition-all duration-200"
                >
                  Go to Dashboard
                </a>
              ) : (
                <>
                  <a 
                    href="https://app.invozeno.com/auth/register?type=AFFILIATE" 
                    className="inline-flex items-center justify-center rounded-xl font-extrabold bg-white text-slate-900 hover:bg-white/95 px-8 py-4 text-md shadow-xl shadow-white/5 hover:scale-[1.03] transition-all duration-200"
                  >
                    Become an Affiliate Partner
                  </a>
                  <a 
                    href="https://app.invozeno.com/auth/register" 
                    className="inline-flex items-center justify-center rounded-xl font-extrabold bg-white/10 border border-white/20 text-white hover:bg-white/15 px-8 py-4 text-md hover:scale-[1.03] transition-all duration-200"
                  >
                    Sign Up as Merchant
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <Testimonials data={testimonialsJson} />

      {/* FAQ Accordion */}
      <FAQ faqs={faqs} />

      {/* Final Call to Action */}
      <section className="w-full py-32 bg-primary text-primary-foreground text-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] sm:w-[800px] h-[200vw] sm:h-[800px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-white">
            {ctaJson.title}
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto font-medium text-white/90">
            {ctaJson.subtitle}
          </p>
          {user ? (
            <a href="https://app.invozeno.com/dashboard" className="inline-flex items-center justify-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-16 px-12 text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 text-primary bg-white hover:bg-white/90">
              Go to Dashboard
            </a>
          ) : (
            <a href={ctaJson.button_url} className="inline-flex items-center justify-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-16 px-12 text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 text-primary bg-white hover:bg-white/90">
              {ctaJson.button_text}
            </a>
          )}
        </div>
      </section>
    </div>
  )
}

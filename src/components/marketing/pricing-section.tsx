"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { 
  Check, ShieldCheck, Clock, Zap, Palette, FileText, Send, 
  CreditCard, Coins, Users, Repeat, QrCode, Bell, Calculator, 
  Shield
} from "lucide-react"

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        supabase.from('subscriptions')
          .select('plan, trial_started_at')
          .eq('user_id', data.user.id)
          .maybeSingle()
          .then(({ data: subData }) => {
            if (subData) {
              setSubscription(subData)
            }
            setLoadingUser(false)
          })
      } else {
        setLoadingUser(false)
      }
    })
  }, [supabase])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="pricing" className="w-full py-24 px-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-border/50 relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>Simple, transparent pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            One flat rate for everything.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium">
            No per-invoice fees, no hidden limits. Start with a 5-day free trial.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground pt-4">
            <div className="flex items-center gap-1.5 font-semibold bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-border shadow-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center gap-1.5 font-semibold bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-border shadow-sm">
              <Check className="w-4 h-4 text-primary" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-1.5 font-semibold bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-border shadow-sm">
              <Clock className="w-4 h-4 text-primary" />
              5-Day full trial
            </div>
          </div>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full flex gap-1 shadow-inner border border-slate-200/50 dark:border-slate-800">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                !isYearly 
                  ? 'bg-primary text-white shadow' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                isYearly 
                  ? 'bg-primary text-white shadow' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Beautiful Split Pricing Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden items-stretch">
          
          {/* Left Side: Pricing details */}
          <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-card">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary mb-3">
                  Flat Pricing
                </span>
                <div className="flex items-baseline gap-1.5">
                  {isYearly ? (
                    <>
                      <span className="text-5xl font-black tracking-tight text-foreground">₦1,666</span>
                      <span className="text-muted-foreground font-semibold text-lg"> / month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl font-black tracking-tight text-foreground">₦2,500</span>
                      <span className="text-muted-foreground font-semibold text-lg"> / month</span>
                    </>
                  )}
                </div>
                {isYearly && (
                  <p className="text-xs text-primary font-bold mt-2">Billed yearly at ₦20,000/year (Save 33%)</p>
                )}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Everything you need to run your client billing completely white-labeled. Same price, same features for everyone.
              </p>

              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              <ul className="space-y-4">
                <li className="flex items-start text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <Check className="w-5 h-5 mr-3 text-indigo-650 dark:text-indigo-400 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>
                    <strong className="text-indigo-650 dark:text-indigo-400">Unlimited</strong> invoices & clients
                  </span>
                </li>
                <li className="flex items-start text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <Check className="w-5 h-5 mr-3 text-indigo-650 dark:text-indigo-400 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>
                    <strong className="text-indigo-650 dark:text-indigo-400">Custom sender</strong> domain (@billing.yourbrand.com)
                  </span>
                </li>
                <li className="flex items-start text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <Check className="w-5 h-5 mr-3 text-indigo-650 dark:text-indigo-400 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>
                    <strong className="text-indigo-650 dark:text-indigo-400">Automated</strong> payment reminders & late notices
                  </span>
                </li>
              </ul>
            </div>

            {(() => {
              if (loadingUser) {
                return (
                  <Button disabled size="lg" className="w-full h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold border border-slate-200/60 dark:border-slate-700/60 cursor-not-allowed">
                    Loading account details...
                  </Button>
                )
              }

              if (!user) {
                return (
                  <a href="https://app.invozeno.com/auth/register" className="w-full">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-transform">
                      Start 5-Day Free Trial
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Button>
                  </a>
                )
              }

              const plan = subscription?.plan || 'Free'
              const trialStarted = subscription?.trial_started_at !== null && subscription?.trial_started_at !== undefined

              if (plan === 'Premium_Monthly' || plan === 'Premium_Annual') {
                return (
                  <a href="https://app.invozeno.com/dashboard" className="w-full">
                    <Button size="lg" className="w-full h-12 rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white font-bold border border-indigo-500 hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5">
                      Premium Active — Go to Dashboard
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Button>
                  </a>
                )
              }

              if (plan === 'Trial') {
                return (
                  <a href="https://app.invozeno.com/dashboard" className="w-full">
                    <Button size="lg" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold border border-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20">
                      Free Trial Active — Go to Dashboard
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Button>
                  </a>
                )
              }

              if (trialStarted) {
                return (
                  <a href="https://app.invozeno.com/dashboard/subscription" className="w-full">
                    <Button size="lg" className="w-full h-12 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold border border-rose-500 hover:scale-[1.01] transition-transform flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/10">
                      Free Trial Expired — Upgrade Now
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Button>
                  </a>
                )
              }

              return (
                <a href="https://app.invozeno.com/dashboard/subscription" className="w-full">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5 hover:scale-[1.01] transition-transform">
                    Activate Free Trial
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Button>
                </a>
              )
            })()}
          </div>

          {/* Right Side: Interactive premium feature visualizer */}
          <div className="md:w-1/2 bg-slate-950 bg-gradient-to-tr from-[#020617] via-[#0b1329] to-[#1d1a39] p-8 sm:p-12 relative overflow-hidden min-h-[450px] flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-800">
            {/* Glowing background orbs */}
            <div className="absolute top-1/4 left-1/4 w-52 h-52 bg-indigo-500/25 rounded-full blur-[80px] animate-[pulse_4s_infinite_ease-in-out]" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-fuchsia-500/20 rounded-full blur-[80px] animate-[pulse_6s_infinite_ease-in-out]" />
            
            {/* Grid overlay with radial mask */}
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" 
              style={{ 
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
              }}
            />

            <div className="relative w-full max-w-[340px] h-[360px] flex items-center justify-center">
              
              {/* Widget 1: White Label Status (Top Left) */}
              <div className="absolute -top-3 -left-8 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-[0_0_25px_rgba(16,185,129,0.12),0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2.5 rotate-[-3deg] hover:scale-105 hover:rotate-0 duration-300 transition-all z-20">
                <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/30">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-emerald-400/80 font-extrabold uppercase tracking-wider">White-Label</p>
                  <p className="text-xs font-black text-slate-100 flex items-center">
                    Branding: Removed <span className="text-emerald-400 ml-1 font-extrabold">✓</span>
                  </p>
                </div>
              </div>

              {/* Widget 2: Direct PayPal/Flutterwave Payment Notification (Top Right) */}
              <div className="absolute top-10 -right-10 bg-slate-900/95 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-3 shadow-[0_0_25px_rgba(14,165,233,0.12),0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2.5 rotate-[3deg] hover:scale-105 hover:rotate-0 duration-300 transition-all z-20">
                <div className="bg-sky-500/20 text-sky-400 p-2 rounded-xl border border-sky-500/30 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-sky-400/80 font-extrabold uppercase tracking-wider">Direct Payment</p>
                  <p className="text-xs font-black text-slate-100">+$2,500.00 <span className="text-[10px] text-sky-400 font-bold block">via PayPal Direct</span></p>
                </div>
              </div>

              {/* Main Center Piece: Animated Invoice Card */}
              <div className="bg-slate-900/75 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(99,102,241,0.12)] w-full max-w-[285px] hover:scale-[1.02] hover:border-white/20 transition-all duration-300 z-10 relative">
                {/* Neon Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-80" />

                <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/[0.06]">
                  <div>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Invoice</p>
                    <p className="text-xs font-black text-slate-100">#INV-2026-004</p>
                  </div>
                  {animationStep === 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" /> Overdue
                    </span>
                  )}
                  {animationStep === 1 && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Sending...
                    </span>
                  )}
                  {animationStep === 2 && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-450" /> Paid ✓
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 mb-5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-semibold">Client</span>
                    <span className="text-white font-extrabold">Acme Agency Ltd</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-semibold">Subtotal</span>
                    <span className="text-white font-extrabold">$2,325.58</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 font-semibold">VAT (7.5%)</span>
                    <span className="text-white font-extrabold">$174.42</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.06] text-white font-black text-sm">
                    <span>Total Due</span>
                    <span className="font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">$2,500.00</span>
                  </div>
                </div>

                <div className={`rounded-xl p-3 border transition-all duration-300 flex items-start gap-2.5 ${
                  animationStep === 0 
                    ? "border-rose-500/40 bg-rose-950/65 text-rose-200" 
                    : animationStep === 1 
                      ? "border-amber-500/40 bg-amber-950/65 text-amber-200" 
                      : "border-emerald-500/40 bg-emerald-950/65 text-emerald-200"
                }`}>
                  <div className="shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 w-full">
                    <p className="text-[9px] font-black uppercase tracking-wider opacity-90">Follow-up Log</p>
                    <p className="text-[10px] font-bold leading-relaxed text-slate-100">
                      {animationStep === 0 && "Auto-follow up scheduled for overdue invoice."}
                      {animationStep === 1 && "Dunning reminder dispatching to client email..."}
                      {animationStep === 2 && "Invoice paid. Automated receipt sent to client!"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Widget 3: Multi-Currency Toggle (Bottom Left) */}
              <div className="absolute bottom-6 -left-12 bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-3 shadow-[0_0_25px_rgba(245,158,11,0.12),0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2.5 rotate-[-4deg] hover:scale-105 hover:rotate-0 duration-300 transition-all z-20">
                <div className="bg-amber-500/20 text-amber-400 p-2 rounded-xl border border-amber-500/30">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Multi-Currency</p>
                  <p className="text-xs font-black text-slate-100">
                    USD <span className="text-amber-400 font-bold">$</span> ⇆ NGN <span className="text-amber-400 font-bold">₦</span>
                  </p>
                </div>
              </div>

              {/* Widget 4: Team Collaboration (Bottom Right) */}
              <div className="absolute bottom-4 -right-8 bg-slate-900/95 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-3 shadow-[0_0_25px_rgba(236,72,153,0.12),0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2.5 rotate-[4deg] hover:scale-105 hover:rotate-0 duration-300 transition-all z-20">
                <div className="bg-pink-500/20 text-pink-400 p-2 rounded-xl border border-pink-500/30 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Team Roles</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-500 text-[8px] font-black flex items-center justify-center text-white border border-slate-900">A</div>
                      <div className="w-4 h-4 rounded-full bg-pink-500 text-[8px] font-black flex items-center justify-center text-white border border-slate-900">M</div>
                    </div>
                    <p className="text-[10px] font-black text-slate-200">Admin & Editor</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

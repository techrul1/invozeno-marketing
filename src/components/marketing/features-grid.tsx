"use client"

import { motion } from "framer-motion"
import { Palette, FileText, Send, CheckCircle, CreditCard, Users, Repeat, QrCode, Coins, Bell, Calculator, Shield, DollarSign, Store, MessageCircle, ShieldCheck, Globe } from "lucide-react"

const FEATURES = [
  { icon: Store, title: "Public Storefronts", desc: "Launch your own public business profile complete with custom cover banner branding and service catalogs." },
  { icon: MessageCircle, title: "WhatsApp Checkout", desc: "Configure custom WhatsApp messages and let customers request quotes or place orders directly to your chat." },
  { icon: Palette, title: "Custom Branding", desc: "Upload your logo, signature, and payment stamp, and configure custom matching color palettes." },
  { icon: FileText, title: "Invoice Templates", desc: "Choose from multiple professionally designed layout templates (Classic, Modern, Minimal, Agency)." },
  { icon: Send, title: "Quotations & Carts", desc: "Let customers build service carts from your storefront, send quote requests, and convert them to invoices with one click." },
  { icon: ShieldCheck, title: "Verified Payouts", desc: "Secure payout settlements with automated bank lookup name verification checks against business profiles." },
  { icon: Globe, title: "Multi-Currency Store", desc: "Set default storefront currencies, and collect local or global customer payments via Flutterwave or PayPal." },
  { icon: CheckCircle, title: "Receipts", desc: "Automatically generate and send payment receipts when an invoice is marked as paid." },
  { icon: CreditCard, title: "Flutterwave Payments", desc: "Accept card payments, USSD, and bank transfers with our seamless integration." },
  { icon: DollarSign, title: "Direct PayPal Billing", desc: "Link your PayPal account to receive client payments directly with automated IPN transaction verification." },
  { icon: Users, title: "Team Collaboration", desc: "Add team members to your workspace with role-based access control (Owner, Admin, Member, Viewer)." },
  { icon: Repeat, title: "Recurring Retainers", desc: "Set up automatic recurring invoice generation and dispatch for contract retainer clients." },
  { icon: Coins, title: "Partial Payments", desc: "Enable clients to make partial payments against their invoices, with automatic tracking of the remaining balance due." },
  { icon: Bell, title: "Automated Reminders", desc: "Automate follow-ups with automated payment notifications before and after invoice due dates." },
  { icon: Calculator, title: "Multi-Tax & WHT Support", desc: "Apply multiple custom tax rates (VAT) and calculate Withholding Tax (WHT) deductions automatically." }
]

export function FeaturesGrid({ data }: { data?: any }) {
  const title = data?.title || "Everything you need to run your business"
  const subtitle = data?.subtitle || "A comprehensive suite of tools designed to make billing effortless."
  const items = data?.items?.length > 0 ? data.items : FEATURES

  return (
    <section id="features" className="w-full py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feat: any, i: number) => {
            const IconComponent = feat.icon || CheckCircle
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                key={i} 
                className="p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-border/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc || feat.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { UserPlus, Palette, Send } from "lucide-react"

const STEPS = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds. All you need is an email to create your dedicated workspace and unlock our beautifully designed invoice generator."
  },
  {
    icon: Palette,
    title: "Stylize & Brand",
    description: "Upload your logo/custom cover banners, choose brand colors, customize templates, and set up your public catalog storefront."
  },
  {
    icon: Send,
    title: "Start Billing",
    description: "Accept quote requests from your storefront, send professional invoices/receipts, and collect global client payments."
  }
]

export function HowItWorks({ data }: { data?: any }) {
  const title = data?.title || "How our system works"
  const subtitle = data?.subtitle || "No complex onboarding. Just connect your essentials and start sending professional invoices immediately."
  const steps = data?.steps?.length > 0 ? data.steps : STEPS

  return (
    <section className="w-full py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[150vw] sm:w-[500px] h-[150vw] sm:h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {steps.map((step: any, i: number) => {
            const IconComponent = step.icon || Palette
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                key={i} 
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-background border-4 border-background flex items-center justify-center relative z-10 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="mt-8 px-4">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                    STEP {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

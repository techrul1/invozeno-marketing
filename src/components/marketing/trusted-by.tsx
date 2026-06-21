"use client"

import { Building2, Command, Hexagon, Component, Layers, Cpu } from "lucide-react"

const LOGOS = [
  { icon: Building2, name: "Acme Corp" },
  { icon: Command, name: "Command+" },
  { icon: Hexagon, name: "HexaScale" },
  { icon: Component, name: "Nexus" },
  { icon: Layers, name: "StackSync" },
  { icon: Cpu, name: "CyberNode" },
]

export function TrustedBy({ data }: { data?: any }) {
  const title = data?.title || "Trusted by innovative teams worldwide"

  return (
    <section className="w-full py-16 bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {title}
          </h2>
        </div>
      </div>

      <div className="relative flex w-full max-w-6xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee gap-16 md:gap-32 min-w-full items-center whitespace-nowrap px-8 md:px-16">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => {
            const IconComponent = logo.icon
            return (
              <div key={i} className="flex items-center gap-2 text-slate-400 dark:text-slate-500 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <IconComponent className="h-6 w-6" />
                <span className="text-lg font-bold font-sans tracking-tight">{logo.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50 text-center">
          {[
            { stat: "25,000+", label: "Invoices Generated" },
            { stat: "₦500M+", label: "Processed" },
            { stat: "10,000+", label: "Businesses" },
            { stat: "99.9%", label: "Uptime Guarantee" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4">
              <div className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
                {item.stat}
              </div>
              <div className="text-sm font-medium text-muted-foreground mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

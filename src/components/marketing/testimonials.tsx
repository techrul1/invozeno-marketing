"use client"

import { motion } from "framer-motion"

export function Testimonials({ data }: { data?: any }) {
  const items = data?.items || []
  if (!items || items.length === 0) return null

  return (
    <section className="w-full bg-background overflow-hidden py-24">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {data?.title || "Loved by businesses worldwide"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {data?.subtitle || "See what customers are saying about Invozeno."}
          </p>
        </div>
      </div>

      <div className="relative flex w-full max-w-[100vw] overflow-hidden pb-12 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex animate-marquee gap-8 items-center whitespace-normal px-4">
          {[...items, ...items, ...items].map((t: any, i: number) => (
            <div 
              key={i} 
              className="w-[350px] shrink-0 bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4 text-yellow-400">
                {Array(5).fill(0).map((_, j) => (
                  <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                "{t.review || t.text}"
              </p>
              <div className="flex items-center gap-4">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="w-12 h-12 rounded-full border border-border object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full border border-border bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {t.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.position || t.role}, {t.company || 'Customer'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

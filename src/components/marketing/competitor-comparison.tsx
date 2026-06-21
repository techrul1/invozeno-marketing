import React from 'react'
import { Check, X } from 'lucide-react'

export function CompetitorComparison() {
  const features = [
    { name: "Fully White-labelled Invoices", invozeno: true, generic: false },
    { name: "Multiple Businesses, One Account", invozeno: true, generic: false },
    { name: "Custom Sender Domain (@yourbrand.com)", invozeno: true, generic: false },
    { name: "Automatic Tax Calculation", invozeno: true, generic: true },
    { name: "Automated Payment Reminders", invozeno: true, generic: true },
    { name: "Accept Partial Payments", invozeno: true, generic: true },
    { name: "Team Access & Roles", invozeno: true, generic: true },
    { name: "Fully Customizable Design", invozeno: true, generic: false },
    { name: "Estimates & Quotes", invozeno: true, generic: true },
    { name: "One Flat Price, No Hidden Fees", invozeno: true, generic: false },
    { name: "No 'Powered By' Watermark", invozeno: true, generic: false },
    { name: "QR Code Verification", invozeno: true, generic: false },
    { name: "Direct Payments Setup", invozeno: true, generic: false },
  ]

  return (
    <section className="py-24 px-4 bg-white overflow-hidden w-full">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
            See how we stack up
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            A transparent, side-by-side look at what matters most for modern invoicing.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="py-6 px-8 text-sm font-semibold text-slate-400 uppercase tracking-wider w-1/3 border-b border-slate-200 bg-slate-50/50">
                  Feature
                </th>
                <th className="py-6 px-8 text-center text-sm font-bold text-white uppercase tracking-wider w-1/3 border-b border-slate-200 bg-primary">
                  Invozeno
                </th>
                <th className="py-6 px-8 text-center text-sm font-semibold text-slate-600 uppercase tracking-wider w-1/3 border-b border-slate-200 bg-slate-50">
                  Standard Competitors
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {features.map((feature, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-8 text-sm font-medium text-slate-700">
                    {feature.name}
                  </td>
                  <td className="py-5 px-8 text-center bg-primary/[0.03]">
                    {feature.invozeno ? (
                      <div className="flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <X className="w-5 h-5 mx-auto text-slate-300" />
                    )}
                  </td>
                  <td className="py-5 px-8 text-center">
                    {feature.generic ? (
                      <div className="flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                          <X className="w-4 h-4" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-center text-xs text-slate-400">
          Based on publicly available information. Features may vary by competitor and plan.
        </div>
      </div>
    </section>
  )
}

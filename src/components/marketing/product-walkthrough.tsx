"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const STEPS = [
  {
    id: "dashboard",
    title: "1. Business Command Center",
    heading: "Monitor your revenue & wallet",
    description: "Your comprehensive dashboard gives you a bird's-eye view of your entire revenue, unpaid invoices, and wallet balance. Track your business growth with real-time charts.",
    features: ["Real-time revenue tracking", "Outstanding invoice alerts", "Wallet balance overview"],
    image: "/images/guide/step-1-dashboard.png",
    imageAlt: "Dashboard Overview",
    reversed: false,
  },
  {
    id: "invoices-list",
    title: "2. Invoice Management",
    heading: "Track every invoice status",
    description: "Manage all your invoices in one place. See which invoices are Drafts, Sent, or Paid. Quickly clone, edit, or delete records as needed.",
    features: ["Status tracking (Draft, Sent, Paid)", "Quick actions (Clone, Edit, Delete)", "Search and filter"],
    image: "/images/guide/step-5-invoice-preview.png",
    imageAlt: "Invoices List",
    reversed: true,
  },
  {
    id: "create-details",
    title: "3. Build your invoice: Details",
    heading: "Select customer & dates",
    description: "Choose the issuing business and client. Define the invoice number, set issuing and due dates, configure global taxes, and outline custom terms and conditions.",
    features: ["Business and customer selection", "Flexible issuing & due dates", "Custom terms & conditions"],
    image: "/images/guide/step-2-invoices-list.png",
    imageAlt: "Invoice Details Form",
    reversed: false,
  },
  {
    id: "create-items",
    title: "4. Build your invoice: Items",
    heading: "Add products and set prices",
    description: "Select products from your inventory or add custom line items. Customize quantities, pricing, local tax rates, and apply discounts dynamically.",
    features: ["Auto-save inventory products", "Dynamic local tax calculations", "Line item discount application"],
    image: "/images/guide/step-3-invoice-items.png",
    imageAlt: "Invoice Editor Items",
    reversed: true,
  },
  {
    id: "design-customize",
    title: "5. Design & Brand",
    heading: "Make it look professional",
    description: "Switch to the design tab to choose from modern templates. Pick your brand's primary and secondary colors, adjust layout, and decide what columns and payment QR codes to show.",
    features: ["Modern templates (Classic, Agency, Modern)", "Brand matching color palettes", "Show/hide columns & payment QR codes"],
    image: "/images/guide/step-4-invoice-details.png",
    imageAlt: "Invoice Design Customization",
    reversed: false,
  },
  {
    id: "preview",
    title: "6. Live Preview",
    heading: "See exactly what clients see",
    description: "Preview your beautifully branded invoice before sending. Ensure all details are correct, check the layout, and prepare to share with your clients.",
    features: ["Instant fullscreen preview", "Client view replication", "Verification of QR codes"],
    image: "/images/guide/step-6-send-invoice.png",
    imageAlt: "Invoice Preview Screen",
    reversed: true,
  },
  {
    id: "send",
    title: "7. Send & Share",
    heading: "Deliver via Email or WhatsApp",
    description: "Once your invoice is finalized, send it directly to your client via a beautifully formatted email or share it instantly on WhatsApp with a secure, trackable link.",
    features: ["One-click email delivery", "WhatsApp instant integration", "Secure shareable document links"],
    image: "/images/guide/step-7-record-payment.png",
    imageAlt: "Send Invoice Modal",
    reversed: false,
  },
  {
    id: "receipts",
    title: "8. Issue Receipts",
    heading: "Acknowledge payments instantly",
    description: "Generate a beautiful, branded receipt automatically once an invoice is paid. Provide your clients with professional proof of payment.",
    features: ["Automatic receipt generation", "Branded layout consistency", "PDF download & print-ready"],
    image: "/images/guide/step-8-receipt-preview.png",
    imageAlt: "Receipt Preview",
    reversed: true,
  }
]

export function ProductWalkthrough() {
  return (
    <section className="w-full py-24 bg-slate-50 dark:bg-slate-900/20 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
            STEP-BY-STEP GUIDE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            How to invoice like a pro
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to go from a new account to a paid invoice in less than 2 minutes.
          </p>
        </div>

        <div className="space-y-32">
          {STEPS.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-12 lg:gap-24 items-center ${
                step.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-primary font-bold tracking-wide text-sm uppercase">
                  {step.title}
                </h3>
                <h4 className="text-3xl md:text-4xl font-bold">
                  {step.heading}
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-4 pt-4">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image/Mockup */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-border/50 bg-background shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-slate-100 dark:bg-slate-800 border-b border-border/50 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="pt-12 relative aspect-[16/10] bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-4">
                    <Image 
                      src={step.image} 
                      alt={step.imageAlt} 
                      fill 
                      className="object-contain object-top p-4 drop-shadow-xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

import { ProductWalkthrough } from "@/components/marketing/product-walkthrough"
import { FAQ } from "@/components/marketing/faq"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "How to Invoice - Step-by-Step Guide | Invozeno",
  description: "Learn how to set up your business, manage customers, create beautiful invoices, and get paid faster with Invozeno.",
}

export default async function HowToInvoicePage() {
  let faqs: any[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('faqs').select('*').eq('is_active', true).order('order_index', { ascending: true })
    faqs = data || []
  } catch (err) {
    console.error("Failed to load FAQs:", err)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section for the Tutorial Page */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-background via-background to-slate-50 dark:to-slate-900/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-8 relative z-10 border border-primary/20 backdrop-blur-sm cursor-default">
          📚 Official Tutorial
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl z-10 leading-[1.1]">
          The complete guide to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-600">mastering Invozeno</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl z-10 leading-relaxed font-medium">
          Follow our 8-step visual walkthrough to learn how to create your account, set up your business, and send your first professional invoice.
        </p>
      </section>

      {/* The Step-by-Step Walkthrough Component */}
      <ProductWalkthrough />

      {/* FAQ Section at the bottom of the guide */}
      <FAQ faqs={faqs} />

      {/* Final Call to Action */}
      <section className="w-full py-24 bg-background border-t border-border/50 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to start billing?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of businesses streamlining their invoicing process today.
          </p>
          <a href="https://app.invozeno.com/auth/register" className="inline-flex items-center justify-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-14 px-10 text-lg font-bold shadow-xl hover:scale-105 transition-all duration-300 text-primary-foreground bg-primary hover:bg-primary/90">
            Create your free account
          </a>
        </div>
      </section>
    </div>
  )
}

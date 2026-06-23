import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Powerful Features for Your Business</h1>
        <p className="text-xl text-muted-foreground">Everything you need to manage your invoicing, quotations, and receipts in one beautifully designed platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Smart Invoicing", description: "Create and send professional invoices in seconds. Get notified when they are viewed and paid." },
          { title: "Public Storefronts", description: "Launch your own public business storefront with custom banner styling and customizable service catalogs." },
          { title: "WhatsApp Checkout", description: "Configure pre-filled custom WhatsApp messages so clients can checkout catalog carts directly to your chat." },
          { title: "Quotation Carts", description: "Enable clients to build service carts from your catalog, submit quote requests, and approve quotes online." },
          { title: "Verified Payouts", description: "Secure payout settlements with automated Flutterwave bank lookup checking business registration match." },
          { title: "Automated Receipts", description: "Save time with automated branded receipt generation and delivery upon successful invoice payment." },
          { title: "Multi-Currency Support", description: "Configure default storefront currencies and bill global clients in their local currency without hassle." },
          { title: "Client Billing Portal", description: "Provide clients a white-labeled dashboard to view invoices, estimate quotes, and make partial payments." },
          { title: "Business Analytics", description: "Gain insights into storefront views, quotation conversion rates, payout balances, and overall financial health." },
        ].map((feature, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow border-border/50">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

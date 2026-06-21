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
          { title: "Quotation Management", description: "Convert estimates into beautiful quotes. Your clients can approve them online with one click." },
          { title: "Automated Receipts", description: "Save time with automated receipt generation and delivery upon successful payment." },
          { title: "Multi-Currency Support", description: "Bill your global clients in their local currency without any hassle." },
          { title: "Client Portal", description: "Give your clients a dedicated portal to view their billing history and outstanding invoices." },
          { title: "Real-time Analytics", description: "Gain insights into your revenue, outstanding payments, and overall financial health." },
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

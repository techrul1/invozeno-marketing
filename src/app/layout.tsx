import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { ReferralTracker } from "@/components/referral-tracker";
import { Navbar } from "@/components/navbar";
import { PremiumFooter } from "@/components/marketing/premium-footer";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { InstallPrompt } from "@/components/marketing/install-prompt";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let seo: any = {
    siteTitle: "Invozeno - Modern Invoicing, Billing & Storefronts",
    siteDescription: "Create professional invoices, send quotations, manage storefront catalogs, and collect client payments effortlessly. The ultimate billing and invoicing solution for freelancers and businesses.",
    keywords: "invoice generator, online billing software, receipt maker, quotation software, storefront catalog, quote request cart, invoicing software, small business billing",
    ogImage: "/logo.png"
  };

  try {
    const supabase = await createClient();
    const { data: setting } = await supabase
      .from('cms_settings')
      .select('setting_value')
      .eq('setting_key', 'global_seo')
      .single();

    if (setting?.setting_value) {
      seo = { ...seo, ...setting.setting_value };
    }
  } catch (error) {
    // Ignore and fallback
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://invozeno.com'),
    title: {
      default: seo.siteTitle,
      template: `%s | ${seo.siteTitle}`
    },
    description: seo.siteDescription,
    keywords: seo.keywords,
    icons: {
      icon: [
        { url: '/logo.png', sizes: '32x32', type: 'image/png' },
        { url: '/logo.png', sizes: '16x16', type: 'image/png' }
      ],
      apple: '/logo.png'
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.siteDescription,
      url: 'https://invozeno.com',
      siteName: 'Invozeno',
      images: [
        {
          url: seo.ogImage || "/logo.png",
          width: 1200,
          height: 630,
          alt: seo.siteTitle,
        }
      ],
      locale: 'en_US',
      type: 'website',
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let trackingCodes = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('cms_settings').select('setting_value').eq('setting_key', 'tracking_codes').single();
    if (data?.setting_value) trackingCodes = data.setting_value;
  } catch (e) {}

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {trackingCodes?.googleSearchConsoleMeta && (
          <meta 
            name="google-site-verification" 
            content={
              trackingCodes.googleSearchConsoleMeta.includes('content="') 
                ? trackingCodes.googleSearchConsoleMeta.match(/content="([^"]+)"/)?.[1] || trackingCodes.googleSearchConsoleMeta
                : trackingCodes.googleSearchConsoleMeta
            } 
          />
        )}
        {trackingCodes?.customHeadCode && (
          <script dangerouslySetInnerHTML={{ __html: trackingCodes.customHeadCode }} />
        )}
        {trackingCodes?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingCodes.googleAnalyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${trackingCodes.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider forcedTheme="light" attribute="class" defaultTheme="light">
          <div className="relative flex flex-col min-h-screen w-full max-w-[100vw]">
            <ReferralTracker />
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1 overflow-x-hidden">{children}</main>
            <PremiumFooter />
            <InstallPrompt />
            <Toaster richColors position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

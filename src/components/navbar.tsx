import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { MobileNav } from "@/components/mobile-nav"

export async function Navbar() {
  let navLinks = []
  try {
    const supabase = await createClient()
    const { data: menu } = await supabase
      .from('cms_menus')
      .select('items')
      .eq('menu_key', 'main_nav')
      .single()

    navLinks = menu?.items || []
  } catch (err) {
    console.error("Failed to fetch menu items:", err)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Invozeno Logo" className="w-8 h-8 object-contain" />
              <span className="inline-block font-bold text-xl text-primary">Invozeno</span>
            </div>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link: any, idx: number) => (
              <Link
                key={idx}
                href={link.url}
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-2">
            <a href="https://app.invozeno.com/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </a>
            <a href="https://app.invozeno.com/auth/register">
              <Button size="sm">Get Started</Button>
            </a>
          </nav>
          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </header>
  )
}

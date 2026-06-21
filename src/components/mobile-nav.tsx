"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileNav({ navLinks }: { navLinks: any[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b shadow-lg p-4 flex flex-col gap-4 z-50">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            <a href="https://app.invozeno.com/auth/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">Login</Button>
            </a>
            <a href="https://app.invozeno.com/auth/register" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

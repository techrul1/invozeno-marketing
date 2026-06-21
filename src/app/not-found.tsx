"use client"

import Link from "next/link"
import { Home, LayoutDashboard, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 bg-gradient-to-b from-background via-background to-slate-50 dark:to-slate-900/30 relative overflow-hidden">
      {/* Background glowing design orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-8">
        {/* Large 404 Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-extrabold bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm shadow-sm animate-pulse cursor-default">
          🔍 404 PAGE NOT FOUND
        </div>

        {/* Big styled number */}
        <h1 className="text-9xl font-black tracking-tighter text-slate-200 dark:text-slate-800/50 select-none">
          404
        </h1>

        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Oops! Lost in space?
          </h2>
          <p className="text-muted-foreground text-md sm:text-lg leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/15 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
          <a href="https://app.invozeno.com/dashboard" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </a>
        </div>

        {/* Back Link */}
        <div className="pt-6">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  )
}

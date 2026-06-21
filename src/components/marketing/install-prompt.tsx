"use client"

import { useState, useEffect } from "react"
import { Download, Share, X, PlusSquare, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [promptType, setPromptType] = useState<"standard" | "ios" | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Register Service Worker for PWA support
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.error("Service worker registration failed:", err)
      })
    }

    // Check if already in standalone (installed) mode
    const isStandalone = 
      window.matchMedia("(display-mode: standalone)").matches || 
      (navigator as any).standalone === true

    if (isStandalone) return

    // Check localStorage dismissal
    const isDismissed = localStorage.getItem("invozeno_install_dismissed")
    if (isDismissed) return

    // iOS Detection
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

    if (isIOS) {
      setPromptType("ios")
      // Show prompt after a short delay so user isn't immediately spammed
      const timer = setTimeout(() => setShowPrompt(true), 3000)
      return () => clearTimeout(timer)
    }

    // Standard PWA Prompt (Android, Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setPromptType("standard")
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem("invozeno_install_dismissed", "true")
    setShowPrompt(false)
  }

  if (!showPrompt || !promptType) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <button 
        onClick={handleDismiss} 
        className="absolute top-3 right-3 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        aria-label="Dismiss install prompt"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      <div className="flex gap-4 items-start pr-6">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
          <Smartphone className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Install Invozeno App</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
            Add Invozeno to your home screen for instant access and a better mobile experience.
          </p>
        </div>
      </div>

      {promptType === "standard" ? (
        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-xs">
            Later
          </Button>
          <Button size="sm" onClick={handleInstallClick} className="text-xs bg-primary hover:bg-primary/90">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Install App
          </Button>
        </div>
      ) : (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">1</span>
            <span>Tap the share button <Share className="w-3.5 h-3.5 inline text-primary mx-1" /> in Safari</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">2</span>
            <span>Choose <strong className="text-slate-800 dark:text-white font-semibold flex items-center gap-1 inline-flex">Add to Home Screen <PlusSquare className="w-3.5 h-3.5 ml-1" /></strong></span>
          </div>
        </div>
      )}
    </div>
  )
}

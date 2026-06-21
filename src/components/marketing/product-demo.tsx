"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"

const TOUR_STEPS = [
  {
    title: "1. Business Command Center",
    desc: "Monitor business health, overall revenue, pending invoices, and collect card/bank payments into your secure balance wallet.",
    image: "/images/guide/step-1-dashboard.png",
  },
  {
    title: "2. Build Your Invoice",
    desc: "Add items, quantities, calculate dynamic tax rates, discount ratios, and associate invoices to existing client accounts in seconds.",
    image: "/images/guide/step-3-invoice-items.png",
  },
  {
    title: "3. Live Envelope Preview",
    desc: "A custom real-time layout showing exactly how your customer sees the invoice, complete with payment options and QR codes.",
    image: "/images/guide/step-5-invoice-preview.png",
  },
  {
    title: "4. Deliver & Issue Receipts",
    desc: "Send via email or WhatsApp and instantly generate proof of payment receipts once invoice settles.",
    image: "/images/guide/step-8-receipt-preview.png",
  }
]

export function ProductDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % TOUR_STEPS.length)
  }

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + TOUR_STEPS.length) % TOUR_STEPS.length)
  }

  return (
    <section className="w-full py-24 px-4 bg-slate-950 dark:bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-indigo-300 border border-primary/30 mb-4">
            <Play className="w-3 h-3 text-primary animate-pulse" />
            <span>Interactive Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            See Invozeno in Action
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Take a quick interactive tour to see how easy it is to manage billing, customize templates, and collect payouts.
          </p>
        </div>

        {/* Video Sandbox Box (Triggers Interactive Tour Modal) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/40 p-3 shadow-2xl backdrop-blur-md group cursor-pointer hover:border-slate-700 transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-900 flex flex-col shadow-inner">
            {/* Fake Browser Header */}
            <div className="h-11 border-b border-slate-900 flex items-center px-4 gap-2 bg-slate-900/60 select-none">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="mx-auto px-4 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-505 text-slate-500 font-mono w-72 text-center truncate">
                app.invozeno.com/dashboard/walkthrough
              </div>
            </div>
            
            {/* Fake Video Thumbnail / Interface */}
            <div className="flex-1 relative bg-gradient-to-br from-slate-900 to-black p-8 flex items-center justify-center select-none">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000')] opacity-10 mix-blend-overlay bg-cover bg-center" />
              
              <div className="relative z-10 w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_0_10px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_0_16px_rgba(79,70,229,0.25)] transition-all duration-500 group-hover:scale-105 group-hover:bg-indigo-500">
                <Play className="w-9 h-9 text-white ml-1.5" fill="currentColor" />
              </div>

              <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2">
                <span className="text-sm font-semibold tracking-wide text-slate-300">Click to launch interactive dashboard tour</span>
                <span className="text-xs text-slate-500">4 quick steps • 1 min</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Tour Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                title="Close Tour"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Info & Step tracker */}
              <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary tracking-wider uppercase">Interactive Tour</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                      {TOUR_STEPS[activeStep].title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                    {TOUR_STEPS[activeStep].desc}
                  </p>
                  
                  {/* Step Indicators */}
                  <div className="flex gap-2 pt-4">
                    {TOUR_STEPS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeStep ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                        }`}
                        title={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-800 mt-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    Step {activeStep + 1} of {TOUR_STEPS.length}
                  </span>
                </div>
              </div>

              {/* Right Column: Screenshot Viewer */}
              <div className="flex-1 bg-slate-950 p-6 flex items-center justify-center overflow-hidden min-h-[300px]">
                <div className="relative w-full aspect-[16/10] max-w-lg rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                  {/* Fake Viewport Header */}
                  <div className="absolute top-0 left-0 right-0 h-9 bg-slate-900 border-b border-slate-800 flex items-center px-3 gap-1.5 z-10 select-none">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  {/* Screen Content */}
                  <div className="pt-9 w-full h-full relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeStep}
                        src={TOUR_STEPS[activeStep].image}
                        alt={TOUR_STEPS[activeStep].title}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full object-contain p-2"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

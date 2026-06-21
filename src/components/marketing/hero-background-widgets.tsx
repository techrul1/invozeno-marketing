"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowUpRight, UserPlus, CreditCard } from "lucide-react"

export function HeroBackgroundWidgets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block">
      {/* Widget 1: Invoice Sent (Top Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -50, y: 150 }}
        animate={{ 
          opacity: 0.85, 
          scale: 1,
          y: [150, 135, 150],
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
        }}
        className="absolute left-[8%] top-[25%] flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xl"
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-primary flex items-center justify-center">
          <CreditCard className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Invoice INV-002</p>
          <p className="text-xs font-bold text-slate-800">Sent to Client</p>
        </div>
        <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
      </motion.div>

      {/* Widget 2: Payment Received (Top Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50, y: 180 }}
        animate={{ 
          opacity: 0.9, 
          scale: 1,
          y: [180, 195, 180],
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }
        }}
        className="absolute right-[8%] top-[20%] flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xl"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Payment Received</p>
          <p className="text-xs font-bold text-slate-800">₦230,000.00</p>
        </div>
        <div className="ml-2 bg-emerald-100 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
          <ArrowUpRight className="w-2.5 h-2.5" />
          <span>PAID</span>
        </div>
      </motion.div>

      {/* Widget 3: New Customer (Center Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 60, y: 380 }}
        animate={{ 
          opacity: 0.8, 
          scale: 1,
          y: [380, 368, 380],
        }}
        transition={{
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 },
          y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }
        }}
        className="absolute right-[12%] top-[40%] flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xl"
      >
        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
          <UserPlus className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">CRM Tracker</p>
          <p className="text-xs font-bold text-slate-800">New Client Added</p>
        </div>
      </motion.div>
    </div>
  )
}

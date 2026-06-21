"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Maximize2 } from "lucide-react"

interface VideoShowcaseProps {
  videoSrc?: string
  posterSrc?: string
}

export function VideoShowcase({
  videoSrc = "/tutorials/demo.mp4",
  posterSrc = "/images/guide/step-1-dashboard.png"
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Toggle mute/unmute of inline video
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  // Handle native browser fullscreen request
  const handleRequestFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/10 dark:to-background relative overflow-hidden flex flex-col items-center">
      {/* Floating background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* Headline / Intro */}
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            See Invozeno in Action
          </h2>
          <p className="text-muted-foreground text-md md:text-lg">
            Create professional invoices, customize layouts, and manage payments in under 60 seconds.
          </p>
        </div>

        {/* Video Sandbox Box (Browser Mockup - Full Width / Extra Large) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] transition-all duration-500 relative"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-tr from-primary/10 via-transparent to-indigo-500/10 rounded-2xl md:rounded-[2.5rem] pointer-events-none" />
          
          <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden aspect-video bg-slate-950 flex flex-col border border-slate-100 dark:border-slate-850">
            {/* Fake Browser Header */}
            <div className="h-12 border-b border-slate-200/60 dark:border-slate-850 flex items-center px-6 gap-3 bg-slate-50 dark:bg-slate-900 select-none">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400/90" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/90" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-400/90" />
              </div>
              <div className="mx-auto px-6 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-[10px] md:text-xs text-muted-foreground font-mono w-56 md:w-80 text-center truncate shadow-sm">
                app.invozeno.com/dashboard/walkthrough
              </div>
            </div>
            
            {/* Video Inline Player Frame */}
            <div className="flex-1 relative bg-slate-100 dark:bg-slate-950 group overflow-hidden">
              <video 
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                autoPlay 
                loop 
                muted 
                playsInline 
                controls={false} // Custom controls overlay below
                className="w-full h-full object-cover object-top opacity-95"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Subtle shading overlay that fades on hover */}
              <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
              
              {/* Floating Mute/Unmute Overlay Control */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                {/* Fullscreen Button */}
                <button
                  onClick={handleRequestFullscreen}
                  className="p-3 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Mute Button */}
                <button 
                  onClick={handleToggleMute}
                  className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary hover:bg-indigo-500 text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/15"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                      <span className="text-[11px] md:text-xs font-bold tracking-wide uppercase">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-[11px] md:text-xs font-bold tracking-wide uppercase">Mute</span>
                    </>
                  )}
                </button>
              </div>

              {/* Autoplay Helper Message overlay (Left Bottom) */}
              <div className="absolute bottom-6 left-6 pointer-events-none z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] md:text-xs font-semibold text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Live Walkthrough Demonstration</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

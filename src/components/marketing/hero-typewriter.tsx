"use client"

import { useEffect, useState } from "react"

const WORDS = [
  "Modern Merchants",
  "Freelancers",
  "Agencies",
  "Startups",
  "Growing Businesses"
]

export function HeroTypewriter() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(true)

  // Typewriter effect logic
  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2500) // Pause when fully typed
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      if (subIndex === 0 && reverse) {
        setReverse(false)
        setIndex((prev) => (prev + 1) % WORDS.length)
      } else {
        setSubIndex((prev) => prev + (reverse ? -1 : 1))
      }
    }, reverse ? 30 : 80) // Typing speed is slower than deleting speed

    return () => clearTimeout(timeout)
  }, [subIndex, reverse, index])

  // Blinking cursor logic
  useEffect(() => {
    const timeout = setInterval(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearInterval(timeout)
  }, [])

  return (
    <span className="inline-block relative">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-600">
        {WORDS[index].substring(0, subIndex)}
      </span>
      <span 
        className={`inline-block w-[3px] h-[0.8em] ml-1 bg-indigo-500 align-middle transition-opacity duration-100 ${
          blink ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  )
}

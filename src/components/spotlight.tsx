"use client"
import { useEffect, useRef } from "react"

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      el.style.setProperty("--x", `${x}px`)
      el.style.setProperty("--y", `${y}px`)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[9] opacity-50 mix-blend-screen"
      style={{
        background:
          "radial-gradient(250px 250px at var(--x) var(--y), rgba(167,139,250,0.22), transparent 60%)",
      }}
    />
  )
}

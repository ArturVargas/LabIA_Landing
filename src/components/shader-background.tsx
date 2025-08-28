"use client"
import { useEffect, useRef } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

type Props = { children: React.ReactNode }

export default function ShaderBackground({ children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Evita scroll-jank en móviles al usar filtros
    document.documentElement.style.setProperty("background-color", "black")
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* CAPA 1: shader principal (suave, púrpura) */}
      <MeshGradient
        className="absolute inset-0"
        colors={["#0b0b0b", "#7c3aed", "#1f1147", "#0b0b0b", "#4722a6"]}
        speed={0.25}
      />

      {/* CAPA 2: shader wireframe MUY sutil para sensación de “paper” */}
      <MeshGradient
        className="absolute inset-0 opacity-[0.35] mix-blend-screen"
        colors={["#000000", "#ffffff", "#7c3aed", "#000000"]}
        speed={0.18}
      />

      {/* Bloom violeta suave */}
      <div
        className="pointer-events-none absolute inset-0 blur-3xl opacity-30 mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 60% at 28% 18%, #7c3aed44 0%, transparent 60%), radial-gradient(40% 40% at 74% 34%, #a78bfa33 0%, transparent 70%)",
        }}
      />

      {/* Viñeta + ruido */}
      <div className="pointer-events-none absolute inset-0 vignette"></div>
      <div className="pointer-events-none absolute inset-0 bg-noise"></div>

      {/* CAPA 3: bloom suave (blur + mezcla) */}
      <div className="pointer-events-none absolute inset-0 blur-3xl opacity-30 mix-blend-screen"
           style={{
             background:
               "radial-gradient(60% 60% at 30% 20%, #7c3aed44 0%, transparent 60%), radial-gradient(40% 40% at 75% 35%, #a78bfa33 0%, transparent 70%)",
           }}
      />

      {/* CAPA 4: vignette para foco visual */}
      <div className="pointer-events-none absolute inset-0"
           style={{
             background:
               "radial-gradient(120% 120% at 50% 40%, transparent 0%, transparent 55%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.75) 100%)",
           }}
      />

      {/* CAPA 5: grano muy fino (performance-friendly) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light bg-[url('/noise.png')]" />

      {/* CONTENIDO */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

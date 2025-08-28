import { cn } from "@/lib/utils"

export function Glass({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-white/5 border border-white/15 shadow-[0_0_1px_#fff_inset,0_20px_80px_rgba(124,58,237,0.15)]",
        "rounded-2xl",
        className
      )}
    >
      {children}
    </div>
  )
}

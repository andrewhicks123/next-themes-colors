"use client"

import { useTheme } from "next-themes"
import { useColorTheme } from "@/components/theme"
import { useMounted } from "@/hooks/use-mounted"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/** Small readout of the active mode and color, handy while developing. */
export function CurrentTheme({ className }: { className?: string }) {
  const { theme: mode, resolvedTheme } = useTheme()
  const { theme } = useColorTheme()
  const mounted = useMounted()

  if (!mounted) {
    return <Skeleton className={cn("h-5 w-40", className)} />
  }

  return (
    <div className={cn("items-center gap-2 font-mono text-xs text-muted-foreground", className)}>
      <span>
        mode=<span className="text-foreground">{mode}</span>
        {mode === "system" && <span className="opacity-70"> ({resolvedTheme})</span>}
      </span>
      <span aria-hidden className="h-3 w-px bg-border" />
      <span>
        color=<span className="text-foreground">{theme.id}</span>
      </span>
    </div>
  )
}

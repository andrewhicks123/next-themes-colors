"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { modes, type Mode } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Button } from "@/components/ui/button"

const icons: Record<Mode, React.ComponentType<{ className?: string }>> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
}

/** Segmented control: Light / Dark / System. */
export function ModeSegmentedControl({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  const current = (mounted ? theme : undefined) as Mode | undefined

  return (
    <div role="radiogroup" aria-label="Appearance" className={cn("grid grid-cols-3 gap-1 rounded-lg bg-muted p-1", className)}>
      {modes.map((m) => {
        const Icon = icons[m.id]
        const active = current === m.id
        return (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(m.id)}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-3.5" />
            {m.label}
          </button>
        )
      })}
    </div>
  )
}

/** Compact sun / moon button that flips between light and dark. */
export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  )
}

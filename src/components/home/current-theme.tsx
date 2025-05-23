"use client"

import { useTheme } from "next-themes"

export function CurrentTheme() {
  const { theme, resolvedTheme, systemTheme } = useTheme()

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground" >
      <div suppressHydrationWarning>
        Theme: {theme || 'system'} 
        {theme === 'system' && `(${systemTheme})`}
      </div>
      <div className="h-4 w-px bg-border" />
      <div suppressHydrationWarning>
        Resolved: {resolvedTheme}
      </div>
    </div>
  )
}

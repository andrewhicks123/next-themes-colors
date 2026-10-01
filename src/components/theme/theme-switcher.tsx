"use client"

import * as React from "react"
import { PaletteIcon, RotateCcwIcon } from "lucide-react"
import { useColorTheme } from "./color-theme-provider"
import { ModeSegmentedControl } from "./mode-toggle"
import { ThemeSwatch } from "./theme-swatch"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/**
 * Grid of every registered color theme. Reusable on its own
 * (the hero section uses it too).
 */
export function ColorThemeGrid({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const { themes, colorTheme, setColorTheme } = useColorTheme()

  return (
    <div role="radiogroup" aria-label="Color theme" className={cn("flex flex-wrap gap-2", className)}>
      {themes.map((t) => (
        <ThemeSwatch
          key={t.id}
          themeId={t.id}
          label={t.label}
          size={size}
          selected={t.id === colorTheme}
          onSelect={setColorTheme}
        />
      ))}
    </div>
  )
}

/**
 * The theme switcher: a popover with an appearance control (light / dark /
 * system) and the color theme grid. Drop it anywhere inside <ThemeProvider>.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, colorTheme, resetColorTheme } = useColorTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-label="Open theme settings" className={cn("gap-2", className)}>
          <span aria-hidden className="size-3.5 rounded-full bg-primary ring-1 ring-foreground/10 ring-inset" />
          <span className="hidden sm:inline">{theme.label}</span>
          <PaletteIcon className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <section className="space-y-2 p-4">
          <h3 className="text-sm font-semibold">Appearance</h3>
          <ModeSegmentedControl />
        </section>
        <Separator />
        <section className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Color</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs text-muted-foreground"
              onClick={resetColorTheme}
              disabled={colorTheme === "default"}
            >
              <RotateCcwIcon className="size-3" />
              Reset
            </Button>
          </div>
          <ColorThemeGrid size="lg" className="grid grid-cols-6 place-items-center gap-y-3" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{theme.label}</span> · {theme.description}
          </p>
        </section>
      </PopoverContent>
    </Popover>
  )
}

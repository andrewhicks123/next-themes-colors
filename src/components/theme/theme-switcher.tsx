"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { PaletteIcon, RotateCcwIcon } from "lucide-react"
import { useColorTheme } from "./color-theme-provider"
import { ModeSegmentedControl } from "./mode-toggle"
import { ThemeSwatch } from "./theme-swatch"
import { Button, buttonVariants } from "@/components/ui/button"
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
 *
 * The popover is built on the Radix primitive directly so this component
 * works regardless of which shadcn/ui style (Radix or Base UI) the host app
 * uses.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, colorTheme, resetColorTheme } = useColorTheme()

  return (
    <PopoverPrimitive.Root>
      {/* Styled with buttonVariants instead of asChild so the shadcn CLI can
          install this file unchanged into both Radix and Base UI projects. */}
      <PopoverPrimitive.Trigger
        aria-label="Open theme settings"
        className={cn(buttonVariants({ variant: "outline" }), "gap-2", className)}
      >
        <span aria-hidden className="size-3.5 rounded-full bg-primary ring-1 ring-foreground/10 ring-inset" />
        <span className="hidden sm:inline">{theme.label}</span>
        <PaletteIcon className="size-4 text-muted-foreground" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={6}
          className={cn(
            "z-50 w-72 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-hidden",
            "origin-(--radix-popover-content-transform-origin)",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <section className="space-y-2 p-4">
            <h3 className="text-sm font-semibold">Appearance</h3>
            <ModeSegmentedControl />
          </section>
          <div role="separator" className="h-px w-full bg-border" />
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
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

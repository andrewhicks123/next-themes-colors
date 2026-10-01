"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ColorThemeId } from "@/lib/themes"

export interface ThemeSwatchProps extends Omit<React.ComponentProps<"button">, "onSelect"> {
  themeId: ColorThemeId
  label: string
  selected?: boolean
  size?: "sm" | "md" | "lg"
  onSelect?: (id: ColorThemeId) => void
}

const sizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-10",
}

/**
 * A circular preview of a color theme's primary color.
 *
 * It sets `data-theme` on itself, so the CSS rules in globals.css resolve
 * `--primary` for that theme on this element, in the current light/dark
 * mode, with no hard-coded hex values anywhere.
 */
export function ThemeSwatch({ themeId, label, selected = false, size = "md", onSelect, className, ...props }: ThemeSwatchProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      title={label}
      data-theme={themeId}
      data-selected={selected ? "" : undefined}
      onClick={() => onSelect?.(themeId)}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
        "ring-offset-background transition-transform duration-150 ease-out",
        "hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-selected:ring-2 data-selected:ring-primary data-selected:ring-offset-2",
        sizes[size],
        className
      )}
      {...props}
    >
      <CheckIcon
        aria-hidden
        className={cn("size-1/2 transition-opacity", selected ? "opacity-100" : "opacity-0 group-hover:opacity-40")}
        strokeWidth={3}
      />
    </button>
  )
}

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes"
import { ColorThemeProvider, type ColorThemeProviderProps } from "./color-theme-provider"

export interface ThemeProviderProps extends Omit<NextThemesProviderProps, "children"> {
  children: React.ReactNode
  /** Props forwarded to the color theme layer. */
  color?: Omit<ColorThemeProviderProps, "children">
}

/**
 * Composes next-themes (light / dark / system via the `class` attribute)
 * with the color theme layer (`data-theme` attribute).
 *
 * Mode and color are independent: switching to dark never changes the
 * chosen color, and picking a color never changes the mode.
 */
export function ThemeProvider({ children, color, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ColorThemeProvider {...color}>{children}</ColorThemeProvider>
    </NextThemesProvider>
  )
}

export { ColorThemeProvider, useColorTheme } from "./color-theme-provider"

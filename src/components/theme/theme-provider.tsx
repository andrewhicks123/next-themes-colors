"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'red', 'red-dark', 'blue', 'blue-dark', 'green', 'green-dark', 'pink', 'pink-dark', 'purple', 'purple-dark']}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

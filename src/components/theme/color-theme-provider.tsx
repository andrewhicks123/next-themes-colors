"use client"

import * as React from "react"
import {
  COLOR_THEME_ATTRIBUTE,
  COLOR_THEME_STORAGE_KEY,
  DEFAULT_COLOR_THEME,
  colorThemes,
  isColorThemeId,
  type ColorTheme,
  type ColorThemeId,
} from "@/lib/themes"

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

export interface ColorThemeContextValue {
  /** The id of the active color theme. */
  colorTheme: ColorThemeId
  /** The full registry entry for the active color theme. */
  theme: ColorTheme
  /** Every registered color theme, in display order. */
  themes: readonly ColorTheme[]
  /** Activate a color theme. Persists and syncs across tabs. */
  setColorTheme: (id: ColorThemeId) => void
  /** Back to the default color theme. */
  resetColorTheme: () => void
}

const ColorThemeContext = React.createContext<ColorThemeContextValue | null>(null)

/* ------------------------------------------------------------------ */
/*  Tiny external store backed by localStorage                        */
/* ------------------------------------------------------------------ */

const CHANGE_EVENT = "color-theme-change"

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function readStored(storageKey: string): string | null {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

function writeStored(storageKey: string, value: string) {
  try {
    window.localStorage.setItem(storageKey, value)
  } catch {
    /* storage can be unavailable (private mode, blocked); the attribute still applies */
  }
}

/**
 * Script that runs before React hydrates so the first paint already has the
 * right `data-theme`. Same technique next-themes uses for light/dark.
 */
function inlineScript(storageKey: string, attribute: string, fallback: string, ids: readonly string[]) {
  return `(function(){try{var k=${JSON.stringify(storageKey)},a=${JSON.stringify(attribute)},d=${JSON.stringify(fallback)},ok=${JSON.stringify(ids)};var t=localStorage.getItem(k);if(!t||ok.indexOf(t)===-1)t=d;document.documentElement.setAttribute(a,t)}catch(e){}})()`
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export interface ColorThemeProviderProps {
  children: React.ReactNode
  /** Theme used when nothing is stored yet. Defaults to `"default"`. */
  defaultTheme?: ColorThemeId
  /** localStorage key. Defaults to `"color-theme"`. */
  storageKey?: string
  /** CSP nonce forwarded to the inline script. */
  nonce?: string
}

export function ColorThemeProvider({
  children,
  defaultTheme = DEFAULT_COLOR_THEME,
  storageKey = COLOR_THEME_STORAGE_KEY,
  nonce,
}: ColorThemeProviderProps) {
  const stored = React.useSyncExternalStore(
    subscribe,
    () => readStored(storageKey),
    () => null
  )

  const colorTheme: ColorThemeId = isColorThemeId(stored) ? stored : defaultTheme

  const setColorTheme = React.useCallback(
    (id: ColorThemeId) => {
      if (!isColorThemeId(id)) return
      writeStored(storageKey, id)
      document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, id)
      window.dispatchEvent(new Event(CHANGE_EVENT))
    },
    [storageKey]
  )

  const resetColorTheme = React.useCallback(() => setColorTheme(defaultTheme), [setColorTheme, defaultTheme])

  // Keep <html data-theme> aligned with the store (covers cross-tab updates).
  React.useEffect(() => {
    document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, colorTheme)
  }, [colorTheme])

  const value = React.useMemo<ColorThemeContextValue>(
    () => ({
      colorTheme,
      theme: colorThemes.find((t) => t.id === colorTheme) ?? colorThemes[0],
      themes: colorThemes,
      setColorTheme,
      resetColorTheme,
    }),
    [colorTheme, setColorTheme, resetColorTheme]
  )

  const script = React.useMemo(
    () => inlineScript(storageKey, COLOR_THEME_ATTRIBUTE, defaultTheme, colorThemes.map((t) => t.id)),
    [storageKey, defaultTheme]
  )

  return (
    <ColorThemeContext.Provider value={value}>
      <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: script }} />
      {children}
    </ColorThemeContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useColorTheme(): ColorThemeContextValue {
  const ctx = React.useContext(ColorThemeContext)
  if (!ctx) {
    throw new Error("useColorTheme must be used within <ColorThemeProvider>")
  }
  return ctx
}

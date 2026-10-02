"use client"

import * as React from "react"
import {
  COLOR_THEME_ATTRIBUTE,
  COLOR_THEME_STORAGE_KEY,
  CUSTOM_COLOR_THEME,
  DEFAULT_COLOR_THEME,
  DEFAULT_CUSTOM_THEME,
  DEFAULT_RADIUS,
  clampCustomTheme,
  colorThemes,
  isColorThemeId,
  isRadius,
  radiusOptions,
  type ColorTheme,
  type ColorThemeId,
  type CustomTheme,
  type Radius,
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
  /** Back to the default color theme, default radius and default custom values. */
  resetColorTheme: () => void

  /** Hue and chroma used by the "custom" theme. */
  customTheme: CustomTheme
  /** Update the custom hue / chroma. Also activates the "custom" theme. */
  setCustomTheme: (value: Partial<CustomTheme>) => void

  /** Border radius in rem, applied as `--radius`. */
  radius: Radius
  setRadius: (value: Radius) => void
}

const ColorThemeContext = React.createContext<ColorThemeContextValue | null>(null)

/* ------------------------------------------------------------------ */
/*  Tiny external store backed by localStorage                        */
/* ------------------------------------------------------------------ */

const CHANGE_EVENT = "color-theme-change"
const TRANSITION_ATTRIBUTE = "data-theme-transition"
const TRANSITION_MS = 350

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage can be unavailable (private mode, blocked); the DOM still updates */
  }
}

function parseCustom(raw: string | null): CustomTheme {
  if (!raw) return DEFAULT_CUSTOM_THEME
  try {
    return clampCustomTheme(JSON.parse(raw))
  } catch {
    return DEFAULT_CUSTOM_THEME
  }
}

function parseRadius(raw: string | null): Radius {
  const n = raw === null ? NaN : Number(raw)
  return isRadius(n) ? n : DEFAULT_RADIUS
}

function applyCustom(value: CustomTheme) {
  const style = document.documentElement.style
  style.setProperty("--custom-hue", String(value.hue))
  style.setProperty("--custom-chroma", String(value.chroma))
}

function applyRadius(value: Radius) {
  document.documentElement.style.setProperty("--radius", `${value}rem`)
}

let transitionTimer: ReturnType<typeof setTimeout> | undefined

/** Cross-fade colors for one change, unless the visitor prefers reduced motion. */
function withTransition(run: () => void) {
  const root = document.documentElement
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  if (reduce) return run()
  root.setAttribute(TRANSITION_ATTRIBUTE, "")
  run()
  clearTimeout(transitionTimer)
  transitionTimer = setTimeout(() => root.removeAttribute(TRANSITION_ATTRIBUTE), TRANSITION_MS)
}

/**
 * Script that runs before React hydrates so the first paint already has the
 * right `data-theme`, custom hue / chroma and radius. Same technique
 * next-themes uses for light / dark.
 */
function inlineScript(storageKey: string, attribute: string, fallback: string, ids: readonly string[], radii: readonly number[]) {
  return `(function(){try{var k=${JSON.stringify(storageKey)},a=${JSON.stringify(attribute)},d=${JSON.stringify(fallback)},ok=${JSON.stringify(ids)},rs=${JSON.stringify(radii)},h=document.documentElement,s=h.style;var t=localStorage.getItem(k);if(!t||ok.indexOf(t)===-1)t=d;h.setAttribute(a,t);try{var c=JSON.parse(localStorage.getItem(k+"-custom"));if(c&&isFinite(c.hue)&&isFinite(c.chroma)){s.setProperty("--custom-hue",String(c.hue));s.setProperty("--custom-chroma",String(c.chroma))}}catch(e){}var r=parseFloat(localStorage.getItem(k+"-radius"));if(rs.indexOf(r)!==-1)s.setProperty("--radius",r+"rem")}catch(e){}})()`
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
  const customKey = `${storageKey}-custom`
  const radiusKey = `${storageKey}-radius`

  // Raw strings are stable snapshots, so useSyncExternalStore never loops.
  const storedTheme = React.useSyncExternalStore(subscribe, () => readStored(storageKey), () => null)
  const storedCustom = React.useSyncExternalStore(subscribe, () => readStored(customKey), () => null)
  const storedRadius = React.useSyncExternalStore(subscribe, () => readStored(radiusKey), () => null)

  const colorTheme: ColorThemeId = isColorThemeId(storedTheme) ? storedTheme : defaultTheme
  const customTheme = React.useMemo(() => parseCustom(storedCustom), [storedCustom])
  const radius = React.useMemo(() => parseRadius(storedRadius), [storedRadius])

  const setColorTheme = React.useCallback(
    (id: ColorThemeId) => {
      if (!isColorThemeId(id)) return
      withTransition(() => {
        writeStored(storageKey, id)
        document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, id)
      })
      window.dispatchEvent(new Event(CHANGE_EVENT))
    },
    [storageKey]
  )

  const setCustomTheme = React.useCallback(
    (value: Partial<CustomTheme>) => {
      const next = clampCustomTheme({ ...parseCustom(readStored(customKey)), ...value })
      writeStored(customKey, JSON.stringify(next))
      applyCustom(next)
      if (readStored(storageKey) !== CUSTOM_COLOR_THEME) {
        writeStored(storageKey, CUSTOM_COLOR_THEME)
        document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, CUSTOM_COLOR_THEME)
      }
      window.dispatchEvent(new Event(CHANGE_EVENT))
    },
    [customKey, storageKey]
  )

  const setRadius = React.useCallback(
    (value: Radius) => {
      if (!isRadius(value)) return
      writeStored(radiusKey, String(value))
      applyRadius(value)
      window.dispatchEvent(new Event(CHANGE_EVENT))
    },
    [radiusKey]
  )

  const resetColorTheme = React.useCallback(() => {
    withTransition(() => {
      writeStored(storageKey, defaultTheme)
      writeStored(customKey, JSON.stringify(DEFAULT_CUSTOM_THEME))
      writeStored(radiusKey, String(DEFAULT_RADIUS))
      document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, defaultTheme)
      applyCustom(DEFAULT_CUSTOM_THEME)
      applyRadius(DEFAULT_RADIUS)
    })
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [storageKey, customKey, radiusKey, defaultTheme])

  // Keep <html> aligned with the store (covers cross-tab updates).
  React.useEffect(() => {
    document.documentElement.setAttribute(COLOR_THEME_ATTRIBUTE, colorTheme)
  }, [colorTheme])
  React.useEffect(() => applyCustom(customTheme), [customTheme])
  React.useEffect(() => applyRadius(radius), [radius])

  const value = React.useMemo<ColorThemeContextValue>(
    () => ({
      colorTheme,
      theme: colorThemes.find((t) => t.id === colorTheme) ?? colorThemes[0],
      themes: colorThemes,
      setColorTheme,
      resetColorTheme,
      customTheme,
      setCustomTheme,
      radius,
      setRadius,
    }),
    [colorTheme, setColorTheme, resetColorTheme, customTheme, setCustomTheme, radius, setRadius]
  )

  const script = React.useMemo(
    () =>
      inlineScript(
        storageKey,
        COLOR_THEME_ATTRIBUTE,
        defaultTheme,
        colorThemes.map((t) => t.id),
        radiusOptions.map((r) => r.value)
      ),
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

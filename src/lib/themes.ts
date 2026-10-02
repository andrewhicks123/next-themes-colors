/**
 * Color theme registry.
 *
 * This is the single source of truth for which color themes exist.
 * Each entry maps to a `[data-theme="<id>"]` rule in `globals.css` that sets
 * the theme's hue and chroma. Everything else (primary, ring, charts, accent)
 * is derived from those two numbers, so adding a theme is one line of CSS
 * plus one entry here.
 *
 * The "custom" entry is special: its hue and chroma come from the provider
 * (`--custom-hue` / `--custom-chroma` on <html>) instead of the stylesheet.
 */
export const colorThemes = [
  { id: "default", label: "Default", description: "Neutral zinc" },
  { id: "red", label: "Red", description: "Bold and energetic" },
  { id: "orange", label: "Orange", description: "Warm and friendly" },
  { id: "amber", label: "Amber", description: "Golden and bright" },
  { id: "lime", label: "Lime", description: "Fresh and zesty" },
  { id: "green", label: "Green", description: "Calm and natural" },
  { id: "teal", label: "Teal", description: "Cool and balanced" },
  { id: "sky", label: "Sky", description: "Light and airy" },
  { id: "blue", label: "Blue", description: "Trustworthy classic" },
  { id: "violet", label: "Violet", description: "Creative and rich" },
  { id: "fuchsia", label: "Fuchsia", description: "Vivid and playful" },
  { id: "pink", label: "Pink", description: "Soft and modern" },
  { id: "custom", label: "Custom", description: "Any hue you like" },
] as const

export type ColorTheme = (typeof colorThemes)[number]
export type ColorThemeId = ColorTheme["id"]

export const DEFAULT_COLOR_THEME: ColorThemeId = "default"
export const CUSTOM_COLOR_THEME: ColorThemeId = "custom"

/** The preset themes, i.e. everything except "custom". */
export const presetColorThemes = colorThemes.filter((t) => t.id !== CUSTOM_COLOR_THEME)

/** localStorage key the provider persists the selected color theme under.
 *  Custom hue/chroma and radius use `<key>-custom` and `<key>-radius`. */
export const COLOR_THEME_STORAGE_KEY = "color-theme"

/** The attribute on `<html>` that activates a color theme. */
export const COLOR_THEME_ATTRIBUTE = "data-theme"

export const colorThemeIds = colorThemes.map((t) => t.id) as ColorThemeId[]

export function isColorThemeId(value: unknown): value is ColorThemeId {
  return typeof value === "string" && (colorThemeIds as string[]).includes(value)
}

export function getColorTheme(id: ColorThemeId): ColorTheme {
  return colorThemes.find((t) => t.id === id) ?? colorThemes[0]
}

/* ------------------------------------------------------------------ */
/*  Custom theme                                                       */
/* ------------------------------------------------------------------ */

export interface CustomTheme {
  /** oklch hue, 0 to 360 */
  hue: number
  /** oklch chroma, roughly 0.05 to 0.3 */
  chroma: number
}

export const DEFAULT_CUSTOM_THEME: CustomTheme = { hue: 262, chroma: 0.2 }
export const CUSTOM_HUE_RANGE = { min: 0, max: 360, step: 1 } as const
export const CUSTOM_CHROMA_RANGE = { min: 0.04, max: 0.3, step: 0.005 } as const

export function clampCustomTheme(value: Partial<CustomTheme> | null | undefined): CustomTheme {
  const hue = Number(value?.hue)
  const chroma = Number(value?.chroma)
  return {
    hue: Number.isFinite(hue) ? Math.min(CUSTOM_HUE_RANGE.max, Math.max(CUSTOM_HUE_RANGE.min, hue)) : DEFAULT_CUSTOM_THEME.hue,
    chroma: Number.isFinite(chroma)
      ? Math.min(CUSTOM_CHROMA_RANGE.max, Math.max(CUSTOM_CHROMA_RANGE.min, chroma))
      : DEFAULT_CUSTOM_THEME.chroma,
  }
}

/* ------------------------------------------------------------------ */
/*  Radius                                                             */
/* ------------------------------------------------------------------ */

/** Border radius presets, in rem. Applied as `--radius` on <html>. */
export const radiusOptions = [
  { value: 0, label: "None" },
  { value: 0.375, label: "Small" },
  { value: 0.625, label: "Medium" },
  { value: 0.875, label: "Large" },
  { value: 1.25, label: "Full" },
] as const

export type Radius = (typeof radiusOptions)[number]["value"]
export const DEFAULT_RADIUS: Radius = 0.625

export function isRadius(value: unknown): value is Radius {
  return typeof value === "number" && radiusOptions.some((r) => r.value === value)
}

/* ------------------------------------------------------------------ */
/*  Modes (handled by next-themes)                                     */
/* ------------------------------------------------------------------ */

export const modes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
] as const

export type Mode = (typeof modes)[number]["id"]

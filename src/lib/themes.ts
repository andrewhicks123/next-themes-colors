/**
 * Color theme registry.
 *
 * This is the single source of truth for which color themes exist.
 * Each entry maps to a `[data-theme="<id>"]` rule in `globals.css` that sets
 * the theme's hue and chroma. Everything else (primary, ring, charts, accent)
 * is derived from those two numbers, so adding a theme is one line of CSS
 * plus one entry here.
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
] as const

export type ColorTheme = (typeof colorThemes)[number]
export type ColorThemeId = ColorTheme["id"]

export const DEFAULT_COLOR_THEME: ColorThemeId = "default"

/** localStorage key the provider persists the selected color theme under. */
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

/** Modes handled by next-themes. */
export const modes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
] as const

export type Mode = (typeof modes)[number]["id"]

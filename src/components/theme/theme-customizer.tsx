"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useColorTheme } from "./color-theme-provider"
import { Button } from "@/components/ui/button"
import { CUSTOM_CHROMA_RANGE, CUSTOM_HUE_RANGE, radiusOptions, type ColorThemeId, type CustomTheme } from "@/lib/themes"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Copy CSS                                                           */
/* ------------------------------------------------------------------ */

const KNOBS = ["--theme-hue", "--theme-chroma", "--theme-l", "--theme-l-dark", "--theme-on-primary"] as const

/**
 * Builds the CSS a visitor needs to reproduce the current look in their own
 * app. Knob values are read from a probe element so this never drifts from
 * globals.css.
 */
export function getThemeCss(id: ColorThemeId, custom: CustomTheme, radius: number): string {
  const lines: string[] = [`/* next-themes-colors: ${id} theme */`]

  if (id === "custom") {
    lines.push(`[data-theme="custom"] { --theme-hue: ${custom.hue}; --theme-chroma: ${custom.chroma}; }`)
  } else if (id !== "default" && typeof document !== "undefined") {
    const probe = document.createElement("span")
    probe.setAttribute("data-theme", id)
    probe.style.display = "none"
    document.body.appendChild(probe)
    const styles = getComputedStyle(probe)
    const decls = KNOBS.map((k) => [k, styles.getPropertyValue(k).trim()] as const)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v};`)
    probe.remove()
    lines.push(`[data-theme="${id}"] { ${decls.join(" ")} }`)
  }

  lines.push(`:root { --radius: ${radius}rem; }`)
  return lines.join("\n")
}

function CopyCssButton({ className }: { className?: string }) {
  const { colorTheme, customTheme, radius } = useColorTheme()
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    const css = getThemeCss(colorTheme, customTheme, radius)
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={copy} className={cn("gap-1.5", className)}>
      {copied ? <CheckIcon className="text-primary" /> : <CopyIcon />}
      {copied ? "Copied" : "Copy CSS"}
    </Button>
  )
}

/* ------------------------------------------------------------------ */
/*  Sliders                                                            */
/* ------------------------------------------------------------------ */

const hueTrack = `linear-gradient(to right, ${Array.from({ length: 13 }, (_, i) => `oklch(0.7 0.18 ${i * 30})`).join(", ")})`

function Slider({
  id,
  value,
  min,
  max,
  step,
  onValueChange,
  trackStyle,
  label,
}: {
  id: string
  value: number
  min: number
  max: number
  step: number
  onValueChange: (value: number) => void
  trackStyle?: React.CSSProperties
  label: string
}) {
  return (
    <SliderPrimitive.Root
      id={id}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={([v]) => onValueChange(v)}
      className="relative flex h-5 w-full touch-none items-center select-none"
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted" style={trackStyle}>
        {!trackStyle && <SliderPrimitive.Range className="absolute h-full bg-primary" />}
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb aria-label={label} className="block size-4 rounded-full border-2 border-background bg-primary shadow-sm ring-ring/50 transition-[box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden" />
    </SliderPrimitive.Root>
  )
}

/* ------------------------------------------------------------------ */
/*  Customizer                                                         */
/* ------------------------------------------------------------------ */

/**
 * Hue and chroma sliders for the "custom" theme, a radius picker and a
 * copy-CSS button. Used inside the ThemeSwitcher popover; works anywhere
 * inside <ThemeProvider>.
 */
export function ThemeCustomizer({ className }: { className?: string }) {
  const { colorTheme, customTheme, setCustomTheme, radius, setRadius } = useColorTheme()
  const hueId = React.useId()
  const chromaId = React.useId()
  const isCustom = colorTheme === "custom"

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor={hueId} className="text-xs font-medium">
            Hue
          </label>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{Math.round(customTheme.hue)}°</span>
        </div>
        <Slider
          id={hueId}
          label="Hue"
          value={customTheme.hue}
          min={CUSTOM_HUE_RANGE.min}
          max={CUSTOM_HUE_RANGE.max}
          step={CUSTOM_HUE_RANGE.step}
          onValueChange={(hue) => setCustomTheme({ hue })}
          trackStyle={{ background: hueTrack }}
        />
        <div className="flex items-center justify-between">
          <label htmlFor={chromaId} className="text-xs font-medium">
            Chroma
          </label>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{customTheme.chroma.toFixed(3)}</span>
        </div>
        <Slider
          id={chromaId}
          label="Chroma"
          value={customTheme.chroma}
          min={CUSTOM_CHROMA_RANGE.min}
          max={CUSTOM_CHROMA_RANGE.max}
          step={CUSTOM_CHROMA_RANGE.step}
          onValueChange={(chroma) => setCustomTheme({ chroma })}
          trackStyle={{
            background: `linear-gradient(to right, oklch(0.65 ${CUSTOM_CHROMA_RANGE.min} ${customTheme.hue}), oklch(0.65 ${CUSTOM_CHROMA_RANGE.max} ${customTheme.hue}))`,
          }}
        />
        {!isCustom && <p className="text-xs text-muted-foreground">Drag a slider to switch to the custom theme.</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Radius</span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">{radius}rem</span>
        </div>
        <div role="radiogroup" aria-label="Border radius" className="grid grid-cols-5 gap-1 rounded-lg bg-muted p-1">
          {radiusOptions.map((r) => {
            const active = r.value === radius
            return (
              <button
                key={r.value}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={`${r.label} radius`}
                title={r.label}
                onClick={() => setRadius(r.value)}
                className={cn(
                  "flex items-center justify-center rounded-md py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  active ? "bg-background shadow-sm" : "hover:bg-background/60"
                )}
              >
                <span
                  aria-hidden
                  className={cn("size-4 border-2 border-t-0 border-l-0", active ? "border-primary" : "border-muted-foreground/60")}
                  style={{ borderBottomRightRadius: `${Math.min(r.value, 0.9)}rem` }}
                />
              </button>
            )
          })}
        </div>
      </div>

      <CopyCssButton className="w-full" />
    </div>
  )
}

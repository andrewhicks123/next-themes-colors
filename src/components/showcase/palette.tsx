"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { useColorTheme } from "@/components/theme"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const groups: { title: string; description: string; tokens: string[] }[] = [
  {
    title: "Brand",
    description: "Derived from the theme hue. These change with the color theme.",
    tokens: ["primary", "primary-foreground", "ring", "secondary", "secondary-foreground", "accent", "accent-foreground"],
  },
  {
    title: "Charts",
    description: "Five series, spread around the theme hue.",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    title: "Surfaces",
    description: "Neutral and shared by every color theme. These change with light / dark only.",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "muted",
      "muted-foreground",
      "border",
      "input",
      "destructive",
    ],
  },
]

/** Reads the resolved value of every token so developers can copy exact colors. */
function useResolvedTokens(tokens: string[]) {
  const { colorTheme } = useColorTheme()
  const { resolvedTheme } = useTheme()
  const [values, setValues] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    // Wait a frame so the new data-theme / .dark styles have been applied
    // before reading the computed values.
    const frame = requestAnimationFrame(() => {
      // A probe element lets the browser resolve calc() / var() chains into a
      // concrete color instead of returning the raw declaration text.
      const probe = document.createElement("div")
      probe.style.display = "none"
      document.body.appendChild(probe)
      const next: Record<string, string> = {}
      for (const t of tokens) {
        probe.style.backgroundColor = `var(--${t})`
        next[t] = getComputedStyle(probe).backgroundColor
      }
      probe.remove()
      setValues(next)
    })
    return () => cancelAnimationFrame(frame)
  }, [tokens, colorTheme, resolvedTheme])

  return values
}

const allTokens = groups.flatMap((g) => g.tokens)

export function PaletteShowcase() {
  const values = useResolvedTokens(allTokens)

  const copy = async (token: string) => {
    const value = values[token]
    try {
      await navigator.clipboard.writeText(value)
      toast(`Copied --${token}`, { description: value })
    } catch {
      toast(`--${token}`, { description: value })
    }
  }

  return (
    <div className="grid gap-6">
      {groups.map((g) => (
        <Card key={g.title}>
          <CardHeader>
            <CardTitle>{g.title}</CardTitle>
            <CardDescription>{g.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {g.tokens.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => copy(t)}
                    className={cn(
                      "group w-full overflow-hidden rounded-lg border text-left transition-shadow",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:shadow-md"
                    )}
                  >
                    <div
                      className="h-16 w-full border-b transition-colors"
                      style={{ backgroundColor: `var(--${t})` }}
                    />
                    <div className="space-y-0.5 p-2.5">
                      <p className="font-mono text-xs font-medium">--{t}</p>
                      <p className="truncate font-mono text-[11px] text-muted-foreground" title={values[t]}>
                        {values[t] || "…"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

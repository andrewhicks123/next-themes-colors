"use client"

import { ArrowDownIcon, GithubIcon, SparklesIcon } from "lucide-react"
import { ColorThemeGrid, useColorTheme } from "@/components/theme"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GITHUB_URL } from "@/components/site/header"

export function Hero() {
  const { theme, themes } = useColorTheme()

  return (
    <section className="relative overflow-hidden border-b">
      {/* Soft radial glow in the active primary color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_60%)]"
      />
      <div className="container flex flex-col items-center gap-8 py-16 text-center md:py-24">
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <SparklesIcon className="size-3.5" />
          next-themes · shadcn/ui · Tailwind CSS v4
        </Badge>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
            One component.{" "}
            <span className="text-primary">{themes.length} colors.</span> Zero flash.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Light and dark mode from next-themes, plus a color layer that lives in a single
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-sm">data-theme</code>
            attribute. Pick a color below and every button, chart and form updates instantly.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <ColorThemeGrid size="lg" className="justify-center" />
          <p className="text-sm text-muted-foreground">
            Now showing <span className="font-medium text-foreground">{theme.label}</span> · {theme.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a href="#showcase">
              Explore the demo
              <ArrowDownIcon />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <GithubIcon />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

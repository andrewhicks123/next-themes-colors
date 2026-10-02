#!/usr/bin/env node
/**
 * Generates registry.json from the sources of truth and then runs
 * `shadcn build` to produce public/r/*.json.
 *
 *  - The CSS comes from the block between the @registry markers in
 *    src/app/globals.css, so the published item never drifts from the demo.
 *  - The theme ids in that CSS are checked against src/lib/themes.ts.
 */
import { readFileSync, writeFileSync } from "node:fs"
import { spawnSync } from "node:child_process"

const css = readFileSync("src/app/globals.css", "utf8")
const start = css.indexOf("/* @registry:start */")
const end = css.indexOf("/* @registry:end */")
if (start === -1 || end === -1) throw new Error("globals.css is missing the @registry markers")

const block = css
  .slice(start + "/* @registry:start */".length, end)
  .replace(/\/\*[\s\S]*?\*\//g, "") // strip comments

// Flat "selector { decls }" rules only; the theme block has no nesting.
const rules = {}
for (const m of block.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const selector = m[1].replace(/\s+/g, " ").trim()
  const decls = {}
  for (const d of m[2].split(";")) {
    const i = d.indexOf(":")
    if (i === -1) continue
    decls[d.slice(0, i).trim()] = d.slice(i + 1).trim()
  }
  rules[selector] = decls
}

// Sanity check: every preset in themes.ts has a CSS rule and vice versa.
const themesTs = readFileSync("src/lib/themes.ts", "utf8")
const colorThemesBlock = themesTs.slice(themesTs.indexOf("export const colorThemes = ["), themesTs.indexOf("] as const"))
const tsIds = [...colorThemesBlock.matchAll(/\{ id: "([a-z]+)"/g)].map((m) => m[1])
const cssIds = Object.keys(rules)
  .map((s) => s.match(/^\[data-theme="([a-z]+)"\]$/)?.[1])
  .filter(Boolean)
const missing = tsIds.filter((id) => !cssIds.includes(id))
const extra = cssIds.filter((id) => !tsIds.includes(id))
if (missing.length || extra.length) {
  throw new Error(`theme id mismatch. Missing in CSS: [${missing}] Missing in themes.ts: [${extra}]`)
}

const themeFiles = [
  "color-theme-provider.tsx",
  "theme-provider.tsx",
  "theme-switcher.tsx",
  "theme-customizer.tsx",
  "theme-swatch.tsx",
  "mode-toggle.tsx",
  "index.ts",
]

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "next-themes-colors",
  homepage: "https://next-themes-colors.vercel.app",
  items: [
    {
      name: "theme-switcher",
      type: "registry:block",
      title: "Theme Switcher",
      description:
        "Light / dark / system mode plus twelve color themes, a custom hue picker and a radius picker for next-themes and shadcn/ui. Adds the provider, hook, switcher popover, customizer, swatches, mode toggle and the hue-based theme CSS.",
      author: "andrewhicks123",
      dependencies: ["next-themes", "@radix-ui/react-popover", "@radix-ui/react-slider", "lucide-react"],
      registryDependencies: ["button"],
      files: [
        ...themeFiles.map((f) => ({
          path: `src/components/theme/${f}`,
          type: "registry:component",
          target: `components/theme/${f}`,
        })),
        { path: "src/hooks/use-mounted.ts", type: "registry:hook", target: "hooks/use-mounted.ts" },
        { path: "src/lib/themes.ts", type: "registry:lib", target: "lib/themes.ts" },
      ],
      css: rules,
      docs: 'Wrap your root layout: <html lang="en" suppressHydrationWarning><body><ThemeProvider>{children}</ThemeProvider></body></html>, then drop <ThemeSwitcher /> anywhere inside it. Import both from "@/components/theme".',
      categories: ["theme", "dark-mode"],
    },
  ],
}

writeFileSync("registry.json", JSON.stringify(registry, null, 2) + "\n")
console.log(`registry.json: ${Object.keys(rules).length} css rules, ${tsIds.length} themes`)

const result = spawnSync("npx", ["shadcn@latest", "build"], { stdio: "inherit", shell: true })
process.exit(result.status ?? 1)

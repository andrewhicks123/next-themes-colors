import { CodeBlock } from "@/components/site/code-block"

export const REGISTRY_URL = "https://next-themes-colors.vercel.app/r/theme-switcher.json"
export const INSTALL_COMMAND = `npx shadcn@latest add ${REGISTRY_URL}`

const steps = [
  {
    title: "Add the theme tokens",
    body: "Paste the color theme block from globals.css. A theme is just a hue and a chroma; primary, ring, accent and the chart series are derived for light and dark mode.",
    code: `[data-theme="red"]  { --theme-hue: 25;  --theme-chroma: 0.215; }
[data-theme="blue"] { --theme-hue: 262; --theme-chroma: 0.21; --theme-l: 0.56; }

[data-theme]:not([data-theme="default"]) {
  --primary: oklch(var(--theme-l) var(--theme-chroma) var(--theme-hue));
  --ring: oklch(var(--theme-l) calc(var(--theme-chroma) * 0.85) var(--theme-hue));
  /* ...accent, secondary, chart-1..5 */
}`,
    language: "globals.css",
  },
  {
    title: "Register the themes",
    body: "List them once in lib/themes.ts. The provider, the switcher and the flash-prevention script all read from this array.",
    code: `export const colorThemes = [
  { id: "default", label: "Default", description: "Neutral zinc" },
  { id: "red",     label: "Red",     description: "Bold and energetic" },
  { id: "blue",    label: "Blue",    description: "Trustworthy classic" },
] as const`,
    language: "lib/themes.ts",
  },
  {
    title: "Wrap your app and drop in the switcher",
    body: "ThemeProvider composes next-themes with the color layer. ThemeSwitcher goes anywhere inside it.",
    code: `// app/layout.tsx
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>

// anywhere in the tree
<ThemeSwitcher />

// or read / set it yourself
const { colorTheme, setColorTheme } = useColorTheme()`,
    language: "tsx",
  },
]

export function InstallGuide() {
  return (
    <section id="install" className="scroll-mt-20 border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="mb-10 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Add it to your app</h2>
          <p className="text-muted-foreground">One command with the shadcn CLI, or copy the files by hand.</p>
        </div>

        <div className="mb-12 grid gap-4 lg:grid-cols-[1fr_minmax(0,2fr)]">
          <div className="space-y-2">
            <h3 className="font-semibold">Install with the shadcn CLI</h3>
            <p className="text-sm text-muted-foreground">
              Installs the provider, hook, switcher, swatches and mode toggle, adds the theme CSS to your
              globals.css and pulls in next-themes and the button component. Works with any shadcn/ui style.
            </p>
          </div>
          <CodeBlock code={INSTALL_COMMAND} language="bash" />
        </div>

        <h3 className="mb-6 font-semibold">Or set it up by hand</h3>
        <ol className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex min-w-0 flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{step.body}</p>
              <CodeBlock code={step.code} language={step.language} className="flex-1" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

# next-themes-colors

Light, dark and twelve color themes for Next.js, built on [next-themes](https://github.com/pacocoursey/next-themes), [shadcn/ui](https://ui.shadcn.com) and [Tailwind CSS v4](https://tailwindcss.com).

Mode and color are independent layers:

| Layer | Owned by | Applied as | Persisted in |
| --- | --- | --- | --- |
| Mode (light / dark / system) | next-themes | `class="dark"` on `<html>` | `localStorage.theme` |
| Color (default, red, blue, …) | `ColorThemeProvider` | `data-theme="blue"` on `<html>` | `localStorage.color-theme` |

Switching to dark never changes the chosen color, and picking a color never changes the mode. Both layers run an inline script before hydration, so there is no flash of the wrong theme on reload.

## Features

- Light, dark and system mode via next-themes
- 12 color themes, each defined by a single hue and chroma in CSS
- Primary, ring, accent, secondary and five chart colors derived automatically for light and dark
- `ThemeSwitcher` popover with a mode control and a swatch grid
- `useColorTheme()` hook for reading and setting the color anywhere
- Cross-tab sync through the `storage` event
- Zero flash on first paint
- Keyboard accessible (radio group semantics on the swatches)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add it to your own app

### 1. Add the tokens to `globals.css`

Copy the base palette and the color theme block from [`src/app/globals.css`](src/app/globals.css). A theme is one line:

```css
[data-theme="red"]  { --theme-hue: 25;  --theme-chroma: 0.215; }
[data-theme="blue"] { --theme-hue: 262; --theme-chroma: 0.21; --theme-l: 0.56; --theme-l-dark: 0.7; }
```

The shared rules under `[data-theme]:not([data-theme="default"])` derive everything else:

| Variable | Default | Purpose |
| --- | --- | --- |
| `--theme-hue` | required | oklch hue, 0 to 360 |
| `--theme-chroma` | required | oklch chroma, roughly 0.1 to 0.25 |
| `--theme-l` | `0.58` | primary lightness in light mode |
| `--theme-l-dark` | `0.72` | primary lightness in dark mode |
| `--theme-on-primary` | near white | text color on primary, set to a dark value for light hues like amber or lime |

### 2. Register the theme in `src/lib/themes.ts`

```ts
export const colorThemes = [
  { id: "default", label: "Default", description: "Neutral zinc" },
  { id: "red", label: "Red", description: "Bold and energetic" },
  { id: "blue", label: "Blue", description: "Trustworthy classic" },
] as const
```

The provider, the switcher and the flash-prevention script all read from this array, so the `id` must match the `data-theme` value in CSS.

### 3. Copy the components

Copy these folders into your project:

- `src/components/theme/` – provider, hook, switcher, swatch and mode toggle
- `src/hooks/use-mounted.ts`
- `src/components/ui/button.tsx`, `popover.tsx`, `separator.tsx` (shadcn/ui, used by the switcher)

### 4. Wrap your layout

```tsx
import { ThemeProvider } from "@/components/theme"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

`ThemeProvider` accepts every next-themes prop plus a `color` prop forwarded to the color layer:

```tsx
<ThemeProvider defaultTheme="dark" color={{ defaultTheme: "blue", storageKey: "my-app-color" }}>
```

### 5. Use it

```tsx
import { ThemeSwitcher, ModeToggle, ColorThemeGrid, useColorTheme } from "@/components/theme"

// the full popover
<ThemeSwitcher />

// just the swatches, or just the sun / moon button
<ColorThemeGrid />
<ModeToggle />

// programmatic access
const { colorTheme, theme, themes, setColorTheme, resetColorTheme } = useColorTheme()
```

## How swatches get their color

A swatch is a `<button data-theme="red" class="bg-primary">`. Because the theme rules target `[data-theme]` on any element, the swatch resolves its own `--primary` for the current light or dark mode. No hex values are hard-coded anywhere.

## Project structure

```
src/
  app/
    globals.css          tokens, base palette and color theme rules
    layout.tsx           ThemeProvider, fonts, toaster
    page.tsx             demo page
  components/
    theme/               the reusable theme layer
    ui/                  shadcn/ui primitives
    showcase/            demo tabs: components, charts, forms, palette
    site/                header, hero, install guide, footer
  hooks/use-mounted.ts
  lib/themes.ts          color theme registry
```

## Scripts

```bash
npm run dev         # start the dev server
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
```

## Tech stack

- [Next.js 16](https://nextjs.org) with the App Router
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com) with oklch tokens
- [next-themes](https://github.com/pacocoursey/next-themes) for mode
- [shadcn/ui](https://ui.shadcn.com) and [Radix UI](https://www.radix-ui.com) primitives
- [Recharts 3](https://recharts.org) for the chart demos
- [nuqs](https://nuqs.dev) for URL-synced tabs
- [sonner](https://sonner.emilkowal.ski) for toasts

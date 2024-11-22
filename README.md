# Color Theme Switcher

A Next.js application demonstrating theme switching capabilities using next-themes and shadcn/ui components. Features multiple color themes and dark/light mode switching.

## Features

* Light/Dark mode switching
* Multiple color theme options

## Tech Stack

* [Next.js](https://nextjs.org) - React framework
* [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
* [shadcn/ui](https://ui.shadcn.com/) - UI components
* [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

1. Add all color themes into globals.css, example for red below.

```css
.red {
    --primary: 0 100% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 100% 96%;
    --secondary-foreground: 0 0% 9%;
    --chart-1: #dc2626;
    --chart-2: #ef4444;
    --chart-3: #b91c1c;
    --chart-4: #f87171;
    --chart-5: #991b1b;
  }

  .red-dark {
    --primary: 0 100% 60%;
    --primary-foreground: 0 0% 100%;
    --background: 0 0% 3.9%;
    --foreground: 0 100% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 100% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 100% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 100% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 100% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 100% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 100% 60%;
    --chart-1: #ef4444;
    --chart-2: #f87171;
    --chart-3: #dc2626;
    --chart-4: #fca5a5;
    --chart-5: #b91c1c;
  }
```

1. Add the [theme-provider.tsx](theme-provider.tsx "https://github.com/andrewhicks123/next-themes-colors/blob/master/src/components/theme/theme-provider.tsx") and [theme-switcher.tsx](theme-switcher.tsx "https://github.com/andrewhicks123/next-themes-colors/blob/master/src/components/theme/theme-switcher.tsx") files to your components folder.&#x20;
2. Update the colorThemes object within theme-switcher.tsx to match your themes.

```js
const colorThemes = [
  { name: "Default", value: "", bgClass: "bg-zinc-900" },
  { name: "Red", value: "red", bgClass: "bg-red-500" },
  { name: "Blue", value: "blue", bgClass: "bg-blue-500" },
  { name: "Green", value: "green", bgClass: "bg-green-500" },
  { name: "Pink", value: "pink", bgClass: "bg-pink-500" },
  { name: "Purple", value: "purple", bgClass: "bg-purple-500" },
]
```

1. Add the ThemeProvider to your root layout.tsx file.&#x20;

```txt
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Inter } from "next/font/google"
import { type ReactNode } from 'react'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}

```

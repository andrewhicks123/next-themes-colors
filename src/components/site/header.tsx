import Link from "next/link"
import { GithubIcon, PaletteIcon } from "lucide-react"
import { ThemeSwitcher, ModeToggle } from "@/components/theme"
import { CurrentTheme } from "@/components/site/current-theme"
import { Button } from "@/components/ui/button"

export const GITHUB_URL = "https://github.com/andrewhicks123/next-themes-colors"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <PaletteIcon className="size-4" />
          </span>
          <span className="hidden sm:inline">next-themes-colors</span>
        </Link>

        <div className="flex items-center gap-2">
          <CurrentTheme className="hidden md:flex" />
          <ThemeSwitcher />
          <ModeToggle className="hidden sm:inline-flex" />
          <Button variant="outline" size="icon" asChild>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
              <GithubIcon />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

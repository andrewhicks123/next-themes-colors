"use client"

import * as React from "react"
import { Moon, Sun, RotateCcw } from 'lucide-react'
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const colorThemes = [
  { name: "Default", value: "", bgClass: "bg-zinc-900", lightBgClass: "bg-zinc-100" },
  { name: "Red", value: "red", bgClass: "bg-red-600", lightBgClass: "bg-red-500" },
  { name: "Blue", value: "blue", bgClass: "bg-blue-600", lightBgClass: "bg-blue-500" },
  { name: "Green", value: "green", bgClass: "bg-green-600", lightBgClass: "bg-green-500" },
  { name: "Pink", value: "pink", bgClass: "bg-pink-600", lightBgClass: "bg-pink-500" },
  { name: "Purple", value: "purple", bgClass: "bg-purple-600", lightBgClass: "bg-purple-500" },
]

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme()

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div suppressHydrationWarning />
  }

  // Determine if we're in dark mode
  const isDarkMode = theme === 'dark' || theme?.endsWith('-dark') || (theme === 'system' && systemTheme === 'dark')
  
  // Extract the base color theme (without -dark suffix)
  let currentColorTheme = ''
  if (theme && theme !== 'light' && theme !== 'dark' && theme !== 'system') {
    currentColorTheme = theme.replace('-dark', '')
  }

  const handleThemeChange = (color: string) => {
    if (!color) {
      setTheme(isDarkMode ? 'dark' : 'light')
    } else {
      setTheme(`${color}${isDarkMode ? '-dark' : ''}`)
    }
  }

  const handleModeChange = (checked: boolean) => {
    if (checked) {
      // Switching to dark mode
      if (currentColorTheme) {
        setTheme(`${currentColorTheme}-dark`)
      } else {
        setTheme('dark')
      }
    } else {
      // Switching to light mode
      if (currentColorTheme) {
        setTheme(currentColorTheme)
      } else {
        setTheme('light')
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 h-10">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <div className="p-3 space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Color Theme</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTheme('system')}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {colorThemes.map((t) => (
                <Button
                  key={t.value}
                  variant="outline"
                  className={`w-full h-10 p-0 overflow-hidden ${currentColorTheme === t.value ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  onClick={() => handleThemeChange(t.value)}
                >
                  <span className="sr-only">{t.name}</span>
                  <span className={`w-full h-full ${isDarkMode ? t.bgClass : t.lightBgClass}`} />
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={handleModeChange}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          {/* <div className="border rounded-md p-4 bg-background">
            <h4 className="text-sm font-semibold mb-2">Preview</h4>
            <div className={`w-full h-10 rounded ${colorThemes.find(t => t.value === currentTheme)?.bgClass}`} />
            <div className="mt-2 text-xs text-muted-foreground">
              {isDarkMode ? 'Dark' : 'Light'} {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme
            </div>
          </div> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
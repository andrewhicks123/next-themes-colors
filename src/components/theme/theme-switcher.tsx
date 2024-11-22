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
  { name: "Default", value: "", bgClass: "bg-zinc-900" },
  { name: "Red", value: "red", bgClass: "bg-red-500" },
  { name: "Blue", value: "blue", bgClass: "bg-blue-500" },
  { name: "Green", value: "green", bgClass: "bg-green-500" },
  { name: "Pink", value: "pink", bgClass: "bg-pink-500" },
  { name: "Purple", value: "purple", bgClass: "bg-purple-500" },
]

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme()

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  const isDarkMode = theme === 'dark' || theme?.endsWith('-dark') || (theme === 'system' && systemTheme === 'dark')
  const currentTheme = theme?.includes('-') ? theme.split('-')[0] : theme === 'dark' ? '' : theme || ''

  const handleThemeChange = (color: string) => {
    if (!color) {
      setTheme(isDarkMode ? 'dark' : 'light')
    } else {
      setTheme(`${color}${isDarkMode ? '-dark' : ''}`)
    }
  }

  const handleModeChange = (checked: boolean) => {
    const newMode = checked ? 'dark' : 'light'
    if (currentTheme === 'light') {
      setTheme('dark')
    } else if (currentTheme) {
      setTheme(`${currentTheme}-${newMode}`)
    } else {
      setTheme(newMode)
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
      <DropdownMenuContent align="end" className="w-[280px]">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Color Theme</h3>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 px-2"
                onClick={() => setTheme('system')}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {colorThemes.map((t) => (
                <Button
                  key={t.value}
                  variant="outline"
                  className={`w-full h-10 p-0 ${currentTheme === t.value ? 'border-2 border-primary' : ''}`}
                  onClick={() => handleThemeChange(t.value)}
                >
                  <span className="sr-only">{t.name}</span>
                  <span className={`w-full h-full ${t.bgClass}`} />
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

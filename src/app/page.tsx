"use client"

import { Suspense } from "react"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExampleComponents } from "@/components/home/example-components"
import { ExampleBarChart, ExampleLineChart, ExampleRadialChart } from "@/components/home/example-chart"
import { ExampleForm, LoginForm } from "@/components/home/example-form"
import { CurrentTheme } from "@/components/home/current-theme"
import { useQueryState } from 'nuqs'
import { Button } from "@/components/ui/button" // Assuming you have a Button component
import Link from "next/link"
import { GithubIcon } from "lucide-react" // Importing GitHub icon from lucide-react

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "components" })

  return (
    <div className="container mx-auto p-4" suppressHydrationWarning>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xs">
        <div className="container flex flex-col md:flex-row h-auto md:h-16 items-center justify-between p-2 md:p-0">
          <h1 className="text-xl md:text-2xl font-bold px-2 md:px-4">Theme/Color Switcher Demo</h1>
          <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
            <CurrentTheme />
            <ThemeSwitcher />
            <Link
              href="https://github.com/andrewhicks123/next-themes-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="h-8 md:h-10 flex items-center justify-center"
              >
                <GithubIcon className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="grid gap-8 mt-20 md:mt-16">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList>
            <TabsTrigger value="chart">Charts</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>
          <TabsContent value="chart">
            <div className="grid gap-8">
              <ExampleBarChart />
              <ExampleLineChart />
              <ExampleRadialChart />
            </div>
          </TabsContent>
          <TabsContent value="form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ExampleForm />
              <LoginForm />
            </div>
          </TabsContent>
          <TabsContent value="components">
            <ExampleComponents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

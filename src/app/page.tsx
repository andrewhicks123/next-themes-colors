"use client"

import { Suspense } from "react"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExampleComponents } from "@/components/home/example-components"
import { ExampleBarChart, ExampleLineChart, ExampleRadialChart } from "@/components/home/example-chart"
import { ExampleForm, LoginForm } from "@/components/home/example-form"
import { CurrentTheme } from "@/components/home/current-theme"
import { useQueryState } from 'nuqs'

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "chart" })

  return (
    <div className="container mx-auto p-4">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold px-4">Theme/Color Switcher Demo</h1>
          <div className="flex items-center gap-4">
            <CurrentTheme />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="grid gap-8 mt-24">
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
            <div className="grid grid-cols-2 gap-8">
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

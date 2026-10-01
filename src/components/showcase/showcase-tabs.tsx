"use client"

import { parseAsStringLiteral, useQueryState } from "nuqs"
import { BarChart3Icon, LayoutGridIcon, SwatchBookIcon, TextCursorInputIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentsShowcase } from "./components"
import { ChartsShowcase } from "./charts"
import { FormsShowcase } from "./forms"
import { PaletteShowcase } from "./palette"

const tabs = ["components", "charts", "forms", "palette"] as const
type Tab = (typeof tabs)[number]

const tabParser = parseAsStringLiteral(tabs).withDefault("components")

export function ShowcaseTabs() {
  const [tab, setTab] = useQueryState("tab", tabParser)

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="gap-6">
      <TabsList className="h-10 w-full sm:w-fit [&_svg]:hidden sm:[&_svg]:block">
        <TabsTrigger value="components" className="px-3">
          <LayoutGridIcon />
          Components
        </TabsTrigger>
        <TabsTrigger value="charts" className="px-3">
          <BarChart3Icon />
          Charts
        </TabsTrigger>
        <TabsTrigger value="forms" className="px-3">
          <TextCursorInputIcon />
          Forms
        </TabsTrigger>
        <TabsTrigger value="palette" className="px-3">
          <SwatchBookIcon />
          Palette
        </TabsTrigger>
      </TabsList>
      <TabsContent value="components">
        <ComponentsShowcase />
      </TabsContent>
      <TabsContent value="charts">
        <ChartsShowcase />
      </TabsContent>
      <TabsContent value="forms">
        <FormsShowcase />
      </TabsContent>
      <TabsContent value="palette">
        <PaletteShowcase />
      </TabsContent>
    </Tabs>
  )
}

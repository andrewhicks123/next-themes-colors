"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, RadialBar, RadialBarChart, XAxis, YAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ChartsShowcase() {
  return (
    <div className="grid gap-6 *:min-w-0 lg:grid-cols-2">
      <RevenueBarChart />
      <ActivityAreaChart />
      <ProjectsRadialChart />
      <ChartSeriesCard />
    </div>
  )
}

/* ---------------------------- Bar chart ---------------------------- */

const barConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  profit: { label: "Profit", color: "var(--chart-2)" },
} satisfies ChartConfig

const barData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 1800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
]

function RevenueBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue overview</CardTitle>
        <CardDescription>Monthly revenue and profit, chart-1 and chart-2.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barConfig} className="h-72 w-full">
          <BarChart accessibilityLayer data={barData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={40} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

/* ---------------------------- Area chart --------------------------- */

const areaConfig = {
  users: { label: "Active users", color: "var(--chart-3)" },
  sessions: { label: "Sessions", color: "var(--chart-4)" },
} satisfies ChartConfig

const areaData = [
  { week: "W1", users: 400, sessions: 240 },
  { week: "W2", users: 300, sessions: 139 },
  { week: "W3", users: 520, sessions: 680 },
  { week: "W4", users: 478, sessions: 390 },
  { week: "W5", users: 589, sessions: 480 },
  { week: "W6", users: 640, sessions: 560 },
]

function ActivityAreaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User activity</CardTitle>
        <CardDescription>Weekly active users and sessions, chart-3 and chart-4.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={areaConfig} className="h-72 w-full">
          <AreaChart accessibilityLayer data={areaData} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sessions)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-sessions)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="sessions"
              type="natural"
              fill="url(#fillSessions)"
              stroke="var(--color-sessions)"
              stackId="a"
            />
            <Area dataKey="users" type="natural" fill="url(#fillUsers)" stroke="var(--color-users)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

/* --------------------------- Radial chart -------------------------- */

const radialConfig = {
  completion: { label: "Completion" },
  a: { label: "Project A", color: "var(--chart-1)" },
  b: { label: "Project B", color: "var(--chart-2)" },
  c: { label: "Project C", color: "var(--chart-3)" },
  d: { label: "Project D", color: "var(--chart-5)" },
} satisfies ChartConfig

const radialData = [
  { project: "a", completion: 90, fill: "var(--color-a)" },
  { project: "b", completion: 70, fill: "var(--color-b)" },
  { project: "c", completion: 45, fill: "var(--color-c)" },
  { project: "d", completion: 30, fill: "var(--color-d)" },
]

function ProjectsRadialChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project progress</CardTitle>
        <CardDescription>Completion per project across the chart series.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={radialConfig} className="mx-auto h-72 w-full">
          <RadialBarChart data={radialData} innerRadius={30} outerRadius={120} startAngle={180} endAngle={-180}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="project" />} />
            <RadialBar dataKey="completion" background cornerRadius={6} />
            <ChartLegend content={<ChartLegendContent nameKey="project" />} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

/* ------------------------- Series reference ------------------------ */

function ChartSeriesCard() {
  const series = [1, 2, 3, 4, 5]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart series</CardTitle>
        <CardDescription>
          chart-1 through chart-5 are derived from the theme hue, so a monochrome palette stays readable.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {series.map((n) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-16 font-mono text-xs text-muted-foreground">chart-{n}</span>
            <div
              className="h-8 flex-1 rounded-md border"
              style={{ backgroundColor: `var(--chart-${n})` }}
              aria-label={`chart-${n} color sample`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

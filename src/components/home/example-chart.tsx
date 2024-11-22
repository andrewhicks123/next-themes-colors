"use client"

import { Bar, BarChart, Line, LineChart, RadialBarChart, RadialBar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Bar Chart Config & Data
const barChartConfig = {
  Revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  Profit: {
    label: "Profit", 
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const barData = [
  { month: 'Jan', Revenue: 4000, Profit: 2400 },
  { month: 'Feb', Revenue: 3000, Profit: 1398 },
  { month: 'Mar', Revenue: 2000, Profit: 1800 },
  { month: 'Apr', Revenue: 2780, Profit: 3908 },
  { month: 'May', Revenue: 1890, Profit: 4800 },
  { month: 'Jun', Revenue: 2390, Profit: 3800 },
]

// Line Chart Config & Data
const lineChartConfig = {
  Users: {
    label: "Active Users",
    color: "var(--chart-3)",
  },
  Sessions: {
    label: "Sessions",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const lineData = [
  { name: 'Week 1', Users: 400, Sessions: 240 },
  { name: 'Week 2', Users: 300, Sessions: 139 },
  { name: 'Week 3', Users: 200, Sessions: 980 },
  { name: 'Week 4', Users: 278, Sessions: 390 },
  { name: 'Week 5', Users: 189, Sessions: 480 },
]

// Radial Chart Config & Data
const radialChartConfig = {
  completion: {
    label: "Completion",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const radialData = [
  { name: 'Project A', completion: 70 },
  { name: 'Project B', completion: 45 },
  { name: 'Project C', completion: 90 },
  { name: 'Project D', completion: 30 },
]

export function ExampleBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue and profit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer config={barChartConfig} className="w-full h-full">
            <BarChart accessibilityLayer data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="Revenue" fill="var(--chart-1)" radius={4} />
              <Bar dataKey="Profit" fill="var(--chart-2)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ExampleLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Weekly active users and sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer config={lineChartConfig} className="w-full h-full">
            <LineChart accessibilityLayer data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="var(--chart-3)" />
              <Line type="monotone" dataKey="Sessions" stroke="var(--chart-4)" />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function ExampleRadialChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <CardDescription>Project completion rates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer config={radialChartConfig} className="w-full h-full">
            <RadialBarChart 
              innerRadius="10%" 
              outerRadius="80%" 
              data={radialData} 
              startAngle={180} 
              endAngle={0}
            >
              <RadialBar
                background
                dataKey="completion"
                fill="var(--chart-5)"
              />
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

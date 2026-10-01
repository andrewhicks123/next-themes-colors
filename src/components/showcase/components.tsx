"use client"

import * as React from "react"
import { toast } from "sonner"
import { BellIcon, CheckIcon, DownloadIcon, MailIcon, TrendingUpIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ComponentsShowcase() {
  return (
    <div className="grid gap-6 *:min-w-0 md:grid-cols-2 xl:grid-cols-3">
      <ButtonsCard />
      <BadgesCard />
      <StatsCard />
      <TogglesCard />
      <TeamCard />
      <ProgressCard />
    </div>
  )
}

function ButtonsCard() {
  const notify = (variant: string) =>
    toast.success(`${variant} button clicked`, { description: "Toasts pick up the theme too." })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons</CardTitle>
        <CardDescription>Every variant, driven by primary and accent.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => notify("Default")}>Default</Button>
          <Button variant="secondary" onClick={() => notify("Secondary")}>
            Secondary
          </Button>
          <Button variant="outline" onClick={() => notify("Outline")}>
            Outline
          </Button>
          <Button variant="ghost" onClick={() => notify("Ghost")}>
            Ghost
          </Button>
          <Button variant="link" onClick={() => notify("Link")}>
            Link
          </Button>
          <Button variant="destructive" onClick={() => notify("Destructive")}>
            Destructive
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">
            <DownloadIcon />
            Small
          </Button>
          <Button size="lg">Large</Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Notifications">
                <BellIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Icon button with tooltip</TooltipContent>
          </Tooltip>
          <Button disabled>Disabled</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BadgesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges</CardTitle>
        <CardDescription>Status labels and tags.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <Separator />
        <div className="flex flex-wrap gap-2">
          <Badge>
            <CheckIcon />
            Verified
          </Badge>
          <Badge variant="secondary">
            <TrendingUpIcon />
            +12.5%
          </Badge>
          <Badge variant="outline" className="rounded-full">
            v1.0.0
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function StatsCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Monthly revenue</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">$24,560</CardTitle>
        <CardAction>
          <Badge variant="outline" className="gap-1">
            <TrendingUpIcon className="text-primary" />
            +8.2%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-1" aria-hidden>
          {[40, 55, 35, 70, 60, 80, 65, 90, 75, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary/20 transition-colors last:bg-primary"
              style={{ height: `${h * 0.6}px` }}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">Trending up this quarter</CardFooter>
    </Card>
  )
}

function TogglesCard() {
  const [value, setValue] = React.useState([42])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
        <CardDescription>Switches, checkboxes and sliders.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Push notifications</Label>
          <Switch id="notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="marketing">Marketing emails</Label>
          <Switch id="marketing" />
        </div>
        <Separator />
        <div className="flex items-center gap-2">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="volume">Volume</Label>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">{value[0]}%</span>
          </div>
          <Slider id="volume" value={value} onValueChange={setValue} max={100} step={1} />
        </div>
      </CardContent>
    </Card>
  )
}

const team = [
  { name: "shadcn", handle: "@shadcn", src: "https://github.com/shadcn.png", role: "Owner" },
  { name: "Vercel", handle: "@vercel", src: "https://github.com/vercel.png", role: "Member" },
  { name: "Paco", handle: "@pacocoursey", src: "https://github.com/pacocoursey.png", role: "Member" },
]

function TeamCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team</CardTitle>
        <CardDescription>Avatars with muted fallbacks.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            <MailIcon />
            Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {team.map((m) => (
          <div key={m.handle} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={m.src} alt={m.name} />
              <AvatarFallback>{m.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-medium">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.handle}</p>
            </div>
            <Badge variant={m.role === "Owner" ? "default" : "secondary"}>{m.role}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ProgressCard() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardDescription>Indicators use the primary color.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading assets</span>
            <span className="font-mono text-muted-foreground tabular-nums">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Storage used</span>
            <span className="font-mono text-muted-foreground tabular-nums">33%</span>
          </div>
          <Progress value={33} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Build complete</span>
            <span className="font-mono text-muted-foreground tabular-nums">100%</span>
          </div>
          <Progress value={100} />
        </div>
      </CardContent>
    </Card>
  )
}

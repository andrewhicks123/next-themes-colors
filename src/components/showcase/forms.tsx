"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function FormsShowcase() {
  return (
    <div className="grid gap-6 *:min-w-0 lg:grid-cols-2">
      <CreateProjectForm />
      <LoginForm />
    </div>
  )
}

function CreateProjectForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    toast.success("Project created", { description: `${data.get("name") || "Untitled"} is ready to deploy.` })
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one click.</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Name of your project" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="framework">Framework</Label>
            <Select name="framework" defaultValue="next">
              <SelectTrigger id="framework" className="w-full">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="nuxt">Nuxt</SelectItem>
                <SelectItem value="svelte">SvelteKit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="Describe your project" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="public">Public project</Label>
              <p className="text-xs text-muted-foreground">Anyone with the link can view it.</p>
            </div>
            <Switch id="public" name="public" />
          </div>
          <div className="grid gap-2">
            <Label>Additional options</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" className="w-fit">
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Project settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Add collaborators</DropdownMenuItem>
                <DropdownMenuItem>Repository settings</DropdownMenuItem>
                <DropdownMenuItem>Deployment options</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter className="mt-6 justify-between gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Deploy</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function LoginForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast("Signed in", { description: "This is a demo. Nothing was sent anywhere." })
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs">
                Forgot password?
              </Button>
            </div>
            <Input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember" />
            <Label htmlFor="remember">Remember me for 30 days</Label>
          </div>
        </CardContent>
        <CardFooter className="mt-6 flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Continue with GitHub
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

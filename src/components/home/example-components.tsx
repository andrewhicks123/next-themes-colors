"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'

export function ExampleComponents() {
  const handleButtonClick = (variant: string) => {
    toast(`Button clicked: ${variant}`, {
        className: 'bg-primary text-primary-foreground border-secondary',
    });
  };

  return (
    <div className="grid gap-4 p-2">
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 justify-center">
          <Button variant="default" onClick={() => handleButtonClick('Default')}>Default</Button>
          <Button variant="secondary" onClick={() => handleButtonClick('Secondary')}>Secondary</Button>
          <Button variant="outline" onClick={() => handleButtonClick('Outline')}>Outline</Button>
          <Button variant="ghost" onClick={() => handleButtonClick('Ghost')}>Ghost</Button>
          <Button variant="link" onClick={() => handleButtonClick('Link')}>Link</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 justify-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 justify-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
        </CardContent>
      </Card>
    </div>
  )
}

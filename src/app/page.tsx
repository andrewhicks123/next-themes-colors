import { Suspense } from "react"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { Hero } from "@/components/site/hero"
import { InstallGuide } from "@/components/site/install-guide"
import { ShowcaseTabs } from "@/components/showcase/showcase-tabs"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <section id="showcase" className="container scroll-mt-20 py-12 md:py-16">
          <div className="mb-8 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">See it in action</h2>
            <p className="text-muted-foreground">
              Every component below reads from the same CSS tokens. Change the theme and watch them follow.
            </p>
          </div>
          <Suspense>
            <ShowcaseTabs />
          </Suspense>
        </section>
        <InstallGuide />
      </main>
      <SiteFooter />
    </div>
  )
}

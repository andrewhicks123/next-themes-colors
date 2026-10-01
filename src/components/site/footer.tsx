import { GITHUB_URL } from "@/components/site/header"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          Built with{" "}
          <a className="font-medium text-foreground underline-offset-4 hover:underline" href="https://nextjs.org">
            Next.js
          </a>
          ,{" "}
          <a
            className="font-medium text-foreground underline-offset-4 hover:underline"
            href="https://github.com/pacocoursey/next-themes"
          >
            next-themes
          </a>{" "}
          and{" "}
          <a className="font-medium text-foreground underline-offset-4 hover:underline" href="https://ui.shadcn.com">
            shadcn/ui
          </a>
          .
        </p>
        <a className="underline-offset-4 hover:underline" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          Source on GitHub
        </a>
      </div>
    </footer>
  )
}

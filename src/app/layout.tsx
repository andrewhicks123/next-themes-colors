import { ThemeProvider } from "@/components/theme/theme-provider"
import { Inter } from "next/font/google"
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { type ReactNode } from 'react'
import { Toaster } from 'sonner'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}

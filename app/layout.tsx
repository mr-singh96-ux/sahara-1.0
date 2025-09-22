import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AppProvider } from "@/contexts/app-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <AppProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Analytics />
            </AppProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

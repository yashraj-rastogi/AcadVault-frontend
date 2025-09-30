import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "AcadVault - Academic Achievement Platform",
  description:
    "Comprehensive platform for students and faculty to manage academic achievements, build portfolios, and streamline mentorship",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SidebarProvider>
          <div className="flex justify-center min-h-screen w-full bg-gradient-to-br from-white to-gray-50">
            {/* Max width centers content + responsive padding */}
            <div className="w-full max-w-5xl px-4 py-12 flex flex-col items-center">
              <Suspense fallback={null}>{children}</Suspense>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

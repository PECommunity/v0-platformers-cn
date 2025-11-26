import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "平台之道 | PECommunity",
  description: "平台工程的方法与框架、度量和测算工具 - 由 PECommunity 平台工程社区出品",
  keywords: ["平台工程", "Platform Engineering", "DevOps", "开发者体验", "IDP", "DORA"],
  authors: [{ name: "PECommunity", url: "https://pecommunity.cn" }],
  openGraph: {
    title: "平台之道",
    description: "平台工程的方法与框架、度量和测算工具",
    url: "https://platformers.cn",
    siteName: "平台之道",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${inter.className} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

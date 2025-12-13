import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { AdminProvider } from "@/lib/admin-context"
import { PortfolioProvider } from "@/lib/portfolio-context"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nishan Bajagain | Software Developer",
  description: "Passionate software developer exploring new technologies and modern web tools while completing +2 studies. Eager to build impactful projects and grow every day.",
  keywords: ["Software Developer", "Web Developer", "UX/UI Designer", "React", "Next.js", "Portfolio"],
  generator: 'Next.js',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PortfolioProvider>
            <AuthProvider>
              <AdminProvider>
                {children}
              </AdminProvider>
            </AuthProvider>
          </PortfolioProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

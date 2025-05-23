import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

const name = process.env.NEXT_PUBLIC_NAME || "Nishan Bajagain"
const tagline = process.env.NEXT_PUBLIC_TAGLINE || "Web Developer & Designer"

export const metadata: Metadata = {
  title: `${name} - Portfolio`,
  description: tagline,
  keywords: ["portfolio", "web developer", "frontend", "react", "next.js", "ui/ux", "designer"],
  authors: [{ name }],
  creator: name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${name} - Portfolio`,
    description: tagline,
    siteName: `${name} - Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} - Portfolio`,
    description: tagline,
    creator: "@nishanbajagain",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'
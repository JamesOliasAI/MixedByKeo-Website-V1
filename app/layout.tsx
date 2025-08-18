import type React from "react"
import { Inter, Orbitron } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitbon",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: "Mixed By Keo | Professional Mixing & Mastering Services",
  description: "Elevate your music with professional mixing and mastering services by Keo. Achieve clarity, depth, and industry-standard quality for your tracks. Specializing in hip-hop, R&B, and pop.",
  keywords: ["mixing engineer", "mastering engineer", "audio mixing", "audio mastering", "music production", "hip-hop mixing", "R&B mixing", "pop mixing", "online mixing and mastering", "professional audio services"],
  icons: {
    icon: '/mixedbykeo_favicon_K_pack/favicon.ico',
    shortcut: '/mixedbykeo_favicon_K_pack/favicon.ico',
    apple: '/mixedbykeo_favicon_K_pack/K_black_on_white_180.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/mixedbykeo_favicon_K_pack/K_black_on_white_192.png',
      },
      {
        rel: 'mask-icon',
        url: '/mixedbykeo_favicon_K_pack/K_black_transparent_512.png',
        color: '#000000',
      },
    ],
  },
  openGraph: {
    title: "Mixed By Keo | Professional Mixing & Mastering Services",
    description: "Elevate your music with professional mixing and mastering services by Keo. Achieve clarity, depth, and industry-standard quality for your tracks.",
    url: "https://www.mixedbykeo.com", // Replace with your actual domain
    siteName: "Mixed By Keo",
    images: [
      {
        url: "https://www.mixedbykeo.com/pfp.jpg", // Replace with a relevant image for social sharing
        width: 800,
        height: 600,
        alt: "Mixed By Keo - Audio Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixed By Keo | Professional Mixing & Mastering Services",
    description: "Elevate your music with professional mixing and mastering services by Keo. Achieve clarity, depth, and industry-standard quality for your tracks.",
    images: ["https://www.mixedbykeo.com/pfp.jpg"], // Replace with a relevant image for social sharing
  },
  generator: 'v0.app',
  metadataBase: new URL('https://www.mixedbykeo.com'), // Replace with your actual domain
};

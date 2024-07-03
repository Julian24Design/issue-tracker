import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import Navbar from "./Navbar"
import { Container, Theme, ThemePanel } from "@radix-ui/themes"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "The best issue tracker you ever dream of.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster
          position="top-center"
          containerStyle={{ top: 100 }}
          toastOptions={{
            style: { padding: "14px 20px", maxWidth: "600px" },
            error: { style: { color: "#ff4b4b", fontWeight: 600 } },
          }}
        />
        <Theme accentColor="crimson">
          {/* <ThemePanel /> */}
          <Navbar />
          <Container size="3" px="5">
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  )
}

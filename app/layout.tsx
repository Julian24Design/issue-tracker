import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./Navbar"
import { Container, Theme, ThemePanel } from "@radix-ui/themes"
import { Toaster } from "react-hot-toast"
import { auth } from "@/auth"
import { PropsWithChildren } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "The best issue tracker you ever dream of.",
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth()

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
          <Navbar session={session} />
          <Container size="3" px="5">
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  )
}

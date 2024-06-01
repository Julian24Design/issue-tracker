import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Navbar from "./Navbar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "The best issue tracker you ever dream of.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="crimson">
          {/* <ThemePanel /> */}
          <Navbar />
          <Container size="2">{children}</Container>
        </Theme>
      </body>
    </html>
  );
}

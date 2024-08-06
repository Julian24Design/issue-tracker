"use client"

import React from "react"
import Link from "next/link"
import { FaShapes } from "react-icons/fa6"
import { usePathname } from "next/navigation"
import { Avatar, Button, HoverCard, Text } from "@radix-ui/themes"
import { useSession } from "next-auth/react"

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Issues", href: "/issues" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { status, data } = useSession()

  return (
    <nav className="flex justify-between border-b-2 h-[80px] px-7 items-center text-lg">
      <Link href="/">
        <FaShapes className="text-2xl text-pink-600" />
      </Link>
      <ul className="flex space-x-8 ">
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                pathname === item.href
                  ? "text-pink-600 font-bold"
                  : "text-gray-400 font-bold hover:text-gray-500 transition-colors"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      {renderAuthStatus()}
    </nav>
  )

  function renderAuthStatus() {
    switch (status) {
      case "loading":
        return (
          <span className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
        )
      case "unauthenticated":
        return (
          <Link href="/api/auth/signin">
            <Button>Log in</Button>
          </Link>
        )
      case "authenticated":
        return (
          <HoverCard.Root>
            <HoverCard.Trigger>
              <div className="bg-gray-200 bg-opacity-0 hover:bg-opacity-100 p-2  rounded-full transition-all">
                <Avatar
                  src={data.user!.image!}
                  fallback={<p className="text-2xl">😀</p>}
                  radius="full"
                  size="2"
                />
              </div>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <Text as="p" color="gray" mb="3">
                {data.user!.email}
              </Text>
              <Link href="/api/auth/signout">
                <Button variant="soft" className="w-full">
                  Log out
                </Button>
              </Link>
            </HoverCard.Content>
          </HoverCard.Root>
        )
    }
  }
}

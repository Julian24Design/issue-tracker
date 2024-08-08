"use client"

import React from "react"
import Link from "next/link"
import { FaShapes } from "react-icons/fa6"
import { usePathname } from "next/navigation"
import { Avatar, Button, HoverCard, Text } from "@radix-ui/themes"
import { signIn, signOut } from "next-auth/react"
import { Session } from "next-auth"

const menu = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Issues", href: "/issues" },
]

export default function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname()

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
    if (!session?.user) return <Button onClick={() => signIn()}>Sign in</Button>
    return (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <div className="bg-gray-200 bg-opacity-0 hover:bg-opacity-100 p-2  rounded-full transition-all">
            <Avatar
              src={session.user.image!}
              fallback={<p className="text-1xl">😀</p>}
              radius="full"
              size="2"
            />
          </div>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Text as="p" color="gray" mb="3">
            {session.user.email}
          </Text>
          <Button variant="soft" className="w-full" onClick={() => signOut()}>
            Sign out
          </Button>
        </HoverCard.Content>
      </HoverCard.Root>
    )
  }
}

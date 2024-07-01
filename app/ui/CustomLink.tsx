import React, { ReactNode } from "react"
import NextLink from "next/link"
import { Link as RadixLink } from "@radix-ui/themes"

export default function CustomLink({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

import { Link as RadixLink } from "@radix-ui/themes"
import NextLink from "next/link"
import { ReactNode } from "react"

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

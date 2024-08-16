import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export default function CustomLink({
  children,
  href,
  ...props
}: {
  children: ReactNode
  href: string
  // Allow all props from RadixLink to be passed through
} & ComponentPropsWithoutRef<typeof RadixLink>) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink {...props}>{children}</RadixLink>
    </NextLink>
  )
}

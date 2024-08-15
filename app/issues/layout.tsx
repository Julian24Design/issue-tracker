import { Container } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Issues',
    default: 'Issues',
    absolute: 'Issues',
  },
}

export default function IssuesLayout({ children }: PropsWithChildren) {
  return (
    <Container size='3' px='5'>
      {children}
    </Container>
  )
}

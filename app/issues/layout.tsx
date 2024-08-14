import { Container } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

export default function IssuesLayout({ children }: PropsWithChildren) {
  return (
    <Container size='3' px='5'>
      {children}
    </Container>
  )
}

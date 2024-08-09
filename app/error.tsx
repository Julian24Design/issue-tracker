'use client'

import { Button, Flex, Heading, Section } from '@radix-ui/themes'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Section>
      <Flex direction="column" align="center" gap="5">
        <Heading size="6">Something went wrong!</Heading>
        <Button size="3" onClick={() => reset()}>
          Try again
        </Button>
      </Flex>
    </Section>
  )
}

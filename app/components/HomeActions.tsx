'use client'

import { Button, Flex, Text } from '@radix-ui/themes'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function HomeActions({ session }: { session: Session | null }) {
  if (!session)
    return (
      <Button size='4' onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>
        Sign in
      </Button>
    )
  return (
    <Flex direction='column' gap='6' align='center'>
      <Text size='6' weight='medium'>
        Welcome, {session.user?.name}!
      </Text>
      <Link href='/dashboard'>
        <Button size='4' variant='outline'>
          Go to app
        </Button>
      </Link>
    </Flex>
  )
}

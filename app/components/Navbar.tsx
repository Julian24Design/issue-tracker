'use client'

import {
  Avatar,
  Button,
  Flex,
  Grid,
  HoverCard,
  Separator,
  Skeleton,
  Text,
} from '@radix-ui/themes'
import { FaShapes } from 'react-icons/fa6'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import CustomLink from './CustomLink'

const links = [
  { label: 'Home', href: '/', segment: null },
  { label: 'Dashboard', href: '/dashboard', segment: 'dashboard' },
  { label: 'Issues', href: '/issues/list', segment: 'issues' },
]

export default function Navbar({}: { a: string; b: number }) {
  const segment = useSelectedLayoutSegment()
  const { status, data } = useSession()

  return (
    <nav>
      <Grid columns='3' justify='center' align='center' height='80px' px='7'>
        <Flex>
          <Link href='/'>
            <FaShapes className='text-2xl text-[var(--accent-9)]' />
          </Link>
        </Flex>
        <Flex justify='center' gap='8'>
          {links.map((link, i) => (
            <CustomLink
              key={i}
              href={link.href}
              weight={segment === link.segment ? 'bold' : undefined}
              color={segment === link.segment ? undefined : 'gray'}
            >
              {link.label}
            </CustomLink>
          ))}
        </Flex>
        <Flex justify='end'>{renderAuthStatus()}</Flex>
      </Grid>
      <Separator size='4' className='bg-[var(--gray-5)]' />
    </nav>
  )

  function renderAuthStatus() {
    if (status === 'loading')
      return <Skeleton width='32px' height='32px' mr='2' className='rounded-full' />
    if (status === 'unauthenticated')
      return (
        <Button onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>
          Sign in
        </Button>
      )
    return (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <div className='bg-gray-200 bg-opacity-0 hover:bg-opacity-100 p-2  rounded-full transition-all'>
            <Avatar
              src={data?.user?.image!}
              fallback={<p className='text-1xl'>😀</p>}
              radius='full'
              size='2'
            />
          </div>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Text as='p' color='gray' mb='3'>
            {data?.user?.email}
          </Text>
          <Button variant='soft' className='w-full' onClick={() => signOut()}>
            Sign out
          </Button>
        </HoverCard.Content>
      </HoverCard.Root>
    )
  }
}

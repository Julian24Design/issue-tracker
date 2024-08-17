'use client'

import {
  Avatar,
  Box,
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
import dynamic from 'next/dynamic'
import { ThemeToggleSkeleton } from './ThemeToggle'
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => <ThemeToggleSkeleton />,
})

const links = [
  { label: 'Home', href: '/', segment: null },
  { label: 'Dashboard', href: '/dashboard', segment: 'dashboard' },
  { label: 'Issues', href: '/issues/list', segment: 'issues' },
]

export default function Navbar() {
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
        <Flex justify='end' align='center' gap='5'>
          <ThemeToggle />
          {renderUser()}
        </Flex>
      </Grid>
      <Separator size='4' />
    </nav>
  )

  function renderUser() {
    if (status === 'loading')
      return (
        <div className='flex aspect-square h-12 items-center justify-center'>
          <Skeleton width='32px' height='32px' className='rounded-full' />
        </div>
      )
    if (status === 'unauthenticated')
      return (
        <Button onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}>
          Sign in
        </Button>
      )
    return (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <div className='flex aspect-square h-12 items-center justify-center rounded-full bg-transparent transition-all hover:bg-[var(--gray-3)]'>
            <Avatar
              src={data?.user?.image!}
              fallback={<p className='text-1xl'>😀</p>}
              radius='full'
              size='2'
            />
          </div>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Box p='1'>
            <Text as='p' mb='3' size='2'>
              {data?.user?.email}
            </Text>
            <Button
              variant='soft'
              className='w-full'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign out
            </Button>
          </Box>
        </HoverCard.Content>
      </HoverCard.Root>
    )
  }
}

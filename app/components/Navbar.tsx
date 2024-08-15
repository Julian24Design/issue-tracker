'use client'

import Link from 'next/link'
import { FaShapes } from 'react-icons/fa6'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Avatar, Button, HoverCard, Skeleton, Text } from '@radix-ui/themes'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const links = [
  { label: 'Home', href: '/', segment: null },
  { label: 'Dashboard', href: '/dashboard', segment: 'dashboard' },
  { label: 'Issues', href: '/issues/list', segment: 'issues' },
]

export default function Navbar() {
  const segment = useSelectedLayoutSegment()
  const { status, data } = useSession()

  return (
    <nav className='grid grid-cols-3 justify-items-center border-b-2 h-[80px] px-7 items-center text-lg'>
      <Link href='/' className='justify-self-start'>
        <FaShapes className='text-2xl text-pink-600' />
      </Link>
      <ul className='flex space-x-8 '>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                segment === link.segment
                  ? 'text-pink-600 font-bold'
                  : 'text-gray-400 font-bold hover:text-gray-500 transition-colors'
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className='justify-self-end'>{renderAuthStatus()}</div>
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

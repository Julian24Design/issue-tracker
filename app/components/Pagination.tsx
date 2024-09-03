'use client'

import { Button, Flex, IconButton } from '@radix-ui/themes'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'

export default function Pagination({ totlePages }: { totlePages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Validate page param
  let currentPage = Number(searchParams.get('page'))
  if (Number.isNaN(currentPage) || currentPage < 1) {
    currentPage = 1
  } else if (currentPage > totlePages) {
    currentPage = totlePages
  }

  return (
    <Flex gap='2' align='center' justify='center'>
      {currentPage <= 1 ? (
        <IconButton variant='soft' color='gray' size='2' disabled>
          <ArrowLeftIcon />
        </IconButton>
      ) : (
        <Link href={createPageUrl(currentPage - 1)}>
          <IconButton variant='soft' color='gray' size='2'>
            <ArrowLeftIcon />
          </IconButton>
        </Link>
      )}

      {[...Array(totlePages)].map((_, i) => (
        <Link key={i} href={createPageUrl(i + 1)}>
          <Button
            className='w-8'
            variant={i + 1 === currentPage ? undefined : 'soft'}
            color={i + 1 === currentPage ? undefined : 'gray'}
          >
            {i + 1}
          </Button>
        </Link>
      ))}

      {currentPage >= totlePages ? (
        <IconButton variant='soft' color='gray' size='2' disabled>
          <ArrowRightIcon />
        </IconButton>
      ) : (
        <Link href={createPageUrl(currentPage + 1)}>
          <IconButton variant='soft' color='gray' size='2'>
            <ArrowRightIcon />
          </IconButton>
        </Link>
      )}
    </Flex>
  )

  function createPageUrl(page: number) {
    const params = new URLSearchParams(searchParams)
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    return params.size ? pathname + '?' + params.toString() : pathname
  }
}

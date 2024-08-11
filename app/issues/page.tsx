import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Section, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { Suspense } from 'react'
import IssuesTableBody from './IssuesTableBody'
import IssuesTableBodyLoading from './IssuesTableBodyLoading'
import StatusFilter from './StatusFilter'
import { Issue, Status } from '@prisma/client'
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'

export const dynamic = 'force-dynamic'

export type IssuesPageProps = {
  searchParams: { status: Status; orderBy: keyof Issue; order: 'asc' | 'desc' }
}

export const columns = [
  { label: 'Title', orderBy: 'title' },
  {
    label: 'Status',
    orderBy: 'status',
    width: '150px',
    className: 'hidden sm:table-cell',
  },
  {
    label: 'Created at',
    orderBy: 'createdAt',
    width: '200px',
    className: 'hidden sm:table-cell',
  },
]

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  // if param order is asc, flip it to desc
  // if param order is desc, remove it
  // if param order doesn't exist, set it as asc
  let order: typeof searchParams.order | undefined
  if (!searchParams.order) {
    order = 'asc'
  } else if (searchParams.order === 'asc') {
    order = 'desc'
  }

  return (
    <Section>
      <Flex mb='6' justify='between'>
        <StatusFilter />
        <Link href='/issues/new'>
          <Button>
            <PlusIcon />
            Add issue
          </Button>
        </Link>
      </Flex>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                width={column.width}
                className={column.className}
              >
                <Link
                  href={{ query: { orderBy: column.orderBy, order } }}
                  className='flex items-center gap-1 hover:underline underline-offset-4 decoration-dotted'
                >
                  {column.label}
                  {column.orderBy === searchParams.orderBy &&
                    searchParams.order === 'asc' && <ChevronUpIcon />}
                  {column.orderBy === searchParams.orderBy &&
                    searchParams.order === 'desc' && <ChevronDownIcon />}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Suspense fallback={<IssuesTableBodyLoading />}>
          <IssuesTableBody searchParams={searchParams} />
        </Suspense>
      </Table.Root>
    </Section>
  )
}

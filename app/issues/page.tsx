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

export type Props = {
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

export default async function IssuesPage({ searchParams }: Props) {
  // Evaluate the toggled order for the case of clicking the same column
  let toggledOrder: typeof searchParams.order | undefined
  if (!searchParams.order) {
    toggledOrder = 'asc'
  } else if (searchParams.order === 'asc') {
    toggledOrder = 'desc'
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
        {renderTableHeader()}
        <Suspense fallback={<IssuesTableBodyLoading />}>
          <IssuesTableBody searchParams={searchParams} />
        </Suspense>
      </Table.Root>
    </Section>
  )

  function renderTableHeader() {
    return (
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.label}
              width={column.width}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    status: searchParams.status,
                    orderBy: column.orderBy,
                    order: column.orderBy === searchParams.orderBy ? toggledOrder : 'asc',
                  },
                }}
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
    )
  }
}

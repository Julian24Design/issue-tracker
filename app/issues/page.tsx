import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Section, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { Suspense } from 'react'
import IssuesTableBody from './IssuesTableBody'
import IssuesTableBodyLoading from './IssuesTableBodyLoading'
import StatusFilter from './StatusFilter'
import { Status } from '@prisma/client'

export const dynamic = 'force-dynamic'

export default async function IssuesPage({ searchParams }: { searchParams: { status: Status } }) {
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
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width='150px' className='hidden sm:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width='200px' className='hidden sm:table-cell'>
              Created at
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Suspense fallback={<IssuesTableBodyLoading />}>
          <IssuesTableBody searchParams={searchParams} />
        </Suspense>
      </Table.Root>
    </Section>
  )
}

import Link from 'next/link'
import { Button, Flex, Section } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import IssuesTableFilter from './IssuesTableFilter'
import IssuesTable from './IssuesTable'
import { Status, Issue } from '@prisma/client'
import { Suspense } from 'react'
import IssuesTableLoading from './IssuesTableLoading'

export const dynamic = 'force-dynamic'

export type IssueQuery = {
  status: Status
  orderBy: keyof Issue
  order: 'asc' | 'desc'
  page: number
}

export default function IssuesPage({ searchParams }: { searchParams: IssueQuery }) {
  return (
    <Section>
      <Flex direction='column' gap='6'>
        <Flex justify='between'>
          <IssuesTableFilter />
          <Link href='/issues/new'>
            <Button>
              <PlusIcon />
              Add issue
            </Button>
          </Link>
        </Flex>
        <Suspense fallback={<IssuesTableLoading />}>
          <IssuesTable searchParams={searchParams} />
        </Suspense>
      </Flex>
    </Section>
  )
}

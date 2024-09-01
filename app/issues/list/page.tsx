import Link from 'next/link'
import { Button, Flex, Section } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { Status, Issue } from '@prisma/client'
import { Suspense } from 'react'
import { IssuesTableFilter, IssuesTableLoading, IssuesTable } from './components'
import { Pagination } from '@/app/components'
import prisma from '@/prisma/client'

export const dynamic = 'force-dynamic'

export type IssueQuery = {
  status?: Status
  orderBy?: keyof Issue
  order?: string
  page?: string
}

export default async function IssuesPage({ searchParams }: { searchParams: IssueQuery }) {
  // Validate search params
  const status = Object.values(Status).includes(searchParams.status!)
    ? searchParams.status
    : undefined

  // Calculate total pages for pagination
  const pageSize = 10
  const count = await prisma.issue.count({ where: { status } })
  const totlePages = Math.ceil(count / pageSize)

  // Set default page to 1 if not provided
  const query = new URLSearchParams(searchParams)
  if (!searchParams.page) query.set('page', '1')
  const queryStr = query.toString()

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
        {/* Use key to force a re-render of loading state when the query changes */}
        <Suspense fallback={<IssuesTableLoading />} key={queryStr}>
          <IssuesTable query={{ ...searchParams, status, pageSize, totlePages }} />
        </Suspense>
        <Pagination totlePages={totlePages} />
      </Flex>
    </Section>
  )
}

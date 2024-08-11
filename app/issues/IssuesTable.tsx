import { Table, Strong } from '@radix-ui/themes'
import { formatDate } from '@/app/lib/utils'
import { CustomLink, StatusBadge } from '@/app/ui'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { Suspense } from 'react'
import IssuesTableLoading from './IssuesTableLoading'
import IssuesTableHeader, { columnValues } from './IssuesTableHeader'

export type IssueQuery = {
  status: Status
  orderBy: keyof Issue
  order: 'asc' | 'desc'
}

export default async function IssuesTable({
  searchParams,
}: {
  searchParams: IssueQuery
}) {
  // Validate search params
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined
  const order = ['asc', 'desc'].includes(searchParams.order)
    ? searchParams.order
    : undefined
  const orderBy = columnValues.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined

  // Fetch issues
  const issues = await prisma.issue.findMany({ where: { status }, orderBy })

  return (
    <Table.Root variant='surface'>
      <IssuesTableHeader searchParams={searchParams} />
      <Suspense fallback={<IssuesTableLoading />}>
        <Table.Body>
          {issues &&
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <CustomLink href={`/issues/${issue.id}`}>
                    <Strong>{issue.title}</Strong>
                  </CustomLink>
                  <div className='sm:hidden mt-2'>
                    <StatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden sm:table-cell'>
                  <StatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden sm:table-cell'>
                  {formatDate(issue.createdAt)}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Suspense>
    </Table.Root>
  )
}

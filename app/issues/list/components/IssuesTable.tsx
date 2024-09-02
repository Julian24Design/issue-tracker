import { Table, Strong } from '@radix-ui/themes'
import { formatDate } from '@/app/lib/utils'
import { CustomLink, StatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import IssuesTableHeader from './IssuesTableHeader'
import { IssueQuery } from '../page'

export const columns = [
  { label: 'Title', orderBy: 'title' },
  { label: 'Status', orderBy: 'status', width: '150px' },
  { label: 'Created at', orderBy: 'createdAt', width: '200px' },
]

export default async function IssuesTable({
  query,
}: {
  query: IssueQuery & { pageSize: number; totlePages: number }
}) {
  // Parse order params
  const order = Object.values(Prisma.SortOrder).includes(query.order!)
    ? query.order
    : undefined
  let orderBy
  if (order) {
    orderBy = Object.values(Prisma.IssueScalarFieldEnum).includes(query.orderBy!)
      ? { [query.orderBy!]: order }
      : undefined
  } else {
    orderBy = { createdAt: Prisma.SortOrder.desc }
  }

  // Parse page param
  let page = Number(query.page)
  if (Number.isNaN(page) || page < 1) {
    page = 1
  } else if (page > query.totlePages) {
    page = query.totlePages
  }

  // Fetch issues
  const issues = await prisma.issue.findMany({
    where: { status: query.status },
    orderBy,
    skip: (page - 1) * query.pageSize,
    take: query.pageSize,
  })

  await new Promise((resolve) => setTimeout(resolve, 500))

  return (
    <>
      <Table.Root variant='surface'>
        <IssuesTableHeader />
        <Table.Body>
          {issues &&
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <CustomLink href={`/issues/detail/${issue.id}`}>
                    <Strong>{issue.title}</Strong>
                  </CustomLink>
                  <div className='mt-2 sm:hidden'>
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
      </Table.Root>
    </>
  )
}

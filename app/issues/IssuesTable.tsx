import { Table, Strong } from '@radix-ui/themes'
import { formatDate } from '@/app/lib/utils'
import { CustomLink, Pagination, StatusBadge } from '@/app/ui'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssuesTableHeader from './IssuesTableHeader'
import { IssueQuery } from './page'

export const COLUMNS = [
  { label: 'Title', orderBy: 'title' },
  { label: 'Status', orderBy: 'status', width: '150px' },
  { label: 'Created at', orderBy: 'createdAt', width: '200px' },
]

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
  const orderBy = COLUMNS.map((col) => col.orderBy).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined

  // Get total pages
  const pageSize = 10
  const count = await prisma.issue.count({ where: { status } })
  const totlePages = Math.ceil(count / pageSize)

  // Validate page param
  let currentPage = Number(searchParams.page)
  if (Number.isNaN(currentPage) || currentPage < 1) {
    currentPage = 1
  } else if (currentPage > totlePages) {
    currentPage = totlePages
  }

  // Fetch issues
  const issues = await prisma.issue.findMany({
    where: { status },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy,
  })

  // await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <>
      <Table.Root variant='surface'>
        <IssuesTableHeader />
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
      </Table.Root>
      <Pagination totlePages={totlePages} />
    </>
  )
}

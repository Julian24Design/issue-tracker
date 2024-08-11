import { Table, Strong } from '@radix-ui/themes'
import { formatDate } from '@/app/lib/utils'
import { CustomLink, StatusBadge } from '@/app/ui'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { Props, columns } from './page'

export default async function IssuesTableBody({ searchParams }: Props) {
  // Validate search params
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined
  const order = ['asc', 'desc'].includes(searchParams.order)
    ? searchParams.order
    : undefined
  const orderBy = columns.map((column) => column.orderBy).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: order }
    : undefined

  const issues = await prisma.issue.findMany({ where: { status }, orderBy })
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
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
  )
}

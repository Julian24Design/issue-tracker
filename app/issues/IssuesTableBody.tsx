import { Table, Strong } from '@radix-ui/themes'
import { formatDate } from '@/app/lib/utils'
import { CustomLink, StatusBadge } from '@/app/ui'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'

export default async function IssuesTableBody({
  searchParams,
}: {
  searchParams: { status: Status }
}) {
  // Validate search params
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined

  const issues = await prisma.issue.findMany({ where: { status } })
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
            <Table.Cell className='hidden sm:table-cell'>{formatDate(issue.createdAt)}</Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  )
}

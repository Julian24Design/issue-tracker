import { CustomLink, StatusBadge } from "@/ui"
import prisma from "prisma/client"
import { Button, Section, Strong, Table } from "@radix-ui/themes"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany()
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <>
      <Section>
        <Link href="/issues/new">
          <Button>Add issue</Button>
        </Link>
      </Section>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell
              width="150px"
              className="hidden sm:table-cell"
            >
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell
              width="200px"
              className="hidden sm:table-cell"
            >
              Created at
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues &&
            issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <CustomLink href={`/issues/${issue.id}`}>
                    <Strong>{issue.title}</Strong>
                  </CustomLink>
                  <div className="sm:hidden mt-2">
                    <StatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  <StatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  {formatDate(issue.createdAt)}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

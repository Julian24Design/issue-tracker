import { Button, Link, Section, Skeleton, Table } from "@radix-ui/themes"

export default function IssuesPageLoading() {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
              <Table.Row key={issue}>
                <Table.Cell>
                  <Skeleton height="21px" />
                  <div className="sm:hidden mt-2">
                    <Skeleton />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  <Skeleton height="21px" />
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  <Skeleton height="21px" />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

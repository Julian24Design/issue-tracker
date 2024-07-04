import { PlusIcon } from "@radix-ui/react-icons"
import { Button, Section, Table } from "@radix-ui/themes"
import Link from "next/link"
import { Suspense } from "react"
import IssuesTableBody from "./IssuesTableBody"
import IssuesTableBodyLoading from "./IssuesTableBodyLoading"

export const dynamic = "force-dynamic"

export default async function IssuesPage() {
  return (
    <>
      <Section>
        <Link href="/issues/new">
          <Button className="hover:cursor-pointer">
            <PlusIcon />
            Add issue
          </Button>
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
        <Suspense fallback={<IssuesTableBodyLoading />}>
          <IssuesTableBody />
        </Suspense>
      </Table.Root>
    </>
  )
}

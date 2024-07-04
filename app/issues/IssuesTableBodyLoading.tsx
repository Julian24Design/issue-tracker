import { Table, Skeleton } from "@radix-ui/themes"

export default function IssuesTableBodyLoading() {
  return (
    <Table.Body>
      {[...Array(10)].map((element, index) => (
        <Table.Row key={index}>
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
  )
}

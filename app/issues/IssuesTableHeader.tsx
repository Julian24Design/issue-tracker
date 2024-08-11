import { ChevronUpIcon } from '@radix-ui/react-icons'
import { Table, ChevronDownIcon } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueQuery } from './IssuesTable'

// Define column headers
const columns = [
  { label: 'Title', orderBy: 'title' },
  { label: 'Status', orderBy: 'status', width: '150px' },
  { label: 'Created at', orderBy: 'createdAt', width: '200px' },
]
export const columnValues = columns.map((col) => col.orderBy)

export default function IssuesTableHeader({
  searchParams,
}: {
  searchParams: IssueQuery
}) {
  const { status, orderBy, order } = searchParams

  // Evaluate the toggled order for the case of clicking the same column
  let toggledOrder: typeof order | undefined
  if (!order) {
    toggledOrder = 'asc'
  } else if (order === 'asc') {
    toggledOrder = 'desc'
  }

  return (
    <Table.Header>
      <Table.Row>
        {columns.map((col) => (
          <Table.ColumnHeaderCell key={col.label} width={col.width}>
            <Link
              href={{
                query: {
                  status: status,
                  orderBy: col.orderBy,
                  order: col.orderBy === orderBy ? toggledOrder : 'asc',
                },
              }}
              className='flex items-center gap-1 hover:underline underline-offset-4 decoration-dotted'
            >
              {col.label}
              {col.orderBy === orderBy && order === 'asc' && <ChevronUpIcon />}
              {col.orderBy === orderBy && order === 'desc' && <ChevronDownIcon />}
            </Link>
          </Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  )
}

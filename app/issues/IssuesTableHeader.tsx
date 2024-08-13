'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { Table, ChevronDownIcon } from '@radix-ui/themes'
import { ChevronUpIcon } from '@radix-ui/react-icons'
import { COLUMNS } from './IssuesTable'

export default function IssuesTableHeader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const orderBy = searchParams.get('orderBy')
  const order = searchParams.get('order')

  return (
    <Table.Header>
      <Table.Row>
        {COLUMNS.map((col) => (
          <Table.ColumnHeaderCell key={col.label} width={col.width}>
            <Link
              href={createSortingUrl(col.orderBy)}
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

  function createSortingUrl(column: string) {
    const params = new URLSearchParams(searchParams)
    params.set('orderBy', column)

    // Set the sort order
    if (column === orderBy) {
      // Toggle the sort order when the same column is clicked
      if (order === 'asc') {
        params.set('order', 'desc')
      } else if (order === 'desc') {
        params.delete('order')
      } else if (!order) {
        params.set('order', 'asc')
      }
      // Default to ascending order when a different column is clicked
    } else params.set('order', 'asc')

    params.set('page', '1') // Reset to the first page when sorting

    return pathname + '?' + params.toString()
  }
}

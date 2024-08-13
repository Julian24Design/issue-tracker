import { Table, Skeleton } from '@radix-ui/themes'
import { COLUMNS } from './IssuesTable'

export default function IssuesTableBodyLoading() {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {COLUMNS.map((col) => (
            <Table.ColumnHeaderCell key={col.label} width={col.width}>
              {col.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(10)].map((element, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Skeleton height='21px' />
              <div className='sm:hidden mt-2'>
                <Skeleton />
              </div>
            </Table.Cell>
            <Table.Cell className='hidden sm:table-cell'>
              <Skeleton height='21px' />
            </Table.Cell>
            <Table.Cell className='hidden sm:table-cell'>
              <Skeleton height='21px' />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

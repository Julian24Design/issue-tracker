'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const statuses: { label: string; value: Status | 'all' }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'All', value: 'all' },
]

export default function IssuesTableFilter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get <Select> value from search params
  const status = searchParams.get('status')
  const statusIsValid = status && Object.values(Status).includes(status as Status)
  const value = statusIsValid ? status : 'all'

  // Apply filter by setting 'status' in the url
  const filter = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value !== 'all') {
      params.set('status', value)
    } else {
      params.delete('status')
    }
    params.delete('page') // Reset to the first page when filtering
    const query = params.toString() ? '?' + params.toString() : ''
    router.push(pathname + query)
  }

  return (
    <Select.Root value={value} onValueChange={filter}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

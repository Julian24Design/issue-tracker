'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

export default function IssuesTableFilter() {
  const statuses: { label: string; value: Status | 'all' }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'All', value: 'all' },
  ]

  // Get <Select> value from search params
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const statusIsValid = status && Object.values(Status).includes(status as Status)
  const value = statusIsValid ? status : 'all'

  const router = useRouter()

  // Filter by setting status in url
  const filter = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value !== 'all') {
      params.set('status', value)
    } else {
      params.delete('status')
    }
    const query = params.toString() ? '?' + params.toString() : ''
    router.push('/issues' + query)
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

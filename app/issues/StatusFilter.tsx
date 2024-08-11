'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

export default function StatusFilter() {
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

  // Append search params to url
  const filter = (value: string) => {
    const orderBy = searchParams.get('orderBy')
    const order = searchParams.get('order')
    const url = new URLSearchParams()
    if (orderBy) url.append('orderBy', orderBy)
    if (order) url.append('order', order)
    if (value !== 'all') url.append('status', value)
    const query = url.toString() ? '?' + url.toString() : '/issues'
    router.push(query)
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

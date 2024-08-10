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

  // Get default value from search param
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const isValid = status && Object.values(Status).includes(status as Status)
  const defaultValue = isValid ? status : undefined

  const router = useRouter()

  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={(value) => {
        const url = value === 'all' ? '/issues' : '?status=' + value
        router.push(url)
      }}
    >
      <Select.Trigger placeholder='Filter status' />
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

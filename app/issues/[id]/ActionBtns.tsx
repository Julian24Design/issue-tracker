'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, Select, Avatar, Button } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import DeleteBtn from './DeleteBtn'
import { Issue, User } from '@prisma/client'

export default function ActionBtns({ issue, users }: { issue: Issue; users: User[] }) {
  const assignIssue = async (value: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedUserId: value === 'unassigned' ? null : value,
      })
      if (value === 'unassigned') {
        toast.success('Issue unassigned.')
      } else toast.success('Issue assigned.')
    } catch (error) {
      toast.error('Unable to assign.')
    }
  }

  return (
    <Flex gap='2'>
      <Select.Root
        defaultValue={issue.assignedUserId ? issue.assignedUserId : 'unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger />
        <Select.Content position='popper'>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              <Flex align='center' gap='1'>
                <Avatar
                  src={user.image!}
                  fallback={user.name!.charAt(0).toUpperCase()}
                  radius='full'
                  className='w-4 h-4'
                />
                {user.name}
              </Flex>
            </Select.Item>
          ))}
          <Select.Item value='unassigned'>Unassigned</Select.Item>
        </Select.Content>
      </Select.Root>
      <Link href={`/issues/${issue.id}/edit`}>
        <Button>
          <Pencil1Icon />
          Edit issue
        </Button>
      </Link>
      <DeleteBtn issueId={issue.id} />
    </Flex>
  )
}

import { formatDate } from '@/app/lib/utils'
import { StatusBadge } from '@/app/ui'
import prisma from '@/prisma/client'
import {
  Box,
  Card,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
  Button,
  Select,
  Avatar,
} from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import Link from 'next/link'
import { Pencil1Icon } from '@radix-ui/react-icons'
import DeleteBtn from '../DeleteBtn'
import { auth } from '@/auth'

export default async function IssueDetail({ params }: { params: { id: string } }) {
  // Validate id format
  const id = Number(params.id)
  if (Number.isNaN(id)) notFound()

  // Fetch issue and validate existence
  const issue = await prisma.issue.findUnique({ where: { id: id } })
  if (!issue) notFound()

  // Fetch users
  const users = await prisma.user.findMany()

  const session = await auth()

  return (
    <Section>
      <Flex
        direction={{ initial: 'column-reverse', xs: 'row' }}
        justify={{ initial: 'start', xs: 'between' }}
        align={{ initial: 'start', xs: 'center' }}
        gap='5'
      >
        <Heading>{issue.title}</Heading>
        {session && renderActions()}
      </Flex>
      <Flex gap='4' my='5' align='center'>
        <StatusBadge status={issue.status}></StatusBadge>
        <Separator orientation='vertical'></Separator>
        <Text>{formatDate(issue.createdAt)}</Text>
      </Flex>
      <Card>
        <Box px='2'>
          <Markdown className='prose'>{issue.description}</Markdown>
        </Box>
      </Card>
    </Section>
  )

  function renderActions() {
    return (
      <Flex gap='2'>
        <Select.Root defaultValue='unassigned'>
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
        <Link href={`/issues/${issue!.id}/edit`}>
          <Button>
            <Pencil1Icon />
            Edit issue
          </Button>
        </Link>
        <DeleteBtn issueId={id} />
      </Flex>
    )
  }
}

import { formatDate } from '@/app/lib/utils'
import { StatusBadge } from '@/app/ui'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Heading, Section, Separator, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import { auth } from '@/auth'
import ActionBtns from '../ActionBtns'

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
        {session && <ActionBtns issue={issue} users={users} />}
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
}

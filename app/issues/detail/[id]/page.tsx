import { formatDate } from '@/app/lib/utils'
import { StatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Heading, Section, Separator, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import { ActionBtns } from './components'
import { cache } from 'react'
import { Metadata } from 'next'

// Cache a data fetch (Request Memoization in Next.js)
const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  // Validate id format
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()

  const issue = await fetchIssue(id)
  return { title: issue?.title }
}

export default async function IssueDetail({ params }: { params: { id: string } }) {
  // Fetch issue and validate existence
  const issue = await fetchIssue(parseInt(params.id))
  if (!issue) notFound()

  // Fetch users for assigning component
  const users = await prisma.user.findMany()

  return (
    <Section>
      <Flex
        direction={{ initial: 'column-reverse', xs: 'row' }}
        justify={{ initial: 'start', xs: 'between' }}
        align={{ initial: 'start', xs: 'center' }}
        gap='5'
      >
        <Heading>{issue.title}</Heading>
        <ActionBtns issue={issue} users={users} />
      </Flex>
      <Flex gap='4' my='5' align='center'>
        <StatusBadge status={issue.status}></StatusBadge>
        <Separator orientation='vertical'></Separator>
        <Text>{formatDate(issue.createdAt)}</Text>
      </Flex>
      <Card size='4' className='bg-[var(--gray-4)] dark:bg-transparent'>
        <Markdown className='prose'>{issue.description}</Markdown>
      </Card>
    </Section>
  )
}

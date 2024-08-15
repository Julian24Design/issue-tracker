import { Section, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'
import { IssueForm } from '@/app/issues/components'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  // Validate id format
  const id = parseInt(params.id)
  if (isNaN(id)) notFound()

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
  return { title: { absolute: `${issue?.title} - Edit issue` } }
}

export default async function EditIssue({ params }: { params: { id: string } }) {
  // Fetch data by id
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  // If result is null, go 404
  if (!issue) notFound()

  return (
    <Section>
      <Heading className='mb-10'>Edit issue</Heading>
      <IssueForm issue={issue} />
    </Section>
  )
}

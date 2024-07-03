import { Section, Heading } from "@radix-ui/themes"
import IssueForm from "@/app/issues/_components/IssueForm"
import { notFound } from "next/navigation"
import prisma from "@/prisma/client"

export default async function EditIssue({
  params,
}: {
  params: { id: string }
}) {
  // Validate id type
  const id = Number(params.id)
  if (Number.isNaN(id)) notFound()

  // Fetch data by id
  const issue = await prisma.issue.findUnique({
    where: { id: id },
  })
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // If result is null, go 404
  if (!issue) notFound()

  return (
    <Section>
      <Heading>Edit issue</Heading>
      <IssueForm issue={issue} />
    </Section>
  )
}

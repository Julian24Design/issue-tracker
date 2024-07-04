import { Section, Heading } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import prisma from "@/prisma/client"
import dynamic from "next/dynamic"
import IssueFormLoading from "@/app/issues/_components/IssueFormLoading"
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
})

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
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  // If result is null, go 404
  if (!issue) notFound()

  return (
    <Section>
      <Heading className="mb-10">Edit issue</Heading>
      <IssueForm issue={issue} />
    </Section>
  )
}

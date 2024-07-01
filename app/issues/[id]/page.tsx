import { formatDate } from "@/app/lib/utils"
import StatusBadge from "@/app/ui/StatusBadge"
import prisma from "@/prisma/client"
import {
  Box,
  Card,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"

export default async function IssueDetailPage({
  params,
}: {
  params: { id: string }
}) {
  if (!/^\d+$/.test(params.id)) notFound()
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!issue) notFound()

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return (
    <Section>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="5" align="center">
        <StatusBadge status={issue.status}></StatusBadge>
        <Separator orientation="vertical"></Separator>
        <Text>{formatDate(issue.createdAt)}</Text>
      </Flex>
      <Card>
        <Box px="2">
          <Markdown className="prose">{issue.description}</Markdown>
        </Box>
      </Card>
    </Section>
  )
}

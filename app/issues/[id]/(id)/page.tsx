import { formatDate } from "@/app/lib/utils"
import { StatusBadge } from "@/app/ui"
import prisma from "@/prisma/client"
import {
  Box,
  Card,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
  Button,
} from "@radix-ui/themes"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import Link from "next/link"
import { Pencil1Icon } from "@radix-ui/react-icons"

export default async function IssueDetail({
  params,
}: {
  params: { id: string }
}) {
  const id = Number(params.id)
  if (Number.isNaN(id)) notFound()

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  })
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  if (!issue) notFound()

  return (
    <Section>
      <Flex
        direction={{ initial: "column-reverse", xs: "row" }}
        justify={{ initial: "start", xs: "between" }}
        align={{ initial: "start", xs: "center" }}
        gap="5"
      >
        <Heading>{issue.title}</Heading>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button className="hover:cursor-pointer">
            <Pencil1Icon />
            Edit issue
          </Button>
        </Link>
      </Flex>
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

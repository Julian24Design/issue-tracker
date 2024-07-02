import prisma from "prisma/client"
import { createIssueSchema } from "../../validationSchema"

export async function POST(request: Request) {
  // Validation
  const body = await request.json()
  console.log("Request body", body)
  const validation = createIssueSchema.safeParse(body)
  if (!validation.success)
    return Response.json(validation.error.format(), { status: 400 })

  // Mutation
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  })
  console.log("Created successfully!", newIssue)
  return Response.json(newIssue, { status: 201 })
}

import { IssueSchema } from "@/app/validationSchema"
import prisma from "@/prisma/client"

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  // Validate request body format
  let body
  try {
    body = await request.json()
  } catch (error) {
    return Response.json("Invalid JSON format", { status: 400 })
  }

  // Validate request body schema
  const validation = IssueSchema.safeParse(body)
  if (!validation.success)
    return Response.json(validation.error.format(), { status: 400 })

  // Validate id type
  const id = Number(context.params.id)
  if (Number.isNaN(id)) return Response.json("Invalid ID", { status: 400 })

  // Validate id existence
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: id },
    })
    if (!issue) return Response.json("ID not found", { status: 404 })
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return Response.json("Unknown error", { status: 500 })
  }

  // Mutation
  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: id },
      data: {
        title: body.title,
        description: body.description,
      },
    })
    return Response.json(updatedIssue, { status: 200 })
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return Response.json("Unknown error", { status: 500 })
  }
}

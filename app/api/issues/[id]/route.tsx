import { PatchIssueSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function PATCH(request: Request, context: { params: { id: string } }) {
  // Validate issue id type from url
  const id = Number(context.params.id)
  if (Number.isNaN(id)) return Response.json('Invalid issue ID', { status: 400 })

  // Validate request body format
  let body: z.infer<typeof PatchIssueSchema>
  try {
    body = await request.json()
  } catch (error) {
    return Response.json('Invalid JSON format', { status: 400 })
  }

  // Validate request body schema
  const validation = PatchIssueSchema.safeParse(body)
  if (!validation.success) return Response.json(validation.error.format(), { status: 400 })

  // Validate the existence of issue id and user id
  const { title, description, assignedUserId } = body
  try {
    const issue = await prisma.issue.findUnique({ where: { id: id } })
    if (!issue) return Response.json('Issue ID not found', { status: 404 })

    if (assignedUserId) {
      const user = await prisma.user.findUnique({ where: { id: assignedUserId } })
      if (!user) return Response.json('Assigned user ID not found', { status: 404 })
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return Response.json('Unknown error', { status: 500 })
  }

  // Mutation
  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: id },
      data: { title, description, assignedUserId },
    })
    return Response.json(updatedIssue, { status: 200 })
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return Response.json('Unknown error', { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  // Validate id type
  const id = Number(context.params.id)
  if (Number.isNaN(id)) return Response.json('Invalid issue ID', { status: 400 })

  // Validate id existence
  try {
    const issue = await prisma.issue.findUnique({ where: { id: id } })
    if (!issue) return Response.json('Issue ID not found', { status: 404 })
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return Response.json('Unknown error', { status: 500 })
  }

  // Mutation
  try {
    const deletedIssue = await prisma.issue.delete({ where: { id: id } })
    return Response.json(deletedIssue, { status: 200 })
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return Response.json('Unknown error', { status: 500 })
  }
}

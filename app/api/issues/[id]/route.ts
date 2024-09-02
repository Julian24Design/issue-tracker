import {
  handlePrismaError,
  parseRequestBody,
  checkRecordExistence,
  validateRequestBody,
  parseUrlId,
} from '@/app/lib/utils'
import { PatchIssueSchema } from '@/app/lib/validationSchema'
import prisma from '@/prisma/client'
import { z } from 'zod'

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const id = parseUrlId(context.params.id)
  if (id instanceof Response) return id

  type Schema = z.infer<typeof PatchIssueSchema>
  const body: Schema = await parseRequestBody(request)
  if (body instanceof Response) return body

  const res = validateRequestBody(body, PatchIssueSchema)
  if (res instanceof Response) return res

  const { title, description, assignedUserId } = body
  try {
    const res = await checkRecordExistence(id, 'issue')
    if (res instanceof Response) return res

    if (assignedUserId) {
      const res = await checkRecordExistence(assignedUserId, 'user')
      if (res instanceof Response) return res
    }
  } catch (error) {
    return handlePrismaError(error)
  }

  // Mutation
  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: id },
      data: { title, description, assignedUserId },
    })
    return Response.json(updatedIssue, { status: 200 })
  } catch (error) {
    return handlePrismaError(error)
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const id = parseUrlId(context.params.id)
  if (id instanceof Response) return id

  try {
    const res = await checkRecordExistence(id, 'issue')
    if (res instanceof Response) return res
  } catch (error) {
    return handlePrismaError(error)
  }

  // Mutation
  try {
    const deletedIssue = await prisma.issue.delete({ where: { id: id } })
    return Response.json(deletedIssue, { status: 200 })
  } catch (error) {
    return handlePrismaError(error)
  }
}

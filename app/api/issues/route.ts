import prisma from '@/prisma/client'
import { IssueSchema } from '@/app/lib/validationSchema'
import { handlePrismaError, parseRequestBody, validateRequestBody } from '@/app/lib/utils'
import { z } from 'zod'

export async function POST(request: Request) {
  type Schema = z.infer<typeof IssueSchema>
  const body: Schema = await parseRequestBody(request)
  if (body instanceof Response) return body

  const result = validateRequestBody(body, IssueSchema)
  if (result instanceof Response) return result

  // Mutation
  try {
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    })
    return Response.json(newIssue, { status: 201 })
  } catch (error) {
    return handlePrismaError(error)
  }
}

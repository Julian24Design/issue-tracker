import prisma from '@/prisma/client'
import { IssueSchema } from '@/app/lib/validationSchema'

export async function POST(request: Request) {
  // Validate request body format
  let body
  try {
    body = await request.json()
  } catch (error) {
    return Response.json('Invalid JSON format', { status: 400 })
  }

  // Validate request body schema
  const validation = IssueSchema.safeParse(body)
  if (!validation.success)
    return Response.json(validation.error.format(), { status: 400 })

  // Mutation
  try {
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description },
    })
    return Response.json(newIssue, { status: 201 })
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return Response.json('Unknown error', { status: 500 })
  }
}

import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import { ZodObject } from 'zod'

// Formats a Date object into a string with 'en-CA' locale
export const formatDate = (date: Date) => {
  return date
    .toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '')
}

// Parses a string ID into a number and returns a response if invalid
export function parseUrlId(id: string) {
  const parsedId = Number(id)
  return Number.isNaN(parsedId)
    ? Response.json('Invalid issue ID', { status: 400 })
    : parsedId
}

// Parses the request body as JSON and returns a response if invalid
export async function parseRequestBody(request: Request) {
  try {
    return await request.json()
  } catch (error) {
    return Response.json('Invalid JSON format', { status: 400 })
  }
}

// Validates the request body against a Zod schema and returns a response if invalid
export function validateRequestBody(body: object, schema: ZodObject<any, any>) {
  const validation = schema.safeParse(body)
  if (!validation.success)
    return Response.json(validation.error.format(), { status: 400 })
}

// Checks if a record exists in the database and returns a response if not found
export async function checkRecordExistence(
  id: number | string,
  model: Prisma.TypeMap['meta']['modelProps']
) {
  const modelDelegate = prisma[model] as any
  const record = await modelDelegate.findUnique({ where: { id: id } })
  if (!record) return Response.json(`${String(model)} ID not found`, { status: 404 })
}

// Handles Prisma errors and logs the error message
export function handlePrismaError(error: unknown) {
  if (error instanceof Error) console.log(error.message)
  return Response.json('Unknown error', { status: 500 })
}

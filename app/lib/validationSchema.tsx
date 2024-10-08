import { z } from 'zod'

export const IssueSchema = z.object({
  title: z
    .string({ required_error: 'Title is missing' })
    .trim()
    .min(1, { message: 'Title is empty' })
    .max(50, { message: 'Title exceeds 50 characters' }),
  description: z
    .string({ required_error: 'Description is missing' })
    .trim()
    .min(1, { message: 'Description is empty' })
    .max(255, { message: 'Description exceeds 255 characters' }),
})

export const PatchIssueSchema = z.object({
  title: z
    .string({ required_error: 'Title is missing' })
    .trim()
    .min(1, { message: 'Title is empty' })
    .max(50, { message: 'Title exceeds 50 characters' })
    .optional(),
  description: z
    .string({ required_error: 'Description is missing' })
    .trim()
    .min(1, { message: 'Description is empty' })
    .max(255, { message: 'Description exceeds 255 characters' })
    .optional(),
  assignedUserId: z
    .string({ required_error: 'assignedUserId is missing' })
    .trim()
    .min(1)
    .max(255)
    .optional()
    .nullable(),
})

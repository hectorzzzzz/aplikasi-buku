import { z } from 'zod'

export const taskSchema = z.object({
    title: z.string(),
    brief: z.string().nullable(),
    category: z.string().nullable(),
    icon: z.string().nullable(),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z.coerce.date().nullable(),
    completed: z.boolean(),
})

export type TaskSchema = z.infer<typeof taskSchema>

export const taskSchemaPartial = taskSchema.partial()
export type TaskSchemaPartial = z.infer<typeof taskSchemaPartial>

export const queryTaskSchema = z.object({
    is_completed: z.enum(['true', 'false', '']).optional().default(''),
})

export type queryTaskSchema = z.infer<typeof queryTaskSchema>

export default {
    taskSchema,
    taskSchemaPartial,
    queryTaskSchema,
}
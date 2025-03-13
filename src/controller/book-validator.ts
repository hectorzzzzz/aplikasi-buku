import { z } from 'zod'

const bookQuerySchema = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().min(1).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
})

const bookBodySchema = z.object ({
  id: z.string().uuid().optional(),
  title: z.string().min(1, { message: 'Title tidak bisa kosong' }),
})

export default bookQuerySchema
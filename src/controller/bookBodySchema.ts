import { z } from 'zod'

const bookBodySchema = z.object ({
  id: z.string().uuid().optional(),
  title: z.string().min(1, { message: 'Title tidak bisa kosong' }),
})

export default bookBodySchema
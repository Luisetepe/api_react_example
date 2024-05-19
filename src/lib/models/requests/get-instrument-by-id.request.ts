import { z } from 'zod'

export const getInstrumentByIdRequestSchema = z.object({
	id: z.string()
})

export type GetInstrumentByIdRequest = z.infer<typeof getInstrumentByIdRequestSchema>

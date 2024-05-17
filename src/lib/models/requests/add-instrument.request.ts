import * as z from 'zod'

export const addInstrumentRequestSchema = z.object({
	name: z.string().max(100),
	price: z.number().min(0),
	description: z.string().max(2000),
	imageUrl: z.string().max(1000)
})

export type AddInstrumentRequest = z.infer<typeof addInstrumentRequestSchema>

import { nanoid } from 'nanoid'
import { z } from 'zod'

export const addInstrumentResponseSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		price: z.number(),
		imageUrl: z.string(),
		description: z.string()
	})
	.openapi({
		example: {
			id: nanoid(),
			name: 'Guitar',
			price: 1000,
			imageUrl: 'https://example.com/guitar.jpg',
			description: 'A musical instrument that typically has six strings'
		}
	})

export type AddInstrumentResponse = z.infer<typeof addInstrumentResponseSchema>

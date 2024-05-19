import { z } from 'zod'

export const getInstrumentByIdResponseSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		price: z.number(),
		description: z.string(),
		imageUrl: z.string()
	})
	.openapi({
		example: {
			id: '1',
			name: 'Guitar',
			price: 1000,
			description: 'A musical instrument that typically has six strings',
			imageUrl: 'https://example.com/guitar.jpg'
		}
	})

export type GetInstrumentByIdResponse = z.infer<typeof getInstrumentByIdResponseSchema>

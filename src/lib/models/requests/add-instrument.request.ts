import { z } from 'zod'

export const addInstrumentRequestSchema = z
	.object({
		name: z.string().max(100),
		price: z.number().min(0),
		description: z.string().max(2000),
		imageUrl: z.string().max(1000)
	})
	.openapi({
		example: {
			name: 'Guitar',
			price: 1000,
			description: 'A musical instrument that typically has six strings',
			imageUrl: 'https://example.com/guitar.jpg'
		}
	})

export type AddInstrumentRequest = z.infer<typeof addInstrumentRequestSchema>

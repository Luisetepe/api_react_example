import { z } from 'zod'

export const getAllInstrumentsResponseSchema = z
	.array(
		z.object({
			id: z.string(),
			name: z.string(),
			price: z.number(),
			description: z.string(),
			imageUrl: z.string()
		})
	)
	.openapi({
		example: [
			{
				id: '1',
				name: 'Guitar',
				price: 1000,
				description: 'A musical instrument that typically has six strings',
				imageUrl: 'https://example.com/guitar.jpg'
			},
			{
				id: '2',
				name: 'Piano',
				price: 5000,
				description:
					'A large keyboard musical instrument with a wooden case enclosing a soundboard and metal strings, which are struck by hammers when the keys are depressed',
				imageUrl: 'https://example.com/piano.jpg'
			}
		]
	})

export type GetAllInstrumentsResponse = z.infer<typeof getAllInstrumentsResponseSchema>

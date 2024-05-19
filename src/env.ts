import { z } from 'zod'

const envSchema = z.object({
	ENVIRONMENT: z.enum(['development', 'test', 'production']).default('development'),
	API_PORT: z.string().default('3000'),
	DATABASE_URL: z.string(),
	DATABASE_FILE_PATH: z.string()
})

const env = envSchema.parse(process.env)

export type Environment = z.infer<typeof envSchema>
export default env

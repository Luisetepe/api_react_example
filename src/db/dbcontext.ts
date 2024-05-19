import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import env from 'env'
import * as instrumentsSchema from './schema/instrumentsTable'

const client = new Database(env.DATABASE_FILE_PATH, { create: true })

export const dbContext = drizzle(client, { schema: { ...instrumentsSchema } })
export type DbContext = typeof dbContext

import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import env from 'env'
import * as instrumentsSchema from './schema/instrumentsTable'

const sqliteClient = new Database(env.DATABASE_FILE_PATH, { create: true })

export const dbContext = drizzle(sqliteClient, { schema: { ...instrumentsSchema } })
export type DbContext = typeof dbContext

import * as instrumentsSchema from '@db/schema/instrumentsTable'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

export function createTestDbContext(dbFilePath: string) {
	const client = new Database(dbFilePath, { create: true })
	return drizzle(client, { schema: { ...instrumentsSchema } })
}

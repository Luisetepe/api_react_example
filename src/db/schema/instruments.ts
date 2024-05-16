import { sql } from 'drizzle-orm'
import { real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const instruments = sqliteTable(
	'instruments',
	{
		id: text('id', { length: 22 }).primaryKey(),
		name: text('name', { length: 100 }).notNull(),
		description: text('description', { length: 2000 }).notNull(),
		price: real('price').notNull(),
		imageUrl: text('image_url', { length: 1000 }).notNull(),
		createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
		updatedAt: text('updated_at')
	},
	(instruments) => ({
		nameIndex: uniqueIndex('name_idx').on(instruments.name)
	})
)

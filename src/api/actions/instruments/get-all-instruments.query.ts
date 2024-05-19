import type { DbContext } from '@db/dbcontext'

export async function getAllInstrumentsQuery(dbContext: DbContext) {
	return await dbContext.query.instrumentsTable.findMany({
		columns: {
			id: true,
			name: true,
			price: true,
			description: true,
			imageUrl: true
		}
	})
}

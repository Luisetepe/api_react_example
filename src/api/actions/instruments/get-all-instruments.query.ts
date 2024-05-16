import type { DbContext } from '@db/dbcontext'

export async function getAllInstrumentsQuery(dbContext: DbContext) {
	return await dbContext.query.instruments.findMany()
}

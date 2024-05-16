import type { DbContext } from '@db/dbcontext'
import { instruments } from '@db/schema/instruments'
import { eq } from 'drizzle-orm'

export async function getInstrumentByIdQuery(dbContext: DbContext, id: string) {
	return await dbContext.query.instruments.findFirst({
		where: eq(instruments.id, id)
	})
}

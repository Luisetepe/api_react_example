import type { DbContext } from '@db/dbcontext'
import { instrumentsTable } from '@db/schema/instrumentsTable'
import type { GetInstrumentByIdRequest } from '@lib/models/requests/get-instrument-by-id.request'
import { eq } from 'drizzle-orm'

export async function getInstrumentByIdQuery(
	dbContext: DbContext,
	request: GetInstrumentByIdRequest
) {
	return await dbContext.query.instrumentsTable.findFirst({
		columns: {
			id: true,
			name: true,
			price: true,
			description: true,
			imageUrl: true
		},
		where: eq(instrumentsTable.id, request.id)
	})
}

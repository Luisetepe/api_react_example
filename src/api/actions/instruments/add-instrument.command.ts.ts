import type { DbContext } from '@db/dbcontext'
import { instrumentsTable } from '@db/schema/instrumentsTable'
import type { AddInstrumentRequest } from 'lib/models/requests/add-instrument.request'
import { nanoid } from 'nanoid'

export async function addInstrumentsCommand(dbContext: DbContext, request: AddInstrumentRequest) {
	await dbContext.insert(instrumentsTable).values({
		...request,
		id: nanoid()
	})
}

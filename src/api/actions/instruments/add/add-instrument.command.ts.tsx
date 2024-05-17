import type { DbContext } from '@db/dbcontext'
import { instruments } from '@db/schema/instruments'
import type { AddInstrumentRequest } from 'lib/models/requests/add-instrument.request'
import { nanoid } from 'nanoid'

export async function addInstrumentsCommand(
	dbContext: DbContext,
	instrument: AddInstrumentRequest
) {
	await dbContext.insert(instruments).values({
		...instrument,
		id: nanoid()
	})
}

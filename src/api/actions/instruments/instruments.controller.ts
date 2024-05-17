import type { Context } from '@api/api.definition'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { addInstrumentRequestSchema } from 'lib/models/requests/add-instrument.request.ts'
import { addInstrumentsCommand } from './add/add-instrument.command.ts'
import { getAllInstrumentsQuery } from './get-all-instruments.query'
import { getInstrumentByIdQuery } from './get-instrument-by-id.query'

const app = new Hono<{ Variables: Context }>()
	.get('/', async (c) => {
		const db = c.get('db')
		const instruments = await getAllInstrumentsQuery(db)

		return c.json(instruments)
	})
	.get('/:id', async (c) => {
		const db = c.get('db')
		const { id } = c.req.param()
		const instrument = await getInstrumentByIdQuery(db, id)

		if (!instrument) {
			return c.json({ message: 'Instrument not found' }, 404)
		}

		return c.json(instrument)
	})
	.post('/', zValidator('json', addInstrumentRequestSchema), async (c) => {
		const db = c.get('db')
		const instrument = c.req.valid('json')
		await addInstrumentsCommand(db, instrument)
		c.status(200)
		return c.json(null)
	})

export default app

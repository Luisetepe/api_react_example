import type { Context } from '@api/api.definition'
import { Hono } from 'hono'
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

export default app

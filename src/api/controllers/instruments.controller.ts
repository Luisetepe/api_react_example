import { addInstrumentsCommand } from '@api/actions/instruments/add-instrument.command.ts'
import { getAllInstrumentsQuery } from '@api/actions/instruments/get-all-instruments.query.ts'
import { getInstrumentByIdQuery } from '@api/actions/instruments/get-instrument-by-id.query.ts'
import type { Context } from '@api/api.definition'
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { addInstrumentResponseSchema } from '@lib/models/responses/add-instrument.response'
import { getAllInstrumentsResponseSchema } from '@lib/models/responses/get-all-instruments.response'
import { getInstrumentByIdResponseSchema } from '@lib/models/responses/get-instrument-by.id.response'
import { addInstrumentRequestSchema } from 'lib/models/requests/add-instrument.request.ts'
import { getInstrumentByIdRequestSchema } from 'lib/models/requests/get-instrument-by-id.request.ts'

const app = new OpenAPIHono<{ Variables: Context }>()

app.openapi(
	createRoute({
		tags: ['Instruments'],
		path: '/',
		method: 'get',
		responses: {
			200: {
				content: {
					'application/json': {
						schema: getAllInstrumentsResponseSchema
					}
				},
				description: 'The list of all instruments'
			}
		}
	}),
	async (c) => {
		const db = c.get('db')
		const instruments = await getAllInstrumentsQuery(db)

		return c.json(instruments)
	}
)

app.openapi(
	createRoute({
		tags: ['Instruments'],
		path: '/{id}',
		method: 'get',
		request: {
			params: getInstrumentByIdRequestSchema
		},
		responses: {
			200: {
				content: {
					'application/json': {
						schema: getInstrumentByIdResponseSchema
					}
				},
				description: 'The instrument with the specified ID'
			},
			404: {
				description: 'The instrument with the specified ID was not found'
			}
		}
	}),
	async (c) => {
		const db = c.get('db')
		const request = c.req.valid('param')
		const instrument = await getInstrumentByIdQuery(db, request)

		if (!instrument) {
			return c.notFound()
		}

		return c.json(instrument)
	}
)

app.openapi(
	createRoute({
		tags: ['Instruments'],
		path: '/',
		method: 'post',
		request: {
			body: {
				content: {
					'application/json': {
						schema: addInstrumentRequestSchema
					}
				}
			}
		},
		responses: {
			201: {
				content: {
					'application/json': {
						schema: addInstrumentResponseSchema
					}
				},
				description: 'The instrument was added successfully'
			},
			400: {
				description: 'The request body was invalid'
			}
		}
	}),
	async (c) => {
		const db = c.get('db')
		const instrument = c.req.valid('json')
		const newInstrument = await addInstrumentsCommand(db, instrument)

		const location = c.req.url.replace(c.req.path, `/api/instruments/${newInstrument.id}`)
		c.res.headers.set('Location', location)

		return c.json(newInstrument, 201)
	}
)

export default app

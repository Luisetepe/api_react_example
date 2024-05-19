import instrumentsController from '@api/controllers/instruments.controller'
import { dbContext, type DbContext } from '@db/dbcontext'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'

export type Context = {
	db: DbContext
}

const app = new OpenAPIHono<{ Variables: Context }>()

// This middleware sets the database service on the context object
app.use(async (c, next) => {
	c.set('db', dbContext)
	await next()

	if (c.error) {
		console.error(c.error)
	}
})

// This middleware adds CORS headers to all requests
app.use('/api/*', cors())

app.route('/api/instruments', instrumentsController)

app.doc('/docs', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Instruments API'
	}
})
app.get('/swagger', swaggerUI({ url: '/docs' }))

export const instrumentsApi = app

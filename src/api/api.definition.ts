import instrumentsController from '@api/actions/instruments/instruments.controller'
import { dbContext, type DbContext } from '@db/dbcontext'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

export type Context = {
	db: DbContext
}

const app = new Hono<{ Variables: Context }>()

// This middleware sets the database service on the context object
app.use(async (c, next) => {
	c.set('db', dbContext)
	await next()
})

// This middleware adds CORS headers to all requests
app.use('/api/*', cors())

app.route('/api/instruments', instrumentsController)

export const instrumentsApi = app

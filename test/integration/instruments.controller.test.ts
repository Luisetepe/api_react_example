import { instrumentsApi } from '@api/api.definition'
import { dbContext } from '@db/dbcontext'
import { instrumentsTable } from '@db/schema/instrumentsTable'
import { beforeAll, expect, test } from 'bun:test'
import { eq } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { nanoid } from 'nanoid'

beforeAll(() => {
	migrate(dbContext, { migrationsFolder: './src/db/migrations' })
})

test('GET /instruments', async () => {
	// Arrange
	const expectedInstrument = {
		id: nanoid(),
		name: 'Test Instrument',
		price: 1000,
		imageUrl: 'https://example.com/image.jpg',
		description: 'This is a test instrument'
	}
	await dbContext.insert(instrumentsTable).values(expectedInstrument)

	// Act
	const response = await instrumentsApi.request('/api/instruments')

	// Assert
	expect(response.status).toBe(200)
	expect(await response.json()).toEqual([expectedInstrument])
})

test('GET /instruments/:id', async () => {
	// Arrange
	const expectedInstrument = {
		id: nanoid(),
		name: 'Test Instrument By Id',
		price: 1000,
		imageUrl: 'https://example.com/image.jpg',
		description: 'This is a test instrument'
	}
	await dbContext.insert(instrumentsTable).values(expectedInstrument)

	// Act
	const response = await instrumentsApi.request(`/api/instruments/${expectedInstrument.id}`)

	// Assert
	expect(response.status).toBe(200)
	expect(await response.json()).toEqual(expectedInstrument)
})

test('GET /instruments/:id - Not Found', async () => {
	// Act
	const response = await instrumentsApi.request(`/api/instruments/${nanoid()}`)

	// Assert
	expect(response.status).toBe(404)
})

test('POST /instruments', async () => {
	// Arrange
	const newInstrument = {
		name: 'New Instrument',
		price: 2000,
		imageUrl: 'https://example.com/new-image.jpg',
		description: 'This is a new instrument'
	}

	// Act
	const response = await instrumentsApi.request('/api/instruments', {
		method: 'POST',
		body: JSON.stringify(newInstrument),
		headers: { 'Content-Type': 'application/json' }
	})

	// Assert
	const insertedInstrument = await dbContext.query.instrumentsTable.findFirst({
		columns: {
			name: true,
			price: true,
			imageUrl: true,
			description: true
		},
		where: eq(instrumentsTable.name, newInstrument.name)
	})
	expect(response.status).toBe(201)
	expect(insertedInstrument).toEqual(newInstrument)
})

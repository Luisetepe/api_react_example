import { instrumentsApi } from '@api/api.definition'
import env from 'env'

export default {
	port: env.API_PORT,
	fetch: instrumentsApi.fetch
}

import { client } from '../api/codegen/client.gen'

client.interceptors.request.use((request) => {
	request.headers.set('X-API-KEY', import.meta.env.VITE_API_KEY)
	return request
})

export * from '../api/codegen'

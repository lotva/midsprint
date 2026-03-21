import { shouldEnableMsw } from './shouldEnableMsw'

export async function initMswOnServer() {
	const isSsr = typeof window === 'undefined'

	if (isSsr && shouldEnableMsw()) {
		const { server } = await import('@/common/api/mocks/server')
		server.listen({ onUnhandledRequest: 'bypass' })
	}
}

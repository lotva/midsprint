import { shouldEnableMsw } from '@/common/lib/shouldEnableMsw'

export async function onCreateGlobalContext() {
	if (shouldEnableMsw()) {
		import('@/common/api/mocks/browser')
			.then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
			.catch(() => {})
	}
}

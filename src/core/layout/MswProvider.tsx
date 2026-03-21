'use client'

import { shouldEnableMsw } from '@/common/lib/shouldEnableMsw'
import { useLayoutEffect } from 'react'

export function MswProvider({ children }: { children: React.ReactNode }) {
	useLayoutEffect(() => {
		if (!shouldEnableMsw()) return

		import('@/common/api/mocks/browser')
			.then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
			.catch(() => {})
	}, [])

	return <>{children}</>
}

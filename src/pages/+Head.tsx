// https://vike.dev/Head

import logoUrl from '@/core/assets/logo.svg'

export function Head() {
	return (
		<>
			<link
				as="font"
				crossOrigin="anonymous"
				href="/fonts/martian-grotesk.woff2"
				rel="preload"
				type="font/woff2"
			/>
			<link
				href={logoUrl}
				rel="icon"
			/>
		</>
	)
}

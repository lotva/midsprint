import vikePhoton from 'vike-photon/config'
import vikeReactQuery from 'vike-react-query/config'
import vikeReactZustand from 'vike-react-zustand/config'
import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
	cli: {
		preview: 'vite',
	},
	description: 'Movie discovery app.',
	extends: [vikeReact, vikePhoton, vikeReactQuery, vikeReactZustand],
	lang: 'ru',
	prerender: true,
	title: 'Мидспринт',
} satisfies Config

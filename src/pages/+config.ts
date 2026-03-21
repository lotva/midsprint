import vikePhoton from 'vike-photon/config'
import vikeReactQuery from 'vike-react-query/config'
import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
	description: 'Movie discovery app.',
	extends: [vikeReact, vikePhoton, vikeReactQuery],
	prerender: true,
	title: 'Midsprint',
} satisfies Config

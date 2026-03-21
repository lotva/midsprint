import vikePhoton from 'vike-photon/config'
import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
	description: 'Demo showcasing Vike',

	extends: [vikeReact, vikePhoton],
	prerender: true,
	// https://vike.dev/head-tags
	title: 'My Vike App',
} satisfies Config

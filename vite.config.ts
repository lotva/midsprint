import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import unocss from 'unocss/vite'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [vike(), react(), unocss()],

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('src', import.meta.url)),
		},
	},
})

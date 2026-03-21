import { defineConfig } from 'oxfmt'

export default defineConfig({
	htmlWhitespaceSensitivity: 'ignore',
	ignorePatterns: ['pnpm-lock.yaml'],

	semi: false,
	singleAttributePerLine: true,
	singleQuote: true,
	trailingComma: 'all',
})

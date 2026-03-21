import { defineConfig } from 'oxfmt'

export default defineConfig({
	htmlWhitespaceSensitivity: 'ignore',
	ignorePatterns: ['pnpm-lock.yaml', 'public', 'src/common/api/codegen', 'src/common/api/mocks'],

	semi: false,
	singleAttributePerLine: true,
	singleQuote: true,
	trailingComma: 'all',
})

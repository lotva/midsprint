import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
	input: 'https://kinopoiskapiunofficial.tech/documentation/api/openapi.json',
	output: 'src/common/api/codegen',
	plugins: ['@hey-api/client-ofetch', '@tanstack/react-query'],
})

export function shouldEnableMsw() {
	return import.meta.env.VITE_ENABLE_MSW_MOCK === 'true'
}

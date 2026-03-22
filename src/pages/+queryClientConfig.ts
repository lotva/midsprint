import { QueryClientConfig } from '@tanstack/react-query'

const TEN_MINUTES_IN_MS = 1000 * 60 * 10

const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: import.meta.env.PROD,
			staleTime: TEN_MINUTES_IN_MS,
		},
	},
}

export { queryClientConfig }

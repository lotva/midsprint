import { getApiV22Films, type GetApiV22FilmsData } from '@/common/api'

type Params = GetApiV22FilmsData['query'] & {
	pageParam?: number
}

export const fetchMovies = async ({ pageParam = 1, ...query }: Params) =>
	getApiV22Films({
		query: {
			page: pageParam,
			...query,
		},
	})

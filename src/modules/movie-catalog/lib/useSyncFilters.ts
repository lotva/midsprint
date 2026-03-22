// oxlint-disable typescript/no-explicit-any
import { useCallback, useMemo } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { navigate } from 'vike/client/router'
import { Filters } from './types'

export const VALID_FILTERS: ReadonlyArray<keyof Filters> = [
	'countries',
	'genres',
	'order',
	'ratingFrom',
	'ratingTo',
	'type',
	'yearFrom',
	'yearTo',
	'imdbId',
	'keyword',
]

const ARRAY_NUM_KEYS: Array<keyof Filters> = ['countries', 'genres']
const NUM_KEYS: Array<keyof Filters> = ['ratingFrom', 'ratingTo', 'yearFrom', 'yearTo']

export function useSyncFilters() {
	const pageContext = usePageContext()

	const filters = useMemo(() => {
		const search = (pageContext.urlParsed.search || {}) as Record<string, string>
		const valid: Filters = {}

		VALID_FILTERS.forEach((key) => {
			const value = search[key]
			if (value === undefined || value === null || value === '') return

			if (ARRAY_NUM_KEYS.includes(key)) {
				;(valid as any)[key] = value
					.split(',')
					.map(Number)
					.filter((n) => !Number.isNaN(n))
				return
			}

			if (NUM_KEYS.includes(key)) {
				const num = Number(value)
				if (!Number.isNaN(num)) (valid as any)[key] = num
				return
			}

			;(valid as any)[key] = value
		})

		return valid
	}, [pageContext.urlParsed.search])

	const updateFilters = useCallback(
		(next: Partial<Filters>) => {
			const merged = { ...filters, ...next }
			const params = new URLSearchParams()

			VALID_FILTERS.forEach((key) => {
				const value = merged[key]
				if (
					value === undefined ||
					value === null ||
					(Array.isArray(value) && value.length === 0) ||
					value === ''
				) {
					return
				}

				if (Array.isArray(value)) {
					params.set(key, value.join(','))
				} else {
					params.set(key, String(value))
				}
			})

			const searchStr = params.toString()
			const url = `${pageContext.urlPathname}${searchStr ? `?${searchStr}` : ''}`

			navigate(url, {
				keepScrollPosition: true,
				overwriteLastHistoryEntry: true,
			})
		},
		[filters, pageContext.urlPathname],
	)

	return { filters, updateFilters }
}

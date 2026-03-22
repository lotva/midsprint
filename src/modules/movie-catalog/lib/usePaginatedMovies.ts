// oxlint-disable sort-keys
import { useIntersectionObserver } from '@siberiacancode/reactuse'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { fetchMovies } from '../api'
import { Filters } from './types'

export function usePaginatedMovies(filters: Filters) {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
		queryKey: ['movies', 'infinite', filters],
		queryFn: ({ pageParam }) => fetchMovies({ pageParam, ...filters }),

		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = allPages.length + 1

			const maxPages = Math.min(lastPage.data?.totalPages || 0, 20)

			return nextPage <= maxPages ? nextPage : undefined
		},
	})

	const movies = useMemo(() => {
		return data.pages
			.flatMap((page) => page.data?.items || [])
			.filter((movie) => !movie.posterUrlPreview?.includes('no-poster'))
	}, [data])

	const { ref: scrollTargetRef, entries } = useIntersectionObserver<HTMLDivElement>({
		onChange: (entries) => {
			const [entry] = entries
			if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		},
		rootMargin: '300px',
		threshold: 0.1,
	})

	// Load proactively on large screens:

	useEffect(() => {
		const isVisible = entries?.[0]?.isIntersecting
		if (isVisible && hasNextPage && !isFetchingNextPage) {
			const timeout = setTimeout(() => fetchNextPage(), 100)
			return () => clearTimeout(timeout)
		}
	}, [entries, hasNextPage, isFetchingNextPage, fetchNextPage])

	return {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		movies,
		scrollTargetRef,
	}
}
